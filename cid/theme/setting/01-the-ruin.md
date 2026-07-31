# 01 — The ruin

**Domain:** Setting · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The ruin is a working complex, not a monument: a stone works built to gather water and keep
the count of it** — level platforms cut and walled into a hillside, a held water system beneath
them, a vaulted room for the records, and a tower at the top holding the instruments the count
was set by. It is civil and utilitarian. It is not a temple, a palace, a fortress, a tomb, a
dwelling or a town.

**The land holding it is a broad temperate hillside of warm pale limestone under broadleaf
wood** — humid, mild, long growing season, rain frequent enough that holding water was worth
building for. Past the worked edge is more of the same slope and the same wood: **nothing built,
tended, inhabited, travelled or lit is visible from inside the place.** No road, no field, no
smoke, no second structure on the skyline.

**Nothing is alive here but the plants and the players.** No animal, bird, insect or fish is
modelled, seen, animated or interactable anywhere in the game. Ambient off-screen sound
suggesting life beyond the worked edge is permitted, because a sound is not an occupant.

**Undated, per history work, and not identified with any real culture.** The makers' technology
is hand tools, dressed stone, cast fittings, cut gears and gravity-fed water. Nothing here was
ever powered, and nothing here ever ran on its own.

**The register already on disk is ratified, 5 of 5, with zero renames and zero revision requests
raised.** `East Terrace` and the set labels `Terrace · Cistern · Vault · Spire`
(`cid/gameplay/meta/01-the-area.md`, `02-the-collection.md`) are four parts of exactly this one
complex, and *"a 120-stud terrace to dress, **not an open landscape**"* is ratified as the
correct read: a terrace is a walled platform, which is a bounded place by construction.

**No manifest block: Setting owns no contract key.** I read `SCHEMA` in `bridge/schema.mjs`
directly — no shell in this run, so `npm run bridge -- --contract` could not be executed. Eleven
keys, owners `gameplay/*` ×7, `tech/architecture` ×2, `art/objects` ×1, `theme/vocabulary` ×1.
None holds a place, a landscape, a climate, a material or a list of what is alive.
`[research: repo — bridge/schema.mjs:30-300, read this run]`

**The single-building-versus-endless-space cost is handed to `02-extent`, with the property that
resolves it supplied here rather than left blank:** a works is built in **repeating functional
units** — another platform, another chamber bay, another channel run — so more of it is always
plausible without a new kind of building, and a repeated unit is exactly what makes an authored
chunk read as *made by hands* rather than generated. **This sheet fixes the kind of thing and its
unit. `02-extent` fixes how many units and which way they run.**

**This sheet coins exactly one term: `works`, lowercase, internal, never rendered.** It is a
handle for writers and art prompts, not a name for anything.

## Why

**The brief gave four materials and no building.** *"An overgrown ruin being reclaimed. Cut back
vines and moss from ancient stone"* `[brief: soft]` `[you accepted: R2 Q3]`
(`01-FOUNDATION.md`), and *"ornamented, warm, aged, crafted. Stone and foliage, not candy"*
`[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]` (`04-PRESENTATION.md`). Stone, vines, moss, age.
Everything below stays inside those four and adds the noun the brief never supplies.
`[cid: decided]`

**The building type was chosen by working backwards from live contract values, which is the only
honest method available.** Four `collection.sets[].label` strings and 24
`collection.sets[].relics` strings already ship, and they describe one place with unusual
precision: a paved platform (`Tessera`, `Sundial`, `Ewer`, `Hinge`, `Bellcast`, `Stylus`), a held
water system (`Sluice`, `Siphon`, `Grate`, `Weight`, `Chain`, `Cup`), a room of records
(`Ledger`, `Tally`, `Seal`, `Key`, `Coffer`, `Ring`), and a tower of instruments (`Gnomon`,
`Lens`, `Vane`, `Orrery`, `Crest`, `Finial`). **Water, measurement, record and trim — no
weapons, no ceremony, no coin.** A works for gathering water and keeping its count is the
building that makes all 28 of those strings ordinary at once, and history work independently
reached the same register from the other end: *"Masons, clerks, water-keepers and sky-watchers
used this place"* (`cid/theme/lore/01-the-past.md`). `[research: repo — cid/gameplay/meta/02-the-collection.md, read this run]`

**The architecture is real, not invented, and that matters because every line of this sheet is
otherwise `[cid: decided]`.** Terraced hillside complexes built as *"at least three terraces, a
common practice for large patrician Roman villas in the hills"*, with a terrace level *"reserved
for cisterns"*, a cistern *"divided into three communicating chambers"*, vaulted substructure,
and *"distinct functional zones across the sloping terrain"*, are a documented building system:
platform, cistern and vault are three parts of one thing, on a slope, by ordinary practice.
`[research: https://en.wikipedia.org/wiki/Villa_of_Domitian]` **The fiction borrows the system
and names no culture, no place and no period**, which is required by history work's L3
(*"Undated"*) and by `S2` (*"Who made the place ... never answered as an identity"*,
`cid/theme/lore/02-the-silences.md`). The tower is `[cid: decided]`; the source does not supply
one.

**A hillside, because it is the one landform on which both of the brief's two depth geometries
are the same movement.** `03-META.md` says *"deeper areas"* `[brief: binding]`
`[you chose: R3 Q2]` and `01-FOUNDATION.md` says *"further in means denser overgrowth"*
`[brief: soft]`. On a slope, further in *is* further down or further up, so nothing has to be
reconciled by force. **The choice deliberately does not assert that depth correlates with
elevation**, because history work's L4 rules *"Depth is coverage, not chronology"* and uses the
tower at depth 4 as its load-bearing case — a tower standing in closed canopy is the most
thoroughly swallowed part of the complex whether it is high or low. A slope gives `02-extent`
both an up and a down to spend, and this sheet spends neither. `[cid: decided]`

**Level ground inside an area, height change at its edges.** The area on disk is a 120-stud
square at `originXZ` `[0, 0]` holding 140 non-colliding patches at 6-stud spacing
(`cid/gameplay/meta/01-the-area.md`, `cid/art/objects/01-patch-footprint.md`). A terrace is by
definition a level platform, so **the walkable surface of any one area is one elevation** and the
slope lives between areas, at retaining wall and parapet. This is why *"not an open landscape"*
is correct rather than a compromise: the boundary is built, and the wood beyond it is a backdrop
you never walk onto. It also keeps *"movement only ... no aiming, clicking, or ability buttons"*
`[brief: soft]` `[you accepted: step 6 Q3]` honest, since a graded slope under 140 scattered
patches would make clearing into navigation — the exact failure
`cid/art/objects/01-patch-footprint.md` avoided by making patches non-colliding. `[cid: decided]`

**Temperate and humid, because the climate has to be the one that grows the four plants already
shipped and still leaves the stone bright.** `tiers[].name` are `Moss · Fern · Bramble ·
Heartvine` at rgb values from `[104,142,76]` to `[44,86,52]`
(`cid/gameplay/systems/01-overgrowth-tiers.md`). Moss, fern and bramble are a temperate humid
flora. The three alternatives each break a stated constraint: **tropical** pushes the greens
darker and the stone wet and cool, against *"green overgrowth on warm stone is naturally
high-contrast, so rarity tiers stay legible"* `[brief: soft]`, which is load-bearing for a
constraint `04-PRESENTATION.md` calls *"a requirement, not a nicety"*; **arid** grows nothing to
clear; **alpine or northern** delivers grey light and a grey palette, which is the v1 snow
failure the same line was written to prevent. A cistern is also its own climate evidence: it is
only worth building where rain is reliable and dry spells happen. `[cid: decided]`

**Warm pale limestone, stated as a contrast relation rather than a colour, because the colour is
Art's.** The requirement is that cleared stone read lighter than every tier of overgrowth in
greyscale, which is what makes tier legible without hue. The lightest tier green on disk, `Moss`
`[104,142,76]`, has Rec.601 luma 123. **The stone's base value must clear that by at least 40
points (luma ≥ 165.)** Grey granite, white marble, red brick and dark basalt are all excluded:
the first two by the *"warm"* in *"warm stone"*, the last two by the luma floor.
`[cid: decided]` — Art chooses the hue inside that bound.

**Ornament survives the utilitarian reading, and this is the objection worth answering.**
`fantasy-ornate` wants *"ornamented ... crafted"* and a waterworks sounds plain. It is not: the
ornament budget is already spent on disk in `Tessera` (a mosaic pavement), `Bellcast` (a flared
eave), `Crest` and `Finial` (roof trim). **Ornament here is the trim of a well-made public work —
carving, casting, dressed joints and pattern in the paving — not iconography, not gilding.** That
is consistent with history work's overrule of *"Relics must read as treasure"*, which I inherit
rather than reopen: *"Art must not add gold, gilding or gemstones to compensate"*
(`cid/theme/lore/01-the-past.md`, `## Pushing back`). A `Vault` in this place is a **record
strongroom, not a treasury** — note that `Coffer` is also a ceiling recess, so even the most
treasure-adjacent name on disk sits inside the mason register unchanged. `[cid: decided]`

**Nothing alive but plants, for four reasons in descending order of strength.** (1) An animal is
the only thing in this world that would have intent, and *"Tension is zero by design ... Do not
invent tension to fill the gap"* (`HANDOFF.md`) `[brief: binding]` by elevation. (2) A visible,
feedable or followable creature is row 7 of `cid/theme/identity/04-no-cast-declaration.md`, which
requires a developer-authored reopening condition this sheet does not have and does not claim.
(3) Priority 1 funds *"proximity clearing · area-completion detection · three clearing upgrades ·
the 24-relic 4-set collection · chunk shuffling · guaranteed first-area find"* and no animated
model of anything `[brief: soft]` `[I assumed — the ordering]`. (4) *"the smallest game that
still gives every creative area real work"* `[brief: binding]` `[you chose: R1 Q3]` — a fauna
roster is a content line item with no system attached to it. **The permitted ambient sound is the
deliberate exception**, because a place with no fauna at all risks reading as dead, and *"not
spooky"* / *"reclamation, not a haunted place"* `[brief: soft]` ×2 is the constraint that would
break first. A sound outside the edge costs one audio asset, breaks no exclusion, and is Audio's
call to take or leave. `[cid: decided]`

**`[playtest unknown]` — whether a place with no visible animals reads as warm or as eerie to
8–14s.** `[brief: binding]` `[you chose: R1 Q4]` on the band. **Starting value: no visible fauna,
ambient off-screen sound permitted.** Test range, in the order it should be spent if the place
reads dead: (1) raise ambient density and volume; (2) motion in the canopy at the area edge,
which is place-rules work's to permit or refuse; (3) **only** a developer ruling adds a visible
creature, because that is `04-no-cast-declaration.md`'s reopening condition and not mine to
trigger. What would settle it: a first-session read of whether players describe the place as
quiet or as empty.

**The noun is doing no differentiating work, which is required.** *"The hidden-collection layer,
not the noun"* and *"the theme is a **vehicle**"* `[brief: binding]` `[you chose: R1 Q1]`
(`00-CORE.md`). A hillside waterworks is not claimed here as unclaimed territory, and no argument
in this sheet is *"this setting is unoccupied"*. **Occupancy is unverified and stays that way
from this domain:** my index assigns the fantasy-level Roblox search to fantasy work, and the two
pages that would have informed this sheet both failed to fetch this run — the UCSB terraces page
refused the connection and the `Prospecting!` wiki returned HTTP 402. A search result (snippet
only, not fetched) suggests `Prospecting!` contains an *"Overgrown Grotto"* where vines are cut
with tool-gated scissors; **that is a near-miss worth checking and it is `[unverified]` here.**
Routed to fantasy work rather than claimed.

## Consequences for other work

- **World-scale work** *[Setting — `02-extent`, this domain, next]*: inherits a kind of building
  and a unit, not a count. The unit is a repeated functional part — a platform, a chamber bay, a
  channel run. **Whatever `02` decides may not require a settlement, a dwelling quarter, a second
  culture, or a fifth kind of part beyond the four `collection` already labels.** The slope gives
  it both directions; the correlation between depth and elevation is left unspent on purpose so
  the tower at depth 4 stays coherent under history work's L4.
- **Place-rules work** *[Setting — `03-physical-law`, this domain]*: three inheritances. **The
  works no longer works — nothing flows.** Channels and basins are dry or hold still rainwater at
  most; a running watercourse would be motion without the player's hand and would also read as
  the place still in service. **Climate is settled as a fact about what grows and what the stone
  is; the hour, the sky, and weather as a depicted event are yours.** Whatever you rule must stay
  consistent with a place that gets rain, though rain need never be shown. And the technology
  floor above (no power, nothing self-running) is offered as support for your budget line, not as
  a constraint on it.
- **Place-inventory work** *[Setting — `05-inventory`, this domain]*: the alive question is
  **decided here, not there.** Your present column cites this sheet for "plants and players
  only"; your absent column reads "no fauna of any kind, visible or interactive", and it must not
  read "nothing alive". If you need to differ, revise against this sheet with a stated reason —
  do not re-decide it silently. Standing water, sky, wind, roads and remains remain yours;
  "nothing built or travelled is visible past the edge" is decided here and available for you to
  cite.
- **Area-content work** *[Meta & Content, wave 3 — `cid/gameplay/meta/01-the-area.md`,
  `02-the-collection.md`]*: **zero renames, zero revision requests.** All five architectural
  strings on disk are ratified. Two forward constraints: areas 2 to 4 name parts of **this** works
  (water, record, instrument, or a compass-qualified platform), per history work's rule that no
  area label carries a temporal word; and the walkable ground of an area is level, so any
  arrangement you choose puts height change at the boundary rather than through the patch field.
- **Environment art** *[Art & Visuals — Environment, wave 4+]*: the dressing brief is now
  concrete. **Warm pale limestone with a greyscale luma of at least 165**, dressed and weathered,
  never grey granite, white marble, red brick or dark basalt. **The area boundary is built** — a
  retaining wall on the uphill side, a low parapet or wall on the open side, broadleaf canopy
  beyond as a backdrop with no walkable ground on it. **Ornament is carving, casting, dressed
  joints and pattern in paving.** No gilding, no gemstones, no iconography, no statuary of a
  person or a creature. Weathering is uniform across all four depths per history work; only the
  quantity of green varies.
- **Object art** *[Art & Visuals — Objects, wave 4+]*: the 24 Finds are the fittings and
  instruments of a water-and-record works, so their material register is dressed stone, fired
  clay, cast bronze, worked wood and cut gearwork. `Orrery` sets the technology ceiling: gears
  cut by hand are in, anything powered is out.
- **Audio work** *[Audio, wave 4+]*: **you are granted the one permitted living sound in the
  game** — off-screen ambience beyond the worked edge, suggesting life that is never seen. Taking
  it is your call. Nothing else here moves or makes noise on its own, and the water is dry, so a
  running-water bed is not available.
- **Naming work** *[Vocabulary, this wave, last writer]*: this sheet coins **exactly one term**,
  `works`, lowercase and **internal — it must never be rendered as a player-facing string.** It
  is closer to `finder` (`cid/theme/identity/01-player-role.md`) than to a label. This sheet
  introduces no proper noun and asks for nothing else. Offered, not imposed: the fauna word list
  in criterion 4 is ready for `vocabulary.bannedWords` if you want the ruling machine-checked
  rather than review-checked.
- **Fantasy work** *[Fantasy, this wave]*: your Roblox occupancy search now has a specific target
  shape to check — restoration of a terraced hillside stoneworks — plus the unverified near-miss
  above (`Prospecting!`, *"Overgrown Grotto"*, vine-cutting behind tool gates). **If your search
  returns a shipping game with this setting, this sheet inherits the finding**, and the cheapest
  revision is the building's function, not the landform.
- **Onboarding work** *[Onboarding, wave 2 — `cid/gameplay/onboarding/01-first-find.md`]*: the
  first ten seconds happen on a level, bounded, sunlit platform with a built edge. Nothing in
  this sheet needs stating to the player, which is what *"No text, no tutorial"* `[brief: soft]`
  requires of every world fact.
- **Terrain and performance work** *[Tech & Data]*: a single walkable elevation per area is a
  cheaper build than a graded slope, and the slope is set dressing outside the plot rather than
  collidable terrain inside it. Stated as a consequence, not a budget.

## Acceptance criteria

1. **Ratification check.** All 5 architectural strings on disk — `area.label` (`East Terrace`)
   and the 4 `collection.sets[].label` (`Terrace`, `Cistern`, `Vault`, `Spire`) — are accounted
   for by this sheet as parts of one complex. Count of renames requested: **0.** Count of
   revision requests raised against `cid/gameplay/meta/01-the-area.md` or `02-the-collection.md`:
   **0.**
2. **Level-ground check.** Within the area's 120-stud extent at `originXZ` `[0, 0]` (cited, not
   set here), the walkable surface has a single elevation, and every one of its four sides
   terminates in built stone or in ground the player cannot walk onto. Walkable ground outside
   the plot: **0 studs.**
3. **Contrast check.** The stone base colour used for cleared surfaces has a Rec.601 greyscale
   luma of **at least 165**, which is at least 40 above the lightest tier green on disk (`Moss`,
   rgb `[104,142,76]`, luma 123). In a greyscale screenshot, cleared stone reads lighter than all
   four tier greens.
4. **Fauna check.** The count of animal, bird, insect and fish models, meshes, animations and
   interactables in the build is **0**, and across every `manifest` block and every `artPrompt`
   under `cid/` the whole-word case-insensitive pattern
   `bird|birds|animal|animals|beast|insect|beetle|butterfly|fish|deer|fox|snake|lizard|frog|bat|spider`
   returns **0 hits**. Non-visual ambient audio is exempt, and no manifest field holds it.

## Not decided here

One works or many, what an area is a piece of, which way depth points, and why the place
continues past the fourth set (`02-extent`, this domain). The hour, the sky, weather as an event,
and whether anything more than ordinary exists here (`03-physical-law`). Standing water, wind,
roads, remains and the full two-column roster (`05-inventory`, which cites the alive ruling rather
than remaking it). What a cleared area becomes and how a player goes deeper
(`04-permanence-and-passage`). Any map, arrangement, area count, size, density or chunk theming
*[Meta & Content, wave 3]*. Every colour, material asset, model, effect and lighting value inside
the bounds stated above *[Art & Visuals]*. Whether the ambient sound is taken *[Audio]*. Whether
`works` is kept, renamed or held internal in the canonical list *[Vocabulary]*. Whether this
setting is occupied on Roblox *[Fantasy, this wave]*.

## Flagged to the developer

**All three rulings answer questions the brief never asks.** `OPEN.md §1` has no audit row for
the ruin's identity; `01-FOUNDATION.md` and `03-META.md` both list *"what the ruin actually is"*
as left open, and the words *"ancient stone"* are the entire specification. Live alternatives,
each with why I did not take it:

| alternative | why not |
|---|---|
| **A temple or shrine complex** — the genre reflex for a stone ruin | It wants idols, altars, ceremony and a priesthood: four things history work's L1 forbids by word list and `S2` forbids as a named party. It also makes the 24 Finds read as votive rather than ordinary, which would force renames on a live contract key. |
| **A fortress or watchtower line** | Imports weapons and a threat that once existed, against *"Do not invent tension"* and L1's ban on `sword`, `shield`, `armour`. A fort is also the wrong shape for a cistern-and-records reading the collection already commits to. |
| **A villa or great house** — closest to the fetched source | Domestic means inhabitants who lived rather than worked, which pulls toward a family, a name and a household — proper nouns `S2` forbids. It also makes the record vault read as private wealth, reopening the treasure overrule. |
| **A city or town, sprawling** | The cheapest answer to endlessness and the most expensive to fund: streets, dwellings, districts and a population, against *"the smallest game that still gives every creative area real work"*. It also makes *"reclaim a ruin"* singular prose absurd rather than merely tense. |
| **A tropical or jungle setting** | Darkens the greens, cools and wets the stone, and breaks the high-contrast argument that a stated accessibility *requirement* rests on. |
| **Visible fauna** — birds, deer, insects | The only intent in a zero-tension world, an unfunded animated model, and row 7 of the no-cast declaration. Held as the third step of a playtest escalation instead, gated on a developer ruling. |

**The judgment call I would most like a ruling on:** whether *"a works for gathering water and
keeping the count of it"* is a more useful place to inhabit than the temple the genre would
reach for. **My recommendation is the works, on one argument:** it is the only candidate under
which all 28 architectural and object strings already shipped are ordinary rather than strained,
and it is therefore the only one that costs zero renames on two contract keys. If it is
overruled, the cheap version of the reversal is to change the complex's **function** while
keeping the landform, the climate, the palette relation and the fauna ruling — those four are
independent of what the building was for.

Source fetched this run:
[Villa of Domitian — Wikipedia](https://en.wikipedia.org/wiki/Villa_of_Domitian). Two fetches
failed and informed nothing: `archserve.id.ucsb.edu` (connection refused) and
`prospecting.fandom.com` (HTTP 402).
