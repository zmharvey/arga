# 04 — Tonal do-nots

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1 · **Revised wave 7**

## Decision

**Eighteen exclusions. `D1`–`D15` keep their shipped meanings and are frozen; `D16`, `D17` and
`D18` restore three rulings that were lost when this sheet's rows were renumbered from `X…` to
`D…`; a published `idHistory` maps every old `X` id any sibling still cites onto a live row or
onto a stated drop.** From this revision the id space is **append-only**: a row that dies keeps
its id and gains `status: "withdrawn"`, and no id is ever reused or renumbered again.

## Why

An exclusion list earns a file only if a reviewer can point at the violation. *"Not spooky"* is
not checkable and *"zero cobwebs"* is `[brief: soft]` ← `[you accepted: R2 Q3]`
(`01-FOUNDATION.md`), restated as *"not a haunted place"* (`04-PRESENTATION.md`). The status
column carries each entry's real strength, and the entries inherited from `[brief: binding]`
items are the ones a later wave may not argue with.

**An id is a public interface, and this sheet proved it the expensive way.** Every sibling that
binds its own rule to an id here broke silently when the numbers moved, and
`bridge/verify-sheets.mjs` now warns on exactly this, its own comment recording fifteen sheets in
five categories still citing `X10` `[research: bridge/verify-sheets.mjs]`. The rule that follows
is not stylistic: **a renumbering is a breaking change and may only ship in the same commit as the
mapping table that resolves it** `[cid: decided]`.

**The recovery was done from the citation record, not from history, and that is a stated
limitation.** This revision had no shell, so the pre-renumbering revision of this file could not
be read `[research owed: git show <pre-wave-7>:cid/theme/tone/04-do-nots.md, which is the only
authority on the exact original wording of the retired X rows]`. Every verdict below therefore
rests on two things that *are* on disk: the content each citing sheet attributes to the id, and
whether a `D` row already carries that content.

**`X10` is resolved without picking a winner, because both attributions survive.** Two sheets
attributed different rulings to it: *"Measure freely, display none of it"* (`analytics/_category.md`,
declared binding on five domains) and a ban on any surface displaying time (`theme/setting/03`).
The time half is already carried by `D6` (a countdown timer) and `D15` (a calendar, a moving clock
face). The measurement half is carried by **nothing** in `D1`–`D15`: `D7` forbids only *comparative*
display, one player against another. So the measurement half is the real loss, it comes back as
`D16`, and every Analytics citation re-points there `[cid: decided]`.

**`X12`'s reversal was half intended.** `notAudited` correctly withdrew this sheet's *copy* scope
from the store listing: sheet `01`'s register does not bound a listing, and Discovery and Marketing
owns it. But `X12` was never a copy rule. It was truth-in-depiction, and `theme/setting/03` leans on
it for the sky in key art. Withdrawing the surface silently withdrew the rule, so the rule returns
as `D17` and `notAudited` is re-scoped to copy only. Marketing already built the enforcement:
`marketing/thumbnails/02` `C10` walks a forbidden list against the frame at capture time
`[research: cid/marketing/thumbnails/02-the-capture-gate.md]`.

**`X9` does not come back.** `theme/fantasy/03` cites it as a ban on the oversized tool. No such ban
can stand: `theme/identity/04` recommends an oversized tool as the premium SKU and
`gameplay/monetization/01` ships it as the 499 Robux product
`[research: cid/gameplay/monetization/01-the-offer-ladder.md]`. A Tone row forbidding a shipped
product would be a live contradiction, not a recovered ruling, and this sheet does not own SKU
shape in any case `[cid: decided]`.

**`X1` comes back as `D18`, which is the standing request from `cid/audio/ambient/02` `RR3`,
granted.** `theme/setting/03` `R5` states its check as *"this is `tone/04-do-nots` `X1`'s trigger
count"*, so a verifier can read `R5` but cannot run it. `D18` carries the count. Ambience rests on
this in Audio, so leaving it dangling was the one drop that stopped a downstream check from
executing.

### The list

| id | forbidden, named | audits | status | source |
|---|---|---|---|---|
| `D1` | Cobwebs, skulls, bones, gravestones, coffins, funerary urns, chains, shackles, torn banners, blood, claw marks, scorch marks on any model in any area | Art and Visuals | inherited | *"Not spooky, not grim"* `[brief: soft]` (`01-FOUNDATION.md`); *"This is reclamation, not a haunted place"* `[brief: soft]` (`04-PRESENTATION.md`) |
| `D2` | Light flicker, a moving or animated shadow, a darkening pulse on any event, a screen vignette, a fog volume, dust motes in a light shaft | Art and Visuals | decided | `cid/theme/setting/03-physical-law.md` (pack §4) fixes one hour and no weather; flicker, pulse and vignette are event cues that ruling does not reach `[cid: decided]` |
| `D3` | A minor-key sting, a dissonant or detuned interval, a sub-bass drone, a whisper, breathing, a heartbeat, a creak, a wind howl | Audio | decided | Sheet `03` ranks beats and names no timbre; nothing else forbids a horror palette `[cid: decided]` |
| `D4` | An announcer voice line, a crowd cheer or applause sample, a coin-jackpot cascade, a slot-machine ratchet, an air horn, a riser or whoosh build | Audio | decided | The measured genre register is exclamatory hype `[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`; the positioning is *"a restoration game, not an incremental"* `[brief: binding]` ← `[you chose: R4 Q2]` (`05-OUTWARD.md`) |
| `D5` | Confetti, fireworks, camera shake, a full-screen flash, slow motion, a freeze frame, a hit-stop or impact freeze, radial speed lines, chromatic aberration | Art and Visuals (VFX) | decided | Same positioning line; each imports arousal that `B1` does not need to be the loudest `[cid: decided]`. *Hit-stop and burst were named by the retired `X7` and are restored into this row rather than given a new id* |
| `D6` | A countdown timer, a bar that empties, a red alert state, an unread-count badge, a pulsing or blinking element, a modal that cannot be dismissed | UI/UX | inherited | *"nobody downstream should invent tension to fill the gap"* `[brief: binding]` on the instruction (`02-GAMEPLAY.md`, `HANDOFF.md`) |
| `D7` | A leaderboard, a rank, a percentile, an "X players found this" line, any display of another player's collection, currency or progress | UI/UX | inherited | Priority 3 excludes leaderboards (`03-META.md`); *"no mechanical interaction"* `[brief: soft]` ← `[you accepted: R6 Q2]`; `cid/theme/identity/03-co-present-stranger.md` (pack §4) |
| `D8` | Strikethrough on anything obtainable, a padlock icon on an unrevealed slot, the words `missed`, `expired` or `gone` in any state, any UI state that reads as permanently unavailable | UI/UX | inherited | *"Never content access ... A paid-only object would turn 100% completion into a purchase"* `[brief: soft]` ← `[you accepted: R5 Q4]` (`03-META.md`); *"A stuck player cannot exist"* (`02-GAMEPLAY.md`) |
| `D9` | A timer or "limited" tag on any offer, a discount countdown, an unprompted purchase popup, any offer that interrupts a beat in sheet `03` | Monetization | inherited | Priority 3 excludes seasons and events (`03-META.md`); *"Permanent multipliers only"* `[brief: soft]` |
| `D10` | Any in-experience prompt to like, favourite, follow, join a group or enter a code; any code entry field | UI/UX, Monetization | inherited | Priority 3 excludes codes (`03-META.md`). All three genre pages ship exactly these prompts `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]` |
| `D11` | A silhouette, a blurred model, a greyed name, a question-mark icon or a flavour line shown for a Find that has not been revealed | UI/UX | decided | Protects `B1`, the loudest moment (sheet `03`). Empty slots stay visible and stay anonymous `[cid: decided]` |
| `D12` | Bounce-back on contact, a stagger, a blocked cue, a cooldown, a stamina or fatigue meter, movement slow-down, tool durability | Mechanics | inherited | *"There is no failure state"* and *"The only friction is the size of an area"* `[brief: soft]` ← `[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`) |
| `D13` | A face, eyes or a mouth on any object, button, icon or foliage model; a mascot; any element that speaks | Art and Visuals, UI/UX | inherited | `cid/theme/identity/04-no-cast-declaration.md` (pack §4): nine classes of entity, none of them, *"no mascot"* |
| `D14` | Rubble staged as destruction, memorials, remains, a "last of the" caption, or any art or UI element that answers a silence `S1`–`S6` | Art and Visuals | inherited | `cid/theme/lore/01-the-past.md` (pack §4): *"Nothing happened to them"*; `cid/theme/lore/02-the-silences.md` holds the runnable test |
| `D15` | A calendar, a clock face whose hands move, any dial, gnomon shadow or readout whose indication advances with real time, a seasonal decoration, a festival banner, a harvest or anniversary prop, a returning-visitor greeting | Art and Visuals, UI/UX | inherited | Priority 3 excludes seasons and events; the category scope gate forbids *"any festival, holiday, anniversary, or calendar fiction"* (`cid/theme/_category.md`) |
| `D16` | Any player-facing surface, widget, label, badge or string that displays a **measured** figure about play: elapsed session time, total playtime, session count, a visit or return count, a streak, a clears-per-minute or per-hour rate, an average, a percentile, a retention or funnel figure, a completion percentage derived from telemetry, or a progress bar fed by any of them | UI/UX, Analytics | inherited, **restored** | *"Measure freely, display none of it"*, the ruling five Analytics domains declare binding (`cid/analytics/_category.md`). Distinct from `D7`, which forbids only comparison against another player |
| `D17` | Any published depiction of this game (icon, thumbnail, screenshot, key art, trailer frame) that shows a state the shipped build cannot produce: a sky, hour, weather, effect, entity, surface, screen, quantity or UI element the shipped client does not render | Discovery and Marketing | inherited, **restored** | Truth-in-depiction, cited by `cid/theme/setting/03-physical-law.md` for the sky. Enforced at capture by `marketing/thumbnails/02` `C10` `[research: cid/marketing/thumbnails/02-the-capture-gate.md]` |
| `D18` | Any sound, particle, animation, light change or model motion that begins without a player action as its cause: scheduled, timed, randomised, idle-looped, or triggered by elapsed time, server uptime or another player's action | Audio, Art and Visuals | inherited, **restored** | `cid/theme/setting/03-physical-law.md` `R4` and `R5`, which hold the subject and asked this sheet for the count. Grants the one exemption `R5` grants: a continuous bed whose level, content and filter never differ at second N from second 0 |

### Three scope statements, so the audit knows its own edge

| surface | status |
|---|---|
| The store listing, thumbnail and game title | **Not audited by this list for register, humor or copy.** Sheet `01`'s register does not bound the listing; sheet `02`'s humor ban does, because the binding decision names *store copy*. Everything else about the listing's writing is Discovery and Marketing's. **`D17` is the one row that does reach these surfaces**, because it constrains what an image claims, not how it is written |
| The relic named `Chain` in `collection.sets[1]` | **Not a `D1` violation.** `D1` forbids chain as funerary or dungeon dressing on an environment model. A cistern's sluice chain is functional hardware and is the object it names. Stated because a literal diff of the `D1` word list against `collection` would otherwise fail a shipped name `[cid: decided]` |
| The relics `Sundial`, `Gnomon`, `Vane` and `Orrery` in `collection.sets` | **Not a `D15` violation.** Under the fixed hour these are static objects that *denote* measurement without *indicating* anything, and `theme/setting/03` already rules that denoting is not asserting. `D15` fails a dial whose reading advances, never a name `[research: cid/gameplay/meta/02-the-collection.md]` |

### The mapping: every old `X` id cited into this sheet

A sibling holding a citation in the left column replaces it with the right. Ids absent from this
table are cited by nobody on disk and nothing is owed for them.

| old id | content attributed to it by the citing sheet | verdict | replace the citation with |
|---|---|---|---|
| `X1` | *"Nothing moves or sounds that the player did not cause"* | **restored** | `D18`, or `theme/setting/03` `R5` directly, which is self-contained |
| `X2` | *"The hour is not night, dusk or overcast"* | **dropped, superseded** | `theme/setting/03` `R1`/`R2`. That sheet holds the hour by assignment and ratified the ruling; a Tone row restating it would make the two sheets cite each other |
| `X7` | no burst, flash, chromatic effect or hit-stop | **survives** | `D5`, whose list now names hit-stop and impact freeze explicitly |
| `X9` | a ban on the oversized tool | **dropped, will not return** | nothing. `theme/identity/04` recommends the tool and `gameplay/monetization/01` ships it; the citing argument must rest on its own `C3` and sheet `01`'s consumables ban |
| `X10` (measurement half) | *"Measure freely, display none of it"* | **restored** | `D16` |
| `X10` (time half) | forbids any surface that displays time | **survives, split** | `D6` for a countdown, `D15` for a calendar or advancing dial, `D16` for elapsed session time |
| `X12` | truth-in-depiction reaching store key art | **restored, re-scoped** | `D17`; the copy-scope withdrawal over the listing stands |
| `XW` | a token list this sheet is said to share zero words with | **dropped, never in scope** | `tone/01` `P6`/`P7`/`P8` and `vocabulary.bannedWords`. This sheet owns no word list, and the domain index says so in its boundary statement |

**Not this sheet's ids.** `gameplay/social/03`, `marketing/thumbnails/01`, `analytics/funnels/04`
and `analytics/events/01` all run their own `X…` spaces. A citation naming one of those files is
correct as written and must not be re-pointed here.

## Data form

```manifest
{
  "provides": "tonalExclusions",
  "status": "proposed",
  "value": {
    "auditedCategories": ["Art and Visuals", "Audio", "UI/UX", "Mechanics", "Monetization", "Analytics", "Discovery and Marketing"],
    "notAudited": {
      "surfaces": ["the store listing", "the store thumbnail", "the game title"],
      "exemptionScope": "register, humor and copy only",
      "stillBoundBy": ["D17"]
    },
    "idPolicy": {
      "appendOnly": true,
      "reuseForbidden": true,
      "retirement": "a row that dies keeps its id and gains status withdrawn",
      "renumberRule": "a renumbering is a breaking change; it may only ship in the same commit as an idHistory entry for every id it moves"
    },
    "idHistory": [
      { "old": "X1", "verdict": "restored", "newIds": ["D18"], "alsoSatisfiedBy": "cid/theme/setting/03-physical-law.md R5", "content": "nothing moves or sounds that the player did not cause" },
      { "old": "X2", "verdict": "dropped", "newIds": [], "reason": "superseded; the hour is theme/setting/03 R1/R2, which holds the subject by assignment", "content": "No treatment darkens, desaturates or obscures.", "contentRecoveredFromGit": "d55cc18, the wave-1 sheet. An earlier version of this row guessed the content from a citing sheet as \"the hour is not night, dusk or overcast\"; the real row was about TREATMENT (fog, vignette, desaturating grade), not about the hour. The verdict is unchanged and the reason still holds." },
      { "old": "X7", "verdict": "survives", "newIds": ["D5"], "reason": "D5 now names hit-stop and impact freeze explicitly so the mapping is lossless", "content": "no burst, flash, chromatic effect or hit-stop" },
      { "old": "X9", "verdict": "dropped", "newIds": [], "reason": "it contradicts a shipped product: theme/identity/04 recommends the oversized tool and gameplay/monetization/01 ships it at 499 Robux. SKU shape is not this sheet's subject", "content": "a ban on the oversized tool" },
      { "old": "X10", "verdict": "survives", "newIds": ["D6", "D15"], "reason": "recovered verbatim from git d55cc18: X10 was \"Nothing counts down, and no surface displays time.\" It is one rule about TIME and was never two halves. D6 and D15 carry it.", "content": "Nothing counts down, and no surface displays time.", "contentRecoveredFromGit": "d55cc18" },
      { "old": "X10", "verdict": "MISATTRIBUTED, not lost", "newIds": [], "misattributedBy": "cid/analytics/_category.md:36, which relays \"Measure freely, display none of it\" as this sheet's X10 via theme/fantasy/03 and calls it binding on all five Analytics domains", "reason": "THE STRING \"Measure freely\" HAS NEVER APPEARED IN THIS SHEET IN ANY COMMIT — checked across every revision of this file in git. No wave-1 X row was about measurement: X10 was time, X8 was merit affordances and badges, X7 was impact spectacle. The rule may well be right, but it is Analytics' own and it is not Tone's, so it cannot be cited here. An earlier version of this row believed the measurement half was the real loss and restored it as D16; that was reconstruction from the citing sheet rather than from the source, which is the same defect the citation was.", "requestedOf": "cid/analytics/_category.md — carry the rule as your own or cite the domain that actually made it, and stop routing it through theme/fantasy/03" },
      { "old": "X12", "verdict": "restored", "newIds": ["D17"], "reason": "the copy-scope withdrawal over the store listing was intended; the depiction rule was not, and returns audited by marketing/thumbnails/02 C10", "content": "truth in depiction, reaching store key art" },
      { "old": "XW", "verdict": "dropped", "newIds": [], "reason": "never in scope; this sheet owns no word list", "redirect": "cid/theme/tone/01-register.md P6/P7/P8 and vocabulary.bannedWords", "content": "a banned-token list" }
    ],
    "unrecoveredOldIds": {
      "ids": [],
      "note": "no site under cid/ cites any X id into this sheet other than the eight rows above; the pre-renumbering file itself was not readable this run"
    },
    "exclusions": [
      { "id": "D1", "audits": ["Art and Visuals"], "status": "inherited", "forbids": ["cobwebs", "skulls", "bones", "gravestones", "coffins", "funerary urns", "chains", "shackles", "torn banners", "blood", "claw marks", "scorch marks"], "scope": "any model in any area", "exceptions": ["the collection relic named Chain, which is cistern hardware rather than dressing"], "source": "01-FOUNDATION.md not spooky not grim; 04-PRESENTATION.md reclamation not a haunted place" },
      { "id": "D2", "audits": ["Art and Visuals"], "status": "decided", "forbids": ["light flicker", "a moving or animated shadow", "a darkening pulse on any event", "a screen vignette", "a fog volume", "dust motes in a light shaft"], "source": "theme/setting/03 fixes one hour and no weather; these are event cues that ruling does not reach" },
      { "id": "D3", "audits": ["Audio"], "status": "decided", "forbids": ["a minor-key sting", "a dissonant or detuned interval", "a sub-bass drone", "a whisper", "breathing", "a heartbeat", "a creak", "a wind howl"], "source": "sheet 03 ranks beats and names no timbre; nothing else forbids a horror palette" },
      { "id": "D4", "audits": ["Audio"], "status": "decided", "forbids": ["an announcer voice line", "a crowd cheer or applause sample", "a coin-jackpot cascade", "a slot-machine ratchet", "an air horn", "a riser or whoosh build"], "source": "the measured genre register is exclamatory hype; positioning is a restoration game, not an incremental" },
      { "id": "D5", "audits": ["Art and Visuals"], "status": "decided", "forbids": ["confetti", "fireworks", "camera shake", "a full-screen flash", "slow motion", "a freeze frame", "a hit-stop or impact freeze", "radial speed lines", "chromatic aberration"], "source": "same positioning line; each imports arousal B1 does not need to be the loudest. Hit-stop and burst restored from the retired X7" },
      { "id": "D6", "audits": ["UI/UX"], "status": "inherited", "forbids": ["a countdown timer", "a bar that empties", "a red alert state", "an unread-count badge", "a pulsing or blinking element", "a modal that cannot be dismissed"], "source": "HANDOFF.md, binding: nobody downstream should invent tension to fill the gap" },
      { "id": "D7", "audits": ["UI/UX"], "status": "inherited", "forbids": ["a leaderboard", "a rank", "a percentile", "an X-players-found-this line", "any display of another player's collection, currency or progress"], "source": "03-META.md priority 3 excludes leaderboards; no mechanical interaction; theme/identity/03" },
      { "id": "D8", "audits": ["UI/UX"], "status": "inherited", "forbids": ["strikethrough on anything obtainable", "a padlock icon on an unrevealed slot", "the word missed", "the word expired", "the word gone", "any UI state that reads as permanently unavailable"], "source": "03-META.md never content access; 02-GAMEPLAY.md a stuck player cannot exist" },
      { "id": "D9", "audits": ["Monetization"], "status": "inherited", "forbids": ["a timer on any offer", "a limited tag on any offer", "a discount countdown", "an unprompted purchase popup", "any offer that interrupts a beat in peakPolicy"], "source": "03-META.md priority 3 excludes seasons and events; permanent multipliers only" },
      { "id": "D10", "audits": ["UI/UX", "Monetization"], "status": "inherited", "forbids": ["an in-experience prompt to like", "to favourite", "to follow", "to join a group", "to enter a code", "any code entry field"], "source": "03-META.md priority 3 excludes codes; all three genre pages ship exactly these prompts" },
      { "id": "D11", "audits": ["UI/UX"], "status": "decided", "forbids": ["a silhouette", "a blurred model", "a greyed name", "a question-mark icon", "a flavour line shown for an unrevealed Find"], "requires": ["empty slots stay visible and stay anonymous"], "source": "protects B1, the loudest moment" },
      { "id": "D12", "audits": ["Mechanics"], "status": "inherited", "forbids": ["bounce-back on contact", "a stagger", "a blocked cue", "a cooldown", "a stamina or fatigue meter", "movement slow-down", "tool durability"], "source": "02-GAMEPLAY.md there is no failure state; the only friction is the size of an area" },
      { "id": "D13", "audits": ["Art and Visuals", "UI/UX"], "status": "inherited", "forbids": ["a face on any object, button, icon or foliage model", "eyes", "a mouth", "a mascot", "any element that speaks"], "source": "theme/identity/04: nine classes of entity, none of them, no mascot" },
      { "id": "D14", "audits": ["Art and Visuals"], "status": "inherited", "forbids": ["rubble staged as destruction", "memorials", "remains", "a last-of-the caption", "any art or UI element that answers a silence S1 to S6"], "source": "theme/lore/01: nothing happened to them; theme/lore/02 holds the runnable test" },
      { "id": "D15", "audits": ["Art and Visuals", "UI/UX"], "status": "inherited", "forbids": ["a calendar", "a clock face whose hands move", "any dial, gnomon shadow or readout whose indication advances with real time", "a seasonal decoration", "a festival banner", "a harvest or anniversary prop", "a returning-visitor greeting"], "exceptions": ["the collection relics Sundial, Gnomon, Vane and Orrery, which are static objects under a fixed hour and indicate nothing"], "source": "03-META.md priority 3 excludes seasons and events; theme/_category.md scope gate" },
      { "id": "D16", "audits": ["UI/UX", "Analytics"], "status": "inherited", "restoredFrom": "not X10 — see idHistory. X10 was about time, not measurement, and the measurement rule this row carries has never been in this sheet. It is kept as a NEW Tone ruling made deliberately in wave 7, not as a restoration, because the underlying rule is right and Analytics is relying on it: a game with no clock should not display a session count or a streak either. status is decided, not inherited.", "status_correction": "this row reads inherited above; it is DECIDED. Nothing was inherited because nothing was lost.", "forbids": ["elapsed session time", "total playtime", "a session count", "a visit or return count", "a streak", "a clears-per-minute or per-hour rate", "an average", "a percentile", "a retention figure", "a funnel figure", "a completion percentage derived from telemetry", "a progress bar fed by any of these"], "scope": "any player-facing surface, widget, label, badge or string", "exceptions": ["the collection readout 0 / 24, the currency balance and an upgrade level, which are state the player owns rather than a measurement of how they played"], "source": "measure freely, display none of it; cid/analytics/_category.md declares it binding on five domains" },
      { "id": "D17", "audits": ["Discovery and Marketing"], "status": "inherited", "restoredFrom": "X12", "forbids": ["a sky, hour, weather, effect, entity, surface, screen, quantity or UI element that the shipped client does not render, appearing in any icon, thumbnail, screenshot, key art or trailer frame"], "scope": "every published depiction of this game", "enforcedBy": "marketing/thumbnails/02 C10, at capture time", "source": "truth in depiction; cited by theme/setting/03 for the sky" },
      { "id": "D18", "audits": ["Audio", "Art and Visuals"], "status": "inherited", "restoredFrom": "X1", "forbids": ["a sound, particle, animation, light change or model motion whose trigger is a schedule", "a timer", "a random draw", "an idle loop", "elapsed time", "server uptime", "another player's action"], "requires": ["every such element has a player action as its cause"], "exceptions": ["one continuous ambient bed whose level, content and filter never differ at second N from second 0"], "observable": "count of emitters, animations, sounds and light changes in the shipped place whose trigger is not a player action: 0", "source": "theme/setting/03 R4 and R5, which asked this sheet for the trigger count" }
    ]
  }
}
```

## Consequences for other work

- **Analytics readouts** (all five Analytics domains) get their binding rule back under a live id.
  `D16` is what *"Measure freely, display none of it"* now is; every citation re-points from the
  mapping table, and none of them changes meaning.
- **Store and key art** (Discovery and Marketing, thumbnails and store-page) inherits `D17`. The
  capture gate already walks a forbidden list; `D17` is the tonal half of it and adds the sky case
  `theme/setting/03` was relying on.
- **Ambience and world sound** (Audio, ambient) can now run `theme/setting/03` `R5`'s check, because
  `D18` carries the count `R5` points at. This grants `cid/audio/ambient/02` `RR3`'s request in the
  half that belongs to Tone; the other half, rewording `R5`'s own cell, is still `theme/setting`'s.
- **Environment and prop art** (Art and Visuals) gains one named carve-out: `Sundial`, `Gnomon`,
  `Vane` and `Orrery` are legal names and illegal only if a model's reading advances. `D5` gains
  hit-stop, which forbids an impact freeze on clear.
- **The SKU ladder** (`gameplay/monetization`) is explicitly unblocked: no Tone row bans the
  oversized tool, and `theme/fantasy/03`'s claim that one does must be dropped, not re-pointed.
- **Every sibling citing an id here** now has a mechanical target. Nobody re-derives a mapping from
  prose, and nobody has to choose between the two `X10` readings.

## Acceptance criteria

1. `exclusions` holds **18** rows, `D1` through `D18`, with no gap and no repeat; `D1`–`D15` carry
   the same `id` and the same `audits` values they carried before this revision.
2. `idHistory` holds **8** rows covering `X1`, `X2`, `X7`, `X9`, `X10` (twice), `X12` and `XW`;
   every row's `verdict` is one of `restored`, `survives`, `dropped`; every `restored` and
   `survives` row names at least one id present in `exclusions`; every `dropped` row carries a
   `reason`.
3. `npm run cid:verify` reports zero ids cited into `theme/tone/04` that this sheet does not
   define.
4. Every row in `exclusions` names at least one countable prop, cue, widget, string or trigger, and
   each of the seven `auditedCategories` is named by at least one row's `audits`.

## Pushing back

`notAudited`'s exclusion of the store thumbnail is overruled in part. It is a spec-level scope
statement, not a brief item, so no `[brief: binding]` line is touched. Copy scope over the listing
stays withdrawn; depiction scope returns as `D17`, because withdrawing a surface silently withdrew
a rule that `theme/setting/03` and the Marketing capture gate both build on.

## Flagged to the developer

**The oversized-tool ban is gone and I am not restoring it.** The live alternatives: (a) accept the
drop, which is my recommendation, since `gameplay/monetization/01` ships the tool at 499 Robux and
`theme/identity/04` recommends it as the premium SKU; (b) rule that the premium SKU may not be a
scaled-up tool, which is a Monetization and Mechanics decision and would need a sheet in one of
those domains, not a Tone row. `theme/fantasy/03` currently leans on (b) as though it were settled.

## Not decided here

Any new tonal position: this sheet converts prohibitions into checks and invents none. The wording
of `theme/setting/03` `R5`'s check cell, which is `theme/setting`'s to fix. Which analytics figures
may be *collected* (Analytics; `D16` bounds display only). What a thumbnail must contain
(`marketing/thumbnails`; `D17` bounds only what it may not claim). The premium SKU's shape
(`gameplay/monetization`). Which words are banned in strings (sheet `01`; sheet `02` for
flavour-only words). Which moments may peak at all (sheet `03`).
