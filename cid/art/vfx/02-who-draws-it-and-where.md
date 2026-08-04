# 02 — Who draws it, and where

**Domain:** art/vfx · **Category:** Art & Visuals · **Wave:** 6

> **Revised, round 1** (`cid/art/_verified.md`). Sheet `01`'s reveal object moved from
> server-created to client-created under **RR-2**, so **both** cues are now client-drawn. RR-V1
> grows a third form — a `Vector3` on `FindRevealed` — and RR-V2 simplifies to **one creator
> side**. `_verified.md` check 3 records that the creator gap is **structural**: Environment's
> 18 + 24 parts have the identical problem and filed nothing, so `representation` owes two
> subjects and should answer them together.

## Decision

**Both effect Instances are created on the client, from positions the client does not have
today.** Three revision requests make `effects` buildable — a patch position for each cue, a named
creator in `representation`, and one reopening of `response`'s channel table shared with Audio.
**Thirteen delivery mechanisms are already closed to this domain by an approved check, and none of
them is contested here.**

**This sheet carries no `manifest` block, deliberately.** Its subject is a request set plus a
prohibition set — constraints on `replication`, `representation` and `response` rather than a
third value of my own — which is the same reason `tech/performance/03` supplies no key. Every
value this domain owns sits in sheet `01`'s `effects`.

**This sheet carries no manifest block.** Who draws an effect and where it lives are properties of
the effects **`01`** already names: **`effects`** carries `allEffectsAreClientLocal`,
`particleEmitterPermitted` and the per-cue rows, and this sheet decides no cue of its own.

## Why

**V2, the finding that stops the build: neither cue body has a position.** `cuePatchClear`
receives **no args** — *"no args — the tick announces no per-patch packet"*; it is driven off a
rise in `snapshot.clearedCount`, which is a **count, not a place**. `FindRevealed`'s payload is
*"the Find name string, from Patch.find"* and carries no `Vector3`. No client module holds a patch
table `[research: game/src/client/Beats.luau]`. **And `response` gives both beats the `atPatch`
channel** — a channel that names a position, delivered by two packets that carry none.

**Client creation for the clear is forced; for the reveal it is chosen and it is cheap.**
`response.beats[patchClear].acknowledgmentBudgetMs` is **80 ms from the client's own radius
test**, and a server-created cue costs the tick plus a replication hop, which the same sheet
already prices at **250 ms** for the payout — a **3.1× overrun**. The reveal is different: it is
server-*decided* at 300 ms and the server holds the position, so server creation was legal and
was round 0's answer. It moved because it was not free — 1 `Part` × 3 concurrent ×
`runtime.maxPlayers` 16 = **48 server instances**, and 9 to 27 client instances that scale with
loaded lanes, which is the half of the client over-subscription `_verified.md` RR-2 found. **What
it bought was invisible:** at `plots.pitchStuds` 122 a 3-stud face subtends about **1.4°**.

**Priced after the move.** Against `budgets.instanceCeilings.serverWorldInstanceCeiling` 12,000 at
10,336 merged — 1,664 free — `effects` now costs **0**, and the 48 are released. Against
`clientStreamedInstanceCeiling` 6,000 it costs a **hard bound of 11**: 4 clear hosts × 2 instances
plus 3 reveal `Part`s. Both figures are per-player concurrency ceilings from
`response.minSustainedOnsetsPerSecond` and `collection.relicsPerArea`, and neither cue replicates,
so **the count cannot grow with loaded lanes or with player count** — which is what lets
Environment size against a number rather than a range.

**V3: no module in the build order may create a world-anchored effect Instance.**
`representation` names legal creators for every `GuiObject` and **none** for a world effect;
`Beats.luau` holds only a `ScreenGui`. It is the same class of finding `notices` raised for its
plate, and it is filed the same way — one row against `representation`, not a module I invent.
**It is also not a defect peculiar to this domain**, and saying so is the point of `_verified.md`
check 3: Environment's per-lane dressing has no creator either and filed nothing, so the honest
statement is that `representation`'s nine subjects predate every domain that renders anything.

**On `N12`, which I adopt beyond its stated scope.** Its check is scoped to
`game/src/server/Plots.luau`, so an effect module is technically outside it; its **stated intent
is the silhouette channel**, and a shrink-out or grow-in animation is a `.Size` write after
creation. **I adopt the intent rather than the scope**: the reveal object is created at its final
size and never resized, and the clear's size change lives inside the emitter's own
`NumberSequence`, which is a particle property and touches no Instance's `.Size`. `[cid: decided]`

**On `N1`, which closes the Find's name and is not contested.** Its check —
`grep -rn "…BillboardGui…" game/src` returns nothing — was written against LOD and imposters, and
as written it bans the only ordinary route to camera-facing world text. Sheet `01` decided the
name is not drawn at the patch, so **no request is filed**; spending a peer sheet's revision round
on a check I do not otherwise need is how a prohibition list becomes a negotiation. **The reversal
condition is named instead:** if the developer wants the 24 names visible at the moment of
finding, the route is narrowing `N1`'s token to its LOD intent, and the only change in `effects`
is `cues[findReveal].namePresent`.

**`SurfaceGui` is not the loophole and I close it myself.** It is not in `N1`'s pattern, but a
plate of world text lying on the paving is read at a grazing angle by a standing player and is
illegible at phone size, and an upright one is readable from one side only. It is in
`effects.classesForbiddenOutright` so nobody reaches for it later as the thing `N1` forgot.

## The three revision requests

| id | against | what is asked | what breaks in `effects` if it is refused |
|---|---|---|---|
| **RR-V1** *(grown, round 1)* | **snapshot-and-wire and prediction work** (`replication`, `prediction`; Tech — Networking) | A world position for **each** cue on the client at the instant it fires. **(a) Preferred, for the clear:** the client-side predicted radius test `response.beats[patchClear].decidedBy` (`clientPredictedServerAuthoritative`) already requires produces the position locally and `cuePatchClear` reads it — **no wire change at all.** **(b) Fallback, for the clear:** the snapshot carries the positions cleared since the last snapshot as an array field, which is a wire change and costs bytes per tick. **(c) Required, for the reveal:** a `Vector3` on the `FindRevealed` payload beside the name — **12 bytes on a channel `tech/networking/01` prices at 23 bytes worst case, firing `collection.relicsPerArea` (3) times per area.** Correlating the reveal against the most recently cleared patch is **not** an acceptable substitute: at 8 clears per second inside a 300 ms budget the most recent patch is ambiguous. | `cues[patchClear]` and `cues[findReveal]` are both unplaceable. The `atPatch` channel is undeliverable for the two beats that hold it, and the game's most-repeated moment and its loudest moment both render nothing. |
| **RR-V2** *(simplified, round 1)* | **instance-representation work** (`architect/sheets/06-representation.md`) | One subject row, `effect-host`, with **one creator side — client**, covering both cues: `cues[patchClear]`'s `Attachment` + `ParticleEmitter` and `cues[findReveal]`'s `Part`. The site is the prediction module, or `Beats.luau`'s `cuePatchClear` / `cueFindReveal` if RR-V1 takes forms (b) and (c). All three are `Anchored` or parented once, none is a `GuiObject`, and **none replicates**, so the row adds nothing to the server tree. Round 0 asked for two creator sides; the reveal's move to the client removed the server one. | No module in the build order may legally create either Instance. `effects` is fully specified and entirely unbuildable — the same shape of finding `notices` raised for its plate, and the same one `_verified.md` check 3 records against Environment's dressing. |
| **RR-V3** | **`gameplay/mechanics/05-response-contract`**, jointly with Audio — SFX | Reopen the channel table **once, for both defects at the same time.** `theme/tone/03` grants `B3` *"audio and VFX"* while `response.beats[areaComplete]` gives it `["notice","audio"]` with `atPatch` forbidden — no surface exists. The mirror is Audio's `G1`: `response.beats[patchClear].channels` omits `audio` while the same sheet's consequences say *"audio is the one channel every beat shares"*. **Two revision requests against one table produce two answers for one table**, which `_verified.md` predicted conflict 4 now instructs be merged. | Nothing. Sheet `01` already contains the defect: `cues[areaComplete].worldComponent` is `none` and the overrule is stated in its `## Pushing back`. This request exists so the contradiction is resolved in the contract rather than absorbed by two domains separately. |

## Delivery mechanisms already closed to this domain

Thirteen. **None is contested; each is listed with the check that fails it**, so no later reader
proposes one as an unexplored option.

| # | mechanism | closed by | the check that fails it |
|---|---|---|---|
| C1 | A `BillboardGui` carrying the Find's name, a count or any world text | `N1` | `grep -rn "BillboardGui" game/src` returns nothing |
| C2 | A `SurfaceGui`, `Decal` or `Texture` carrying world text or an image | `budgets.textureCeilings`; closed here so `N1`'s gap is not a loophole | `effects.classesForbiddenOutright` contains all three; `grep -rn "SurfaceGui\|Decal\|Texture" game/src` returns nothing outside a `ParticleEmitter.Texture` assignment whose value begins `rbxasset://` |
| C3 | A shrink-out, grow-in or scale animation on any Instance | `N12`, adopted beyond its stated `Plots.luau` scope for its silhouette intent | no `.Size` assignment exists on any Instance after its creation statement in any effect path |
| C4 | Deferring, batching, coalescing or dropping a cue to smooth a frame | `N14`; `response.onOverload: "overlap"` | eight clears in one second produce eight independent hosts; no accumulator, queue or coroutine sits between the radius test and the cue |
| C5 | Taking control during a build or a cue — loading screen, frozen character, camera lock, forced idle, `WalkSpeed` write | `N15`; `response.controlEverAffected: false`, `R1`–`R4` | `grep -rn "WalkSpeed = 0\|PlatformStand\|CameraType.Scriptable" game/src/client` returns nothing; no effect module writes a `Humanoid` property |
| C6 | Staggering, fading or tweening patches into existence, or any observable build-time effect | `N16`; `theme/identity/03` | `grep -rn "TweenService" game/src/server/Plots.luau` returns nothing; the bay container's `Parent` is assigned once |
| C7 | Reusing the clear or reveal cue on plot construction | `theme/identity/03` | no cue's cause is a bay build; `effects.cues[]` ids are exactly `response.beats[].id` |
| C8 | Any effect marking passage, area entry, or entering a finished part | `theme/setting/04`; `W1` | no cue's cause is an area transition or a threshold crossing; `effects.cues[findReveal].permanenceRule` holds at 2.6 s |
| C9 | Light flicker, moving or animated shadow, darkening pulse, screen vignette, fog volume, dust motes | `theme/tone/04` `D2`; `N7` | `grep -rn "Atmosphere\|FogEnd\|FogStart\|PointLight\|SpotLight\|SurfaceLight" game/src` returns nothing |
| C10 | Confetti, fireworks, camera shake, full-screen flash, slow motion, freeze frame, radial speed lines, chromatic aberration | `theme/tone/04` `D5`; `response` `R3`, `R4` | `effects.classesForbiddenOutright` contains every `PostEffect` class; `grep -rn "CameraType.Scriptable\|CameraOffset\|Explosion" game/src` returns nothing |
| C11 | An uploaded image, mesh or sound asset to make an effect cheaper or richer | `N17`; `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry: 0` | `grep -rn "rbxassetid" game/src` returns nothing outside client UI files |
| C12 | Pooling, recycling or re-parenting an effect Instance across onsets | `N11`'s reasoning applied to effects; `effects.forbidden[pooledEffectHost]` | no effect Instance is ever assigned a second `Parent`; the Instance count at a cleared position is 0 at 0.40 s, which a parked disabled emitter would break |
| C13 | Hosting the clear cue on the patch itself | `Clearing.luau:242-249` destroys the patch at the clear instant, and destroying an emitter's parent removes its live particles `[research: https://devforum.roblox.com/t/keep-particles-on-particleemitterdestroy/335327]` | `effects.cues[patchClear].host` names the lane slab `Part`; no effect Instance's ancestor is a patch Instance |

## Consequences for other work

- **Snapshot-and-wire and prediction work** owns RR-V1 and its three forms. Form (a) costs the
  wire nothing; form (c) costs 12 bytes on a channel that fires 3 times per area. If (a) is
  refused and (b) taken, the byte cost per tick is theirs to price against the snapshot budget.
- **Instance-representation work** owns RR-V2, now **one creator side and one row**. The site
  depends on which form RR-V1 takes, so **RR-V2 should be answered after RR-V1**. It should be
  answered in the same round as Environment's equivalent row, which `_verified.md` check 3 is
  telling that domain to file — **two subjects, one round**.
- **Environment work** inherits a firm number to size against: `effects` costs **0** server
  instances and a hard-bounded **11** client instances. Nothing here allocates its parts.
- **Audio — SFX** and this sheet file **one** request against `response`, not two. If SFX has
  filed independently, merge before the round opens rather than answering separately.
- **Tech — Performance** is asked to change nothing. `N1`, `N11`, `N12`, `N14`, `N15`, `N16` and
  `N17` are adopted as written, `N12` beyond its stated scope, and this sheet contests none.
- **Whoever runs the cross-category pass** inherits one unowned item: no sheet in either contract
  owns taking a render-stats reading, so `effects.budget.instrumentOwner` stays `UNOWNED`.

## Acceptance criteria

1. This file contains zero fenced blocks tagged `manifest`, and `npm run bridge` reports no key
   provided or proposed by it.
2. Exactly **three** revision requests exist, each naming one target sheet or kind of work, the
   field it asks for, and what in `effects` becomes unbuildable if it is refused; and each of the
   **thirteen** rows `C1`–`C13` carries a check that is a grep, a count or a manifest comparison,
   with no cell requiring a running game.
3. Running the greps in `C1`, `C2`, `C5`, `C6`, `C9`, `C10` and `C11` against the current
   `game/src` returns the stated result for all seven.
4. `effects.cues[patchClear].createdBy` and `cues[findReveal].createdBy` are both `"client"`,
   both rows have `replicated: false`, and no row of `effects` names a creator that
   `representation` does not list once RR-V2 is answered.

## Not decided here

What is rendered, what it is made of, its parameters, its lifetime and its cost — sheet `01`,
this domain, which holds `effects` whole. Whether `representation` grows an `effect-host` subject
and what its row says — **instance-representation work**, at RR-V2's request; I state the creator
side and the sites and write no row. Whether Environment files the equivalent row for its
dressing — **Environment**, under `_verified.md` check 3; I name the structural gap and file only
my own. Whether a patch position reaches the client and in which forms — **snapshot-and-wire and
prediction work**; the byte cost and the snapshot shape are theirs. Whether `response`'s channel
table is reopened and which way `B3` and `patchClear`'s missing channels resolve —
**`gameplay/mechanics/05`**, at RR-V3's request, jointly with Audio — SFX. Whether `N1`'s
`BillboardGui` token is narrowed — **`tech/performance/03`**, uncontested here, with the reversal
condition named above. Which consumer gives up the parts that fund `effects` — **Environment**,
under `_verified.md` RR-2. What either beat sounds like — **Audio**. Any colour, material or
feature-size value — **`styleGuide`**. Whether any of these checks becomes a `bridge/merge.mjs`
lint or stays a build-report grep — **contract-and-seam work**.
