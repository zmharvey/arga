# 01 — The past

**Domain:** Lore · **Category:** Theme & Narrative · **Wave:** 1 (revised wave 7)

## Decision

**People worked here, ordinarily, and then finished and went. Nothing happened to them. The place
was never lost, only overgrown, and the player is not repairing it: the stone was always sound
under the green.** Four rulings, six rules, and they are emitted as a proposed `canon` key rather
than left as prose.

| # | question | ruling |
|---|---|---|
| R1 | inhabitants? | **Yes.** Plural, unnamed, ordinary workers. Not a civilisation, not a cast, not a people with a story. |
| R2 | era? | **Deliberately undated.** No year, no century, no dynasty, no named age. The only permitted measure of age is how much has grown over it. |
| R3 | is deeper older? | **No. Depth is coverage, not chronology.** One occupation, one era, one leaving. Deeper means more thoroughly covered, never earlier or later. |
| R4 | does "restored" claim reconstruction? | **Only exposure.** Nothing is rebuilt, repaired or added. Clearing is the only reason the stone can be seen. |

## Why

- **Inhabitants are forced, not chosen.** `collection` already ships a Stylus, a Ledger, a Tally,
  a Hinge and a Sundial. Somebody made and used those; "nobody was ever here" contradicts 24 live
  values. `[research: cid/gameplay/meta/02-the-collection.md]`
- **But not a civilisation.** *"'Uncover a lost civilisation' was declined because the verb
  disappears"* (`05-OUTWARD.md`) `[brief: soft]`. L3 bans `lost` mechanically so the refused line
  cannot return through a name.
- **Nothing happened to them, because nothing is allowed to have happened.** *"There is no failure
  state"* / *"Zero tension is deliberate"* (`02-GAMEPLAY.md`), elevated by `HANDOFF.md` to *"Do not
  invent tension to fill the gap"* `[brief: binding]` by elevation. A catastrophe is a cause, a
  cause implies an agent, and an agent is the tension the handoff forbids. **The absence of an
  event is the content.** A ruin of disuse is warm; a ruin of disaster is not, against *"warm,
  aged, unhurried. Not spooky, not grim"* (`01-FOUNDATION.md`) `[brief: soft]`.
- **Undated, because a date has no delivery surface.** Neither `ui-forge` pattern has a per-item
  body-text field and the generation brief says *"Put the flavour in artPrompt, not in the
  labels."* `[research: ui-forge/src/ideate/brief.mjs]` A named era is a proper noun every wave
  must keep consistent and no string has room to state. Age delivered as *quantity of green on
  stone* is legible from standing in the place, which is what *"No text, no tutorial"*
  `[brief: soft]` requires of every world fact.
- **Depth is coverage, because a chronology is a second ordering axis.** *"Depth is progression"*
  `[brief: binding]` ← `[you chose: R3 Q2]` gives the world one ordering axis. It also keeps a live
  contract value coherent: `Spire` sits at depth 4, and under a deeper-is-older canon a tower at the
  deepest tier is architecturally backwards. Under R3 it is simply the part the growth swallowed
  most completely. Coverage holds under either of Setting's depth geometries.
- **Exposure, because the player has no build verb.** *"Input: movement only"* and *"Clearing and
  discovering are one action"* `[brief: soft]`. A canon of reconstruction promises a system
  priority 1 does not fund. Priority 2's *"visitable restored ruins"* survives: a restored ruin is
  one that is **clear**, not one that is **repaired**.
- **All four answer questions the brief never asked.** `OPEN.md §1` has no audit row for the
  ruin's history; *"ancient"* is the only temporal word in five sheets. `[cid: decided]`

## The constraint set

Every find name, set id, tier name, area label, upgrade blurb, `artPrompt` and store line must hold
to all six. `[cid: decided]`

| # | rule | forbidden, explicitly |
|---|---|---|
| **L1** | **Ordinary work, never power.** Every find denotes something used to measure, record, fasten, carry, hold, cover or top a building. | `sword` `blade` `spear` `shield` `armour` `armor` `crown` `coin` `idol` `skull` `bone` `amulet` `charm` `rune` `sigil` `hoard` `treasure` `gem` `jewel` |
| **L2** | **Set down, not hidden.** Things are where they were left. Nothing was concealed, sealed away, hoarded or protected from anyone. | any string or prompt asserting a find was hidden *by* someone, or guarded |
| **L3** | **Undated.** The canon asserts no point in time and no proper name for the place or its people. | `ancient` `era` `age` `dynasty` `empire` `century` `forgotten` `lost` `cursed` `haunted` |
| **L4** | **Depth is coverage, not chronology.** Weathering reads identical at every depth; only the quantity of green varies. | any set label, area label or prompt implying deeper is older or newer; any second ordering axis dressed as time |
| **L5** | **Exposure, not reconstruction.** Stone under overgrowth is intact and weathered, never rubble. | `rebuild` `rebuilt` `repair` `mortar` `scaffold`, and `restore`/`restored` as a claim about a specific object |
| **L6** | **No agent, ever.** Nobody caused this state, nobody is coming back, nobody is watching, nobody wants anything from the player. | any tier, find or area name denoting a will, a force, or a thing that wants |

**The story in five lines, for anyone writing a prompt.** Masons, clerks, water-keepers and
sky-watchers used this place for a long time. They finished with it and left. Tools stayed on the
floor, doors stayed on their hinges, tallies stayed on the shelf. Plants came in from the edge and
took as long as plants take. Nothing here is broken that time did not settle.

## Ratification of the register already on disk

| value | verdict |
|---|---|
| the 24 find names (`collection.sets[].relics`) | **24 of 24 ratified.** Every one is an instrument, a record-keeping object, a vessel, a waterwork fitting or building trim. Zero weapons, coins, remains or ceremony |
| the four set labels Terrace · Cistern · Vault · Spire | **ratified as four parts of one complex in one era**, explicitly not four periods. `Spire` at depth 4 is the case R3 exists to keep coherent |
| `area.label` "East Terrace", and `depths.areas[].label` East/West × 4 | **ratified.** A compass-qualified part-name is exactly what L3 requires of a place whose own name the canon never states |
| `tiers[].name` Moss · Fern · Bramble · Heartvine | **ratified.** Four plants, no menace, no will, L6 satisfied. `Heartvine` remains an invented compound against Vocabulary's register — that conflict is Vocabulary's, not mine |
| the three `upgrades[].blurb` values | **ratified.** All three describe the player's present action and assert no history, which is what L6 wants of the only free-prose field |

```manifest
{
  "provides": "canon",
  "status": "proposed",
  "value": {
    "why": "no merged key holds fiction, and vocabulary.bannedWords cannot reach the fields that do: playerFacingStrings() enumerates labels, blurbs and find names only, never an artPrompt. This key is the constraint set for every field it cannot reach.",
    "consumedBy": ["art/objects objectArt artPrompt fields", "art/environment chunkDressing artPrompt fields", "marketing storeListing.description", "ui-ux notices and screens copy", "reviewers of any coined name"],
    "coinedProperNouns": 0,
    "playerFacingStrings": 0,
    "rulings": [
      { "id": "R1", "question": "were there inhabitants", "answer": "yes", "form": "plural, unnamed, ordinary workers; not a civilisation and not a cast", "forcedBy": "24 made objects already live in collection.sets[].relics" },
      { "id": "R2", "question": "what era", "answer": "undated", "form": "no year, century, dynasty or named age; the only permitted measure of age is quantity of overgrowth", "forcedBy": "no text surface exists to state a date on" },
      { "id": "R3", "question": "is deeper older", "answer": "no", "form": "depth is coverage; one occupation, one era, one leaving", "forcedBy": "depth is the single ordering axis (brief binding), and Spire sits at depth 4" },
      { "id": "R4", "question": "does restored mean rebuilt", "answer": "no", "form": "exposure only; nothing is rebuilt, repaired or added", "forcedBy": "the player has movement only and no build verb is funded at priority 1" }
    ],
    "rules": [
      { "id": "L1", "rule": "ordinary work, never power", "forbidden": ["sword","blade","spear","shield","armour","armor","crown","coin","idol","skull","bone","amulet","charm","rune","sigil","hoard","treasure","gem","jewel"] },
      { "id": "L2", "rule": "set down, not hidden; nothing was concealed by anyone", "forbidden": ["any assertion that a find was hidden BY someone, or guarded"] },
      { "id": "L3", "rule": "undated; no proper noun for the place or its people", "forbidden": ["ancient","era","age","dynasty","empire","century","forgotten","lost","cursed","haunted"] },
      { "id": "L4", "rule": "depth is coverage, not chronology; weathering is uniform at every depth and only green quantity varies", "forbidden": ["any label or prompt implying deeper is older or newer","any second ordering axis dressed as time"] },
      { "id": "L5", "rule": "exposure, not reconstruction; stone under overgrowth is intact and weathered, never rubble", "forbidden": ["rebuild","rebuilt","repair","mortar","scaffold","restore or restored as a claim about a specific object"] },
      { "id": "L6", "rule": "no agent, ever; nobody caused this, nobody is coming back, nobody wants anything from the player", "forbidden": ["any tier, find or area name denoting a will, a force, or a thing that wants"] }
    ],
    "scope": {
      "appliesTo": ["every value listed by bridge/schema.mjs playerFacingStrings()", "every artPrompt field in any key", "storeListing.description", "any notice or screen copy string"],
      "exempt": ["internal field names and slugs, per vocabulary/02", "prose in a spec sheet reasoning ABOUT the canon"]
    },
    "silences": "supplied as an amendment by cid/theme/lore/02-the-silences.md; six rows, each with an id, a question, a token list and a structural test. This key declares the field; that sheet decides its contents.",
    "enforcement": {
      "hardHalf": "the L1, L3 and L5 word lists, requested into vocabulary.bannedWords below, where the merger fails a build on a hit",
      "softHalf": "L2, L4, L6 and every artPrompt: reviewer-checkable only, because nothing in the pipeline reads an artPrompt",
      "knownGap": "a wave-4 artPrompt contradicting wave-1 canon passes the merge silently. This key exists so the reviewer has one artifact to hold rather than a sheet to re-read."
    }
  }
}
```

```json
{
  "amends": "vocabulary",
  "field": "bannedWords",
  "requestedBy": "cid/theme/lore/01-the-past.md",
  "reasonClass": "canon, not occupancy — these words do not collide with a competitor, they assert a past this game does not have",
  "checkedAgainstCurrentManifest": "0 hits, whole-word case-insensitive, against all 40 player-facing strings on disk today",
  "add": [
    { "word": "hoard",       "reason": "L1 — the finds are worn tools and fittings, not a hoard" },
    { "word": "idol",        "reason": "L1 — denotes a will, which L6 forbids" },
    { "word": "amulet",      "reason": "L1 — imports the item fantasy the register was chosen against" },
    { "word": "rune",        "reason": "L1 — asserts a written language, which R2 declines to date and S2 declines to name" },
    { "word": "sigil",       "reason": "L1 — same, and it implies a party that owned the mark" },
    { "word": "crown",       "reason": "L1 — power, and a named ruler S2 forbids" },
    { "word": "skull",       "reason": "L1 — remains make the leaving an event and the place grim" },
    { "word": "bone",        "reason": "L1 — same" },
    { "word": "coin",        "reason": "L1 — a currency of the past implies an economy and a counterparty" },
    { "word": "gem",         "reason": "L1 — value as material, which the reveal is supposed to carry instead" },
    { "word": "jewel",       "reason": "L1 — same" },
    { "word": "ancient",     "reason": "L3 — dates the place; the only permitted measure of age is quantity of overgrowth" },
    { "word": "era",         "reason": "L3 — same" },
    { "word": "dynasty",     "reason": "L3 — names a people, which the canon never does" },
    { "word": "empire",      "reason": "L3 — same" },
    { "word": "century",     "reason": "L3 — a stated interval, which R2 forbids" },
    { "word": "forgotten",   "reason": "L3 — implies someone did the forgetting, and it is the store line 05-OUTWARD declined" },
    { "word": "lost",        "reason": "L3 — the exact word in the declined hook line, and the place was never lost" },
    { "word": "cursed",      "reason": "L3 — grim, and it is an agent" },
    { "word": "haunted",     "reason": "L3 — 04-PRESENTATION: reclamation, not a haunted place" },
    { "word": "rebuild",     "reason": "L5 — the player has no build verb" },
    { "word": "rebuilt",     "reason": "L5 — same" },
    { "word": "repair",      "reason": "L5 — same" },
    { "word": "mortar",      "reason": "L5 — fresh mortar is the visual claim R4 refuses" },
    { "word": "scaffold",    "reason": "L5 — same" }
  ]
}
```

## Consequences for other work

- **Object art and environment dressing** (`objectArt`, `chunkDressing`): `canon.rules` is the
  constraint on every `artPrompt`, which is the only unlimited-length field in the pipeline and the
  only place a full sentence of invented history fits. *"Restored"* is **the same stone,
  uncovered**: no scaffolding, no fresh mortar, no new masonry, no gilding on clear. **Weathering is
  uniform across all four depths;** only green quantity varies. The masonry modelled *under* the
  overgrowth must be sound, because if it is rubble then clearing produces rubble and the payoff
  reads as damage.
- **Set themes and area labels** (Meta & Content): the eight `depths.areas[].label` values are
  ratified. Set themes may be functions, rooms or trades; **they may not be periods, generations,
  or "the older layer".**
- **Banned words** (Vocabulary): 25 additions requested above, with reasons, checked to zero hits.
  Vocabulary decides whether to take them; a decline is a decline of the hard half only, not of the
  rule.
- **Player identity** (Identity): the player is **not** a descendant, an heir, a hired
  archaeologist, or someone the builders left instructions for. Attaching them to the builders by
  blood or mandate turns the past into a claim on the player, and a claim is a stake.
- **The store description** (Marketing): `storeListing.description` is in `canon.scope.appliesTo`,
  and the sentence the genre reaches for is the one `05-OUTWARD.md` already declined.
- **Sheet `02` in this domain** amends `canon.silences`. It owns which questions stay unanswered
  permanently; I answered *why they left* only to the extent of "nothing happened to them".

## Acceptance criteria

1. `npm run bridge` reports `canon` among its proposed keys, sourced from this sheet, with exactly
   4 `rulings` rows and 6 `rules` rows, and no other sheet proposes `canon`.
2. Every word in `canon.rules[].forbidden` returns **zero** whole-word case-insensitive hits
   against every value `bridge/schema.mjs playerFacingStrings()` returns for the merged manifest.
   The count is 0 of 40 strings today.
3. This sheet coins **zero** proper nouns, so Vocabulary's canonical term list gains 0 entries from
   it and 0 terms here require collection.
4. Every `vocabulary` amendment row carries both a `word` and a `reason`, and every reason names
   the rule id (`L1`, `L3` or `L5`) it enforces.

## Pushing back

**Overruled: *"Relics must read as treasure"*** (`04-PRESENTATION.md`, `[brief: soft]`, given as a
reason for the `fantasy-ornate` vibe key). L1 makes the finds worn tools and building fittings.

Three reasons. **Vocabulary already shipped the overrule** — `theme/vocabulary/02` bans `treasure`
with the stated reason *"it contradicts the mason-and-clerk register of the collection"*, and Meta
& Content wrote 24 names to that register; I am ratifying a live decision, not opening a front.
**Treasure is occupied** — the brief's own map lists *Treasure Hunt Simulator* as the nearest
competitor. **The art direction survives** — `fantasy-ornate` was also chosen because *"green
overgrowth on warm stone is naturally high-contrast"*, and ornament is a property of aged carved
stone and cast fittings rather than of gold. What replaces treasure as the mechanism is the reveal,
already funded: `stingers.cues[findReveal]` is the loudest cue in the game. **Art must not add
gold, gilding or gemstones to compensate.**

## Flagged to the developer

**All four rulings answer questions the brief never asked.** Live alternatives, each rejected:

| alternative | why not |
|---|---|
| **No inhabitants ever.** The objects have no maker; the place is a formation | contradicted by 24 made objects live in the contract. Not recoverable without renaming the collection |
| **A named era and a named people** | costs proper nouns with no surface to state them on; every wave then keeps a chronology consistent for zero delivered strings |
| **Deeper is older** | adds a second ordering axis on top of a binding one-axis decision, and puts a spire at the deepest tier |
| **Restored means rebuilt** | the player has movement only, and a build verb is unfunded at priority 1 |

**The one judgment call worth a ruling:** whether *"they finished and went"* should ever be
**stated**, or stay a silence inferred from a stylus on a floor. **Recommendation: keep it a
silence.** There is no text surface to state it on. Sheet `02` owns that question.

## Not decided here

Which questions are permanently unanswered, and their token lists — `canon.silences`, amended by
`02-the-silences`, this domain. Scale, depth geometry, climate and what kind of built thing this is
(Setting). Who the player is (Identity). The four set themes (Meta & Content). What the 24 objects
and the cleared stone look like (Art — Objects, Art — Environment). Whether `vocabulary` takes the
25 requested bans (Vocabulary owns that key). Whether `canon` is promoted into `bridge/schema.mjs`
(build-contract definition).
