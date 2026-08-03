# 04 — Tonal do-nots

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Fifteen exclusions, `D1` to `D15`, every one an object, widget, cue or state another
category can be failed against.** This sheet governs things other categories *build*; sheets
`01` to `03` govern words and beats this domain writes. Nothing here is derivable from
`P1`–`P9`, `F1`–`F8` or `B1`–`B5`, and no entry restates them.

## Why

An exclusion list earns a file only if a reviewer can point at the violation. *"Not spooky"*
is not checkable and *"zero cobwebs"* is `[brief: soft]` ← `[you accepted: R2 Q3]`
(`01-FOUNDATION.md`), restated as *"not a haunted place"* (`04-PRESENTATION.md`). Both
instances are soft, so this list is not softer than its sources and is not harder either: the
status column carries each entry's real strength, and the four entries inherited from
`[brief: binding]` items are the ones a later wave may not argue with.

The split against my own sheets is the reason this file is not a duplicate. A build agent
checking `01` reads strings; checking `03` reads cue rankings. Neither pass would ever look at
a prop list, a particle system, a monetization popup or a padlock icon, which is where every
entry below lives.

### The list

| id | forbidden, named | audits | status | source |
|---|---|---|---|---|
| `D1` | Cobwebs, skulls, bones, gravestones, coffins, funerary urns, chains, shackles, torn banners, blood, claw marks, scorch marks on any model in any area | Art and Visuals | inherited | *"Not spooky, not grim"* `[brief: soft]` (`01-FOUNDATION.md`); *"This is reclamation, not a haunted place"* `[brief: soft]` (`04-PRESENTATION.md`) |
| `D2` | Light flicker, a moving or animated shadow, a darkening pulse on any event, a screen vignette, a fog volume, dust motes in a light shaft | Art and Visuals | decided | `cid/theme/setting/03-physical-law.md` (pack §4) fixes one hour and no weather; flicker, pulse and vignette are event cues that ruling does not reach `[cid: decided]` |
| `D3` | A minor-key sting, a dissonant or detuned interval, a sub-bass drone, a whisper, breathing, a heartbeat, a creak, a wind howl | Audio | decided | Sheet `03` ranks beats and names no timbre; nothing else forbids a horror palette `[cid: decided]` |
| `D4` | An announcer voice line, a crowd cheer or applause sample, a coin-jackpot cascade, a slot-machine ratchet, an air horn, a riser or whoosh build | Audio | decided | The measured genre register is exclamatory hype `[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`; the positioning is *"a restoration game, not an incremental"* `[brief: binding]` ← `[you chose: R4 Q2]` (`05-OUTWARD.md`) |
| `D5` | Confetti, fireworks, camera shake, a full-screen flash, slow motion, a freeze frame, radial speed lines, chromatic aberration | Art and Visuals (VFX) | decided | Same positioning line; and each imports arousal that `B1` does not need to be the loudest `[cid: decided]` |
| `D6` | A countdown timer, a bar that empties, a red alert state, an unread-count badge, a pulsing or blinking element, a modal that cannot be dismissed | UI/UX | inherited | *"nobody downstream should invent tension to fill the gap"* `[brief: binding]` on the instruction (`02-GAMEPLAY.md`, `HANDOFF.md`) |
| `D7` | A leaderboard, a rank, a percentile, an "X players found this" line, any display of another player's collection, currency or progress | UI/UX | inherited | Priority 3 excludes leaderboards (`03-META.md`); *"no mechanical interaction"* `[brief: soft]` ← `[you accepted: R6 Q2]`; `cid/theme/identity/03-co-present-stranger.md` (pack §4) |
| `D8` | Strikethrough on anything obtainable, a padlock icon on an unrevealed slot, the words `missed`, `expired` or `gone` in any state, any UI state that reads as permanently unavailable | UI/UX | inherited | *"Never content access ... A paid-only object would turn 100% completion into a purchase"* `[brief: soft]` ← `[you accepted: R5 Q4]` (`03-META.md`); *"A stuck player cannot exist"* (`02-GAMEPLAY.md`) |
| `D9` | A timer or "limited" tag on any offer, a discount countdown, an unprompted purchase popup, any offer that interrupts a beat in sheet `03` | Monetization | inherited | Priority 3 excludes seasons and events (`03-META.md`); *"Permanent multipliers only"* `[brief: soft]` |
| `D10` | Any in-experience prompt to like, favourite, follow, join a group or enter a code; any code entry field | UI/UX, Monetization | inherited | Priority 3 excludes codes (`03-META.md`). All three genre pages ship exactly these prompts `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]` |
| `D11` | A silhouette, a blurred model, a greyed name, a question-mark icon or a flavour line shown for a Find that has not been revealed | UI/UX | decided | Protects `B1`, the loudest moment (sheet `03`). Empty slots stay visible and stay anonymous `[cid: decided]` |
| `D12` | Bounce-back on contact, a stagger, a blocked cue, a cooldown, a stamina or fatigue meter, movement slow-down, tool durability | Mechanics | inherited | *"There is no failure state"* and *"The only friction is the size of an area"* `[brief: soft]` ← `[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`) |
| `D13` | A face, eyes or a mouth on any object, button, icon or foliage model; a mascot; any element that speaks | Art and Visuals, UI/UX | inherited | `cid/theme/identity/04-no-cast-declaration.md` (pack §4): nine classes of entity, none of them, *"no mascot"* |
| `D14` | Rubble staged as destruction, memorials, remains, a "last of the" caption, or any art or UI element that answers a silence `S1`–`S6` | Art and Visuals | inherited | `cid/theme/lore/01-the-past.md` (pack §4): *"Nothing happened to them"*; `cid/theme/lore/02-the-silences.md` holds the runnable test |
| `D15` | A calendar, a clock face whose hands move, a seasonal decoration, a festival banner, a harvest or anniversary prop, a returning-visitor greeting | Art and Visuals, UI/UX | inherited | Priority 3 excludes seasons and events; the category scope gate forbids *"any festival, holiday, anniversary, or calendar fiction"* (`cid/theme/_category.md`) |

### Two scope statements, so the audit knows its own edge

| surface | status |
|---|---|
| The store listing, thumbnail and game title | **Not audited by this list.** Sheet `01`'s register does not bound the listing; sheet `02`'s humor ban does, because the binding decision names *store copy*. Everything else about the listing is Discovery and Marketing's |
| The relic named `Chain` in `collection.sets[1]` | **Not a `D1` violation.** `D1` forbids chain as funerary or dungeon dressing on an environment model. A cistern's sluice chain is functional hardware and is the object it names. Stated because a literal diff of the `D1` word list against `collection` would otherwise fail a shipped name `[cid: decided]` |

## Data form

An exclusion list is the most machine-readable thing this domain produces, and five other
domains already cite `D` ids inside their own merged keys — `art/vfx/01` carries `D2` and `D5`
as named `forbidden` rows with observables `[research: cid/art/vfx/01-the-clear-and-the-reveal.md]`.
It has been cited as data while existing only as a table, so it becomes one.

```manifest
{
  "provides": "tonalExclusions",
  "status": "proposed",
  "value": {
    "auditedCategories": ["Art and Visuals", "Audio", "UI/UX", "Mechanics", "Monetization"],
    "notAudited": ["the store listing", "the store thumbnail", "the game title"],
    "exclusions": [
      { "id": "D1", "audits": ["Art and Visuals"], "status": "inherited", "forbids": ["cobwebs", "skulls", "bones", "gravestones", "coffins", "funerary urns", "chains", "shackles", "torn banners", "blood", "claw marks", "scorch marks"], "scope": "any model in any area", "exceptions": ["the collection relic named Chain, which is cistern hardware rather than dressing"], "source": "01-FOUNDATION.md not spooky not grim; 04-PRESENTATION.md reclamation not a haunted place" },
      { "id": "D2", "audits": ["Art and Visuals"], "status": "decided", "forbids": ["light flicker", "a moving or animated shadow", "a darkening pulse on any event", "a screen vignette", "a fog volume", "dust motes in a light shaft"], "source": "theme/setting/03 fixes one hour and no weather; these are event cues that ruling does not reach" },
      { "id": "D3", "audits": ["Audio"], "status": "decided", "forbids": ["a minor-key sting", "a dissonant or detuned interval", "a sub-bass drone", "a whisper", "breathing", "a heartbeat", "a creak", "a wind howl"], "source": "sheet 03 ranks beats and names no timbre; nothing else forbids a horror palette" },
      { "id": "D4", "audits": ["Audio"], "status": "decided", "forbids": ["an announcer voice line", "a crowd cheer or applause sample", "a coin-jackpot cascade", "a slot-machine ratchet", "an air horn", "a riser or whoosh build"], "source": "the measured genre register is exclamatory hype; positioning is a restoration game, not an incremental" },
      { "id": "D5", "audits": ["Art and Visuals"], "status": "decided", "forbids": ["confetti", "fireworks", "camera shake", "a full-screen flash", "slow motion", "a freeze frame", "radial speed lines", "chromatic aberration"], "source": "same positioning line; each imports arousal B1 does not need to be the loudest" },
      { "id": "D6", "audits": ["UI/UX"], "status": "inherited", "forbids": ["a countdown timer", "a bar that empties", "a red alert state", "an unread-count badge", "a pulsing or blinking element", "a modal that cannot be dismissed"], "source": "HANDOFF.md, binding: nobody downstream should invent tension to fill the gap" },
      { "id": "D7", "audits": ["UI/UX"], "status": "inherited", "forbids": ["a leaderboard", "a rank", "a percentile", "an X-players-found-this line", "any display of another player's collection, currency or progress"], "source": "03-META.md priority 3 excludes leaderboards; no mechanical interaction; theme/identity/03" },
      { "id": "D8", "audits": ["UI/UX"], "status": "inherited", "forbids": ["strikethrough on anything obtainable", "a padlock icon on an unrevealed slot", "the word missed", "the word expired", "the word gone", "any UI state that reads as permanently unavailable"], "source": "03-META.md never content access; 02-GAMEPLAY.md a stuck player cannot exist" },
      { "id": "D9", "audits": ["Monetization"], "status": "inherited", "forbids": ["a timer on any offer", "a limited tag on any offer", "a discount countdown", "an unprompted purchase popup", "any offer that interrupts a beat in peakPolicy"], "source": "03-META.md priority 3 excludes seasons and events; permanent multipliers only" },
      { "id": "D10", "audits": ["UI/UX", "Monetization"], "status": "inherited", "forbids": ["an in-experience prompt to like", "to favourite", "to follow", "to join a group", "to enter a code", "any code entry field"], "source": "03-META.md priority 3 excludes codes; all three genre pages ship exactly these prompts" },
      { "id": "D11", "audits": ["UI/UX"], "status": "decided", "forbids": ["a silhouette", "a blurred model", "a greyed name", "a question-mark icon", "a flavour line shown for an unrevealed Find"], "requires": ["empty slots stay visible and stay anonymous"], "source": "protects B1, the loudest moment" },
      { "id": "D12", "audits": ["Mechanics"], "status": "inherited", "forbids": ["bounce-back on contact", "a stagger", "a blocked cue", "a cooldown", "a stamina or fatigue meter", "movement slow-down", "tool durability"], "source": "02-GAMEPLAY.md there is no failure state; the only friction is the size of an area" },
      { "id": "D13", "audits": ["Art and Visuals", "UI/UX"], "status": "inherited", "forbids": ["a face on any object, button, icon or foliage model", "eyes", "a mouth", "a mascot", "any element that speaks"], "source": "theme/identity/04: nine classes of entity, none of them, no mascot" },
      { "id": "D14", "audits": ["Art and Visuals"], "status": "inherited", "forbids": ["rubble staged as destruction", "memorials", "remains", "a last-of-the caption", "any art or UI element that answers a silence S1 to S6"], "source": "theme/lore/01: nothing happened to them; theme/lore/02 holds the runnable test" },
      { "id": "D15", "audits": ["Art and Visuals", "UI/UX"], "status": "inherited", "forbids": ["a calendar", "a clock face whose hands move", "a seasonal decoration", "a festival banner", "a harvest or anniversary prop", "a returning-visitor greeting"], "source": "03-META.md priority 3 excludes seasons and events; theme/_category.md scope gate" }
    ]
  }
}
```

## Consequences for other work

- **Environment and prop art** (Art and Visuals) inherits `D1`, `D2`, `D5`, `D13`, `D14` and
  `D15` as a prop and effect blacklist that can be diffed against an asset list.
- **Audio intent** (Audio) inherits `D3` and `D4` as a palette exclusion, which is the half of
  tone that sheet `03` deliberately does not touch.
- **Screen design and feedback UI** (UI/UX) inherits `D6`, `D7`, `D8`, `D10`, `D11`, `D13` and
  `D15`. `D11` in particular constrains the `collection-index` panel that `04-PRESENTATION.md`
  calls the differentiator's home.
- **Clear-on-contact feel** (Mechanics) inherits `D12`, which removes every standard way of
  signalling "you cannot do that" in a game where there is nothing you cannot do.
- **SKU presentation** (Monetization) inherits `D9` and `D10`.
- **The collection's names** (`gameplay/meta`) get one carve-out: `Chain` stands. Any future
  name that collides with a `D1` word needs the same explicit exception or a rename.

## Acceptance criteria

1. The list contains 15 entries; every entry names at least one countable prop, cue, widget or
   string, and zero entries use `feel`, `mood`, `vibe`, `tone` or `atmosphere` as the object of
   the prohibition.
2. Every entry is marked `inherited` or `decided`; every `inherited` entry cites a brief file
   or a sibling sheet path, and every `decided` entry names the category it audits.
3. No entry is satisfied by checking `P1`–`P9`, `F1`–`F8` or `B1`–`B5` alone; entries
   referencing those cite them by id and add at least one object those sheets do not name.
4. Each of the five audited categories (Art and Visuals, Audio, UI/UX, Mechanics, Monetization)
   is named by at least one entry.

## Not decided here

Any new tonal position: this sheet converts prohibitions into checks and invents none. What the
world contains rather than what it excludes (`theme/setting/05-inventory`, pack §4). Which
words are banned in strings (sheet `01`, which owns the `vocabulary` amendment, and sheet `02`
for flavour-only words). What the permitted cues actually are in any channel (Audio, Art and
Visuals, UI/UX). Which moments may peak at all (sheet `03`). Whether the store listing shouts
(Discovery and Marketing).
