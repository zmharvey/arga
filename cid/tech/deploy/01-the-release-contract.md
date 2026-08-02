# 01 — The release contract

**Domain:** tech/deploy · **Category:** Tech & Data · **Wave:** 5

## Decision

A release is **one published place, one DataStore, two environments (Studio and live), and a
four-row publish checklist a human executes because no build step can** — plus an ordered
provisioning gate that puts *publish* before *pass creation*, a rollback that is a republish
rather than a restore, and exactly one permitted flag class: a hotfix kill-switch. All of it is
the proposed key `release`, carried whole by this sheet because `bridge/merge.mjs:132–141`
allows exactly one sheet to propose a key `[research: bridge/merge.mjs]`.

## Why

**Sized against artifacts.** *"Success is shipped artifacts, not players"* `[brief: binding]`
(`00-CORE.md`), so this must be executable and checkable, never highly available. No uptime
target appears below and that is the decision, not an omission.

**The checklist exists because four settings have no file.** `runtime.placeConfiguration` names
two and states that `TextChatService.ChatVersion` and voice chat *"are ALSO place configuration
and are NOT yet listed with owners"* `[research: architect/sheets/01-runtime.md]`. My routing
test: a place-configuration item is set in a settings surface, has no diff in this repository and
no build step can produce it → a checklist row. A project-file edit has a file and a diff a build
step could perform → `BUILD-ORDER.md`, and `04-tree`'s two edits stay where `04-tree` puts them
`[research: game/default.project.json]`.

**Avatar type: the player-choice option is the hazard, not R6.** The options are exactly
**R6 / R15 / R15 & R6**, set in Avatar Settings, which *"modifies underlying game defaults that
are not visible outside of the settings interface or accessible with scripts"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/studio/avatar-settings.md]`.
R6 is total and obvious. **R15 & R6 lets one joiner arrive R6, tool-less, while everyone else is
correct** — no error, no reproduction. The setting has no read-back, but `Humanoid.RigType` **is**
readable per character from a server script
`[research: https://create.roblox.com/docs/reference/engine/classes/Humanoid]`, which the
architect did not note, so P2 is asserted per spawn rather than not at all.

**Two rows have no read, differently.** Voice has none at any level:
`IsVoiceEnabledForUserIdAsync` is per user, not per experience
`[research: https://create.roblox.com/docs/reference/engine/classes/VoiceChatService]`.
`ChatVersion` is `[unverified]` — deprecated after legacy chat's removal on 30 Apr 2025, so a
place created today cannot be on `LegacyChatService`, which lowers the risk without closing the
row `[research: https://devforum.roblox.com/t/update-on-legacy-chat-deprecation-and-textchatservice-migration/3376880]`
`[research: https://create.roblox.com/docs/reference/engine/classes/TextChatService]`. Two
settling fetches ride in the key; until then both rows stand on a human tick and one joined test
client, and the row says so rather than implying an assertion exists.

**Two environments, and the shipped build writes from the wrong one.** `RunService:IsStudio()`
appears **exactly once** in `game/src`, at `init.server.luau:512` inside `onShutdown`; the
periodic save loop (`:479`) and `onLeave` (`:423`) are unguarded
`[research: game/src/server/init.server.luau]`, so a Studio play-test outlasting
`saveIntervalSeconds` writes test state to the live store — the corruption that guard exists to
prevent. Rule: **Studio may read the store and may never write it**, guarded inside
`persistence.save` once. A second place doubles the checklist and halves the number of times it
is executed correctly. `[cid: decided]`

**Provisioning: publish first.** A pass is created manually, there is no API to create one, and
**the experience must be published and accessible first**
`[research: https://create.roblox.com/docs/production/monetization/game-passes]`. That inverts
the naive order and is the whole gate list. The build runs at every gate with the id
unprovisioned, which sheet `02` makes possible by replacing the null with `0`.

**Version needs both halves because neither derives from the other.** The publish returns
`versionNumber`
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/usage-place-publishing.md]`;
`game.PlaceVersion` returns it live and `0` in Studio
`[research: https://create.roblox.com/docs/reference/engine/classes/DataModel]`
`[research: https://devforum.roblox.com/t/placeversion-only-returning-0/239154]`. The emit runs
*before* the publish, and nothing writes a stamp into the place file — so both, joined by a
ledger. The stamp reaches the build for free once `release` is promoted, with no emitter change
`[research: bridge/emit-config.mjs]`.

**Rollback is a republish.** A restore creates a new version and does **not** publish it
`[research: https://create.roblox.com/docs/projects/version-history]`; publishing does not evict
players, and a restart takes a 1–60 minute delay
`[research: https://create.roblox.com/docs/projects/update-games]`. **15 minutes**
`[playtest unknown]`, range 5–30, sized for disruption not data: `wiring.onShutdown` saves before
teardown, and 15 sits inside the 10–20 minute session `[brief: binding]`. The data half is
platform-bounded — successive writes inside one UTC hour overwrite permanently, so **rollback
granularity is one hour per key, not one save**
`[research: https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching]`.

**Shutdown gets a second chance, not a redesign.** `BindToClose` callbacks share 30 seconds
total `[research: https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose]`
— 16 parallel saves in one budget. `ServerRestartScheduled` fires before any of it, so saving
there makes `BindToClose` a retry. Additive; `wiring.onShutdown` is untouched.

**Staged rollout dies by scope, and naming it is the compliant way to kill it.** *"Ships and
settles. No seasons or events."* `[brief: soft]` (`OPEN.md §2`) plus priority 3's *"seasons and
events"* (`03-META.md`); a content-enablement flag is also *"never content access"* wearing a
hat. One class survives.

| id | item | readableBack | if it is wrong |
|---|---|---|---|
| P1 | `Players.MaxPlayers` = 16 | experience-level, readable | at the default 50, `plots` allocates 50 lanes and the row is 6,100 studs; boot warns, game runs degraded |
| P2 | Avatar type = R15 (**not** `R15 & R6`) | per character, `Humanoid.RigType` | R6: nobody holds a tool. `R15 & R6`: **one joiner** is tool-less, intermittently, with no error |
| P3 | `TextChatService.ChatVersion` | `[unverified]` — deprecated, no runtime read confirmed | every chat write in `world.configure()` is inert while `configure()` reports success |
| P4 | Voice chat disabled | **none at experience level** | an unmoderated audio channel exists against `social.chat.voice: false` |

```manifest
{
  "provides": "release",
  "status": "proposed",
  "value": {
    "sizedAgainst": "success is shipped artifacts, not players (00-CORE.md, brief binding). Executable and checkable, never highly available.",
    "routingRule": {
      "placeConfigurationRow": "set in a Studio or Creator Dashboard settings surface, no file in this repository, producible by no build step, verified by a human at publish time. Belongs here.",
      "projectFileEdit": "a diff against a tracked file a build step could perform. Belongs in BUILD-ORDER.md, not to CID.",
      "unownedProjectFileEdits": [
        "rename game/default.project.json UIForge -> Shared (architect/04-tree)",
        "delete or drop Workspace.Baseplate, whose top face is coincident with every plot slab at Y = 0 (architect/04-tree)"
      ],
      "unownedEditsStatus": "recorded, not performed and not re-decided; architect/04-tree routes both away from CID and this key respects that"
    },
    "publishChecklist": [
      {
        "id": "P1",
        "item": "Players.MaxPlayers",
        "surface": "Creator Dashboard > place > server size (equivalently Studio > Game Settings)",
        "valueOwner": "runtime.placeConfiguration.maxPlayers, value 16 — architect's, cited and not restated",
        "scriptable": false,
        "scriptableReason": "Players.MaxPlayers is read-only from a script",
        "readableBack": "experience",
        "readMechanism": "Players.MaxPlayers",
        "assertedBy": "world.configure() reads it at boot and warns naming social.maxPlayers when outside 12 to 20",
        "standsInForARead": "not needed",
        "failureIfWrong": "at the platform default 50, plots allocates 50 lanes and the plot row is 50 x 122 = 6,100 studs, so every spawn past the second neighbour exceeds social.maxCoPresenceSeparationStuds. The boot warns and the game still runs, degraded."
      },
      {
        "id": "P2",
        "item": "Avatar type",
        "surface": "Studio > Game Settings > Avatar > Avatar Type. The options are exactly R6, R15, and R15 & R6.",
        "valueOwner": "runtime.placeConfiguration.avatarRigType, value R15 — architect's. R15 & R6 does NOT satisfy it and this row exists to say so.",
        "scriptable": false,
        "scriptableReason": "Avatar Settings modifies underlying game defaults that are not visible outside of the settings interface or accessible with scripts",
        "readableBack": "perCharacter",
        "readMechanism": "Humanoid.RigType == Enum.HumanoidRigType.R15, readable from a server script on every spawned character. The SETTING has no read; the CHARACTER does.",
        "assertedBy": "the spawn path, per character: tool.equip() tests Humanoid.RigType and warns naming release.publishChecklist.P2 BEFORE it looks for RightHand",
        "standsInForARead": "not needed once the per-character assert exists",
        "failureIfWrong": "R6: no character has RightHand, tool.equip builds nothing, and no player in the place ever holds a tool. R15 & R6: one joiner in R6 is tool-less while every other player is correct — an intermittent per-player defect with no error and no reproduction, and the sharper of the two."
      },
      {
        "id": "P3",
        "item": "TextChatService.ChatVersion",
        "surface": "Studio > Explorer > TextChatService, ChatVersion property",
        "valueOwner": "must not be LegacyChatService. social.chat is off on all three surfaces.",
        "scriptable": false,
        "scriptableReason": "a place default, not a runtime write; setting it from a script at boot does not reconfigure chat that has already initialised",
        "readableBack": "unverified",
        "readMechanism": "unknown. The property still exists and is marked deprecated; no retrieved page states its runtime read behaviour under compatibility mode.",
        "settlingFetches": [
          "https://create.roblox.com/docs/reference/engine/classes/TextChatService#ChatVersion with the deprecation panel expanded",
          "https://devforum.roblox.com/t/chat-in-places-with-chatversion-as-legacychatservice-broken-completely/3904561"
        ],
        "riskReducer": "legacy chat support was removed 30 Apr 2025 and remaining experiences were auto-migrated from May 2025, so a place created today cannot be on LegacyChatService. This lowers the risk and does not close the row.",
        "assertedBy": "nothing server-side",
        "standsInForARead": "one joined test client on the published place shows no chat window and no chat bar, recorded on this row by the person publishing",
        "alsoRequired": "world.configure() may not report success for a chat write whose effect it cannot read",
        "failureIfWrong": "every chat write in world.configure() is inert while configure() reports success, so chat is off in the manifest and on in the place."
      },
      {
        "id": "P4",
        "item": "Voice chat",
        "surface": "Creator Dashboard > experience > Communication",
        "valueOwner": "disabled. social.chat.voice is false.",
        "scriptable": false,
        "scriptableReason": "enabled per experience in the Creator Dashboard",
        "readableBack": "none",
        "readMechanism": "none exists. VoiceChatService:IsVoiceEnabledForUserIdAsync is per user, not per experience, so it cannot answer whether the experience has voice enabled.",
        "assertedBy": "nothing server-side, and nothing can be",
        "standsInForARead": "a human tick on this row plus one joined test client with no voice indicator. Nothing else stands in, and no boot warning is possible.",
        "failureIfWrong": "an unmoderated audio channel exists between players, against social.chat.voice false and against social/03's rule that nothing passes between two players beyond sight and sound of their own work."
      }
    ],
    "version": {
      "runtimeSource": "game.PlaceVersion",
      "studioValue": 0,
      "liveValue": "the versionNumber the publish returned",
      "buildStamp": "2026-08-01.r1",
      "buildStampFormat": "<ISO date>.r<n>, n rising within a day",
      "buildStampReachesTheBuild": "GameConfig.Release.version.buildStamp, emitted structurally by bridge/emit-config.mjs once release is promoted. No emitter change is needed.",
      "bothNotEither": "the stamp cannot be derived from versionNumber because the emit runs before the publish that produces it, and PlaceVersion cannot be derived from the stamp because nothing writes a stamp into the place file. They are joined by the ledger.",
      "ledger": [
        { "buildStamp": "2026-08-01.r1", "placeVersion": "unpublished", "note": "nothing has been published; this row is the format, and the sentinel is declared here per cid/tech/deploy/02" }
      ],
      "assertedBy": "world.configure() logs the pair (game.PlaceVersion, GameConfig.Release.version.buildStamp) exactly once at boot",
      "mismatchMeans": "a live server whose game.PlaceVersion is below the newest published versionNumber is running old code. Publishing does not evict it; only a restart does.",
      "notASaveVersion": "runtime.dataStoreName is the SAVE version and moves for different reasons. A build stamp never gates a store read."
    },
    "environments": {
      "count": 2,
      "list": [
        {
          "id": "studio",
          "what": "Roblox Studio play-test, on the same place file",
          "placeVersion": 0,
          "dataStoreAccess": "read only",
          "why": "reading the live store makes a play-test realistic; writing it corrupts real saves with test data under the tester's own UserId"
        },
        {
          "id": "live",
          "what": "the one published place",
          "placeVersion": ">= 1",
          "dataStoreAccess": "read and write"
        }
      ],
      "storeName": "runtime.dataStoreName — one store, architect's, not restated here",
      "separatePlaceRejected": "a second place or universe doubles the publish checklist and halves the number of times it is executed correctly, and buys nothing for a project whose success test is shipped artifacts",
      "studioWriteRule": "no DataStore write path may run in Studio",
      "guardLocation": "inside persistence.save, once, rather than at its three call sites",
      "shippedGap": {
        "verified": "RunService:IsStudio() appears exactly once in game/src, at init.server.luau:512 inside onShutdown",
        "unguarded": ["the periodic save loop, init.server.luau:479", "onLeave, init.server.luau:423"],
        "consequence": "a Studio play-test lasting longer than runtime.saveIntervalSeconds writes test state to the live store — the exact corruption the onShutdown guard exists to prevent",
        "revisionRequest": "RR-5"
      }
    },
    "provisioning": {
      "unprovisionedIdValue": 0,
      "unprovisionedIdRule": "no code may call MarketplaceService:UserOwnsGamePassAsync with an id <= 0. entitlements resolves such a product to not-owned and its factor to 1.",
      "buildMustRunAtEveryGate": true,
      "gates": [
        { "n": 1, "gate": "publish the place", "produces": "placeId, versionNumber", "blocks": "gate 4", "why": "a game pass cannot be created until the experience is published and accessible, and there is no API to create one" },
        { "n": 2, "gate": "execute publishChecklist P1 to P4 and boot once", "produces": "four recorded observations, two of them human ticks", "blocks": "gate 6" },
        { "n": 3, "gate": "answer the mid-session pass re-resolution question", "owner": "tech/networking", "produces": "a re-resolution trigger and its authority rule", "blocks": "gate 4", "why": "entitlements resolves ownership once at join, products.F20 forbids persisting it, and products.F19 forbids every surface that could tell a player to rejoin. Creating the pass before this is answered ships a purchase that silently does nothing until the player leaves." },
        { "n": 4, "gate": "create the game pass in the Creator Dashboard, priced to match products.items[span].priceRobux", "produces": "gamePassId" },
        { "n": 5, "gate": "write the id into the sheet that owns products, and re-emit", "produces": "GameConfig.Products.items[1].gamePassId", "note": "the id is a value in a spec sheet, not in the place file. cid/gameplay/monetization/01 owns that field; this gate does not edit it on release's authority." },
        { "n": 6, "gate": "republish, then restart servers", "why": "publishing does not evict players and running servers keep the old code until restarted" }
      ],
      "externalPrerequisiteCitation": "products.externalPrerequisite states the what and the owner. This block states the ORDER, which is the part that inverts the naive reading, and RR-4 asks that sheet to add the published-first clause.",
      "revisionRequest": "RR-4"
    },
    "rollback": {
      "hotfixIs": "re-emit, republish, restart. Code only.",
      "restoreIs": "Version History, restore version N. A restore CREATES A NEW VERSION AND DOES NOT PUBLISH IT; publishing it and restarting servers is a separate act.",
      "runningServersKeepOldCode": true,
      "restartDelayMinutesAllowed": [1, 60],
      "restartDelayDefaultMinutes": 15,
      "restartDelayStatus": "playtest unknown, test range 5 to 30",
      "restartDelayReason": "sized for disruption, not for data. wiring.onShutdown saves every state before teardown, so a restart costs at most one unsaved tick; 15 minutes sits inside a 10 to 20 minute session so most sessions in flight finish.",
      "dataIsNotRolledBack": "restoring a place version restores code and place content and restores no save. DataStore versioned backups expire 30 days after being overwritten, and successive writes inside the same UTC hour overwrite permanently, so the effective per-key rollback granularity is ONE HOUR, not one save, at any save interval below an hour.",
      "granularityOwner": "Persistence owns the recovery mechanism; this key states its trigger and its granularity",
      "aDataFormatChangeIsNotRolledBackThisWay": "a store-name bump cannot be undone by restoring a place version, because the restored code reads the old store while the new saves sit in the new one. That rollback is the previous store name, which is runtime.dataStoreName's field and Persistence's procedure.",
      "publishMayNotProceedWhen": "a migration path has been written and never executed once against a real key. An unexercised migration is a publish blocker, not a caution."
    },
    "shutdown": {
      "budgetSeconds": 30,
      "budgetIsShared": "across every bound callback, not per callback",
      "worstCase": "16 states saved in parallel at runtime.maxPlayers 16",
      "preRestartSave": "on DataModel.ServerRestartScheduled, save every state immediately and record restartTime. BindToClose then becomes a second chance rather than the only attempt.",
      "preRestartSaveStatus": "ADDS a phase to wiring. It re-decides nothing in wiring.onShutdown, whose Studio skip and save-before-teardown order stand unchanged. Revision request RR-6.",
      "playerFacing": "nothing. Chat is off, no notice channel may carry a non-beat, and no permitted string exists, so a shutdown is silent and the platform's own behaviour is what the player sees.",
      "afterARestart": "a returning player loses at most one unsaved tick and claims a fresh plot slot; social/01 already requires layout stability across a rejoin, so the cleared set still names the same patches."
    },
    "tolerance": {
      "status": "cid: decided — the brief states no availability, uptime or data-loss position anywhere",
      "uptimeTarget": "none. No availability figure is promised and none is measured.",
      "plannedDowntime": "unbounded. The place may be left unpublished or broken; nobody is owed a running server.",
      "maxLossPerPlayerPerIncidentSeconds": 45,
      "maxLossPerPlayerBasis": "runtime.saveIntervalSeconds",
      "maxLossOnARestore": "one UTC hour per key",
      "fullWipeAcceptable": true,
      "fullWipeCondition": "acceptable ONLY while no player outside the development account holds a save under runtime.dataStoreName. The first published version a non-developer joins ends it, and at that moment a store bump stops being a rename and becomes a migration — Persistence's procedure, not this key's.",
      "why": "success is shipped artifacts, not players (00-CORE.md). A tolerance written against an installed base that does not exist would be fiction with a number on it."
    },
    "flags": {
      "permittedClasses": ["hotfixKillSwitch"],
      "countLiveToday": 0,
      "hotfixKillSwitch": {
        "shape": "a boolean field in a contract key, emitted into GameConfig like every other value",
        "mayOnly": "disable a behaviour that has already shipped and is wrong",
        "mayNever": "enable a behaviour, gate content, vary by player, vary by time, or be read from anywhere but GameConfig",
        "lifetimeReleases": 1,
        "removedBy": "the next release. A switch surviving two releases is a design change wearing a flag."
      }
    },
    "forbidden": [
      { "id": "N1", "thing": "staged content rollout by percentage or cohort", "closedBy": "OPEN.md §2 'ships and settles', 03-META.md priority 3 'seasons and events'" },
      { "id": "N2", "thing": "any flag keyed to a date, a calendar or a season", "closedBy": "03-META.md priority 3" },
      { "id": "N3", "thing": "any flag whose true/false changes what content exists", "closedBy": "03-META.md 'permanent multipliers only, never content access'" },
      { "id": "N4", "thing": "A/B buckets and any per-player variant assignment", "closedBy": "social/03 X7 — no snapshot may carry a second player's identity, and a bucket is a per-player server-held variant with no owner" },
      { "id": "N5", "thing": "remote config fetched at runtime from anything outside GameConfig", "closedBy": "the seam: a value that does not come from a sheet is a value nobody decided" },
      { "id": "N6", "thing": "MessagingService fan-out of any flag or any value", "closedBy": "cid/tech/_category.md scope gate — no cross-server state" },
      { "id": "N7", "thing": "a second place or universe used as a player-facing test ring", "closedBy": "release.environments, count 2" },
      { "id": "N8", "thing": "a maintenance or lockout flag that keeps players out of the live place", "closedBy": "there is no permitted surface to explain one; tone and firstSession.withheld forbid the string" },
      { "id": "N9", "thing": "any flag persisted into a player's save", "closedBy": "stateShape — seven persisted fields, one writer each, and no flag among them" },
      { "id": "N10", "thing": "a rollout schedule, a ramp, a canary cohort or a soft launch", "closedBy": "OPEN.md §2 'ships and settles'" }
    ]
  }
}
```

## Pushing back

**`architect/sheets/01-runtime.md:144–149`.** Its routing sentence says the player cap *"belongs
beside the two `game/default.project.json` edits `tree` already collects for the same reason."*
**It is not the same reason**, and `04-tree` is right. A settings surface has no file and no
diff; a tracked file has both. I keep `01-runtime`'s destination for the cap and overrule its
stated reason, which is what leaves the two edits routed away from CID.

## Revision requests issued

| id | target | ask |
|---|---|---|
| RR-1 | `architect/sheets/01-runtime.md:144–149` | strike *"for the same reason"*; route the cap by name to `release.publishChecklist.P1` and leave `04-tree`'s two edits where `04-tree` puts them |
| RR-2 | `architect/sheets/01-runtime.md:38` | the bullet is headed `ArgaRuin_v2` while lines 7, 79 and 99–102 say `v3`; **and its body argues v2's rationale** (`areaComplete`→`areasFinished`, narrowed `cleared`, new `rowsRevealed`), not v3's, which is the layout rewrite re-identifying every patch index. Fix the heading and the body |
| RR-3 | `architect/sheets/02-modules.md:652–653` | *"no player can own a pass until three ids exist"* is stale: `products.itemCount` is 1, one item `span`, one null id at `GameConfig.luau:1253` |
| RR-4 | `cid/gameplay/monetization/01-the-offer-ladder.md:116` | `externalPrerequisite.what` omits that **the experience must be published before a pass can be created**. One clause, not a re-decision |
| RR-5 | `architect/sheets/07-wiring.md`, `onSave` and `onLeave` | the Studio skip exists only on `onShutdown`; the periodic save and the leave save write to the live store from a Studio play-test. Guard inside `persistence.save` |
| RR-6 | `architect/sheets/07-wiring.md` | add an `onRestartScheduled` phase: `DataModel.ServerRestartScheduled` → save every state. Additive; `onShutdown` is unchanged |

## Consequences for other work

- **Save-write, session-locking and store-migration work (Persistence).** Rollback granularity is
  **one hour per key, not one save**, so a bad write is unrecoverable inside the hour it landed at
  any interval below an hour. A store bump is not undone by restoring a place version. The Studio
  write guard is yours to place, inside `persistence.save` once. The seam: you own the save
  schema's version, its migration and what a failed save does *inside* a session; I own what a
  deploy does around them.
- **Authority and re-resolution work (Networking).** Gate 3 blocks gate 4. Your answer is on the
  critical path of the only SKU, and no pass may be created before it exists.
- **Offer-ladder work (`products`).** RR-4, plus the null id becomes `0` under sheet `02` and
  every `UserOwnsGamePassAsync` call site needs a `> 0` guard.
- **Held-tool and spawn-path work (`tool`).** `tool.equip()` tests `Humanoid.RigType` and warns
  naming `release.publishChecklist.P2` before looking for `RightHand`, converting the
  `R15 & R6` case from an invisible per-player defect into a named warning.
- **Boot-configuration work (`world`).** Log the `(PlaceVersion, buildStamp)` pair once, and never
  report success for a chat write whose effect cannot be read.
- **Contract-and-seam work.** Promoting `release` puts `publishChecklist` into
  `GameConfig.Release` for free and **strips `forbidden`**, which `DOCUMENTATION_ONLY` drops by
  name — correctly, since those ten rows are checked by grep and review, not at runtime
  `[research: bridge/emit-config.mjs]`.
- **Roadmap work (Live Ops).** Staged rollout, seasonal flags and content-enablement flags are
  forbidden here by name; needing one reopens `N1`–`N3` against this sheet.

## Flagged to the developer

Two things the brief is silent on and I decided. **Tolerance:** no uptime target, 45 s of
acceptable loss per incident, full wipe acceptable until the first non-developer save exists. The
alternative is promising something unmeasurable. **Environments:** Studio plus one published
place, Studio read-only. The alternative is a second place as a test ring, at the cost of the
whole checklist twice per publish. I recommend both as written.

## Acceptance criteria

1. `release.publishChecklist` has exactly 4 rows; every row carries a non-empty `surface`,
   `scriptable`, `readableBack`, `assertedBy` and `failureIfWrong`; and every row whose
   `readableBack` is `"none"` or `"unverified"` carries a non-empty `standsInForARead` — exactly
   two rows do (P3, P4).
2. `grep -rn "UserOwnsGamePassAsync" game/src` shows every call site preceded by a test that the
   id is greater than zero, and a server started with `gamePassId` at `0` boots with no error and
   resolves `span` to not-owned with factor 1.
3. `grep -rn "IsStudio" game/src` matches at least one line inside `Persistence.luau`'s write
   path, and a Studio play-test running longer than `GameConfig.SaveIntervalSeconds` performs zero
   `SetAsync` or `UpdateAsync` calls against `GameConfig.DataStoreName`.
4. `release.flags.permittedClasses` has exactly one member, `release.forbidden` has ten rows, and
   `grep -rniE "season|rollout|abTest|variantBucket|MessagingService" game/src` returns nothing.

## Not decided here

The **values** inside `runtime.placeConfiguration` — architect's; I own the row, its read-back,
its assertion and its failure mode. The two `default.project.json` edits — routed by
`architect/04-tree` to whoever adds a project-file step to `BUILD-ORDER.md`, recorded here and
performed by nobody in CID. The save write, retry schedule, session lock and migration procedure
— Persistence, same wave. The re-resolution trigger for a mid-session purchase — Networking, same
wave. The store name and save interval — `runtime`. How an emitted config expresses absence,
including the `0` that makes gate 5 safe — sheet `02`, this domain, which carries no key and
constrains this one. What content ships and when — Live Ops, Roadmap.
