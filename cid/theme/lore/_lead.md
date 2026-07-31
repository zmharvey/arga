# Lore — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `bridge/schema.mjs` (the build contract),
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md`, `cid/theme/_category.md`. Also read as verification, not as brief:
`ui-forge/src/compose/patterns/` (both patterns) and `ui-forge/src/ideate/brief.mjs`.

**Ownership:** history · world rules · why the conflict exists · canon events ·
unexplained-on-purpose gaps.
**Not mine:** *"Quest text or mission structure (Gameplay — Meta & Content)"*. There are no quests
in scope at all.

**This is a re-plan. It supersedes a 7-sheet index.** Two sheets now. The reasons are below and
they are structural, not stylistic.

---

## Finding 1 — this domain owns zero contract keys

I read `SCHEMA` in `/Users/zachsmacbook/Desktop/Code/arga/bridge/schema.mjs`. Ten keys, and their
`owner` fields are:

| key | owner |
|---|---|
| `area`, `collection` | `gameplay/meta` |
| `tiers`, `currency` | `gameplay/systems` |
| `upgrades` | `gameplay/balance` |
| `movement` | `gameplay/mechanics` |
| `onboarding` | `gameplay/onboarding` |
| `patch` | `art/objects` |
| `modules`, `runtime` | `tech/architecture` |

**No key is owned by `theme/*`. Not one. There is no `lore`, `history`, `fiction` or `flavour` key,
and no field of any key holds narrative.** So **neither sheet below carries a manifest block, and
that is correct rather than a shortfall.** `[research: repo — bridge/schema.mjs]`

**The sharper half of the finding.** The contract *does* hold every player-facing string the build
will ever render, and each one belongs to someone else:

| string | count | owner |
|---|---|---|
| `collection.sets[].relics` — the relic names | 24 | `gameplay/meta` |
| `collection.sets[].id` | 4 | `gameplay/meta` |
| `currency.name` · `.plural` (**machine-checked at ≤10 chars**) · `.icon` | 3 | `gameplay/systems` |
| `tiers[].name` | ≥2 | `gameplay/systems` |
| `upgrades[].label` | 3 | `gameplay/balance` |
| `upgrades[].blurb` — **the only free-length prose field in the entire contract** | 3 | `gameplay/balance` |
| `area.label` | 1 | `gameplay/meta` |

~40 strings of fiction reach the build, and Lore owns none of them. **Lore's only route to the
build is by being upstream of six other domains' string choices.** That is what this domain is for,
stated honestly, and it is why the sheets below are written as constraint sets rather than as prose.

**One contradiction in the source, flagged not resolved.** `bridge/schema.mjs`'s own header says the
relic names were the most telling thing a builder had to invent, *"which is literally CID's job"* —
yet it assigns `collection` to `gameplay/meta`, while `OPEN.md §4` assigns *"all naming"* to
Theme & Narrative. The contract's owner column and the brief's routing table disagree about who
writes 24 names. **I am not resolving it and I am not planning a naming sheet** (naming is not
separable from the thing named, and `collection` is not mine). Routed as gap 6.

## Finding 2 — the empty ownership slot, reported rather than filled

**"Why the conflict exists" has no answer, because there is no conflict.** No sheet is assigned to
it and none should be.

> *"**There is no failure state.** No death, no losing, no loss of progress."* / *"**Zero tension is
> deliberate.** ... **Consequence: audio and visual feedback carry the entire load** — and nobody
> downstream should invent tension to fill the gap."* (`02-GAMEPLAY.md`)
> `[brief: soft]` `[you accepted: step 6 Q2]`, elevated to one of six things to know before
> designing anything by `HANDOFF.md` → treat as `[brief: binding]`

No antagonist, no threat, no encroaching force, no deadline, nothing that happens if the player
stops. Both sheets carry the same guard: a cause with an agent behind it, a threat, or a thing that
is still happening is out of bounds. **The second-order consequence is the actual writing problem:
with no conflict, history cannot be dramatic.** It has to be interesting with nothing at stake.

---

## What the brief gave me

The blank page, stated twice as an assignment:

> *"Left open — **the ruin's identity and history**, who the player is, **what the four sets of
> relics mean**, the names of everything. *[currently: Theme & Narrative]*"* (`01-FOUNDATION.md`)
> `[brief: binding]` as an assignment · `[cid: decided]` as to all content

> *"Left open — **what the ruin actually is**, how chunks are themed by depth..."* (`03-META.md`)
> — shared with Meta & Content, wave 3

Constraints my canon may not contradict:

| constraint | tag |
|---|---|
| *"**Cleared is permanent — overgrowth never returns.** ... This is the payoff and it is load-bearing."* / *"Slow regrowth and decay-if-you-leave were both offered and declined."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q1]` |
| *"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both declined."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q2]` |
| *"**No offline accumulation.** Nothing regrows, so nothing can accrue while away."* | `[brief: binding]` by consequence |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`) | `[brief: binding]` `[you chose: R4 Q2]` |
| *"**Endless via shuffled authored chunks**, not generation."* (`03-META.md`) | `[brief: binding]` `[you chose: R5 Q1]` |
| *"**The noun is a vehicle, not the differentiator.**"* / *"**The hidden-collection layer, not the noun.**"* | `[brief: binding]` `[you chose: R1 Q1]` |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` |
| *"**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."* (`03-META.md`) | `[brief: binding]` `[you chose: R3 Q2]` |
| *"**An overgrown ruin being reclaimed.**"* and *"**Clearing and discovering are one action.**"* (`01-FOUNDATION.md`) | `[brief: soft]` `[you accepted: R2 Q3]` |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* / *"This is reclamation, not a haunted place."* | `[brief: soft]` ×2. Register is **Tone Lead's** to encode; I inherit it as a filter |
| *"**~24 objects in 4 sets of 6.** ... **Each set tied to area depth**"* and *"**the objects themselves are invented downstream**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R4 Q4]` |
| *"**With endless areas, the collection is the only finishable thing**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R6 Q3 → R5 Q3]` |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` |
| *"**No mastery layer.** ... **Stated so nobody invents one.**"* (`03-META.md`) | `[brief: soft]` `[I assumed]`, self-flagged |
| *"**Permanent multipliers only. Never content access.**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q4]` |
| **Dry and sparse. Humor lives only in relic flavour text. No relic name is a pun.** | `[brief: binding]` — **developer, in session 2026-07-30, in no sheet.** Relayed from `cid/theme/_category.md`; Tone Lead owns the decision |
| *"Uncover a lost civilisation" was declined as the hook line "because the verb disappears"* (`05-OUTWARD.md`) | `[brief: soft]` `[you accepted: R6 Q1]`. Constrains the **headline**, not the canon — but a canon that makes the civilisation the point contradicts a positioning decision |

**Scope gate.** Nothing in my subject is priority 3 and neither sheet specs excluded content. The
gate binds me as fiction prohibitions, relayed intact: no cycle, renewal, reincarnation or
begin-again framing; no world that changes while the player is absent; no world that creates
itself; no exchange, gifting, rivalry, ranking or comparison between players; no festival, holiday
or calendar; no presumed daily visit or returning benefactor. **Priority 2's *"visitable restored
ruins"* may be compatible with my canon but my canon may not depend on it.**

**The delivery ceiling, measured today, which caps both sheets.** My previous index said `ui-forge`
had exactly one pattern. **That is now stale — there are two** (`modal-grid`, `hud-overlay`). The
substance survives and is sharper:

- Neither pattern has a per-item body-text field. `modal-grid`'s item card is `name` (one
  `TextLabel`, fixed height 26), `badge` (≤70×24 caption), `price` (numeric), `art` + `artPrompt`.
  `hud-overlay`'s carriers are `ReadoutLabel` (14px caption), `ReadoutValue` (numeric) and
  `BarLabel`. There is no `description`, `body`, `subtitle`, `blurb` or `flavour` item field in
  either. Both expose panel-level `slots` — one block per screen, never per item.
- The generation budgets are explicit: *"title <= 24 characters · item name <= 20 · price <= 14 ·
  badge <= 8 · chip value <= 10"* and **"Put the flavour in artPrompt, where there is unlimited
  room, not in the labels."** `ui-forge/src/ideate/brief.mjs`
- `[research: repo — ui-forge/src/compose/patterns/{modal-grid,hud-overlay}.mjs and ui-forge/src/ideate/brief.mjs at HEAD 16d6d65]` **This goes stale the moment the registry grows again. It already did once. Re-check.**

**So canon's one high-bandwidth channel is `artPrompt`, which is unlimited and is Art's field.**
Everything else is a ≤20-character label owned by a gameplay domain. Both sheets must be written to
be delivered through art, silhouette and structure, with text as a bonus that may never arrive.

---

## What the brief did not give me

Seven gaps, each routed. None filled.

| # | gap | routed to |
|---|---|---|
| 1 | **No contract key and no build surface carries fiction.** Zero narrative keys in `SCHEMA`; no item body-text field in either pattern; `04-PRESENTATION.md`'s screen list has no lore surface; onboarding is *"No text, no tutorial"*. `[research: repo]` | Not mine to decide, and **no sheet of mine restates it as if it were a decision.** Three kinds of work: whoever owns **screen inventory and on-screen copy** *[currently UI/UX, wave 4]*, whoever owns the **build pattern registry** *[currently ui-forge / stage 1]*, and whoever owns the **CID→build contract itself** (adding a fiction key is a schema change). |
| 2 | **"Relic flavour text" is presupposed by a binding developer constraint and established by nothing** — no sheet lists it, no contract key holds it, neither pattern renders it. It also constrains *"tutorial text"* while `02-GAMEPLAY.md` says *"No text, no tutorial."* | Same three owners as gap 1. **Tone Lead is stating the same requirement independently; the two must not conflict and verification should compare them.** Neither of us may assume the field exists. |
| 3 | **Whether the past had inhabitants at all is never stated.** *"Ancient stone"* and *"An overgrown ruin"* are the whole source. It never says anyone lived there, built it, or left. Zero interview coverage — the same class of hole as *"who the player is"*. | Sheet **01**, which **must record that it decides with no developer input**, so a later revision knows the decision was unanchored rather than derived. `[cid: decided]` |
| 4 | **No era, no date, no "how long ago."** *"Ancient"* is the only temporal word in the brief. And *"restored"* is used throughout without the brief ever saying whether anything is rebuilt — mechanically the player only removes overgrowth and never builds. | Sheet **01**. Consequence for **Fantasy** (*"what the player becomes"*) and for the kind of work owning **the restored-versus-overgrown look** *[currently Art & Visuals]*, neither of which should have to guess the canon's answer. |
| 5 | **Whether relic rarity exists separately from overgrowth rarity is unresolved.** `OPEN.md §5` assumption 1 says the ladder lives in the overgrowth; `03-META.md` says deeper areas *"hide rarer sets"*. | Not mine: **Systems (wave 2)** and **Meta & Content (wave 3)** per `OPEN.md §5`. Sheet **01** must state a **conditional** and may not assume either answer. |
| 6 | **Two sources disagree about who names the 24 relics and the 4 sets.** `bridge/schema.mjs` owns `collection` to `gameplay/meta` and calls relic naming *"literally CID's job"* in the same file; `OPEN.md §4` gives *"all naming"* to Theme & Narrative and *"Set themes"* to Meta & Content. | **Arbitration is not mine.** Passed to whoever sequences CID and owns the contract's owner column. **Consequence I am acting on:** sheet 01 may not name any set theme or any object, and there is no Lore naming sheet. |
| 7 | **The Setting/Lore boundary is undrawn in the source** — the same `01-FOUNDATION.md` line was quoted to both of us, and *"world rules"* (mine) overlaps *"what exists here and what does not"* (Setting's). | **I drew it: `[cid: decided]`, flagged upward.** Mine is the **causal past** — what happened, when relative to depth, and whether the original condition is recoverable. Setting's is the **present-tense place** — what it is, how deep, one ruin or many. **Consequence for Setting:** sheet 01 depends on its scale ruling and is instructed to hold under either answer. Sheet 01 does not decide scale. |

---

## Why 2 sheets

**Because I own no contract keys, every sheet here is a non-value sheet, and only two non-value
decisions in this subject are genuine.** The first is an assertion set: what is true about this
place's past, written as the constraints the ~40 build strings and the environment art must all
satisfy. The second is a prohibition list: which questions the canon never answers, and the rule
that later waves may not answer them.

The previous plan split the first of those into four sheets (builders, ending, chronology, restored)
plus a delivery-budget sheet plus a set-meaning sheet. All four history sheets feed the same ~40
strings, none supplies a value, and they only make sense if they agree with each other — so
splitting them buys four contradiction surfaces for zero delivered keys. They are one story and one
writer should tell it once. The delivery-budget sheet is deleted because the budget is externally
fixed and now measured above, and the decision to add a text surface belongs to three other kinds
of work: a sheet of mine could only restate a constraint, which is a sheet of nothing. The
set-meaning sheet is deleted as a separate file because `collection` is owned by `gameplay/meta`,
naming is forbidden to me, and what remains is a paragraph inside 01.

What justifies **two** rather than one: 01 and 02 fail differently and are read by different agents
at different times. 01 fails by contradicting Setting in this wave or by smuggling an agent into
the past. 02 fails by being unenforceable, or by pre-empting a question wave 3 legitimately needs
to answer. 02 is also the artifact other waves grep; buried in 01's prose it stops working.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-past` | What happened here, as one story, expressed as the constraint set that every relic name, set id, tier name, area label and art prompt must be consistent with. Settles, together: whether the past had inhabitants at all; whether an era or a "how long ago" exists; whether deeper means **older** or only denser and rarer; and whether the canon claims the place returns to its former condition or only becomes visible again. **No manifest block** — no contract key holds any of this. **May not name any of the four set themes, any of the 24 objects, any currency, tier or upgrade.** Must record that it decides with zero developer input. Must hold under either of Setting's scale rulings and must not decide scale. Must state a conditional on gap 5 rather than assume a rarity model. Must be legible through silhouette and art alone, since no text field is funded. Must carry no agent, no threat, no catastrophe that reads grim, no sleep-and-waking, and no implication that anyone is coming back. Must survive the declined *"Uncover a lost civilisation"* positioning. |
| 02 | `the-silences` | Which specific questions the canon **never** answers, as an enumerated list, plus the enforcement rule that later waves may not answer them. **No manifest block** — this is a prohibition, not a value. Conflict rule: if 01 answers a question 02 lists, the revision request goes to **02**, not to 01. Must not forbid anything a domain that owns a contract key needs in order to fill it — a silence that blocks `collection.sets` or `tiers[].name` is a silence that fails. |

**Both sheets end in 2–4 checkable criteria**, per the category bar: forms like *"this sheet names
zero characters"*, *"this sheet asserts zero mechanics, zero numbers and zero art assets"*, *"this
sheet names zero of the 24 objects and zero of the 4 set themes"*, *"N questions listed, none
answered elsewhere in this domain"*. Every proper noun either sheet coins must be surfaced in a form
**Vocabulary Lead** can collect; the canonical list is the last writer and a term that exists here
and not there fails the category.

---

## Verification note

**Sheet 01, contradicted by the domains that own the strings it constrains.** `gameplay/meta`
writes the 24 relic names, the 4 set ids and `area.label`; `gameplay/systems` writes `currency.name`
and the tier names; `gameplay/balance` writes the three upgrade labels and the three blurbs. All
three are downstream of me, all three can write their strings without ever opening 01, and **the
gate cannot catch it.** `validateManifest` checks shapes, that tier weights sum to 100, that rarer
pays more, that no relic appears in two sets, that `currency.plural` is ≤10 characters, and that no
two sheets provide the same key. **There is no check anywhere that a name is consistent with the
canon.** A fiction contradiction is invisible to the bridge by construction, so 02's list plus an
opus reviewer is the only enforcement that exists. That is worth stating out loud rather than
discovering in wave 4.

**Second: sheet 01, contradicted by Setting Lead in this same wave.** Setting is resolving *"one
ruin that never ends, or many?"* concurrently, and whether deeper means older sits on top of that
answer. 01 is instructed to hold under either ruling, which is a constraint a writer can fail
without noticing. The category's own check — *"no lore entry asserts a world rule Setting
forbids"* — lands here.

**Least likely, and worth saying: the empty conflict slot.** Both sheets guard against re-importing
an agent or a threat and `HANDOFF.md` elevated the rule. If a later wave asks for tension, it is
arguing with the handoff, not with me.

---

## Research owed

**`must_verify`: none assigned to this domain.** I verified the two things that decide whether this
domain's output can reach anything, because writing canon without knowing that would be the more
expensive mistake.

**Read and confirmed:**

- `bridge/schema.mjs` in full. **Ten contract keys, zero owned by `theme/*`, zero narrative fields.**
  The only machine-enforced constraint on any name in the whole contract is
  `currency.plural.length <= 10`. `[research: repo — bridge/schema.mjs]`
- `ui-forge/src/compose/patterns/` — **two** patterns now, `modal-grid` and `hud-overlay`. **This
  corrects my previous index, which said one.** Neither has a per-item body-text field; a grep of
  `ui-forge/src` for `description|blurb|flavour|flavor|subtitle` returns typography tokens, JSON
  schema descriptions and HTML plumbing, never an item field.
  `[research: repo — at HEAD 16d6d65]`
- `ui-forge/src/ideate/brief.mjs` — hard character budgets (title ≤24, item name ≤20, price ≤14,
  badge ≤8, chip value ≤10) and the explicit routing rule **"Put the flavour in artPrompt, where
  there is unlimited room, not in the labels."** This is the pipeline stating, in its own words,
  that fiction reaches the player through art rather than through text.
  `[research: repo — ui-forge/src/ideate/brief.mjs:124-130]`

**Could not verify. `[unverified]`**

- **Whether any shipping game in this family carries descriptive or per-item flavour text in a
  collection-index UI.** Two Fandom fetches returned HTTP 402 last run; a differently-shaped web
  search this run returned only the same class of result. The one adjacent data point found:
  *Item Asylum* puts flavour text on **map/lobby transition screens**, not on an item card — a
  different surface class, which weakly suggests per-item flavour text is not the genre norm.
  **The specific fetch that would settle it:** the in-game collection or index screen of
  `[🌱] Grass Incremental Simulator` or `Treasure Hunt Simulator` as a gameplay screenshot or video
  frame, or an item page on either game's fan wiki via a non-paywalled mirror.
  **Lower stakes now than last run:** the build side is settled from the repo (no key, no field), so
  this would only tell us whether the ask is genre-normal, not whether it is buildable.
- **Whether the contract or the pattern registry will gain a fiction field.** Not knowable by
  reading either; both are scope decisions. **The checks that would settle it:**
  `npm run bridge -- --contract` and `npm run capabilities` re-run at the time the kind of work
  owning screens executes *[wave 4]*. I have no shell in this role and read both sources instead.

**Sources:**
[Flavour texts — Item Asylum Wiki](https://item-asylum-wiki.fandom.com/wiki/Flavour_texts) ·
[Roblox DevForum: how should I describe items in my game](https://devforum.roblox.com/t/how-should-i-describe-items-in-my-game/176974)
