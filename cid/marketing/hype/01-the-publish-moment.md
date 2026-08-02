# 01 — The publish moment

**Domain:** marketing/hype · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

This game has **exactly one outward beat — the private→public visibility flip — and zero beats
before it**, gated on eight recorded preconditions. Trailer, countdown, cross-promotion and
re-engagement are all **zero**, each with the ruling that empties it and a priced reversal.

## Why

**A beat needs a surface and this project has one: the experience page.** Social concludes
`channelCount: 0`, `products` `F15` removes every in-game path to a channel, `notices` carries
**exactly two** members and both are `response` beats, and `release.shutdown.playerFacing` is
`"nothing"`. A teaser posted nowhere is not a teaser, so **`beatsBeforeTheFlip: 0` is arithmetic,
not restraint** — and *"Success is shipped artifacts, not players"* `[brief: binding]` (`00-CORE.md`)
makes an artifact exist because the platform requires it, never because a launch should have a plan.

**What survives is real.** A new place is **private by default**, and public means *"available and
discoverable to the general public"*
`[research: https://create.roblox.com/docs/production/publishing/publishing-experiences-and-places]`.
Until that setting moves no stranger can reach this game at all, which makes it the whole outward
launch — and `release`, which claims *"every publish-time platform setting and its read-back"*, has
no checklist row for it.

**The order is safe under both readings of an ambiguous prerequisite.** `release.provisioning` gate 4
rests on the experience being *"published and is accessible"*, and the page does **not** say *public*
`[research: https://create.roblox.com/docs/production/monetization/game-passes]` `[unverified]` —
settled by the Creator Dashboard passes surface rendered against a Private place, or the
`creator-docs` source of `production/monetization/game-passes.md` with its prerequisite expanded.
**So the flip goes before pass creation**, satisfying it either way; the reverse order is legal only
under the weaker reading. The price is a window in which the page is public while `gamePassId` is
unprovisioned — Store Page's `M7`, routed there. `[cid: decided]`

**The trailer is dormant, and capture closes it, not taste.** `Theme.luau` ships `archetype =
"cartoon-vibrant"`, `sourceTitle = "Pet Ascend Simulator"`, surface `#2B1B4D` against a brief naming
`fantasy-ornate` three times (`T8`, `G2`) `[research: game/src/shared/Theme.luau]`. A trailer is
captures in sequence, so it inherits that wholesale. Platform-side it is otherwise cheap, and the
facts belong to Thumbnails more than to me: an approved video *"will appear first on your game's
detail page"*, a detail page holds up to **10** images or videos, uploads run against a **monthly
quota of 3** with rejections counted, and all are reviewed against *"authentic and accurately
portray in-game content without misleading alterations"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/thumbnails.md]`.

**Re-engagement is closed twice and the second closure is the honest one.** The brief closes it by
name `[brief: binding]`, upheld by **R-3**. But the mechanism exists, so a bare assertion would be a
bluff: Experience Notifications reach **opted-in users 13+ only** against an **8–14** audience
`[brief: binding]`, require **≥100 visits since launch** (0 at publish), and cap at one per user per
day `[research: https://create.roblox.com/docs/production/promotion/experience-notifications]`; they
are sent by `POST .../cloud/v2/users/{id}/notifications` with an `x-api-key`
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/experience-notifications.md]`
— an outbound path `release` `N5` forbids and no module has: `grep -rn "HttpService" game/src`
returns **zero** `[research: game/src]`.

**Countdown dies four ways and cross-promotion has nothing to promote.** `release.forbidden` `N2` and
`N10`; `products` `F10` in-game; `T10` plus platform guidance against *"a false sense of urgency"*
`[research: https://create.roblox.com/docs/production/monetization]`; and *"tension is zero by
design"* `[brief: binding]`. `release.environments.count` is **2** with `N7` forbidding a second
place, and the brief names no other game by this developer (**H4**).

**Zero player-facing strings**, so `theme/vocabulary` binds nothing here and `T0`'s critic pass reads
`claims: []`. **And no emitter writes an outward artifact today** (**H6**, `M6`): a merged
`launchBeats` reaches nothing, exactly as `art/ui-art/01` said of `uiTheme`.

### The ordered sequence

| n | step | owner today | check |
|---|---|---|---|
| 1 | publish the place — it is **private by default** | `release.provisioning` gate 1 | `placeId` and `versionNumber` exist |
| 2 | execute `publishChecklist` `P1`–`P4`, boot once | `release` gate 2 | four recorded observations, two human ticks |
| 3 | complete the **Maturity & Compliance questionnaire** | **nobody** — `RR-C1`, filed by `liveops/community/02` | a label is set; unrated is *"no longer playable"* |
| 4 | `title` is not the slug and not `"Pet Ascend Simulator"` | `title` · Marketing — Name | the name field is non-default |
| 5 | `storeIcon` is set | `storeIcon` · Marketing — Icon | not the platform placeholder |
| 6 | `storeThumbnails` slots filled, each past its capture gate | `storeThumbnails` · Marketing — Thumbnails | every slot names a `captureSource` |
| 7 | `storeListing` description, genre, tags, age set | `storeListing` · Marketing — Store Page | no field left at default |
| 8 | `channels` affirmatively zero, not skipped | `channels` · Marketing — Social | zero of three social-link slots filled |
| **B** | **private → public flip. The one beat.** | **nobody** — `RR-H1`, this sheet | a signed-out stranger reaches the page |
| 9 | answer the mid-session re-resolution question | `release` gate 3 · Networking | — |
| 10 | create the pass, write the id into `products`, republish, restart | `release` gates 4–6 | `gamePassId > 0` |

### The five subjects

| # | subject | ruling | observable |
|---|---|---|---|
| 1 | beat structure (teaser → reveal → launch) | one beat, the flip | beats before the flip **0**; beats total **1**; non-page surfaces **0** |
| 2 | trailer brief | dormant, capture-gated | `trailerVideoCount` **0**; frames from an unfixed `cartoon-vibrant` build **0**; no `captureSource` equal to the current `Theme.luau` |
| 3 | countdown mechanics | forbidden four ways | date-, clock- or calendar-keyed values **0**; strings matching `/limited\|ends in\|counting down\|today only\|last chance/i` **0** |
| 4 | cross-promotion | no second experience exists | `crossPromotedExperiences` **0**; place ids or universe ids named **0** |
| 5 | re-engagement push | binding non-goal **and** mechanically unreachable | `reEngagementPushes` **0**; notification strings **0**; Open Cloud endpoints named as used **0**; `HttpService` call sites in `game/src` **0** |

```manifest
{
  "provides": "launchBeats",
  "status": "proposed",
  "value": {
    "beatCount": 1,
    "beatsBeforeTheFlip": 0,
    "nonPageSurfaceCount": 0,
    "playerFacingStringCount": 0,
    "claims": [],
    "claimCount": 0,
    "vocabularyBinding": "theme/vocabulary binds player-facing strings and this key holds none. Every outward string belongs to title, storeListing or storeThumbnails.",
    "beats": [
      {
        "id": "publicFlip",
        "ordinal": 1,
        "name": "the private to public visibility flip",
        "trigger": "every row of preconditions[] is satisfied and recorded. Nothing else triggers it, and no trigger reads a date, a cohort or an elapsed time.",
        "surface": "the experience page's own visibility setting in the Creator Dashboard. Not a channel, not an in-game notice, not a message.",
        "whatIsSaid": "nothing. The beat is a state change on the page, not a string. No copy is authored for it by this key.",
        "whatChanges": "the experience becomes available and discoverable to the general public. Before it, no stranger can reach the game at all.",
        "backedBy": "https://create.roblox.com/docs/production/publishing/publishing-experiences-and-places (new places are private by default; public means available and discoverable to the general public)",
        "checklistRowExists": false,
        "checklistRowShouldExist": "release.publishChecklist, as a new row. release claims every publish-time platform setting and its read-back and has no row for this one.",
        "revisionRequest": "RR-H1",
        "readableBack": "unverified. No retrieved page states a runtime or API read of a place's public/private visibility. Stands in for a read: one signed-out browser reaching the experience page, recorded by the person publishing.",
        "reversible": true,
        "reversalPath": "set the place back to private. The page stops being reachable; nothing in game/src changes and no save is touched."
      }
    ],
    "preconditions": [
      { "n": 1, "requirement": "the place is published", "owner": "release", "ownerField": "release.provisioning.gates[1]", "ownedToday": "release", "check": "placeId and versionNumber exist", "backedBy": "cid/tech/deploy/01" },
      { "n": 2, "requirement": "publishChecklist P1 to P4 executed and recorded, and the place booted once", "owner": "release", "ownerField": "release.publishChecklist", "ownedToday": "release", "check": "four recorded observations, two of them human ticks", "backedBy": "cid/tech/deploy/01" },
      { "n": 3, "requirement": "the Maturity and Compliance questionnaire is complete", "owner": "release", "ownerField": "release.publishChecklist — NO ROW EXISTS", "ownedToday": "nobody", "check": "a maturity label is set on the experience", "failureIfSkipped": "an unrated experience will no longer be playable or show up in top charts, and Roblox restricts the playability of the experience on the platform for all players", "backedBy": "https://devforum.roblox.com/t/important-updates-unrated-experiences-and-changes-to-experience-pages/3899317 and https://create.roblox.com/docs/production/promotion/content-maturity", "revisionRequest": "RR-C1", "citedNotDuplicated": true, "filedBy": "cid/liveops/community/02-moderation-ban-and-appeal.md" },
      { "n": 4, "requirement": "the experience name is non-default", "owner": "title", "ownedToday": "Marketing — Name, same wave", "check": "the name field is neither the slug incremental-spinoff-v2 nor Pet Ascend Simulator", "backedBy": "OPEN.md section 3, the working name is a placeholder" },
      { "n": 5, "requirement": "the experience icon is set", "owner": "storeIcon", "ownedToday": "Marketing — Icon, same wave", "check": "the icon is not the platform placeholder", "backedBy": "OPEN.md section 4" },
      { "n": 6, "requirement": "the thumbnail slot list is filled, each slot past its own capture gate", "owner": "storeThumbnails", "ownedToday": "Marketing — Thumbnails, same wave", "check": "every filled slot names a captureSource and no captureSource is the current game/src/shared/Theme.luau", "backedBy": "category T8 and G2" },
      { "n": 7, "requirement": "the listing description, genre, tag set and age and content settings are set", "owner": "storeListing", "ownedToday": "Marketing — Store Page, same wave", "check": "no listed field left at its platform default", "backedBy": "OPEN.md section 4; category rows 2, 5, 6, 7, 8" },
      { "n": 8, "requirement": "the social-link slots are affirmatively zero rather than skipped", "owner": "channels", "ownedToday": "Marketing — Social, same wave", "check": "zero of three permitted social-link slots filled", "backedBy": "cid/marketing/social, channelCount 0" }
    ],
    "preconditionCount": 8,
    "seamAgainstRelease": {
      "releaseOwns": "the inward half whole: environments, publishChecklist, version identity, six provisioning gates, rollback and flags. Every value is cited and none is restated.",
      "thisKeyOwns": "whether anything is said outside the game when it runs, what, in what order, and on which surface.",
      "flipSitsBetween": "release.provisioning gate 2 and gate 3",
      "orderIsSafeUnderBothReadings": {
        "ambiguity": "release.provisioning gate 4 rests on the experience being published and is accessible. The platform page does not say public.",
        "status": "unverified",
        "settlingFetch": "the Creator Dashboard game-passes surface rendered against a place whose visibility is Private, or the creator-docs source of production/monetization/game-passes.md with its prerequisite note expanded",
        "chosenOrder": "flip to public BEFORE gate 4",
        "whySafe": "after the flip the place is both published and public, so the prerequisite holds under either reading. The reverse order is legal only under the weaker reading.",
        "acceptedCost": "a window in which the page is public while products.items[span].gamePassId is unprovisioned. No duration is specified and none may be, because a duration is an elapsed time. What the listing says in that window is storeListing's row, category gap M7.",
        "backedBy": "https://create.roblox.com/docs/production/monetization/game-passes"
      },
      "afterTheFlip": [
        { "n": 9, "gate": "release.provisioning gate 3 — the mid-session pass re-resolution question", "owner": "tech/networking" },
        { "n": 10, "gate": "release.provisioning gates 4 to 6 — create the pass, write the id into the sheet that owns products, republish and restart", "owner": "release" }
      ]
    },
    "trailer": {
      "trailerVideoCount": 0,
      "status": "dormant, not forbidden. Nothing in the brief closes it; the capture precondition does.",
      "captureSource": "none. No build in this repository is a legitimate capture source.",
      "captureSourceForbidden": "game/src/shared/Theme.luau as it ships: archetype cartoon-vibrant, sourceTitle Pet Ascend Simulator, surface base #2B1B4D, against a brief naming fantasy-ornate three times",
      "framesFromAnUnfixedBuild": 0,
      "closedBy": "category T8 and G2, plus 00-CORE.md's binding non-goals. NOT closed on taste.",
      "reopensWhen": "uiTheme and styleGuide are emitted, G2 is closed, and a build exists whose look is styleGuide plus uiTheme as approved. It then becomes a Thumbnails slot-ordering question, not a Hype question.",
      "platformFacts": {
        "detailPageItemMax": 10,
        "itemKinds": "images or videos",
        "approvedVideoTakesSlot": 1,
        "slotClaim": "an approved video will appear first on your game's detail page, ahead of every image slot storeThumbnails orders",
        "monthlyUploadQuota": 3,
        "rejectionsCountAgainstQuota": true,
        "allVideosReviewed": true,
        "reviewStandard": "video thumbnails should be authentic and accurately portray in-game content without misleading alterations",
        "backedBy": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/thumbnails.md"
      },
      "ifItEverExists": "storeThumbnails and this key must agree on slot 1, because the platform gives an approved video slot 1 whatever storeThumbnails ordered there.",
      "reversalPath": "close G2, emit uiTheme and styleGuide, build one representative area, capture, then spend 1 of 3 monthly upload slots against a review that can reject and still consume it. The cost is the build, not the video."
    },
    "countdownsPermitted": 0,
    "crossPromotedExperiences": 0,
    "reEngagementPushes": 0,
    "subjects": [
      {
        "id": "S1",
        "subject": "beat structure before a drop: teaser, reveal, launch",
        "ruling": "one beat, the public flip. Zero before it.",
        "closedBy": "channels.channelCount 0 (no surface); products F15 (no in-game path to one); notices has exactly two members and both are response beats; release.shutdown.playerFacing nothing; OPEN.md section 2 ships and settles",
        "observable": "beatCount 1; beatsBeforeTheFlip 0; nonPageSurfaceCount 0",
        "reversalPath": "a channel must exist first, which is channels' ruling and not this key's. Opening one needs a developer ruling against 00-CORE.md's binding shipped-artifacts-not-players AND a 16+ age check on the operator, after which the 8-14 audience still cannot see the link."
      },
      {
        "id": "S2",
        "subject": "trailer briefs",
        "ruling": "trailerVideoCount 0, dormant",
        "closedBy": "category T8 and G2 — the capture precondition",
        "observable": "trailerVideoCount 0; framesFromAnUnfixedBuild 0; no captureSource equal to the current game/src/shared/Theme.luau",
        "reversalPath": "see trailer.reversalPath"
      },
      {
        "id": "S3",
        "subject": "countdown mechanics",
        "ruling": "countdownsPermitted 0",
        "closedBy": "release.forbidden N2 and N10; products F10 in-game; category T10 plus platform guidance against a false sense of urgency and artificial scarcity outward; tension is zero by design (HANDOFF.md, brief binding)",
        "observable": "clock- or calendar-keyed values in this key 0; outward strings matching /limited|ends in|counting down|today only|last chance|only \\d+ left/i 0",
        "reversalPath": "reopens N2 and N10 against an approved sheet and contradicts a binding zero-tension instruction. Not a value change: a Pushing back against cid/tech/deploy/01 plus a developer ruling."
      },
      {
        "id": "S4",
        "subject": "cross-promotion",
        "ruling": "crossPromotedExperiences 0",
        "closedBy": "release.environments.count 2 (Studio plus one published place); release.forbidden N7; tech/deploy gap 2 — no environment split exists anywhere in the brief or the repo; the brief names no second experience (H4)",
        "observable": "crossPromotedExperiences 0; place ids or universe ids named by this key 0",
        "reversalPath": "needs a second experience to exist. Whether this developer owns another game is a fact about a person, not a design decision, and is the developer's one-line answer. A second place built for this purpose reopens N7."
      },
      {
        "id": "S5",
        "subject": "re-engagement pushes to lapsed players",
        "ruling": "reEngagementPushes 0",
        "closedBy": "00-CORE.md, beating the genre's retention curve offered and declined, brief binding, upheld by ruling R-3; AND the mechanism is unreachable on three independent counts",
        "mechanismFacts": {
          "name": "Experience Notifications",
          "recipientMustBeOptedIn": true,
          "recipientMinimumAge": 13,
          "audienceBand": "8-14, brief binding",
          "minimumVisitsSinceLaunch": 100,
          "visitsAtThePublishMoment": 0,
          "perUserPerDayCap": 1,
          "transport": "POST https://apis.roblox.com/cloud/v2/users/${UserId}/notifications with an x-api-key header",
          "transportForbiddenBy": "release.forbidden N5 — nothing fetched at runtime from outside GameConfig",
          "transportExistsInBuild": false,
          "backedBy": "https://create.roblox.com/docs/production/promotion/experience-notifications and https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/experience-notifications.md"
        },
        "observable": "reEngagementPushes 0; notification strings held by this key 0; Open Cloud endpoints named as used 0; grep -rn \"HttpService\" game/src returns 0 matches",
        "reversalPath": "reverse a binding non-goal by developer ruling, then build an outbound HTTP path against release N5, then reach 100 visits, and it still reaches nobody in the lower half of the audience band. The age floor is not reversible by this project."
      }
    ],
    "liveOpsDependency": {
      "key": "roadmap",
      "owner": "Live Ops — Roadmap, same wave",
      "resolvedHere": false,
      "seam": "this key announces; roadmap decides whether there is anything to announce. Marketing's does_not_own is what is actually in the update.",
      "ifRoadmapIsEmpty": "beatCount 1 is the TOTAL. One ship and nothing after it.",
      "ifRoadmapHasDrops": "beatCount 1 becomes a FLOOR, and this key takes a revision request naming each drop's outward beat. It does not become a schedule on this sheet's authority.",
      "constraintsAnyLaterBeatInherits": [
        "no field may read a date, a cohort or an elapsed time (release N1, N2, N4, N10)",
        "no channel exists to post on (channels.channelCount 0)",
        "no in-game surface may carry it (notices has exactly two members, both response beats; release.shutdown.playerFacing nothing; products F19)"
      ],
      "categoryGap": "M10"
    },
    "revisionRequests": [
      {
        "id": "RR-H1",
        "target": "cid/tech/deploy/01-the-release-contract.md",
        "ask": "add a publishChecklist row for the private-to-public visibility setting. release claims every publish-time platform setting and its read-back; a new place is private by default, so without this row a correctly executed checklist leaves the game unreachable by anyone but its creator. Values are release's to set; the obligation and its citation are supplied here.",
        "suggestedRow": {
          "item": "experience visibility, private to public",
          "surface": "Creator Dashboard, experience, Basic Settings, playability",
          "scriptable": false,
          "readableBack": "unverified",
          "standsInForARead": "one signed-out browser reaching the experience page, recorded by the person publishing",
          "failureIfWrong": "the experience is published, correctly configured, and reachable by nobody. No error, no log line, no in-game symptom."
        },
        "rowAddedByThisSheet": false,
        "effectOnReleaseAC1": "RR-C1 already moves the row count from 4 to 5; this moves it to 6."
      }
    ],
    "revisionRequestsCitedNotFiled": [
      { "id": "RR-C1", "filedBy": "cid/liveops/community/02-moderation-ban-and-appeal.md", "target": "cid/tech/deploy/01-the-release-contract.md", "ask": "a fifth publishChecklist row P5 for the Maturity and Compliance questionnaire", "whyNotRefiled": "the same gap found from the Live Ops side in the same wave. Two domains filing one request against one sheet is a collision, so this key cites theirs and adds none." }
    ],
    "emitterHole": "No emitter writes an outward artifact. release.publishChecklist covers place settings; nothing in either contract or docs/cid-workflow.json makes a name, an icon, a thumbnail, a description or a visibility setting a build artifact. A merged launchBeats reaches no build step today. Category gap M6; the same finding art/ui-art/01 recorded for uiTheme.",
    "invariants": [
      "beatCount == len(beats)",
      "beatsBeforeTheFlip == 0",
      "preconditionCount == len(preconditions)",
      "no field anywhere in this key reads or holds a date, a calendar, a season, a cohort, a bucket or an elapsed time",
      "no null token appears anywhere in this key",
      "claims is empty, so the category T0 backedBy pass over this key is vacuously satisfied and every outward claim belongs to another marketing key",
      "no channel, invite, handle, group id, place id, universe id or external url is named by this key, which is what channels.channelCount 0 and crossPromotedExperiences 0 enforce jointly"
    ],
    "reservedSlots": 0,
    "reservedSlotsRule": "no field, empty array or note is held open for a future drop, an event, a second beat or a later update. 03-META.md priority 3 closes the calendar-shaped ones; tech/deploy/02 rules an explicit null and a never-emitted key are the same bytes."
  }
}
```

## Revision request issued

| id | target | ask |
|---|---|---|
| RR-H1 | `cid/tech/deploy/01-the-release-contract.md` | add a `publishChecklist` row for the **private→public visibility setting**. A new place is private by default, so a correctly executed four-row checklist leaves the game reachable by nobody but its creator, with no error and no in-game symptom. Values are `release`'s; the surface, read-back status and failure mode are in `launchBeats.revisionRequests[RR-H1].suggestedRow` |

**Cited, not refiled: `RR-C1`.** `cid/liveops/community/02` already asks `release` for a `P5` row
covering the Maturity & Compliance questionnaire — wave 7's Community domain found the same gap from
the Live Ops side, and two domains filing one request against one sheet is the collision this
pipeline keeps finding. Together the two move `release` AC1's row count **from 4 to 6**; if either is
accepted, `launchBeats.preconditions` cites the new row instead of stating the obligation.

## Consequences for other work

- **Publish-and-release-mechanics work (`release`).** `RR-H1`, and the flip is now sequenced between
  your gates 2 and 3 by another key. **I add no row.**
- **Thumbnail-slot work (`storeThumbnails`).** Slot 1 is yours and uncontested today. If the capture
  gate ever closes, an approved video takes slot 1 regardless of your ordering, so your slot list
  must survive one insertion at the head without hand-renumbering.
- **Store-listing work (`storeListing`).** The page goes public while `gamePassId` is unprovisioned.
  What the listing says about `Span` in that window (`M7`) is a consequence of an ordering chosen
  here, not a free choice.
- **Roadmap work (`roadmap`).** Rule a roadmap and `beatCount: 1` becomes a floor, owing this key a
  revision request per drop; rule none and it is the total and `M10` closes.
- **Off-platform-presence work (`channels`).** Your empty channel set is what makes
  `beatsBeforeTheFlip: 0` arithmetic. Any channel you find reopens `S1` as a revision request here.
- **Name, Icon, Store Page, Social.** Each owns one precondition row (4–8). Shipping a field at the
  platform default blocks the beat, and that is now checkable rather than implied.
- **Contract-and-seam work.** `launchBeats` reaches nothing today; if promoted it is developer-facing
  like `kpis` and `roadmap` and should carry a `DOCUMENTATION_ONLY` disposition.

## Flagged to the developer

**The brief describes no publish moment at all** (`H1`): a hook line, a positioning note, four words
of live-ops intent, and nothing about what happens outwardly when this game goes live. The sequence
above is `[cid: decided]`. Live alternatives: **(a)** as written, flip before pass creation, accepting
a public page with an unprovisioned pass; **(b)** create the pass first and flip last, which shows a
stranger nothing until everything is real but is legal only if *"accessible"* does not mean *public*;
**(c)** settle the ambiguity with one fetch, then choose. **I recommend (a)** — it is correct under
both readings, (b) under one, and (a)'s cost is a copy line Store Page already owes.

**Second: do you own another Roblox experience?** One line closes `S4` permanently; nothing else can.

## Acceptance criteria

1. `launchBeats.beatCount == 1 == len(launchBeats.beats)`; and `beatsBeforeTheFlip`,
   `nonPageSurfaceCount`, `playerFacingStringCount`, `countdownsPermitted`,
   `crossPromotedExperiences`, `reEngagementPushes`, `trailer.trailerVideoCount`,
   `trailer.framesFromAnUnfixedBuild`, `claimCount` and `reservedSlots` are each exactly `0`.
2. The serialized value of `launchBeats` contains zero `null` tokens and zero matches for
   `/\d{4}-\d{2}-\d{2}/`, `/\b\d{1,2}:\d{2}\b/` and
   `/\b\d+ ?(second|minute|hour|day|week|month|year)s?\b/i` — no date, clock or duration literal
   anywhere in the key.
3. `launchBeats.preconditions` has exactly **8** rows numbered 1–8 with no gap, each carrying a
   non-empty `owner`, `ownedToday` and `check`; exactly one row has `ownedToday: "nobody"` (`n: 3`)
   and it carries `revisionRequest: "RR-C1"` with `citedNotDuplicated: true`; and rows 4–8 name
   exactly `title`, `storeIcon`, `storeThumbnails`, `storeListing`, `channels`, each once.
4. `launchBeats.beats[0].checklistRowExists` is `false` and carries `revisionRequest: "RR-H1"`;
   `revisionRequests` has exactly one entry and `revisionRequestsCitedNotFiled` exactly one; and
   `grep -rn "HttpService" game/src` returns **zero** matches.

## Not decided here

**What is in any update, and whether there is one** — `roadmap`, Live Ops — Roadmap; a dependency
field, not resolved. **The `publishChecklist` row values and the two new rows** — `release`; I file
`RR-H1`, cite `RR-C1`, add no row. **What the listing says while `gamePassId` is unprovisioned** —
`storeListing`, gap `M7`. **The thumbnail slot list and what a legitimate capture requires** —
`storeThumbnails`; I state only that a video takes slot 1 and that there are none. **The name, icon,
description, tag set, genre and maturity label** — `title`, `storeIcon`, `storeListing`; each is a
precondition here and no value of theirs is decided here. **Whether any channel exists** — `channels`.
**Whether *"accessible"* means *public*** — `[unverified]`, settled by the fetch named in
`seamAgainstRelease`; the ordering is safe either way, so nothing waits on it. **Whether this
developer owns a second experience** — the developer, in one line.
