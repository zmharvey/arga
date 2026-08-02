# 02 — Who draws it, and where

**Domain:** art/vfx · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The clear cue is created on the client from a position the client does not have today; the
reveal object is created on the server from a position it already holds.** Three revision requests
make `effects` buildable — a patch position reaching the client, a named creator in
`representation`, and one reopening of `response`'s channel table shared with Audio. **Thirteen
delivery mechanisms are already closed to this domain by an approved check, and none of them is
contested here.**

**This sheet carries no `manifest` block, deliberately.** Its subject is a request set plus a
prohibition set — constraints on `replication`, `representation` and `response` rather than a
third value of my own — which is the same reason `tech/performance/03` supplies no key. Every
value this domain owns sits in sheet `01`'s `effects`.

## Why

**V2, the finding that stops the build: neither cue body has a position.** `cuePatchClear`
receives **no args** — *"no args — the tick announces no per-patch packet"*; it is driven off a
rise in `snapshot.clearedCount`, which is a **count, not a place**. `FindRevealed`'s payload is
*"the Find name string, from Patch.find"* and carries no `Vector3`. No client module holds a patch
table `[research: game/src/client/Beats.luau]`. **And `response` gives both beats the `atPatch`
channel.** A channel that names a position, delivered by two packets that carry none.

**Which side creates which is decided by the latency budgets, not by preference.**
`response.beats[patchClear].acknowledgmentBudgetMs` is **80 ms from the client's own radius
test**. A server-created clear cue costs the server tick plus a replication hop, which the same
sheet already prices at **250 ms** for the payout — a **3.1× overrun** on an 80 ms budget. So the
clear is client-created or it is late. `response.beats[findReveal]` is **server-decided at
300 ms**, `Clearing.luau`'s `clearPatch` holds the patch and its position at the reveal instant,
and one replication hop is the whole cost — so the reveal is server-created and **needs no new
field on the wire.**

**Priced against `serverWorldInstanceCeiling`.** `budgets` is 12,000 against 10,336 merged —
**1,664 free**. The reveal is 1 `Part` × 3 concurrent × `runtime.maxPlayers` 16 = **48, or 2.9% of
the remaining headroom.** The clear adds **zero** server instances because it never leaves the
client. Had both been server-created — `Attachment` + `ParticleEmitter` at 4 concurrent × 16 =
128, plus 48 — the total would be 176, still legal at 10.6%, but it would miss the 80 ms budget,
so the cheaper answer and the correct answer are the same one.

**The reveal's insurance is the same request as the clear's requirement.** No published figure
bounds how long a newly created `Part` takes to replicate and render on a 3 GB phone
`[research owed: a published Roblox figure for Instance-creation replication latency to a client on a low-end device]`.
If it overruns `response`'s 300 ms on the floor device, the fallback is client creation — which
needs exactly the position RR-V1 already asks for. **One request covers the clear's requirement
and the reveal's contingency**, which is why it is filed once and not twice.

**V3: no module in the build order may create a world-anchored effect Instance.**
`representation` names legal creators for every `GuiObject` and **none** for a world effect;
`Beats.luau` holds only a `ScreenGui`. This is the same class of finding `notices` raised for its
plate, and it is filed the same way — as one row against `representation`, not as a module I
invent.

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
on a check I do not otherwise need is how a prohibition list becomes a negotiation. **The
reversal condition is named instead:** if the developer wants the 24 names visible at the moment
of finding, the route is narrowing `N1`'s token to its LOD intent, and the only change in
`effects` is `cues[findReveal].namePresent`.

**`SurfaceGui` is not the loophole and I close it myself.** It is not in `N1`'s pattern, but a
plate of world text lying on the paving is read at a grazing angle by a standing player and is
illegible at phone size, and an upright one is readable from one side only. It is in
`effects.classesForbiddenOutright` so that nobody reaches for it later as the thing `N1` forgot.

## The three revision requests

| id | against | what is asked | what breaks in `effects` if it is refused |
|---|---|---|---|
| **RR-V1** | **snapshot-and-wire and prediction work** (`replication`, `prediction`; Tech — Networking) | The world position of each patch cleared this tick must be available on the client at the instant of the clear. **Preferred form:** the client-side predicted radius test `response.beats[patchClear].decidedBy` (`clientPredictedServerAuthoritative`) already requires produces the position locally, and `cuePatchClear` reads it — **no wire change at all.** **Fallback form:** the snapshot carries the positions cleared since the last snapshot as an array field, which is a wire change and costs bytes per tick. Either satisfies `effects.cues[patchClear].positionSource`. | `cues[patchClear]` is unplaceable. The `atPatch` channel is undeliverable for `B5`, and the most-repeated moment in the game renders nothing. It also removes the reveal's fallback if server replication overruns 300 ms. |
| **RR-V2** | **instance-representation work** (`architect/sheets/06-representation.md`) | One subject row, `effect-host`, with **two** named creators: a **server** creator for `cues[findReveal]`'s `Part` (the site is `Clearing.luau`'s `clearPatch`, which already holds the patch and its position), and a **client** creator for `cues[patchClear]`'s `Attachment` + `ParticleEmitter` (the site is the prediction module, or `Beats.luau`'s `cuePatchClear` if RR-V1 takes the fallback form). Both are `Anchored`/parented-once and neither is a `GuiObject`. | No module in the build order may legally create either Instance. `effects` is fully specified and entirely unbuildable — the same shape of finding `notices` raised for its plate. |
| **RR-V3** | **`gameplay/mechanics/05-response-contract`**, jointly with Audio — SFX | Reopen the channel table **once, for both defects at the same time.** `theme/tone/03` grants `B3` *"audio and VFX"* while `response.beats[areaComplete]` gives it `["notice","audio"]` with `atPatch` forbidden — no surface exists. The mirror is Audio's `G1`: `response.beats[patchClear].channels` omits `audio` while the same sheet's consequences say *"audio is the one channel every beat shares"*. **Two revision requests against one table produce two answers for one table.** | Nothing. Sheet `01` already contains the defect: `cues[areaComplete].worldComponent` is `none` and the overrule is stated in its `## Pushing back`. This request exists so the contradiction is resolved in the contract rather than absorbed by two domains separately. |

## Delivery mechanisms already closed to this domain

Thirteen. **None is contested; each is listed with the check that fails it**, so no later reader
proposes one as an unexplored option.

| # | mechanism | closed by | the check that fails it |
|---|---|---|---|
| C1 | A `BillboardGui` carrying the Find's name, a count or any world text | `N1` | `grep -rn "BillboardGui" game/src` returns nothing |
| C2 | A `SurfaceGui`, `Decal` or `Texture` carrying world text or an image | `budgets.textureCeilings`; closed here so `N1`'s gap is not a loophole | `effects.classesForbiddenOutright` contains all three; `grep -rn "SurfaceGui\|Decal\|Texture\b" game/src` returns nothing outside a `ParticleEmitter.Texture` assignment whose value begins `rbxasset://` |
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

- **Snapshot-and-wire and prediction work** owns RR-V1 and both of its acceptable forms. If the
  preferred form is taken, this domain costs the wire **nothing**; if the fallback is taken, the
  byte cost per tick is theirs to price against the snapshot budget, not mine.
- **Instance-representation work** owns RR-V2. Two creators, one row, no new module. The client
  creator's site depends on which form RR-V1 takes, so **RR-V2 should be answered after RR-V1**,
  not alongside it.
- **Audio — SFX** and this sheet file **one** request against `response`, not two. If SFX has
  already filed independently, the two should be merged before the round opens rather than
  answered separately.
- **Tech — Performance** is asked to change nothing. `N1`, `N12`, `N14`, `N15`, `N16` and `N17`
  are adopted as written, `N12` beyond its stated scope, and this sheet contests none of them.
- **Whoever runs the cross-category pass** inherits one unowned item: no sheet in either contract
  owns taking a render-stats or replication-latency reading, so `effects.budget.instrumentOwner`
  stays `UNOWNED` and every figure in it stays a prediction.

## Acceptance criteria

1. This file contains zero fenced blocks tagged `manifest`, and `npm run bridge` reports no key
   provided or proposed by it.
2. Exactly **three** revision requests exist, each naming one target sheet or kind of work, the
   field it asks for, and what in `effects` becomes unbuildable if it is refused; and each of the
   **thirteen** rows `C1`–`C13` carries a check that is a grep, a count or a manifest comparison,
   with no cell requiring a running game.
3. Running the greps in `C1`, `C2`, `C5`, `C6`, `C9`, `C10` and `C11` against the current
   `game/src` returns the stated result for all seven.
4. `effects.cues[patchClear].createdBy` is `"client"` and `cues[findReveal].createdBy` is
   `"server"`, and no row of `effects` names a creator that `representation` does not list once
   RR-V2 is answered.

## Not decided here

What is rendered, what it is made of, its parameters, its lifetime and its cost — sheet `01`,
this domain, which holds `effects` whole. Whether `representation` grows an `effect-host` subject
and what its row says — **instance-representation work**, at RR-V2's request; I state the two
creators and the two sites and write neither row. Whether a patch position reaches the client and
in which of the two forms — **snapshot-and-wire and prediction work**, at RR-V1's request; the
byte cost and the snapshot shape are theirs. Whether `response`'s channel table is reopened and
which way `B3` and `patchClear`'s missing channels resolve — **`gameplay/mechanics/05`**, at
RR-V3's request, jointly with Audio — SFX. Whether `N1`'s `BillboardGui` token is narrowed —
**`tech/performance/03`**, uncontested here, with the reversal condition named above. What either
beat sounds like — **Audio**. Any colour, material or feature-size value — **`styleGuide`**.
Whether any of these checks becomes a `bridge/merge.mjs` lint or stays a build-report grep —
**contract-and-seam work**; several sheets have now asked for the same machinery.
