# 01 — What ships after v1

**Domain:** liveops/roadmap · **Category:** Live Ops · **Wave:** 7

## Decision

**A roadmap exists, it is ordered, it is dateless, its cadence is `none`, and it holds exactly
one drop.** That drop is the chunk-variety drop — `layout.chunksPerFamily` moved inside its
published `[8,16]` and `layout.anchorSource` authored, shipped together — and it may ship only on
a publish already paying a `storeMigration` **B1** bump, or after area-layout work makes the draw
stable, and never while an unexercised migration blocks publish.

## Why

**A drop is a content unit; `release` owns *version*.** A version is the shipping event and may
carry zero drops — a hotfix is exactly that
`[research: cid/tech/deploy/01-the-release-contract.md]`. So a drop is what a version carries:
one or more changes to authored content, or to a content-shaping field in a merged key, shipped
through one publish. **Changes that trip the same `storeMigration` trigger are one drop, not
two**, because the bump and its `cleared` discard are paid per publish and not per change
`[research: cid/tech/persistence/03-store-versions-and-migration.md]`. That is why both variety
levers are one entry rather than an ordered pair.

**The one live lever breaks a binding promise.** `layout.composition` draws each area's run
*without replacement* from its family, seeded by `(layoutSeed, areaOrdinal)`, so growing the
family re-draws every existing run; `layout` R9 already calls a reorder *"a save migration and
not a refactor"* `[research: cid/gameplay/meta/05-area-layout.md]`. `storeMigration` **B1** names
*"its grid… its draw sequence"*, and authoring `anchorSource` — today *"generated once from
`hash(layoutSeed, chunkId)` and frozen"* — moves the grid B1 also names. `translate.discard` is
`["cleared", "clearedCount"]`. **The bill is every player's current-area partial clearing:** up
to 640 patches at today's `depths.areas[8].chunkCount` of 16 against `patchesPerChunk` 40, or
1,120 if `solvency`'s revision lands at 28 — one lap, **93.5 seconds** `[research: cid/_state.md]`.
Ninety-three seconds is small. *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]`
is not, and **no member of `notices.members` has a trigger a content drop could fire** — the
three members are `setComplete` and `areaComplete` (beats) and `saveNotLoaded` (class `system`,
fired by a failed load), so the game cannot say it happened
`[research: cid/ui-ux/feedback/03-system-notices.md]`.

**Two windows, and one of them is free.** `release.tolerance.fullWipeCondition` accepts a wipe
*only* while no non-developer save exists, and `storeMigration.shippedToPlayers` is `false`
today. Outside that window D1 needs a draw stable under an append-only library — **stated here as
a requirement and designed nowhere.** In both windows
`release.rollback.publishMayNotProceedWhen` holds: *"an unexercised migration is a publish
blocker, not a caution"*, and `everExecuted` is `false` with `game/test/` holding only
`config.spec.luau` `[research: game/test]`. **Writing and running `migration.spec.luau` once is
on D1's critical path.**

**The ordering is derived, not invented.** `storeMigration.openConsequences.W1` — `solvency`'s
table moving `depths.areas[].chunkCount` and `endgame.postTerminalArea` — already fires B1 and B2
and already discards `cleared`. **D1 riding that publish costs zero extra wipes; D1 after it
costs a second wipe for the same outcome.** That, and not a calendar, is the whole order this
domain has.

**A finding nobody else is positioned to see: three approved keys share one id space.**
`release.forbidden` (ten rows), `storeMigration.nonTriggers` (eight) and `performance.forbidden`
(thirteen) all number their exclusion rows from one upward, and they mean different things — the
sixth row is a `MessagingService` ban in the first and a *permission* to move every price freely
in the second `[research: cid/tech/performance/03-what-optimisation-may-never-do.md]`. **This key
is the only sheet in the run that cites more than one of them**, so it is the only place the
collision is visible. `storeMigration.bumpTriggers` is cited here too but numbers `B1` upward, so
it is a fourth namespace and not a fourth collision. Every citation below is written dotted
(`release.forbidden.N6`, `storeMigration.nonTriggers.N6`), and criterion 2 is scoped to the four
fields that may hold such a citation rather than to the whole key. `[cid: decided]`

**Cadence is `none`, and `OPEN.md §2`'s *"ships and settles"* is upheld on the merits, not on its
tag** — which is `[brief: soft]` ← `[I assumed — batched]` at **0 interview questions**
(`OPEN.md §1`, row `O / live-ops intent`) and would not hold alone. Five pieces of evidence, both
directions:

| # | the evidence | which way it cuts |
|---|---|---|
| 1 | *"Many games release content cadence updates every two weeks to one month"*; a routine cadence *"encourages players to check back often"* and lets players *"anticipate the next release"* `[research: https://create.roblox.com/docs/production/game-design/content-updates]` | **for** a cadence — and both stated purposes are retention. *"Beating the genre's retention curve. Offered and declined"* is `[brief: binding]` ← `[you chose: R1 Q3]`. Sound guidance; it does not transfer. |
| 2 | LiveOps is *"two interweaving content types"* — **events** (*"temporary activities"*) and **content updates** (*"significant permanent game updates"*) — with no sequencing guidance at all `[research: https://create.roblox.com/docs/production/game-design/liveops-planning]` | **shape, not rate.** This category rules the events half empty, so the open half is exactly this domain, and a roadmap of permanent updates is the only compliant form available. |
| 3 | The platform's own success test for an update is comparing *"the week before the event and the week after"* (same source) | **against.** `grep -rn "AnalyticsService\|LogService\|FireEvent\|LogCustomEvent" game/src` returns **zero matches**, re-run for this sheet `[research: game/src]`, and `kpis.cadence` closes. The test cannot be run here. |
| 4 | The reference: past-24h **1,259 CCU**, 1,659 across 7 and 30 days, all-time peak **10,435**, 38,571,201 visits, last updated 2 days ago after a year of weekly updates `[research: https://www.rolimons.com/game/133086043677134]` | **against.** The brief's 819 is **stale** — the decay partially reversed — *and* a weekly cadence sustained for a year still sits at 12–16% of peak. *"Satisfaction is not the same as retention"* survives its own number moving. |
| 5 | The only algorithm source in the bank names *"session return rate and short-session re-engagement"*, 24-hour window weighted heaviest, and says **nothing** about update frequency, update recency or content drops `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]` | **a sourced negative.** There is no discovery argument for a cadence here, so one may not re-enter as a distribution decision after being declined as a retention one. `[cid: decided]` |

**Every player-conditioned trigger is unreadable, so the one readable trigger is a repository
state.** `kpis.verdictRule` routes a breached row to *"a revision request against a named sheet
and field — never a live change"*. D1's trigger is that request **applied**: a diff to
`cid/gameplay/meta/05-area-layout.md`'s manifest block, readable by `git`, never a dashboard. Its
two permitted sources are a `kpis` reading and a `cid/_playtest.md` entry. **D1 is not due
today**, because the whole empirical record is `n = 1`, untimed, with nothing past area 1
observed, so the premise that 8 chunks per family reads as repetitive is untested.
`[playtest unknown]` — **starting value `due: false`; test: one session completing areas 1–3,
after which the player is asked, unprompted, whether any stretch of ground was recognised as one
already walked.**

**`[research owed: a shipping Roblox experience's published update ordering — a store-page update
log or DevForum changelog thread for a collection-shaped incremental, DIG being the closest
comparable in the pack.]`** Nothing above depends on it: the order is derived from
`storeMigration` and `release`, not from precedent.

### Guardrails on any drop

| id | a drop may not | closed by |
|---|---|---|
| G1 | raise `depths.areaCount` past 8, or add content to the post-terminal bay | R-3; `endgame` — unbounded already, buries nothing |
| G2 | add, rename or remove a `collection.sets[].relics` name | R-3; `storeMigration.bumpTriggers.B4` |
| G3 | add, remove, rename or retype a persisted field | `storeMigration.bumpTriggers.B3`; `stateShape` — seven fields, one writer each |
| G4 | add a product, a price tier or a second SKU | the category's gap G7 — `03-META.md`'s three priority lists contain neither a store nor a pass |
| G5 | add an instance to a bay | `cid/art/_verified.md` — Environment has **0 spare** at the merged ceiling; `chunkDressing.variation.variantsDressedDifferently: 0` means a 9th chunk reuses its family signature and costs 0 assets |
| G6 | introduce a player-facing string | `vocabulary` binds every such string; `environment/04` F6 forbids a numeral, sign, marker or banner on a chunk |
| G7 | carry a window, countdown, expiry, or a gate on content | `02-GAMEPLAY.md` *"zero tension is deliberate"*; `03-META.md` *"never content access"* |
| G8 | be justified by retention, return rate, CCU, DAU, session count or revenue | `00-CORE.md`, two binding non-goals |
| G9 | fire any bump trigger while `storeMigration.everExecuted` is `false` | `release.rollback.publishMayNotProceedWhen` |
| G10 | request a flag of any class | `release.forbidden.N1`–`.N3`, `.N10`; `release.flags.permittedClasses` is one class and it only disables |

### Forbidden, diffed against the three closed lists

| id | thing | closed by |
|---|---|---|
| R-F1 | a daily reward, login streak or return bonus | `03-META.md` priority 3; `endgame.forbidden[dailyReward]`; `kpis.verdictRule.forbiddenActions` |
| R-F2 | a season, reward track or battle pass | `endgame.forbidden[seasonPass]`; `liveops/seasons` rules the key |
| R-F3 | a limited-time event | `endgame.forbidden[seasonalEvent]`; `release.forbidden.N2`; `liveops/events` rules the key |
| R-F4 | a code, redemption or group-join grant | `endgame.forbidden[redeemCode]`; `products` `F15`; `liveops/codes` rules the key |
| R-F5 | a leaderboard, comparative figure or trade | `endgame.forbidden[leaderboard, trading]`; `social` `X7` |
| R-F6 | rebirth, prestige, offline accrual, real procedural generation | `endgame.forbidden[rebirth, prestige, offlineAccrual]`; `03-META.md` priority 3 |
| R-F7 | a staged rollout, ramp, canary cohort, soft launch or percentage bucket | `release.forbidden.N1`, `.N4`, `.N10` |
| R-F8 | a flag keyed to a date, calendar or season, or one changing what content exists | `release.forbidden.N2`, `.N3` |
| R-F9 | a reserved slot, stub, empty track, calendar field, explicit null or "for a future update" note, in this key or in any key a drop touches | `performance.forbidden.N9`; `tech/deploy/02` — *an explicit null and a never-emitted key are the same bytes* |
| R-F10 | a second review cadence, an event calendar, or any recurring date | `kpis.cadence` closes; `kpis.verdictRule.forbiddenActions` |
| R-F11 | an in-game announcement that a drop happened, or that one is coming | no `notices.members` entry has a trigger a drop could fire — two beats plus `saveNotLoaded`, class `system`; `products` `F19`; `release.shutdown.playerFacing: "nothing"` |
| R-F12 | a maintenance, downtime or lockout notice around a drop | `release.forbidden.N8` — no permitted surface exists to explain one |
| R-F13 | a `MessagingService` broadcast or any cross-server announcement | `release.forbidden.N6` |
| R-F14 | a drop targeted at, varied by, or measured against a cohort of players | `release.forbidden.N4`; `social` `X7` |

```manifest
{
  "provides": "roadmap",
  "status": "proposed",
  "value": {
    "exists": true,
    "audience": "developer-facing, like kpis",
    "disposition": "DOCUMENTATION_ONLY",
    "neverReaches": "GameConfig",
    "playerFacingStrings": 0,
    "idNamespaces": {
      "finding": "three approved keys number their exclusion rows from one upward and mean different things. release.forbidden.N6 bans MessagingService fan-out; storeMigration.nonTriggers.N6 is 'products[] and every price', which is a permission. This key is the only sheet in the run that cites more than one of them, so it is the only place the collision is visible.",
      "collidingNamespaces": [
        { "path": "release.forbidden", "rowCount": 10, "owner": "cid/tech/deploy/01" },
        { "path": "storeMigration.nonTriggers", "rowCount": 8, "owner": "cid/tech/persistence/03" },
        { "path": "performance.forbidden", "rowCount": 13, "owner": "cid/tech/performance/03" }
      ],
      "citedHereButNotColliding": [
        { "path": "storeMigration.bumpTriggers", "rowCount": 7, "idPrefix": "B", "why": "B-numbered, so it shares no id with the three above. A citation namespace, not a colliding one." }
      ],
      "rule": "every citation of an exclusion row in this key is written dotted, as key.list.id. An undotted id is not a citation and satisfies no check. This field and the finding above are documentation prose describing the collision rather than citations, which is why criterion 2's scan is scoped to citation-bearing fields.",
      "citationBearingFields": ["closedBy", "why", "blockedBy", "rule", "migrationTrigger", "migrationTriggerReasoning", "migrationTriggerConfirmationOwed", "precondition", "costAgainst", "alsoCosts", "reversalCost", "whyOneDropAndNotTwo", "shipWindow"],
      "releaseForbiddenCitationSites": ["forbidden[].closedBy", "guardrails[].closedBy", "trigger.forbiddenTriggers[].closedBy", "idNamespaces.finding"],
      "releaseForbiddenCitationSitesWhy": "the first three are the only fields in this key that name a release exclusion row, and each names it in order to forbid or to close something, which is the compliant form the category brief states. The fourth is the single documentation site: it quotes the sixth release exclusion row to demonstrate the collision and forbids nothing. Zero entries in drops[], notADrop[], blocked[] or declined[] cite that list at all, and that is what criterion 2 clause 1 checks. This field states the rule and therefore holds no dotted id itself.",
      "ownIdPrefixes": ["D for drops", "T for forbiddenTriggers", "X for notADrop", "R-F for forbidden", "G for guardrails"],
      "ownIdsCollideWithNothing": "no id minted by this key is of the form Nn or Bn"
    },
    "dropUnit": {
      "definition": "a content unit: one or more changes to authored content, or to a content-shaping field in a merged key, shipped together through exactly one release publish",
      "isNotAReleaseVersion": "release owns version. A version is the shipping event and may carry zero drops; a hotfix is a version with no drop. A drop is what a version carries.",
      "minimumSize": "one field, or one authored asset",
      "batchingRule": "changes that trip the same storeMigration bump trigger ship as one drop, because the bump and its cleared discard are paid per publish and not per change",
      "countedBy": "roadmap.dropCount"
    },
    "dropCount": 1,
    "cadence": {
      "value": "none",
      "intervalDays": 0,
      "reason": "the platform's own cadence guidance rests on retention and anticipation, and 00-CORE.md declines retention as a goal [brief: binding]. The platform's success test for an update is a week-over-week comparison this project cannot perform: zero analytics calls in game/src and kpis.cadence closes. The reference sustained a weekly cadence for a year and sits at 12 to 16 percent of its all-time peak. No algorithm source in this project's bank names update frequency or recency.",
      "upholds": "OPEN.md section 2, 'Ships and settles. No seasons or events.'",
      "upheldOnTheMerits": "the line is [brief: soft] at 0 interview questions and would not hold on its tag. It holds on the five rows of evidence in this sheet's Why.",
      "reversalCost": "an interval reintroduces a trigger the game cannot read. Every drop would then carry readableToday false, and the first honest cadence would be a calendar with no instrument behind it."
    },
    "ordering": {
      "dated": false,
      "ordered": true,
      "orderedBy": "migration cost, not calendar. A drop ships on a publish that is already paying its bump, or it waits.",
      "containsNoDate": "no field in this key holds a date, an ISO timestamp, a day name, a month name, a week count or a quarter"
    },
    "drops": [
      {
        "id": "D1",
        "title": "the chunk-variety drop",
        "sourcedFrom": "03-META.md priority 2, 'richer authored chunk variety' [brief: soft]",
        "contents": [
          "raise layout.chunksPerFamily from 8 toward its published ceiling of 16",
          "author layout.anchorSource per chunk, replacing hash(layoutSeed, chunkId)"
        ],
        "whyOneDropAndNotTwo": "each lever alone trips storeMigration.bumpTriggers.B1 and each bump discards cleared, so shipping them separately pays the wipe twice for one outcome",
        "ownedFieldsMoved": ["layout.chunksPerFamily", "layout.anchorSource"],
        "fieldsThisKeySets": 0,
        "fieldOwner": "cid/gameplay/meta/05-area-layout.md holds layout. This key schedules the move and writes no number.",
        "dependsOn": [],
        "due": false,
        "dueStatus": "playtest unknown. Starting value false. Test: one session completing areas 1 to 3, after which the player is asked, unprompted, whether any stretch of ground was recognised as one already walked. cid/_playtest.md records n = 1, untimed, with nothing past area 1 observed.",
        "releaseGates": ["release.provisioning gate 1, publish", "release.provisioning gate 2, publishChecklist P1 to P4", "release.provisioning gate 6, republish then restart"],
        "releaseGatesNotApplicable": ["gate 3, networking re-resolution", "gate 4, create the pass", "gate 5, write the id"],
        "releaseGatesNotApplicableReason": "D1 needs no new product, so the six-gate provisioning sequence collapses to three",
        "migrationTrigger": "storeMigration.bumpTriggers.B1",
        "migrationTriggerReasoning": "layout.composition draws without replacement from the family seeded by (layoutSeed, areaOrdinal), so growing the family re-draws every existing run; and authoring anchorSource moves the grid. storeMigration.bumpTriggers.B1 names both the grid and the draw sequence.",
        "migrationTriggerConfirmationOwed": "cid/tech/persistence/03 holds storeMigration and confirms or denies that anchorSource authoring fires storeMigration.bumpTriggers.B1. This sheet states the reading and designs nothing.",
        "storeBump": "one increment of runtime.dataStoreName, to ArgaRuin_v4 if solvency's revision table has not landed, or v5 if it has",
        "costToPlayers": "cleared and clearedCount are discarded. The player restarts the live area with its ground standing and keeps every Shard, every held level, every revealed row and every Find.",
        "costUpperBound": "one area's patch run: 640 patches at today's depths.areas[8].chunkCount of 16 against layout.families[3].patchesPerChunk of 40, or 1120 if solvency's revision table lands at 28. The depth ladder times that as one lap, 93.5 seconds.",
        "costAgainst": "'Cleared is permanent' [brief: binding], and it happens silently because no notices.members entry has a trigger a content drop could fire",
        "precondition": "release.rollback.publishMayNotProceedWhen. storeMigration.everExecuted is false and game/test holds only config.spec.luau, so writing and running migration.spec.luau once is on this drop's critical path.",
        "shipWindow": {
          "w1": "while storeMigration.shippedToPlayers is false, inside release.tolerance.fullWipeCondition's pre-installed-base window. The wipe costs nobody anything and this is the cheapest window that will ever exist.",
          "w2": "after area-layout work makes the draw stable for existing runs under an append-only library. Stated here as a requirement and designed nowhere.",
          "never": "while an unexercised migration blocks publish, in either window"
        },
        "rideAlong": {
          "with": "storeMigration.openConsequences.W1",
          "what": "solvency's revision table moving depths.areas[].chunkCount to 4/5/7/10/15/18/25/28 and endgame.postTerminalArea to a 42-chunk, 1680-patch bay",
          "why": "storeMigration.openConsequences.W1 already fires storeMigration.bumpTriggers.B1 and .B2 and already discards cleared. D1 on the same publish costs zero additional wipes; D1 after it costs a second wipe for the same outcome.",
          "consequenceIfMissed": "D1's next free window is w2, which does not exist until area-layout work creates it"
        },
        "guardrail": ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
        "trigger": {
          "readableToday": true,
          "what": "an applied revision request against cid/gameplay/meta/05-area-layout.md naming layout.chunksPerFamily or layout.anchorSource",
          "readMechanism": "a git diff against that sheet's manifest block",
          "permittedSources": ["a kpis reading routed through kpis.verdictRule", "an entry in cid/_playtest.md"],
          "blockedBy": "none"
        }
      }
    ],
    "trigger": {
      "theOneReadableToday": {
        "kind": "repository state",
        "what": "an applied revision request against a named sheet and field",
        "readMechanism": "git diff on the owning sheet's manifest block",
        "why": "kpis.verdictRule already makes a breached row yield a revision request against a named sheet and field and never a live change. The applied request, not the reading, is the trigger; reading a number directly would publish a second review cadence, which kpis forbids.",
        "requiresNoDashboard": true
      },
      "forbiddenTriggers": [
        { "id": "T1", "condition": "a fall in CCU, DAU or any retention curve", "closedBy": "00-CORE.md, 'Beating the genre's retention curve. Offered and declined' [brief: binding]", "readableToday": false, "blockedBy": "zero AnalyticsService, LogService, FireEvent or LogCustomEvent calls in game/src" },
        { "id": "T2", "condition": "a week-over-week comparison of any metric", "closedBy": "kpis.cadence is a bounded window that closes; no standing review exists", "readableToday": false, "blockedBy": "zero analytics calls in game/src, and StoredState carries no timestamp, session id or run ordinal" },
        { "id": "T3", "condition": "elapsed calendar time since the last publish", "closedBy": "release.forbidden.N2, and cadence none above", "readableToday": true, "blockedBy": "none, and it is forbidden anyway, which is why it is listed" },
        { "id": "T4", "condition": "a session return rate or short-session re-engagement reading", "closedBy": "the algorithm source names these and this project measures neither; a discovery argument may not re-enter a declined retention decision", "readableToday": false, "blockedBy": "zero analytics calls in game/src" },
        { "id": "T5", "condition": "a player request, review, comment or community post", "closedBy": "the category's gap G1, the brief states no off-Roblox presence anywhere; products F15 closes every in-game intake surface", "readableToday": false, "blockedBy": "no intake channel exists in the brief or in the build; liveops/community rules on intake" },
        { "id": "T6", "condition": "revenue, a purchase count or a pass conversion", "closedBy": "00-CORE.md, 'Revenue. Offered and declined' [brief: binding]", "readableToday": false, "blockedBy": "every gamePassId is unprovisioned at 0 and no purchase has been made" },
        { "id": "T7", "condition": "a competitor or the reference shipping something", "closedBy": "unsourced as a design input, and the reference's own weekly cadence is the counter-evidence in this sheet's Why", "readableToday": true, "blockedBy": "none, and it is forbidden anyway" }
      ]
    },
    "notADrop": [
      { "id": "X1", "thing": "a price move on the one SKU inside 349 to 999", "why": "products permits it with no revision and storeMigration.nonTriggers.N6 makes it no bump. A value move, not a content unit.", "shipsBy": "re-emit, republish, restart" },
      { "id": "X2", "thing": "a store-name bump and its migration", "why": "storeMigration owns the procedure. It is a gate a drop passes through, not a thing that ships.", "shipsBy": "the same publish as the drop that forced it" },
      { "id": "X3", "thing": "a code hotfix", "why": "release.rollback.hotfixIs is re-emit, republish, restart, code only", "shipsBy": "release" },
      { "id": "X4", "thing": "executing publishChecklist P1 to P4", "why": "a gate; whether it is re-executed on a subsequent publish is release's question and is not answered here", "shipsBy": "release" },
      { "id": "X5", "thing": "any balance value: cost, growth rate, per-level factor, tier value or tier weight", "why": "storeMigration.nonTriggers.N1 and storeMigration.nonTriggers.N2 — nothing persisted is keyed by any of them", "shipsBy": "re-emit, republish, restart" },
      { "id": "X6", "thing": "any player-facing string that is not a found key or an upgrades id", "why": "storeMigration.nonTriggers.N4. Bound by vocabulary, which this key does not restate.", "shipsBy": "re-emit, republish, restart" },
      { "id": "X7", "thing": "an art asset swap at constant instance count", "why": "storeMigration.nonTriggers.N7 — no art asset is referenced by a persisted value. An addition is closed by guardrail G5, not by a migration.", "shipsBy": "re-emit, republish, restart" }
    ],
    "declined": [
      {
        "id": "duplicateRefinement",
        "was": "03-META.md priority 2, 'a duplicate-handling refinement' [brief: soft]",
        "closedBy": "discovery.repeat.possible false, cid/gameplay/systems/05 — 'no reachable duplicate exists, so nothing needs a sink'",
        "status": "already delivered before v1 ships. A priority-2 item retired by an approved key is a declined row, not a schedule slot.",
        "reversalCost": "nothing to build and nothing to undo. Reopening it means making repeats reachable, which is a layout draw change firing storeMigration.bumpTriggers.B1, plus a sink, against 02-GAMEPLAY.md's 'solve duplicates without adding a currency'."
      },
      {
        "id": "visitableRestoredRuins",
        "was": "03-META.md priority 2, 'visitable restored ruins' [brief: soft]",
        "closedBy": "social.plotAccess.othersMayEnter false, enforced by a collidable boundary; social.worldStateScope per-player; social.sharedState empty; social.maxCoPresenceSeparationStuds 128 against a 3000-stud lane at scope spawnMomentOnly",
        "status": "contradicts four approved fields, not a preference",
        "reversalCost": "a Pushing back section against cid/gameplay/social/01 and /02; a per-player world state becoming shared, which is a persistence redesign rather than a field; a replicated payload naming a second player, which social X7 forbids; and a moderation surface nobody holds, which liveops/community would have to write against an 8 to 14 age band"
      }
    ],
    "blocked": [
      {
        "id": "collectionPast24",
        "what": "growing the collection beyond 24 finds, for example 4 sets of 12",
        "offeredBy": "cid/gameplay/meta/04's Flagged to the developer section",
        "blockedBy": "ruling R-3 — the game is not expanded past eight areas and the under-scoping finding is recorded and declined, because the under-scoping argument is a retention argument",
        "alsoCosts": "storeMigration.bumpTriggers.B4 — any addition to collection.sets[].relics is a bump",
        "needsRuling": "the developer. Not decided here, and no slot is reserved for it."
      },
      {
        "id": "secondSkuOrdering",
        "what": "where a second product would sit in the drop order",
        "blockedBy": "the category's gap G7 — 03-META.md's three priority lists contain neither a store nor a pass, so there is no ordering to order it by",
        "needsRuling": "the developer, as a scope-ordering escalation. Inventing an ordering would be inventing the priority list the brief never interviewed."
      }
    ],
    "forbidden": [
      { "id": "R-F1", "thing": "a daily reward, login streak or return bonus", "closedBy": "03-META.md priority 3; endgame.forbidden dailyReward; kpis.verdictRule.forbiddenActions" },
      { "id": "R-F2", "thing": "a season, reward track or battle pass", "closedBy": "endgame.forbidden seasonPass; liveops/seasons" },
      { "id": "R-F3", "thing": "a limited-time event", "closedBy": "endgame.forbidden seasonalEvent; release.forbidden.N2; liveops/events" },
      { "id": "R-F4", "thing": "a code, redemption or group-join grant", "closedBy": "endgame.forbidden redeemCode; products F15; liveops/codes" },
      { "id": "R-F5", "thing": "a leaderboard, comparative figure or trade", "closedBy": "endgame.forbidden leaderboard and trading; social X7" },
      { "id": "R-F6", "thing": "rebirth, prestige, offline accrual, real procedural generation", "closedBy": "endgame.forbidden rebirth, prestige, offlineAccrual; 03-META.md priority 3" },
      { "id": "R-F7", "thing": "a staged rollout, ramp, canary cohort, soft launch or percentage bucket", "closedBy": "release.forbidden.N1, release.forbidden.N4, release.forbidden.N10" },
      { "id": "R-F8", "thing": "a flag keyed to a date, calendar or season, or one that changes what content exists", "closedBy": "release.forbidden.N2, release.forbidden.N3" },
      { "id": "R-F9", "thing": "a reserved slot, stub, empty track, calendar field, explicit null or for-a-future-update note, in this key or in any key a drop touches", "closedBy": "performance.forbidden.N9; tech/deploy/02 — an explicit null and a never-emitted key are the same bytes" },
      { "id": "R-F10", "thing": "a second review cadence, an event calendar, or any recurring date", "closedBy": "kpis.cadence closes; kpis.verdictRule.forbiddenActions" },
      { "id": "R-F11", "thing": "an in-game announcement that a drop happened or is coming", "closedBy": "no notices.members entry has a class or trigger a content drop could fire; products F19; release.shutdown.playerFacing nothing" },
      { "id": "R-F12", "thing": "a maintenance, downtime or lockout notice around a drop", "closedBy": "release.forbidden.N8" },
      { "id": "R-F13", "thing": "a MessagingService broadcast or any cross-server announcement", "closedBy": "release.forbidden.N6" },
      { "id": "R-F14", "thing": "a drop targeted at, varied by, or measured against a cohort of players", "closedBy": "release.forbidden.N4; social X7" }
    ],
    "guardrails": [
      { "id": "G1", "rule": "no drop raises depths.areaCount past 8 or adds content to the post-terminal bay", "closedBy": "R-3; endgame" },
      { "id": "G2", "rule": "no drop adds, renames or removes a collection.sets[].relics name", "closedBy": "R-3; storeMigration.bumpTriggers.B4" },
      { "id": "G3", "rule": "no drop adds, removes, renames or retypes a persisted field", "closedBy": "storeMigration.bumpTriggers.B3; stateShape" },
      { "id": "G4", "rule": "no drop adds a product, a price tier or a second SKU", "closedBy": "the category's gap G7 — there is no priority ordering to order it by" },
      { "id": "G5", "rule": "no drop adds an instance to a bay", "closedBy": "cid/art/_verified.md records 0 spare Environment instances at the merged ceiling; chunkDressing.variation.variantsDressedDifferently 0 means a new chunk variant reuses its family signature and costs 0 assets" },
      { "id": "G6", "rule": "no drop introduces a player-facing string", "closedBy": "vocabulary binds every such string; environment/04 F6 forbids a numeral, sign, marker or banner on a chunk" },
      { "id": "G7", "rule": "no drop carries a window, countdown, expiry or gate on content", "closedBy": "02-GAMEPLAY.md zero tension; 03-META.md never content access" },
      { "id": "G8", "rule": "no drop is justified by retention, return rate, CCU, DAU, session count or revenue", "closedBy": "00-CORE.md, two binding non-goals" },
      { "id": "G9", "rule": "no drop that fires any storeMigration bump trigger ships while storeMigration.everExecuted is false", "closedBy": "release.rollback.publishMayNotProceedWhen" },
      { "id": "G10", "rule": "no drop requests a flag of any class", "closedBy": "release.forbidden.N1 to release.forbidden.N3 and release.forbidden.N10; release.flags.permittedClasses is one class and it only disables" }
    ],
    "announcement": {
      "inGame": "none",
      "inGameClosedBy": [
        "no member of notices.members has a class or trigger that a content drop could fire: setComplete and areaComplete are beats, saveNotLoaded is class system and fires on a failed load. Stated as a predicate over the member list rather than as a member count, so a further member does not silently invalidate it.",
        "products F19 — no product is named, shown, priced or referred to anywhere inside the game",
        "release.shutdown.playerFacing is nothing"
      ],
      "consequence": "a drop happens silently, and a player whose area resets is told nothing about why",
      "external": "not this key's. Discovery and Marketing owns the store page, update notes, icon and thumbnail variants, and the update title-tag stem, which the category's gap G8 leaves without a name."
    },
    "invariantsForSchema": [
      "len(roadmap.drops) == roadmap.dropCount",
      "every drops[].id, declined[].id, blocked[].id and notADrop[].id is absent from endgame.forbidden",
      "roadmap.cadence.value == 'none' implies roadmap.cadence.intervalDays == 0",
      "no value anywhere in roadmap is null or undefined at any depth",
      "every exclusion-row citation in a field named by idNamespaces.citationBearingFields is dotted with its owning key and list",
      "every dotted citation of a release exclusion row lies in a field named by idNamespaces.releaseForbiddenCitationSites, and none lies in drops[], notADrop[], blocked[] or declined[]",
      "no field in this key states a count of notices.members"
    ]
  }
}
```

## Pushing back

**`05-OUTWARD.md`: *"new content can be added as new authored chunks without touching existing
systems. This design is unusually easy to extend"*** `[brief: soft]` ← `[I assumed]`, restated in
`OPEN.md §2`. **The first half is true and the second half is false, and the arithmetic is
above:** zero modules change, because `Layout.luau` reads the library size as a parameter — and
one store bump, one discarded `cleared` map, up to 640 patches (1,120 after `solvency`), and a
binding permanence promise broken with no channel to say it happened. Extension is cheap in
*systems* and expensive in *save state*. That is the sentence that made this roadmap look easy,
and this key is the first place it has been written down. I do not overrule its intent — I
schedule around it, which is why D1 exists at all rather than being declined.

## Consequences for other work

- **Area-layout work (`layout`).** Two asks, zero fields. **(a)** For D1 to ship after the first
  non-developer save exists, `composition` needs a draw whose first N picks for a given
  `(layoutSeed, areaOrdinal)` do not move when the family grows. I state the requirement and
  design none of it; if you rule a stable append-only draw a design you would take,
  `storeMigration.bumpTriggers.B1` stops firing for a library *growth*, D1's window opens
  permanently, and this sheet's ordering survives unchanged. **(b)** `chunksPerFamily` inside
  `[8,16]` is yours — I schedule the move and set no number.
- **Store-version work (`storeMigration`).** Confirm or deny that authoring `anchorSource` fires
  `bumpTriggers.B1`; my reading is that it moves the grid that row names. `openConsequences`
  should gain a D1 row beside `W1`, because the two co-ship for free and separately cost two
  wipes.
- **Depth-ladder and area-authoring work (`depths`, `endgame`).** The publish that executes
  `solvency`'s revision table is the one D1 rides. If it goes without D1, D1 loses its only free
  window.
- **Release work, store-version work and performance-budget work, jointly.** Your three exclusion
  lists number from one upward — ten rows, eight rows and thirteen rows — and mean different
  things. Nothing needs renumbering, but an undotted id is ambiguous across your three keys, and
  this sheet writes every one of them dotted. Any grep over exclusion ids, in verification, in a
  build check or in a later sheet, must namespace it or it will match the wrong list. **And it
  must also name the fields it scans**: `idNamespaces.releaseForbiddenCitationSites` is the
  four-field permitted set here, because a forbidden-trigger row citing the rule that closes it
  is a citation, not a schedule.
- **Notice-channel work (`notices`).** I request no further member, so D1 ships silently. My claim
  is a predicate over `notices.members` — no member has a trigger a drop could fire — not a member
  count, so adding a member does not invalidate it and adding an *announcement* member would,
  deliberately.
- **Feedback-intake work (`liveops/community`).** `cid/_playtest.md` is the only permitted
  non-dashboard source for a D1 revision request, and it records nothing past area 1 — which is
  exactly why `D1.due` is `false`.
- **Store-page and update-notes work (Discovery & Marketing).** Your input is: one drop, no
  cadence, no dates, nothing announceable inside the game. No title-tag stem is invented here.
- **Contract-and-seam work.** `roadmap` is developer-facing and needs `DOCUMENTATION_ONLY` so it
  never reaches `GameConfig`. The seven `invariantsForSchema` rows are the shape to write.

## Flagged to the developer

Two calls on the brief's silence. **The trigger — what re-opens the project:** an applied revision
request against a named sheet, and nothing else. The live alternatives were a calendar interval
(needs an instrument that does not exist) and "nothing ever re-opens it" (which makes priority 2 a
lie); I recommend as written. **The one real choice is D1's window:** ship it inside the
pre-installed-base window while the wipe is free, or ask `layout` for a stable draw and ship it
any time, or never ship it and strike *"richer authored chunk variety"* from priority 2. **I
recommend the first, riding `solvency`'s publish.**

## Acceptance criteria

1. `roadmap.dropCount === 1`, `len(roadmap.drops) === 1`, `roadmap.cadence.value === "none"`,
   `roadmap.cadence.intervalDays === 0`, and `roadmap.ordering.dated === false`. A
   case-insensitive scan of the serialised key for
   `monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|june|july|august|september|october|november|december|weekly|biweekly|fortnight|monthly|quarterly|q[1-4]\b|\d{4}-\d{2}-\d{2}`
   returns zero matches.
2. **Scoped to the fields that may carry a citation, because three approved keys number their
   exclusion rows from one upward.** Every one of the 13 names in `endgame.forbidden`, and every
   id matching `release\.forbidden\.N([1-9]|10)\b`, appears inside `roadmap` **only** in the four
   fields listed by `idNamespaces.releaseForbiddenCitationSites` — `forbidden[].closedBy`,
   `guardrails[].closedBy`, `trigger.forbiddenTriggers[].closedBy` (each of which names a
   `release` row in order to forbid or close something) and `idNamespaces.finding` (documentation
   prose that quotes one such id to demonstrate the collision and forbids nothing). **Zero occur
   anywhere in `drops[]`, `notADrop[]`, `blocked[]` or `declined[]`**, which is the breach this
   clause exists to catch. Ids matching `storeMigration\.(nonTriggers|bumpTriggers)\.` and
   `performance\.forbidden\.` are outside this criterion's scope and appear legitimately in
   `notADrop[]`, `declined[]` and `blocked[]`. And over the fields named in
   `idNamespaces.citationBearingFields`, and those fields only — `idNamespaces.finding` and
   `idNamespaces.rule` are documentation prose about the collision rather than citations —
   `grep -oE "(^|[^.[:alnum:]])N([1-9]|1[0-3])\b"` returns zero matches.
3. `grep -rn "AnalyticsService\|LogService\|FireEvent\|LogCustomEvent" game/src` returns zero
   matches; exactly one trigger in the key (`roadmap.trigger.theOneReadableToday`) has a
   `readMechanism` naming a repository artifact; and every `forbiddenTriggers[]` row whose
   condition names a player, session, metric or count carries `readableToday: false` with a
   non-empty `blockedBy` — exactly rows `T1`, `T2`, `T4`, `T5`, `T6`.
4. A recursive JSON scan of the `roadmap` value returns zero `null` and zero `undefined` at any
   depth, and zero empty strings; every stated absence is `"none"`, `false`, `0` or `[]`, per
   `cid/tech/deploy/02`. No field in the key states a count of `notices.members`; every reference
   to that channel is a predicate over its members.

## Not decided here

The value of `layout.chunksPerFamily` and the content of `layout.anchorSource`
(`gameplay/meta/05`, which holds `layout`; I schedule the move and write no number), and whether
the draw can be made stable under an append-only library — same sheet; the requirement is stated,
the design is not. Whether authoring `anchorSource` fires `storeMigration.bumpTriggers.B1`
(`tech/persistence/03`, which holds `storeMigration`; my reading is stated and is theirs to
confirm). Whether the three colliding exclusion lists are ever renumbered or namespaced at the
schema — contract-and-seam work; I state the collision, name the three row counts, and change no
other key. Whether the collection grows past 24 (the developer; R-3 against `meta/04`'s
`## Flagged`). Where a second SKU sits in any priority order (the developer). Whether an event, a
season or a code exists (`liveops/events`, `/seasons`, `/codes`, each ruling its own key — I
forbid them here only as roadmap slots, not as designs). What `notices` may say and how many
members it has (`ui-ux/feedback/03`, which holds `notices`; I assert a predicate over its member
list and request no member). Feedback intake, moderation, and whether `cid/_playtest.md` is the
process (`liveops/community`). Every mechanism of shipping — versions, environments, the
checklist, the gates, rollback, the restart delay, flags — and whether `publishChecklist`
`P1`–`P4` is re-executed on a subsequent publish (`tech/deploy/01`, which holds `release`; the
re-execution question is routed there and unanswered here). How anything is announced outside the
game, and the `[UPDATE]` title-tag stem (Discovery & Marketing — Name and Store Page; I do not
fill it). Any tuning value inside a drop (Balance).
