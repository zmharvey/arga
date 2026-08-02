# Seasons — domain index

**Category:** Live Ops · **Wave:** 7 · **Sheets:** 1

**Reads.** Brief, read on disk and not in retelling: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `03-META.md`, `05-OUTWARD.md`, `OPEN.md` (§1, §2, §4, §5). Category:
`cid/liveops/_category.md`. Approved sheets read in full: `cid/gameplay/meta/02-the-collection.md`,
`cid/gameplay/meta/03-set-bonuses.md`, `cid/gameplay/meta/07-after-the-last-find.md`,
`cid/gameplay/monetization/01-the-offer-ladder.md`, `cid/ui-ux/store/01-no-in-game-offer-surface.md`,
`cid/audio/music/01-whether-music-exists.md`, `cid/audio/stingers/03-subjects-with-no-cue.md`;
`cid/tech/deploy/01-the-release-contract.md` (`forbidden` `N1`–`N10`) and
`cid/analytics/kpis/02-the-shortlist.md` (`verdictRule.forbiddenActions`) read at the cited blocks.
State: `cid/_contract.md`, `cid/_state.md` (R-2, R-3, R-4), `cid/_digest.md`. Repo:
`game/src/shared/Types.luau`, `bridge/schema.mjs`, `docs/cid-workflow.json`.

**I own no merged contract key. I propose exactly one: `seasons`.**
`npm run bridge -- --contract` could not be executed — this session has no shell tool — so I read
`cid/_contract.md`, which `cid:leadpack` generates from `bridge/schema.mjs` by the same code path,
and cross-read the `SCHEMA` key list in `bridge/schema.mjs` directly: **25 keys, none named
`seasons`**, and none of the 9 queued wave-2 proposals or the wave 4–6 proposals claims it. Free to
claim, no collision.

---

## The ruling: a season resets, and this game's central state does not. `seasonCount: 0`.

Stated here because the category assigned the ruling to the index. The sheet carries it as data.
**Lead with the structural argument, not the scope gate** — the scope gate is soft and this is not.

1. **A season is a recurrence with a reset in it, and the reset is forbidden by a `[you chose]`.**
   *"Cleared is permanent. Overgrowth never comes back."* (`CONCEPT.md`, `01-FOUNDATION.md`)
   `[brief: binding]` ← `[you chose: R2 Q1]`, with rebirth cut in the same round
   `[you chose: R2 Q2]` and `HANDOFF.md` §2's *"Do not reintroduce them."* Every persisted quantity
   this game has is monotonic: `game/src/shared/Types.luau`'s `StoredState` is **seven fields** —
   `currency`, `upgrades`, `rowsRevealed`, `found`, `areasFinished`, `cleared`, `clearedCount` —
   and the only one that ever decreases is `currency`, at a purchase. `endgame` makes the terminal
   state **unbounded and permanent**, with `risingQuantity: "areasFinished"` and `gameEnds: false`.
   A season reset is the cut mechanic with a calendar bolted on. **This is the argument. It does not
   depend on priority 3 being right.**

2. **Only then, the scope gate — and its tag is stated honestly.** `03-META.md` priority 3 names
   *"seasons and events"* `[brief: soft]` ← `[I assumed — the ordering]`, and `OPEN.md §2` says
   *"Ships and settles. No seasons or events."* `[brief: soft]` ← `[I assumed]` at **0 interview
   questions** (`OPEN.md §1`). Neither is upgraded here. What holds them closed is `00-CORE.md`'s
   *"Beating the genre's retention curve. Offered and declined."* `[brief: binding]` ←
   `[you chose: R1 Q3]`, upheld by **ruling R-3**, which recorded and declined an under-scoping
   finding on exactly that ground.

3. **A paid track has no vehicle, and the platform's only recurring one is forbidden by name.**
   Ruling **R-4** removed the in-game store: `products.storeExists: false`, `itemCount: 1`,
   `devProductCount: 0`, `gamePassId: null`, `promptGamePassPurchaseCalls: 0`, `F19` forbidding a
   product being *"named, shown, priced or referred to anywhere inside the game"*, and `F15` closing
   text entry by grep. `F18` forbids *"subscription… recurring charge"*, and Roblox's own
   subscriptions are *"auto-renewing, not one-time purchases"*
   `[research: https://create.roblox.com/docs/production/monetization/subscriptions]` — so the one
   platform product that recurs on a period is the one product class this game already banned.
   A game pass is a permanent one-time grant, which is the opposite of a track that expires.

4. **A reward track is content access, and this game already has the only permanent-grant ladder it
   gets.** *"Permanent multipliers only. **Never content access.**"* `[brief: soft]` ←
   `[you accepted: R5 Q4]`, with `03-META.md`'s reason — *"A paid-only object would turn 100%
   completion into a purchase, which poisons the differentiating system."* And the shape a season
   track would occupy is taken: `setBonus` is **four rows, one per set, one axis each, factor 1.20**,
   granted at *"the reveal of the sixth Find of that set"*. **That ladder is earned by finding, not
   by elapsed time or by paying** — which is the finding below, and it is Meta's key, not mine.

5. **`endgame.forbidden` names `seasonPass` outright**, one of thirteen names whose acceptance
   criterion is that *"a case-insensitive search of `game/src` for each of them returns zero
   identifiers"* — verified this run: `game/src` contains **zero** matches for
   `season|battlepass|battle pass|reward track|carryover|legacyReward`. `release.forbidden` `N2`
   forbids *"any flag keyed to a date, a calendar or a season"*, `N3` any flag changing what content
   exists, `N9` any flag persisted into a save; `kpis.verdictRule.forbiddenActions` names
   *"a season"* and *"an event calendar"* directly, read at `02-the-shortlist.md:511-518`.

**The strongest counter-argument, found rather than assumed.** Roblox ships a **first-party Season
Passes feature package**: *"a limited-time, quest-based progression system"* with free and premium
tracks, tiers carrying an `upperBoundXP` threshold, `startUtc`/`endUtc` driving a season countdown,
a game-pass id for premium access, and DataStore-backed XP, requiring the Core and Missions packages
alongside it `[research: https://create.roblox.com/docs/resources/feature-packages/season-passes]`.
**So the build cost of a season here is genuinely low, and the sheet must say so rather than imply
the opposite.** It is still not takeable, and the package's own component list is why — every part
of it lands on a different approved prohibition: `startUtc`/`endUtc` on `release` `N2` and
`products` `F10` (*"no element updates on a clock"*); the premium track on R-4 and `F18`/`F19`;
tiered XP on *"never content access"* and on a second permanent-grant ladder beside `setBonus`;
the Missions dependency on `03-META.md`'s five-scope objectives table and its *"No mastery layer…
Stated so nobody invents one"*; DataStore XP on `StoredState`'s seven fields and `release` `N9`.
**Cheap to build is not the same as permitted to build**, and this is the one place a builder with
a package manager could add a season in an afternoon.

**And the genre does not require it.** The direct reference `[🌱] Grass Incremental Simulator` ships
**six real passes — 2x Walkspeed 29, 2x Rebirths 99, 2x Grass Luck 99, 2x EXP 99, 2x Bronze 199,
[OP] Giant Trimmer 2,500 — plus a "Test" pass at 495,130 R$ that is a developer artifact, and not
one of them is a season pass, battle pass or reward track**, at 38,571,201 visits, 96.187% likes and
1,259 current CCU, refetched this run
`[research: https://www.rolimons.com/game/133086043677134]`. Unlike Codes, this domain has **no**
sourced counter-evidence of the *"its absence reads as an unfinished game"* kind, and the sheet
should say that plainly rather than leave the asymmetry unstated.

---

## Every one of my node's five subjects, with the ruling that empties it and its observable

**None is dropped.** Four are vacuous; one contradicts a binding decision. All five go in the key.

| # | node subject | verdict | ruling that empties it | mechanically checkable observable |
|---|---|---|---|---|
| S1 | **season length** | vacuous — nothing has a length | `release.forbidden` `N2` *"any flag keyed to a date, a calendar or a season"*; `products` `F10` (no *"limited"*, *"ends in"*, *"today only"*; check: *"no element updates on a clock"*); `02-GAMEPLAY.md` *"Zero tension is deliberate"* `[brief: soft]` — a window is tension with a clock on it | `seasons` contains zero fields named `startUtc`, `endUtc`, `lengthDays`, `duration`, `expires`, `window` or `countdown`, and zero of any name whose value is a date; `seasonCount == 0` and `len(seasons.seasons) == 0` |
| S2 | **reward track tiers** | vacuous — and the permanent-grant ladder is already allocated | *"Permanent multipliers only. Never content access."* `[brief: soft]` ← `[you accepted: R5 Q4]`; `setBonus.rows` is exactly 4, one per `collection.sets[].id`, granted at the sixth Find of that set; `endgame.forbidden[seasonPass]` | `seasons.tierCount == 0` and `seasons.tiers == []`; the set of permanent-grant sources stays exactly `{upgrade ladder, set completion, product}` — `modifiers.sources` gains no fourth `sourceClass`, and `setBonus.rows` still has 4 entries whose `setId` multiset equals `collection.sets[].id` |
| S3 | **free vs paid track** | vacuous in both halves — no surface, no vehicle | R-4 and `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, `F13`, `F15`, `F18`, `F19`; the platform's only recurring product is auto-renewing by definition `[research: https://create.roblox.com/docs/production/monetization/subscriptions]` | `seasons.freeTrackExists == false` and `paidTrackExists == false`; `products.itemCount` stays 1 and `devProductCount` stays 0; `rg -i 'PromptGamePassPurchase\|PromptProductPurchase\|ProcessReceipt' game/src` returns 0, per `offerSurface` `C1` |
| S4 | **season reset rules** | **contradicts a binding decision — not merely unbudgeted** | *"Cleared is permanent. Overgrowth never comes back."* `[brief: binding]` ← `[you chose: R2 Q1]`; rebirth cut `[you chose: R2 Q2]`; `endgame` unbounded with `gameEnds: false`; `release.forbidden` `N9` (no flag persisted into a save) | `StoredState` has exactly **7** fields and no code path lowers `found`, `areasFinished`, `upgrades`, `cleared` or `clearedCount`; zero writes clear `found` or reset `areasFinished`; the save payload contains no `seasonId`, `seasonXp`, `resetAt` or `tierClaimed` field; `seasons.resetsAnything == false` and `fieldsResetBySeason == []` |
| S5 | **carry-over and legacy rewards** | vacuous — **and the question it usually answers is already answered by another domain against a different mechanism** | There is no season to carry from. The terminal-state form of the same question — a permanent state where the collection is complete and two of three stingers are extinct — is settled by `endgame` (*"buries nothing"*, `endScreen: false`, `survivingPayoffKinds: ["currencyTick","areaCompletion"]`) and by wave 6's `stingers.forbidden[completionCeremony]` (*"any cue, chord, fanfare or resolution at 24 of 24"*, `terminalState.replacementCue: none`) and `music` finding `F1`. **Cited, not re-decided** | `endgame.survivingPayoffKinds` stays exactly `["currencyTick","areaCompletion"]` and `extinctPayoffKinds` exactly the other three of `core-loop/02`'s five — a legacy reward would be a sixth payoff kind and fails that partition; `stingers.cueCount` stays 3; `seasons.legacyRewards == []` and `carryOverRules == []` |

## What the brief gave me

- *"Cleared is permanent. Overgrowth never comes back."* `CONCEPT.md` / `01-FOUNDATION.md` ·
  `[you chose: R2 Q1]` → **`[brief: binding]`**. The sentence this whole domain turns on.
- *"No rebirth."* `01-FOUNDATION.md` · `[you chose: R2 Q2]` → **`[brief: binding]`**, with
  *"Reframing it as 'seasons' and making it optional were both declined"* — **the brief declined the
  word `seasons` by name, in an interview answer, one layer above priority 3.** This line is the
  single most load-bearing thing my node was given and the category brief does not quote it.
- *"Beating the genre's retention curve. Offered and declined."* `00-CORE.md` ·
  `[you chose: R1 Q3]` → **`[brief: binding]`**. Upheld by R-3.
- *"Target: the smallest game that still gives every creative area real work."* `00-CORE.md` ·
  `[you chose: R1 Q3]` → **`[brief: binding]`**.
- *"Permanent multipliers only. Never content access."* `03-META.md` · `[you accepted: R5 Q4]` →
  `[brief: soft]`.
- *"Zero tension is deliberate"* and *"nobody downstream should invent tension to fill the gap"*.
  `02-GAMEPLAY.md` / `HANDOFF.md` §4 · `[you accepted: step 6 Q2]` → `[brief: soft]`, relayed by
  `HANDOFF.md` at binding strength **on the instruction**.
- Priority 3: *"…codes · daily rewards · leaderboards · trading · **seasons and events**"*.
  `03-META.md` · `[I assumed — the ordering]` → `[brief: soft]`.
- *"Ships and settles. No seasons or events."* `OPEN.md §2` · `[I assumed]` → `[brief: soft]`,
  **0 interview questions**.
- *"new authored chunks can be added without touching systems, so extension is cheap if ever
  wanted."* `OPEN.md §2` / `05-OUTWARD.md` · `[brief: soft]`. **A statement about content
  extensibility, not a licence for scheduling machinery** — and it is Roadmap's, not mine.

## What the brief did not give me

Five gaps, each routed by kind of work. None is filled here.

| # | gap | routed to |
|---|---|---|
| **G-S1** | **Whether this game has any recurring structure at all was never asked.** Live-ops intent sits at 0 interview questions (`OPEN.md §1`) and priority 3's ordering is `[I assumed]` (`OPEN.md §5` row 7). **Both of my soft closers are un-interviewed**, so the ruling must rest on the binding lines and say which ones. | sheet `01`, and **flagged to the developer** with a costed reversal path |
| **G-S2** | **The brief never says whether *"Cleared is permanent"* binds the save or only the world.** The sentence is about overgrowth. A season that reset `currency` and `upgrades` while leaving `cleared` and `found` alone would not literally breach it, and no approved sheet closes that reading. **This is the crack a future season would come through and it is the likeliest place this ruling gets contradicted.** | sheet `01` must state which reading it takes — the whole of `StoredState`, per `endgame`'s permanence and `release` `N9` — and make it an observable rather than an assertion |
| **G-S3** | **No sheet says what happens to an entitlement that expires**, because none can: `entitlements` resolves ownership once at join, `products` `F20` forbids persisting it, and `F18` forbids anything recurring. There is no expiry path anywhere in the design. If `F18` is ever reopened, this is unowned work. | ownership-resolution and offer-ladder work *[Gameplay — Monetization]*; recorded, not filled |
| **G-S4** | **Even a season that existed could not be announced.** `notices` carries exactly two members, both completion beats; `products` `F19`; `release.shutdown.playerFacing: "nothing"`; and the brief states **no off-Roblox presence anywhere** (category `G1`). The referent for "tell players a season started" is empty. | feedback-intake and channel work *[Live Ops — Community]* and external-announcement work *[Discovery & Marketing]*; cited by sheet `01` as part of the reversal cost |
| **G-S5** | **No contract key records why a live-ops subject is empty**, so an empty subject is indistinguishable from an unrun one at the seam. `seasons` is the proposal that fixes it for this subject; `music.trackCount == len(music.tracks)` is the pattern for the invariant an empty key needs. | contract-and-seam work *[owner of `bridge/schema.mjs`]* |

## Why 1 sheet

**One contract key, one decision, one sheet.** `--contract` (read as `cid/_contract.md` plus the
`SCHEMA` list in `bridge/schema.mjs`) shows this domain owning nothing and needing `seasons`, so the
count starts at one and the rules give me no second. **What I considered and did not assign:**

- **A sheet for the `setBonus`-is-already-the-reward-track finding.** It constrains `setBonus`,
  which is Meta & Content's key. The second-sheet allowance is for a rule constraining a key **I**
  own; this one is not, so it ships as a finding inside sheet `01` and a consequence line, exactly
  as the category asked — *"State that as a finding if you find it; do not redesign `setBonus`."*
- **A sheet for the Events seam.** Duration and recurrence are stated once in the category brief.
  Restating Events' ruling in my own words is one decision described twice, which is the wave-1
  failure with a different subject.
- **A sheet for carry-over and legacy rewards.** `endgame` and `stingers` already ruled the
  terminal-state form of that question. A second copy under my name is two sheets claiming one
  ruling; it becomes row `S5` above and a citation.
- **Anything that reserves shape for a future season.** The category scope gate fails a sheet that
  reserves space for, stubs or describes a priority-3 item, and `tech/deploy/02` settles the general
  case: *an explicit null and a never-emitted key are the same bytes.* Zero is a value; a
  placeholder is a violation with an empty value in it.

| # | sheet | must decide |
|---|---|---|
| 01 | `no-season-structure` | Rule and prove that this game has no season, no reward track and no reset, and carry the ruling as the proposed contract key `seasons` with `seasonCount: 0`, an explicit empty `seasons` list, `tierCount: 0`, `freeTrackExists: false`, `paidTrackExists: false`, `resetsAnything: false`, `fieldsResetBySeason: []`, `carryOverRules: []` and `legacyRewards: []` — declared values only, never a null, never a reserved tier row, track slot, calendar field or `seasonId`, because `tech/deploy/02` makes a null and a missing key the same bytes and the scope gate forbids holding room. **Lead the argument with permanence, not with priority 3:** a season resets and this game's state does not — *"Cleared is permanent. Overgrowth never comes back"* `[brief: binding]` ← `[you chose: R2 Q1]`, rebirth cut `[you chose: R2 Q2]` in an answer that explicitly declined *"reframing it as 'seasons'"*, `endgame` unbounded with `gameEnds: false` and `risingQuantity: "areasFinished"`, and `game/src/shared/Types.luau`'s `StoredState` at exactly seven fields of which only `currency` ever decreases; then state priority 3 and `OPEN.md §2` at their true tags (`[brief: soft]` ← `[I assumed]`, 0 interview questions) and rest the closure on `00-CORE.md`'s binding *"Beating the genre's retention curve. Offered and declined"* upheld by ruling R-3, without upgrading either soft line. Carry all five of this node's subjects as rows in the key — season length, reward track tiers, free vs paid track, season reset rules, carry-over and legacy rewards — each with the approved sheet that empties it and an observable that is a count, a grep or a field-set equality, never a judgment: length against `release.forbidden` `N2` and `products` `F10`'s *no element updates on a clock*; tiers against *"Permanent multipliers only. Never content access."* and against `setBonus`'s four rows; the paid track against ruling R-4, `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, `F13`, `F15`, `F18`, `F19`; the reset against `StoredState`'s seven monotonic fields and `release.forbidden` `N9`; and carry-over by **citing** `endgame` (`buries nothing`, `endScreen: false`, `survivingPayoffKinds` exactly `["currencyTick","areaCompletion"]`) together with wave 6's `stingers.forbidden[completionCeremony]` and `music` finding `F1` — the terminal state is where a legacy reward would earn its keep and is the one place three approved sheets independently forbid one, so state that it was checked and not re-decided. **Engage the strongest counter-argument rather than omitting it:** Roblox ships a first-party Season Passes feature package giving free and premium tracks, `upperBoundXP` tiers, `startUtc`/`endUtc` countdowns, a game-pass id and DataStore XP with a Missions dependency `[research: https://create.roblox.com/docs/resources/feature-packages/season-passes]`, so the build cost is genuinely low — say so, then map each of its components onto the approved prohibition it lands on, and note that the platform's only recurring product is auto-renewing by definition `[research: https://create.roblox.com/docs/production/monetization/subscriptions]`, which is precisely what `products` `F18` bans. State that this domain, unlike Codes, has **no** sourced *"its absence reads as an unfinished game"* counter-evidence, and support it with the reference's own pass list — six real passes plus a developer "Test" artifact, none of them a season pass, battle pass or reward track, at 38,571,201 visits and 96.187% likes `[research: https://www.rolimons.com/game/133086043677134]`. Carry a `forbidden[]` in `endgame.forbidden`'s proven flat-name-plus-parallel-rulings form covering at minimum: a season, a battle pass, a reward or premium track, a tier ladder, season XP, a claim button, a countdown or *ends in* string, a season-scoped reset of any persisted field, a carry-over rule, a legacy or veteran reward, a returning-player grant, a seasonal cosmetic or variant, and a reserved season slot, bus or empty tier row — each with the approved sheet that closes it and an observable that is a count or a grep. Include a `finding` stating that `setBonus` is already this game's permanent-grant ladder — four rows, one per set, one axis each, granted at the sixth Find of that set — so a season track would be a **second** one, and route it as a finding without redesigning `setBonus` or touching any of its values. Include the gap `G-S2` explicitly: the brief's permanence sentence is written about overgrowth, so say which reading you take (the whole of `StoredState`, per `endgame`'s permanence and `release` `N9`) and make it an observable rather than an assertion, because that is the crack a future season comes through. Carry a `reversalPath` naming what a developer overrule would license, what it would cost in build terms given no store, no notice channel, no text entry, no second currency, no off-Roblox channel to announce on, and `release.provisioning`'s six manual gates for any new pass id — and state that reversal costs zero removal work today because this key holds no instance, id, slot or row. Finish with 3–4 acceptance criteria a build is failed against, including that a case-insensitive search of `game/src` for each of `endgame.forbidden`'s thirteen names returns zero identifiers (verified zero this run), that `StoredState` still has exactly seven fields with no season-derived member, and that the count of `null` tokens anywhere in your `manifest` block is 0. |

## Verification note

**The one sheet is most likely to be contradicted by three parties, in this order.**

*By the developer, on `G-S2`.* The permanence sentence is written about overgrowth. If a developer
ever wants a soft season that resets only `currency` and `upgrades`, no line in the brief literally
stops it, and my ruling would be read as having overreached. That is why the sheet must state its
reading and make it checkable rather than assert permanence in general.

*By Discovery & Marketing — Icon and Thumbnails*, which owns *"seasonal and event variants"* by
name. `seasonCount: 0` removes the referent for half of that subject. That is a consequence of my
ruling and I state it rather than assign it; a variant with no season behind it is a marketing
artifact question, not a reopening of this key.

*By the Roadmap lead.* An **ordered content sequence with no dates** is not a season, and nothing in
my sheet may forbid one — `release` `N2` forbids date-keyed flags and nothing forbids an ordering.
If the writer's `forbidden[]` reaches an unordered-versus-ordered distinction, it has crossed into
Roadmap's subject. The seam is the clock and the reset, not the sequence.

## Research owed

**`must_verify` for `seasons-lead` in `docs/cid-workflow.json` is empty.** I fetched anyway, because
whatever I bank is the only external evidence my writer can cite.

Fetched and banked:

- **Roblox's first-party Season Passes feature package** — *"a limited-time, quest-based progression
  system in which players can complete quest objectives to earn rewards"*, free and premium tracks,
  tiers with an `upperBoundXP` threshold, `startUtc`/`endUtc` driving a season countdown, a game-pass
  id for premium access, DataStore-backed XP, and a hard dependency on the Core and Missions
  packages. The docs do **not** state what happens to progress at season end, which is itself worth
  recording: the package's own carry-over behaviour is unspecified on the page I read.
  `[research: https://create.roblox.com/docs/resources/feature-packages/season-passes]`
- **Roblox subscriptions are recurring by construction** — *"auto-renewing, not one-time
  purchases"*, benefits persist only while payment is maintained, mutually exclusive subscriptions
  are not supported, local-currency subscriptions require an ID- or phone-verified account and are
  unavailable in eleven listed countries. This is the only platform vehicle for a paid track that
  expires, and `products` `F18` bans it by name.
  `[research: https://create.roblox.com/docs/production/monetization/subscriptions]`
- **The reference's live pass list, refetched:** 2x Walkspeed 29 · 2x Rebirths 99 · 2x Grass Luck 99
  · 2x Bronze 199 · 2x EXP 99 · [OP] Giant Trimmer 2,500, plus an offsale "Nothing" and "2x Grass"
  and a "Test" pass at 495,130 R$ that is a developer artifact and must not be averaged into
  anything. **None is a season pass, battle pass or reward track.** 38,571,201 visits, 96.187%
  likes, 1,259 current CCU — visits and CCU both moved since the last banking (38,488,789 / 1,659),
  so the figures are live rather than stale. `[research: https://www.rolimons.com/game/133086043677134]`

Could not settle:

- **Whether season passes are near-universal in Roblox incrementals**, the claim that would be this
  domain's equivalent of Codes' *"their absence reads as an unfinished game"*. Search surfaced the
  feature package and two guide articles characterising simulator monetization as multipliers,
  auto-clickers, luck boosts and rebirth loops, with no season structure named for any incremental.
  **No source states a prevalence figure, and I record that as unavailable rather than as absence.**
  `[research owed: a listing-page survey of the pass lists of the ten games named in
  research/landscape.md, which would give a denominator for "how many incrementals in this family
  ship a season or battle pass" — the same shape of check `music` ran against the muted-play claim]`
- `npm run bridge -- --contract` could not be run: **no shell tool in this session.** Substituted by
  reading `cid/_contract.md` (generated from `bridge/schema.mjs` by the same code path) and the
  `SCHEMA` key list in `bridge/schema.mjs` directly. The 25-key list is read from the artifact that
  command writes; only the live coverage report was not printed.

## Findings outside my subject, passed up rather than acted on

1. **`setBonus` is this game's reward track, and nothing says so.** Four permanent grants on a
   ladder, one per set, sized at 1.20 and earned by finding rather than by elapsed time or payment.
   No sheet frames it as the answer to "does this game have a progression track", which is why a
   later reader could conclude the game has none and propose one. *Stated for Meta & Content and for
   the final cross-category pass; no value of theirs is touched.*
2. **A builder can add a season in an afternoon with a supported package.** This is the only
   priority-3 item on my list with a first-party drop-in implementation, so the usual "it would be
   expensive" backstop does not exist here. **The prohibitions and their greps are the whole of what
   stops it**, which raises the value of `endgame.forbidden`'s thirteen-name search from a formality
   to the actual guard. *Routed to contract-and-seam work: this is an argument for promoting the
   forbidden-name search into a `bridge/merge.mjs` check rather than leaving it a build-report item.*
