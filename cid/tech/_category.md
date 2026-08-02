# Tech & Data — category brief

**Wave:** 5. Source: `/Users/zachsmacbook/Desktop/Code/arga/concept/spec/incremental-spinoff-v2/`.
Read `HANDOFF.md` first.

This is an **assignment document.** It contains no Tech & Data decisions. Every quotation below
is copied from the brief with its original provenance tag attached. Where I rule, I rule about
*who owns a question*, never about the answer.

**Routing rule you inherit (from `HANDOFF.md`):** read `CONCEPT.md`, `00-CORE.md`, then every
numbered sheet up to and including the deepest layer your work touches. This category's subject
sits at layer 4, so the floor for all five domains is `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, plus **`OPEN.md §2`
("Technical shape") and `OPEN.md §5 #6`**, which is where your subject was batched.

**Do not read this document instead of the brief.** It tells you which lines bind *you*. If this
document and a sheet disagree, the sheet wins.

## Upstream, and one thing about it that is not normal

| input | state |
|---|---|
| Theme & Narrative approved specs | released (wave 1) |
| Gameplay stages 1–3 | closed (`cid/_verified.md`, `_verified-wave3.md`) |
| **Gameplay stage 4 — Balance & Tuning** | **FAIL. `cid/gameplay/_verified-wave4.md` line 3: "Stage 4 does not release."** |
| `architect/sheets/` — 7 technical keys | merged, `architect` COMPLETE 7/7 |
| `cid/_contract.md` | 25 creative keys, plus 9 wave-2 and 4 wave-4 proposals not yet promoted |

**Wave 4's numbers are provisional and you must treat them that way.** Sixteen defects sit on
top of a correct central claim, nine of them inside revision requests other agents will execute.
Every wave-4 figure you cite — the new `depths` ladder, the 3,480-stud lane, the 1,880-patch
post-terminal bay, the `clearTickRate` request — is cited from an unreleased stage. Cite it with
that status attached. Do not build a budget that silently assumes it landed.

## What the brief binds for this whole category

| constraint | tag | consequence |
|---|---|---|
| "**Cleared is permanent — overgrowth never returns.** … This is the payoff and it is load-bearing. Slow regrowth and decay-if-you-leave were both offered and declined." (`01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose: R2 Q1]` | World state *is* save data. This is the one genuinely novel technical risk in the design and it is the reason this category exists on this project. |
| "**No offline accumulation.** Nothing regrows, so nothing can accrue while away. Follows directly from permanence." (`01-FOUNDATION.md`) | `[brief: binding]` (derived from `[you chose: R2 Q1]`) | No timestamp is read on load to grant anything. A save may carry no `lastSeen` that any code path converts to income. |
| "**No offline accrual means no timestamp exploit** — a whole class of abuse the reference has and this design does not, purely as a side effect of cutting idle." (`04-PRESENTATION.md`) | `[brief: soft]` ← `[I assumed — not interviewed]` | Security's threat model is smaller than the reference's by exactly this class. Say so; do not model it. |
| "**The economy is the only thing worth cheating.** Clearing and currency awards must be server-validated, or a client claiming arbitrary clears owns the game." (`04-PRESENTATION.md`) | `[brief: soft]` ← `[I assumed — not interviewed]` | The mandate for server authority. It is soft **in the brief** and hard in CID: `economy.authority` is "server only; no client message carries a cost, an amount or a balance". |
| "**The collection is the second surface** — relic grants must be server-side, because with no paid content access the index is the one thing with prestige value." (`04-PRESENTATION.md`) | `[brief: soft]` ← `[I assumed]` | Two protected surfaces, not one. |
| "**Nothing else applies:** no trading, leaderboards, or PvP in scope." (`04-PRESENTATION.md`) | `[brief: soft]` ← `[I assumed]` | Reinforced hard by the scope gate below, where three of those are `[you chose]`-adjacent priority-3 items. |
| "Persist: collection state, per-area cleared state, upgrade levels, currency. **Per-area cleared state is the unusual one** — permanence means the world itself is save data, which grows without bound unless areas are collapsed to a completion flag once finished." (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — batched]` | The persisted set and the collapse are **already answered by `architect/03-state-shape`**. See "Off-limits" below. Persistence states the risk closed and does not re-solve it. |
| "Secure server-side: clearing, currency, relic grants." (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — batched]` | Three named surfaces. All three are server-side in the shipped code already. |
| "Watch: **instance count per area on mobile**, and **save size as areas accumulate**." (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — batched]` | **This is the entire performance instruction in the brief.** Two watch items and no number. |
| "**8–14, mobile-heavy, short sessions.**" · "10–20 minute active sessions" (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` | Mobile-first is binding as a direction. Save cadence, session locking and rejoin behaviour are sized against a 10–20 minute session. |
| "~70% mobile / ~25% desktop / ~5% console" (`00-CORE.md`) · "**Device:** mobile-first, ~70/25/5." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[I assumed — the split; the band was chosen]`, then `[you accepted: step 6 Q4]` | The split is soft and, per `cid/_state.md`, "uncorroborated by anything fetched". Cite it as soft or not at all. |
| "**Shared server, parallel progression, own areas, no mechanical interaction.**" · "**This choice avoided a hard problem:** areas are *permanently* cleared, so shared areas would mean shared persistent world state." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R6 Q2]` | There is no shared server-side world state, so there is no shared-state replication problem and no shared-state exploit. `social.forbidden X3` already bans "any server-held value more than one player's action increments". |
| "**Server size:** 12–20." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[I assumed — no source]` | `runtime.maxPlayers` fixed **16** inside that band and made it place configuration. Budgets are computed at 16, not 20 — see finding 4. |
| "**This game exists to prove the `arga` pipeline works end to end.**" · "Success is **shipped artifacts, not players**" (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | Build & Deploy is specifying release machinery for a project whose success test is artifacts. Size it accordingly and say you did. |
| "Ships and settles. No seasons or events." (`OPEN.md §2`, live-ops default) | `[brief: soft]` ← `[I assumed — batched]` | No seasonal rollout machinery, no content-flag scheduling. |
| "**Permanent multipliers only. Never content access.**" · "**Forbidden:** any paid area, relic, or set." (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` | An entitlement check may gate a multiplier and may never gate content. Anything that reads `state.owned` to decide what exists is a violation. |
| "**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.**" · "**This is a requirement, not a nicety**" (`04-PRESENTATION.md`) | `[brief: soft]` ← `[you accepted: R6 Q4]`, and `HANDOFF.md` lists it among six pre-design facts | Binds **Performance**: silhouette is the rarity channel, so no LOD, mesh-merge, imposter or distance-collapse rule may flatten patch shape. A budget that saves parts by making four tiers one shape breaks the accessibility constraint. |
| "**Input: movement only.** No aiming, clicking, or ability buttons." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q3]` — **overruled by ruling R-1** (`cid/_state.md`), contained to one input class, two verbs, four controls | The client-originated surface is exactly two channels. Do not widen it and do not re-argue R-1. |

## Scope gate

`03-META.md` priority 3, quoted in full:

> **Priority 3 — explicitly not in this project:**
> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events.

Its tag is `[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1 but no
explicit priority list was interviewed]`. **The ordering is soft; three members are not** —
rebirth is `[you chose: R2 Q2]`, real procgen is `[you chose: R5 Q1]`, offline accrual follows
from `[you chose: R2 Q1]`. Relay that distinction accurately; do not flatten it either way.

**No domain in this category may name, imply, build fiction around, reserve space for, or spec a
"future home" for any of those eight things.** Not as a stub, not as a schema field held open,
not as a flag, not as "if we ever add X". Naming one **in order to forbid it** is compliant and
is often the right move here — an explicit "no `OrderedDataStore`" is a checkable no-op, a
reserved `leaderboard` save field is a violation.

What that excludes concretely, since this category is where the temptation lives:

- **No `OrderedDataStore` and no ranking structure of any kind** (leaderboards). `social.forbidden X8` already says so.
- **No `MessagingService`, no cross-server state, no global counters** (leaderboards, trading, seasons).
- **No timestamp on the save that any path converts to income, and no `lastSeen` grant** (offline accrual).
- **No promo-code redemption path, no daily-grant field, no streak counter** (codes, daily rewards).
- **No feature-flag machinery whose stated purpose is staged content or seasonal enablement** (seasons and events). A flag for a *hotfix rollback* is Build & Deploy's legitimate subject and is not this.
- **No runtime generation of layouts.** `layout` composes authored chunks from one seed and that is settled.

Priority 2 — "richer authored chunk variety · a duplicate-handling refinement · visitable
restored ruins" — is "not now", not "never". You may state that a decision leaves room for one.
You may not spec it. **Visitable restored ruins is the one to watch:** it is the only priority-2
item that would turn per-player state into shared persistent state, so if a persistence or
replication decision would foreclose it, say so in one line and move on.

## What `architect/` already decided, and is therefore off-limits

Commit `a5171f1` moved the technical foundation out of CID. **`architecture-lead` does not run
and five domains spawn, not six.** `cid/_state.md` records this under "Graph nodes that no longer
describe reality". The architect's seven keys are decided ground. Read `architect/sheets/` before
you write a line; a sheet that re-decides any of the following fails verification for
duplicating an owner.

| architect key | what it settles — do not re-decide |
|---|---|
| `runtime` | `clearTickRate` 0.12 · `saveIntervalSeconds` 45 · `respawnDelaySeconds` 3 · `dataStoreName` `ArgaRuin_v3` · `layoutSeed` · `maxPlayers` 16 · the `placeConfiguration` block · `storeVersionHistory` |
| `modules` | 18 modules, their sides, responsibilities, `forbids` and criteria. **`world` is the answer to "`social` has no emitter path."** `pressables` is the one module permitted to author UI structure. |
| `stateShape` | 12 `PlayerState` fields, **7 persisted / 5 live**, one writer each; `states` keyed by `UserId`; the `Patch` and `ArmState` types; **there is deliberately no set-completion field** |
| `tree` | three roots, instance requires, `WaitForChild` policy, and **`game/default.project.json` may not be edited by anything in the build order** |
| `interfaces` | 36 entries; the **channel table**: every remote's name, class, direction, payload, originator and handler |
| `representation` | what each subject is as an Instance, assembled from primitives; no asset ids |
| `wiring` | 11 ordered phases — boot, join, spawn, death, purchase, tick, save, leave, shutdown, client boot, constructs. The publish point, save-before-teardown and the Studio-skip on `BindToClose` are all fixed. |

**Specifically, these are answered and yours only to cite:** the persisted field list; the store
name and save interval; the boot and join ordering; the remote inventory and its two
client-originated members (`RequestState`, `BuyUpgrade`); the snapshot's field list; that
clearing is a server-side proximity tick and never a `Touched` event; that ownership is resolved
at join and never persisted; that a finished bay has no patch Instances.

**What the architect explicitly did *not* decide, and handed to you by name:**

- "The DataStore **key format and retry policy** (`persistence`)" — `02-modules`, `03-state-shape`.
- "**Retry and backoff** inside `persistence`" — `07-wiring`.
- "What a snapshot is **serialised as on the wire** beyond the field list `protocol.snapshotShape()` fixes" — `07-wiring`.
- "**Purchase validation** (`progression`)" as a rule set — `01-runtime` names it as not-its-business.
- The **place-configuration and project-file steps with no owner** — `01-runtime` "Not decided here" and `04-tree` "Not decided here". See finding 1 and the contradiction note at the end.

## Every domain produces data, not only prose

None of the five owns a contract key today. **Each proposes exactly one**, as a fenced block
tagged `manifest`:

```json
{ "provides": "<key>", "status": "proposed", "value": { } }
```

`npm run bridge` reports a proposal and never merges it. Proposing a key that already exists is
an error — check `cid/_contract.md` (25 keys) **and** the seven architect keys above before you
name yours. The keys I expect, one per domain:

| domain | proposes | why it needs to exist |
|---|---|---|
| Persistence | `persistence` | a builder cannot write a DataStore call from "save the state" |
| Networking | `replication` | a builder cannot size a snapshot from "the HUD updates" |
| Security | `integrity` | a builder cannot write a validation rule from "server-validated" |
| Performance | `budgets` | a builder cannot build an environment or a tick from an adjective |
| Build & Deploy | `release` | a publish-time step with no data form is a step with no owner, which is the defect class this stage exists to remove |

If your subject genuinely has no data form, say so in one line and name the key you *would* need.
Do not write prose instead and hope.

## Domain assignments

### 01 · Persistence Lead → `/cid/tech/persistence/_lead.md`

**Owns:** the save schema · DataStore keys and partitioning · save cadence and session locking ·
migration and versioning · failure and rollback handling.
**Does not own:** what the saved values mean in play (Gameplay).

**Latitude: narrow on shape, wide on procedure.** The *what* is settled — `stateShape` fixes
seven persisted fields, `runtime` fixes the store name and the 45 s interval, `wiring.onSave` /
`onLeave` / `onShutdown` fix every call site. The *how* is almost entirely unwritten.

Binding on you, beyond the category table: **"Cleared is permanent"** `[you chose: R2 Q1]` is
what makes world state save data, and `OPEN.md §2`'s unbounded-growth warning `[I assumed]` is
**already closed** by `endgame.persistence.postTerminalAreasStoredAs` ("one integer count, never
one boolean per area") and `stateShape`'s `areasFinished`. Your job is to state it closed with
the bound, not to solve it again. The bound the architect asserts is "at most 640 keys in
`cleared` (depth 4), 24 in `found`, 3 in `rowsRevealed`, three integers and one map of held
levels" — **check that against wave 4's revised `depths`, which moves the largest area, and
against the 1,880-patch post-terminal bay.** If the payload bound moved, that is yours to say.

Genuinely open and yours:

- The per-player **key format** inside `ArgaRuin_v3`, and whether it is one key or partitioned.
- `GetAsync`/`SetAsync`/`UpdateAsync` selection, and the **retry and backoff** policy — named as unowned in three architect sheets.
- **Session locking.** Neither contract mentions it. 12–20 shared servers and 10–20 minute sessions means rejoin churn, and two servers holding one player is the classic duplication route in a game whose currency is the only thing worth cheating.
- The **DataStore request budget** at 16 players against a 45 s interval, plus the leave and shutdown bursts. If the budget does not fit, the interval is `runtime`'s and you raise a revision request rather than changing it.
- What a save failure does after *n* attempts, and the **rollback procedure**.
- The **migration procedure for the next bump**. The architect wrote "no v1 reader is written: nothing shipped to players" — true today, and it means the procedure has never been exercised. Category verification requires "the save schema has a migration path and a rollback procedure", so a stated "no reader, here is what a real migration would do" is the deliverable.

**Thin:** partitioning (one player, one small payload). Say so rather than inventing shards.

### 02 · Networking Lead → `/cid/tech/networking/_lead.md`

**Owns:** authority rules · remote event and function inventory · replication payloads and rate
limits · prediction and reconciliation · cross-server messaging.
**Does not own:** validation of incoming requests (Security).

**Latitude: narrowest in the category on inventory, real on budget.** `architect/05-interfaces`
already carries the full channel table — seven channels with class, direction, payload,
originator and handler — and `protocol` owns them end to end. **You do not re-enumerate the
remotes.** You size what crosses them.

Binding on you: `economy.authority` ("server only; no client message carries a cost, an amount
or a balance"), `input.clientOriginatedRemotes` = exactly `["RequestState", "BuyUpgrade"]`, and
`social.forbidden X7` — no snapshot carries any player identifier but the recipient's. Also
`04-PRESENTATION.md`'s **"Clearing and currency awards must be server-validated"**
`[brief: soft]` ← `[I assumed]`, which is the origin of the server-observes-never-asks shape.

Genuinely open and yours:

- **The wire form and size of a snapshot.** `wiring.onTick` pushes one `FireClient` per player per changed tick. At `clearTickRate` 0.12 that is ≤ 8.3/s/player; at the requested 0.04 it is ≤ 25/s/player across 16 players. Nobody has costed the bytes.
- **Rate limits on the two client-originated channels.** Security owns whether a `BuyUpgrade` is *valid*; you own how many per second the server will even look at. Note that `input.pressable.debounceSeconds` (0.35) is a *client* debounce and binds nothing on a modified client.
- **Reconciliation for the client-side shadow test.** `gameplay/mechanics/05` B5 requires "a client-side radius test that shadows the server's, and a snapshot that can restore an unconfirmed patch silently", with 80 ms and 250 ms budgets. That is prediction and reconciliation, it is stated as a requirement, and no technical sheet owns it. **It is yours.**
- What a duplicate or out-of-order snapshot costs, beyond `wiring`'s "every updater is idempotent".
- Finding 2 (below): **when server-side ownership authority is re-resolved.**

**Thin, and state it:** cross-server messaging is **absent**. No leaderboards, no trading, no
global state, `social.sharedState` empty. One line, with the scope-gate reason.

### 03 · Security Lead → `/cid/tech/security/_lead.md`

**Owns:** server-side validation rules per action · rate limiting and sanity checks ·
anti-teleport and anti-speed · duplication prevention · detection, logging, and response.
**Does not own:** the transport layer itself (Networking).

**Latitude: the widest in this category, and you should know why.** Your entire brief section is
`[I assumed — not interviewed]`, and `OPEN.md §1` says so out loud: **"Integrity is the least
defensible of them — it was never asked and never confirmed."** `OPEN.md §5 #6` lists "Integrity
surface as described" as an open assumption inherited by Tech & Data. **You may argue with the
integrity section with a reason.** You may not argue with `economy.authority`, which is
`[cid: decided]` and merged.

Binding on you: the three protected surfaces (clearing, currency, relic grants); the two
client-originated channels and nothing else; `input.verbs[buy].onPreconditionFail` is
`silentNoOp` and `input.pressable.rejectionCueOnFailedPrecondition` is `"none"` — **a rejection
cue is forbidden**, so "warn the cheater" is not available to you as a response; `products.F20`
(ownership never persisted); and the scope gate, which deletes trading, PvP and leaderboard
exploits entirely.

Genuinely open and yours:

- **A validation rule per client-originated channel.** Category verification checks exactly this: "every remote event has a matching server-side validation rule in Security". There are two, and `wiring.onPurchase` step 1 gives you the shape of one of them.
- **Position authority, which is the live exploit.** The server pays based on where the character is standing, and character CFrame is client-authoritative on Roblox. Nothing in either contract bounds it. Movement-only input means speed and teleport are *the* attack surface on the only thing worth cheating, and the brief's claim that "the economy is the only thing worth cheating" is true in a way that points straight here. This is your domain's real work.
- Rate limiting and sanity checks, and what a violation *does* given that no cue may be shown.
- **Detection and logging: name the gap.** There is no logging path in either contract. Analytics (also wave 5) owns *what to record*, explicitly "not how the pipe is built". So the pipe is unowned. Name it.

**Thin, and state each:** duplication prevention — `found` is a boolean map keyed by name and
`discovery.record.growth` forbids counts, so relic duplication is structurally impossible;
currency duplication reduces to the session-lock question, which is Persistence's. Anti-exploit
work for trading, PvP and ranking is **absent by scope**.

### 04 · Performance Lead → `/cid/tech/performance/_lead.md`

**Owns:** frame-rate and memory targets per device tier · part, tri, and texture budgets ·
streaming and LOD rules · instance and script cost caps · load-time targets.
**Does not own:** the art that has to fit inside the budget (Art & Visuals).

**Latitude: wide, because the brief gave you almost nothing.** Your `must_verify` in
`docs/cid-workflow.json` reads: *"Set budgets against the **device floor named in the brief**,
not against desktop."*

**The brief names no device floor.** I checked every sheet: `00-CORE.md` gives "~70% mobile /
~25% desktop / ~5% console" `[I assumed]`, `02-GAMEPLAY.md` gives "mobile-first, ~70/25/5"
`[you accepted: step 6 Q4]`, and `OPEN.md §2` gives "Watch: instance count per area on mobile"
`[I assumed]`. No RAM figure, no chipset, no year, nowhere. **So naming the floor is your first
deliverable and it is `[cid: decided]`, not `[brief: binding]`.** Attribute it to yourself,
verify it against something real, and put it in your manifest so every later budget derives from
one number. (`cid/gameplay/mechanics/_lead.md` hit the same wall: "never states a device floor
for any verb.")

Binding on you: the two `OPEN.md §2` watch items; the accessibility constraint (silhouette is the
rarity channel — no optimisation may flatten patch shape); and `plots.liveGeometry`, which
already fixed the instance-count mechanism ("the live bay only", "ground exists in every bay from
1 up to and including the live bay"), so **that lever is spent** and you are budgeting what is
left.

Genuinely open and yours: frame and memory targets per device tier · the per-plot and per-server
instance and part ceiling · script cost caps · streaming and LOD rules · load-time target · **the
tick cost model (finding 4)**.

Two numbers you inherit and should not take on trust: `art/objects/01` states 140 patches per
plot, `meta/04` states 640, wave 4 states up to 1,880 in the post-terminal bay. `_verified-wave4`
records the spread as a predicted conflict landing on you. And `runtime.maxPlayers` is **16**,
not the 20 wave 4 costed against.

### 05 · Build & Deploy Lead → `/cid/tech/deploy/_lead.md`

**Owns:** environment split (dev / test / live) · versioning · feature flags and staged rollout ·
hotfix and rollback procedure · shutdown and migration handling.
**Does not own:** what content ships and when (Live Ops — Roadmap).

**Latitude: wide, and you inherit the largest pile of genuinely unowned real work in this
category.** Binding on you: `00-CORE.md`'s **"Success is shipped artifacts, not players"**
`[you chose: R1 Q3]`, which sizes everything you write; and the live-ops default **"Ships and
settles. No seasons or events."** `[I assumed]`, which deletes staged content rollout.

The real work, all of it currently ownerless:

- **The publish-time checklist.** `runtime.placeConfiguration` names four items no script can execute: `maxPlayers` (16, `Players.MaxPlayers` is read-only from a script), `avatarRigType` R15 (**not scriptable and not emittable** — on an R6 place the tool welds to a limb that does not exist and builds nothing), and two the architect flagged with *no reliable read*: `TextChatService.ChatVersion` (if it is `LegacyChatService`, every chat write in `world.configure()` is inert while reporting success) and voice chat (per-experience in the Creator Dashboard, unreadable server-side). Two of the four are asserted at boot; two are not. **This is a checklist with an owner or it is a silent failure.**
- **The two `game/default.project.json` edits** `architect/04-tree` collected: rename `UIForge` → `Shared`, and delete-or-drop `Workspace.Baseplate`, whose top face is coincident with every plot slab at Y = 0. The architect routed these to "whoever adds a project-file step to `BUILD-ORDER.md`; **not to CID**". **Respect that: record them as an unowned operational step in your manifest and do not perform or re-decide them.**
- **Version identity.** Today the only version marker in the whole system is `runtime.dataStoreName`, which is architect's and is a *save* version, not a build version. There is no build version, no environment split, and no way to tell which contract revision produced a running place.
- **Three null `gamePassId`s.** Creating a game pass is "an operational act outside both contracts" (`02-modules`). It is an operational act, which makes it yours to sequence.
- Hotfix and rollback for a game whose only persistent artifact is a DataStore, and shutdown handling — noting `wiring.onShutdown` already skips Studio.
- **Finding 3 (below): the emitter's null representation.**

**Thin, and state it:** feature flags and staged rollout. One place, no players, no seasons, and
priority 3 excludes the thing staged rollout usually serves. A flag whose purpose is *hotfix
rollback* is legitimate; a content-enablement flag is a scope-gate violation.

## The four live findings, routed

**1 · `social` has no emitter path → mostly already answered; the residue is Build & Deploy.**
The architect answered the main body: `world` is a named boot module that executes collision
groups, both chat surfaces, and the forbidden-API surface at runtime, and `02-modules` states
why an emitter would have been worse ("a place-configuration emitter would have had to produce
`game/default.project.json` — the one file `tree` forbids this build from touching — to do
strictly less"). `game/src/server/World.luau` exists. **The residue is the four
non-scriptable items in `runtime.placeConfiguration`, two of which have no reliable read and no
named owner.** That is a publish-time checklist, and it goes to **Build & Deploy**. Networking
does not own it; Security does not own it.

**2 · A mid-session pass purchase does not apply until rejoin → Networking.**
`entitlements` resolves ownership once at join; `products.F20` forbids persisting it; R-4 removed
the in-game store; `products.F19` forbids every surface that could tell the player to rejoin.
Latent while every `gamePassId` is null, and live the moment finding-3's ids exist. The missing
thing is a **re-resolution trigger and its authority rule**, which is Networking's stated subject
("authority rules"). Two closures are forbidden in advance: **Persistence may not close it by
caching** (F20), and **Security may not close it by trusting a client message** (`economy.authority`).
Build & Deploy inherits the ordering consequence — do not create the passes before this is
answered.

**3 · `GameConfig.Economy.balanceCap` is `nil` → Build & Deploy.**
Verified in the shipped artifact: `game/src/shared/GameConfig.luau:383` reads `balanceCap = nil`,
and Luau drops a nil-valued field from a table constructor, so the key is absent at runtime. The
emitter has no representation for an explicit null. **This is generated-artifact fidelity, which
is a build-tool subject** — the fix, if one is wanted, is in `bridge/emit-config.mjs`. Harmless
today because "no cap" and "not emitted" mean the same thing to `progression`. Name it, give it a
data form, and say what class of key would break on it. Persistence should note the same hazard
applies to any nullable field it proposes.

**4 · `clearTickRate` 0.12 → 0.04 → Performance. I verified the cost; the answer is yours.**

What I checked in the shipped code, so you start from fact rather than from the request:

- The scan is **linear and per-player**: `game/src/server/Clearing.luau:392`, `for index, patch in ipairs(patches) do`, squared XZ distance, with the file's own comment "runs up to 640 times per player per tick".
- It **skips cleared patches by branch, not by removal**, so per-tick cost is O(patches in the live bay) and does **not** decay as the bay is cleared. Tripling the frequency triples a term that is flat across a lap.
- The driver is `task.wait(Config.ClearTickRate)` inside `while true` in a `task.spawn` (`Clearing.luau:485`).

Two things the request does not state and you must resolve:

- **At `runtime.maxPlayers` 16, not 20, the ceiling is 1,880 × 16 × 25 ≈ 752,000 distance tests per second**, not the 940,000 wave 4 costs it at. Both are the worst case (a full bay, nothing cleared). Balance costed against the brief's 12–20 band; the architect fixed 16.
- **`task.wait(0.04)` does not produce a 0.04 s period.** It resumes on the first heartbeat at or after the requested time, so on a 60 Hz server the realised period is 0.05 s — and `_verified-wave4.md` line 54 already records that **0.05 fails the invariant at the bay by 1% (1,863 against 1,880)**. Adopting 0.04 through the shipped loop shape therefore delivers 0.05 and fails the check it was requested to pass. A true 0.04 s period needs a different tick driver, which is a change to `clearing`'s shape rather than to a constant — and the tick driver is `architect`'s, so it reaches them as a request, not as your decision.

Wave-4 verification's own instruction: *"It blocks the build, and it should reach `architect` and
Tech — Performance as an open item with the cheaper alternative attached, not as a settled
value."* Note also that `runtime` acceptance criterion 2 (tick under 0.25 s) still passes at
0.04, and that lowering the tick **raises** the speed ceiling from 45.83 to 137.5, which Balance
already accounted for. **Performance owns the answer: accept the tick with a bucketing
requirement, accept it with a different driver, or send `depths.invariants[10]` back — the third
un-picks wave 4's footprints, so say which you are doing.**

## Domains judged thin for this game, and why that is stated rather than silent

- **Architecture — does not run at all.** Not thin: **absent**, by commit `a5171f1`. Module boundaries, service/controller split, dependency flow, shared utilities and naming conventions all moved to `architect/` under its own 7-key contract. `cid/tech/architecture/` is not written. Verification should read this as deliberate, not as a missing sixth domain.
- **Cross-server messaging (Networking) — absent.** No leaderboards, no trading, no global state, no shared world. `social.sharedState` is empty and `social.forbidden X3` bans any server-held value more than one player increments.
- **Duplication prevention (Security) — structurally closed, not designed.** `found` is one boolean per name, `discovery.record.growth` forbids counts and duplicate fields, so there is no quantity to duplicate. Currency duplication collapses into session locking, which is Persistence's.
- **Anti-exploit for trading / PvP / ranking (Security) — absent by scope gate.**
- **DataStore partitioning (Persistence) — thin.** One player, one bounded payload, no shared keys.
- **Feature flags and staged rollout (Build & Deploy) — thin.** One place, no players, no seasons; only the hotfix-rollback use survives.
- **Prediction (Networking) — thin but real.** There is one predicted thing in the whole game, the client-side shadow radius test in `mechanics/05` B5, and its reconciliation rule is unowned. Thin is not zero here.

Each of these gets a stated line in the owning domain's index. **A domain judged unnecessary is a
legitimate output; discovering it silently is not.**

## Gaps in the brief this category hit

Passed upward, not filled. Named with the domain that will have to decide each.

1. **No device floor anywhere in the brief**, while the graph's `must_verify` instructs budgets to be set against "the device floor named in the brief". → **Performance** names one as `[cid: decided]`. Related and worth a correction upward: `cid/gameplay/meta/01-the-area.md:39` cites "the brief's 3 GB device floor" — **the brief contains no such line**; the 3 GB floor is in a different spec, `concept/spec/syndicate-auction-test/04-PRESENTATION.md:113`. That sheet is adopted and shipped, so it is a revision request, not an edit.
2. **The entire integrity section is `[I assumed — not interviewed]`**, and `OPEN.md §1` calls it "the least defensible" of the zero-question items. → **Security** works from a soft mandate and should say so in its index rather than presenting it as binding.
3. **No session-locking position at all**, in a design with shared servers, short sessions and a single currency worth cheating. → **Persistence**.
4. **No logging or telemetry pipe.** Security's "detection, logging, and response" has nowhere to write; Analytics owns *what* to record and explicitly not the pipe. → **Security** names the gap; the pipe's owner is a cross-category question for the final pass.
5. **The server-size band is `[I assumed — no source]`** and `cid/_state.md` records the ~70% mobile figure as uncorroborated. Two of the three inputs to every capacity number in this category are unsourced. → **Performance** and **Networking** both cite them as soft or derive around them.
6. **No stated availability, uptime or data-loss tolerance**, which is what a rollback procedure is normally written against. The nearest thing is `00-CORE.md`'s "shipped artifacts, not players". → **Persistence** and **Build & Deploy** state the tolerance they assumed.
7. **Wave 4 has not released**, so this category is writing against provisional Balance numbers. That is a process gap, not a brief gap, and it is recorded here so the final pass does not mistake a citation of unreleased work for an error. → all five, and **Performance** most.

## One contradiction inside `architect/sheets/` that lands on this category

`01-runtime` "Not decided here" routes the place's player cap **back to CID**: *"That is a real
operational step with no owner inside `BUILD-ORDER.md`, and it belongs beside the two
`game/default.project.json` edits `tree` already collects for the same reason."* `04-tree` "Not
decided here" routes that same class of item **away from CID**: *"Routed to whoever adds a
project-file step to `BUILD-ORDER.md`; **not to CID**, which has no view on either."*

Same class of item, two destinations, in two sheets of the same contract. **Build & Deploy is
where it lands in practice** — it is the only domain in this pipeline whose stated subject is
"how changes get from a place file into production safely". My ruling is procedural and narrow:
**Build & Deploy records these steps and their owners as data, and performs and re-decides
neither.** The disagreement itself goes upward as a finding against `architect/`, because a
required step with two routings is the same defect as a required step with none.
