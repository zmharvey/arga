# 01 — Server and co-presence

**Domain:** gameplay/social · **Category:** Gameplay · **Wave:** 2

## Decision

One shared server of **12 to 20 players**, each holding their own progress, their own world
state and their own fenced plot. **Characters do not collide with each other, text and voice
chat are off, and the game reads nothing about anyone's friends.** That whole configuration is
the proposed `social` key, supplied by this sheet and by no other.

## Why

The brief buys its entire social payload with one sentence — "shared server, parallel
progression, own areas, no mechanical interaction" `[brief: soft]` (`02-GAMEPLAY.md`, R6 Q2) —
and then rules on none of the four services that sentence actually depends on. Roblox rules on
all four by default, and three of the four defaults are wrong for this game. So each row below
is a decision, not a restatement.

| field | ruling | why | tag |
|---|---|---|---|
| `progressScope` | per-player. Currency, upgrade levels, `found`, `cleared`, `clearedCount` and `areaComplete` are one player's and are never summed, ranked or compared across players | "parallel progression" `[brief: soft]`; and `03` forbids the aggregate that would make it otherwise | `[brief: soft]` |
| `worldStateScope` | per-player. Every patch Instance in a plot is built from that plot owner's saved state alone, and no other player's action creates, destroys or moves one | "cleared is permanent" `[brief: binding]` (`01-FOUNDATION.md`, R2 Q1) makes world state save data, and the brief names shared persistent world state as the hard problem this model exists to avoid | `[brief: binding]` |
| `plotAccess` | owner-only. A character cannot walk onto a plot that is not theirs; the collidable boundary on every plot enforces it | the first thing a visitor tries is clearing a patch on someone else's ground, which either does nothing (a dead verb that reads as a bug) or writes another player's world state, which permanence forbids. The barriers already exist as a playtest fix (`[research: game/src/server/Plots.luau]`); this ratifies them as a social ruling so they cannot be removed as scenery | `[cid: decided]` |
| `characterCollision` | off between characters, on against everything else. A group named **`Characters`**, non-collidable with itself, collidable with `Default` | every character is in `Default` and all groups collide by default `[research: https://create.roblox.com/docs/workspace/collisions]`. With movement-only input `[brief: soft]` and no failure state `[brief: soft]`, standing in someone's way is the only verb one player has against another, and "no mechanical interaction" forbids it. Decided independently of plot fencing so that no later change to area arrangement can re-enable body-blocking by deleting a barrier | `[cid: decided]` |
| `chat` | off. Chat window off, bubble chat off, voice off, and zero player-authored strings reach another client | `ChatWindowConfiguration.Enabled` defaults to **`true`** `[research: https://robloxapi.github.io/ref/class/ChatWindowConfiguration.html]`, so silence ships text chat to an 8–14 audience `[brief: binding]` (`00-CORE.md`, R1 Q4). Nothing in the game needs a channel: there is no coordination, no trading, no group objective. A chat surface is also a moderation and filtering obligation, which "social proof at zero systems cost" does not buy | `[cid: decided]` |
| `friendSurfacing` | none. The game calls no friend API, shows no friend-joined notice and builds no invite or follow affordance | the default is that a game reads nothing about friends, and reading the social graph is a system. Confirming the default rather than contesting it | `[cid: decided]` |
| `plotTenure` | claimed on join at the lowest free slot index, held for the whole connected session, released immediately on leave, and **any** free slot on rejoin — never a reserved one | a slot index carries no player-visible meaning, because the plot's contents are rebuilt from the returning player's own save. Reserving a slot holds capacity for someone who is not there, which caps the server below its band for nothing. Lowest-free-index claiming is also what keeps occupied slots contiguous, which `02`'s separation requirement depends on | `[cid: decided]` |
| `maxCoPresenceSeparationStuds` | **128 studs** `[playtest unknown]`, test range 85 to 185, carried with the viewport it was measured at | `02` derives it and owns the reasoning; this key carries the number, because a bound that lives only in prose is one a neighbouring sheet joins against by re-typing it — which already happened once, at a value this sheet had since superseded | `[cid: decided]` |
| `maxPlayers` | a band of **12 to 20**, not a figure | the brief's 12–20 is `[I assumed — no source]` and `OPEN.md §5 #4` routes it to Social and Tech & Data; `_category.md` gives me the requirement and Balance & Tuning plus Tech & Data the figure. I have no source either, so I confirm the band and state what breaks at each edge instead of inventing a number inside it | `[brief: soft]` |

**The collision group name is this key's, and it is `Characters`.** One group for player
characters, non-colliding with itself and colliding with `Default`, is the only collision-group
requirement in the game. Traversal-affordance work states the same ruling in prose and carries
no group name; patch non-collision is `art/objects/01`'s and is not restated here. `[cid:
decided]` Two keys naming one group is how a builder ends up creating two.

**The separation bound travels with its viewport, and that is not decoration.** S is a pixel
result, so 128 studs means nothing without the 1280×720 viewport, the 70° field of view and the
20-pixel floor it was measured at — `measuredAt` carries all four, so a reader who needs the
bound at another resolution recomputes it instead of guessing. `realisedStuds` and
`satisfiedByShippedBuild` sit in the block for the same reason: the shipped geometry fails this
bound today, and a failing state is worth being machine-readable rather than a sentence in a
neighbouring sheet.

**Below 12**, median concurrent occupancy falls low enough that a player can spend a whole
10–20 minute session `[brief: binding]` alone, and "social proof at zero systems cost" is not
delivered — the game becomes single-player with a server bill. **Above 20**, per-plot instance
count multiplies past what the brief already names as the mobile watch item (`OPEN.md §2`): a
depth-1 plot is one slab, a boundary and up to 140 patches `[research:
game/src/server/Plots.luau]`, so 20 plots is roughly 2,900 parts before any deeper area's
density is applied, against a ~70% mobile audience `[brief: binding]`.

**`Players.MaxPlayers` is read-only and cannot be set from a script** `[research:
https://create.roblox.com/docs/reference/engine/classes/Players#MaxPlayers]`. Whatever figure
lands inside the band reaches a build only through place configuration.

**One thing stayed unverified.** Whether `TextChatService` carries an experience-level toggle
distinct from `ChatWindowConfiguration.Enabled`, and how Roblox's age-based communication
settings apply to an 8–14 audience, could not be established in four fetches. `[unverified]`
`[research owed: Roblox's chat-settings policy page or the parental-controls documentation,
plus the TextChatService reference rendered with its default column]` **The ruling does not
depend on it**: chat is off by decision, so it is off whatever the platform would otherwise do,
and no claim about age-gating is made here.

```manifest
{
  "provides": "social",
  "value": {
    "model": "shared-server-parallel-progression",
    "maxPlayers": {
      "min": 12,
      "max": 20,
      "scriptSettable": false,
      "setVia": "place configuration",
      "belowMinBreaks": "a player can spend a whole session alone and receives no social proof",
      "aboveMaxBreaks": "per-plot instance count and plot-row length exceed the mobile budget"
    },
    "maxCoPresenceSeparationStuds": {
      "value": 128,
      "unit": "studs",
      "status": "playtest unknown",
      "testRangeStuds": [85, 185],
      "derivedIn": "cid/gameplay/social/02-presence-sufficiency.md",
      "requirement": "whenever two or more players are connected, from any occupied plot's spawn point the spawn point of at least one other occupied plot lies within this distance, with an unobstructed sightline",
      "measuredAt": {
        "viewportWidthPx": 1280,
        "viewportHeightPx": 720,
        "fieldOfViewDegrees": 70,
        "fieldOfViewAxis": "vertical",
        "subjectHeightStuds": 5,
        "legibilityFloorPx": 20,
        "legibilityFloorViewportFraction": 0.0278,
        "formula": "px = viewportHeightPx * (subjectHeightStuds / distanceStuds) / (2 * tan(fieldOfViewDegrees / 2))"
      },
      "realisedStuds": 160,
      "satisfiedByShippedBuild": false
    },
    "progressScope": "per-player",
    "worldStateScope": "per-player",
    "sharedState": [],
    "plotAccess": {
      "ownerOnly": true,
      "othersMayEnter": false,
      "enforcedBy": "the collidable boundary built on every plot"
    },
    "plotTenure": {
      "claimedOn": "PlayerAdded",
      "slotRule": "lowest-free-index",
      "heldFor": "the whole connected session",
      "releasedOn": "PlayerRemoving",
      "rejoinSlot": "any-free",
      "slotReservedOnLeave": false,
      "onLeaveMidArea": "the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player"
    },
    "characterCollision": {
      "playerVsPlayer": false,
      "groupName": "Characters",
      "groupNameOwnedBy": "social.characterCollision, and by no other key",
      "appliedTo": "every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter",
      "collidable": [
        { "a": "Characters", "b": "Characters", "collides": false },
        { "a": "Characters", "b": "Default", "collides": true }
      ]
    },
    "chat": {
      "text": false,
      "chatWindowEnabled": false,
      "bubbleChatEnabled": false,
      "voice": false,
      "playerAuthoredStringsToOtherClients": 0,
      "overridesPlatformDefault": "ChatWindowConfiguration.Enabled defaults to true"
    },
    "friendSurfacing": {
      "readsSocialGraph": false,
      "friendJoinedNotice": false,
      "forbiddenApis": [
        "Player:IsFriendsWith",
        "Players:GetFriendsAsync",
        "SocialService:CanSendGameInviteAsync",
        "SocialService:PromptGameInvite"
      ]
    },
    "mechanicalInteraction": "none",
    "forbidden": [
      { "id": "X1", "forbids": "a leaderstats Folder under any Player, or any Value inside one" },
      { "id": "X2", "forbids": "Team instances, and any write to Player.Team or Player.TeamColor" },
      { "id": "X3", "forbids": "any server-held value that more than one player's action increments" },
      { "id": "X4", "forbids": "any path by which one player's action changes another player's currency" },
      { "id": "X5", "forbids": "any path by which one player's action adds an entry to another player's found set" },
      { "id": "X6", "forbids": "a BillboardGui, SurfaceGui, overhead label, plot sign or DisplayName mutation carrying another player's currency, upgrade level, cleared count or collection count" },
      { "id": "X7", "forbids": "any replicated payload containing a player identifier other than the recipient's" },
      { "id": "X8", "forbids": "OrderedDataStore, and any global, weekly or all-time ranking" },
      { "id": "X9", "forbids": "any remote handler accepting a string that is later rendered to a different client" },
      { "id": "X10", "forbids": "any cue, visual or audible, caused by one player's input and perceptible to another beyond their character in motion and their own patches clearing, instance and cue" },
      { "id": "X11", "forbids": "join or leave notices, toasts, sounds or strings naming another player" },
      { "id": "X12", "forbids": "ProximityPrompt or ClickDetector parented into a character model" },
      { "id": "X13", "forbids": "writes to another character's Humanoid.Health or TakeDamage, and any force or velocity applied to a character that is not the actor's" },
      { "id": "X14", "forbids": "Camera.CameraSubject set to a Humanoid that is not the local player's" }
    ]
  }
}
```

## Consequences for other work

**Any sheet reasoning about co-presence distance.** Read
`social.maxCoPresenceSeparationStuds` from the merged manifest. Do not copy the figure into
another key and do not quote it from a sheet: it carries a `measuredAt` block, and the number
is wrong without it. This field exists because a neighbouring sheet joined against the prose
form and inherited a superseded value.

**Traversal-affordance work.** `social.characterCollision` is the sole carrier of the group
name and the collidability matrix. A `traversal` key may keep `playerVsWorld` and may state the
no-body-blocking ruling in prose, but must not carry `collisionGroup`, `playerVsPlayer`,
`pushable` or `standOnOtherPlayers` as data — criterion 2 below greps for exactly one group
name, and two keys naming it is the divergence this closes.

**Place configuration and server boot ordering.** Even promoted into `bridge/schema.mjs`,
`social` has no emitter path. `Players.MaxPlayers` is read-only, chat is configured on
`TextChatService` children, and collision groups are registered at boot — none of which
`bridge/emit-config.mjs` produces and none of which `game/default.project.json` carries
(`[research: game/default.project.json]`). Promoting this key requires either a
place-configuration emitter or a named boot module. **I state the requirement; the emitter is
not mine to design.**

**Area arrangement and plot layout.** Occupied slots must stay contiguous, because the
separation requirement assumes lowest-free-index claiming. Random or reserved slot assignment
breaks it. Plot fencing must remain owner-only, but must not be the *only* thing preventing
body-blocking — the collision group is.

**Persistence work.** `cleared` is an index set against a layout. A rejoining player lands on a
different slot and must find the same cleared patches, so a partial area's layout must be
stable across a rejoin. I state the requirement and set no format.

**Feedback, notice and HUD work.** There is no chat surface to route anything through, and no
notification channel naming another player exists to reuse.

**Balance & Tuning and Tech & Data.** The figure inside 12–20 is yours. Landing outside the
band with a stated performance reason is the mechanism working, not a violation.

## Flagged to the developer

The brief rules on none of these four. Alternatives were live; these are my calls.

| item | live alternatives | recommendation |
|---|---|---|
| text chat | on (platform default), on with filtering only, off | **off** — an 8–14 audience plus a game with nothing to coordinate |
| character collision | on (platform default), off | **off** — it is the only griefing verb the input scheme permits |
| friend surfacing | none, a friend-joined notice, an in-experience invite prompt | **none** — each of the others is a system, and the brief bought social at zero systems cost |
| plot access | owner-only, walk-in permitted | **owner-only** — walk-in has no verb that is not forbidden |

## Acceptance criteria

1. In a running server, no chat window and no text entry field appear on screen at any point,
   and `TextChatService.ChatWindowConfiguration.Enabled` reads `false`.
2. `PhysicsService:CollisionGroupsAreCollidable("Characters", "Characters")` returns `false`,
   `("Characters", "Default")` returns `true`, every `BasePart` under every character model has
   `CollisionGroup == "Characters"`, and `"Characters"` is the only character collision-group
   name appearing anywhere in the merged manifest.
3. The place's configured player cap is an integer in `[12, 20]`, and no file under `game/src`
   contains a write to `Players.MaxPlayers`.
4. A player who disconnects mid-area and rejoins has the same `clearedCount` and `areaComplete`
   as at disconnect, and receives the lowest free slot index, which need not be the one held.
5. `social.maxCoPresenceSeparationStuds.value` lies inside its own `testRangeStuds`, and that
   figure appears in exactly one key of the merged manifest.

## Not decided here

What a player must be able to *perceive* of another, and the derivation of the separation bound
this key carries — `02`, this domain. What may never be built between two players — `03`, this
domain, which decides the contents of `social.forbidden` that this block carries. The nameplate
ruling and what a co-present stranger *is* — `theme/identity/03-co-present-stranger`, inherited
and not reopened. The figure inside the `maxPlayers` band — Balance & Tuning and Tech & Data.
The plot slot pitch, area arrangement, boundary height and appearance, and the spawn position
and orientation that satisfy the bound — area-arrangement, plot-layout and traversal-affordance
work. The save format for a partial area — persistence work. Codes, daily rewards, seasons and
events — live-ops work; they are priority-3 excluded and not between players, so they are not
`03`'s.
