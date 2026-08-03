# 03 — The co-present stranger

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

A co-present stranger is **another person doing exactly what the player is doing, on ground that is
theirs and not the player's** — the role is shared and symmetric, and the individual is deliberately
unexplained: no history, no relationship, no function toward the player. The fiction asserts nothing
about a stranger except the work they are visibly at.

**Two rulings this sheet makes rather than defers.** A stranger's nameplate stays at the **platform
default — not suppressed, not dressed, not raised** — and **no health bar ever displays over any
character.**

**Data form: an `amends` against `social`** (owner `gameplay/social`). Everything here that a build
can act on is a rule about what may exist between two players, which is exactly what `social` carries
in its 14-entry `forbidden` list, its `plotTenure` and its co-presence bound. A separate key would
put two owners on one subject. `[research: repo — cid/gameplay/social/01-server-and-co-presence.md,
read this run]` **This sheet coins zero terms.**

## Why

**The "different role" answer is not a live option, it is a contradiction.** `02-GAMEPLAY.md` binds
*"Shared server, parallel progression, own areas, no mechanical interaction. Everyone occupies one
world clearing their own patch, visible to each other"* `[brief: soft]` `[you accepted: R6 Q2]`, at a
server size of 12–20. Every occupant of that server is a player. Any asymmetric fiction — they are
visitors, they are wardens, the player is the only one of whatever the player is — is false from at
least eleven of twelve simultaneous points of view. A fiction that cannot be true for everyone
holding it is not a fiction, it is a bug. `[cid: decided]`

**"Deliberately unexplained" is right about the person and wrong about the role.** The brief paid for
co-presence with a stated purpose: *"Social proof at zero systems cost"* `[brief: soft]`. Social proof
requires the player to read the stranger as doing something worth doing; a figure with no legible
activity supplies a figure, not proof. So the *role* must be legible and it must be the player's own.
The *individual* is the part that can carry no explanation, and does — which is also the only version
this game can afford, since there is no surface on which a stranger could be explained.
`[cid: decided]`

**Same-role is the only one of the three answers that needs zero words.** A stranger clearing
overgrowth is self-evidencing: the player already knows what that activity is because they are doing
it. A different role would require explaining. `[cid: decided]`

**A stranger is corroboration, not audience, and not a peer to be measured against.** The category
gate derives *"no fiction of exchange, gifting, rivalry, ranking, or comparison between players"* from
priority 3's exclusion of trading and leaderboards. A stranger-as-audience is the flex fiction and a
stranger-as-benchmark is the leaderboard fiction; both are excluded. What is left is someone else
independently finding this work worth doing.

**Attributing no function is what keeps a stranger warm.** `HANDOFF.md` elevates *"Tension is zero by
design ... Do not invent tension to fill the gap."* Any being with intent *toward the player* would be
the only such being in the world, and a lone intent reads as either a threat or a demand.

**It agrees with what the build actually does.** Each player holds their own fenced plot in a row of
identical lanes, `plots.laneWidthStuds` 120 at `plots.pitchStuds` 122, one occupant each, slots
claimed at the lowest free index and held for the session; `social.plotAccess` is owner-only and
`social.worldStateScope` is per-player `[research: repo — cid/gameplay/meta/06-plot-arrangement.md and
cid/gameplay/social/01-server-and-co-presence.md, read this run]`. The brief's *"one world clearing
their own patch"* reads as a single ruin with private patches inside it. The build is not that.
**"Their own ground, and no claim that all of it is one place" is true of both**, which is why the
decision is worded that way and not more richly. See `## Pushing back`.

**The nameplate: the world's first proper noun is going to be somebody's account name.** Roblox
displays a name above a character's head by default, defaulting to the account Display Name,
suppressible with `DisplayDistanceType = None`
`[research: relayed from cid/theme/identity/_lead.md — creator-docs `characters/name-health-display.md`]`.
`StarterPlayer.NameDisplayDistance` defaults to **100** studs against a realised neighbour separation
of **122** `[research: repo — cid/art/characters/01-the-unmodified-body.md, read this run]`, **so a
stranger is nameless at rest by arithmetic rather than by ruling, and carries a name when two people
come near the shared edge.** I rule the platform default and change nothing, because that is the
cheapest available evidence that a stranger is a person rather than scenery, which is what the shared
server was bought for. **Identity's requirement is not that the name be hidden. It is that it never
be promoted into the fiction:** no system may reuse a player's account name as world text, and no
nameplate may be dressed in the frame, typeface or ornament that in-world labels use.
`[cid: decided]`

**The health bar must never display, and the route I first named was wrong.** There is no failure
state, no damage, no threat, and a health bar is the platform's clearest available assertion that a
body can be harmed. **The ruling stands and I adopt `characterArt`'s correction of its route:** this
sheet originally required `HealthDisplayDistance = 0` on every character, which is a `Humanoid` write
that `response.humanoidWritesAllowed` (exactly `["WalkSpeed"]`) forbids. The legal route is
`StarterPlayer.HealthDisplayDistance = 0` as place configuration
`[research: repo — cid/art/characters/01-the-unmodified-body.md `## Pushing back`, read this run]`.
Criterion 2 is restated against that route.

**A stranger must read as a person and not a prop.** Twelve silent unlabelled humanoids working
identical ground is the shape that reads as a bot farm, and that would destroy the one social value
the brief bought. The visual half is `characterArt`'s and it answers with engine locomotion plus
twenty different player-chosen bodies; this sheet states the requirement and sets no channel.

```json
{
  "amends": "social",
  "requested_by": "cid/theme/identity/03-co-present-stranger.md",
  "why": "what a stranger IS is fiction, but every part of it a build can act on is a rule about what may exist between two players, which is what social already carries",
  "ratifies": {
    "progressScope": "per-player",
    "worldStateScope": "per-player",
    "plotAccess.ownerOnly": true,
    "mechanicalInteraction": "none",
    "forbiddenX1toX14": "all fourteen; none is amended and none is restated",
    "plotTenure.onLeaveMidArea": "ruling accepted - a departure is imperceptible to any remaining player, which closes half of the defect this sheet reported"
  },
  "strangerFiction": {
    "whatAStrangerIs": "another person doing exactly what the player is doing, on ground that is theirs and not the player's",
    "roleSymmetric": true,
    "roleShared": true,
    "individualExplained": false,
    "asymmetricFictionsForbidden": ["visitor", "warden", "helper", "guide", "appraiser", "claimant", "audience", "benchmark", "rival"],
    "requiresAnyInteractionToExist": false,
    "extendedByAWarmthTouchIf": "the touch is symmetric and available to everyone",
    "brokenByAWarmthTouchIf": "the touch makes a stranger asymmetric or comparative",
    "personNotProp": {
      "requirement": "a stranger reads as a person and not a prop",
      "visualHalfOwnedBy": "characterArt.personNotProp",
      "noUniformRequiredByThisSheet": true
    }
  },
  "forbiddenRequested": [
    { "id": "X15", "forbids": "any system that renders a player's account name, display name or user id as world text - a sign, a plaque, an area label, a Find name, or any string sourced from a collection, area or tiers field", "because": "the only proper nouns this world contains are one area label and 24 Find names; an account name promoted into the fiction is a proper noun the fiction does not control" },
    { "id": "X16", "forbids": "a nameplate dressed in the frame, typeface, colour or ornament that in-world labels use", "because": "a nameplate is out-of-fiction furniture; dressing it promotes it into the fiction, which is the failure X15 forbids by another route" },
    { "id": "X17", "forbids": "a health bar over any character, ever", "because": "there is no failure state, no damage and no threat; a health bar is the platform's clearest assertion that a body can be harmed", "route": "StarterPlayer.HealthDisplayDistance = 0 at place configuration, NOT a Humanoid property write, which response.humanoidWritesAllowed forbids", "routeCorrectedBy": "cid/art/characters/01-the-unmodified-body.md" }
  ],
  "nameplateRuling": {
    "state": "platformDefault",
    "suppressed": false,
    "dressed": false,
    "distanceRaisedOrLowered": false,
    "defaultDistanceStuds": 100,
    "realisedNeighbourSeparationStuds": 122,
    "consequence": "a stranger is nameless at rest and carries a name only when two people come near the shared edge - arithmetic, not a ruling",
    "carriedBy": "characterArt.displayPolicy.nameplate, which already records this state and names this sheet as its owner",
    "alternativeDeclined": "suppression via DisplayDistanceType = None, which buys register at the cost of making strangers read as props"
  },
  "plotSeparationRequirement": {
    "requirement": "a neighbour must always be nearer than the far edge of the player's own work",
    "supersededBy": "social.maxCoPresenceSeparationStuds, which states the bound properly at 128 studs with its measuredAt block",
    "ratifiedPredicate": "plots.pitchStuds <= social.maxCoPresenceSeparationStuds.value",
    "shipped": { "pitchStuds": 122, "laneWidthStuds": 120, "gapStuds": 2, "boundStuds": 128, "satisfied": true },
    "doNotCopyTheNumber": "read social.maxCoPresenceSeparationStuds from the merged manifest; it is wrong without its measuredAt block"
  },
  "plotConstructionRequirement": {
    "rule": "a plot appears and disappears whole; nothing may stagger or animate its patches into existence",
    "expect": 0,
    "countOf": "code paths that fade, stagger, sequence or animate a plot's patches into or out of existence",
    "alreadyHeldBy": "tech/performance/03 N16, and serverCost.burstBudget.buildRule - one Parent assignment per bay container",
    "because": "a watching neighbour must never see ground arrive or leave in pieces, which would read as the world doing work the player did not do"
  },
  "openDefect": {
    "id": "D-SLOTREUSE",
    "what": "a player leaves a half-cleared lane, the plot is destroyed and the slot freed; a new joiner claims the same lowest free index and a fully overgrown lane is built there, so a neighbour who watched sees cleared ground return overgrown",
    "against": "'Cleared is permanent - overgrowth never returns' [brief: binding]",
    "departureHalfClosedBy": "social.plotTenure.onLeaveMidArea - nothing about the departure is perceptible to any remaining player",
    "arrivalHalfStillOpen": true,
    "myFictionSurvivesIt": "a stranger's ground makes no claim on the player's world, which is why the decision is worded that way",
    "arbitrationOwnedBy": "plot-arrangement and slot-allocation work; named here, not fixed here"
  }
}
```

## Consequences for other work

- **Player-role work (`01`, this domain):** the role must be **a kind of person there can be many
  of**. A unique title — the last keeper, the only heir, the chosen custodian — becomes false the
  instant a second player walks into view, and there are 12–20 of them. The same bound reaches the
  role's relation to whoever left the collection: a sole-descendant relation is forbidden for the same
  reason.
- **Naming-rules work:** if the role term ever becomes player-facing, it must be a common noun with a
  natural plural and must not be a definite-article title. `X15` is the machine-checkable half and it
  belongs to `social`, not to `vocabulary`, because it is a rule about a *source* of text rather than
  about a word.
- **Presence-sufficiency work:** this sheet does **not** declare strangers inert. It attributes no
  capability and no incapability. A warmth touch **extends** it if it is symmetric and available to
  everyone — a wave, an ambient note when anyone uncovers something, a count of who is here. It
  **breaks** it if it makes a stranger asymmetric or comparative.
- **Plot-arrangement work (`plots`):** the pitch requirement is ratified and superseded —
  `plots.pitchStuds` 122 against `social.maxCoPresenceSeparationStuds` 128, which is the bound to
  join against. The slot-reuse defect's arrival half is yours: a new occupant's lane is built whole
  and green where a finished one stood.
- **Module-planning and performance work:** *"a plot appears and disappears whole; nothing may
  stagger or animate its patches into existence"* is already held by `N16` and the one-`Parent`
  build rule. Ratified, not restated.
- **Publish-checklist work and whoever owns place configuration:** `X17`'s route is
  `StarterPlayer.HealthDisplayDistance = 0`. It is not a `Humanoid` write and no module may make it
  one.
- **Place-identity work:** no extent fiction may **require** a stranger's ground to be visibly
  distinct from the player's own. Every lane is the same deterministic layout. Conversely this sheet
  needs nothing from extent work: co-presence is unremarkable without knowing whether this is one
  ruin or many.
- **Clear-feedback work:** whatever celebrates a clear or a completion may not be reused on plot
  construction.
- **Avatar-treatment work (`characterArt`):** the only requirement this sheet places on a body is
  that a stranger read as **a person and not a prop**. No uniform is required by this sheet.
- **History work:** if history names the ruin's makers as a people, a stranger is still not one of
  them. The shared role is contemporary; the makers are absent.

## Acceptance criteria

1. `cid/theme/identity/01-player-role.md` names the role with a common noun that appears in plural
   form somewhere in that sheet, and that noun is never immediately preceded by *the last*, *the
   only*, *the sole*, *the first*, *the chosen*, or *the true*.
2. **No health bar displays over any character.** `StarterPlayer.HealthDisplayDistance` is `0` in the
   published place, and `grep -rn "HealthDisplayDistance" game/src` returns **0** — the value is place
   configuration, not a `Humanoid` write, because `response.humanoidWritesAllowed` is exactly
   `["WalkSpeed"]`.
3. `plots.pitchStuds` is less than or equal to `social.maxCoPresenceSeparationStuds.value`, and that
   figure appears in exactly **one** key of the merged manifest. **At the shipped values 122 ≤ 128
   passes.** No sheet copies the number.
4. **A plot's patches are created in one loop with no yield and removed by a single `Destroy` of the
   plot container.** Count of code paths that fade, stagger, sequence or animate a plot's patches into
   or out of existence: **0**. Count of systems that render a player's account name, display name or
   user id as world text: **0**.

## Pushing back

I decline to write the fiction that *"Everyone occupies one world clearing their own patch"* implies —
one continuous ruin with private patches inside it. `[brief: soft]` `[you accepted: R6 Q2]` The
shipped arrangement is a row of identical fenced lanes, 122 studs apart, each destroyed when its
occupant leaves. Asserting one continuous place would make the fiction false against the build on day
one. **The social model itself is untouched:** shared server, parallel progression, own areas, no
mechanical interaction, all preserved. What I am declining is the single-continuous-world reading.

## Flagged to the developer

**Zero interview coverage.** None of the 22 questions across 6 rounds touched what another player *is*
in this fiction; `OPEN.md §1` has no audit row for it. Every substantive line above is
`[cid: decided]`.

**The nameplate ruling is now made rather than deferred, and you may want it back.** Live
alternatives: **(a)** leave the platform default — **taken**, because it is the cheapest available
evidence that a stranger is a person rather than scenery, and because at a 122-stud pitch against a
100-stud default distance it costs nothing at rest; **(b)** suppress names entirely, which buys
register at the cost of making strangers read as props; **(c)** replace the name with an in-world
label, which I recommend against and `X16` forbids, because it promotes an out-of-fiction proper noun
into the fiction. Either of (a) or (b) is compatible with the rest of this sheet.

**One build defect, half closed.** Slot reuse can show a watching player cleared ground returning
overgrown. `social.plotTenure.onLeaveMidArea` closes the departure half by ruling; the arrival half —
a fully green lane built where a finished one stood — is still live and routed to plot-arrangement
work.

## Not decided here

Whether presence alone suffices socially, and what a stranger may *do* — presence-sufficiency work;
this sheet is written to be extended by it. Who the player is, and their relation to the makers —
`01`. Whether the role reaches the player at all — `02`. What a stranger looks like, the rig, and the
locomotion that carries the person-read — `characterArt`. One ruin or many — place-identity work. The
plot pitch value, the slot-allocation policy and the slot-reuse defect's arrival half —
plot-arrangement work; I stated a predicate and a defect, not a number.
