# 04 — No-cast declaration

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**This game contains nine classes of entity: none of them.** No NPCs, no enemies or guardians, no
vendors, no quest-givers, no named characters, no factions, no companions or pets, no spirits of the
makers, no mascot. The only beings in this world are the players themselves. Each exclusion below
cites the constraint that produces it, and the question reopens on exactly one condition: a
developer-authored change that names an entity class as funded content.

**No manifest block. Identity owns no build-contract key**, so this sheet adds nothing to the
manifest and is instead a statement of what will never appear inside one.
`[research: bridge/schema.mjs, read this run]`

## Why

**The general argument, in one line:** the roster is 24 objects and nothing else, there is no surface
for anything to say, priority 1 funds no character work, and an entity with intent would be the only
intent in a world whose tension is zero by design. Each row below is that argument specialised.

| # | class excluded | excluded by, quoted | tag |
|---|---|---|---|
| 1 | **NPCs**: any non-player entity that speaks, gestures, or responds | *"No text, no tutorial."* (`02-GAMEPLAY.md`) and the screen list *"`collection-index`, `upgrades`, `areas`, `shop`"* (`04-PRESENTATION.md`), which has no dialogue surface. Hardened by the contract: the only free-prose player-facing field in all eleven keys is `upgrades[].blurb`, of which there are three. An NPC that cannot say anything is scenery; one that can needs a surface and a key that both do not exist. | `[brief: soft]` `[you accepted: R6 Q3]` + `[research: bridge/schema.mjs]` |
| 2 | **Enemies, bosses, and any guardian of a depth** | *"There is no failure state. No death, no losing, no loss of progress"* and *"Zero tension is deliberate"* (`02-GAMEPLAY.md`), elevated to *"Tension is zero by design, confirmed deliberately ... Do not invent tension to fill the gap."* (`HANDOFF.md`, one of six things to know before designing anything). An enemy that cannot harm is not an enemy; one that can contradicts the elevated line. | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated by the handoff |
| 3 | **Vendors, shopkeepers, merchants** | The purchase surface is already a screen: *"`shop` \| 2 \| the multiplier SKUs"*, and *"The build stage currently produces only centred dismissible panels holding a grid of items"* (`04-PRESENTATION.md`). Also *"Input: movement only. No aiming, clicking, or ability buttons. One thumb."* (`02-GAMEPLAY.md`) leaves no interact verb for a person to answer. A vendor is a panel this game already has, wearing a body it cannot afford. | `[brief: soft]` `[you accepted: R5 Q2 / step 6 Q3]` |
| 4 | **Quest-givers, mission assigners, guides** | Every objective in the game is a count the player can read off the collection: *"find at least one new relic"*, *"6 of 6 in a set"*, *"24 of 24"*, and *"mastery \| none designed"* (`03-META.md`). Plus *"No mastery layer ... Stated so nobody invents one."* Nothing here needs to be assigned, and *"there are no quests in scope at all"* (`cid/theme/_category.md`, relaying the workflow's ownership split). | `[brief: soft]` `[you accepted: R6 Q3 → R5 Q3]`; the mastery line is `[I assumed]` (`OPEN.md §5 #5`) |
| 5 | **Named characters**: any being carrying a proper noun | *"~24 objects in 4 sets of 6."* (`02-GAMEPLAY.md`) is the entire content roster, and *"the objects themselves are invented downstream"*. Downstream has now filled it: all 24 entries in `collection.sets[].relics` are objects a mason or a clerk left behind (`cid/gameplay/meta/02-the-collection.md`). There is no second roster and no key for one. | `[brief: soft]` `[you accepted: R4 Q4]` + `[research: bridge/schema.mjs]` |
| 6 | **Factions, orders, tribes, any second party** | *"Shared server, parallel progression, own areas, no mechanical interaction."* (`02-GAMEPLAY.md`) gives the world exactly one kind of occupant, and the category gate forbids *"any fiction of exchange, gifting, rivalry, ranking, or comparison between players"* (`cid/theme/_category.md`, derived from priority 3). A faction needs two parties to be a faction of. **This row has an amendment path, below; it is not a reopening.** | `[brief: soft]` `[you accepted: R6 Q2]`; the trading half is binding by *"no mechanical interaction"* |
| 7 | **Companions and pets**, including any paid, hatched, levelled or cosmetic follower | Four constraints, and the cosmetic one is decisive: *"Cosmetics-only was offered and declined as needing a display system first."* (`03-META.md`) A companion is the most expensive display system in the genre. Next: **priority 1** is *"proximity clearing · area-completion detection · three clearing upgrades · the 24-relic 4-set collection · chunk shuffling for endless areas · guaranteed first-area find"* and funds no body. Next: a companion that grows imports a fourth power axis, and *"Relic luck as a fourth axis was offered and declined"* (`02-GAMEPLAY.md`); one that must be fed or maintained imports a thing that worsens while away, against *"Nothing regrows, so nothing can accrue while away"* (`01-FOUNDATION.md`). Last: one that grants a find, set or area is *"Forbidden: any paid area, relic, or set"* (`03-META.md`). **What a companion buys that a multiplier does not is a face, and the face is the entire unfunded, unkeyed part of it.** | `[brief: soft]` `[you accepted: R5 Q4]` and `[brief: soft]` `[I assumed — the priority ordering]`; the paid-content half is `[you accepted: R5 Q4]` and load-bearing |
| 8 | **Spirits, revenants, or any present form of the ruin's makers** | *"Tone note: warm and unhurried, not spooky. This is reclamation, not a haunted place."* (`04-PRESENTATION.md`), restating *"Not spooky, not grim"* (`01-FOUNDATION.md`). This is the exclusion most likely to be reached for, because history work needs someone to have built the place. The makers may be named; they may not be present. | `[brief: soft]` ×2 (`[you accepted: R2 Q3 / R6 Q2 → R5 Q2]`) |
| 9 | **A mascot**: a face on the icon, thumbnail, or store art | The thumbnail's composition is already decided and has two halves, neither of which is a creature: *"It gives a thumbnail two composable halves, a cleared path through green, and a relic mid-reveal."* (`05-OUTWARD.md`) A mascot displaces one of them. And distinction is located elsewhere by a binding decision: *"The hidden-collection layer, not the noun."* (`00-CORE.md`) A face cannot be this game's differentiator for the same reason a noun cannot. | `[brief: soft]` `[you accepted: R6 Q1]` + `[brief: binding]` `[you chose: R1 Q1]` |

**What this sheet does not exclude, stated so it cannot be miscited.** Other players exist and are
visible; what they *are* in the fiction is sheet `03`, and what they may *do* is presence-sufficiency
work. The player's own body exists; sheet `02` owns what it must survive. A depicted being is inert
matter and is not an entity class: a carved figure, an effigy, a portrait or a name cut into stone
breaks nothing here, and whether one exists is object work and place work, not mine. Ambient living
matter (moss, vines, and whatever else is alive here) is place-inventory work's column to fill.
`[cid: decided]`

**One contract correction, from reading `SCHEMA` this run.** My domain index says the schema has ten
keys and that no `theme/*` domain owns one. It now has eleven, and `vocabulary` is owned by
`theme/vocabulary`. Identity still owns none, so nothing in this sheet changes, but the index line is
stale. `[research: bridge/schema.mjs]`

## The single reopening condition

**A developer-authored artifact names an entity class as funded content.** Concretely, one of two
forms, and nothing else counts:

1. `03-META.md`'s priority 1 or priority 2 list gains an entry naming a being, or
2. a developer decision recorded with the same provenance weight as the tone decision of
   2026-07-30 (*"developer, in session, outside the sheets"*) names one.

**Test:** diff `concept/spec/incremental-spinoff-v2/03-META.md` against the committed version, or
point at the recorded session line. If neither exists, the sheet holds and no CID agent at any wave
reopens it. `[cid: decided]`

**Three things that are explicitly not the condition,** because each is the pressure this sheet was
written to absorb:

- *"The premium SKU has no home."* (`03-META.md`, `OPEN.md §6`) A homeless SKU is a monetization
  problem and a companion is the genre's reflex answer to it, not a reason. See the consequence for
  premium-SKU work.
- *"whether presence alone suffices, and the cheapest warmth-adding touch if not"* (`02-GAMEPLAY.md`)
  resolving to "not". A warmth touch at *"zero systems cost"* cannot be a body; a body is the most
  expensive touch available.
- An icon needing a subject. The thumbnail already has two.

**The amendment path for row 6, which is not a reopening.** If history work names the ruin's makers
as a collective, row 6's wording changes from "no factions" to "exactly one group exists in the
fiction: extinct, absent, zero present members, zero entities". That is a bookkeeping change to one
row. It grants nothing to rows 1 through 5 or 7 through 9, and row 8 continues to forbid the makers
having a present form. `[cid: decided]`

## Consequences for other work

- **Premium-SKU work** *(currently Monetization, wave 3)*: the high-price SKU's deliverable must be a
  permanent multiplier on one of the four quantities `03-META.md` already allows (clearing value,
  radius, move speed, relic luck); a body is not available and a cosmetic follower is doubly
  excluded. **The alternative that does not reopen this sheet:** the reference's own high-price item
  was *"a 2,500-Robux oversized tool"*
  `[research: research/grass-incremental.md, the brief's fetch, not mine]`, and a tool is an object,
  not a being. A tool ladder was never specified, which is a genuine hole, but it is a hole in
  Systems' and premium-SKU work's territory and it is cheaper than a cast in every dimension.
- **Store-art work** *(currently Discovery & Marketing, wave 5)*: the icon and thumbnail have no
  mascot and no face other than a player avatar. Composition is the brief's two halves.
- **History work** *(currently Lore Lead, same wave)*: you may name the makers; you may not stand one
  up. Row 8 is the boundary and row 6 is your amendment path.
- **Place-inventory work** *(currently Setting Lead, sheet `05`, same wave)*: your absent column and
  this sheet must not disagree. You decide whether anything is alive here as world matter; I decide
  that nothing here is a party the player relates to. If your present column admits an animal the
  player can feed, follow, name or be followed by, that is row 7 and it needs the reopening
  condition, not your sheet.
- **Presence-sufficiency work** *(currently Multiplayer & Social, wave 2)*: the warmth touch, if you
  add one, is a player-to-player or environmental signal. It may not be an entity.
- **Set-completion-bonus work and past-completion content work** *(currently Meta & Content, wave 3)*:
  the answers to "why does the place continue past the fourth set" and "how does a place grant a
  bonus" may not be a being at the bottom of it. Route to the place's own law instead.
- **Module-planning work** *(currently Tech & Data)*: no `modules[]` entry exists or is needed for
  spawning, pathing, animating or dialoguing a non-player entity, and no contract key should be added
  to carry one. This sheet is the citation if a builder asks.
- **Naming-rules work** *(currently Vocabulary Lead, same wave, and the last writer)*: this sheet
  coins zero terms, so your canonical list gains nothing from it. But note the enforcement gap:
  `crossCuttingProblems` in `bridge/schema.mjs` makes `vocabulary.bannedWords` the only
  machine-enforced half of any Theme prohibition, and no entity word is on your list.
  **Requirement, your call to accept or refuse:** entries for `pet`, `companion`, `minion` and
  `mascot`, reasoned to this sheet, would make a body reaching a player-facing label fail the merge
  instead of failing a code review. `[cid: decided]`
- **Contract-schema work** *(currently Tech & Data)*: a SKU has no key at all, so a paid companion
  would never fail validation. Monetization's output is prose-only, which means this sheet is
  currently the only thing standing between wave 3 and a pet. Stated as a finding about the seam, not
  a request for a key.

## Acceptance criteria

1. The exclusion table has exactly **9 rows**, and every row's "excluded by" cell contains at least
   one verbatim quotation in quotation marks together with the source file name it came from. A row
   with a paraphrase, or with no file name, fails.
2. Across `cid/**/*.md`, **zero** values inside a ` ```manifest ` block match the case-insensitive
   whole words: npc, vendor, merchant, shopkeeper, enemy, enemies, boss, pet, pets, companion,
   follower, minion, mascot, guardian, spirit, ghost.
3. In the wave-3 SKU sheet, the count of SKUs whose deliverable is a being (character, companion,
   pet, follower, mascot) is **zero**, and every SKU's deliverable is a permanent multiplier on one of
   exactly four quantities: clearing value, clear radius, move speed, relic luck.
4. Naming work's canonical term list contains **zero** entries sourced from this sheet, and this sheet
   introduces zero proper nouns.

## Not decided here

Whether anything is alive here as world matter, and the world's present-and-absent inventory
*(place-inventory work, Setting sheet `05`)*. What a co-present stranger is *(sheet `03`)* and what
one may do *(presence-sufficiency work)*. What the player's body is *(sheet `02`)* and how it looks
*(avatar-treatment work)*. Who the makers were *(history work)*. Where the premium SKU lands and
whether a tool ladder is built *(premium-SKU work and Systems)*. Whether `pet`, `companion`, `minion`
and `mascot` join the ban list *(naming-rules work)*.

## Flagged to the developer

**The brief was never asked whether this game wants a cast.** No interview question across 22
questions and 6 rounds touched NPCs, vendors, quest-givers, companions or pets, and `OPEN.md §1` has
no audit row for any of it. Absence in the brief is not a decision against, so this sheet performs
the conversion and records that it did. `[cid: decided]`

Live alternatives, with the cost of each:

- **No cast** (taken). Costs nothing, forbids nothing the brief funds, and leaves the premium SKU
  where it already was: homeless, but homeless on multipliers, which is a pricing problem rather than
  a scope problem.
- **One silent presence** (a single non-speaking figure somewhere in the ruin). Costs a character
  model in a wave-4 art slot priority 1 does not fund, and buys warmth that presence-sufficiency work
  is already chartered to buy at zero systems cost.
- **A paid companion as the premium SKU's home.** Costs the model, plus a display system the brief
  declined by name, plus either a growth ladder (a declined fourth axis) or a maintenance loop
  (against permanence), and it would be the only entity with intent in a game whose tension is zero
  by design.

**Recommendation: no cast, and give the premium SKU an oversized tool rather than a creature.** That
is the shape the reference actually sold, it is an object rather than a being, and it needs no
revision to this sheet.
