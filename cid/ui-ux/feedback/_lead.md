# Feedback UI — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/ui-ux/_category.md`, `cid/_digest.md`, `cid/_contract.md`, `cid/_state.md`;
`gameplay/mechanics/05`, `gameplay/onboarding/02`/`03`/`04`, `gameplay/core-loop/02`,
`gameplay/systems/04`/`05`, `gameplay/meta/03`/`07`, `gameplay/monetization/01`/`02`,
`gameplay/social/01`/`02`/`03`, `theme/tone/01`/`03`/`04`, `theme/vocabulary/02`/`04`,
`theme/setting/02`; `architect/sheets/06`; `ui-forge/src/compose/index.mjs`;
`game/src/client/Beats.luau`, `game/src/server/Persistence.luau`; `bridge/schema.mjs`.

## What the brief gave me

Nothing in the brief names a notice, a toast or a message. What it gives me is four
constraints that decide the shape of one, and one sentence that makes this domain load-bearing.

| constraint | tag |
|---|---|
| *"**Zero tension is deliberate.** … **Consequence: audio and visual feedback carry the entire load** — and nobody downstream should invent tension to fill the gap."* `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: step 6 Q2]`, and **binding on the instruction** per `HANDOFF.md` six-things #4 |
| *"**There is no failure state.** No death, no losing, no loss of progress."* `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: step 6 Q2]` |
| *"Clear → reveal inside the first ten seconds. … **No text, no tutorial.**"* `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: R6 Q3]`, read through `onboarding/03`'s approved gloss: a permanent ban on instruction, not a ten-second ban on strings |
| *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q4]`. Reading level and one-handed reach are floors |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q3]`. A surface that exists to give me something to do is a violation |
| *"**Permanent multipliers only. Never content access.**"* + *"**Forbidden:** any paid area, relic, or set"* `03-META.md` | `[brief: soft]` ← `[you accepted: R5 Q4]` |
| Priority 3: *"codes · daily rewards · leaderboards · trading · seasons and events"* `03-META.md` | `[I assumed — the ordering]` on provenance, **hard as a gate** |

Approved keys that decide my membership before I start, quoted at their source:

- `response` (`gameplay/mechanics/05`): *"the `notice` channel is owned by the two completions
  and may never carry a reveal. Nothing on that channel may be dismissible-only, focusable, or
  block a click-through."* `channelExclusivity.notice` is `["setComplete", "areaComplete"]`;
  `negativeBeats` is `0`; `lockoutsSeconds` is `0`; `minOnsetGapSeconds` is `0.6`;
  `R5`/`R6`/`R7` forbid a beat opening, focusing or requiring dismissal of anything.
- `theme/tone/03` `B1`–`B5`: *"Feedback UI may not show a notice for `B4` or `B5`, and may not
  render a Find's identity before `B1` fires."* `[cid: decided]` at source.
- `firstSession` (`onboarding/02`, amended by `/04`): `tutorialDevicesForbidden` is twelve named
  devices including `unrequestedModalPanelOrOverlay` and `firstRunOnlyString`;
  `suppressionForbidden` bans `liftAnimation` and `liftSound` — *"a lift is silent and still."*
- `economy` (`systems/04`): *"Whatever the notice says, it cannot say `+N`."*
- `setBonus` (`meta/03`): one cue serves all four sets; *"nothing may signal which axis was
  granted by making the cue louder, longer or different."*
- `discovery` (`systems/05`): *"no 'already found' toast, no slot that fills twice, no
  consolation cue."*
- `social` (`social/03` `X11`): *"join or leave notices, toasts, sounds or on-screen strings
  naming another player"* — zero.
- `endgame` (`meta/07`): after 24/24 the reveal and set-completion beats are **extinct**; area
  completion is the only above-tick payoff left, forever, on unnumbered bays.
  `theme/setting/02`: *"No total, no plan, no survey mark."*
- `vocabulary`: `casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`,
  `allowedPattern: "^[A-Za-z0-9 ,.'%%/-]+$"`, eight banned words. `theme/tone/01` P1–P9 apply
  entire to a notice, because a notice is prose.

**The count, verified rather than inherited.** My category lead says two of five beats reach the
notice channel. That is correct, and here is the walk: `patchClear` (B5) channels `atPatch` and
`readout`, and `tone/03` forbids it a notice — **out**. `findReveal` (B1) channels `atPatch` and
`audio` and carries `forbiddenChannels: ["notice"]` — **out**. `upgradePurchased` (B4) channels
`readout` and `audio`, and `tone/03` forbids it a notice — **out**. `setComplete` (B2) and
`areaComplete` (B3) each channel `notice` and `audio` — **in**. **Two, both completions, both
non-blocking**, and after 24/24 it falls to one.

## What the brief did not give me

Six gaps. Each is routed; none is filled here.

| # | gap | routed to |
|---|---|---|
| **F1** | **The brief has no failure state, so it never contemplated a failure *message*.** But `game/src/server/Persistence.luau` warns, latches the player unsaveable and returns `defaultState()` on a read failure `[research: repo]`, so a returning player with 18 Finds can join and see `0`. Nothing in the brief or any key says whether the game says anything. This is `theme/tone/01`'s *"Error and system copy (unowned; nearest holder is UI/UX)"* and my category lead's G2. | **03** |
| **F2** | **No dwell exists anywhere.** `response` budgets *onset latency* (400 ms) and *onset separation* (0.6 s). Neither is how long a thing stays on screen. `findReveal` is the only beat in the contract carrying a `dwellSeconds`; the two notice beats carry none, and the brief names no duration for anything. | **01** |
| **F3** | **No contract path carries a notice string.** `theme/vocabulary/04` makes every one a renderable coinage with `requestsPath` unfilled and records that the ` ```coinage ` parser *"does not exist"* in `bridge/merge.mjs`. So my strings are unenforceable by the merge until seam work lands, exactly as `SHARDS` was. | **01** and **03** file the blocks; the bill goes to contract-and-seam work |
| **F4** | **Nothing states what happens when two notices are live at once.** `core-loop/02` fixes the coincident *order* and `response` fixes the 0.6 s *onset* gap; both are about when a cue starts. On-screen overlap is a different quantity and no sheet has it. At any dwell above 0.6 s the 4.3% coincident lap puts two notices on screen together. | **02** |
| **F5** | **Nothing states whether a mid-session entitlement change is observable at all.** `cid/_state.md` build note 4 names the defect; no key says what the client may know. | **03** |
| **F6** | **No contract key or module owns the Instance a notice is made of.** `architect/06` lists the three things parented into the HUD by modules and names the third only as *"whatever a beat cue turns out to be when Art specifies one"*, then rules that *"any module other than `pressables` and `index-screen`"* may **not** create a `GuiObject`. `Beats.luau` holds the `ScreenGui` and its five cue bodies are empty `[research: repo]`. **A notice has no legal creator today.** | Stated in **01** as a requirement on `representation`; it is architect work, not mine to write |

## Why three sheets

**I own no merged contract key**, and one proposed key, `notices`. The rule gives me one sheet
for it. I add two, and the justification is that both decide something the key's *value* cannot
express as a single field written by the same hand.

Sheet **01** is the key: membership, anatomy, dwell, interaction properties and the strings —
one coherent job, the job a builder filling `cueSetComplete` in `Beats.luau` is doing. Sheet
**02** is the only quantity in my subject that two competent builders provably diverge on, and
the shipped scheduler already gets its reasoning wrong: `Beats.luau`'s header asserts *"One
onset never begins inside another on the same exclusive channel"* on the strength of
`channelExclusivity` — but `notice` is exclusive to **two** beats jointly, so exclusivity
separates them from nothing, and 0.6 s separates onsets rather than on-screen presence. Sheet
**03** is a different cause on a different side in a different module: a failed read is not a
beat, `response.negativeBeats` is `0`, and folding it into 01 would invite a builder to wire it
into the beat scheduler. 02 and 03 file ` ```json ` `amends: "notices"` blocks rather than a
second `manifest`, which is the pattern `gameplay/onboarding/04` already uses against
`firstSession` and which keeps one key to one claiming sheet.

**Subjects I considered and did not assign, and why.**

- **A prohibitions sheet.** Everything a builder would reach for and must not build — reward
  popup, first-Find celebration modal, duplicate toast, join notice, offer popup, rejection cue,
  daily-reward strip, code field, event banner, "come back tomorrow" — derives wholly from
  `response`, `tone/03`, `tone/04` `D6`–`D15`, `firstSession.tutorialDevicesForbidden`,
  `discovery`, `social/03` and the priority-3 gate. That is an inventory of other people's
  rulings, not a decision. It becomes `notices.forbidden`, an array in **01**.
- **Tutorial callouts.** The answer is **zero**, and it is fully determined upstream:
  `firstSession.tutorialDevicesForbidden` names twelve devices and `onboarding/03` `T6` forbids
  any unrequested panel *"which includes a first-Find celebration modal."* One row in
  `notices.forbidden`. **Where onboarding stops and I start:** onboarding owns which persistent
  surfaces are present or withheld at each beat and when each lifts; I own whether any
  *transient* message accompanies any of it, and the answer is none — `S6`/`S7` make a lift
  silent and still. No sheet needed to say no.
- **Confirmations.** `upgradePurchased` is `readout` + `audio` with no notice, `R6` forbids any
  beat needing acknowledgment, and `input.rejectionCueOnFailedPrecondition` is `"none"`. The set
  is empty; it is one line in **01**, not a sheet.
- **Reward popups.** Same: `B1` is barred from `notice`, `meta/03` grants *"no bonus list, no
  bonus tooltip, no per-set reward preview"*, `endgame` grants *"no end screen, no
  congratulation, no completion percentage."* Whether `B1` has any on-screen component at all is
  a membership ruling and belongs in **01**.
- **Where a notice sits.** Not mine. `composition` is the HUD Lead's. **01** raises it as a
  requirement — a notice may not occlude the currency readout, the collection count, the area
  bar or any of the four pressables, because `response` forbids a notice swallowing a tap — and
  HUD carries it as data.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-notice-channel` | Decide what a notice structurally is given it may not be modal, focusable, dismissible-only or click-blocking; which of `response`'s five beats produce one (verify the count yourself against `channelExclusivity` and `forbiddenChannels`, and state the three exclusions with the ruling that closes each); whether `findReveal` has any on-screen component at all given it owns `atPatch` exclusively; the exact title-case string each notice carries under `theme/tone` P1–P9 and `vocabulary` (no `+N`, no ordinal, no total, no set-varying text, ≤ 14 chars for a label and ≤ 12 words for a sentence); its dwell in seconds with a `[playtest unknown]` test range; and the closed `forbidden` list. Carry all of it as the `notices` manifest, file a ` ```coinage ` block per string with `requestsPath` and `surface`, and state as a requirement on `composition` which HUD members a notice may never occlude and as a requirement on `representation` that no module may legally create the Instance today. |
| 02 | `coincidence-and-stacking` | Decide what the player sees when a second notice becomes due while the first is still on screen — replaced, stacked, queued behind the first's dwell, or the first's dwell extended — for the 4.3% of laps where set completion and area completion land 0.6 s apart in that fixed order, and for the general case of any two notices at any gap; state the maximum concurrent count, whether a dwell may be truncated by a successor, and whether the rule differs at the post-24/24 state where `areaComplete` is the only notice left; reconcile it against `Beats.luau`'s existing rank-ordered 0.6 s onset scheduler, which separates onsets and not dwells, and against `core-loop/02`'s *"one surface cannot serve both"*; file it as an `amends: "notices"` block. |
| 03 | `system-notices` | Decide, as three separate answers each stated as data with its reason, whether any transient message fires (a) when `Persistence.load` fails its DataStore read and the player is handed `defaultState()` with their real save latched unwritable, (b) between join and the first snapshot while the HUD stands blank, and (c) when a pass is bought mid-session on the experience page and does not apply until rejoin; if any message exists, write its exact string against `theme/tone` P1–P9 (no first or second person, no imperative, no `game`/`server`/`session`/`player`, declarative, ≤ 12 words) and give it a dwell, and if none exists say so in the value with the reason so no builder adds one; file it as an `amends: "notices"` block adding a `system` class that is explicitly **not** a beat and never enters the beat scheduler. |

## The contract key my subject needs

`notices` does not exist in `bridge/schema.mjs` — 25 keys, none of them mine, verified by
reading `SCHEMA` and `contract()` directly (see Research owed). Proposed:

> **`notices`** — *every transient on-screen message the game shows, and the rules that govern
> two of them at once.* Owner `ui-ux/feedback`. Would hold: `members[]`, each with `id`, `class`
> (`beat` | `system`), the `beat` or the cause it fires from, its `text`, its `dwellSeconds` and
> test range, and its anchor group; `interaction` (`focusable`, `blocksInput`, `dismissible`,
> `modal` — all false, and checkable as such); `maxConcurrent`; `onCoincidence`; and a closed
> `forbidden[]` array of named surfaces with the ruling that closes each and the observable that
> catches it. A build reads it in exactly two places: the five empty cue bodies in
> `game/src/client/Beats.luau`, and the failure path in `game/src/server/Persistence.luau`.

## My ruling on error copy

**Error copy is mine, and my category lead's split of it is wrong in one direction.** G2 routes
*the surface* to me and *its copy* to Screens. A load-failure message is not a screen — it is a
transient message drawn over live play, which is the whole of my subject and none of Screens'.
Splitting the surface from its string across two domains is the exact pattern that produces one
sheet naming a thing another sheet owns. **I take both.** What stays with Screens is the index
panel's own empty, loading and error states, because those are composition inside an opened
surface.

**Why it needs deciding rather than declining.** The failure is shipped and reachable: on a
read failure `Persistence.load` warns, latches the player unsaveable and returns
`defaultState()` `[research: repo]`, so a returning player sees `0 / 24` and an empty index. That
meets the stopping rule's first bar — a player would notice — and the second, because two
builders will differ on whether the game says anything at all.

**What is sayable, as a bound rather than a string** — the string is 03's:

- **May not** use the second person (`P1`), an imperative (`P2`, and
  `tutorialDevicesForbidden.imperativeString`), or the words `game`, `server`, `session`,
  `player`, `account` (`P6`). **So "Rejoin to restore your progress" is illegal three times over
  before F19 is reached**, and this is the correction worth making: F19 forbids *naming, showing
  or pricing a product*, so it bars a rejoin instruction only in the pass case (2). The register
  is what bars one in the save case.
- **May not** read as permanently unavailable (`tone/04` `D8`: no `missed`, `expired`, `gone`),
  may not blink or pulse (`D6`), may not be a modal that cannot be dismissed (`D6`), may not
  block a tap, take focus or need acknowledgment (`response` `R5`–`R7`).
- **May not** be a beat. `response.negativeBeats` is `0` and `R10` says *"a refused purchase and
  an unconfirmed clear emit nothing"*. Whatever 03 decides is a `system` member, scheduled
  outside `Beats.luau`.
- **May** be a declarative statement of fact in title case, one sentence, ≤ 12 words, matching
  `allowedPattern`. That is a real and non-empty space, which is why 03 must rule rather than
  default to silence.

**The mid-session pass purchase (case c): the answer is that no notice may fire, and the reason
is stronger than the copy rule.** Under R-4 the game never calls `PromptGamePassPurchase`, and
`PromptGamePassPurchaseFinished` is documented only as firing *"when the purchase prompt
closes"* in response to that method `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]`.
`UserOwnsGamePassAsync` is cached per server, which is precisely why re-polling is the
documented anti-pattern `[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`.
So **the client never learns the purchase happened**. There is nothing to notify about, not
merely nothing sayable. 03 must state that in the value, with that reason, so a builder does not
add a poller and a toast to close what looks like a copy gap. The defect itself stays where
`cid/_state.md` build note 4 and Store UI's `offerSurface` put it.

## Verification note

**Sheet 02 is the one most likely to be contradicted, and by Audio — Stingers.** `tone/03` `B2`
says a set completion *"may be longer and wider than `B1`"*; if Audio sizes that cue past my
dwell, the notice leaves the screen while its sound is still playing, and one of the two moves.
Balance & Tuning is the second candidate: `minOnsetGapSeconds` is theirs to set inside 0.35–0.9,
and my concurrency rule is derived against 0.6. Sheet **01** is second, contradicted by **HUD**
if `composition` places a cluster where my keepout requirement cannot be satisfied — the correct
direction is that they carry it as data or refuse it out loud, not that I move.

## Research owed

`must_verify` for this node is **empty** in `docs/cid-workflow.json`. I fetched anyway, because
my writer cannot, and because three of my sheets have to justify a duration or a silence.

**Fetched and banked:**

- `[research: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html]` — SC 2.2.2:
  *"any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more
  than five seconds, and (3) is presented in parallel with other content"* needs a pause/stop/hide
  mechanism. `response` `R6` forbids providing one. **So a notice is static and its dwell has a
  five-second ceiling, derived rather than chosen** — this is 01's and 02's anchor.
- `[research: https://raw.githubusercontent.com/Roblox/Core-Scripts/master/CoreScriptsRoot/CoreScripts/NotificationScript2.lua]`
  — the platform's own notification system: `MAX_NOTIFICATIONS = 3`,
  `DEFAULT_NOTIFICATION_DURATION = 5`, and an active queue plus an overflow queue that promotes
  on expiry. A shipped precedent for 02's concurrency question, and evidence that "5 seconds"
  is the platform's default rather than my invention
  `[research: https://devforum.roblox.com/t/setcore-sendnotification-help/764252]`.
- `[research: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits]`
  — Roblox documents wrapping data store calls in `pcall()` and retrying internal errors *"with
  exponential backoff"*, and **documents no recovery behaviour at all** — no guidance on kicking,
  messaging or session locking. So 03's ruling is genuinely unspecified by the platform, not a
  deviation from it.
- `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]` and
  `[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`
  — the two sources behind the case-(c) ruling above.
- `[research: repo]`, read this run: `bridge/schema.mjs` (25 keys, `contract()`, `SCHEMA`,
  no `notices`), `game/src/client/Beats.luau` (five empty cue bodies, rank-ordered queue, 0.6 s
  drain, the exclusivity claim), `game/src/server/Persistence.luau` (the read-failure path),
  `architect/sheets/06-representation.md` (no creator for a notice Instance),
  `ui-forge/src/compose/index.mjs` (two patterns; the notice is not a pattern parameter and does
  not go through `validateBrief`).

**Could not fetch, and what would settle it:**

- **`[unverified]`** Whether `PromptGamePassPurchaseFinished` fires for a purchase made on the
  experience details page rather than through an in-game prompt. Two sources describe only the
  in-game path and neither addresses the external one. Settled by the `MarketplaceService`
  reference page's event section stating the trigger explicitly, or by an in-Studio test of a
  live pass bought from the store page. **The ruling above does not depend on it**: R-4 means
  the game never prompts, so even a firing event has no in-game cause to attach to.
- **`[unverified]`** Any duration guidance from Roblox for in-experience messages.
  `create.roblox.com/docs/ui/notifications` returns 404 and the onboarding page *"does not offer
  specific guidance about on-screen messages, notifications, popups … or blocking player input"*
  `[research: https://create.roblox.com/docs/production/game-design/onboarding]`. The WCAG
  threshold and the CoreScript constant are what 01 has; there is no platform number to defer to.
- **`[unverified]`** A reading-rate figure for 8–11-year-olds that would let a dwell be derived
  from word count rather than picked. Two attempts (NN/g timing guidelines) returned material on
  hover delays only. Settled by a literacy-research source giving words-per-minute by age band.
  01 carries its dwell as `[playtest unknown]` with a test range in the meantime.

**`npm run bridge -- --contract` was not executed** — this session has no shell tool. I read
`SCHEMA`, `contract()` and each key's `owner` in `bridge/schema.mjs` directly, which is what
that command prints from, and cross-checked the result against `cid/_contract.md`: 25 keys,
UI/UX owns none of them.

## Scope

Nothing in my subject is priority 2 or priority 3. The daily-reward popup, the login-streak
strip, the code-entry field, the event banner, the timed-offer ribbon and the "come back
tomorrow" line are all things a feedback domain reaches for by reflex, and every one of them is
**named in `notices.forbidden` in order to be forbidden**, which the category gate treats as
information. No sheet reserves space, a slot or a region for any of them.
