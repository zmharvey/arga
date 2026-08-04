# Gameplay — verification, wave 2, round 2 (stage 2: Systems · Mechanics · Multiplayer & Social)

**Status: PARTIAL**

All sixteen round-1 revision requests are genuinely closed. Three defects remain, all
single-line edits with no design content in them, and one item has reached the point where it
is a developer decision rather than a defect. Stage 3 does not spawn today; it spawns after F1
and F2 land, which is one revision round with no argument in it.

**Scope re-read in full this pass:** the 12 wave-2 sheets, the 3 adopted sheets, `_category.md`,
`cid/_digest.md` including its new consequences column, `core-loop/01` and `02` in full, the
Build Capability Registry node, `cid/_research/pack.md` for every URL cited this wave,
`bridge/verify-sheets.mjs`, `bridge/schema.mjs`, `game/src/shared/Layout.luau`,
`game/src/server/Plots.luau`, `ui-forge/src/compose/patterns/hud-overlay.mjs` and
`modal-grid.mjs`. The mechanical half was taken as clean per the wave brief and not re-run;
where I depended on it I read the checker's source instead of trusting the summary, and that is
how F3 was found.

---

## Round 1: what was found, and whether it was closed

Sixteen requests, sixteen closed. **None papered over.** Five were closed by a different route
than the one requested, and in four of those five the route taken is better than the route
asked for. Evidence for each, re-derived rather than accepted:

| # | file | verdict | how I checked it |
|---|---|---|---|
| R1 | `mechanics/06` | **closed** | `traversal.boundary` now carries `"opaque": false` and `"sightlineObstruction": "none"`; the Environment consequence adds "may not be opaque along the inter-plot axis"; criterion 2 tests it. `social/02` criterion 3 now survives the barrier. |
| R2 | `systems/05` | **closed, different route, better** | The exclusion filter was rejected. Placement is now `placementIsPlayerIndependent: true`, seed-only. I verified this against the code rather than the sheet: `Layout.build()` "takes no seed and no slot argument" and runs `Random.new(LAYOUT_SEED)` with `LAYOUT_SEED = 1` (`Layout.luau:27, 72, 85`). Because clearing a patch is what reveals its Find, an unfound Find's patch is uncleared by induction, so the failure class is removed rather than moved. New criterion 4 tests the exact scenario R2 described. See F-note 1 for the one residual. |
| R3 | `mechanics/02` | **closed as a sheet can close it; now an escalation** | The pad is gone. See "The one open decision" below. |
| R4 | `mechanics/05` | **closed** | `sequencedBeats` is now `["upgradePurchased","findReveal","setComplete","areaComplete"]`. I checked it against the source, not the summary: `core-loop/02:101` reads "the order is fixed: reveal → set completion → area completion". Matches, and `sequenceOrderOwner` names the sheet. |
| R5 | `mechanics/05` | **closed** | `minOnsetGapSeconds: 0.6`, range `[0.35, 0.9]`, `minOnsetGapOwner` names `core-loop/02`. `core-loop/02:107` reads "Minimum onset separation **0.6 s** `[playtest unknown]`, test range 0.35 to 0.9 s". Verbatim. |
| R6 | `systems/06` | **closed** | `axis` enum, all three `mayTarget` arrays and `axes[2].id` are `speed`. Criterion 1 now asserts "no manifest value anywhere uses `pace` as an id". `"Pace"` survives only as `label`, which is what `balance/01` ships. |
| R7 | `mechanics/06` | **closed** | `traversal.collision` is down to `{ playerVsWorld: true, playerVsPlayerOwner: "social.characterCollision" }`. No group name, no `pushable`, no `standOnOtherPlayers`. `social/01` criterion 2's grep for one group name now returns one. |
| R8 | `systems/04` | **closed** | `authority` restated as "server only; no client message carries a cost, an amount or a balance, and whether a client message exists at all is input's". |
| R9 | `mechanics/02` | **closed, different route, better** | Not a renamed zero. Two named arrays: `clientOriginatedRemotes: ["RequestState","BuyUpgrade"]` and `clientRemotesFiredByPlayerInput: ["BuyUpgrade"]`, with `RequestState`'s survival stated as a consequence. A builder can no longer delete it by honouring the manifest. |
| R10 | `mechanics/02` | **closed** | Reading A is restated as "the game binds no input of its own"; the Decision separates three platform verbs from two game verbs; criterion 1's second clause is now "no verb's only path is a keyboard key". The false claim is gone from every occurrence. |
| R11 | `systems/05` | **closed** | `entries: "sum(collection.sets[].relics.length)"`, `persistenceRequirement` and `growth` both read "one boolean per name in collection", criterion 1 rewritten relationally. No `24` remains as a roster size anywhere in `cid/gameplay/systems` (grepped). |
| R12 | `mechanics/02` | **closed by withdrawal, and the withdrawal is complete** | No `markedPlace`, no `keepClearRadiusStuds`, no `areaSpawn` placement anywhere in the sheet or its manifest. `worldObjectsTriggeringAVerb: 0`. Both consequences are marked withdrawn by name. One stale inbound reference survives in another file; see F-note 2. |
| R13 | `mechanics/03` | **closed** | P3 is now "no verb the game defines requires an input **the game binds** other than a single activation of one pressable"; P5 is "every **game-drawn** pressable is `Selectable` ... and intersects neither the platform's movement nor its jump control region". A correct build passes both. The sheet says why in `## Why`. |
| R14 | `systems/05` | **closed to the letter of the requested fix** | The constellation-token description is gone. What remains is one sentence naming the shape and stating "deliberately not described here: it is the priority-2 refinement, and this design ships without it". This is the closest call in the wave and I am passing it, because it is exactly the fix the previous pass specified and re-narrowing it now would be moving the goalposts. |
| R15 | `systems/05` | **closed** | `## Pushing back` now names `core-loop/04` and its recommendation (i), states `areasPerDepth ∈ {1,2,3,6}` at a 6-member set, caps the collection at 24 laps against the ~59 modelled, and says why that still clears `core-loop/04`'s criterion. It also names `core-loop/05` arguing the other way and places itself between them. |
| R16 | `social/02` | **closed, different route, better** | Not the requested `20/1080 ≈ 1.9%`. The derivation re-runs at 1280×720 and the floor becomes 20 px on a 720-tall viewport, restated as **2.78% of viewport height**, which is the correct construction: S is one world distance and must be set by the worst viewport, so a percentage floor makes the criterion testable anywhere and yields the same S. I re-derived the arithmetic (below) and it is right. |

**`social/02`'s arithmetic, re-derived rather than sanity-checked**, because a changed number
that fails the shipped build has to be right. With `H·(h/d)/(2·tan(θ/2))`, `h` = 5 studs,
θ = 70°, `2·tan35° = 1.4004`: at H = 720 and a 20 px floor, `d = 3600/(20 × 1.4004) = 128.5`.
S ≈ 128 confirmed. The shipped 160-stud pitch gives `2570.7/160 = 16.1` px, so "16 pixels
against a 20-pixel floor" is right. The range endpoints check out: 30 px → 85.7, 14 px → 183.6,
stated as 85 to 185. The old figure reproduces too: at H = 1080, `d = 192.8`, which is the
S = 190 the previous derivation gave. The sheet's conclusion that no centred spawn satisfies S
at any gutter is also right and is the sharper half: plot width is at least `area.size + 24`
= 144 studs at depth 1 from `mechanics/06`'s margin, and 144 > 128 before a gutter is added.
**Its three requirements on area-arrangement work are stated as requirements, not as decisions
it does not own**, and each names the owner. (a) and (b) are pure requirements; (c) states a
mechanism ("face along the plot row") alongside its requirement ("at least one occupied
neighbour inside the default camera frustum at spawn with no input"), which is loose but
harmless because criterion 1 tests the requirement and not the mechanism.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every currency has at least one faucet and one sink | **PASS** | `economy.faucetCount: 1` / `sinkCount: 1`, unchanged this round. `atMaxLadder` still states the exhaustion as a testable requirement rather than inventing a second sink, and `forbidden` still bars "a second currency under any name". |
| 2 | every reward granted anywhere has a source system | **PASS** | Currency → `economy.faucets[patch-clear]`. Find record → `discovery.record`. Set bonus → `modifiers.sources[set-completion]`, whose `assignmentOwner` now names content-structure work for the axis and Balance for the factor. Purchase bonus → `modifiers.sources[purchase]`. Tool → `tool.grantedAt: "spawn"`. `setComplete` event → `mechanics/05`. **The one carrier gap is unchanged and still not a failure:** no key holds which axis each set targets. Recorded again below. |
| 3 | every mechanic maps to a verb the brief's control scheme actually supports | **FAIL — check is wrong** | `buy` and `openIndex` are activations of a game-drawn pressable. On the brief's strictest reading ("No aiming, clicking, or ability buttons") that is an input the control scheme excludes, and `mechanics/02` says so plainly rather than wriggling. I am failing the check and not the sheet. Reasoning and the narrowing are in "The checklist itself". |
| 4 | no system requires an input the brief's control scheme does not have | **FAIL — check is wrong** | Same cause: `economy`'s only sink resolves through `input.verbs[buy]`, which now needs a press. Same narrowing. Nothing else in the wave requires an input: `systems/05`'s reveal is a consequence of clearing, `social/*` requires none and forbids the two that would add one at `03` X12, `mechanics/04` T4 refuses a Roblox `Tool` instance precisely because it would grant a third bound verb. |
| 5 | **no sheet contradicts a ruling in an approved sheet of an earlier stage** without a `## Pushing back` section naming that sheet and its ruling | **PASS** | Four candidates, all compliant. `systems/05` overrules `02-GAMEPLAY.md`'s "guarantees repeat finds" premise and forecloses `core-loop/04` recommendation (i), both named in `## Pushing back`. `systems/03` overrules `03-META.md`'s "hide rarer sets" reading, named in `## Pushing back`. `mechanics/02` overrules a `[brief: soft]` line, named in `## Pushing back` with its tag and its source sheet. `mechanics/05` and `mechanics/06` now comply with rather than contradict the sheets they used to cross. **The check's arrival is what made the wave legible:** every overrule in stage 2 is now in one named section per sheet, which is what let this pass audit them in one read. |
| 6 | a value that **is** the shape of a key the domain owns belongs in that key's manifest with `[playtest unknown]` and a test range; a tuning coefficient goes to Balance and is set nowhere else | **FAIL**, one instance | `social/02`'s S = 128 is the shape of `social`, the domain owns `social`, `social/01` supplies it and is revisable, and S is not in it. The sheet names the field it would occupy (`social.maxCoPresenceSeparationStuds`) and stops. **The harm is not hypothetical: F1 exists because S lives in prose and got copied stale.** Everything else this round is clean, including the two new values (`input.pressable.debounceSeconds` 0.35 with range 0.2–0.6; `mechanics/04`'s `headWidthBaseStuds` now carrying the test range it lacked) and the one inherited value (`response.minOnsetGapSeconds` 0.6, which is a citation with `minOnsetGapOwner` attached, not a second setting, and is the only route by which `core-loop/02`'s figure reaches a build at all). Balance-side half evaluated at stage 4, per the check's own text. |
| 7 | no sheet reserves space for, stubs, describes or specifies a priority-2 or priority-3 item; naming one in order to forbid it is compliant | **PASS** | Under the narrowed wording `social/03`'s fourteen prohibitions, `systems/04.forbidden`, `social/01`'s "Not decided here" and `social/02`'s candidate-touch table all pass, which is the outcome the narrowing was written for. `systems/05`'s R14 fix passes, narrowly, as recorded above. No priority-3 violation anywhere. |
| 8 | the loop closes: the last step feeds the first | **PASS, and improved by this round** | `modifiers.effective(value/radius/speed)` feeds `economy.faucets[patch-clear].formula` and the clearing radius test. Step 4 no longer carries a traversal cost: `travelRequiredToPurchase: "none"` and criterion 3 tests it from the far corner of a depth-1 and a depth-4 area. Round 1 failed this in substance and passed it structurally; round 2 passes it in both. |

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** Re-checked all ten binding rows against
  the 12 sheets. Clean. Nothing reintroduces rebirth, offline accrual, procgen, a threshold
  unit, a second currency, a failure state or tension. The one `[brief: soft]` contradiction
  found in round 1 (the keep-clear disc) is withdrawn. The one that remains is
  `mechanics/02`'s deliberate, contained, flagged overrule of the input line.
- **2 to 4 acceptance criteria that two people could not disagree about.** **One violation:
  `systems/05` carries 5** (F3). Every other sheet is 3 or 4. On the "could not disagree" half,
  all four sheets the previous pass failed are fixed: `mechanics/02` criterion 1 no longer
  claims what `jump` disproves, `mechanics/03` criterion 1 now rests on P3/P5 a correct build
  passes, `mechanics/05` criterion 3 is scoped to the coincident case so it no longer fights
  the sheet's own "a lone sequenced beat is never delayed", and `social/02` criterion 1 measures
  at the viewport the audience actually holds.
- **No sheet specs content excluded by `03-META.md` priority 3.** PASS.
- **No sheet names a capability absent from the Build Capability Registry.** PASS, and the
  round-1 escalation is closed correctly. The registry now records both patterns and the real
  limit ("`hud-overlay` marks nothing `PRESSABLE` by default, which is a default rather than a
  proven incapability"). I verified both halves in the source: `hud-overlay.mjs:4` is "Persistent
  readouts drawn over live gameplay" and `:11` is "nothing here is `PRESSABLE` by default";
  `PRESSABLE` is a real construct that the compiler already emits, defined at
  `modal-grid.mjs:20` and used at `:126, :240, :381`. So `mechanics/02` and `03` are naming a
  parameter change to an existing pattern, and both state it as an explicit build-stage request
  with the file named, which is the second branch the registry's own description sanctions.
  **One stale copy of the old claim survives outside the sheets:** `_category.md:823-826` still
  quotes "A persistent HUD is not yet buildable". Category brief, not a sheet; recorded so it
  is not read as authority.
- **Every `[research: url]` corresponds to a real fetched source.** PASS, and spot-verified by
  hand rather than taken from the tool: all ten distinct URLs cited across the wave's sheets
  appear as fetched entries in `cid/_research/pack.md`, including the four new ones behind the
  R3 reversal. The repo-path citations (`ui-forge/.../hud-overlay.mjs`, `game/src/client/Input.luau`,
  `game/src/server/Plots.luau`) are exempt by rule and each names a file I opened and confirmed.
  **Worth stating because it cuts against the sheet:** the pack's own entry for the tycoon pad
  concludes "This makes purchase a movement-only verb ... It dissolves the standing contradiction".
  `mechanics/02` cites that source accurately for what it establishes and departs from its
  conclusion on a ground the source does not address. That is the correct handling of a source
  you disagree with, and it is why the R3 reversal reads as a decision rather than a preference.
- **Every `[cid: decided]` tag is flagged upward.** PASS. Every sheet carrying one also carries
  a `## Flagged to the developer` or a `## Pushing back` naming the alternatives.
  `mechanics/02`'s is the strongest in the wave: four ranked alternatives, its own first, with
  the condition under which each becomes right.

---

## Revision requests

Three. Each is one file, one problem, one fix, and none of them requires a decision.

### F1 · `cid/gameplay/mechanics/06-traversal-affordances.md` — the area-arrangement consequence cites a separation figure `social/02` deleted this round, and understates the collision by three depth tiers

**Violates:** cross-sheet consistency inside the wave; the finding lands on wave 3's largest
domain on its first read.
**Evidence:** line 127-129 reads "it pushes the pitch past `social/02`'s S = **190** starting
value toward its **300**-stud ceiling, so **plot pitch has to decouple from area size by depth 4**".
`social/02` now sets S = 128 with a test range of 85 to 185. Neither 190 nor 300 exists any
more. The consequence is not just stale, it points the wrong way: at S = 128, `mechanics/06`'s
own 12-stud margin makes plot width `area.size + 24` = 144 studs at depth 1, which already
exceeds S, and `social/02` states in terms that "the shipped pitch misses S by 32 studs" and
that no centred spawn satisfies S at any gutter. The decoupling is required **at depth 1**, not
by depth 4. A wave-3 area-arrangement agent reading `mechanics/06` concludes depth 1 is fine;
reading `social/02` it concludes depth 1 is already broken. That is two builders diverging on a
sheet each of them is entitled to trust.
**Fix:** replace the two literals with a citation. "at `gameplay/core-loop/05`'s 236-stud
depth-4 area it pushes the pitch further past the separation `social/02` requires, which
`social/02` states is already unmet at depth 1, so plot pitch has to decouple from area size
from depth 1 onward." Do not restate S as a number in this sheet at all.

### F2 · `cid/gameplay/social/01-server-and-co-presence.md` — the `social` key has no field for the separation `social/02` derives, so the only number in the domain reaches a build as prose

**Violates:** check 6, "a value that **is** the shape of a key the domain owns belongs in that
key's manifest, marked `[playtest unknown]` with a test range".
**Evidence:** `social/02` derives S = 128 `[playtest unknown]`, range 85 to 185, names the field
it would occupy ("`social.maxCoPresenceSeparationStuds`") and does not create it, because it
carries no manifest block and `01` is the sole supplier of `social`. `01` is a wave-2 sheet, is
revisable, and its manifest is `"status": "proposed"` against a schema that has no `social` key
at all (grepped `bridge/schema.mjs`: no match), so adding one field costs nothing and breaks
nothing. The consequence of not adding it is F1: a number with no home gets copied, and copies
go stale. This is the same structural fault the previous pass predicted for
`collection.sets[].bonus`, arriving early and in a domain that can still fix it.
**Fix:** add to the `social` manifest, beside `maxPlayers`:
`"maxCoPresenceSeparationStuds": { "value": 128, "testRange": [85, 185], "marker": "playtest unknown", "derivedBy": "gameplay/social/02-presence-sufficiency", "requirement": "from any occupied plot's spawn point, at least one other occupied plot's spawn point lies within this distance with an unobstructed sightline" }`,
and add one line to `## Consequences for other work` saying the figure is `02`'s derivation and
that no other sheet may restate it.

### F3 · `cid/gameplay/systems/05-the-find-ledger.md` — five acceptance criteria against an invariant of two to four

**Violates:** the universal acceptance-criteria invariant, and the `System X` node's
`acceptance_criteria` contract ("Ends with 2-4 criteria").
**Evidence:** criteria 1 through 5. The count went from 4 to 5 when R2's requested rejoin test
was added, so this is the round-1 fix overrunning rather than a pre-existing fault. The tool
does not catch it: `bridge/verify-sheets.mjs:91-92` fails only at zero criteria and warns only
above eight, so `cid:verify` passing says nothing about this invariant.
**Fix:** fold criterion 5 into criterion 3. Criterion 5 tests the defect path, which
`discovery.repeat.runtimeBehaviour` already states in the manifest, and criterion 3 already
walks every area at every depth. "Clear every area at every depth for one player: no name is
placed on a patch twice, `foundCount` reaches `sum(collection.sets[].relics.length)`, and the
repeat branch never enters; forced into it by a layout that assigns a name outside its slice,
the server logs a warning naming the Find and the patch index and the reveal channel does not
fire." That is one criterion, still objective, and it takes the sheet back to four.
**While you are in the file:** line 186 and the prose budget both want the same cut. See the two
notes below.

---

## The one open decision, which is not a defect

**`mechanics/02` overrules `[brief: soft]` "Input: movement only. No aiming, clicking, or
ability buttons." This is round 2 of a 3-round cap, and it should not go to round 3 as a
revision. It should go to the developer as a question.**

I tested the argument rather than accepting it, and the argument holds on every checkable part:

- **The premise is true.** `core-loop/01:257-258` does say the no-travel purchase surface "is
  the persistent HUD that `OPEN.md §4` already flags as unbuildable by the current `ui-forge`
  pattern set". It mandated no-travel while believing the surface could not be built. The
  surface exists (`hud-overlay.mjs`), and what it lacks is a default, not a capability.
- **The arithmetic is right.** Depth 1: `120√2 = 169.7` studs at speed 16 is 10.6 s. Depth 4:
  `236√2 = 333.8` studs at 25.6 is 13.0 s. Both legs cross paid-out ground against a 3-second
  currency-tick ceiling. Bounding the detour under that ceiling needs pads about every 24 studs,
  which is 25 clusters in a depth-1 area. I checked each figure and each is correct.
- **The overrule is contained exactly as claimed**, and the containment is enforced rather than
  asserted: `gameBoundInputClasses: ["pressable"]` (one class), two entries with
  `boundByGame: true` (two verbs), `gameDrawnPressables: 4` (four controls), and both
  `mechanics/02` criterion 2 and `mechanics/03` P2 assert the count, so a later sheet cannot
  widen it without failing a criterion.
- **Device parity still holds and is stronger than before.** P3 and P5 are narrowed to the
  game's own surface, which is the only surface parity is a claim about; the platform's controls
  are parity-complete already. `mechanics/03` criterion 2 ("a player on a touch device with no
  keyboard and no gamepad can raise every axis to maximum") is the check that closes
  `CLAUDE.md`'s largest known gap, and it could not have been written under the pad.
- **Nothing else in the wave still assumes a pad**, in substance. Grepped. Two prose
  cross-references survive and are recorded below; neither carries a value.

**What the developer is deciding**, in one paragraph so it can be ruled on in one read: the
brief's line is `[brief: soft]` from a step-6 confirmation, and `_category.md` explicitly grants
Mechanics the latitude to argue against it ("the bar is high, not infinite"). The wave-2 research
pass recommends the pad and says it "dissolves the standing contradiction". `core-loop/01`, a
stage-1 approved sheet, rules the pad out by name on pacing. The compliant third option is
automatic purchase of the cheapest affordable level, which costs zero inputs and zero travel and
deletes the only choice the player makes in a game with no failure state. There is no design
that satisfies the brief line, `core-loop/01` and a live step 4 at once. `mechanics/02` picked
the arithmetic over the brief line, contained it, and flagged it with four ranked alternatives.
That is the correct output for a sheet. The ruling is not a sheet's to make.

---

## Noted, deliberately not acted on

Each meets neither bar in `CLAUDE.md`'s stopping rule.

1. **`systems/05:186` cites a constraint that no longer exists.** "Not decided here" still lists
   "Whether the guaranteed first patch survives `mechanics/02`'s keep-clear disc". The disc was
   withdrawn this round. No builder diverges (there is nothing to build either way) and the cost
   is one wave-3 agent looking for something that is not there. Cheapest to delete while F3 is
   being made.
2. **`systems/04:44` describes `mechanics/02`'s first draft as current.** "which `mechanics/02`
   deletes by making `buy` an occupancy trigger with the purchase adjudicated server-side". `buy`
   is a discrete select on a pressable now. The operative ruling in the same paragraph, and the
   manifest value it produced, are both correct and both survive either design, which is why this
   is below the bar rather than at it. Two words.
3. **`mechanics/_lead.md:196-201` still lists the pad as an unfetched open question** that "could
   change 02's answer". It was fetched, it is in the pack, and 02 answered. Planning document, not
   a spec sheet, and no downstream reader is routed to it.
4. **`systems/05` is about 10% over the 100-line prose budget** (`verify-sheets.mjs:215`), which
   warns rather than fails, having absorbed four requests. F3's cut and note 1 together take most
   of it back.
5. **`core-loop/02` states its own onset separation two ways** — 0.6 s at line 107, "at least
   0.35 s" at lines 21 and 258, where 0.35 is the bottom of its own range. Wave-1 approved sheet,
   out of scope, and `mechanics/05` inherited the 0.6 correctly. Recorded so nobody reads
   `mechanics/05` as having picked a number.
6. **`mechanics/06` carries invented geometry with no marker or range** (`walkableMarginStuds: 12`,
   `boundary.heightStuds: 20`). The previous pass audited these and passed them; nothing changed
   this round, and re-raising a number audit already done carefully would be manufacturing a
   finding.
7. **`input.gameDrawnPressables: 4` is `upgrades.length + 1` written as a literal**, and goes stale
   silently if the axis count moves. The axis count is brief-bound at three, so it will not.
   Same class as the derived literals the previous pass recorded.
8. **Whether the index modal covers the purchase pressables is unstated.** `mechanics/02` says the
   three purchase controls are "never gated behind another screen" and separately that the index
   screen is modal. A builder could read those two ways. The player consequence is closing a panel
   before buying.
9. **`openIndex` rides on the input overrule without its own argument.** The pacing case is about
   purchase. The index opener is one more control in the same declared class, a walk-to opener
   would carry the same travel cost, and the manifest is explicit about it, so no builder diverges.
10. **`mechanics/01` criterion 1 still does not deliver its stated intent** (radius 5.5 against
    spacing 6). Merged, shipped, already recorded twice. Re-confirmed, not re-raised.

---

## The checklist itself

Three of the previous pass's four escalations were accepted and are working: the new
earlier-stage check is what made every overrule in this wave auditable in one read, the rewritten
number check stopped failing merged keys, and the narrowed priority check stopped failing
`social/03`. The registry node is unstaled and correct. **One escalation remains, and it is new.**

**Checks 3 and 4 protect a `[brief: soft]` item more absolutely than check 5 protects an approved
sheet. That is an inversion, and it is why I failed the checks rather than the sheets.**

Check 5 permits contradicting an approved stage-N−1 ruling if the sheet carries a `## Pushing
back` section naming the sheet and its ruling. Checks 3 and 4 permit no such thing, and the item
they enforce is `[brief: soft]` — by the pipeline's own provenance system, weaker than an approved
sheet, and `_category.md` says in terms that a domain may argue against it. So the checklist
currently makes the softer item unarguable and the firmer item arguable.

The practical consequence is worse than the theoretical one: **for this game there is no design
that satisfies checks 3 and 4 together with checks 5 and 8.** The only input scheme that satisfies
3 and 4 literally is the walk-into pad, which contradicts `core-loop/01`'s approved no-travel
ruling (check 5) and puts a traversal cost on step 4 of the loop (check 8). A checklist that
cannot be satisfied is a checklist defect.

**Recommend narrowing checks 3 and 4 to bring them under check 5's mechanism:** "every mechanic
maps to a verb the brief's control scheme supports, and no system requires an input it does not
have — **unless the sheet carries a `## Pushing back` section naming the brief line, quoting its
provenance tag, and stating the containment as a manifest value a later sheet cannot widen
without failing a criterion**." Under that wording `mechanics/02` passes on its own evidence and
nothing else in the wave moves. The developer decision above is still owed either way; the
narrowing decides whether the checklist is what blocks the gate, and it should not be.

---

## Predicted cross-category conflicts

Recorded for the final pass. Not violations now.

- **`systems/04`'s ladder band has a narrower resolution than it states, and stage 4 is where it
  bites.** `atMaxLadder.ladderLengthBand` resolves the floor/ceiling conflict with "more levels at
  smaller steps, never a shorter ladder". That is a real degree of freedom and not a deferral: it
  raises `maxLevel` while lowering the per-level step, so total cost holds and gaps shrink. **But
  `core-loop/05` caps total throughput growth at 4.16x and reports shipped values already spending
  92% of it, and states that changing `maxLevel` fails the arrival-under-cap check.** So the extra
  levels can only land on `value`, which `systems/06` says is the one axis with no ceiling. The
  direction is right and the sheet does not say which axis it survives on. `core-loop/05`'s
  predicate catches it loudly, which is why this is a predicted conflict and not a revision
  request. **Balance & Tuning inherits three sheets' constraints on one curve and should be told
  so before it starts.**
- **The set-bonus axis assignment still has no carrier.** `modifiers.sources[set-completion]
  .assignmentOwner` routes it to content-structure work; `collection` has no `bonus` field;
  `core-loop/02` asked for one. `collection` is supplied by `gameplay/meta/02`, merged and
  shipped, and the merger permits one sheet per key, so a wave-3 Meta sheet cannot add the field
  without revising a shipped sheet. **Unchanged from round 1, and wave 3 hits it on day one.**
  F2 is the same fault caught early in a different domain; the fix pattern transfers.
- **`core-loop/02`'s set-bonus band is denominated in a unit `systems/06` made non-convertible.**
  A permanent factor on `radius` or `speed` is a rate change with no finite tick-equivalent in an
  endless world. Stage 4 inherits a band it cannot evaluate without a stated horizon.
- **Plot pitch versus area size is now a live wave-3 problem rather than a depth-4 one.**
  `social/02` says S is unmet at depth 1 and unmeetable by a centred spawn at any gutter;
  `mechanics/06` requires 12 studs of walkable margin per side; `theme/identity/03` records that
  the plot pitch is an unkeyed literal (`area.size + 40`). Three sheets constrain a number no key
  holds. Area-arrangement work owns the collision and should get all three at once.
- **`social`'s emitter path.** `bridge/schema.mjs` has no `social` key, `Players.MaxPlayers` is
  read-only, chat lives on `TextChatService` children and collision groups register at boot.
  Promoting the key needs a place-configuration emitter or a named boot module in the technical
  contract. F2 adds a field to a key that still cannot be emitted; that is the right order, but
  the emitter gap does not close itself.
- **`systems/05`'s equality invariant is a merger change** (`>=` to `==` in `bridge/schema.mjs`)
  that `core-loop/04` and `core-loop/05` both reason against, now named in `## Pushing back`.
  Whoever maintains the schema arbitrates. Note one point in its favour that nobody has stated:
  `theme/fantasy/02` requires `ceil(24 / relicsPerArea) >= 8` and offers `relicsPerArea` 3 with
  `areasPerDepth` 2 as the satisfying configuration; `3 x 2 == 6` sits inside `systems/05`'s
  permitted set, so the equality and the fantasy requirement are compatible.
- **`mechanics/05`'s `patchClear` client prediction** needs a client-side radius test shadowing
  the server's and a snapshot that silently restores an unconfirmed patch. Nothing in the
  technical contract carries either.
- **`ui-forge` now has a load-bearing dependency.** `hud-overlay` needs `PRESSABLE`, and the
  game's only currency sink is behind it. `PRESSABLE` is defined locally inside `modal-grid.mjs`,
  so the change is an extraction plus a pattern edit, not a flag flip. Two sheets state it as an
  explicit build-stage request with the file named, which is correct; nobody owns scheduling it.

---

## What must happen before this category can release

1. **F1 and F2 land.** Two files, two edits, no design content. F1 is the one that blocks wave 3,
   because Meta & Content reads `mechanics/06`'s consequence on its first day.
2. **F3 lands**, or the 2-to-4 invariant is amended. It is a process invariant, not a build
   defect; I am not going to pretend otherwise, but I am also not going to pass a sheet against an
   invariant I was told to check.
3. **The developer rules on the input overrule.** Not a revision. The sheet has done everything a
   sheet can do, and round 3 would produce the same sheet with more words in it.
4. **The checks-3-and-4 narrowing is accepted or rejected.** If rejected, the overrule has to be
   reversed and `core-loop/01` reopened, which is a larger decision than the one in item 3.

**Can wave 3 proceed?** Yes, after items 1 and 2, which are one revision round with no argument
in them. Item 3 does not need to gate it: no wave-3 domain owns `input` or the purchase surface,
Monetization is unblocked by `mechanics/04` and `systems/05` regardless, and Onboarding is *more*
unblocked than it was because `mechanics/02` withdrew the constraint that displaced its
guaranteed first Find. Item 3 must resolve before UI/UX spawns, which is gated on stage 4 anyway.
Carry it to Meta & Content and Onboarding as a named open escalation rather than as settled fact.
