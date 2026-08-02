# 02 — The name field

**Domain:** marketing/name · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**The name field holds `title.value` and nothing else: zero glyphs, zero emoji, zero bracketed
tags, zero genre suffix, ASCII only, at most 28 characters.** The glyph is ruled out on
**occupancy**, not on permission — the platform expressly allows one. **The name changes freely
until first publish and zero times after it**, with three named exceptions.

## Why

**The glyph ruling is the opposite of the prior this domain started with, and the reason is
worth stating plainly.** The platform permits it: *"Decorating the name with one or two
well-placed emojis isn't harmful, but misplaced or excessive decorations can confuse players who
quickly want to identify the game"*
`[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`.
So permission is granted and the ruling cannot rest on it. What rules it out is that **the glyph
is this family's uniform.** `[🌱] Grass Incremental Simulator`, `Scrap Incremental 🧲` and
`[UPDT🍂] Leaves Incremental 🍂` all wear one, across at least two studios shipping a shared
marketing sentence `[research: research/landscape.md]`. Wearing it puts this title visually
**inside** the category `CONCEPT.md` deliberately moved the game out of — *"a restoration /
completion game, not an incremental"* `[brief: binding]` — at the cost the brief already paid.
A glyph is the cheapest possible signal that this is the fourth `X Incremental`, and the one
thing this project cannot afford to signal. `[cid: decided]`

**I am not leaning on `allowedPattern` and say so.** `vocabulary.allowedPattern`
`^[A-Za-z0-9 ,.'%%/-]+$` would reject an emoji, and ruling **M-B** rules it does not reach an
outward string. The ASCII-only rule below is derived independently, from the same page's
identification argument and from the fact that a non-ASCII character is not typeable by a player
trying to search the name they remember.

**Title tags are absent, permanently, and named in order to forbid them.** `[UPDATE]`, `[NEW]`,
`[X2]`, `[2X]`, `[UPD]`, `[CODES]`, `[🎃]` and every sibling: zero, forever. Four independent
closures. *"Ships and settles. No seasons or events"* `[brief: soft]` leaves nothing to tag.
`03-META.md` priority 3 forbids seasons and events as a hard gate, and `theme/setting/03`'s
consequence is that *"there is no hour, weather or season channel to run anything through"* —
so a seasonal tag has nothing to attach to. `[X2]` and `[CODES]` are additionally false claims
under `T10` and `T4`. And the platform's own guidance closes the habit at the root:
*"Avoid spamming — Frequent repetition of words or phrases may result in demotion of your game"*
and *"Keep the name consistent — Renaming a game too often reduces the chances that players can
find it using a previous name"*
`[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`.
**Every tag is a rename.** A studio that ships `[UPDATE]` on Monday and strips it on Friday has
renamed twice. `[cid: decided]`

**The character bound, and what I refuse to invent.** The Roblox experience name field's own
character limit is **`[unverified]`**. Four fetches carried no figure — the publishing page, the
discovery page and two Open Cloud endpoint indexes — and a devforum thread reports a
Studio-versus-website discrepancy **with no numbers**
`[research: https://devforum.roblox.com/t/experience-title-and-description-too-long-in-studio-game-settings-but-not-on-the-website/2499228]`.
**The settling fetch, named exactly:** the Open Cloud v2 request-body reference for
`PATCH /cloud/v2/universes/{universeId}`, which is where a `displayName` `maxLength` would be
documented if one is; failing that, the Creator Dashboard Basic Settings form's own validation
message, which is a UI reading and not a fetch.

**So the applied bound is derived from shipped titles, not from the field.** Every competitor
title in `research/landscape.md` is under 30 characters — `Scrap Incremental 🧲` 20,
`Grass Incremental Simulator` 27, `Lumber Incremental Simulator` 28, `[UPDT🍂] Leaves Incremental 🍂`
28. **`maxTitleChars` is 28**, the longest of them, because a title the length of the longest
shipping title in the family demonstrably renders. The field limit is therefore almost certainly
not the binding constraint; **tile legibility at phone size is**, and nobody in this project has
measured it `[playtest unknown]`, starting value 28, test range `[16, 30]`. The measurement that
settles it: render the ratified string in the platform's smallest experience tile at a 360-px
logical width and check it does not truncate or wrap past two lines. The recommendation is 17
characters, which has 11 characters of headroom against the bound and does not depend on the
measurement landing anywhere in particular.

**`maxLabelChars` 14 does not reach here and this sheet does not use it.**
`crossCuttingProblems()` applies it only over the ten contract paths `playerFacingStrings()`
walks, every one a `GuiObject` string inside `game/src`
`[research: bridge/schema.mjs, read this run]`. `theme/vocabulary/01` exempts the title by name;
`art/ui-art/01` states *"`meta.sourceTitle` is never rendered, so `vocabulary`'s 14-character
ceiling and casing rule do not bind it"*. The confirming tell: the shipped starting value
`"Ruin Restoration"` is **16 characters** and merged without a violation.

**The rename policy is where the sourced cost actually bites.** Before first publish the name is
free to change and an alternate is promoted by editing one field. After first publish it is
fixed: `renamesAfterPublish: 0`, because the platform states the cost directly and this project
has no acquisition budget to spend re-earning discovery it gave away. Three exceptions, each
externally forced rather than chosen: a post-publish exact-match collision discovered by
`01`'s owed search, a platform moderation requirement, and a factual falsity in the name itself.
`[cid: decided]`

**Casing is a listing decision and I make it.** `theme/vocabulary/01`: *"Uppercase in a store
listing is a listing decision."* Title case, no all-caps word, no all-lowercase stylisation.
`reStore`'s intercapped stylisation is a shipping competitor's signature
`[research: https://www.roblox.com/games/87179205054038/reStore]`, which is a second reason
beyond legibility.

```json
{
  "amends": "title",
  "value": {
    "field": {
      "platform": "Roblox experience name",
      "holds": "title.value, verbatim, and nothing appended or prepended",
      "maxTitleChars": 28,
      "maxTitleCharsDerivation": "the longest shipping title in research/landscape.md (Lumber Incremental Simulator, 28). Not the platform field limit, which is unverified.",
      "maxWords": 4,
      "casing": "title",
      "charset": "ASCII printable, letters digits spaces and the apostrophe only",
      "operativeBound": {
        "what": "legibility on an experience tile at phone size",
        "measured": false,
        "startingValue": 28,
        "testRange": [16, 30],
        "measurement": "render the ratified string in the smallest experience tile at 360 px logical width; it must not truncate and must not wrap past two lines",
        "status": "playtest unknown"
      },
      "platformFieldLimit": {
        "value": "unverified",
        "attempts": "four fetches: the publishing page, the discovery page, and two Open Cloud endpoint indexes; plus a devforum thread reporting a Studio-versus-website discrepancy with no numbers",
        "settlingFetch": "the Open Cloud v2 request-body reference for PATCH /cloud/v2/universes/{universeId}, for a displayName maxLength",
        "fallbackReading": "the Creator Dashboard Basic Settings validation message, a UI reading and not a fetch",
        "materiality": "low: every shipping title in the family is under 30 characters, so legibility binds before the field does"
      }
    },
    "forbiddenInTheNameField": [
      { "id": "X1", "thing": "any emoji or pictographic glyph", "count": 0, "examples": ["🌱", "🍂", "🧲", "✨", "🎃"], "ruledOn": "occupancy, not permission: the platform allows one or two, and three shipping family titles wear one", "check": "the name field matches ^[A-Za-z0-9 ']+$" },
      { "id": "X2", "thing": "any bracketed prefix or suffix", "count": 0, "examples": ["[UPDATE]", "[NEW]", "[UPD]", "[X2]", "[2X]", "[CODES]", "[UPDT🍂]"], "ruledOn": "ships and settles; priority 3; T4; T10; and every tag is a rename", "check": "the name field contains no [ ] ( ) { } or |" },
      { "id": "X3", "thing": "a trailing genre suffix", "count": 0, "examples": ["Simulator", "Incremental", "Tycoon", "Obby", "RNG"], "ruledOn": "HANDOFF.md #1 and CONCEPT.md's binding positioning", "check": "the name field ends with none of these five words" },
      { "id": "X4", "thing": "any non-ASCII character", "count": 0, "examples": ["—", "·", "’", "é", "★"], "ruledOn": "a character a player cannot type is a character they cannot search", "check": "every code point in the name field is below 128" },
      { "id": "X5", "thing": "an exclamation mark or any terminal punctuation", "count": 0, "ruledOn": "theme/tone/02's humor and register ban names store copy by name, [brief: binding]", "check": "the name field contains no ! ? . : or ;" },
      { "id": "X6", "thing": "an all-caps or all-lowercase stylisation", "count": 0, "examples": ["STONE UNDER GREEN", "reStore"], "ruledOn": "a listing decision, per theme/vocabulary/01; reStore's intercapping is a shipping competitor's signature", "check": "every word in the name field starts uppercase and continues lowercase" },
      { "id": "X7", "thing": "a leading, trailing or doubled space", "count": 0, "ruledOn": "avoid spamming; a padded name sorts and searches unpredictably", "check": "the name field equals its own trimmed value and contains no two consecutive spaces" },
      { "id": "X8", "thing": "any vocabulary.bannedWords entry", "count": 0, "words": ["relic", "relics", "tier", "artifact", "antique", "rebirth", "loot", "treasure"], "ruledOn": "category ruling M-B: bannedWords binds every outward string", "check": "case-insensitive substring test against all eight" },
      { "id": "X9", "thing": "a seasonal, event or holiday variant of the name", "count": 0, "ruledOn": "03-META.md priority 3, a hard gate; theme/setting/03 leaves no season channel to attach one to", "check": "the name field has exactly one value across the life of the experience, subject to the rename policy below" }
    ],
    "changePolicy": {
      "freeUntil": "firstPublish",
      "beforeFirstPublish": "unlimited; promoting an alternate edits title.value only",
      "renamesAfterPublish": 0,
      "renameCost": "Renaming a game too often reduces the chances that players can find it using a previous name",
      "renameCostSource": "https://create.roblox.com/docs/production/publishing/publish-experiences-and-places",
      "whyZero": "00-CORE.md declines acquisition as a goal, so this project has no budget to re-earn discovery it gave away; and a rename with no campaign behind it is a pure loss",
      "permittedTriggers": [
        { "id": "R1", "trigger": "01's owed exact-match search returns a shipping experience with the same name after publish", "action": "promote the next alternate in title.alternates" },
        { "id": "R2", "trigger": "a platform moderation action requires a change", "action": "promote the next alternate in title.alternates" },
        { "id": "R3", "trigger": "the name states something the game does not do", "action": "revision against sheet 01, not a free rewrite" }
      ],
      "forbiddenTriggers": ["a marketing push", "an update", "a multiplier promotion", "a season", "a low visit count", "a thumbnail refresh"]
    },
    "namesNotDecidedHere": {
      "titleString": "sheet 01",
      "tagline": "sheet 03",
      "descriptionAndTags": "store-listing work"
    }
  }
}
```

## Consequences for other work

- **Hype work** may not announce anything by changing the name. `[UPDATE]` is the one launch
  device this genre reaches for and it is closed here, so a publish moment that wants an outward
  signal needs a surface that is not the name field.
- **Store-listing work** inherits `X1`-`X9` as the filter on the *name only*. This sheet rules
  nothing about the description, which may be longer, may use a glyph if that lead decides so on
  its own evidence, and is bound by `bannedWords` either way.
- **Store-icon and thumbnail work** get a hard fact: the name will never carry a glyph, a tag or
  a colour, so **every visual signal in the tile is the icon's**. Nothing shares that load.
- **Publish-checklist work (`release`)** gains a name-field read-back at publish time: the field
  equals `title.value` and matches `^[A-Za-z0-9 ']{1,28}$`. It is one row and this sheet does not
  add it to their key.
- **Live Ops work**, running this wave, gets a boundary rather than a request: whatever cadence
  it rules, no cadence reaches the name field, because `renamesAfterPublish` is 0.

## Acceptance criteria

1. The Roblox experience name field's value equals `title.value`, matches
   `^[A-Za-z0-9 ']{1,28}$`, and contains at most four whitespace-separated words.
2. The name field contains zero occurrences of `[`, `]`, `!`, any emoji code point, and any of
   `Simulator`, `Incremental`, `Tycoon`, `Obby`, `RNG` as a trailing word.
3. `title.changePolicy.renamesAfterPublish` is `0` and `permittedTriggers` has exactly three
   entries, each naming an external forcing condition rather than a marketing choice.
4. `title.field.platformFieldLimit.value` is the string `"unverified"` and
   `settlingFetch` names a specific endpoint reference, not a number.

## Not decided here

The string itself, the candidate set and the alternates: sheet `01`, which carries the `title`
manifest. Whether a tagline exists: sheet `03`. Every rule on the *description* field — its
length, structure, glyphs and tags: store-listing work. Whether the publish checklist gains a
name read-back row and where it sits in the provisioning order: publish-checklist work, which
holds `release`. The actual platform field limit, which is `[unverified]` and needs one fetch.
Whether tile legibility at 28 characters holds, which is a measurement nobody has made.
