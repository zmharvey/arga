# 03 — No subject for the second half

**Domain:** marketing/thumbnails · **Category:** Discovery & Marketing · **Wave:** 7

> **Revised, round 1** (`cid/marketing/_verified.md`). No request was filed against this sheet.
> Two things carried in from `01`'s `RR-2` fix. **(a)** This sheet spelled the reveal beat
> `effects.beats[...]` in four places; **`effects` holds `cues[]`, keyed by `.id`, and `beats[]`
> belongs to `response`**, so the old spelling named a collection that exists in neither key. It
> now reads `effects.cues[id=findReveal]` throughout and is registered in
> `storeThumbnails.externalPathsResolved` with its `correctedFrom`. **(b)** Criterion 1 asserted a
> grep over `cid/marketing` that could only pass if this domain's `_lead.md` were edited, which was
> **not a file this writer could write at the time**. A criterion that can only be satisfied by
> editing someone else's file is a request wearing a criterion; it is restated over this key's own
> fields, and the stale spelling elsewhere became `staleSpellingElsewhere` with an observable its
> owner can run.
>
> **Round 2:** the round-2 assignment put this domain's index in scope, the two stale prose
> occurrences in `_lead.md` were corrected there, and `staleSpellingElsewhere` is now closed with
> zero occurrences rather than open with one. **No value in the ruling moves in either round** —
> every fact it rests on was read from that cue's own fields.

## Decision

**The second half is the collection list, open over the cleared ground, showing held names beside
empty slots.** It is not the reveal beat and it is not nothing. `05-OUTWARD.md`'s *"a relic
mid-reveal"* is stale as written and a revision request against that line is filed here, once, by
this sheet only.

## Why

**The ruling that closes the old subject is inherited and I do not re-argue it.**
`representation.find` states *"A Find has **no Instance at any point in its life**"* with
`class: null` and `createdBy: "nothing"`; `art/objects/04` answered the outward half in wave 6 with
`iconCount`, `imageAssetCount`, `meshCount` and `worldInstanceCount` all `0`;
`collection.sets[].relics[]` is an array of bare strings with nowhere to hang art;
`theme/tone/04` `D11` bans the silhouette, blurred model, greyed name and question-mark treatment
the genre uses instead; and `T6` makes any image showing a Find as an object a known-false claim.
**I file no `## Pushing back` against `art/objects/04`, because I agree with it.**

**The new fact, and it is the one that makes this sheet necessary rather than a restatement.**
`effects.cues[id=findReveal]` (`art/vfx/01`) ships a **real photographable beat**: one anchored
`Part`, `3 × 0.4 × 3` studs, flush-set into the paving at the patch position, held completely still
for a `dwellSeconds` of 2.5 and then destroyed. So a reveal *moment* exists in an approved key
while the revealed *object* does not, and a writer looking only at `representation.find` would miss
that there is something there to point a camera at. **I still reject it as the subject**, on that
key's own values:

- **Its own `V7` says it is not the Find**, and `readsAsTheFind` is `false` in the manifest with
  the reason spelled out: it is ground, not a thing, byte-identical for all 24 Finds, not any live
  Find name.
- **It is the same colour and material as the paving it sits in.** `part.colorRole` and
  `materialRole` are both `styleGuide.roles["stone.cleared"]`, and 0.2 studs stand above the slab.
  In a 1920 × 1080 wide frame that is a lip of identical stone, so the subject is invisible as a
  subject even when it is present.
- **Nothing moves.** `motion` is `{tween: false, fade: false, scale: false, rotate: false,
  rise: false, pulse: false, blink: false}` by `theme/tone/03` `B1`, so there is no moment to
  catch. `namePresent` is `false`, so the frame cannot say what was found.
- **Photographing it as *the reveal* would assert the claim `T6` forbids**, because a stranger has
  no way to read *"this is ground, not a thing"* off an image. The honest depiction of an object
  that does not exist is not a subtler object.
- It is also `[does not exist]` today (`art/_category.md` row 21), so choosing it would trade a
  buildable subject for an unbuilt one.

**Why the index and not nothing.** *"Nothing"* leaves the image selling only the harvest, which is
the one thing every game in the family already promises: *"The buried half is the differentiator no
competitor can claim"* `05-OUTWARD.md` `[brief: soft]`, resting on
*"across everything searched, no game in this family surfaced a hidden-object collection layer"*
`[research: concept/spec/incremental-spinoff-v2/research/landscape.md]`. Dropping the second half
throws that away for a subject that is available and true.

**And the index is the only place the differentiator has a form at all.** `art/objects/04`:
*"Its only form is its name, rendered into the index slot `screens` owns."* `04-PRESENTATION.md`
calls `collection-index` *"the differentiator's home"* at priority 1 `[brief: soft]`. Unlike every
other subject in the frame, the mechanism ships: `IndexScreen.luau` is hand-built and renders
today, so what `C8` waits on is the theme, not the panel. And a **half-empty** index is the brief's
own return hook stated as a picture: *"an unfinished area and a half-empty index"* `03-META.md`
`[brief: soft]`, where an unfound entry is *"an empty slot. **NOTHING ELSE**"*
(`representation.index-surface`), which is exactly what `D11` requires and what a viewer reads as
*"there is more in here than I have."*

**One dependency I state rather than assume.** Whether an open panel dims the world behind it is
`composition`'s and `screens`', not mine. If a scrim ships, the capture is still legitimate: it is
what a player sees, and removing it for a photograph would be a manual edit and forbidden source
`S7`. **The requirement is on the outcome** — the cleared paving and at least two overgrowth tiers
must remain identifiable in the frame. If the shipped scrim prevents that, it is a finding against
`composition`, not a licence to edit the image. `[cid: decided]`

**The panel's share of the frame is mine and I set it.** No more than **45%** of frame width, so
both halves read and the world stays dominant, which is what the brief's word *"halves"* implies
about a composition where one half is an interface. `[cid: decided]`

**And one rule about my own criteria, because round 1 found the defect twice in this domain.** A
criterion that can only be checked by editing a file this writer may not write is not a criterion.
Both of mine are restated over fields of `storeThumbnails`, which is the key this domain owns; the
half that genuinely belongs to another owner is published as data with the observable **that owner**
runs. That is the same move `art/style/01` made with `RR-A1` rather than reaching into
`architect/06`. The residue is `staleSpellingElsewhere`, which round 2 closed at zero occurrences
when the index came into scope — **and it closed as a field with an observable, not as a criterion
that had been failing all along.** `[cid: decided]`

```json
{
  "amends": "storeThumbnails",
  "path": "secondHalf",
  "value": {
    "revision": 2,
    "revisionNote": "round 1. (a) Four occurrences of effects.beats[findReveal] corrected to effects.cues[id=findReveal]; effects holds cues[] keyed by .id and beats[] belongs to response. (b) Criterion 1's cross-file grep, which could only pass if this domain's _lead.md were edited, is restated over this key's own fields and the residue is published as staleSpellingElsewhere. Round 2: the index came into scope, its two stale occurrences were corrected, and staleSpellingElsewhere is closed at zero occurrences. No value moved in either round and the ruling is unchanged.",
    "subject": "index-panel",
    "subjectPlain": "the collection list open over the cleared ground, held names beside empty slots",
    "findObjectDepicted": false,
    "revealBeatDepicted": false,
    "revealCuePathSpelling": "effects.cues[id=findReveal]",
    "revealCuePathSpellingRule": "every field of secondHalf that names the reveal cue uses this exact string. It is the only spelling this key admits.",
    "rejectedSubjects": [
      {
        "subject": "the findReveal dwell object",
        "source": "effects.cues[id=findReveal] — one anchored Part, 3 x 0.4 x 3, dwellSeconds 2.5 read from response.beats[findReveal].dwellSeconds",
        "photographable": true,
        "rejectedBecause": [
          "its own V7 sets readsAsTheFind false: it is ground, not a thing, byte-identical for all 24 Finds",
          "part.colorRole and part.materialRole are both styleGuide.roles[\"stone.cleared\"], the same stone as the paving, with 0.2 studs standing proud, so it is not a legible subject in a wide frame",
          "motion is false on all seven fields and namePresent is false, so there is no moment to catch and the frame cannot say what was found",
          "a stranger reads it as an object, which is the T6 claim",
          "art/_category.md row 21 marks it [does not exist]"
        ]
      },
      {
        "subject": "nothing at all",
        "rejectedBecause": [
          "the image would sell only the harvest, which every game in the family already promises",
          "05-OUTWARD.md's stated reason for the hook is that the buried half is the differentiator no competitor can claim"
        ]
      }
    ],
    "staleSpellingElsewhere": {
      "status": "closed",
      "whyThisIsAFieldAndNotACriterion": "round 1 of this sheet asserted a grep over cid/marketing that returned nothing only if this domain's _lead.md was edited. A domain index was not a file this writer could write in that round, so the criterion could never pass by any action available to it. It was restated as data with the observable its owner runs.",
      "occurrences": [],
      "occurrencesAtRound1": 1,
      "closedInRound2By": "the round-2 assignment placed cid/marketing/thumbnails/*.md, including _lead.md, in this writer's scope. Both prose occurrences there (the M1 ruling and sheet 03's row of the assignment table) now read effects.cues[id=findReveal].",
      "observableForItsOwner": "grep -n 'effects\\.beats\\[' cid/marketing/thumbnails/_lead.md returns nothing",
      "observableHoldsToday": true,
      "severity": "prose only. No backedBy, no manifest value and no ruling ever depended on the spelling; art/vfx/01's own manifest uses cues correctly and this key cites it correctly.",
      "notEditedHere": true,
      "notEditedHereNote": "the correction was made in the index file itself, not from inside this sheet. This field records it; it does not perform it."
    },
    "contentRequired": {
      "slotsRendered": 24,
      "slotsHoldingAName": { "min": 1 },
      "slotsEmpty": { "min": 1 },
      "unfoundSlotTreatment": "empty. Zero padlocks, zero silhouettes, zero blurred models, zero greyed names, zero question marks (theme/tone/04 D11; representation.index-surface).",
      "setLabelsVisible": true,
      "namesReadFrom": "collection.sets[g].relics[i] — bare strings, cited not copied. No name is written into this key.",
      "renderedBy": "the shipped IndexScreen.luau at the emitted uiTheme, per captureGate C8"
    },
    "framing": {
      "maxFrameWidthFraction": 0.45,
      "maxFrameWidthFractionReason": "both halves must read and the world stays dominant, which is what 'halves' implies when one half is an interface. [cid: decided]",
      "worldRemainsIdentifiable": true,
      "worldRemainsIdentifiableRule": "cleared limestone paving and at least two of the four tiers shapes are identifiable in the frame with the panel open",
      "scrimDependency": {
        "ownedBy": "composition and screens",
        "assumption": "none. Whatever scrim ships is what is captured.",
        "editingItOutForbidden": "yes — captureGate.forbiddenSources S7",
        "ifTheScrimDefeatsTheRule": "a finding against composition, filed then, not a licence to edit the frame"
      }
    },
    "briefRevision": {
      "id": "RR-O1",
      "against": "concept/spec/incremental-spinoff-v2/05-OUTWARD.md, lines 14 to 15",
      "line": "It gives a thumbnail two composable halves - a cleared path through green, and a relic mid-reveal.",
      "tag": "[you accepted: R6 Q1] -> [brief: soft]",
      "firstHalfStatus": "stands, unchanged, and is buildable",
      "secondHalfStatus": "stale. It names a subject three approved keys give no form, and it was written before representation.find and art/objects/04 ruled.",
      "proposedLine": "It gives a thumbnail two composable halves - a cleared path through green, and the collection list open over it, held names beside empty slots.",
      "secondaryGround": "the line's noun is 'relic', which theme/vocabulary/02 has since banned outright, with the reason that it is occupied by Scrap Incremental and Faith Incremental",
      "manifestValuesMoved": 0,
      "ifDeclined": "nothing in this key changes. representation.find and art/objects/04 govern either way; the brief simply keeps a sentence no artifact can satisfy, and a later reader re-derives this ruling from scratch.",
      "filedBy": "cid/marketing/thumbnails/03-no-subject-for-the-second-half.md",
      "filedOnceRule": "the Icon domain rules the same M1 collision from the other side and may forbid a rendered Find in its own key. It may not file a second briefRevision against this line; rounds 1 and 2 both verified that exactly one exists under cid/marketing/**.",
      "status": "filed, not applied"
    }
  }
}
```

## Pushing back

**I overrule the second half of `05-OUTWARD.md`'s composition line**, tagged
`[you accepted: R6 Q1]` and therefore `[brief: soft]`. The line promises *"a relic mid-reveal"* as
one of two composable halves. Three approved artifacts give that subject no form
(`representation.find`, `art/objects/04`, `theme/tone/04` `D11`), a fourth ships a beat that
explicitly is not it (`effects.cues[id=findReveal].readsAsTheFind` is `false`), and the category's
own `T6` makes depicting it a known-false claim. **The first half is untouched.** The replacement
keeps the sentence's structure, its two halves and its purpose, and changes only the noun that no
longer has a referent. `RR-O1` above is the request, with the line quoted and the consequence of
declining it stated.

## Consequences for other work

- **Icon work (`storeIcon`)** may forbid a rendered Find in its own key and should cite this sheet
  rather than file a second `briefRevision` against the same brief line.
- **Screens work (`screens`) and composition work** learn that the index panel is now an **outward**
  artifact: its slot treatment, its empty state and any scrim are what a stranger sees before they
  play. `D11` was already binding; this makes a breach visible outside the game.
- **Meta and content work (`collection`)** gets no new requirement. The 24 strings are cited by
  path and none is copied into this key, so renaming any of them costs this domain nothing.
- **VFX work (`effects`)** is unaffected as a decision. It does inherit one correction that may be
  useful elsewhere: `effects` holds `cues[]`, keyed by `.id`, and this domain had spelled it
  `beats[]`, which is `response`'s collection. Nothing here constrains the cue's dwell, size or
  colour, and this sheet asks for no change to it.
- **Whoever holds this domain's index (`cid/marketing/thumbnails/_lead.md`)** carries no
  outstanding correction: the two stale `effects.beats[findReveal]` occurrences were fixed in
  round 2 and `staleSpellingElsewhere.status` is `closed` with `occurrences: []`. The observable
  stays published so the fix can be re-checked rather than trusted.
- **Store-page work (`storeListing`)** should know the image already depicts the collection layer,
  so its copy does not have to carry that job alone and should not repeat the number 24 as though
  it were news.

## Acceptance criteria

1. `storeThumbnails.secondHalf.subject` is `"index-panel"`, `findObjectDepicted` is `false`,
   `revealBeatDepicted` is `false`, and every field of `secondHalf` that names the reveal cue reads
   exactly `secondHalf.revealCuePathSpelling`, which is `effects.cues[id=findReveal]`; no
   `slots[].composition` names that cue.
2. `contentRequired.slotsRendered` is `24` with at least one slot holding a name and at least one
   empty, and the frame contains zero padlocks, silhouettes, blurred models, greyed names and
   question marks.
3. Across every fenced data block under `cid/marketing/**`, exactly **one** `briefRevision` object
   has an `against` naming `05-OUTWARD.md`; its `filedBy` is this file and its `line` quotes the
   brief sentence. Quoting the phrase in prose is not filing a request and does not count.
4. `framing.maxFrameWidthFraction` is `0.45`; `staleSpellingElsewhere.occurrences` is `[]` and
   `grep -rn "effects\.beats\[" cid/marketing/thumbnails/` returns **0** matches; and the captured
   frame shows cleared limestone paving plus at least two of the four `tiers` shapes with the panel
   open.

## Not decided here

The slot count, order, claim, file and strings: **sheet `01`**, which holds `storeThumbnails` and
the domain's `externalPathsResolved` and `internalPathsAsserted` registries. What makes the capture
legitimate and which gate rows must pass first: **sheet `02`**; `C8` is the row this subject
depends on. Whether any string is drawn on the image: **sheet `04`**. How a slot renders, its size,
its states, and whether an open panel dims the world behind it: **screens work and composition
work**; I state a requirement on the outcome and set none of their values. The 24 names themselves
and the set labels: **meta and content work (`collection`)** and **vocabulary work**; cited by
path, copied nowhere. What the reveal beat is made of and how long it lasts: **VFX work
(`effects`)**; I read its values and change none. Whether `05-OUTWARD.md` is actually edited:
**the developer**, since a brief is not a CID artifact; this sheet files the request and applies
nothing.
