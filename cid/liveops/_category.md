# Live Ops — category brief

**Wave:** 7. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `05-OUTWARD.md`. **`OPEN.md §2`
carries the batched live-ops default and it is the line most of you will be arguing with.**

This is an **assignment document.** It contains no Live Ops decisions. Where a decision already
exists it is quoted with its provenance so you do not re-make it; where it does not, it is named
as yours.

---

## What the brief binds for this whole category

| constraint | tag | consequence for Live Ops |
|---|---|---|
| *"This game exists to prove the `arga` pipeline works end to end."* · *"Success is **shipped artifacts, not players**"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | A live-ops plan is measured by whether it is executable and checkable, not by whether it holds an audience. There is no audience. |
| *"**Beating the genre's retention curve. Offered and declined.**"* (`00-CORE.md`, non-goals) | `[brief: binding]` ← `[you chose: R1 Q3]` | **This is the load-bearing line for four of your five domains.** Events, seasons, codes, dailies and streaks are retention instruments. Their purpose is a declined goal, and that decline is binding where the priority-3 list is only soft. Ruling **R-3** already refused an under-scoping finding on exactly this ground. |
| *"Revenue. Offered and declined"* (`00-CORE.md`, non-goals) | `[brief: binding]` ← `[you chose: R1 Q3]` | Nothing you schedule may be justified by what it earns. |
| *"the **smallest game** that still gives every creative area real work"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | A domain that invents a subject to look busy has broken the target. An empty domain with a reason and a check has not. |
| *"**8–14, mobile-heavy, short sessions**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` | The only sizing input in the brief for anything time-shaped, and the reason a moderation position cannot be waved off as unnecessary. |
| **Priority 3, quoted in full:** *"real procedural generation · rebirth · offline accrual · **codes** · **daily rewards** · leaderboards · trading · **seasons and events**"* (`03-META.md`) | `[brief: soft]` ← `[I assumed — the ordering]` | Names four of your subjects directly. **Relay this tag accurately: the ordering was never interviewed** (`OPEN.md §5`, row 7). It is arguable with a reason. What is *not* arguable is the retention non-goal above, which is what actually holds these closed. |
| *"**Ships and settles. No seasons or events.** Note that new authored chunks can be added without touching systems, so extension is cheap if ever wanted."* (`OPEN.md §2`, live-ops intent) | `[brief: soft]` ← `[I assumed — batched]`, **0 interview questions** (`OPEN.md §1`) | The whole of the brief's live-ops direction, at the weakest tag in the ladder. `HANDOFF.md` rates `[I assumed]` *"a starting point, freely arguable."* The second sentence is a statement about **content** extensibility, not a licence to build scheduling machinery. |
| *"Permanent multipliers only. **Never content access.**"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` | Anything you would gate, unlock, grant on a track or hand out for a code is content access wearing a different hat. |
| *"**Cleared is permanent.** Overgrowth never comes back."* (`CONCEPT.md`, `01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose: R2 Q1]` | There is no repeatable state to refresh. A recurring cycle has nothing to reset. |
| *"There is no failure state… **Zero tension is deliberate**"* · *"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`; restated `HANDOFF.md` §4) | `[brief: soft]` ← `[you accepted: step 6 Q2]` | Urgency, expiry, countdowns and limited windows are tension. If you propose one, you are arguing with this line and must say so. |
| *"solve duplicates **without adding a currency**"* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]` | Event currencies, ticket economies and code-granted scrip are all a second currency. Wave 2's `discovery` key hardened this. |
| *"Codes for free boosts, and a group-join reward. Both are near-universal on Roblox incrementals and **their absence reads as an unfinished game**."* | `[research: research/grass-incremental.md]` | Argue with the source, not the sheet. This is the strongest available argument *against* Codes' expected ruling and the Codes lead must engage it rather than omit it. |
| *"10,435 peak to 819 current, **while still being actively updated weekly**… satisfaction is not the same as retention"* | `[research: research/grass-incremental.md]` | The reference shipped weekly updates and lost 92% of its CCU. Roadmap may not assume cadence buys retention. |

### Upstream approved rulings that bind you (not brief — approved sheets, wave 3–6)

Contradicting any of these requires a `## Pushing back` section naming the sheet and its ruling.

| ruling | where | consequence |
|---|---|---|
| **`release` owns the entire mechanics of shipping** — versioning, two environments, the four-row publish checklist, provisioning order, rollback, shutdown, flags. | `cid/tech/deploy/01-the-release-contract.md` | **Everything you schedule ships through it and none of you re-decides any of it.** Its `forbidden[]` already names, by id: `N1` staged rollout by percentage or cohort, `N2` *"any flag keyed to a date, a calendar or a season"*, `N3` any flag whose value changes what content exists, `N10` *"a rollout schedule, a ramp, a canary cohort or a soft launch"*. Its own consequence line to you reads: *"**Roadmap work (Live Ops).** Staged rollout, seasonal flags and content-enablement flags are forbidden here by name; needing one reopens `N1`–`N3` against this sheet."* |
| **A product must exist on the platform before its id can be written into config, and config is emitted from spec sheets.** *"a game pass cannot be created until the experience is published and accessible, and there is no API to create one"* — six ordered gates, publish first. | `release.provisioning`, `products.externalPrerequisite` | Anything you schedule that needs a **new product** inherits a six-gate manual sequence, one gate of which (`n:3`) is blocked on an unanswered Networking question. You do not restate the gates; you cite them. |
| **`endgame` makes the post-terminal state permanent and unbounded**, buries nothing, and forbids 13 named things including `dailyReward`, `seasonPass`, `seasonalEvent`, `redeemCode`, `leaderboard`, `trading`. Its own line: *"**Live Ops and Monetization get an explicit no.** There is nothing here to schedule, sell or refresh, and the thirteen names in `forbidden` are the list to diff a proposal against."* | `cid/gameplay/meta/07-after-the-last-find.md` | Proposing content for the post-terminal state is arguing with an approved ruling. Wave 6 also established that two of three stingers **go extinct** there and no cue replaces them (`music` finding `F1`). |
| **`kpis.cadence` already sets the review rhythm** — a **bounded post-publish window** (daily floor, 14 days `[playtest unknown]`), which *closes*: *"no standing review… OPEN.md section 2: 'Ships and settles. No seasons or events.' There is no live-ops loop to feed."* And: *"no live tuning response exists and none may be invented"* — a breached row produces **a revision request against a named sheet and field**, never a live change. | `cid/analytics/kpis/02-the-shortlist.md` | **No domain may publish a second review cadence.** A roadmap trigger that reads a number must read one `kpis` already owns. |
| **Nothing in the game is measured.** Zero `AnalyticsService` / `LogService` calls in 29 modules; **five of eight KPI rows are `readableToday: false`**; `Types.luau`'s `StoredState` carries no timestamp, session id or run ordinal. | `kpis`, `telemetry`, `funnels` (wave 5, verified) | **A trigger conditioned on an analytics reading is specifying against an instrument that does not exist.** If you write one, carry `readableToday: false` and a `blockedBy` naming the work, exactly as `kpis` does. Do not assume a dashboard. |
| **There is no in-game announcement surface.** `notices` carries **two beat members** (`setComplete`, `areaComplete`) and **one `system` member** (`saveNotLoaded`, which reports a failed save read). **State it as a predicate over `notices.members`, never as a count: no member announces anything the game is doing, at whatever length that list reaches.** A member count went stale in four Live Ops files inside one wave when `ui-ux/feedback/03` added the third. `products` `F19`: *"No product is named, shown, priced or referred to anywhere inside the game"*; `release.shutdown.playerFacing`: *"nothing"*. | `cid/ui-ux/feedback/01-the-notice-channel.md`, `cid/ui-ux/feedback/03-system-notices.md`, `cid/gameplay/monetization/01-the-offer-ladder.md` | Nothing you schedule can be told to a player **inside the game**, including that it happened. |
| **There is no in-game text entry, and no social prompt.** `products` `F15`: *"No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game."* Check: *"zero `TextBox` instances in any screen."* | `products.forbidden[F15]` | This closes the redemption surface for Codes and the intake surface for Community by a checkable grep, independently of priority 3. |
| **Chat is off on all three surfaces** (window, bubble, voice) and *"no replicated payload containing a player identifier other than the recipient's"* (`social` `X7`). `release` `N6` forbids `MessagingService` fan-out of any value. | `cid/gameplay/social/01`, `/03` | No player-to-player channel exists to moderate, and no cross-server broadcast exists to schedule into. |
| **There is no in-game store.** Ruling **R-4**; `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, every `gamePassId` is `null`. | `cid/gameplay/monetization/01`, `cid/ui-ux/store/01-no-in-game-offer-surface.md` | A paid track, an event bundle or a code-granted product has no surface to be sold or shown on, and the one existing SKU is unownable until a manual provisioning step runs. |
| **The game has been played once, by the developer, `n = 1`, untimed.** *"No purchase was made against a real game pass… Nothing past area 1 was observed… No second player was present."* | `cid/_playtest.md` | This is the entire empirical record. It is also, today, the only feedback intake that exists — which is Community's problem and Community's opportunity. |
| **`game/src/shared/GameConfig.luau` and `game/src/shared/Types.luau` are generated files.** `GameConfig.luau:3` reads *"GENERATED FILE — do not edit … Emitted from CID spec sheets by `npm run bridge -- --emit`"*. Promoting one key into `bridge/schema.mjs` moved it by 68 lines inside wave 7 and falsified four acceptance criteria across three sheets nobody had touched. | the emitter; `bridge/schema.mjs` | **Never cite either file by line number.** Cite the field path (`products.ownershipCheck`) or the matched text (the line matching `overridesPlatformDefault`). The same applies to `game/src/shared/Screens/*.luau`, which ui-forge emits. `npm run cid:verify` warns on a line pin into a generated file. |

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> *"real procedural generation · rebirth · offline accrual · **codes** · **daily rewards** ·
> leaderboards · trading · **seasons and events**"*

**No domain in this category may name, imply, reserve space for, stub, describe, schedule or
build fiction around any of the eight.** Naming one **in order to forbid it** is compliant and is
the expected form here — that is what `endgame.forbidden`, `products.forbidden` and
`release.forbidden` all do. Leaving room for one is not compliant. A reserved slot, an empty
track, a placeholder calendar field or a "for a future update" note is a violation even when the
value is empty; `tech/deploy/02` settles the general case — *an explicit null and a never-emitted
key are the same bytes.*

**Two things about this gate you must relay accurately and not smooth over:**

1. **The list's ordering is `[I assumed]`** (`OPEN.md §5`, row 7: *"resolved via R4/R5 but no
   explicit priority list interviewed"*). Three of its members are harder than the list —
   `rebirth` `[you chose: R2 Q2]`, real procgen `[you chose: R5 Q1]`, offline accrual follows
   `[you chose: R2 Q1]`. **Codes, dailies, leaderboards, trading, seasons and events are not
   among the hardened three.** Do not upgrade them to binding because they sound settled.
2. **What actually holds them closed is `00-CORE.md`'s binding retention non-goal**, upheld by
   ruling R-3. If you overrule the soft line, you still have to clear the binding one, and no
   sheet in this category has an argument that does.

---

## Domain assignments

Five leads. **Every sheet carries a `manifest` block, or states in one line why its subject has
no data form and names the key it would need.** Run `npm run cid:verify -- --category liveops`
before any verifier agent. `npm run cid:pack -- --domain liveops/<d> --brief
concept/spec/incremental-spinoff-v2` gives you your context; `cid/_digest.md` gives you every
decision made in waves 1–6 without opening 200 sheets.

**The standard, and it is not "write less".** Wave 6's `cid/audio/music/01-whether-music-exists.md`
ruled `trackCount: 0` and is the model: it named the brief line it overruled with its tag and its
question count, gave 15 forbidden forms each with the approved sheet that closes it and an
**observable that is a count**, priced the reversal, **refused to rest the ruling on an unsourced
premise** and went and found the survey instead, and when its own grep undercounted it published
*why the pattern missed* and marked its table a **floor, not a total**.
`cid/audio/stingers/03-subjects-with-no-cue.md` did the same for four of its node's five
subjects — recorded absent, each with the sheet that empties it, rather than dropped.
`cid/ui-ux/store/01-no-in-game-offer-surface.md` is the same shape for a UI surface that does not
exist. **An empty key with a reason and a check is data. Silence is not.**

---

### 01 · Roadmap Lead → `cid/liveops/roadmap/_lead.md`

**Owns** (graph): update cadence · contents of each planned update · dependency order between
updates · scope guardrails per drop.
**Does not own:** limited-time content (Events) · *how* anything ships (`release`, wave 5) · how
anything is announced externally (Discovery & Marketing) · what a lap or an area contains
(`depths`, `layout`) · any tuning value (Balance).
**Expected key: `roadmap`.** No key exists for what ships after v1; propose one.

**Latitude: the widest in this category, and still narrow.** You are the only domain whose
subject is not named in priority 3. The brief hands you a next-drop list already written:

> **Priority 2 — after it works:** *"richer authored chunk variety · a duplicate-handling
> refinement · visitable restored ruins."* (`03-META.md`) `[brief: soft]` ←
> `[I assumed — the ordering]`

and one asymmetry stated twice:

> *"permanent clearing plus endless shuffled areas means new content can be added as new authored
> chunks **without touching existing systems**. This design is unusually easy to extend, which is
> a live-ops advantage nobody asked for."* (`05-OUTWARD.md`) `[brief: soft]` ← `[I assumed]`

**Already settled — do not re-decide:**

- Every mechanism of shipping. `release` holds environments, the four-row publish checklist
  (`P1`–`P4`, two with **no read-back at all**), the six provisioning gates, rollback as a
  republish, the 15-minute restart delay, and exactly one permitted flag class (a hotfix
  kill-switch, `lifetimeReleases: 1`). Cite it; restating it is a second answer.
- The review rhythm. `kpis.cadence.game` is a bounded window that **closes**, and
  `kpis.verdictRule` makes a breached row produce **a revision request against a named sheet and
  field, never a live change**. A roadmap that responds to a reading responds by editing a sheet
  and re-releasing.
- Scope. **Ruling R-3**: the game is not expanded past eight areas; the under-scoping finding
  (DIG ships two islands against a 601-item collection; this collection completes at minute 11)
  is **recorded and declined** because *"the under-scoping argument is a retention argument, and
  that argument is closed in this project."*
- The post-terminal state. `endgame` is unbounded and buries nothing; adding content there
  contradicts an approved sheet.

**Genuinely open, and yours:**

- **Whether a roadmap exists at all**, and if so whether it is an *ordered sequence with no dates*
  or nothing. `release` `N2` forbids date-keyed flags; nothing forbids an ordering. That
  distinction is yours to draw and to make checkable.
- Whether `03-META.md`'s priority-2 list is a roadmap or merely a deferral list, and whether
  "visitable restored ruins" survives contact with `social` (co-presence expires ~39 studs into a
  3,000-stud lane; `scope: "spawnMomentOnly"`).
- What a "drop" is: a content unit, or a `release` version. **Only one of those two words is
  already owned.**
- The scope guardrail per drop — the thing that stops a drop from re-opening R-3.
- **What triggers anything.** This is your hardest item and it is a gap, not a decision: see G5
  and G6 below. If your trigger reads a number, carry `readableToday: false` and a `blockedBy`,
  the way `kpis` does. Do not write a trigger that assumes a dashboard.

---

### 02 · Events Lead → `cid/liveops/events/_lead.md`

**Owns** (graph): event concepts · duration and timing · exclusive rewards · entry requirements ·
post-event handling of unspent currency.
**Does not own:** recurring multi-week cycles (Seasons) · the price of anything (Monetization) ·
the publish that would carry an event (`release`).
**Expected key: `events`. I expect it to be empty** — `eventCount: 0` with the rulings that empty
it, the cost of the other answer, and a check. That expectation is not an instruction; it is what
the evidence below looks like from here, and if you can break it, break it in a `## Pushing back`.

**Constraints that specifically apply:**

- Priority 3 names *"seasons and events"* — `[brief: soft]` ← `[I assumed — the ordering]`.
- `OPEN.md §2`: *"Ships and settles. No seasons or events."* `[brief: soft]` ← `[I assumed]`, **0
  interview questions**.
- `00-CORE.md`: *"Beating the genre's retention curve. Offered and declined."* `[brief: binding]`.
  **This is the one you have to beat, not the two soft ones.**
- `02-GAMEPLAY.md`: *"Zero tension is deliberate"* — a limited window is tension with a clock on it.
- Approved sheets that already forbid your subject by name: `endgame.forbidden` (`seasonalEvent`),
  `release.forbidden` `N2` (*"any flag keyed to a date, a calendar or a season"*), `N3`, `N10`,
  `kpis.verdictRule.forbiddenActions` (*"an event calendar"*), `music` `M12` (*"a track keyed to a
  date, holiday or live event"*).
- **The sequencing finding is yours specifically.** If any event you propose needs a new product,
  it inherits `release.provisioning`'s six gates: publish → checklist → **the unanswered Networking
  re-resolution question** → create the pass manually → paste the id into the owning *spec sheet*
  → republish and restart. A limited-time offer whose id cannot exist until after a manual publish
  is not limited-time.
- Your node owns *"post-event handling of unspent currency."* At zero events that check is
  **vacuous, and you must say so in one line rather than leave a verifier to guess** — the
  category's graph check requires *"every event reward has a source system and a post-event
  handling rule for unspent currency."* An empty set satisfies it; state that it does.

**Genuinely open:** the ruling itself, its cost stated honestly (what this game loses by having no
event), and the reversal path — what the cheapest possible event would cost given no store, no
notice channel, no chat, no second currency, and no instrument to tell whether it worked.

---

### 03 · Seasons Lead → `cid/liveops/seasons/_lead.md`

**Owns** (graph): season length · reward track tiers · free vs paid track · season reset rules ·
carry-over and legacy rewards.
**Does not own:** the price of a paid track (Monetization) · one-off limited content (Events).
**Expected key: `seasons`. I expect it to be empty**, on the same evidence as Events plus three
that are yours alone.

**Constraints that specifically apply, beyond the shared set:**

- **A season resets; this game does not.** *"Cleared is permanent"* `[brief: binding]` ←
  `[you chose: R2 Q1]`, and rebirth was cut `[you chose: R2 Q2]`. `01-FOUNDATION.md` and
  `HANDOFF.md` §2: *"Do not reintroduce them."* A season reset is the cut mechanic with a
  calendar attached.
- **A paid track has no surface and no vehicle.** Ruling R-4 removed the in-game store;
  `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, `F18` forbids *"subscription…
  recurring charge… benefit gated on Roblox Premium"*, `F19` forbids naming any product in the
  game at all.
- **A reward track is content access.** *"Permanent multipliers only. **Never content access.**"*
  `[brief: soft]` ← `[you accepted: R5 Q4]`, and `03-META.md`'s reason: *"A paid-only object would
  turn 100% completion into a purchase, which poisons the differentiating system."*
- `endgame.forbidden` names `seasonPass` outright.
- **The seam with Events is duration and recurrence, and it is stated once.** Do not restate
  Events' ruling in your own words; cite it and rule on what is yours — the recurring, tiered,
  resetting structure.

**Genuinely open:** the ruling and its cost, and one thing worth your attention that nobody else
holds — whether the **set-completion ladder** (`setBonus`, four sets, four permanent grants) is
already the reward track this game has, in which case a season track is a second one. State that
as a finding if you find it; do not redesign `setBonus`.

---

### 04 · Codes Lead → `cid/liveops/codes/_lead.md`

**Owns** (graph): code types and rewards · issuance cadence and triggers · expiry and redemption
limits · abuse prevention · where codes are published.
**Does not own:** the social channels codes would be posted to (Discovery & Marketing — Social).
**Expected key: `codes`. I expect it to be empty** — and yours is the ruling with the **strongest
counter-evidence in this whole category**, which is why it must be argued rather than asserted.

**Constraints that specifically apply:**

- Priority 3 names *"codes"* directly — `[brief: soft]` ← `[I assumed — the ordering]`.
- **`products` `F15` closes the surface independently of the scope gate**, with a grep:
  > *"No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt,
  > anywhere in the game."* — check: *"zero `TextBox` instances in any screen; zero strings match
  > `/code|group|favou?rite|follow|rate us|share/i`"*
- `input` is a **closed five-verb list** and R-1 records how hard one pressable was to add: the
  walk-into-pad alternative failed on 10.6 s and 13.0 s round trips and needed ~25 pad clusters
  to stay under a 3-second tick ceiling. A text-entry verb is a larger ask than that one was.
- *"solve duplicates without adding a currency"* — a code-granted boost or scrip is a currency or
  a modifier, and `modifiers` owns the resolution order either way.
- `endgame.forbidden` names `redeemCode`.

**The argument against your expected ruling, which you must engage and not omit:**

> *"Codes for free boosts, and a group-join reward. Both are near-universal on Roblox incrementals
> and **their absence reads as an unfinished game**."* `[research: research/grass-incremental.md]`

`HANDOFF.md`: *"sourced fact — argue with the source, not the sheet."* So argue with it: whose
reading is "reads as unfinished", against a project whose success is *"shipped artifacts, not
players"* `[brief: binding]`, and is the claim sourced to anything measurable or to a guide's
impression? **Following `music`'s standard, if the premise your ruling would rest on is
unsourced, go and check it rather than assert it.**

**Genuinely open:** the ruling; whether the research line is strong enough to reopen a soft brief
line (it is the best candidate in this category, and it still has to clear a binding non-goal);
and the reversal cost priced in build terms — a `TextBox`, a verb, a server validator, an abuse
model, and a publication channel the brief does not have (see G1).

---

### 05 · Community Lead → `cid/liveops/community/_lead.md`

**Owns** (graph): feedback intake channels · triage and response process · moderation policy and
escalation · ban and appeal handling · community roles.
**Does not own:** outbound marketing posts (Discovery & Marketing — Social) · in-game social
mechanics (`social`, wave 2) · what a notice may say (`notices`, wave 5).
**Expected key: `community`. I do not expect this one to be empty**, and it is the domain most
likely to be under-served by accident. **Priority 3 does not name moderation, feedback or
community management.** Nothing in the brief excludes your subject. What has happened instead is
that every *surface* your subject would act on has been closed by a different sheet, which is a
derivation you must perform and check rather than assume.

**Constraints that specifically apply:**

- **Every in-game intake surface is already closed.** `F15` (no like/follow/group-join/rate-us/
  share prompt, zero `TextBox`); **no member of `notices.members` accepts input or reaches a
  person** — two beat members (`setComplete`, `areaComplete`) and one `system` member
  (`saveNotLoaded`, a failed save read), and that predicate rather than a count is what closes the
  intake surface; `release.shutdown.playerFacing: "nothing"`.
- **Every player-to-player channel is already off.** `social.chat`: window `false`, bubble
  `false`, voice `false`, *"overridesPlatformDefault: `ChatWindowConfiguration.Enabled` defaults
  to true"*; `social` `X7` forbids *"any replicated payload containing a player identifier other
  than the recipient's"*; `social/03` — nothing passes between two players beyond sight and sound
  of their own work. **There is no UGC in this game**: no names, no builds, no trades, no chat.
- **But two publish-checklist rows are unasserted and one is a moderation surface.**
  `release.publishChecklist` `P4` (voice chat) has `readableBack: "none"` — *"an unmoderated audio
  channel exists between players, against `social.chat.voice: false`"* — and `P3` (`ChatVersion`)
  is `[unverified]`. **The absence of a moderation problem currently rests on two human ticks.**
  That is a real finding for your domain and you own stating it; you do not own the checklist.
- **The age band is binding.** *"8–14, mobile-heavy"* `[brief: binding]` ← `[you chose: R1 Q4]`.
  A policy that resolves to "the platform defaults are sufficient" must **name which defaults and
  cite them** — `social/01` left exactly this open: `[research owed: Roblox's chat-settings policy
  page or the parental-controls documentation… plus the `TextChatService` reference rendered with
  its default column]`. That research is owed and nobody has paid it.
- **`cid/_playtest.md` already is the intake channel**, and it exists because Analytics found the
  gap: *"The pipeline had no artifact type for an empirical reading… the 2026-08-01 session
  existed only in a chat log, so no agent could cite it and no verifier could check a design claim
  against it."* One reading, `n = 1`, the developer, untimed. Three defects came out of it, one
  still **unresolved** (the 1/2/3 keypress report). Whether that file *is* the feedback process
  for this project is a live question and it is yours.

**Genuinely open:** whether a moderation policy for this game is a derivation ("zero surfaces,
here is the check") or a real document; what a report or a defect does when there is no channel to
receive it and one developer to act; whether `cid/_playtest.md` is the answer to "feedback intake"
and what its triage rule is; community roles (there are no roles — say so with the sheet that
empties it); and the ban/appeal position, which the platform holds and you must cite rather than
invent.

---

## The operable surface, enumerated once

**Everything that could be scheduled, changed, granted or communicated after launch.** Partition
this list; do not each invent your own. `live` = permitted and someone may act on it. `dormant` =
not forbidden, but blocked on something that does not exist yet. `forbidden` = closed, with the
line that closes it. **Rows marked "not ours" are enumerated so that no lead claims them.**

| # | operable thing | state | closed / gated by | whose |
|---|---|---|---|---|
| 1 | Code hotfix: re-emit, republish, restart | **live** | `release.rollback` — fully specified | not ours (`tech/deploy`) |
| 2 | Executing the four-row publish checklist `P1`–`P4` | **live** | `release.publishChecklist`; `P3`/`P4` have no read-back | not ours; **Community** states the `P4` moderation consequence |
| 3 | Version restore + server restart (15 min, range 1–60) | **live** | `release.rollback` | not ours |
| 4 | New authored chunks / richer chunk variety | **live** | `05-OUTWARD.md` *"extension is cheap if ever wanted"* `[brief: soft]`; `03-META.md` priority 2 | **Roadmap** |
| 5 | A duplicate-handling refinement | **live** | `03-META.md` priority 2; constraint *"without adding a currency"* | **Roadmap** (order only; `discovery` owns the mechanism) |
| 6 | Visitable restored ruins | **live**, contested | priority 2; but `social` co-presence expires ~39 studs into a 3,000-stud lane | **Roadmap** |
| 7 | Growing the collection past 24 (e.g. 4×12) | **dormant** | `meta/04` `## Flagged` offers it; **R-3 declined expansion**; needs a developer ruling | **Roadmap** names it as blocked; does not decide it |
| 8 | Areas past 8 / post-terminal bays | **forbidden** as content | `endgame` — unbounded already, buries nothing, *"Live Ops and Monetization get an explicit no"* | nobody |
| 9 | Live tuning of any balance value | **forbidden** | `kpis.verdictRule` — *"no live tuning response exists and none may be invented"*; a breach yields a revision request against a sheet | nobody |
| 10 | Creating a **new** game pass / dev product | **dormant** | `release.provisioning` six gates; gate 3 blocked on an unanswered Networking question; `products.itemCount: 1`, `devProductCount: 0` | **Events**/**Seasons** cite it; Monetization owns the SKU |
| 11 | Price change on the existing SKU (349–999) | **live** | `products` — *"`priceRobux` may move anywhere inside 349–999 with no revision"* | not ours (Monetization/Balance) |
| 12 | Feature flags | **forbidden** but one | `release.flags.permittedClasses: ["hotfixKillSwitch"]`, `lifetimeReleases: 1` | not ours |
| 13 | Staged rollout, ramp, canary, soft launch, A/B bucket | **forbidden** | `release.forbidden` `N1`, `N4`, `N10` | nobody |
| 14 | Any flag keyed to a date, calendar or season | **forbidden** | `release.forbidden` `N2` | nobody |
| 15 | Limited-time event | **forbidden** | priority 3 `[brief: soft]`; `OPEN.md §2` `[brief: soft]`; `00-CORE.md` retention non-goal `[brief: binding]`; `endgame.forbidden[seasonalEvent]` | **Events** rules it |
| 16 | Season / reward track / battle pass | **forbidden** | same, plus *"Cleared is permanent"* `[brief: binding]` and `endgame.forbidden[seasonPass]` | **Seasons** rules it |
| 17 | Daily reward, login streak, return bonus | **forbidden** | priority 3 *"daily rewards"*; `endgame.forbidden[dailyReward]`; `kpis.verdictRule.forbiddenActions` | **Roadmap** notes it; nobody builds it |
| 18 | Promo codes / redemption | **forbidden** | priority 3 *"codes"*; `products` `F15` (grep-checked); `endgame.forbidden[redeemCode]` | **Codes** rules it |
| 19 | Group-join, like, follow, favourite, rate-us, share reward | **forbidden** | `products` `F15` | **Codes** (grant side), **Community** (channel side) |
| 20 | Leaderboards, comparative figures, any player-vs-player number | **forbidden** | priority 3; `social` `X7`; `kpis.verdictRule.forbiddenActions`; `theme/tone/04` `X10` | nobody |
| 21 | Trading / gifting | **forbidden** | priority 3 | nobody |
| 22 | In-game announcement of anything (update, event, downtime) | **forbidden** | no member of `notices.members` announces anything the game is doing — two beats plus one `system` member, `saveNotLoaded`; `products` `F19`; `release.shutdown.playerFacing: "nothing"` | **Roadmap** states the consequence |
| 23 | Chat, server message, cross-server broadcast | **forbidden** | `social.chat` off ×3; `release.forbidden` `N6` (`MessagingService`) | **Community** states it |
| 24 | Maintenance / lockout notice | **forbidden** | `release.forbidden` `N8` — *"there is no permitted surface to explain one"* | nobody |
| 25 | Off-Roblox channels (group, Discord, socials) | **absent — not forbidden, not stated** | **the brief states no off-Roblox presence anywhere.** The category's own graph check reads *"every channel referenced exists in the brief's stated off-Roblox presence"* — the referent is empty | **G1**; **Community** rules, Marketing — Social consequence |
| 26 | Store-page update notes, `[UPDATE]` title tags, icon/thumbnail variants | **live** | Marketing's Name / Store Page / Icon / Thumbnails leads own these by name | **not ours** — `does_not_own`: *"How anything is announced externally"* |
| 27 | Analytics review rhythm | **live, already owned** | `kpis.cadence` — bounded window, daily floor, closes | **not ours**; no second cadence may be published |
| 28 | Instrumenting anything (the roadmap trigger problem) | **dormant** | zero analytics calls in `game/src`; 5 of 8 KPI rows `readableToday: false` | **G6**; **Roadmap** carries `blockedBy` |
| 29 | DataStore migration / store-name bump | **live, owned** | `storeMigration` / `persistence`; `release` states when it may ship and that *"an unexercised migration is a publish blocker"* | not ours |
| 30 | Moderation, ban, appeal, community roles | **dormant** | no UGC, no chat, no player payload — but `P4` voice has **no read-back** and the age-default research is owed | **Community** |

---

## Domains judged thin for this game, and why that is stated rather than silent

**None of the five is dropped.** All five run, all five produce a key, and three of those keys are
expected to be empty. Verification should read this section so a deliberate absence is not
mistaken for a gap.

| domain | expectation | the ruling that empties it |
|---|---|---|
| **Roadmap** | **Thin, not empty.** One or two sheets. It is the only domain here with live subject matter, and most of what a roadmap normally holds (how, when, with what flags) is already `release`'s. | Nothing empties it. What *shrinks* it: `release` owns all shipping mechanics; `kpis.cadence` owns the review rhythm and closes it; **R-3** declines expansion; `endgame` closes the terminal state; and no instrument exists to trigger a drop. |
| **Events** | **Empty. `eventCount: 0` expected.** | `03-META.md` priority 3 *"seasons and events"* `[brief: soft]`; `OPEN.md §2` *"Ships and settles"* `[brief: soft]`, 0 questions; **`00-CORE.md` *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]`** — the one that actually holds; `endgame.forbidden[seasonalEvent]`; `release.forbidden` `N2`/`N3`/`N10`; `kpis.verdictRule.forbiddenActions`. |
| **Seasons** | **Empty. `seasonCount: 0` expected.** | All of the above, plus *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]` (a season resets; nothing here does), rebirth cut `[you chose: R2 Q2]`, `products.storeExists: false` + R-4 (a paid track has no surface), *"never content access"* (a reward track is content access), `endgame.forbidden[seasonPass]`. |
| **Codes** | **Empty. `codeCount: 0` expected — and the most contested of the three.** | `03-META.md` priority 3 *"codes"* `[brief: soft]`; `products` `F15` (grep-checked, closes the surface independently of scope); `input` closed at five verbs; `endgame.forbidden[redeemCode]`. **Counter-evidence that must be engaged, not omitted:** `[research: research/grass-incremental.md]` — *"their absence reads as an unfinished game."* |
| **Community** | **Thin but genuinely non-empty, and the one most at risk of accidental under-service.** Priority 3 does not name it. | Nothing empties it. Its *surfaces* are closed elsewhere: `F15`, `notices` (no member accepts input or announces), `social.chat` off ×3, `social` `X7`, no UGC. **Two live items remain:** `release.publishChecklist` `P4` (voice, `readableBack: "none"`) means the absence of an unmoderated audio channel rests on a human tick; and `cid/_playtest.md` is a real, existing feedback artifact with an unresolved defect in it. |

**Subagent counts are the leads' to set,** but a domain ruling zero should expect **one** sheet,
not four — the wave-1 failure mode was 6,297 lines of prose with no data form, and four sheets
saying nothing four times is that failure with a different subject.

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

| # | gap | who decides |
|---|---|---|
| **G1** | **The brief states no off-Roblox presence anywhere** — no group, no Discord, no social account, in any of five layer sheets, `OPEN.md` or `research/`. The category's own verification check (*"every channel referenced exists in the brief's stated off-Roblox presence"*) therefore has an **empty referent**, which means it currently passes vacuously rather than meaningfully. Codes has nowhere to publish; Community has nowhere to intake. | **Community** rules on intake; **Codes** cites it as part of its reversal cost. Consequence for **Discovery & Marketing — Social**, which is where a channel would be created and which is not mine to assign. |
| **G2** | **Priority 3's ordering was never interviewed** (`OPEN.md §5` row 7; `03-META.md`'s own bracket: *"[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1 but no explicit priority list interviewed]"*). Four of this category's five domains are closed, in part, by a line at the weakest tag in the ladder. | **Events, Seasons, Codes** each state the tag honestly and rest their ruling on `00-CORE.md`'s binding non-goal instead. None may upgrade the soft line to binding. |
| **G3** | **Live-ops intent is a batched default at 0 interview questions** (`OPEN.md §1`, row `O / live-ops intent`). This is structurally identical to the *"Music sparse and low"* line wave 6 overruled — same tag, same question count, same batching. The difference is that `music`'s overrule *reduced* scope; any overrule here would *increase* it, against a binding non-goal. | **Roadmap**, as the domain whose whole subject that sentence is. |
| **G4** | **No moderation, ban, appeal, or age-based-communication position exists anywhere in the brief.** Integrity is the brief's own least-defensible item — *"it was never asked and never confirmed"* (`OPEN.md §1`) — and it explicitly scopes itself to the economy and the collection: *"Nothing else applies: no trading, leaderboards, or PvP in scope."* `social/01` left the platform's age-based communication default `[research owed:]` and ruled around it. | **Community**, which must cite the platform default rather than invent a policy, and pay the owed research or restate it as owed. |
| **G5** | **Nothing states what triggers a post-launch change.** `kpis.cadence` closes the review window; `kpis.verdictRule` forbids a live tuning response; `release` says a hotfix is code-only. No sheet says what re-opens the project, or whether it re-opens at all once the window shuts. | **Roadmap.** |
| **G6** | **Nothing in the game is measured.** Zero `AnalyticsService`/`LogService` calls across 29 modules; five of eight KPI rows `readableToday: false`; `StoredState` carries no timestamp, session id or run ordinal. A roadmap trigger conditioned on a reading is specifying against an instrument that does not exist. | **Roadmap**, which must carry `readableToday: false` + `blockedBy` on any such trigger rather than assume a dashboard. |
| **G7** | **Monetization has no priority slot.** `monetization/01` flagged it: *"`03-META.md`'s three priority lists contain neither a store nor a pass."* So a roadmap that would order a second SKU has no priority ordering to order it by. | **Roadmap** records it; the scope-ordering escalation is the developer's. |
| **G8** | **The working name is a placeholder** (`OPEN.md §3`: *"`incremental-spinoff-v2` is a slug, not a name"*), so an update title-tag convention has no stem to attach to. | **Not ours** — Discovery & Marketing — Name owns *"title-tag conventions for updates (`[UPDATE]`, `[X2]`)"*. Recorded here as a consequence so Roadmap does not fill it. |

---

## What this category forces elsewhere

Stated as consequences, not as assignments.

- **Discovery & Marketing (wave 7 sibling).** If Community rules that no off-Roblox channel
  exists, its Social and Hype leads inherit an empty channel set; if Marketing creates one, it
  becomes a surface Community must have a policy for. **G1 lands in both categories and neither
  can close it alone.** Its Icon and Thumbnails leads own *"seasonal and event variants"* by
  name — Events and Seasons ruling zero removes the referent for that half of their subject.
- **Tech & Data — Deploy.** If any domain here needs a mechanism `release.forbidden` closes, that
  reopens `N1`–`N3` against an approved sheet and requires a `## Pushing back`, per `release`'s
  own consequence line to Roadmap.
- **Analytics.** A roadmap trigger that names a reading adds a consumer to an unimplemented
  instrument. `kpis` rows already carry `blockedBy` for exactly this; do not add a second cadence
  or a second target for a counter `kpis` owns.
- **Contract-and-seam work.** Five new keys are proposed by this category (`roadmap`, `events`,
  `seasons`, `codes`, `community`), of which three are expected to be empty. An empty key still
  needs a shape in `bridge/schema.mjs`; `music.trackCount == len(music.tracks)` is the pattern for
  what a useful invariant on an empty key looks like.
