# Networking — domain index

**Category:** Tech & Data · **Wave:** 5 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md` (§1, §2, §4, §5); `cid/tech/_category.md`;
`architect/sheets/03-state-shape.md`, `05-interfaces.md`, `07-wiring.md`; `cid/_contract.md`,
`cid/_state.md`; `cid/gameplay/mechanics/05-response-contract.md`;
`cid/gameplay/monetization/01-the-offer-ladder.md`; `game/src/shared/Protocol.luau`,
`game/src/server/init.server.luau`, `game/src/server/Clearing.luau`, `game/src/server/Entitlements.luau`,
`game/src/client/init.client.luau`, `game/src/shared/GameConfig.luau`.

## What the brief gave me

- "**The economy is the only thing worth cheating.** Clearing and currency awards must be
  server-validated, or a client claiming arbitrary clears owns the game." (`04-PRESENTATION.md`)
  `[brief: soft]` ← `[I assumed — not interviewed]`. This is the origin of the server-observes-never-asks
  shape, and it is hard in CID as `economy.authority` — "server only; no client message carries a cost,
  an amount or a balance" `[cid: decided]`.
- "**The collection is the second surface** — relic grants must be server-side." (`04-PRESENTATION.md`)
  `[brief: soft]` ← `[I assumed]`. Two protected surfaces, not one.
- "**Nothing else applies:** no trading, leaderboards, or PvP in scope." (`04-PRESENTATION.md`)
  `[brief: soft]`, reinforced hard by `03-META.md` priority 3.
- "**Shared server, parallel progression, own areas, no mechanical interaction.**" · "**This choice
  avoided a hard problem:** areas are *permanently* cleared, so shared areas would mean shared
  persistent world state." (`02-GAMEPLAY.md`) `[brief: soft]` ← `[you accepted: R6 Q2]`. There is no
  shared server-side world state, so there is no shared-state replication problem.
- "**Server size:** 12–20." (`02-GAMEPLAY.md`) `[brief: soft]` ← `[I assumed — no source]`;
  `runtime.maxPlayers` fixes **16** inside that band. Every aggregate figure I own rests on 16.
- "**8–14, mobile-heavy, short sessions.**" · "10–20 minute active sessions" (`00-CORE.md`)
  `[brief: binding]` ← `[you chose: R1 Q4]`; "~70% mobile" is `[brief: soft]` and `cid/_state.md`
  records it as "uncorroborated by anything fetched".
- "**Permanent multipliers only. Never content access.**" (`03-META.md`) `[brief: soft]` ←
  `[you accepted: R5 Q4]`. An entitlement may gate a multiplier and may never gate content.
- "**Input: movement only.**" (`02-GAMEPLAY.md`) `[brief: soft]`, **overruled by ruling R-1**, contained
  to one input class / two verbs / four controls. `input.clientOriginatedRemotes` is exactly
  `["RequestState", "BuyUpgrade"]` `[cid: decided]` and I may not widen it.
- `social.forbidden X7` — no payload carries any player identifier but the recipient's `[cid: decided]`.
- Priority 3 (`03-META.md`) `[brief: soft]` on the ordering, hard on three members: excludes
  leaderboards, trading, seasons and events — which is the whole of cross-server messaging.

## What the brief did not give me

Named, not filled. Each routed to the sheet that must decide it.

| # | gap | routed to |
|---|---|---|
| 1 | **No bandwidth, packet or payload budget anywhere.** `OPEN.md §2`'s entire technical instruction is "Watch: instance count per area on mobile, and save size as areas accumulate" — the network is not in it, in any sheet. | 01 |
| 2 | **No network-quality or latency assumption**, for an audience stated as ~70% mobile. `mechanics/05` B5 sets 80 ms and 250 ms budgets that only mean something against one. | 03 |
| 3 | **The server-size band is `[I assumed — no source]`.** Two of the three inputs to every capacity number here (band, device mix) are unsourced. | 01, cited as soft |
| 4 | **Nothing says when a purchased multiplier starts applying.** `03-META.md` fixes what may be sold and is silent on when it takes effect. That silence is why finding 2 is latent rather than decided. | 04 |
| 5 | **No rate-limit position of any kind.** The whole integrity section is `[I assumed — not interviewed]` and `OPEN.md §1` calls it "the least defensible" of the zero-question items. | 02 |
| 6 | **Nothing on loss, duplication or reordering** beyond `wiring`'s "every updater is idempotent" — which covers duplicates and says nothing about a dropped push or an unconfirmed prediction. | 01, 03 |

## Why 4 sheets

**Four decisions, four proposed keys, one sheet each.** My category lead expects one key
(`replication`) per domain; I am proposing four, with a reason: a single key would have to hold the
server's outbound wire form, a server-side ingress ceiling, a client-side prediction contract and an
ownership-authority rule, and those are read by four different builders at four different call sites
(`clearing`'s push, `server-main`'s `OnServerEvent`, the client's shadow test, `entitlements`). The
merger allows any number of distinct proposed keys and refuses only a duplicate, and multi-key domains
are the established shape here — `gameplay/systems` proposed four, `gameplay/mechanics` four. **The
deviation is cheap to reverse:** if the contract's maintainer wants one key, `ingressLimits`,
`prediction` and `ownershipAuthority` nest under `replication` as three sub-objects with no value
changing. What I will not do is write three of them as prose beside one manifest, which is the failure
this stage exists to remove.

I considered and did **not** assign: a remote inventory sheet (`architect/05-interfaces` carries the
complete seven-channel table and `protocol` owns the names end to end — a second enumeration is a
guaranteed collision); a cross-server messaging sheet (**absent**, see below); a validation-rule sheet
(Security's `integrity`); a tick-rate sheet (`clearTickRate` 0.12 → 0.04 is Performance's finding 4 —
01 costs both cadences and decides neither); a snapshot **field-list** sheet (architect's; 01 may fix
the encoding and not the fields); and a DataStore-traffic sheet (Persistence's).

**Cross-server messaging is absent, stated rather than discovered.** No `MessagingService`, no
cross-server state, no global counters, no `OrderedDataStore`. `social.sharedState` is empty,
`social.forbidden X3` bans any server-held value more than one player's action increments, and priority
3 excludes leaderboards, trading, and seasons and events. Naming it in order to forbid it is compliant;
reserving a field for it would not be. Prediction is thin but real — there is exactly one predicted
thing in the game and it gets sheet 03.

| # | sheet | must decide |
|---|---|---|
| 01 | `snapshot-wire-form` | Fix the snapshot's wire form as one shallow Luau table argument on `StateChanged` carrying exactly the eight fields `protocol.snapshotShape()` names and no others, with `upgrades`, `rowsRevealed` and `found` crossing as live tables serialised at the `FireClient` call; give a per-field byte cost and a worst-case, typical and fresh-save total from the per-type costs in the research pack (my derivation: **464 B worst case, 164 B fresh save, uncompressed, keys counted; 148 B under the alternative reading where table keys are free** — carry both readings and mark the total `[playtest unknown]` with `Stats.DataSendKbps` named as the measurement that settles it, because Roblox zstd-compresses remote payloads and ~48% of the worst case is a 24-key `found` map that never changes); state the send rule (at most one `FireClient` per player per **changed** tick, none on an unchanged pass, whole-snapshot and therefore idempotent, plus the join, spawn and post-purchase pushes and the `RequestState` pull); and state the per-player and 16-player outbound budget at `clearTickRate` 0.12 (**≤ 8.33 sends/s/player ≈ 3.9 kB/s/player ≈ 62 kB/s at `runtime.maxPlayers` 16**) and at the requested 0.04, whose realised period is 0.05 s and therefore 20 sends/s (**≈ 9.3 kB/s/player ≈ 149 kB/s at 16**), presented as a cost for Performance's tick decision and not as a decision. Also fix that the snapshot derivation has exactly one definition: `game/src/server/init.server.luau` and `game/src/server/Clearing.luau` each carry a private `buildSnapshot` and they already differ, and `interfaces` exposes no snapshot builder, so the producer of the wire form currently has no owner — state the rule and route the missing interface entry to `architect/05-interfaces` as a revision request. Do not change the field list, the channel name or the channel class; all three are architect's, so `UnreliableRemoteEvent` is not available to you and its ~900-byte documented cap is recorded as a fact only. |
| 02 | `ingress-limits` | Fix a server-side acceptance ceiling for each of the two client-originated channels — `BuyUpgrade` and `RequestState`, which together are the entire client surface — as a maximum accepted messages-per-second per player with a stated burst allowance, plus what the server does with a message over the ceiling. The only available action is to **drop it silently**: `input.verbs[buy].onPreconditionFail` is `silentNoOp` and `input.pressable.rejectionCueOnFailedPrecondition` is `"none"`, so no warning, no cue, no kick and no log-per-message may be specified, and a `warn` on the hot path is a log a modified client can fill on demand. Anchor the starting values on `input.pressable.debounceSeconds` (0.35, a **client** debounce that binds nothing on a modified client) and on `RequestState` being fired exactly once per client boot; mark every ceiling `[playtest unknown]` with a starting value and a test range, and state the counter's storage (per `UserId`, live only, never persisted — `stateShape` is closed and gaining a field is a revision request against `architect/03-state-shape`). State in one line that **whether a message is admissible is Security's `integrity` and never yours**: you own how many the server will look at, Security owns what it does when it looks, so this sheet carries no field naming a validation rule and no field naming a detection or logging pipe. |
| 03 | `clear-prediction` | Decide the reconciliation rule for `gameplay/mechanics/05` beat B5, whose client-side shadow radius test currently has no owner. Fix: what the client may predict (the local disappearance of a patch Instance in the live bay whose XZ distance to its own character root is inside a radius the client derives from the snapshot's `upgrades` map — it has no other source, since `owned` and `patches` never cross the wire, which means a purchased `Span` factor is invisible to the predictor and you must say what the client does about that); what it may **never** predict (`currency`, `clearedCount`, `found`, `areasFinished`, area advance and every beat but `patchClear` — the economic half is server-decided and `mechanics/05` says so); and the silent-restore rule, which must work **without any per-patch data on the wire**, since a snapshot carries eight fields and none of them names a patch. State the restore trigger, the wait before restoring, and that restoring is silent (no cue, no sound, no notice — `response.negativeBeats` is 0), all against B5's 80 ms client budget and 250 ms server-readout budget with their stated 40–120 ms and 150–400 ms test ranges. State what a dropped, duplicated or out-of-order snapshot costs a predicted patch. A rule that needs a new snapshot field is a revision request against `architect/05-interfaces`, not a value here; a rule that needs a new remote is one against `protocol.REMOTES`. |
| 04 | `ownership-authority` | Fix the authority rule for game-pass ownership as data, and record the re-resolution finding with its mechanisms. The rule: ownership is **server-resolved only**, once per join, from `products.ownershipCheck` (`UserOwnsGamePassAsync`), written to `state.owned` by `entitlements` and nowhere else, never persisted (`products.F20`), and **never asserted, hinted at or acknowledged by any client message** — `economy.authority` and the closed two-channel client surface both forbid it, so "the client tells the server it bought something" is not available at any latency. Then state the re-resolution trigger and its consequence from the two sourced facts in the research pack: `UserOwnsGamePassAsync` **caches per player per server for the session**, so re-polling returns the join-time answer and a poll loop cannot see a mid-session purchase; and `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised, which `products.F13` forbids in every path ("zero `PromptGamePassPurchase` calls anywhere in the build"). Record, as named data, that **no in-server re-resolution trigger exists under the shipped rule set**, that the effective contract is therefore "a purchased factor applies from the player's next join", and the exact conditions under which a mid-session trigger becomes possible — a change to `products.F13` (an owner-raised prompt, which makes the event fire), or an `HttpService` read of the inventory endpoint that bypasses the engine cache, marked `[unverified]` with the fetch that would settle it. Route both to the owner of the offer ladder as findings; do not decide either, and do not specify a player-facing surface (`products.F19` forbids every one, and the store surface is UI/UX's). |

## Contract keys

**My domain owns no key in `cid/_contract.md` today.** It proposes four, each as a fenced
`manifest` block with `"status": "proposed"`:

| key | sheet | what it would hold |
|---|---|---|
| `replication` | 01 | The snapshot's wire form, per-field and total byte cost, the send rule, and the outbound budget per player and at `runtime.maxPlayers` 16, at both candidate tick rates. A builder cannot size a snapshot from "the HUD updates". |
| `ingressLimits` | 02 | Per client-originated channel: the accepted messages-per-second ceiling, the burst allowance, the over-limit action, and the counter's storage and lifetime. |
| `prediction` | 03 | What the client may and may not predict, the confirmation source, the restore trigger and wait, and the two latency budgets with their test ranges. |
| `ownershipAuthority` | 04 | Who may assert ownership, the resolution point, the re-resolution trigger (or the recorded absence of one), and the mechanism facts that bound it. |

None of the four exists in `cid/_contract.md` (25 keys) or in the architect's seven, which I checked
before naming them.

## Verification note

**02 `ingressLimits` is the one most likely to be contradicted, and by Security.** "Rate limiting and
sanity checks" appears verbatim in Security's `owns` list, and its `integrity` key will want a
per-action limit; my category lead's split is that I own the arrival ceiling and Security owns
admissibility, but two sheets can easily both write a number called "max buys per second". The
distinguishing test I am handing forward: **a value that changes with the wire (how many messages the
server will read) is mine; a value that changes with the rules (whether a read message is legal) is
Security's.** If both sheets carry a per-second number they are duplicating, and mine should yield —
Security's mandate is stated in the brief and mine is derived.

Second most likely: **01's budget, contradicted by Performance**, whose `budgets` key must carry a tick
cost model against the same `clearTickRate` 0.12 → 0.04 question. 01 supplies the network half of that
cost and must not state a tick preference; if it does, two sheets answer finding 4.

Third: **04, by whoever next revises `products`.** Its recorded "no in-server trigger exists" is true of
today's `F13`; the moment `F13` is relaxed the recorded absence becomes wrong, which is why 04 must
state the condition rather than the conclusion.

## Research owed

`docs/cid-workflow.json` gives this domain **no `must_verify`**. I fetched anyway, because the writer
cannot, and the byte figures in 01 and the authority facts in 04 would otherwise be reasoning alone.

| claim | source | state |
|---|---|---|
| `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)`, fires on the server when a game pass purchase prompt completes; `PromptGamePassPurchase` must be called from the server; `UserOwnsGamePassAsync(userId, gamePassId) → boolean` | https://create.roblox.com/docs/reference/engine/classes/MarketplaceService | **fetched.** The official reference carries signatures only and states **no** caching behaviour for `UserOwnsGamePassAsync` — a negative result worth recording, since the cache is the fact the design turns on. |
| "`UserOwnsGamePassAsync` caches, it only ever needs to be called once per-gamepass per-player per-server"; a pass bought during a session keeps reading the join-time value | https://devforum.roblox.com/t/update-the-userownsgamepassasync-cached-value-when-promptgamepasspurchasefinished-fires/369425 | **fetched.** A feature request, open, **no staff reply**, most recent comment December 2025. Community consensus, not documentation. Tag it that way. |
| Roblox **compresses** remote payloads (base64 + zstd) in transit, so a pre-compression byte count is an upper bound; the documented `UnreliableRemoteEvent` cap is 900 bytes and a 3,855-byte repetitive buffer passed because it compressed under it | https://devforum.roblox.com/t/incorrect-size-of-data-being-sent-limit-specified-when-using-unreliableremoteevent/3048788 | **fetched, with a staff explanation.** This is why 01's totals are stated as uncompressed bounds. |
| `Stats.DataSendKbps` / `DataReceiveKbps` exist as read-only numbers | https://create.roblox.com/docs/reference/engine/classes/Stats | **fetched.** The page lists the properties and gives no description of what they measure or on which side — enough to name the instrument, not enough to state its semantics. 01 should say so. |
| `UnreliableRemoteEvent` class reference | https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent | **fetched. States no payload limit, no ordering guarantee and no guidance.** The 900-byte figure comes from the thread above, not from this page. |
| Roblox's own remote-events guide | https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/events/remote.md | **fetched.** No size limit, no rate limit, no firing-frequency guidance. Says only "the server has to be the source of truth". |
| **Per-type wire costs**: blank remote call 9 B · string length + 2 · boolean 2 · number 9 (IEEE-754 double) · table 2 · EnumItem 4 · Instance 4 · Vector3 13 · axis-aligned CFrame 14 · rotated CFrame 20 | https://ffrostfall.net/stuff/list/remoteevents/ | **NOT FETCHED — the page returned HTTP 403 to two direct attempts and to an archive.org attempt.** The figures above come from the search index's rendering of that page, returned consistently on two independent queries. **They are the load-bearing input to 01 and they are not a fetch.** Tag them `[research: url]` **with the 403 stated in the sheet**, and mark every derived total `[playtest unknown]`. The fetch that would settle it: that URL from an unblocked client, or an in-Studio `Stats.DataSendKbps` differential across a known number of pushes — which is the better instrument anyway and is what 01 should specify. |
| Whether an `HttpService` read of the Roblox inventory endpoint bypasses the ownership cache | — | **`[unverified]`.** Search results assert it does; I did not fetch an endpoint reference and no official page was found. The fetch that would settle it: the Open Cloud or inventory API reference for game-pass ownership by user id. 04 must carry it as `[unverified]` and may not present it as a route that is known to work. |
| The brief's ~70% mobile split and the 12–20 server band | — | Both `[I assumed]` in the brief; `cid/_state.md` records the mobile figure as uncorroborated. **Nothing I own rests on the mobile split.** Everything aggregate rests on `runtime.maxPlayers` 16, which is architect's and fixed. |

## Two things in `game/src/` worth stating before the writer starts

Neither contradicts `architect/05-interfaces`; both are gaps the interface table does not cover, and
both belong in 01.

1. **The snapshot derivation is implemented twice and the two copies already differ.**
   `game/src/server/init.server.luau` and `game/src/server/Clearing.luau` each hold a private
   `buildSnapshot`; only the latter warns on an unknown field. `interfaces` exposes no snapshot builder,
   so nothing is being violated — but the two derived fields (`areaPatchCount`, `areaLabel`) have to
   agree or the progress readout means different things depending on which originator pushed it.
   `init.server.luau`'s own comment says "Reported."
2. **`Clearing.luau` sends the live tables, not copies** — "Shallow by design. `upgrades`,
   `rowsRevealed` and `found` go over as the live tables; `FireClient` serialises them at the moment of
   the call." That is a wire-form fact 01 must pin rather than rediscover, and it is what makes the
   `found` map's 24 keys a per-push cost rather than a one-time one.

I checked `Protocol.luau` against `interfaces`: seven channels, matching names, classes, directions and
`firedBy`/`handledBy`, plus a load-time assertion that the two client-to-server names equal
`GameConfig.Input.clientOriginatedRemotes`. `snapshotShape()` returns exactly the eight declared fields.
**No divergence found.**

## Not decided here

The remote inventory, channel names, classes and the snapshot's field list (`architect/05-interfaces`).
The clear tick rate and any tick cost model (Performance — `budgets`; finding 4). Whether an incoming
message is valid, and detection, logging and response (Security — `integrity`). DataStore traffic,
retry, backoff and session locking (Persistence — `persistence`). What is sold, at what price, and the
`F13`/`F19` prohibitions themselves (the offer ladder's owner — `products`). What a player is shown
about a purchase (UI/UX — Store). Creating the game passes and sequencing that against 04's finding
(Build & Deploy — `release`).
