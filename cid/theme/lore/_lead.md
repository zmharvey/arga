# Lore — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md` (all six sections), `cid/theme/_category.md`. Also read as verification, not as brief:
`ui-forge/src/compose/patterns/modal-grid.mjs`.

**Ownership, per the workflow config:** history · world rules · why the conflict exists ·
canon events · unexplained-on-purpose gaps.
**Not mine:** *"Quest text or mission structure (Gameplay — Meta & Content)"*. There are no
quests in scope at all.

---

## The empty slot, reported rather than filled

**"Why the conflict exists" has no answer, because there is no conflict.** This is not a gap
and no sheet is assigned to it.

> *"**There is no failure state.** No death, no losing, no loss of progress — and with rebirth
> cut, no voluntary reset either."* (`02-GAMEPLAY.md`) `[brief: soft]` `[you accepted: step 6 Q2]`

> *"**Zero tension is deliberate.** ... Satisfaction comes from before/after and discovery,
> nothing else. **Consequence: audio and visual feedback carry the entire load** — and nobody
> downstream should invent tension to fill the gap."* (`02-GAMEPLAY.md`) `[brief: soft]`

> *"**Tension is zero by design**, confirmed deliberately. ... **Do not invent tension to fill
> the gap.**"* (`HANDOFF.md`, one of six things to know before designing anything)

There is no antagonist, no enemy, no threat, no encroaching force, no deadline, and nothing
that happens if the player stops. The roster is *"~24 objects in 4 sets of 6"* and nothing
else. **Adding a conflict is the single most likely way this domain fails verification.** Every
sheet below carries the same guard: a cause with an agent behind it, or a threat, or a thing
that is still happening, is out of bounds. `[brief: binding]` by elevation in `HANDOFF.md`.

**The second consequence is subtler and it constrains sheet 03.** With no conflict, history
cannot be *dramatic*. It has to be interesting without anything being at stake, which is a
harder writing problem than it sounds and is why the abandonment cause gets its own sheet.

---

## What the brief gave me

**On my subject directly, the brief gave me a blank page and said so twice:**

> *"Left open — **the ruin's identity and history**, who the player is, **what the four sets of
> relics mean**, the names of everything. *[currently: Theme & Narrative]*"* (`01-FOUNDATION.md`)
> `[brief: binding]` as an assignment, `[cid: decided]` as to all content

> *"Left open — **what the ruin actually is**, how chunks are themed by depth, and how many
> authored layouts are needed before shuffling stops feeling repetitive."* (`03-META.md`)
> — shared with Meta & Content, wave 3

**Constraints my canon may not contradict:**

| constraint | tag |
|---|---|
| *"**Cleared is permanent — overgrowth never returns.** ... This is the payoff and it is load-bearing."* / *"Slow regrowth and decay-if-you-leave were both offered and declined."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q1]` |
| *"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both declined."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q2]` |
| *"**No offline accumulation.** Nothing regrows, so nothing can accrue while away."* (`01-FOUNDATION.md`) | `[brief: binding]` by consequence |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`) / *"A **restoration / completion game**"* (`CONCEPT.md`) | `[brief: binding]` `[you chose: R4 Q2]` |
| *"**Endless via shuffled authored chunks**, not generation."* (`03-META.md`) | `[brief: binding]` `[you chose: R5 Q1]` |
| *"**The noun is a vehicle, not the differentiator.**"* (`01-FOUNDATION.md`) / *"**The hidden-collection layer, not the noun.**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q1]` |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` |
| *"**An overgrown ruin being reclaimed.** Cut back vines and moss from ancient stone."* (`01-FOUNDATION.md`) | `[brief: soft]` `[you accepted: R2 Q3]` |
| *"**Clearing and discovering are one action.** Do not design them as separate systems."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits R2 Q3) |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* (`01-FOUNDATION.md`) / *"This is reclamation, not a haunted place."* (`04-PRESENTATION.md`) | `[brief: soft]` ×2. Register is **Tone Lead's** to encode; I inherit it as a filter on the abandonment cause |
| *"**~24 objects in 4 sets of 6.** ... **Each set tied to area depth** — rarity and location are one axis, so there is one concept to learn rather than two."* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R4 Q4]` |
| *"Structure and scale settled here; **the objects themselves are invented downstream.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` |
| *"**With endless areas, the collection is the only finishable thing**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R6 Q3 → R5 Q3]` |
| *"**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."* (`03-META.md`) | `[brief: binding]` `[you chose: R3 Q2]` |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` |
| *"**Permanent multipliers only. Never content access.** ... **A paid-only object would turn 100% completion into a purchase**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q4]` |
| *"**No mastery layer.** ... **Stated so nobody invents one.**"* (`03-META.md`) | `[brief: soft]` `[I assumed]`, self-flagged |
| Screens are `collection-index`, `upgrades`, `areas`, `shop`. *"**A persistent HUD does not fit**"* (`04-PRESENTATION.md`) | `[brief: soft]`, derived not interviewed |
| *"Music sparse and low."* (`OPEN.md §2`) — no narration, no voice, no vocal delivery channel | `[brief: soft]` `[I assumed]`, overridable |
| **Dry and sparse. Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a pun.** | `[brief: binding]` — **developer, in session 2026-07-30, not present in any sheet.** Relayed from `cid/theme/_category.md`. Tone Lead owns the decision; I inherit it as the reason a per-relic text field is presupposed at all |
| *"Uncover a lost civilisation" was declined* as the hook line *"because the verb disappears"* (`05-OUTWARD.md`) | `[brief: soft]` `[you accepted: R6 Q1]`. **This constrains the headline, not the canon.** It is not a prohibition on there having been a civilisation, but a canon that makes the civilisation the point contradicts a positioning decision. Sheet 02 must survive it |

**Scope gate.** `03-META.md` priority 3 excludes *"real procedural generation · rebirth ·
offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"*
`[I assumed — the ordering]`. **Nothing in my subject is priority 3, and no sheet below specs
excluded content.** The gate binds me as a set of fiction prohibitions, relayed intact from
`cid/theme/_category.md`: no cycle, renewal, reincarnation or begin-again framing; no world
that changes while the player is absent; no world that creates itself; no exchange, gifting,
rivalry, ranking or comparison between players; no festival, holiday or calendar; no presumed
daily visit or returning benefactor. **Priority 2 contains *"visitable restored ruins"*, so my
canon may be compatible with it but may not depend on it** (sheets 05 and 07 must hold if it
never ships).

---

## The problem that reorganises this whole domain

**Lore that only exists in prose is lore nobody receives, and I verified that the delivery
ceiling is lower than the category brief assumed.**

The category brief states the surface problem correctly: onboarding is *"No text, no tutorial"*,
the screen list has no lore surface, and the binding tone decision presupposes a **relic
flavour text** field *"that no sheet establishes"*. I checked the build side, since
`docs/cid-workflow.json` makes the Build Capability Registry an input to every verification
node. Result:

**`ui-forge` has exactly one pattern, and its item card has no body-text field at all.**
`ui-forge/src/compose/patterns/modal-grid.mjs` is the only file under
`ui-forge/src/compose/patterns/`. Its `itemCard` exposes exactly these content fields:

- `art` (image placeholder) and `artPrompt` (*"lets a brief describe the art directly"* — an
  **asset-generation subject, not player-facing text**)
- `name` — one `TextLabel`, `type: 'label'`, fixed height `o: [null, 26]`, i.e. one short line
- `badge` — `size: o: [70, 24]`, `type: 'caption'`, corner overlay. Registry examples are
  *"BEST VALUE", "NEW", "x2"*
- `price` — `type: 'numeric'`

There is no `description`, `body`, `subtitle`, `blurb` or `flavour` field anywhere in the
compose pipeline (grepped `ui-forge/src`; the `body` hits are a typography token and HTML
plumbing, never an item field). The pattern does expose two panel-level `slots`
(`panelTop`, `panelBottom`), which is **one text block per screen, not per item**.
`[research: repo — ui-forge/src/compose/patterns/modal-grid.mjs at commit 16d6d65]`

**So the canon's entire player-facing budget, as the pipeline stands today, is:** one short line
per relic × 24, an optional ≤70×24px caption per relic, up to two panel-level blocks per screen,
plus non-text environment art. Nothing else. No narration, no NPC, no tutorial, no lore screen.

**Three consequences I am acting on, all flagged for the owners:**

1. **My primary consumer is not the player.** It is Art & Visuals (24 objects, overgrown-versus-restored looks, depth-themed chunks), Meta & Content (set themes, chunk theming by depth) and Vocabulary (naming logic). Lore here is mostly a **consistency substrate**: a small set of rules that makes 24 relics, N authored chunks and the environment art all imply the same past without any of them stating it. That is a real deliverable and it is honest about the bandwidth.
2. **No sheet below may make a claim that only survives if a text surface is built.** Each sheet must state what it delivers through art and structure alone, and separately what it would deliver *if* a text field is funded. Sheet 01 sets that rule.
3. **This is a finding about stage 0, not only about me.** A binding developer decision ("humor lives only in relic flavour text") names a surface that neither the spec sheets nor the build registry provide. Routed below.

---

## What the brief did not give me

Ten gaps. Each is routed to the sheet or the kind of work that must decide it. None is filled here.

| # | gap | routed to |
|---|---|---|
| 1 | **No surface exists for any lore, and per-relic text is not buildable today.** `ui-forge` has one pattern with no item body-text field `[research: repo]`. | Sheet **01** states the requirement and the ceiling. The **decision** belongs to the kind of work owning screen inventory and on-screen copy *[currently UI/UX — Screens, wave 4]*, and to whoever owns the **build pattern registry** *[currently ui-forge / stage 1]*. Not mine to resolve. |
| 2 | **"Relic flavour text" is presupposed by a binding constraint and established by nothing.** The in-session tone decision assumes the field; no sheet lists it; the registry cannot render it. It also constrains *"tutorial text"* while `02-GAMEPLAY.md` says *"No text, no tutorial."* | Sheet **01** (as a named requirement with a fallback). Same two owners as gap 1. Tone Lead is stating the same requirement independently; **the two requirements must not conflict** and verification should compare them. |
| 3 | **Whether the past had inhabitants at all is never stated.** The brief says *"ancient stone"* and *"An overgrown ruin"*. It never says anyone lived there, built it, or left. Zero interview coverage, the same class of hole as *"who the player is"*. | Sheet **02**, which must record that it decides with **no developer input** so a later revision knows the decision was unanchored rather than derived. `[cid: decided]` |
| 4 | **There is no era, no date, and no "how long ago" anywhere in the brief.** *"Ancient"* is the only temporal word in the source. | Sheet **04**. |
| 5 | **"Restored" is used without the brief ever saying whether anything is rebuilt.** *"reclaimed"*, *"restoration game"*, priority 2's *"visitable restored ruins"*, and `04-PRESENTATION.md` leaves *"what 'restored' looks like versus 'overgrown'"* to Art. Mechanically the player only removes overgrowth and never builds. | Sheet **07**. Consequence for **Fantasy** (*"what the player becomes"*) and for **Art & Visuals** (the restored look), both of which need the canon's answer and neither of which should have to guess it. |
| 6 | **The fiction of the collection is split across three waves.** *"what the four sets of relics mean"* is mine (wave 1), *"Set themes"* is Meta & Content (wave 3), *"The 24 relics"* is Art & Visuals (wave 4). Wave 1 either pre-empts them or writes around a hole. | Sheet **05**, written as **shape only**: it may not name any of the four themes or any object. The **arbitration** is not mine; it belongs to whoever sequences CID, and to category verification, which will see wave-1 terms that waves 3 and 4 must match. |
| 7 | **What 24/24 means in the fiction is unstated.** *"With endless areas, the collection is the only finishable thing"*, so the canon is finishable too and runs out at 100%. The brief names the objective and says nothing about what reaching it signifies. | Sheet **05**, in explicit dependency with sheet **06**. Set-completion *bonuses* remain Meta & Content's. |
| 8 | **The Setting/Lore boundary is undrawn in the source.** The same `01-FOUNDATION.md` left-open line was quoted to both domains by `cid/theme/_category.md`, and *"world rules"* (mine) overlaps *"physical rules of the place"* and *"what exists here and what does not"* (Setting's). | **I drew it and it is `[cid: decided]`, flagged upward.** My half is the **causal past**: what happened, why, whether it is dated, whether the original state is recoverable, and what stays unexplained. Setting's half is the **present-tense place**: what it is, how big, how deep, one ruin or many, what exists in it now. **Consequence for Setting:** sheets 04 and 07 depend on Setting's scale ruling and must be written to hold under either answer. Sheet 04 does **not** decide how endlessness works. |
| 9 | **No reading level and no word budget exist for the 8–14 band.** The band is binding; `04-PRESENTATION.md` records that *"extending to a text-free comprehension rule"* was **declined**, so text is permitted but unbudgeted. | Sheet **01** states lore's own budget. The **global on-screen copy budget** belongs to the kind of work owning on-screen copy *[currently UI/UX — Screens]* and is settled nowhere. |
| 10 | **Whether relic rarity exists separately from overgrowth rarity is unresolved** (`OPEN.md §5` assumption 1 versus *"hide rarer sets"* / *"rarer finds"*). If relics have their own rarity, the canon may owe an explanation for why some objects are scarcer. | Not mine to settle: **Systems (wave 2)** and **Meta & Content (wave 3)** per `OPEN.md §5`. Sheet **05** must state a **conditional** and may not assume either answer. |

---

## Why 7 sheets

The split follows the four non-empty ownership slots, then breaks history apart wherever two
pieces **fail differently**. Sheet 01 exists because every other sheet's usefulness depends on a
delivery ceiling that is externally fixed and now measured, and because a budget decided once is
cheaper than seven writers each guessing it. History becomes three sheets, not one, because the
builders (02), the ending (03) and time (04) have different downstream consumers and different
failure modes: 02 fails by pre-empting waves 3 and 4, 03 fails by breaking the warm-not-spooky
register or smuggling in an agent, and 04 fails by contradicting Setting. Merging them would let
one writer smear a weak decision across three sections and would make a single tonal slip
expensive to redo. Sheet 05 is the item the brief named explicitly and is the highest-collision
decision in the domain, so it is isolated where a revision request can hit it alone. Sheet 06
owns the *"unexplained-on-purpose"* slot, which is unusually load-bearing here: with almost no
delivery bandwidth, what is deliberately unsaid is most of the design, and without an
enforceable silence list waves 3 and 4 will each answer the same open question differently.
Sheet 07 is separate because it is the one canon claim Art cannot proceed without and the one
place where *"restoration"* could quietly imply construction this game does not have. I did not
split 04 from 05 on "does depth mean older" versus "what do the sets mean" by accident: they
touch, and the dependency is stated rather than merged, because one is about time and the other
is about grouping.

| # | sheet | must decide |
|---|---|---|
| 01 | `canon-delivery-budget` | Which surfaces carry canon and how much, against the measured ceiling (one ~short line per relic, an optional ≤70×24px caption, two panel-level blocks per screen, environment art); the rule that no canon is ever a prerequisite for understanding the game; and the explicit **unreachable list** of what cannot be delivered today. States the delivery requirement for the kind of work owning screen inventory and build patterns; does not decide whether that surface exists. |
| 02 | `the-builders` | Whether the past had inhabitants at all, and if so the **one** thing they cared about that ~24 objects can express without naming any object or any of the four set themes. Must record that it decides with zero developer input. Must survive the declined *"Uncover a lost civilisation"* positioning. |
| 03 | `the-ending` | Why the place is empty, and why it stays empty. The cause must carry no agent, no threat, no catastrophe that reads grim, no sleep-and-waking, and no implication that anyone is coming back. Must be legible without a single word of text. This is the sheet where tension re-enters if anywhere. |
| 04 | `depth-as-chronology` | Whether deeper means **older** (is depth a timeline, or only a difficulty and rarity axis?), and what account of the past keeps limitless depth from reading absurd, without implying the world generates itself. Must hold under either of Setting's scale rulings and must not decide scale. Art and Meta & Content both consume this. |
| 05 | `what-the-sets-mean` | The **shape** of meaning across four groupings: what kind of relation the four hold to each other and to depth, and whether reaching 24/24 delivers a closing statement or deliberately none. **May not name any of the four themes or any object.** Must state a conditional on gap 10 rather than assume a rarity model. Must hold if priority 2 never ships. |
| 06 | `the-silences` | Which specific questions the canon **never** answers, as an enumerated list, plus the enforcement rule that later waves may not answer them. Conflict rule: if any of 02–05 answers a listed question, the revision request goes to **06**, not to them. |
| 07 | `uncovered-not-rebuilt` | Whether the canon asserts the place returns to its former condition, or only that it becomes visible again. Decides the canon **claim** only; the look of "restored" stays with Art & Visuals. Consequence for Fantasy Lead and Setting Lead, both flagged. |

**Sequencing note.** 01 should be written first, or at least its ceiling treated as an input, but
it does not depend on 02–07 because the ceiling is externally fixed. **06 is the only sheet with a
real ordering requirement:** it can only enumerate silences once 02–05 have said what they say.
If all seven run in parallel, 06 enumerates by *question* rather than by *answer* and its conflict
rule above resolves the overlap at verification time.

**Every sheet ends in 2–4 checkable criteria**, per the category's verification bar. For this
domain that means criteria of the form "this sheet names zero characters", "term X appears in N
places and nowhere else", "no line of player-facing copy exceeds N words", "this sheet asserts
zero mechanics and zero numbers". **No sheet may specify a mechanic, an economy or pacing number,
or an art asset.** Every proper noun any sheet coins must be surfaced in a form
**Vocabulary Lead** can collect, since the canonical list is the last writer and a term that
exists here and not there fails the whole category.

---

## Verification note

**Sheet 05 is the one most likely to be contradicted, and by two parties.** *"What the four sets
of relics mean"* is assigned to me in wave 1, while *"Set themes"* is **Meta & Content's** in
wave 3 and *"The 24 relics"* is **Art & Visuals'** in wave 4. Both are downstream of me and both
will make concrete choices where I wrote only shape. Either they contradict 05 or 05 has robbed
them. It is written shape-only for exactly that reason, and it is the sheet a reviewer should
read first when wave 3 lands.

**Second most likely: sheet 04, contradicted by Setting Lead in this same wave.** Setting is
resolving *"one ruin that never ends, or many?"* concurrently, and depth-as-chronology sits
directly on top of that answer. 04 is instructed to hold under either ruling, which is a
constraint a writer can fail without noticing. The category's own check, *"no lore entry asserts
a world rule Setting forbids"*, will land here.

**Third, and the one that voids the most work if it goes badly: sheet 01, by the kind of work
owning screen inventory and build patterns.** If wave 4 decides no per-relic text field exists,
or the pattern registry never grows one, then 02–07 are delivered through environment art and 24
short names alone. 01 is required to state that fallback explicitly rather than assume the field,
so that outcome is a scope answer rather than a failure.

**Least likely to be contradicted, and worth saying: the empty conflict slot.** Three sheets
carry a guard against re-importing an agent or a threat, and `HANDOFF.md` elevated the rule. If a
later wave asks for tension, it is arguing with the handoff, not with me.

---

## Research owed

**`must_verify`: none assigned to this domain.** I did the verification the delivery problem
demanded anyway, because writing canon without knowing whether it can reach a player would have
been the more expensive mistake.

**Fetched and confirmed:**

- `ui-forge/src/compose/patterns/modal-grid.mjs` (read in full) plus a glob of
  `ui-forge/**/patterns/**` and a grep of `ui-forge/src` for
  `description|blurb|flavour|subtitle|body`. **One pattern exists; its item card has no
  body-text field; the only per-item text carriers are a single-line `name` (26px) and a
  ≤70×24px `badge`; the two `slots` are panel-level.**
  `[research: repo — ui-forge/src/compose/patterns/modal-grid.mjs, commit 16d6d65]`
  This is a file read at one commit, not a fetched page, and it **goes stale the moment the
  registry grows.** Re-check before relying on it.
- `https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator` — the store description for
  the brief's stated nearest fantasy competitor is *"Dig your way through the dig site looking
  for buried treasure! Once you find some use your coins to upgrade your shovel, backpack, pets
  and more!"* It names **no collection, index, museum or catalogue, and no per-item lore or
  description.** `[research: url]` Corroborates the brief's *"no game in this family surfaced a
  hidden-object collection layer"* at the fantasy level, which is **Fantasy Lead's** mandated
  search, not mine. Passed sideways as a free data point, not as their answer.

**Could not verify. `[unverified]`**

- **Whether any shipping game in this family carries descriptive or flavour text per item in a
  collection index UI.** This matters because it is the difference between sheet 01 asking for a
  genre-normal field and asking for a novel one. Two Fandom fetches returned **HTTP 402**
  (`rblx-treasure-hunt-simulator.fandom.com/wiki/ROBLOX_Treasure_Hunt_Simulator`,
  `roblox.fandom.com/wiki/Community:HenryDev/Treasure_Hunt_Simulator`), and web search returned
  only generic Roblox UI-kit listings and an unrelated fighting game's flavour-text wiki. **The
  specific fetch that would settle it:** the in-game index or catalogue screen of
  `[🌱] Grass Incremental Simulator` or `Treasure Hunt Simulator`, obtained as a gameplay
  screenshot or video frame of that screen, or an item page on either game's fan wiki via a
  source that is not paywalled. Until then, sheet 01 must treat the field as **novel and
  unfunded** and write its fallback accordingly.
- **Whether the build pattern registry will gain a per-item text field.** Not knowable by reading
  the repo; it is a scope decision. **The check that would settle it:** `npm run capabilities`
  output at the time the kind of work owning screens runs *[wave 4]*, compared against that
  wave's screen index. I have no shell in this role and read the pattern source instead.

**Sources:**
[Treasure Hunt Simulator on Roblox](https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator) ·
[RBLX Treasure Hunt Simulator Wiki (HTTP 402, unavailable)](https://rblx-treasure-hunt-simulator.fandom.com/wiki/ROBLOX_Treasure_Hunt_Simulator) ·
[Roblox Wiki: Treasure Hunt Simulator (HTTP 402, unavailable)](https://roblox.fandom.com/wiki/Community:HenryDev/Treasure_Hunt_Simulator) ·
[Roblox DevForum: how should I describe items in my game](https://devforum.roblox.com/t/how-should-i-describe-items-in-my-game/176974)
