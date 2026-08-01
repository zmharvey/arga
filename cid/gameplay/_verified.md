# Gameplay — verification, wave 2 (stage 2: Systems · Mechanics · Multiplayer & Social)

**Status: FAIL**

Stage 3 does not spawn. Two of the seven checks fail outright, and three sheets contradict
approved stage-1 sheets or each other in ways that would produce divergent or broken builds.
Sixteen revision requests below, each naming one file and one fix. Nothing here is a
disagreement about taste; every top-ranked item is a place where two competent builders read
two different games out of the wave, or where a player loses something.

**Scope:** the 12 sheets written this wave, the 3 adopted sheets read as constraints, the three
domain indexes, `cid/gameplay/_category.md`. The mechanical half (`npm run cid:verify`,
`npm run bridge`) was not re-run by hand and is taken as clean per the wave brief.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every currency has at least one faucet and one sink | **PASS** | `systems/04` `economy.faucetCount: 1` / `sinkCount: 1`; the one faucet is `patch-clear`, the one sink is `upgrade-purchase`. `atMaxLadder` states the sink exhausts and carries a testable requirement rather than inventing a second sink. I checked that requirement against the shipped manifest: the full ladder costs ~11,644 Shards against ~2,000–7,200 yielded by the four areas that complete the collection, so it holds today. |
| 2 | every reward granted anywhere has a source system | **PASS** for stage-2 scope | Currency → `economy.faucets[patch-clear]`. Find record → `discovery.record`. Set bonus → `modifiers.sources[set-completion]`. Purchase bonus → `modifiers.sources[purchase]`. Tool → `tool.grantedAt: "spawn"`. `mechanics/05` supplies the `setComplete` event `core-loop/02` said existed in no artifact. **One carrier gap recorded, not a failure:** no key holds *which axis* each set targets — `modifiers` routes it away, `collection` has no `bonus` field, and `core-loop/02` already asked for one. See predicted conflicts. Rewards from Monetization and Meta & Content are stage 3 and out of scope. |
| 3 | every mechanic maps to a verb the brief's control scheme actually supports | **PASS** | `input.verbs` is 5 rows, every one triggered by movement or a platform default control; `buy` and `openIndex` are occupancy tests on a world volume. No verb needs a binding the game writes. The *claim* that all five are issued "with the movement control alone" is false for `jump` and `look` — that is R10/R11 below, a defect in the sheets' phrasing and in `03`'s checks, not in the mapping. |
| 4 | no system requires an input the brief's control scheme does not have | **PASS** | Searched all 12 sheets for a required press, tap, hold, chord, aim or select. `systems/04`'s sink resolves through `input.verbs[buy]`; `systems/05`'s reveal is a consequence of clearing; `social/*` requires no input at all and forbids the two (`ProximityPrompt`, `ClickDetector`) that would add one, at `03` X12. `mechanics/02` deletes the one shipped violation. |
| 5 | **every economy, pacing or progression number appears in Balance & Tuning and nowhere else** | **FAIL** (evaluable half) · **BLOCKED** (other half) | `systems/05` hard-codes the roster size in three places — `discovery.record.entries: 24`, `persistenceRequirement: "24 booleans"`, criterion 1 "at most 24 collection entries". 24 is `collection`'s, it is `[brief: soft]` and the brief writes it "**~24**". See R11. Everything else falls on the right side of the lead's working rule; the rule was followed, not used as a licence — full number-by-number audit below. The second half of the check ("appears in Balance & Tuning") cannot be evaluated until stage 4 runs. |
| 6 | nothing specced falls outside the brief's priority ordering | **FAIL** | `systems/05` line 50-54 specifies the **priority-2** "duplicate-handling refinement" by mechanism ("a duplicate deepening the specific entry through a token bound to that one character, non-fungible by design … Recorded so the priority-2 refinement has a shape waiting rather than a blank"). `_category.md` permits stating that a design leaves room for a priority-2 item **"without specifying that item"**. See R14. No priority-3 violation anywhere. |
| 7 | the loop closes: the last step feeds the first | **PASS** structurally | Step 4 → step 1 is intact: `modifiers.effective("value"/"radius"/"pace")` feeds `economy.faucets[patch-clear].formula` and the clearing radius test. Step 5 (deeper area) is stage-3 content and untouched here. **But** `mechanics/02` puts a traversal cost on step 4 that `core-loop/01` ratified against by name — that is F3 below, and it falls outside all seven checks, which is itself a finding about the checklist. |

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** Checked each of the ten binding rows in `_category.md` against all 12 sheets. Clean. Nothing reintroduces rebirth, offline accrual, procgen, a threshold unit of progression, a second currency, a failure state or tension. `mechanics/06`'s respawn path is ruled fault-recovery at zero cost, which is the correct reading of a `[brief: soft]` no-death rule. **One `[brief: soft]` contradiction found:** `mechanics/02`'s 8-stud keep-clear disc at the spawn against "the player spawns touching overgrowth" `[you accepted: R6 Q3]`, a priority-1 item. See R12.
- **2–4 acceptance criteria that two people could not disagree about.** Counts pass (all sheets carry 3–4). **Four sheets fail the "could not disagree" half:** `mechanics/02` criterion 1 ("no verb is bound to a key, button or on-screen touch target" — `jump` is, by the platform), `mechanics/03` criterion 1 (rests on P3/P5, both false as written), `mechanics/05` criterion 3 (contradicts the sheet's own "a lone sequenced beat is never delayed"), `social/02` criterion 1 (measures at 1920×1080 for a 70%-mobile audience).
- **No sheet specs content excluded by `03-META.md` priority 3.** PASS. `social/03` names leaderboards and trading fourteen times — all of them prohibitions with an observable, which is the opposite of reserving space. `systems/04`'s `forbidden` list names daily/code grants the same way. Recorded because a literal reading of the check would fail these sheets, and it should not. The failure is at priority **2**, not 3.
- **No sheet names a capability absent from the Build Capability Registry.** **The registry node is stale, and I am escalating it rather than failing the sheets.** It records "*`ui-forge` produces only centred dismissible panels holding a grid of items. A persistent HUD is not yet buildable*". `ui-forge/src/compose/index.mjs` exports two patterns, and `patterns/hud-overlay.mjs` is exactly a persistent HUD ("Persistent readouts drawn over live gameplay. The thing every brief this repo has produced needed and none could build"). `mechanics/05`'s `readout` channel, `mechanics/03`'s "the HUD stays a readout" and `systems/02`'s HUD corner label all depend on it. Under the registry as written they are violations; they are not. **Fix the registry node, not the sheets.** `mechanics/_lead.md` already caught the same staleness in `CLAUDE.md`.
- **Every `[research: url]` corresponds to a real fetched source.** PASS, mechanically enforced. `npm run cid:verify` fails any citation absent from `cid/_research/pack.md` and reports zero. Not re-audited by hand.
- **Every `[cid: decided]` tag is flagged upward.** PASS. Counted 24 across the 12 sheets; every sheet carrying one also carries a `## Flagged to the developer` or `## Pushing back` section naming the alternatives. `systems/04`, `systems/05`, `systems/06`, `mechanics/02`, `social/01` each flag with a recommendation. Nothing is buried.

---

## The number audit, in full

The wave brief asked whether the lead's working rule — *a value that is the shape of a key the
domain owns goes in the manifest with a test range; a tuning coefficient goes to Balance as a
stated requirement* — was followed or became a licence. **It was followed.** One violation, two
soft spots. Every number in the 12 new sheets:

**Correctly the shape of an owned key:**
`economy.payoutFloor: 1` — the writer's flag was right, and there is stronger evidence than it
gave: with `tiers[].value ≥ 1` and `modifiers.factorFloor: 1` guaranteeing the multiplier never
drops below 1, `floor(value × multiplier)` can never fall below 1, so the floor is a guard that
never binds at any shipped value. It is not a lever. · `modifiers.factorFloor: 1` — "no debuffs"
expressed as a bound. · `economy.startingBalance: 0` — the "no welcome grant" rule, derived from
a binding line. · every count (`faucetCount`, `sinkCount`, `gradedLadderCount`, `verbs` 5,
`markedPlace.perArea` 4, `hazards`/`lockouts`/`fallPenalties` 0). · `zeroCreditEvents[].credits: 0`
— a decision, not a magnitude.

**Correctly stated as a requirement with no value:**
`economy.atMaxLadder.requirementOnBalance` · `modifiers.axes[].ceilingRule` (both expressed as
inequalities over `area.size`, `movement.baseClearRadius` and the server tick — this is
`systems/06` overruling `_category.md`'s "Balance & Tuning sets caps", and it is the *more*
correct reading: it hands Balance a formula, not a number) · `social.maxPlayers` as a band with
a stated break at each edge · `social/02`'s S as a requirement with the geometry handed away.

**Correctly marked `[playtest unknown]` with a test range:**
every `mechanics/05` budget and dwell · `input.markedPlace.reentryDebounceSeconds: 0.35` ·
`tool.headWidthPerLevelStuds: 0.35` · `social/02`'s S = 190 (120–300).

**Violation:** `discovery.record.entries: 24` and its two restatements (R11).

**Soft spots, noted not failed:** `tool.headWidthBaseStuds: 1.2` carries no marker while its
sibling per-level figure does, and the same sheet assigns "proportions" to Art. ·
`input.markedPlace.keepClearRadiusStuds: 8` is geometry that constrains `area` patch placement,
which Meta owns — and it collides with the guaranteed first find (R12).

---

## Revision requests

Ranked by the stopping rule. Each goes to the agent that wrote that file.

### R1 · `cid/gameplay/mechanics/06-traversal-affordances.md` — a visible 20-stud boundary wall makes co-presence invisible, which is the whole of `social/02`

**Violates:** cross-sheet contradiction inside the wave; the brief's "visible to each other.
Social proof at zero systems cost" `[you accepted: R6 Q2]`.
**Evidence:** `06` sets `boundary: { kind: "collisionBarrier", heightStuds: 20 }` and hands the
appearance to Art with two constraints only — "it must be at least 20 studs tall and it may not
read as a thing to climb". `social/02` criterion 3 requires "the straight line between the two
spawn points intersects zero instances with `Transparency < 1`", and its B1/B2/B3 all require an
unobstructed sightline to the neighbouring plot. The line between two spawn points passes through
both plots' boundary barriers. The shipped barriers pass only because `Plots.luau:270` sets
`Transparency = 1`; `06` is what turns them into a wall a builder will make opaque.
**Fix:** add one field to `traversal.boundary` — `opaque: false`, or
`sightlineObstruction: "none along the inter-plot axis"` — and one line to *Environment and
set-dressing work* saying the barrier may not obstruct the co-presence sightline `social/02`
requires. If `06` believes the ruin's walled architecture must win, say so in `## Pushing back`
and name the consequence for `social/02`, so the trade is a decision rather than a surprise.

### R2 · `cid/gameplay/systems/05-the-find-ledger.md` — a mid-area rejoin can bury unfound Finds under already-cleared patches, and the set becomes uncompletable

**Violates:** `social/01`'s stated requirement that "a partial area's layout must be stable
across a rejoin"; the sheet's own criterion 2 (`foundCount` reaches 24).
**Evidence:** `05` rules the pool is "`collection.sets[depth].relics` minus ever-found" with
`orderWithinArea: "which patch hides which Find is uniform over patches"`, and its Consequences
say `Layout.luau:130-153` "must draw from the depth's set minus the player's found names".
`game/src/server/init.server.luau:289` calls `Plots.spawn` on every join, and
`Plots.luau:366` calls `Layout.build()` there. So the draw is re-evaluated on rejoin against a
*changed* found-set. A player who clears 60 of 140 patches, finds 3 Finds and rejoins gets the
3 remaining names re-placed uniformly over all 140 patches, ~1.3 of them on patches
`state.cleared` already marks. `Plots.spawn` builds no Instance for those and
`Clearing.tickPlayer` skips them (`if not patch.cleared`), so those Finds are unreachable
forever and the set can never complete. The sheet anticipates divergence only "the moment a
player re-enters a depth"; the mid-area rejoin is the nearer case and it is not covered.
**Fix:** state in `discovery.pool` that the draw excludes patch indices already in
`state.cleared` — `"placementDomain": "uncleared patches only"` — and add a criterion: rejoin
mid-area with N Finds outstanding and all N are placed on uncleared patches. Reconcile the
wording with `social/01`'s layout-stability requirement in `## Consequences for other work`.

### R3 · `cid/gameplay/mechanics/02-verb-roster.md` — the walk-to-pad purchase is the vendor `core-loop/01` ratified against by name

**Violates:** `gameplay/core-loop/01-payoff-frequency`, **stage 1 approved**, which stage 2 is
gated on.
**Evidence:** `core-loop/01` §"Ratifying continuous mid-area spend (G10)" is a `[cid: decided]`
ruling: "with movement-only input, buying means standing still, so **purchase must not
additionally require travel**", and its Consequences say "**A vendor the player walks to converts
every purchase beat into a traversal cost and pushes gaps past 90 s**". `02` makes purchase an
occupancy trigger at the area spawn. At `area.size` 120 and `movement.baseWalkSpeed` 16 a
round trip from a far corner is ~170 studs ≈ 10.6 s, repeated for ~10 purchases a lap against a
164 s lap; the return leg crosses permanently-cleared ground, which pays nothing, so it also
breaks `core-loop/01`'s 3-second currency-tick ceiling. `core-loop/01`'s 90-second predicate is
computed from a greedy buyer who purchases the instant a level is affordable — an assumption the
pad makes false. Neither sheet cites the other. **The wave-2 research pack settles device
parity for the pad (line 431) and says nothing about traversal cost, so the research does not
cover this objection.**
**Fix:** add a `## Pushing back` section that either (a) shows with arithmetic over `area.size`,
`movement` and `upgrades` that the pad keeps both of `core-loop/01`'s ceilings at depth 1 and at
`core-loop/05`'s 236-stud depth-4 area, or (b) adopts a no-travel affordance and states what that
costs against reading A, or (c) states plainly that it is overruling `core-loop/01`'s G10 ruling
and escalates it. This is the biggest call in the wave and it currently rests on a reading of the
brief that never met the sheet it contradicts.

### R4 · `cid/gameplay/mechanics/05-response-contract.md` — the coincident beat order is the reverse of the one `core-loop/02` fixed

**Violates:** `gameplay/core-loop/02-payoff-weights`, stage 1 approved, acceptance criterion 3.
**Evidence:** `05` sets `sequencedBeats: ["upgradePurchased", "findReveal", "areaComplete",
"setComplete"]` and calls it "the fixed order". `core-loop/02` §"The collision" point 3:
"**In the coincident case the order is fixed: reveal → set completion → area completion.**
Causal first … world-state change last, because `02-GAMEPLAY.md` locates satisfaction in
'before/after and discovery' and the restored space *is* the before/after", and its criterion 3
names that order. `05`'s stated reason ("a Find is revealed before the area its patch completed,
and a set completes because a Find revealed") justifies reveal-first and says nothing about why
area precedes set.
**Fix:** change `sequencedBeats` to `["upgradePurchased", "findReveal", "setComplete",
"areaComplete"]` and align the prose, or state the overrule in `## Pushing back` with a reason
that answers `core-loop/02`'s "world-state change last".

### R5 · `cid/gameplay/mechanics/05-response-contract.md` — it re-sets the onset separation `core-loop/02` owns and routed to Balance, and lands outside that sheet's range

**Violates:** the numbers rule, and `core-loop/02`'s explicit routing.
**Evidence:** `core-loop/02`: "Minimum onset separation **0.6 s** `[playtest unknown]`, test range
0.35 to 0.9 s", and its `## Not decided here` hands "the onset separation inside its range" to
Balance & Tuning. `05` sets `minOnsetGapSeconds: 1.2` `[playtest unknown]`, test 0.8 to 2.0 s.
Two sheets set one quantity; the starting value is 2x apart and the ranges barely overlap. This
is the quantity `core-loop/02` spent its whole collision ruling on — whether the set-completion
and area-completion cues read as one moment or two.
**Fix:** adopt 0.6 s with `core-loop/02`'s 0.35–0.9 range and cite it as inherited, or state the
overrule and say why `core-loop/02`'s figure fails against the per-beat budgets in this sheet.

### R6 · `cid/gameplay/systems/06-modifier-stacking.md` — the axis id `pace` does not join `upgrades[].id`, so `effective(axis)` cannot resolve

**Violates:** cross-key consistency; two builders diverge on the mapping.
**Evidence:** `06` declares `axes[].id` as `value | radius | pace` and
`composition: "effective(axis) = clamp(upgradeEffect(axis, heldLevel) * …)"`. `upgradeEffect`
is defined over an entry of `upgrades`, whose shipped ids are `value`, `radius`, **`speed`**
(`GameConfig.luau:36-70`; `Progression.luau:30` names the constant `SPEED_ID = "speed"`).
`Pace` is the *label*, not the id. `mechanics/04` uses the id correctly:
`tool.unaffectedByAxes: ["value", "speed"]`. So the two proposed keys disagree with each other
and one of them disagrees with the merged key it reads.
**Fix:** rename the third axis id to `speed` throughout the `modifiers` manifest
(`axes[2].id`, the `axis` enum, all three `mayTarget` arrays), leaving the prose free to say
"Pace" where it means the label.

### R7 · `cid/gameplay/mechanics/06-traversal-affordances.md` — player-vs-player collision is carried by two keys, with two different group names

**Violates:** one-decision-one-owner; two builders diverge on which group exists.
**Evidence:** `06` carries `traversal.collision: { playerVsPlayer: false, collisionGroup:
"Players" }`. `social/01` carries `social.characterCollision: { playerVsPlayer: false,
groupName: "Characters", collidable: [...] }` with a full collidability matrix, and
`social/_lead.md` claimed `characterCollision` as a `social` field before either was written.
`06`'s own gap G9 says the answer is "stated with its consequence for presence-sufficiency work"
— a consequence, but it put the value in its manifest. A builder reading both creates two groups
or picks one at random; `social/01` criterion 2 greps for `"Characters"`.
**Fix:** delete `playerVsPlayer`, `collisionGroup`, `pushable` and `standOnOtherPlayers` from
`traversal.collision`, keep `playerVsWorld: true`, and replace them with one line citing
`social.characterCollision` as the owner. The prose ruling in `## Why` can stay; the data must
live in one key.

### R8 · `cid/gameplay/systems/04-earning-and-spending.md` — `economy.authority` asserts a client message that `mechanics/02` deletes

**Violates:** cross-sheet contradiction inside the wave.
**Evidence:** `04` sets `authority: "server only; **the client sends an upgrade id** and never a
cost, an amount or a balance"`. `mechanics/02` rules the shipped keyboard binding "superseded
and removed", sets `clientOriginatedRemotes: 0`, and states "`BuyUpgrade` becomes
server-internal, driven by a `Touched` handler on the pad". `04`'s `## Not decided here` shows it
was written without `02`'s answer ("How the player physically commits a purchase on a phone —
input and purchase-surface work"). One builder keeps the remote, the other deletes it.
**Fix:** restate as `"server only; no client message carries a cost, an amount or a balance, and
whether a client message exists at all is `input`'s"` — a statement about authority that does not
assert a wire shape another key owns.

### R9 · `cid/gameplay/mechanics/02-verb-roster.md` — `clientOriginatedRemotes: 0` is false, and honouring it literally blanks the HUD on join

**Violates:** factual accuracy of a manifest value; two builders diverge.
**Evidence:** `Protocol.luau:48-53` declares `RequestState` as `direction = "client -> server"`,
`firedBy = "client-main"`, and `init.client.luau` pulls one snapshot "because client-main may
not assume the join-time push arrived". So the game has two client-originated channels, not one.
`02`'s Decision says "the game fires zero game-defined client-to-server remotes" and its manifest
says `clientOriginatedRemotes: 0`, while its own criterion 4 says the narrower and correct thing:
"zero client-to-server remotes **fired by player input**". A builder honouring the manifest
deletes `RequestState` and the HUD stays blank until the first clear.
**Fix:** rename the field to `clientOriginatedRemotesFiredByPlayerInput: 0`, align the Decision
sentence, and name `RequestState` in `## Consequences for other work` as surviving.

### R10 · `cid/gameplay/mechanics/02-verb-roster.md` — "issued with the movement control alone" is false for two of its own five verbs, and it is the argument the G1 ruling rests on

**Violates:** internal consistency; the acceptance-criterion invariant.
**Evidence:** the Decision reads "All five are issued with the movement control alone". `jump` is
issued by the spacebar, the gamepad A button and a dedicated on-screen button on touch —
`mechanics/06` says so itself ("including the mobile jump button"). `look` is issued by the
mouse, the right stick and a camera drag. Reading A is stated as "**Directional movement is the
only input the player ever gives**", which the roster contradicts two rows later; and
`mechanics/06` keeps jump using reading B's logic ("movement only governs game verbs"), so the
domain applies the strict reading to purchase and the loose one to jump. Criterion 1's second
clause, "no verb is bound to a key, button or on-screen touch target", is false as written.
**Fix:** restate reading A as "**the game binds no input of its own**" — which supports the pad,
jump and look without contradiction and is exactly the property the pad delivers — and narrow
criterion 1's second clause to "no verb is bound by game code to a key, button or on-screen
touch target".

### R11 · `cid/gameplay/systems/05-the-find-ledger.md` — the roster size is hard-coded three times, and it is `[brief: soft]` with a tilde

**Violates:** check 5, "every economy, pacing or progression number appears in Balance & Tuning
and nowhere else — a domain may state a requirement on a number it does not set".
**Evidence:** `discovery.record.entries: 24`; `persistenceRequirement: "24 booleans and nothing
else"`; criterion 1 "at most 24 collection entries". The roster is `collection`'s
(`gameplay/meta/02`), and the brief writes "**~24** objects in 4 sets of 6" `[brief: soft]` ←
`[you accepted: R4 Q4]`, with `_category.md` listing collection size in Balance & Tuning's
numeric inheritance table. `05` already expresses its harder claim relationally
(`invariant: "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth]
.relics.length"`), so the pattern is available.
**Fix:** replace `entries: 24` with `entries: "sum(collection.sets[].relics.length)"`, replace
the persistence line with "one boolean per name in `collection`, and nothing else", and rewrite
criterion 1 as "a saved record contains exactly one boolean per name in `collection` and no
field named in `forbiddenFields`".

### R12 · `cid/gameplay/mechanics/02-verb-roster.md` — the keep-clear disc at the spawn contradicts "the player spawns touching overgrowth"

**Violates:** `02-GAMEPLAY.md` `[you accepted: R6 Q3]`, a priority-1 item.
**Evidence:** `02` places four marked places at `"placement": "areaSpawn"` with
`keepClearRadiusStuds: 8`, "inside which no patch may be placed". The brief: "The player spawns
touching overgrowth, and the first patch they clear has something under it." `movement
.baseClearRadius` is 5.5, so a player standing at the spawn is inside an 8-stud patch-free disc
and touches nothing. `Layout.luau:139-144` puts the guaranteed first Find on the patch nearest
the plot origin, which is the spawn — that patch is now displaced outside the disc.
`02`'s Consequences mention onboarding but not this.
**Fix:** either offset the marked places from the spawn point so the disc does not cover it —
`"placement": "within N studs of areaSpawn, and never covering the guaranteed first patch"` — or
state in `## Consequences for other work` that onboarding and area-layout work must reconcile the
disc with the guaranteed first find, and name it as a constraint they inherit rather than
leaving it to be discovered at build.

### R13 · `cid/gameplay/mechanics/03-device-parity.md` — P3 and P5 are checks a correct build fails

**Violates:** the sheet's own stated purpose ("written as a check a build can fail rather than a
preference") and the acceptance-criterion invariant.
**Evidence:** P3 reads "every verb is exercisable using the movement control alone; no verb
requires two simultaneous inputs, a chord, a hold, or a second finger". On touch, `look` requires
a second finger by construction and `jump` requires a separate on-screen button. P5 reads "the
game is completable start to finish with zero pressables in the interface" — the platform's
mobile jump button is a pressable in the interface. One reviewer fails a correct build; another
passes it by reading "verb" as "game-defined verb". Criterion 1 ("P1 through P5 all pass") then
inherits the ambiguity.
**Fix:** narrow P3 to "no verb the game defines requires an input beyond the platform's default
movement, camera and jump controls; no verb requires two simultaneous inputs, a chord, a hold or
a second finger **that the game binds**", and narrow P5 to "zero pressables **drawn by the game**".

### R14 · `cid/gameplay/systems/05-the-find-ledger.md` — it specifies the priority-2 duplicate-handling refinement

**Violates:** check 6; `_category.md`'s scope gate, which permits leaving room for a priority-2
item "**without specifying that item**".
**Evidence:** the `## Why` bullet "The mechanism I did not need" describes the Genshin
constellation-token mechanism in full and closes "Recorded so the priority-2 'duplicate-handling
refinement' has a shape waiting rather than a blank." That is a specified future home, which is
the exact cost the gate exists to avoid.
**Fix:** cut the bullet to its load-bearing half — that a with-replacement pool would need a
per-item, non-fungible deepening mechanism, cited without describing it — or delete it. The
research pack already holds the detail for whoever picks up priority 2.

### R15 · `cid/gameplay/systems/05-the-find-ledger.md` — the partition invariant forecloses `core-loop/04`'s recommended fix without citing it

**Violates:** cross-stage contradiction; a stage-3 domain will discover it as a wall.
**Evidence:** `05` tightens the merge check to `relicsPerArea × areasPerDepth == |set|` and its
criterion 3 makes over-supply a merge error. `core-loop/04` (stage 1 approved) flags to the
developer, recommendation (i): "drop `collection.relicsPerArea` and put several areas in each
depth tier … if each area's Finds are drawn from a 6-member set, coupon-collector expectation is
6·H(6) ≈ 14.7 laps per set … **duplicates are already guaranteed by the brief**". `05` overrules
that premise ("I overrule the premise, not the constraint") but never names `core-loop/04`, and
under equality the maximum `areasPerDepth` for a 6-member set is 6 (at `relicsPerArea` 1), not
the ~15 `core-loop/04` asks for. Separately, `core-loop/04` believes the schema still asserts
`relicsPerArea >= largest set`; `bridge/schema.mjs:252-258` already computes
`perDepth * relicsPerArea`, so the relaxation it requests has shipped and the live change is
`05`'s tightening.
**Fix:** add one paragraph to `## Pushing back` citing `core-loop/04`'s recommendation (i),
stating that the partition rule permits `areasPerDepth ∈ {1, 2, 3, 6}` at a 6-member set and
therefore caps the collection at 24 laps rather than the ~59 `core-loop/04` modelled, and saying
whether that still satisfies `core-loop/04`'s criterion 2 (it does: 24 × 164 s ≫ 600 s).

### R16 · `cid/gameplay/social/02-presence-sufficiency.md` — the legibility criterion is measured on the wrong device class

**Violates:** the criterion does not test the requirement it exists to enforce.
**Evidence:** criterion 1 fixes "1920×1080 viewport" and "≥ 20 vertical pixels". The audience is
"8–14, **mobile-heavy**" `[brief: binding]`, and the sheet's own `[research owed:]` asks for "a
measured legibility threshold for a moving humanoid silhouette on **a phone-sized viewport**".
The pixel floor is viewport-dependent: the same body at S = 190 studs is 20 px at 1080 tall and
13 px at 720, which the sheet's own range treats as the far end. A build passing criterion 1 can
fail the requirement for most of its players.
**Fix:** express the floor as a fraction of viewport height — 20/1080 ≈ **1.9% of viewport
height** — and run criterion 1 at the smallest viewport the brief's device band implies, stating
that viewport in the criterion.

---

## Noted, deliberately not acted on

Each of these meets neither bar: no player notices, and no two builders diverge.

- `systems/06` `sources[set-completion].instances: "at most one per collection.sets[].id"`
  permits a set granting nothing, while the brief says "Completing a set grants a permanent
  bonus". It is a stacking bound, not a requirement statement, and content work assigns all four.
- `mechanics/04` `headWidthBaseStuds: 1.2` carries no `[playtest unknown]` marker while its
  sibling `headWidthPerLevelStuds: 0.35` does, and the same sheet hands "proportions" to Art.
- `mechanics/06` `jump.jumpHeight: 7.2` is a literal in a manifest whose Decision says "platform
  default", carried under an open `[research owed:]` on that default.
- Derived values duplicated as literals, all of which go stale silently if the key they derive
  from moves: `rarity.ladders[].rungs: 4` (= `tiers.length`, `collection.sets.length`),
  `input.markedPlace.perArea: 4` (= `upgrades.length + 1`),
  `response.minSustainedOnsetsPerSecond: 8` (derived from `upgrades` maxima — arithmetic checked
  and correct at 7.1/s), `response.beats[setComplete].cause: "sixthFindOfSetRevealed"`
  (= the last Find of a set).
- `social/02` criterion 2's "≥ 11 studs" motion threshold has no stated derivation.
- `mechanics/02`'s "Build work on `Input.luau`: superseded, delete it" is a build instruction
  issued from a CID sheet. It is framed as a consequence and is correct; recorded only because
  the seam is otherwise clean.
- `mechanics/01`'s criterion 1 does not deliver its stated intent (radius 5.5 against spacing 6
  clears both neighbours from a midpoint; the intent needs radius < spacing/2). Already recorded
  by `mechanics/_lead.md`, already merged and shipped, already depended on by `core-loop/05`.
  Re-confirmed, not re-raised.

---

## The checklist itself

Three of the seven checks need narrowing, and one is missing. Recorded as escalations, per the
verifier's remit.

1. **A check is missing, and three of this wave's worst findings live in the gap.** There is no
   check reading *no stage-N sheet contradicts a stage-N−1 approved sheet*. R3, R4 and R5 are all
   stage-2 sheets contradicting stage-1 approved sheets, and none of the seven checks catches any
   of them — the node's `description` ("no gaps, duplicates, or contradictions") does, but a
   description is not a check. **Recommend adding:** "no sheet contradicts a ruling in an approved
   sheet of an earlier stage without a `## Pushing back` section naming that sheet."
2. **Check 5 is only half-evaluable before stage 4, and taken literally it fails merged keys.**
   "Every economy, pacing or progression number appears in Balance & Tuning and nowhere else"
   would fail `tiers[].value` and `movement.baseClearRadius`, both merged, shipped and read by
   `game/test/config.spec.luau`. The lead's working rule is the correct narrowing and should be in
   the check text: *a value that is the shape of a key the domain owns goes in that key's manifest
   with a `[playtest unknown]` marker and a test range; a tuning coefficient goes to Balance as a
   stated requirement.* **Recommend rewriting the check to that sentence** and adding "the
   Balance-side half of this check is evaluated at stage 4".
3. **Check 6 read literally fails `social/03` entirely**, whose whole content is naming
   priority-3 items in order to forbid them with an observable — which is the opposite of the
   harm the gate describes. **Recommend narrowing to:** "no sheet reserves space for, stubs,
   describes or specifies a priority-2 or priority-3 item; naming one in order to forbid it is
   compliant." Under the narrowed check `social/03` and `systems/04`'s `forbidden` list pass and
   `systems/05` still fails (R14).
4. **The Build Capability Registry node is stale.** See universal invariants. `hud-overlay`
   exists; "a persistent HUD is not yet buildable" has not been true since it was written.

---

## Predicted cross-category conflicts

Not violations now. Recorded so the final pass has something to diff against.

- **The set-bonus axis assignment has no carrier.** `modifiers` routes it to content work;
  `collection` has no `bonus` field; `core-loop/02` asked for `collection.sets[].bonus` and
  routed the schema work to build-contract definition. Worse, `collection` is already supplied by
  `gameplay/meta/02` (merged, shipped), and the merger permits one sheet per key — so a wave-3
  Meta sheet cannot add the field without revising a shipped sheet. **Wave 3 will hit this on day
  one.**
- **`core-loop/02`'s set-bonus band is denominated in a unit `systems/06` has made
  non-convertible.** The band is "140 to 791 base ticks", and `core-loop/02` asserts "a flat
  grant, a multiplier and a permanent radius bump all convert into this unit". `06` rules a set
  bonus is a permanent multiplicative factor on one of three axes; a permanent factor on `radius`
  or `pace` is a rate change with no finite tick-equivalent in an endless world. Balance & Tuning
  (stage 4) inherits a band it cannot evaluate without a stated horizon.
- **`mechanics/06`'s 12-stud walkable margin grows the plot footprint** to `area.size + 24` per
  side. It fits inside the shipped 160-stud pitch at depth 1. At `core-loop/05`'s 236-stud
  depth-4 area the pitch exceeds `social/02`'s S = 190 starting value and approaches its 300-stud
  ceiling, so co-presence legibility degrades with depth unless plot pitch is decoupled from area
  size. Area-arrangement work (wave 3) owns the collision.
- **`mechanics/02`'s marked place adds a thirteenth class to `theme/setting/05-inventory`'s closed
  place-matter list.** `02` states this as a consequence and does not name the object, which is
  correct; world-inventory work has to admit it or refuse it, and refusing it removes the wave's
  purchase verb.
- **`systems/05`'s equality invariant is a merger change** (`>=` → `==` in
  `bridge/schema.mjs:252-258`) that `core-loop/04` and `core-loop/05` both reason against.
  Whoever maintains the schema arbitrates.
- **`social/01`'s `social` key has no emitter path** — `Players.MaxPlayers` read-only, chat on
  `TextChatService` children, collision groups at boot. `01` says so itself. Promoting the key
  needs a place-configuration emitter or a named boot module in the technical contract.
- **`mechanics/05`'s `patchClear` client prediction** needs a client-side radius test shadowing
  the server's and a snapshot that silently restores an unconfirmed patch. Nothing in the
  technical contract carries either today.

---

## Not examined

Stated so the gap is honest rather than silent.

- **The pad's pacing arithmetic beyond depth 1.** R3 is bounded with depth-1 figures
  (`area.size` 120, base speed 16). I did not compute the round-trip cost at `core-loop/05`'s
  236-stud depth-4 area, which is where it is worst.
- **The second half of check 5.** Whether every number *appears in* Balance & Tuning cannot be
  evaluated until stage 4 runs. Only the "and nowhere else" half was checked.
- **Wave-1 theme sheets were read through `cid/_digest.md`, not in full.** The cross-references
  the wave-2 sheets make to `theme/tone/03-beat-map`, `theme/identity/03` and `04`,
  `theme/setting/03` and `05` and `art/objects/01` were checked against the digest rows and are
  consistent there; I did not open those sheets to confirm the digest is faithful. **One process
  note that matters:** the digest truncates each sheet's decision, and `core-loop/01`'s
  "purchase must not additionally require travel" is in the truncated remainder. R3 exists partly
  because the derivation that was supposed to prevent re-reading siblings dropped the one line
  that would have prevented it.
- **`social/02`'s pixel arithmetic** was sanity-checked for order of magnitude, not re-derived.
- **The mechanical half** (`cid:verify`, `bridge`, index-to-disk, section presence, criterion
  counts, provenance tags, one-spelling-per-term, research-citation legality, manifest JSON
  validity) was not re-run and is taken as clean per the wave brief.

---

## What must happen before this category can release

1. R1 through R9 resolved. These are the ones that produce a broken or divergent build.
2. R3 in particular needs a ruling from the lead or the developer, not a rewrite: it is a
   stage-2 sheet overruling a stage-1 approved ruling, and both readings are defensible. It is
   the wave's one genuine design disagreement.
3. R10 through R16 resolved or explicitly deferred with a reason.
4. The Build Capability Registry node updated, and the three check narrowings in
   `docs/cid-workflow.json` accepted or rejected.
5. Re-verification of every changed file. This pass does not carry forward.
