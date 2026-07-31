# Setting — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md` (§1–§6),
`research/landscape.md`, `research/grass-incremental.md`, `cid/theme/_category.md`, plus
`bridge/schema.mjs` and the sheets already on disk under `cid/gameplay/`, `cid/art/`.

**Owns:** location · era · scale of the world · physical rules of the place · what exists here and
what does not.
**Does not own:** map layout, zones, or level structure *[currently: Gameplay — Meta & Content]*.

**This is a re-plan.** The previous version of this index assigned 9 sheets. Three of them
(`scale-and-unit`, `endlessness`, `passage-and-permanence`) were circling values the build contract
assigns to `area`, which is not mine; two more were one decision written twice; one was a one-line
consequence of another sheet. Five survive. What did not change: the two findings below that are
genuine defects in the source rather than latitude.

---

## Contract check — I own zero keys

`bridge/schema.mjs` lists nine keys a build reads: `area`, `tiers`, `upgrades`, `movement`, `patch`,
`collection`, `onboarding`, `modules`, `runtime`. **Not one is owned by any Theme & Narrative
domain.** So every sheet below is a non-value decision, carries no `manifest` block, and constrains
other people's work rather than producing something a build can read. That is the correct shape for
this domain, and it is stated so a later reader does not go looking for the setting's numbers.

Three consequences, and the third is the important one:

1. **`area` owns the dimensions and the density.** `size`, `patchCount`, `minSpacing`, `originXZ`
   belong to `gameplay/meta`. No sheet below states how big anything is, how much overgrowth is in
   it, how many areas exist, or how they are arranged. *"The only friction is the size of an area"*
   (`02-GAMEPLAY.md`) is curve work and appears here only as something I must not contradict.
2. **Naming follows the key.** `area.label`, `collection.sets[].label`, the 24 relic names and
   `tiers[].name` all travel inside keys owned elsewhere, and the merger rejects a second sheet
   claiming a key. **Sheets below name what they themselves decide and may not name an area, a set,
   a relic, or an overgrowth tier.** No parallel name list.
3. **The fiction of this place has already been written, by the owners of those keys, because no
   setting sheet existed when they needed it.** On disk right now:
   - `cid/gameplay/meta/01-the-area.md` — *"Named the **East Terrace**"*, *"one area of an intended
     four"*, and a consequence line handing Art *"a 120-stud terrace to dress, **not an open
     landscape**"*. That is a location decision.
   - `cid/gameplay/meta/02-the-collection.md` — sets labelled **Terrace · Cistern · Vault · Spire**
     at depths 1–4. That is an architectural register and a statement that this ruin has waterworks,
     a strongroom and a tower.
   - `cid/gameplay/systems/01-overgrowth-tiers.md` — **Moss · Fern · Bramble · Heartvine**. That is
     four of the flora that exist here.
   - `cid/art/objects/01-patch-footprint.md` — overgrowth *"does not collide"*. That is a physical
     rule of the place.

   **None of those names carries a provenance tag.** They are `[cid: decided]` facts wearing no tag,
   which is the exact failure this pipeline exists to stop. I am not overruling them and not
   renaming them — see consequence 2. Sheets `01`, `02` and `05` must either supply the fiction that
   makes them coherent or state plainly that they do not fit, and where they do not fit that is a
   **consequence for the owner of the key**, raised as a revision request, never a rename from here.
   Their status — hand-built ahead of their wave, not approved output — is not mine to settle.

---

## What the brief gave me

| constraint, quoted | tag | what it fixes here |
|---|---|---|
| *"**An overgrown ruin being reclaimed.** Cut back vines and moss from ancient stone."* (`01-FOUNDATION.md`) | `[brief: soft]` `[you accepted: R2 Q3]` | Stone, vines, moss and age are the given materials. **I am not overruling it:** the override cascade reaches `fantasy-ornate`, the hook line and the accessibility constraint, and *"the noun is a vehicle"* means a new noun buys nothing. |
| *"**Areas, not zones.** Discrete spaces that are cleared and permanently done."* (`03-META.md`) | `[brief: binding]` `[you chose: R3 Q2 / R5 Q1]` | The world's unit is a discrete finishable space. Not a zone, not a level, not a region that stays open. |
| *"**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."* (`03-META.md`) | `[brief: binding]` `[you chose: R3 Q2]` | One ordering axis, and it is depth. No second axis (no breadth, no era-tier, no difficulty band). |
| *"**Depth is the progression read** — further in means denser overgrowth and rarer finds."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits R2 Q3) | Same axis, different geometry. *Deeper* and *further in* are not the same shape. → sheet `02`. |
| *"**Endless via shuffled authored chunks**, not generation."* (`03-META.md`) | `[brief: binding]` `[you chose: R5 Q1]` | Inexhaustible **and** hand-made. Both halves bind. → sheet `02`. |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing."* (`01-FOUNDATION.md`) | `[brief: binding]` `[you chose: R2 Q1]` | A law of the place, not a preference. *"Slow regrowth and decay-if-you-leave were both offered and declined."* |
| *"**No gating mechanism needed** — with rebirth cut, depth is reached by clearing, not by hitting a threshold."* (`03-META.md`) | `[brief: soft]` `[I assumed]` (`OPEN.md §5` #3) | Says no gate is *needed*. Does not say what is there instead. → sheet `04`. |
| *"**Clearing and discovering are one action.** Do not design them as separate systems."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits R2 Q3) | Nothing here may put the buried thing in a different place, moment, or agency from the overgrowth above it. |
| *"**Green overgrowth on warm stone is naturally high-contrast**, so rarity tiers stay legible — a real problem the v1 spec hit with white snow."* (`04-PRESENTATION.md`) | `[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]` | The palette is load-bearing for a stated *"requirement, not a nicety"*. A dark, washed-out, monochrome or snow-bright place breaks it. → sheets `01`, `03`. |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim."* (`01-FOUNDATION.md`) / *"reclamation, not a haunted place"* (`04-PRESENTATION.md`) | `[brief: soft]` ×2 | Bounds climate, light, and what may inhabit the place. Soft, stated twice, not overruled here. |
| *"**Shared server, parallel progression, own areas, no mechanical interaction.** Everyone occupies one world clearing their own patch, visible to each other."* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q2]` | One world, many occupants, private work — stated as a social model with no world rule attached. → folded into sheet `02`, see below. |
| *"Priority 2 — ... **visitable restored ruins**."* (`03-META.md`) | `[brief: soft]` `[I assumed — the ordering]` | Plural, and it presumes a finished area survives as a place. → sheet `04`. |
| *"per-area cleared state ... permanence means the world itself is save data, which grows without bound **unless areas are collapsed to a completion flag** once finished."* (`OPEN.md §2`) | `[brief: soft]` `[I assumed — batched default]` | Pulls directly against the row above. Named, not resolved, in sheet `04`. |
| *"**There is no failure state.**"* / *"**Zero tension is deliberate.**"* (`02-GAMEPLAY.md`), elevated by *"**Do not invent tension to fill the gap.**"* (`HANDOFF.md`) | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated | No hazard, no encroachment, nothing that worsens if the player stops. Binds sheets `03` and `05` hardest. |
| *"**Clear → reveal inside the first ten seconds.** No text, no tutorial."* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` | Every world fact below must be legible from standing in the place, or be non-load-bearing. Nothing here is a prerequisite for play. |
| *"**The hidden-collection layer, not the noun.**"* / *"the theme is a **vehicle**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q1]` | The setting may not be asked to differentiate the game. No sheet argues for a place because it is unclaimed. |
| *"**Permanent multipliers only. Never content access.**"* (`03-META.md`) | `[brief: soft]` `[you accepted: R5 Q4]` | No part of this place may read as sealed, premium, or reachable by anything but clearing. |
| *"Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q3]` | No sheet may require content priority 1 does not fund; no sheet may be thin to save effort. |
| *"**8–14**, mobile-heavy"* · *"casual but **genre-literate**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` | Reading level and comprehension load on every world fact. |
| *"**Dry and sparse.** Humor lives only in relic flavour text. No system copy ... is funny. No relic name is a pun."* | `[brief: binding]` — **developer, in session 2026-07-30, in no sheet** | The register these sheets are written in. Relayed with its true provenance because no downstream agent can find it in the brief. Owned by register work *[currently: Theme & Narrative — Tone]*. |
| The genre's shared store sentence, *"the more you rebirth and upgrade ... unlock **new islands**"*, across four games; and *"Choosing an 'unoccupied' theme is a race that cannot be won by picking harder."* | `[research: research/landscape.md` — **the brief's fetch, not mine]** | An island-chain scale is the genre's own boilerplate. Sheet `02` inherits that as a cost against a binding decision to be *"a **restoration game**, not an incremental"* `[you chose: R4 Q2]`. |

**Scope gate, performed.** Priority 3 is *"real procedural generation · rebirth · offline accrual ·
codes · daily rewards · leaderboards · trading · seasons and events"* `[I assumed — the ordering]`,
with individual items of unequal strength (rebirth `[you chose: R2 Q2]`, the *"seasons"* reframe
refused by name; procgen `[you chose: R5 Q1]`; offline accrual binding by consequence).
**No sheet below specs a priority-3 item.** Sheet `05` states them as absences, which is the
opposite of specing them: the intended output is a place that cannot host them. Sheet `04` must keep
priority 2's *visitable restored ruins* possible without requiring it, and may not spec the visiting.
**No part of my subject is entirely priority 3.**

---

## What the brief did not give me

Eleven gaps, each routed. None filled here.

1. **What kind of built thing the ruin is.** The brief says *"ancient stone"*, *"ornamented, warm,
   aged, crafted"*, and nothing else. Not a temple, not a villa, not a waterworks, not a city — it
   never says. → sheet `01`. `[cid: decided]`. **This is the gap the contract owners already filled
   for themselves** (Terrace, Cistern, Vault, Spire), which is the strongest evidence it is a real
   gap and not latitude.
2. **Location beyond materials.** No landscape, no climate, no statement of whether anything exists
   past the ruin's edge. → sheet `01`. `[cid: decided]`.
3. **Era beyond the word *ancient*.** No date, no distance in time, no builder technology level, no
   statement of how long the overgrowth has had. → sheet `01`. `[cid: decided]`.
4. **Scale: singular prose against endless design.** *"reclaim a ruin"*, *"what the ruin actually
   is"* (singular) against *"Endless via shuffled authored chunks"* and priority 2's *"visitable
   restored **ruins**"* (plural). **A contradiction in the source, not latitude the brief intended.**
   → sheet `02`. `[cid: decided]`.
5. **Depth is stated in two geometries.** *"deeper areas"* (`03-META.md`) reads vertical; *"further
   in means denser overgrowth"* (`01-FOUNDATION.md`) reads horizontal. Nothing reconciles them, and
   Art, layout and the `areas` screen each need one answer. → sheet `02`. `[cid: decided]`.
6. **Why the place continues past the last thing worth finding.** `02-GAMEPLAY.md` sets 4 sets of 6
   and `02-the-collection.md` buries six per area across four depths; `03-META.md` says areas are
   endless and *"the collection is the only finishable thing"*. So the world goes on after depth 4
   with nothing left in it, and no sheet says why. → sheet `02`. `[cid: decided]`. Note the second
   half of the trap: the answer may not imply the world makes itself (imports procgen, binding) and
   may not promise content priority 1 does not fund.
7. **Whether anything here is more than ordinary.** `02-GAMEPLAY.md` says *"Completing a set grants
   a permanent bonus"* and no sheet anywhere explains how a place grants anything. The world's law is
   the precondition for that explanation existing at all. → sheet `03`. `[cid: decided]`.
   **Boundary:** what the bonuses *are* is set-content work *[currently: Gameplay — Meta & Content,
   wave 3]*; sheet `03` decides only whether the world permits a supernatural explanation and names
   the consequence for them either way.
8. **Time of day and weather: total silence.** No hour, no sky, no wind, no rain anywhere in the
   brief. Not excluded, not chosen, absent. → sheet `03`. `[cid: decided]`. **Carries a question I
   cannot route:** whether a fixed-or-cycling sky falls under the category's gate against *"any
   cyclical, seasonal, renewal ... framing"*. That gate is the category lead's inference from
   priority 3, not a line in the brief, and a diurnal cycle resets no progress and regrows nothing.
   Sheet `03` must state its argument either way. **Flagged upward to category verification.**
9. **How a player physically reaches a deeper area.** The brief says no gate is *needed*
   `[I assumed]`; it never says what is there instead. `04-PRESENTATION.md` lists an `areas` screen
   *"implied by ... moving between areas by depth"*, which presumes a travel or selection act no
   world rule supports. → sheet `04`. `[cid: decided]`.
10. **What a finished area becomes.** Priority 2 wants restored ruins visitable; the `OPEN.md §2`
    default wants finished areas *"collapsed to a completion flag"* to bound save size.
    **Unreconciled in the source.** → sheet `04`, which decides the world rule and not the
    persistence format. `[cid: decided]`.
11. **What exists here at all.** Nothing inventories the world's contents. Anything alive, standing
    water, sky, wind, roads, machinery, remains: all unmentioned. Silence, not exclusion. → sheet
    `05`. `[cid: decided]`.

**One near-gap that does not get a sheet.** *"Everyone occupies one world"* against *"own areas"* is
in the brief with no world rule attached. It gets no sheet because **answering sheet `02` answers
it**: whatever resolves one-ruin-or-many also settles whether many people working one place needs
any explanation. Sheet `02` must state that consequence explicitly. What a co-present stranger *is*
belongs to player-role work *[currently: Theme & Narrative — Identity, this wave]*; what they may
*do* to presence work *[currently: Gameplay — Social, wave 2]*; whether one shared world with
per-player private areas is buildable at the assumed server size of 12–20 to networking work
*[currently: Tech & Data]*. Sheet `02` writes the place's rule only and may not depend on a technical
answer.

**One relayed unresolved item, because sheet `05` sits next to it.** Whether relic rarity exists
separately from overgrowth rarity is unresolved in the source (`01-FOUNDATION.md` assumption 1,
*"Rarity ladder lives in the overgrowth"* `[I assumed]`, against *"hide rarer sets"* in
`03-META.md`). Sheet `05` lists **classes of matter present** and must not resolve it;
`OPEN.md §5` routes it to systems and set-content work (waves 2 and 3).

---

## Why 5 sheets

I own no contract keys, so the count is one sheet per genuine non-value decision and nothing else.
There are five. **Two exist because the source contradicts itself** and a writer has to pick: `02`
resolves one ruin or many, which way *deeper* points, and why the place cannot be exhausted (one
decision, not three — any answer to the first answers the other two, which is why the previous
`scale-and-unit` and `endlessness` sheets collapse into one); `04` resolves a restored area
surviving as a visitable place against a stated default to collapse it to a flag. **Two exist
because the brief is silent on something a different downstream owner needs in a different form:**
`01` is what the ruin actually is, which Art must dress and which the owners of `area` and
`collection` have already had to invent unsupported; `03` is the rules of the place, which
set-completion fiction and Art both depend on. **One is a roster:** `05`, the explicit presence and
absence list, which is a named half of my ownership (*"what exists here and what does not"*) and the
one artifact the other five leads and Art can read instead of re-deriving the priority-3 gate from
process notes. Four sheets from the previous plan are gone on purpose: dimensions and density belong
to `area`, co-presence is a one-line consequence of `02`, and location-plus-era is one act of
description rather than two sheets that would each have to reference the other. **Dependency:** `01`
before `02` before `04`; `03` is independent and can start day one; `05` closes last, and its absent
column can be drafted from binding decisions alone. Every sheet ends in 2–4 criteria checkable
without judgment — for a fiction sheet that means a term count, a stated absence, or an observable
state of the place, never a number that belongs to a contract key.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-ruin` | **What this place actually is:** what kind of built thing the ruin is, what landscape and climate hold it, whether anything exists past its edge, and how far back its building and its overgrowing sit. Must stay inside *"vines and moss on ancient stone"* and must not break *"green overgrowth on warm stone is naturally high-contrast"*. **May not** name an area, set, relic or tier; **may not** lay anything out or size anything; **must** state whether the register already on disk (a terrace, a cistern, a vault, a spire, and *"not an open landscape"*) is ratified or contradicted, and if contradicted, raise it as a consequence for the owner of `area` and `collection` rather than renaming. |
| 02 | `extent` | **One ruin or many**, what an *area* is a piece of, **which way depth points**, and why the place cannot be exhausted while still reading as *made by hands*. Must respect *"Areas, not zones"* and *"Endless via shuffled authored chunks, not generation"* `[both binding]`, must weigh an island-chain answer against the genre's own *"unlock new islands"* boilerplate before taking it, must say why the place continues past the fourth set, and must state the consequence that makes *"everyone occupies one world"* and *"own areas"* both unremarkable. **May not** decide area count, size, density, arrangement, or how many authored layouts exist. |
| 03 | `physical-law` | **The rules of the place:** whether anything here changes without the player's hand (the fixed-or-cycling hour, sky and weather is the concrete case), and whether anything more than ordinary exists here, stated as a budget a later wave can hold to. Must state its own argument on whether an ambient cycle trips the category's anti-cyclical gate. Must name the consequence for a fictional explanation of set-completion bonuses without deciding what they are. **May not** import an agency with intent (that is the tension the handoff forbids), and **may not** specify lighting values, effects, or ambience assets. |
| 04 | `permanence-and-passage` | **What clearing leaves behind, and how you go further:** what a cleared area *is* afterwards, holding priority 2's *visitable restored ruins* against `OPEN.md §2`'s collapse-to-a-completion-flag default; and how the place lets a player go deeper with no gate, lock, key or threshold. **May not** decide arrangement, area order, travel UI, or persistence format; **may not** make visiting a requirement; **must** be written so that a later refusal on save-size grounds is a one-line change rather than a rewrite. |
| 05 | `inventory` | **The two-column roster: what exists in this place and what does not.** The present column decides the questions no other sheet answers — whether anything is alive here besides the players, standing water, sky, wind, roads, remains, machinery — as **classes** only. The absent column states every priority-3 exclusion, plus the tension, hazard, threat and deadline absences, as facts about the world rather than process rules, marking which are inherited from binding decisions and which this sheet decides. **May not** name an asset, an area, a set, a relic, a tier, or a count; **may not** resolve overgrowth-versus-relic rarity; **may not** re-decide anything `01`–`04` decided, only cite it. |

---

## Verification note

**`01 · the-ruin` is the sheet most likely to be contradicted, and the contradicting text is already
on disk.** `cid/gameplay/meta/01-the-area.md` and `02-the-collection.md` have named a terrace, a
cistern, a vault and a spire and handed Art *"a 120-stud terrace to dress, not an open landscape"*,
inside `manifest` blocks that a build reads. If `01` decides a place those names do not belong to,
the collision is not theoretical and not distant — it is a revision request against two sheets that
already supply contract keys. `01` should read them before it decides and should say which way it
went.

**Second: `04 · permanence-and-passage`.** Three owners are already pulling on it before it exists:
arrangement and area order *[Gameplay — Meta & Content]*, the `areas` screen and any travel
affordance *[UI/UX]*, and the save-size call that `OPEN.md §2` already defaults to collapsing
finished areas to a flag *[Tech & Data]*. Any rule that keeps a restored area standing raises a cost
a later owner has a stated default to refuse; any rule that discards it contradicts priority 2's
plural. It will get a revision request; it should be cheap to revise.

**Third: `03 · physical-law`**, contradicted by set-completion-bonus work if it forbids a
supernatural explanation those bonuses turn out to need, or by relic and effect work if it permits
one nobody wants to render.

**Lowest risk: `05 · inventory`**, because most of its absent column is copied from binding
decisions. Its failure mode is the opposite one: being too short to be worth reading.

**Category-level check this index expects to be held to:** every term these five sheets coin must
reach the canonical list held by naming-rules work *[currently: Theme & Narrative — Vocabulary]*,
spelled one way. Note the direction of that flow has changed from the previous plan: these sheets
**do** name what they decide, they simply may not name anything that travels inside a contract key
somebody else owns.

---

## Research owed

**`must_verify`: none assigned to this domain.** I fetched nothing, and **no claim in this index is
presented as sourced.** The one research row above is marked as the brief's own fetch
(`research/landscape.md`, which cites `roblox.com` game pages), not mine.

Two adjacent absences, recorded so nobody later mistakes them for checks:

- **The setting has never been occupancy-checked.** `research/landscape.md` checked the *noun*, and
  its own *"Not verified"* section admits *"Whether the untouched themes (rust, mould, cobweb,
  vines, clouds) are actually free or simply poorly indexed. Four searches surfaced nothing; that is
  weak evidence."* Fantasy-level occupancy research is assigned this same wave to fantasy work, with
  *Treasure Hunt Simulator* named as the nearest target. **If that search returns a shipping game
  whose setting resembles what `01` or `02` decide, both inherit the finding.** `[unverified]` — the
  fetch that would settle it is a Roblox experience search for the restoration-of-a-ruin setting,
  which is that domain's assigned work and not a duplicate of mine.
- **Nothing about the reference game informs this domain.** `research/grass-incremental.md` was read
  in full; its only world-structure content is *"**Zones (islands)** unlocked at rebirth
  milestones"*, which two binding decisions here have already removed. Recorded so nobody re-reads
  it hoping for a setting.
