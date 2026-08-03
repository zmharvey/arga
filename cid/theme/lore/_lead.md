# Lore — domain index

**Category:** Theme & Narrative · **Wave:** 1, revised wave 7 · Reads: `bridge/schema.mjs`,
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md`, `cid/theme/_category.md`. Also read as verification:
`ui-forge/src/compose/patterns/` (both patterns) and `ui-forge/src/ideate/brief.mjs`.

**Ownership:** history · world rules · why the conflict exists · canon events ·
unexplained-on-purpose gaps.
**Not mine:** quest text or mission structure. There are no quests in scope at all.

---

## Finding 1 — this domain proposes `canon`, and that reverses the wave-1 finding

The wave-1 index concluded that because no contract key was owned by `theme/*`, **neither sheet
should carry a manifest block**. That was the wrong conclusion from a correct observation, and it is
the wave-1 defect this repo names: a domain does not need a contract key to run, it needs to produce
one. `[research: bridge/verify-sheets.mjs]`

**The observation stands.** Of the 26 merged keys, `theme/*` owns exactly one — `vocabulary`,
Vocabulary's — and no field of any key holds narrative.

**The conclusion is replaced.** The sharper half of the wave-1 finding was that *"Lore's only route
to the build is by being upstream of six other domains' string choices"*, and that route has a hole
in it: `bridge/schema.mjs`'s `playerFacingStrings()` enumerates labels, blurbs, find names and set
labels — **and no `artPrompt`**. So the merger can enforce a naming rule on the ~40 short strings and
cannot see the one unlimited-length field in the pipeline, which is exactly where a sentence of
invented history fits. `[research: ui-forge/src/ideate/brief.mjs]`

**That hole is the shape of the key.** `canon` is proposed by sheet `01`, carrying four rulings, six
rules with explicit forbidden-word lists, and the scope each applies to. Sheet `02` amends its
`silences` field with six rows. Sheet `01` additionally files a `vocabulary` amendment requesting 25
of its forbidden words into `bannedWords`, where the merger fails a build on a hit — **the hard half
of the rule, in the key that already enforces it.** One key, one subject, one owning sheet.

| sheet | data form | key |
|---|---|---|
| `01-the-past` | `manifest`, proposed | `canon` — rulings, rules, scope, enforcement |
| `01-the-past` | `json` amends | `vocabulary.bannedWords`, 25 rows with reasons |
| `02-the-silences` | `json` amends | `canon.silences`, 6 rows with token lists and structural tests |

## Finding 2 — the empty ownership slot, reported rather than filled

**"Why the conflict exists" has no answer, because there is no conflict.** No sheet is assigned to
it and none should be.

> *"**There is no failure state.** No death, no losing, no loss of progress."* / *"**Zero tension is
> deliberate.** … **audio and visual feedback carry the entire load** — and nobody downstream should
> invent tension to fill the gap."* (`02-GAMEPLAY.md`) `[brief: soft]` `[you accepted: step 6 Q2]`,
> elevated by `HANDOFF.md` → treat as `[brief: binding]`

No antagonist, no threat, no encroaching force, no deadline, nothing that happens if the player
stops. Both sheets carry the same guard: a cause with an agent behind it, a threat, or a thing that
is still happening is out of bounds. **The second-order consequence is the actual writing problem:
with no conflict, history cannot be dramatic.** It has to be interesting with nothing at stake.

---

## What the brief gave me

The blank page, stated twice as an assignment: *"Left open — **the ruin's identity and history**,
who the player is, **what the four sets of relics mean**, the names of everything"*
(`01-FOUNDATION.md`) `[brief: binding]` as an assignment, `[cid: decided]` as to all content; and
*"Left open — **what the ruin actually is**, how chunks are themed by depth"* (`03-META.md`).

Constraints my canon may not contradict:

| constraint | tag |
|---|---|
| *"**Cleared is permanent — overgrowth never returns.**"* / *"Slow regrowth and decay-if-you-leave were both offered and declined."* | `[brief: binding]` `[you chose: R2 Q1]` |
| *"**No rebirth.**"* · *"**No offline accumulation.** Nothing regrows, so nothing can accrue while away."* | `[brief: binding]` `[you chose: R2 Q2]`, and by consequence |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`) | `[brief: binding]` `[you chose: R4 Q2]` |
| *"**Endless via shuffled authored chunks**, not generation."* | `[brief: binding]` `[you chose: R5 Q1]` |
| *"**The noun is a vehicle, not the differentiator.**"* / *"**The hidden-collection layer, not the noun.**"* | `[brief: binding]` `[you chose: R1 Q1]` |
| *"**8–14, mobile-heavy, short sessions**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* | `[brief: binding]` `[you chose: R1 Q4]` |
| *"**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."* | `[brief: binding]` `[you chose: R3 Q2]` |
| *"**An overgrown ruin being reclaimed.**"* and *"**Clearing and discovering are one action.**"* | `[brief: soft]` `[you accepted: R2 Q3]` |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* / *"reclamation, not a haunted place"* | `[brief: soft]` ×2. Register is Tone's to encode; I inherit it as a filter |
| *"**~24 objects in 4 sets of 6**"* · *"**the objects themselves are invented downstream**"* | `[brief: soft]` `[you accepted: R4 Q4]` |
| *"**Clear → reveal inside the first ten seconds.** … **No text, no tutorial.**"* | `[brief: soft]` `[you accepted: R6 Q3]` |
| *"**Permanent multipliers only. Never content access.**"* | `[brief: soft]` `[you accepted: R5 Q4]` |
| **Dry and sparse. Humor lives only in flavour text. No find name is a pun.** | `[brief: binding]` — developer, session 2026-07-30, in no sheet. Tone owns the decision |
| *"'Uncover a lost civilisation' was declined as the hook line because the verb disappears"* | `[brief: soft]` `[you accepted: R6 Q1]`. Constrains the headline; a canon that makes the civilisation the point contradicts it |

**Scope gate.** Nothing in my subject is priority 3. The gate binds me as fiction prohibitions,
relayed intact: no cycle, renewal, reincarnation or begin-again framing; no world that changes while
the player is absent; no world that creates itself; no exchange, gifting, rivalry, ranking or
comparison between players; no festival, holiday or calendar; no presumed daily visit or returning
benefactor. **Priority 2's *"visitable restored ruins"* may be compatible with my canon but my canon
may not depend on it.**

**The delivery ceiling, which caps both sheets.** Neither `ui-forge` pattern has a per-item
body-text field: `modal-grid`'s item card is `name`, `badge`, `price`, `art` and `artPrompt`;
`hud-overlay`'s carriers are `ReadoutLabel`, `ReadoutValue` and `BarLabel`. The generation budgets
are explicit — title ≤24 characters, item name ≤20, price ≤14, badge ≤8, chip value ≤10 — with the
routing rule **"Put the flavour in artPrompt, where there is unlimited room, not in the labels."**
`[research: ui-forge/src/ideate/brief.mjs]` **So canon's one high-bandwidth channel is `artPrompt`,
which is Art's field and which no check reads.** Both sheets are written to be delivered through
art, silhouette and structure, with text as a bonus that may never arrive.

---

## What the brief did not give me

| # | gap | routed to |
|---|---|---|
| 1 | **No build surface carries fiction.** No item body-text field in either pattern; `04-PRESENTATION.md`'s screen list has no lore surface; onboarding is *"no text, no tutorial"* | **Answered, not routed away.** `canon` is the key, proposed by `01`. Promotion into `bridge/schema.mjs` is the schema owner's |
| 2 | **Flavour text is presupposed by a binding developer constraint and established by nothing** — no key holds it, neither pattern renders it | Screen inventory and on-screen copy (UI/UX), the pattern registry (ui-forge). **Tone states the same requirement independently; verification should compare them.** Neither of us may assume the field exists |
| 3 | **Whether the past had inhabitants is never stated.** Zero interview coverage | Sheet **01**, which records that it decides with no developer input `[cid: decided]` |
| 4 | **No era, no date, no "how long ago."** *"Ancient"* is the only temporal word in the brief, and *"restored"* is used throughout without the brief saying whether anything is rebuilt | Sheet **01**. Consequence for the restored-versus-overgrown look (Art — Environment) |
| 5 | **Whether find rarity exists separately from overgrowth rarity** | **Closed since wave 1:** `rarity.gradedLadderCount` is 1 and `rarity.findPlacementReadsTier` is false, so a find is rare because of how thoroughly it was buried and never because it is precious. Sheet `01`'s conditional resolves in its favour |
| 6 | **Two sources disagree about who names the 24 finds and the 4 sets.** `bridge/schema.mjs` owns `collection` to `gameplay/meta`; `OPEN.md §4` gives *"all naming"* to Theme & Narrative | **Arbitration is not mine.** Consequence I act on: sheet 01 names no set theme and no object, and there is no Lore naming sheet |
| 7 | **The Setting/Lore boundary is undrawn in the source** | **I drew it: `[cid: decided]`.** Mine is the **causal past** — what happened, when relative to depth, whether the original condition is recoverable. Setting's is the **present-tense place** |

---

## Why 2 sheets

The first is an assertion set: what is true about this place's past, written as the constraints every
build string and every art prompt must satisfy. The second is a prohibition list: which questions the
canon never answers, and the rule that later waves may not answer them. They fail differently and are
read by different agents at different times — 01 fails by contradicting Setting or smuggling an agent
into the past; 02 fails by being unenforceable, or by pre-empting a question a later wave legitimately
needs to answer. 02 is also the artifact other waves grep, and buried in 01's prose it stops working.

An earlier plan split the first into four history sheets plus a delivery-budget sheet plus a
set-meaning sheet. All four feed the same strings and only make sense if they agree, so splitting
them buys four contradiction surfaces for zero delivered keys.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-past` | What happened here, as one story, expressed as the constraint set every find name, set id, tier name, area label and art prompt must satisfy. Settles together: whether the past had inhabitants; whether an era or a "how long ago" exists; whether deeper means **older**; and whether the canon claims the place returns to its former condition or only becomes visible again. **Carries the `canon` proposal and the `vocabulary` amendment.** May not name any set theme, any of the 24 objects, any currency, tier or upgrade. Must record that it decides with zero developer input. Must hold under either of Setting's scale rulings. Must carry no agent, no threat, no catastrophe that reads grim, and no implication that anyone is coming back |
| 02 | `the-silences` | Which specific questions the canon **never** answers, as an enumerated list with runnable token tests, plus the enforcement rule that later waves may not answer them. **Amends `canon.silences`.** Conflict rule: if 01 answers a question 02 lists, the revision goes to **02**. Must not forbid anything a contract-key owner needs to fill its key — a silence that blocks `collection.sets` or `tiers[].name` is a silence that fails |

---

## Verification note

**Sheet 01, contradicted by the domains that own the strings it constrains.** `gameplay/meta` writes
the find names, set ids and area labels; `gameplay/systems` writes `currency.name` and the tier
names; `gameplay/balance` writes the upgrade labels and blurbs. All can write without opening 01.
`validateManifest` checks shapes, weights, casing, length and banned words, and **there is no check
anywhere that a name is consistent with the canon.** The 25 words routed into
`vocabulary.bannedWords` are the only part of this domain a machine can hold; everything else needs
02's list plus a reviewer. That is worth stating out loud rather than discovering in a later wave.

**Second: `canon` reaches no builder until it is promoted.** A proposal is collected and reported and
never merged, so today the key's route to the build is a reviewer reading it. That is a better
position than wave 1's — the value exists in one place, in one shape — but it is not enforcement, and
this index does not claim otherwise.

**Least likely: the empty conflict slot.** Both sheets guard against re-importing an agent or a
threat and `HANDOFF.md` elevated the rule. If a later wave asks for tension, it is arguing with the
handoff, not with me.

---

## Research owed

**`must_verify`: none assigned.** Both fetch-dependent questions are settled from the repo.

- `bridge/schema.mjs` in full: 26 merged keys, one owned by `theme/*`, zero narrative fields, and
  `playerFacingStrings()` enumerates no `artPrompt`. `[research: bridge/schema.mjs]`
- `ui-forge/src/compose/patterns/` — two patterns, `modal-grid` and `hud-overlay`, neither with a
  per-item body-text field. `[research: ui-forge/src/compose/patterns/]`
- `ui-forge/src/ideate/brief.mjs` — hard character budgets and the explicit routing rule *"Put the
  flavour in artPrompt."* `[research: ui-forge/src/ideate/brief.mjs]`

**`[unverified]`, with the fetch that would settle each.** Whether any shipping game in this family
carries per-item flavour text in a collection index: two Fandom fetches returned HTTP 402 across two
runs, and the one adjacent data point found puts flavour text on map transition screens rather than
item cards, which weakly suggests it is not the genre norm. The settling fetch is an in-game index
screen of a family title as a frame, or an item page on a non-paywalled mirror. Lower stakes now
than at wave 1: the build side is settled from the repo, so it would tell us only whether the ask is
genre-normal.
