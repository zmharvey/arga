# UI/UX — category brief

**Wave:** 5. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `04-PRESENTATION.md` — UI/UX is a
layer-4 subject, so layers 1–3 are constraints you inherit and not decisions you get to make.

This is an **assignment document.** It contains no UI/UX decisions. Every surface listed below
is cited to the approved key or shipped file that put it there; nothing here is invented, and
the rows marked *candidate* are named so that a lead rules on them rather than discovers them.

Also read before you write: `cid/_digest.md` (every wave 1–4 decision and its boundary),
`cid/_contract.md` (25 keys and their owners), `cid/_state.md` (rulings R-1..R-4, escalations,
build-stage notes), `architect/sheets/06-representation.md`, and — this is not optional —
`ui-forge/src/compose/index.mjs`, `ui-forge/src/compose/patterns/hud-overlay.mjs`,
`ui-forge/src/compose/patterns/modal-grid.mjs` and `ui-forge/briefs/hud.brief.json`.

---

## The pattern registry is the capability contract

`validateBrief` rejects any brief naming a pattern or a parameter the compiler cannot produce
(`ui-forge/src/compose/index.mjs:11-13, 44-76`). **Two patterns exist**, not one — the entry in
`CLAUDE.md`'s known-gap list saying otherwise is stale and was already corrected by the wave-2
Mechanics lead. Their declared parameter space is the whole of what you may assign:

| pattern | variant axes | ornament | slots |
|---|---|---|---|
| `modal-grid` | `columns` 1–4 · `artPlacement` above/beside · `cardAspect` square/portrait/wide · `headerStyle` plain/banner/stack · `density` comfortable/compact · **`ctaPlacement` footer/per-item** | `cardBadge` none/ribbon/pill · `panelTrim` none/top-accent | `panelTop`, `panelBottom` |
| `hud-overlay` | `layout` corners/top-bar/bottom-bar · `readoutStyle` plain/pill/framed · `bar` none/thin/chunky · `density` comfortable/compact · `anchor` edge/inset | `readoutTrim` none/accent-edge · `barCap` flat/round | `hudTop`, `hudBottom` |

Content contracts differ and are enforced per pattern: `modal-grid` requires `content.title` and
every item to carry `name`, `price` and `art`; `hud-overlay` requires a non-empty
`content.readouts`, optional `content.progress` with a 0–1 value, and optional `content.actions`
whose members need only a `name`. **An assignment that names anything outside these tables is
not producible and will be rejected by the compiler, not by a reviewer.**

---

## What the brief binds for this whole category

| constraint | tag | consequence for UI/UX |
|---|---|---|
| *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | Every surface is read by an 8-year-old on a phone in a 10–20 minute session. Reading level, touch target and one-handed reach are floors, not preferences. |
| *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` | `[I assumed — the split]` → `[brief: soft]` | The split is arguable and **uncorroborated by anything fetched** (`cid/_state.md`, research owed). The *band* is binding; the ratio is not. |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | No surface exists in order to give a lead something to do. A domain that concludes "nothing" is compliant; a domain that invents a screen to look busy is not. |
| *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."* `02-GAMEPLAY.md` | `[you accepted: step 6 Q3]` → `[brief: soft]` | **Already overruled, once, by ruling R-1** (`cid/_state.md`), contained to one input class, two verbs, four controls. `input.gameBoundInputClasses` is `["pressable"]`. You may not widen that overrule; you may not re-litigate it either. |
| *"**There is no failure state.** … **Zero tension is deliberate.**"* `02-GAMEPLAY.md` | `[you accepted: step 6 Q2]` → `[brief: soft]` | No timer, no countdown, no warning state, no red, no failure modal, no "are you sure". `theme/tone/04` `D12` already removes every standard way of signalling *you cannot do that*. **Do not invent tension to fill the gap** (`HANDOFF.md`, six-things #4). |
| *"**Clear → reveal inside the first ten seconds.** … No text, no tutorial."* `02-GAMEPLAY.md` | `[you accepted: R6 Q3]` → `[brief: soft]` | Read through the approved gloss in `gameplay/onboarding/03`: *"a permanent ban on instruction, not a ten-second ban on strings — labels, counts, costs and names are legal from the first frame, imperatives never are."* No callout, no coach mark, no arrow, no first-run-only string (`T5`), no unrequested panel (`T6`). |
| *"**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.**"* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` **in the brief** | Relayed at its true tag. Note that `architect/sheets/06-representation.md` already treats it as `[brief: binding]` and a shipped build depends on that reading, so overruling it now invalidates work downstream. The UI-side consequence is general: **no state distinction may be carried by colour alone** — `input.pressable.affordabilityByColourAlone` is `false`. |
| *"**Permanent multipliers only. Never content access.** … **Forbidden:** any paid area, relic, or set."* `03-META.md` | `[you accepted: R5 Q4]` → `[brief: soft]` | No surface may show a locked slot with a price on it, a paywalled set, or a purchase that fills the index. |
| *"Shared server, parallel progression, own areas, no mechanical interaction."* `02-GAMEPLAY.md` | `[you accepted: R6 Q2]` → `[brief: soft]` | Via `social/03` `X6`/`X7`: `leaderstats` is unavailable, and **no layout may place one player's number next to another's.** |
| *"Deriving the full screen set is UI's job."* + the four-row screen table `04-PRESENTATION.md` | **untagged** — treat as `[brief: soft]`, and see gap G3 | The table is a hint, not an inventory, and one of its four rows (`shop`) was deleted by ruling R-4. |
| *"**A persistent HUD does not fit**, and this game needs one… UI should know it is proposing something the build stage cannot yet make."* `04-PRESENTATION.md` | untagged → `[brief: soft]` | **This premise is now false and a ruling already turned on it.** `hud-overlay` exists and is a persistent HUD; R-1 rests on exactly that. Do not repeat the claim. |
| `ui-forge` vibe key `fantasy-ornate` `04-PRESENTATION.md` | `[you accepted: R6 Q2 → R5 Q2]` → `[brief: soft]` | **Not yours.** Panel art, icons, colour and font are Art & Visuals — UI Art. You own structure, behaviour, hierarchy and on-screen copy. |

### Approved keys that bind you before you start

Read these as settled facts, not as inputs to re-decide. Each is a merged or proposed contract
key with one owner.

| key | owner | what it forces on you |
|---|---|---|
| `vocabulary` | `theme/vocabulary/02` | `casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`, `allowedPattern: "^[A-Za-z0-9 ,.'%%/-]+$"`, and eight banned words: `relic`, `relics`, `tier`, `artifact`, `antique`, `rebirth`, `loot`, `treasure`. **Em dash and middot are both illegal and both shipped once.** Rendered case, typography and number formatting are explicitly yours (`theme/tone/01`, `theme/vocabulary/01`). |
| `input` | `gameplay/mechanics/02` | Five verbs, no sixth. `gameDrawnPressables: 4` — three `purchase`, one `index`. `travelRequiredToPurchase: "none"`. `minTouchTargetRule: "notSmallerThanPlatformJumpButton"`. `mayOverlapPlatformControlRegions: false`. `gamepadSelectable: true`. `debounceSeconds: 0.35`. `rejectionCueOnFailedPrecondition: "none"`. `keyboardAcceleratorAllowed: true`, `keyboardAcceleratorRequired: false`. `indexScreenSuspendsMovement`. |
| `response` | `gameplay/mechanics/05` | Five beats. The `notice` channel is owned by the two completions and **may never carry a reveal**. Nothing on it may be dismissible-only, focusable, or block click-through — *"a notice that swallows a tap would swallow a purchase"*. No beat takes control from the player. |
| `firstSession` | `gameplay/onboarding/02`, `/04` | Three surfaces at join (currency readout, collection count at `0` with no denominator, area progress bar); three withheld (`/ 24` denominator, collection panel, each upgrade row). Every lift is **latched**, `suppressionForbidden` bans `reSuppression` and `reflowOnLift`, and `S12` requires the full three-row extent be reserved from frame one. **A lift is silent and still.** |
| `products` | `gameplay/monetization/01–03` | One pass, `Span`. **There is no in-game store** (R-4). `F19` forbids naming, showing or pricing a product on any in-game surface. `F20` forbids persisting entitlement. |
| `representation` | `architect/06` | `hud` is a `ScreenGui` created by `client-main`, its readouts built by `ui-forge`. `pressable` is four `TextButton`s named `Pressable_BUY1/2/3` and `Pressable_INDEX`, created by `pressables`. `index-surface` is a `Frame` created by `index-screen`. **Only `pressables` and `index-screen` may create a `GuiObject`; `HudBinding` contains no `Instance.new` at all.** |
| `rarity` | `gameplay/systems/03` | The four set headings on the collection surface are the **only** place the find-set ladder is legible anywhere. `rarity.forbidden` bans rarity colour, frame, glow, border, sparkle and badge on a Find. |
| `collection` | `gameplay/meta/02` (rev. R-2) | 24 Finds in 4 sets of 6; empty slots visible and unmarked; a group of six must be distinguishable with one slot filled and five empty (`onboarding/03` rank 6). |
| `economy` | `gameplay/systems/04` | Currency stays visible and uncapped. **A completion notice cannot say `+N`.** |
| `endgame` | `gameplay/meta/07` | Past area 8 the headline figure becomes the finished-parts count and currency stays on screen without being it. **No end screen, no congratulation, no completion percentage.** |
| `setBonus` | `gameplay/meta/03` | *"UI/UX has no bonus screen to build on my authority. No bonus list, no bonus tooltip, no per-set reward preview."* |
| `discovery` | `gameplay/systems/05` | No reachable duplicate exists, so: **no "already found" toast, no slot that fills twice, no consolation cue.** |
| `upgrades` | `gameplay/balance/01` | Three purchase rows, each showing level, cost and affordability — *"and affordability may not be signalled by colour alone."* |
| tone `B1`–`B5`, `D6`–`D15` | `theme/tone/03`, `/04` | **No notice for an upgrade purchase (`B4`) or a patch clear (`B5`).** A Find's identity may not be rendered before `B1` fires. `D11` in particular constrains the collection panel. |

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events

`[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1]` → `[brief: soft]` on
its provenance, and **hard as a gate**: the category verification `checks` in
`docs/cid-workflow.json` fail any sheet that *"reserves space for, stubs, describes or
specifies a priority-2 or priority-3 item."*

**No domain may name, imply, or build fiction around any of it.** Concretely, and this is the
list that matters because these are the surfaces a UI agent reaches for by reflex: no rebirth
button or prestige counter, no daily-reward popup or login-streak strip, no code-entry field,
no leaderboard panel or rank badge, no trade window or gifting flow, no season pass, no event
banner or timed-offer ribbon, no "come back tomorrow" copy, and no reserved slot, tab, or empty
region held open for any of them. `rebirth` is additionally in `vocabulary.bannedWords`, so the
word itself fails the merge.

**Priority 2** (*richer authored chunk variety · a duplicate-handling refinement · visitable
restored ruins*) is likewise not yours to reserve space for.

**Naming one of these in order to forbid it is compliant.** Saying "there is no shop tab" in a
navigation graph is information; leaving a gap where one would go is not.

---

## The full interface surface area

Six leads partition **this** list. Nothing outside it exists without a lead ruling that it
should and saying why. Every row cites what puts it there.

**Persistent, drawn over live play (the HUD `ScreenGui`, one per client):**

1. **Collection count readout** — `0 / 24`, top-left cluster. `firstSession` (present at join, denominator withheld); `hud.brief.json`.
2. **Currency readout** — Shards, top-right cluster. `firstSession` (present at join); `economy` (visible, uncapped); `hud.brief.json`.
3. **Area progress bar + its label** — bottom-left cluster, `bar: "chunky"`. `firstSession` (present at join); `04-PRESENTATION.md`'s *"area-completion progress must be visible while moving"*; `hud.brief.json`.
4. **Three upgrade readouts** — Value / Reach / Pace, each a held level and a next cost, bottom-right cluster. `upgrades`; `hud.brief.json`; written by `HudBinding.luau`.
5. **Three purchase pressables** — `Pressable_BUY1/2/3`. `input` (3 × role `purchase`); `representation`; drawn by `Pressables.luau`.
6. **One index pressable** — `Pressable_INDEX`, top-left. `input` (1 × role `index`); `representation`.
7. **The endgame headline substitution** — past area 8 the finished-parts count becomes the headline figure and currency stays on screen without being it. `endgame`; `theme/fantasy/02`. *Substitution inside surfaces 1–2, not a new surface.*

**Opened surfaces:**

8. **The collection index** — `IndexSurface`, a `Frame` created hidden by `index-screen`; four labelled set groups × six slots; empty slots visible and unmarked; set headings are the only legible find-set rarity in the game. `representation`; `collection`; `rarity`; `firstSession` (absent at join, latched to first reveal). This is *"the differentiator's home"* (`04-PRESENTATION.md`).

**Transient:**

9. **Find reveal** — `B1`, the loudest moment in the game, and it owns the **world** channel exclusively. `response`; `theme/tone/03`. *Whether it has any on-screen component at all is a Feedback UI ruling.*
10. **Area completion notice** — `B3`, notice channel. `response`.
11. **Set completion notice** — `B2`, notice channel, one cue for all four sets, may not vary by axis. `response`; `meta/03`.
12. **Row-lift and denominator-lift moments** — three upgrade rows, the `/ 24` denominator, the index panel. **Silent and still** (`firstSession` `S6`/`S7`). Named so nobody animates them.

**States, not surfaces:**

13. **Join / pre-first-snapshot state** — the HUD exists before any snapshot lands; `client-main` fires `RequestState` at join and *"deleting it blanks the HUD until the first clear"* (`mechanics/02`).
14. **Error / system copy** — **currently owned by nobody.** `theme/tone/01`: *"Error and system copy (unowned; nearest holder is UI/UX). Somebody must own the surface or `P1`–`P9` reaches it only as prose."* See gap G2.

**Not ours, listed so no lead treats them as free space:**

15. The platform's touch thumbstick and jump button — a **keepout region**, `input.mayOverlapPlatformControlRegions: false`. Measured, not assumed (`Pressables.luau:229-255`).
16. The Roblox top bar and device safe area — `hud-overlay`'s `anchor: "inset"` exists for exactly this.
17. Nameplates — `theme/identity/03`, inherited and not reopened; `NameDisplayDistance` defaults to 100 against a realised separation of 122–160.
18. The held tool — a world object (`tool`, `representation`), not a HUD element.
19. The Roblox experience page and its game-pass purchase prompt — the only place `Span` is ever offered. Discovery & Marketing, wave 7.

**Candidates the brief named and the approved keys may have deleted — a lead must rule, not skip:**

20. `areas` (brief screen table, priority 2). `meta/04` makes the next area *"enterable at the instant one completes, with no threshold, no cooldown and no travel"*, so there may be nothing to navigate. → **Navigation.**
21. `shop` (brief screen table, priority 2). Deleted by R-4 and forbidden by `products.F19`. → **Store UI.**
22. A per-Find flavour-text surface. `theme/tone/02` puts humor at exactly one contract path, `collection.sets[].relics[].flavour`, and `theme/identity/02` says *"whether a per-relic flavour-text field exists"* is screen-inventory work. → **Screens.**

---

## Domain assignments

### 01 · Screens Lead → `cid/ui-ux/screens/_lead.md`

**Key to propose:** `screens` — the screen inventory, and per screen: its element hierarchy, its
empty / loading / error states, and every on-screen string it holds.

**Latitude: narrow on inventory, wide inside the one screen you have.** Surface 8 is the only
full screen in this game, and `04-PRESENTATION.md` calls it *"the differentiator's home"*. The
brief's other three rows are handled elsewhere (20, 21) or are HUD (2, 4).

Binding on you specifically:

- `representation`: `index-surface` is *"a `Frame` inside the HUD `ScreenGui`, created with `Visible` false"* by `index-screen`, holding *"four labelled groups, one per `collection.sets` entry, each holding six slots in the declared order of that set's names. A held name reads as its name; an unfound name reads as an empty slot. **NOTHING ELSE:** no padlock, no greyed row, no question-mark placeholder, no unknown-denominator form … and no rarity colour, frame, glow, border, sparkle or badge."*
- `gameplay/onboarding/03` rank 6: *"a group of six must be distinguishable with exactly one slot filled and five empty. That is structure, not layout; empty slots stay visible and stay unmarked."*
- `rarity`: the four set headings are the only place the second rarity ladder is legible anywhere in the game.
- `theme/tone/04` `D11` constrains this panel by name; `D6`, `D7`, `D8`, `D10`, `D13`, `D15` also land on you.
- `theme/identity/02`, verbatim: *"**Identity requires no surface from you.** … Do not build a lore, profile, journal or role surface on Theme's behalf."*
- `meta/03`: no bonus list, no bonus tooltip, no per-set reward preview.
- `endgame`: no end screen, no congratulation, no completion percentage.
- `vocabulary`: every string you write is title case, ≤ 14 characters, matches `allowedPattern`, and avoids the eight banned words. `theme/vocabulary/04` makes each of them a **renderable coinage with no contract path**, so each needs a ` ```coinage ` block with `requestsPath` and `surface` — *"that list is not a reprimand, it is the bill you are entitled to hand the seam."*

**Genuinely open to you:** the panel's internal hierarchy and grouping order; what an empty slot
*is*, structurally; loading and error states, which no key states and which the verification
`checks` require of every screen; whether the flavour-text field exists at all (candidate 22);
rendered typography, wrap behaviour and whether a label class displays uppercase
(`theme/vocabulary/01` hands you rendered case explicitly); and **the global on-screen copy
budget**, which `theme/vocabulary/01` records as *"unset anywhere in the brief"* and assigns to
screen work.

**Producibility:** `modal-grid` is the pattern `architect/06` already names for this surface.
Four groups of six against `columns: [1,2,3,4]` is inside the parameter space; `content.items`
requiring `name`, `price` **and** `art` on every item is not obviously satisfiable by an
unfound slot, and that is a real question to answer against the compiler rather than around it.

---

### 02 · HUD Lead → `cid/ui-ux/hud/_lead.md`

**Key to propose:** `composition` — the persistent surface's element inventory **and the groups
those elements form**: for each group, its members, its cluster, its order within the cluster,
and the rule that a member may not be positioned independently of its group.

**This is the highest-value assignment in wave 5.** See the ruling below.

**Latitude: wide, because nothing owns this today.** Surfaces 1–7 and 12 are yours. The element
list already exists in `ui-forge/briefs/hud.brief.json`, which is a file nobody owns and no key
carries; part of your job is to make that file a derivation of your key rather than its source.

Binding on you specifically:

- `firstSession` / `onboarding/04`: three present at join, three withheld, every lift latched, `suppressionForbidden` bans `reflowOnLift` **and** `reSuppression`, and `S12` requires *"the full three-row extent from frame one so a lift never moves a row already being read."*
- `economy`: currency visible and uncapped. `endgame`: the headline substitution past area 8.
- `input`: four pressables, no fifth; no travel to reach one; `affordabilityByColourAlone: false`.
- `social/03`: `leaderstats` is unavailable and *"a currency readout must be built as a client-side surface fed by the player's own state payload."*
- `representation`: `HudBinding` may create no `Instance` except a `Tween`; `pressables` creates the four buttons; **the day `hud-overlay` grows a pressable readout, `pressables.bind` resolves four node names instead of creating four Instances and nothing else changes.**
- The live label defect: `hud.brief.json` ships `"EAST TERRACE - 0% CLEAR"` (23 characters) and the all-caps forms `FINDS`, `SHARDS`, `VALUE`, `REACH`, `PACE`, against `vocabulary.maxLabelChars: 14` and `casing: "title"`. Whether the bar label is one label or composed furniture is yours; that it currently violates two vocabulary fields is not in doubt.

**Genuinely open to you:** cluster assignment and ordering; what a group is; the number
formatting and separators (`theme/tone/01` puts these outside `P4` as *"furniture composed at
render time, not copy"*); and the two `ui-forge` findings below, which are yours to judge and
report, not to design around.

**Producibility, and the two `hud-overlay` findings you must rule on:**

1. **`hud-overlay` has an `actions` array producing 52×52 `ImageButton`s with hover/pressed/disabled states** (`hud-overlay.mjs:178-198`). So the pattern is not without a pressable. What it lacks is a **pressable *readout*** — anything that is a label, a value and a control in one node — and, in `layout: "corners"`, actions are hard-coded into the `bottomRight` cluster regardless of where their readouts sit (`hud-overlay.mjs:289-291`). Judge whether that is a capability gap or an unspecified default, and say which. `mechanics/03` and `architect/06` both call it *"a default to change, not a capability to add"*; note that `modal-grid` already ships `ctaPlacement: "per-item"`, which is the same composition solved in the other pattern.
2. **`hud-overlay` cannot vary the presence of an individual readout by state** — raised by `gameplay/onboarding/04` as *"a **second** required change alongside the `PRESSABLE` readout … If presence cannot be conditional, this list is a requirement on the pattern rather than a shipped behaviour, and that is a blocker to raise rather than a spec to reinterpret."* Confirm against the source and route it.

---

### 03 · Navigation Lead → `cid/ui-ux/navigation/_lead.md`

**Key to propose:** `navigation` — the screen graph: every node, its entry point, its exit, what
may be open at once, and what the player's body does while something is open.

**Latitude: thin surface, real rules.** One openable surface and one control that opens it is a
two-node graph. The rules around it are not trivial and nothing states them today.

Binding on you specifically:

- `input`: the `openIndex` verb has `precondition: "none"` and is `adjudicatedBy: "client"`; `indexScreenSuspendsMovement` is true. `representation` adds: *"Opening it suspends movement and closing it restores it; that is caused by the player's own press, which is why it does not touch `response.controlEverAffected` being false."*
- `response`: nothing on the notice channel may be focusable or block click-through — which is a concurrency rule as much as a feedback rule, because *"a notice that swallows a tap would swallow a purchase."*
- `firstSession`: the index pressable and the panel are *"absent together and lift together"*, and `onboarding/04` states plainly that **which surface offers the way in is not Onboarding's** — it is yours.
- `core-loop/01`: buying must be *"reachable from anywhere in the area with no travel and no area exit"*, which forbids a navigation design where a purchase sits behind an opened surface.
- `meta/04`: the next area is *"enterable at the instant one completes, with no threshold, no cooldown and no travel worth measuring"* — so candidate 20 (`areas`) very likely resolves to nothing. **Rule on it; do not skip it.**

**Genuinely open to you:** back behaviour and what "back" means on touch, mouse and gamepad
(there is no keyboard-only path to anything, per `input`); whether the index can be open while a
purchase press lands, and what happens if it is; whether the index pressable toggles or a close
control exists; gamepad focus entry and exit for a `SelectionGroup` that spans a HUD and a panel.

---

### 04 · Store UI Lead → `cid/ui-ux/store/_lead.md`

**Key to propose:** `offerSurface` — which in-game surfaces may present, name, price, or trigger
a purchase. **The expected value is an empty set plus a stated platform path, and that is an
output, not an absence.** A domain that runs and concludes "nothing" is information; a silently
skipped domain is not.

**Latitude: none on whether an in-game store exists; wide on stating the consequences.**

Binding on you specifically:

- **Ruling R-4 removed the in-game store** (`cid/_state.md`). `gameplay/monetization/01`: *"There is no in-game store."*
- `products.F19` forbids naming, showing or pricing a product on any in-game surface. `representation` restates it on both the pressable and index-surface rows: *"NO PRODUCT IS NAMED, SHOWN OR PRICED HERE — `products.F19`."*
- `03-META.md` *"**Forbidden:** any paid area, relic, or set"* `[brief: soft]` — no locked slot with a price, no paywalled set heading.
- `monetization/02` `F11` bans manufactured scarcity, so no countdown, no "limited", no offer timer.
- `gameplay/monetization/02` names your own boundary: *"Whether a purchase surface is ever built and what it would look like — nobody, under R-4; reopening it is a revision against sheet `01` and against `mechanics/02`."*

**What is genuinely yours:** three things, all real.

1. **State the offer path that does exist.** `Span` is sold on the Roblox experience page. Whether any in-game *trigger* is permitted (a `PromptGamePassPurchase` call with no surface) is unresolved and is exactly the kind of question `F19` does and does not answer.
2. **The live defect you inherit** — `cid/_state.md` build note 4: *"A mid-session pass purchase does not apply until rejoin. `entitlements` resolves ownership once at join and `F20` forbids persisting it… R-4 removed the in-game store, and `F19` forbids every surface that could tell the player to rejoin."* A player can buy a thing and see nothing happen, and the one surface that would explain it is forbidden. Name it; propose the smallest thing that would close it; do not build it on your own authority.
3. **Correct the brief's screen table.** `04-PRESENTATION.md` lists `shop` at priority 2 implied by *"the multiplier SKUs"*. It is deleted. Say so, so verification does not read it as a gap.

---

### 05 · Feedback UI Lead → `cid/ui-ux/feedback/_lead.md`

**Key to propose:** `notices` — the notice channel: which beats produce an on-screen notice,
what each holds, its dwell, its queueing and stacking rule, and its interaction properties.

**Latitude: narrow, and unusually well-specified upstream.** Three of the five beats are already
forbidden a notice. Surfaces 9–12 are yours.

Binding on you specifically:

- `response`, verbatim: *"the `notice` channel is owned by the two completions and may never carry a reveal. Nothing on that channel may be dismissible-only, focusable, or block a click-through, because `R5` and `R6` forbid a beat needing a press, and because a notice that swallows a tap would swallow a purchase."*
- `theme/tone/03`: *"Feedback UI may not show a notice for `B4` or `B5`, and may not render a Find's identity before `B1` fires."* Ranking is `B1 > B2 > B3 > B4 > B5` with no ties and **nothing rises as a completion approaches.**
- `core-loop/02`: on the 4.3% of laps where the final patch is a Find patch, three above-tick payoffs fire on one clear, ordered reveal → set completion → area completion with ≥ 0.35 s between onsets, and **none may require the player to stop moving.**
- `economy`: a completion notice **cannot say `+N`**.
- `meta/03`: one set-completion cue serves all four sets; *"nothing may signal which axis was granted by making the cue louder, longer or different."*
- `discovery`: no duplicate state exists — no "already found" toast, no slot that fills twice, no consolation cue.
- `firstSession` `S6`/`S7`: a lift is silent and still. `onboarding/03` `T6` forbids any unrequested panel, *"which includes a first-Find celebration modal."*
- `theme/tone/04` `D12`: there is no way to signal "you cannot do that", and `input.pressable.rejectionCueOnFailedPrecondition` is `"none"` — an unaffordable press does nothing, shows nothing, plays nothing.
- Your `does_not_own`: the sound (Audio — UI Sound) and the particle (Art — VFX).

**Genuinely open to you:** whether the reveal has *any* on-screen component at all given it owns
the world channel exclusively; what a notice structurally is, given it may not be a modal and
may not block a tap; the queueing rule when two notices coincide; dwell duration inside
`response`'s budgets; and **whether an error surface exists**, which is gap G2 and lands nearest
to you.

---

### 06 · Platform & Input Lead → `cid/ui-ux/platform/_lead.md`

**Key to propose:** `viewport` — per device class: scaling rules, safe-area and inset behaviour,
the touch-target floor and how it is derived, gamepad focus order, and the platform-control
keepout regions.

**Latitude: wide, and this domain closes the project's largest stated gap.**

Binding on you specifically:

- `mechanics/03`, the whole of device parity: *"every pressable the game draws is tappable, clickable and gamepad-selectable"*, and *"the two regions you may not touch are the platform's movement and jump controls, and the touch target you draw is measured against the platform's own jump button rather than against a pixel count I would have invented."*
- `input`: `minTouchTargetRule: "notSmallerThanPlatformJumpButton"` — **a measurement, not a number**; `mayOverlapPlatformControlRegions: false`; `gamepadSelectable: true`; `keyboardAcceleratorAllowed: true, keyboardAcceleratorRequired: false` (so `1`/`2`/`3` may sit beside a button and may never be the only path to one).
- `00-CORE.md` audience `[brief: binding]`; the 70/25/5 split `[brief: soft]` and uncorroborated.
- `hud-overlay`'s own `anchor: ["edge", "inset"]` and `ANCHOR_INSET` (`base: 8`, `mobile: 28`) are the pattern's entire safe-area vocabulary. Anything beyond it is a finding.
- Your `does_not_own`: gameplay control mapping (Gameplay — Mechanics). The verb list is closed and is not yours to extend.

**Live values you inherit as findings, not as decisions** — `Pressables.luau` carries four
literals each marked `[STOP: no value in the contract]`: `MIN_TOUCH_TARGET_PX = 96`,
`BUTTON_WIDTH_SCALE = 0.16`, `BUTTON_HEIGHT_PX = 64`, and the touch-probe interval. **Each is a
gap in the contract that your key should close.** The module says so itself.

**Genuinely open to you:** the scaling rule across phone / tablet / desktop / console; gamepad
focus order across four pressables and one panel; whether the device split needs corroborating
before anything rests on it; and how the touch-target floor is expressed as data when the rule
names a measurement rather than a figure.

---

## The composition gap — my ruling on where it is owned

**It is the HUD Lead's, and it needs a contract key.**

The evidence, restated only as far as needed to place it: `pressables` draws the three buy
buttons, `hud-binding` draws the three upgrade readouts, both are correct, neither is
duplicated, and the player saw six things where three belong. `representation.pressable` asks
for buttons *"inside the HUD's bottom-right cluster, aligned with the upgrade readouts
`hud-binding` writes"*; `Pressables.luau:511` says its column should *"read in the same order as
the upgrade readouts in the bottom-right cluster"*. **Both halves expected adjacency and neither
could express it**, so `Pressables.luau` ended up measuring another module's rendered output at
runtime (`measureClusterWidthScale`) and its own comment names the cause exactly:

> *"The deeper gap is real and stays recorded: **NO CONTRACT KEY OWNS THE HUD'S CLUSTER
> GEOMETRY.** `ui-ux/hud` has not run. Until it does, this module is measuring another module's
> output at runtime, which is a derivation and not a decision."*

Why HUD and not another domain: every element in the collision is a persistent element, drawn
over live play, in one `ScreenGui`. It is not a screen (Screens owns composition *inside* an
opened surface); it is not a navigation edge; it is not a device difference — the same defect
appears identically on all three device classes. Splitting it would recreate the failure, since
the whole defect is that two owners each held one half.

The boundary, so two leads cannot both write it: **`composition` covers the persistent surface
only.** Composition inside the index panel belongs to `screens`. If Feedback UI needs a notice
to sit relative to a HUD group, it states the requirement and HUD carries it as data — the same
direction `social/01` uses for `maxCoPresenceSeparationStuds`, and for the same reason.

What the key has to be able to say, at minimum, for a builder to get one row instead of two:
that a named readout and a named pressable are **one group**; which cluster the group occupies;
the group's order within that cluster; and that a member's position is derived from its group
and never set independently. Whether the group is realised as one `hud-overlay` node or as two
adjacent nodes is producibility, and belongs in the same sheet as the `hud-overlay` finding
above.

---

## Domains judged thin for this game, and why that is stated rather than silent

**None is absent. All six run and all six produce a key.**

- **Store UI — thin by ruling, and the thinness is the finding.** R-4 removed the in-game store and `products.F19` forbids every in-game surface that could name, show or price a product. Its `owns` list from the graph (*shop layout · product card anatomy · price display · confirmation and receipt flow · offer placement and timing*) is empty of realisable items **inside the game**. It runs anyway, because "no in-game purchase surface exists, here is the path that does, and here is the defect that creates" is data a build can read, and a skipped domain is not. Verification should read an empty `offerSurface` as a deliberate conclusion, not a gap.
- **Navigation — thin surface, non-trivial rules.** One openable surface, one control, no hub, no tabs, no back stack. `meta/04` very likely deletes the brief's `areas` screen outright. What survives is real: concurrency, movement suspension, gamepad focus handoff, and back behaviour on three device classes.
- **Screens — one screen.** The collection index, and nothing else. Three of the brief's four table rows resolve elsewhere. This is the smallest screen inventory this pipeline has produced and it is correct: `00-CORE.md` binds the project to *"the smallest game that still gives every creative area real work."*
- **Feedback UI — two of five beats.** `theme/tone/03` forbids a notice for `B4` and `B5`; `response` forbids the reveal on the notice channel. So the notice channel carries exactly two events, both completions, both non-blocking. The domain is thin because upstream already spent its budget, not because nobody looked.
- **HUD and Platform & Input are not thin.** They carry the two open findings this wave exists to close.

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

| # | gap | who decides |
|---|---|---|
| G1 | **No contract key owns the HUD's cluster geometry.** Named verbatim in `Pressables.luau`; the direct cause of the playtest defect. | **HUD** (`composition`) |
| G2 | **No error or system copy surface exists and nobody owns it.** `theme/tone/01`: *"unowned; nearest holder is UI/UX. Somebody must own the surface or `P1`–`P9` reaches it only as prose."* The brief has no failure state, so it never contemplated a failure *message* — but a DataStore load failure is real and shipped. | **Feedback UI** (surface) + **Screens** (its copy) |
| G3 | **The brief's screen table is untagged and now partly false.** `04-PRESENTATION.md` lists four screens with no provenance tag; `shop` is deleted by R-4 and `areas` is probably deleted by `meta/04`. | **Store UI** (row 4), **Navigation** (row 3) |
| G4 | **No global on-screen copy budget.** `theme/vocabulary/01` states it is *"unset anywhere in the brief"* and routes it to screen work. `vocabulary` bounds one label; nothing bounds a screenful. | **Screens** |
| G5 | **Rendered typography, font size, wrap behaviour and uppercase display are handed to UI/UX and stated nowhere.** `theme/vocabulary/01`, `theme/tone/01`. Adjacent to Art & Visuals — UI Art without being it: they own the font, you own whether a label class renders its stored title case as uppercase. | **Screens** (rule), **HUD** (its own labels) |
| G6 | **`hud-overlay` ships no pressable readout, and no owner exists for `ui-forge`'s briefs.** `architect/06`: *"no module in this build order owns `ui-forge`'s briefs, so a spec that waited for it would be a required step with no owner."* Two upstream sheets call it a default, not an incapability; the finding is that nobody can change a default they do not own. | **HUD** (judge and report), **Platform & Input** (the parity consequence) |
| G7 | **`hud-overlay` cannot vary an individual readout's presence by state**, which `firstSession` requires of three rows, one denominator and one panel. Raised by `onboarding/04` as *"a blocker to raise rather than a spec to reinterpret."* | **HUD** |
| G8 | **Four `[STOP: no value in the contract]` literals are live in shipped client code**: `MIN_TOUCH_TARGET_PX`, `BUTTON_WIDTH_SCALE`, `BUTTON_HEIGHT_PX`, and the affordability suffix words (`" Buy"` / `" Need"` / `"Max"`), which were invented because `affordabilityByColourAlone: false` demands a second channel and **no key names one.** | **Platform & Input** (geometry), **HUD** (the words) |
| G9 | **The device split `~70/25/5` is `[I assumed]` and uncorroborated by anything fetched** (`cid/_state.md`). Every touch-first layout decision rests on it. | **Platform & Input** |
| G10 | **No contract path exists for a screen title, a button label, or an empty-state string.** `theme/vocabulary/04` makes every UI string a renderable coinage with `requestsPath` unfilled, and notes the ` ```coinage ` parser may not exist in `bridge/merge.mjs` — *"if it is refused, say so out loud, because then UI/UX … has no route into the register at all."* | **Screens** to coordinate; all six file their own |
| G11 | **A purchase can be made and have no visible effect until rejoin, and every surface that could say so is forbidden.** `cid/_state.md` build note 4, `F19` + `F20`. Latent only while every `gamePassId` is null. | **Store UI** to name; the developer to rule |
| G12 | **`hud.brief.json` is a file with no owner and no key**, carrying five all-caps labels and a 23-character bar label against `casing: "title"` and `maxLabelChars: 14`. It is the source of the shipped HUD and nothing in the contract produces it. | **HUD** |
