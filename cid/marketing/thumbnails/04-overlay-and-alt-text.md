# 04 — Overlay and alt text

**Domain:** marketing/thumbnails · **Category:** Discovery & Marketing · **Wave:** 7

> **Revised, round 2.** One field. `uploadStep` named `release.publishChecklist` row `P5`; a
> requester does not assign a checklist id, and three other live requests want a row on the same
> checklist. It now names the row without numbering it. No other value moves.

## Decision

**No thumbnail carries overlay text. `overlayText` is the empty string on every slot, now and on
any slot ever added.** **Every slot carries alt text**, one sentence, under a rule derived from the
surface: the platform's own sample string and its metadata exclusion zone, not from `vocabulary`'s
in-game ceilings.

## Why

**The platform permits only one kind of overlay and this surface has no use for it.** *"Overlay
text sparingly and only to describe gameplay contexts such as 'Collect coins to boost jumps.' Do
not include any text, visuals, or audio that is an advertisement, promotion, or subjective claim"*
`[research: https://create.roblox.com/docs/production/publishing/thumbnails]`. So the only legal
overlay is a gameplay description, and a gameplay description is what the experience description
field is, which `storeListing` owns and renders next to the image at full reading size. **Drawing
the same sentence into pixels buys nothing and costs a re-capture whenever it changes.**

**Three further closures, none of them taste.** The game has no name: `OPEN.md §3` reserves it,
`title` is unratified this wave, and `M4` records that the brief both reserves and routes it, so
any overlay containing the title depends on a key that does not exist. `theme/tone/02`'s humor ban
reaches thumbnails **by name** `[brief: binding]`, and the register left is dry and sparse, where a
line drawn on an image is indistinguishable from no line. And the exclusion zone removes the only
natural place to put a caption: *"avoid placing any essential text or elements at the bottom of the
thumbnail, as it may potentially be covered by metadata like the player count"*, same source.

**I will not imitate a convention I could not see.** Whether the games in this family use display
text, arrows or reaction faces is `[unverified]` and stated as such in sheet `01`: images are URLs
to a markdown fetcher, all four ship empty alt text, and the one catalogue page returned 402 on
both hosts. **A zero decided against an unverified convention is honest; a big caption copied from
a convention nobody confirmed is not.**

**Alt text is the opposite call, and the evidence is the same table.** Zero of the four surveyed
games ship any alt text, against a platform feature that exists — *"uploaded thumbnails appear in
the Experience Detail Page tab where they can be reordered, deleted, or given 'alt' text for
improved accessibility"* — and an audience band with a binding accessibility constraint (*"8–14"*
`[brief: binding]`, and `theme/tone/01` cites *"35% of age-checked daily users are under 13"*).
**It is the cheapest available difference in this genre and nobody takes it.** `N7` records that
alt text has no owner and no register rule; this sheet gives it one.

**The ceiling is derived from the surface, as ruling `M-B` requires, and the derivation is the
platform's own sentence.** `maxLabelChars` 14 comes from a grid cell at phone size and an image has
no grid cell; `M-B` exempts it, `casing`, `maxSentenceWords`, `allowedPattern` and `theme/tone/01`
`P1`–`P9` from outward strings. So: the platform's sample overlay, *"Collect coins to boost
jumps."*, is **5 words and 29 characters**. The ceiling is **6 words and 34 characters**, one word
and five characters of headroom over the only example the platform publishes. `[cid: decided]`

**What does bind is the ban list, and one rule I adopt rather than inherit.**
`vocabulary.bannedWords` binds every outward string by ruling `M-B`, because four of its eight
entries are banned on the evidence of shipping competitors' listings, and exempting listings from a
list derived from listings inverts its reason. `vocabulary.allowedPattern`
`^[A-Za-z0-9 ,.'%%/-]+$` does **not** bind outward under `M-B` — **I adopt it here anyway**, by my
own ruling, because it is the cheapest mechanical form of the zero-emoji and zero-glyph rule and
because a regex is checkable where *"no decoration"* is not. Stating the adoption is what keeps it
from reading as a contradiction of `M-B`. `[cid: decided]`

**Reading level, as a proxy a machine can run.** Grade 5 is the target, from the audience band
`[brief: binding]` and `theme/tone/01`'s precedent for in-game copy, which `M-B` does not extend
here. Two people can disagree about a grade level, so the checkable form is: **one sentence, at
most 20 words, no word longer than 12 characters.** It is a proxy and this sheet says so.

**The exclusion zone needs a number the platform does not publish.** The guidance is qualitative.
I set the reserved band at **the bottom 15% of image height, 162 px of 1080**, as a stated starting
value.
`[research owed: the pixel height of the metadata overlay on the Roblox experience detail page and
in a sort row, at desktop and at phone width, so the 15% is replaced by a measured figure]`

### What binds an outward string in this domain

| # | rule | value | source |
|---|---|---|---|
| `W1` | overlay word ceiling | 6 words | derived from the platform's sample *"Collect coins to boost jumps."* (5 words) |
| `W2` | overlay character ceiling | 34 characters | same sample (29 characters) plus stated headroom |
| `W3` | alt text length | one sentence, at most 20 words | `[cid: decided]`, proxy for grade 5 |
| `W4` | longest permitted word | 12 characters | `[cid: decided]`, proxy for grade 5 |
| `W5` | banned words | `relic relics tier artifact antique rebirth loot treasure` | `vocabulary.bannedWords`, binding outward by ruling `M-B` |
| `W6` | permitted characters | `^[A-Za-z0-9 ,.'%%/-]+$` | `vocabulary.allowedPattern`, **adopted here**, not inherited (`M-B` exempts it) |
| `W7` | bottom exclusion band | 15% of height, 162 px of 1080 | platform guidance, no published figure; `[research owed:]` above |
| `W8` | casing | sentence case; no word in full capitals | `[cid: decided]`. `M-B` frees casing outward, and shouting is the genre's tic |

### Forbidden in any overlay or alt text string

| id | forbidden | source |
|---|---|---|
| `B1` | any of the eight `bannedWords`, in any casing or plural | `vocabulary.bannedWords`, `M-B` |
| `B2` | any character outside `W6`, including every emoji, `[🌱]`, `🧲`, `🍂`, `!`, `?`, `#`, `*`, `&`, `+` | `W6` |
| `B3` | urgency, scarcity, a countdown, *limited*, *ends*, *today only*, *last chance*, a discount or a stock count | `T10`; platform guidance against *"a false sense of urgency"* and *"artificial scarcity"* |
| `B4` | any volume claim above **24** finds, **4** sets, **8** areas or **1** product, and any unbounded quantity word: *tons*, *hundreds*, *loads*, *endless*, *infinite* | `T3`; `collection`; `depths`; `products.itemCount` |
| `B5` | *endless*, *new*, *more* or *ongoing* applied to things to find | `T1`; `endgame.postTerminalArea.buriesFinds: 0`; `theme/fantasy/02` |
| `B6` | any claim that the world ends up restored, reclaimed, finished or saved | `T2`; `theme/fantasy/02` |
| `B7` | *rebirth*, *prestige*, *offline*, *afk*, *idle earnings*, *daily*, *codes*, *leaderboard*, *trade*, *season*, *event* | `T4`; `03-META.md` priority 3 |
| `B8` | *co-op*, *with friends*, *team*, *compete*, *versus*, *race* | `T5`; `CONCEPT.md` *"no interaction"* |
| `B9` | any word naming a Find as an object: *treasure*, *loot*, *chest*, *drop*, *item*, *card* | `T6`; `representation.find`; three of these are in `W5` already |
| `B10` | any return-pull claim the design gave up: *come back*, *keep earning*, *while you are away*, *do not lose your progress* | `T9`; `01-FOUNDATION.md` *"No offline accumulation"* |
| `B11` | a subjective claim: *best*, *amazing*, *insane*, *crazy*, *#1*, *trending*, *the ultimate* | the platform's own words: *"an advertisement, promotion, or subjective claim"* |
| `B12` | a call to action: *play now*, *click*, *tap*, *join*, *like and favourite*, *follow* | platform, same clause; `F15` forbids the in-game twin |
| `B13` | a joke, a pun, a wink or an ironic line | `theme/tone/02` `[brief: binding]`, which names thumbnails |
| `B14` | a price, a Robux figure, or any mention of `Span` or a pass | `T7`; ruling `R-4` (`products.storeExists: false`) |
| `B15` | the game's name, in any string in this domain | `title` is unratified; `OPEN.md §3` reserves it. Stated so nothing here blocks on it. |

```json
{
  "amends": "storeThumbnails",
  "path": "overlayRule",
  "value": {
    "anySlotCarriesOverlayText": false,
    "overlayTextValueOnEverySlot": "",
    "reasons": [
      "the platform permits overlay 'only to describe gameplay contexts', which is what the experience description field already is, rendered beside the image at full reading size",
      "the game has no ratified name, so any overlay containing a title depends on title, which OPEN.md 3 reserves to the developer",
      "theme/tone/02's humor ban reaches thumbnails by name [brief: binding], and the remaining register is dry and sparse",
      "the platform's own bottom exclusion zone removes the natural place for a caption",
      "what the genre's own thumbnails depict is [unverified], so there is no confirmed convention to match"
    ],
    "reopenCondition": "a measured reading that the image is unreadable as a claim without text, or a developer decision to pursue acquisition, which reopens 00-CORE.md's declined non-goals first",
    "ruleIfEverReopened": {
      "maxWords": 6,
      "maxChars": 34,
      "derivation": "the platform's own sample overlay 'Collect coins to boost jumps.' is 5 words and 29 characters. One word and five characters of headroom. Derived from the surface, not from vocabulary.maxLabelChars, which is a grid cell at phone size and is exempted outward by ruling M-B.",
      "casing": "sentence case; no word in full capitals",
      "readingLevelTarget": "grade 5",
      "readingLevelCheckableProxy": "one sentence, at most 20 words, no word longer than 12 characters",
      "bannedWordsBind": true,
      "bannedWordsSource": "vocabulary.bannedWords, binding outward by ruling M-B",
      "allowedPatternAdopted": "^[A-Za-z0-9 ,.'%%/-]+$",
      "allowedPatternIsAdoptedNotInherited": "ruling M-B exempts allowedPattern from outward strings. This sheet adopts it anyway, as the cheapest mechanical form of the zero-emoji and zero-glyph rule.",
      "forbiddenClasses": ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15"]
    },
    "exclusionZone": {
      "edge": "bottom",
      "fractionOfHeight": 0.15,
      "pixelsAt1080": 162,
      "rule": "no essential text or element of the composition falls inside this band on any slot",
      "source": "'avoid placing any essential text or elements at the bottom of the thumbnail, as it may potentially be covered by metadata like the player count'",
      "figureIsAStartingValue": true,
      "researchOwed": "the pixel height of the metadata overlay on the experience detail page and in a sort row, at desktop and at phone width"
    },
    "glyphRuling": {
      "emojiCount": 0,
      "glyphCount": 0,
      "note": "the genre's own tic is a glyph in the name ([U+1F331], [U+1F9F2], [U+1F342], [UPDT]). On a thumbnail it is closed mechanically by the adopted allowedPattern. Whether the title carries one is naming work's ruling, not mine."
    }
  }
}
```

```json
{
  "amends": "storeThumbnails",
  "path": "altTextRule",
  "value": {
    "everySlotCarriesAltText": true,
    "presentCount": "equal to storeThumbnails.count",
    "why": "the platform offers per-thumbnail alt text 'for improved accessibility'; zero of the four surveyed competitors ship any; the audience is 8 to 14 [brief: binding] with 35% of age-checked daily users under 13. It is the cheapest available difference in this genre.",
    "ownerBefore": "none. N7 records that alt text has no owner and no register rule; vocabulary's scope sentence is 'every player-facing string in the build contract' and a thumbnail is not in the build contract.",
    "rule": {
      "sentences": 1,
      "maxWords": 20,
      "maxWordChars": 12,
      "readingLevelTarget": "grade 5",
      "readingLevelCheckableProxy": "maxWords and maxWordChars above, stated as a proxy rather than as a grade measurement",
      "describesOnly": "what is visibly in the frame",
      "makesNoClaim": true,
      "makesNoClaimReason": "an alt text is a description for someone who cannot see the image, not a second pitch. A claim there would be a claim outside the T0 ledger.",
      "bannedWordsBind": true,
      "allowedPatternAdopted": "^[A-Za-z0-9 ,.'%%/-]+$",
      "casing": "sentence case",
      "containsTitle": false,
      "containsTitleReason": "title is unratified (OPEN.md 3, M4), so no string in this domain depends on it and nothing here blocks on wave 7's naming work",
      "forbiddenClasses": ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15"]
    },
    "stringsLiveIn": "storeThumbnails.slots[].altText — sheet 01 writes the strings, this sheet writes the rule they satisfy",
    "uploadStep": "release.publishChecklist, a new row requested by sheet 02 as RR-T1, which pastes altText at upload time. The row's id is release's to assign and is deliberately not named here.",
    "vocabularyScopeQuestion": {
      "finding": "vocabulary's scope sentence does not reach an outward string, yet ruling M-B makes its ban list bind one. The scope sentence is the thing that is wrong, not the ruling.",
      "routedTo": "naming-rule work (theme/vocabulary), which owns the key, and the developer, who may overturn M-B in one line",
      "notFixedHere": true
    }
  }
}
```

## Consequences for other work

- **Store-page work (`storeListing`)** carries every sentence about this game that a stranger
  reads, because the image carries none. The two surfaces do not split the copy; one has all of it.
- **Naming work (`title`)** is unblocked by this sheet rather than blocked: `B15` keeps the game's
  name out of every string in this domain, so no thumbnail waits on a ratification the developer
  holds. It also inherits the glyph question for the title alone, which this sheet does not rule.
- **Naming-rule work (`theme/vocabulary`)** receives one finding: its scope sentence excludes
  outward strings while ruling `M-B` makes its ban list bind them. Widening the sentence is that
  key's call, not mine, and `M-B` stands until it or the developer moves.
- **Icon work (`storeIcon`)** may adopt `W1`–`W8` and `B1`–`B15` by citation if it decides an icon
  carries a word. It should not write a second ceiling from a different derivation.
- **Publish-checklist work (`release`)** pastes `altText` at upload. It is one field per slot and
  it is in `RR-T1`'s read-back. **`release` assigns that row's id; this domain does not.**

## Acceptance criteria

1. Every `storeThumbnails.slots[].overlayText` is the empty string, and
   `overlayRule.anySlotCarriesOverlayText` is `false`.
2. Every `storeThumbnails.slots[].altText` is non-empty, is one sentence of at most 20 words with
   no word longer than 12 characters, matches `^[A-Za-z0-9 ,.'%/-]+$` when read as a JavaScript
   regex, contains no member of `vocabulary.bannedWords` in any casing, contains no `!`, `?`, `#`
   or emoji, and contains no word in full capitals.
3. `overlayRule.exclusionZone.fractionOfHeight` is `0.15` (162 px of 1080) and no slot's
   `composition` places a required element inside that band.
4. `overlayRule.ruleIfEverReopened.forbiddenClasses` and `altTextRule.rule.forbiddenClasses` each
   list all **15** ids `B1`–`B15`, and every id resolves to a row in this sheet's table.

## Not decided here

The two strings themselves: **sheet `01`**, which holds the key; this sheet writes the rule they
satisfy and neither writes nor edits a string. The slot count, the claim ledger and the file path:
**sheet `01`**. What makes the capture legitimate: **sheet `02`**. What the image depicts:
**sheet `03`**. Every line of description copy, the tag set, the pass listing and whether the word
*relaxing* is claimed: **Store Page work (`storeListing`)**, which `theme/tone/01` explicitly frees
from the in-game register. The game's name, its length bound and whether it carries a glyph:
**naming work (`title`)**. Whether `vocabulary`'s scope sentence is widened to cover outward
strings, and whether ruling `M-B` stands: **naming-rule work and the developer**. Any string on an
icon: **Icon work**, which may cite these rules and should not derive a second set. **Which id the
upload row gets on `release.publishChecklist`: `release`**, which composes four live requests
against one checklist. The measured height of the platform's metadata overlay: `[research owed:]`,
named above, and until it lands the 15% band is a stated starting value rather than a sourced one.
