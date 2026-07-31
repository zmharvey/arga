# Fantasy — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md`, `research/landscape.md`, `research/grass-incremental.md`; `cid/theme/_category.md`;
`bridge/schema.mjs` + `bridge/cli.mjs` (the build contract); `bridge/merge.mjs`; the seven
sheets already on disk under `cid/gameplay/`, `cid/art/objects/`, `cid/tech/architecture/`;
`cid/theme/tone/_lead.md` (boundary check); my node in `docs/cid-workflow.json`.

**This is a re-plan.** The previous index planned six sheets. Three. What changed is stated
under *Why 3 sheets*; the research and the gaps did not change and are carried forward.

---

## Build contract

**This domain supplies zero contract keys, and that is the correct answer, not a shortfall.**

The build contract is nine keys. Every one has a named owner and none of them is in this
category: `area` (gameplay/meta), `tiers` (gameplay/systems), `upgrades` (gameplay/balance),
`movement` (gameplay/mechanics), `patch` (art/objects), `collection` (gameplay/meta),
`onboarding` (gameplay/onboarding), `modules` (tech/architecture), `runtime`
(tech/architecture). `[research: bridge/schema.mjs — repo file, read directly]`

A power fantasy is not a value a build reads. There is no key for a register, a promise, or a
feeling, and inventing one would be worse than not having it: `bridge/merge.mjs` rejects any
`provides` outside the schema as a hard error, and a second sheet claiming an existing key is
also a hard error. **No sheet in this domain may carry a `manifest` block.**

**But this domain is not sealed off from the build, and the route matters.** Four keys others
own carry *strings* — `area.label`, `tiers[].name`, `upgrades[].label` and `.blurb`,
`collection.sets[].label` and `.relics`. Those strings are the only place a fiction decision
becomes a thing the build actually renders. `bridge/schema.mjs`'s own header says the relic
names *"were once invented by the builder... which is literally CID's job."* So this domain's
value is realised as a **constraint the owners of those string fields can check their strings
against**, and every sheet here must be written so that check is possible by reading it.
Naming the strings is not mine (naming work; *[currently Vocabulary Lead, this category]*,
plus the sheets that own each key).

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

**Soft. Overruled only with a stated reason, and I am overruling none of it.**

| constraint | tag |
|---|---|
| *"**An overgrown ruin being reclaimed.** Cut back vines and moss from ancient stone."* (`01-FOUNDATION.md`) and the `CONCEPT.md` expansion *"the clearing *is* the revealing — what you uncover is what you keep"* | `[brief: soft]` `[you accepted: R2 Q3]` |
| *"**Clearing and discovering are one action.** Do not design them as separate systems."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits R2 Q3) |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, **not a power fantasy**."* (`01-FOUNDATION.md`); *"warm and unhurried, not spooky. This is reclamation, not a haunted place."* (`04-PRESENTATION.md`) | `[brief: soft]` ×2 — relayed soft per the category brief. Not overruled; the occupancy map below gives an independent reason to keep it |
| *"**Clear the overgrowth, find what's buried.**"* — *"A dual promise"*, with *"Pure 'restore the ruin' was declined for underselling the collection"* and *"'Uncover a lost civilisation' was declined because the verb disappears"* (`05-OUTWARD.md`) | `[brief: soft]` `[you accepted: R6 Q1]` — **two register candidates were already refused by name at hook-line level** |
| *"**Clear → reveal inside the first ten seconds.** ... the first patch they clear has something under it. **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` |
| *"**There is no failure state.** ... **Zero tension is deliberate.** Satisfaction comes from before/after and discovery, nothing else. **Consequence: audio and visual feedback carry the entire load** — and nobody downstream should invent tension to fill the gap."* (`02-GAMEPLAY.md`), elevated by `HANDOFF.md` | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated |
| session objective *"find at least one new relic"*; long-term *"complete all four sets"*; *"**With endless areas, the collection is the only finishable thing**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q3 → R6 Q3]` |
| *"**An unfinished area and a half-empty index.**"* and *"**Honest weakness:** without banked offline earnings, the pull to return is materially weaker than the reference's."* (`03-META.md`) | `[brief: soft]` `[you accepted: R3 Q3]` |
| *"**Permanent multipliers only. Never content access.** ... **A paid-only object would turn 100% completion into a purchase**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q4]` |
| *"**`ui-forge` vibe key: `fantasy-ornate`** ... ornamented, warm, aged, crafted. Stone and foliage, not candy."* and reason 1, *"**Relics must read as treasure.**"* (`04-PRESENTATION.md`) | `[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]` |
| *"**Depth is the progression read** — further in means denser overgrowth and rarer finds"* (`01-FOUNDATION.md`); escalation moves *"from **tool power** to **time and patience**"* | `[brief: soft]` / `[I assumed]` |
| *"**No mastery layer.** There is no execution skill in proximity-clearing to master. Stated so nobody invents one."* (`03-META.md`) | `[brief: soft]` `[I assumed]` — with *"not a power fantasy"*, both standard growth axes are removed from my subject |

**Two research facts from the brief that bear directly on my subject.** The reference decayed
*"10,435 peak to 819 current, while still being actively updated weekly ... satisfaction is not
the same as retention"*, and *"Any spin-off inherits this shape by default"*; and its players
already expect *"a luck/rarity roll to chase, and **a visible collection of what they have
found**"* (`research/grass-incremental.md`) `[research: https://www.rolimons.com/game/133086043677134]`.

---

## What the brief did not give me

Nine gaps. Routed, not filled.

| # | gap | routed to |
|---|---|---|
| 1 | **What the player becomes is never stated.** `01-FOUNDATION.md` and `OPEN.md §4` both leave *"who the player is"* open, and `OPEN.md §1` carries **no audit row for player role at all** — zero interview questions anywhere. With *"not a power fantasy"* and *"No mastery layer"* both in force, both default growth axes are gone and nothing replaces them. | **`01`** decides the trajectory and names nobody. The *noun* for the person is role-and-cast naming work *[currently Identity Lead, this wave]*. |
| 2 | **The brief runs three fantasy registers and never picks one.** *"what you uncover is what you keep"* (possession, `CONCEPT.md`) · an *index* / a *collection* (record-keeping, `03-META.md`) · *restoration* (custodial, `05-OUTWARD.md`). Nothing reconciles them. | **`01`** |
| 3 | **The register question already has two conflicting answers on disk, decided by neither of us.** `04-PRESENTATION.md` justifies `fantasy-ornate` with *"**Relics must read as treasure**"*; `cid/gameplay/meta/02-the-collection.md` writes 24 relic names on the stated ground that *"Names are concrete objects a mason or a clerk would leave behind, **not treasure**"*. Both are in the repo now, and those names are a live contract value. | **`01`** picks the register and says which of the two it ratifies. Whether the 24 strings change is the owning sheet's call plus naming work; **it is not mine to rewrite them.** |
| 4 | **No emotional promise exists for late play.** `03-META.md` states the *weakness* (*"the pull to return is materially weaker"*) and never the promise. `OPEN.md §4` routes *"reasons to return"* to content work, which answers a system question, not this one. | **`02`** |
| 5 | **The fantasy promises a ruin reclaimed; the design guarantees the ruin never ends.** *"An overgrown ruin being reclaimed"* against *"Endless via shuffled authored chunks"* and *"the collection is the only finishable thing"*. The brief never says what the fantasy promises about finishing. | **`02`** decides what is promised about finishing. The *scale of the place* (one ruin or many) is world-scale work *[currently Setting Lead, this wave]*. |
| 6 | **Whether the promise is possessive is unresolved.** *"what you uncover is what you keep"* and *"own areas"* read possessive; *"Everyone occupies one world"* does not. | **`01`** states the requirement only; the contradiction belongs to world-scale work *[currently Setting Lead]*. |
| 7 | **Nothing names the feeling the feedback is carrying.** *"audio and visual feedback carry the entire load"* assigns the carrier and never the cargo; `OPEN.md §2` names *"two emotional peaks"* without naming an emotion. Left as is, sound-design and visual-effect work (wave 4) each invent it separately. | **`03`** |
| 8 | **There is no surface through which any promise can be stated.** *"No text, no tutorial"*; the screen list is `collection-index`, `upgrades`, `areas`, `shop` with no flavour surface; *"**A persistent HUD does not fit**"* the build stage's one pattern. | All three sheets are held to **wordless deliverability** (rule 2 below). Whether a surface exists is interface-surface work *(wave 4)* and then the pattern registry. |
| 9 | **There are no time anchors, deliberately.** *"Lap length: unknown, and deliberately so."* Sessions are 10–20 minutes; laps are unmeasured. *"Minute 1 versus hour 10"* therefore cannot be expressed in durations. | **`02`** and **`03`** express thresholds as **player state** (first reveal seen; index part-filled; N areas standing clear), each `[playtest unknown]` with a test range. |

**One gap about the seam itself, flagged upward rather than routed.** Because this domain
supplies no contract key, **nothing mechanical can detect that its output failed to reach the
build.** `npm run bridge` will report COMPLETE with all nine keys supplied whether or not a
single word of this fiction survived. That is a property of the contract, not of these sheets,
and it belongs to whoever owns the CID→build seam. `[cid: decided]` that the honest mitigation
is criteria checkable *against other sheets* (see rule 5), not a new key.

---

## Why 3 sheets

Six was wrong, and it was wrong in a specific way: four of the six were facets of one
decision written as four, which let each one restate the brief instead of settling something.
The domain has exactly three decisions in it. **One** — the frame — because ratifying the
existing sentence is a by-product, not a sheet, and the register is what actually has to be
chosen; and because the register *is* the axis anything accrues along, so picking a register
and leaving the trajectory open reproduces gap 2 as gap 1. **Two** — durability over time —
absorbs the first-minute promise rather than giving it a sheet, because the first minute is
already decided elsewhere as a build value (`onboarding.guaranteedFirstRelic`, owned by
gameplay/onboarding, already written in `cid/gameplay/onboarding/01-first-find.md`) plus a
soft hook line; a Fantasy sheet on it would restate two settled things. The real work is
whether the promise survives a familiar payoff, an endless place, and nothing banked while
away, which the brief itself calls a weakness. **Three** — inhabiting — because zero tension
plus no mastery means most minutes are neither peak nor threat, and the guarantee list is what
makes those minutes feel good rather than empty: the named feeling and the guarantees that
produce it are one decision stated positively, and splitting them gave me a feeling with no
grounds and a prohibition list with no purpose. Rejected folds: **02 into 01** (a frame that
holds at minute one and dies at hour ten is still a frame, and the brief flags exactly that
risk), and **03 into 02** (a promise about the future and a guarantee about the present fail
differently — 02 is falsifiable by tuning, 03 by duplicating Tone).

| # | sheet | must decide |
|---|---|---|
| 01 | `fantasy-of-record` | Which single sentence is the fantasy of record, and which one register it commits to out of the three the brief runs at once (possessive, record-keeping, custodial-restorative, or another) — then, along that register's axis, what the player becomes across a long play when power and mastery are both ruled out. Names no person, no rank, no place. Must state which side of gap 3 it ratifies (*"relics must read as treasure"* vs *"not treasure"*). |
| 02 | `promise-over-time` | What this fantasy is still offering once reveals are familiar, the place is known to be endless, and nothing accrued while away — including what is promised about ever being finished, given the collection is the only finishable thing. Must answer without any priority-3 system, and must express every threshold as player state, not duration. |
| 03 | `inhabiting` | The named feeling of the minutes that are neither a reveal nor a completion, plus the guarantee list about the player's own work that produces it, each guarantee phrased as an observable violation another category can be checked against. Names no sound, no colour, no effect, no timing. |

### Rules all three obey

1. **No mechanic, number, rate, cost, curve or asset,** and **no `manifest` block.** State a
   requirement on something you do not set, and name the kind of work that sets it.
2. **Wordless deliverability.** Any promise must be arrivable at from what happens on screen.
   A sheet needing words states that as a delivery requirement and assumes no surface (gap 8).
3. **Coin at most one term per sheet, and surface it** for the canonical term list *[currently
   Vocabulary Lead, this wave]*, spelled one way. Prefer the brief's working words.
4. **Name no person, rank, place, set or relic.** Those are role-and-cast work, world-scale
   work, set-theme work (wave 3) and object work (wave 4).
5. **2–4 checkable criteria, and because no bridge key can check them, at least one criterion
   per sheet must be checkable against another sheet's text** — a string test, a count, a
   presence or absence. *"The register named here is the one the 24 relic strings in
   `cid/gameplay/meta/02-the-collection.md` satisfy, or that sheet is named as needing
   revision"* is checkable. *"Feels good to inhabit"* is not.
6. **No differentiation argument.** Making the fantasy the differentiator contradicts
   `[you chose: R1 Q1]`. The occupancy map is defensive — do not promise what an occupant
   delivers better — never a licence to re-differentiate.

### Consequences for neighbouring subjects, for their owners to act on

- **Role-and-cast work** *[currently Identity Lead]*: `01` fixes a trajectory, so whatever noun
  is chosen for the player must be able to undergo it and must not be a rank or title.
- **World-scale work** *[currently Setting Lead]*: the reclamation frame requires a cleared area
  to be visibly, permanently different at **area** scale, not object scale. Gaps 5 and 6 land on
  the singular-versus-endless contradiction that subject owns.
- **Mood and beat work** *[currently Tone Lead]*: that index states beats *within* a session and
  their intensity, and defers the long arc here. `03` names the feeling; it does not set
  intensity, and it breaks if *"warm, aged, unhurried"* is overruled — revise it, do not keep it
  silently.
- **Naming work** *[currently Vocabulary Lead]* and the owners of `tiers`, `collection`, `area`
  and `upgrades`: `01`'s register is the check those string fields are measured against. Four
  key-owning sheets already carry strings written before any register existed.
- **Content-volume and discovery-rate work** *(wave 3)*: `02`'s promise is falsifiable by tuning.
  If a typical session can fail to produce a find, the promise is a lie — `03-META.md` already
  calls that *"the highest-risk tuning in the game"*.
- **Sound-design and visual-effect work** *(wave 4)*: `03` hands them a target feeling and
  nothing about execution.
- **Interface-surface work** *(wave 4)* and the pattern registry: gap 8 decides whether any of
  this reaches a player.

### Scope check

Nothing in this subject is priority 3, so all three sheets are assignable. The live risk is
`02`: *"why come back"* has three obvious wrong answers — daily rewards, offline accrual,
seasons — all priority 3, and the *"seasons"* reframe was refused by name `[you chose: R2 Q2]`.

---

## Verification note

**`02-promise-over-time` is the sheet most likely to be contradicted, and by whom is knowable
now.** It rests on three things it does not own: discovery rates per depth tier and
set-completion bonuses (content-volume work, wave 3), payoff cadence (core-loop work, wave 2),
and whether the place is one ruin or many (world-scale work, this wave). Any of the three can
make its promise false without touching the sheet.

**Second: `01-fantasy-of-record`, and this one is already contradicted.** Its register decision
lands on strings that exist in the repo today — 24 relic names justified as *"not treasure"*
against the brief's *"Relics must read as treasure"* (gap 3) — and on
persistent-power-track work in wave 2, where anything reading as escalating strength collides
with *"not a power fantasy"*, `01` being the softer of the two. Expect a revision request to
`cid/gameplay/meta/02-the-collection.md` or a stated ratification of it, not silence.

**Least exposed: `03-inhabiting`.** Its risk is not contradiction but duplication of the
mood-and-beat subject next door. If a reviewer cannot tell `03` from a tone register sheet,
`03` has failed even if nothing in it is wrong.

---

## Research owed

**Required:** *"Search Roblox for games already selling this fantasy before committing to it.
... Cite what you found, including the near-misses."* Done in the prior pass and reused here,
not re-fetched. `research/landscape.md` checked occupancy of the **noun** inside the
`X Incremental` family; this is the **fantasy-level** version and deliberately searched outside
that family, which is where the finding is.

**Also owed and done this pass:** the build contract, read directly from `bridge/schema.mjs`
and `bridge/cli.mjs`. **I could not run `npm run bridge -- --contract`** — this session has no
shell tool. The flag prints `contract()`, which is `key`/`doc`/`owner` straight out of `SCHEMA`,
so reading the source is the same nine rows; the one thing I did not get is a live coverage
report against the sheets currently on disk. `[research: bridge/schema.mjs, bridge/cli.mjs]`

### Headline finding, and it qualifies a claim the brief makes twice

`00-CORE.md` and `research/landscape.md` state that *"no game in this family surfaced a
hidden-object collection layer"*. **True as scoped, and it does not survive one step outside the
family.** Harvest-or-dig into a permanent logbook, with a reward for completing a page or zone,
is mainstream at very large scale:

- **DIG** (DIG Development, 28 June 2025): *"Uncover and collect hidden treasures, explore a
  massive open world..."* **56,030,218 visits, 89.3% likes (101,475 up / 12,115 down), all-time
  peak 119,871 CCU.** Its Collection is *"a detailed in-game logbook"* of 601 items, and
  **completing a zone unlocks Mounts** — structurally the brief's set-completion bonus.
  `[research: https://www.rolimons.com/game/126244816328678]`
  `[research: https://www.roblox.com/games/126244816328678/DIG]`
  `[research: https://dig-it-roblox.fandom.com/wiki/Collection]`
- **Fisch** (~4.5bn visits, ~90%, 1.2M+ peak CCU): the Bestiary is *"a detailed, in-game logbook
  that records the different types of fish and items fishers have caught"*, with per-page
  completion rewards and thresholds at 70% and 100%.
  `[research: https://fischipedia.org/wiki/Bestiary]` `[research: https://fisch.fandom.com/wiki/Bestiary]`

**Consequence for `02` and `03`:** the index is a **format players already know**, not a
novelty — consistent with the brief's own reference research. Any promise resting on the index
being novel is `[cid: decided]` and wrong. **Flagged upward:** `00-CORE.md`'s *"Nothing in the
surveyed family has this"* is narrower than it reads. This changes nothing about *where*
distinction lives, which is binding.

### Fantasy-level occupancy map

| fantasy | status | what occupies it |
|---|---|---|
| **clear overgrowth off ancient stone to reclaim a ruin** | **no shipping game found** | Four searches, one restricted to `roblox.com`, surfaced only builder showcases, an *"ancient ruins"* asset pack and a *"JUNGLE TEMPLE"* obby. Nearest: **Bring Back The Sun**, an escape-room puzzle with statue restoration and relic recovery — not a simulator, no harvest verb. **Weak evidence, same caveat `research/landscape.md` applies to rust and cobweb.** `[research: https://devforum.roblox.com/t/jungle-ruins-looking-for-feedback-and-suggestions/1192396]` `[research: https://www.treyexgaming.com/bring-back-the-sun-ancient-ruins-walkthrough-guide/]` |
| **restore a ruined thing and keep the collection** | **taken — closest neighbour found, closer than the one the brief names** | **reStore** (Fullflower Studio, 12 May 2026): *"Discovery old antiques, restore them to their former beauty, decorate your own store front and share your collection with the world!"* **1,046,572 visits, 8,341 favorites, 77% (2,148/622), 288 concurrent.** Near-miss on three counts: object scale not area scale, a commerce frame, and sharing — which *"no mechanical interaction"* forbids here. `[research: https://www.roblox.com/games/87179205054038/reStore]` `[research: https://www.robloxgo.com/game/87179205054038/reStore]` |
| **calm before-and-after cleaning, where clearing is revealing** | **taken densely, and growing during this project** | **Carpet Cleaning Simulator** (Curse Free Studios, 4 April 2026): *"Scrub, spray, and restore every room to perfection"*, *"cozy and subliminal spaces to restore"*, *"calming gameplay"* — **26,593,156 visits in ~3 months, 628,973 favorites, 77%.** Plus **Concrete Cleaning Simulator**, **Pressure Wash Simulator** 1 and 2, **Clean the Mansion!**, and **Pressure Wash Incremental** (*"Pressure Wash · Upgrade For Faster Washing · Rebirth · Unlock New Islands"*). **The cleaning genre already owns "clearing is revealing" as a literal mechanic** — the exact property `01-FOUNDATION.md` gives as why this theme beat cobwebs, ash and rust. Near-miss: every instance is per-job and repeatable; none makes the restored state permanent and world-scale. `[research: https://www.robloxgo.com/game/124374448373637/Carpet-Cleaning-Simulator]` `[research: https://www.roblox.com/games/123639373205511/Pressure-Wash-Incremental]` `[research: https://www.roblox.com/games/99397872893294/Concrete-Cleaning-Simulator]` `[research: https://www.roblox.com/games/7009799230/Pressure-Wash-Simulator]` |
| **dig for buried treasure, get richer, go deeper** | **taken at very large scale** | **Treasure Hunt Simulator** (HenryDev, 19 Jan 2018): **709,542,631 visits, 3,523,005 favorites, 90% (974,195/98,622).** The brief named this the nearest thing in the whole map; **on the fantasy axis it is further away than reStore or Carpet Cleaning Simulator**, because its promise is enrichment and its finds are currency rather than a record. `[research: https://www.robloxgo.com/game/1345139196/Treasure-Hunt-Simulator]` `[research: https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator]` |
| **relaxing tending of a place that is yours** | **taken by the platform's largest occupant, which wins it with a system this design cut** | **Grow a Garden**: **35.3bn visits as of May 2026, 22.3M peak CCU (23 Aug 2025)**, *"the new generation's FarmVille"*, and it **runs while players are offline.** Direct consequence for `02`: *"come back and see how it changed while you were away"* is both uncontestable and **impossible here**. `[research: https://en.wikipedia.org/wiki/Grow_a_Garden]` |
| **cut back overgrowth as the verb** | **taken** | **Lawn Mowing Simulator** (Pink Slime Studios, ~96%, 625K+ favorites), **Grass Cutting Simulator**, **Mow The Lawn!**, plus the whole `X Incremental` family already mapped. `[research: https://roblox.fandom.com/wiki/Pink_Slime_Studios/Lawn_Mowing_Simulator]` |
| **excavate and identify artifacts** | **taken, adjacent** | **Prospecting** ships an archaeological-excavation update with artifacts and volcanic ruins; **Fish It** added an Ancient Jungle where players *"explore temples, hunt for artifacts"*. Both are skill-input games. `[research: https://prospecting.miraheze.org/wiki/Quests]` `[research: https://www.u4gm.com/fish-it/blog-ancient-ruins-ancient-jungle-guide-fish-it]` |

### What the map says to the three sheets

- **The subject matter survives.** *"An overgrown ruin being reclaimed"* is, as far as I can
  verify, unoccupied as a shipping fantasy. `01` may ratify it, and a new noun would buy nothing
  anyway `[you chose: R1 Q1]`.
- **Three promises are occupied and must not be leaned on:** satisfying before-and-after
  cleaning (Carpet Cleaning Simulator, now, at 26.6M visits a quarter), filling an index (Fisch,
  DIG), and relaxed tending of a place that changes while you are away (Grow a Garden, and
  unavailable here regardless).
- **The one property no occupant I found has is permanence at area scale.** Cleaning games
  re-dirty per job, dig sites refill, Fisch's water is inexhaustible, Grow a Garden's plot grows
  rather than is reclaimed. That is `[you chose: R2 Q1]`, already binding — ground for `02` and
  `03` to stand on, not a claim to make.
- **The reference's decay is the shape to expect** (10,435 → 819 peak-to-current while updated
  weekly). `02` writes against that, not against a hope.

### What I could not verify

- **A complete Roblox catalogue sweep for the reclaim-a-ruin fantasy.** `[unverified]` Roblox
  search is client-rendered and could not be fetched; a `roblox.com`-restricted web search
  returns indexed pages, not the catalogue. **The fetch that would settle it:** the omni-search
  endpoint (`https://apis.roblox.com/search-api/omni-search?searchQuery=...`) or the
  authenticated games-search API, over *overgrown*, *reclaim*, *ruin restoration*, *vines*,
  *moss*, *relic index*. Until then this is the same grade of evidence as `landscape.md`'s rust
  and cobweb rows and must not be reported as a clear field.
- **Whether reStore, Carpet Cleaning Simulator or DIG intend a set-completion *bonus* the way
  this design does.** DIG's zone→Mounts and Fisch's page rewards are wiki-sourced, not
  first-party; first-party confirmation is in-game and not fetchable.
- **Rolimons `/game/` and `/place/` 404'd** for reStore and for Treasure Hunt Simulator's
  universe id; those numbers come from `robloxgo.com`. Two independent sources agree for DIG
  only. All visit and CCU figures are third-party estimates, exactly as
  `research/grass-incremental.md` warns.
- **A live `npm run bridge` coverage run.** No shell in this session. The nine keys and their
  owners are read from source and are not in doubt; what I cannot show is the current
  supplied/missing report. **The command that would settle it:** `npm run bridge` from the repo
  root.
- **No revenue figures for any near-miss.** Not needed for my subject; recorded so nobody reads
  *"taken"* as *"earning"*.
