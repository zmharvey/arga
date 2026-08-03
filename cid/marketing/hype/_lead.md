# Hype — domain index

**Category:** Discovery & Marketing · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`,
`00-CORE.md`, `03-META.md`, `05-OUTWARD.md`, `OPEN.md` (§1–§5) · `cid/marketing/_category.md` ·
`cid/liveops/_category.md` · `cid/_contract.md` · `cid/_state.md` ·
`cid/tech/deploy/01-the-release-contract.md` · `cid/gameplay/monetization/02-what-is-never-sold.md`
· `cid/ui-ux/feedback/01-the-notice-channel.md` · `cid/audio/music/01-whether-music-exists.md`
(house form for an empty key) · `game/src` (grep) · `docs/cid-workflow.json` (my node, verbatim)

> **Revised, round 2.** Two things changed and neither is a decision. **(1) The row-id pin is
> gone.** `RR-H1` now asks for *a new `publishChecklist` row, id assigned by `release`* and states
> its effect as *at least one row beyond `P4`* — no id named, no absolute post-acceptance count
> asserted, in either file. Four requests are live against one four-row checklist (`RR-H1`,
> `RR-C1`, `RR-T1`, and `marketing/icon/01`'s unnumbered ask) and only `release` can see all four,
> so only `release` numbers them. `liveops/community/02` has since withdrawn the id its own ask
> once named, so the sentence that stood here citing that ask as settled arithmetic was citing a
> withdrawn request. **(2) `H5` is closed.** Live Ops — Roadmap ran and ruled; sheet 01 answers the
> outward half instead of deferring it. `beatCount` is unchanged at **1**. Re-read on disk this
> round: `tech/deploy/01` (four rows `P1`–`P4`, AC1 asserts four), `liveops/community/02`,
> `liveops/roadmap/01`, `marketing/store-page/05`, `marketing/thumbnails/02`, `marketing/icon/01`,
> `game/src/shared/Theme.luau`, and `grep -rn "HttpService" game/src` (zero).

**One sheet. One proposed key: `launchBeats`.** Four of my node's five subjects are empty, and the
fifth — the publish moment's outward half — is real, sequenced, and owned by nobody else.

---

## What the brief gave me

| line | tag | what it does to this domain |
|---|---|---|
| *"**Beating the genre's retention curve.** Offered and declined."* · *"**Revenue.** Offered and declined."* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | Closes **re-engagement pushes to lapsed players** by name. Ruling **R-3** already declined an under-scoping finding on exactly this ground: *"the under-scoping argument is a retention argument, and that argument is closed in this project."* |
| *"Success is **shipped artifacts, not players**."* · *"the **smallest game** that still gives every creative area real work."* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | A beat exists because the platform requires it or because something outward changes state. Not because a launch is supposed to have a plan. |
| *"content design is the primary creative work on this project, not art or **marketing**."* `00-CORE.md` | `[you chose: R1 Q1]` → **`[brief: binding]`** | Relayed exactly. Be cheap. |
| *"**8–14**, mobile-heavy, short sessions."* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | The audience band is what disqualifies the one real re-engagement mechanism the platform offers (13+, below). |
| *"**Ships and settles. No seasons or events.**"* `OPEN.md §2` | `[I assumed — batched]`, **0 interview questions** (`OPEN.md §1`) → `[brief: soft]` | The drop structure my `owns` list is built around. Soft and overridable **with a reason** — but the reason may not be seasons, which priority 3 closes hard, and `05-OUTWARD.md` says so itself. |
| **Priority 3:** *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · **seasons and events**"* `03-META.md` | `[I assumed — the ordering]` → `[brief: soft]`, hard as a gate | **No beat, teaser or countdown whose subject is a seasonal or event drop.** Naming it to forbid it is compliant; holding a slot for one is not. |
| *"**Tension is zero by design**, confirmed deliberately."* `HANDOFF.md` #4 / `02-GAMEPLAY.md` | `[brief: binding]` on the instruction | A countdown is tension with a clock on it. |
| *"Left open — the name, icon, thumbnail composition, and store description."* `05-OUTWARD.md` | — | **`05-OUTWARD.md` is my layer sheet and it contains no publish sequence, no beat, no trailer and no announcement of any kind.** Its live-ops half defers to `OPEN.md §2`. That silence is gap **H1**. |
| *"new content can be added as new authored chunks **without touching existing systems** … a live-ops advantage nobody asked for."* `05-OUTWARD.md` | `[I assumed]` → `[brief: soft]` | A statement about content extensibility, not a licence to build announcement machinery. It is **Roadmap's** line, not mine. |

### Approved sheets that empty or bound this domain before I enumerate anything

- **`release` (`cid/tech/deploy/01`)** owns the publish moment's **inward** half whole: two
  environments, the four-row checklist `P1`–`P4` (two rows with **no read-back at all**), six
  ordered provisioning gates (publish → checklist → the unanswered Networking question → create
  the pass manually → paste the id into the owning spec sheet → republish and restart), rollback as
  a republish, and one permitted flag class. Its `forbidden[]` closes my countdown twice over:
  **`N2`** *"any flag keyed to a date, a calendar or a season"*, **`N10`** *"a rollout schedule, a
  ramp, a canary cohort or a soft launch"*, **`N1`** staged rollout, **`N4`** A/B buckets.
  **`release.shutdown.playerFacing` is `"nothing"`.** Its row **ids and its row count are its
  own**: my sheet asks for a row and numbers none.
- **`notices` (`cid/ui-ux/feedback/01`)** — *"**Exactly two** of `response`'s five beats produce
  one"*, `setComplete` and `areaComplete`, both beats, and no notice may carry a non-beat. There is
  no in-game surface on which any announcement of mine could land.
- **`products` `F15`** — *"no like, favourite, follow, group-join, rate-us or share prompt, anywhere
  in the game"*, grep-checked. **`F19`** — no product named or referred to inside the game.
  **`F10`** bans the timer, countdown, expiry, *"limited"*, *"ends in"* and *"today only"* inside
  the game; `T10` and platform guidance close the same claim outward.
- **`social` / `social.chat`** off on all three surfaces; `release` `N6` forbids `MessagingService`.
- **Category ruling `T8` + `G2`** — `game/src/shared/Theme.luau` ships `archetype =
  "cartoon-vibrant"`, `sourceTitle = "Pet Ascend Simulator"` against a brief naming
  `fantasy-ornate` three times. **A trailer is captures in sequence, so it inherits the capture
  precondition wholesale.**
- **Sibling Social** concludes an empty channel set. **A teaser with no channel is not a teaser.**

---

## What the brief did not give me

Each routed to the sheet or the kind of work that must decide it.

| # | gap | routed to |
|---|---|---|
| **H1** | **The brief describes no publish moment at all.** `05-OUTWARD.md` gives a hook line and a positioning note; `OPEN.md §2` gives four words of live-ops intent. Nothing anywhere says what happens outwardly when this game goes live, or in what order. | **sheet 01**, as the ordered outward sequence — the whole of `launchBeats`'s live content |
| **H2** | **`release.publishChecklist` has four rows and neither of the two settings that actually make the page reachable by a stranger.** There is no row for the **private → public visibility flip** (a new place is private by default `[research: create.roblox.com/docs/production/publishing/publishing-experiences-and-places]`) and no row for the **Maturity & Compliance questionnaire**, without which an experience *"will no longer be playable or show up in top charts"* `[research: devforum.roblox.com/t/…/3899317]`. `release` claims *"every publish-time platform setting and its read-back"*. Two are missing. | **sheet 01** states the sequence and **issues a revision request** against `cid/tech/deploy/01` **naming no row id and asserting no resulting row count**; the row, its id and the checklist's length are **publish-and-release-mechanics work** *[currently Tech & Data — Deploy]* and sheet 01 may not add or number one on my authority |
| **H3** | **Nothing states whether the pass is created before or after the page is public.** `release.provisioning` gate 4 rests on *"published and is accessible"*, and the platform page does **not** say public `[research: create.roblox.com/docs/production/monetization/game-passes]`. Under one reading the flip precedes gate 4; under the other it does not. | **sheet 01** picks an ordering safe under **both** readings and records the ambiguity as `[unverified]` with the settling fetch named. What the listing says during any window where the page is public and `gamePassId` is still unprovisioned is **store-listing work** *[Store Page]*, gap `M7` |
| **H4** | **The brief names no second experience.** Cross-promotion needs one and whether this developer owns another is a fact about a person, not a design decision. | **sheet 01** records `crossPromotedExperiences: 0` and names the unknown; the portfolio fact is **the developer's**, in one line |
| **H5** | **CLOSED, round 2.** It read: whether any beat exists after the first depends on Roadmap running beside me. **It ran.** `roadmap.dropCount` is 1, `cadence.value` `"none"`, `ordering.dated` false, and its `announcement.external` routes the outward half to this category; `store-page/05` routes it to Hype by name, at `updateNotes.entryCount: 0`. | **sheet 01 answers it: `D1` gets zero outward beats**, so `beatCount: 1` is a **total** and category gap `M10` closes. What is *in* the drop stays **Live Ops — Roadmap**'s; whether a listing note is ever owed stays **`store-page/05`**'s |
| **H6** | **Nothing in the brief, either contract or `docs/cid-workflow.json` makes an outward artifact a build artifact.** No emitter writes an experience-page state, so a merged `launchBeats` reaches nothing — `uiTheme`'s *"the key would merge and change nothing"* repeated. Category gap `M6`. | **sheet 01** states its own emitter hole in one line; **contract-and-seam work** owns the fix |

---

## Why 1 sheet

**One contract key, one sheet.** `launchBeats` is the only key this domain produces, and every one
of my five subjects resolves into a field of it: four zeros with their closing rulings, and one
ordered sequence. The trailer was the only candidate for a second sheet and it does not earn one —
a trailer ruling is not a rule *about* `launchBeats`, it **is** a value inside it
(`trailerVideoCount` and the precondition that gates it), and the category lead's own note says
*"one sheet, possibly two if the trailer question earns its own."* It does not: it shares the
capture precondition, the register ban and the truthfulness ledger with the publish sequence, and
splitting it would produce two sheets citing one gate. Wave 1's failure mode was four sheets saying
nothing four times; wave 6's `audio/music/01` is the counter-model and it ruled `trackCount: 0` in
**one** sheet with fifteen forbidden forms and a costed reversal. That is the shape here.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-publish-moment` | Supply the proposed key `launchBeats`: rule how many outward announcement beats this game has and what each one is (the expected answer is **one** — the private→public flip — with **zero** beats before it, and if you break that expectation break it in a `## Pushing back`); give that moment's ordered outward sequence, naming every experience-page element that must be non-default before the flip and citing each one's owner rather than deciding it (`title`, `storeIcon`, `storeThumbnails`, `storeListing`, `channels`) and where the flip sits against `release.provisioning`'s six gates, treating *"published and is accessible"* as `[unverified]` and choosing an order safe under both readings; state that `release.publishChecklist` has **no row** for the private→public visibility setting or for the Maturity & Compliance questionnaire (an unrated experience *"will no longer be playable or show up in top charts"*) and issue a **revision request against `cid/tech/deploy/01`** — **asking for a new row, assigning it no id, and asserting no post-acceptance row count** — rather than adding rows to a key you do not own; rule the trailer as a value (`trailerVideoCount`) on the **capture precondition and `00-CORE.md`, not on taste** — no legitimate capture exists while `game/src/shared/Theme.luau` ships `cartoon-vibrant`/`"Pet Ascend Simulator"` against a `fantasy-ornate` brief (`T8`, `G2`) — and carry the platform facts that an approved video **appears first on the detail page** ahead of every image slot the Thumbnails lead orders, that a detail page holds up to **10** images or videos, that uploads run against a **monthly quota of 3** with rejections counted, and that videos *"should be authentic and accurately portray in-game content"* and are reviewed; record **all five** of the node's subjects — beat structure, trailer, countdown, cross-promotion, re-engagement — each with the approved sheet or brief line that empties it and an **observable that is a count**, and close re-engagement on the mechanism's own facts rather than by assertion, because **Experience Notifications exist** (opted-in users **13+** only, minimum **100 visits since launch**, one notification per user per day, sent by an Open Cloud POST with an `x-api-key` that no path in this build has) against an **8–14** audience `[brief: binding]` and a binding retention non-goal; **answer the Live Ops dependency now that Roadmap has ruled** — one drop, dateless, no in-game announcement, outward half routed to this category — rather than restating it as a conditional; give every claim a `backedBy` per the category's `T0`, price the reversal of each zero, and state in one line that no emitter writes an outward artifact today. |

---

## Contract position

**`launchBeats` does not exist in `bridge/schema.mjs`.** `cid/_contract.md` — the derived key list —
holds no key covering an outward surface, and a grep for `launchBeats` over it returns nothing; the
name is unclaimed repo-wide except in `cid/marketing/_category.md` and this domain. I have no shell
in this session, so I read the derived artifact rather than running
`npm run bridge -- --contract`, and I assert no key count from it.

**What it would hold:** `beatCount` and an ordered `beats[]` (length 1) each with its trigger, its
surface and its `backedBy`; `preconditions[]` — the ordered outward gate list and its seam against
`release.provisioning`; `trailerVideoCount` with its `captureSource` precondition;
`countdownsPermitted: 0`, `crossPromotedExperiences: 0`, `reEngagementPushes: 0`, each with the
ruling that empties it and a counted observable; `reversalPath` per zero; and the resolved Live Ops
dependency as a named field. **Useful invariants for whoever writes the shape:**
`beatCount == len(beats)`; no field in the key may read a date, a calendar, a season, a cohort or an
elapsed time (`release` `N2`/`N4`/`N10` as a schema check); and **no field may name a
`publishChecklist` row id beyond the four that exist, or assert a post-acceptance row count** —
`release` owns the numbering.

**And it reaches nothing today (H6).** Stated so a later reader does not mistake a merged key for a
built one.

## Scope check

**My subject is not priority 3 in whole, and one half of it is.** A beat, teaser or countdown whose
subject is a **seasonal or event drop** is excluded by `03-META.md` priority 3 and is named here in
order to be forbidden — no slot, no empty track, no "for a future update" field, per
`tech/deploy/02`: *an explicit null and a never-emitted key are the same bytes*. What survives is
priority-1 by construction: **shipping the first version is not a live-ops event, it is the ship.**

## The five subjects, each with its ruling and its observable

Stated here so a verifier reads a conclusion and not a gap. The sheet carries these as manifest
rows; I am enumerating, not wording them.

| # | my subject | ruling that empties or shapes it | observable |
|---|---|---|---|
| 1 | **beat structure before a drop (teaser → reveal → launch)** | A teaser and a reveal need a surface to appear on and an audience to reach. Sibling **Social** concludes an empty channel set; `F15` removes every in-game path to one; `notices` carries **exactly two** members, both beats; `release.shutdown.playerFacing` is `"nothing"`. Roadmap's one drop gets no beat either, so *"ships and settles"* leaves one moment. **What survives is the publish moment itself, which is not a teaser and is genuinely mine.** | count of beats occurring **before** the public flip: **0** · count **after** it: **0** · count of beats total: **1** · count of surfaces this key addresses other than the experience page: **0** |
| 2 | **trailer briefs** | **Dormant, not forbidden** — the one subject nothing in the brief closes. What closes it, if it closes, is the capture precondition: `T8`/`G2`, no legitimate capture from any build that exists. Platform-side it is real and cheap-ish: up to 10 items on a detail page, an approved video **takes slot 1**, 3 uploads a month, reviewed against *"accurately portray in-game content"* `[research: creator-docs production/publishing/thumbnails.md]`. | `trailerVideoCount` with a named `captureSource`, and **no `captureSource` equal to the current `game/src/shared/Theme.luau`** · count of frames in this key sourced from an unfixed `cartoon-vibrant` build: **0** |
| 3 | **countdown mechanics** | Closed four ways and none of them mine: `release.forbidden` `N2` (*no flag keyed to a date, a calendar or a season*), `F10` in-game, category `T10` + platform guidance against *"a false sense of urgency"* / *"artificial scarcity"* outward, and *"tension is zero by design"* `[brief: binding]` on the instruction. A countdown also needs a page element the platform does not give a creator. | count of date-, clock- or calendar-keyed values anywhere in `launchBeats`: **0** · count of outward strings matching `/limited\|ends in\|counting down\|today only\|last chance\|only \d+ left/i`: **0** |
| 4 | **cross-promotion** | Needs a second experience. `release.environments.count` is **2** (Studio + one published place) and `N7` forbids *"a second place or universe used as a player-facing test ring"*; `tech/deploy` gap 2 records *"No environment split exists anywhere in the brief or the repo."* The brief names no other game by this developer — **H4**, a fact about a person, not a decision. | `crossPromotedExperiences: 0` · count of place ids or universe ids named by this key: **0** |
| 5 | **re-engagement pushes to lapsed players** | **Binding, twice, and mechanically dead.** *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]`, upheld by ruling **R-3**. And the mechanism that would carry it **exists and is unreachable**: Experience Notifications require the recipient to be **13+** and opted in, against an **8–14** audience of which `theme/tone/01` cites *"35% of age-checked daily users are under 13"*; require **≥100 visits since launch**, which is 0 at the publish moment; are capped at one per user per day; and are sent by an Open Cloud `POST /cloud/v2/users/{id}/notifications` with an `x-api-key` — a network path `release` `N5` forbids and no module in `game/src` has `[research: create.roblox.com/docs/production/promotion/experience-notifications, creator-docs cloud/guides/experience-notifications.md]`. | `reEngagementPushes: 0` · count of notification strings held by this key: **0** · count of Open Cloud endpoints named as used: **0** · `game/src` HTTP-out call sites: **0** |

## The publish moment's outward sequence — the shape, not the content

The sheet decides the order and the gate list. **What makes it a real decision and not a ceremony
is that three preconditions are hard, checkable, and currently unowned:** a new place is **private
by default** and only a public place is *"available and discoverable to the general public"*
`[research: create.roblox.com/docs/production/publishing/publishing-experiences-and-places]`; an
**unrated** experience is *"no longer playable"* and does not *"show up in top charts"*, and
completing the questionnaire makes it *"immediately playable for everyone"*
`[research: devforum.roblox.com/t/important-updates-unrated-experiences-and-changes-to-experience-pages/3899317]`;
and the pass cannot be created until the experience is *"published and is accessible"*, a phrase
that does not say *public* `[research: create.roblox.com/docs/production/monetization/game-passes]`.
**`release.provisioning` has six gates and none of them is "make it public."** That hole is the
finding, and sheet 01 states it, sequences around it, and files the revision request rather than
absorbing it.

## Verification note

**Sheet 01 is most likely to be contradicted by `release`'s owner** *[publish-and-release-mechanics
work, Tech & Data — Deploy]*, on H2: if that sheet accepts the revision request it adds **one or
more new rows whose ids it assigns**, and `launchBeats.preconditions` must then cite them instead of
stating the obligation. **Sheet 01 names no id and asserts no resulting row count**, because four
requests are live against one four-row checklist and only `release` can see all four. **Second most
likely: the Thumbnails lead**, on slot ordering — an approved video appears *first* on the detail
page, which reorders whatever slot list `storeThumbnails` fixes, so if the trailer ruling is ever
anything other than zero the two keys must agree on slot 1. **Third: `store-page/05`**, which holds
the update-note shape my zero-beat answer leaves as the only outward carrier a drop can have — if
its `reopeningCondition` ever fires, that is a listing entry and still not a beat here. **Fourth:
the Social lead**, whose empty channel set my beat-count reasoning rests on — a channel reopens
subject 1.

## Research owed

**My graph node carries no `must_verify`.** Everything below was fetched because sheet 01 needs it
to justify itself, and the writer has no fetch tools — this is the last chance for this domain.

**Fetched and banked:**

- `[research: https://create.roblox.com/docs/production/publishing/publishing-experiences-and-places]`
  — new games are private by default; public means *"available and discoverable to the general
  public"*; publish first, then set visibility.
- `[research: https://devforum.roblox.com/t/important-updates-unrated-experiences-and-changes-to-experience-pages/3899317]`
  — unrated experiences *"will no longer be playable or show up in top charts"*; completing the
  questionnaire makes an experience *"immediately playable for everyone"*.
- `[research: https://create.roblox.com/docs/production/promotion/content-maturity]` — *"If an
  experience does not have accurate or all content maturity information, Roblox restricts the
  playability of the experience on the platform for all players."* Label tiers and age eligibility
  are quoted there; **the label value itself is Store Page's row 7, not mine.**
- `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/thumbnails.md]`
  — up to 10 images or videos per detail page; an approved video *"will appear first on your game's
  detail page"*; monthly quota of 3 uploads with rejections counted; *"Video thumbnails should be
  authentic and accurately portray in-game content without misleading alterations"*; all videos
  reviewed.
- `[research: https://create.roblox.com/docs/production/promotion/experience-notifications]` —
  opted-in users 13+; *"Minimum 100 visits since launch"*; not under moderation; one notification
  per user per day from a given experience.
- `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/experience-notifications.md]`
  — sent by `POST https://apis.roblox.com/cloud/v2/users/${UserId}/notifications` with an
  `x-api-key` header; the one-per-day limit restated.
- `[research: https://create.roblox.com/docs/production/monetization/game-passes]` — *"Before
  creating a pass, make sure your game has been published and is accessible on Roblox"*; no API for
  creating a pass.

**Could not settle:**

- **Whether *"accessible"* in the game-pass prerequisite means *public*.** `[unverified]` — the
  page does not say. **Settling fetch:** the Creator Dashboard passes page rendered against a place
  whose visibility is Private, or the `creator-docs` source of
  `production/monetization/game-passes.md` with its prerequisite note expanded. Sheet 01 must order
  around it, not assume it.
- **`https://en.help.roblox.com/hc/en-us/articles/203313890-How-to-Publish-Public-Experiences-on-Roblox`
  returned HTTP 403.** The creator-docs publishing page above covers the same ground and is what I
  cite; the help-centre step list would corroborate the private-by-default default from a second
  source.
- **The exact eligibility block for Experience Notifications from the `creator-docs` GitHub source**
  — that file defers to a linked guide. The figures above are from the rendered
  `create.roblox.com` page, which is a real fetch and is cited as such; a second source would
  harden the 13+ and 100-visit numbers. Neither is load-bearing alone: the binding retention
  non-goal closes subject 5 without them.
- **I did not re-run `F15`'s grep as its own check.** A naive substring grep over `game/src`
  matches identifiers (`Modifiers`, `GameConfig`) and is **not** `F15`'s observable, which is
  scoped to player-facing strings and `TextBox` instances. Sheet 01 cites `F15`'s own check rather
  than a count I would have miscounted.
