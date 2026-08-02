# 01 — The claim ledger and the description

**Domain:** marketing/store-page · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**Seven lines of plain text in four unheaded blocks, and every one of them is a ledger row with a
`backedBy` and a runnable `check`.** The listing states **no duration**, does **not** use the word
*relaxing*, and states the absence of reset and offline earning **positively** — *"Nothing resets.
Nothing runs while you are away."* The whole of `storeListing` is proposed here; sheets 02–05 amend
four named blocks inside it.

## Why

**The register is the decision, and it is a differentiation argument.** Four fetched competitor
descriptions open with *relaxing*: Grass Incremental *"A relaxing lawn-trimming simulator game"*
`[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`, Leaves
Incremental *"A relaxing leaf-gathering simulator"*
`[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`, plus Scrap and
Lumber `[research: cid/marketing/_category.md]`. The platform states the first sentence is where
genre and content are read
`[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`,
so spending it on the family's most-shared adjective spends the highest-value real estate on a
signal that says *one of these*. `theme/tone/01` released the word to me with recommendation (a);
I decline the freedom rather than overrule the sheet. **P9 closed: not claimed.** `[cid: decided]`

**Two clauses of the shared sentence are false here, and imitating it would import two more things
the scope gate forbids by name.** *"the more you rebirth"* is cut `[brief: binding]` ←
`[you chose: R2 Q2]` (`01-FOUNDATION.md`) and `rebirth` is in `bannedWords`; *"unlock new islands"*
contradicts `depths.unlock: previousAreaComplete`. Beyond that, Leaves Incremental's live
description now ships **`USE CODE: RELEASE`** and both competitors ship group-join-for-boosts
prompts — a code and a group reward, both priority 3 `[brief: soft]` and hard as a gate
(`03-META.md`). So the commodity register is not merely a clone signal; copying it is a scope
breach. Rows `E6` and `E7` forbid each by name.

**P4 closed: no duration appears, and that is a field rather than a silence.** There are two live
figures, not none. `meta/04`'s eight-lap table sums to **1,265 s ≈ 21.1 min** at zero products
`[research: cid/gameplay/meta/04-the-depth-ladder.md]`; `monetization/01`'s same table at `Span`
×1.75 sums to **723 s ≈ 12.1 min** `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`.
**A duration in outward copy is therefore a claim whose truth depends on a purchase**, and a
sentence true only for purchasers is the sharpest `T0` failure available to this category. Both
figures are also hostage to `LAP_TARGET`, which `meta/04` publishes as `[playtest unknown]` inside
120–200 s with every footprint rescaling; Balance & Tuning has not run. `core-loop/04`'s
*"minute 11"* is pre-R-2 and dead and appears nowhere here. **Content volume is stated instead** —
24, 4, 6 — because R-3 fixed it by ruling and no tuning value moves it.

**P5 closed: the absence is stated, once, and never as a denial.** `CONCEPT.md` argues it must be
said plainly because *"genre-literate players will otherwise arrive expecting rebirth and idle and
not find them"*, and the audience is *"casual but genre-literate"* `[brief: binding]` ←
`[you chose: R1 Q4]` (`00-CORE.md`). A denial is impossible anyway — `rebirth` is banned — so the
line names what is true instead of what is missing. It doubles as the `T9` guard: the listing
promises no reason to return, which is what `03-META.md`'s *"Honest weakness"* paragraph requires.

**Two claims are true forever and no competitor can make either.** *"Ground you clear stays
clear"* is `theme/fantasy/02`'s outward form of *"finished work is never asked for twice"*
`[brief: binding]` ← `[you chose: R2 Q1]`. *"All 24 finds can be reached without buying anything"*
is `products` `F17`, and in a genre where the reference sells a 2,500-Robux tool it is unusual
enough to be worth its own block.

**The description makes no claim about what exists after the 24th find.** `theme/fantasy/02`
forbids promising endless new things to find and a world that ends up reclaimed; the ground does
continue (`endgame.postTerminalArea.unlimited: true`) but it buries nothing, and a reader shown
*"the ground keeps going"* infers more finds. Saying nothing is the only form that cannot be
misread. Row `E3`.

**No length ceiling is set, and that is a stated absence.** M-B exempts outward strings from
`maxLabelChars`, `casing`, `maxSentenceWords` and `allowedPattern`, and the Name lead confirmed the
mechanism: `crossCuttingProblems()` applies `vocab.maxLabelChars` only over the ten contract paths
`playerFacingStrings()` walks, all of them `GuiObject`-rendered strings inside `game/src`
`[research: bridge/schema.mjs]`. **A store description is not one of the ten either**, so the same
ruling reaches it and I say which: none of the four mechanical rules binds this text; `bannedWords`
does, by M-B; `theme/tone/02`'s humor ban does, by name (*"store copy"*, `[brief: binding]`). No
fetched page states a character limit on the description field, so I invent none. `[unverified]` —
settled by the Creator Hub description field with its counter visible, or an Open Cloud `universes`
resource schema stating `maxLength`.

**Nothing emits any of this.** No emitter writes a name, a description, a genre or a maturity
label; `release.publishChecklist` covers place settings only. A merged `storeListing` reaches
nothing today and gate 4 of `release.provisioning` is where a human types it in. Stated as
`emitter: "none"`, not solved (P8).

### The description, verbatim

| id | line | block |
|---|---|---|
| `S1.L1` | `Clear the overgrowth, find what's buried.` | summary |
| `S1.L2` | `A restoration game. You walk an old ruin, the green clears where you pass, and what was buried under it goes into a permanent index.` | summary |
| `S2.L3` | `24 finds sit in 4 sets of 6. Every set you complete grants a permanent bonus.` | what is in it |
| `S2.L4` | `You move. The clearing happens where you walk.` | what is in it |
| `S3.L5` | `Ground you clear stays clear. It never grows back.` | what stays true |
| `S3.L6` | `Nothing resets. Nothing runs while you are away.` | what stays true |
| `S4.L7` | `All 24 finds can be reached without buying anything.` | cost |

```manifest
{
  "provides": "storeListing",
  "status": "proposed",
  "value": {
    "emitter": "none",
    "emitterNote": "No emitter in this repo writes an experience name, description, genre or maturity label. release.publishChecklist covers place settings only. Every string in this key is typed by a human at release.provisioning gate 1 (description, genre, maturity) and gate 4 (the pass listing). This is gap P8, stated and not solved.",
    "titleSource": "title, owned by marketing/name (wave 7). No line of copy in this key contains the game's name, so every line survives whatever it is called.",
    "description": {
      "renderedAsPlainText": true,
      "headingsRendered": 0,
      "emojiCount": 0,
      "exclamationMarkCount": 0,
      "maxChars": "none",
      "maxCharsReason": "no fetched page states a character limit on the experience description field, and ruling M-B forbids borrowing vocabulary.maxLabelChars. Unverified, not zero. Settled by: the Creator Hub description field with its counter visible, or an Open Cloud universes resource schema stating maxLength.",
      "boundBy": ["vocabulary.bannedWords (ruling M-B)", "theme/tone/02 humor ban (brief: binding, names store copy)", "storeListing.claims T0", "T1 to T10"],
      "notBoundBy": ["vocabulary.maxLabelChars", "vocabulary.casing", "vocabulary.maxSentenceWords", "vocabulary.allowedPattern", "theme/tone/01 P1 to P9"],
      "notBoundByMechanism": "crossCuttingProblems() applies vocabulary rules only over the ten contract paths playerFacingStrings() walks, all GuiObject-rendered strings inside game/src. A store description is not one of them.",
      "sections": [
        { "id": "S1", "role": "summary", "headingRendered": false, "lines": [
          { "id": "S1.L1", "text": "Clear the overgrowth, find what's buried." },
          { "id": "S1.L2", "text": "A restoration game. You walk an old ruin, the green clears where you pass, and what was buried under it goes into a permanent index." }
        ] },
        { "id": "S2", "role": "whatIsInIt", "headingRendered": false, "lines": [
          { "id": "S2.L3", "text": "24 finds sit in 4 sets of 6. Every set you complete grants a permanent bonus." },
          { "id": "S2.L4", "text": "You move. The clearing happens where you walk." }
        ] },
        { "id": "S3", "role": "whatStaysTrue", "headingRendered": false, "lines": [
          { "id": "S3.L5", "text": "Ground you clear stays clear. It never grows back." },
          { "id": "S3.L6", "text": "Nothing resets. Nothing runs while you are away." }
        ] },
        { "id": "S4", "role": "cost", "headingRendered": false, "lines": [
          { "id": "S4.L7", "text": "All 24 finds can be reached without buying anything." }
        ] }
      ],
      "durationClaim": {
        "stated": false,
        "reason": "two live figures exist and they differ by a purchase: 1265 s (21.1 min) at zero products from meta/04's eight-lap table, and 723 s (12.1 min) with Span owned from monetization/01's. A duration in outward copy is a claim whose truth depends on whether the reader has bought something.",
        "alsoUnstableBecause": "meta/04 publishes LAP_TARGET as playtest unknown inside 120 to 200 s and states every footprint rescales with it. pacing is Balance and Tuning's (wave 4) and has not run.",
        "staleFigureNeverUsed": "core-loop/04's minute 11 of session 1 is pre-R-2 and appears nowhere in this key.",
        "reopeningCondition": "Balance and Tuning fixes LAP_TARGET and pacing merges. A duration may then be stated only if it is qualified by product ownership, or if the two figures converge."
      },
      "absenceStatement": {
        "stated": true,
        "surface": "S3.L6",
        "form": "positive. It says what is true instead of denying what is missing.",
        "cannotUseTheWord": "rebirth is in vocabulary.bannedWords, so a denial could not name the system it denies.",
        "covers": ["reset progression", "offline accumulation", "idle earning"]
      }
    },
    "claimRowShape": {
      "purpose": "the row shape every Discovery and Marketing key reuses. T0: a row with no resolving backedBy fails.",
      "requiredFields": ["id", "text", "surface", "backedBy", "check", "truthCondition", "tCleared"],
      "backedBy": "a non-empty array. Every member resolves to a merged or proposed contract key path, an approved sheet id under cid/, or a file path in this repo. A prose citation is not a backedBy.",
      "check": "one runnable assertion over the merged manifest or the repo. A check a reader must interpret is prose and fails.",
      "truthCondition": "the condition under which the row stays true. 'always' means no key, tuning value or purchase can falsify it.",
      "tCleared": "the T1 to T10 ids this row was diffed against. A row clearing zero predicates has not been checked.",
      "imageRowsAlsoRequire": ["captureSource"],
      "imageRowRule": "no captureSource may be game/src/shared/Theme.luau as it ships today (G2, T8). Image rows belong to storeIcon and storeThumbnails, not to this key."
    },
    "claims": [
      {
        "id": "C1",
        "text": "Clear the overgrowth, find what's buried.",
        "surface": "storeListing.description.S1.L1",
        "backedBy": ["05-OUTWARD.md hook line [you accepted: R6 Q1]", "cid/theme/fantasy/02-promise-over-time.md", "collection.className", "collection.sets"],
        "check": "collection.sets holds 4 sets whose relics total 24, and every one is revealed by clearing. The line names no quantity, so it cannot exceed one.",
        "truthCondition": "a first-session promise with a supply of exactly 24 (theme/fantasy/02). It is the store hook and is not restated on any in-game surface as a standing promise.",
        "tCleared": ["T1", "T2", "T3"]
      },
      {
        "id": "C2",
        "text": "A restoration game. You walk an old ruin, the green clears where you pass, and what was buried under it goes into a permanent index.",
        "surface": "storeListing.description.S1.L2",
        "backedBy": ["05-OUTWARD.md positioning [you chose: R4 Q2]", "cid/theme/setting/01-the-ruin.md", "cid/gameplay/mechanics/01-reach-and-pace.md", "collection"],
        "check": "storeListing.discovery.subgenre is not 'Incremental Simulator'; the substrings 'simulator', 'incremental' and 'idle' appear 0 times across every line in storeListing.description.",
        "truthCondition": "always. Clearing on contact and the permanent index are both merged keys.",
        "tCleared": ["T1", "T2", "T4"]
      },
      {
        "id": "C3",
        "text": "24 finds sit in 4 sets of 6. Every set you complete grants a permanent bonus.",
        "surface": "storeListing.description.S2.L3",
        "backedBy": ["collection.sets", "setBonus", "cid/_state.md ruling R-3"],
        "check": "len(collection.sets) == 4; every set's relics array has length 6; the sum is 24; setBonus assigns a permanent axis factor to each of the 4. Every numeral in the description appears in collection and none exceeds it.",
        "truthCondition": "always, by ruling R-3, which declined to grow any of them and said why.",
        "tCleared": ["T1", "T3"]
      },
      {
        "id": "C4",
        "text": "You move. The clearing happens where you walk.",
        "surface": "storeListing.description.S2.L4",
        "backedBy": ["input", "movement", "02-GAMEPLAY.md controls [you accepted: S6 Q3]"],
        "check": "input contains a move verb; no line in storeListing.description names a key, a button, a control or a device. The line does not claim there is nothing to press, because ruling R-1 put buy on a pressable.",
        "truthCondition": "always while input.verbs contains move and clearing is proximity-driven.",
        "tCleared": ["T5"]
      },
      {
        "id": "C5",
        "text": "Ground you clear stays clear. It never grows back.",
        "surface": "storeListing.description.S3.L5",
        "backedBy": ["01-FOUNDATION.md 'Cleared is permanent' [you chose: R2 Q1]", "cid/theme/fantasy/02-promise-over-time.md 'finished work is never asked for twice'"],
        "check": "no merged key contains a regrowth, decay, reset or upkeep field; endgame.forbidden contains no member that would reintroduce one.",
        "truthCondition": "always. This is the outward form of the one promise theme/fantasy/02 rules survives familiarity.",
        "tCleared": ["T1", "T2", "T9"]
      },
      {
        "id": "C6",
        "text": "Nothing resets. Nothing runs while you are away.",
        "surface": "storeListing.description.S3.L6",
        "backedBy": ["01-FOUNDATION.md 'No rebirth. No offline accumulation.' [you chose: R2 Q2]", "endgame.forbidden", "vocabulary.bannedWords"],
        "check": "endgame.forbidden contains rebirth, prestige and offlineAccrual; the two sentences contain zero members of vocabulary.bannedWords.",
        "truthCondition": "always. Both systems were cut as [you chose] and priority 3 closes their return.",
        "tCleared": ["T4", "T9"]
      },
      {
        "id": "C7",
        "text": "All 24 finds can be reached without buying anything.",
        "surface": "storeListing.description.S4.L7",
        "backedBy": ["products.forbidden F17", "products.itemCount", "products.axesSold", "03-META.md 'Permanent multipliers only. Never content access.'"],
        "check": "products.items[].axis is never a collection entry, an area id or a set; products.itemCount == 1 and axesSold == ['radius']; F17's own check passes, i.e. no product clears a patch, completes an area or grants a Find.",
        "truthCondition": "always while 03-META.md's content-access ban holds. It is the one claim in this ledger that no surveyed competitor can make.",
        "tCleared": ["T3", "T10"]
      }
    ],
    "excludedFromDescription": [
      { "id": "E1",  "thing": "any duration, completion time, session length or 'in under N minutes'", "why": "P4. 21.1 min at zero products, 12.1 min with Span owned. A duration is a claim hostage to a purchase and to pacing, which has not run." },
      { "id": "E2",  "thing": "the word relaxing", "why": "P9. All four fetched competitor descriptions open with it. theme/tone/01 released it to the listing; the listing declines it as a differentiation decision." },
      { "id": "E3",  "thing": "any claim about what exists after the twenty-fourth find", "why": "endgame.postTerminalArea.buriesFinds is 0. 'The ground keeps going' is true and is read as 'more to find', which is T1." },
      { "id": "E4",  "thing": "the words simulator, incremental, idle, rebirth, prestige, and the phrase 'unlock new islands'", "why": "the binding positioning line; T4; depths.unlock is previousAreaComplete, so nothing is unlocked by a purchase or a threshold." },
      { "id": "E5",  "thing": "any emoji, glyph or bracketed prefix", "why": "the genre's own tic. Grass ships a leaf, Leaves ships [UPDT] and a leaf, Scrap ships a magnet. The platform permits one or two; the count here is 0." },
      { "id": "E6",  "thing": "a group-join, like, favourite, follow, rate or share prompt", "why": "F15's outward twin. Both fetched competitors ship 'Join the group for in-game boosts' and 'Leave a Like and Favorite'. channels is an empty set." },
      { "id": "E7",  "thing": "any code, or the words code, redeem or promo", "why": "priority 3 excludes codes; liveops/codes ruled no redemption path. Leaves Incremental ships USE CODE: RELEASE in its live description." },
      { "id": "E8",  "thing": "multiplayer, co-op, trading, competition, a shared goal or a leaderboard", "why": "T5. social.mechanicalInteraction is none; sharedState is empty; plotAccess.othersMayEnter is false." },
      { "id": "E9",  "thing": "urgency, scarcity, a discount, a stock count, a countdown or a limited window", "why": "T10, and the platform's guidance against a false sense of urgency and artificial scarcity." },
      { "id": "E10", "thing": "any reason to return: banked progress, accrual, upkeep, something waiting, 'come back tomorrow'", "why": "T9. 03-META.md concedes the pull to return is materially weaker than the reference's." },
      { "id": "E11", "thing": "the pass name, a Robux figure, a price, or any reference to the Store tab", "why": "sheet 04 owns every outward string about Span. A price in the description would go stale on a roadmap X1 move, which ships with no revision." },
      { "id": "E12", "thing": "an update, changelog, patch-notes, roadmap or 'coming soon' section", "why": "sheet 05. No slot is held open for one." },
      { "id": "E13", "thing": "the game's own name", "why": "title has no value. Every line here survives whatever the Name lead recommends and the developer ratifies." },
      { "id": "E14", "thing": "'as shown', 'pictured' or any reference to a screenshot", "why": "G2 and T8. No capture is legitimate from any build that exists." }
    ],
    "blocksMirrored": {
      "rule": "storeListing.discovery, .contentMaturity, .passListing and .updateNotes are amended by sheets 02, 03, 04 and 05. The amending sheet carries the complete block and governs every field in it. The copy below is a deliberate STRICT SUBSET, carrying only the fields a reader of the description needs; on any difference on a shared field, the amending sheet governs and this sheet is revised.",
      "mirrorIsStrictSubset": true,
      "checkedBy": "for every field present in both, the values are equal; no field exists here that is absent from the amending sheet",
      "amendedBy": {
        "discovery": "cid/marketing/store-page/02-genre-and-where-keywords-live.md",
        "contentMaturity": "cid/marketing/store-page/03-age-and-content-settings.md",
        "passListing": "cid/marketing/store-page/04-the-pass-listing.md",
        "updateNotes": "cid/marketing/store-page/05-no-update-notes.md"
      }
    },
    "discovery": {
      "genre": "Adventure",
      "subgenre": "Scavenger Hunt",
      "changeFrequencyLimit": "once every three months",
      "tagField": { "exists": "unverified", "selectableTagCount": 0 },
      "keywordSurface": "storeListing.description.S1",
      "keywordMaxRepeatsPerWord": 1,
      "keywords": [
        { "word": "restoration", "sitsIn": "S1.L2", "status": "true" },
        { "word": "ruin",        "sitsIn": "S1.L2", "status": "true" },
        { "word": "overgrowth",  "sitsIn": "S1.L1", "status": "true" },
        { "word": "clear",       "sitsIn": "S1.L1", "status": "true" },
        { "word": "buried",      "sitsIn": "S1.L1", "status": "true" },
        { "word": "find",        "sitsIn": "S1.L1", "status": "true" },
        { "word": "index",       "sitsIn": "S1.L2", "status": "true" },
        { "word": "sets",        "sitsIn": "S2.L3", "status": "true" }
      ]
    },
    "contentMaturity": {
      "label": "Minimal",
      "questionnaireAnswered": true,
      "eligibleAccountBands": ["Roblox Kids 5-8", "Roblox Select 9-15"],
      "audienceBand": "8-14",
      "categoryCount": 15,
      "categoriesAtNone": 15,
      "unsetConsequence": "Roblox restricts the playability of the experience on the platform for all players.",
      "analyticsUnder13Suppression": "unverified"
    },
    "passListing": {
      "surface": "the Store tab of the experience page",
      "itemCount": 1,
      "statesFactorNumber": false,
      "statesPrice": false,
      "published": false,
      "publishedGate": 4
    },
    "updateNotes": {
      "published": false,
      "entryCount": 0,
      "cadence": "none",
      "surface": "none",
      "titleTagStem": "none"
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Naming work (`title`) | Every line here survives any name. **No line contains the game's name and none reserves a slot for it**, so a title recommendation moves zero strings in this key. If you rule a tagline exists as a separate artifact, `S1.L1` is that tagline's text and must not be published twice on one page. |
| Thumbnail and icon work (`storeThumbnails`, `storeIcon`) | Reuse `claimRowShape` unchanged, and add `captureSource` to every image row. **Do not restate a claim this ledger already carries** — an overlay repeating `C1` is one claim on two surfaces with two `backedBy` arrays that can drift. `E14` forbids any description line referring to an image. |
| Social and Hype work (`channels`, `launchBeats`) | `E6` and `E7` are the description's half of the same closure. If either key ever names a channel, `E6` becomes false and this sheet is revised, not quietly widened. |
| Balance & Tuning (`pacing`) | `durationClaim.reopeningCondition` is the one thing that would let a time figure into outward copy. Until `LAP_TARGET` is fixed, **do not hand this domain a number to publish**. |
| Contract-and-seam work | `storeListing` is proposed with no shape. The rows a schema author needs are `claims[].backedBy` non-empty, `claims[].check` non-empty, `emojiCount == 0`, `exclamationMarkCount == 0`, and the `blocksMirrored` strict-subset equality. **Nothing in this key may emit into `GameConfig`** — it is human-typed at `release.provisioning` gates 1 and 4. |
| Release work (`release.publishChecklist`) | The checklist covers place settings and does not cover the description, the genre or the maturity questionnaire. **Three publish-time steps have no owner**, and gate 1 cannot legitimately complete without them. Requested as new rows there; not written here. |

## Acceptance criteria

1. `storeListing.description` renders exactly 7 lines in 4 sections; the concatenation contains
   **0** emoji, **0** codepoints above U+007E, **0** `!` characters, and **0** whole-word matches
   against `vocabulary.bannedWords` case-insensitively.
2. `storeListing.claims` has exactly one row per line id in `description.sections[].lines[]`, and
   every row has a non-empty `backedBy` array, a non-empty `check`, and a non-empty `tCleared`.
3. The concatenated description contains **0** case-insensitive matches for
   `/relaxing|simulator|incremental|idle|rebirth|prestige|code|discord|group|favou?rite|limited|today only|minute|minutes|hour/`,
   and **0** numerals other than `24`, `4` and `6`.
4. Every numeral in the description resolves against a merged key: `24 == sum(len(collection.sets[i].relics))`,
   `4 == len(collection.sets)`, `6 == len(collection.sets[0].relics)`.

## Flagged to the developer

| item | position |
|---|---|
| **The listing does not call itself *relaxing*.** | `[cid: decided]`, the brief is silent and `theme/tone/01` explicitly released the word. Live alternatives: **(a)** as decided; **(b)** open `S1.L2` with it, which puts the first three words inside the four-game shared sentence; **(c)** use it once in `S3`, away from the summary. I recommend (a). One-line reversal. |
| **No duration is published.** | `[cid: decided]`. The two current figures differ by a purchase (21.1 min unowned, 12.1 min with `Span`), and `pacing` has not run. If you want a figure outward, the honest form is *"about twenty minutes to find all 24, less if you own the pass"*, which advertises the pass inside the description and collides with `E11`. I recommend keeping the field at `stated: false`. |
| **No character ceiling is set on the description.** | `[unverified]`. Nothing fetched states one and M-B forbids borrowing `vocabulary`'s. If the field truncates, the loss is `S4.L7`, which is the one claim no competitor can make — so if you can read the counter, tell me the number and I will reorder the blocks. |

## Not decided here

The genre and subgenre values, the keyword set and where each keyword sits — sheet **02**. The
content-maturity answers, the label and the eligibility band — sheet **03**. Every outward string
about `Span`, including the Store tab name, description, icon constraints and the provisioning
gate — sheet **04**; this sheet's `E11` forbids the description from mentioning any of it. The
update-notes format — sheet **05**. The experience name and any tagline (Name). The icon
(Icon). Every thumbnail, its composition and its `captureSource` (Thumbnails). Whether any channel
or beat exists (Social, Hype). What is in an update (Live Ops — Roadmap). What `Span` costs, what
it multiplies and whether it is sold (`products`). Every lap, footprint and completion figure
(`depths`, `pacing`). Whether `bridge/schema.mjs` grows a shape for `storeListing` and what emitter
would read it (contract-and-seam work).
