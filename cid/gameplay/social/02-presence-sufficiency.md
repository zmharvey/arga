# 02 — Presence sufficiency

**Domain:** gameplay/social · **Category:** Gameplay · **Wave:** 2

## Decision

**Yes. Presence alone suffices, and no warmth-adding touch is added.** In exchange, "visible to
each other" stops being an assertion: another player must be perceptible as **a body, in
motion, whose ground is visibly being cleared**, from spawn, without input, at a separation of
at most **S = 128 studs** `[playtest unknown]`, measured on a phone-class viewport.

## Why

The brief hands this domain exactly one question by name — "whether presence alone suffices,
and the cheapest warmth-adding touch if not" `[brief: soft]` (`02-GAMEPLAY.md`, `OPEN.md §4`).
Every candidate touch fails the bar the assignment sets, so the answer is yes on the merits and
not by default.

| candidate touch | why it fails |
|---|---|
| an emote, wave or greeting | an input beyond movement; "Input: movement only" `[brief: soft]` (step 6 Q3) |
| a bump, push or shoulder-barge | player-to-player collision is off in `social.characterCollision`, so no physical touch exists to build on |
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

**Where S comes from, and it is measured on a phone.** B1 binds tightest, because a body is
smaller than a swathe of cleared ground, and silhouette legibility is limited by *pixels* rather
than by angle — so the viewport the derivation runs at is the whole answer. The audience is
"8–14, **mobile-heavy**", ~70% mobile `[brief: binding]` (`00-CORE.md`, R1 Q4), so the
derivation runs at **1280×720**, the low-end landscape phone viewport and the smallest the
brief's device band implies. `[cid: decided]` A default Roblox character is about 5 studs tall;
at a default vertical field of view of 70° it occupies `H · (5/d) / (2·tan 35°)` vertical pixels
on a viewport `H` pixels tall. Setting the legibility floor at **20 vertical pixels on a
720-tall viewport — 2.78% of viewport height, which is viewport-independent — gives S ≈ 128
studs.** `[playtest unknown]` with a test range of **85 to 185 studs**, being a floor of 30 down
to 14 pixels. `[research owed: a measured legibility threshold for a moving humanoid silhouette
at phone size; the render-resolution distribution of Roblox mobile clients; and whether
Camera.FieldOfView's default of 70 is vertical]`

**This changes the answer, and the shipped geometry now fails.** The previous derivation ran at
1080 tall and gave S = 190, which the shipped 160-stud slot pitch (`area.size` + `PLOT_GUTTER`
= 120 + 40, `[research: game/src/server/Plots.luau]`) cleared with margin. At 720 the same body
at 160 studs is **16 pixels**, under the 20-pixel floor, so **the shipped pitch misses S by 32
studs and "social proof at zero systems cost" is not delivered on the device most of the
audience plays on.** Stated plainly, because the whole promise turns on it.

**S is a requirement, not a geometry, and it now binds the spawn point rather than the pitch.**
The requirement: whenever two or more players are connected, from any occupied plot's spawn
point, at least one other occupied plot's spawn point lies within S studs, with an unobstructed
sightline. **A uniformly centred spawn realises exactly the plot pitch**, and traversal work
puts a 12-stud walkable margin on every side, so plot width is at least `area.size` + 24 = 144
studs at depth 1 — above S even at a zero gutter. **So the requirement cannot be met by a
centred spawn at any gutter, and the spawn has to move.** Which way it moves is plot-layout
work, not mine. The requirement is satisfiable at all only because `01` claims slots at the
lowest free index, so occupied slots stay contiguous.

**A second failure, independent of distance.** The spawn `Attachment` carries no rotation and
the plot row runs along +X, so a character spawns facing −Z with its nearest neighbour **90°
off axis**, outside the roughly ±51° horizontal frustum a 70° vertical FOV gives on a 16:9
viewport. `[cid: decided]` A player spawns, sees nobody, and receives no social proof until they
happen to turn. Criterion 1 requires that fixed.

## No manifest block

This sheet carries no manifest block: it constrains the `social` key rather than supplying it.
**S itself is data, and `01-server-and-co-presence.md` carries it** as
`social.maxCoPresenceSeparationStuds` — the value, its unit, its test range, the viewport it
was measured at, and a pointer back to this sheet. Join against that field, never against this
prose: the derivation lives here, the number lives there, and a sheet that re-types the number
inherits whichever value was current the day it was written.

## Consequences for other work

**Area arrangement and plot layout.** Three requirements, none of them a value. (a) The realised
distance from any occupied spawn point to the nearest other occupied spawn point must be ≤ S.
(b) Because plot width alone exceeds S at depth 1, the spawn point cannot sit at the plot
centre; where it sits instead is yours. (c) A character's spawn orientation must face along the
plot row, so at least one occupied neighbour is inside the default camera frustum at spawn with
no input. **All three are unsatisfied by the shipped build.**

**Depth-scaling work.** The gap widens with depth: at a 236-stud depth-4 area the plot is at
least 260 studs wide against an S of 128, so plot pitch has to be decoupled from area size or
co-presence degrades to nothing as the player descends.

**Identity work.** My test deliberately does not use the nameplate, so nothing here reopens
`theme/identity/03-co-present-stranger`. But `StarterPlayer.NameDisplayDistance` defaults to
**100** studs `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]` against a
realised spawn separation of 160 today and 128 at best, so **a co-present stranger is nameless
at rest either way.** If that ruling requires a readable nameplate, the display distance must
rise above the realised separation — **identity's call, area arrangement's execution, not
mine.**

**Environment and set-dressing work.** The sightline between two spawn points must be
unobstructed: no opaque wall, hedge, terrain rise or fog density between neighbouring plots
inside S. The area boundary is the live case, and criterion 3 is what catches it.

**Feedback and notice work.** Nothing is added on this sheet's authority. There is no
"a player joined" surface, no shared ticker and no greeting to design.

## Acceptance criteria

1. With two players connected on adjacent slots, a screenshot from player A's spawn point at
   spawn orientation, no input, on a **1280×720 viewport** at default FOV, contains player B's
   character occupying **≥ 20 vertical pixels** — equivalently ≥ 2.78% of viewport height at
   any viewport.
2. Over 10 seconds of player B clearing, from that same viewpoint: B's character position
   changes by ≥ 11 studs (one clear-swathe width, twice `movement.baseClearRadius`, the smallest
   displacement that changes the cleared extent), and at least 3 patch instances present in
   frame at t=0 are absent at t=10 s.
3. The straight line between the two spawn points intersects zero instances with
   `Transparency < 1`.
4. With exactly one player connected, the game presents zero on-screen indication that other
   players exist — no count, no notice, no empty slot marker, no greeting.

## Not decided here

The plot slot pitch, the spawn point's position and orientation, and the area arrangement that
satisfy S — area-arrangement and plot-layout work. The carrier of S as data, which is
`social.maxCoPresenceSeparationStuds` in `01`, this domain. The nameplate, its distance, and
what a co-present stranger *is* — `theme/identity/03-co-present-stranger`, inherited. The
boundary's height, material and opacity — traversal-affordance and set-dressing work; I state
only that it may not obstruct the sightline. Chat, collision, plot tenure, friend surfacing and
the `maxPlayers` band — `01`, this domain. What may never be built between two players — `03`,
this domain. What clearing looks and sounds like at any distance — VFX, SFX and mood-and-beat
work. Whether enough players are concurrently online for two to be connected at all — outside
everyone's control, and stated as the condition on every criterion above.
