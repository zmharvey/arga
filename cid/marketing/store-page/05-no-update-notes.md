# 05 — No update notes

**Domain:** marketing/store-page · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**No update notes are published, no surface holds them, and the cadence is `none` — but the entry
shape is fixed at zero entries, so the first note, if one is ever owed, cannot invent its own
form.** Thirteen things a notes format invites are forbidden by name, each with a grep.

## Why

**The closing lines, and one of them is not what the assignment assumed.** *"Ships and settles. No
seasons or events"* `OPEN.md §2` `[brief: soft]` ← `[I assumed — batched]`, constrained from above
by `03-META.md` priority 3 which excludes seasons and events hard. `endgame` is `unlimited: true`
and unchanging, so there is nothing to announce there. `release` defines a version stream and no
update stream. `theme/tone/02` already extends the humor ban to *"changelogs, patch notes"*
`[cid: decided]` — **the format has a register before it has a surface.**

**Live Ops ran in this same wave and ruled, so I state its answer rather than my assumption of it.**
`roadmap` exists, `dropCount` is **1**, `cadence.value` is `"none"`, `ordering.dated` is `false`,
and its consequence line to this domain is verbatim: *"Your input is: one drop, no cadence, no
dates, and nothing announceable inside the game. No title-tag stem is invented here"*
`[research: cid/liveops/roadmap/01-what-ships-after-v1.md]`. **I own only the format. Live Ops owns
whether there is anything in an update; Hype owns whether anything is said outside the game.** I
resolve neither.

**Why the format is not `none`, which is the answer that would have been easier to write.**
`roadmap.dropCount` is **1**, not 0. `format: "none"` would be false the day D1 ships, and the
person writing that first note would invent a form under time pressure. **That is not hypothetical
in this genre**: Leaves Incremental's live description ships `USE CODE: RELEASE`
`[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]` and both fetched
competitors ship group-join-for-boosts prompts
`[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]` — a code and
a group reward, both priority 3 here, both of them exactly what an unshaped update line reaches
for. **Defining the shape costs one JSON object and forecloses thirteen named failures.** Wave 6's
Music domain is the standard for the count, not for the shape: `trackCount: 0` with the reason and
the check, and here `entryCount: 0` with the same.

**One field in the shape is load-bearing and it is derived, not invented.** `roadmap`'s own D1 row
records that shipping the chunk-variety drop outside its free window discards `cleared` and
`clearedCount` — up to 640 patches, *"one area's patch run"* — and that *"it happens silently
because `notices` has two members and both are beats"*, against *"Cleared is permanent"*
`[brief: binding]` ← `[you chose: R2 Q1]`. `R-F11` forbids the game saying it happened, and
`release.shutdown.playerFacing` is `"nothing"`. **So an update-notes entry is the only surface in
this entire project that could ever tell a player why their ground came back.** That is why the
shape carries a required `playerVisibleCost` field, and why the reopening condition is written
against `storeMigration.shippedToPlayers` rather than against a calendar.

**The reopening condition, stated as a condition rather than a wish.** A note becomes owed when
**both** are true: `roadmap.drops[0].shipped` is true, **and**
`storeMigration.shippedToPlayers` was true at the moment it shipped — i.e. D1 shipped outside
window `w1`, so a real player lost cleared ground. Inside `w1` no save exists and nobody lost
anything, so no note is owed and `entryCount` stays 0. A price move, a code hotfix, an art swap or
a balance change is **not** a note: `roadmap.notADrop` `X1`, `X3`, `X5`, `X7` say so, and none of
them is player-visible.

**No title-tag stem is reserved.** `[UPDATE]`, `[NEW]`, `[X2]` and the bracketed-glyph form are the
`Simulation / Incremental Simulator` family's own tic — Leaves Incremental ships `[UPDT🍂]` in its
title. Reserving a stem here would hold a slot open for a thing priority 3 forbids, which the
category brief names as the non-compliant form. **The title is Name's and I name no stem**;
`roadmap` explicitly declined to invent one too, so nobody has.

| id | forbidden in any update note or notes section | observable |
|---|---|---|
| `U1` | the phrase `new update`, or `update` as a heading | `grep -in "new update"` over `storeListing` returns 0; `headingsRendered` is 0 |
| `U2` | `season`, `season 1`, `chapter`, `act`, `phase`, `wave` | 0 case-insensitive matches; `03-META.md` priority 3; `liveops/seasons` ruled no season structure |
| `U3` | `event`, `this weekend`, `limited time`, `live now` | 0 matches; `liveops/events` ruled no event exists |
| `U4` | any code, and the words `code`, `redeem`, `promo` | 0 matches; priority 3; `liveops/codes` ruled no redemption path; `F15` |
| `U5` | `join the group`, `Discord`, an invite, or any off-platform link | 0 matches; `channels` is an empty set; a social link is visible only to 16+ verified accounts against an 8–14 audience |
| `U6` | `come back`, `tomorrow`, `daily`, `login`, `streak`, `claim` | 0 matches; `T9`; no offline accrual and no daily reward |
| `U7` | any date, ISO timestamp, month, day name, week or quarter | `roadmap.ordering.containsNoDate` holds for this key too; 0 matches for `/\d{4}-\d{2}|january|monday|q[1-4]/i` |
| `U8` | a version number shown outward | `release` owns version and it is developer-facing; 0 matches for `/v\d|version \d/i` |
| `U9` | a title tag: `[UPDATE]`, `[NEW]`, `[X2]`, `[UPDT]`, or a bracketed glyph | `titleTagStem` is the string `"none"`; the title contains no `[` |
| `U10` | `!` anywhere in an entry | 0 `!` characters; the humor ban and the 8–14 register |
| `U11` | a roadmap, a teaser, `coming soon`, `next up`, `what's next` | 0 matches; `roadmap.ordering.dated` is false and `00-CORE.md` declines players |
| `U12` | an apology, a known-issues list, or a maintenance or downtime notice | 0 matches; `release.forbidden[N8]` — no permitted surface exists to explain one |
| `U13` | any claim that a drop added something to find, an area, a set or a product | 0 matches; `roadmap` `G1`, `G2`, `G4`; `T1`, `T3` |

```manifest
{
  "amends": "storeListing",
  "value": {
    "updateNotes": {
      "published": false,
      "entryCount": 0,
      "entries": [],
      "surface": "none",
      "cadence": "none",
      "intervalDays": 0,
      "titleTagStem": "none",
      "titleTagStemReason": "reserving [UPDATE] or a bracketed glyph would hold a slot open for a thing priority 3 forbids, and the bracketed-glyph title is the Incremental Simulator family's own tic. The title is marketing/name's; roadmap also declined to invent a stem, so nobody has.",
      "reason": "OPEN.md section 2 'Ships and settles. No seasons or events.' [brief: soft], constrained from above by 03-META.md priority 3 which excludes seasons and events hard. endgame is unlimited and unchanging. release defines a version stream and no update stream. roadmap.cadence.value is none and roadmap.dropCount is 1 with the one drop not yet due.",
      "whyAShapeAndNotNone": "roadmap.dropCount is 1, not 0. A format of none would be false the day D1 ships, and the first note would be written under pressure with no form. Two fetched competitors show what an unshaped update line reaches for: a redeem code and a group-join reward, both priority 3 here.",
      "dependencyStatedNotResolved": {
        "whetherThereIsAnythingInAnUpdate": "Live Ops - Roadmap. It ruled: one drop, dateless, cadence none, nothing announceable inside the game.",
        "whetherAnythingIsSaidOutsideTheGame": "Discovery and Marketing - Hype, which owns launchBeats",
        "whatThisKeyOwns": "the format only, if one is ever needed"
      },
      "entryShape": {
        "requiredFields": ["id", "text", "backedBy", "check", "shippedOnVersion", "playerVisibleCost"],
        "id": "sequential, no date component, no season or chapter component",
        "text": "one sentence, at most 20 words, plain ASCII, no exclamation mark, no all-caps word of two or more letters",
        "backedBy": "the roadmap drop id plus the merged key field it moved. Same contract as storeListing.claimRowShape: a row with no resolving backedBy fails T0.",
        "check": "one runnable assertion that the stated change is present in the merged manifest or the repo",
        "shippedOnVersion": "read from release. Developer-facing; never rendered in the note text (U8).",
        "playerVisibleCost": "what a player lost, stated plainly, or the string none. This field exists because roadmap's D1 discards cleared and clearedCount and records that it happens silently: notices has two members and both are beats, R-F11 forbids the game saying it happened, and release.shutdown.playerFacing is nothing. An update note is the only surface in this project that could ever say why a player's ground came back.",
        "boundBy": ["vocabulary.bannedWords (ruling M-B)", "theme/tone/02 humor ban, which names changelogs and patch notes", "storeListing.updateNotes.forbidden U1 to U13", "T1 to T10"],
        "notBoundBy": ["vocabulary.maxLabelChars", "vocabulary.casing", "vocabulary.maxSentenceWords", "vocabulary.allowedPattern"]
      },
      "reopeningCondition": {
        "aNoteBecomesOwedWhen": "roadmap.drops[0].shipped is true AND storeMigration.shippedToPlayers was true at the moment it shipped",
        "meaning": "D1 shipped outside window w1, so at least one real player lost cleared ground against a binding permanence promise, and no in-game surface may say why",
        "insideW1NoNoteIsOwed": "storeMigration.shippedToPlayers is false, so no save exists and nobody lost anything. entryCount stays 0.",
        "insideW2NoNoteIsOwed": "area-layout work has made the draw stable, so nothing is discarded",
        "notATrigger": ["a price move inside products' published range (roadmap X1)", "a code hotfix (X3)", "any balance value (X5)", "an art asset swap at constant instance count (X7)", "a store-name bump on its own (X2)"],
        "notATriggerReason": "none of them is player-visible, and roadmap.notADrop already rules each is not a drop"
      },
      "forbidden": [
        { "id": "U1",  "rule": "the phrase 'new update', or 'update' used as a heading",                       "check": "grep -in 'new update' over storeListing returns 0; headingsRendered is 0",                         "closedBy": "roadmap.cadence none; 00-CORE.md non-goals" },
        { "id": "U2",  "rule": "season, season 1, chapter, act, phase, wave",                                  "check": "0 case-insensitive matches for /season|chapter|\\bact\\b|phase/",                                    "closedBy": "03-META.md priority 3; liveops/seasons ruled no season structure" },
        { "id": "U3",  "rule": "event, this weekend, limited time, live now",                                  "check": "0 case-insensitive matches for /event|this weekend|limited time|live now/",                          "closedBy": "03-META.md priority 3; liveops/events ruled no event exists" },
        { "id": "U4",  "rule": "any code, and the words code, redeem, promo",                                  "check": "0 case-insensitive matches for /\\bcode\\b|redeem|promo/",                                           "closedBy": "03-META.md priority 3; liveops/codes ruled no redemption path; products F15. Leaves Incremental ships USE CODE: RELEASE" },
        { "id": "U5",  "rule": "join the group, Discord, an invite, or any off-platform link",                 "check": "0 case-insensitive matches for /group|discord|invite|https?:/",                                     "closedBy": "channels is an empty set; a social link is visible only to 16+ verified accounts and the audience is 8-14. Both fetched competitors ship a group-join prompt" },
        { "id": "U6",  "rule": "come back, tomorrow, daily, login, streak, claim",                             "check": "0 case-insensitive matches for /come back|tomorrow|daily|log ?in|streak|claim/",                     "closedBy": "T9; 03-META.md's honest weakness; no offline accrual and no daily reward" },
        { "id": "U7",  "rule": "any date, ISO timestamp, month, day name, week or quarter",                    "check": "0 matches for /\\d{4}-\\d{2}|january|february|monday|tuesday|q[1-4]\\b|week \\d/i",                   "closedBy": "roadmap.ordering.dated is false and containsNoDate holds for this key too" },
        { "id": "U8",  "rule": "a version number shown outward",                                               "check": "0 matches for /\\bv\\d|version \\d/i in any entry text",                                             "closedBy": "release owns version identity and it is developer-facing" },
        { "id": "U9",  "rule": "a title tag: [UPDATE], [NEW], [X2], [UPDT], or a bracketed glyph",             "check": "titleTagStem is the string 'none'; title contains no '[' character",                                "closedBy": "03-META.md priority 3 leaves nothing to tag; the bracketed glyph is the Incremental Simulator family's tic; roadmap declined to invent a stem" },
        { "id": "U10", "rule": "an exclamation mark anywhere in an entry",                                     "check": "0 '!' characters in any entry text",                                                                "closedBy": "theme/tone/02's humor ban, which names changelogs and patch notes; the 8-14 register" },
        { "id": "U11", "rule": "a roadmap, a teaser, coming soon, next up, what's next",                       "check": "0 case-insensitive matches for /coming soon|next up|what.s next|teaser|roadmap/",                    "closedBy": "roadmap.ordering.dated false; 00-CORE.md declines players as a success measure" },
        { "id": "U12", "rule": "an apology, a known-issues list, or a maintenance or downtime notice",         "check": "0 case-insensitive matches for /sorry|apolog|known issue|maintenance|downtime|outage/",             "closedBy": "release.forbidden N8 - no permitted surface exists to explain one" },
        { "id": "U13", "rule": "any claim that a drop added something to find, an area, a set or a product",   "check": "0 case-insensitive matches for /new (find|area|set|pass|item)|more to find|added .* set/",          "closedBy": "roadmap G1, G2 and G4; T1 and T3; ruling R-3" }
      ],
      "emitter": "none. Nothing writes an update note, and release.publishChecklist covers place settings only.",
      "proposesNoKeyOfItsOwn": true
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Description work (sheet 01) | `E12` holds: the description has **no** update, changelog, patch-notes or roadmap section, and no slot is held open for one. That is what makes `U1` checkable rather than aspirational. |
| Naming work (`title`) | **No title-tag stem is reserved here.** `U9` forbids `[UPDATE]`, `[NEW]`, `[X2]` and the bracketed-glyph form outright, and `roadmap` also declined to name one. If you rule that title tags are ever used, this sheet is wrong and must be revised, not quietly widened. |
| Hype work (`launchBeats`) | The publish moment has no notes entry attached to it: `entryCount` is 0 at gate 6. **If you rule the publish is announced outwardly, that is a beat, not a note**, and it lands in your key, not this one. |
| Live Ops — Roadmap | `reopeningCondition` reads three of your fields — `drops[0].shipped`, `storeMigration.shippedToPlayers`, and the `w1`/`w2` windows. **If D1 ships inside `w1`, no note is ever owed and this key stays at zero forever.** That is one more reason to take the free window. |
| Persistence work (`storeMigration`) | `shippedToPlayers` is the field this key's reopening condition turns on. It is currently the only thing standing between "D1 costs nobody anything" and "a binding permanence promise is broken with no surface to explain it." |
| Contract-and-seam work | `storeListing.updateNotes.entries` must validate as an array, `entryCount == len(entries)`, and every future entry against `entryShape.requiredFields`. `titleTagStem` is the string `"none"`, not `null` — `tech/deploy/02` makes an emitted null a hard error. |

## Acceptance criteria

1. `storeListing.updateNotes.entryCount` is `0`, `entries` is `[]`, `published` is `false`,
   `cadence` is `"none"`, and `titleTagStem` is the string `"none"`. No field in this key is `null`.
2. `forbidden` holds **13** rows, each with a non-empty `check`; running all thirteen over the whole
   of `storeListing` returns **0** violations today.
3. `entryShape.requiredFields` contains `playerVisibleCost`, and `reopeningCondition` names both
   `roadmap.drops[0].shipped` and `storeMigration.shippedToPlayers`.
4. `grep -rin "update\|changelog\|patch note\|season\|roadmap\|coming soon" ` over
   `storeListing.description` and `storeListing.passListing.description` returns **0** matches.

## Not decided here

**This sheet proposes no key of its own; it amends `storeListing.updateNotes`, which sheet 01
carries.** Whether there is anything in an update at all, what a drop contains, and when it ships
(Live Ops — Roadmap, which holds `roadmap`). Whether anything is said outside the game when the
experience publishes (Hype, which holds `launchBeats`). The experience name and whether title tags
are ever used (Name, which holds `title`). Every line of the description and the claim ledger
(sheet **01**). The genre and keywords (sheet **02**). The content-maturity answers (sheet **03**).
Every outward string about `Span` (sheet **04**). Version identity, the publish checklist and the
shutdown surface (`release`). Whether `storeMigration.shippedToPlayers` is true at the moment D1
ships (persistence work and the developer, together).
