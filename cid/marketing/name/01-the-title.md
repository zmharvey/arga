# 01 — The title

**Domain:** marketing/name · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**Recommended: `Stone Under Green`.** Nine candidates were generated from one stated frame —
*the title names the place and its condition, never the action, the prize or the genre* — and
checked against the banked occupancy evidence. **The developer ratifies; `OPEN.md §3` reserves
that and no sheet can close it.** `title.value` is authoritative for the string and
`uiTheme.sourceTitle` mirrors it; until this key merges `uiTheme.sourceTitle` holds
`"Ruin Restoration"` and the `npm test` assertion falls back to it.

## Why

**The generation frame is mine because the brief has no naming criteria at all** `[cid: decided]`.
`05-OUTWARD.md` declines three candidate *lines* with reasons and states no criterion for a
*name*. What replaces the blank page is the occupancy evidence, searched 2026-08-02, and it
points one way.

| tested | result | evidence |
|---|---|---|
| `Clear the ___` / `Clean the ___` as a title shape | **the busiest shape in the cleanup genre**, five shipping titles on one search page. `theme/vocabulary/02` cleared `clearing` as a *word*; the **shape** is not free | `[research: https://www.roblox.com/games/94672857541034/Clean-the-Museum]` `[research: https://www.roblox.com/games/72417782950794/Clean-the-Backyard]` `[research: https://www.roblox.com/games/136066894181626/Clean-the-Restaurant]` `[research: https://www.roblox.com/games/80310980024153/Clean-Your-Room]` `[research: https://www.roblox.com/games/80000420704526/Clean-The-Superstore]` |
| `find` / `finds`, the game's own collection-class noun | **heavily occupied as a title pattern** — a shipping `Find the Objects` plus the platform-wide `Find the ___` genre. Reusing the in-game noun is the **worst-evidenced** option in this set | `[research: https://www.roblox.com/games/127763554649245/Find-the-Objects]` |
| `buried` / `dig`, the hook's second half | **the most crowded neighbourhood on the platform.** `treasure` is already in `bannedWords`; `dig` is at least five shipping titles | `[research: https://www.roblox.com/games/126244816328678/DIG]` `[research: https://www.roblox.com/games/76455837887178/Dig-it]` `[research: https://www.roblox.com/games/81440632616906/Dig-to-Earths-CORE]` `[research: https://www.roblox.com/games/138485603458691/Dig-for-Dinos]` `[research: https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator]` |
| `overgrowth` / `overgrown` | **no experience in this family.** One builder showcase, one catalog item. Corroborates `theme/vocabulary/02`'s negative result a year on | `[research: https://www.roblox.com/games/4508787172/Lush-Overgrown-Showcase]` `[research: https://www.roblox.com/catalog/11415599271/Overgrowth-Cape]` |
| `ruin` / `ruins` as a title word, and `Ruin Restoration` exact | **no exact-match experience.** Three near neighbours, all out of family | `[research: https://www.roblox.com/games/129955223489508/Star-Ruins-Spirit-Forest]` `[research: https://www.roblox.com/games/7892152397/Ruins-Realm]` `[research: https://www.roblox.com/games/127310837609892/CONTENT-UPDATE-FNaF-The-Ruins-Pre-Alpha]` |
| `restoration` / `restore` as a title word | **the word is free; the position is not.** `reStore` occupies restoration-plus-collection and `Clean the Museum` ships *"the more you restore, the more the museum comes back to life"*. Materially past `research/landscape.md`, which cited `reStore` only under `antique` | `[research: https://www.roblox.com/games/87179205054038/reStore]` `[research: https://www.roblox.com/games/94672857541034/Clean-the-Museum]` |
| `Incremental` in a title | at least eight shipping titles across three studios, and closed anyway by `[you chose: R4 Q2]` | `[research: research/landscape.md]` |

**Both halves of the brief's hook line are occupied as title material**, the verb half by the
`Clean the ___` shape and the object half by `Dig` / `Find the ___`. **What the evidence leaves
open is place-and-condition vocabulary, not action-or-prize vocabulary.** That is the finding
the frame is built on. Every row inherits `research/landscape.md`'s own bound — *"'taken' here
means 'exists', not 'successful'"*, no CCU or visit figures, an absent hit is weak evidence —
which is category gap `M9`, unclosed.

**Why the recommendation is not `Ruin Restoration`.** Three independent reasons, none of them
taste. **(1)** It is `<Noun> <Genre>` — structurally the `X Incremental` skeleton with the noun
swapped, and `HANDOFF.md` #1 is binding that *"the noun is not the differentiator"*
`[brief: binding]`. **(2)** The restoration *position* is occupied by two shipping titles above.
**(3)** *Restoration* asserts an end state, and `T2` falsifies it: `theme/fantasy/02` rules
*"no line may promise a world that ends up reclaimed"*, and `theme/setting/02` rules the works
*"cannot be exhausted because it is uncounted"*. Retained as alternate **A3** anyway, because
ratifying the incumbent must stay a zero-cost option for the developer.

**Why `Stone Under Green` wins.** It is `theme/lore/01`'s canon compressed — *"the stone was
always sound under the green"* — so its `backedBy` resolves to an approved sheet rather than to
a copywriter. It states a standing relation, not an outcome, so it is true at 24/24 and forever
after (`T1`, `T2`, `T9`, `T10` all clear). Three words, 17 characters, no article, no glyph, no
genre suffix. Every word clears `bannedWords`; none appears in either occupied shape; and it
happens to satisfy `vocabulary.allowedPattern` and `casing: "title"` even though ruling **M-B**
means neither binds it — a free coherence check, not the reason.

**Its stated weakness, so nobody discovers it later:** the title carries **no discovery
keyword** — no verb, no genre word, no family noun. That is survivable and not free. Primary
discovery is the *"Recommended for You"* sort, a retrieval-then-ranking system on engagement
signals and not keywords, and search *"can now use semantic search … to find games through
natural language queries"* where it historically *"relied on … exact search queries and limited
metadata such as titles"*
`[research: https://create.roblox.com/docs/production/promotion/discovery]`. **That is the
substitute `05-OUTWARD.md` could not name** for the cost it priced when it moved this game out
of the incremental category. Evidence only — the positioning is `[brief: binding]` and I am not
touching it. The consequence is that the keyword load moves entirely onto the tag set and the
genre field, which are Store Page's.

**`Works`, `Terrace`, `Cistern`, `Vault` and `Spire` were considered and excluded for two
different reasons.** `works` is registered in `vocabulary.internalTerms` as a writers-handle with
`renderable: false` `[research: cid/theme/vocabulary/03-term-register.md]`, so a title built on
it uses a word the game never says. The four set labels each name **one kind of part**, and
`theme/setting/02` rules *"the four set labels name four kinds of part, not four places"* — a
title naming one of them misrepresents the extent of the place.

**`maxLabelChars` 14 does not reach this string.** `crossCuttingProblems()` applies it only over
the paths `playerFacingStrings()` walks, all of them `GuiObject` strings inside `game/src`
`[research: bridge/schema.mjs]`; `theme/vocabulary/01` exempts the title by name; and the
shipped `"Ruin Restoration"` is 16 characters and merged clean. The bound that does apply is
sheet `02`'s.

**What I could not do, stated rather than papered over.** I have no fetch tools, so every
occupancy row above is at **word** and **shape** level from the banked pack. **No exact-string
search was run for any candidate**, and the graph's `must_verify` — *"Search the title before
committing"* — is therefore closed only in part. `preRatificationChecks` names the exact queries
owed, and they are the gate between recommendation and ratification. This is the v1 snow failure
in its live form: v1 verified the family and never verified the choice.
`[research owed: an exact-match Roblox experience search for each of the four ranked candidates,
plus a roblox.com/discover search pass on 'stone under green' and 'under the overgrowth']`

```manifest
{
  "provides": "title",
  "status": "proposed",
  "value": {
    "value": "Stone Under Green",
    "chars": 17,
    "words": 3,
    "ratified": false,
    "ratifiedBy": "the developer, per OPEN.md section 3 'Needs you'",
    "ratificationOpenReason": "OPEN.md section 3 reserves the name; OPEN.md section 4 routes the work here. This sheet produces the framework, the evidence and the candidate set.",
    "authority": {
      "authoritativeKey": "title.value",
      "mirrorKey": "uiTheme.sourceTitle",
      "path": "title.value -> ctx.title (concept/src/derive/game-context.mjs:136) -> sourceTitle (ui-forge/src/theme/generate.mjs:116) -> Theme.luau meta.sourceTitle",
      "rule": "uiTheme.sourceTitle must equal title.value. bridge/test/theme-archetype.test.mjs reads title.value once this key is merged, and uiTheme.sourceTitle only until then.",
      "interimSourceTitle": "Ruin Restoration",
      "interimEndsWhen": "this key merges",
      "revisionRequest": {
        "against": "cid/art/ui-art/01-archetype-and-lock.md",
        "field": "uiTheme.sourceTitle",
        "from": "Ruin Restoration",
        "to": "title.value",
        "acceptedInAdvance": true,
        "acceptedInAdvanceEvidence": "art/ui-art/01: 'If the Name lead recommends something other than Ruin Restoration, that revision against this approved key is accepted in advance'",
        "alsoMoves": ["art/ui-art/01 acceptance criterion 1's literal"]
      }
    },
    "generationFrame": [
      { "id": "F1", "rule": "the title names the place and its condition", "excludes": "the action, the prize, and the genre", "because": "the occupancy evidence leaves place-and-condition vocabulary open and closes action-and-prize vocabulary" },
      { "id": "F2", "rule": "the title states a standing relation, never an outcome", "because": "T2; theme/fantasy/02 forbids promising a world that ends up reclaimed; theme/setting/02 rules the works uncounted" },
      { "id": "F3", "rule": "the title does not use the shape <Noun> <Genre>", "because": "HANDOFF.md #1, binding: the noun is not the differentiator, and that shape is the X Incremental skeleton" },
      { "id": "F4", "rule": "the title is true under theme/lore/01 canon", "because": "the place was never lost, only overgrown, and the player is not repairing it" }
    ],
    "eliminationRules": [
      { "id": "E1", "rule": "contains any vocabulary.bannedWords entry", "words": ["relic", "relics", "tier", "artifact", "antique", "rebirth", "loot", "treasure"], "verdict": "eliminated on sight" },
      { "id": "E2", "rule": "contains the word Incremental", "verdict": "eliminated on sight", "because": "CONCEPT.md 'a restoration / completion game, not an incremental' is [brief: binding]" },
      { "id": "E3", "rule": "matches the shape Clear the ___ or Clean the ___", "verdict": "eliminated", "because": "five shipping titles on one search page, 2026-08-02" },
      { "id": "E4", "rule": "matches the shape Find the ___, or contains dig, digging or buried", "verdict": "eliminated", "because": "the most crowded neighbourhood on the platform, 2026-08-02" },
      { "id": "E5", "rule": "carries a trailing genre suffix (Simulator, Tycoon, Incremental, Obby, RNG)", "verdict": "eliminated", "because": "F3" },
      { "id": "E6", "rule": "uses a term registered in vocabulary.internalTerms with renderable false", "words": ["works", "finder"], "verdict": "eliminated", "because": "the title would use a word the game never says" }
    ],
    "evidenceBound": "'taken' means 'exists', not 'successful'. No CCU or visit figure was gathered for any title below. An absent hit is weak evidence. Inherited verbatim from research/landscape.md and relayed as category gap M9.",
    "evidenceDated": "2026-08-02",
    "candidates": [
      { "id": "C1", "name": "Stone Under Green", "chars": 17, "frame": "place + condition", "wordOccupancy": "clear: stone and green surfaced no family hit; neither is a signature word of any surveyed competitor", "shapeOccupancy": "clear: not <Noun> <Genre>, not Clear/Clean the ___, not Find the ___", "eliminationRules": "passes E1-E6", "truth": "passes T1, T2, T9, T10 and theme/lore/01 canon", "verdict": "RECOMMENDED", "backedBy": "cid/theme/lore/01-the-past.md, canon 'the stone was always sound under the green'", "exactMatchSearch": "owed" },
      { "id": "C2", "name": "Under the Overgrowth", "chars": 20, "frame": "condition + concealment", "wordOccupancy": "clear: overgrowth returned no experience in this family, corroborating theme/vocabulary/02 a year on", "shapeOccupancy": "untested: the Under the ___ shape was not searched", "eliminationRules": "passes E1-E6", "truth": "passes", "verdict": "ALTERNATE A1", "backedBy": "https://www.roblox.com/games/4508787172/Lush-Overgrown-Showcase", "exactMatchSearch": "owed" },
      { "id": "C3", "name": "The Green Ruin", "chars": 14, "frame": "condition + place", "wordOccupancy": "partial: ruin has no exact-match experience but is a common platform title word; three near neighbours are all out of family", "shapeOccupancy": "clear", "eliminationRules": "passes E1-E6", "truth": "passes", "verdict": "ALTERNATE A2", "backedBy": "https://www.roblox.com/games/7892152397/Ruins-Realm", "exactMatchSearch": "owed" },
      { "id": "C4", "name": "Ruin Restoration", "chars": 16, "frame": "place + genre", "wordOccupancy": "the word restoration is free; the position is occupied by reStore and by Clean the Museum's 'the more you restore, the more the museum comes back to life'", "shapeOccupancy": "fails F3: <Noun> <Genre> is the X Incremental skeleton", "eliminationRules": "passes E1-E6", "truth": "T2 risk: restoration asserts an end state theme/fantasy/02 forbids promising", "verdict": "ALTERNATE A3, the incumbent, retained so ratifying the status quo costs nothing", "backedBy": "https://www.roblox.com/games/87179205054038/reStore", "exactMatchSearch": "owed" },
      { "id": "C5", "name": "Overgrowth", "chars": 10, "frame": "condition only", "wordOccupancy": "clear", "shapeOccupancy": "clear", "eliminationRules": "passes E1-E6", "truth": "passes", "verdict": "REJECTED: names the obstacle and not the place, and a bare common noun indexes badly against a semantic-search sort", "backedBy": "https://create.roblox.com/docs/production/promotion/discovery", "exactMatchSearch": "not owed, rejected" },
      { "id": "C6", "name": "The Overgrown Terrace", "chars": 21, "frame": "condition + one part", "wordOccupancy": "clear", "shapeOccupancy": "clear", "eliminationRules": "passes E1-E6", "truth": "FAILS canon: theme/setting/02 rules the four labels name four kinds of part, not four places, so naming the game after one part misrepresents the extent", "verdict": "REJECTED", "backedBy": "cid/theme/setting/02-extent.md", "exactMatchSearch": "not owed, rejected" },
      { "id": "C7", "name": "The Overgrown Works", "chars": 19, "frame": "condition + place", "wordOccupancy": "clear", "shapeOccupancy": "clear", "eliminationRules": "FAILS E6: works is vocabulary.internalTerms, renderable false", "truth": "passes", "verdict": "REJECTED", "backedBy": "cid/theme/vocabulary/03-term-register.md", "exactMatchSearch": "not owed, rejected" },
      { "id": "C8", "name": "Clear the Overgrowth", "chars": 20, "frame": "the brief's own hook, first half", "wordOccupancy": "clear as words", "shapeOccupancy": "FAILS E3: five shipping Clean the ___ titles, now the busiest shape in the cleanup genre", "eliminationRules": "FAILS E3", "truth": "passes", "verdict": "REJECTED, and listed because it is the obvious move", "backedBy": "https://www.roblox.com/games/94672857541034/Clean-the-Museum", "exactMatchSearch": "not owed, rejected" },
      { "id": "C9", "name": "Find What's Buried", "chars": 18, "frame": "the brief's own hook, second half", "wordOccupancy": "FAILS E4: find is occupied by Find the Objects and the platform-wide Find the ___ genre; buried sits in the dig neighbourhood", "shapeOccupancy": "FAILS E4", "eliminationRules": "FAILS E4", "truth": "passes", "verdict": "REJECTED: reusing the in-game class noun is the worst-evidenced option in the set", "backedBy": "https://www.roblox.com/games/127763554649245/Find-the-Objects", "exactMatchSearch": "not owed, rejected" }
    ],
    "alternates": [
      { "rank": "A1", "name": "Under the Overgrowth", "promoteIf": "the exact-match search returns a hit for Stone Under Green, or the developer prefers a title carrying the condition word the occupancy evidence twice cleared" },
      { "rank": "A2", "name": "The Green Ruin", "promoteIf": "A1 also returns a hit, or a 14-character title is wanted for tile legibility" },
      { "rank": "A3", "name": "Ruin Restoration", "promoteIf": "the developer ratifies the incumbent, which changes uiTheme.sourceTitle by zero fields" }
    ],
    "promotionRule": "an alternate is promoted by editing title.value only. Every other field on this key is unchanged, and uiTheme.sourceTitle follows automatically. After first publish the change policy in sheet 02 governs instead.",
    "preRatificationChecks": [
      { "id": "P1", "check": "exact-match Roblox experience search for 'Stone Under Green'", "status": "owed", "blocks": "ratification, not merge" },
      { "id": "P2", "check": "exact-match Roblox experience search for 'Under the Overgrowth', 'The Green Ruin' and 'Ruin Restoration'", "status": "owed", "blocks": "promotion of that alternate" },
      { "id": "P3", "check": "the recommended string contains no vocabulary.bannedWords entry and no occurrence of 'Incremental'", "status": "passing" }
    ],
    "claims": [
      { "id": "N1", "claim": "the place in this game is stone with green over it", "backedBy": "cid/theme/lore/01-the-past.md ('the stone was always sound under the green'); cid/theme/setting/01-the-ruin.md (a stone works, civil and utilitarian)", "check": "both sheets state it; the title asserts nothing the two do not" }
    ],
    "claimsNotMade": [
      { "predicate": "T1", "why": "the title names no quantity of things to find and no continuation" },
      { "predicate": "T2", "why": "the title states a relation, not an outcome; it does not contain restore, restored, reclaimed, finished or complete" },
      { "predicate": "T9", "why": "the title names no reason to return" },
      { "predicate": "T10", "why": "the title contains no urgency, scarcity, discount or limited-time word" }
    ]
  }
}
```

## Consequences for other work

- **UI-art archetype work (`uiTheme`)** takes a one-field revision: `sourceTitle` becomes
  `"Ruin Restoration"` → `"Stone Under Green"`, and its acceptance criterion 1's literal moves
  with it. That sheet accepted this in advance and no new round is needed. **`title.value` is
  authoritative and `uiTheme.sourceTitle` mirrors it** — if the two ever disagree, `title` wins
  and `uiTheme` is the one that is wrong.
- **Store-listing work** inherits the whole keyword load. This title contains no verb, no genre
  word and no family noun, so the tag set, the genre field and the description are the only
  places a keyword-matched or semantically-matched query can land. That is a requirement on the
  tag set, not a suggestion.
- **Store-icon and thumbnail work** get a title that is three short words and never wraps past
  two lines at any tile width. Any overlay repeating the title is redundant with the tile's own
  label; that is their call, and this sheet supplies the string.
- **Contract-and-seam work** gains a second consumer of `deriveGameContext`'s already-emitted
  `title` field. No emitter change is requested by this sheet.
- **Every other outward domain** may cite `title.value`; none may restate the string as a
  literal, because a copied literal is what goes stale when an alternate is promoted.

## Acceptance criteria

1. `title.value` is a non-empty string containing no entry of `vocabulary.bannedWords` and no
   occurrence of `Incremental`, case-insensitive.
2. `title.candidates` has at least six rows; every row carries a non-empty `wordOccupancy`,
   `shapeOccupancy`, `verdict` and `backedBy`, and exactly one row's `verdict` begins
   `RECOMMENDED`.
3. `game/src/shared/Theme.luau`'s `meta.sourceTitle` equals `title.value`, and
   `grep -rn "Pet Ascend Simulator" game/src` returns nothing.
4. No field anywhere in this key is `null`.

## Flagged to the developer

**The name is yours to ratify and this sheet does not close it.** `OPEN.md §3` reserves it under
*"Needs you"*; `OPEN.md §4` routes the work here. Live options: **(a)** ratify
`"Stone Under Green"` as recommended; **(b)** promote `A1 Under the Overgrowth` or
`A2 The Green Ruin`, which costs one field; **(c)** ratify the incumbent `"Ruin Restoration"`,
which costs zero fields and inherits the three objections above. **I recommend (a).** One thing
is owed before any of them: `preRatificationChecks P1`/`P2`, an exact-match search per candidate,
which I had no tool to run.

## Not decided here

What the name field may ever contain, the glyph ruling, the title-tag convention, the character
bound and the rename policy: sheet `02`, this domain. Whether a tagline exists and what it says:
sheet `03`, this domain. In-game naming language, the ban list and the term register:
`theme/vocabulary`, which holds `vocabulary`. The tag set, the genre field, the description and
every keyword decision: store-listing work. The icon and every thumbnail: store-icon and
thumbnail work. Whether `title` is promoted into `bridge/schema.mjs`, and whether any emitter
writes an outward artifact at all (category gap **M6**): contract-and-seam work.
