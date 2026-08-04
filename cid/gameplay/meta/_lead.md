# Meta & Content — domain index

**Category:** Gameplay · **Wave:** 3 (stage 3) · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `OPEN.md`, `research/grass-incremental.md`,
`research/landscape.md`; `cid/gameplay/_category.md` §05; `cid/_digest.md`; `cid/_contract.md`;
`cid/gameplay/_verified.md`; `bridge/schema.mjs` and `bridge/emit-config.mjs` for the shapes of
the two keys I own; the `## Consequences` sections of `gameplay/core-loop/01`, `02`, `04` and
`05` (their digest cells are truncated and all four border my subject); my own adopted
`meta/01-the-area.md` and `meta/02-the-collection.md`.

## Contract keys

**I own two, and both are already supplied.** `area` (`gameplay/meta/01-the-area`) and
`collection` (`gameplay/meta/02-the-collection`). Both are merged and the shipped game reads
them. I adopt both at their existing numbers and re-assign neither.

**Everything else my subject needs has no key, and that is the job.** Five new sheets, five
proposed keys, one per subject:

| proposed key | what it would hold | why no existing key can hold it |
|---|---|---|
| `setBonus` | which axis each completed set permanently multiplies | wave 2 recorded the carrier gap by name: `modifiers` routes the choice away, `collection` has no `bonus` field |
| `depths` | the area ladder: how many depths, how many areas at each, each area's size/patchCount/spacing, and the unlock rule | `area` is a **single object** — "the one clearable space". Depths 2–4 have no carrier at all |
| `layout` | what one area's interior is made of (authored chunks, composition, repetition) and where its Finds sit among its patches | priority 1 names "chunk shuffling for endless areas"; nothing anywhere carries a chunk |
| `plots` | where a player's area sits relative to their next one and to other players' — pitch, spawn point, facing, slot order | routed to "area-arrangement and plot-layout work" by `social/01`, `social/02` and `mechanics/06`, and owned by nobody |
| `endgame` | the terminal state once the collection is complete: what still fires, and which stated rules stop applying | three approved sheets route 24/24 here and none can hold the answer |

## What the brief gave me

- "**Areas, not zones.** Discrete spaces that are cleared and permanently done." · "**Depth is
  progression** — deeper areas are larger, denser, and hide rarer sets." · "**Endless via
  shuffled authored chunks**, not generation." `[brief: binding]` ← `[you chose: R3 Q2]` +
  `[you chose: R5 Q1]` (`03-META.md`)
- "**Cleared is permanent — overgrowth never returns.** This is the payoff and it is
  load-bearing." `[brief: binding]` ← `[you chose: R2 Q1]` (`01-FOUNDATION.md`)
- "**No rebirth.** Areas *are* the progression. … Reframing it as 'seasons' and making it
  optional were both declined." `[brief: binding]` ← `[you chose: R2 Q2]` (`01-FOUNDATION.md`)
- "10–20 minute active sessions", audience "8–14, mobile-heavy", "motivated by **collection,
  relaxation, completion**" `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`)
- "**Consequence downstream:** content design is the primary creative work on this project, not
  art or marketing." `[brief: binding]` ← `[you chose: R1 Q1]` (`00-CORE.md`)
- "**~24 objects in 4 sets of 6.**" · "**Each set tied to area depth**" · "**Completing a set
  grants a permanent bonus** — this is what makes the collection progression rather than a
  checklist, and it supplies milestones between 0% and 100%." `[brief: soft]` ←
  `[you accepted: R4 Q4]` (`02-GAMEPLAY.md`)
- The objectives ladder — moment/session "**find at least one new relic**"/short-term "complete
  one set"/long-term "24 of 24"/mastery "*none designed*" — and "**With endless areas, the
  collection is the only finishable thing.**" `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`
  (`03-META.md`)
- "**Tuning burden:** discovery rates must be generous enough that a typical session yields at
  least one find, or the stated session objective silently fails. **This is the highest-risk
  tuning in the game**." `[brief: binding]` as a stated risk (`03-META.md`)
- "**No gating mechanism needed** — with rebirth cut, depth is reached by clearing, not by
  hitting a threshold." `[brief: soft]` ← `[I assumed — follows from cutting rebirth; not
  interviewed]`, `OPEN.md §5 #3` names this domain as inheritor.
- "**No mastery layer.** There is no execution skill in proximity-clearing to master. **Stated
  so nobody invents one.**" `[brief: soft]` ← `[I assumed]`, `OPEN.md §5 #5`, inherited here.
- Replayability: "**An unfinished area and a half-empty index.**" · "**Honest weakness:** without
  banked offline earnings, the pull to return is materially weaker than the reference's."
  `[brief: soft]` ← `[you accepted: R3 Q3]` (`03-META.md`)
- "**Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100% completion
  into a purchase.**" `[brief: soft]` ← `[you accepted: R5 Q4]` (`03-META.md`) — binds my
  content because it is the reason content volume can never be sold.
- The priority ordering (`03-META.md`), `[brief: soft]` ← `[I assumed — the ordering]`, treated
  as the fence regardless per `_category.md`. Priority 3 excludes real procgen, rebirth, offline
  accrual, codes, daily rewards, leaderboards, trading, seasons and events. Priority 2 —
  "richer authored chunk variety", "a duplicate-handling refinement", "visitable restored ruins"
  — may be left room for and **may not be described**.

### Parts of my `owns` this game does not have

Stated so verification does not read an absence as an oversight.

- **Quests and missions: none exist.** Nothing in five layers of brief has a quest, a mission,
  an objective giver, a task list or a reward track. The objective ladder in `03-META.md` is
  settled and is not a quest system. **No sheet is assigned and none should be.**
- **Milestones are already the set completions.** "it supplies milestones between 0% and 100%"
  `[brief: soft]`. Their reward-in-kind is sheet `03`; nothing else is a milestone.
- **Mastery: none, and none is to be invented** `[brief: soft]` ← `[I assumed]`.
- **Rebirth: cut** `[brief: binding]`. Not renamed, not optional, not as seasons.
- **Reasons to return: answered** `[brief: soft]` ← `[you accepted: R3 Q3]`, plus
  `core-loop/04`'s saved-position requirement, which is Systems' and Tech's to carry, not mine
  to re-decide. No sheet.
- **Biome *looks*: not mine** (Art & Visuals — Environment). I own how many distinct looks are
  required and how they partition by depth; Art owns what any of them looks like.
- **Post-launch release order: not mine** (Live Ops — Roadmap).

## What the brief did not give me

Every one of these is silence in the brief, routed to the sheet that will decide it. None is
filled here.

1. **How many areas exist, at what depths, and how big each is.** `03-META.md` says depth is
   progression and never says how much of it there is. `area` holds one 120-stud area. → **04**
2. **What makes the next area available.** "No gating mechanism needed" `[I assumed]` does not
   say what makes the next area *appear*, whether depth is a line or a branch, or whether an
   under-buying player may descend. → **04**
3. **Whether `collection.areasPerDepth` stays 1.** The brief never mentions it. `systems/05`
   makes areas **partition** a depth's set (`relicsPerArea × areasPerDepth == |set|`), which at
   6×1 is a no-op and at anything else is the whole shape of the game's length. → **04**
4. **`relicsPerArea` is contradicted by two approved sheets and nobody has noticed.**
   `core-loop/01` criterion 2 asserts `collection.relicsPerArea >= 4`; `theme/fantasy/02`
   criterion 1 asserts `ceil(24 / relicsPerArea) >= 8`, i.e. `relicsPerArea <= 3`, and
   recommends 3. Under `systems/05`'s equality the only legal pairs at a 6-member set are
   (6,1), (3,2), (2,3) and (1,6). **No pair satisfies both.** This is a contradiction between
   two approved sheets in two categories, neither citing the other, and it lands on the one
   value my domain has to set. → **04**, in `## Pushing back`, and **flagged upward here as an
   escalation**: the resolution may require overruling an approved criterion or revising
   "4 sets of 6" `[you accepted: R4 Q4]`, and neither is a wave-3 writer's call to take quietly.
5. **What each completed set grants, in kind.** "Completing a set grants a permanent bonus" is
   the whole of it. → **03**
6. **How many authored chunks exist before shuffling reads as repetition, and how chunks are
   themed by depth.** `03-META.md` leaves both open by name. → **05**
7. **Where the Finds sit inside an area.** `systems/05` fixes *which* names and that placement
   is seed-derived, and routes "whether burial is spatially uniform or spread" to content work.
   The brief never touches it, and it is the surviving half of the game's highest-risk item:
   six Finds clustered in one corner and six spread evenly are the same manifest and different
   games. → **05**
8. **Where a plot sits.** The brief has a shared server and says nothing about geometry.
   `social/02` states three requirements and records that **all three are unsatisfied by the
   shipped build**; `mechanics/06` grows the plot footprint to `area.size + 24`; `setting/04`
   requires zero studs and zero seconds between one part and the next. Three sheets constrain a
   thing no domain owns. → **06**
9. **What the game is after 24/24.** The brief ends at "complete all four sets". `core-loop/01`
   calls the terminal state "a stated rule violation"; `core-loop/02` prices it as losing both
   payoff peaks permanently; `systems/04` closed the economy half ("income continues, buys
   nothing") and named the content half mine. → **07**
10. **Nothing here is named and the brief does not name it.** Depth labels beyond the four set
    labels already in `collection`, and any area title, go through Vocabulary's rules. No sheet
    of mine coins a new place noun; the four place names already exist as set labels
    (Terrace, Cistern, Vault, Spire) and `setting/02-extent` has ruled the places. → all sheets.

## Why 7 sheets

Two are adopted and are not re-planned. The other five are one per proposed key, and each key
has exactly one build consumer: the modifier resolver reads `setBonus`, area generation reads
`depths`, `Layout.luau` reads `layout`, `Plots.luau` reads `plots`, and the cadence predicate
in `config.spec.luau` reads `endgame` to know where it stops applying. I considered three
other splits and rejected all three. **Gating is not its own sheet** — "what makes the next
area available" is a field of the ladder, and a second sheet writing it would be a second sheet
claiming `depths`. **Find placement is not its own sheet** — it is consumed by the same module
that composes chunks, and separating them would let a clustering rule and a spread rule
contradict each other across two keys instead of being reconciled inside one. **The
`areasPerDepth` ruling is not its own sheet** — it is the same decision as the ladder, because
you cannot set an area count without setting lap length, the escalation formula and the
partition equality at the same time. What I would not fold is `plots` into `depths`: they take
their constraints from opposite directions (core-loop's lap band versus social's sightline and
setting's passage rules), and wave 2's verification already named plot pitch as a wave-3
collision with its own owner.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-area` | **Adopted, shipped, not an assignment.** Supplies `area`: the depth-1 clearable space at 120 studs square, 140 patches, 6-stud minimum spacing, labelled East Terrace. |
| 02 | `the-collection` | **Adopted, shipped, not an assignment.** Supplies `collection`: 24 Finds in 4 sets of 6, one set per depth, `relicsPerArea` 6, `areasPerDepth` 1, and the class noun `Find`. |
| 03 | `set-bonuses` | Decide which one of the three upgrade axes — ids `value`, `radius`, `speed`, exactly as `upgrades[].id` spells them — each of the four completed sets permanently multiplies, and whether an axis may be chosen twice; carry it as a proposed key `setBonus` holding one row per set, `{ setId, axis }`, keyed to `collection.sets[].id`, with **no magnitudes** (every factor is Balance & Tuning's, inside `core-loop/02`'s worth band), assert that every row joins an existing set id and that every set has exactly one row, and state in `## Consequences for other work` the exact one-field revision to `02-the-collection`'s manifest (`sets[].bonus`) that would let the schema maintainer collapse this key into `collection` instead — you may not edit `02` yourself. |
| 04 | `the-depth-ladder` | Decide how many depths the game ships, how many areas sit at each, what each area's `size`, `patchCount` and `minSpacing` are at every depth, and what makes the next area and the next depth available; carry it as a proposed key `depths` whose rows are derived from `core-loop/05`'s `size(N)² = min(165·τ(N), 200·τ_tol(N)) / ROUTE_SLACK` rather than from a growth ratio (which that sheet forbids), assert that depth 1's row equals the merged `area` verbatim so the two can never diverge, hold every lap inside `core-loop/04`'s 75–200 s band and `core-loop/05`'s 270-stud footprint ceiling with density non-decreasing and spacing above `movement.baseClearRadius`, and rule explicitly on `collection.relicsPerArea` × `areasPerDepth` — leaving 6×1 standing by silence is not available to you, because `core-loop/01` criterion 2 requires `relicsPerArea >= 4`, `theme/fantasy/02` criterion 1 requires `<= 3`, and `systems/05`'s partition equality allows only (6,1), (3,2), (2,3), (1,6) at a 6-member set, so whichever you take needs a `## Pushing back` section naming the sheet you overrule, and the value itself moves by a stated revision request against `02`'s manifest, never by being restated in your key. One correction you need: `collection.areasPerDepth` **is** emitted today, as `GameConfig.AreasPerDepth`, so `core-loop/05`'s note that it is not is stale and its predicate can already see whatever you set. |
| 05 | `area-layout` | Decide what one area's interior is made of and where its Finds sit in it: how many distinct authored chunks exist, each chunk's footprint and patch capacity, how a `size × size` area at any depth is composed from them, how the library partitions by depth (you own how many distinct looks are required and which depths share none; Theme & Narrative owns what a look means and Art owns how it looks), the rule that decides when shuffling has stopped hiding repetition, and the spatial rule constraining which patch indices carry the area's Finds — carry all of it as one proposed key `layout` with the chunk count marked `[playtest unknown]` with a test range, keep placement seed-derived and player-independent per `systems/05`, keep the guaranteed first Find on the patch nearest the plot origin per `onboarding/01`, and specify only a priority-1 answer that stands alone: priority 2's "richer authored chunk variety" may be left room for and may not be described. |
| 06 | `plot-arrangement` | Decide where one player's area sits relative to their next one and to every other player's: the slot pitch, the spawn point's position and facing inside the plot, the slot claiming order, and how a plot's footprint changes as `area.size` grows with depth; carry it as a proposed key `plots`, satisfy all three of `social/02`'s currently-unsatisfied requirements (realised spawn-to-spawn separation within its S at every depth, spawn not at the plot centre, spawn facing along the row so an occupied neighbour is in frame at spawn with no input) at `core-loop/05`'s deepest area as well as at 120 studs, keep occupied slots contiguous per `social/01`, and either satisfy `theme/setting/04`'s W3–W4 (two always-open openings per part, zero studs and zero seconds between a part and the next) or contest them in `## Pushing back` naming that sheet — and carry no field that `social` or `traversal` already holds: not collision, not the group name, not the boundary, not the 12-stud walkable margin. |
| 07 | `after-the-last-find` | Decide what the game is once the collection is complete: what the world keeps producing, which of `core-loop/02`'s five payoff kinds still fire when the reveal and set-completion ranks have gone extinct, whether an area past the last set exists and what it buries, and which stated rules stop applying at that point — `core-loop/01` asks for exactly this and says the honest answer may be that the game is finished at 24/24 and its cadence rule stops there; carry it as a proposed key `endgame` naming the terminal condition, the surviving payoff kinds and the predicate scope change, inside the scope gate (naming rebirth, dailies, seasons, leaderboards or codes to forbid them is compliant; reserving space for one is not) and inside `theme/fantasy/02`'s prohibition that whatever exists past the last set must be unlimited and recurring and may never be a second bounded set, list, ladder, page or album. |

**The numbers rule every sheet above works under**, ratified by wave 2's verification: a value
that **is** the shape of a key you own goes in that key's manifest, marked `[playtest unknown]`
with a test range; a tuning coefficient goes to Balance & Tuning as a stated requirement and is
set nowhere else. Sheet `04` is where this bites hardest — the sizes are the shape of `depths`
and belong to you; `ROUTE_SLACK`, `LAP_TARGET` and every cost figure are not.

## Verification note

**The sheet most likely to be contradicted is `04`, and the contradiction is already on disk.**
`core-loop/01` (approved, stage 1) asserts `relicsPerArea >= 4`; `theme/fantasy/02` (approved,
wave 1) asserts `ceil(24 / relicsPerArea) >= 8` and recommends 3; `systems/05` (stage 2, under
revision) makes the product exactly the set size. Whatever `04` picks, one of those three
sheets is contradicted, and the contradicting party will be Core Loop or Fantasy — both
upstream of me, neither reachable by my writer. `_category.md` and the workflow's own checklist
now require a `## Pushing back` section naming the sheet overruled; that is the only legal
output here, and a wave-3 verifier should read a pushed-back `04` as correct rather than
insubordinate.

**Second most likely: `06` against `theme/setting/04-permanence-and-passage`.** Setting's
`does_not_own` reads "Map layout, zones, or level structure (Gameplay — Meta & Content)", and
that sheet has nonetheless ruled the passage topology — two openings per part, zero studs and
zero seconds of travel, both directions always walkable, nothing conditioning passage (its
`W5`, which is also the gating answer `04` is being asked for). I am not reopening it: it is
approved, it is well-argued, and both `core-loop/04` ("the next area must be enterable at the
instant one completes") and `core-loop/05` ("nothing may gate depth on throughput") point the
same way. But a metric arrangement satisfying `social/02`'s spawn separation, `mechanics/06`'s
margin and W4's zero studs simultaneously may not exist, and if it does not, `06` says so and
names the sheet rather than quietly widening a gap.

**On the two adopted sheets.** I believe both are right at what they decided and incomplete at
the edges, and I am recording the edges rather than re-assigning them. `01-the-area` names one
area and calls areas 2–4 "later sheets" — `04` is those sheets, and it must reproduce `01`'s
row exactly rather than restate it. `02-the-collection`'s criterion 4 ("`relicsPerArea` is not
fewer than the largest set, or that set can never complete") is **now false as a general rule**:
`bridge/schema.mjs:252-258` already computes `areasPerDepth × relicsPerArea`, so the invariant
relaxed under it, and `systems/05` has since tightened the comparison to equality. That
criterion is the one line of an adopted sheet I would change, and I am naming it here rather
than having a writer edit a shipped file. `02`'s `[unverified]` note on the noun `Find` also
still stands — the settling search is Roblox for a game whose signature collectible noun is
"Find", and I did not run it because it is Vocabulary's, not mine.

**One stale claim my writer will meet in the digest and should not repeat.**
`core-loop/05` records that "`collection.areasPerDepth` is in `SCHEMA` but is not emitted to
`GameConfig.luau`". It is emitted — `bridge/emit-config.mjs` writes `GameConfig.AreasPerDepth`,
with a comment saying that sheet is why. The request was made and met; only the sheet is stale.

**One thing my domain forces on others, stated as a consequence, not a decision.** If `04`
moves `relicsPerArea` off 6, set completion stops coinciding with area completion, which is
the reason `02` chose 6. `core-loop/02` says that *strengthens* the weight-50 ranking but
deletes the two-beat lap finish and grows the Find-free tail to `1/(k+1)`, which its own 90-second
rule then has to absorb. That consequence belongs to payoff-cadence work, and it is theirs to
act on.

## Research owed

My node's `must_verify`: "Check content volume at launch against two shipping games in the
genre. Under-scoping content is the most common reason a correct loop still fails." Nine pages
fetched, twelve failed. **The headline finding is an asymmetry my domain is currently on the
wrong side of: the shipping collection game I could measure ships very few areas and a very
large collection, and finishing even one area's collection is a 0.4% event. This game ships
four areas and a collection that `core-loop/04` dates at minute 11 of session 1.**

- **DIG (56M visits, 119,871 peak CCU) ships two islands.** "So far there are only 2 Islands in
  the game, with more to come with the official release of the game." Its first island is
  subdivided into named regions (Cinder Shores, Cinder Cavern, Mount Cinder) with four further
  sub-regions inside the cavern — Azure Hollow, Monks Shrine, Solstice Shrine, Spiders Keep — so
  *area* count is small and *place* count inside an area is large.
  [research: https://bloxinformer.com/wikis/dig/islands]
  [research: https://bloxinformer.com/wikis/dig/cinder-island/]
- **DIG gates its second island on collection completion, not on power.** "Once you complete 50%
  of the Cinder Island journal, you'll unlock access to the NPC at the ferry dock… he'll offer
  you a ferry ticket after asking about your progress." A shipping game in the collection genre
  uses *fraction of the index* as the unlock, which is a live alternative for sheet `04`'s
  gating question and is not the one `setting/04` W5 took.
  [research: https://beebom.com/roblox-dig-locations/]
- **Finishing one area's collection is a 0.4% event in a shipping game.** DIG's badge "Journal
  Complete: Cinder Shores" — "You have discovered 100% of the items in Cinder Shores!" — has
  60,426 earners at a 0.4% win rate, and "Journal Complete: Mount Cinder" has 78,433 at 0.4%.
  These are per-*area* completions, not the full 601-item index.
  [research: https://www.rolimons.com/gamebadge/1768992749628648]
  [research: https://www.rolimons.com/gamebadge/2794455631182407]
- **The reference ships one badge and no completion structure at all.** Refetched: 38,488,789
  visits, 578,470 favourites, 96.198% likes, all-time peak 10,435 CCU, current 1,659 (the brief
  recorded 819, so the decay has partially reversed). Its only badge is Welcome, awarded
  16,306,690 times at a 100% win rate. Passes unchanged at 29 / 99 / 99 / 199 / 2,500 Robux,
  plus a 495,130-Robux "Test" pass that is plainly not a product.
  [research: https://www.rolimons.com/game/133086043677134]
- **The reference's island count, single-sourced and low-confidence: five islands, unlocked at
  5 / 25 / 100 / 500 rebirths**, with three grass "mutations" at 10x / 100x / 1000x value. The
  rebirth-gated island structure corroborates the skeleton the brief already has from a second
  source; **the count of five does not, and the same page also lists "quantum cutting mechanics",
  which reads as filler.** Cited as fetched, not as reliable.
  [research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]
- **Two sibling incrementals advertise area unlocking and publish no counts.** Pressure Wash
  Incremental: "[🌎] Unlock New Islands". Leaves Incremental: "Unlock new areas and discover rare
  leaf types" — and its Roblox page reported "There are currently no running experiences", i.e.
  zero live servers at fetch time. Content volume in this family is not publicly stated by its
  own store listings.
  [research: https://www.roblox.com/games/123639373205511/Pressure-Wash-Incremental]
  [research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]

**Already in `cid/_research/pack.md` and directly on my subject**, so my writer has it without
my re-fetching: DIG's Collection is "a detailed in-game logbook" of **601 items** and
"completing a zone unlocks Mounts" — structurally the set-completion bonus sheet `03` decides;
and Fisch's Bestiary carries **per-page completion rewards with thresholds at 70% and 100%**,
which is a shipping precedent for a partial-completion reward this brief does not have.

**What I could not verify, with the fetch that would settle each.**

1. **Per-area journal item counts in DIG** (search summaries report Cinder Shores 36, Mount
   Cinder 34, Cinder Cavern 32, Rooftop Woodlands 23). `[unverified]` — no summary is a source,
   and this brief already records a case where a search summary invented a number for the
   reference. Settled by fetching `dig-it-roblox.fandom.com/wiki/Collection` or a per-area page
   on `bloxinformer.com/wikis/dig/` once one exists; the two I tried 404'd.
2. **The reference's island count and unlock thresholds beyond one weak page.**
   `[unverified]` — settled by `roblox-grass-cutting-incremental.fandom.com` (402 here),
   `deltiasgaming.com` (405), `namu.wiki` (403) or `rosenberryrooms.com` (the brief's own
   source, previously 402), or by a client screenshot of the island menu.
3. **Any area count for Leaves Incremental or Pressure Wash Incremental.** `[unverified]` —
   their store pages carry none and `rolimons.com/game/113380129609386` returns 404. Settled by
   a fan wiki for either, or by an in-client screenshot of the island selector.
4. **Fisch's total bestiary size and per-page counts.** `[unverified]` — `fischipedia.org` (403),
   `fisch.fandom.com` (402) and `sportskeeda.com` (405) all failed this run; the pack's Fisch
   entry from an earlier wave is what survives.

**Hosts that failed, recorded so the next pass does not re-spend on them:** every `fandom.com`
subdomain returned 402 (`roblox-grass-cutting-incremental`, `grasscuttingincremental`,
`dig-it-roblox`, `fisch`); 403 from `namu.wiki`, `fischipedia.org`, `progameguides.com`,
`itemlevel.net`, `gamezebo.com`, `droidgamers.com`; 405 from `deltiasgaming.com` and
`sportskeeda.com`; 307 from `techwiser.com`; `romonitorstats.com` rendered an empty page.
`roblox.com`, `rolimons.com`, `beebom.com`, `bloxinformer.com` and `ofzenandcomputing.com` all
answered.
