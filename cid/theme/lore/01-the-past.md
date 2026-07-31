# 01 — The past

**Domain:** Lore · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**People worked here, ordinarily, and then finished and went. Nothing happened to them. The
place was never lost, only overgrown, and the player is not repairing it: the stone was always
sound under the green.**

The four settlements, stated flat:

| question | ruling |
|---|---|
| inhabitants? | **Yes.** Plural, unnamed, ordinary workers. Not a civilisation, not a cast, not a people with a story. |
| era? | **Deliberately undated.** No year, no century, no dynasty, no named age. The only permitted measure of age is how much has grown over it. |
| is deeper older? | **No. Depth is coverage, not chronology.** One occupation, one era, one leaving. Deeper means more thoroughly covered, never earlier or later. |
| does "restored" claim reconstruction? | **Only exposure.** Nothing is rebuilt, repaired, or added. Clearing is the only reason the stone can be seen. |

**No `manifest` block, and that is correct rather than a shortfall.** `bridge/schema.mjs` holds
ten contract keys and none is owned by `theme/*`; there is no `lore`, `history` or `fiction` key
and no field of any key holds narrative. `[research: repo — bridge/schema.mjs]` This sheet's
route to the build is as a constraint on six other domains' strings.

**This sheet decides with zero developer input.** Whether the past had inhabitants, and how long
ago anything happened, have **no interview coverage anywhere in the brief** (`OPEN.md §1` has no
row for either; *"ancient"* is the only temporal word in five sheets). A later revision should
know these four rulings were unanchored, not derived. `[cid: decided]`

---

## The constraint set

Every find name, set id, tier name, area label, upgrade blurb and art prompt must hold to all
six. Each is stated so it can be checked against another sheet's text.

| # | rule | forbidden, explicitly |
|---|---|---|
| **L1** | **Ordinary work, never power.** Every find denotes something used to measure, record, fasten, carry, hold, cover or top a building. | `sword` `blade` `spear` `shield` `armour` `armor` `crown` `coin` `idol` `skull` `bone` `amulet` `charm` `rune` `sigil` `hoard` `treasure` `gem` `jewel` |
| **L2** | **Set down, not hidden.** Things are where they were left. Nothing was concealed, sealed away, hoarded, or protected from anyone. | any string or prompt asserting that a find was hidden *by* someone, or guarded |
| **L3** | **Undated.** The canon asserts no point in time and no proper name for the place or its people. | `ancient` `era` `age` `dynasty` `empire` `century` `forgotten` `lost` `cursed` `haunted` |
| **L4** | **Depth is coverage, not chronology.** Weathering reads identical at every depth; only the quantity of green varies. | any set label, area label or prompt implying deeper is older or newer; any second ordering axis dressed as time |
| **L5** | **Exposure, not reconstruction.** Stone under overgrowth is intact and weathered, never rubble. | `rebuild` `rebuilt` `repair` `mortar` `scaffold`, and `restore`/`restored` as a claim about any specific object |
| **L6** | **No agent, ever.** Nobody caused this state, nobody is coming back, nobody is watching, nobody wants anything from the player. The inhabitants are plural, unnamed and finished. | any tier, find or area name that denotes a will, a force, or a thing that wants |

**The story in five lines, for anyone writing a prompt.** Masons, clerks, water-keepers and
sky-watchers used this place for a long time. They finished with it and left. Tools stayed on
the floor, doors stayed on their hinges, tallies stayed on the shelf. Plants came in from the
edge and took as long as plants take. Nothing here is broken that time did not settle.

## Ratification of the register already on disk

Three sheets wrote ~30 player-facing strings before any lore sheet existed. **All of them are
ratified, none needs renaming, and one is saved by L4.**

- **The 24 find names** (`cid/gameplay/meta/02-the-collection.md`): **ratified 24 of 24.** Every
  one is an instrument, a record-keeping object, a vessel, a waterwork fitting, or a piece of
  building trim. Zero weapons, zero coins, zero remains, zero ceremony. That sheet reached this
  register by instinct (*"objects a mason or a clerk would leave behind, not treasure"*); L1 is
  that instinct written down so wave 3 and wave 4 cannot drift off it.
- **The four set labels** Terrace · Cistern · Vault · Spire: **ratified as four parts of one
  complex in one era, explicitly not four periods.** `Spire` at depth 4 is the load-bearing
  case: under a *deeper-is-older* canon a spire at the deepest tier is architecturally backwards,
  because a tower is the last thing built and the highest thing standing. Under L4 it is simply
  the part the growth swallowed most completely. **My ruling on question 3 exists partly to keep
  a live contract value coherent.**
- **`EAST TERRACE`** (`cid/gameplay/meta/01-the-area.md`): **ratified.** A compass-qualified
  part-name is exactly right for a place whose own name the canon never states, which is what L3
  requires. Areas 2 to 4 must be named the same way: a part of a building, function- or
  compass-qualified, with no temporal word.
- **Moss · Fern · Bramble · Heartvine** (`cid/gameplay/systems/01-overgrowth-tiers.md`):
  **ratified.** Four plants, no menace, no will, L6 satisfied. **One flag that is not mine:**
  `Heartvine` is an invented compound and `cid/theme/vocabulary/02-banned-words.md`'s register
  says *"no invented compounds"*. That is a conflict between Vocabulary and Systems. It breaks no
  lore rule and I am not resolving it.
- **The three upgrade blurbs** (`cid/gameplay/balance/01-upgrade-ladder.md`): **ratified.** All
  three describe the player's present action and assert no history, which is exactly what L6
  wants from the only free-prose field in the contract.

## Why

- **Inhabitants are forced, not chosen.** The contract already ships a stylus, a ledger, a tally,
  a hinge and a sundial. Somebody made and used those. A canon of "nobody was ever here" would
  contradict 24 live `collection.sets[].relics` values. `[research: repo — cid/gameplay/meta/02-the-collection.md]`
- **But not a civilisation, because a civilisation was declined.** *"'Uncover a lost civilisation'
  was declined because the verb disappears"* (`05-OUTWARD.md`) `[brief: soft]`. A civilisation is
  revealed once; a workplace whose floor is still being swept is revealed forever. L3 enforces
  this mechanically by banning `lost` from every player-facing string.
- **Nothing happened to them, because nothing is allowed to have happened.** *"There is no failure
  state"* / *"Zero tension is deliberate"* (`02-GAMEPLAY.md`), elevated by `HANDOFF.md` to
  *"Do not invent tension to fill the gap"* `[brief: binding]` by elevation. A catastrophe is a
  cause, a cause implies an agent, and an agent is the tension the handoff forbids. **This is the
  writing problem solved rather than dodged: the absence of an event is the content.** A ruin of
  disuse is warm; a ruin of disaster is not, and *"Tone: warm, aged, unhurried. Not spooky, not
  grim"* (`01-FOUNDATION.md`) `[brief: soft]` ×2.
- **Undated, because a date has no delivery surface and costs proper nouns.** The whole canon
  budget is ~40 strings of which 24 are one-word find names at ≤14 characters, plus environment
  art. Neither `ui-forge` pattern has a per-item body-text field, and the generation brief says
  *"Put the flavour in artPrompt, where there is unlimited room, not in the labels."*
  `[research: repo — ui-forge/src/ideate/brief.mjs, ui-forge/src/compose/patterns/]` A named era
  would be a proper noun that every wave must keep consistent and no string has room to state.
  Age delivered as *quantity of green on stone* is legible from standing in the place, which is
  what *"No text, no tutorial"* (`02-GAMEPLAY.md`) `[brief: soft]` requires of every world fact.
- **Depth is coverage, because a chronology would be a second ordering axis.** *"Depth is
  progression"* `[brief: binding]` `[you chose: R3 Q2]` gives the world exactly one ordering axis.
  A deeper-is-older stratigraphy quietly adds a temporal axis on top of it, and Setting's index
  reads the same line as *"One ordering axis, and it is depth. No second axis (no breadth, no
  era-tier, no difficulty band)."* Coverage also **holds under either of Setting's depth
  geometries**: vertical (further under soil and canopy) and horizontal (further in from the edge
  the plants entered by) both mean *more thoroughly covered*.
- **Exposure, because the player has no build verb.** *"Input: movement only. No aiming, clicking,
  or ability buttons"* `[brief: soft]` `[you accepted: step 6 Q3]` and *"Clearing and discovering
  are one action. Do not design them as separate systems"* `[brief: soft]`. A canon of
  reconstruction promises a system priority 1 does not fund, against *"the smallest game that
  still gives every creative area real work"* `[brief: binding]` `[you chose: R1 Q3]`.
  Priority 2's *"visitable restored ruins"* survives intact: a restored ruin is one that is
  **clear**, not one that is **repaired**.
- **Holds under either scale ruling.** Setting's sheet `02` decides one ruin or many. This canon
  says only that people worked and finished; that is as true of one complex as of forty. **This
  sheet does not decide scale and does not depend on it.**
- **Conditional on the unresolved rarity model (`OPEN.md §5` assumption 1 against
  `03-META.md`'s *"hide rarer sets"*).** I assume neither answer. Whichever way Systems (wave 2)
  and Meta & Content (wave 3) rule, **the fiction of rarity is coverage**: a find is rare because
  of how thoroughly it was buried, never because it is precious, unique in the world, or
  magical. That statement is true under a single overgrowth ladder and under a separate find
  ladder, and L1 forbids the "precious" reading either way.

## Pushing back

**I am overruling *"Relics must read as treasure"*** (`04-PRESENTATION.md`, `[brief: soft]`, a
reason given under `[you accepted: R5 Q2]` for the `fantasy-ornate` vibe key). L1 makes the finds
worn tools and building fittings, which is not treasure.

Three reasons. **First, Vocabulary already overruled it and shipped the overrule:**
`cid/theme/vocabulary/02-banned-words.md` bans the word `treasure` with the stated reason *"it
contradicts the mason-and-clerk register of the collection"*, and `Meta & Content` wrote 24 names
to that register. I am ratifying a live decision, not opening a new front. **Second, treasure is
already taken at the fantasy level:** the brief's own map lists *Treasure Hunt Simulator* (digs
treasure out of sand) as the nearest competitor, taken twice, and `research/landscape.md`
concludes the noun cannot differentiate. **Third, the art direction survives the overrule.**
`fantasy-ornate` was also chosen because *"green overgrowth on warm stone is naturally
high-contrast"*, which is untouched, and *ornament* is a property of aged carved stone and cast
fittings rather than of gold.

**What replaces "treasure" as the mechanism:** a find reads as worth having because of the
reveal, not the material. That load is already funded and assigned elsewhere: *"a relic reveal
owns the best sound in the game"* (`OPEN.md §2`), the reveal is the first thing that happens in
ten seconds (`02-GAMEPLAY.md`), and the collection grid shows empty slots. **Art must not add
gold, gilding or gemstones to compensate.**

## Consequences for other work

- **Meta & Content** (`collection`, `area`): 24 names and 4 labels ratified, zero renames owed.
  **Areas 2 to 4 must be named as parts of a building, and no area label may carry a temporal
  word.** Set themes in wave 3 may be functions, rooms or trades; **they may not be periods,
  generations, or "the older layer".**
- **Art — Environment**: *"restored"* is **the same stone, uncovered**. No scaffolding, no fresh
  mortar, no new-looking masonry, no gilding appearing on clear. The masonry modelled **under**
  the overgrowth must be sound and weathered, because if it is rubble then clearing produces
  rubble and the payoff reads as damage. **Weathering is uniform across all four depths;** only
  green quantity varies. This closes `04-PRESENTATION.md`'s open item *"what 'restored' looks like
  versus 'overgrown'"* at the fiction level.
- **Art — Objects**: 24 worn tools and fittings, not a hoard. See `## Pushing back`: no gold, no
  gems, no gilding. Ornament comes from carving, casting and age.
- **Setting** (`the-ruin`, `extent`, `physical-law`, `inventory`): question 1 is now answered, so
  **`05-inventory`'s absent column must not list "no inhabitants"; the correct entry is "nobody
  present now."** Setting may not write a catastrophe, an evacuation, an abandonment under duress,
  or a chronology of layers. Setting keeps scale, geometry, climate and the physical law
  untouched, and this sheet holds under any ruling it makes on them.
- **Identity**: the player is **not** a descendant, an heir, a hired archaeologist, or someone the
  builders left instructions for. Nobody is waiting. Who the player is stays entirely open, but
  attaching them to the builders by blood or mandate would turn the past into a claim on the
  player, and a claim is a stake.
- **Tone**: this canon contains no event worth an exclamation mark and no line that needs heat.
  It should make the *"dry and sparse"* register easier to hold, not harder.
- **Vocabulary**: **this sheet coins zero proper nouns**, so the canonical list gains nothing from
  it. That is deliberate and follows from L3. Two items land on Vocabulary from here: the
  `Heartvine` compound conflict above, and the forbidden word lists in L1, L3 and L5, which are
  offered as candidate additions to the runnable ban list where they do not duplicate it.
- **Balance & Tuning**: the three existing blurbs pass. Any future blurb must describe what the
  player does, never what happened here.
- **Sheet `02 · the-silences` in this domain**: I answered *why they left* only to the extent of
  "nothing happened to them". Whether the specific reason, the place's proper name, the people's
  name, and the elapsed time are **permanently** unanswered is 02's call, not mine. Per this
  domain's conflict rule, if 02 lists a question 01 answered, the revision goes to 02.

## Acceptance criteria

1. **Forbidden-class check.** No string in `collection.sets[].relics` matches any word in L1's
   forbidden list. The current 24 pass 24 of 24, with 0 matches.
2. **Temporal check.** No player-facing string in the merged manifest (`area.label`,
   `collection.sets[].label`, `collection.sets[].relics`, `tiers[].name`, `upgrades[].label`,
   `upgrades[].blurb`, `currency.name`, `currency.plural`) matches any word in L3's forbidden
   list. The current manifest returns 0 matches.
3. **Reconstruction check.** No `upgrades[].blurb` and no `artPrompt` in the build contains
   `rebuild`, `rebuilt`, `repair`, `mortar`, or `scaffold`. The current three blurbs return 0
   matches.
4. **Coinage check.** This sheet introduces zero proper nouns, so Vocabulary's canonical list
   gains exactly 0 entries from it, and 0 terms here require collection.

## Not decided here

Scale, depth geometry, climate, and what kind of built thing this is (Setting: `01-the-ruin`,
`02-extent`, `03-physical-law`). Which questions are permanently unanswered (Lore: `02-the-silences`).
Who the player is (Identity). The four set themes and the labels for areas 2 to 4
(Meta & Content). What the 24 objects look like and what the cleared stone looks like
(Art — Objects, Art — Environment). Whether find rarity exists separately from overgrowth
rarity (Systems, wave 2; Meta & Content, wave 3): this sheet states a conditional that holds
either way and assumes neither.

## Flagged to the developer

**All four rulings above answer questions the brief never asked.** Live alternatives, each with
why I rejected it:

| alternative | why not |
|---|---|
| **No inhabitants ever.** The objects have no maker; the place is a formation. | Contradicted by 24 made objects already in the contract as live values. Not recoverable without renaming the collection. |
| **A named era and a named people.** "The Third Terrace Works", a dated age. | Costs proper nouns with no surface to state them on. Every wave then has to keep a chronology consistent for zero delivered strings. |
| **Deeper is older.** A stratigraphy: each depth a different generation. | Adds a second ordering axis on top of a binding one-axis decision, and puts a spire at the deepest tier, which is backwards. |
| **Restored means rebuilt.** The player repairs as well as clears. | The player has movement only, and a build verb is unfunded at priority 1. |

**The one judgment call I would genuinely like a ruling on:** whether *"they finished and went"*
should ever be **stated** anywhere, or stay a silence the player infers from a stylus left on a
floor. **My recommendation: keep it a silence.** There is no text surface to state it on, and
inference is stronger here than assertion. Sheet `02 · the-silences` owns that question and can
be overruled cheaply either way.
