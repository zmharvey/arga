# Vocabulary — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md`, `research/landscape.md`, `cid/theme/_category.md`. Also read as the build contract:
`bridge/schema.mjs`, `bridge/merge.mjs`, `bridge/emit-config.mjs`, `bridge/cli.mjs`, and every
manifest-carrying sheet already on disk under `cid/`.

**Owns:** what currencies, ranks, items, zones and actions are called · naming patterns ·
banned words · the canonical term list.
**Does not own:** the game's external title and tagline (external-name work; *[currently:
Discovery & Marketing — Name]*).

**Four sheets.** None of them names a currency, a tier, an upgrade, an area, a set, or any of
the 24 relics. That is the change from the previous plan and the reason is in the next block.

---

## What the build contract gave me

`npm run bridge -- --contract` could not be run — this session has no shell — so I read the
same data at its source, `SCHEMA` in `bridge/schema.mjs`, which is what `contract()` prints.
Nine keys, each with exactly one owning sheet:

| key | owner | string-bearing fields |
|---|---|---|
| `area` | `gameplay/meta` | `id` (slug), `label` |
| `tiers` | `gameplay/systems` | `name`, `shape` (engine enum) |
| `upgrades` | `gameplay/balance` | `id`, `label`, **`blurb` — the only sentence field in the contract** |
| `movement` | `gameplay/mechanics` | none |
| `patch` | `art/objects` | `material` (engine enum) |
| `collection` | `gameplay/meta` | `sets[].id`, `sets[].label`, `sets[].relics[]` |
| `onboarding` | `gameplay/onboarding` | none |
| `modules` | `tech/architecture` | `id`, `path`, `responsibility` (internal) |
| `runtime` | `tech/architecture` | `dataStoreName` (**frozen identifier — renaming orphans saves**) |

**Vocabulary owns zero contract keys. So does every other domain in Theme & Narrative.**
`[research: bridge/schema.mjs]` Two consequences that set this index:

1. **Every name that reaches the build reaches it inside another domain's manifest block.** The
   words in the game today were written by key owners: `Moss / Fern / Bramble / Heartvine`
   (`cid/gameplay/systems/01-overgrowth-tiers.md`), `VALUE / REACH / PACE` plus three blurbs
   (`cid/gameplay/balance/01-upgrade-ladder.md`), `EAST TERRACE`
   (`cid/gameplay/meta/01-the-area.md`), four set labels and 24 relic names
   (`cid/gameplay/meta/02-the-collection.md`), `Grass` and `ArgaRuin_v1` (Art and Tech). A
   Vocabulary sheet that restated any of those would be a second sheet claiming one key, and
   `mergeSheets` rejects that as a hard error *after* both sheets are written.
2. **Nothing I write is enforced by the merger.** No manifest block means no machine check. My
   output is rules and an artifact, and it needs an enforcement path that does not exist yet —
   see G3 and G4.

---

## What the brief gave me

**Positioning and register**

- *"this is being marketed as a **restoration game, not an incremental**"* (`05-OUTWARD.md`) ·
  *"A **restoration / completion game**, not an incremental"* (`CONCEPT.md`) —
  `[brief: binding]` `[you chose: R4 Q2]`
- The family's shared store sentence, *"A relaxing {noun} simulator game where the more you
  rebirth and upgrade, the more fun the game becomes, with the ability to unlock new islands
  and upgrades,"* across four games by at least two studios —
  `[research: research/landscape.md, citing the Roblox pages for Grass / Scrap / Lumber /
  Leaves Incremental]`
- *"**The noun is a vehicle, not the differentiator.**"* (`01-FOUNDATION.md`) —
  `[brief: binding]` `[you chose: R1 Q1]`. No sheet may justify a word by novelty.
- *"**Dry and sparse.** Humor lives only in relic flavour text. ... **No relic name is a pun.**"*
  — `[brief: binding]`, **developer in session 2026-07-30, not in any sheet**, relayed by
  `cid/theme/_category.md`. The last clause lands on me; the register work is *[currently: Tone
  Lead]*.
- *"**`ui-forge` vibe key: `fantasy-ornate`** ... ornamented, warm, aged, crafted. Stone and
  foliage, not candy."* (`04-PRESENTATION.md`) — `[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]`
- *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."*
  (`01-FOUNDATION.md`) — `[brief: soft]` `[you accepted: R2 Q3]`

**Audience, which is the reading-level constraint**

- *"**8–14, mobile-heavy, short sessions**"* · *"casual but **genre-literate**"* · *"~70% mobile
  / ~25% desktop / ~5% console"* · *"10–20 minute active sessions"* (`00-CORE.md`) —
  `[brief: binding]` `[you chose: R1 Q4]`; the split itself `[brief: soft]` `[I assumed]`
- *"Alternatives declined: ... 5–10 needing near-zero text."* (`00-CORE.md`) ·
  *"Also declined: extending to a text-free comprehension rule."* (`04-PRESENTATION.md`) —
  `[brief: binding]` / `[brief: soft]`. **Text is permitted and unmeasured.** See G2.

**Counts, which fix how many of each field exist**

- *"**One currency.**"* (`02-GAMEPLAY.md`) — `[brief: soft]` `[you accepted: R5 Q3 → R4 Q3]`.
  *"A duplicate-find currency and a separate discovery currency were both offered and declined."*
- *"**Three axes:** value per unit, clear radius, and move speed."* (`02-GAMEPLAY.md`) —
  `[brief: soft]` `[you accepted: step 6 Q1]`. *"Relic luck as a fourth axis was offered and
  declined."*
- *"**~24 objects in 4 sets of 6.**"* · *"Structure and scale settled here; **the objects
  themselves are invented downstream.**"* (`02-GAMEPLAY.md`) — `[brief: soft]`
  `[you accepted: R4 Q4]`
- *"Four rarity tiers of foliage in a green environment"* (`04-PRESENTATION.md`) —
  `[brief: soft]`; the count appears only inside the accessibility rationale, and is now settled
  at four on disk by `cid/gameplay/systems/01-overgrowth-tiers.md`.

**Words the brief fixed, and limits on what a word may imply**

- *"**Areas, not zones.** Discrete spaces that are cleared and permanently done."* (`03-META.md`)
  — `[brief: binding]` `[you chose: R3 Q2 / R5 Q1]`. **The only place the brief adjudicates a
  term against an alternative.**
- *"**Clearing and discovering are one action.** Do not design them as separate systems."*
  (`01-FOUNDATION.md`) — `[brief: soft]`, and the stated reason this theme beat three others.
  One verb, not two.
- *"**Cleared is permanent — overgrowth never returns.**"* — `[brief: binding]`
  `[you chose: R2 Q1]` · *"**No rebirth.**"* with *"Reframing it as 'seasons' ... declined"* —
  `[brief: binding]` `[you chose: R2 Q2]`. No word may imply a cycle.
- Priority 3: *"real procedural generation · rebirth · offline accrual · codes · daily rewards ·
  leaderboards · trading · seasons and events"* (`03-META.md`) — the **ordering** is
  `[brief: soft]` `[I assumed]`; rebirth, offline accrual and procgen are binding individually.
- *"**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.** ...
  **This is a requirement, not a nicety**"* (`04-PRESENTATION.md`) — `[brief: soft]`
  `[you accepted: R6 Q4]`. A tier named by hue asserts hue as the carrier of a required signal.
- *"**Permanent multipliers only. Never content access.**"* (`03-META.md`) — `[brief: soft]`
  `[you accepted: R5 Q4]`. No word may imply a premium or unobtainable class.
- *"**No mastery layer.** ... Stated so nobody invents one."* (`03-META.md`) — `[brief: soft]`
  `[I assumed]`, with *"not a power fantasy"*. This empties the **ranks** part of my `owns`; G8.
- The brief uses two words for one thing: *"~24 buried **objects**"* (`CONCEPT.md`) against
  *"Content roster — buried **relics**"* (`02-GAMEPLAY.md`) and *"find at least one new
  **relic**"* (`03-META.md`) — `[brief: soft]`, **interchangeable usage, not a distinction.**
- *"Left open — ... **the names of everything**."* (`01-FOUNDATION.md`) · *"... **all naming** →
  Theme & Narrative"* (`OPEN.md §4`) — `[brief: binding]` as ownership.
- *"**The working name is a placeholder.** `incremental-spinoff-v2` is a slug, not a name."*
  (`OPEN.md §3`) — `[brief: binding]`. No sheet may assume a title exists.

---

## What the brief did not give me

Eleven gaps. Each routes to a sheet below or out of my subject by kind of work. None is filled
here.

**G1 · No word in this game has naming provenance.** `relic`, `object`, `overgrowth`, `area`,
`chunk`, `set`, `collection`, `index`, `ruin`, `depth`, `tier`, `upgrade` run through every sheet
and **not one carries a naming tag.** `areas` is the sole exception and it is tagged as a
world-structure choice, not a naming one. → **sheet 03** for the words it admits,
**sheet 02** for any it forbids. Every ruling is `[cid: decided]`, however familiar the word.

**G2 · No reading level, no term-length limit, no text budget.** The 8–14 band is binding and a
text-free rule was declined, so text is allowed and unmeasured. → **sheet 01**, term-level plus
the one sentence field. The **global on-screen copy budget is not mine** — that is
on-screen-copy work *[currently: UI/UX — Screens]*, and it is unset anywhere in the brief.

**G3 · The currency is named in the shipped build and owned by nobody.** `02-GAMEPLAY.md`
settles *"One currency"* and never names it, and **no contract key carries a currency name.**
The running game shows `text = "SHARDS"` (`game/src/shared/Screens/hud.luau:158`), fed from
`ui-forge/briefs/hud.brief.json:16`, which is a `ui-forge` example brief and not a spec sheet;
line 15 of the same file supplies `"RELICS"`. **Two player-facing nouns are shipping with no
sheet behind either, and the merger cannot see them because there is no key to claim.** → I do
not name the currency: a name written here produces exactly the same unchecked string. **Sheet
04** decides where an unkeyed player-facing string is adjudicated and states the requirement.
Creating the key is contract work *[currently: whoever owns `bridge/schema.mjs`]*.

**G4 · Theme & Narrative owns none of the nine contract keys.** So this category's entire output
reaches the build as prose for someone to re-interpret, which the repo's own rule
(*"Seams are derivations, never prompts"*, `CLAUDE.md`) exists to prevent. → stated as a
consequence, not filled. Kind of work: **contract and seam design**. This is the most important
thing this re-plan found and it is not mine to fix.

**G5 · No surface exists for much of the register.** Four screens (`collection-index`,
`upgrades`, `areas`, `shop`), *"No text, no tutorial"*, *"**A persistent HUD does not fit**"* the
build stage's one pattern, and the in-session tone decision presupposes a **relic flavour text**
field no sheet establishes. A term with no surface cannot be spelling-checked in play. →
**sheet 03** marks each entry player-facing or internal-only. Whether the surface exists is
screen work *[currently: UI/UX, wave 4]*, then the `ui-forge` pattern registry.

**G6 · There is no anchored word for the player.** *"who the player is"* has **zero interview
questions** anywhere in `OPEN.md §1`. → a held slot in **sheet 03**, explicitly unfilled. Filled
by player-role work *[currently: Identity Lead]*, which is **this same wave**, so no sheet may
depend on its output.

**G7 · One rarity vocabulary or two.** `01-FOUNDATION.md`: *"Rarity ladder lives in the
overgrowth, not in a separate drop table"* `[I assumed]`, against `03-META.md`'s *"hide rarer
sets"* and *"rarer finds"*. Cheap now that I name no ladder: **sheet 03** records whichever
vocabularies exist; a second enters through **sheet 04**'s intake. The decision is rarity-table
work *[currently: the `tiers` owner and the `collection` owner, per `OPEN.md §5` assumption 1]*.

**G8 · The `ranks` part of my `owns` has no occupant.** No mastery layer, not a power fantasy, no
titles, no levels, no player-facing ladder anywhere in the brief. **Reported empty rather than
filled.** If a later wave introduces a player rank, that is new scope, not a naming task.

**G9 · The brief has two words for the sink and no tool ladder behind either.** `CONCEPT.md`:
*"spend currency on **tools** that clear faster"*; `02-GAMEPLAY.md`: *"clearing-speed
upgrades"*; `03-META.md`: *"with no whale-tool ladder equivalent decided, the high-price SKU has
no obvious home."* Whether the three axes read as objects held or capabilities had is carried by
`upgrades[].label` and `.blurb`, which Balance owns and has already filled. → **sheet 01**
supplies the form test those strings must pass; the object-versus-capability read is the key
owner's call, and the SKU consequence stays with price-and-SKU work *[currently: Monetization]*.

**G10 · A duplicate find has no word, no sink, and no field.** *"solve duplicates without adding
a currency"* is binding on systems work and unsolved, and the `collection` key has no state
field for it. → not named. If duplicate handling ships a player-facing word it enters through
**sheet 04**'s intake. Naming it now invents vocabulary for a system that does not exist.

**G11 · The store sentence is not mine but my ban list constrains it.** Sheet 02 will forbid
words the genre's shared sentence is built from. External-name work inherits the ban or knowingly
overrules it *[currently: Discovery & Marketing, wave 5]*.

---

## Why 4 sheets

The previous plan was eleven, and five of those sheets were going to name things that live in
another domain's contract key — `upgrades` (Balance), `tiers` (Systems), `collection` and `area`
(Meta) — which `mergeSheets` rejects as a duplicated key, and rejects only after both sheets are
written. Removing them does not shrink the subject, it relocates it: **what is actually mine is
the register and the rules, because I own no key.** Four, because there are four decisions and
they fail in four different ways. The form rules fail by being unmeasurable — *"short and
readable"* is not a check, and the fields they govern are already filled on disk, so the sheet
has real values to be right or wrong about. The forbidden list fails by not being runnable by a
stranger who has never read the brief, which is why it cannot be a section inside the form
sheet: a ban list buried in an essay does not get run. The register fails by being incomplete at
wave 1, because a list that misses words is a list nobody checks against twice. And the
intake-and-adjudication protocol fails by not surviving the lineup changing — the only one of
the four whose failure is invisible until wave 5, and the only one that decides *against* a
contract-key owner, which is too consequential to be a paragraph in a file-format sheet. I
considered a fifth sheet for the word-level register test (*does this read as restoration or as
incremental*) and folded it into 02, because that test is the positive form of the same
occupancy and positioning evidence the ban list carries, and because a separate register sheet in
this wave would collide with Tone Lead, who is writing the register in the same wave.

| # | sheet | must decide |
|---|---|---|
| 01 | `naming-form` | For each string-bearing field in the build contract, the form its value must take: word count, character ceiling at a phone label width, plural formation, reading level for the 8–14 band, and the separate rule for `upgrades[].blurb`, the contract's only sentence field. Must also mark which strings are outside my subject — engine vocabulary (`patch.material`, `tiers[].shape`) and frozen identifiers (`runtime.dataStoreName`, where a rename orphans every save). Term-level only; not the global on-screen copy budget. |
| 02 | `banned-words` | The forbidden list, each entry carrying **exactly one** reason class: occupied-in-genre (with the URL), imports-a-priority-3-system, contradicts-restoration-positioning, asserts-hue-as-the-tier-signal, implies-paid-content, is-a-pun. **`relic` is the first candidate it must rule on** and it must land somewhere: on the list with the evidence, or off it with a stated reason. Not left ambiguous, because ambiguity is what drift needs. |
| 03 | `term-register` | The canonical term list as a file: where it lives, its row format, the one-spelling invariant, and its **wave-1 membership** — every word already in play, each marked player-facing or internal-only, including every coinage already sitting in a manifest block on disk. **Coins nothing new.** Carries the player's word (G6) as an explicitly held, unfilled slot. |
| 04 | `coinage-intake` | How a word enters the register after wave 1 and who wins a clash: the submission format a later sheet uses, the **precedence order** when a contract-key owner's value and a Vocabulary ruling disagree, what a later wave does when the word it needs is banned, and — because no manifest key is mine — **where enforcement happens**, stated as a requirement on the seam rather than an assumption that one exists. |

**What no sheet above may do.** Name the currency (G3), any of the 24 relics, any of the four set
labels, any tier, any upgrade label, or the area label. Every one of those is a value inside a
key someone else owns, except the currency, which is a value inside no key at all — and that is
a gap to report, not a licence to fill it.

**Each sheet ends in 2–4 checkable criteria**, per the category brief. For this domain that
means counts and invariants: *"every string in every manifest block under `cid/` appears in the
register exactly once"*, *"every banned entry carries exactly one of the six reason classes"*,
*"no rule on this sheet requires having read the brief to apply"*, *"this sheet coins zero new
terms"*.

---

## Consequences for neighbouring subjects

Stated, not acted on.

1. **The `collection` key owner** *[currently: Gameplay — Meta & Content]*: if sheet 02 bans
   `relic`, that invalidates output already on disk — `cid/gameplay/meta/02-the-collection.md`
   uses it throughout and its manifest block feeds `GameConfig.RelicSets`. The replacement word
   is the key owner's to pick, not mine.
2. **Contract and seam work** *[currently: `bridge/schema.mjs`]*: sheets 03 and 04 need either a
   contract key for player-facing strings or a lint over emitted copy. Without one, the register
   is advisory and the `SHARDS` failure recurs by construction.
3. **The `tiers` owner** *[currently: Gameplay — Systems]*: sheet 02's hue rule bites on tier
   names. The four on disk (`Moss`, `Fern`, `Bramble`, `Heartvine`) are plant nouns, not colour
   words, so they pass — recorded so the rule is not read as a demand for a rename.
4. **The `upgrades` owner** *[currently: Gameplay — Balance & Tuning]*: `VALUE / REACH / PACE`
   and three blurbs must pass sheet 01's form test, including the reading-level rule. The
   blurbs are the only prose in the contract.
5. **External-name work** *[currently: Discovery & Marketing, wave 5]*: inherits the ban list.
   A store description built from the family's shared sentence re-imports the clone read the
   ban exists to prevent.
6. **Screen and on-screen-copy work** *[currently: UI/UX, wave 4]*: the `collection-index` slug
   contains two contested words, and G5 means some register entries have nowhere to be shown.
7. **Player-role work** *[currently: Identity Lead, this wave]*: the player's word is a held
   slot, not an omission.

---

## Verification note

**Sheet 02 (`banned-words`) is most likely to be contradicted, and the contradicting party is
the `collection` key owner.** If it bans `relic`, this is not a forward-looking rule: the word is
in `03-META.md`'s session objective, in the `collection-index` screen slug, in
`ui-forge/briefs/hud.brief.json` as both a HUD label and an icon key, in `GameConfig.RelicSets`
in the emitted Luau, and in a CID sheet on disk whose manifest block the bridge reads today. The
contradiction will arrive as drift — a later wave reaching for the genre's ambient word by
reflex — rather than as an argument. Whoever assigns 02 should hand the writer that cost list
before the ruling, not after.

**Second: sheet 04, contradicted by whoever owns the seam.** It states a requirement that
player-facing strings acquire a contract key or a lint. If the answer is no, the register has no
enforcement and sheet 03 is advice.

**Third: my latitude claim, which reaches 02 and 03.** If a reviewer holds that the brief's
repeated use of a working word constitutes a decision, every status ruling becomes an overrule
of a `[brief: soft]` item rather than a `[cid: decided]` fill. I record them as `[cid: decided]`
because no naming provenance tag exists anywhere in the source, and I am naming the ambiguity
here rather than resolving it in my own favour silently.

---

## Research owed

**`must_verify`:** *"Check that a chosen term is not already the signature word of a competing
game in this genre. A borrowed term reads as a clone in the store listing."*

**This work was done in the previous pass and is reused, not re-fetched — no new fetches were
made in this re-plan, by instruction.** `research/landscape.md` checked **nouns as themes** and
says so in its own *"Not verified"* section; the check below is at the **term** level, which is
the collision that matters here. **No term is committed by this index.**

### Verified by direct page fetch

| term | status | evidence |
|---|---|---|
| **`relic`** | **occupied inside this exact genre family, twice.** In both, a relic is a *rolled multiplier item* — the incremental reading, not a discovered set-collectible. | `Scrap Incremental`: *"Roll rare Relics to power up your journey!"*, a *"unique 'Relic' system"* `[research: https://www.roblox.com/games/129774084106862/Scrap-Incremental]` · `Faith Incremental`: *"✨ Relics"* as a collectible resource beside Faith, Souls, Bibles, Trial Points and a daily wheel `[research: https://www.roblox.com/games/94264573845314/Faith-Incremental]` |
| **`tier`** | **occupied as a named progression system** in the same family. The brief uses it for overgrowth rarity — a different meaning, in a game positioned away from that family. | `Scrap Incremental` names a *"Tier system"* with *"multiple tiers to unlock"* `[research: https://www.roblox.com/games/129774084106862/Scrap-Incremental]` |
| **`artifact`** | **occupied by a game title with almost this game's collection layer.** Not a substitute for `relic`. | *"70+ artifacts to collect"*, *"80,000+ possible artifact variations"*, *"build your own museum"* — id 70698000296435, listed as both `Artifacts!` and `Dig Stuff` `[research: https://www.roblox.com/games/70698000296435/Artifacts]` |
| **`antique`** | **occupied by a shipping Roblox restoration-plus-collection game.** | `reStore`: *"Discovery old antiques, restore them to their former beauty, decorate your own store front and share your collection with the world!"* `[research: https://www.roblox.com/games/87179205054038/reStore]` |
| **`collection`** | **crowded but generic** — a category word rather than any one game's signature. | `reStore` (*"share your collection"*) `[research: https://www.roblox.com/games/87179205054038/reStore]`; `Sol's RNG`'s collectible screen `[unverified — search summary only, see below]` |

**The load-bearing finding, and the one thing from wave 1 that must survive: the brief's own word
for its differentiator is the genre's word for a gacha multiplier.** Two of the four games
`landscape.md` cites as sharing the family's store sentence use `Relics` as a named system.
**Sheet 02 rules on it as a banned-words entry with reason class occupied-in-genre.** It is not
mine to supply the replacement — that word is a value in the `collection` key.

### Checked, and nothing surfaced

Absence of evidence, in the same sense `landscape.md` uses the phrase.

- **`overgrowth` / `overgrown`** — no Roblox simulator or incremental hit; present only as level
  names in unrelated games, plus a Steam title `Overgrown Cleaner` self-describing as a
  *"clearing simulator"*.
- **`clear` / `clearing` as the harvest verb** — free, as far as this check goes. The occupied
  verbs are `trimming` (`Grass Incremental`), `cutting` (`Lumber`, `Grass Cutting`), `washing`
  (`Pressure Wash`), `shoveling` and `plowing` (both snow games), `gathering` (`Leaves`),
  `digging` (`Sand Digging`, `Treasure Hunt`, `Artifacts`), `mowing`, `cleaning`.
- **`index`** — not any game's signature word; a common Roblox developer term for a collectible
  screen. Comparatively free.
- **`ruin` / `reclaim` / `restoration`** — no incremental or simulator occupancy found.
  `restore` as a verb is in use by `reStore`.
- **`island` / `zone` / `world` as the area word** — occupied by the family's shared sentence
  (*"unlock new islands"*, four games) and by `Ore Incremental`. This corroborates the brief's
  binding *"areas, not zones"*.
- **Generic rarity ladders** — the reference ships *"Silver / Gold / Diamond"*
  `[research: research/grass-incremental.md]`; `The Space Simulator` ships *"common, rare, epic,
  legendary, mythic"*. Both genre-ambient **and** metal- or colour-coded, which is the exact
  collision with *"shape or silhouette, not only hue"*. Now a rule for sheet 02 rather than a
  ladder for me to name.

### Could not verify

- **`Ore Incremental`'s relic wording** — `[unverified]`, search summaries only (a pass granting
  *"2x luck when opening relics"*). `robipedia.com/game/ore-incremental-6722298074` returned
  **HTTP 403**. **The fetch that would settle it:** the description and pass list at
  `https://www.roblox.com/games/93445850351820/Ore-Incremental`, or its pass list on
  `rolimons.com`. Two family games are already confirmed by direct fetch, so this is redundancy,
  not the basis of the finding.
- **`Sol's RNG`'s screen name, first-party** — `https://sol-rng.fandom.com/wiki/Index` returned
  **HTTP 402**; the *"Collection"* naming is a search summary of
  `https://sol-rng.fandom.com/wiki/Collection`. **The fetch that would settle it:** that page, or
  an in-game screenshot. It matters because it is the evidence `index` is free.
- **Whether any of these games is successful.** As in `landscape.md`, *"taken"* means *"exists"*.
  No CCU or visit figures for `Scrap`, `Faith`, `Artifacts`/`Dig Stuff` or `reStore`. A term owned
  by a dead game is a weaker clone signal. **The fetch that would settle it:**
  `rolimons.com/game/<id>` for each of the four.
- **Roblox's own search ranking.** Roblox search-result pages are not fetchable here, so
  "signature word" occupancy rests on description pages plus third-party guides.
- **Currency-noun candidates** (`moss`, `sap`, `bloom`, `mulch`) — one broad search, no hit.
  **Treat as unchecked, not clear.** No longer my problem to shortlist against, since I name no
  currency (G3), but whoever ends up owning that string inherits the unfinished check.

### One finding outside my subject, passed up

`Artifacts!` / `Dig Stuff` (id 70698000296435) ships *"70+ artifacts to collect"* with museum
display, and `reStore` ships discover-restore-collect-and-show. `landscape.md` concludes *"no
game in this family surfaced a hidden-object collection layer"* — true of the `X Incremental`
family it searched, and these two sit just outside it while selling something close to this
game's **fantasy**. That is fantasy-level occupancy, which belongs to the fantasy-occupancy
search *[currently: Fantasy Lead, this wave, whose `must_verify` is exactly this and whose named
first target is `Treasure Hunt Simulator`]*. Recorded with the two URLs above so it does not have
to be found twice.
