# 03 — The tagline

**Domain:** marketing/name · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**Yes, one tagline exists, and it is the brief's line unchanged: `Clear the overgrowth, find
what's buried.`** It is a **project artifact, not a platform field** — Roblox exposes a name
field and a description field and no tagline field. It is a **first-session promise with a
supply of 24**, counted as `sum(len(collection.sets[i].relics))`, it appears in outward
artifacts only, and it appears **zero times** in `game/src`.

## Why

**The tagline is not the title, and this domain's whole occupancy finding is why.** Sheet `01`
eliminated `Clear the ___` (five shipping titles) and `Find the ___` / `buried` (the most
crowded neighbourhood on the platform) **as title material**, because a title is an index entry
competing against every other index entry in the same shape. A tagline is not indexed as a
title, is never the thing a search matches on, and is read once by a person already looking at
the page. **The words the title cannot afford, the tagline can** — and that split is the reason
the domain has two strings rather than one. `[cid: decided]`

**Whether a tagline exists at all was genuinely open** (`G2`). `05-OUTWARD.md` calls the line
the *"discovery hook"* and never calls it a tagline, and no platform field holds one. Three live
answers: the line is absorbed into the description's first sentence and nothing is named a
tagline; the line is a named artifact several surfaces consume; or there is no tagline and each
surface writes its own. **The middle one, because three surfaces need this string and none of
them owns it.** A description opener, a thumbnail overlay and a trailer brief writing the same
promise three times is exactly how a claim drifts into a lie, and `T0` needs one row to check,
not three. Naming it gives the critic one string with one `backedBy`.

**Unchanged, not narrowed.** `theme/fantasy/02` already did the narrowing and did it to the
line's *lifetime* rather than its words: *"The line itself is untouched and stays the store
hook. What I overrule is its lifetime: its second half has a supply of exactly 24 … A promise
with a countable supply is a first-session promise."* Its instruction to this category is
verbatim binding on me — the line *"stays as the store hook and is a first-session promise with
a supply of 24"*, it *"may not be restated on an in-game surface as a standing promise"*,
*"no line may promise endless new things to find"*, and *"no line may promise a world that ends
up reclaimed"*. Rewriting the words would reopen a decision an approved sheet closed correctly.
The brief's own reasoning for the line is also intact: *"The buried half is the differentiator
no competitor can claim"* `[brief: soft]`, and `research/landscape.md` still shows nothing in
the family with a hidden-object collection layer.

**The supply of 24 is derived, not stored, and this sheet had that wrong.** There is **no
`collection.total` field.** The merged `collection` key holds `className`, `classPlural`,
`relicsPerArea`, `areasPerDepth` and `sets`, and the four sets — `Terrace`, `Cistern`, `Vault`,
`Spire` — hold six named Finds each, counted on disk this run at `meta/02:62-67`
`[research: cid/gameplay/meta/02-the-collection.md]`. 4 × 6 = **24**. The supply is
`sum(len(collection.sets[i].relics))`, the same expression `store-page/01` uses in its own `C3`
check (`store-page/01:215`) and states as a rule at its `countPathRule` (`:166`). Every
`backedBy` and every `check` below names the derivation rather than a field that does not exist.

**And `collection` does not gain a derived total, in any spelling.** `[cid: decided]`, applying
the cross-category ruling this run. A derived `total`, `totalFinds` or `totalRelics` duplicates
data already present in `collection.sets` and can therefore disagree with it, which is a worse
failure than the recompute it saves — the sum is four array lengths and `HudBinding.luau:370-376`
already recomputes it per bind. **Consequence: the `collection.totalRelics` field HUD readout
work marks `"requested"` is refused**, and every site reads the sum.

**Verified against all four predicates a hook can trip.**

| id | predicate | verdict | why |
|---|---|---|---|
| `T1` | endless, ongoing or more things to find | **passes** | the line names no quantity and no continuation; *"find what's buried"* is bounded by the derived supply of 24 and ruled a first-session promise by `theme/fantasy/02` |
| `T2` | the world ends up restored, reclaimed or finished | **passes** | both clauses are imperative acts, not outcomes; the line contains no *restore*, *reclaim*, *rebuild* or *complete*. `01`'s `predicateReadings` settles the reading of `T2` with store-listing work |
| `T9` | a reason to return the design gave up | **passes** | no banked progress, no accrual, no upkeep, nothing waiting; `03-META.md`'s own *"honest weakness"* is not contradicted |
| `T10` | urgency, scarcity, discount or limited time | **passes** | no timer, no count, no *limited*, *new*, *ends in* or *today only* |

**And against canon.** `theme/lore/01` rules the place *"was never lost, only overgrown"* and
that the builders *"finished and went"*. *"What's buried"* is worn tools and fittings under
green, which is true; it is not a lost civilisation, and `05-OUTWARD.md` had already declined
*"Uncover a lost civilisation"* for a different reason. **The one word I checked hardest is
`buried`**: `theme/setting/01` makes this a stone works, not a tomb, and nothing in the line
implies interment. It survives. `[cid: decided]` on the canon reading.

**It clears the mechanical filters that do reach it.** No `vocabulary.bannedWords` entry —
notably it does **not** say `treasure`, which the brief's own hook never reached for and which
`theme/vocabulary/02` bans. It matches `allowedPattern` `^[A-Za-z0-9 ,.'%%/-]+$` and it is not
funny, which `theme/tone/02`'s ban on funny store copy makes `[brief: binding]`.

**Where it stops.** The tagline is one sentence, 41 characters, used verbatim or not at all. A
surface that wants a shorter form does not shorten it — it uses the title instead. That rule
exists because a truncated promise is a different promise, and the truncation *"find what's
buried"* alone reads as an endless supply, which is `T1`.

**One thing this line does not do**, stated because a store page will want it to: it does not
say the game has no rebirth and no idle, and `CONCEPT.md` argues that genre-literate players
*"will otherwise arrive expecting rebirth and idle and not find them"* `[brief: binding]` on the
positioning. That disclosure is a description decision, not a tagline decision, and putting it
in the hook would trade the differentiator for a negation. Routed, not solved.

```json
{
  "amends": "title",
  "value": {
    "tagline": {
      "exists": true,
      "text": "Clear the overgrowth, find what's buried.",
      "chars": 41,
      "source": "05-OUTWARD.md, [you accepted: R6 Q1]",
      "ruling": "unchanged",
      "rulingAlternativesDeclined": [
        { "option": "narrowed, e.g. dropping the second clause", "why": "the buried half is the differentiator no competitor can claim; dropping it leaves the Clean the ___ promise five shipping titles already make" },
        { "option": "absent, each surface writes its own", "why": "three surfaces consuming one unnamed promise is how a claim drifts; T0 needs one row, not three" },
        { "option": "rewritten to avoid find and buried", "why": "those words are eliminated as title material only; a tagline is not indexed as a title" }
      ],
      "isPlatformField": false,
      "platformFieldsThatExist": ["name", "description"],
      "usage": "verbatim or not at all; a surface needing something shorter uses title.value instead",
      "truncationForbidden": true,
      "truncationReason": "the second clause alone reads as an endless supply, which is T1",
      "promise": {
        "kind": "firstSession",
        "supply": 24,
        "supplyDerivation": "sum(len(collection.sets[i].relics)) over the 4 sets of 6",
        "supplyBackedBy": ["collection.sets", "cid/gameplay/meta/02-the-collection.md"],
        "supplyFieldRuling": {
          "derivedTotalFieldAdded": false,
          "spellingsRefused": ["total", "totalFinds", "totalRelics"],
          "because": "a derived total duplicates data already present in collection.sets and can therefore disagree with it; the sum is four array lengths and HudBinding.luau:370-376 already recomputes it per bind",
          "everySiteReads": "sum(len(collection.sets[i].relics))",
          "refuses": "the collection.totalRelics field ui-ux/hud/02 records as requested"
        },
        "lifetimeRuledBy": "cid/theme/fantasy/02-promise-over-time.md",
        "mayNotBeRestatedInGame": true,
        "mayNotPromiseEndlessFinds": true,
        "mayNotPromiseAReclaimedWorld": true
      },
      "claims": [
        { "id": "G1", "claim": "clearing overgrowth reveals objects the player keeps", "backedBy": ["collection.sets", "onboarding", "discovery"], "check": "len(collection.sets) == 4 and sum(len(collection.sets[i].relics)) == 24; onboarding guarantees a find in the first area; discovery holds a per-Find permanent record", "truthCondition": "a first-session promise with a supply of exactly 24 (theme/fantasy/02); it is the store hook and is not restated on any in-game surface as a standing promise", "tCleared": ["T1", "T2", "T3", "T9", "T10"] },
        { "id": "G2", "claim": "there is overgrowth to clear", "backedBy": ["tiers", "patch", "cid/theme/setting/01-the-ruin.md"], "check": "tiers is non-empty and patch defines a clearable footprint", "truthCondition": "always", "tCleared": ["T1", "T2"] }
      ],
      "predicateChecks": [
        { "predicate": "T1", "verdict": "pass", "why": "no quantity and no continuation is named; the supply is 24 and is derived in this key rather than claimed in the line" },
        { "predicate": "T2", "verdict": "pass", "why": "both clauses are acts, not outcomes; contains none of restore, restored, reclaimed, rebuilt, finished, complete" },
        { "predicate": "T9", "verdict": "pass", "why": "names no banked progress, accrual, upkeep or waiting thing" },
        { "predicate": "T10", "verdict": "pass", "why": "contains no timer, count, limited, new, ends in or today only" },
        { "predicate": "canon", "verdict": "pass", "why": "theme/lore/01: never lost, only overgrown. Buried means under green, not interred; theme/setting/01 makes this a works, not a tomb" },
        { "predicate": "bannedWords", "verdict": "pass", "why": "contains none of relic relics tier artifact antique rebirth loot treasure" },
        { "predicate": "humorBan", "verdict": "pass", "why": "theme/tone/02, [brief: binding] on store copy; the line is flat and declarative" }
      ],
      "consumers": [
        { "surface": "the experience description", "key": "storeListing", "owner": "store-listing work", "rule": "verbatim, once; layout and position are that lead's. It already ships as storeListing.description.S1.L1" },
        { "surface": "any thumbnail text overlay", "key": "storeThumbnails", "owner": "thumbnail work", "rule": "verbatim or absent; composition is that lead's" },
        { "surface": "a trailer brief, if one exists", "key": "launchBeats", "owner": "hype work", "rule": "verbatim or absent; whether a trailer exists is that lead's" }
      ],
      "forbiddenSurfaces": [
        { "surface": "any GuiObject string in game/src", "count": 0, "why": "theme/fantasy/02: the line may not be restated on an in-game surface as a standing promise", "check": "grep -ri \"find what's buried\" game/src returns nothing" },
        { "surface": "the experience name field", "count": 0, "why": "sheet 02 rules the name field holds title.value and nothing else" },
        { "surface": "a loading screen, tip or changelog", "count": 0, "why": "same as the in-game rule; theme/tone/02 extends the register ban to all three" }
      ]
    }
  }
}
```

## Consequences for other work

- **Store-listing work** takes the tagline verbatim as the description's promise and **may not
  extend it**. Concretely: no sentence anywhere in the description may state or imply that new
  things keep being found, because the supply is 24 and `theme/fantasy/02` ruled the promise
  first-session. Whether the absence of rebirth and idle is disclosed is theirs; it is not in
  this line and must not be bolted onto it. Its `C1` and this key's `G1` are the same promise
  and must keep the same `truthCondition`.
- **Thumbnail work** gets a text-overlay string it does not have to write, and a prohibition on
  shortening it. It also gets the harder half of the collision: the second clause is the one
  `05-OUTWARD.md` illustrated with *"a relic mid-reveal"*, and `T6` says a Find has no form. The
  **line survives that collision; the image may not**. Gap `M1` is still theirs.
- **Hype work**: if a trailer brief exists, this is the only promise it may make. If it rules no
  trailer exists, nothing here is orphaned, because the description consumes the string anyway.
- **In-game string owners** gain one grep they must keep passing: this sentence appears zero
  times in `game/src`. Restating it in the HUD converts a first-session promise into a standing
  one.
- **Content-volume work (`collection`)**: `G1` points at `collection.sets`, not at a scalar. If a
  set's roster ever changes size, `promise.supply` is re-derived and the claim is re-checked,
  never reworded. **No sheet may add a derived total in any spelling** — `total`, `totalFinds`
  or `totalRelics` — and the ground is duplication, not cost.
- **HUD readout work** loses the `collection.totalRelics` field it records as `"requested"`. The
  substitute is the sum, which `HudBinding.luau:370-376` already computes locally.
- **The cross-category pass** carries what is left: read this run, every leaf sheet has moved to
  the sum form, and one domain index — `liveops/events/_lead:101` — still cites
  `collection.total == 24` as a check. That is the last live occurrence in `cid/`.

## Acceptance criteria

1. `title.tagline.text` is exactly `Clear the overgrowth, find what's buried.` — 41 characters,
   matching `^[A-Za-z0-9 ,.'%%/-]+$`, containing no entry of `vocabulary.bannedWords`.
2. `title.tagline.claims` has at least one row and every row carries a non-empty `backedBy`, a
   non-empty `check` and a non-empty `tCleared`; `predicateChecks` carries a verdict for each of
   `T1`, `T2`, `T9`, `T10`.
3. `grep -ri "find what's buried" game/src` returns zero matches.
4. `title.tagline.promise.supply` is `24` and equals `sum(len(collection.sets[i].relics))` over
   `collection.sets`; and no `backedBy`, `check` or `supplyBackedBy` value anywhere in this
   sheet's fence contains the string `collection.total`.

## Not decided here

The title string, the candidate set and the alternates: sheet `01`, which carries the `title`
manifest. What the name field may contain and when it may change: sheet `02`. The description's
structure, every other sentence in it, the tag set, the genre field and whether the absence of
rebirth and idle is disclosed outward: store-listing work. Whether a thumbnail carries text at
all, its position, size and typeface, and what a Find looks like given it has no form: thumbnail
work and icon work, holding gap `M1`. Whether a trailer exists: hype work. The in-game wording
of anything the player reads while playing: `theme/vocabulary` and each string's owning domain.
The one remaining live citation of `collection.total` — `liveops/events/_lead:101`, a domain
index rather than a leaf sheet, and not mine to edit: the cross-category pass.
