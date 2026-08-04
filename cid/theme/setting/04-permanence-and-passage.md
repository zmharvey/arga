# 04 — Permanence and passage

**Domain:** Setting · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**A finished part is the same part with the green gone, forever, and it stays walkable.** Nothing is
added to it, nothing is added by it, and re-entering it is free because the one flag that records it
as finished is the same flag that rebuilds it as finished.

**The way further in is an opening in the built boundary that was always open and holds nothing.**
Every part has exactly two — one inward, one outward — and neither is a door, neither is operable,
and neither holds an instance at any moment for any reason. Going deeper is walking through the
inward one. Going back is walking through the outward one. **That is the entire passage system.**

**`W5` is struck, and the strike is recorded rather than argued.** This sheet named it as a
one-line reversal; `depths.unlockRule` and `plots.openings.gatedUntilPreviousBayComplete` have both
taken it `[research: repo — cid/gameplay/meta/04-the-depth-ladder.md, cid/gameplay/meta/06-plot-arrangement.md,
read this run]`. **Passage is therefore conditional on the current part being finished** — and it
survives `A11` and `A12` intact, because the refusal still has no object: `plots.openings.gateMechanism`
is *"the ground beyond does not exist yet"*, and no barrier is ever placed in an opening. That is the
one form of a condition this world could host, and it is the one the build took.

**I rule on the re-entry question `fantasy/02` handed me: a finished part stays re-enterable.** Its
either/or closes on that branch. Re-enterability and the `OPEN.md §2` collapse-to-a-flag default are
**not in conflict** — the flag exists to stop cleared green from ever returning, and re-entry reads
that same flag and spawns zero patches. **Re-enterability costs zero additional bytes.**

Six rules, `W1`–`W6`, each stated so another sheet can cite it by id. `W` because `R`, `A`, `P`, `L`,
`S`, `X`, `B`, `M`, `K` and `G` are all taken by sheets already on disk.

| # | rule | the shape of the check |
|---|---|---|
| **W1** | **A finished part is finished stone and nothing else.** Zero patches, zero `Finds`. It gains no marker, plaque, dressing, light, colour shift, sound, cue or state of any kind. The only difference between it and itself an hour earlier is that the green is gone. | count of instances in a part that differ between the tick before its last patch clears and the tick after: **0** |
| **W2** | **A finished part stays walkable, rebuilt from its completion flag.** Entering it spawns **0** patches. Realised as `plots.liveGeometry.torndownBeyond`: a bay outside the retained window is destroyed and **rebuilt bare on re-entry**. | a finished part's saved payload is 1 boolean, and its byte count is identical whether or not it is ever re-entered |
| **W3** | **Two openings per part, always open, holding nothing.** One inward, one outward. No door, no arch that shuts, no barrier, no operable part, no instance inside the gap. Neither opening exists *because* the part was finished; both were there at second zero. | count of openings per part: **2**; count of instances in an opening: **0** |
| **W4** | **Passage is a walk and costs nothing but the walk.** Zero studs between an opening and the next part, no corridor, no antechamber, no approach, no loading surface. A player arriving in a part stands at its **outward** opening facing in, so the walk reads as one continuous movement inward. | travel between an opening and the next part: **0** studs, **0** s |
| **W5** | **STRUCK.** As written: nothing conditions passage. As it now stands: the inward opening is passable only once the part is finished, and the refusal is the absence of ground rather than a barrier. | count of conditions attached to an opening: **1** (previous part complete); count of barriers, prompts or instances in an opening: **0** |
| **W6** | **Both directions are always walkable.** The way in is the way out. No part is one-way and no route closes behind anyone. This is what makes `W2` reachable without any interface at all. | count of one-way openings: **0** |

**The hinge, named so that a later refusal is one line rather than a rewrite. One of the two has
been spent.**

> **Strike `W2`** → a finished part is not re-enterable, the outward opening of the current part leads
> nowhere walkable, and `fantasy/02`'s either/or resolves on its other branch: the count of finished
> parts becomes a **mandatory** player-facing figure rather than an optional one. `W1`, `W3`–`W6` are
> unchanged and no other sheet is reopened. **Not taken. Still available at the same price.**
>
> **Strike `W5`** → the inward opening is passable only when the part is finished, at most one part
> ever carries a per-patch list, and the brief's own *"depth is reached by clearing"* reading wins.
> `W1`–`W4` and `W6` are unchanged. **TAKEN**, by `gameplay/meta/04` and `gameplay/meta/06`, both
> citing this hinge by name. The persistence cost this sheet created is gone with it.

**Priority 2's *visitable restored ruins* is held open and not committed to.** `W2` is its
precondition and this sheet supplies it at zero cost. Three things would have to be true before it
could be built, none of them decided here: a plot would have to hold a second occupant or render a
copy of another player's part; a visitor would see **bare stone and nothing else**, because `W1`
forbids additions and `05-inventory` `A13` forbids anything a player places; and *showing off* would
have to survive *"no mechanical interaction"* and the category gate's ban on comparison between
players. **The word `restored` is not adopted** — `lore/01-the-past` `L5` limits it to exposure, so a
finished part is *finished* or *cleared*, and priority 2's phrase is quoted as the brief's rather than
used as canon.

**This sheet amends `setting.passage`; `01-the-ruin` carries the key.** Most of `W1`–`W6` is now
carried by a merged key — `plots.openings` implements `W3` and `W4` field for field, and cites this
sheet in doing so. The block below is therefore a crosswalk first and a decision second: it names,
per rule, the field that holds it and the residue nothing holds.

```json
{
  "amends": "setting",
  "requested_by": "cid/theme/setting/04-permanence-and-passage.md",
  "passage": {
    "rules": [
      { "id": "W1", "rule": "a finished part is finished stone and nothing else", "status": "stands", "carriedBy": "no key holds it; it is a prohibition binding environment, chunkDressing, effects and stingers", "counts": { "instancesDifferingAcrossTheCompletingTick": 0 } },
      { "id": "W2", "rule": "a finished part stays walkable and entering it spawns 0 patches", "status": "stands", "carriedBy": "plots.liveGeometry.torndownBeyond — destroyed and rebuilt bare on re-entry", "counts": { "patchesOnReEntry": 0, "findsOnReEntry": 0, "savedPayloadBooleans": 1 } },
      { "id": "W3", "rule": "two openings per part, always open, holding nothing", "status": "stands", "carriedBy": "plots.openings — perBay 2, alwaysOpen true, barrierInOpening false, outwardOpeningOfBay1 is the works' edge", "counts": { "openingsPerPart": 2, "instancesInAnOpening": 0 } },
      { "id": "W4", "rule": "passage is a walk and costs nothing but the walk", "status": "stands", "carriedBy": "plots.openings.studsBetweenParts = 0", "counts": { "studsBetweenParts": 0, "loadingScreens": 0, "corridorsAntechambersOrApproaches": 0 } },
      { "id": "W5", "rule": "as written: nothing conditions passage", "status": "struck", "struckBy": ["depths.unlockRule", "plots.openings.gatedUntilPreviousBayComplete"], "replacedBy": "the inward opening is passable only once the part is finished", "theStrikeWasNamedInThisSheetAsAOneLineReversal": true, "counts": { "conditionsOnAnOpening": 1, "barriersPromptsOrInstancesInAnOpening": 0 } },
      { "id": "W6", "rule": "both directions are always walkable; no part is one-way and no route closes behind anyone", "status": "stands", "carriedBy": "plots.liveGeometry.groundExistsIn, with the seam noted below", "counts": { "oneWayOpenings": 0 } }
    ],
    "theConditionHasNoObject": "plots.openings.gateMechanism — the ground beyond does not exist yet; the built lane's inward edge is bounded by the same plot boundary that bounds its long sides, and no barrier is ever placed in an opening. This is why the W5 strike reopens neither A11 nor A12: the refusal costs 0 instances.",
    "finishedPartGains": { "markers": 0, "plaques": 0, "lights": 0, "colourShifts": 0, "cues": 0, "strings": 0, "cameraMoves": 0, "effects": 0, "fades": 0, "transitions": 0 },
    "aFinishedPartCannotBecomeSomethingOverTime": "setting.law R4 — no settling in, no gradual return, no state a finished part reaches later",
    "arrivalPlacement": {
      "standsAt": "the part's outward opening, facing in",
      "why": "a neighbour watching a plot re-green in one frame reads a body translating across it as they moved on, rather than as the green came back. Costs one position and no assets.",
      "spawnMayNotFaceTheInwardOpening": true,
      "carriedBy": "plots.spawn.lookVector and plots.spawn.neverFacesLaneAxis true"
    },
    "wordRestored": { "adopted": false, "why": "lore/01 L5 limits it to exposure. A finished part is finished or cleared; priority 2's phrase is quoted as the brief's, never used as canon.", "thereIsNoRestoredLookToAuthor": "a finished part is dressed identically to an unfinished one minus the green" },
    "bannedPassageWords": ["door", "doorway", "gate", "gateway", "gated", "locked", "unlock", "unlocks", "unlocked", "barred", "portal", "teleport", "shortcut"],
    "bannedPassageWordsScope": "manifest string values and artPrompt values, whole-word case-insensitive. Prose is exempt, and the exemption is load-bearing: every hit under cid/ today is prose.",
    "deliberatelyNotBanned": ["key", "seal", "hinge"],
    "whyThoseThree": "Key, Seal and Hinge are live collection.sets[].relics values. A check that forces a rename of a shipped value is a check that failed. Shipped values at rename risk from this sheet: 0.",
    "unavailableProgressionWordsForTheStore": ["unlock", "gate", "door", "key", "portal", "shortcut", "restored"],
    "areasScreen": { "loadBearingForProgression": false, "mayNotBe": ["the only route to any part", "a map", "an elevation section", "a total or a fraction"], "walkBackShortcutPermittedIf": "it arrives on foot inside the part and never shows the works from outside" },
    "visitableRestoredRuins": {
      "status": "held open at zero cost, not committed to",
      "aVisitorWouldSee": "bare stone and nothing else",
      "preconditions": ["a plot holding a second occupant or rendering a copy of another player's part", "no mechanical interaction survives it", "the category gate's ban on comparison between players survives it"]
    },
    "openSeam": {
      "field": "plots.liveGeometry",
      "problem": "groundExistsIn says every bay from 1 up to and including the live bay exists; torndownBeyond says bays more than two outward of the live one are destroyed. Both are in one key's value and they cannot both be standing statements.",
      "whatThisSheetNeeds": "W6 holds under either reading only if a destroyed bay is rebuilt on approach rather than on arrival — a player walking outward must not meet an absence of ground.",
      "owner": "gameplay/meta/06, which owns plots. Raised, not resolved here."
    }
  }
}
```

---

## Why

### The brief says a gate is not needed and never says what is there instead

*"**No gating mechanism needed** — with rebirth cut, depth is reached by clearing, not by hitting a
threshold"* `[brief: soft]` `[I assumed]` (`03-META.md`, `OPEN.md §5` #3). My index logged that as gap
9 and routed it here. `04-PRESENTATION.md` then lists an `areas` screen *"implied by ... moving between
areas by depth"* `[brief: soft]`, which presumes a travel or selection act **no world rule supported
until this sheet.** And gap 10 — what a finished area becomes — sits unreconciled between priority 2's
plural and the `OPEN.md §2` default. Both are `[cid: decided]`.

### Passage cannot be a door, and the strongest evidence is four shipped `Finds`

`05-inventory` `A11` (*"No operable object. No lever, valve, switch, handle, crank, pull, prompt or
button"*) and `A12` (*"Nothing is closed. Nothing locked, sealed, barred, shut, or walled off from the
route further in"*) are already on disk in my own domain, and between them they delete every obvious
answer. **What they leave is the answer they explicitly offered:** *"an opening in construction that
was always open costs nothing and breaks nothing"* (`05-inventory`, consequences to this sheet).
`W3` takes it, and the `W5` strike does not disturb it: the condition that now exists is an absence of
ground, not an object in a gap.

**The independent argument, which is the one with a rename attached.** `collection.sets[].relics`
already ships `Hinge` (Terrace, depth 1), and `Seal` and `Key` (Vault, depth 3)
`[research: repo — cid/gameplay/meta/02-the-collection.md, read this run]`. **Under a door-and-key
passage those three stop being objects a mason and a clerk left and become instruments in service** —
the exact failure `03-physical-law` argument 1 identified for `Sundial` and `Gnomon` under a moving
sun, and a breach of `A15` (*"No instrument in service"*). Under `W3` there is no door anywhere in the
world, so a hinge is a hinge, a seal is a seal, and a key fits nothing. **Reverse `W3` and three
live contract values are at risk.** `[cid: decided]`

The dry joke is available and left dry: the deepest set the game ships contains a key, in a place where
nothing is shut.

### Re-enterability is free, and the technical objection is against a cost nobody is being asked to pay

This is the argument the whole sheet turns on, so it is stated as an audit rather than asserted.

*"per-area cleared state ... permanence means the world itself is save data, which grows without bound
**unless areas are collapsed to a completion flag** once finished"* `[brief: soft]`
`[I assumed — batched default]` (`OPEN.md §2`), with *"the one genuinely novel technical risk this
design introduces"* attached. The shipped module contract carries it as a prohibition: `persistence`
*"forbids storing a per-patch cleared list once an area is complete"* and must satisfy *"a completed
area occupies a single boolean in the payload, not a list"*
`[research: repo — cid/tech/architecture/02-module-plan.md, read this run]`.

**Read it precisely: the prohibition is on the list, not on the flag.** And the flag is not optional —
it is what stops a finished part coming back green, which is *"**Cleared is permanent — overgrowth
never returns.** This is the payoff and it is load-bearing"* `[brief: binding]` `[you chose: R2 Q1]`.
So the flag would exist under either ruling. `W2` adds **one read of an existing boolean** and spawns
zero patches. `layout` is *"shared ... deterministic ... forbids any per-session randomness"* precisely
so a saved state can be re-derived, and a finished part's re-derivation is the cheapest case there is:
run layout, spawn nothing. `03-physical-law` `R4` makes it airtight from the fiction side — the place
has *"exactly one mutable property — a patch is standing or it is cleared"* — so **a finished part has
no other state that could need reconstructing.** `[cid: decided]`

### And permanence is not observable unless you can go back

*"Cleared is permanent"* is called *"the payoff"* `[brief: binding]`, and `fantasy/01` made it the
register of the whole game: *"the green you clear never comes back."* **A payoff the player can never
check is an assertion, not a payoff.** Under `01-FOUNDATION.md`'s no-regrowth rule the claim is
demonstrated inside a lap — you walk over ground you cleared a minute ago — but the claim being made is
about *forever*, and forever is only demonstrable across a session boundary and across a part boundary.
`fantasy/02` named the failure exactly: if a finished part cannot be re-entered, *"carrier 2 disappears
and the player's entire accrual at S4 is **a number**"*
`[research: repo — cid/theme/fantasy/02-promise-over-time.md, read this run]`. With *"Clear → reveal
inside the first ten seconds ... **No text, no tutorial**"* `[brief: soft]` `[you accepted: R6 Q3]`,
a wordless carrier is the only kind this game has. `W2` is that carrier and it costs nothing.

### `W1`: a finished part gains nothing, because five sheets have already removed everything it could gain

The temptation is a payoff state — a plaque, a bloom, warmer light, a marker on the wall. Every form of
it is already closed by a sheet with the right to close it: `A13` (*"No player-made mark. Nothing here
can be built, placed, planted, written, painted or decorated by a player"*), `A10` (no writing on any
surface), `A4` (no depicted figure), `A7` (no light but daylight), `03-physical-law` `R1` (one lighting
state), `tone/03-beat-map` `K3` (*"A peak's world footprint is exactly the thing that just changed ...
no area-wide light, colour, growth or bloom change fires at any peak"*) and `K4` (a peak may not be a
return or a renewal). **So `W1` is not restraint, it is arithmetic**: the set of things a finished part
could become is empty, and this sheet's job is to say so before Art or Mechanics proposes one at wave 4.
`03-physical-law` also told me directly: *"A cleared part therefore cannot become something over time —
no settling in, no gradual return of anything, and no state a finished part reaches later."*

**What a finished part therefore contains, as a count:** `P1`, `P2`, `P3`, `P6`, `P7`, `P8`, `P9`,
`P10`, `P11` from `05-inventory`, and **zero** instances of `P5` (overgrowth) and **zero** of `P4`
(loose objects — every one is a `Find` and a `Find` is *"theirs from the moment it surfaces"*,
`identity/01-player-role`). **This sheet adds zero classes to the twelve and zero rows to the
twenty-five.** An opening is an absence of `P1`, not a new material.

### `W4` and `W6`: the geometry, and why it contradicts neither sibling

**`01-the-ruin` survives verbatim and I request zero changes to it.** Its criterion 2 requires that
*"every one of its four sides terminates in built stone or in ground the player cannot walk onto"* with
*"Walkable ground outside the plot: 0 studs."* An opening satisfies the second clause: beyond it is
ground the player cannot walk onto, because the next part is not instantiated. **The player stands in
the opening — the last stud of the plot — and the ground they are on becomes the next part.** They never
walk outside the plot. The boundary is still built on all four sides; two of them have a gap in the
build. That the ground beyond does not exist yet is also, under the `W5` strike, the entire gate.

**`02-extent` authorised exactly this and I take it literally.** It ruled *"Going deeper is **walking
further in**, so passage may not be described or built as descending, climbing, or crossing to a separate
place, and it may not be a map or a survey of the works — no view of the whole exists."* A walk through
a gap in a wall into more of the same works is the only shape left after those four exclusions. It also
supplies the honesty about the seam, which I inherit rather than re-argue: *"Depth is an ordering, not a
coordinate. **No spatial relation between two areas is canon** — no adjacency, no bearing, no distance,
no map."* So the fiction claims **continuity** (you kept walking inward) and claims **no position**, and
the build re-authoring one plot does not falsify a claim the fiction never makes. That is the
same argument `02-extent` used to make the shipped row of identical plots correct rather than excused.

**`W4`'s placement clause exists for one reason and it is a legibility one.** Passage rebuilds the live
bay, which is the operation `identity/03-co-present-stranger` criterion 4 already mandates (*"created in
one loop with no yield and removed by a single `Destroy`"*) — **zero revision requests there.** But a
neighbour watching sees ground go from bare stone to full green in one frame. Placing the arriving
player at the **outward** opening — the far side from where they entered — means they visibly translate
across the plot at that same instant, which reads as *they moved on* rather than as *the green came
back*. It costs one position and no assets. `[cid: decided]`

**The travel budget, stated because `core-loop/04` set one.** It requires the next area be *"enterable
at the instant one completes, with no threshold, no cooldown and no travel worth measuring"* — *"Any
gate at all converts the completion peak into a stall three to seven times a session."* Under `W4` the
only travel is the walk to the opening, bounded by the part's own diagonal: at the shipped `area.size`
of 120 that is 170 studs, and at `movement.baseWalkSpeed` 16 that is 10.7 s against the 165 s lap that
sheet targets — **6.5%, and on average about half of it**, since the last patch cleared can be anywhere.
**The `W5` strike does not spend that budget**, because the condition is satisfied at the moment the
last patch clears and the next bay is built at that same instant
(`plots.liveGeometry.bayBuiltAt`).
`[research: repo — cid/gameplay/mechanics/01-reach-and-pace.md, cid/gameplay/meta/01-the-area.md,
cid/gameplay/core-loop/04-lap-vs-session.md, read this run]`

### `W5`: written unconditional, struck conditional, and the reason the strike is cheap

The world-side argument for the original ruling was short: `A12` says *nothing is walled off from the
route further in*, `A11` says nothing is operable and no prompt exists, `R1`–`R3` give the place one
unchanging lighting state, and `W1`/`K3` forbid anything appearing or changing at completion. **A
conditional passage would therefore have to refuse invisibly** — a player walks into a gap and simply
does not go through, with nothing in the world to explain it.

**The build found the third option this sheet did not, and that is why the strike costs so little.**
The refusal is not invisible and not an object: **the ground beyond has not been built yet**
(`plots.openings.gateMechanism`, `plots.liveGeometry.bayBuiltAt`). A player at the inward opening of an
unfinished part is looking at the edge of the world, which is the same thing they see at the far side
of any part in any direction. Nothing was added, nothing shut, nothing refused them by name.
`A11` and `A12` both survive, unamended, at **0 instances**. `[cid: decided]`

**The brake the original ruling relied on is still there and is now the second one.** *"the binding
constraint moves from **tool power** to **time and patience**"* `[brief: soft]` `[I assumed]`; a player
who walks two parts in with a level-0 tool meets denser green and clears it slowly. Under the strike
that walk is no longer available, and the friction that remains is *"The only friction is the size of
an area"* `[brief: soft]`, which is the brief's own.

### `[playtest unknown]` — whether an 8–14 player who can walk on early does, and regrets it

`[brief: binding]` `[you chose: R1 Q4]` on the band. **This unknown is now closed by the strike:**
walking on early is not possible, so nothing is forfeited and nothing is regretted. The two tuning
steps it named survive as ordinary placement work and are handed on: (1) `onboarding`'s spawn placement
does not face the inward opening, which `plots.spawn.neverFacesLaneAxis` already guarantees; (2) area
authoring places the inward opening away from the outward one, so reaching it crosses the part.
**What replaces the unknown:** whether a player ever presses against an unfinished part's inward
opening and reads the absent ground as a bug. Starting value: no signal of any kind attached to the
opening. What would settle it: whether first-session players walk into the inward opening more than
once.

---

## Consequences for other work

- **Persistence work** *[Tech & Data — the `persistence` module]*: **two items now, not three.**
  **(a)** `W2` asks for **nothing you are not already building.** Your `forbids` on a per-patch list
  after completion is honoured exactly, your criterion *"a completed area occupies a single boolean"*
  is ratified, and re-entry is a read of that boolean plus a `layout` call that spawns zero patches.
  **Zero revision requests on that half.** **(b)** One new bounded field: the id of the part the
  player is currently in. It is **O(1) per player**, not per part. **(c) is withdrawn.** The `W5`
  strike bounds partial parts at one, which was the cost you were being asked to carry; it is gone.
- **Area-arrangement and depth-theming work** *[Meta & Content, wave 3, owner of `area`, `depths` and
  `plots`]*: four things. Every part you author carries **exactly two openings**, one inward and one
  outward, and they are the same construction at every depth — an opening is not a depth-themed
  feature. **No part is the last**, so no part may lack an inward opening (`02-extent` already forbids
  a final part). **Depth 1's outward opening is the works's own edge** and leads to unwalkable slope
  and wood. And **the gating question is closed on your reading, not mine**: your `unlockRule` is the
  `W5` strike this sheet named, and it is accepted here without a counter-request.
- **Plot-arrangement work** *[Meta & Content — `plots`]*: **one open seam, raised not resolved.**
  `plots.liveGeometry.groundExistsIn` says every bay from 1 to the live bay exists;
  `plots.liveGeometry.torndownBeyond` says bays more than two outward of the live one are destroyed.
  Both sit in one key's value. `W6` holds under either reading **only if a torn-down bay is rebuilt on
  approach rather than on arrival** — a player walking outward must never meet an absence of ground,
  because that is the same signal the `W5` gate uses and it would then mean two different things.
  Yours to settle; `setting.passage.openSeam` records it.
- **Promise-over-time work** *[Fantasy — `02-promise-over-time`, this wave, already ruled]*: **your
  either/or is closed on the re-entry branch.** A finished part stays walkable, so carrier 2 survives
  and the finished-parts figure is no longer the promise's only carrier. **Your criterion 4's
  *exactly 1* may be relaxed to *at most 1*** — that relaxation is yours to make or decline, and I am
  not making it for you. Nothing else in your sheet is touched: `W1` supplies no second finishable
  thing, no ending, and no event at 24 of 24.
- **Place-rules work** *[Setting — `03-physical-law`, this domain, already ruled]*: **one revision
  request, one clause, granted.** Your criterion 2 counts *"properties of any instance inside a plot
  whose value at second N differs from its value at second 0 for any reason other than **a player
  clearing a patch**"* and requires 0. Passage rebuilds geometry on a player *walking*, which is a
  player's hand but not a clearing. The carve-out now reads *or passing through an opening*, in `R4`,
  in your criterion 2, and in `setting.law.r4CarveOuts`. `R1`–`R3`, `R5` and `R6` are untouched, and
  `W1` is `R4` restated for the one case you routed to me.
- **Place-inventory work** *[Setting — `05-inventory`, this domain, already ruled]*: **zero rows added,
  zero rows licensed back, zero renames.** An opening is an absence of `P1`, not a thirteenth class.
  `A11` and `A12` are cited rather than extended — **and they survive the `W5` strike unamended**,
  because the condition is an absence of ground rather than an object. `A13` is what makes priority 2's
  plural survive as *cleared* and never as *dressed*, exactly as you said.
- **Presence and module-planning work** *[Social, wave 2; Tech — `plots`]*: **passage produces the same
  observable as slot reuse, and now it is frequent rather than rare** — 3 to 7 times a session per
  player, times a server of 12–20, versus once per join. `identity/03-co-present-stranger` routed the
  slot-reuse case to you as a build defect; **passage is the easier case and the fiction covers it**,
  because the occupant is still standing there and `W4`'s placement clause makes them visibly cross the
  plot as it re-greens. Slot reuse, where the occupant changes, stays your defect and I am not fixing it.
  What `W2` adds is that **a plot is a view of whichever part its occupant is working, never a fact about
  the works** — so two players standing in parts of the same kind with different amounts of green is the
  ordinary state, not an inconsistency.
- **Interface-surface work** *[UI/UX — Screens, wave 4, owner of the `areas` screen]*: **the `areas`
  screen is no longer load-bearing for progression.** Walking works, in both directions, always. If you
  build it, three bounds: it may not be the only route to any part, it may not be a map or an elevation
  section (`02-extent`), and it may not show a total or a fraction (`02-extent` criterion 2). **The one
  thing it is genuinely worth building for is the walk back:** under `W6`, returning to depth 1 is a
  walk of every bay between, and a shortcut that arrives **on foot inside the part** is permitted and
  costs the fiction nothing. **What is forbidden is a shortcut that shows the works from outside.**
- **Onboarding work** *[Onboarding, wave 2 — `cid/gameplay/onboarding/01-first-find.md`]*: one
  requirement, and `plots.spawn` already meets it. **The first session's spawn may not face the inward
  opening**, so a first-session player's first steps are into overgrowth rather than out of the part.
  Your guarantee that the patch nearest spawn carries the first `Find` is untouched, and nothing about
  `W1`–`W6` needs stating to a player, which is what *"No text, no tutorial"* requires of every world
  fact.
- **Mood-and-beat work** *[`cid/theme/tone/03-beat-map.md`, this category, already ruled]*: **one
  qualification, raised because the `W5` strike changes it.** You ruled *"arriving in a deeper area →
  baseline; nothing gates it, so a peak here makes walking an accomplishment"* and justified it with
  *"Nothing was passed"*. Something is now passed — a completion condition — but it is satisfied at the
  instant the last patch clears, and **the peak for that instant is already the completion**, not the
  walk. So `M8` stands and its reason narrows: a peak at arrival would be a second cue for one event.
  `W1` independently forbids any world change at completion, which is `K3` reaching the ground.
- **Clear-feedback and VFX work** *[Mechanics, wave 2; Art — VFX, wave 4]*: `identity/03`'s rule that
  *"whatever celebrates a clear or a completion may not be reused on plot construction"* now applies 3
  to 7 times a session instead of on joins only. **No effect, sound, fade, camera move or transition
  may mark passage or mark entering a finished part.** The clear-away effect on a patch is untouched.
- **Environment art** *[Art & Visuals — Environment, wave 4+]*: **an opening must read as construction
  that was always open** — a gap where a channel runs through the wall, a stair run continuing past the
  parapet, a bay left open in a vault. **Never a doorway, an arch with a frame, a gateway, a pierced
  wall with fittings, or anything a hinge would belong to**, because `Hinge`, `Seal` and `Key` are
  `Finds` and `A11`/`A12` guarantee nothing in this world opens. A finished part is dressed identically
  to an unfinished one minus the green, so **there is no *restored* look to author** — which narrows
  `04-PRESENTATION.md`'s open item *"what 'restored' looks like versus 'overgrown'"* to *the same stone,
  with and without plants on it*.
- **Store and positioning work** *[Discovery & Marketing, wave 5]*: **`unlock`, `gate`, `door`, `key`,
  `portal` and `shortcut` are unavailable as progression words**, and `restored` is unavailable as a
  claim (`lore/01-the-past` `L5`). *"unlock new islands"* is the sentence four competitors ship
  `[research: research/landscape.md — the brief's fetch, not mine]`, so this is a positioning gain as
  well as a fiction rule. **What is true and sayable: you keep walking in, and the ground you finished
  stays finished and you can walk back through it.**
- **Live-ops work** *[Live Ops, wave 5]*: **a finished part cannot host anything.** `W1` forbids
  additions and `A13` forbids placement, so *"visit your restored ruins"* has no surface to run an event
  on. Priority 2 is a scope decision and remains one; it is not reachable from your wave.
- **Naming work** *[Vocabulary, this wave, last writer]*: **nothing owed. This sheet coins zero terms.**
  Offered, not imposed: `setting.passage.bannedPassageWords` is ready for `vocabulary.bannedWords`, and
  I have checked it against every shipped string — **`key`, `seal` and `hinge` are deliberately
  excluded** because `Key`, `Seal` and `Hinge` are live `collection.sets[].relics` values, and a check
  that forces a rename of a shipped value is a check that failed. This list shares zero tokens with
  `XW`, `RW`, `L1`/`L3`/`L5`, `S1`–`S6` or the entries already in `bannedWords`.
- **Fantasy work** *[Fantasy, this wave, occupancy search]*: nothing here depends on the finding. An
  always-open gap and a re-enterable finished part survive any result about who else ships a ruin.

## Acceptance criteria

1. **Opening check.** Every part's built boundary holds exactly **2** openings, one inward and one
   outward, and each holds **0** instances. Count of instances anywhere in a part whose existence,
   position, material, colour or state differs between the tick before that part's last patch clears
   and the tick after: **0**. Count of `ProximityPrompt`, `ClickDetector`, `HingeConstraint`,
   `PrismaticConstraint`, `Motor`, `TweenBase` or animated instance in or on an opening: **0**. At
   depth 1, walkable ground beyond the outward opening: **0** studs. **The `W5` condition adds 0 to
   every count in this criterion.**
2. **Re-entry check (`W2`).** With a part's completion flag true, entering that part spawns **0**
   patches and **0** `Finds`, its saved payload is **1** boolean holding **0** patch indices, and the
   payload's byte count is identical whether or not the part is ever re-entered. Count of strings,
   cues, effects or camera moves that fire on entering a finished part: **0**. Entering it a second
   time produces an identical result.
3. **Passage cost check (`W4`).** Travel between an opening and the next part: **0** studs, **0**
   loading screens, **0** seconds of non-walking time. The walk from the furthest patch in a part to that
   part's inward opening is at most one diagonal of the part — at the shipped `area.size` of 120 that is
   **≤ 170 studs** and **≤ 10.7 s** at `movement.baseWalkSpeed` 16, which is **≤ 6.5%** of the 165 s lap
   `cid/gameplay/core-loop/04-lap-vs-session.md` targets. Count of corridors, antechambers,
   stairs-between-parts or approach spaces: **0**.
4. **Passage word check.** Over every `manifest` string value and every `artPrompt` under `cid/`, the
   whole-word case-insensitive pattern
   `door|doorway|gate|gateway|gated|locked|unlock|unlocks|unlocked|barred|portal|teleport|shortcut`
   returns **0** hits. The prose exemption is load-bearing here and must be applied, or the
   check fails on other sheets' own process notes. `key`, `seal` and `hinge` are absent from the pattern
   by design, so this sheet puts **0** shipped values at risk and requests **0** renames.

## Not decided here

The save format, the field names, and the encoding of a partial part's cleared set *(persistence work —
I state a requirement and set no value)*. How parts are arranged, ordered, sized, densified or themed by
depth, where in a part its two openings sit, and when a torn-down bay is rebuilt *(`gameplay/meta`,
which owns `plots` and `depths`)*. Whether the `areas` screen exists, what it looks like,
and whether a walk-back shortcut is built *(UI/UX, wave 4, then the pattern registry)*. Whether priority
2's visiting is ever built, and everything about how *(scope, then Social wave 2 and UI/UX wave 4; three
preconditions stated, none specced)*. The opening's width, hue, material, geometry and ornament
*(Art & Visuals — Environment)*. Spawn and arrival placement values *(Mechanics with Onboarding; I state
a facing requirement and no coordinate)*. What kind of built thing this is, the climate and the fauna
ruling (`01-the-ruin`, which carries the `setting` key). Scale, direction, the sightline and the
no-adjacency rule (`02-extent`, which amends `setting.extent`). The hour, weather and the supernatural
budget (`03-physical-law`, which amends `setting.law`). The roster of matter (`05-inventory`, which
amends `setting.contents`). Whether criterion 4's tokens join `vocabulary.bannedWords` *(Vocabulary)*.

## Pushing back

**Overruled and then reversed, and both halves are recorded because the record is the point.**

**What this sheet overruled:** the strong reading of *"depth is reached by clearing"* (`03-META.md`,
`[brief: soft]` `[I assumed — follows from cutting rebirth; not interviewed]`, `OPEN.md §5` assumption
3, whose stated inheritor is Meta & Content). **The line's own sentence was ratified in full** — no
gating mechanism is needed and depth is not reached by hitting a threshold. What `W5` overruled was
the reading that *completing a part is a precondition for entering the next one*.

**What reversed it:** `gameplay/meta/04` and `gameplay/meta/06`, both citing this sheet's own named
hinge, on grounds this sheet accepted in advance. **The overrule is withdrawn and the brief's reading
stands.** Of the four reasons `W5` gave, three are answered by the form the build found — the refusal
is an absence of built ground, so `A12` is not breached, `A11` needs no prompt, and there is nothing
for a player to be demanded of. The fourth (*"any gate at all converts the completion peak into a
stall"*) is answered by timing: the condition is satisfied at the instant the last patch clears, and
`plots.liveGeometry.bayBuiltAt` builds the next bay at that same instant, so the stall is **0 s**.

**What the reversal bought:** the persistence cost `W5` created — several parts held in a partial
state, each keeping its per-patch cleared set — is gone. At most one part is ever partial. That was
the risk the brief itself calls its only novel technical one, and this sheet had created a new
instance of it.

**Not overruled, ratified:** the `OPEN.md §2` collapse-to-a-completion-flag default, in full. This
sheet is the demonstration that it and priority 2's plural were never actually in conflict, and that
survives the `W5` reversal untouched.

## Flagged to the developer

**Neither question in this sheet was ever asked.** `OPEN.md §1` has no audit row for how a player reaches
a deeper area or for what a finished area becomes; `03-META.md` says only that no gate is *needed*, and
priority 2 wants restored ruins visitable while `OPEN.md §2` wants finished areas collapsed to a flag.
My index logged both as gaps 9 and 10 and marked them `[cid: decided]`. So every rule above answers a
question the brief left open, and one of them (`W2`) still carries a cost on somebody else's key.

| ruling | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **A finished part stays re-enterable** (`W2`) | Discard it — a finished part is gone, and the count of finished parts becomes the only record. The `OPEN.md §2` default read at its most conservative | It costs **zero additional bytes**: the flag exists anyway to stop green returning, and re-entry is a read of it. Without it the game's stated payoff is never observable and `fantasy/02`'s wordless carrier disappears | **One line.** Strike `W2`; the finished-parts figure becomes mandatory and `fantasy/02` criterion 4 stands as written |
| **Passage is unconditional** (`W5`) | Onward passage requires the current part finished, which is the brief's own soft reading | **Reversed. The alternative won**, on a form this sheet did not find: the refusal is the absence of built ground, which costs 0 instances and breaches neither `A11` nor `A12` | **Already spent.** `depths.unlockRule` and `plots.openings.gatedUntilPreviousBayComplete` |
| **Two always-open gaps, no door** (`W3`) | A doorway, an arch, a stair with a barrier — the genre reflex, and the cheapest way to signal *onward* | It puts `Hinge`, `Seal` and `Key` — three shipped `collection.sets[].relics` values — into service as instruments, against `A15`, and it needs an operable object `A11` forbids | **Expensive.** It reopens `A11` and `A12` and puts three live contract values at rename risk |
| **A finished part gains nothing** (`W1`) | A marker, a warmer light, a bloom on completion — the standard payoff dressing | Every form of it is already banned by `A4`, `A7`, `A10`, `A13`, `R1` and `K3`. The set of available additions is empty before I get to it | **One row, plus whatever five other sheets then have to relax** |

**The ruling I would still like from you: whether re-enterability (`W2`) is worth keeping.** It is the
one clause here that has not been settled by a downstream key, and my recommendation is to keep it: it
costs zero additional bytes, and it is the only wordless way a player is ever shown that *cleared is
permanent* means forever rather than means this afternoon.

**Second, smaller ruling: whether priority 2's *visitable restored ruins* is worth the three
preconditions above.** My recommendation is to leave it exactly where it is. `W2` keeps it reachable at
no cost, and the honest current state is that a visitor would be shown bare stone, because everything a
player might display in a finished part is already forbidden by a wave-1 sheet.

No URL was fetched in this run. Every `[research: repo — ...]` cites a file read in this run, and the
one `research/landscape.md` citation is marked as the brief's fetch rather than mine.
