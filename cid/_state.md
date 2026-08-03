# CID run state — `incremental-spinoff-v2`

Brief: `concept/spec/incremental-spinoff-v2/`. Graph: `docs/cid-workflow.json`.

A wave is dozens of agents and outlives one context window. This file is what makes a
resumed run possible, and what stops a passed wave being silently rewritten.

## Gates a wave must clear before the next one starts

| gate | what it is | where |
|---|---|---|
| `npm run cid:verify -- --category <c>` | mechanical: index matches disk, sections present, criteria countable, provenance tagged, one spelling per term, cited URLs in the pack, data form present | `bridge/verify-sheets.mjs` |
| `npm run bridge` | the creative contract still merges; no key claimed twice; new keys land as proposals | `bridge/merge.mjs` |
| `cid-verifier` agent | the judgement half, run against that category's `checks` in the graph | `.claude/agents/cid-verifier.md` |
| `npm test` | 159 tests, incl. the shipped manifest's own copy rules | — |

A wave advanced on a PARTIAL is a wave that will be rebuilt.

## Waves

| wave | categories / domains | status | verdict |
|---|---|---|---|
| 1 | Theme & Narrative (6) ‖ Gameplay stage 1 — Core Loop | **done** | see below |
| 2 | Gameplay stage 2 — Systems, Mechanics, Multiplayer & Social | **closed** | round 1 FAIL (16) → round 2 PARTIAL (3) → all 19 closed; **1 escalated** |
| 3 | Gameplay stage 3 — Meta & Content, Monetization, Onboarding | **closed** | round 1 FAIL (14 requests) → all closed; 3 escalations resolved by ruling |
| 4 | Gameplay stage 4 — Balance & Tuning | **closed** | round 1 FAIL (16) → round 2 FAIL (3) → **PASS**; two verifier requests overturned by the writer |
| 5 | Tech & Data ‖ UI/UX ‖ Analytics | **written, verified** | Analytics **PASS**; UI/UX defects closed, verdict unwritten; Tech erratum applied, verdict unwritten |
| 6 | Art & Visuals ‖ Audio | **written, verified** | Audio **PASS**; Art round 3 open on one stale sheet |
| 7 | Live Ops ‖ Discovery & Marketing | **written, verified** | Live Ops round 2 FAIL on one token; Marketing 5 of 6 closed |
| final | Cross-Category Verification | not started | — |

*This table read "not started" for waves 4–7 until 2026-08-02, while five of those categories had
released. Wave 7's Icon lead found it — stale as a status record, not wrong as a ruling record. The
detailed state is at the end of this file; treat that as authoritative and this table as the index.*

### Wave 1 — done, recorded after the fact

27 sheets across 7 domains (theme × 6, gameplay/core-loop). `cid:verify` PASS, `bridge`
COMPLETE 9/9. Its verdict was never written down at the time; this row is reconstructed from
the commit trail (`d55cc18` "Wave 1 complete: all 27 sheets written" through `856cfbe`).

**Open wave-1 debt, deliberately not blocking wave 2:**

- 6 of its 7 domains propose no contract key (`gameplay/core-loop`, `theme/fantasy`,
  `theme/identity`, `theme/lore`, `theme/setting`, `theme/tone`). `theme/tone` is the worked
  example of the fix — four sheets of register prose became `vocabulary.casing`,
  `.maxSentenceWords`, `.allowedPattern`. The other five have not had the same pass.
- 22 sheets are over the 100-line prose budget by 3,009 lines total.
- `theme/tone/02-flavour-and-humor.md` carries one `[research owed:]`.

## Sheets written outside the wave process — adopted, not rewritten

Eight sheets were written ad hoc during the build trials, before their domains had a lead.
The shipped game reads their manifests, so **their domain leads index them at their existing
numbers and plan only the gaps.** Rewriting them would break a running build.

| sheet | key it supplies | wave it belongs to |
|---|---|---|
| `gameplay/systems/01-overgrowth-tiers.md` | `tiers` | 2 |
| `gameplay/systems/02-the-currency.md` | `currency` | 2 |
| `gameplay/mechanics/01-reach-and-pace.md` | `movement` | 2 |
| `gameplay/meta/01-the-area.md` | `area` | 3 |
| `gameplay/meta/02-the-collection.md` | `collection` | 3 |
| `gameplay/onboarding/01-first-find.md` | `onboarding` | 3 |
| `gameplay/balance/01-upgrade-ladder.md` | `upgrades` | 4 |
| `art/objects/01-patch-footprint.md` | `patch` | 6 |

## Graph nodes that no longer describe reality

- **`architecture-lead` (`/cid/tech/architecture/`) does not run.** `a5171f1` split creative
  from technical: modules, runtime and stateShape moved to `architect/`, which owns them
  under its own 7-key contract. Wave 5 runs Tech & Data's other five domains only.

## Wave 2 — 15 sheets, 3 domains

`cid:verify` PASS, 0 failures. `bridge` COMPLETE 9/9, 0 problems, 9 proposals collected.
163 tests green. The three adopted sheets are byte-identical. **Zero wave-2 sheets exceed the
100-line prose budget**; all 22 that do are wave 1's.

### The proposed-key queue — 9 keys, deliberately not promoted yet

Promotion means writing a shape and cross-key checks in `bridge/schema.mjs`, and the checks
worth having span keys — `economy` against `upgrades` against `modifiers` cannot be written
well one at a time. **Promote as a batch before the architect runs, not per wave.** Nothing is
lost by waiting: `sheetDigest` carries a proposed `provides` exactly like a supplied one, so
waves 3–7 already see these as decided facts.

| key | sheet | what it settles |
|---|---|---|
| `rarity` | `systems/03` | one graded ladder, read from `patch.tierIndex`; a Find has no rarity of its own |
| `economy` | `systems/04` | faucets, sinks, the clear formula, the payout floor |
| `discovery` | `systems/05` | the per-Find record, the draw rule, what a repeat does |
| `modifiers` | `systems/06` | what a permanent stat change is, and the order sources resolve in |
| `input` | `mechanics/02` | the closed verb list, with per-device bindings |
| `tool` | `mechanics/04` | held or abstraction, and what drives its appearance |
| `response` | `mechanics/05` | per beat: what fires, which side, latency budget, channel |
| `traversal` | `mechanics/06` | jump, edges, falling, player-to-player collision |
| `social` | `social/01` | population band, progress scope, plot tenure, collision, chat |

### Escalations from wave 2 — findings that outlive the wave

1. **`social` has no emitter path even once promoted.** `Players.MaxPlayers` is read-only from
   a script, chat is configured on `TextChatService` children, collision groups are set at
   boot. None is produced by `bridge/emit-config.mjs`; none is carried by
   `game/default.project.json`. Promotion implies a place-configuration emitter or a named
   boot module **in the technical contract**. For the architect, not for CID.
2. **Spawn orientation, not plot pitch, is what breaks "visible to each other".**
   `game/src/server/Plots.luau`'s spawn `Attachment` carries no rotation, so a character
   spawns facing −Z while the plot row runs +X: the nearest neighbour is 90° off axis, outside
   the frustum. A player spawns and sees nobody until they turn. Body and motion otherwise
   clear the legibility floor at the shipped 160-stud pitch with margin. **Meets bar (a).**
3. **`mechanics/01`'s acceptance criterion 1 does not deliver its stated intent** — radius 5.5
   < spacing 6, where the intent needs radius < spacing/2. Both the Mechanics lead and its
   writer flagged it independently. Meets neither stopping-rule bar and the values are
   shipped, so it is recorded, not fixed.
4. **The G1 ruling supersedes shipped code.** `game/src/client/Input.luau` is to be deleted;
   the game then fires zero game-defined client-to-server remotes. Nothing acts on this until
   the build stage re-runs.
5. **Two `[brief: soft]` lines were pushed back on**, both in `systems/05`: `02-GAMEPLAY.md`'s
   "guarantees repeat finds" is true only of a with-replacement draw, and `03-META.md`'s
   relic-luck allowance names a quantity with no referent once `luckShaped: false`.

### Research owed, still open after the wave-2 batched pass

- An index page from a shipping **Roblox** game with a finite roster and a stated repeat rule.
  The pass found four mechanisms but three are non-Roblox precedents, stated as such.
- Current `StarterPlayer`/`Humanoid` jump defaults. The decision ("platform default,
  unchanged, gating nothing") survives whatever the number is.
- The brief's ~70% mobile figure is uncorroborated by anything fetched. Nothing in wave 2
  rests on it, and `mechanics/03` says so in the sheet rather than quietly avoiding it.

## Rulings — decided by the orchestrator, 2026-08-01

The developer declined to arbitrate and asked for a working wave 1–3. These are the calls and
the reasoning, so a later reader can overturn any of them on the argument rather than on taste.

### R-1 · The input overrule stands. `buy` is a pressable.

The pad was the literal-compliance answer and does not survive arithmetic: 10.6 s round trip
at depth 1, 13.0 s at depth 4, and bounding the detour under `core-loop/01`'s 3-second tick
ceiling needs ~25 pad clusters in one depth-1 area.

The deciding fact is that **`core-loop/01` mandated no-travel while believing the surface it
requires could not be built** — it names "the persistent HUD that `OPEN.md §4` already flags as
unbuildable". `hud-overlay` exists and is a persistent HUD; what it lacks is `PRESSABLE` *by
default*, which is a default, not an incapability. A ruling whose stated premise is false does
not bind the sheet that discovered it.

The brief line being overruled is `[brief: soft]`, the overrule is contained to one input
class / two verbs / four controls and stated in the manifest so nothing can widen it quietly,
and it **closes the largest known gap in `CLAUDE.md`** — a mobile-heavy audience that cannot
spend currency.

### R-2 · The 3/2 collection revision is applied.

`relicsPerArea` 6 → 3, `areasPerDepth` 1 → 2. Four depths, two areas each, eight areas.

It is the only pair satisfying both approved criteria; it validates clean against every
existing `collection` check; and `systems/05`'s draw rule was designed for exactly this
equality. The `sets` structure does not change — the partition `3 × 2 = 6` is derived, so the
revision is two scalars.

**The cost, stated plainly:** the duplicate problem goes live. `systems/05`'s safety argument
was "at today's 6×1 this is a no-op", and that expires here. That is acceptable because the
draw rule is what makes it safe, not the no-op — but it means the draw is now load-bearing and
must be tested rather than assumed.

### R-3 · The game is not expanded past eight areas. The under-scoping finding is recorded and declined.

DIG ships two islands against a 601-item collection; this game completes its collection at
minute 11. That is a real observation and it is **not actionable here**, because `00-CORE.md`
binds this project to *"the smallest game that still gives every creative area real work"* and
lists **"Beating the genre's retention curve. Offered and declined"** as a non-goal. The
under-scoping argument is a retention argument, and that argument is closed in this project.

R-2 already doubles content from four areas to eight, which is as far as a *correctness* fix
carries it. Going further would be growing the game to answer a question the brief declined to
ask — the exact failure `CLAUDE.md`'s stopping rule names.

### R-4 · There is no in-game store. The one product is sold on the experience page or nowhere.

**Recorded 2026-08-02, decided during wave 3.** This ruling was made, applied, and cited by at
least six sheets across four categories — and its text was never written down. Wave 7's Store
Page lead found the gap while checking what backs its own key: *"four approved sheets lean on
R-4 and its text exists nowhere in the rulings file."* That is a defect in this file, not in
the ruling, and the lesson is the same one the sheets keep teaching each other — **a decision
that only exists as a citation is a decision nobody can check.**

**The finding it resolved:** `products` had no purchase trigger and `input` forbade one.
Monetization needed a surface to sell `Span` from; `input`'s verb list is closed, and ruling
R-1 had already contained its own overrule to *"one input class, two verbs, four controls"*
with an explicit bar on widening it. A store screen needs a fifth control and a sixth verb.

**The ruling:** the in-game store does not exist. `products.storeExists` is `false`,
`promptGamePassPurchaseCalls` is `0`, and the only surface on which the one product is
discoverable at all is the **Roblox experience page**, which this game does not draw and
cannot instrument. `F13` and `F19` hold: the game names, shows and prices nothing.

**The costs, stated because two of them were only discovered later:**

- **Discovery.** `monetization/01` recorded it at the time: a product nobody can see in-game
  converts worse than one they can.
- **Application latency.** Found in wave 5 by the Store UI lead. The in-experience prompt is
  the one mechanism the platform documents as updating the ownership cache *immediately*, so
  removing it converts an instant application into a several-minute one.
- **An unmeasurable funnel.** Found in wave 5 by Funnels. All six conventional purchase steps
  become unobservable — `storeExists: false`, `promptGamePassPurchaseCalls: 0`, F13, F19, F20
  — leaving only the join-time `state.owned` boolean, which is a structural constant while
  every `gamePassId` is `null`.

**Still true:** no sheet has argued the ruling is wrong. Three waves have built on it and each
found a further cost rather than a contradiction, which is the right shape for a ruling that
trades a known good for a known bad.

## Escalations that were resolved by the rulings above

Both are at the point the skill calls a design disagreement rather than a defect: the sheets
have argued, contained and flagged, and another round would produce the same sheet with more
words.

### 1. The input overrule — `mechanics/02-verb-roster`

`buy` is a discrete select on a persistent pressable, overruling the brief's `[brief: soft]`
*"Input: movement only. No aiming, clicking, or ability buttons."* Contained to one input
class, two verbs, four controls, stated in the manifest so a later sheet cannot widen it
without failing a criterion.

**Why it happened:** the walk-into pad was the literal-compliance answer and does not survive
arithmetic — 10.6 s round trip at depth 1, 13.0 s at `core-loop/05`'s 236-stud depth-4 area
with speed already maxed, both legs over cleared ground that pays nothing, and bounding the
detour under `core-loop/01`'s 3-second tick ceiling needs 25 pad clusters in one depth-1 area.

**The part worth your attention:** `core-loop/01` mandated no-travel *while believing the
surface that ruling requires could not be built* — it names "the persistent HUD that
`OPEN.md §4` already flags as unbuildable". `hud-overlay` exists and is a persistent HUD; what
it lacks is `PRESSABLE` **by default**, which is a default and not an incapability.

**Your call:** accept reading B as written, or reopen `core-loop/01`'s no-travel ruling now
that its premise is false. Four alternatives are ranked in the sheet's
`## Flagged to the developer`.

### 2. `relicsPerArea` is over-constrained by two approved sheets

- `core-loop/01` criterion 2 — `collection.relicsPerArea >= 4`
- `theme/fantasy/02` criterion 1 — `ceil(24 / relicsPerArea) >= 8`, i.e. `<= 3`, recommends 3
- `systems/05` partition equality — at a six-member set, only (6,1), (3,2), (2,3), (1,6)

**No value satisfies both, and neither sheet cites the other.** `meta/04` must overrule one and
will say which. The real resolution may instead be revising the brief's "4 sets of 6"
`[you accepted: R4 Q4]`, which is yours and not a writer's.

### 3. Meta resolved the deadlock and the fix edits a shipped sheet — `meta/04`

`meta/04-the-depth-ladder` takes `relicsPerArea` **3**, overruling `core-loop/01`'s `>= 4`,
and issues a **revision request** against `02-the-collection` rather than editing it:
`relicsPerArea` 6 → 3, `areasPerDepth` 1 → 2. **Four depths, two areas each, eight areas.**

**I have not applied it.** Two reasons it is yours and not mine:

- It changes a value the shipped game reads, and doubles the area count.
- It makes the duplicate problem **go live**. `systems/05`'s draw rule was built for exactly
  this (`relicsPerArea × areasPerDepth == |set|`, so `3 × 2 = 6`) and is a no-op only while
  `areasPerDepth` is 1. So the design is coherent — but the safety of "it is a no-op today"
  ends here.

**I verified it validates clean:** applying 3/2 to the merged manifest produces zero problems
against every existing `collection` check, including the uncompletable-set check. So this is a
decision about scope, not a technical blocker.

It is probably the same conversation as the under-scoping note below, and possibly resolved by
the same ruling — `meta/04` lists 4 sets of 12 (48 finds, 4 areas per depth) as its own live
alternative (a).

### Related, and probably the same conversation

The `must_verify` for content volume found **DIG ships two islands against a 601-item
collection**, gating the second on 50% journal completion rather than on power, with per-area
100% badges at a 0.4% win rate. This game ships four areas and a collection `core-loop/04`
dates at **minute 11 of session 1**. That is the under-scoping the check was pointed at.

## Open `[cid: decided]` questions for the developer

Wave 1 predates this file. Wave 2 raised **13**, the four that most want a ruling:

- **Completion events credit zero currency** (`systems/04`). The brief is silent, and
  `core-loop/02`'s `1/3/8/20/50` payoff weights are numerically identical to `tiers[].value`,
  which invites the opposite reading.
- **Purchase is a walk-into pad and the keyboard binding goes** (`mechanics/02`). Four
  alternatives were ranked in the sheet's `## Flagged to the developer`.
- **Chat is off on all three surfaces** (`social/01`), decided on the sourced platform default
  rather than on age-gating, which stayed `[unverified]`.
- **Jump exists at the platform default and gates nothing** (`mechanics/06`).

## Build-stage notes that must survive into the remaining modules

Written down because they are cross-module and a builder holding one brief cannot see them.

1. **`server-main` fires `UpgradeApplied`, not `progression`.** `wiring.onPurchase` step 5 and
   `Protocol`'s channel record both say so. A dispatch prompt of mine said `progression` fired
   it; the builder followed the contract over the instruction and reported the divergence,
   which is the right precedence and worth stating as such. Unresolved it is either a
   double-fire (the `upgradePurchased` cue plays twice) or silence (the 200 ms acknowledgment
   budget has nothing to measure). Order is fixed: `UpgradeApplied` first, then `StateChanged`.
2. **`progression` no longer exposes `clearRadius` / `valueMultiplier` / `walkSpeed`.**
   `Clearing.luau` still calls two of them and `Modifiers.luau` did not exist when they were
   deleted, so the tick errors inside its own pcall until both land. **The refactor is not
   atomic within one module** and the build order states no constraint forcing `modifiers`
   ahead of a stripped `progression`. Both must land before a playtest.
3. **`tryBuy` returns a bare boolean**, so whoever fires `UpgradeApplied` reads
   `state.upgrades[id]` back for the level rather than getting it from the return.
4. **A mid-session pass purchase does not apply until rejoin.** `entitlements` resolves
   ownership once at join and `F20` forbids persisting it; a purchase made on the experience
   page raises nothing server-side. R-4 removed the in-game store, and `F19` forbids every
   surface that could tell the player to rejoin. Latent while every `gamePassId` is null.
5. **`GameConfig.Economy.balanceCap` is `nil`, which Luau drops from the table entirely.** The
   emitter has no representation for an explicit null, so a module cannot distinguish "no cap"
   from "key never emitted". Harmless here — both mean do not cap — and worth knowing before a
   key relies on the difference.

## Wave 3 — 13 sheets, 3 domains, closed

`cid:verify` PASS 0 failures · `bridge` COMPLETE **25/25** · `architect` COMPLETE 7/7 ·
168 tests · Rojo builds · `config.spec.luau` passes.

Verification returned **FAIL** with 14 revision requests. All are closed. The four that mattered:

1. **Two wave-3 keys gave disjoint answers for one distance.** `meta/05` R8 required the
   nearest patch be ≥ 5.5 studs from spawn; `firstSession.placement` required ≤ 3.5. Both were
   solving "the reveal fires before the player gives input", in opposite directions, and
   neither cited the other. Meta **withdrew its own rule** — onboarding's arming gate is wired
   into `clearing` and merged, Meta's was not — and replaced it with a rule putting the second
   find inside onboarding's ordinal band on every seed rather than 14% of them.
2. **The radius pass broke the depth ladder and no footprint could fix it.** Owning all three
   passes put area 2 at a 54.5 s lap against a 75 s floor; row 2 was already at its under-buy
   cap, so resizing pushed the one-level-behind lap to 255.7 s. `meta/04`'s stated 3.94× bound
   did not reproduce (the real value-only threshold is ≈7×) and omitted `Span` entirely.
   Resolved by **withdrawing both value passes**; laps are now 93.5–93.0 s with 12% margin.
3. **Two sheets reversed an approved wave-1 ruling while citing it as support.**
   `theme/setting/04` W5 makes the inward opening passable whether or not the part is
   finished; `meta/04`'s `unlock` and `meta/06`'s barrier were that condition. Both now carry
   `## Pushing back` naming the sheet, and the barrier mechanism is withdrawn.
4. **`products` had no trigger and `input` forbade one.** Resolved by ruling R-4.

### Two errors Monetization found in its own prior work while re-deriving

- `H2` is **joint** across `radius` and `speed`, not per-axis: `τ = 2 · radius · speed`, so a
  factor on either multiplies it identically. The per-axis framing would have let a radius
  pass and a speed pass each clear their own check and break the lap together.
- Its "speed is not sold" argument rested on four set factors `meta/03` never allocated.

### Still open, recorded not fixed

- **Co-presence expires ~39 studs into a 3,000-stud lane.** Unfixable at any pitch — lane
  *length* defeats it, not pitch, and squares are strictly worse. Now stated as
  `scope: "spawnMomentOnly"`. Handed to `social/02` to re-derive.
- **A purchaser's effective clear radius at spawn is 9.625 studs, not 5.5.** Both
  `firstSession.placement` and the arming-gate geometry derive from `baseClearRadius`
  *unmultiplied*, so a player who bought `Span` before their first session sweeps a 1.75×
  wider disc on the first tick. Nobody has checked that case.
- **`Span`'s deliverable depends on a `tool` change nobody has agreed.** `products` criterion 4
  fails a build where head width does not move with the product; `mechanics/04` T11 says width
  moves with Reach *level* alone.

## Run state at the weekly-limit stop — 2026-08-02

**All three gates are green:** `cid:verify` PASS 0 failures · `bridge` COMPLETE 25/25, 0 problems ·
`npm test` 170 pass, 0 fail. Everything below is resumable from disk; nothing is half-written.

**All 55 domains have run.** The contract is **25 merged keys + 58 proposed**. Wave 1 produced 9 keys
from 35 sheets with 78% of it prose no build step could read; waves 4–7 ran 41 domains and every one
produced a key or a stated reason its subject has none.

### Category verdicts

| category | verdict |
|---|---|
| Gameplay (waves 2–4) | **PASS** |
| Audio | **PASS**, released |
| Analytics | **PASS** (conditional on two checklist narrowings, both applied to the graph) |
| UI/UX | PARTIAL 16/17 → both defects fixed and verified; **verdict not written** (agent died mid-close) |
| Tech & Data | erratum applied and verified; **final verdict never written** |
| Art & Visuals | round 3 in progress; **one real gap found, see below** |
| Live Ops | FAIL → 7 closed → **round 2 FAIL on one token**, see below |
| Discovery & Marketing | FAIL 7 → 5 closed; **Thumbnails RR-2 outstanding** |

### Outstanding work, precisely

1. **`art/environment/01` was never revised.** The Art verifier confirmed it still carries the stale
   reservation derivation and `batchingFactorFloor` **5.990** at lines 203–204 and 245, against the
   re-cut 16+6+11. Style Guide re-derived to 5.966; Environment did not. **This is the one substantive
   open defect.**
2. **`liveops/roadmap/01` AC2 fails on its own documentation.** Its new grep returns 1 — line 137's
   `idNamespaces.finding` says *"all number their rows N1 upward"*, space-preceded and therefore
   undotted. Fix is one token (`Nn`, or "from one upward"), or scope the criterion to citations rather
   than prose, which its own `rule` field already says.
3. ~~**`liveops/seasons/01`**~~ **CLOSED.** `reversalPath.buildCost` said *"none may carry a
   non-beat"* while naming `saveNotLoaded`, a non-beat, in the same sentence. Gone — the clause was
   deleted rather than reworded, in that sheet and in three others carrying copies of it. Verified:
   `grep -c "cannot carry a non-beat\|exactly two members, both beats" cid/liveops/seasons/01-*.md`
   returns 0. *This entry was itself stale for a round, which is the case for stating the grep
   beside the claim rather than a snapshot of it.*
4. **`marketing/thumbnails/01` criterion 3** asserts `slots[].pixelSize` and `slots[].format`; both
   live at `platform.*`, so the criterion returns undefined. Two of its criteria are also unverifiable
   against files it may not edit — it was mid-fix when it died.
5. **`liveops/events/01`** — two `collection.total` citations (lines 90, 214). It had found four more
   path defects of its own and was rewriting with a published `citedPaths` field when it died.
6. **UI/UX and Tech verdicts are unwritten.** Both categories' work is done and verified; only the
   verdict documents are missing.

### The `collection.total` phantom — resolved in four of six sites

`collection` holds `className`, `classPlural`, `relicsPerArea`, `areasPerDepth`, `sets`. There is no
`total`. Five sheets cited it in three spellings across three categories. Fixed: `marketing/name/03`,
`ui-ux/screens`, `ui-ux/hud/02`. Outstanding: `liveops/events/01` (×2), `ui-ux/store/01`. And
`gameplay/systems/05`'s `discovery.record.keyedBy` describes itself as keyed *"from
`collection.sets[].relics[].name`"* — the same phantom **inside a neighbouring key's own value**.

The canonical form is `sum(len(collection.sets[i].relics))`. `marketing/store-page/01` used it from
the start and is the model. HUD has filed a request to `collection`'s owner for a derived
`totalRelics`, noting that **five sheets across four categories independently invented a spelling of
it**, which is the argument for one derived field rather than five corrections.

### What the gates now catch that they did not before

- **explicit nulls in any merged value** — `validateManifest` walks every value and names the path.
  It found exactly the 16 sites `tech/deploy/02` had enumerated by hand, confirming that enumeration.
  All 16 are fixed with per-type sentinels; three needed judgement rather than substitution
  (`"unbounded"` twice, where `"none"` would have asserted zero; one restructured to a real value).
- **developer-facing keys** — `documentationOnly` is a schema flag and the emitter derives its
  exclusion set from it, so a promoted key no module reads cannot reach Luau by anyone forgetting a
  hand-maintained list.
- **banked research urls with a trailing backtick** — both collectors and the verifier's own copy of
  the regex now agree where a url ends.

### The defect this run kept finding, in six forms

A copied value, a copied path, a copied count, an id in a shared namespace, a phantom field, and a
grep that matches its own file. **Every one reads as safe.** Every one was found by a domain reading
another domain's work rather than by a gate.

Round 2 of Live Ops produced the structural answer three times independently: Events replaced a count
with a predicate over `notices.members[]`; Seasons constrained member *causes* at any list length
(*"a corrected number goes stale the same way"*); Roadmap banned its own key from stating a member
count at all. Community named the cause about itself: **all four of its defects were facts it copied
into criteria rather than derived from the key that owns them.**

Three domains now publish their full cross-key citation list as a manifest field with a
`resolvesToday` flag — VFX (36 paths), Screens (25), HUD (24) — which makes the check mechanical
rather than a sweep someone has to remember.

### Next, in order

1. Close items 1–5 above. All are single-field except `events/01`, which is mid-rewrite.
2. Write the UI/UX and Tech verdicts.
3. **Cross-category verification** — it now also owns the whole-project form of *"every measurable
   claim has a matching event"*, moved there because a wave-5 category cannot answer for wave-7 claims.
4. **Promote the keys**, in KPI's order: `telemetry` → `economyHealth` → `funnels` → promote all four →
   implement the `refGrammar` resolver. Ship the `sharedPredicate` check with it, with the Analytics
   verifier's three narrowings — `readBy[]` registered as a `refSites[]` entry, `field` as a
   `pathGrammar` path so uniqueness is well-defined, and **`definedBy` must name the key carrying the
   block**, without which two keys can each define a block for the other's field and reproduce the
   inversion inside the mechanism built to prevent it.
5. **Rebuild.** The punch list is concrete: re-emit against a brief-derived context (`fantasy-ornate`,
   not `cartoon-vibrant` from the Pet Ascend demo); `palettes.mjs:150` `MerriweatherBold` →
   `Merriweather`, which **raises rather than returning nil** and must land with the theme change;
   `Plots.luau:534`'s missing `slab.Color`; the `IsStudio` guard on the save loop and `onLeave`; the
   seven unreferenced demo screens and their briefs; and HUD's route-B composition, which closes the
   developer's reported duplicate-boxes defect with **zero ui-forge changes**.
