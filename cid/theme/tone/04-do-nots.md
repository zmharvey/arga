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

### One scope statement, so the audit knows its own edge

| surface | status |
|---|---|
| The store listing, thumbnail and game title | **Not audited by this list.** Sheet `01`'s register does not bound the listing; sheet `02`'s humor ban does, because the binding decision names *store copy*. Everything else about the listing is Discovery and Marketing's, wave 5 |

## Consequences for other work

- **Environment and prop art** (Art and Visuals, wave 4) inherits `D1`, `D2`, `D5`, `D13`,
  `D14` and `D15` as a prop and effect blacklist that can be diffed against an asset list.
- **Audio intent** (Audio, wave 4) inherits `D3` and `D4` as a palette exclusion, which is the
  half of tone that sheet `03` deliberately does not touch.
- **Screen design and feedback UI** (UI/UX, wave 4) inherits `D6`, `D7`, `D8`, `D10`, `D11`,
  `D13` and `D15`. `D11` in particular constrains the `collection-index` panel that
  `04-PRESENTATION.md` calls the differentiator's home.
- **Clear-on-contact feel** (Mechanics, wave 2) inherits `D12`, which removes every standard
  way of signalling "you cannot do that" in a game where there is nothing you cannot do.
- **SKU presentation** (Monetization, wave 3) inherits `D9` and `D10`.

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
words are banned in strings (`theme/vocabulary/02-banned-words`, which holds the key; and lists
M and R requested in sheet `01`). What the permitted cues actually are in any channel (Audio,
Art and Visuals, UI/UX). Whether the store listing shouts (Discovery and Marketing, wave 5).
