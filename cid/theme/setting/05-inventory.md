# 05 — Inventory

**Domain:** Setting · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**This place contains twelve classes of matter and nothing else. Twenty-five classes are stated
absent, ten of them decided here rather than inherited.** The present column is a closed list: a
class not on it does not exist here, and adding one is a revision against this sheet rather than a
dressing choice.

**The four sharpest calls, all `[cid: decided]`:** there is **no standing water anywhere** in a
works built to hold water; there is **no light source but daylight**; there is **no depicted person
or creature anywhere in the place's stone**; and **every loose object here is a `Find`**, so the
place holds no non-collectible prop.

**Two absences are worded exactly as two other sheets required, and the wording is load-bearing.**
Whether anything is alive is `01-the-ruin`'s ruling, so row `A1` reads *no fauna of any kind, visible
or interactive*, and never the broader phrase that sheet forbade me. Who was here is history work's,
so row `A2` reads *nobody present now*, and never the phrase `lore/01-the-past` forbade me.

**This sheet amends `setting.contents`; `01-the-ruin` carries the key.** The two tables below are
this domain's most-cited output — `environment` alone cites `P1`, `P2`, `P3`, `P9`, `A6`, `A7` and
`A14` by id, and had to read this file to do it
`[research: repo — cid/art/environment/01-world-part-budget.md, read this run]`. So both tables are
carried as data as well as prose: same ids, same wording, in a form an art or audio brief can resolve
instead of re-reading.

**This sheet coins zero terms and requests zero renames.** It names no asset, no area, no set, no
`Find`, no tier and no count of anything; where it must identify a shipped value it quotes the
value as a citation of somebody else's key.

```json
{
  "amends": "setting",
  "requested_by": "cid/theme/setting/05-inventory.md",
  "contents": {
    "presentIsAClosedList": true,
    "presentCount": 12,
    "absentCount": 25,
    "absentDecidedHere": 10,
    "aClassNotOnTheListDoesNotExist": "adding one is a revision against this sheet, not a dressing choice",
    "scopeNote": "absent[].fact and absentClassWordCheck.tokens name the excluded thing on purpose, and both are registered in setting.exclusionListFields.fields. No word-pattern criterion in any sheet is run against them: a check that fires on the list of forbidden words is a check reporting its own subject matter.",
    "present": [
      { "id": "P1", "class": "dressed stone construction: platforms, retaining walls, parapets, paving, kerbs, steps, piers, vaulting", "material": "warm pale limestone, sound and weathered under the green, never rubble", "note": "vertical built stone is present in every part, which is what P5's fourth class needs", "boundBy": ["setting.readability", "lore/01 L5"] },
      { "id": "P2", "class": "a channel-and-basin network, empty: runs, sluices, sumps, kerb gutters, tanks", "note": "the connective tissue that makes the parts one works, and it is dry", "boundBy": ["setting.extent"] },
      { "id": "P3", "class": "fixed fittings and hand-cut mechanism, in place and inert: cast and worked metal, fired clay, worked wood, cut gearwork, set into the building", "note": "nothing was ever powered and nothing runs", "boundBy": ["setting.materialRegister.technologyFloor"] },
      { "id": "P4", "class": "loose worked objects, set down where they were left, and every one of them is a Find", "boundary": "fixed to the building is P3; not fixed is a Find, and collection owns which objects those are", "boundBy": ["lore/01 L2", "[cid: decided] on the and-nothing-else half"] },
      { "id": "P5", "class": "four classes of clearable overgrowth on and against the stone", "order": "as tiers ships them by height: a creeping surface mat, a fronded plant, a thorned scrambler, a woody climber", "climberHabit": "ground-rooted and leaning against built stone; never pinned flat to a wall, hung from a vault, or spanning a gap", "boundBy": ["tiers", "patch"] },
      { "id": "P6", "class": "a thin covering layer over paving: plant litter, a shallow root mat, wind-blown leaf", "note": "no soil deep enough to bury anything. Buried here means covered over, and nothing is dug.", "boundBy": ["core-loop/03-reveal-placement", "lore/02 S3"] },
      { "id": "P7", "class": "wear: stain, patina, softened arrises, worn tread", "note": "identical at every depth; only the quantity of green varies. Present condition only, never attributed to a cause.", "boundBy": ["lore/01 L4", "lore/02 S1"] },
      { "id": "P8", "class": "open sky above the unroofed parts", "scope": "existence only; the hour, weather as an event and whether any of it changes are setting.law's", "boundBy": ["[cid: decided]"] },
      { "id": "P9", "class": "broadleaf wood beyond the built edge: canopy and trunk as backdrop, no walkable ground on it", "note": "the only place any modelled motion is permitted", "boundBy": ["setting.land", "setting.extent"] },
      { "id": "P10", "class": "moving air, unmodelled", "note": "it reaches the player only through the granted off-screen ambience and through no modelled class inside the built edge", "boundBy": ["setting.climate", "setting.life.offScreenAmbientSoundBeyondTheEdge"] },
      { "id": "P11", "class": "daylight, and it is the only light in the game", "scope": "colour, angle, intensity and whether it changes are not decided here", "boundBy": ["setting.law R1", "lighting"] },
      { "id": "P12", "class": "other players' bodies", "scope": "cited for roster completeness, decided elsewhere", "boundBy": ["identity/01-player-role", "identity/03-co-present-stranger"] }
    ],
    "absent": [
      { "id": "A1", "fact": "no fauna of any kind, visible or interactive", "provenance": "inherited", "source": "setting.life — which decided the alive question and required this row's exact wording" },
      { "id": "A2", "fact": "nobody present now", "provenance": "inherited", "source": "lore/01-the-past — which decided who was here and required this row's exact wording" },
      { "id": "A3", "fact": "no entity class of any kind; nine of them, enumerated once and not restated here", "provenance": "inherited", "source": "identity/04-no-cast-declaration", "boundary": "Identity owns anything holding a relation to the player; this sheet owns inert matter, including a depicted being" },
      { "id": "A4", "fact": "no depicted person or creature in the place's stone: no statuary, relief figure, effigy, portrait, bust, mask, or name cut into a surface. Ornament is pattern, carving, casting and dressed joint.", "provenance": "cid: decided", "source": "the boundary identity/04 routed here; extends setting.materialRegister.ornamentIsNot" },
      { "id": "A5", "fact": "no remains and no memorial: no bone, grave, tomb, urn, ash, shrine, altar or marker stone", "provenance": "inherited + extended", "source": "lore/01 L1 word list plus not-spooky; the memorial half is this sheet's, because a marker is architecture and no cast list reaches it" },
      { "id": "A6", "fact": "no standing water and none running: no pool, puddle, fountain, spring, held tank, or wet surface. A works for holding water, holding none.", "provenance": "cid: decided", "source": "closing at dry the range setting.climate left open; running water was already ruled out there" },
      { "id": "A7", "fact": "no light source but daylight: no fire, torch, lamp, lantern, candle, brazier, ember, glow, or luminous plant or stone", "provenance": "cid: decided" },
      { "id": "A8", "fact": "no rubble, debris, fallen masonry, collapse, or root-heaved paving", "provenance": "inherited + extended", "source": "lore/01 L5; the root-damage half is this sheet's" },
      { "id": "A9", "fact": "no perishable material: no cloth, banner, tapestry, curtain, rope, thatch, leather, paper or scroll", "provenance": "cid: decided" },
      { "id": "A10", "fact": "no legible writing on any surface of the place: no inscription, sign, notice, posted mark, numeral or code string. Marks on a Find are object work's.", "provenance": "cid: decided", "source": "supported by lore/01 L3 and lore/02 S2, neither of which reaches a wall" },
      { "id": "A11", "fact": "no operable object: no lever, valve, switch, handle, crank, pull, prompt or button. Nothing in the place responds to anything but a player's proximity clearing overgrowth.", "provenance": "cid: decided", "source": "input: movement only" },
      { "id": "A12", "fact": "nothing is closed. Nothing locked, sealed, barred, shut, or walled off from the route further in.", "provenance": "cid: decided", "survivesTheW5Strike": "yes, unamended — the condition on passage is the absence of built ground, not an object in a gap (setting.passage.theConditionHasNoObject)" },
      { "id": "A13", "fact": "no player-made mark. Nothing here can be built, placed, planted, written, painted or decorated by a player. The only change a player makes to this place is clearing it.", "provenance": "cid: decided", "source": "cosmetics-only was offered and declined; lore/01 L5 is exposure, not reconstruction" },
      { "id": "A14", "fact": "no modelled ambient motion inside the built edge. Nothing sways, drifts, falls, flows, ticks, turns or animates. P9's canopy, beyond the edge, is the exemption.", "provenance": "cid: decided", "boundary": "this rules on modelled motion of matter; whether the place's state changes without the player is setting.law's" },
      { "id": "A15", "fact": "no instrument in service. Nothing displays a reading, a level, a count, an hour or a bearing.", "provenance": "cid: decided", "source": "the collection's register includes timekeeping and measuring objects, which is the one door a calendar could enter by" },
      { "id": "A16", "fact": "nothing here can harm a player, and nothing but overgrowth can be changed by one. No fall, drop, deep water, unstable surface, thorn that cuts, heat, cold, or dark you can be lost in.", "provenance": "inherited + extended", "source": "no failure state / zero tension, elevated by do-not-invent-tension; stated as matter here" },
      { "id": "A17", "fact": "nothing is trending. Nothing running out, spreading, drying, wilting, filling, ripening or falling due.", "provenance": "inherited", "source": "cleared is permanent; nothing regrows, so nothing can accrue while away" },
      { "id": "A18", "fact": "nothing is being made. No part appears, grows or is added, whether a player is present or absent. All of it was built before anyone arrived.", "provenance": "inherited", "source": "endless via shuffled authored chunks, not generation; setting.extent.shuffleGoverns" },
      { "id": "A19", "fact": "nothing starts over. No seed, sapling, shoot, new growth, cycle, tide, or young thing anywhere.", "provenance": "inherited", "source": "no rebirth; the seasons reframe declined by name" },
      { "id": "A20", "fact": "nothing marks a date. No calendar, festoon, seasonal dressing, anniversary decoration, or dial that advances.", "provenance": "inherited + extended", "source": "priority 3 seasons and events, plus the category gate; stated as matter here" },
      { "id": "A21", "fact": "nothing changes hands here. No counter, scale, stall, market space, or container that accepts a thing from a player.", "provenance": "inherited + extended", "source": "no mechanical interaction; lore/02 S4 has no counterparty" },
      { "id": "A22", "fact": "the place records nobody's work. No scoreboard, posted list, tally of anyone's clearing, or plaque naming who cleared a part.", "provenance": "inherited + extended", "source": "the category gate's ban on exchange, gifting, rivalry, ranking or comparison between players" },
      { "id": "A23", "fact": "nothing here is given rather than uncovered. No cache that refills, nothing that appears overnight, no gift, nothing left out for a visit.", "provenance": "inherited + extended", "source": "priority 3 daily rewards; the gate's ban on a presumed daily visit, a streak or a returning benefactor" },
      { "id": "A24", "fact": "no road, track or way that leaves the works, and nothing built, tended, inhabited, travelled or lit past the edge", "provenance": "inherited", "source": "setting.land.visibleBeyondTheWorkedEdgeExcludes, verbatim in substance" },
      { "id": "A25", "fact": "no map, plan, signpost, survey mark or boundary stone, and no second building of any kind", "provenance": "inherited", "source": "setting.extent.spatialRelationsExcluded plus secondBuildingOfAnyKind 0" }
    ],
    "priorityThreeMap": [
      { "item": "real procedural generation", "rows": ["A18"], "strength": "brief: binding" },
      { "item": "rebirth", "rows": ["A19"], "strength": "brief: binding, reframe refused by name" },
      { "item": "offline accrual", "rows": ["A17", "A23"], "strength": "binding by consequence" },
      { "item": "codes", "rows": ["A10"], "strength": "the assumed ordering only" },
      { "item": "daily rewards", "rows": ["A23"], "strength": "the assumed ordering, plus the live-ops default" },
      { "item": "leaderboards", "rows": ["A22"], "strength": "the assumed ordering, plus the gate" },
      { "item": "trading", "rows": ["A21"], "strength": "no mechanical interaction — brief: soft" },
      { "item": "seasons and events", "rows": ["A19", "A20"], "strength": "the ordering, plus the refused seasons reframe" }
    ],
    "noRowSpecsAPriorityThreeItem": "the intended output is a place that cannot host one: no surface to post a code on, no container to trade into, nothing that refills overnight, and nothing young enough to begin again",
    "buildCounts": {
      "instancesInsideAPlotThatAreNotStoneOvergrowthAFindTheOffPlotBackdropOrAPlayer": 0,
      "partsUsingEnumMaterialWater": 0,
      "terrainWater": 0,
      "pointSpotOrSurfaceLights": 0,
      "particleEmittersBeamsTrailsFireSmokeOrSparklesAsAmbience": 0,
      "surfaceGuiTextLabelOrDecalBearingWordsOnAWorldSurface": 0,
      "proximityPromptsOrClickDetectors": 0,
      "animatorsAnimationControllersOrLoopingTweensInsideAPlot": 0
    },
    "absentClassWordCheck": {
      "scope": "manifest string values and artPrompt values, whole-word case-insensitive. Prose is exempt, and every path in setting.exclusionListFields.fields is exempt.",
      "tokens": ["torch", "torches", "lamp", "lantern", "candle", "brazier", "bonfire", "banner", "tapestry", "curtain", "rope", "scroll", "parchment", "statue", "statuary", "effigy", "idol", "bust", "rubble", "debris", "puddle", "fountain", "grave", "tomb", "shrine", "altar", "lever", "valve", "switch", "padlock", "signpost", "inscription", "scoreboard"],
      "collidesWithAShippedValue": false
    },
    "playtestUnknowns": [
      {
        "question": "whether a place with no water, no fire, no motion and no props reads as calm or as sterile to 8-14s",
        "startingValue": "the twelve classes exactly as listed",
        "escalationInOrder": [
          "more variance in weathering, pattern and litter distribution inside the present classes",
          "raise the canopy's motion and the off-screen ambience beyond the edge",
          "a developer ruling adds a thirteenth class"
        ],
        "whatWouldSettleIt": "ask a first-session player what they would add to the place. More to clear passes. Something to look at fails."
      }
    ]
  }
}
```

---

## Present: the twelve classes

The left column is a class of matter, not an asset. Sizes, models, colours, counts and placement
belong to the keys and domains named in `## Not decided here`.

| # | class present | bound by |
|---|---|---|
| **P1** | **Dressed stone construction:** platforms, retaining walls, parapets, paving, kerbs, steps, piers, vaulting. Warm pale limestone. Sound and weathered under the green, never rubble. **Vertical built stone is present in every part**, which is what P5's fourth class needs. | `01-the-ruin` (limestone, luma ≥ 165); `lore/01-the-past` L5 (*"intact and weathered, never rubble"*) |
| **P2** | **A channel-and-basin network, empty.** Runs, sluices, sumps, kerb gutters, tanks. It is the connective tissue that makes the parts one works, and it is dry. | `02-extent` handed this to me as the one present class it decided: *"the channel network, dry, as the thing that makes the parts one works"* |
| **P3** | **Fixed fittings and hand-cut mechanism, in place and inert.** Cast and worked metal, fired clay, worked wood, cut gearwork, set into the building. Nothing was ever powered and nothing runs. | `01-the-ruin` (technology floor: *"hand tools, dressed stone, cast fittings, cut gears and gravity-fed water"*) |
| **P4** | **Loose worked objects, set down where they were left, and every one of them is a `Find`.** The boundary: fixed to the building is P3; not fixed is a `Find`, and `collection` owns which objects those are. | `lore/01-the-past` L2 (*"Set down, not hidden"*); `[cid: decided]` on the "and nothing else" half |
| **P5** | **Four classes of clearable overgrowth on and against the stone**, in the order `tiers` already ships them by height: a creeping surface mat, a fronded plant, a thorned scrambler, a woody climber. | `cid/gameplay/systems/01-overgrowth-tiers.md` (four names, four shapes, heights 1.6–3.4); see `## Why`, the climber note |
| **P6** | **A thin covering layer over paving:** plant litter, a shallow root mat, wind-blown leaf. **No soil deep enough to bury anything.** *Buried* here means *covered over*, and nothing is dug. | `movement`-only input `[brief: soft]`; `core-loop/03-reveal-placement.md` (a `Find` is revealed by the patch clearing, not by excavation); `lore/02-the-silences` S3 (`buried`, `beneath`, `under` pass as states) |
| **P7** | **Wear:** stain, patina, softened arrises, worn tread. **Identical at every depth**; only the quantity of green varies. Present condition only, never attributed to a cause. | `lore/01-the-past` L4; `lore/02-the-silences` S1 structural test (*"a present condition passes, a cause or an intent fails"*) |
| **P8** | **Open sky above the unroofed parts.** Existence only. | `[cid: decided]`; the hour, weather as an event, and whether any of it changes are `03-physical-law`'s |
| **P9** | **Broadleaf wood beyond the built edge:** canopy and trunk as backdrop, no walkable ground on it. **The only place any modelled motion is permitted.** | `01-the-ruin` (*"the same slope and the same wood"*, backdrop); `02-extent` (the short sightline) |
| **P10** | **Moving air, unmodelled.** A fact of a humid temperate hillside. It reaches the player only through Audio's granted off-screen ambience and through no modelled class inside the built edge. | `01-the-ruin` (climate; the one permitted living sound); `[cid: decided]` on "unmodelled" |
| **P11** | **Daylight, and it is the only light in the game.** Colour, angle, intensity and whether it changes are not decided here. | `[cid: decided]`; paired with A7 |
| **P12** | **Other players' bodies.** Cited for roster completeness, decided elsewhere: another person doing the same work on ground that is theirs. | `identity/01-player-role.md`, `identity/03-co-present-stranger.md`. **Not decided here.** |

---

## Absent: twenty-five classes

Each row is a fact about the place, not an instruction to a department. Provenance is one of three:
**inherited** (a decision that already exists, cited), **inherited + extended** (the citation covers
part of the row and the rest is mine), or **`[cid: decided]`**.

| # | fact about this place | provenance |
|---|---|---|
| **A1** | **No fauna of any kind, visible or interactive.** | inherited — `01-the-ruin`, which decided the alive question and required this row's exact wording |
| **A2** | **Nobody present now.** | inherited — `lore/01-the-past`, which decided who was here and required this row's exact wording |
| **A3** | **No entity class of any kind.** Nine of them, enumerated once and not restated here. | inherited — `identity/04-no-cast-declaration.md`. **Boundary:** Identity owns anything holding a relation to the player; I own inert matter, including a depicted being |
| **A4** | **No depicted person or creature in the place's stone:** no statuary, relief figure, effigy, portrait, bust, mask, or name cut into a surface. Ornament is pattern, carving, casting and dressed joint. | **`[cid: decided]`** — on the boundary `identity/04` routed here (*"whether one exists is object work and place work, not mine"*); extends `01-the-ruin`'s *"no statuary of a person or a creature"* |
| **A5** | **No remains and no memorial:** no bone, grave, tomb, urn, ash, shrine, altar or marker stone. | inherited + extended — `lore/01-the-past` L1 word list and *"not spooky"* `[brief: soft]` ×2 cover the remains; the memorial half is mine, because a marker is architecture and no cast list reaches it |
| **A6** | **No standing water and none running.** No pool, puddle, fountain, spring, held tank, or wet surface. A works for holding water, holding none. | **`[cid: decided]`** — closing at *dry* the range `01-the-ruin` left open (*"dry or hold still rainwater at most"*). Running water was already ruled out there |
| **A7** | **No light source but daylight.** No fire, torch, lamp, lantern, candle, brazier, ember, glow, or luminous plant or stone. | **`[cid: decided]`** |
| **A8** | **No rubble, debris, fallen masonry, collapse, or root-heaved paving.** | inherited + extended — `lore/01-the-past` L5; the root-damage half is mine |
| **A9** | **No perishable material:** no cloth, banner, tapestry, curtain, rope, thatch, leather, paper or scroll. | **`[cid: decided]`** |
| **A10** | **No legible writing on any surface of the place:** no inscription, sign, notice, posted mark, numeral or code string. Marks *on* a `Find` are object work's and are not covered here. | **`[cid: decided]`** — supported by `lore/01-the-past` L3 and `lore/02-the-silences` S2, neither of which reaches a wall |
| **A11** | **No operable object.** No lever, valve, switch, handle, crank, pull, prompt or button. Nothing in the place responds to anything but a player's proximity clearing overgrowth. | **`[cid: decided]`** — *"Input: movement only. No aiming, clicking, or ability buttons"* `[brief: soft]` `[you accepted: step 6 Q3]` |
| **A12** | **Nothing is closed.** Nothing locked, sealed, barred, shut, or walled off from the route further in. **Survives the `W5` strike unamended:** the condition on passage is an absence of built ground, not an object in a gap. | **`[cid: decided]`** — aligned with *"No gating mechanism needed"* `[brief: soft]` `[I assumed]` and *"Permanent multipliers only. Never content access"* `[brief: soft]` |
| **A13** | **No player-made mark.** Nothing here can be built, placed, planted, written, painted or decorated by a player. The only change a player makes to this place is clearing it. | **`[cid: decided]`** — *"Cosmetics-only was offered and declined as needing a display system first"* `[brief: soft]`; `lore/01-the-past` L5 (exposure, not reconstruction) |
| **A14** | **No modelled ambient motion inside the built edge.** Nothing sways, drifts, falls, flows, ticks, turns or animates. P9's canopy, beyond the edge, is the exemption. | **`[cid: decided]`** — see `## Why`. **Boundary:** I rule on modelled motion of matter; whether the place's *state* changes without the player is `03-physical-law`'s |
| **A15** | **No instrument in service.** Nothing displays a reading, a level, a count, an hour or a bearing. | **`[cid: decided]`** — the collection's register includes timekeeping and measuring objects, which is the one door a calendar could enter by |
| **A16** | **Nothing here can harm a player, and nothing but overgrowth can be changed by one.** No fall, drop, deep water, unstable surface, thorn that cuts, heat, cold, or dark you can be lost in. | inherited + extended — *"There is no failure state"* / *"Zero tension is deliberate"* (`02-GAMEPLAY.md`), elevated by *"Do not invent tension to fill the gap"* (`HANDOFF.md`); stated as matter here |
| **A17** | **Nothing is trending.** Nothing running out, spreading, drying, wilting, filling, ripening or falling due. | inherited `[brief: binding]` — *"Cleared is permanent"* `[you chose: R2 Q1]`; *"Nothing regrows, so nothing can accrue while away"* |
| **A18** | **Nothing is being made.** No part appears, grows or is added, whether a player is present or absent. All of it was built before anyone arrived. | inherited `[brief: binding]` — *"Endless via shuffled authored chunks, not generation"* `[you chose: R5 Q1]`; `02-extent` (*"Shuffle governs which part you meet next, never whether it exists"*) |
| **A19** | **Nothing starts over.** No seed, sapling, shoot, new growth, cycle, tide, or young thing anywhere. | inherited `[brief: binding]` — *"No rebirth"* `[you chose: R2 Q2]`, and the *"seasons"* reframe *"declined"* by name |
| **A20** | **Nothing marks a date.** No calendar, festoon, seasonal dressing, anniversary decoration, or dial that advances. | inherited + extended — priority 3 *"seasons and events"* `[I assumed — the ordering]` plus `cid/theme/_category.md`'s gate; stated as matter here |
| **A21** | **Nothing changes hands here.** No counter, scale, stall, market space, or container that accepts a thing from a player. | inherited + extended — *"no mechanical interaction"* `[brief: soft]`; `lore/02-the-silences` S4 (no counterparty); stated as matter here |
| **A22** | **The place records nobody's work.** No scoreboard, posted list, tally of anyone's clearing, or plaque naming who cleared a part. | inherited + extended — the category gate's *"no fiction of exchange, gifting, rivalry, ranking, or comparison between players"*; stated as matter here |
| **A23** | **Nothing here is given rather than uncovered.** No cache that refills, nothing that appears overnight, no gift, nothing left out for a visit. | inherited + extended — priority 3 *"daily rewards"*; the gate's ban on *"any fiction that presumes a daily visit, a streak, or a returning benefactor"*; stated as matter here |
| **A24** | **No road, track or way that leaves the works,** and nothing built, tended, inhabited, travelled or lit past the edge. | inherited — `01-the-ruin`, verbatim in substance and available to cite |
| **A25** | **No map, plan, signpost, survey mark or boundary stone, and no second building of any kind.** | inherited — `02-extent`, which handed me these five plus the second building |

### The priority-3 gate, mapped once so nobody re-derives it

`03-META.md` priority 3 has eight items. Strength column relayed from `cid/theme/_category.md`, not
re-judged here.

| priority-3 item | rows | strength as relayed |
|---|---|---|
| real procedural generation | A18 | `[brief: binding]` `[you chose: R5 Q1]` |
| rebirth | A19 | `[brief: binding]` `[you chose: R2 Q2]`, reframe refused by name |
| offline accrual | A17, A23 | binding by consequence |
| codes | A10 | the `[I assumed]` ordering only |
| daily rewards | A23 | the `[I assumed]` ordering, plus the live-ops default |
| leaderboards | A22 | the `[I assumed]` ordering, plus the gate |
| trading | A21 | *"no mechanical interaction"* `[brief: soft]` |
| seasons and events | A19, A20 | the ordering, plus the refused *"seasons"* reframe |

**No row above specs a priority-3 item.** The intended output is a place that cannot host one:
there is no surface to post a code on, no container to trade into, nothing that refills overnight,
and nothing young enough to begin again.

---

## Why

**The brief inventories nothing, and the silence is total.** No sheet in six mentions water, sky,
wind, weather, light, wear, debris, furniture, roads or remains, present or absent. My index logged
that as gap 11 and routed it here `[cid: decided]`. `OPEN.md §1` has no audit row for any of it, so
every `[cid: decided]` row above answers a question nobody asked.

**Why a closed present list rather than an open one.** *"the smallest game that still gives every
creative area real work"* `[brief: binding]` `[you chose: R1 Q3]` (`00-CORE.md`) cuts both ways: a
class nobody listed is a class an art pass invents at wave 4, unfunded, and the fiction then has to
absorb it retroactively. Twelve classes is also enough to dress a walled platform, which is the only
thing that ever needs dressing: *"a 120-stud terrace to dress, not an open landscape"*
(`cid/gameplay/meta/01-the-area.md`). **The wave-6 environment brief drew ten part classes and cited
`P1`, `P2`, `P3` and `P9` for every one**, which is the closed list doing exactly the work it was
written for `[research: repo — cid/art/environment/01-world-part-budget.md, read this run]`.

**No standing water, and this is the row I expect to be argued with.** Five reasons, in descending
order of strength. (1) A wet or reflective surface darkens stone, and cleared stone must hold a
Rec.601 luma of at least 165, at least 40 above the lightest tier green, because *"rarity tiers must
differ by shape or silhouette, not only hue"* is *"a requirement, not a nicety"* (`04-PRESENTATION.md`)
`[brief: soft]`, self-described as a requirement. (2) Water in the tanks reads as the works still in
service, against `01-the-ruin`'s ruling that the works no longer works. (3) A pool is the one place
in this world a player would expect something swimming or skating on it, and A1 forbids both, so
water makes the fauna absence conspicuous instead of unremarkable. (4) Deep water is the only hazard
this architecture could plausibly contain, and A16 forbids hazards. (5) It is the cheapest row in the
sheet to build: nothing. **It is inside `01-the-ruin`'s stated range and overrules nothing** (it
offered *"dry or hold still rainwater at most"* and handed standing water to me by name), and the dry
joke of a waterworks with no water in it is left dry, per the register.

**No light but daylight, because every artificial source imports something already forbidden.** A lit
lamp says somebody is here (`identity/04` row 8, no present makers). A tended fire is an agent
(`lore/01-the-past` L6, *"No agent, ever"*). A torch in a ruin is the genre reflex and it is
*spooky*, against *"reclamation, not a haunted place"* `[brief: soft]` ×2. A glow is supernatural,
and that budget belongs to `03-physical-law` and is not mine to spend. Daylight also settles what
`02-extent` handed forward about the vaulted parts at depths 2 and 3: they are lit through
construction, which is what a cistern's pierced vault is for, and no fixture is needed to do it.

**No depicted person or creature, which is the boundary `identity/04` explicitly gave me.** It ruled
that *"a carved figure, an effigy, a portrait or a name cut into stone breaks nothing here, and
whether one exists is object work and place work, not mine."* I rule none exists. A cut name is a
proper noun, and `lore/02-the-silences` S2 gives the makers *"no proper noun, no title, no count, no
order, no dynasty, no language and no face"* while L3 gives the place no name either, so the only
figurative carving left would be a nameless face, which is the single most reliable way to make an
empty place read as watched. Ornament survives untouched, because `01-the-ruin` already defined it as
*"carving, casting, dressed joints and pattern in paving"*, which is abstract by construction.

**Every loose object is a `Find`, and this is the row with the most reach.** *"the clearing is the
revealing, what you uncover is what you keep"* (`CONCEPT.md`) `[brief: binding]` `[you chose: R1 Q1]`
locates the whole distinction in the collection layer. A loose object that is *not* collectible
teaches the opposite lesson on sight, is indistinguishable from a `Find` in a grid cell at phone size
on a *"~70% mobile"* audience `[brief: binding]` `[you chose: R1 Q4]`, and costs a wave-4 model for
zero systems. The fixed-or-loose boundary is the whole rule and it is checkable by anyone: if it is
part of the building it is P3, otherwise it is a `Find`. **A tool in a player's hand is not place
matter and is untouched by this row**, which matters because `identity/04` recommends an oversized
tool as the premium SKU's home.

**No modelled motion inside the built edge, on an accessibility argument rather than a taste one.**
Tier is *"a core economic signal"* carried primarily by silhouette, and a swaying silhouette is a
changing silhouette. Worse, the game's one meaningful visual event is a patch ceasing to exist on
contact, and ambient motion on every standing patch across a dozen plots is motion competing with the
only motion that means anything. The canopy beyond the built edge is exempt because it carries no
tier signal, is never cleared, and is the backdrop `01-the-ruin` and `02-extent` already placed there.
**This is not a ruling on whether the place changes without the player**, which is
`03-physical-law`'s question; it is a ruling on what matter is here.

**The climber, which is the one thing the shipped tier names ask of this roster.** Of the four names
in `tiers`, exactly one denotes a climbing habit, and a climber needs something to have climbed. P1
supplies it: vertical built stone is present in every part, so the class is accommodated with **no
new matter and no new key**. The ruling on habit is that the climber is **ground-rooted and leans
against built stone; it is never pinned flat to a wall, hung from a vault, or spanning a gap.** Two
shipped values force this and one ratifies it: a patch is a 3-stud **ground** footprint that *"does
not collide"* (`cid/art/objects/01-patch-footprint.md`), so no patch can live on a vertical or
overhead surface; and the fourth tier's shipped shape is `Wedge`, which is a leaning solid.
`[research: repo — cid/gameplay/systems/01-overgrowth-tiers.md, cid/art/objects/01-patch-footprint.md,
read this run]`

**What covers a `Find` is plant and litter, not earth, and that is a real decision.** *"Input:
movement only"* funds no dig verb; L2 says things are *"where they were left"* rather than
interred; and reveal placement is *per patch, at the instant that patch clears*. A soil layer deep
enough to bury an object would imply an excavation the loop does not contain and would put a second
material between the player and the reveal. So P6 is thin: litter and root mat over paving. `buried`
stays sayable, because S3's structural test admits it as a state.

**Where this sheet deliberately declines to resolve something.** Whether rarity lives in the
overgrowth, in the `Find`, or in both is open in the source (`01-FOUNDATION.md` assumption 1 against
`03-META.md`'s *"hide rarer sets"*) and routed by `OPEN.md §5` to Systems (wave 2) and Meta & Content
(wave 3). **Nothing above correlates a class of overgrowth with a class of object.** The climber
reaching vertical stone is a habit, not a claim that the rarest things are found against walls.

**`[playtest unknown]` — whether a place with no water, no fire, no motion and no props reads as calm
or as sterile to 8–14s** `[brief: binding]` `[you chose: R1 Q4]` on the band. **Starting value: the
twelve classes exactly as listed.** Test range, in the order it should be spent: (1) more variance in
weathering, pattern and litter distribution inside the present classes, which is dressing and costs
no new class; (2) raise the canopy's motion and Audio's off-screen ambience beyond the edge, both
already permitted; (3) **only** a developer ruling adds a thirteenth class, because the closed list
is this sheet's central claim. What would settle it: ask a first-session player what they would add
to the place. *"More to clear"* passes. *"Something to look at"* fails.

---

## Consequences for other work

- **Place-rules work** *[Setting — `03-physical-law`, this domain, ruled]*: four
  inheritances and one boundary. **(a)** `01-the-ruin`'s water range is now closed at dry, so your
  law has no still rainwater to account for. **(b)** No light exists but daylight, so an hour ruling
  is a ruling about daylight only. **(c)** No matter inside the built edge is modelled in motion, so
  a cycling sky may not be delivered by moving anything on the ground. **(d)** If you depict rain,
  it may not leave stone wet, because the luma floor is what a stated accessibility requirement
  rests on — and you closed it at never depicted, so the conditional never fires. **The boundary:**
  I rule what matter is here, you rule whether its state changes and whether anything more than
  ordinary exists. **You may not license a class this sheet lists absent without revising against
  this sheet**, and the supernatural budget is yours untouched.
- **Cleared-area and passage work** *[Setting — `04-permanence-and-passage`, this domain, ruled]*:
  A11 and A12 remove every affordance you were told not to use anyway. Nothing here is
  closed and nothing is operable, so passage cannot be a door that opens, a lever, a threshold that
  unseals, or a key that turns; an opening in construction that was always open costs nothing and
  breaks nothing. **The `W5` strike does not reopen either row**, because the condition it introduces
  is an absence of built ground rather than an object in a gap — 0 instances, 0 prompts, 0 barriers.
  A13 also means a restored part cannot be made *visitable* by letting anyone
  decorate or furnish it, so priority 2's plural survives as *cleared*, not *dressed*.
- **Environment art** *[Art & Visuals — Environment, wave 4+]*: **the present column is the whole
  dressing list and it is closed.** Nothing outside P1 to P11 appears inside the built edge.
  Concretely forbidden and most likely to be reached for: props of any kind, rubble, banners and
  cloth, rope, torches and lamps, water of any kind, wet stone, statuary and relief figures, cut
  lettering, and any swaying or drifting element. The one motion budget you have is P9's canopy,
  beyond the edge. Variance goes to weathering, pattern, litter and green quantity, which is where
  `02-extent` already sent it. **Cite `setting.contents.present[].id`, not this prose.**
- **Object art** *[Art & Visuals — Objects, wave 4+]*: the fixed-or-loose rule is yours to hold. A
  fitting modelled into the building is P3 and must read as fixed; anything loose must be a `Find`.
  Marks and figures *on* a `Find` are yours and are governed by `lore/02-the-silences` S2, not by
  A4, which reaches only the place's own surfaces.
- **Lighting and effects work** *[Art & Visuals — VFX, Tech]*: daylight is the only source. No point,
  spot or surface light, no fire or smoke or sparkle effect, no emitter, beam or trail as ambience.
  The clear-away effect on a patch is a player-caused event and is not ambient motion, so A14 does
  not reach it.
- **Duplicate-handling work** *[Systems, wave 2]*: **the place cannot be the sink.** A21 and A13
  together mean there is no container, counter, shelf, plinth or display surface here to put a spare
  `Find` into, and nothing a player may place. The constraint you were given (*solve duplicates
  without adding a currency*) still has room, but "put it back in the ruin" and "display it in the
  ruin" are both closed. If your answer needs one of them, revise against this sheet with a stated
  reason rather than assuming the furniture.
- **Area-content work** *[Meta & Content, wave 3]*: depth theming draws only on the present column,
  and no depth may introduce a thirteenth class. `02-extent` already forbids a fifth kind of part;
  this adds that a deeper part is not a *different kind of matter*, only more green over the same
  twelve classes. Set themes are untouched: A10 forbids writing on walls, not meaning in a set.
- **Mechanics and interface work** *[Mechanics; UI/UX — Screens, wave 4]*: A11 means the world
  contains nothing to interact with, so no proximity prompt, click detector, hold-to-use affordance
  or contextual button has a referent in this place. That is consistent with movement-only input and
  is stated here so nobody proposes a world-object interaction as the fix for a thin moment.
- **Premium-SKU work** *[Monetization, wave 3]*: A13 removes the cosmetic-placement home before it is
  proposed, which agrees with the brief's own *"Cosmetics-only was offered and declined"*. A12 means
  nothing here reads as sealed or premium. The oversized tool `identity/04` recommends is untouched:
  a held tool is not place matter.
- **Audio work** *[Audio, wave 4+]*: the inventory tells you what cannot make a sound. **No water
  bed, no fire crackle, no mechanism, no cloth or rope, no creaking hinge in service.** Air is
  present and unmodelled, so a soft air bed and the off-screen ambience `01-the-ruin` granted you are
  both available and are the only living sounds in the game.
- **Terrain and performance work** *[Tech & Data]*: this roster contains no water surface, no dynamic
  light, no particle ambience and no animated part inside a plot. Stated as a consequence of the
  fiction, not as a budget.
- **Player-role and cast work** *[Identity — `01`, `03`, `04`, already ruled]*: the two lists are
  disjoint by subject and stay that way. `identity/04` keeps every entity class; A4 answers the one
  question it routed here, and answers it *no*, so its row 7 reopening condition is never triggered
  from this domain. P12 cites your sheets rather than restating them.
- **History work** *[Lore, already ruled]*: both instructions honoured. A2 carries the wording you
  required and not the phrase you forbade; A8 keeps the stone sound and adds no catastrophe, no
  evacuation, and no layer of debris to read a chronology off.
- **Naming work** *[Vocabulary, this wave, last writer]*: **nothing owed. This sheet coins zero
  terms.** Offered, not imposed: `setting.contents.absentClassWordCheck.tokens` is ready for
  `vocabulary.bannedWords` if you want them machine-checked. I checked them against the shipped
  strings first, and none collides with a `Find` name, a tier name, an upgrade label, the area label
  or the currency.
- **Fantasy work** *[Fantasy, this wave]*: nothing here depends on your occupancy search. This roster
  is material rather than setting identity, so it survives intact even if the search returns a
  shipping game built on a terraced stone works.
- **Store and positioning work** *[Discovery & Marketing, wave 5]*: nothing in this place is
  premium, sealed, timed, or given, so no listing line may promise a season, a daily, a code, a
  trade or a leaderboard. What is true and sayable is that the only thing that ever changes here is
  what a player has cleared and what they have found.

## Acceptance criteria

1. **Roster shape.** The present table has exactly **12** rows numbered `P1`–`P12`; the absent table
   has exactly **25** rows numbered `A1`–`A25`. Every absent row carries exactly one provenance mark
   from the set {`inherited`, `inherited + extended`, `[cid: decided]`} together with a named source
   file or a quoted brief line; **10** rows are marked `[cid: decided]`. The priority-3 mapping table
   has **8** rows, one per item in `03-META.md`'s priority-3 list, and every row names at least one
   `A`-number. `setting.contents.present[]` and `.absent[]` carry the same ids and the same counts.
2. **Nothing-outside-the-list, checked against the build.** Inside a plot's bounds, the count of
   instances that are not stone construction, an overgrowth patch, a `Find`, the off-plot canopy
   backdrop, or a player character is **0**. Specifically: **0** parts using
   `Enum.Material.Water` and 0 terrain water; **0** `PointLight`, `SpotLight` or `SurfaceLight`
   instances; **0** `ParticleEmitter`, `Beam`, `Trail`, `Fire`, `Smoke` or `Sparkles` instances as
   ambience; **0** `SurfaceGui`, `TextLabel` or decal bearing words on any world surface; **0**
   `ProximityPrompt` or `ClickDetector`; and **0** `Animator`, `AnimationController` or looping tween
   attached to any instance inside the plot.
3. **Absent-class word check.** Across every `manifest` block and every `artPrompt` under `cid/`, the
   whole-word case-insensitive pattern
   `torch|torches|lamp|lantern|candle|brazier|bonfire|banner|tapestry|curtain|rope|scroll|parchment|statue|statuary|effigy|idol|bust|rubble|debris|puddle|fountain|grave|tomb|shrine|altar|lever|valve|switch|padlock|signpost|inscription|scoreboard`
   returns **0 hits** at every path except the twelve listed in
   `setting.exclusionListFields.fields`, which are the check rather than a violation of it. Prose in
   these sheets is exempt. The check is against contract values and art prompts only.
4. **Two-sheet agreement.** **0** of the 25 absent rows duplicates any of the 9 rows in
   `cid/theme/identity/04-no-cast-declaration.md` (that table is entity classes, this one is inert
   matter), and the absent table contains **0** occurrences of the two broader phrases `01-the-ruin`
   and `lore/01-the-past` each forbade this sheet, carrying instead `no fauna of any kind, visible
   or interactive` (`A1`) and `nobody present now` (`A2`) as those sheets required.

## Not decided here

The hour, the sky's state, weather as a depicted event, and whether anything more than ordinary
exists here (`03-physical-law`, which amends `setting.law`). What a cleared part becomes and how a
player goes further in (`04-permanence-and-passage`, which amends `setting.passage`). Whether
anything is alive (`01-the-ruin`, which carries the `setting` key; cited at A1 and not remade).
Scale, direction, and the five absences at A25 (`02-extent`, which amends `setting.extent`). Whether
rarity lives in the overgrowth, in the `Find`, or in both (Systems, wave 2; Meta & Content, wave 3,
per `OPEN.md §5` assumption 1) — this sheet asserts no correlation either way. Every model, colour,
material asset, lighting value, effect and sound inside the twelve classes (Art & Visuals; Audio).
Area count, size, density, arrangement, depth theming and how many authored layouts exist
(`gameplay/meta`, wave 3). What a stranger may *do* (Social, wave 2). The four tier names, the 24
`Find` names, the four set labels and the area label, all of which travel inside keys other domains
own. Whether the criterion-3 tokens join `vocabulary.bannedWords` (Vocabulary).

## Flagged to the developer

**Nothing in the brief inventories this world.** Water, sky, wind, weather, light, wear, debris,
furniture, roads and remains are absent from all six sheets, present in no interview question, and
carry no audit row in `OPEN.md §1`. My index recorded that as gap 11. So the ten `[cid: decided]`
absences and three of the twelve present classes answer questions nobody asked.

Four calls were genuinely live. Each is cheap to reverse and I state the cost.

| call | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **No standing water** (A6) | Shallow still rainwater in the lowest tanks, which `01-the-ruin` explicitly permitted | It darkens stone against a luma floor a stated accessibility *requirement* rests on, reads as the works still in service, and makes the fauna absence conspicuous by putting a pond in a world where nothing swims | One row, one art note. Nothing else in this sheet depends on it |
| **No loose object that is not a `Find`** (P4) | Scattered non-collectible props as dressing, the ordinary way a ruin is dressed | It teaches on sight that some objects are not for you, in a game whose whole distinction is that what you uncover is what you keep, and it is indistinguishable from a `Find` in a phone-sized cell | Moderate. It reaches Art at wave 4 and would want a visual rule separating a prop from a `Find` |
| **No depicted person or creature in the stone** (A4) | One carved figure or a name cut into a lintel, which `identity/04` explicitly left available | A nameless face is the most reliable way to make an empty place read as watched, against *"reclamation, not a haunted place"*; and a cut name is the proper noun two lore silences forbid | One row. Ornament is unaffected, because it was already defined as abstract |
| **No modelled ambient motion inside the built edge** (A14) | Gently swaying foliage, the genre's default warmth touch | A swaying silhouette competes with the silhouette channel that carries tier, and with the one visual event that matters, a patch ceasing to exist on contact | One row plus a performance cost. The canopy exemption already gives the place some life |

**The ruling I would most like from you: whether a place this bare reads as calm or as sterile to an
8–14 audience.** My recommendation is the twelve classes as written, on one argument: every removed
class was either forbidden by something already decided or was a wave-4 model with no system
attached, and the two escalations in the playtest range (more variance inside the classes, more life
beyond the edge) both cost less than a thirteenth class would. If it reads sterile, spend those two
first; a thirteenth class should need your signature.

No URL was fetched in this run. Every `[research: repo — ...]` above cites a file read in this run.
