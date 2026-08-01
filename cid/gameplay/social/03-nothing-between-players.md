# 03 — Nothing between players

**Domain:** gameplay/social · **Category:** Gameplay · **Wave:** 2

## Decision

**Fourteen named things a builder may not write between two players, `X1` to `X14`, each with
the observable that catches it.** Together with `02`'s three-item perceptible set they close
the pair: `02` states the floor of what one player must perceive of another, and this states
the ceiling — nothing else may pass between them at all.

## Why

"No mechanical interaction" `[brief: soft]` (`02-GAMEPLAY.md`, R6 Q2) and priority 3's
"leaderboards · trading" `[brief: soft]` (`03-META.md`) are prohibitions nobody can check, and
a prohibition nobody can check is one an idiom walks straight through. `leaderstats` is the
case: it is the standard Roblox way to show a currency, and the moment it exists the platform
renders a sorted, visible ranking of every player in the server. The shipped build happens not
to have one `[research: game/src/server/Plots.luau]` and nothing prevents the next builder
adding it. `_category.md` rules that assumption-backed priority-3 exclusions are treated as
excluded anyway and that reinstating one is an escalation, not a domain decision.

Each row names the object, the reason (the verb it would need, or the priority-3 line it is),
and what a reviewer looks at. **The reason column is not decoration: a builder who needs a
currency readout needs to know that the objection is the ranking, not the readout.**

| id | forbidden | reason | observable |
|---|---|---|---|
| X1 | a `leaderstats` `Folder` under any `Player`, and any `IntValue`, `NumberValue` or `StringValue` inside one | priority 3, "leaderboards" — the platform renders it as a sorted, visible ranking of every player in the server | zero occurrences of `leaderstats` under `game/src`; with two players connected the player-list overlay shows names and zero numeric columns |
| X2 | `Team` instances, and any write to `Player.Team` or `Player.TeamColor` | grouping players needs the verb "belong with", which no player has; the default player list also groups and orders by team | `Teams` has zero children at runtime; zero writes to `Team` or `TeamColor` under `game/src` |
| X3 | any server-held value that more than one player's action increments — a server total cleared, a server-wide find count, a shared area goal | a group objective needs the verb "contribute"; parallel progression forbids one player's outcome depending on another's | every mutable server table is keyed by `UserId` or is one `PlayerState`; no numeric field is written from two different players' handlers |
| X4 | any path by which one player's action changes another player's `currency` | priority 3, "trading" | `currency` is written only against the acting player's own state; zero remote handlers resolve a second `Player` |
| X5 | any path by which one player's action adds an entry to another player's `found` set | priority 3, "trading"; a receivable Find makes 24 of 24 something other than played | `found` is written only in the reveal path for a patch on the acting player's own plot |
| X6 | a `BillboardGui`, `SurfaceGui`, overhead label, plot sign or `Humanoid.DisplayName` mutation carrying another player's currency, upgrade level, cleared count or collection count | it is a ranking with a different parent (priority 3, "leaderboards"), and it needs the verb "read another player's state" | zero `BillboardGui` or `SurfaceGui` parented into a character model or a plot slab |
| X7 | any replicated payload containing a player identifier other than the recipient's | the wire is the only route by which X3 and X6 could be rebuilt on the client; closing it makes them unbuildable rather than merely unbuilt | the client-bound state payload contains exactly one player's fields and no second `UserId` |
| X8 | `DataStoreService:GetOrderedDataStore`, and any global, weekly, all-time or hall-of-fame ranking | priority 3, "leaderboards" | zero calls to `GetOrderedDataStore` under `game/src` |
| X9 | any remote handler accepting a string that is later rendered on a different client — a plot sign, a name-your-ruin field, a worded emote | a player-authored string reaching another player is a filtering and moderation obligation; `social.chat` is off and must not be rebuilt through a side channel | zero remote handlers take a string parameter whose value reaches a second client's screen |
| X10 | any cue caused by one player's input and perceptible to another, beyond the two `02` requires | the perceptible set is closed by `02`; anything added to it is an interaction verb | what a second client renders because of player A's input is exactly: A's character in motion, and A's own patch instances disappearing |
| X11 | join or leave notices, toasts, sounds or on-screen strings naming another player | it needs the verb "be told about another player"; the payload is presence, not notification | zero strings rendered on any client contain another player's `Name` or `DisplayName` |
| X12 | `ProximityPrompt` or `ClickDetector` parented into a character model | both are interaction verbs by definition, and input is movement only | zero `ProximityPrompt` or `ClickDetector` instances under any character model |
| X13 | writes to another character's `Humanoid.Health`, calls to `Humanoid:TakeDamage` on a character that is not the actor's, and any force, `BodyMover` or `AssemblyLinearVelocity` applied to another character | there is no failure state, so health is not a game surface and pushing is not a move | zero writes to `Humanoid.Health`, `TakeDamage` or `AssemblyLinearVelocity` targeting a non-local character |
| X14 | `Camera.CameraSubject` or `CameraType` set to follow a `Humanoid` that is not the local player's | spectating needs the verb "select another player", and it re-imports X6 through the camera | `CameraSubject` is written only with the local player's `Humanoid`, or never |

`X1` through `X8` are state and readouts; `X9` through `X14` are cues, inputs and views. The
split matters only in that the second half is the half a builder adds without thinking of it as
a feature.

**Player-versus-player collision and the chat surface are not on this list.** They are fields
of the `social` key rather than prohibitions, and `01` rules them. Listing them twice would put
one decision in two sheets.

## No manifest block

This sheet carries no manifest block: it constrains the `social` key rather than supplying it.
It decides the contents of `social.forbidden`, which `01-server-and-co-presence.md` carries as
fourteen `id`/`forbids` pairs so that this list reaches a build rather than sitting in prose.

## Consequences for other work

**HUD and readout work.** A currency readout must be built as a client-side surface fed by the
player's own state payload. The `leaderstats` idiom is unavailable, and so is any layout that
places one player's number next to another's.

**State-shape and networking work.** X7 is a shape constraint on the wire, not a policy: the
snapshot type must not have a field capable of holding a second player's identifier.

**Persistence work.** X8 removes ordered data stores from the available storage kinds.

**Character and animation work.** X10 bounds what any character-attached effect may be: it may
be locomotion, and it may be the disappearance of that player's own patches. Anything a second
client can see or hear because of the first player's input beyond those two fails.

**Verification work.** Every row above is a grep or a runtime inspection, deliberately, because
a prohibition list with no manifest block reaches a build only if someone checks it.

## Acceptance criteria

1. A search over `game/src` for `leaderstats`, `GetOrderedDataStore`, `TeamColor`,
   `ProximityPrompt`, `ClickDetector`, `TakeDamage` and `IsFriendsWith` returns zero matches,
   and `Teams` has zero children at runtime.
2. Every payload the server sends to a client contains exactly one player's fields, and no
   `UserId`, `Name` or `DisplayName` other than the recipient's.
3. With two players connected, zero `BillboardGui` or `SurfaceGui` instances exist under any
   character model or plot slab, and no string rendered on either client contains the other
   player's name.
4. Every mutable server-held table is keyed by `UserId` or is a single `PlayerState`, and no
   numeric field in server state is incremented from more than one player's handler.

## Not decided here

Chat, voice, character collision, plot access, plot tenure, friend surfacing and the
`maxPlayers` band — `01`, this domain, which holds the key. What must be perceptible between
two players and at what separation — `02`, this domain. The nameplate and what a co-present
stranger is — `theme/identity/03-co-present-stranger`, inherited. How a currency readout is
laid out once `leaderstats` is unavailable — HUD and readout work. Codes, daily rewards,
seasons and events — live-ops work; they are priority-3 excluded but are not things that pass
between two players, so they are not this sheet's to enumerate. Whether the world contains a
shared space at all — area-arrangement work.
