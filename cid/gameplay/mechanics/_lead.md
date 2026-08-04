# Mechanics — domain index

**Category:** Gameplay · **Wave:** 2 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `OPEN.md` (brief); `cid/gameplay/_category.md` §03; `cid/_digest.md`
and `cid/_contract.md` for upstream wave-1 boundaries and the key list; my own adopted
`01-reach-and-pace.md`. In-repo, read directly: `bridge/schema.mjs`, `bridge/verify-sheets.mjs`,
`game/src/client/Input.luau`, `game/src/shared/GameConfig.luau`,
`ui-forge/src/compose/patterns/hud-overlay.mjs`, `docs/cid-workflow.json`.

## What the brief gave me

| constraint, quoted | tag | what it binds |
|---|---|---|
| "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb. [hold-to-clear and tap-to-swing were both offered and declined]" (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q3]`, and `OPEN.md §5` records it as no longer an assumption | 02, 03, 06. Two alternatives were named and refused; the bar for a second world verb is high, not infinite. |
| "proximity clearing … contact clears overgrowth. No click, no aim, no timing" (`02-GAMEPLAY.md` mechanics table) | `[brief: soft]` ← `[research]` in the brief's own table | 02, 05. Clearing is a consequence of moving, not a verb the player issues. |
| "**Device:** mobile-first, ~70/25/5." (`02-GAMEPLAY.md`) · "~70% mobile / ~25% desktop / ~5% console" (`00-CORE.md`) | `[brief: soft]` ← `[you accepted: step 6 Q4]`; the split itself is `[brief: soft]` ← `[I assumed]` | 03. The band (8–14, mobile-heavy) is `[brief: binding]` ← `[you chose: R1 Q4]`; only the percentages are assumed. |
| "**Feel:** reach is the primary sensation — a wider tool must visibly sweep more per step." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[I assumed]` | 04, 05. The only feel statement in the brief, and it is the weakest kind of claim in it. |
| "Left open — clear-on-contact feedback, whether any input beyond movement exists, and how an area's 'completely clear' moment is celebrated. *[currently: Mechanics]*" (`02-GAMEPLAY.md`, repeated in `OPEN.md §4`) | `[brief: binding]` as a routing instruction | 02, 05. This is the domain's explicit remit. |
| "**Clearing and discovering are one action.** Do not design them as separate systems." (`01-FOUNDATION.md`) | `[brief: soft]` ← `[you accepted: R2 Q3]` | 05. A constraint on systems, not a ban on the reveal being perceptually distinct. |
| "**There is no failure state.** No death, no losing, no loss of progress" · "**Zero tension is deliberate** … nobody downstream should invent tension to fill the gap. **Consequence: audio and visual feedback carry the entire load**" (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q2]`, confirmed in `OPEN.md §5`, stated three times across the brief | 05, 06. No lockout, no timer, no hazard, no fall damage, no punishment for standing still. I specify when feedback fires; I never specify the cue. |
| "**Three axes:** value per unit, clear radius, and move speed." (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q1]`, recorded in `OPEN.md §5` as no longer an assumption | 04. If a tool is an object, it may only express one of these three. |
| "**Note the tension:** with no whale-tool ladder equivalent decided, the high-price SKU has no obvious home yet." (`03-META.md`) · "**The premium SKU has no home.** … the reference's high-price item was an oversized *tool* and no tool ladder was specified here." (`OPEN.md §6`) | `[brief: binding]` as a stated hole | 04. Flagged twice by the brief and assigned to this domain by `cid/gameplay/_category.md` §03. |
| Priority 1: "proximity clearing · area-completion detection · three clearing upgrades · the 24-relic 4-set collection · chunk shuffling for endless areas · guaranteed first-area find." Priority 3: "real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events." (`03-META.md`) | ordering is `[brief: soft]` ← `[I assumed]`; treated as excluded regardless, per `cid/gameplay/_category.md` | all sheets. See **Scope check**. |

**Upstream wave-1 rulings I inherit** `[research: cid/_digest.md]`, read from the digest rather than
the sheets:

- `theme/tone/03-beat-map` — "Five beats, ranked with no ties: `B1` a Find reveals, `B2` a set
  completes, `B3` an area completes, `B4` an upgrade is purchased, `B5` a patch clears." **Sheet 05
  may not re-rank them**; it decides the mechanical trigger and the interruption, not the loudness.
- `gameplay/core-loop/02-payoff-weights` — hands me, by name, "what the player can and cannot do
  during the completion moment (Mechanics)."
- `gameplay/core-loop/03-reveal-placement` — a Find reveals on contact, per patch, at the instant
  that patch clears, "with one revision demanded: the reveal and the area-completion notice must
  stop sharing one channel." That revision lands in sheet 05.
- `gameplay/core-loop/01-payoff-frequency` — a moving player is paid at least once every 3 s; at
  most 90 s between two payoffs above a currency tick. **Cadence is theirs; latency is mine.**
- `theme/setting/03-physical-law` — "Nothing in this place changes without a player's hand … exactly
  one mutable property — a patch is standing or it is cleared."
- `theme/identity/04-no-cast-declaration` — nine classes of entity, none present: no NPCs, no
  vendors, no quest-givers. It also **recommends** an oversized tool as the premium SKU "because a
  tool is an object, not a being". A recommendation, not a ruling; sheet 04 must reconcile with it.
- `theme/setting/05-inventory` — place matter is a closed list, and "a tool in a player's hand is
  not place matter", which is the carve-out that makes a held tool legal at all.
- `art/objects/01-patch-footprint` — a patch is a 3-stud square and **does not collide**.

## What the brief did not give me

Nine gaps, each routed to the sheet that decides it. None is filled here.

1. **G1 — does "Input: movement only" cover spending currency?** The brief names a sink
   ("clearing-speed upgrades") and never says how a player reaches it. The shipped
   `game/src/client/Input.luau` binds keyboard 1, 2 and 3 to a `BuyUpgrade` remote and describes
   itself as "the only client-originated message in the game" `[research: game/src/client/Input.luau]`
   — so either "movement only" means "movement is the only *world* verb" or the build already
   violates it. Nothing on disk resolves the reading. → **02**
2. **G2 — which device classes must reach the purchase verb.** The brief fixes a mobile-heavy
   audience but never states a device floor for any verb. → **03**
3. **G3 — is a tool a thing the player holds and sees, or an abstraction over three stat axes?**
   Flagged twice by the brief as a hole and never asked in the interview. → **04**
4. **G4 — what the player can and cannot do during the area-completion moment.** The brief says the
   moment is "left open" and Core Loop deferred the agency half of it to this domain by name. → **05**
5. **G5 — how a reveal reads as distinct from an ordinary clear while remaining one action.** The
   brief binds the systems half ("one action") and is silent on the perceptual half. → **05**
6. **G6 — jumping.** "Movement only" never rules on the platform's free jump, which exists by
   default on every device and is a verb the player will find in the first ten seconds. → **06**
7. **G7 — can the world kill or drop the player, and what does an area's edge do?** The brief says
   there is no death; the shipped build hand-rolls a respawn with `RespawnDelaySeconds = 3` and
   `Players.CharacterAutoLoads` off `[research: game/src/shared/GameConfig.luau]`, so a death path
   exists in a game whose brief says it has none. → **06**
8. **G8 — what a purchase attempt does when the player cannot afford it.** The shipped client sends
   "no cost, no level, no affordability test" and lets the server price it, so the failure case has
   a wire path and no stated behaviour. → **02**
9. **G9 — can one player's body block another's?** The binding social rule is "no mechanical
   interaction", and two colliding characters are the only physical contact the game affords. The
   brief never asks. → **06**, with the answer stated as a consequence for presence-sufficiency work
   (currently Multiplayer & Social, same wave), which does not get to be surprised by it.

## Which parts of my subject this game does not have

Stated so verification reads the absence as a ruling rather than an omission.

- **Equippable powers and abilities: none.** No ability buttons `[brief: soft]`, no cooldowns, no
  loadout, no slots, no charges. Of "equippable powers, tools, gear behavior", only the
  object-or-abstraction ruling in sheet 04 survives, and it reduces to one boolean plus a rule.
- **NPCs: none at all.** `theme/identity/04` declares nine entity classes and none of them present,
  so "how players affect NPCs" is empty. There is nothing here to spec.
- **Objects the player affects: exactly one class, with exactly one mutable property.** A patch is
  standing or cleared `[research: cid/_digest.md]`. Finds are revealed, never picked up, carried,
  dropped, placed or arranged. There is no second interaction to design.
- **No aim, click, timing, combat, stealth, vehicle or crafting verb**, and nothing to add one to.

## Scope check

No sheet touches priority 3. Nothing here names, implies, reserves space for, or stubs procedural
generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading, seasons or
events. **Sheet 03 is not new scope**: "three clearing upgrades" is already priority 1, and 03 only
states that the verb which buys them must be reachable by the audience the brief already fixed. A
verifier reading it as an added system should read this line instead.

## Contract keys

`npm run bridge -- --contract` lists 9 creative keys `[research: cid/_contract.md]`. **This domain
owns exactly one, `movement`, and it is already supplied by the adopted sheet 01.** The other four
sheets each name a key that does not exist and propose it, because the alternative is prose no
build step can read — which is the failure that made 78% of wave 1 unreadable.

| key | status | supplied by | what it holds |
|---|---|---|---|
| `movement` | **owned, merged, shipped** | 01 | Base walk speed and base clear radius, before any upgrade. |
| `input` | proposed | 02 | The closed verb table: id, trigger kind, precondition, adjudicating side, device bindings. |
| `tool` | proposed | 04 | Whether a tool is a held object, and if so which upgrade axis drives it. |
| `response` | proposed | 05 | Per beat: what fires, on which side, in what acknowledgment budget, and whether control is affected. |
| `traversal` | proposed | 06 | What the body may do and where it may go: jump, edges, falling, player-to-player collision. |

Sheet 03 supplies no key by design and says so in one line; it constrains `input.verbs[].devices`.
A proposal is reported by `npm run bridge` and never merged until a shape is written for it in
`bridge/schema.mjs` — that is the finding, and it is for whoever maintains the schema.

## Why 6 sheets

One key I own, one sheet: 01, adopted unchanged. The other five exist because this domain has four
subjects with no key and one rule that constrains one of them, and each was something a builder
already invented on the spot. **Intent entering the game** (02) is separate from **where that intent
can be expressed** (03) because the verb table can be complete and correct while binding to one
device, which is exactly the shipped state — the roster is a list, the coverage floor is a policy
that rejects that list, and merging them would put the problem and its fix in one cell. **Whether a
tool is an object** (04) is separate from everything because it is a single ruling that unblocks a
wave-3 domain and touches representation, feel and monetization at once. **Consequences reaching the
player** (05) is separate from intent entering the game because it is the opposite direction of the
same loop and has a different failure mode: an unacknowledged clear, not an unreachable verb. **What
the body may do** (06) is separate from 01 because 01 is merged and shipped and a second sheet may
not claim `movement`; its subject is affordances and bounds, not speed and reach.

Three candidates were rejected. **A "clearing" sheet** is not a sheet: clearing is a consequence of
moving, the brief settles it as proximity contact, and the values are in 01 and `tiers`. **A "juice"
sheet** would be a second copy of `theme/tone/03-beat-map`'s ranking with no data of its own. **A
second-input argument** is not a sheet either: 02 rules on the reading of "movement only" as part of
naming the verbs, and inventing a separate sheet to argue for an input the brief declined twice
would be a place to hide an overrule.

| # | sheet | must decide |
|---|---|---|
| 01 | `reach-and-pace` | **ADOPTED AND ALREADY WRITTEN. Do not rewrite, renumber, or re-decide it, and do not restate its values anywhere else.** It fixes the pre-upgrade floor, base clear radius 5.5 studs and base walk speed 16, and supplies the `movement` key that the shipped game and `game/test/config.spec.luau` already read. Every later sheet treats both numbers as fixed inputs. |
| 02 | `verb-roster` | The closed list of every action a player can perform, supplied as a proposed `input` key with one row per verb carrying an id, a trigger kind (continuous or discrete), a precondition, the adjudicating side (carry this as inherited from `OPEN.md §2` "Secure server-side: clearing, currency, relic grants", not as a new decision) and the device classes it is bound on. Rule explicitly on **G1**: whether the brief's "Input: movement only" covers spending currency, given the shipped `game/src/client/Input.luau` binds keyboard 1, 2 and 3 to a `BuyUpgrade` remote and calls itself the only client-originated message in the game. Quote both readings before choosing one. State that a verb absent from this table does not exist, and say in the same breath that clearing, reveal and area completion are consequences of a verb rather than verbs. Include **G8**, what a purchase attempt does when the player cannot afford it, as a precondition cell and not as a cue. If your answer would require the player to walk to a world object to buy, that adds a class to a closed place-matter list owned by world-inventory work, so state it as a consequence for that subject rather than assuming it. Name no on-screen position, no button, no label wording, no cue and no cost. |
| 03 | `device-parity` | Which device classes must be able to reach every verb in sheet 02 before this is shippable to the audience the brief already fixed, written as a check a build can fail rather than a preference. **G2**: the brief fixes 8–14 and mobile-heavy at roughly 70 percent, names a currency sink, and never states that the verb which spends it must work without a keyboard, while the shipped surface binds purchase to keyboard 1, 2 and 3 only. Name the input class each verb requires, continuous directional versus discrete select, in terms an on-screen-layout domain can satisfy without re-deciding anything, and state as a consequence for that subject that `ui-forge`'s `hud-overlay` pattern currently makes nothing pressable by default. **Carry no manifest block**: say in one line that this sheet constrains `input.verbs[].devices` from sheet 02 and supplies no key of its own, so `cid:verify`'s data-form check reads it correctly. Decide no layout, position, size or art, and do not restate the verb table. |
| 04 | `tool-as-object` | **G3**, answered either way and never deferred: is a tool a thing the player holds and sees, or purely an abstraction over the three upgrade axes? Supply the answer as a proposed `tool` key carrying at minimum a `held` boolean, and if held, which one of the three axes drives its appearance and what it may never do. The brief flags this twice as a hole (`03-META.md`, `OPEN.md §6`) and premium-SKU work at wave 3 is blocked on it. Reconcile with two upstream positions, both of which lean one way: `theme/identity/04` recommends an oversized tool as the premium SKU because it is an object rather than a being, and `theme/setting/05` carves out that a tool in a player's hand is not place matter. If you answer abstraction, say plainly that no tool-shaped SKU exists, and name what else carries the brief's `[I assumed]` promise that a wider tool must visibly sweep more per step. Set no price, no rung count, no level threshold and no ladder: those are premium-SKU work and Balance. |
| 05 | `response-contract` | For each of the five beats Tone already named and ranked (a Find reveals, a set completes, an area completes, an upgrade is purchased, a patch clears), what mechanically fires, on which side it is decided, within what acknowledgment budget, and whether the player's control is affected. Supply it as a proposed `response` key, one row per beat. This is the brief's "clear-on-contact feedback … and how an area's 'completely clear' moment is celebrated", plus **G4**, the question Core Loop deferred to this domain by name, plus **G5**, how a reveal reads as distinct from an ordinary clear while remaining one action. Honour the revision `gameplay/core-loop/03` demanded: the reveal and the area-completion notice must stop sharing one channel. Every duration is a requirement, not a tuning value, so carry it as `[playtest unknown]` with a starting figure and a test range. Do not re-rank the beats, do not restate Core Loop's 3-second and 90-second cadence ceilings, and name no particle, sound, toast or wording: you specify the behaviour a cue attaches to, never the cue. |
| 06 | `traversal-affordances` | What the player's body may do and where it may go inside an area, as a proposed `traversal` key. **G6**: whether jumping exists, given the brief says movement only and never rules on the platform's free jump. **G7**: whether the world can kill or drop the player and what an area's edge does, given the brief says there is no death while the shipped build hand-rolls a respawn with `RespawnDelaySeconds = 3` and `CharacterAutoLoads` off. **G9**: whether one player's body can block another's, which is the only physical contact two players can have under the binding no-mechanical-interaction rule, stated with its consequence for presence-sufficiency work. Treat patch non-collision as inherited from `art/objects/01` and do not restate `patch.collides`. Anything you decide here must not introduce a hazard, a fall penalty or a lockout, because zero tension is confirmed and instructed. Set no area dimension, no walk speed and no clear radius: sheet 01 holds those and they are shipped. |

## Verification note

**Most likely to be contradicted: 04 `tool-as-object`, by premium-SKU work (currently Monetization,
wave 3) and by object-and-model work (currently Art & Visuals, wave 6).** It is the only sheet whose
answer another domain has a commercial reason to want reversed, and two wave-1 sheets have already
leaned toward "held" as a recommendation while the brief's own feel line leans the same way and its
control line leans against. Whichever way it lands, someone downstream inherits a constraint they
did not choose. Second most likely: **03 `device-parity`, by on-screen control-layout work
(currently UI/UX — Platform & Input, wave 5)**, which owns the surface my requirement forces, and
which will meet a `ui-forge` pattern that makes nothing pressable by default. The requirement is
still mine to state; the layout is still theirs to design, and I have written 03 so that the seam
between those two is a named input class rather than a picture.

**On sheet 01, which I adopted and am not re-assigning: one inconsistency, recorded not acted on.**
Its acceptance criterion 1 is "base clear radius is smaller than the area's minimum patch spacing",
which holds (5.5 < 6), but its stated intent is that "one step clears three patches" must not
happen — and a radius of 5.5 against a spacing of 6 clears both neighbours from the midpoint, so the
criterion does not deliver the intent. The intent would need radius < spacing / 2. I am not
re-assigning it: the values are merged, shipped, read by `game/test/config.spec.luau`, and
`gameplay/core-loop/05` derives area footprint from `baseClearRadius`, so changing it ripples into an
approved wave-1 sheet. It also meets neither stopping-rule bar — no player notices, no two builders
diverge, because the value is stated. Recorded so the next reader does not mistake the criterion for
a guarantee.

## Research owed

**`must_verify` for this node is empty and I was instructed not to fetch. Nothing external was
fetched, and no claim in this index is presented as sourced from a page.** What I did verify, I
verified by reading files in this repo, and the writer may cite these directly (file citations, not
URLs, so they do not need a pack entry):

- `game/src/client/Input.luau` — the entire client-originated surface is `Enum.KeyCode.One/Two/Three`
  mapped to `GameConfig.Upgrades[1..3]` firing `BuyUpgrade`; no touch, no gamepad, no other message.
- `game/src/shared/GameConfig.luau` — `BaseWalkSpeed = 16`, `RespawnDelaySeconds = 3`,
  `Players.CharacterAutoLoads` off with respawn hand-rolled in `server/init.server.luau`.
- `ui-forge/src/compose/index.mjs` exports two patterns, `modal-grid` and `hud-overlay`;
  `hud-overlay.mjs` states "nothing here is `PRESSABLE` by default". **`CLAUDE.md`'s "ui-forge has
  exactly one pattern" is stale** — there are two, and the pressable question is a default rather
  than a proven incapability. Do not repeat the stale claim.
- `bridge/schema.mjs` — 9 creative keys; `movement` owner is `gameplay/mechanics`; `representation`,
  `wiring` and `runtime` belong to `architect/schema.mjs` and are not mine to decide.

**Three things a fetch would settle and nothing on disk does. The writer must mark each
`[research owed:]` and decide on reasoning alone:**

1. **How comparable Roblox incremental games let a phone player buy an upgrade** — a tap target on a
   HUD, or walking into a purchase pad. This is the one unfetched item that could change 02's answer,
   because a walk-into pad would make purchase a movement-only verb and dissolve G1 entirely. The
   fetch that settles it: two or three current `X Incremental` Roblox game pages plus gameplay video,
   starting from the reference in `research/grass-incremental.md`. Note the counter-constraint before
   assuming it: a pad is a world object, and place matter is a closed list owned elsewhere.
2. **Roblox's current per-device input APIs** — whether `ContextActionService:BindAction` with
   `createTouchButton` still produces a usable touch affordance, and what `UserInputService`'s
   `TouchEnabled` / `KeyboardEnabled` / `GamepadEnabled` actually report on a hybrid device. The
   fetch: `create.roblox.com` reference pages for `ContextActionService` and `UserInputService`.
3. **What screen area Roblox's default mobile control scheme reserves** (thumbstick and jump button
   regions), which 03's "a pressable must not overlap the movement control" requirement depends on.
   The fetch: Roblox's mobile controls documentation.
