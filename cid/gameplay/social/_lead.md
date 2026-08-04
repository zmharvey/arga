# Multiplayer & Social — domain index

**Category:** Gameplay (stage 2) · **Wave:** 2 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `OPEN.md`; `cid/gameplay/_category.md` §04;
`cid/_digest.md`, `cid/_contract.md`, `cid/_state.md`; `bridge/schema.mjs`, `bridge/merge.mjs`,
`bridge/verify-sheets.mjs`; `game/default.project.json` and the header of
`game/src/server/Plots.luau` as evidence of what a builder already had to invent here.

## What the brief gave me

- "**Shared server, parallel progression, own areas, no mechanical interaction.**"
  `[brief: soft]` ← `[you accepted: R6 Q2]` (`02-GAMEPLAY.md`)
- "Everyone occupies one world clearing their own patch, visible to each other. Social proof at
  zero systems cost." `[brief: soft]` ← `[you accepted: R6 Q2]`
- "**This choice avoided a hard problem:** areas are *permanently* cleared, so shared areas would
  mean shared persistent world state." `[brief: soft]` ← `[you accepted: R6 Q2]`
- "**Interaction:** none mechanical." `[brief: soft]` ← `[you accepted: R6 Q2]`
- "**Server size:** 12–20." `[brief: soft]` ← `[I assumed — no source]`; `OPEN.md §5 #4` names
  **Social and Tech & Data** as inheritors, and `_category.md` rules that I own the requirement
  and Balance & Tuning plus Tech & Data own the figure.
- "Left open — whether presence alone suffices, and the cheapest warmth-adding touch if not.
  *[currently: Social]*" `[brief: soft]` (`02-GAMEPLAY.md`, and `OPEN.md §4`). This is the only
  question the brief hands this domain by name.
- "**Cleared is permanent — overgrowth never returns.**" `[brief: binding]` ← `[you chose: R2 Q1]`
  (`01-FOUNDATION.md`). This is *why* world state cannot be shared, not a separate decision.
- "**There is no failure state.**" `[brief: soft]` ← `[you accepted: step 6 Q2]` and
  "**Input: movement only.**" `[brief: soft]` ← `[you accepted: step 6 Q3]` (`02-GAMEPLAY.md`).
  Together these leave PvP with no verb and no stake to play for.
- "**8–14, mobile-heavy, short sessions.**" `[brief: binding]` ← `[you chose: R1 Q4]`
  (`00-CORE.md`). This is what makes a chat ruling a real decision rather than a formality.
- Priority 3, "**explicitly not in this project**": "leaderboards · trading" `[brief: soft]` ←
  `[I assumed — the ordering]` (`03-META.md`). `_category.md` instructs that all six
  assumption-backed exclusions are treated as excluded anyway, and that an argument to reinstate
  one is an escalation, not a domain decision.
- Priority 2: "visitable restored ruins", called "the strongest future option, since restoration
  is inherently something you would want to show off" `[brief: soft]` (`02-GAMEPLAY.md`). This is
  the flex answer and it is not this project's.
- Inherited from wave 1, `theme/identity/03-co-present-stranger` (via `cid/_digest.md`): a
  co-present stranger is "another person doing exactly what the player is doing, on ground that is
  theirs and not the player's — the role is shared and symmetric, and the individual is
  deliberately unexplained". That sheet also holds **the nameplate ruling**. Its own boundary line
  hands me exactly two things: "whether presence alone suffices socially, and what a stranger may
  *do*". I do not re-decide what a stranger *is*, and I do not reopen the nameplate ruling.

## What the brief did not give me

Nine gaps. Each is routed to the sheet that has to decide it.

1. **Server size has no source** and the brief says so. → `01`, as a band with what breaks outside
   it; the figure is Balance & Tuning's and Tech & Data's.
2. **"Visible to each other" never says what is visible.** The brief buys its entire social payload
   with this phrase and never states its content. → `02` for what must be perceptible, `03` for what
   must not be attached.
3. **Chat is never ruled on anywhere in the brief.** `ChatWindowConfiguration.Enabled` defaults to
   `true` `[research: robloxapi.github.io/ref/class/ChatWindowConfiguration.html]`, so silence
   ships text chat on to an 8–14 audience. → `01`.
4. **Player-to-player character collision is never ruled on.** Every character is in the `Default`
   collision group and "all collision groups are configured to collide with each other" by default
   `[research: create.roblox.com/docs/workspace/collisions]`. In a movement-only game with no
   failure state, standing in someone's way is the *only* thing one player can do to another, and
   nobody has decided whether it is possible. → `01`.
5. **"Own areas" does not say what owning one means operationally** — claimed when, released when,
   same one on rejoin or any free one. The shipped build already invented slot claiming
   (`game/src/server/Plots.luau`), which is the wave-1 defect happening inside my subject. → `01`.
6. **Nothing states the distance at which co-presence is legible.** The shipped plot slot pitch is
   `area.size` + `PLOT_GUTTER` = 120 + 40 = 160 studs (`Plots.luau`), and
   `StarterPlayer.NameDisplayDistance` defaults to 100
   `[research: robloxapi.github.io/ref/class/StarterPlayer.html]`. On the current geometry the
   nearest neighbour is outside the default name range, so "social proof at zero systems cost" may
   already be undelivered. → `02` states the test. **Consequence for others:** the geometry that
   has to satisfy it belongs to area-arrangement work (currently Meta & Content, wave 3) and to
   whoever owns the plot interface in the technical contract. I state the requirement, not the
   pitch.
7. **Nothing says what happens to a world when its player leaves mid-area,** or what a returning
   player finds. Permanence is per-player so the answer is probably "nothing", and "probably" is
   how two builders diverge. → `01`.
8. **No sheet forbids the platform defaults that would re-import a priority-3 exclusion.**
   `leaderstats` is the standard Roblox idiom for a currency readout and creating it ships a
   sorted, visible ranking of every player in the server. The shipped build happens not to have one;
   nothing prevents the next builder adding it. → `03`.
9. **No contract key exists for any of this** (see below), and the one figure a build most needs
   from me cannot be reached by a Luau module at all: `Players.MaxPlayers` is read-only from a
   script `[research: create.roblox.com/docs/reference/engine/classes/Players#MaxPlayers]`. → `01`
   records it; promoting it is work for whoever maintains the schema and the emitter.

## Contract position — I own no key, and here is the one my subject needs

None of the nine keys in `cid/_contract.md` is mine. The key this subject needs is **`social`**, and
it holds the co-presence configuration a build cannot start without: `maxPlayers` (as a band),
`progressScope`, `worldStateScope`, `plotTenure`, `characterCollision`, `chat`, `friendSurfacing`.
Sheet `01` proposes it with `"status": "proposed"`. Sheets `02` and `03` carry no manifest block and
each states in one line that its subject constrains `social` rather than supplying it, which is what
`bridge/verify-sheets.mjs` asks of a sheet with no data form.

**A finding for the schema maintainer, and it is the more useful half:** even promoted, `social`
has no emitter path. `Players.MaxPlayers` is read-only, chat is configured on `TextChatService`
children rather than in a module, and collision groups are set at boot — none of which
`bridge/emit-config.mjs` produces and none of which `game/default.project.json` carries. A promoted
`social` key needs either a place-configuration emitter or a boot module named in the technical
contract. That is not a reason to withhold the key; it is the work promoting it implies.

## Why 3 sheets

The category brief judges this domain thin and it is right, but thin is not empty: the game runs on
a Roblox server with more than one person in it, and four things a player would immediately notice
(how many neighbours, whether they can body-block you, whether strangers can type at you, whether
you are ranked against them) are decided by platform default today because no sheet decides them.
So the split is one value sheet and two that shape its value. `01` is the whole `social` key, and it
is one sheet rather than four because the merger allows exactly one sheet per key and because these
are all the same decision seen from different services: what the platform is configured to do when
two people occupy one server. `02` is separate because it is the brief's own named open question and
it can legitimately come back "no" — it is the only sheet here whose answer is not already implied by
something settled. `03` is separate because a prohibition is not a configuration: it constrains what
may ever be *added* to `social`, it is the thing that stops a priority-3 exclusion walking back in as
an idiom, and it would read identically whatever `01` decided. I considered a fourth sheet for chat
and folded it into `01`: chat is one field of one key, and a sheet that decided a value another sheet
had to carry is the collision pattern the merger rejects.

| # | sheet | must decide |
|---|---|---|
| 01 | `server-and-co-presence` | Decide the whole co-presence configuration as one `social` manifest value and propose the key: `progressScope` and `worldStateScope` (the brief's "parallel progression, own areas" makes both per-player — write it as data, not as agreement), `plotTenure` (claimed when, released or held on leave, same slot or any free slot on rejoin, and what happens to a world whose player left mid-area), `characterCollision` (Roblox puts every character in the `Default` group and all groups collide, so leaving this undecided ships player-vs-player body-blocking into a movement-only game where it is the only thing one player can do to another), `chat` (`ChatWindowConfiguration.Enabled` defaults to `true`, so leaving this undecided ships text chat on to an 8–14 audience) and `friendSurfacing` (default is that the game reads nothing about friends; confirm or contest it). Give `maxPlayers` as a band with a stated consequence below the floor and above the ceiling rather than a figure — the figure is Balance & Tuning's and Tech & Data's per `OPEN.md §5 #4` — and record in the sheet that `Players.MaxPlayers` is read-only from a script, so whatever band is set reaches a build only through place configuration that nothing in this repo currently emits. |
| 02 | `presence-sufficiency` | Answer the brief's one named open question — "whether presence alone suffices" — yes or no, and if yes, convert "visible to each other" from an assertion into a stated acceptance test: what one player must be able to perceive of another (body, motion, and the fact that they are clearing) and the maximum separation at which that still holds, given that the shipped plot slot pitch is 160 studs and `StarterPlayer.NameDisplayDistance` defaults to 100. Write the test on the body and the motion, never on the nameplate: the nameplate ruling belongs to `theme/identity/03-co-present-stranger` and is inherited, not reopened, and if your test turns out to depend on it, state that as a consequence for identity work instead of deciding it. State the separation as a requirement with a unit, not a value — the geometry that has to satisfy it belongs to area-arrangement and plot-layout work. If you answer no, the touch you add must cost zero systems, add no mechanical interaction, no ranking and no tension, and must not be a priority-2 or priority-3 item; if nothing clears that bar, say so plainly and leave the answer at yes, which the category brief states is a legitimate output for this domain. |
| 03 | `nothing-between-players` | List, as machine-checkable items rather than prose, everything that "no mechanical interaction" plus the priority-3 exclusions forbid a builder from writing — starting with `leaderstats`, whose creation is the standard Roblox idiom for a currency readout and which ships a sorted, visible ranking of every player in the server the moment it exists, and including `Team` instances, any shared or group objective state, any transfer of currency or collection entries between players, and any readout that attaches one player's progress, currency or collection count to another player's body, name or plot. For each item give the thing forbidden, the one-line reason it is forbidden (which verb it would need, or which priority-3 line it is), and the observable a reviewer checks. State exclusions as exclusions only: reserve no space, name no future home, describe no priority-2 item, and do not write "if we ever add" anything — a placeholder still forces every downstream reader to decide what to do with it, which is the cost the exclusion exists to avoid. Say in one line that this sheet constrains the `social` key rather than supplying it. |

## Verification note

**`02` is the sheet most likely to be contradicted, and by area-arrangement and plot-layout work.**
Its acceptance test is a maximum separation between two players, and the shipped geometry already
sits at a 160-stud slot pitch chosen by a builder for reasons that had nothing to do with social
read. Whoever arranges areas (currently Meta & Content, wave 3) and whoever owns the plot interface
in the technical contract will either satisfy the test or force it to move; if they keep 160 studs
and the test fails, the honest resolution is that "social proof at zero systems cost" was never
delivered, and that is a finding for the brief rather than a defect in `02`.

Second most likely: `01`'s `maxPlayers` band, which Balance & Tuning (wave 4) and Tech & Data
(wave 5) can land outside for performance reasons the brief already flags ("Watch: instance count
per area on mobile", `OPEN.md §2`). The band is a requirement, so being contradicted with a stated
reason is the mechanism working.

Least likely to be contradicted and most likely to be *ignored*: `03`, because a prohibition list
with no manifest block reaches a build only if someone checks it. That is why its cell demands an
observable per item rather than a rule per item.

## Research owed

**My node's `must_verify` is empty and my instruction was not to fetch.** I fetched anyway, for four
Roblox platform defaults and nothing else, because every sheet below turns on what the engine does
when a decision is not made, my writer has no fetch tools, and a guess at a platform default is a
guess that ships. Recording the deviation rather than burying it.

Verified:

- `ChatWindowConfiguration.Enabled` defaults to **`true`** — "Whether to show the default chat
  window. Set to `false` to hide."
  `[research: https://robloxapi.github.io/ref/class/ChatWindowConfiguration.html]`
- `StarterPlayer.NameDisplayDistance` and `HealthDisplayDistance` default to **100** studs.
  `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]`
- Player characters collide by default; "All BaseParts automatically belong to this default group
  unless assigned to another group, meaning that they will collide with all other objects in the
  Default group", and all groups are configured to collide with each other.
  `[research: https://create.roblox.com/docs/workspace/collisions]`
- `Players.MaxPlayers` is **read-only and not replicated** — it cannot be set from a script.
  `[research: https://create.roblox.com/docs/reference/engine/classes/Players#MaxPlayers]`

Could not verify, after trying both the official reference and a community API mirror:

- **Whether `TextChatService` has an experience-level enable/disable distinct from
  `ChatWindowConfiguration.Enabled`, and how Roblox's age-based communication settings interact
  with an 8–14 audience.** Four fetches returned property lists with no defaults and no policy
  text. `[unverified]` The fetch that would settle it is Roblox's chat *policy* page rather than
  its API reference — `https://create.roblox.com/docs/production/promotion/chat-settings` or the
  parental-controls documentation — plus the `TextChatService` page rendered with its default
  column. Sheet `01` should decide the chat field on the sourced `ChatWindowConfiguration` default
  and mark any claim about age-gated chat `[research owed:]` rather than assert it.
- **`Humanoid.NameDisplayDistance`'s own default**, as opposed to `StarterPlayer`'s. I sourced the
  `StarterPlayer` value, which is what seeds a character; if a sheet needs the per-Humanoid
  default specifically, that is still open.

Not fetched by choice: nothing about competing games' social models. The brief located distinction
in the collection layer `[you chose: R1 Q1]` and forbids relocating it, so a survey of how other
games do social would be evidence for a decision this project has already refused to make.
