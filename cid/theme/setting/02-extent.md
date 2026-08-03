# 02 — Extent

**Domain:** Setting · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**One works, never a second. An area is one working part of it** — a platform, a chamber bay, a
record bay, a tower stage — **and the four set labels name four kinds of part, not four places.**
There is more than one of every kind, because one chamber never held a wet season and one platform
never carried a hillside's catchment.

**Depth points inward, not down: away from the one open edge a person walks in by, further into the
hillside and its closed canopy.** Elevation is dressing and carries no progression meaning — a
deeper part may stand higher or lower than a shallower one, and neither reads as progress. *Deeper*
means *further in*, which is what makes it also mean *more thoroughly covered*, which is history
work's L4 already.

**The works cannot be exhausted because it is uncounted, not because it is infinite.** Canon states
no number of parts, no length, no plan and no boundary, and no view of the whole ever exists: every
part is a walled platform or a vaulted bay on a wooded slope, so the horizon is about one part wide
by construction. What is unbounded is what the player has not yet walked to. Nothing is being added.

**Depth is an ordering, not a coordinate. No spatial relation between two areas is canon** — no
adjacency, no bearing, no distance, no map. Depth says how far in a part is, never where it sits.
That single line is what keeps layout entirely with the people who own it, and it is the only
formulation true of the arrangement the build actually ships.

**Past the fourth set the works continues as more parts of the same four kinds, further in, with
nothing new to find.** No fifth kind of part, no summit, no floor, no last area.

**This sheet amends `setting.extent`; `01-the-ruin` carries the key.** The numbers this decision
touches — `area.size`, `area.originXZ`, `collection.areasPerDepth`, `depths.areaCount` — are all
`gameplay/meta`'s, and the block below states requirements on them and sets none. What it does set
is the shape of the place: one works, four kinds of part, an inward axis, no total and no adjacency.
Three merged keys have since implemented exactly that, and the block names the fields
`[research: repo — cid/gameplay/meta/06-plot-arrangement.md, cid/gameplay/meta/04-the-depth-ladder.md,
read this run]`.

**This sheet coins zero terms.** The fiction of the repeating part rides on a word the contract
already has: an `area` **is** the works's part. Naming work gains nothing to collect.

```json
{
  "amends": "setting",
  "requested_by": "cid/theme/setting/02-extent.md",
  "extent": {
    "worksCount": 1,
    "secondBuildingOfAnyKind": 0,
    "areaIs": "one working part of the one works",
    "partKindCount": 4,
    "partKindsAreKindsNotPlaces": true,
    "instancesPerKind": "more than one. collection.areasPerDepth may take any integer >= 1 with 0 renames; it currently ships 2 and depths.areaCount ships 8.",
    "fifthKindOfPart": 0,
    "finalPart": 0,
    "summitOrFloor": 0,
    "depthAxis": "inward, away from the one open edge a person walks in by",
    "depthAxisIsElevation": false,
    "whyNotElevation": "collection.sets ships Cistern and Vault (substructure) at depths 2 and 3 and Spire (superstructure) at depth 4, so a vertical axis would run down, down, then up, and is falsified by values already on disk.",
    "elevationCarriesProgressionMeaning": false,
    "deeperMeans": ["further in", "more thoroughly covered", "denser", "rarer sets"],
    "densityHasAFictionalReasonToRiseInward": true,
    "sizeHasNoFictionalReason": "if core-loop/04's stud band bites, spend density rather than size",
    "totalStatedAnywhere": false,
    "uncountedNotInfinite": "canon declines to count. No total, no plan, no survey mark, no boundary stone, no map, no vantage point.",
    "viewOfTheWhole": 0,
    "sightlineIsAboutOnePartWide": true,
    "spatialRelationsCanon": [],
    "spatialRelationsExcluded": ["adjacency", "bearing", "distance", "map", "plan", "signpost", "survey mark", "boundary stone"],
    "pastTheFourthSet": "more parts of the same four kinds, further in, with nothing new to find",
    "shuffleGoverns": "which part you meet next, never whether it exists",
    "createdWhilePlaying": 0,
    "accruedWhileAway": 0,
    "bannedDirectionWords": ["descend", "descends", "descended", "descent", "underground", "subterranean", "catacomb", "cavern", "dungeon", "abyss", "sunken", "summit", "peak", "topmost", "last area"],
    "bannedDirectionWordsScope": "manifest string values and artPrompt values, whole-word case-insensitive. Prose and quoted research are exempt.",
    "unavailableStoreWords": ["islands", "worlds", "maps"],
    "playerFacingTotals": {
      "permitted": ["the 24-slot collection index", "any count of parts the player has finished"],
      "forbidden": ["a total number of areas that exist", "a fraction or percentage of the works cleared", "N of M areas", "N% of the ruin", "a map", "an elevation cross-section", "depth drawn as a stack of levels or a descending shaft"]
    },
    "carriedDownstreamBy": [
      { "field": "plots.laneAxis", "value": "+Z", "holds": "the inward direction; the lane is the works running inward" },
      { "field": "plots.bays[]", "holds": "eight parts of one continuous works, not eight places" },
      { "field": "depths.areaCount", "value": 8, "holds": "two instances of each of the four kinds — kind, not place, realised" },
      { "field": "environment.tuples[].residency", "holds": "one design repeated the length of the lane; repetition is the evidence, not the artifact" }
    ],
    "coPresenceNeedsNoWorldRule": "nobody owns the works; every kind of part exists in quantity, so two people working a terrace are working two terraces; and no adjacency is canon, so the fiction makes no claim about what stands where nobody is working."
  }
}
```

## Why

### The brief contradicts itself here, and the contradiction is the assignment

*"reclaim a ruin"* and *"what the ruin actually is"* are singular; *"**Endless via shuffled authored
chunks**, not generation"* `[brief: binding]` `[you chose: R5 Q1]` and priority 2's *"visitable
restored **ruins**"* `[brief: soft]` `[I assumed — the ordering]` are unbounded and plural
(`03-META.md`). Nothing in six sheets reconciles them, and `OPEN.md §1` has no audit row for scale.
So this is a defect in the source being resolved, not latitude being spent. `[cid: decided]`

**The plural costs nothing under this ruling.** Many finished parts of one works is plural. *"Ruins"*
is loose prose about finished areas, not a claim that there are several ruins, so priority 2 survives
without a second building anywhere.

### The island chain is the genre's own boilerplate, and it fails on five separate counts

The shape to beat is stated in the brief's own research: *"the more you rebirth and upgrade ...
unlock **new islands** and upgrades"*, near-identical across four games by at least two studios, with
the conclusion *"Choosing an 'unoccupied' theme is a race that cannot be won by picking harder"*
`[research: research/landscape.md — the brief's fetch, not mine]`. Weighed as my index required, and
rejected:

1. It is the sentence four competitors ship, against *"marketed as a **restoration game**, not an
   incremental"* `[brief: binding]` `[you chose: R4 Q2]`.
2. Every link needs its own identity, which means proper nouns — forbidden by history work's L3
   (*"the canon asserts no proper name for the place"*) and `S2` (*"never answered as an identity"*)
   (`cid/theme/lore/01-the-past.md`, `02-the-silences.md`).
3. Every link needs a new building type, against *"the smallest game that still gives every creative
   area real work"* `[brief: binding]` `[you chose: R1 Q3]` and against `01-the-ruin`'s explicit
   bound on this sheet (*"may not require ... a fifth kind of part"*).
4. A chain is visible: the next island is on the skyline. That contradicts *"nothing built, tended,
   inhabited, travelled or lit is visible from inside the place"*
   (`cid/theme/setting/01-the-ruin.md`), which I am not reopening.
5. Content arriving in batches of separate places is what a generated world looks like from the
   outside, which is the one reading `[you chose: R5 Q1]` exists to prevent.

### Depth cannot be elevation, and the proof is already shipped in a contract value

`collection.sets[].label` ships **Terrace · Cistern · Vault · Spire** at depths 1–4
(`cid/gameplay/meta/02-the-collection.md`). In the building system `01-the-ruin` borrowed, a cistern
and a vault are *substructure* — a terrace level *"reserved for cisterns"* over vaulted substructure
`[research: https://en.wikipedia.org/wiki/Villa_of_Domitian — relayed from `01-the-ruin`, fetched
there, not re-fetched here]` — and a spire is *superstructure*. **So a vertical depth axis runs down,
down, then up, and is falsified by values already on disk.** A horizontal axis is falsified by
nothing. `[cid: decided]`

**This overrules nothing binding, and I want that checked rather than assumed.** *"Depth is
progression — deeper areas are larger, denser, and hide rarer sets"* `[brief: binding]`
`[you chose: R3 Q2]` fixes an axis and its properties; every one of them survives here — one axis,
deeper is denser, deeper hides rarer sets. The word *deeper* is not an elevation claim (*deep in the
wood* is horizontal), and the brief's own second statement of the same decision glosses it as
*"further in means denser overgrowth and rarer finds"* `[brief: soft]` (`01-FOUNDATION.md`). Two
geometries, one axis, no reconciliation in the source — my index logged it as gap 5 and routed it
here. I pick the one that does not contradict a shipped value.

**`01-the-ruin` left this unspent on purpose and told me to check history work before spending it.**
I did: *"Depth is coverage, not chronology"* uses the tower at depth 4 as its load-bearing case
(L4, `cid/theme/lore/01-the-past.md`). Inward-from-the-edge is the geometry that makes coverage
*literal* rather than merely compatible: the plants came in from the edge, so the parts furthest from
the edge are the parts they reached longest ago and covered most completely. Elevation would make the
Spire the top of the world and depth 4 the end of it, and an endless world may not have an end.

**It also pays for the axis's stated properties in the cheaper currency.** *Larger* and *denser* are
both asserted of deeper areas, and core-loop work has bounded an area to 81–133 studs square at base
stats (`cid/gameplay/core-loop/04-lap-vs-session.md`), which leaves *larger* very little room. **The
fiction supplies a reason for density to rise inward (the canopy closes away from the open edge) and
supplies no reason at all for size.** If that band forces a choice, density is the one this place
backs. The numbers are not mine.

### One works, because a works is one system, and the water is what makes it one

The connective tissue is the reason there cannot be a second: the parts share one catchment and one
channel network, and a catchment is not a thing you have two of on one hillside. A cistern bay that
no channel reaches is not a second works, it is a hole. That argument comes from the function
`01-the-ruin` fixed (*"a stone works built to gather water and keep the count of it"*) rather than
from anything I invented, which is why the four labels resolve as four kinds of part of one system
rather than four places. `[cid: decided]`

### Repetition is what a works looks like, and this is the whole endlessness answer

`01-the-ruin` handed me the property and asked me to spend it: *"a works is built in **repeating
functional units** ... so more of it is always plausible without a new kind of building, and a
repeated unit is exactly what makes an authored chunk read as made by hands."* The reason the
repetition is not a content trick is that **the job repeats, so the part repeats**, and real water
works are built exactly this way:

- The Basilica Cistern is *"336 marble columns, each 9 metres high, arranged in 12 rows of 28 columns
  each spaced 5 metres apart"*, described as *"a forest of 336 marble columns"*, holding 80,000 m³.
  `[research: https://en.wikipedia.org/wiki/Basilica_Cistern]`
- The Piscina Mirabilis is *"four rows of twelve cruciform pillars per row"* dividing the interior
  into *"five long naves and thirteen courtyards"* under *"a barrel vaulted ceiling"*, 72 × 25 m,
  12,600 m³, built to hold aqueduct water. `[research: https://en.wikipedia.org/wiki/Piscina_Mirabilis]`
- Terracing is by definition serial: *"platforms are created successively down the terrain in a
  pattern that resembles the steps of a staircase"*, walled, and used to manage runoff.
  `[research: https://en.wikipedia.org/wiki/Terrace_(agriculture)]` Cited for the landform practice
  only; nothing here farms anything.

**Nobody looks at 336 identical columns and concludes a machine made them.** They conclude somebody
needed to hold a great deal of water. That is the exact inference this world needs a player to make,
and it is why the answer to *"why is there more"* is a maker's reason (one bay does not hold enough)
rather than a machine's reason (the generator ran again). This is the priority-1 shape too:
*"chunk shuffling for endless areas"* is funded and *"richer authored chunk variety"* is priority 2,
so this ruling requires **zero new building types** and rides on work already scheduled.

**Shuffle governs which part you meet next, never whether it exists.** All of it was built, by hands,
in one occupation, and then left (history work, `01-the-past`). Nothing is created while you play and
nothing accrues while you are away — which is how this stays clear of the category gate's ban on
*"any claim that the world creates or generates itself"* and *"any fiction in which the world changes
... while the player is absent"* (`cid/theme/_category.md`, from priority 3).

### Uncounted, not infinite — and the horizon is architectural rather than a wall

An infinite works is a claim the fiction cannot support and does not need. **What canon does is
decline to count.** No total, no plan, no survey mark, no boundary stone, no map, no vantage point.
The delivery is already built: `01-the-ruin` fixes an area's boundary as built stone — retaining wall
uphill, parapet on the open side, broadleaf canopy beyond with no walkable ground — so a player
standing in a part can see about one part's worth of the works. **Endlessness arrives as a short
sightline, not as a limit the player bumps into**, which is the version that costs no barrier art and
tells no lie. `[cid: decided]`

There is a dry joke available and it is left dry: this is a place built to keep the count of water,
and nobody ever counted the place.

### Why it continues past the fourth set, which is my index's gap 6

`02-GAMEPLAY.md` ships 4 sets of 6 and the collection is *"the only finishable thing"*
(`03-META.md`), so the world outlives the last thing worth finding, and no sheet said why. **It
continues because a works's parts are not a ladder of four that ends in a tower.** There are more
terraces, more chambers, more bays, more stages, further in. The brief itself declined *"reaching the
deepest layer"* as an objective for being *"weak without something at the bottom"* — under this
ruling there is no bottom to be weak, and nothing promises one. What sits at depth 5 and beyond is
more of the same four kinds; **which kind is Meta & Content's**, and the only prohibitions are a fifth
kind and a final part.

### The one-world-versus-own-areas line, answered as my index required

*"Everyone occupies one world clearing their own patch, visible to each other"* against *"own areas"*
`[brief: soft]` `[you accepted: R6 Q2]` needs no world rule under this ruling, and it needs none for
three reasons that stack. Nobody owns the works (*"The ruin is never theirs"*,
`cid/theme/identity/01-player-role.md`). Every kind of part exists in quantity, so two people working
a terrace are working **two terraces**, not one. And **no adjacency is canon**, so the fiction makes
no claim about what stands where nobody is working.

**That also makes the build's arrangement fictionally correct rather than merely tolerated.**
`cid/theme/identity/03-co-present-stranger.md` records that the shipped server gives each player a
separate identical 120-stud plot at `slot * (area.size + 40)` and declines the single-continuous-ruin
reading `[research: repo — read this run]`. **I do not reinstate it:** I assert one works and
explicitly no plan, no map, no adjacency and no distance. What that sheet had to excuse — twelve
identical adjacent grounds — this ruling *predicts*: parts of one works are alike because one crew
built them to one design to do one job. **Repetition is the evidence, not the artifact.** And a
neighbour visible across the inter-plot boundary is not *"a second structure on the skyline"* under
`01-the-ruin`'s exclusion, because it is more of this works — which is precisely the reading a chain
of ruins could not have supplied.

**`[playtest unknown]` — whether an uncounted place reads as *it keeps going* or as *the same terrace
again* to 8–14s** `[brief: binding]` `[you chose: R1 Q4]` on the band. **Starting value: no total
stated anywhere, repetition unhidden, dressing varied within a kind.** Test range, in the order it
should be spent: (1) more dressing variance between parts of one kind, which is authored-chunk
variety and already priority 2; (2) make the count of parts the *player* has finished more prominent,
which the no-total rule permits; (3) only a developer ruling states a total, because that is this
sheet's central claim and not a tuning knob. What would settle it: ask second-session players *"how
much of it is there?"* — *"it just keeps going"* passes, *"it's the same one again"* fails.

## Consequences for other work

- **Area-arrangement and depth-theming work** *[Meta & Content, wave 3 — owner of `area` and
  `collection`]*: five things. **(a)** The four set labels are four **kinds** of part, so
  `collection.areasPerDepth` may take any integer ≥ 1 with **zero renames** — the fiction now backs
  core-loop work's fix (fewer Finds per area, more areas per depth) at no fiction cost, and I state
  the requirement without setting the number. **(b)** All areas at one depth are parts of the same
  kind and must be labelled as compass- or function-qualified instances of that kind (another
  terrace is another terrace), never as a new place with its own name, and never with a temporal word
  (history work's L3). **(c)** Depth past 4 is more parts of the same four kinds; **no fifth kind, no
  final part, no summit, no floor** — nothing may be labelled or dressed as the last one. **(d)**
  Density has a fictional reason to rise inward and size does not, so if core-loop work's 81–133-stud
  band bites, spend density. **(e)** Layout is untouched by this sheet: no spatial relation between
  areas is canon, so arrangement, order and origin stay entirely yours.
- **Cleared-area and passage work** *[Setting — `04-permanence-and-passage`, this domain, next]*:
  inherits an axis and a prohibition. Going deeper is **walking further in**, so passage may not be
  described or built as descending, climbing, or crossing to a separate place, and it may not be a
  map or a survey of the works — no view of the whole exists. Priority 2's plural *"restored ruins"*
  is already satisfied by many finished parts of one works, so you owe no second ruin. The
  collapse-to-a-flag default is untouched by anything here, except that the *count* of finished parts
  is a count of the player's work and is therefore permitted by my no-total rule.
- **Place-rules work** *[Setting — `03-physical-law`, this domain]*: the short sightline is
  load-bearing for endlessness, so **whatever you rule about the hour and the sky may not produce a
  long view out of the place** — no vantage, no clear horizon over the works, no elevated overlook.
  Second item, offered rather than decided: this ruling puts depths 2 and 3 inside vaulted structures,
  which raises a light question I do not own. The architecture answers it — a cistern's vault is
  pierced to draw water through `[research: https://en.wikipedia.org/wiki/Piscina_Mirabilis]` — and
  that is handed to you and to Art, not settled here, because the accessibility requirement that
  cleared stone read lighter than every tier green applies at all four depths.
- **Place-inventory work** *[Setting — `05-inventory`, this domain]*: the absent column gains five
  entries decided here, to cite rather than re-decide — **no map, no plan, no signpost, no survey
  mark, no boundary stone**, and no second building of any kind. The present column gains one: the
  channel network, dry, as the thing that makes the parts one works.
- **Interface-surface work** *[UI/UX — Screens, wave 4, owner of the `areas` screen]*: the screen may
  list depths and the parts the player has finished. It **may not** show a total number of areas, a
  fraction or percentage of the works cleared, a map, or an elevation cross-section, and depth must
  not be drawn as a stack of levels or a descending shaft. Depth is distance inward.
  `setting.extent.playerFacingTotals` is the field to cite.
- **Environment art** *[Art & Visuals — Environment, wave 4+]*: **do not fight the repetition.** Two
  parts of one kind are alike because one crew built them to one design; the variance budget goes to
  green quantity (uniform weathering, per history work's L4) and to dressing, never to giving each
  part its own architecture. Every part's frontier is built stone with closed canopy beyond and no
  long view out. Nothing on any skyline that is not a part of this works.
- **Chunk-shuffling work** *[Meta & Content, priority 1]*: the fiction of the shuffle is **which part
  you meet next, never whether it exists.** No player-facing string, `artPrompt` or store line may
  say the world is generated, created, grown, built or added to now. Recombining authored parts is
  fictionally the player's route, and that is the whole licence.
- **Co-presence work** *[Identity — `03-co-present-stranger`, already ruled; Social, wave 2]*: the
  world rule you were promised exists and asks nothing of you. Many people on parts of the same kind
  of one unowned, uncounted works is the ordinary state of a works. Your `plots` revision request
  (slot reuse letting a watcher see cleared ground return overgrown) is **not repaired by this
  ruling** and stays yours: what the fiction now says is that the part which vanished and the part
  which appeared are two different parts, so no part ever regrew. Whether the *observation* is
  acceptable is still module-planning work's arbitration.
- **Promise-over-time work** *[Fantasy — `01-fantasy-of-record` and its sheet `02`, this wave]*: your
  owed item is compatible and I am not adding to it. A part is small, walled and legible whole from
  outside, which is what *"finished at area scale ... with no text"* wanted; and *"the count of
  finished areas must survive as something a player can see"* is expressly permitted, because the
  no-total rule forbids counting **the place**, never the player's work.
- **Store and positioning work** *[Discovery & Marketing, wave 5]*: **the words *islands*, *worlds*
  and *maps* are unavailable**, and so is any chain-of-places framing — it is the sentence four
  competitors ship. You may not state a number of areas and you may not promise infinity. What is
  true and sayable is that the work does not run out.
- **Naming work** *[Vocabulary, this wave, last writer]*: **nothing owed.** This sheet coins zero
  terms and introduces zero proper nouns; the fiction of the repeating part attaches to the existing
  internal word `area`. Offered, not imposed: `setting.extent.bannedDirectionWords` is ready for
  `vocabulary.bannedWords` if you want *descend*, *underground* and *summit* refused mechanically
  rather than by review.

## Acceptance criteria

1. **Direction check.** Across every `manifest` block and every `artPrompt` under `cid/`, the
   whole-word case-insensitive pattern
   `descend|descends|descended|descent|underground|subterranean|catacomb|cavern|dungeon|abyss|sunken|summit|peak|topmost|last area`
   returns **0 hits.** Prose and quoted research in these sheets is exempt; the check is against
   contract values and art prompts only.
2. **No-total check.** The number of player-facing strings and UI elements that state a total number
   of areas that exist, or a fraction or percentage of the works cleared, is **0.** Anything of the
   form `N of M areas` or `N% of the ruin` fails. **Counts of the player's own work are exempt and
   permitted:** the 24-slot collection index and any count of finished areas both pass.
3. **Kind-not-place check, run through the bridge.** `npm run bridge` reports **zero problems** at
   the shipped `collection.areasPerDepth` and `collection.relicsPerArea`, and **zero** of the four
   `collection.sets[].label` strings requires renaming at any value of `areasPerDepth` ≥ 1. This
   sheet requests **0** renames.
4. **No-adjacency check.** Across every `manifest` block under `cid/`, the number of fields stating a
   position, distance, bearing or adjacency **between two areas** is **0**. The positional fields in
   the contract are `area.originXZ` and `plots.slotOrigin`, both `gameplay/meta`'s, and both place a
   *plot*, never one area relative to another. This sheet introduces 0 such fields and requests 0
   changes to either key.

## Not decided here

How many areas exist at any depth, how large or dense any of them is, how they are arranged, in what
order they are met, how many authored layouts the shuffle draws from, and which of the four kinds sits
at depth 5 and beyond — all `gameplay/meta`'s, wave 3, then balance work. What a finished part becomes
and how a player physically goes further in (`04-permanence-and-passage`, which amends
`setting.passage`). The hour, the sky, weather, the light inside a vaulted part, and whether anything
more than ordinary exists here (`03-physical-law`, which amends `setting.law`). The full
presence-and-absence roster (`05-inventory`, which amends `setting.contents` and cites the five
absences above rather than remaking them). Whether the `areas` screen exists at all and what it
looks like (UI/UX, wave 4). Every colour, material, model and lighting value (Art & Visuals). Whether
a stranger may do anything (Social, wave 2). Whether `setting` is promoted into `bridge/schema.mjs`
(contract-and-seam work; `01-the-ruin` carries the key). Whether this setting is occupied on Roblox
(Fantasy, this wave — if its search returns a shipping game built as one repeating uncounted complex,
this sheet inherits the finding).

## Flagged to the developer

**The brief never asks about scale or geometry, and it states two answers to each.** `OPEN.md §1` has
no audit row for either; my index logged them as gaps 4, 5 and 6 and marked all three
`[cid: decided]`. Live alternatives, each with why I did not take it:

| alternative | why not |
|---|---|
| **A chain of ruins or islands**, one per depth band | It is the genre's shared store sentence across four games; every link needs a proper noun history work forbids and a building type nothing funds; and the next link would be visible on the skyline, which `01-the-ruin` excludes. |
| **Depth is downward** — cellars, mines, a vertical complex | Falsified by a shipped contract value: `Cistern` and `Vault` are substructure and `Spire` is superstructure, so the axis would run down, down, then up. It also darkens depths 2–4, and *"green overgrowth on warm stone is naturally high-contrast"* is what a stated accessibility **requirement** rests on. |
| **Depth is upward** to a summit | A summit is a terminus, and a terminus in a world that is binding-endless is a promise the design cannot keep. It also makes the Spire the top of the world and depth 4 the end of it. |
| **One works of fixed, stated extent** — the honest singular reading | Contradicts *"Endless via shuffled authored chunks"* `[brief: binding]`, and makes the world finishable when *"the collection is the only finishable thing"*. |
| **Many separate small ruins on one hillside** | Multiplies identities and functions with no system attached, against *"the smallest game"*; and it makes *"reclaim a ruin"* meaningless rather than merely tense. |

**My recommendation is the sheet as written, on one argument:** it is the only answer under which the
world is unbounded, every part is hand-built, no proper noun is coined, no new building type is owed,
the shipped set order stays coherent, and the row of identical plots the build already ships is
*correct* rather than excused. **If it is overruled, the cheap reversal is the direction word alone** —
one works, an area as its repeating part, and the uncounted-total rule are independent of whether
*further in* is spoken as *further down*.

**The ruling I would actually like from you:** whether *deeper* may keep being said while meaning
*further in*. I have treated `03-META.md`'s *"deeper areas"* as an axis claim rather than an elevation
claim, which is what lets a binding line and this geometry coexist, and `01-FOUNDATION.md` glosses the
same decision as *"further in"*. If you meant *deeper* literally, that is a one-line ruling here and it
forces a rename on `collection.sets[].label` — because `Cistern` and `Vault` cannot sit deeper than
`Spire` in elevation, and 24 Find names hang off those four labels.

Sources fetched in the original run:
[Basilica Cistern](https://en.wikipedia.org/wiki/Basilica_Cistern) ·
[Piscina Mirabilis](https://en.wikipedia.org/wiki/Piscina_Mirabilis) ·
[Terrace (agriculture)](https://en.wikipedia.org/wiki/Terrace_(agriculture)). The `Villa of Domitian`
citation is relayed from `01-the-ruin` and was not re-fetched. `Terrace (building)` was fetched and
informed nothing.
