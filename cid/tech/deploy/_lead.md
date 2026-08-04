# Build & Deploy — domain index

**Category:** Tech & Data · **Wave:** 5 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md` (§1–§6),
`HANDOFF.md`; `cid/tech/_category.md`; `architect/sheets/01-runtime.md`, `02-modules.md`,
`04-tree.md`, `07-wiring.md`; `cid/_contract.md`, `cid/_state.md`, `bridge/schema.mjs`,
`bridge/merge.mjs`, `bridge/emit-config.mjs`, `game/default.project.json`,
`game/src/shared/GameConfig.luau`, `cid/gameplay/monetization/01-the-offer-ladder.md`.

## What the brief gave me

- **"This game exists to prove the `arga` pipeline works end to end."** · **"Success is shipped
  artifacts, not players."** (`00-CORE.md`) `[brief: binding]` ← `[you chose: R1 Q3]`
  — this sizes everything below. A release procedure for a project measured in artifacts is a
  procedure that must be *executable and checkable*, not one that must be highly available.
- **"Ships and settles. No seasons or events."** (`OPEN.md §2`, live-ops default)
  `[brief: soft]` ← `[I assumed — batched]` — deletes staged content rollout entirely.
- **Priority 3, quoted in full:** *"real procedural generation · rebirth · offline accrual ·
  codes · daily rewards · leaderboards · trading · seasons and events."* (`03-META.md`)
  `[brief: soft]` ← `[I assumed — the ordering]`; three members are harder than the ordering
  (`rebirth` `[you chose: R2 Q2]`, real procgen `[you chose: R5 Q1]`, offline accrual follows
  `[you chose: R2 Q1]`). **"seasons and events" is the member that touches my subject** and it
  forbids any flag whose stated purpose is content enablement or scheduling.
- **"Note that new authored chunks can be added without touching systems, so extension is cheap
  if ever wanted."** (`OPEN.md §2`, `05-OUTWARD.md`) `[brief: soft]` ← `[I assumed]` — a
  statement about *content* extensibility, not a licence to build rollout machinery for it.
- **"Server size: 12–20."** (`02-GAMEPLAY.md`) `[brief: soft]` ← `[I assumed — no source]`,
  fixed at **16** by `runtime.maxPlayers` and made place configuration. This is the origin of
  the first checklist row.
- **"Permanent multipliers only. Never content access."** (`03-META.md`) `[brief: soft]` ←
  `[you accepted: R5 Q4]` — binds my provisioning sheet: the thing being provisioned is a
  multiplier pass, and a flag or a staged rollout may never become a content gate by another
  name.
- **"8–14, mobile-heavy, short sessions"** · **"10–20 minute active sessions"** (`00-CORE.md`)
  `[brief: binding]` ← `[you chose: R1 Q4]` — the only sizing input to a server-restart window
  that exists anywhere in the brief.

## What the brief did not give me

Six gaps. None is filled here; each is routed.

1. **No availability, uptime or data-loss tolerance.** A rollback procedure is normally written
   against one. The nearest line in the whole brief is *"Success is shipped artifacts, not
   players."* → **01**, as `release.tolerance`, `[cid: decided]`.
2. **No environment split exists anywhere in the brief or the repo.** One place file, one
   `dataStoreName`, and the only environment discrimination in the system is
   `wiring.onShutdown`'s `RunService:IsStudio()` guard. Whether dev/test/live is one place,
   two, or Studio-versus-published is undecided. → **01**, `[cid: decided]`.
3. **No build version.** The only version marker in the system is `runtime.dataStoreName`
   (`ArgaRuin_v3`), which is a *save* version. Nothing identifies which contract revision
   produced a running place. → **01**. Research supplies the mechanism, not the decision.
4. **Two place settings have no owner and no read-back.** `runtime.placeConfiguration`
   `nothingElseIsPlaceConfiguration` names `TextChatService.ChatVersion` and voice chat, states
   "neither has a reliable read, so neither is asserted", and assigns neither. → **01**.
5. **No rule for how an emitted config represents an explicit null.** Verified: 16 sites in the
   shipped `GameConfig.luau` emit `nil` and are therefore absent at runtime. → **02**.
6. **No sequencing between a manual platform action and an automated emit.** `products`
   declares an `externalPrerequisite` and names an owner; nothing says where in a publish it
   sits or what a build does while it is unmet. → **01**, as `release.provisioning`.

**Scope check.** My subject is *not* entirely priority 3, but one part of it is: **staged
content rollout and any content-enablement or seasonal flag are excluded** by "seasons and
events" plus the "ships and settles" default. **No sheet is assigned to them.** The only flag
either sheet may name is a hotfix kill-switch, and naming staged rollout *in order to forbid
it* is the compliant form.

## Contract position

**I own no existing contract key.** `bridge/schema.mjs` holds 25 keys and `cid/_contract.md`
lists their owners; `architect/` holds 7 more. None covers publish-time state.
*(I could not run `npm run bridge -- --contract` — this agent has no shell. I read its two
inputs instead: `bridge/schema.mjs` top-level keys and `cid/_contract.md`'s derived table.
`release` collides with neither contract.)*

**I propose one key, `release`**, holding: the publish checklist as rows (item · surface ·
scriptable · readable-back · asserted-by · failure mode), version identity, the environment
split, the manual-provisioning gate order, the rollback and shutdown procedure, the stated
data-loss tolerance, and a `forbidden` list. It exists because **a publish-time step with no
data form is a step with no owner**, which is the defect class the last four items in
`cid/_state.md`'s "build-stage notes" all belong to.

## Why 2 sheets

The pile my category lead routed here is large — a checklist, version identity, environments,
provisioning, rollback, shutdown — but **it is one key**, and the merger enforces one owning
sheet per key (`bridge/merge.mjs:132–141`: a second sheet proposing `release` is a hard
problem, not a merge). Splitting it five ways would produce one sheet with a manifest and four
without, which is precisely the wave-1 shape this stage exists to stop. So sheet 01 carries
`release` whole, in the house style `products` and `social` already use — one key, many named
blocks. Sheet 02 is the single genuine *constraining* decision I own: a prohibition on the
emitted artifact's shape that applies to `release`'s own `gamePassId` field and to fifteen
other emitted nulls besides. It shapes values rather than being one, so it carries no manifest.
I considered and rejected a third sheet for manual-provisioning sequencing: `release.provisioning`
in 01 is the data, `products.externalPrerequisite` already names the owner, and `entitlements`
already treats a null id as not-owned — a third sheet would restate three decided things.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-release-contract` | Propose the `release` key whole, with these blocks and no others. **`publishChecklist`**: one row per setting no build step can execute, each with surface, `scriptable`, `readableBack`, `assertedBy`, and the exact failure a wrong value produces — covering `Players.MaxPlayers` (16; read-only from a script, readable, asserted by `world.configure()`), avatar type (**must be R15, not the "R15 & R6" player-choice option**, because a player joining R6 has no `RightHand` and `tool.equip` builds nothing; readable per-character as `Humanoid.RigType`), `TextChatService.ChatVersion` and voice chat (**neither readable server-side**, so each row must state what stands in for a read or that nothing does). **`version`**: how a running place is identified — the publish API returns `versionNumber` and `game.PlaceVersion` returns it on a live server and `0` in Studio, so decide whether a build stamp is derived from that, emitted beside it, or both, and what a mismatch means. **`environments`**: whether dev/test/live is one place, several, or Studio-versus-published, and which `dataStoreName` each may touch given `wiring.onShutdown` already skips Studio for exactly this reason. **`provisioning`**: the ordered gate list for values that only a manual platform action can produce — a game pass cannot be created until the experience is published, so the order is publish → create pass → paste id → re-emit → republish, and the build must run correctly at every step with the id still null; cite `products.externalPrerequisite` rather than restating it, and record that the mid-session-purchase re-resolution question (Networking) gates pass creation. **`rollback`**: what a hotfix is, given restoring a place version does **not** republish it and running servers keep the old code until restarted, plus the bleed-off window (1–60 min) sized against a 10–20 minute session. **`shutdown`**: the procedure around `BindToClose`'s 30-second budget and `ServerRestartScheduled`, without re-deciding `wiring.onShutdown`. **`tolerance`**: the data-loss and availability position, tagged `[cid: decided]`, since the brief states none. **`forbidden`**: name staged content rollout, seasonal flags and content-enablement flags in order to forbid them, and permit exactly one flag class — a hotfix kill-switch. Do not re-decide any value in `runtime.placeConfiguration`; you own the row, its verification and its failure mode, and `architect` owns the value in it. |
| 02 | `no-explicit-null-in-emitted-config` | Decide how an emitted config expresses "absent", given the verified mechanism: `bridge/emit-config.mjs:79` maps `null` and `undefined` to the literal `nil`, and Luau drops a nil-valued field from a table constructor, so **an explicit null and a never-emitted key are indistinguishable at runtime**. Sixteen fields in the shipped `game/src/shared/GameConfig.luau` are in this state (lines 197, 375, 383, 439, 550, 597, 706, 721, 737, 1000, 1239, 1253, 1286, 1354, 1552, 1696), and at least two are load-bearing rather than documentary: `Economy.balanceCap` (383) and `Depths.invariants.H1_axisCeiling.ceilings.value` (1286), where a builder iterating `ceilings` sees two axes and cannot tell "the value axis has no ceiling" from "the value axis is missing". Decide (a) whether an explicit null is permitted in an emitted value at all, (b) if not, the replacement convention per type and whether the emitter should hard-error on encountering one rather than silently emitting `nil`, (c) which of the sixteen sites are semantic and belong to their owning domain to restate versus documentary and safe to drop like `forbidden`/`invariants` already are, and (d) a grep-checkable criterion. Carry no `manifest` block: this is a rule about how any key is serialised, and it names `release` as the key it shapes. State a consequence line for whichever domains own the semantic sites; do not edit their sheets. |

## Ruling on the `architect` routing contradiction

`01-runtime` routes its item **back to CID**; `04-tree` routes its two **not to CID**. My
ruling: **`04-tree` is right, `01-runtime` is wrong, and they are not the same class of item.**
Calling them one class is the error, and it is `01-runtime` that makes that claim.

The distinguishing test, which I am putting in `release` as data:

- A **place-configuration** item is set in a Studio or Creator Dashboard settings surface, has
  no file in this repository, cannot be produced by any build step, and must be verified by a
  human at publish time. It has no home in `BUILD-ORDER.md` because there is no module to
  build. → a `release.publishChecklist` row. `Players.MaxPlayers`, avatar type,
  `ChatVersion`, voice chat.
- A **project-file edit** is a diff against a tracked file (`game/default.project.json`) that a
  build step could perform and is withheld only because `tree` forbids anything in the build
  order from touching it. It has a file, a diff, and a build-order-shaped hole. → whoever adds
  a project-file step to `BUILD-ORDER.md`. **Not CID.**

So `04-tree`'s two edits stay routed exactly as `04-tree` routes them; sheet 01 records them as
an unowned operational step in `release` and **performs and re-decides neither**, per my
category lead's ruling. `01-runtime`'s player-cap item does land here — but the sentence that
lands it here is wrong about why, and wrong about its neighbour.

## Revision requests issued (I do not edit `architect/`)

**RR-1 · `architect/sheets/01-runtime.md:144–149`.** Strike *"and it belongs beside the two
`game/default.project.json` edits `tree` already collects for the same reason."* It is not the
same reason: one is a settings surface with no file, the other is a tracked file with a diff.
Route the player cap by name to `cid/tech/deploy`'s `release.publishChecklist`, and leave
`04-tree`'s two edits routed where `04-tree` routes them.

**RR-2 · `architect/sheets/01-runtime.md:38`.** The prose bullet is headed **`ArgaRuin_v2`**
while the decision line (7), the manifest (79) and `storeVersionHistory` (99–102) all say
**`ArgaRuin_v3`**. It is not only a stale heading: the bullet's body argues the *v1→v2* shape
change (`areaComplete`→`areasFinished`, narrowed `cleared`, new `rowsRevealed`), which is v2's
rationale, not v3's. v3's rationale is the layout rewrite re-identifying every patch index, and
it is already correctly stated in `storeVersionHistory.ArgaRuin_v3`. Ask for the heading to
read `ArgaRuin_v3` and the body to carry v3's reason.

**RR-3 · `architect/sheets/02-modules.md:652–653`.** *"no player can own a pass until three ids
exist"* is stale. `products.itemCount` is **1** with one item, `span`, and the shipped
`GameConfig.luau:1217` agrees. One id, not three. (Correcting the same count in my own dispatch:
there is one null `gamePassId`, at `GameConfig.luau:1253`.)

**RR-4 · `cid/gameplay/monetization/01-the-offer-ladder.md:116`.** `externalPrerequisite.what`
says the pass must be *"created on the Roblox creator site"* without stating that the
experience must be **published first** — pass creation requires a published, accessible
experience. `[research: https://create.roblox.com/docs/production/monetization/game-passes]`
That inverts the naive order and is the whole of my `provisioning` gate. A one-clause addition,
not a re-decision.

## Verification note

**Sheet 01 is the one most likely to be contradicted, and by `architect` — specifically a
revision of `runtime`.** `release.publishChecklist` sits directly alongside
`runtime.placeConfiguration`, and the seam I have drawn (architect owns the *value* in a row,
I own the *row*, its read-back, its assertion and its failure mode) is a seam of my drawing,
not one either contract states. If a `runtime` revision absorbs the two unowned items rather
than leaving them, the two keys overlap and one must yield; sheet 01 should say in advance
which, and should reference `runtime.placeConfiguration` by key rather than copying its values.

**Second-most likely: Persistence, same wave.** Its `owns` includes "migration and versioning"
and "failure and rollback handling"; mine includes "shutdown and migration handling" and
"hotfix and rollback procedure". The split I am asserting is that **Persistence owns the save
schema's version, its migration procedure, and what a failed save does inside a session; I own
what a deploy does around them** — when a store-name bump may ship, whether a publish may
proceed with an unexercised migration, and the server-restart procedure that a data-format
change requires. Both sheets should name the seam; neither should restate the other. The
DataStore-version recovery facts in the research pack are Persistence's mechanism and my
trigger, and the one-hour granularity below is the number both will need.

## Research owed

`docs/cid-workflow.json` gives this node **no `must_verify`**. I fetched anyway, because the
writer has no fetch tools and my sheets have to justify themselves against the platform rather
than against memory. Everything below is a page I actually retrieved.

| claim | source |
|---|---|
| `Players.MaxPlayers` and `PreferredPlayers` are **read-only**; `RespawnTime` and `CharacterAutoLoads` are writable | `[research: https://create.roblox.com/docs/reference/engine/classes/Players]` |
| Avatar type options are exactly **R6**, **R15**, **R15 & R6**; set in Avatar Settings (File menu / Avatar tab); *"Avatar Settings modifies underlying game defaults that are not visible outside of the settings interface or accessible with scripts"* | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/studio/avatar-settings.md]` |
| `Humanoid.RigType` **is** readable from a server script at runtime and is not read-only — so avatar type has a per-character read even though the setting does not | `[research: https://create.roblox.com/docs/reference/engine/classes/Humanoid]` |
| Legacy chat support was **removed 30 Apr 2025**; auto-migration of remaining experiences began May 2025; the strategy was a compatibility mode rather than setting `ChatVersion` directly. `ChatVersion` is now marked **deprecated** on `TextChatService` | `[research: https://devforum.roblox.com/t/update-on-legacy-chat-deprecation-and-textchatservice-migration/3376880]` · `[research: https://create.roblox.com/docs/reference/engine/classes/TextChatService]` |
| **No server-readable property or method reports experience-level voice-chat enablement.** `VoiceChatService:IsVoiceEnabledForUserIdAsync` is per-user, not per-experience | `[research: https://create.roblox.com/docs/reference/engine/classes/VoiceChatService]` |
| Game passes are created **manually in the Creator Dashboard**, there is **no API to create one**, the **experience must be published and accessible first**, and the id must exist before `UserOwnsGamePassAsync` can use it | `[research: https://create.roblox.com/docs/production/monetization/game-passes]` |
| `DataModel.PlaceVersion` is read-only and readable at runtime; it returns **0 in a Studio play-test** and the published version number on a live server | `[research: https://create.roblox.com/docs/reference/engine/classes/DataModel]` · `[research: https://devforum.roblox.com/t/placeversion-only-returning-0/239154]` |
| Open Cloud publish: `POST https://apis.roblox.com/universes/v1/{universeId}/places/{placeId}/versions?versionType=Published`, `x-api-key`, `application/octet-stream` for `.rbxl`, response `{ "versionNumber": N }`, scope `universe-places` **Write** | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/usage-place-publishing.md]` |
| **Restoring a place version does not publish it**; a restore creates a new version, and making it live requires publishing and restarting servers | `[research: https://create.roblox.com/docs/projects/version-history]` |
| Publishing does not evict players; outdated servers drain naturally, or are restarted from Creations ⟩ Configure ⟩ Server Management with a **1–60 minute** delay; *"If your underlying player data format changes, you should probably restart servers"*; `DataModel.ServerRestartScheduled` fires with `restartTime`, `source`, `attributes` | `[research: https://create.roblox.com/docs/projects/update-games]` · `[research: https://create.roblox.com/docs/reference/engine/classes/DataModel]` |
| `BindToClose` callbacks have **30 seconds total**, shared across all bound callbacks | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud-services/data-stores/player-data-purchasing.md]` |
| DataStore versioned backups **expire 30 days** after being overwritten; the latest never expires; **successive writes within the same UTC hour overwrite permanently** — so at a 45 s save interval the effective rollback granularity per key is **one hour, not one save** | `[research: https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching]` |

**Verified in this repository rather than fetched:** `bridge/emit-config.mjs:79` maps
`null`/`undefined` to `nil`; 16 fields in `game/src/shared/GameConfig.luau` are emitted `nil`;
`products.itemCount` is 1 and `gamePassId` is null at `GameConfig.luau:1253`;
`bridge/schema.mjs` has 25 keys and none is `release`; `bridge/merge.mjs:132–141` rejects a
second sheet proposing one key; `game/default.project.json` still names `UIForge` and still
carries `Workspace.Baseplate`.

**Could not verify, marked `[unverified]` for the writer:** whether `TextChatService.ChatVersion`
can be *read* from a server script post-migration. The deprecation notice confirms the property
still exists on the class but no page I retrieved states its runtime read behaviour under
compatibility mode, and the architect's "no reliable read" is an assertion I could neither
confirm nor overturn. The fetch that would settle it is the full property detail on
`https://create.roblox.com/docs/reference/engine/classes/TextChatService#ChatVersion` with the
deprecation panel expanded, or a devforum reply from staff on
`https://devforum.roblox.com/t/chat-in-places-with-chatversion-as-legacychatservice-broken-completely/3904561`.
Treat the row as unreadable until then; the deprecation plus the April-2025 removal means a
place created today cannot be on legacy chat, which lowers the risk without closing the row.
