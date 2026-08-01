# 02 — Presence sufficiency

**Domain:** gameplay/social · **Category:** Gameplay · **Wave:** 2

## Decision

**Yes. Presence alone suffices, and no warmth-adding touch is added.** In exchange, "visible to
each other" stops being an assertion: another player must be perceptible as **a body, in
motion, whose ground is visibly being cleared**, from spawn, without input, at a separation of
at most **S = 190 studs** `[playtest unknown]`.

## Why

The brief hands this domain exactly one question by name — "whether presence alone suffices,
and the cheapest warmth-adding touch if not" `[brief: soft]` (`02-GAMEPLAY.md`, `OPEN.md §4`).
Every candidate touch fails the bar the assignment sets, so the answer is yes on the merits and
not by default.

| candidate touch | why it fails |
|---|---|
| an emote, wave or greeting | an input beyond movement; "Input: movement only" `[brief: soft]` (step 6 Q3) |
| a join or leave notice | a string naming another player; also `03` X11 |
| a server-wide find ticker ("a Stylus was found") | shared state (`03` X3) and it leaks another player's progress (`03` X6) |
| a friend-joined highlight | reads the social graph; a system, and `01` rules `friendSurfacing` none |
| a shared restored ruin to visit | priority 2 verbatim (`03-META.md`), so not this project's |
| a shared lobby or hub | an area-arrangement change, and it puts non-overgrowth between spawn and the first patch, against the ten-second reveal promise `[brief: soft]` (R6 Q3) |
| a nameplate change | not mine; `theme/identity/03-co-present-stranger` holds it |

Nothing clears "zero systems, no mechanical interaction, no ranking, no tension, not priority 2
or 3." So the whole social payload rests on the sentence "everyone occupies one world clearing
their own patch, visible to each other. Social proof at zero systems cost" `[brief: soft]`
(R6 Q2) — and that sentence never states what is visible. **This sheet states it as a test,
because an unmeasured promise is one nobody can fail.**

**The three things that must be perceptible**, and nothing about a nameplate is among them:

| id | what must be perceptible | why this one |
|---|---|---|
| B1 | the other player's **character body**, rendered and resolvable as a person rather than a marker | a body is what makes co-presence a person and not a dot; the shared, symmetric role is inherited from `theme/identity/03-co-present-stranger` |
| B2 | that body **in motion**, changing position continuously | a stationary character reads as scenery. Motion is the only thing that distinguishes a player from a prop, given `01` forbids every other signal |
| B3 | that their **ground is being cleared** — the green extent of their plot visibly shrinking over seconds | "clearing their own patch" is the *content* of the social proof. Seeing a person is co-presence; seeing a person working is the proof `[brief: soft]` |

**Where S comes from.** B1 binds tightest, because a body is smaller than a swathe of cleared
ground. A default Roblox character is about 5 studs tall; at Roblox's default vertical field of
view of 70°, a 5-stud object at distance `d` occupies `1080 · (5/d) / (2·tan 35°)` vertical
pixels on a 1080-tall viewport. Setting the legibility floor at **20 pixels** gives `d ≈ 190`
studs. `[cid: decided]` The 20-pixel floor is the arguable part, not the arithmetic, so **S is
`[playtest unknown]` with a starting value of 190 studs and a test range of 120 to 300** (about
32 down to 13 pixels). `[research owed: a measured legibility threshold for a moving humanoid
silhouette on a phone-sized viewport at Roblox's default FOV]`

**S is a requirement, not a geometry.** The plot pitch that satisfies it belongs to
area-arrangement and plot-layout work. The requirement is: whenever two or more players are
connected, from any occupied plot's spawn point, at least one other occupied plot's spawn point
lies within S studs of it, with an unobstructed sightline. This is satisfiable only because
`01` claims slots at the lowest free index, so occupied slots stay contiguous.

**Against the shipped geometry it currently passes on distance and fails on facing.** The
shipped slot pitch is `area.size` + `PLOT_GUTTER` = 120 + 40 = **160 studs** `[research:
game/src/server/Plots.luau]`, giving about 24 pixels — inside S with margin. But the spawn
`Attachment` carries no rotation and the plot row runs along +X, so a character spawns facing
−Z with its nearest neighbour **90° off axis**, outside the roughly ±51° horizontal frustum a
70° vertical FOV gives on a 16:9 viewport. `[cid: decided]` **A player therefore spawns, sees
nobody, and receives no social proof until they happen to turn.** Criterion 1 below requires
that fixed; today's build does not satisfy it.

## No manifest block

This sheet carries no manifest block: it constrains the `social` key rather than supplying it.
`01-server-and-co-presence.md` holds the key. If a build needs S as data, the field it would
occupy is `social.maxCoPresenceSeparationStuds`.

## Consequences for other work

**Area arrangement and plot layout.** Two requirements, neither of them a value. (a) The
realised distance from any occupied spawn point to the nearest other occupied spawn point must
be ≤ S. (b) A character's spawn orientation must face along the plot row, so that at least one
occupied neighbour is inside the default camera frustum at spawn with no input. Requirement (b)
is unsatisfied by the shipped build and is the more urgent of the two.

**Identity work.** My test deliberately does not use the nameplate, so nothing here reopens
`theme/identity/03-co-present-stranger`. But `StarterPlayer.NameDisplayDistance` defaults to
**100** studs `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]` against a
realised spawn separation of 160, so **a co-present stranger is currently nameless at rest.**
If that ruling requires a readable nameplate, either the display distance must exceed the
realised pitch or the pitch must fall below it — **that is identity's call and area
arrangement's execution, not mine.**

**Environment and lighting work.** The sightline between two spawn points must be unobstructed:
no opaque wall, hedge, terrain rise or fog density may sit between neighbouring plots inside S.

**Feedback and notice work.** Nothing is added on this sheet's authority. There is no
"a player joined" surface, no shared ticker and no greeting to design.

## Acceptance criteria

1. With two players connected on adjacent slots, a screenshot from player A's spawn point at
   spawn orientation, no input, 1920×1080 viewport, default FOV, contains player B's character
   occupying **≥ 20 vertical pixels**.
2. Over 10 seconds of player B clearing, from that same viewpoint: B's character position
   changes by ≥ 11 studs, and at least 3 patch instances present in frame at t=0 are absent
   at t=10 s.
3. The straight line between the two spawn points intersects zero instances with
   `Transparency < 1`.
4. With exactly one player connected, the game presents zero on-screen indication that other
   players exist — no count, no notice, no empty slot marker, no greeting.

## Not decided here

The plot slot pitch, spawn orientation and area arrangement that satisfy S — area-arrangement
and plot-layout work. The nameplate, its distance, and what a co-present stranger *is* —
`theme/identity/03-co-present-stranger`, inherited. Chat, collision, plot tenure, friend
surfacing and the `maxPlayers` band — `01`, this domain. What may never be built between two
players — `03`, this domain. What clearing looks and sounds like at any distance — VFX, SFX and
mood-and-beat work. Whether enough players are concurrently online for two to be connected at
all — outside everyone's control and stated as the condition on every criterion above.
