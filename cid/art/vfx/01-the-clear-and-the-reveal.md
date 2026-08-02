# 01 — The clear and the reveal

**Domain:** art/vfx · **Category:** Art & Visuals · **Wave:** 6

> **Revised, round 1** (`cid/art/_verified.md`). **RR-9 closed:** the two `styleGuide` paths are
> corrected to `roles["stone.cleared"]` and `formLanguage.featureSize.near.minStuds` (0.5), which
> my 3-stud face clears with margin, so **no value moves**. I re-resolved every other cross-key
> path in this sheet against its owning manifest; all thirty-six are listed in
> `externalPathsCited` and resolve. **RR-2, the funding item:** the reveal object moves from
> server-created to **client-created and local-only**, taking this key's server cost to **0** and
> making its client cost a **hard bound of 11** instead of a statistical 17–35.

## Decision

**This game renders exactly two world effects and no others, both drawn on the client and neither
replicated.** A clear is a `ParticleEmitter` burst on an `Attachment` hosted by the **lane slab**,
`Rate` 0, `:Emit(8)` once, every particle dead by 0.35 s and the host destroyed at 0.40 s. A
reveal is **one anchored `Part`** — a 3 × 0.4 × 3 stud dressed-stone slab set flush into the
paving at the patch position — that holds completely still for 2.5 s and is destroyed. **A
`ParticleEmitter` is permitted in exactly one place, the clear cue, and the count of
`ParticleEmitter` instances in a game at rest is zero.**

## Why

**The brief contains zero lines about visual effects, and I was told otherwise on the way in.**
`OPEN.md` §2's four blocks are Audio intent, Technical shape, Measurement and Live-ops intent —
none is visual feedback — and §1's coverage audit has no visual-feedback row at any layer. The
only positive direction anywhere is *"audio and visual feedback carry the entire feedback load"*
`02-GAMEPLAY.md`, elevated by `HANDOFF.md` six-things #4 → `[brief: binding]` on the instruction.
**Every ruling below is `[cid: decided]` against silence**, constrained by approved keys.

**V1, the ruling nobody had made: a `ParticleEmitter` may exist, in one cue.** `A14` reaches
*ambience* only, and `theme/setting/05` wrote the carve-out for me — *"The clear-away effect on a
patch is a player-caused event and is not ambient motion"* `[research: cid/art/_category.md]`.
`budgets` forbids the uploaded **texture**, not the class: `rbxasset://` is the client's own
content folder and `rbxassetid://` is a user upload
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/projects/assets/index.md]`,
so a built-in texture passes `N17`'s grep. The alternative — a tween on a primitive — writes
`.Size` after creation, which sheet `02` closes. **The engine default
`rbxasset://textures/particles/sparkles_main.dds`
`[research: https://robloxapi.github.io/ref/class/ParticleEmitter.html]` is rejected by name**: a
star-pointed sparkle reads as magic and as treasure, against `theme/lore/01`'s overrule and `A7`.
The texture is therefore a **rule** below, not a name.
`[research owed: the enumerated rbxasset:// particle textures in the client content folder, so a soft-edged mote can be named rather than described]`

**V8, the trap: the clear cue may not live on the patch.** `Clearing.luau:242-249` calls
`instance:Destroy()` on the patch at the clear instant, and destroying an emitter's parent removes
its live particles immediately `[research: https://devforum.roblox.com/t/keep-particles-on-particleemitterdestroy/335327]`
(a devforum thread, banked at that strength) — so a cue hosted there dies when it should play.
**The host is the lane slab `Part`** (`representation.plot`, top face at Y = 0, destroyed only at
teardown), which outlives every patch on it by construction. Confirmed against source by the
category verification, item 9.

**Both cues are drawn on the client, and neither replicates.** For the clear this is forced:
`response.beats[patchClear].acknowledgmentBudgetMs` is **80 ms from the client's own radius
test**, which no server-created Instance meets. For the reveal it is chosen, and the reason is
geometry, not arithmetic: `plots.pitchStuds` is 122 and the reveal object's face is 3 studs, so a
neighbour's reveal subtends about **1.4°** — **it was never legible at the only distance it could
be seen from.** Paying 48 server instances and up to 18 extra client instances for an object
nobody can resolve is the wrong trade, and it was the trade that put the client ceiling over
(`_verified.md` RR-2). `decidedBy` stays **server** for the reveal — `response` is unmoved; only
the renderer changes, which is what `Beats.luau`'s `cueFindReveal` seam exists for. Nothing is
lost on co-presence: the patch Instances are server-destroyed and replicate, so `social/02`'s
*"ground visibly being cleared"* is untouched.

**I adopt `Beats.luau`'s reading that `patchClear` is exempt from `atPatch` exclusivity** — *"that
pair cannot both be enforced — eight overlapping patchClear onsets a second are themselves two
beats on one exclusive channel"* `[research: game/src/client/Beats.luau]`. Exclusivity governs the
four **sequenced** beats. Without that reading my clear cue is illegal, so I state it.

**V7, the one dwelling object, and why it is not the Find.** `response` criterion 2 requires
*"exactly one, for 2.5 s"*; `representation.find` rules *"A Find has no Instance at any point in
its life"*. Both hold only because the object is **ground, not a thing**: flush-set into the
paving, no handle, no relief figure, no cut lettering (`A4`), byte-identical for all 24 Finds, and
not a `Ring`, a `Coffer` or any other live Find name. **`G6` is not reopened from my side.** It
holds completely still because `response`'s own reasoning is *"the distinction is persistence, not
a second action"*, `B1` forbids amplification of any kind, `D2` forbids a pulse and `D5` forbids
the whole burst vocabulary — and stillness is the register `01-FOUNDATION.md` binds.

**V6, decided: the Find's name is not drawn at the patch.** `N1`'s check bans `BillboardGui`
anywhere in `game/src` and that is the only ordinary route to camera-facing world text; it was
written against LOD and imposters and as written it closes this. I will not spend a peer sheet's
revision round on a check I do not otherwise need. **Consequence: a Find's name reaches the player
only inside the collection index**, which is the finding `notices` recorded and could not close.

**One cue parameter reads a per-onset input, and it reads `patch.tierIndex`.** The clear's
particles take `tiers[patch.tierIndex].rgb` as a **pointer, never a copied triple** — the cue is
made of the colour of the thing just removed. `B5`'s checkable form bans a parameter reading
*progress, streak, count, elapsed time or depth*; `tierIndex` is none of the five, the same
reconciliation Audio makes for its per-tier note `[research: cid/audio/_category.md]`. Count,
size, lifetime and spread are constants, so **intensity never varies** — only identity.

**The budget, with `budgets`' own conflation corrected.** `5,814` is **instances** —
`9 × laneInstanceFormula(640)` = 9 × 646, including the spawn `Attachment`, which draws nothing.
`5,805` is **parts** — `9 × lanePartFormula(640)` = 9 × 645 — and it is the figure a draw-call
claim is made against. `budgets.renderCeilings.batchingFactor.escalationIfBelow10` states 5,814 as
draw calls; that is that key's defect (`_verified.md` predicted conflict 5) and I cite the parts
figure. **This key adds 7 renderable objects** — at most 4 emitters and 3 `Part`s — **0.12% of
5,805, at every batching factor**, because neither count depends on batching. So `batchingFactor`
does not bound this domain at either end, and **the binding term is fill rate and overdraw**,
which batching does not touch: *"Particle count can impact performance due to overdraw… Particle
size can impact performance due to fill-rate"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/effects/particle-emitters.md]`,
*"be especially careful to avoid high transparency overdraw"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/design.md]`.
No published figure bounds screen area, so the ceiling is **fraction of screen covered by effect
pixels**, `[playtest unknown]` 0.02, test range 0.01–0.06, against an instrument `serverCost`
records as `UNOWNED`. The platform cap — *"up to 400 particles per second (100 per second on
mobile)"*, same page — is unreachable: every emitter has `Rate` 0 and emits **8 particles once**
in a 0.4 s life. Whether `:Emit(n)` is rate-capped at all is `[unverified]`; the cap is documented
against `Rate` only `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ParticleEmitter.yaml]`.

**Three of my five subjects are zero and a fourth is empty**, each a `forbidden[]` row below with
a ruling and a countable observable. Reward and level-up bursts: no level-up exists, `B4` is *"no
VFX in the world"*, `rebirth` is a banned word, `rarity` is one graded ladder with
`perObjectVisualGrade` false so **nothing here is a rare drop**, and `discovery.repeat.possible`
is false. Trails and auras: cosmetics declined, `A13` removes the placement home,
`theme/identity/02` forbids avatar modification, and setting/05 criterion 2 already counts zero
`Beam` and zero `Trail`. Ambient emitters: zero, **and I am not pushing back** — a persistent
emitter is on screen 100% of a session on a 3 GB phone against 0.4 s for a cue. Ability and impact
effects: `input.worldObjectsTriggeringAVerb` is 0 — **there are no abilities**, and the single
impact in this game is `patchClear`.

```manifest
{
  "provides": "effects",
  "status": "proposed",
  "value": {
    "revision": 1,
    "revisionNote": "round 1 of cid/art/_verified.md. RR-9: two styleGuide paths corrected, no value moved. RR-2: the reveal object moves from server-created to client-created and local-only, taking serverWorldInstancesAdded from 48 to 0 and making clientInstancesAdded a hard bound of 11 instead of a statistical 17-35.",
    "readBy": [
      "game/src/client/Beats.luau — the five cue bodies in CUES. cuePatchClear and cueFindReveal both draw; the other three stay empty of world work."
    ],
    "worldEffectCount": 2,
    "allEffectsAreClientLocal": true,
    "allEffectsAreClientLocalReason": "the clear is forced there by an 80 ms acknowledgment budget; the reveal is put there because at plots.pitchStuds 122 a 3-stud face subtends about 1.4 degrees, so a neighbour's reveal was never legible, and paying 48 server instances and up to 18 extra client instances for it put the client ceiling over.",
    "particleEmitterPermitted": true,
    "particleEmitterScope": "permitted as the world component of cues[patchClear] and nowhere else in this game: not as ambience, not on the tool, not on a character, not on a Find, not on built stone, not as a resident of the lane slab, not inside any GUI",
    "particleEmitterCountAtRest": 0,
    "particleEmitterCountAtRestRule": "with no clear in the last 0.40 s, workspace:GetDescendants() contains zero ParticleEmitter. This is theme/setting/05 criterion 2 satisfied by construction rather than by promise.",
    "textureSourceRule": {
      "schemeRequired": "rbxasset://",
      "schemeForbidden": "rbxassetid://",
      "schemeReason": "rbxasset:// is the client's own content folder and is not an uploaded image asset, so budgets.textureCeilings.uploadedImageAssetsInWorldGeometry 0 and N17's grep both hold",
      "assetIdNamed": false,
      "assetIdNamedReason": "no sourced enumeration of the shipped particle textures exists in the research pack; a name here would be an invented fact presented as a sourced one",
      "form": "a soft-edged opaque mote: no star points, no cross, no ring, no lens flare, no lettering, no figure",
      "rejectedByName": "rbxasset://textures/particles/sparkles_main.dds, the engine default. A star-pointed sparkle reads as magic and as treasure, against theme/lore/01's overrule and theme/setting/05 A7.",
      "LightEmission": 0,
      "LightInfluence": 1,
      "luminanceRule": "no particle and no effect Part emits its own light. Zero PointLight, SpotLight, SurfaceLight, Enum.Material.Neon, and zero Reflectance above 0 anywhere in this key.",
      "researchOwed": "the enumerated list of rbxasset:// particle textures shipped in the Roblox client content folder"
    },
    "classesPermitted": ["ParticleEmitter", "Attachment", "Part"],
    "classesForbiddenOutright": ["Beam", "Trail", "Fire", "Smoke", "Sparkles", "Explosion", "Highlight", "BillboardGui", "SurfaceGui", "Decal", "Texture", "PointLight", "SpotLight", "SurfaceLight", "Atmosphere", "Clouds", "BloomEffect", "BlurEffect", "ColorCorrectionEffect", "SunRaysEffect", "DepthOfFieldEffect"],
    "cues": [
      {
        "id": "patchClear",
        "rank": 5,
        "channelUsed": "atPatch",
        "channelExclusivityNote": "channelExclusivity.atPatch names findReveal while response.beats[patchClear].channels lists atPatch. Beats.luau records that the pair cannot both be enforced and reads exclusivity as governing the four SEQUENCED beats, exempting patchClear. This key adopts that reading and does not re-open it.",
        "worldComponent": "particleBurst",
        "class": "ParticleEmitter",
        "host": "an Attachment parented to the live lane slab Part (representation.plot). NEVER the patch.",
        "hostReason": "Clearing.luau clearPatch destroys the patch Instance at the instant of the clear, and destroying an emitter's parent removes its live particles immediately, so a cue hosted on the patch dies at the instant it should play",
        "instanceCount": 2,
        "instanceCountBreakdown": "1 Attachment + 1 ParticleEmitter, created together, destroyed together",
        "decidedBy": "response.beats[patchClear].decidedBy — clientPredictedServerAuthoritative",
        "createdBy": "client",
        "createdByReason": "response.beats[patchClear].acknowledgmentBudgetMs is 80 ms from the client's own radius test; no server-created Instance arrives inside it",
        "replicated": false,
        "positionSource": "the cleared patch's world position, from the client-side predicted radius test that response.beats[patchClear].decidedBy already requires",
        "positionSourceExistsToday": false,
        "positionSourceBlocker": "cuePatchClear receives no args and is driven off a rise in snapshot.clearedCount; no client module holds a patch table or a patch position. See cid/art/vfx/02, RR-V1.",
        "emitter": {
          "Rate": 0,
          "Enabled": false,
          "emitMethod": "Emit",
          "emitCount": 8,
          "emitCountStatus": "[playtest unknown], test range [4, 16]",
          "emitTimes": 1,
          "Lifetime": [0.30, 0.35],
          "LifetimeCeilingReason": "the maximum must be strictly below residueLifetimeSeconds 0.40 so no live particle is ever cut short by the host's destroy",
          "Size": [[0, 0.6], [1, 0.35]],
          "SizeUnit": "studs, NumberSequence keypoints [time, value]",
          "Transparency": [[0, 0], [0.7, 0], [1, 1]],
          "TransparencyReason": "opaque for 70% of life, then out. The platform advises avoiding values other than 0 and 1; a three-keypoint tail on at most 32 particles of 0.6 studs is the smallest departure that avoids a hard pop, and the departure is stated rather than hidden.",
          "Speed": [1.5, 3.0],
          "EmissionDirection": "Top",
          "SpreadAngle": [35, 35],
          "Acceleration": [0, -6, 0],
          "AccelerationReason": "particles rise about 0.33 studs and settle. Nothing ascends, rises away or streams upward: theme/tone/04 D5's vocabulary and any ascension motif are out.",
          "Drag": 0,
          "Rotation": [0, 0],
          "RotSpeed": [0, 0],
          "ZOffset": 0,
          "LockedToPart": false,
          "Color": "ColorSequence, constant across life, resolved from tiers[patch.tierIndex].rgb",
          "ColorIsAPointer": true,
          "ColorPointerReason": "tiers owns the four rgb triples and art/objects/01 criterion 3 checks them. A literal here would be a second source for one colour.",
          "Texture": "per textureSourceRule"
        },
        "lifetimeSeconds": 0.40,
        "lifetimeSource": "response.beats[patchClear].residueLifetimeSeconds",
        "stopCondition": "an explicit scheduled Destroy of the Attachment at 0.40 s after creation. Not a Debris lifetime longer than 0.40, not left to expire, not pooled, not re-used.",
        "objectsAtPositionAfterStop": 0,
        "variesBy": ["patch.tierIndex — particle Color only"],
        "neverVariesBy": ["progress", "streak", "count", "elapsedTime", "depth", "area", "run ordinal", "first ever", "last ever", "another player's action", "the Find name", "the set"]
      },
      {
        "id": "findReveal",
        "rank": 1,
        "channelUsed": "atPatch",
        "worldComponent": "dwellObject",
        "class": "Part",
        "host": "parented to the client-local effect folder; anchored, standing free above the lane slab",
        "instanceCount": 1,
        "instanceCountRule": "exactly one Instance exists at the reveal position for the whole dwell. Not one plus an emitter, not one plus an Attachment.",
        "decidedBy": "response.beats[findReveal].decidedBy — server. Unchanged: the server decides the beat and fires FindRevealed; only the renderer is client-side.",
        "createdBy": "client",
        "createdByReason": "at plots.pitchStuds 122 a 3-stud face subtends about 1.4 degrees, so a replicated object was not legible to the only observer who could see it. Client creation costs 0 server instances, makes the client count a hard bound rather than a function of loaded lanes, and puts the draw in the cue seam Beats.luau exists for.",
        "createdBySupersedes": "round 0's server creation, which cost 48 server instances and 9-27 client instances and was half of the client over-subscription cid/art/_verified.md RR-2 found",
        "replicated": false,
        "replicatedConsequence": "a neighbour does not see your reveal object. The patch Instances themselves are server-destroyed and replicate, so social/02's visibly-cleared ground is unaffected, and theme/tone/03's forbidden peak on another player's reveal now holds by construction rather than by rule.",
        "positionSource": "a Vector3 on the FindRevealed payload, which today carries only the Find name string",
        "positionSourceExistsToday": false,
        "positionSourceBlocker": "FindRevealed's payload is one Find name string. See cid/art/vfx/02, RR-V1 form (c) — 12 bytes on a channel tech/networking/01 prices at 23 bytes worst case, firing collection.relicsPerArea times per area.",
        "part": {
          "Shape": "Block",
          "Size": [3, 0.4, 3],
          "sizeSource": "patch.footprint 3 for the XZ face — a pointer, not a second footprint",
          "positionRule": "centred on the patch's XZ, centred in Y on the lane slab's top face, so 0.2 studs stand above the paving and 0.2 sit inside the slab. No coplanar faces, so no z-fighting.",
          "Anchored": true,
          "CanCollide": false,
          "CanQuery": false,
          "CanTouch": false,
          "CastShadow": false,
          "Transparency": 0,
          "Reflectance": 0,
          "materialRole": "styleGuide.roles[\"stone.cleared\"] — its material",
          "colorRole": "styleGuide.roles[\"stone.cleared\"] — its rgb",
          "colorLiteral": "absent",
          "colorLiteralReason": "styleGuide (art/style/01) owns the world palette. A literal here would be the second source for a colour it owns. Absence is a declared sentinel, not a null.",
          "contrastRequirement": "abs(Rec.601 luma(this Part) - Rec.601 luma(the lane slab)) >= 25, so the object is legible against the surface it sits on whatever hue styleGuide picks",
          "legibilityRequirement": "the 3 x 3 stud top face must be at or above styleGuide.formLanguage.featureSize.near.minStuds, which is 0.5. The face clears it by 6x, so no value in this key moves. If that field ever rises above 3, this object grows to meet it; it never shrinks."
        },
        "motion": { "tween": false, "fade": false, "scale": false, "rotate": false, "rise": false, "pulse": false, "blink": false },
        "motionReason": "theme/tone/03 B1 forbids amplification of any kind; D2 forbids a pulse; response's own reasoning makes persistence the whole distinction. The object appears, holds still and is destroyed.",
        "lifetimeSeconds": 2.5,
        "lifetimeSource": "response.beats[findReveal].dwellSeconds",
        "stopCondition": "an explicit scheduled Destroy at 2.5 s after creation",
        "objectsAtPositionAfterStop": 0,
        "permanenceRule": "at 2.6 s nothing at that position differs from any other cleared position. This is theme/setting/04 W1 in a form a build can be failed against.",
        "readsAsTheFind": false,
        "readsAsTheFindReason": "representation.find rules a Find has no Instance ever. This is ground, not a thing: flush-set into the paving, no handle, no relief figure, no cut lettering, no name on it, byte-identical for all 24 Finds, not collidable, not queryable, not touchable. It is not any live Find name — not a Ring, a Coffer, a Seal or a Tessera.",
        "namePresent": false,
        "nameRuling": "the Find's name is NOT drawn at the patch. N1's check bans BillboardGui anywhere in game/src and that is the only ordinary route to camera-facing world text. Consequence: a Find's name reaches the player only inside the collection index.",
        "variesBy": [],
        "neverVariesBy": ["the Find name", "the set", "the depth", "the area", "the run ordinal", "first ever", "last ever", "another player's reveal", "progress", "streak", "count", "elapsedTime"]
      },
      {
        "id": "setComplete",
        "rank": 2,
        "worldComponent": "none",
        "ruling": "response.beats[setComplete].channels is [notice, audio]. notice is HUD space and is notices'; audio is Audio's. No sheet grants B2 a world channel and this key does not invent one.",
        "observable": "cueSetComplete creates no Instance in workspace"
      },
      {
        "id": "areaComplete",
        "rank": 3,
        "worldComponent": "none",
        "ruling": "theme/tone/03 grants B3 'audio and VFX'; response.beats[areaComplete].forbiddenChannels names atPatch and its channels are [notice, audio]. There is no surface on which B3's VFX could be drawn. Overruled in favour of response — see the Pushing back section of this sheet. theme/setting/04 independently forbids any effect marking entry into a finished part.",
        "observable": "cueAreaComplete creates no Instance in workspace; effects.cues[areaComplete] has no class, host or emitter field"
      },
      {
        "id": "upgradePurchased",
        "rank": 4,
        "worldComponent": "none",
        "ruling": "theme/tone/03 B4 is 'audio and UI only, no VFX in the world', a confirmation and not a celebration. response.beats[upgradePurchased].channels is [readout, audio].",
        "observable": "cueUpgradePurchased creates no Instance in workspace"
      }
    ],
    "budget": {
      "bindingTerm": "fill rate and overdraw",
      "bindingTermReason": "batching does not touch either, and neither does this key's object count: 7 renderable objects at most, at every batching factor.",
      "instancesVersusParts": "5814 is instances, 9 x laneInstanceFormula(640) = 9 x 646, including the spawn Attachment which draws nothing. 5805 is parts, 9 x lanePartFormula(640) = 9 x 645, and it is the figure a draw-call claim is made against. budgets.renderCeilings.batchingFactor.escalationIfBelow10 states 5814 as draw calls; that is that key's defect, recorded at cid/art/_verified.md predicted conflict 5, and this key cites the parts figure.",
      "renderableObjectsAdded": 7,
      "renderableObjectsDerivation": "4 concurrent clear emitters + 3 concurrent reveal Parts. 7 against 5805 lane parts is 0.12%, and it does not vary with batchingFactor because neither count depends on it.",
      "notMyLever": "if batchingFactor comes back below 10 the lever is depths.areas[].patchCount, a finding against depths and not an art decision or an optimisation request",
      "concurrentClearEffectsPerPlayer": 4,
      "concurrentClearEffectsDerivation": "response.minSustainedOnsetsPerSecond 8 x residueLifetimeSeconds 0.40 = 3.2, ceil 4",
      "concurrentClearEffectsOnOneScreen": 4,
      "concurrentRevealObjectsPerPlayer": 3,
      "concurrentRevealObjectsPerPlayerDerivation": "collection.relicsPerArea 3 bounds it above; minOnsetGapSeconds 0.6 into a 2.5 s dwell would otherwise allow 4",
      "concurrentRevealObjectsOnOneScreen": 3,
      "concurrentRevealObjectsOnOneScreenReason": "client-created and unreplicated, so the count is the player's own and does not multiply by loaded lanes",
      "liveParticlesOnOneScreenMax": 32,
      "liveParticlesDerivation": "4 concurrent emitters x emitCount 8, and no emitter ever emits twice",
      "particlesPerSecondPerEmitterMax": 8,
      "platformCapPerEmitterMobile": 100,
      "platformCapPerEmitterDesktop": 400,
      "platformCapHeadroom": "8 against 100. Rate is 0 on every emitter in this key, so the cap cannot be approached even if Emit is subject to it, which the docs state against Rate only and is [unverified].",
      "serverWorldInstancesAdded": 0,
      "serverWorldInstancesAddedReason": "both cues are client-local. Round 0's 48 (1 Part x 3 reveals x runtime.maxPlayers 16) is released back to the 1,664 free under budgets.instanceCeilings.serverWorldInstanceCeiling.",
      "clientInstancesAdded": 11,
      "clientInstancesDerivation": "4 concurrent clear hosts x 2 instances (Attachment + ParticleEmitter) = 8, plus 3 concurrent reveal Parts x 1 = 3. Total 11.",
      "clientInstancesAreAHardBound": true,
      "clientInstancesAreAHardBoundReason": "both figures are per-player concurrency ceilings derived from response.minSustainedOnsetsPerSecond and collection.relicsPerArea, and neither cue replicates, so the count cannot scale with loaded lanes or with player count. This is the firm number other domains size against.",
      "clientCeilingArithmetic": "clientStreamedInstancesWorstCase 5814 + (9 x environment.allowance.residentInstancesPerLane) + environment.allowance.sharedPlaceInstances + 11 <= budgets.instanceCeilings.clientStreamedInstanceCeiling 6000. At 16 and 24 that is 5814 + 144 + 24 + 11 = 5993, 7 spare, AT THE WORST CASE rather than at a realistic figure.",
      "screenAreaFractionCeiling": 0.02,
      "screenAreaFractionStatus": "[playtest unknown], test range [0.01, 0.06]",
      "screenAreaFractionUnit": "fraction of viewport pixels covered by effect pixels at the worst frame, effect pixels counted once per overlapping layer",
      "screenAreaFractionReason": "no published figure bounds particle screen-area cost. Roblox instructs developers to choose a baseline device and measure.",
      "instrument": "Developer Console render stats on budgets.deviceFloor, one lane loaded then nine, with and without a sustained 8-clears-per-second sweep",
      "instrumentOwner": "UNOWNED — serverCost.instrumentOwner records the same hole. Every figure in this budget is a prediction with no instrument behind it.",
      "noCeilingCoversThis": "budgets has no fill-rate or screen-area field. screenAreaFractionCeiling is offered to tech/performance as one, and this key sets it provisionally rather than leaving it unbounded."
    },
    "forbidden": [
      { "id": "levelUpBurst", "what": "any burst, flourish or flash on a level, rank or milestone", "ruling": "there is no level-up: upgrades is a purchased ladder and theme/tone/03 B4 is 'audio and UI only, no VFX in the world'", "observable": "effects.cues has 5 rows keyed to response.beats and none named level, rank or milestone" },
      { "id": "rewardBurst", "what": "a burst at a currency award or a purchase", "ruling": "theme/tone/03 B4, a confirmation and not a celebration", "observable": "cues[upgradePurchased].worldComponent is none; cueUpgradePurchased creates no Instance" },
      { "id": "rareDropCue", "what": "a rarity flash, beam, colour grade or shape change at a high-tier clear", "ruling": "rarity is one graded ladder read from patch.tierIndex with perObjectVisualGrade false; nothing in this game is a rare drop", "observable": "the only cue parameter reading tierIndex is the clear's particle Color; emitCount, Size, Lifetime, Speed and SpreadAngle are constants" },
      { "id": "duplicateConsolationCue", "what": "an 'already found' cue, a consolation effect or a second-time-seen variant", "ruling": "discovery.repeat.possible is false — no reachable duplicate exists", "observable": "no cue reads a found-count or a repeat flag" },
      { "id": "endgameCue", "what": "a ceremony, a final burst or a completion effect at 24 of 24", "ruling": "endgame.extinctPayoffKinds makes findReveal and setCompletion extinct rather than escalating; no end screen, no congratulation, no completion percentage", "observable": "no cue's cause is collection completion" },
      { "id": "rebirthEffect", "what": "a prestige aura, reset flare, seed, sapling or new-growth motif", "ruling": "03-META.md priority 3; rebirth is in vocabulary.bannedWords", "observable": "grep -in 'rebirth|prestige|sapling' cid/art/vfx/*.md matches only this row" },
      { "id": "trail", "what": "any Trail on a character, a tool or a moving object", "ruling": "cosmetics were declined; theme/setting/05 A13 removes the placement home; theme/identity/02 forbids avatar modification; setting/05 criterion 2 already counts 0 Trail", "observable": "classesForbiddenOutright contains Trail; grep -rn 'Trail' game/src returns nothing" },
      { "id": "aura", "what": "a persistent effect attached to a player, a tool or a plot", "ruling": "same as trail, plus theme/setting/05 A7's ban on any luminous thing", "observable": "no cue's host is a character, a Humanoid, a tool Part or a plot" },
      { "id": "beam", "what": "any Beam between two attachments", "ruling": "theme/setting/05 criterion 2 counts 0 Beam", "observable": "classesForbiddenOutright contains Beam; grep -rn 'Beam' game/src returns nothing" },
      { "id": "ambientEmitter", "what": "any emitter, Fire, Smoke or Sparkles running because the place exists", "ruling": "theme/setting/05 A14 and criterion 2; theme/setting/03 R5 — anything scheduled, intermittent or randomised over time is a change of state and fails", "observable": "particleEmitterCountAtRest is 0, checked with no clear in the last 0.40 s" },
      { "id": "abilityEffect", "what": "a cast, charge, cooldown, dash or ability effect", "ruling": "input.worldObjectsTriggeringAVerb is 0 and the verb roster is closed at five — there are no abilities", "observable": "effects.cues is keyed to response.beats and response has five beats, none of which is an ability" },
      { "id": "toolImpactEffect", "what": "a swing arc, hit spark, dust puff or contact effect on the tool", "ruling": "tool.animates is false and tool.particleEmitters is 0; the single impact in this game is a patch ceasing to exist, which is cues[patchClear]", "observable": "no cue's host is the tool Model or either of its two Parts" },
      { "id": "areaCompleteWorldCue", "what": "any world-anchored effect at an area completion", "ruling": "response.beats[areaComplete].forbiddenChannels names atPatch and its channels are [notice, audio]; theme/setting/04 forbids any effect marking entry into a finished part. See this sheet's Pushing back.", "observable": "cues[areaComplete].worldComponent is none" },
      { "id": "setCompleteWorldCue", "what": "any world-anchored effect at a set completion", "ruling": "response.beats[setComplete].channels is [notice, audio]", "observable": "cues[setComplete].worldComponent is none" },
      { "id": "passageCue", "what": "a fade, wipe, transition or effect on entering an area, a depth or a finished part", "ruling": "theme/setting/04 — no effect, sound, fade, camera move or transition may mark passage", "observable": "no cue's cause is an area transition, an arrival or a threshold crossing" },
      { "id": "plotConstructionCue", "what": "reusing the clear or reveal cue when a plot or bay is built, and any build-time effect of its own", "ruling": "theme/identity/03 — a clear or completion cue may not be reused on plot construction; N16", "observable": "no cue's cause is a bay build; grep -rn 'TweenService' game/src/server/Plots.luau returns nothing" },
      { "id": "patchSpawnCue", "what": "a stagger, fade, tween or pop as patches come into existence", "ruling": "N16; theme/identity/03 — 'a plot appears and disappears whole'", "observable": "the bay container's Parent is assigned exactly once per build" },
      { "id": "regrowthCue", "what": "any effect reading as regrowth, return, refill, reset or overgrowth coming back", "ruling": "'Cleared is permanent — overgrowth never returns' 01-FOUNDATION.md [brief: binding]", "observable": "no cue's cause is a patch appearing on a cleared position; permanenceRule holds at 2.6 s" },
      { "id": "approachToCompletionRamp", "what": "any cue that grows, brightens, quickens or accumulates as an area nears completion", "ruling": "theme/tone/03's load-bearing forbidden peak — 'a ramp is tension'; HANDOFF.md six-things #4 forbids inventing tension", "observable": "no cue parameter reads clearedCount, areaPatchCount, a ratio of the two, or elapsed time" },
      { "id": "firstOrLastAmplification", "what": "a bigger cue for the first Find ever, the last one, a deeper area or a higher tier", "ruling": "theme/tone/03 B1 — not amplified for the first ever, the last, by depth or by rarity of the Find", "observable": "cues[findReveal].variesBy is empty; every field of cues[findReveal].part is a constant" },
      { "id": "setVariantRevealCue", "what": "a reveal cue that varies by which set the Find belongs to", "ruling": "rarity.forbidden bans it by name", "observable": "cueFindReveal reads args[1] for nothing; the reveal object is byte-identical for all 24 Finds" },
      { "id": "otherPlayerRevealCue", "what": "any cue on my screen caused by another player's clear, reveal or completion", "ruling": "theme/tone/03's forbidden peaks; social/03 X11", "observable": "no cue's cause names another Player; neither cue replicates, so no effect Instance created by one client exists on another" },
      { "id": "timeTriggeredEffect", "what": "an idle, attract, loop or anything firing because time passed", "ruling": "theme/setting/03 — 'no effect may fire because time passed, and no idle, loop or attract animation exists anywhere in the place'", "observable": "every cue's cause is a response beat; zero looping tweens and zero RunService-driven effect updates in game/src" },
      { "id": "cameraAndScreenEffect", "what": "camera shake, zoom, pan, look-at, slow motion, freeze frame, full-screen flash, radial speed lines, chromatic aberration, vignette, colour grade", "ruling": "theme/tone/04 D5; response R3 and R4", "observable": "classesForbiddenOutright contains every PostEffect class; grep -rn 'CameraType.Scriptable|CameraOffset' game/src returns nothing" },
      { "id": "lightEffect", "what": "light flicker, moving or animated shadow, darkening pulse, fog volume, dust motes, any light source", "ruling": "theme/tone/04 D2; theme/setting/05 A7; N7", "observable": "luminanceRule: zero PointLight, SpotLight, SurfaceLight, Enum.Material.Neon, and zero Reflectance above 0 in this key" },
      { "id": "worldGainFloater", "what": "a rising +N, a payout number, a total or any digit drawn at the patch", "ruling": "notices.forbidden[gainFloater] bans it in HUD space and nothing had banned it in world space; economy — a completion cue cannot say +N", "observable": "no cue formats a number; no cue creates a BillboardGui, SurfaceGui or TextLabel" },
      { "id": "findNameAtPatch", "what": "the Find's name drawn in the world at the reveal position", "ruling": "N1's check bans BillboardGui anywhere in game/src, closing the only ordinary route to camera-facing world text. Decided against rather than escalated — see this sheet's Why, and cid/art/vfx/02 for the closed mechanism and its reversal condition.", "observable": "cues[findReveal].namePresent is false; cueFindReveal never reads onset.args[1]" },
      { "id": "pooledEffectHost", "what": "pooling, recycling, re-parenting or disabling-and-reusing any effect Instance", "ruling": "cid: decided — a pooled emitter parked at a patch position IS an object at that position, which breaks response criterion 2's zero count", "observable": "every effect Instance is created at onset and destroyed at its stop condition; no effect Instance is ever assigned a second Parent" },
      { "id": "deferredOrBatchedCue", "what": "coalescing, queueing, delaying or dropping a cue to smooth a frame", "ruling": "N14; response.onOverload is 'overlap' and minSustainedOnsetsPerSecond is 8", "observable": "eight clears in one second produce eight independent hosts; there is no accumulator, queue or coroutine between the radius test and the cue" },
      { "id": "seasonalOrEventVariant", "what": "a seasonal, festival, holiday, daily or timed variant of either cue", "ruling": "03-META.md priority 3; theme/tone/04 D15", "observable": "cues has 5 rows and no row has a date, calendar, season or event field" },
      { "id": "reservedCueSlot", "what": "an unused emitter, a disabled effect, a stub cue, an empty forbidden entry or any field held open for a future effect", "ruling": "03-META.md priority 3, hard as a gate", "observable": "classesPermitted has 3 entries and every one is used by a cue above; cues has exactly 5 rows, one per response beat, and no sixth" }
    ],
    "externalPathsCited": [
      "response.beats[patchClear].residueLifetimeSeconds", "response.beats[patchClear].acknowledgmentBudgetMs", "response.beats[patchClear].decidedBy", "response.beats[patchClear].channels", "response.beats[findReveal].dwellSeconds", "response.beats[findReveal].decidedBy", "response.beats[areaComplete].forbiddenChannels", "response.beats[areaComplete].channels", "response.beats[setComplete].channels", "response.beats[upgradePurchased].channels", "response.channelExclusivity.atPatch", "response.minSustainedOnsetsPerSecond", "response.minOnsetGapSeconds", "response.onOverload",
      "budgets.instanceCeilings.clientStreamedInstanceCeiling", "budgets.instanceCeilings.serverWorldInstanceCeiling", "budgets.instanceCeilings.laneInstanceFormula", "budgets.instanceCeilings.lanePartFormula", "budgets.renderCeilings.batchingFactor", "budgets.textureCeilings.uploadedImageAssetsInWorldGeometry", "budgets.deviceFloor",
      "collection.relicsPerArea", "discovery.repeat.possible", "endgame.extinctPayoffKinds", "input.worldObjectsTriggeringAVerb", "tool.animates", "tool.particleEmitters", "patch.footprint", "tiers[].rgb", "plots.pitchStuds", "depths.areas[].patchCount", "runtime.maxPlayers", "serverCost.instrumentOwner", "vocabulary.bannedWords",
      "styleGuide.roles[\"stone.cleared\"]", "styleGuide.formLanguage.featureSize.near.minStuds", "environment.allowance.residentInstancesPerLane", "environment.allowance.sharedPlaceInstances",
      "representation.plot", "representation.find", "notices.forbidden[gainFloater]"
    ],
    "externalPathsCitedNote": "every path above was re-resolved against its owning manifest in round 1, per cid/art/_verified.md RR-9's instruction to check every cited path rather than only the two it named. Two were wrong and are corrected; the rest resolve.",
    "tokenPathsNeeded": {
      "worldTokenLayerExists": false,
      "finding": "CLAUDE.md binds 'arbitrary values enter through tokens, never as literals in a spec'. generateTheme implements it for UI only and has no vocabulary for a ParticleEmitter — no path for a colour sequence, a lifetime, a rate or a particle size. Every scalar in this key is therefore a literal, which is what the token rule exists to prevent. This is category gap G3.",
      "notMineToFix": "styleGuide names the world-side layer; the seam owner rules whether it exists",
      "pathsThisKeyWouldResolveThrough": [
        "color.world.stone.cleared — cues[findReveal].part.colorRole",
        "material.world.stone.cleared — cues[findReveal].part.materialRole",
        "color.world.overgrowth.byTierIndex — cues[patchClear].emitter.Color, today tiers[].rgb",
        "effect.clear.emitCount, .lifetimeSeconds, .sizeStuds, .speedStuds",
        "effect.reveal.dwellSeconds, .sizeStuds, .reliefStuds"
      ],
      "absenceIsASentinel": true,
      "absenceIsASentinelReason": "tech/deploy/02 — absence is a declared sentinel, never an explicit null"
    },
    "revisionRequestsHeldBy": "cid/art/vfx/02-who-draws-it-and-where.md — RR-V1 (a patch position on the client, for both cues), RR-V2 (a named creator in representation), RR-V3 (response's channel table, jointly with Audio)"
  }
}
```

## Pushing back

**I overrule `theme/tone/03-beat-map`'s grant of VFX to `B3` (area completion).** Its words are
*"audio and VFX; no modal"*; `response.beats[areaComplete]` gives it `channels: ["notice",
"audio"]` with `forbiddenChannels: ["atPatch"]`. `notice` is HUD space and is `notices`'; `audio`
is Audio's; `atPatch` is banned by name. **There is no surface on which `B3`'s VFX could be
drawn.** I take `response` over `theme/tone/03` because it is later and more specific, because
`notices` has built its whole key on `areaComplete` being a plate, and because `theme/setting/04`
independently forbids any effect marking entry into a finished part — so even with a channel the
cue would be illegal. **Ruling: `cues[areaComplete].worldComponent` is `none`.**

**This is the mirror of Audio's `G1`**, where `response` gives `patchClear` no `audio` channel
while the same sheet says *"audio is the one channel every beat shares"*. SFX is filing against
`gameplay/mechanics/05` for that half; **I cite theirs rather than duplicate it and ask that
`response` be reopened once for both**, which `_verified.md` predicted conflict 4 now instructs.

## Flagged to the developer

1. **This domain was never interviewed** — zero brief lines, no `OPEN.md` audit row, one clause of
   direction. The live alternatives were: no world effects at all (compliant with *"the smallest
   game"* and cheapest), the two specced here, or those two plus a world cue for `B3`. **I
   recommend the two**, because *"audio and visual feedback carry the entire feedback load"* is
   binding and a stated zero on the game's two most-repeated moments carries half of nothing.
2. **A Find's name is never shown in the world.** With `notices` ruling zero HUD component and
   this sheet declining the patch, the 24 names — *"the differentiator"* — appear only inside an
   opened panel. The alternative is narrowing `N1`'s `BillboardGui` token to its LOD intent. **I
   recommend leaving it closed**, but this is the one decision here a player would plainly notice.
3. **A neighbour no longer sees your reveal.** Round 1 moved it client-side because a 3-stud face
   at 122 studs subtends 1.4° and was never legible. The alternative is server creation at 48
   server and up to 27 client instances. **I recommend the client**; the field that reverses it is
   `cues[findReveal].createdBy`.

## Consequences for other work

- **Environment work sizes against a firm 11, not a range.** `clientInstancesAdded` is a hard
  bound: both figures are per-player concurrency ceilings and neither cue replicates, so the count
  cannot grow with loaded lanes or with player count. At `residentInstancesPerLane` 16 and
  `sharedPlaceInstances` 24 the client total is **5,993 with 7 spare, at the worst case rather
  than at a realistic figure** — which round 0's server-created reveal could not offer.
- **Tech — Performance** gets 48 server instances back (this key now costs **0** against
  `serverWorldInstanceCeiling`), one correction to carry (`5,814` is instances, `5,805` is parts;
  its own `escalationIfBelow10` conflates them), and one field `budgets` lacks: a fill-rate
  ceiling. I set `screenAreaFractionCeiling` at 0.02 provisionally; it is theirs to ratify.
- **Snapshot-and-wire and prediction work** must now give **both** cues a position — the clear
  from the client-side radius test, the reveal from a `Vector3` on `FindRevealed`. `vfx/02` RR-V1.
- **Instance-representation work** must name a legal creator, now **client-side for both**.
  `vfx/02` RR-V2. **The gap is structural, not mine:** `_verified.md` check 3 records that
  Environment's 18 + 24 parts have the identical problem and filed nothing, so `representation`
  owes two subjects and should answer them in one round.
- **Style-guide work** owes the two fields this key resolves through and carries no literal for:
  `roles["stone.cleared"]` and `formLanguage.featureSize.near.minStuds`. My 25-luma contrast floor
  and 3 × 3 stud face are stated against them, and the face clears the 0.5 minimum by 6×.
- **Audio — Stingers** may run `B1` longer than 2.5 s; the visual ends at 2.5 and the object at
  2.6, and the two may end apart. I set no audible length and ask for none.
- **Feedback work (`notices`)** may close its recorded finding as **declined**: a Find's name
  reaches the player only inside the collection index.

## Acceptance criteria

1. 0.40 s after any `patchClear` onset, the Instance count at that patch's world position is **0**
   and the live particle count there is **0**. Every `ParticleEmitter` in `effects.cues[]` has
   `Rate` 0, a maximum `Lifetime` ≤ 0.35 and an `emitCount` ≤ 8; with no clear in the last 0.40 s,
   `workspace:GetDescendants()` contains **zero** `ParticleEmitter`.
2. At every instant from 0.1 s to 2.5 s after a `findReveal`, **exactly one** Instance exists at
   that patch position, its `ClassName` is `Part`, and its class is none of `ParticleEmitter`,
   `Beam`, `Trail`, `Fire`, `Smoke`, `Sparkles`, `BillboardGui`, `SurfaceGui` or `Decal`. At 2.6 s
   the count is **0** and nothing there differs from any other cleared position.
3. `effects.budget.serverWorldInstancesAdded` is **0** and `clientInstancesAdded` is **11**, and
   `5814 + 9 × environment.allowance.residentInstancesPerLane + environment.allowance.sharedPlaceInstances + 11 ≤ budgets.instanceCeilings.clientStreamedInstanceCeiling`
   holds in the merged manifest. No effect Instance created by one client exists on another.
4. Every entry in `effects.externalPathsCited` resolves to a field in the manifest of the key it
   names. `effects.cues[]` has exactly 5 rows whose ids equal `response.beats[].id`, exactly 2
   with a `worldComponent` other than `"none"`; `effects.forbidden[]` has **31** rows, each with a
   `ruling` and an `observable` that is a grep, a count or a manifest comparison.

## Not decided here

Which module creates each Instance, from which input, the three revision requests, and every
delivery mechanism already closed with its grep — sheet `02`, this domain, which supplies no key.
What either beat **sounds** like and for how long — Audio, Stingers and SFX; I name no `Sound`, no
`SoundId` and no length. The `stone.cleared` role's rgb and material, and the near-field minimum
feature size — `styleGuide`; I carry pointers and a contrast floor, and no literal. Whether the
world-side token layer exists at all — `styleGuide` names it, the seam owner rules it. The two
lifetimes 0.40 and 2.5 and every latency budget — `response`; consumed by field, set nowhere here.
`tiers[].rgb`, `patch.footprint` and the four tier shapes — `tiers` and `art/objects/01`, cited by
field and never restated. **Which consumer gives up the two parts that fund this key** —
Environment, under `_verified.md` RR-2; I state my need and allocate nobody else's parts. Patch
counts, chunk sizes and the batching factor — `depths`, `layout` and `budgets`. Who takes the
render-stats reading that would move every figure in my budget — **UNOWNED**, relayed to the final
cross-category pass.
