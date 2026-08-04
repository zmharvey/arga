# 01 — The unmodified body

**Domain:** Characters · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The body is the platform's and this game does not touch how it looks.** Zero appearance
overrides, zero entity classes, zero cosmetics, zero authored animations — each carried in
`characterArt` as a counted value with a runnable grep, not as a sentence.

**Two things are not zero and both are requirements on someone else's artifact:** the rig must be
**R15** (the value is `release.publishChecklist.P2`'s and I cite it rather than restate it), and the
health bar is off by a **`StarterPlayer`** property, not the `Humanoid` write `theme/identity/03`
named — see `## Pushing back`.

## Why

**The four zeros are inherited; what this sheet adds is the observable.** A zero in prose is a thing
a verifier must remember. A zero in a merged key is a thing a script can count.

| # | subject | ruling that empties it | source | observable |
|---|---|---|---|---|
| 1 | player avatar treatment | *"The player wears their own saved Roblox avatar, unmodified. No global override, no provided character, no uniform, no granted accessory."* | `theme/identity/02` `[brief: soft]` on cost, `[cid: decided]` on the choice | `grep -rnE "HumanoidDescription\|ApplyDescription\|LoadCharacterWithHumanoidDescription\|StarterCharacter\|BodyColors\|\bShirt\b\|\bPants\b" game/src` = **0**, and `default.project.json`'s `StarterPlayer` node carries `$className` + `StarterPlayerScripts` and **no `$properties`**, in a file that does carry them for `Lighting` and `Baseplate` |
| 2 | NPC and enemy models | *"This game contains nine classes of entity: none of them."* | `theme/identity/04` `[brief: soft]` ×9 | `theme/identity/04` criterion 2's wordlist: across `cid/**/*.md`, **0** values inside a ` ```manifest ` block match *npc, vendor, merchant, shopkeeper, enemy, enemies, boss, pet, pets, companion, follower, minion, mascot, guardian, spirit, ghost* |
| 3 | skins and cosmetics | *"Cosmetics-only was offered and declined"*; `products` `F7`/`F9`; `theme/setting/05` `A13` removes the placement home | `03-META.md` `[brief: soft]`, hardened downstream | `F7`'s own check: **no product changes any instance parented to the character other than the tool head's width.** Holds in shipped code — `Tool.refresh` writes `head.Size` and nothing else (`Tool.luau:347`) |
| 4 | authored animation | `tool.animates` false, `tool.particleEmitters` 0, `response.humanoidWritesAllowed` = `["WalkSpeed"]`, `N16` forbids animating patches into existence | `mechanics/04`, `mechanics/05:111` `[brief: soft]` | `grep -rnE "Animation\|Animator\|LoadAnimation\|AnimationTrack" game/src` = **0**; `grep -rn "rbxassetid" game/src` = **0** |
| 5 | rig constraints | **NOT zero.** R15 required; `R15 & R6` is the sharp failure, not R6 | `release.publishChecklist.P2`, inherited | `Humanoid.RigType == Enum.HumanoidRigType.R15`, readable per character from a server script `[research: https://create.roblox.com/docs/reference/engine/classes/Humanoid]` |

**Subject 5 is the one crash-class hazard.** Avatar Settings offers exactly **R6 / R15 / R15 & R6**
and *"modifies underlying game defaults that are not visible outside of the settings interface or
accessible with scripts"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/studio/avatar-settings.md]`.
`tool.attachment` is `RightHand`, an R15-only limb; one R6 joiner under the player-choice setting has
none, `Tool.equip` warns and builds nothing (`Tool.luau:295-308`), and every other player is correct
— a per-player defect with no error and no reproduction. **`P2` owns the value; `characterArt.rig`
is a requirement with a pointer, not a second source of truth.**

**The ruling I was handed is false as worded, and correcting it is half the point of this key.**
*"The only property the server writes on a character is `WalkSpeed`"* is true of **`Humanoid`**
properties only `[research: game/src/server/World.luau, game/src/server/init.server.luau, game/src/server/Tool.luau — files read]`:

| write | where | is it appearance? |
|---|---|---|
| `Humanoid.WalkSpeed` | `init.server.luau:242` | no — the one permitted `Humanoid` write |
| `BasePart.CollisionGroup` on **every** `BasePart` descendant **and every one added later** | `World.luau:110-112, 169-174`, whose comment names *"an Accessory handle"* | no — physics group. **This is the one place the game reaches into an avatar's own cosmetic instances, and it reaches all of them** |
| `character:PivotTo(...)`, once, on spawn | `init.server.luau:316` | no — position |
| a two-`Part` `Model` parented into the character | `Tool.luau:245`, head width at `:234` / `:347` | no — a held object, `objectArt`'s to dress |

So the key asserts **`appearanceWritesOnCharacter: 0`**, never "zero writes on a character", which
the running build would contradict on day one.

**The engine's `Animate` script is left running, and it is the free person-read.** No sheet removes
it and no `StarterCharacter` ships, so walk, idle and jump exist at zero cost — *"all players join
games as their saved Roblox avatar, which already includes all the components for an avatar
character"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/index.md]`.
Zero authored animation and a body that visibly walks are both true, and the second is what
`theme/identity/03`'s *"a person and not a prop"* is made of here.
`[research owed: an explicit statement that the default `Animate` LocalScript is inserted into every
character in a place shipping no `StarterCharacter`; settled by
create.roblox.com/docs/characters/index or the `Animate` script reference.]`

**Person-not-a-prop, as channels.** `gameplay/social/02` sets the bound: a neighbour must read as
*"a body, in motion, whose ground is visibly being cleared"* at ≤ **128 studs**; `plots.pitchStuds`
realises **122**.

| channel | available? | why |
|---|---|---|
| locomotion (walk/idle/jump) | **yes, and it is the whole read** | the default `Animate` script, unremoved |
| a body of the player's own choosing | **yes** | subject 1 — twenty different bodies, not twenty identical ones |
| nameplate | **no, at rest** | `StarterPlayer.NameDisplayDistance` defaults to **100** studs `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]` against a realised 122. Not dressed, not suppressed, not raised — `theme/identity/03`'s call, unchanged |
| health bar | **no, ever** | `theme/identity/03`, kept; route corrected below |
| uniform, badge, title, aura, trail | **no** | subjects 1 and 3 |
| authored idle, emote, wave, gesture | **no** | subject 4 |

**Avatar height stays at the platform band, and stating that closes an owed item.** Avatar Settings'
Body tab offers `Custom Scale` with a settable **Minimum and Maximum absolute height in studs**,
against reference heights of *~5 studs* classic and *~6 to 6.5* for humanoid proportions
`[research: cid/_research/pack.md — the entry banked by `art/characters/_lead` from creator-docs
`studio/avatar-settings.md`; its pack heading carries a stray trailing backtick, so the URL cannot be
cited verbatim. A defect in `npm run cid:research`, not in the source.]` **I apply no bound**:
narrowing `Custom Scale` is an appearance override in all but name, and nothing mechanical reads
body size (`movement.baseClearRadius` is a scalar 5.5, the tool head is a scalar). **This settles
`theme/identity/02`'s open `[unverified]`** — bodies do differ, so keeping that radius scalar is
correct and the free-permanent-upgrade defect it warned of is already avoided. The value stays
`movement`'s. This sheet produces zero player-facing strings, so `vocabulary` binds nothing here.

```manifest
{
  "provides": "characterArt",
  "status": "proposed",
  "value": {
    "avatarSource": "playerOwnSavedRobloxAvatar",
    "appearanceWritesOnCharacter": 0,
    "playerFacingStrings": 0,
    "requiredArtAssets": 0,
    "zeros": [
      {
        "id": "appearanceOverride",
        "count": 0,
        "closedList": ["HumanoidDescription", "ApplyDescription", "LoadCharacterWithHumanoidDescription", "StarterCharacter", "BodyColors", "Shirt", "Pants", "ShirtGraphic", "accessory granted by the game", "CharacterAppearanceId"],
        "grep": "grep -rnE \"HumanoidDescription|ApplyDescription|LoadCharacterWithHumanoidDescription|StarterCharacter|BodyColors|\\bShirt\\b|\\bPants\\b\" game/src",
        "expect": 0,
        "alsoCheck": "game/default.project.json StarterPlayer node has no $properties block",
        "ruledBy": "theme/identity/02"
      },
      {
        "id": "entityClass",
        "count": 0,
        "classes": ["npc", "enemy", "boss", "guardian", "vendor", "merchant", "shopkeeper", "questGiver", "namedCharacter", "faction", "companion", "pet", "follower", "minion", "spirit", "ghost", "mascot"],
        "grep": "theme/identity/04 criterion 2: across cid/**/*.md, values inside a manifest block matching those whole words, case-insensitive",
        "expect": 0,
        "ruledBy": "theme/identity/04",
        "reopensOnlyIf": "03-META.md priority 1 or 2 gains an entry naming a being, or a developer decision of equal provenance weight names one. Checked this run against both lists: priority 1 is six systems, priority 2 is three items, no being in either."
      },
      {
        "id": "cosmetic",
        "count": 0,
        "bannedForms": ["skin", "trail", "aura", "particle", "hat", "accessory", "follower", "mount", "emote", "title", "nameplate dressing"],
        "check": "products.F7 — no product changes any instance parented to the character other than the tool head's width",
        "expect": 0,
        "ruledBy": "03-META.md, products.F7, products.F9, theme/setting/05.A13",
        "leastDurable": true,
        "note": "theme/identity/02 removed one of the two stated grounds for declining cosmetics (the avatar IS the display system). The stance now rests on 'permanent multipliers only', which is Monetization's and the developer's to reopen, not art's."
      },
      {
        "id": "authoredAnimation",
        "count": 0,
        "grep": "grep -rnE \"Animation|Animator|LoadAnimation|AnimationTrack\" game/src",
        "expect": 0,
        "assetGrep": "grep -rn \"rbxassetid\" game/src",
        "assetExpect": 0,
        "engineAnimateScriptRemoved": false,
        "ruledBy": "mechanics/04 (tool.animates false, particleEmitters 0), mechanics/05 (humanoidWritesAllowed), theme/identity/03, tech/performance/03 N16"
      }
    ],
    "characterWrites": {
      "humanoidPropertiesAllowed": ["WalkSpeed"],
      "humanoidPropertiesForbidden": ["HealthDisplayDistance", "NameDisplayDistance", "DisplayDistanceType", "HealthDisplayType", "Health", "MaxHealth", "HipHeight", "CameraOffset", "DisplayName"],
      "nonHumanoidWritesPermitted": [
        { "write": "BasePart.CollisionGroup", "scope": "every BasePart descendant of every character, and every one added thereafter via DescendantAdded", "where": "game/src/server/World.luau:110-112,169-174", "appearance": false },
        { "write": "Model:PivotTo", "scope": "once, on spawn", "where": "game/src/server/init.server.luau:316", "appearance": false },
        { "write": "Model.Parent = character", "scope": "the one two-Part held tool", "where": "game/src/server/Tool.luau:245", "appearance": false },
        { "write": "BasePart.Size", "scope": "the tool head only, never a character limb", "where": "game/src/server/Tool.luau:234,347", "appearance": false }
      ],
      "assertion": "zero APPEARANCE writes on a character. NOT zero writes on a character — that phrasing is false against the shipped build."
    },
    "rig": {
      "required": "R15",
      "notAcceptable": ["R6", "R15 & R6"],
      "valueOwner": "release.publishChecklist.P2 — cited, not restated. runtime.placeConfiguration.avatarRigType carries the architect's copy.",
      "surface": "Studio > Game Settings > Avatar > Avatar Type; not scriptable",
      "readMechanism": "Humanoid.RigType == Enum.HumanoidRigType.R15, per character, from a server script",
      "assertedBy": "the spawn path, per character, before tool.equip looks for RightHand",
      "shippedToday": { "rigTypeReadsInGameSrc": 0, "status": "P2's read-back is specified and unimplemented" },
      "failureIfWrong": "R6: no character has RightHand and nobody in the place ever holds a tool. R15 & R6: one joiner is tool-less, intermittently, with no error."
    },
    "avatarScale": {
      "customScaleApplied": false,
      "minHeightStuds": null,
      "maxHeightStuds": null,
      "referenceHeightsStuds": { "classic": 5.0, "humanoidProportions": [6.0, 6.5] },
      "reason": "Narrowing Custom Scale is an appearance override in all but name; theme/identity/02 forbids one. Nothing mechanical reads body size.",
      "requiresOfMovement": "baseClearRadius stays a scalar and is never derived from a character bounding box. The value is movement's; this field only supplies the evidence that bodies differ."
    },
    "displayPolicy": {
      "nameplate": {
        "state": "platformDefault",
        "dressed": false,
        "suppressed": false,
        "writer": "none — no module writes it",
        "defaultDistanceStuds": 100,
        "realisedNeighbourSeparationStuds": 122,
        "consequence": "a co-present stranger is nameless at rest, by arithmetic rather than by ruling",
        "owner": "theme/identity/03, unchanged by this sheet"
      },
      "healthBar": {
        "displays": false,
        "property": "StarterPlayer.HealthDisplayDistance",
        "value": 0,
        "writer": "place configuration at publish — NOT a Humanoid property write, which response.humanoidWritesAllowed forbids",
        "route": "release.publishChecklist, as a new row, per the RR-P2 precedent",
        "shippedToday": { "healthDisplayDistanceOccurrencesInGameSrc": 0 }
      }
    },
    "personNotProp": {
      "requirementSource": "theme/identity/03; operational bound from gameplay/social/02",
      "maxSeparationStuds": 128,
      "realisedSeparationStuds": 122,
      "channels": [
        { "channel": "engineLocomotion", "available": true, "carriedBy": "the default Animate script, left running; not authored and not removed" },
        { "channel": "playerChosenBody", "available": true, "carriedBy": "avatarSource — distinct bodies, not a uniformed row" },
        { "channel": "nameplate", "available": false, "reason": "100 < 122" },
        { "channel": "healthBar", "available": false, "reason": "ruled off" },
        { "channel": "authoredIdleOrEmote", "available": false, "reason": "zeros.authoredAnimation" },
        { "channel": "uniformBadgeTitleAura", "available": false, "reason": "zeros.appearanceOverride and zeros.cosmetic" }
      ],
      "playtestUnknown": true,
      "testRange": "n=1 single-player playtest exists; every person-read claim is a prediction until two clients are observed at 122 studs. Separation test range 38.7 to 128 studs. If it fails, the first lever is NOT art — it is spawn orientation and longitudinal separation in gameplay/meta/06."
    }
  }
}
```

## Consequences for other work

- **Held-tool and spawn-path work (`tool`):** the `RigType` read-back `P2` specifies **does not
  exist in shipped code** (`grep -rn "RigType" game/src` = 0). One read, before
  `FindFirstChild("RightHand")`, warning by that row's name. It meets stopping-rule bar 1: under
  `R15 & R6` a player holds nothing and no log says why.
- **Publish-checklist work and whoever owns `runtime.placeConfiguration`:** you gain one row,
  `StarterPlayer.HealthDisplayDistance = 0`. It is not mine to add and no module may write it.
- **Object and model work (`objectArt`):** the two-`Part` tool is welded to a body and is not one.
  Its unset `Colour`, `Material` and `Transparency` (gap G7) stay yours. This key forbids any
  product or upgrade changing anything else parented to a character.
- **Proximity-clearing work (`movement`):** unchanged and now evidenced. Bodies differ by roughly
  1.5 studs of height by platform default; `baseClearRadius` must stay scalar. I set no value.
- **Store-art work (Discovery & Marketing, wave 7):** **there is no cast to put on a thumbnail.**
  No mascot, no NPC, no companion, no named figure. The only face available is a player avatar,
  which you do not control and may not dress.
- **VFX work (`effects`):** nothing may attach to a character as a persistent instance — no aura,
  no trail, no equipped emitter. `patchClear` and `findReveal` fire at the patch.
- **Environment work (`environment`):** the person-read at 122 studs depends on the unobstructed
  sightline you already owe `gameplay/social/02`. If the boundary becomes opaque, subject 5 is the
  only thing left in this key that still functions.
- **Monetization and the developer:** `cosmetic: 0` is the least durable value here and it inverts
  by a developer ruling, not by an art argument.

## Acceptance criteria

1. All four zero-greps return exactly 0 on the shipped tree, and `game/default.project.json`'s
   `StarterPlayer` node contains no `$properties` key:
   `grep -rnE "HumanoidDescription|ApplyDescription|LoadCharacterWithHumanoidDescription|StarterCharacter|BodyColors|\bShirt\b|\bPants\b" game/src` = 0;
   `theme/identity/04` criterion 2's 16-word manifest scan = 0 (`characterArt` passes it too);
   `grep -rnE "Animation|Animator|LoadAnimation|AnimationTrack" game/src` = 0;
   `grep -rn "rbxassetid" game/src` = 0.
2. The complete set of properties any module writes on an instance parented to a character is
   exactly `{Humanoid.WalkSpeed, BasePart.CollisionGroup, BasePart.Size on the tool head}`, plus one
   `Model:PivotTo` call and one `Model.Parent` assignment. The count of writes to a character
   appearance property — `BodyColors`, `Shirt`, `Pants`, `HumanoidDescription`, a granted
   `Accessory`, or `Color` / `Material` / `Transparency` on a character limb — is **0**.
3. `characterArt.rig.required` is `"R15"` and its `valueOwner` names `release.publishChecklist.P2`
   rather than carrying a second value; `release.publishChecklist` contains one row whose surface is
   `StarterPlayer.HealthDisplayDistance` with value `0`; and
   `grep -rn "HealthDisplayDistance" game/src` returns **0**.
4. With a client connected, a moving character returns **≥ 1** track from
   `Humanoid:GetPlayingAnimationTracks()` while `grep -rn "LoadAnimation" game/src` returns **0** —
   the person-read is the engine's and this game authored none of it. `[playtest unknown]` on
   whether that read survives at 122 studs on a phone; separation test range 38.7 to 128 studs, and
   the lever if it fails is spawn orientation in `gameplay/meta/06`, not art.

## Pushing back

**`theme/identity/03` criterion 2 cannot be satisfied by the route it names. I keep the ruling and
decline the route.** Verbatim: *"Every player character has `HealthDisplayDistance = 0` set
explicitly."* `grep -rn "HealthDisplayDistance" game/src` returns **0** — unimplemented — and
`response.humanoidWritesAllowed` (`mechanics/05:111`, approved in wave 2, after identity/03) is
exactly `["WalkSpeed"]`, so a module setting `Humanoid.HealthDisplayDistance` violates an approved
key. **No health bar is right** in a game with no damage source and I am not reopening it. The
available route is `StarterPlayer`, which carries `HealthDisplayDistance` and `NameDisplayDistance`
as `number` properties defaulting to 100
`[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]`, and whose own documentation
sample sets both to 0 to hide health and names. That is place configuration, not a `Humanoid` write,
and the precedent is `RR-P2`'s `placeConfiguration` entry with a boot assertion. **This is
structurally gap G1 again** — a value with no legal writer because it lives in the one file
`architect/04-tree` forbids the build from editing. Same owner, same fix, same time.

**Honest weakening, stated rather than buried:** the platform shows a health bar only when a
character is damaged and this game has no damage source, so the bar probably never appears and the
criterion may be unfalsifiable as well as unsatisfiable. `[unverified — the `Humanoid` reference page
in the pack lists `HealthDisplayType` and its enum and states no default; settled by fetching
create.roblox.com/docs/reference/engine/classes/Humanoid#HealthDisplayType.]` It still meets
stopping-rule bar 2: two builders diverge, one writing the forbidden property and one doing nothing.

## Flagged to the developer

**The avatar question had zero interview coverage** and `theme/identity/02` decided it; this key
inherits that at `[cid: decided]` and does not promote it to a brief line. Both alternatives remain
live: **(a)** the player's own avatar — taken, free, keeps the only cosmetic surface alive; **(b)** a
global override to a provided character, which buys a wordless role channel and costs an unfunded
art slot plus that surface.

**I applied no avatar height bound where the platform offers one.** `[cid: decided]` The alternative
is a narrow `Custom Scale` band for a uniform silhouette, which is an appearance decision subject 1
forbids and which needs `theme/identity/02` reopened first.

## Not decided here

The clear radius and anything derived from a body's size — `movement`. Whether nameplates display at
all and at what distance — `theme/identity/03`, inherited unchanged; the distance's execution is
area-arrangement work. The rig value and its checklist row — `release.publishChecklist.P2`,
`tech/deploy`. Where `StarterPlayer.HealthDisplayDistance` is set and by whom — publish-checklist
work plus whoever owns `runtime.placeConfiguration`; gap G1's owner. The tool's colour, material and
proportions — `objectArt`, gap G7. What a clear or a reveal is made of — `effects`. Whether a
cosmetic SKU ever exists — Monetization plus the developer; `cosmetic: 0` inverts with it. Spawn
position and orientation, and the longitudinal separation that decides whether a neighbour is
legible in motion — `gameplay/meta/06` and `gameplay/social/02`.
