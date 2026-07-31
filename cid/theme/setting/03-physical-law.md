# 03 — Physical law

**Domain:** Setting · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Nothing in this place changes without a player's hand. The hour is fixed and there is exactly one
of it; there is no weather at all; and nothing here is more than ordinary.** The place has exactly
one mutable property — a patch is standing or it is cleared — and a player is its only writer.

Six rules, `R1`–`R6`, each stated so another sheet can cite it by id.

| # | rule | the shape of the check |
|---|---|---|
| **R1** | **One hour, and it never advances.** The game has a single lighting state. No dawn, dusk, night, sunset, moonrise or second hour exists anywhere in it, at any depth, on any screen, in any promotional image. | count of distinct lighting states the game can be in: **1** |
| **R2** | **No weather, ever, as a depicted event.** No rain, drizzle, snow, mist, gust, cloud shadow, thunder or falling anything. Rain remains a fact about the climate and the reason the works was built (`01-the-ruin`); it is never shown, sounded, or left on a surface. | count of precipitation, wind and cloud-shadow effects: **0** |
| **R3** | **The sky is a backdrop, not a system.** Above the unroofed parts it is open, bright and unchanging, holds no moving element, and holds no body that reads as positioned for a time — no moon, no stars, no sun near a horizon. It is seen upward only; `02-extent`'s short sightline is untouched. | count of `Clouds` instances: **0**; count of moon/star/low-sun sky textures: **0** |
| **R4** | **Nothing about the place is a function of time.** Not wall-clock time, not the date, not server uptime, not elapsed session time, not time since anyone was last here, and not a draw resolved after a player arrives. Every property of the place is either constant for the life of the server or a consequence of a player clearing a patch. | count of properties inside a plot that differ at second N from second 0 for any reason but a player's clearing: **0** |
| **R5** | **Continuous is not a change; intermittent is.** A constant, unvarying ambient bed (the one Audio was granted in `01-the-ruin`) asserts no event and passes this law. Anything scheduled, intermittent, randomised over time, or varying with anything but a player's action is a change of state and fails. | this is `tone/04-do-nots` `X1`'s trigger count, given its reason here rather than restated |
| **R6** | **Nothing here is more than ordinary. The supernatural budget is zero and is spent nowhere.** No force, virtue, residue, blessing, luck, animating principle or awareness exists in the stone, the green, the air, or the `Finds`. Whatever a completed set grants is never attributed to the objects, to the place, or to any party. | see criterion 4 and the `RW` token list |

**Three things `R4` deliberately does not reach, stated so it is not over-read.** A player's own state
changes constantly (collection, currency, upgrade levels) and is not the place. People arrive and
leave, which is `identity/03-co-present-stranger`'s subject and not matter. And the shuffle picks
*which part you meet next*, resolved on a player's arrival — under `02-extent` the part that appears
is a different part, never a part that changed, so the shuffle is a player-caused read and not a
timer.

**The hour already on disk is ratified, and I request no change to it.** `game/default.project.json`
ships `Lighting.ClockTime` `15.5` at `GeographicLatitude` `20`, `Brightness` `2`, with zero
`Atmosphere`, zero `Clouds` and zero scripts touching `Lighting`
`[research: repo — game/default.project.json:35-43, read this run]`. Full afternoon daylight, sun
well clear of any horizon: that is inside this ruling's band and it stays. **The band, as a
requirement rather than a value:** the hour must be one at which cleared stone holds
`01-the-ruin`'s luma floor of ≥ 165 **in every part, including the vaulted ones** — which is what
excludes every low-sun hour without my setting a number. Art owns the value inside that band.

**Nothing here overrules anything.** `tone/04-do-nots` `X2` (*"The hour is not night, dusk or
overcast"*) is ratified and narrowed — I hold the subject by assignment and did not need to argue,
so that sheet needs no revision. `lore/02-the-silences` `S4` asked me not to spend the supernatural
budget on the currency; the budget is zero, so **`S4` survives intact and its wave-1 collision case
never fires.**

**No manifest block: Setting owns no contract key.** This session has no shell tool, so
`npm run bridge -- --contract` could not be executed; I read `SCHEMA` in `bridge/schema.mjs`
directly, which is what `contract()` prints from. Eleven keys (`area`, `tiers`, `upgrades`,
`vocabulary`, `currency`, `movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime`),
owners `gameplay/*` ×7, `tech/architecture` ×2, `art/objects` ×1, `theme/vocabulary` ×1. **None
holds an hour, a sky, a weather state, or a lighting value** — the nearest is `runtime`
(`clearTickRate`, `saveIntervalSeconds`, `dataStoreName`), which is cadence, not time of day.
`[research: repo — bridge/schema.mjs:29-322 and :499, read this run]`

**This sheet coins zero terms and requests zero renames.**

---

## Why

### The brief is silent, and the silence is now a known defect in the interview

No sheet in six states an hour, a sky, a wind or a rain. `OPEN.md §1` has no audit row for any of
it. My index logged it as gap 8 and routed it here `[cid: decided]`. **The interview skill has since
grown the question** — its layer-3 `world` item now asks *"whether the world has **time of day or
weather.** That last is a yes/no that costs nothing now and cannot be retrofitted: lighting, ambient
sound and set dressing all have to agree on it, and they are decided separately"*
`[research: repo — .claude/skills/game-concept/SKILL.md:171-176, read this run]`. **This brief
predates that item**, so the developer was never asked and this is the first ruling. Flagged below.

### The anti-cyclical gate, argued rather than leaned on

My index required this sheet to state its own argument on whether a fixed-or-cycling sky trips the
category's gate against *"any cyclical, seasonal, renewal ... framing"* (`cid/theme/_category.md`,
derived from `03-META.md` priority 3). **Three findings, and the first one goes against me.**

1. **The gate as written does not reach a diurnal cycle, and I will not pretend it does.** The
   gate's stated mechanism is that a fiction implying an excluded system creates pressure to build
   it. A day/night cycle resets no progress, regrows nothing, and imports no rebirth; *"seasons"* was
   refused by name `[brief: binding]` `[you chose: R2 Q2]` and a day is not a season. **The gate is
   the category lead's inference from a priority list, not a brief line, and on its own terms it
   acquits a cycle.** `[cid: decided]` **Flagged upward to category verification** as my index
   instructed, because the next sheet to reach for that gate should know how far it actually goes.
2. **A cycle synced to the real clock does trip a different line of the same gate**, and that one is
   binding by consequence: *"any fiction in which the world changes, grows, or accumulates while the
   player is absent (imports offline accrual)"*. A player who leaves in daylight and comes back to
   night has watched the world change while away. *"Nothing regrows, so nothing can accrue while
   away"* (`01-FOUNDATION.md`) `[brief: binding]` by consequence is the line it lands on, and
   `tone/03-beat-map` `B6` forbids the same value reaching any ambient parameter.
3. **A cycle keyed to server uptime escapes the gate and fails `tone/03-beat-map` `B5`** (*elapsed
   session time* may not reach any continuous or ambient channel), because a sky that advances with
   the session is elapsed time reaching the largest ambient parameter in the game. `B5` is a
   same-wave sibling's `[cid: decided]`, not a brief line, so it is not sufficient alone.

So the gate settles the real-time variant and nothing else. **The ruling is carried by four
arguments that do not depend on it**, below.

### Argument 1 — a moving sun puts four shipped contract values into service

`collection.sets[].relics` already ships `Sundial` and `Gnomon` (Terrace and Spire), plus `Vane` and
`Orrery` (`cid/gameplay/meta/02-the-collection.md`)
`[research: repo — read this run]`. **Under a moving sun a gnomon is a working clock**, and
`tone/04-do-nots` `X10` forbids *any* surface that displays time while `05-inventory` `A15` forbids
any instrument in service. Under a fixed sun the same shadow never advances and reads nothing, so all
four names stay what lore `L1` made them: ordinary objects of measure and trim. **A vane needs weather
and an orrery needs a sky that moves; `R2` and `R3` are what keep both ornamental.** This is the
argument with a rename attached: reverse it and four live values become instruments in a game whose
do-nots forbid instruments. `[cid: decided]`

### Argument 2 — the accessibility floor is stated per-hour, so a cycle is either fake or non-compliant

*"Hard constraint: rarity tiers must differ by shape or silhouette, not only hue ... This is a
requirement, not a nicety"* (`04-PRESENTATION.md`) `[brief: soft]`, self-described as a requirement,
and *"green overgrowth on warm stone is naturally high-contrast, so rarity tiers stay legible"*
`[brief: soft]`. `01-the-ruin` converted that into a luma floor of 165 on cleared stone, at least 40
above the lightest tier green. **A cycle has to hold that floor at every hour it passes through.** An
hour that holds it is not visibly night, so the cycle is decorative; an hour that does not holds a
stated *requirement* in breach for part of every session. **There is no third option**, and the
requirement is the one thing in this subject that traces to the brief rather than to me.
`[cid: decided]`

### Argument 3 — two inherited absences already forbid it, and I cite rather than re-derive

`05-inventory` `A20`: *"no ... dial that advances"*. `A17`: *"Nothing is trending."* **The sun is the
original advancing dial**, and a sky that is getting later is the plainest trend a place can have.
Both rows are already on disk with their provenance, so this argument costs nothing to hold and is
not mine to restate.

### Argument 4 — a second lighting state is unfunded, and the vaulted parts make it worse

Priority 1 funds *"proximity clearing · area-completion detection · three clearing upgrades · the
24-relic 4-set collection · chunk shuffling · guaranteed first-area find"*
`[brief: soft]` `[I assumed — the ordering]`, against *"the smallest game that still gives every
creative area real work"* `[brief: binding]` `[you chose: R1 Q3]`. A cycle is not one value: it is a
second complete lighting state for every part, and `02-extent` puts depths 2 and 3 **inside vaulted
structures** lit through construction (`05-inventory`, *"a cistern's pierced vault is for"* drawing
light through). A vault that only just clears the luma floor at the good hour fails at every other
one. `[cid: decided]`

### Weather, refused on four grounds of its own

1. **Weather is a build.** Rain arrives, holds, and stops: an ambient variation with a shape, which
   is the one thing `tone/03-beat-map` forbids the baseline (*"Flat means invariant"*), and the
   clearest possible case of `X1`'s *"Nothing moves or sounds that the player did not cause."*
2. **Wet stone breaks the same floor.** `05-inventory` banned standing water partly because *"a wet
   or reflective surface darkens stone"* against the luma floor; precipitation is that plus a timer.
   Its conditional — *"If you depict rain, it may not leave stone wet"* — never fires, because rain is
   never depicted. I close inside their range and overrule nothing.
3. **Rain implies shelter, and shelter is the first friction in a game with none.** *"There is no
   failure state"* / *"Zero tension is deliberate"*, elevated to *"Do not invent tension to fill the
   gap"* (`HANDOFF.md`) `[brief: binding]` by elevation. A reason to stop clearing for a while is a
   reason invented from nothing.
4. **A shared server makes weather incoherent either way.** *"Everyone occupies one world"*
   `[brief: soft]` `[you accepted: R6 Q2]`: global weather is a world event nobody caused, arriving
   for a dozen strangers at once; per-player weather is one hillside with twelve climates. `[cid: decided]`

### Nothing more than ordinary, because every visible form of it is already gone

The budget is not refused on taste. **Every way a supernatural rule could be perceived has already
been closed by a sheet that had the right to close it:** no glow, no luminous plant or stone
(`05-inventory` `A7`); no burst, flash, chromatic effect or hit-stop (`tone/04-do-nots` `X7`);
nothing animating uncaused (`X1`); nothing operable (`A11`); no spirit or present form of the makers
(`identity/04-no-cast-declaration`, row 8); *"No agent, ever. Nobody caused this state, nobody is
coming back, nobody is watching"* (lore `L6`). **A law of the world nobody can perceive is not a fact
about the place**, and *"Clear → reveal inside the first ten seconds ... No text, no tutorial"*
`[brief: soft]` `[you accepted: R6 Q3]` requires every world fact to be legible from standing in it.
So the choice was between a supernatural rule with no form and one whose form five sheets forbid.
`[cid: decided]`

Two supporting reasons. **Lore already overruled the compensating move once:** *"Relics must read as
treasure"* was struck with *"Art must not add gold, gilding or gemstones to compensate"*
(`lore/01-the-past`, `## Pushing back`), and a faint magical quality is the same compensation in
another material. And a force is an agency without a body, which is the tension the handoff names.

**What this costs, said plainly:** set-completion bonuses now have no fictional mechanism available.
That is deliberate and it is symmetrical with the currency — `S4` leaves *why clearing pays*
permanently unanswered, and this sheet leaves *why six objects together change anything* in exactly
the same condition. **Both are un-narrated numbers, and a game with no lore surface can afford that
better than it can afford one explanation for two things.**

### `[playtest unknown]` — whether one unchanging hour reads as warm or as flat to 8–14s

`[brief: binding]` `[you chose: R1 Q4]` on the band. **Starting value: one hour, one sky, no weather.
Test range: 1 lighting state, and the escalation order is stated in advance so that "it feels static"
cannot be answered with a cycle.** (1) Warmth goes into stone hue, ornament and litter dressing,
inside the luma band — this is Art's existing budget and costs nothing. (2) Raise the granted
off-screen ambience and the canopy's motion beyond the built edge, both already permitted by
`01-the-ruin` and `05-inventory` `P9`. (3) **A per-part constant hour**: different parts may sit at
different hours inside the daylight band, **chosen on arrival and unchanged for the whole lap**,
uncorrelated with depth. That is the one relaxation admissible here, and it is admissible because
`tone/03-beat-map` already named a per-area constant chosen at area entry as the sole permitted
second ambient input, and because a value that cannot move inside a lap cannot build inside one.
`B3` still forbids it tracking depth. **Taking (3) requires revising criterion 1 of this sheet** from
*written once at build* to *written only on a player's arrival in a part*, and that revision is the
whole cost. (4) Only a developer ruling introduces a cycle. What would settle it: ask a
second-session player whether the place looks the same as it did yesterday. *"Yes"* passes;
*"I don't know"* passes; *"it got boring to look at"* spends step 1.

---

## The `RW` token list

**Scope: `manifest` string values and `artPrompt` values, not prose.** A hit is a question a reviewer
answers, not an automatic failure — the convention is `lore/02-the-silences`'s and is adopted rather
than reinvented.

```
grep -iwE 'dawn|daybreak|sunrise|sunset|nightfall|starlight|moon|moons|rain|rains|rainy|rainfall|drizzle|storm|storms|stormy|thunder|lightning|snowfall|breeze|gust|gale|weather|season|seasons|seasonal|glow|glowing|glimmer|shimmer|aura|halo|blessing|spirit|spirits|awaken|awakens|awakening|stir|stirs|animate|animates|sentient|watches|watching|remembers|answers|hums|thrums|pulses|breathes'
```

**Two calibration notes, so two reviewers answer the same way.** `weather` **must be run whole-word**
or it hits `weathered` and `weathering`, which are required vocabulary in every environment prompt
(`05-inventory` `P7`, lore `L4`) — a check that forces a rewrite of required words is a check that
failed. And `Vane`, `Orrery`, `Sundial` and `Gnomon` are shipped values that *denote* weather, sky and
time; **they pass, because denoting is not asserting.** A prompt saying the vane turns fails; a prompt
saying a vane is fixed to a parapet passes.

**Shares zero words with** `tone/04-do-nots`'s `XW`, lore `L1`/`L3`/`L5`, `S1`–`S6`, and
`vocabulary.bannedWords` — checked term by term, which is why `night`, `dusk`, `twilight`, `mist`,
`fog`, `overcast`, `moonlit`, `magic`, `blessed`, `power`, `rune` and `charm` are absent here despite
being obvious candidates: they are already banned elsewhere and a second owner of one token is a
maintenance defect. **Filed as an offer to naming work, not a claim on the `vocabulary` key.**

---

## Consequences for other work

- **Environment lighting work** *[Art & Visuals — Environment, wave 4; the fallback owner
  `tone/04-do-nots` `X2` named if this sheet did not exist]*: **you have one lighting state and the
  values on disk are ratified.** Do not add a second. The luma floor is the binding requirement and it
  must be met **at this one hour in every part, including the vaulted ones** — the check is
  `01-the-ruin`'s criterion 3 run once per part, not once per game. **You may not solve a dim vault by
  moving the sun**: `02-extent` handed the vault-light question here, and the answer is that the
  openings in the construction are the instrument, which makes it authored geometry rather than a
  lighting value. No `Atmosphere`, no `Clouds`, no moon or star texture, no sky whose sun sits near a
  horizon. Everything about hue, angle and intensity inside the band stays yours.
- **Audio work** *[Audio, wave 4]*: `R5` is the reason behind a rule you already have. The one granted
  bed is **continuous and unvarying** — no weather bed, no gust, no thunder, no dawn chorus, and
  **nothing randomised over time**, which is the idiomatic way an ambient bed is built and is
  forbidden here. There is one hour, so no cue may vary by hour.
- **Set-completion-bonus work** *[the subject is claimed twice: `cid/gameplay/meta/02-the-collection.md`
  routes it to Systems, `OPEN.md §4` routes it to Meta & Content, wave 3 — named by subject because
  the two disagree]*: **a set bonus may exist and may be a permanent multiplier; the fiction may not
  explain it, and specifically may not say the objects, the place, or any party do anything.** The
  permitted register is the player's own working. If your answer genuinely needs a fictional
  mechanism, the route is a `## Pushing back` naming `R6` and citing this file; **the cheapest
  reversal is a bonus explained as the player's familiarity, which needs no world rule at all.**
- **Server-cadence and persistence work** *[Tech & Data — `cid/tech/architecture/01-server-cadences.md`]*:
  `R4` is a rule about scheduled jobs. **Count of repeating jobs that mutate any part, material,
  colour, position, light or sound of the place: 0.** Your shipped values pass and need no change: a
  `clearTickRate` of `0.12` **reads** player position, and a `saveIntervalSeconds` of `45` **writes a
  save record**, not the world. Nothing in the place may be keyed to `os.time`, a date, or server
  uptime.
- **Area-authoring and depth-theming work** *[Meta & Content, wave 3]*: **no part may be dressed as a
  different hour, and depth may not read as darker or later** — that would be depth reaching a
  lighting parameter, which `tone/03-beat-map` `B3` forbids and which the luma floor forbids
  independently. Parts at depths 2 and 3 must be authored with the openings that light them.
- **Feedback and VFX work** *[Mechanics, wave 2; Art — VFX, wave 4]*: the clear-away effect is
  player-caused and is untouched by `R4`. What `R4` closes is the reverse: no effect may fire because
  time passed, and no idle, loop or attract animation exists anywhere in the place.
- **Live-ops intent** *[Live Ops, wave 5]*: **there is no hour, weather or season channel to run
  anything through.** A night event, a rain event or a weekend sky has no lighting state to use, and
  building one is a revision against this sheet rather than a content addition.
- **Store and positioning work** *[Discovery & Marketing, wave 5]*: every screenshot, the icon and
  the thumbnail are at the one hour. No dusk key art, no rain, no moonlight, and no depicted sky the
  build cannot show — which is `tone/04-do-nots` `X12`'s truth-in-depiction rule reaching the sky.
- **Onboarding work** *[Onboarding, wave 2]*: the first ten seconds look exactly like the ten
  thousandth. Nothing about this place has to be waited for or returned to at a better time, which is
  what a no-text onboarding needs of a world rule.
- **Presence work** *[Social, wave 2; `identity/03-co-present-stranger`, ruled]*: two players in one
  world are always in the same light, so nothing about the hour can differ between them and no sky
  needs replicating. A slot handed to a new player is a different part, not a part that changed
  (`02-extent`).
- **Cleared-area and passage work** *[Setting — `04-permanence-and-passage`, this domain, not yet
  written]*: `R4` says the place has one mutable property, cleared-or-not. **A cleared part therefore
  cannot become something over time** — no settling in, no gradual return of anything, and no state a
  finished part reaches later. Whether it persists as a place or collapses to a flag is entirely yours
  and this sheet constrains neither.
- **Place-inventory work** *[Setting — `05-inventory`, ruled]*: **all four inheritances honoured and
  zero rows licensed back.** The water range is closed at dry and I add nothing wet; the hour ruling is
  about daylight only; no cycling sky is delivered by moving anything on the ground, because there is
  no cycle; and the rain conditional never fires. `A14`'s boundary is respected exactly: it ruled what
  matter moves, this rules whether state changes, and the two do not overlap.
- **History work** *[Lore, ruled]*: `S4` is not spent and not contradicted. `L4`'s *"weathering reads
  identical at every depth"* gains a second guarantee, because with one hour there is no lighting
  difference between depths to read a chronology off either.
- **Naming work** *[Vocabulary, this wave, last writer]*: **nothing owed. This sheet coins zero
  terms.** The `RW` list above is offered for `vocabulary.bannedWords` with the whole-word caveat
  attached; it collides with no shipped value and duplicates no other list's tokens.
- **Fantasy work** *[Fantasy, this wave]*: nothing here depends on the occupancy search. A fixed hour
  and no weather survive any finding about who else ships a ruin.

## Acceptance criteria

1. **One lighting state, written once.** The build contains exactly **1** set of `Lighting` property
   values, established at build time. Count of code paths that write `Lighting.ClockTime`,
   `Lighting.TimeOfDay`, `Lighting.GeographicLatitude`, or any property of a `Sky`, `Atmosphere` or
   `Clouds` instance after initialisation: **0**. Count of `Clouds` instances: **0**. Count of sky
   textures depicting a moon, stars, or a sun at or below the horizon: **0**. The values shipped in
   `game/default.project.json` (`ClockTime` `15.5`, `GeographicLatitude` `20`) satisfy this sheet;
   changes requested: **0**.
2. **Nothing in the place is a function of time.** Count of properties of any instance inside a plot
   whose value at second N differs from its value at second 0 for any reason other than a player
   clearing a patch: **0**. Count of repeating or scheduled server jobs that mutate any part of the
   place: **0**. Count of uses of wall-clock time, the date, server uptime, or elapsed session time as
   an input to any property of the place: **0**. Count of random draws affecting the place resolved
   after a player's arrival in a part: **0**. `runtime.clearTickRate` `0.12` and
   `saveIntervalSeconds` `45` pass and are unchanged.
3. **No weather, and no second sky.** Count of precipitation, wind, cloud-shadow, storm and
   falling-particle effects in the build: **0**. Count of wet, damp, reflective or rain-darkened
   surface materials: **0** (agrees with `05-inventory` `A6`, adds nothing to it). Count of distinct
   lighting or sky states the game can be in: **1**.
4. **Zero supernatural budget, checked as words.** Run whole-word and case-insensitive over every
   `manifest` string value and every `artPrompt` under `cid/`, the `RW` pattern returns **0** hits, and
   every hit that ever appears is resolved as a question rather than ignored. Verified **0** today
   against the 43 player-facing strings on disk and the 0 `artPrompt` values; `Sundial`, `Gnomon`,
   `Vane` and `Orrery` are not matched by any token, so this sheet puts **0** shipped values at risk
   and requests **0** renames.

## Not decided here

Every colour, hue, angle, intensity, shadow setting and material value inside the daylight band, and
what the one lighting state actually looks like *(Art & Visuals — Environment, wave 4)*. Whether the
granted ambient bed is taken and what it is made of *(Audio, wave 4)*. What a completed set grants
*(set-completion-bonus work, wave 3 — bounded above, not chosen here)*. What matter exists here at all
(`05-inventory`, cited and not remade). What kind of built thing this is, the climate, and the fauna
ruling (`01-the-ruin`, cited). Scale, direction and the sightline (`02-extent`, cited). What a cleared
part becomes and how a player goes further in (`04-permanence-and-passage`, this domain). Where the
authored openings that light a vaulted part sit *(Meta & Content, wave 3, with Art)*. Whether the
`artPrompt` lint that would run `RW` gets built *(contract-and-seam work — the same missing machinery
three other wave-1 sheets already requested)*. Whether `RW` joins `vocabulary.bannedWords`
*(Vocabulary)*.

## Flagged to the developer

**You were never asked this, and the interview now knows it should have.** No hour, sky, wind or rain
appears anywhere in six sheets or in any interview answer; `OPEN.md §1` has no audit row for it. The
skill's layer-3 `world` item now asks the question explicitly and calls it *"a yes/no that costs
nothing now and cannot be retrofitted"*
`[research: repo — .claude/skills/game-concept/SKILL.md:171-176, read this run]`. **This brief predates
that item**, so `R1`–`R3` are `[cid: decided]` against zero input on a question the pipeline itself now
rates as cheap-then, expensive-later.

**One finding to pass to category verification rather than to you.** The category's anti-cyclical gate
is an inference from a priority list, and on its own terms **it does not forbid a day/night cycle** — a
day is not a season and resets nothing. I ruled against a cycle on four independent grounds instead. A
later sheet that cites that gate against something merely *cyclical-looking* should know it is thinner
than it reads.

| ruling | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **One fixed hour** (`R1`) | A day/night cycle, the single most standard world feature on the platform, and free warmth at golden hour | It puts `Sundial`, `Gnomon`, `Vane` and `Orrery` into service against `X10` and `A15`; it cannot hold the luma floor at every hour without being decorative; and it needs a second complete lighting state for parts that are inside vaults | **The largest in this sheet.** A second lighting state, night-legible tier silhouettes, and a revision against a stated accessibility requirement |
| **No weather at all** (`R2`) | Occasional light rain, the cheapest atmosphere in the engine, in a place built to catch rain | It is a build with a beginning and an end in a game whose baseline must be invariant; it wets stone against the luma floor; it implies shelter, which is friction; and on a shared server it is either everyone's event or nobody's climate | One effect and one audio bed, plus a re-check of the luma floor on wet material |
| **Zero supernatural budget** (`R6`) | A faint quality in the `Finds` or the deep green — the obvious fictional mechanism for a set-completion bonus, which currently has none | Every visible form of it is already banned by four sheets, and an imperceptible world law is not a fact about the place. It also repeats the compensation move lore already struck when it removed *treasure* | One row, plus whatever set-bonus work then writes. Reversing it re-opens `S4` as well, because one mechanism would then explain both |

**The ruling I would most like from you: whether this place may ever be seen at another hour.** My
recommendation is the sheet as written, on one argument that is not about restraint: **a fixed high sun
is the only hour that does not imply a next hour.** Everything else in this design says the place is
not going anywhere — nothing regrows, nothing accrues, nothing waits, nothing is owed — and a sky
getting later is the one thing on screen that would contradict all of it for free. If you overrule it,
the cheap version is the playtest's step 3: **a per-part constant hour, fixed for a whole lap**, which
keeps every argument above intact except the one about the build cost.

No URL was fetched in this run. Every `[research: repo — ...]` cites a file read this run, and
`npm run bridge -- --contract` could not be executed because this session has no shell tool.
