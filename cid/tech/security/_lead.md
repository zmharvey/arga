# Security — domain index

**Category:** Tech & Data · **Wave:** 5 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md` (§1, §2, §4, §5), `HANDOFF.md`;
`cid/tech/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_digest.md`;
`architect/sheets/03-state-shape.md`, `05-interfaces.md`; `game/src/server/Clearing.luau`,
`init.server.luau`, `Plots.luau`, `Progression.luau`; `game/src/shared/GameConfig.luau`;
`bridge/schema.mjs`, `bridge/verify-sheets.mjs`.

I could not run `npm run bridge -- --contract` — no Bash tool in this session. I read
`bridge/schema.mjs` (25 keys, listed with owners) and `cid/_contract.md` instead. **`integrity`
is not in the schema and is not one of the seven architect keys**, so it is free to propose.

## What the brief gave me

- "**The economy is the only thing worth cheating.** Clearing and currency awards must be
  server-validated, or a client claiming arbitrary clears owns the game." (`04-PRESENTATION.md`)
  `[brief: soft]` ← `[I assumed — not interviewed]`
- "**The collection is the second surface** — relic grants must be server-side." (same)
  `[brief: soft]` ← `[I assumed]`
- "**No offline accrual means no timestamp exploit.**" (same) `[brief: soft]` ← `[I assumed]`
- "**Nothing else applies:** no trading, leaderboards, or PvP in scope." (same) `[brief: soft]`
- "Secure server-side: clearing, currency, relic grants." (`OPEN.md §2`) `[brief: soft]`
- "**Cleared is permanent — overgrowth never returns.**" (`01-FOUNDATION.md`) `[brief: binding]`
  ← `[you chose: R2 Q1]`. This is load-bearing on sheet 01: a skipped clearing tick costs a
  legitimate player nothing permanent, because the patch is still standing on the next one.
- "**Input: movement only.**" (`02-GAMEPLAY.md`) `[brief: soft]`, contained by ruling R-1 to one
  input class and two verbs. The client-originated *game* surface is two remotes and no more.
- Binding from CID, not from the brief: `economy.authority` "server only; no client message
  carries a cost, an amount or a balance"; `input.verbs[buy].onPreconditionFail` `silentNoOp`;
  `input.pressable.rejectionCueOnFailedPrecondition` `"none"` — **a rejection cue is forbidden,
  so "warn the cheater" is not an available response**; `products.F20`.

## Pushing back

**The line:** *"The economy is the only thing worth cheating. Clearing and currency awards must
be server-validated, or a client claiming arbitrary clears owns the game."* Its tag is
`[I assumed — not interviewed]`, and `OPEN.md §1` names integrity as *"the least defensible"* of
the zero-question items.

The conclusion is right and the sufficiency is wrong, and the shipped game is the proof. Clearing
and currency awards **already are** server-validated in the strongest sense the sentence can mean:
`protocol.REMOTES` carries no clearing channel and no currency channel, `Clearing.luau` reads no
client message and uses no `Touched`, and `Progression.award` is reachable from one call site.
There is nothing for a client to claim. The game is still totally exploitable, because
"server-validated" was read as "server-*computed*", and the server computes from an input the
client owns: `Clearing.luau:345` takes `root.Position` and `:398` pays for every patch inside a
radius of it. Roblox's own guidance says a client with network ownership of its character can
"teleport to any position" and "set their Humanoid WalkSpeed to any value"
`[research: https://create.roblox.com/docs/scripting/security/network-ownership]`.

**So the sentence should read "server-validated *against a server-bounded position*"**, and
*"Nothing else applies"* is wrong by exactly one item: the character's XZ position is a
client-originated input, it is the only one that matters, and the brief never considered it.
The collection is not a second surface needing a second rule — `state.found` is written only by
`clearing`, at the instant a patch clears, so **one position bound protects both named surfaces**.
I am not overruling anything: the brief's mandate stands and gets stricter.

## What the brief did not give me

Named, not filled. Each routed to the sheet that must decide it.

| # | gap | routed to |
|---|---|---|
| 1 | **Position is never named as an input anywhere in the brief.** Both protected surfaces are paid out against it and no sheet in either contract bounds it. | 01 |
| 2 | **No latency, connection-quality or false-positive tolerance.** A movement validator is written against one, and the brief gives no device floor either (Performance is naming that one as `[cid: decided]`). Every slack constant in 01 is therefore `[playtest unknown]`, not derived. | 01 |
| 3 | **No response policy.** The brief never says whether this game kicks, bans, throttles or does nothing, and `rejectionCueOnFailedPrecondition: "none"` forbids telling the player anything. The whole ladder is `[cid: decided]`. | 03 |
| 4 | **No logging or telemetry pipe exists in either contract.** Analytics owns *what* to record and explicitly not the pipe, so the pipe has no owner. 03 names the kind of work and the interface it must accept; it does not build it. | 03 |
| 5 | **No stated bound on inbound payload size or call rate** on either remote. Networking owns the per-second figure by category ruling; nobody owns the *shape* until 02. | 02 |

## Why 3 sheets

I own no contract key today and propose exactly one, `integrity`, so the anchor gives me one
value sheet plus, sparingly, sheets for decisions that shape that key. Three decisions are
genuinely separate rather than one described three times: **what the server measures a payout
against** (a position rule, which is the entire exploit and which the brief never considered),
**what the server accepts from a client at all** (a per-channel admission rule over six channels,
four of which are platform-level and none of which is a position), and **what happens and what is
recorded when either fails** (a response ladder constrained by a forbidden cue, plus a logging
interface with no owner). Merging 02 into 01 would put a string-length rule inside a kinematics
decision; merging 03 into either would split one response ladder across two sheets, since a rate
violation and a displacement violation must resolve the same way or a builder writes two policies.
Splitting further was available and refused: duplication prevention, relic-grant validation and
the timestamp class are all structurally closed or deleted by scope, and each is one stated line
below rather than a sheet. Sheet 01 carries the `manifest`; 02 and 03 carry `"amends": "integrity"`
blocks, which is the pattern `theme/vocabulary/02` established and which `bridge/verify-sheets.mjs`
accepts as a data form — two sheets claiming one key is a merge error.

| # | sheet | must decide |
|---|---|---|
| 01 | `position-authority` | Decide that `clearing.tick` measures its radius test from a **server-held XZ clearing origin** rather than from `HumanoidRootPart.Position`, and fix, as data: the per-tick step bound as a formula over `modifiers.effective(state, "speed")` and **measured** elapsed time (never the `clearTickRate` constant, because `task.wait(0.12)` returns a period ≥ 0.12 that grows under load and a validator using the constant false-positives on every server hitch); the straight-line catch-up rule that lets a lagged origin sweep the segment it skipped; the leaky-bucket accumulator that decides when a deviation is a *violation* rather than latency `[research: create.roblox.com/docs/scripting/security/network-ownership]`; the exactly-four legitimate discontinuities that re-anchor it (`plots.spawn`'s return at join, `onSpawn`'s `PivotTo`, `plots.advance`'s return on area completion, and nothing else); and where the origin is stored **without adding a thirteenth field to `PlayerState`**, which `architect/03-state-shape` fixes at twelve with one writer each — `server-main`'s `spawnPoses` table is the precedent for a module-local map keyed by `UserId`. Write out the two ladder maxima with their derivations (effective speed max **30.72** studs/s = `16 + 6 × 1.6` × the 1.2 `vault` set factor, no speed product, under a 45.83 clamp that therefore never binds; effective radius max **36.04** studs = `5.5 + 8 × 1.1` × 1.44 set × 1.75 `span`, under a 60 clamp that never binds) and state that a 36-stud legitimate reach means **displacement rate, not distance-to-patch, is the only discriminator**. Carries the `manifest` proposing `integrity`. Every slack constant is `[playtest unknown]` with a starting value and a test range; none of them is derived and none may be presented as sourced. |
| 02 | `channel-admission` | Decide, per client-originated channel, exactly what the server accepts and what an inadmissible message does. Six channels, enumerated in this index: `BuyUpgrade` (exactly one argument, `type == "string"` — already checked at `init.server.luau:445` — plus a **bounded byte length**, which is not, plus membership in `GameConfig.Upgrades`); `RequestState` (exactly zero arguments, and today an unbounded `OnServerInvoke` that builds a whole snapshot per call at `init.server.luau:582`); and the four platform channels — character CFrame, `Humanoid.WalkSpeed` (the server writes it on spawn and on purchase only, so a client overwrite persists until the next spawn), menu Reset Character (client-triggerable at will, and each cycle runs `World.onCharacter`, a `PivotTo`, a WalkSpeed write, a `Tool.equip` Model build and a snapshot push), and client-owned character instances (no gain: patches are `Anchored = true` at `Plots.luau:263` and `tool.clearsOnContact` is false — say so, so nobody hardens a closed surface). Restate the purchase precondition set the architect handed over as a rule set (`known id`, `heldLevel < def.maxLevel`, `currency >= upgradeCost(def, heldLevel)`, nothing partial, nothing refundable). Inadmissible means **dropped, no reply, no cue, and no `warn`** — a `warn` on a client-controlled path is a log a client can fill on demand, which the shipped comment at `init.server.luau:447` already knows. **Cite `replication`'s per-second ceilings; do not restate a rate number** — Networking owns that figure by category ruling and a second copy is a collision. Emits `"amends": "integrity"` with a `channels[]` array. |
| 03 | `violation-response-and-logging` | Decide what a violation does and what is recorded, under a hard constraint: `input.pressable.rejectionCueOnFailedPrecondition` is `"none"` and `input.verbs[buy].onPreconditionFail` is `silentNoOp`, so **no player-facing rejection, message, rubber-band or cue is available** — and `response.controlEverAffected` is false, so a server-side pull-back of the character is a decision that must be argued against that key, not assumed. Fix the full ladder as data: what a first deviation does (nothing, by construction, if 01's origin makes the exploit yield zero), what a sustained one does, whether kick or ban exists in this game at all and on what evidence and after what confidence, and what a player who is throttled can still do. Fix the per-violation log record's exact fields (which must carry no player-authored string — `social.forbidden X9` — and no identifier but the subject's) and **its own rate cap**, since an unrate-limited log is the second denial-of-service. Then state plainly that **no logging or telemetry pipe exists in either contract**: Analytics owns what to record and explicitly not how the pipe is built, so name the kind of work that must own it and the interface it must accept, and do not build one. Emits `"amends": "integrity"` with `response` and `logging`. |

## Contract key

**`integrity`, proposed, owned by `tech/security`.** Not in `bridge/schema.mjs` and not one of the
seven architect keys. What it holds: `positionAuthority` (the origin rule, the step-bound formula,
the re-anchor list, the accumulator and its constants), `channels[]` (one admission record per
client-originated channel, including the four platform ones), `response` (the ladder), and
`logging` (the record shape and its cap). A builder cannot write a validation rule from
"server-validated", which is the whole reason the key has to exist.

## Considered and deliberately not assigned

- **Duplication prevention — structurally closed, not designed.** `found` is one boolean per name
  (`discovery.record.growth` forbids counts), so there is no quantity to duplicate; there is no
  trade, no drop and no shared value (`social.forbidden X3`), so there is no transfer path; and a
  finished bay holds no record in `state.patches`, so no rejoin can be paid for it twice. What is
  left is one player's state live in two servers, which is **session locking and Persistence's**.
- **Relic-grant validation.** The brief's second protected surface. `state.found` is written only
  by `clearing` at the instant a patch clears, so it is protected by sheet 01 and by nothing else.
  A second sheet would be one decision described twice.
- **Timestamp and offline-accrual exploits — deleted by the design**, not defended against. No
  save field is converted to income and there is no `lastSeen`. The brief's own claim, confirmed.
- **Anti-exploit for trading, PvP and ranking — absent by the scope gate.** Priority 3.
- **Rate-limit numbers.** Mine is the sanity check; Networking's is the per-second ceiling.
- **`Workspace.AuthorityMode = "Server"`.** Roblox ships a server-authority model in which "the
  server is the single source of truth" and movement validation moves off the client, which is
  precisely what sheet 01 hand-rolls
  `[research: https://create.roblox.com/docs/projects/server-authority]`. **I am not speccing it**:
  it requires `NextGenerationReplication`, `PlayerScriptsUseInputActionSystem`, `SignalBehavior`
  Deferred, `UseFixedSimulation` and `StreamingEnabled`, all of which are place configuration, and
  place configuration with no script path is the residue the category routed to publish-time
  checklist work [currently Build & Deploy]. It would also touch `input` and Performance's
  streaming rules. Recorded as data in 01 as an alternative with its prerequisites, and routed —
  not decided, and not designed around.

## Consequences for neighbouring subjects

- **Tick-cost work** [currently Performance] gains one vector subtract, one squared-length and one
  clamp per player per tick from 01, on top of the 640-to-1,880-patch scan. And **every bound in
  01 is a function of the tick period**: the wave-4 `clearTickRate` 0.12 → 0.04 request moves the
  speed *clamp* from 45.83 to 137.5 and shrinks the per-tick step by 3×. If that request lands,
  01's constants are re-derived, not adjusted.
- **Module-shape work** [currently `architect`, `02-modules` / `07-wiring`]: 01 adds a step to
  `clearing.tick` between the arming gate and the radius read, and needs a store for the origin.
  It may not add a `PlayerState` field. This reaches `architect` as a request.
- **Channel-rate work** [currently Networking]: 02 cites `replication`'s ceilings and sets none.
  `RequestState` is today an unbounded `OnServerInvoke`; that number is theirs.
- **Session-lock work** [currently Persistence]: the only surviving duplication route is theirs.
- **Publish-time checklist work** [currently Build & Deploy]: the server-authority prerequisites
  above, if that route is ever taken.

## Verification note

**Sheet 01 is the one most likely to be contradicted**, in two ways and by two owners. Balance and
Performance own the tick period, and every number in 01 is derived from it, so a `clearTickRate`
change contradicts the sheet arithmetically rather than in judgement. The architect owns
`clearing`'s shape and `PlayerState`'s twelve fields, and 01 requires a step inside `tick` and a
place to keep a `Vector3`; if the architect refuses both, the ruling survives but its
implementation does not, and that reaches them as a request rather than as an edit. Sheet 03 is
the one most likely to be *unresolvable* rather than contradicted: it depends on a logging pipe
nobody owns, and a cross-category pass has to settle that.

## Research owed

`docs/cid-workflow.json` gives `security-lead` **no `must_verify`**. I fetched anyway, because
whatever I bank is the only external evidence my writer can cite.

**Fetched and citable:**

- `https://create.roblox.com/docs/scripting/security/network-ownership` — a client with network
  ownership can "teleport to any position", "manipulate their movement and state, such as flying
  or changing their speed", and "set their Humanoid WalkSpeed to any value". Recommends
  "leaky bucket-style accumulators … for handling burst movements while preventing sustained
  violations" and "projecting movement onto specific planes (e.g. XZ for ground-based movement)",
  and warns that "basic heuristics can flag innocent players with unstable connections" and that
  position updates "requir[e] averaging over time". **This is the sourced basis for 01's shape** —
  XZ projection and a bucket, not a per-tick hard rejection.
- `https://create.roblox.com/docs/scripting/security/security-tactics` — "The server must be the
  ultimate source of truth"; exploiters can "Fire or invoke RemoteEvents and RemoteFunctions at
  any frequency with arbitrary arguments (besides the first Player argument)"; "Never trust the
  client".
- `https://create.roblox.com/docs/physics/network-ownership` — "the server always owns anchored
  BaseParts and you cannot manually change their ownership" (this is why `Plots.luau:263`'s
  `Anchored = true` closes the patch-manipulation surface); "Roblox cannot verify physics
  calculations when a client has ownership over a BasePart."
- `https://create.roblox.com/docs/projects/server-authority` — the model, and its five Workspace
  prerequisites, quoted in "Considered and not assigned" above.

**Could not verify, and named so a later fetch can settle each:**

- **Whether the server-authority model is in beta.** The two Roblox pages I fetched disagree:
  the network-ownership page calls it beta, the server-authority page states no beta status.
  `[unverified]` — settle by fetching `create.roblox.com/docs/projects/server-authority` again
  against the Roblox release-notes index. Nothing in my sheets rests on it.
- **`task.wait`'s resume granularity**, i.e. that `task.wait(0.12)` realises ≈0.133 s on a 60 Hz
  server. The category brief asserts the equivalent for 0.04 → 0.05. I did not fetch a page
  proving it, so the *specific* figure is `[unverified]`; **01 does not need it**, because the
  ruling is to measure elapsed time rather than assume the constant, and that is strictly correct
  whatever the granularity turns out to be. Settle by fetching
  `create.roblox.com/docs/reference/engine/libraries/task`.
- **That `Humanoid.WalkSpeed` set by a client replicates to the server.** The `Humanoid` reference
  page does not say either way, and does not carry the "Not Replicated" tag it carries on `Health`
  and `Jump`. The security page's "Exploiters can set their Humanoid WalkSpeed to any value" is
  what I am relying on; the mechanism is `[unverified]`. Settle by fetching
  `create.roblox.com/docs/reference/engine/classes/Humanoid` in full, or the replication table.
- **A shipping Roblox game's published anti-teleport thresholds.** Not fetched. Every slack
  constant in 01 is therefore `[playtest unknown]` with a stated test range and is not sourced.
