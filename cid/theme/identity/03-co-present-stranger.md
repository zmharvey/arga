# 03 — The co-present stranger

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

A co-present stranger is **another person doing exactly what the player is doing, on ground
that is theirs and not the player's** — the role is shared and symmetric, and the individual
is deliberately unexplained: no history, no relationship, no function toward the player.
The fiction asserts nothing about a stranger except the work they are visibly at.

**No manifest block.** Identity owns no contract key, so nothing here reaches a build except
as a requirement on a key somebody else owns.

## Why

**The "different role" answer is not a live option, it is a contradiction.**
`02-GAMEPLAY.md` binds *"Shared server, parallel progression, own areas, no mechanical
interaction. Everyone occupies one world clearing their own patch, visible to each other"*
`[brief: soft]` `[you accepted: R6 Q2]`, at a server size of 12–20 `[brief: soft]` `[I assumed]`.
Every occupant of that server is a player. Any asymmetric fiction — they are visitors, they
are wardens, the player is the only one of whatever the player is — is false from at least
eleven of twelve simultaneous points of view. A fiction that cannot be true for everyone
holding it is not a fiction, it is a bug. `[cid: decided]`

**"Deliberately unexplained" is right about the person and wrong about the role.** The brief
paid for co-presence with a stated purpose: *"Social proof at zero systems cost"*
(`02-GAMEPLAY.md`) `[brief: soft]`. Social proof requires the player to read the stranger as
doing something worth doing; a figure with no legible activity supplies a figure, not proof.
So the *role* must be legible and it must be the player's own. The *individual* is the part
that can carry no explanation, and does — which is also the only version this game can afford,
since there is no surface on which a stranger could be explained. `[cid: decided]`

**Same-role is the only one of the three answers that needs zero words.** `02-GAMEPLAY.md`:
*"Clear → reveal inside the first ten seconds ... No text, no tutorial"* `[brief: soft]`
`[you accepted: R6 Q3]`. A stranger clearing overgrowth is self-evidencing: the player already
knows what that activity is because they are doing it. A different role would require
explaining; unexplained presence explains nothing but also says nothing. `[cid: decided]`

**A stranger is corroboration, not audience, and not a peer to be measured against.**
`01-FOUNDATION.md`: *"not a power fantasy"* `[brief: soft]`. The category gate derives *"no
fiction of exchange, gifting, rivalry, ranking, or comparison between players"* from priority
3's exclusion of trading and leaderboards `[brief: binding]` on trading, `[brief: soft]` on
leaderboards. A stranger-as-audience is the flex fiction and a stranger-as-benchmark is the
leaderboard fiction; both are excluded. What is left, and what this decision names, is someone
else independently finding this work worth doing.

**Attributing no function is what keeps a stranger warm.** `HANDOFF.md` elevates *"Tension is
zero by design ... Do not invent tension to fill the gap."* Any being with intent *toward the
player* would be the only such being in the world, and a lone intent reads as either a threat
or a demand. Both are tension. A stranger who is simply busy has neither.

**It agrees with what the build actually does, and it agrees better than the brief's own words
do.** `game/src/server/init.server.luau` gives each player their own plot at
`slot * (area.size + 40)` on X — a row of separate 120-stud copies of the same area, 40 studs
apart, one occupant each, slots claimed once and held; and `layout` is deterministic and
*"forbids any per-session randomness"*, so every plot is the same ground.
`[research: game/src/server/init.server.luau and cid/tech/architecture/02-module-plan.md — files read, not fetches]`
The brief's *"one world clearing their own patch"* reads as a single ruin with private patches
inside it. The build is not that. **"Their own ground, and no claim that all of it is one
place" is true of both**, which is exactly why the decision is worded that way and not more
richly. See `## Pushing back`.

**The nameplate: the world's first proper noun is going to be somebody's account name.**
Roblox displays a name above a character's head by default, defaulting to the account Display
Name, suppressible entirely with `DisplayDistanceType = None`
`[relayed: cid/theme/identity/_lead.md — not re-fetched in this run]`; the default display
distance is reported as 100 studs `[unverified]`, which at a 160-stud plot pitch would mean a
neighbour's name appears only when both come near the shared edge — a pleasant accident, and
not load-bearing here. Meanwhile the only proper nouns this world contains are one area label
and 24 collection names that do not exist yet, and `relic` is already banned as a player-facing
word (`cid/theme/vocabulary/02-banned-words.md`). **Identity's requirement is not that the
name be hidden. It is that it never be promoted into the fiction:** no system may reuse a
player's account name as world text, and no nameplate may be dressed in the frame, typeface or
ornament that in-world labels use. `[cid: decided]` The ruling on whether names display at all
stays with player-visibility work and HUD work, unchanged.

**The one nameplate element this sheet does rule on is the health bar.** There is no failure
state, no damage, no threat (`02-GAMEPLAY.md`, elevated by `HANDOFF.md`) `[brief: soft]`. A
health bar is the platform's clearest available assertion that a body can be harmed, and
placing one over the only other beings in the world states a threat model this game does not
have. It must never display. `[cid: decided]`

## Consequences for other work

- **Player-role work (`01-player-role.md`, this domain):** the role must be **a kind of person
  there can be many of**. A unique title — the last keeper, the only heir, the chosen
  custodian — becomes false the instant a second player walks into view, and there are 12–20
  of them. The same bound reaches the role's relation to whoever left the collection: a
  sole-descendant or lineage-of-one relation is forbidden for the same reason. Any relation
  that many contemporaries can hold at once survives.
- **Naming-rules work (Vocabulary, this wave):** if the role term ever becomes player-facing,
  it must be a common noun with a natural plural and must not be a definite-article title.
  **Correction to my own domain index, which claimed no `theme/*` domain owns a contract key:**
  `bridge/schema.mjs` now has a `vocabulary` key owned by `theme/vocabulary`
  (`bannedWords[]{word, reason}`, `maxLabelChars`, `register`)
  `[research: bridge/schema.mjs — file read, not a fetch]`. That is where uniqueness modifiers
  would ride *if* the role term becomes a player-facing string; I am not asking for entries
  against a string that may never exist.
- **Presence-sufficiency work (Social, wave 2):** this sheet does **not** declare strangers
  inert. It attributes no capability and no incapability. A warmth touch **extends** it if it
  is symmetric and available to everyone — a wave, an ambient note when anyone uncovers
  something, a count of who is here. It **breaks** it if it makes a stranger asymmetric (a
  helper, a guide, a visitor who appraises your ground) or comparative (a ranking, a progress
  readout of someone else's work).
- **Module-planning work (Tech, `modules`):** three requirements, none of which has a contract
  key, so each has to ride in a `modules[]` entry's `forbids` or `criteria`. (1) No health bar
  above any character. (2) A plot appears and disappears **whole**; nothing may stagger or
  animate its patches into existence. (3) **The plot pitch is an unkeyed literal**
  (`area.size + 40`, in `init.server.luau`) and the brief's entire stated reason for a shared
  server rests on it — the requirement is that the gap between adjacent plots stays smaller
  than one plot's width, so a neighbour is always nearer than the far edge of your own work.
- **Module-planning work, as a revision request against `plots`:** its criterion *"a vacated
  slot is reused before a higher one is allocated"* produces observed regrowth. A player leaves
  a half-cleared terrace, the plot is destroyed, a new joiner claims the same slot and a fully
  overgrown terrace is rebuilt there — and a neighbour who watched sees cleared ground return
  overgrown, against *"Cleared is permanent — overgrowth never returns"* `[brief: binding]`
  `[you chose: R2 Q1]`. **My fiction survives it** (a stranger's ground makes no claim on the
  player's world, which is the point of wording it that way) but the observation is still a
  visible contradiction of a binding decision. The arbitration is theirs — their stated reason
  is bounded slot growth — and it is named here rather than fixed here.
- **Place-identity work (Setting — `extent`, this wave):** no extent fiction may **require** a
  stranger's ground to be visibly distinct from the player's own. Every plot is the same
  deterministic layout, so distinctness costs one authored layout per plot and priority 1 funds
  none. Conversely, this sheet needs nothing from `extent`: co-presence is already unremarkable
  without knowing whether this is one ruin or many.
- **Clear-feedback work (Mechanics):** whatever celebrates a clear or a completion may not be
  reused on plot construction, for the reason above.
- **Avatar-treatment work (Art — Characters, wave 4):** the only requirement this sheet places
  on a body is that a stranger read as **a person and not a prop**. Twelve silent unlabelled
  humanoids working identical ground is the shape that reads as a bot farm, and that would
  destroy the one social value the brief bought. No uniform is required by this sheet; whether
  the *role* requires one is `02-role-legibility`'s.
- **History work (Lore, this wave):** if history names the ruin's makers as a people, a
  stranger is still not one of them. The shared role is contemporary; the makers are absent.

**This sheet coins zero terms.** *Co-present stranger* is the domain index's phrase, is
writer-facing only, and is not proposed for the canonical list.

## Acceptance criteria

1. `cid/theme/identity/01-player-role.md` names the role with a common noun that appears in
   plural form somewhere in that sheet, and that noun is never immediately preceded by *the
   last*, *the only*, *the sole*, *the first*, *the chosen*, or *the true*.
2. Every player character has `HealthDisplayDistance = 0` set explicitly, so no health bar can
   display regardless of what the platform default would do.
3. The gap between adjacent plots is strictly smaller than one plot's width. At the current
   `area.size` of 120 and pitch of `area.size + 40`, the gap is 40 and this passes; any change
   to either value must preserve `gap < area.size`.
4. A plot's patches are created in one loop with no yield and removed by a single `Destroy` of
   the plot container. No code path fades, staggers, sequences or animates a plot's patches
   into or out of existence.

## Pushing back

I decline to write the fiction that *"Everyone occupies one world clearing their own patch"*
implies — one continuous ruin with private patches inside it. `[brief: soft]`
`[you accepted: R6 Q2]` The shipped arrangement is a row of separate identical 120-stud copies
of one area, 40 studs apart, each destroyed when its occupant leaves. Asserting one continuous
place would make the fiction false against the build on day one. **The social model itself is
untouched:** shared server, parallel progression, own areas, no mechanical interaction, all
preserved. What I am declining is the single-continuous-world reading, and one-ruin-or-many
stays with place-identity work.

## Flagged to the developer

**Zero interview coverage.** None of the 22 questions across 6 rounds touched what another
player *is* in this fiction; `OPEN.md §1` has no audit row for it. Every substantive line above
is `[cid: decided]`, and a later revision should know the decision was unanchored rather than
derived.

**The nameplate ruling is not mine, and you may want it.** Live alternatives: **(a)** leave the
platform default, so a stranger's account name appears when they come near — **my
recommendation**, because it is the cheapest available evidence that a stranger is a person
rather than scenery, which is the whole thing the shared server was bought for; **(b)** suppress
names entirely, which buys register at the cost of making strangers read as props; **(c)**
replace the name with an in-world label, which I recommend against, because it promotes an
out-of-fiction proper noun into the fiction and there is no source for such a label. Either of
(a) or (b) is compatible with this sheet.

**One build defect, not a fiction choice:** slot reuse can show a watching player cleared ground
returning overgrown. Detailed under consequences, routed to module-planning work.

## Not decided here

Whether presence alone suffices socially, and what a stranger may *do* — presence-sufficiency
work, wave 2; this sheet is written to be extended by it. Who the player is, and their relation
to the makers — `01-player-role.md`. Whether the role reaches the player at all —
`02-role-legibility.md`. Whether names display above heads — player-visibility and HUD work.
One ruin or many — Setting's `extent`. What a stranger looks like — Art & Visuals (Characters).
The plot pitch value and the slot-allocation policy — module-planning work; I stated a relative
ordering and a defect, not a number.
