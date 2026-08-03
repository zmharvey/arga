# Fantasy — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md`, `research/landscape.md`, `research/grass-incremental.md`; `cid/theme/_category.md`;
`bridge/schema.mjs` + `bridge/merge.mjs` (the build contract); the sheets on disk under
`cid/gameplay/`, `cid/art/`, `cid/tech/`; `cid/theme/tone/_lead.md` (boundary check).

**This index has been revised twice.** The first revision cut six planned sheets to three. The second
— this one — replaces the domain's contract rule, which was wrong in the same way wave 1's whole
output was wrong.

---

## Build contract

**Every sheet in this domain now carries a data form.** The previous version of this section said
*"No sheet in this domain may carry a `manifest` block"*, on the reasoning that a register is not a
value and the schema had no key for one. The first half is still true; the second half had the
causality inverted. The contract is small because most domains have not run, and it is supposed to
grow by roughly one key per domain. A decision that reaches the build only as prose reaches it by
being re-interpreted, and interpretation is the failure this pipeline exists to remove.

| sheet | data form | key | why that key |
|---|---|---|---|
| `01-fantasy-of-record` | `amends` | `vocabulary` (owner `theme/vocabulary`) | a register is a promise, not a value; its one machine-holdable half is a word list, and `crossCuttingProblems` tests every player-facing string against `vocabulary.bannedWords` |
| `02-promise-over-time` | `amends` | `endgame` (owner `gameplay/meta`) | everything this sheet decides about the state past the last Find is already carried there — `gameEnds`, `collectionEnds`, `risingQuantity`, `postTerminalArea`, `forbidden[]` |
| `03-inhabiting` | `manifest`, **proposed** | `assurances` | six named invariants each with a counted violation is data, and no existing key holds them: `response` governs one beat, `modifiers.factorFloor` covers a sliver of `C3`, and nothing covers *"no yield term reads route or order"* |

**One proposed key for the domain, not one per sheet.** `assurances` is the only subject in Fantasy
with a shape a build step could read. The other two sheets amend keys that already exist, which is
the honest answer where a neighbour already carries the decision.

**The contract is 26 keys.** None of them holds a register, a promise or a feeling, and none is owned
by `theme/*` except `vocabulary`. `[research: repo — bridge/schema.mjs, read this run]`

**This domain is not sealed off from the build, and the route matters.** Four keys others own carry
*strings* — `area.label`, `tiers[].name`, `upgrades[].label` and `.blurb`, `collection.sets[].label`
and `.relics`. Those strings are the only place a fiction decision becomes a thing the build renders.
So this domain's value is realised as a **constraint the owners of those string fields can check
their strings against**, plus one proposed key.

---

## What the brief gave me

**Binding. I may not overrule any of it.**

| constraint | tag |
|---|---|
| *"**The hidden-collection layer, not the noun.** ... So the theme is a **vehicle**, and the distinguishing system is objects revealed by harvesting that enter a set-structured permanent index."* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q1]` |
| *"**Differentiation as an end in itself**"* listed as a **non-goal** (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q3]` |
| *"**8–14, mobile-heavy, short sessions.** ... casual but **genre-literate** ... motivated by **collection, relaxation, completion**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q1]` |
| *"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both declined."* · *"**No offline accumulation.** Nothing regrows, so nothing can accrue while away."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q2]` |
| *"A **restoration / completion game**, not an incremental"* (`CONCEPT.md`) / *"this is being marketed as a **restoration game, not an incremental**"* (`05-OUTWARD.md`) | `[brief: binding]` `[you chose: R4 Q2]` |
| *"**This game exists to prove the `arga` pipeline works end to end.** ... Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q3]` |
| *"**Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a pun."* | `[brief: binding]` — **developer, in session 2026-07-30, not in any sheet.** Tone Lead owns the decision; it bounds how these three sheets are worded |

**Soft. Overruled only with a stated reason.**

| constraint | tag |
|---|---|
| *"**An overgrown ruin being reclaimed.** Cut back vines and moss from ancient stone."* (`01-FOUNDATION.md`) and the `CONCEPT.md` expansion *"the clearing *is* the revealing — what you uncover is what you keep"* | `[brief: soft]` `[you accepted: R2 Q3]` |
| *"**Clearing and discovering are one action.** Do not design them as separate systems."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits R2 Q3) |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, **not a power fantasy**."* (`01-FOUNDATION.md`); *"warm and unhurried, not spooky. This is reclamation, not a haunted place."* (`04-PRESENTATION.md`) | `[brief: soft]` ×2 |
| *"**Clear the overgrowth, find what's buried.**"* — *"A dual promise"*, with *"Pure 'restore the ruin' was declined for underselling the collection"* and *"'Uncover a lost civilisation' was declined because the verb disappears"* (`05-OUTWARD.md`) | `[brief: soft]` `[you accepted: R6 Q1]` — **two register candidates were already refused by name at hook-line level** |
| *"**Clear → reveal inside the first ten seconds.** ... the first patch they clear has something under it. **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` |
| *"**There is no failure state.** ... **Zero tension is deliberate.** Satisfaction comes from before/after and discovery, nothing else. **Consequence: audio and visual feedback carry the entire load** — and nobody downstream should invent tension to fill the gap."* (`02-GAMEPLAY.md`), elevated by `HANDOFF.md` | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated |
| session objective *"find at least one new relic"*; long-term *"complete all four sets"*; *"**With endless areas, the collection is the only finishable thing**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q3 → R6 Q3]` |
| *"**An unfinished area and a half-empty index.**"* and *"**Honest weakness:** without banked offline earnings, the pull to return is materially weaker than the reference's."* (`03-META.md`) | `[brief: soft]` `[you accepted: R3 Q3]` |
| *"**Permanent multipliers only. Never content access.** ... **A paid-only object would turn 100% completion into a purchase**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q4]` |
| *"**`ui-forge` vibe key: `fantasy-ornate`** ... ornamented, warm, aged, crafted. Stone and foliage, not candy."* and reason 1, *"**Relics must read as treasure.**"* (`04-PRESENTATION.md`) | `[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]` |
| *"**Depth is the progression read** — further in means denser overgrowth and rarer finds"* (`01-FOUNDATION.md`); escalation moves *"from **tool power** to **time and patience**"* | `[brief: soft]` / `[I assumed]` |
| *"**No mastery layer.** There is no execution skill in proximity-clearing to master. Stated so nobody invents one."* (`03-META.md`) | `[brief: soft]` `[I assumed]` |

**Two research facts from the brief that bear directly on my subject.** The reference decayed
*"10,435 peak to 819 current, while still being actively updated weekly ... satisfaction is not the
same as retention"*, and *"Any spin-off inherits this shape by default"*; and its players already
expect *"a luck/rarity roll to chase, and **a visible collection of what they have found**"*
(`research/grass-incremental.md`) `[research: https://www.rolimons.com/game/133086043677134]`.

---

## What the brief did not give me

Nine gaps. Routed, not filled.

| # | gap | routed to |
|---|---|---|
| 1 | **What the player becomes is never stated.** `01-FOUNDATION.md` and `OPEN.md §4` both leave *"who the player is"* open, and `OPEN.md §1` carries **no audit row for player role at all**. With *"not a power fantasy"* and *"No mastery layer"* both in force, both default growth axes are gone and nothing replaces them. | **`01`** decides the trajectory and names nobody. The *noun* is role-and-cast naming work. |
| 2 | **The brief runs three fantasy registers and never picks one.** *"what you uncover is what you keep"* (possession) · an *index* / a *collection* (record-keeping) · *restoration* (custodial). Nothing reconciles them. | **`01`** |
| 3 | **The register question already has two conflicting answers on disk.** `04-PRESENTATION.md` justifies `fantasy-ornate` with *"**Relics must read as treasure**"*; `cid/gameplay/meta/02-the-collection.md` writes 24 names on the ground that they are *"not treasure"*. Both are in the repo now. | **`01`** picks the register and says which it ratifies. Whether the 24 strings change is the owning sheet's call. |
| 4 | **No emotional promise exists for late play.** `03-META.md` states the *weakness* and never the promise. | **`02`** |
| 5 | **The fantasy promises a ruin reclaimed; the design guarantees the ruin never ends.** | **`02`** decides what is promised about finishing. The *scale of the place* is world-scale work. |
| 6 | **Whether the promise is possessive is unresolved.** *"what you uncover is what you keep"* and *"own areas"* read possessive; *"Everyone occupies one world"* does not. | **`01`** states the requirement only. |
| 7 | **Nothing names the feeling the feedback is carrying.** *"audio and visual feedback carry the entire load"* assigns the carrier and never the cargo. | **`03`** |
| 8 | **There is no surface through which any promise can be stated.** *"No text, no tutorial"*; the screen list has no flavour surface. | All three sheets are held to **wordless deliverability** (rule 2 below). |
| 9 | **There are no time anchors, deliberately.** *"Lap length: unknown, and deliberately so."* | **`02`** and **`03`** express thresholds as **player state**, each `[playtest unknown]` with a test range. |

**One gap about the seam itself, now partly closed.** The previous version of this index recorded
that because the domain supplied no contract key, *"nothing mechanical can detect that its output
failed to reach the build."* That is no longer wholly true: `assurances` is a proposed key and its six
guarantees are counted invariants, so a promotion in `bridge/schema.mjs` would make them merge-time
checkable. Until that promotion, `npm run bridge` collects and reports the proposal and merges
nothing, which is the intended behaviour and not a failure. The two `amends` blocks are requests
against keys other domains own and are never merged by design.

---

## Why 3 sheets

Six was wrong in a specific way: four of the six were facets of one decision written as four, which
let each restate the brief instead of settling something. The domain has three decisions. **One** —
the frame — because the register *is* the axis anything accrues along, so picking a register and
leaving the trajectory open reproduces gap 2 as gap 1. **Two** — durability over time — because the
real work is whether the promise survives a familiar payoff, an endless place, and nothing banked
while away, which the brief itself calls a weakness. **Three** — inhabiting — because zero tension
plus no mastery means most minutes are neither peak nor threat, and the guarantee list is what makes
those minutes feel good rather than empty. Rejected folds: **02 into 01** (a frame that holds at
minute one and dies at hour ten is still a frame, and the brief flags exactly that risk), and **03
into 02** (a promise about the future and a guarantee about the present fail differently).

| # | sheet | must decide |
|---|---|---|
| 01 | `fantasy-of-record` | Which single sentence is the fantasy of record, and which one register it commits to out of the three the brief runs at once — then, along that register's axis, what the player becomes across a long play when power and mastery are both ruled out. Names no person, no rank, no place. Must state which side of gap 3 it ratifies. |
| 02 | `promise-over-time` | What this fantasy is still offering once reveals are familiar, the place is known to be endless, and nothing accrued while away — including what is promised about ever being finished. Must answer without any priority-3 system, and must express every threshold as player state, not duration. |
| 03 | `inhabiting` | The named feeling of the minutes that are neither a reveal nor a completion, plus the guarantee list about the player's own work that produces it, each guarantee phrased as an observable violation another category can be checked against. Names no sound, no colour, no effect, no timing. |

### Rules all three obey

1. **No mechanic, number, rate, cost, curve or asset.** State a requirement on something you do not
   set, and name the kind of work that sets it. **Every sheet carries a data form** — a `manifest`
   block for a key this domain proposes, or an `amends` block against a key a neighbour owns.
2. **Wordless deliverability.** Any promise must be arrivable at from what happens on screen.
3. **Coin at most one term per sheet, and surface it** for the canonical term list, spelled one way.
   Prefer the brief's working words.
4. **Name no person, rank, place, set or relic.**
5. **2–4 checkable criteria, and at least one criterion per sheet checkable against another sheet's
   text or against a merged manifest value** — a string test, a count, a presence or absence.
6. **No differentiation argument.** The occupancy map is defensive — do not promise what an occupant
   delivers better — never a licence to re-differentiate.

### Consequences for neighbouring subjects

- **Role-and-cast work**: `01` fixes a trajectory, so whatever noun is chosen for the player must be
  able to undergo it and must not be a rank or title.
- **World-scale work**: the reclamation frame requires a cleared area to be visibly, permanently
  different at **area** scale, not object scale.
- **Mood and beat work**: `03` names the feeling; it does not set intensity, and it breaks if
  *"warm, aged, unhurried"* is overruled.
- **Naming work** and the owners of `tiers`, `collection`, `area` and `upgrades`: `01`'s register is
  the check those string fields are measured against, and `01`'s `amends` is the request that makes
  it enforceable.
- **Content-volume and discovery-rate work**: `02`'s promise is falsifiable by tuning. Its 8-lap
  floor is satisfied at `relicsPerArea` 3 × `areasPerDepth` 2.
- **Whoever owns `bridge/schema.mjs`**: `assurances` is proposed and waiting for a shape.

### Scope check

Nothing in this subject is priority 3, so all three sheets are assignable. The live risk was `02`:
*"why come back"* has three obvious wrong answers — daily rewards, offline accrual, seasons — all
priority 3, and the *"seasons"* reframe was refused by name `[you chose: R2 Q2]`.

---

## Verification note

**`02-promise-over-time` was the sheet most likely to be contradicted, and it was — favourably.** Its
8-lap floor failed at the values shipped when it was written (`relicsPerArea` 6, `areasPerDepth` 1,
4 laps) and passes now (3 × 2, 8 laps), because Meta & Content took the fix and the collection
invariant was relaxed. That is the mechanism working.

**`01-fantasy-of-record` lands on strings that exist in the repo today** — 24 Find names justified as
*"not treasure"* against the brief's *"Relics must read as treasure"* (gap 3). It ratifies the
*not treasure* side and requests zero renames.

**Least exposed: `03-inhabiting`.** Its risk is not contradiction but duplication of the
mood-and-beat subject next door. Its `assurances` block is what makes the two distinguishable: one
names beats, the other names invariants with counted violations.

---

## Research owed

**Required:** *"Search Roblox for games already selling this fantasy before committing to it. ... Cite
what you found, including the near-misses."* Done in the first pass and reused, not re-fetched.
`research/landscape.md` checked occupancy of the **noun** inside the `X Incremental` family; this is
the **fantasy-level** version and deliberately searched outside that family.

### Headline finding, and it qualifies a claim the brief makes twice

`00-CORE.md` and `research/landscape.md` state that *"no game in this family surfaced a
hidden-object collection layer"*. **True as scoped, and it does not survive one step outside the
family.** Harvest-or-dig into a permanent logbook, with a reward for completing a page or zone, is
mainstream at very large scale:

- **DIG** (DIG Development, 28 June 2025): *"Uncover and collect hidden treasures, explore a massive
  open world..."* **56,030,218 visits, 89.3% likes (101,475 up / 12,115 down), all-time peak 119,871
  CCU.** Its Collection is *"a detailed in-game logbook"* of 601 items, and **completing a zone
  unlocks Mounts** — structurally the brief's set-completion bonus.
  `[research: https://www.rolimons.com/game/126244816328678]`
  `[research: https://www.roblox.com/games/126244816328678/DIG]`
  `[research: https://dig-it-roblox.fandom.com/wiki/Collection]`
- **Fisch** (~4.5bn visits, ~90%, 1.2M+ peak CCU): the Bestiary is *"a detailed, in-game logbook that
  records the different types of fish and items fishers have caught"*, with per-page completion
  rewards and thresholds at 70% and 100%.
  `[research: https://fischipedia.org/wiki/Bestiary]` `[research: https://fisch.fandom.com/wiki/Bestiary]`

**Consequence for `02` and `03`:** the index is a **format players already know**, not a novelty. Any
promise resting on the index being novel is `[cid: decided]` and wrong. **Flagged upward:**
`00-CORE.md`'s *"Nothing in the surveyed family has this"* is narrower than it reads. This changes
nothing about *where* distinction lives, which is binding.

### Fantasy-level occupancy map

| fantasy | status | what occupies it |
|---|---|---|
| **clear overgrowth off ancient stone to reclaim a ruin** | **no shipping Roblox game found** | Four searches, one restricted to `roblox.com`, surfaced only builder showcases, an *"ancient ruins"* asset pack and a *"JUNGLE TEMPLE"* obby. Nearest: **Bring Back The Sun**, an escape-room puzzle with statue restoration and relic recovery — not a simulator, no harvest verb. **Weak evidence, same caveat `research/landscape.md` applies to rust and cobweb.** Qualified further by `01`: **Overgrown Cleaner** ships the same subject matter off-platform, with the finds as materials and no permanence. `[research: https://devforum.roblox.com/t/jungle-ruins-looking-for-feedback-and-suggestions/1192396]` `[research: https://www.treyexgaming.com/bring-back-the-sun-ancient-ruins-walkthrough-guide/]` `[research: https://store.steampowered.com/app/3164790/Overgrown_Cleaner/]` |
| **restore a ruined thing and keep the collection** | **taken — closest neighbour found, closer than the one the brief names** | **reStore** (Fullflower Studio, 12 May 2026): *"Discovery old antiques, restore them to their former beauty, decorate your own store front and share your collection with the world!"* **1,046,572 visits, 8,341 favorites, 77% (2,148/622), 288 concurrent.** Near-miss on three counts: object scale not area scale, a commerce frame, and sharing — which *"no mechanical interaction"* forbids here. `[research: https://www.roblox.com/games/87179205054038/reStore]` `[research: https://www.robloxgo.com/game/87179205054038/reStore]` |
| **calm before-and-after cleaning, where clearing is revealing** | **taken densely, and growing during this project** | **Carpet Cleaning Simulator** (Curse Free Studios, 4 April 2026): *"Scrub, spray, and restore every room to perfection"*, *"cozy and subliminal spaces to restore"*, *"calming gameplay"* — **26,593,156 visits in ~3 months, 628,973 favorites, 77%.** Its loop is repeatable contracts plus rebirth from level 50. Plus **Concrete Cleaning Simulator**, **Pressure Wash Simulator** 1 and 2, **Clean the Mansion!**, and **Pressure Wash Incremental**. **The cleaning genre already owns "clearing is revealing" as a literal mechanic.** Near-miss: every instance is per-job and repeatable; none makes the restored state permanent and world-scale. `[research: https://www.robloxgo.com/game/124374448373637/Carpet-Cleaning-Simulator]` `[research: https://carpet-cleaning-simulator.wiki/guides/how-to-play/]` `[research: https://www.roblox.com/games/123639373205511/Pressure-Wash-Incremental]` `[research: https://www.roblox.com/games/99397872893294/Concrete-Cleaning-Simulator]` `[research: https://www.roblox.com/games/7009799230/Pressure-Wash-Simulator]` |
| **dig for buried treasure, get richer, go deeper** | **taken at very large scale** | **Treasure Hunt Simulator** (HenryDev, 19 Jan 2018): **709,542,631 visits, 3,523,005 favorites, 90% (974,195/98,622).** The brief named this the nearest thing in the whole map; **on the fantasy axis it is further away than reStore or Carpet Cleaning Simulator**, because its promise is enrichment and its finds are currency rather than a record. `[research: https://www.robloxgo.com/game/1345139196/Treasure-Hunt-Simulator]` `[research: https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator]` |
| **relaxing tending of a place that is yours** | **taken by the platform's largest occupant, which wins it with a system this design cut** | **Grow a Garden**: **35.3bn visits as of May 2026, 22.3M peak CCU (23 Aug 2025)**, *"the new generation's FarmVille"*, and it **runs while players are offline.** Direct consequence for `02`: *"come back and see how it changed while you were away"* is both uncontestable and **impossible here**. `[research: https://en.wikipedia.org/wiki/Grow_a_Garden]` |
| **cut back overgrowth as the verb** | **taken** | **Lawn Mowing Simulator** (Pink Slime Studios, ~96%, 625K+ favorites), **Grass Cutting Simulator**, **Mow The Lawn!**, plus the whole `X Incremental` family already mapped. `[research: https://roblox.fandom.com/wiki/Pink_Slime_Studios/Lawn_Mowing_Simulator]` |
| **excavate and identify artifacts** | **taken, adjacent** | **Prospecting** ships an archaeological-excavation update with artifacts and volcanic ruins; **Fish It** added an Ancient Jungle where players *"explore temples, hunt for artifacts"*. Both are skill-input games. `[research: https://prospecting.miraheze.org/wiki/Quests]` `[research: https://www.u4gm.com/fish-it/blog-ancient-ruins-ancient-jungle-guide-fish-it]` |

### What the map says to the three sheets

- **The subject matter survives on Roblox.** `01` may ratify it, and a new noun would buy nothing
  anyway `[you chose: R1 Q1]`.
- **Three promises are occupied and must not be leaned on:** satisfying before-and-after cleaning,
  filling an index, and relaxed tending of a place that changes while you are away.
- **The one property no occupant I found has is permanence at area scale.** That is
  `[you chose: R2 Q1]`, already binding — ground for `02` and `03` to stand on, not a claim to make.
- **The reference's decay is the shape to expect** (10,435 → 819 peak-to-current while updated
  weekly). `02` writes against that, not against a hope.

### What I could not verify

- **A complete Roblox catalogue sweep for the reclaim-a-ruin fantasy.** `[unverified]` Roblox search
  is client-rendered and could not be fetched. **The fetch that would settle it:** the omni-search
  endpoint or the authenticated games-search API, over *overgrown*, *reclaim*, *ruin restoration*,
  *vines*, *moss*, *relic index*. Until then this is the same grade of evidence as `landscape.md`'s
  rust and cobweb rows.
- **Whether reStore, Carpet Cleaning Simulator or DIG intend a set-completion *bonus* the way this
  design does.** DIG's zone→Mounts and Fisch's page rewards are wiki-sourced, not first-party.
- **Rolimons `/game/` and `/place/` 404'd** for reStore and for Treasure Hunt Simulator's universe id;
  those numbers come from `robloxgo.com`. All visit and CCU figures are third-party estimates.
- **No revenue figures for any near-miss.** Recorded so nobody reads *"taken"* as *"earning"*.
