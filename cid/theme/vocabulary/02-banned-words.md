# 02 — Banned words

**Domain:** Vocabulary · **Category:** Theme & Narrative · **Wave:** 1

## Decision

A runnable ban list. Every player-facing string in the build contract is checked against
it, and a violation fails the merge rather than surviving as a note nobody read.

`relic` is banned. It is occupied inside this game's own genre family, for a different kind
of object.

## Why

- **`relic` is another game's word for a different thing.** `Scrap Incremental` ships
  *"Roll rare Relics to power up your journey!"* and a *"unique 'Relic' system"*;
  `Faith Incremental` ships *"✨ Relics"* as a named collectible beside Faith and Souls. In
  both, a relic is a **rolled multiplier item**. This game's is a discovered, non-rolled,
  set-structured collectible. Using the word imports the wrong mental model and reads as a
  clone in the store listing.
  [research: https://www.roblox.com/games/129774084106862/Scrap-Incremental]
  [research: https://www.roblox.com/games/94264573845314/Faith-Incremental]
- `tier` is `Scrap Incremental`'s named progression system, so it is banned as a
  player-facing label while remaining fine as an internal field name.
  [research: https://www.roblox.com/games/129774084106862/Scrap-Incremental]
- **Substitutes were checked and are also occupied.** `artifact` is a shipping Roblox title
  with *"70+ artifacts to collect"*; `antique` belongs to `reStore`.
  [research: https://www.roblox.com/games/70698000296435/Artifacts]
  [research: https://www.roblox.com/games/87179205054038/reStore]
- **Three useful negative results**, so the ban list stays short: `clearing` as a harvest
  verb, `overgrowth`, and `index` did not surface as any Roblox game's signature word. The
  occupied verbs in this space are trimming, cutting, washing, shovelling, ploughing,
  gathering, digging, mowing and cleaning.
- **This sheet does not pick the replacement.** `collection` is owned by Meta & Content, and
  naming is not a decision separate from the thing named. This bans; that renames.

**`maxLabelChars` is 14.** `currency.plural` already has a stricter 10-character rule of its
own from the HUD readout it sits in; 14 is the general ceiling for a label in a grid cell or
a corner cluster at phone size.

**Register, stated once so the other string owners can check themselves against it:** plain
concrete nouns, one word where possible, no ornament, no invented compounds. The game is
positioned as a restoration game rather than an incremental `[brief: binding]`, so
incremental-genre vocabulary is off-limits even when it is not banned outright.

```manifest
{
  "provides": "vocabulary",
  "value": {
    "maxLabelChars": 14,
    "register": "Plain concrete nouns, one word where possible. No ornament, no invented compounds, no incremental-genre vocabulary.",
    "casing": "title",
    "maxSentenceWords": 12,
    "allowedPattern": "^[A-Za-z0-9 ,.'%-/]+$",
    "bannedWords": [
      { "word": "relic",    "reason": "occupied by Scrap Incremental and Faith Incremental for a rolled multiplier item, which is the wrong mental model for a discovered set collectible" },
      { "word": "relics",   "reason": "plural of a banned word" },
      { "word": "tier",     "reason": "Scrap Incremental's named progression system; fine as an internal field, not as a player-facing label" },
      { "word": "artifact", "reason": "a shipping Roblox title collecting 70+ artifacts" },
      { "word": "antique",  "reason": "reStore's signature noun for the same restoration-plus-collection fantasy" },
      { "word": "rebirth",  "reason": "cut from this design; the word would promise a system that does not exist" },
      { "word": "loot",     "reason": "imports the item-fantasy framing this design explicitly avoids" },
      { "word": "treasure", "reason": "same, and it contradicts the mason-and-clerk register of the collection" }
    ]
  }
}
```

## Consequences for other work

- **Meta & Content must rename the collection.** Its 24 names and 4 set labels are checked
  against this list, and the class noun it currently uses is banned. That is a real cost and
  it is the point: the alternative is shipping a word that reads as a clone.
- **Every other string owner is now checkable**: `area.label`, `tiers[].name`,
  `upgrades[].label`, `currency.name` / `.plural`, and every relic name.
- **`upgrades[].blurb` is exempt from the character limit** but not from the ban list. It is
  the only free-prose field a player ever sees.
- **`/` was added to `allowedPattern` on 2026-08-01.** The rule's purpose is that every
  player-facing string be *typeable in the game's character set*, and a solidus is typeable on
  every keyboard this game's audience owns. Excluding it made the collection readout `0 / 24`
  illegal, which is the canonical use and the one string the whole collection is counted in.
  This is a defect in the pattern, not in the string. `—` and `·` were correctly rejected by
  the same rule and both were replaced with `-`. `[cid: decided]`

## Acceptance criteria

1. Every entry has a word and a stated reason. A ban with no reason cannot be argued with.
2. No player-facing string in the merged manifest matches a banned word.
3. No label except a `blurb` exceeds 14 characters.
4. Every ban either cites a competitor URL or states a design reason from the brief.

## Not decided here

What the collection is called instead (Meta & Content). The register's application to any
particular string (each string's owning domain). Internal field names, which are not
player-facing and are not governed by this list.
