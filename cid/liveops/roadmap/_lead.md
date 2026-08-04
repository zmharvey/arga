# Roadmap — domain index

**Category:** Live Ops · **Wave:** 7 · Reads: `HANDOFF.md`, `00-CORE.md`, `03-META.md`,
`05-OUTWARD.md`, `OPEN.md` (§1–§5), `cid/liveops/_category.md`, `cid/_contract.md`,
`cid/_state.md` (R-1…R-4), `cid/tech/deploy/01-the-release-contract.md`,
`cid/analytics/kpis/02-the-shortlist.md`, `cid/gameplay/meta/07-after-the-last-find.md`,
`cid/gameplay/meta/05-area-layout.md`, `cid/gameplay/meta/04-the-depth-ladder.md`,
`cid/gameplay/social/01-server-and-co-presence.md`, `/02-presence-sufficiency.md`,
`cid/gameplay/systems/05-the-find-ledger.md`,
`cid/tech/persistence/03-store-versions-and-migration.md`, `/_lead.md`,
`cid/art/environment/04-depth-families.md`,
`cid/tech/performance/03-what-optimisation-may-never-do.md`, `cid/_playtest.md`,
`cid/_research/pack.md`, `game/src/` (grepped).

---

## What the brief gave me

- *"Ships and settles. No seasons or events. Note that new authored chunks can be added
  without touching systems, so extension is cheap if ever wanted."* (`OPEN.md §2`)
  `[brief: soft]` ← `[I assumed — batched]`, **0 interview questions** (`OPEN.md §1`, row
  `O / live-ops intent`). This is the whole of the brief's direction for my subject, at the
  weakest tag in the ladder. It is **G3**.
- **Priority 2 — after it works:** *"richer authored chunk variety · a duplicate-handling
  refinement · visitable restored ruins."* (`03-META.md`) `[brief: soft]` ←
  `[I assumed — the ordering]`. The only next-drop list the brief writes.
- **Priority 3, in full:** *"real procedural generation · rebirth · offline accrual · codes ·
  daily rewards · leaderboards · trading · seasons and events."* (`03-META.md`)
  `[brief: soft]` ← `[I assumed — the ordering]`. **The ordering was never interviewed**
  (`OPEN.md §5` row 7). Three members are harder than the list; the five my subject touches
  are not among the hardened three, and I may not upgrade them.
- *"Beating the genre's retention curve. Offered and declined."* · *"Revenue. Offered and
  declined."* · *"Success is **shipped artifacts, not players**"* · *"the **smallest game**
  that still gives every creative area real work"* (`00-CORE.md`) `[brief: binding]` ←
  `[you chose: R1 Q3]`. **This is what actually holds priority 3 closed**, upheld by ruling
  **R-3**, and it is the line any drop I schedule has to be justifiable without.
- *"permanent clearing plus endless shuffled areas means new content can be added as new
  authored chunks **without touching existing systems**. This design is unusually easy to
  extend, which is a live-ops advantage nobody asked for."* (`05-OUTWARD.md`) `[brief: soft]`
  ← `[I assumed]`. **Sheet 01 must overrule the second half of this with a reason** — see the
  first gap below; it is true of systems and false of save state.
- *"Cleared is permanent."* (`CONCEPT.md`, `01-FOUNDATION.md`) `[brief: binding]` ←
  `[you chose: R2 Q1]`. There is no repeatable state for a drop to refresh, **and it is the
  line a content drop breaks in a way nobody has stated** (below).
- *"Zero tension is deliberate"* (`02-GAMEPLAY.md`) `[brief: soft]` ←
  `[you accepted: step 6 Q2]`; *"Permanent multipliers only. Never content access."*
  (`03-META.md`) `[brief: soft]` ← `[you accepted: R5 Q4]`. No drop may carry a window, a
  countdown, or a gate on content.
- *"10,435 peak to 819 current, **while still being actively updated weekly**… satisfaction is
  not the same as retention"* `[research: cid/_research/pack.md]` (brief's
  `research/grass-incremental.md`). **Refetched today and it has moved — see Research owed.**

### Upstream approved rulings I schedule into and never re-decide

| ruling | consequence for this domain |
|---|---|
| `release` owns every mechanism of shipping: version, two environments, `publishChecklist` `P1`–`P4` (two with no read-back), six provisioning gates, rollback-as-republish, the 15-minute restart, one flag class (`hotfixKillSwitch`, `lifetimeReleases: 1`), and `forbidden` `N1`–`N10` | Every drop cites a gate; none restates one. `N1`/`N2`/`N10` kill staged rollout, date-keyed flags and canaries by name; `N3` kills content-enablement flags. Needing one is a `## Pushing back` against an approved sheet. |
| `release.provisioning` — publish before pass creation, gate 3 blocked on an unanswered Networking question, gate 5 writes the id **into a spec sheet** | Anything needing a new product inherits six manual gates. I place the sequence in the order; I do not re-order it. |
| `release.rollback.publishMayNotProceedWhen`: *"An unexercised migration is a publish blocker, not a caution"* · `release.tolerance.fullWipeCondition`: acceptable **only** while no non-developer save exists | **These two are the guardrail on the one drop I have.** |
| `kpis.cadence.game` is a bounded window that **closes**; `kpis.verdictRule`: a breached row yields *"a revision request against a named sheet and field — never a live change"*, and `forbiddenActions` names an event calendar | **No second review cadence may be published here.** A roadmap responds to a reading by editing a sheet and re-releasing, never by tuning. |
| `endgame`: post-terminal state unbounded, buries nothing, `forbidden` holds 13 names, *"Live Ops and Monetization get an explicit no"* | Nothing may be scheduled past area 8, and the 13 names are the diff list. |
| **R-3**: the game is not expanded past eight areas; the under-scoping finding is recorded and **declined** | A drop that grows the game to hold players re-opens a closed argument. |
| `storeMigration.bumpTriggers` **B1**: *"any change to an area's chunk run, its composition order, its grid, its seed or its draw sequence"*, and `translate.discard: ["cleared", "clearedCount"]` — *"it costs every player their current area's partial clearing"* | **The load-bearing constraint on this whole domain.** See the first gap. |
| `social.plotAccess.othersMayEnter: false` (enforced by a collidable boundary) · `worldStateScope: "per-player"` · `sharedState: []` · `maxCoPresenceSeparationStuds: 128`, `satisfiedByShippedBuild: false` | *"Visitable restored ruins"* contradicts four approved fields, not a preference. |
| `discovery.repeat.possible: false` — *"no reachable duplicate exists, so nothing needs a sink"* (`systems/05`) | **Priority 2's duplicate refinement is already delivered before v1 ships.** |
| `chunkDressing.variation`: `variantsDressedDifferently: 0`; *"a bay is 4 to 16 chunks and this key's allowance is 6 parts per bay, which is 0.375 parts per chunk"*; `varietyLeverInstead: "layout.anchorSource"` | **The variety lever is the authored anchor set, not new dressing**, and it costs zero instances. |
| `layout.chunksPerFamilyRange: [8, 16]`, `[playtest unknown]`; `meta/05` flagged: moving it inside 8–16 *"needs nobody"* | The one live content lever, owned by `layout`. I schedule the move; **I do not write the number.** |
| `performance` `N9` — no `budgets`/`serverCost` field reserved, stubbed or held open for any of the eight priority-3 systems; `tech/deploy/02` — *"an explicit null and a never-emitted key are the same bytes"* | A reserved slot is a violation even when empty. |
| `notices` has exactly two members, both beats · `products` `F19` · `release.shutdown.playerFacing: "nothing"` | **Nothing I schedule can be told to a player inside the game, including that it happened.** |

---

## What the brief did not give me

Named and routed. Nothing here is filled.

1. **The brief's own extensibility claim is false in the half nobody checked, and no sheet has
   said so.** `05-OUTWARD.md` says new chunks cost no systems `[brief: soft]`. That is true of
   systems and **false of save state**: `layout.composition` draws each area's run *without
   replacement from its family's variants, seeded by (layoutSeed, areaOrdinal)*, so growing a
   family re-draws every existing run; `layout` R9 already calls a reorder *"a save migration
   and not a refactor"*; `storeMigration` **B1** makes it a store bump; and the migration
   **discards `cleared` and `clearedCount`**, costing every player their current area's
   partial clearing — against *"Cleared is permanent"* `[brief: binding]`, with **no notice
   channel to say so**. The same applies to authoring `layout.anchorSource`, which is today
   *"generated once from hash(layoutSeed, chunkId) and frozen"*. → **sheet 01**, which must
   rule between shipping inside `release.tolerance`'s pre-installed-base window, accepting the
   wipe, or stating a draw-stability requirement as a consequence for area-layout work.
   `[cid: decided]` that this is the deciding fact of the domain.
2. **G5 — nothing states what triggers a post-launch change.** `kpis.cadence` closes;
   `kpis.verdictRule` forbids a live response; `release` says a hotfix is code-only. No sheet
   says what re-opens the project or whether it re-opens at all. → **sheet 01**.
3. **G6 — nothing in the game is measured.** I re-ran the check rather than inheriting it:
   `grep -rn "AnalyticsService\|LogService\|FireEvent\|LogCustomEvent" game/src` returns
   **zero matches across the tree**. Five of eight `kpis` rows are `readableToday: false`.
   → **sheet 01**: every trigger carries `readableToday` and a `blockedBy`, the way `kpis`
   does. No trigger may assume a dashboard.
4. **G3 — the live-ops intent is batched at 0 questions**, structurally identical to the
   *"Music sparse and low"* line wave 6 overruled. The difference is direction: `music`'s
   overrule *reduced* scope; an overrule here would *increase* it against a binding non-goal.
   → **sheet 01**, which must uphold or overrule it **on the merits and say which**, not by
   default.
5. **What a "drop" is.** `release` owns *version*; nobody owns *content unit*. → **sheet 01**,
   which must define one of the two words it does not already inherit.
6. **G7 — Monetization has no priority slot.** `03-META.md`'s three lists contain neither a
   store nor a pass, so a roadmap that would order the SKU has no ordering to order it by.
   → **recorded by sheet 01 as a blocked item**; the scope-ordering escalation is the
   developer's.
7. **Whether the collection grows past 24** (`meta/04` `## Flagged`, offered; **R-3** declined
   expansion). → **sheet 01 names it as blocked and does not decide it.** A developer ruling.
8. **G8 — the working name is a placeholder**, so an update title-tag convention has no stem.
   **Not mine**: naming and title-tag work (Discovery & Marketing — Name) owns
   `[UPDATE]`/`[X2]` by name. Recorded so sheet 01 does not fill it.
9. **The announce/decide seam is unwritten in both directions** (Marketing's own **M10**).
   Sheet 01's ruling is the input to external-announcement work; **stating the ruling is mine,
   announcing it is not.**

---

## Why 1 sheet

I could not run `npm run bridge -- --contract` — this agent has no shell — so I read
`cid/_contract.md`, which that command generates from `bridge/schema.mjs`. **`roadmap` is not
among its 25 keys and no sheet on disk proposes it** (grepped `cid/**`; the only hits are two
category briefs, the digest, and `performance` `N3`'s consequence line). So I own exactly one
contract key, which is **one sheet**, and `bridge/merge.mjs` allows exactly one sheet to
propose a key — the reason `release` carries its whole key on one sheet too.

I considered a second, non-manifest sheet for the trigger rule (G5/G6) and rejected it. A
trigger is a **field of the value**, not a prohibition shaping it: `roadmap.trigger`,
`roadmap.forbiddenTriggers` and `roadmap.drops[].triggerReadableToday` cannot live anywhere
but inside the key, and a second sheet holding them would either collide on the key or carry
no data form — which is the wave-1 failure mode with a Live Ops subject. I also considered
splitting the declined register (visitable ruins, duplicate refinement, collection growth)
into its own sheet; same objection, it is `roadmap.declined[]`. **Four things my node owns —
cadence, contents, dependency order, per-drop guardrails — are four facets of one artifact.
A roadmap without an order is not a roadmap and a cadence of none is a field.** One decision,
one sheet, and the honest count is the deliverable.

| # | sheet | must decide |
|---|---|---|
| 01 | `what-ships-after-v1` | Rule whether an ordered, dateless roadmap exists at all and publish it whole as the proposed key `roadmap`: define what a drop is (`release` owns *version*, nobody owns *content unit*); enumerate `drops[]` in dependency order with, per drop, the `release` gate it passes through, its `dependsOn`, its scope guardrail, and `triggerReadableToday` + `blockedBy` — noting that `grep -rn "AnalyticsService\|LogService" game/src` returns zero, so any player-conditioned trigger is `readableToday: false` and the only trigger readable today is a repository state (an applied revision request), never a dashboard; set `cadence` (an interval, or none with a reason) engaging both directions of the evidence — Roblox's own guidance that *"many games release content cadence updates every two weeks to one month"* and that a routine cadence *"encourages players to check back often"* `[research: https://create.roblox.com/docs/production/game-design/content-updates]`, which rests on retention and is a **declined non-goal** `[brief: binding]`, against the reference refetched 2026-08-02 (last updated 2 days ago, a year of weekly updates, 1,259 CCU against a 10,435 peak) `[research: https://www.rolimons.com/game/133086043677134]`, and the only algorithm source this project holds naming session return rate and **not** update recency `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]`; uphold-or-overrule `OPEN.md §2`'s *"ships and settles"* on the merits and say which, and **overrule the second half of `05-OUTWARD.md`'s *"extension is cheap… without touching existing systems"* with the reason** — a chunk-variety drop (whether raising `layout.chunksPerFamily` inside its published `[8,16]` or authoring `layout.anchorSource`, whose variety lever `chunkDressing` already routes there at zero instance cost) trips `storeMigration` **B1**, forces a store bump, and **discards `cleared` and `clearedCount`**, costing every player their current area's partial clearing against *"Cleared is permanent"* `[brief: binding]` with no notice channel to say it happened, so the drop is shippable only inside `release.tolerance.fullWipeCondition`'s pre-installed-base window, or after a draw-stability change stated as a consequence for area-layout work (never designed here), and never at all while `release.rollback.publishMayNotProceedWhen` holds an unexercised migration; carry a `declined[]` recording, each with the approved sheet that closes it and the cost of reversal, that priority 2's duplicate refinement is **already delivered pre-v1** by `discovery.repeat.possible: false`, that *"visitable restored ruins"* contradicts `social.plotAccess.othersMayEnter: false`, `worldStateScope: "per-player"` and `sharedState: []` and would need a `## Pushing back` plus a moderation surface nobody holds, and that growing the collection past 24 is blocked by **R-3** and is the developer's ruling; carry `forbidden[]` diffed against `endgame.forbidden`'s 13 names, `release.forbidden` `N1`–`N10` and `performance` `N9` so that **no slot, null field or "for a future update" note is reserved for any priority-3 system**; state in one line that nothing scheduled here can be announced inside the game (`notices` two beat members, `products` `F19`, `release.shutdown.playerFacing: "nothing"`) and that external announcement is not this key's; and record `roadmap` as developer-facing like `kpis` — it must never reach `GameConfig`. |

**Sheet 01 supplies:** `roadmap` (proposed; no schema slot exists).

---

## The contract key I need

`roadmap` — **not in `cid/_contract.md`'s 25 keys, and unclaimed.** What it would hold:

```
roadmap = {
  exists, dropUnit, cadence{value|none, reason}, ordering{dated:false},
  drops[]{ id, contents, ownedFieldsMoved[], dependsOn[], releaseGate,
           guardrail, trigger{readableToday, blockedBy}, migrationTrigger, cost },
  trigger{ theOneReadableToday, forbiddenTriggers[] },
  declined[]{ id, closedBy, reversalCost }, blocked[]{ id, needsRuling },
  forbidden[]{ id, thing, closedBy }, announcement: "none"
}
```

Two invariants worth writing into `bridge/schema.mjs` when it is shaped, on the pattern of
`music.trackCount == len(music.tracks)`: **`len(roadmap.drops) == roadmap.dropCount`**, and
**every `drops[].id` and every `declined[].id` is absent from `endgame.forbidden`** — which
makes the scope gate a comparison rather than a review. It is developer-facing (`kpis` is the
precedent) and should carry a `DOCUMENTATION_ONLY` disposition so it never reaches the
emitter.

---

## The operable surface I hold, and what I deliberately did not assign

My category lead partitioned 30 rows. These are the ones marked mine, with what happens to
each. **Nothing below is a decision; each is an input sheet 01 rules on.**

| row | state | what I did with it |
|---|---|---|
| 4 · new authored chunks / richer variety | **live** | **The only live content lever in the game.** Assigned to sheet 01 as the candidate drop, with B1 attached. |
| 5 · duplicate-handling refinement | **live** (order only) | **Not assigned as a drop.** `discovery.repeat.possible: false` delivers it before v1; a priority-2 item retired by an approved key is a `declined[]` row, not a schedule slot. |
| 6 · visitable restored ruins | **live, contested** | **Not assigned as a drop.** Four approved `social` fields close it; it needs a `## Pushing back` and a moderation surface. `declined[]`, with the reversal cost. |
| 7 · collection past 24 | **dormant** | Named as **blocked**, not decided. R-3 vs `meta/04`'s `## Flagged`; developer's ruling. |
| 17 · daily reward / streak / return bonus | **forbidden** | Named **in order to forbid it**, per the scope gate's expected form. No slot, no field, no note. |
| 22 · in-game announcement of anything | **forbidden** | Stated as a one-line consequence: a drop happens silently. |
| 28 · instrumenting anything (the trigger problem) | **dormant** | `readableToday: false` + `blockedBy` on every player-conditioned trigger; re-verified by my own grep. |
| 1, 2, 3, 11, 12, 27, 29 · hotfix, checklist, restart, price move, flags, review rhythm, store migration | live, **not mine** | Cited as gates and dependencies. **Zero of them re-decided.** The price move inside 349–999 is a value move its owner already permits, not a content unit, so it takes no roadmap slot. |
| 8, 9, 13, 14, 15, 16, 18–21, 23–26, 30 | forbidden or others' | Not claimed. |

**What I considered assigning and did not, beyond the above:** a second sheet for the trigger
rule (folded in — a field, not a constraint); a cadence sheet (a field); a "drop template"
sheet (a heading, not a decision); anything that would order a *second* SKU (**G7**: there is
no priority ordering to order it by, and inventing one is the developer's escalation, not
mine); and anything at all for the post-terminal state, which `endgame` closes outright.

---

## Verification note

**The sheet most likely to be contradicted later is 01, and the contradiction will come from
area-layout work or from persistence work**, on one field: whether growing the chunk library
is a `storeMigration` **B1** trigger. My reading is that it plainly is — `layout.composition`
draws without replacement from the family, so the run changes for the same seed, and B1 names
*"its draw sequence"* — but the owners of `layout` and `storeMigration` may hold that a draw
made stable under an append-only library is a design they would take, which would remove the
bump and change the whole order. **That is their call, and sheet 01 must state the requirement
as a consequence for them rather than designing it.** If they rule the other way, sheet 01's
guardrail loosens and its ordering survives unchanged, which is the shape a finding should
have.

Second most likely: `cadence`. If the developer overrules `OPEN.md §2` (0 interview questions,
freely arguable), an interval appears and every drop needs a trigger the game cannot read. The
sheet should price that reversal rather than assume it away.

---

## Research owed

My node carried no explicit `must_verify`, so I fetched what sheet 01 has to justify itself
with. **All four were fetched today, 2026-08-02.**

- **Roblox's own live-ops taxonomy and cadence guidance.** *"A content cadence is the regular
  release of new content updates…"*; *"Spending fewer than three weeks' effort on content
  cadence is recommended"*; *"Many games release content cadence updates every two weeks to
  one month"*; a routine cadence *"encourages players to check back often"* and helps players
  *"anticipate the next release"*
  `[research: https://create.roblox.com/docs/production/game-design/content-updates]`.
  LiveOps is *"two interweaving content types"* — **events** (*"temporary activities"*) and
  **content updates** (*"significant permanent game updates that expand or deepen the core
  loop"*); it gives no sequencing guidance at all, and measuring an update means comparing
  *"the week before the event and the week after"*
  `[research: https://create.roblox.com/docs/production/game-design/liveops-planning]`.
  **Three findings sheet 01 should use rather than restate:** the platform's own taxonomy has
  exactly two halves and one of them is `events`, which this category rules empty — so the
  half left open is precisely mine; the platform's whole argument for a cadence is retention
  and anticipation, **a declined non-goal** `[brief: binding]`, so the guidance does not
  transfer and saying so with a source beats asserting it; and the platform's own success test
  for an update is a week-over-week comparison this project **cannot perform** (zero analytics
  calls, and `kpis.cadence` closes), which is independent corroboration of `readableToday:
  false`.
- **The reference, refetched.** Last updated **2 days ago**; created ~1 year ago; **1,259
  current CCU, 1,659 over the past 7 and 30 days, all-time peak 10,435**, 38,571,201 visits
  `[research: https://www.rolimons.com/game/133086043677134]`. **The brief's 819 figure is
  stale in both directions and must be quoted honestly**: the decay partially reversed (819 →
  ~1,259–1,659), *and* a weekly cadence sustained for a year still sits at ~12–16% of peak.
  The brief's conclusion — *"satisfaction is not the same as retention"* — survives its own
  number moving, which is the correct way to use it.
- **What the Roblox algorithm rewards.** Refetched with an update-specific prompt: the page
  names *"session return rate and short-session re-engagement"* with the 24-hour window
  weighted most heavily, and contains **no statement about update frequency, update recency or
  content drops**
  `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]`.
  Recorded as a **sourced negative**: there is no discovery argument for a cadence in this
  project's research bank, so a cadence cannot be smuggled in as a distribution decision after
  being declined as a retention one.
- **`grep -rn "AnalyticsService\|LogService\|FireEvent\|LogCustomEvent" game/src` → zero
  matches.** Re-run rather than inherited from `kpis`, because the whole trigger question
  rests on it.

**Not fetched, and honestly owed:**

- `[research owed: a shipping Roblox experience's published update ordering — a changelog or
  version history showing what shipped after v1 and in what order.]` I have the platform's
  *prescription* and one reference's *cadence*, but no worked example of an ordered dateless
  roadmap on this platform. The specific fetch that would settle it: a store-page update log
  or DevForum changelog thread for a collection-shaped incremental (DIG, game id in
  `cid/_research/pack.md`, is the closest comparable). Sheet 01 must reason without it and say
  so; nothing in my ordering depends on it, because my order is derived from `storeMigration`
  and `release`, not from precedent.
- `[unverified]` **Whether `publishChecklist` `P1`–`P4` must be re-executed on a subsequent
  publish, or only at `release.provisioning` gate 2.** They are place configuration and
  persist across publishes, but `P3` and `P4` have no read-back, so a re-tick may be cheap
  insurance. **This is `release`'s row to answer, not mine** — sheet 01 cites the gate and
  routes the question to publish-checklist work rather than inventing a re-tick rule.
