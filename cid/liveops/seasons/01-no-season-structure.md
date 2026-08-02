# 01 — No season structure

**Domain:** liveops/seasons · **Category:** Live Ops · **Wave:** 7

## Decision

**This game has no season, no reward track, no tier ladder and no reset: `seasonCount: 0`, with
every one of this domain's five subjects declared empty rather than deferred.** Nothing is
reserved — no tier row, no track slot, no calendar field, no `seasonId`.

## Why

**The brief declined this mechanism by name, in an interview, at the hardest tag available.**
`01-FOUNDATION.md` cuts the reset mechanic `[brief: binding]` ← `[you chose: R2 Q2]` and records
in the same answer that *"Reframing it as 'seasons' and making it optional were both declined."*
That is a developer decision about **this exact mechanism**, one layer above the priority-3 list,
and it is the strongest ground this sheet stands on. `HANDOFF.md` §2 relays it as an instruction:
*"Do not reintroduce them."*

**The structural argument, which does not depend on scope being right.** A season is a recurrence
with a reset in it. Every persisted quantity this game has is monotonic:
`game/src/shared/Types.luau`'s `StoredState` is **seven fields** — `currency`, `upgrades`,
`rowsRevealed`, `found`, `areasFinished`, `cleared`, `clearedCount` — and the only one that ever
falls is `currency`, at a purchase `[research: game/src/shared/Types.luau]`. `endgame` makes the
terminal state unbounded and permanent, `gameEnds: false`, `risingQuantity: "areasFinished"`
`[research: cid/gameplay/meta/07-after-the-last-find.md]`. Against *"Cleared is permanent.
Overgrowth never comes back"* `[brief: binding]` ← `[you chose: R2 Q1]`, **a season reset does not
merely lack a budget here; it contradicts what this game is.**

**The soft lines are relayed at their true tags and not upgraded.** `03-META.md` priority 3 names
*"seasons and events"* `[brief: soft]` ← `[I assumed — the ordering]`, and `OPEN.md §2` says
*"Ships and settles. No seasons or events."* `[brief: soft]` ← `[I assumed]` at **0 interview
questions** (`OPEN.md §1`). Neither carries this alone. What closes it is `00-CORE.md`'s
*"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` ←
`[you chose: R1 Q3]`, upheld by ruling **R-3**, which recorded and declined an under-scoping
finding on exactly that ground `[research: cid/_state.md]`.

**Which reading of permanence I take, stated because it is the crack (G-S2).** The brief's
sentence is written about overgrowth, so a season resetting only `currency` and `upgrades` would
not literally breach it. **I take the whole of `StoredState`**: `endgame` makes permanence a
property of the save rather than of the foliage, and `release.forbidden` `N9` forbids *"any flag
persisted into a player's save"* `[research: cid/tech/deploy/01-the-release-contract.md]`.
`[cid: decided]` — and it is an observable in the key, not an assertion, because an assertion is
what a future season walks around.

**The strongest counter-argument, carried rather than omitted: a season here is cheap.** Roblox
ships a **first-party Season Passes feature package** — *"a limited-time, quest-based progression
system"* with free and premium tracks, tiers carrying an `upperBoundXP` threshold,
`startUtc`/`endUtc` driving a countdown, a game-pass id for premium access and DataStore-backed
XP, with a hard dependency on the Core and Missions packages
`[research: https://create.roblox.com/docs/resources/feature-packages/season-passes]`. **So the
usual "it would be expensive" backstop does not exist here, and the prohibitions and their greps
are the whole of what stops it.** Every component lands on a different approved prohibition, and
`counterArgument.componentMapping` in the key does that mapping row by row. The platform's only
recurring product is *"auto-renewing, not one-time purchases"*
`[research: https://create.roblox.com/docs/production/monetization/subscriptions]` — precisely
what `products` `F18` bans by name.

**And unlike Codes, this domain has no sourced counter-evidence at all.** No source states that a
season's absence reads as an unfinished game. The direct reference ships six real passes —
2x Walkspeed 29, 2x Rebirths 99, 2x Grass Luck 99, 2x EXP 99, 2x Bronze 199, [OP] Giant Trimmer
2,500 — plus a "Test" pass at 495,130 R$ that is a developer artifact, and **not one of them is a
season pass, battle pass or reward track**, at 38,571,201 visits, 96.187% likes and 1,259 current
CCU `[research: https://www.rolimons.com/game/133086043677134]`. That is one game, not a
prevalence figure, and I do not present it as one.
`[research owed: a listing-page survey of the pass lists of the ten games named in
concept/spec/incremental-spinoff-v2/research/landscape.md, giving a denominator for how many
incrementals in this family ship a season or battle pass — the shape of check `music` ran against
the muted-play claim]`

**The finding, routed and not acted on: `setBonus` is already this game's reward track.** Four
permanent grants on a ladder, one per set, one axis each, factor 1.20, granted at *"the reveal of
the sixth Find of that set"* `[research: cid/gameplay/meta/03-set-bonuses.md]` — **earned by
finding, not by elapsed time and not by paying.** A season track would be a *second*
permanent-grant ladder beside it, which is why `modifiers` gaining a fourth source class beyond
`upgrade-level`, `set-completion` and `purchase` is the observable on S2
`[research: cid/gameplay/systems/06-modifier-stacking.md]`. I touch no value of `setBonus`.

**Carry-over was checked against three approved sheets and not re-decided.** The terminal state is
the one place a legacy reward would earn its keep: `endgame` buries nothing with
`endScreen: false`; `stingers.forbidden[completionCeremony]` forbids *"any cue, chord, fanfare or
resolution at 24 of 24"* with `terminalState.replacementCue: none`
`[research: cid/audio/stingers/03-subjects-with-no-cue.md]`; and `music` finding `F1` says the
terminal state is where music would earn its keep and is the one place it cannot be added
`[research: cid/audio/music/01-whether-music-exists.md]`. **A legacy reward would be a sixth
payoff kind and fails `endgame`'s partition of `core-loop/02`'s five.**

| # | subject | verdict | what empties it | observable |
|---|---|---|---|---|
| S1 | season length | vacuous — nothing has a length | `release.forbidden` `N2` *"any flag keyed to a date, a calendar or a season"*; `products` `F10` (*"no element updates on a clock"*); `02-GAMEPLAY.md` *"Zero tension is deliberate"* `[brief: soft]` | `seasonCount == len(seasons) == 0`; zero fields named `startUtc`, `endUtc`, `lengthDays`, `duration`, `expires`, `window` or `countdown`, and zero fields of any name holding a date |
| S2 | reward track tiers | vacuous — the permanent-grant ladder is already allocated | *"Permanent multipliers only. Never content access."* `[brief: soft]` ← `[you accepted: R5 Q4]`; `setBonus.rows` is 4, one per `collection.sets[].id`; `endgame.forbidden[seasonPass]` | `tierCount == 0` and `tiers == []`; `modifiers`' `sourceClass` enum keeps exactly its three values (`upgrade-level`, `set-completion`, `purchase`) and gains no fourth; `setBonus.rows` still has 4 entries |
| S3 | free vs paid track | vacuous in both halves — no surface, no vehicle | ruling R-4; `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, `F13`, `F15`, `F18`, `F19`; the platform's only recurring product is auto-renewing `[research: https://create.roblox.com/docs/production/monetization/subscriptions]` | `freeTrackExists == false` and `paidTrackExists == false`; `products.itemCount` stays 1 and `devProductCount` stays 0; `offerSurface` `C1` — `rg -i 'PromptGamePassPurchase\|PromptProductPurchase\|ProcessReceipt' game/src` returns 0 |
| S4 | season reset rules | **contradicts a binding decision, not merely unbudgeted** | *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]`; the reset mechanic cut `[you chose: R2 Q2]`; `endgame.gameEnds: false`; `release.forbidden` `N9` | `StoredState` has exactly 7 fields; no code path lowers `found`, `areasFinished`, `upgrades`, `cleared` or `clearedCount`; the save payload contains no `seasonId`, `seasonXp`, `resetAt` or `tierClaimed`; `resetsAnything == false`, `fieldsResetBySeason == []` |
| S5 | carry-over and legacy rewards | vacuous — **cited, not re-decided** | no season to carry from; the terminal-state form is settled by `endgame` (`endScreen: false`), `stingers.forbidden[completionCeremony]` and `music` `F1` | `endgame.survivingPayoffKinds` stays exactly `["currencyTick","areaCompletion"]` and `extinctPayoffKinds` exactly the other three; `stingers.cueCount` stays 3; `carryOverRules == []` and `legacyRewards == []` |

```manifest
{
  "provides": "seasons",
  "status": "proposed",
  "value": {
    "seasonCount": 0,
    "seasons": [],
    "tierCount": 0,
    "tiers": [],
    "freeTrackExists": false,
    "paidTrackExists": false,
    "trackCount": 0,
    "resetsAnything": false,
    "fieldsResetBySeason": [],
    "carryOverRules": [],
    "legacyRewards": [],
    "reservedSlots": 0,
    "calendarFieldCount": 0,
    "persistedFieldsAdded": [],
    "reason": "A season is a recurrence with a reset in it. 01-FOUNDATION.md cut the reset mechanic at [you chose: R2 Q2] in an answer that explicitly declined reframing it as seasons, and every persisted quantity in StoredState is monotonic except currency. The soft scope lines (03-META.md priority 3, OPEN.md section 2) are relayed at [brief: soft] and do not carry this; 00-CORE.md's binding retention non-goal, upheld by ruling R-3, does.",
    "permanenceReading": {
      "question": "G-S2 -- the brief's permanence sentence is written about overgrowth, so does it bind the world or the save?",
      "taken": "the whole of StoredState",
      "basis": "endgame makes the terminal state permanent as a property of the save; release.forbidden N9 forbids any flag persisted into a player's save",
      "observable": "StoredState has exactly 7 fields -- currency, upgrades, rowsRevealed, found, areasFinished, cleared, clearedCount -- and no code path lowers found, areasFinished, upgrades, cleared or clearedCount",
      "status": "cid decided"
    },
    "subjectVerdicts": [
      { "id": "S1", "subject": "season length", "verdict": "vacuous", "closedBy": "release.forbidden N2; products F10; 02-GAMEPLAY.md zero tension", "observable": "seasonCount == 0 and len(seasons) == 0; zero fields named startUtc, endUtc, lengthDays, duration, expires, window or countdown, and zero fields of any name holding a date" },
      { "id": "S2", "subject": "reward track tiers", "verdict": "vacuous", "closedBy": "03-META.md 'Permanent multipliers only. Never content access.'; setBonus.rows == 4; endgame.forbidden[seasonPass]", "observable": "tierCount == 0 and tiers == []; the modifiers sourceClass enum keeps exactly its three values upgrade-level, set-completion and purchase; setBonus.rows still has 4 entries whose setId multiset equals collection.sets[].id" },
      { "id": "S3", "subject": "free vs paid track", "verdict": "vacuous", "closedBy": "ruling R-4; products.storeExists false, itemCount 1, devProductCount 0, F13, F15, F18, F19", "observable": "freeTrackExists == false and paidTrackExists == false; products.itemCount == 1 and devProductCount == 0; offerSurface C1 grep returns 0 matches in game/src" },
      { "id": "S4", "subject": "season reset rules", "verdict": "contradicts a binding decision", "closedBy": "'Cleared is permanent' [you chose: R2 Q1]; the reset mechanic cut [you chose: R2 Q2]; endgame.gameEnds false; release.forbidden N9", "observable": "StoredState has exactly 7 fields and no season-derived member; the save payload contains no seasonId, seasonXp, resetAt or tierClaimed; resetsAnything == false and fieldsResetBySeason == []" },
      { "id": "S5", "subject": "carry-over and legacy rewards", "verdict": "vacuous -- cited, not re-decided", "closedBy": "endgame (buries nothing, endScreen false); stingers.forbidden[completionCeremony]; music finding F1", "observable": "endgame.survivingPayoffKinds stays exactly [currencyTick, areaCompletion] and extinctPayoffKinds exactly the other three of core-loop/02's five; stingers.cueCount stays 3; carryOverRules == [] and legacyRewards == []" }
    ],
    "forbidden": [
      { "name": "season", "what": "a named recurring period of any length, dated or undated", "closedBy": "01-FOUNDATION.md [you chose: R2 Q2] declining the seasons reframing; 00-CORE.md retention non-goal; release.forbidden N2", "observable": "case-insensitive search of game/src for 'season' returns zero identifiers" },
      { "name": "battlePass", "what": "a paid progression ladder bought once and advanced over a period", "closedBy": "ruling R-4; products F18, F19; endgame.forbidden[seasonPass]", "observable": "case-insensitive search of game/src for 'battlepass' and 'battle pass' returns zero identifiers; products.itemCount == 1" },
      { "name": "rewardTrack", "what": "any ordered list of grants unlocked by accumulating a period-scoped quantity", "closedBy": "03-META.md 'never content access'; setBonus is the only permanent-grant ladder", "observable": "case-insensitive search of game/src for 'reward track' and 'rewardtrack' returns zero identifiers; modifiers gains no fourth sourceClass" },
      { "name": "premiumTrack", "what": "a second track whose rows require a purchase to claim", "closedBy": "ruling R-4; products.storeExists false; F19 forbids naming a product anywhere in the game", "observable": "paidTrackExists == false; zero PromptGamePassPurchase calls in game/src; products.devProductCount == 0" },
      { "name": "tierLadder", "what": "numbered tiers with a threshold per tier, whether or not anything is granted", "closedBy": "03-META.md 'Permanent multipliers only. Never content access.'; setBonus.rows == 4", "observable": "tierCount == 0 and tiers == []" },
      { "name": "seasonXp", "what": "a second progression quantity accumulated toward tiers", "closedBy": "02-GAMEPLAY.md 'solve duplicates without adding a currency'; currency is one; StoredState is 7 fields", "observable": "StoredState has exactly 7 fields; no field named seasonXp, xp, points or progress exists in the save payload" },
      { "name": "claimButton", "what": "any control that collects a pending grant", "closedBy": "input is closed at five verbs and four pressables (mechanics/02, ruling R-1)", "observable": "input.gameDrawnPressables is still 4 and the verb list still has 5 members" },
      { "name": "countdownString", "what": "a countdown, timer, 'ends in', 'limited' or 'today only' string attached to anything", "closedBy": "products F10; theme/tone/04 D9-D10; 02-GAMEPLAY.md zero tension", "observable": "zero player-facing strings match /limited|ends in|today only|last chance|expires|season/i; no element updates on a clock" },
      { "name": "seasonReset", "what": "a period-scoped reset, wipe, rollover or decay of any persisted field", "closedBy": "'Cleared is permanent' [you chose: R2 Q1]; release.forbidden N9; endgame.gameEnds false", "observable": "resetsAnything == false; fieldsResetBySeason == []; no code path lowers found, areasFinished, upgrades, cleared or clearedCount" },
      { "name": "carryOverRule", "what": "any rule converting one period's progress into the next", "closedBy": "there is no period; endgame is unbounded and continuous", "observable": "carryOverRules == [] and seasonCount == 0" },
      { "name": "legacyReward", "what": "a legacy, veteran, founder or early-player grant of any kind", "closedBy": "endgame buries nothing and endScreen is false; stingers.forbidden[completionCeremony]; music F1", "observable": "legacyRewards == []; endgame.survivingPayoffKinds stays exactly [currencyTick, areaCompletion]; stingers.cueCount == 3" },
      { "name": "returningPlayerGrant", "what": "a welcome-back, absence or re-join reward, including a first-login-of-the-period grant", "closedBy": "03-META.md priority 3 (daily rewards); endgame.forbidden[dailyReward]; offline accrual cut, following [you chose: R2 Q1]", "observable": "case-insensitive search of game/src for 'welcomeback', 'daily', 'streak' and 'login' returns zero identifiers; StoredState carries no timestamp" },
      { "name": "seasonalCosmetic", "what": "a seasonal skin, variant, dressing, palette swap or holiday reskin of any object or area", "closedBy": "products F7 (no cosmetics, no display system); release.forbidden N3 (no flag changing what content exists); music M12", "observable": "no products[] entry changes any instance parented to the character other than the tool head's width; zero date-conditional branches select an asset" },
      { "name": "reservedSeasonSlot", "what": "a reserved slot, empty tier row, placeholder calendar field, null seasonId or 'for a future update' stub", "closedBy": "the category scope gate; tech/deploy/02 -- an explicit null and a never-emitted key are the same bytes", "observable": "the count of null tokens in this manifest block is 0; reservedSlots == 0 and calendarFieldCount == 0" }
    ],
    "counterArgument": {
      "claim": "a season is cheap here: Roblox ships a first-party Season Passes feature package, so the usual 'it would be expensive' backstop does not exist",
      "source": "https://create.roblox.com/docs/resources/feature-packages/season-passes",
      "accepted": true,
      "consequence": "the prohibitions above and their greps are the whole of what stops a builder adding one in an afternoon",
      "componentMapping": [
        { "component": "startUtc / endUtc season countdown", "landsOn": "release.forbidden N2 and products F10 -- no element updates on a clock" },
        { "component": "premium track behind a game-pass id", "landsOn": "ruling R-4, products F18 and F19 -- no store, no purchase surface, no product named in the game" },
        { "component": "tiers with an upperBoundXP threshold", "landsOn": "03-META.md 'never content access', and a second permanent-grant ladder beside setBonus" },
        { "component": "DataStore-backed season XP", "landsOn": "StoredState's seven fields and release.forbidden N9" },
        { "component": "the Missions package dependency", "landsOn": "03-META.md's objectives table and its 'No mastery layer. Stated so nobody invents one'" }
      ],
      "noCounterEvidence": "unlike Codes, no source states that a season's absence reads as an unfinished game; the direct reference ships six passes and none is a season pass, battle pass or reward track (38,571,201 visits, 96.187% likes, 1,259 CCU)"
    },
    "finding": {
      "id": "FS1",
      "to": "Meta and Content, and the final cross-category pass",
      "text": "setBonus is already this game's reward track -- four permanent grants, one per set, one axis each, factor 1.20, granted at the reveal of the sixth Find of that set -- and it is earned by finding rather than by elapsed time or payment. No sheet frames it as the answer to 'does this game have a progression track', which is why a later reader could conclude it has none and propose one. A season track would be a second such ladder.",
      "valuesTouched": "none",
      "solved": false
    },
    "reversalPath": {
      "licensedBy": "a developer overrule of 01-FOUNDATION.md [you chose: R2 Q2] and of 00-CORE.md's retention non-goal; the two soft scope lines are not sufficient on their own",
      "removalWorkToday": "zero -- this key holds no instance, id, slot, row or persisted field, so nothing is deleted to reverse it",
      "buildCost": [
        "a persisted period identifier and a period-scoped quantity, against StoredState's seven monotonic fields and release.forbidden N9",
        "a reset writer that lowers a field nothing currently lowers except currency",
        "a claim surface: a sixth verb and a fifth pressable, against input's closed roster and ruling R-1's measured cost for adding one",
        "a purchase path for any paid half: R-4 removed the store, so products F13, F18 and F19 reopen together",
        "a new pass id, inheriting release.provisioning's six manual gates -- publish first, one gate blocked on an unanswered Networking question",
        "an announcement channel: notices has exactly two members, both completion beats; release.shutdown.playerFacing is 'nothing'; the brief states no off-Roblox presence anywhere (category gap G1)",
        "an instrument to tell whether it worked: zero analytics calls exist in game/src and five of eight kpis rows are readableToday false"
      ]
    },
    "invariants": [
      "seasonCount equals len(seasons), and both are 0",
      "tierCount equals len(tiers), and both are 0",
      "freeTrackExists and paidTrackExists are both false, and trackCount equals 0",
      "resetsAnything is false and fieldsResetBySeason is empty",
      "carryOverRules, legacyRewards and persistedFieldsAdded are all empty",
      "subjectVerdicts has exactly 5 rows, one per graph subject, each with a closedBy and an observable",
      "no forbidden[].name appears as an identifier anywhere in game/src, case-insensitively",
      "this key contains no null token, no reserved slot, no date-valued field and no seasonId"
    ]
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Icon and thumbnail work *[Discovery & Marketing]* | **You lose the referent for "seasonal and event variants."** There is no season behind a variant, so that half of your subject becomes a store-artifact question — whether an asset may be swapped with no season existing — and not a reopening of this key. I state the loss; I do not decide your artifact policy. |
| Roadmap work *[Live Ops]* | **An ordered content sequence with no dates is not a season and nothing here forbids one.** My seam is the clock and the reset, not the sequence: `release` `N2` closes date-keyed flags and nothing closes an ordering. A drop may not carry a period label, a reset, a claim or a track. |
| Set-bonus work *[Meta & Content]* | **`setBonus` is named as this game's only permanent-grant ladder and no value of it moves.** Its four rows are why S2 is empty. A fifth permanent-grant source class in `modifiers` breaks my S2 observable before it breaks yours. |
| Offer-ladder work *[Gameplay — Monetization]* | **There is no paid track to price**, so the "price of a paid track" item this node does not own resolves to nothing. `products.itemCount` staying 1 and `devProductCount` staying 0 are observables of my ruling as well as yours. |
| Persistence and state-shape work *[Tech & Data, `architect`]* | `StoredState` stays at seven fields with no `seasonId`, `seasonXp`, `resetAt` or `tierClaimed`, and no writer lowers `found`, `areasFinished`, `upgrades`, `cleared` or `clearedCount`. That check is what keeps G-S2 closed. |
| Contract-and-seam work *[owner of `bridge/schema.mjs`]* | `seasons` is proposed with `seasonCount == len(seasons)` as its invariant, on `music.trackCount == len(music.tracks)`'s pattern. **Promoting this key's and `endgame.forbidden`'s name searches into a `bridge/merge.mjs` check is worth more here than elsewhere**, because a supported first-party package makes this the cheapest priority-3 item to add by accident. |
| Events work *[Live Ops]* | Duration and timing of a one-off are yours; the recurring, tiered, resetting structure is mine and is ruled zero. I restate none of your ruling. |

## Acceptance criteria

1. `seasons.seasonCount == 0`, `len(seasons) == 0`, `tierCount == 0`, `len(tiers) == 0`,
   `freeTrackExists == false`, `paidTrackExists == false`, `resetsAnything == false`, and
   `fieldsResetBySeason`, `carryOverRules`, `legacyRewards` and `persistedFieldsAdded` are each
   length 0; the count of `null` tokens anywhere in this sheet's `manifest` block is **0**.
2. A case-insensitive search of `game/src` for each of `seasons.forbidden[]`'s 14 names and each
   of `endgame.forbidden`'s 13 names returns **zero** identifiers. Verified zero this run for
   `season|battlepass|battle pass|reward track|carryover|legacyReward|tierClaimed|seasonXp`.
3. `game/src/shared/Types.luau`'s `StoredState` has exactly **7** fields — `currency`, `upgrades`,
   `rowsRevealed`, `found`, `areasFinished`, `cleared`, `clearedCount` — the save payload contains
   no `seasonId`, `seasonXp`, `resetAt` or `tierClaimed`, and no code path lowers `found`,
   `areasFinished`, `upgrades`, `cleared` or `clearedCount`.
4. `endgame.survivingPayoffKinds` is exactly `["currencyTick","areaCompletion"]`,
   `stingers.cueCount` is 3, `modifiers`' `sourceClass` enum still has exactly three values,
   `products.itemCount` is 1 and `products.devProductCount` is 0.

## Flagged to the developer

**Both scope lines closing this domain are un-interviewed (G-S1)** — priority 3's ordering is
`[I assumed]`, and `OPEN.md §2`'s live-ops sentence sits at **0 interview questions**. The ruling
does not rest on them: it rests on `[you chose: R2 Q2]` declining the seasons reframing by name,
on *"Cleared is permanent"*, and on the binding retention non-goal. But the *soft* half of the
case is thin, and a supported first-party package makes this the cheapest priority-3 item to
reverse. **Recommendation: hold `seasonCount: 0`.** Reversal costs zero removal work today and
its build cost is itemised in `reversalPath`; the first thing it needs is a persisted field that
falls, which is the sentence `[you chose: R2 Q1]` bought.

## Not decided here

The price of a paid track and every Robux figure — *[Gameplay — Monetization]*, which holds
`products`. One-off limited content, its duration and its unspent-currency handling — *[Live Ops
— Events]*, which holds `events`. Whether an ordered, dateless content sequence exists at all —
*[Live Ops — Roadmap]*, which holds `roadmap`. Any value inside `setBonus`, including whether it
is framed as a progression track — *[Meta & Content]*, via finding `FS1`. What the terminal state
sounds like or grants — `endgame`, `stingers` and `music`, cited above and not reopened. Whether a
store icon or thumbnail may carry a variant with no season behind it — *[Discovery & Marketing —
Icon and Thumbnails]*. The shape and checks that would promote `seasons` from a proposal —
*[owner of `bridge/schema.mjs`]*.
