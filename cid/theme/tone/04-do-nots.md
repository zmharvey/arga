# 04 — Do-nots

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Twelve exclusions, `X1`–`X12`, each a countable violation in an asset, a treatment, a screen or a
store page — plus one runnable token list, `XW`, scoped to art prompts and asset briefs.** Nothing
here is a rule about copy, a beat, a peak or an ambient parameter: those are `01`, `02` and `03`'s,
and every place this sheet touches one it cites it by id.

**The three the brief names are converted rather than repeated.** *Not spooky*, *not grim* and *not a
power fantasy* are adjectives, and an adjective cannot fail an asset. `X1`–`X9` are those three
turned into things a reviewer points at. `X10`–`X12` come from the two binding items nobody has
converted on the asset side: zero tension, and no return.

**No manifest block: Tone owns no contract key**, so this sheet supplies no value and that is
correct. No shell in this run, so instead of `npm run bridge -- --contract` I read `SCHEMA` and
`contract()` in `bridge/schema.mjs` directly: eleven keys, owners `gameplay/*` ×7,
`tech/architecture` ×2, `art/objects` ×1, `theme/vocabulary` ×1. The one `theme/*` key is
`vocabulary`, already provided by `cid/theme/vocabulary/02-banned-words.md`, and one key belongs to
one sheet, so `XW` is filed below as a request to that owner rather than claimed here.
`[research: repo — bridge/schema.mjs:29-133, :421, :498, read this run]`

**This sheet takes no new tonal position.** It converts prohibitions into checks. Where a check
needed a threshold that is not mine, it names the requirement and hands the number to the subject
that owns it.

---

## The exclusion list

Six sources, twelve entries. **Every check resolves to an integer count or a named binary state.** A
hit on `XW` is a question a reviewer answers; every other check is a pass or a fail.

### A · *"Not spooky"* · *"This is reclamation, not a haunted place"*

`01-FOUNDATION.md` `[brief: soft]` `[you accepted: R2 Q3]`; `04-PRESENTATION.md` `[brief: soft]`
`[you accepted: R6 Q2 → R5 Q2]`. Derivations `[cid: decided]`.

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X1** | **Nothing moves or sounds that the player did not cause.** No prop, plant, door, light, water or particle animates on a timer or on entry. No sound fires as a discrete one-shot without a player-caused trigger. **One exemption, granted elsewhere and not widened here:** the off-screen ambience beyond the worked edge (`cid/theme/setting/01-the-ruin.md`), which must be **continuous and looping** — an intermittent version of it is a startle and fails. | count of animation and sound instances whose trigger is time, proximity, area entry or randomness: **0**. Count of one-shot sounds with no player-caused trigger: **0**. Count of continuous ambient beds: **≤ 1** | **Audio** *(wave 4)* and **Art — VFX** *(wave 4)* |
| **X2** | **No treatment darkens, desaturates or obscures.** No fog or haze volume, no vignette, no saturation-reducing colour grade, no depth-of-field blur on the world, no flicker or pulse on any light, and no light source positioned below the surface it lights. The hour is not night, dusk or overcast. | count of such effect instances in the build: **0**. In one default-hour screenshot taken from an area's centre, its boundary is visible on all four sides | **Art — Environment lighting** *(wave 4)*, and **place-rules work** *[currently Setting — `03-physical-law`, this wave, unwritten]*, which holds the hour and the sky by assignment |
| **X3** | **The rejected-theme props do not exist.** Zero cobwebs, dust sheets, grave markers, bones or remains beyond `L1`'s name ban, dead or bare trees, rot, mould or slime surfaces, jagged snapped-off stone silhouettes, and zero standing flame of any kind — candle, torch, lantern, brazier, ember. | count of each prop class modelled, meshed or textured in the build: **0** | **Art — Environment** *(wave 4)*, and **Art — Objects** *(wave 4)* through `artPrompt` |

**X3's citation is the sharpest thing in this sheet.** *"That property is why this beat
cobwebs-in-a-mansion, volcanic ash, and rust-on-machines"* (`01-FOUNDATION.md`). **A cobweb in this
game's environment art is the theme that lost, shipped anyway.** Standing flame is listed with it
for a second reason as well as the horror-lighting one: an unattended lit flame needs somebody to
have lit it, against lore `L6` (*"nobody is watching"*), and Setting has already ruled that nothing
*"inhabited, travelled or lit"* is visible from inside the place.

### B · *"Not grim"*

`01-FOUNDATION.md` `[brief: soft]`. Derivations `[cid: decided]`.

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X4** | **No surface has a negative state.** The game has no failure, so it has no denial affordance: no red or amber state, no warning triangle or `!` glyph, no shake, flash or buzz on an unaffordable purchase, no greyed-out-and-crossed treatment. An unaffordable upgrade renders identically to an affordable one; only its price and the balance differ. | count of distinct error, warning or denial visual states in the build: **0**. Count of denial audio cues: **0** | **UI/UX — Feedback UI** *(wave 4)* and **Price-and-SKU work** *[Monetization, wave 3]* |
| **X5** | **An empty collection slot is not a deficit.** No empty slot renders a padlock, a question mark, a red or amber fill, a silhouette or outline of the object not yet found, a "?" placeholder art, or a figure counting what is missing. An empty slot is an empty slot. | over the rendered `collection-index`, count of empty slots carrying a lock, a `?`, a silhouette or a missing-count: **0**. The slot count rendered is **24**, empties visible | **UI/UX — Screens** *(wave 4)* |

**X5's ground is `03`'s M9** (*"empty slots are information"*); the **render treatment** is decided
here, because a moment's verdict does not settle how a panel draws. The silhouette clause is the one
a competent collection-UI pass would argue with, and it is banned for a second reason: a silhouette
tells the player what is owed and where to look, which is anticipation, and anticipation is the
smallest available unit of tension (`03`'s M14). **Release condition:** if set-content work
*(wave 3)* decides a set's membership is public knowledge, a slot may name the **count** it is short,
still not the shape.

### C · *"Not a power fantasy"*

`01-FOUNDATION.md` `[brief: soft]`, restated as a bind on two other domains in
`cid/theme/_category.md`. Derivations `[cid: decided]`.

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X6** | **No figure appears in world space.** No number rises off a cleared patch, no gain floater, no multiplier callout, no combo or streak counter, no `+N`. Every figure the player reads lives in a screen-anchored readout. | count of world-space text or number instances in the build: **0**. The progress readout and the currency readout are screen-anchored and survive untouched | **Mechanics** *[clear-on-contact feedback, wave 2]* |
| **X7** | **No impact spectacle.** No camera shake, no screen flash or white-out, no chromatic or radial burst, no slow-motion, no hit-stop, no haptic rumble — at any moment, including both peaks. | count of code paths that move the camera, tint the full screen, or alter time scale on an event: **0** | **Art — VFX** *(wave 4)* and **Mechanics** *(wave 2)* |
| **X8** | **No merit affordance, and no platform badge.** No trophy, medal, star rating, letter grade, rank, title, tier badge, percentile or leaderboard on any screen. **The build awards zero Roblox badges.** A count of things had (`6 of 6`, `n of 24`) is explicitly permitted — that is `03-META.md`'s own objective measurable. | count of merit affordances on all rendered screens: **0**. Count of `AwardBadge` calls in the build: **0** | **UI/UX — Screens** *(wave 4)*, **Live Ops** *(wave 5)* |
| **X9** | **If a tool is a held object, it is neither a weapon nor monumental.** Conditional, because *whether a tool is a held object at all* is assigned to Mechanics *(wave 2)* and is unresolved (`cid/gameplay/_category.md`). If one exists: no bladed or hafted weapon silhouette, no two-handed overhead pose, no self-emitted light or particles, and **its longest dimension does not exceed the player character's height.** | count of tool assets failing any of the four: **0**. If no tool object exists, this entry is satisfied vacuously and the check is `n/a`, not `0` | **Mechanics** *(wave 2)*, then **Price-and-SKU work** *[Monetization, wave 3]* |

**X8 is the surface corollary of an overrule `03` already made** — *"There is no achievement sound in
this game"*, striking the word from `OPEN.md §2` — and it adds nothing to that overrule, which stays
`03`'s. What it adds is that the strike reaches **screens and the platform**, not only cues. It also
ratifies, so nobody reads it as breaking a required field: `modal-grid`'s `badge` is an ≤ 8-character
card tag, not a merit token, and **X8 does not touch it.** `[research: repo —
ui-forge/src/ideate/brief.mjs:28, :96, read this run]` (That the field's own default value is `BEST`
is a `01` P6/P7 problem, not mine, and is left with it.)

**X9's height clause is a relative ordering inside a silhouette register, not an art spec.** Art
picks the shape, the material and the actual size inside the bound. It is the entry with the largest
cost attached and it is flagged below.

### D · Zero tension, asset-and-surface side

*"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`), elevated by
`HANDOFF.md` into one of six things to know before designing anything: **`[brief: binding]` on the
instruction.** `03` closed the ambient-input routes (`B1`–`B6`); `01` closed the grammatical ones.
**What was left open is anything that displays a quantity going the wrong way.**

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X10** | **Nothing counts down, and no surface displays time.** No timer, clock, hourglass, depleting bar, expiry, date, day count, session length or per-session figure appears anywhere. **Every figure on every surface increases or holds; the sole exception is the currency balance at the instant of a purchase.** Measuring a session is fine; displaying one is not. | count of surface elements that decrease over time or toward zero: **0**. Count of surfaces displaying a clock, a date, a duration or a per-session figure: **0** | **UI/UX** *[the progress readout and the persistent HUD, wave 4]*, and **Analytics** *(wave 4)*, which may measure every one of these and may surface none |

**The progress readout survives and its direction is fixed here.** `04-PRESENTATION.md` requires
*"area-completion progress must be visible while moving"* `[brief: soft]`; `03` kept it and ruled it
may change monotonically. X10 settles which way: **cleared, rising** — never *remaining, falling*. A
remaining-count is a countdown with a different noun on it, and it is also the thing `03`'s `K4`
forbids a peak from displaying. The direction was unstated anywhere. `[cid: decided]`

### E · No return, no cycle, no renewal

*"**Cleared is permanent — overgrowth never returns.**"* `[brief: binding]` `[you chose: R2 Q1]` and
*"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both declined."*
`[brief: binding]` `[you chose: R2 Q2]` (`01-FOUNDATION.md`), plus the category scope gate. `03`
closed the **beat** (M10) and Fantasy closed **cleared ground looking temporary**. The **iconography
and the surface** were open.

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X11** | **No cycle or calendar imagery, anywhere it can be drawn.** No circular-arrow or refresh glyph, no hourglass, no calendar or clock-face motif, no seasonal motif (snowflake, leaf-fall, pumpkin, heart, bunting), no `Day N` marker, and no welcome-back or come-back-tomorrow surface. This covers every icon, every panel, the game icon and the thumbnail. | count of such glyphs and motifs across all UI icons, the game icon and the thumbnail: **0**. Count of surfaces that appear only on a re-entry: **0** | **UI/UX — icons** *(wave 4)*, **Discovery & Marketing** *[icon and thumbnail, wave 5]*, **Live Ops** *(wave 5)* |

### F · The store page

`05-OUTWARD.md` leaves *"the name, icon, thumbnail composition, and store description"* open
*[currently Discovery & Marketing]*; `03-META.md` priority 3 excludes codes, daily rewards,
leaderboards, seasons and events; monetization is *"Never content access"* `[brief: soft]`.
**`01-register.md` deliberately did not bound the listing's register, and X12 does not either.** It
is a truth-in-depiction rule, not a tone rule.

| # | the exclusion | the check | most likely violator |
|---|---|---|---|
| **X12** | **The listing depicts and promises nothing the build does not contain.** No creature, character-with-weapon, combat, chase or peril in the icon or thumbnail. No badge or flash advertising a code, a daily reward, a season, an event, a leaderboard, a rebirth, a prestige, an exclusive or a limited-time anything. Every object depicted exists as a build asset. | count of depicted objects with no corresponding build asset: **0**. Count of promoted systems absent from priority 1 or 2: **0** | **Discovery & Marketing** *(wave 5)* |

**Why this is a tonal exclusion and not a marketing note.** All three shipping games in this family
carry engagement furniture and a code promo in the description itself — *"USE CODE: RELEASE"*,
*"Enjoying the game?"*, *"Join the Unequal Games group for in-game boosts!"*
`[research: relayed from cid/theme/tone/_lead.md — fetched in the index run, not re-fetched here]`.
Two of those four systems are priority 3 here. **A store page is the one surface where a game
promises systems it does not have**, and the promise creates pressure to build them, which is the
exact mechanism `cid/theme/_category.md`'s scope gate exists to stop.

---

## `XW` — the atmosphere-and-spectacle token list

**Scope: `artPrompt` values and any written asset or audio brief.** Not the 43 player-facing strings
— those are `01`'s and `02`'s, and this sheet governs zero of them. `artPrompt` is the only
unlimited-length field in the pipeline and the pipeline's own instruction is *"Put the flavour in
artPrompt, where there is unlimited room"*, so it is where a spooky or grim or monumental asset gets
ordered. `[research: repo — ui-forge/src/ideate/brief.mjs:130, ui-forge/src/compose/patterns/modal-grid.mjs:154, read this run]`

`01-register.md` routed word lists here by name (*"word lists are the exclusion sheet's and
Vocabulary's"*), so this is the one list this sheet owns rather than cites.

```
grep -iwE 'eerie|creepy|spooky|sinister|ominous|foreboding|menacing|lurking|shadowy|gloom|gloomy|murky|dim|dimly|unlit|dark|darkness|darkened|night|nighttime|nocturnal|midnight|moonlit|moonlight|dusk|twilight|fog|foggy|mist|misty|haze|hazy|cobweb|cobwebs|spiderweb|crypt|tomb|grave|graveyard|corpse|skeleton|skeletal|ghost|ghostly|spectral|whisper|whispers|flame|torch|candle|lantern|brazier|ember|smoke|bleak|desolate|barren|dreary|dismal|grim|grimy|melancholy|mournful|sorrowful|somber|sombre|tragic|lonely|sad|forlorn|drab|faded|overcast|rot|rotting|rotten|mould|mouldy|mold|moldy|decay|decaying|decayed|withered|wilted|blighted|dying|dead|deathly|mighty|monumental|colossal|gigantic|immense|giant|imposing|triumphant|glorious|heroic|victorious|dominant|dominate|conquer|blazing|explosive|explode|shatter|shattering|thunderous|unstoppable|unleash|power|powerful|mastery|hurry|rush|urgent|urgently|instantly|immediately|expires|expiring|countdown|deadline|limited|exclusive|premium|last chance|running out'
```

**A hit is a question, not a failure** — the convention is `cid/theme/lore/02-the-silences.md`'s and
is adopted deliberately, because three tokens have legitimate uses. **Calibration, so two reviewers
answer the same way:**

| case | verdict |
|---|---|
| `dark green vine` on the deepest tier (`Heartvine`, rgb `[44,86,52]`) | **passes.** `dark` is a hue on an object |
| `a dark interior`, `a dim chamber` | **fails.** `dark` is the scene's light level, which is X2 |
| `a tower`, `the spire above the canopy` | **passes** |
| `a towering spire` | the register failing. `towering` is deliberately **not** a token — too often legitimate — so this one is X2/X9's reviewer call, not a grep hit |
| `an unpowered gear train` | **passes.** The check is word-boundary exact; `power` does not match `unpowered` |

**Four words were considered and deliberately excluded, because banning them would block a
contract-key owner from filling its key** — the self-check `cid/theme/lore/02-the-silences.md` runs
on itself, run here too. `fast`, `faster`, `quick` and `speed` are the vocabulary of the `pace`
upgrade axis and of two live `upgrades[].blurb` values; `vault` is a record strongroom and a live
`sets[].label`; `grey` and `gray` were dropped because `grey-green lichen` is a legitimate hue and
greyness is already caught mechanically by X2's saturation check and by Setting's luma floor of 165.
**A do-not that forces a rename on a shipped contract value is a do-not that failed.**

**Filed as a request, not a claim.** `vocabulary` is owned by
`cid/theme/vocabulary/02-banned-words.md` and one key belongs to one sheet. `bridge` parses only
` ```manifest ` fences, so the block below claims nothing.
`[research: repo — bridge/merge.mjs:28, relayed from 01-register.md]`

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/tone/04-do-nots.md",
  "note": "XW is scoped to artPrompt values and asset briefs, NOT to the 43 player-facing strings. If vocabulary.bannedWords is only ever run over player-facing strings, do not add these there — add the pattern to the artPrompt lint instead, and this request becomes a request to whoever owns bridge/schema.mjs.",
  "bannedWords_additions_if_the_scope_fits": [
    { "word": "eerie",      "reason": "the spooky register; the brief refuses it twice and reclamation is not a haunted place" },
    { "word": "gloomy",     "reason": "same class, and it is the word that orders X2's forbidden lighting" },
    { "word": "cobweb",     "reason": "cobwebs-in-a-mansion is the theme this one beat; a cobweb ships the loser" },
    { "word": "grim",       "reason": "named by the brief as an exclusion" },
    { "word": "bleak",      "reason": "the grim register, and it contradicts warm" },
    { "word": "decay",      "reason": "decay-if-you-leave was offered and declined; the word promises a world that undoes the work" },
    { "word": "monumental", "reason": "the power register delivered by scale, which is what not-a-power-fantasy forbids in an asset" },
    { "word": "giant",      "reason": "the reference's 2500-Robux SKU is a Giant Trimmer; the scale register is the whole of its pitch" },
    { "word": "unleash",    "reason": "power-fantasy verb, and it has no referent in a movement-only game" },
    { "word": "hurry",      "reason": "urgency is tension with no system behind it" },
    { "word": "limited",    "reason": "limited-time framing imports seasons and events, both priority 3" },
    { "word": "exclusive",  "reason": "no object may be framed as gated by anything but clearing; monetization is never content access" }
  ]
}
```

---

## The audit route

This is what makes the list an instrument rather than a page. **Four passes, in order, each with a
surface, an owner and a wave.**

| pass | what it runs on | covers | when, and by whom |
|---|---|---|---|
| **1 · grep** | every `manifest` value under `cid/`, every `artPrompt` value, every written asset and audio brief | `XW`, and X3's prop nouns | at merge. **The lint does not exist** — `bridge` has no `artPrompt` field at all, so today this is a human running one command. Requested of *contract-and-seam work*, alongside the same request from lore and register |
| **2 · instance inventory** | the built place, as an object tree | X1, X2, X6, X7, X8's badge call, X10's decreasing elements, X9's dimensions | on the first build that renders. **Tech & Data** *(wave 4)* |
| **3 · screenshot pass** | one screenshot per screen, plus one per area at the default hour | X2's sightline, X4, X5, X8's affordances, X11's icons | on the first build that renders. **UI/UX** *(wave 4)*, and it is the pass `ui-forge`'s render→critique loop already performs for other reasons |
| **4 · listing pass** | the store page, icon and thumbnail | X12, X11's motifs | before publish. **Discovery & Marketing** *(wave 5)* |

**The stated failure mode of this instrument: an entry whose pass has no owner at its wave is an
entry that fails silently.** Pass 1 is the exposed one — it is the same missing lint lore and register
have each already requested, so three wave-1 sheets in this category now depend on one piece of seam
work that nobody owns. Named rather than assumed.

**And the answer to the question `03` asked this sheet for** — *how a reviewer discovers that a build
emitted an event matching no row in the beat inventory* — **is pass 2.** An event with no row is,
observably, an animation or a sound instance whose trigger is not a player action, which is exactly
X1's count. **X1 is the audit route for `03`'s M1–M14 as well as its own entry**, and that is why it
counts *triggers* rather than *sounds*.

## Precedence

Stated in all four directions, following `cid/theme/lore/02-the-silences.md`'s convention so the two
instruments in this category behave the same way under review.

| against | who wins | what happens |
|---|---|---|
| `01`, `02`, `03`, same domain, same wave | **they win** | This sheet is the residue. If an entry here restates one of their rules, the entry is struck from **this** sheet, not from theirs |
| a same-wave sibling holding the subject by assignment — **the X2 hour-and-sky case** | **the sibling wins** | Place-rules work holds the hour by assignment (`cid/theme/setting/01-the-ruin.md`). If it rules for dusk it overrules a `[brief: soft]` tone line and owes a `## Pushing back` citing this file. If that sheet is never written, X2 falls to Art — Environment lighting |
| any sheet in wave 2 or later | **this sheet wins** | The asset, effect, screen or listing is the defect and is revised |
| the developer | **the developer wins, always** | Groups A, B and C derive from `[brief: soft]` items. Overruling *"not spooky"* takes nine of twelve entries with it |

## Why

**An exclusion list is worth writing only if it can fail something, and the brief's version cannot.**
*"Not spooky, not grim, not a power fantasy"* (`01-FOUNDATION.md`) `[brief: soft]` and *"warm and
unhurried, not spooky. This is reclamation, not a haunted place"* (`04-PRESENTATION.md`)
`[brief: soft]` are the whole of what the brief supplies, and both are adjectives. `cid/theme/_category.md`
relays them as `[brief: soft]` ×2 with the instruction *"Do not relay it as binding"*, and the
category's verification bar demands *"a register and a humor level, not an adjective"*. **This sheet
is that bar applied to the half the register cannot reach:** `01`'s ten properties are ten greps over
strings, and a spooky game contains no strings at all.

**The division of labour with my three siblings is mechanical, not editorial, and criterion 2 is how
a reviewer proves it.** `01` governs copy, `02` governs flavour lines, `03` governs moments and
ambient parameters. **This sheet governs zero of the 43 player-facing strings and zero moments.** It
governs assets, treatments, screens, the platform and the store page, plus one token list scoped to a
field that is not in the build contract. Every point of contact with a sibling is a citation by id —
M9 under X5, M14 under X5, K4 under X10, L1 and L6 under X3, `01`'s P6/P7 under X8 — and no entry
re-derives what it cites. `[cid: decided]` on the division; the ids are theirs.

**Zero tension is binding and the asset side was genuinely open.** *"Tension is zero by design ...
**Do not invent tension to fill the gap.**"* (`HANDOFF.md`, elevating `02-GAMEPLAY.md`)
`[brief: binding]` on the instruction. `03` closed six ambient inputs and said so; `01` closed the
imperative, the future tense and the exclamation. **Neither reaches a thing that simply exists.** A
timer is not an ambient parameter and takes no input; a padlock on an empty slot is not a cue; a
countdown on a store badge is not a beat. X4, X5, X10 and X12 are the four routes in that survive
both siblings, and each is a static object on a surface rather than a behaviour. `[cid: decided]`

**X1 is the entry that does the most work, and its reasoning is that spooky and tension are the same
asset.** A creak with no cause, a plant that stirs, a light that flickers: each is simultaneously the
haunted-place register the brief refuses and a suggestion that the world has intent. Lore has already
ruled that nothing here has intent — *"No agent, ever. Nobody caused this state, nobody is coming
back, nobody is watching"* (`cid/theme/lore/01-the-past.md`, L6) — and Setting has ruled that
*"nothing is alive here but the plants and the players"*, with **one** exemption for off-screen
ambience because *"a place with no fauna at all risks reading as dead"*. X1 is those two rulings
turned into a trigger count, and it deliberately does not widen the exemption: **continuous is
ambience, intermittent is a startle**, and that distinction is observable where "not spooky" is not.
`[cid: decided]`

**X6 is where this sheet is most contrarian, and the audience makes it a real risk.** The audience is
*"casual but **genre-literate**"* `[brief: binding]` `[you chose: R1 Q4]` (`00-CORE.md`), and the
floating gain figure is the single most standard affordance in the genre this game is spun off from.
Banning it is defensible on three grounds and is still the entry I would test first. (1) A number
rising off the ground is the game grading the action, which is the same category `03` struck when it
struck *"achievement"*. (2) Movement is the only input `[brief: soft]` `[you accepted: step 6 Q3]`,
so a figure per patch produces a field of text at 140 patches, which no phone at ~70% of the audience
`[brief: binding]` reads. (3) *"audio and visual feedback carry the entire load"* (`02-GAMEPLAY.md`)
is a statement about feedback, not about reporting, and a legible non-numeric clear is the thing that
load was assigned to. **The readouts survive**: `04-PRESENTATION.md`'s progress requirement and the
currency readout the 10-character `currency.plural` limit already implies are both screen-anchored and
untouched.

**X9 forecloses the reference's only proven high-price SKU, and that has to be said out loud rather
than discovered in wave 3.** The reference sells *"only 2x multipliers plus a 2,500-Robux oversized
tool, zero cosmetics, across 38M visits at a 96% like ratio"*
(`03-META.md`, `[research: research/grass-incremental.md]`), and its store page marks that item
`[OP] Giant Trimmer`
`[research: relayed from cid/theme/tone/_lead.md — fetched in the index run, not re-fetched here]`.
`01-register.md` already made the **bracket slang** unavailable through its character class. X9 makes
the **object** unavailable. `03-META.md` and `OPEN.md §6` both record that *"the premium SKU has no
home"*; this sheet narrows the space it could find one in, and does not pretend otherwise. It is
conditional on Mechanics deciding a tool is a held object at all — an unresolved question
(`cid/gameplay/_category.md`) — so it forecloses nothing that exists yet. Flagged below.

**`fantasy-ornate` survives every entry, and two entries exist to protect it.**
*"**`ui-forge` vibe key: `fantasy-ornate`**"* · *"ornamented, warm, aged, crafted. Stone and foliage,
not candy"* (`04-PRESENTATION.md`) `[brief: soft]`, chosen over `cartoon-vibrant` partly on the
strength of the tone adjectives this sheet converts. **Zero entries forbid ornament, carving,
pattern, a decorated frame, warmth or age**, and X2 and X3 exist precisely to stop *aged* being
delivered as *decayed* and *warm* as *dim* — which is the drift that would make the key look like the
wrong choice and reopen an argument the brief closed. Stated because my instruction was that an entry
invalidating the key must say so: **none does.** The one entry that reaches an ornate surface is X8,
and it separates a *merit* token from an ornamental one explicitly, ratifying `modal-grid`'s `badge`
field rather than banning it.

**Consistency with `03`'s overrule, checked rather than assumed.** `03` struck *"achievement"* from
`OPEN.md §2` on the ground that *"a peak marks a change in the world; it does not return a verdict on
the player"*. X8 extends that to screens and to Roblox badges; X4 is its negative twin, because a
game that may not return a positive verdict may not return a negative one either. **`03`'s own phrase
for it is *"this fiction has no negative register at all"***, written there as a reason for a
duplicate's cue; the surface application is mine and is cited rather than re-argued.

**What this sheet does not claim.** Nothing here is `[research: url]`: **no URL was fetched in this
run.** Every genre figure is relayed from `cid/theme/tone/_lead.md` and marked as such; every
`[research: repo — ...]` cites a file read this run.

## Consequences for other work

- **Art — VFX and environment effects** *(wave 4)* inherits the largest share: X1 (nothing animates
  on a timer, on proximity or on entry), X2 (no fog, vignette, desaturating grade, depth-of-field,
  flicker, or light from below), X3 (no cobweb, dust sheet, grave marker, dead tree, rot surface, or
  standing flame), X7 (no shake, flash, burst, slow-motion, hit-stop). **These are prohibitions on
  effect classes, not on colours, materials or magnitudes** — every one of those stays yours, inside
  Setting's luma floor and `core-loop/02`'s weights.
- **Audio** *(wave 4)*: X1 is a harder rule than a mix note. **No sound fires without a
  player-caused trigger**, and the single off-screen ambience Setting granted you must be continuous;
  an intermittent version of it is a startle and fails. X4 removes the denial cue from your
  inventory. One requirement I state and do not set: the reveal's onset must not read as a **startle**
  relative to the bed, which is a magnitude question and belongs to `gameplay/core-loop/02` with you,
  not here.
- **UI/UX — Screens and Feedback UI** *(wave 4)*: X4 (no negative state — an unaffordable upgrade
  renders like an affordable one), X5 (an empty slot carries no lock, no `?`, no silhouette, no
  missing-count; 24 slots, empties visible), X8 (no trophy, medal, star, rank, grade or leaderboard),
  X10 (**the progress readout counts cleared and rises; it never counts remaining and falls**), X11
  (no refresh glyph, hourglass, calendar, seasonal motif, `Day N`, or welcome-back surface). X6
  leaves you all screen-anchored text and takes only world space.
- **Mechanics** *[clear-on-contact feedback and the completely-clear celebration, wave 2]*: X6 and X7
  land on you first and hardest, because the per-patch clear is the moment a floater or a shake would
  be added. Your celebration budget is `03`'s and `core-loop/02`'s; what this sheet removes from it is
  the camera, the screen tint, the time scale and world-space text. X9 is yours to trigger or make
  vacuous: **decide whether a tool is a held object**, and if it is, X9's four clauses apply.
- **Price-and-SKU work** *[Monetization, wave 3]*: three things. **X9 forecloses the oversized-tool
  SKU**, which is the reference's only high-price item and the shape `03-META.md` flags as homeless.
  **X4** forbids a denial state on an unaffordable purchase. **X12 and `XW`** forbid limited-time and
  exclusivity framing, which the category brief already binds and which this converts into a token
  check. No price, no ladder and no target is touched.
- **Place-rules work** *[currently Setting — `03-physical-law`, this wave, not on disk]*: X2 bounds
  the hour and the sky you were assigned — **not night, not dusk, not overcast, and no weather event
  that obscures.** You hold the subject, so you win if you argue, and the mechanism is a
  `## Pushing back` citing this file. If your sheet is never written, this bound falls to Art —
  Environment lighting and should be stated there.
- **Set-content work** *[Meta & Content, wave 3]*: X5's silhouette ban is the one that reaches you.
  If you rule that a set's membership is public knowledge, a slot may show the **count** it is short,
  never the shape of what is missing.
- **Analytics** *(wave 4)*: X10 draws a line you should know about in advance. **Measure sessions,
  session length, per-session finds and time since last visit freely; display none of them.** The
  `OPEN.md §2` measurement default is untouched.
- **Discovery & Marketing** *(wave 5)*: X12 and X11. **This sheet does not bound your register** —
  `01-register.md` conceded the listing on discoverability grounds and I do not reopen it. What it
  bounds is depiction: no creature, no weapon, no combat, no peril, no badge advertising a code, a
  daily reward, a season, a leaderboard, a rebirth or a limited-time offer, and every depicted object
  exists as a build asset. Note the humor ban already reaches you through `02` and the binding
  developer decision, which names store copy explicitly.
- **Live Ops** *(wave 5)*: X11 removes the surface a return hook would be drawn on, and X10 removes
  the figure it would count. Both are binding-derived rather than mine, and `03`'s M10 plus lore `S5`
  say the same thing from two other directions.
- **Tech & Data** *(wave 4)*: you own **pass 2**, the instance inventory, and it is six integer
  counts over the object tree. X8's badge clause is one grep for `AwardBadge`.
- **Contract-and-seam work** *[whoever owns `bridge/schema.mjs`]*: **pass 1 has no home.** `bridge`
  holds no `artPrompt` field, so the `XW` grep, lore's `S1`–`S6` grep and register's character-class
  lint are three wave-1 requests against one missing piece of machinery. If it is not built, three
  fiction instruments in this category are review-only.
- **Naming work** *[Vocabulary Lead, this wave, owner of the `vocabulary` key]*: the JSON above is a
  request with a scope caveat attached, and the caveat matters — **if `bannedWords` is only ever run
  over player-facing strings, these twelve words belong in the `artPrompt` lint instead, not in your
  key.** This sheet coins zero terms, so the canonical list gains nothing from it.
- **`01`, `02` and `03`, this domain**: nothing here amends any of them. Every contact is a citation,
  and under the precedence table above they win any collision.

## Acceptance criteria

1. **List shape.** This sheet contains exactly **12** entries, `X1`–`X12`, plus exactly **1** token
   list, `XW`. Every entry's check resolves to an integer count or a named binary state; the number
   that resolve to neither is **0**. Every entry names a most-likely violator with its wave; the
   number that do not is **0**.
2. **Non-duplication, mechanically.** This sheet constrains **0** of the 43 player-facing strings
   returned by `playerFacingStrings()` and states **0** rules about a beat, a peak, an ambient
   parameter, a cue magnitude or a line of copy. It cites at least **6** sibling rule ids
   (`P6`, `P7`, `M9`, `M14`, `K4`, `L1`, `L6`, `S5` as written) and re-derives **0** of them. `XW`
   shares **0** words with `L1`, `L3`, `L5`, `S1`–`S6`, `vocabulary.bannedWords`, and the three
   pending requests in `01-register.md`, `01-fantasy-of-record.md` and `01-player-role.md`.
3. **The runnable pass is clean today.** `XW`, run whole-word and case-insensitive over the 43
   player-facing strings in `manifest` blocks under `cid/` and over every `artPrompt` value under
   `cid/`, returns **0** hits. (There are **0** `artPrompt` values on disk today and **43** strings;
   `Vault`, `Seal`, `faster` and `speed` are deliberately not tokens, so no shipped value is put at
   risk.)
4. **Instance inventory on the first build that renders — six counts, all zero.** World-space text or
   number instances: **0**. Code paths that move the camera, tint the full screen or alter time scale
   on an event: **0**. Saturation-reducing, vignette, fog and depth-of-field post-process effects:
   **0**. `AwardBadge` calls: **0**. Sound or animation instances whose trigger is time, proximity,
   area entry or randomness — excluding at most **1** continuous ambient bed: **0**. Light sources
   positioned below the surface they light: **0**.

## Not decided here

Every colour, material, model, mesh, texture, effect asset and lighting value inside these bounds
*(Art & Visuals)*. Every sound, instrument, mix level, magnitude, envelope and onset separation
*(Audio, and `gameplay/core-loop/02` for the ordering)* — including whether music has a mode or a key,
which is deliberately left alone because a modal prohibition is not checkable. The hour, the sky and
weather as a depicted event *(place-rules work, this wave, bounded above but not chosen here)*.
Whether a tool is a held object at all *(Mechanics, wave 2)*, and what any SKU is *(Monetization,
wave 3)*. Typography, layout, icon design and what an empty slot **does** look like, as against what
it may not *(UI/UX — Screens, wave 4)*. Whether the `artPrompt` lint gets built *(contract-and-seam
work)*. The listing's register, its title and its tagline *(Discovery & Marketing, wave 5 —
conceded by `01-register.md` and not reopened)*. The copy register (`01`), how flavour text is
written (`02`), and which moments the fiction may peak at (`03`).

## Flagged to the developer

**Nine of twelve entries hang off three `[brief: soft]` adjectives, which makes this sheet unusually
cheap to reverse in bulk.** Overruling *"not spooky"* takes X1, X2 and X3; *"not grim"* takes X4 and
X5; *"not a power fantasy"* takes X6 through X9. X10, X11 and X12 derive from binding items and do
not move. Said plainly so a later revision knows the seam.

| ruling | live alternative | my recommendation |
|---|---|---|
| **X9 — no oversized tool, ever** | The reference's own top SKU is a 2,500-Robux oversized tool at 38M visits and a 96% like ratio, and `03-META.md` flags twice that this game's premium SKU has no home. Allowing an oversized tool would give it one immediately | **Keep the ban, and accept that the premium SKU stays homeless until Monetization invents a different shape.** The cost is real and it is the one entry here with a revenue number attached. If it is overruled, the cheap version is *large but not a weapon*: keep the silhouette clauses, drop the height clause |
| **X8 — the build awards zero Roblox badges** | Badges are a free platform retention and discovery surface, they show on player profiles, and nothing in the brief forbids them | **Keep.** A badge is an achievement with a platform behind it, and `03` struck the achievement category rather than moving it. But this is the entry I would expect Live Ops to contest in wave 5, and it should contest it in a `## Pushing back`, not quietly |
| **X6 — no figure ever appears in world space** | The floating gain number is the genre's most standard affordance and the audience is binding-ly *"genre-literate"* | **Keep as the starting value.** See the playtest note below; this is the entry most likely to be wrong |
| **X5 — an empty slot shows no silhouette of what is missing** | Silhouette teasers are standard in collection UI and demonstrably drive completion | **Keep.** A silhouette is a hunt cue and a hunt is anticipation, which is tension by the smallest available increment. Release condition already written into the entry |

**`[playtest unknown]` — whether a clear with no number on it reads as unrewarding to a genre-literate
8–14 player.** Starting value: **0 world-space figures.** Test range: **0**, with a stated escalation
order so a playtest cannot answer *"it feels flat"* with a field of floating text: (1) increase the
non-numeric per-patch feedback, which is Mechanics' and Audio's and is already funded; (2) make the
screen-anchored currency readout visibly tick in place; (3) **only a developer ruling** puts a figure
into world space. What would settle it: ask a first-session player in the band whether clearing is
doing anything, and whether they can say what a patch was worth.

**`[playtest unknown]` — whether a place with no darkness, no weather and no uncaused sound reads as
warm or as flat.** Starting value: **X1 and X2 as written, one continuous ambient bed permitted.**
Test range: **1 to 2 ambient beds**, and nothing else moves. This is the same knob Setting already
opened for fauna and it should be spent in that sheet's order, not by relaxing X2 — **an hour change
is not a fix for flatness, it is a change of genre.**

No URL was fetched in this run. Every `[research: repo — ...]` above cites a file read this run;
every genre figure is relayed from `cid/theme/tone/_lead.md` and marked as relayed.
