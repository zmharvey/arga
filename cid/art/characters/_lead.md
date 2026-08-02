# Characters — domain index

**Category:** Art & Visuals · **Wave:** 6 · **Proposed key:** `characterArt` · **Sheets: 1**

**Read in full:** `concept/spec/incremental-spinoff-v2/` — `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/art/_category.md`; `cid/theme/identity/02-role-legibility.md`, `/03-co-present-stranger.md`,
`/04-no-cast-declaration.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`;
`cid/tech/deploy/01-the-release-contract.md` (rig rows);
`game/default.project.json`, `game/src/server/init.server.luau:280-334`,
`game/src/server/World.luau:100-176`, `game/src/server/Tool.luau:195-330`.
**Grepped, not read whole:** `cid/gameplay/mechanics/01`, `/02`, `/04`, `/05`, `/06`;
`cid/gameplay/monetization/02-what-is-never-sold.md`; `cid/theme/setting/05-inventory.md`;
`cid/_research/pack.md`; `game/src/**`.
`cid/art/style/_lead.md` does not exist yet — this domain does not depend on it.

**Note on tooling:** I have no shell in this session, so `npm run bridge -- --contract` was not run.
I read its derived output, `cid/_contract.md` (25 keys, header states it is regenerated from
`bridge/schema.mjs`). **No key in it is owned by `art/characters`**, and the only `art/*` key is
`patch`, owned by `art/objects`. So this domain owns zero merged keys and proposes one.

---

## What the brief gave me

The brief says **nothing whatever about bodies.** These are the lines that reach my subject at all,
and every one of them reaches it by exclusion.

- *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md`
  `[you chose: R1 Q3]` → **`[brief: binding]`**. No body asset exists to give this domain something
  to do.
- *"**Consequence downstream:** content design is the primary creative work on this project, **not
  art** or marketing."* `00-CORE.md` `[you chose: R1 Q1]` → **`[brief: binding]`**.
- *"Cosmetics-only was offered and **declined as needing a display system first**."* `03-META.md`
  `[you accepted: R5 Q4]` → `[brief: soft]`. Paired with *"**Permanent multipliers only. Never
  content access.** … **Forbidden:** any paid area, relic, or set."*
- *"~24 objects in 4 sets of 6"* `02-GAMEPLAY.md` `[you accepted: R4 Q4]` → `[brief: soft]` is the
  **entire content roster**. There is no second roster and no being in it.
- *"Shared server, parallel progression, own areas, no mechanical interaction. Everyone occupies one
  world clearing their own patch, **visible to each other**."* `02-GAMEPLAY.md`
  `[you accepted: R6 Q2]` → `[brief: soft]`. This is the only line in the brief that requires a body
  to be *legible* to anyone, and it never says legible as what.
- *"Social proof at zero systems cost."* `02-GAMEPLAY.md` → `[brief: soft]`. The purchase co-presence
  was bought with, and the thing a body that reads as a prop would spend.
- *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."* `02-GAMEPLAY.md`
  `[you accepted: step 6 Q3]` → `[brief: soft]`, since narrowed by ruling R-1 to add `buy` on a
  pressable. No verb in the closed list is performed by a body doing anything but walking.
- *"**Tension is zero by design** … Do not invent tension to fill the gap."* `HANDOFF.md` six-things
  #4 → **`[brief: binding]` on the instruction.** No body may be threatened, threatening, or damaged.
- *"**8–14, mobile-heavy, short sessions**"* and *"~70% mobile"* `00-CORE.md` → `[brief: binding]` on
  the band, `[brief: soft]` on the split. Whatever makes a body legible must survive a phone.
- **Priority 3 excludes** *"leaderboards · trading · seasons and events"* `03-META.md`
  `[I assumed — the ordering]` → `[brief: soft]` on provenance, **hard as a gate**. No rank, badge,
  title, flex or seasonal dressing may ride on a body.

**Scope check.** My subject is not priority 3. It is not priority 1 or 2 either — priority 1 is six
systems and **none of them is a body**, priority 2 is three items and none of them is a body. So this
domain is *unfunded* rather than *excluded*, which is why it produces zeros rather than nothing.

---

## What the brief did not give me

Five gaps, all routed to the one sheet, because there is one sheet.

| # | gap | routed to |
|---|---|---|
| **C1** | **The brief never asked whether the player has a body of its own.** `OPEN.md §1` has no audit row for the avatar, `04-PRESENTATION.md` has no avatar line, and `02-GAMEPLAY.md` says players are *"visible to each other"* without saying visible as what. `theme/identity/02` decided it `[cid: decided]` and flagged it. **My key inherits a `[cid: decided]`, not a brief line, and must carry it at that tag.** | `01`, and it stays `[cid: decided]` |
| **C2** | **No rig type is named anywhere in the brief**, and the platform offers three settings of which two break the shipped tool. | `01`, as data citing `release.publishChecklist.P2` |
| **C3** | **No bound on avatar size**, in a game whose clear radius is a scalar and whose one measured legibility distance is 122 studs. Avatar Settings can bound it and nobody has said whether to. | `01`, as a value + a checklist consequence for release work |
| **C4** | **The health bar has an approved ruling with no legal writer.** `theme/identity/03` criterion 2 requires `HealthDisplayDistance = 0` on *every player character*; `response.humanoidWritesAllowed` is exactly `["WalkSpeed"]`, which forbids the write that criterion names. See `## Pushing back`. | `01`, as a value with a non-`Humanoid` writer named; the seam routes to place-configuration work [currently `tech/deploy`'s checklist + whoever owns `runtime.placeConfiguration`] |
| **C5** | **Nothing says what makes a body read as a person.** `theme/identity/03` states the requirement (*"a person and not a prop"*) and hands the visual half here by name, with no criterion attached. Nameplates go dark before a neighbour is reachable (`NameDisplayDistance` default 100 vs `plots.pitchStuds` 122), there is no health bar, and there is zero authored animation. | `01`, as 2–4 countable checks |

---

## The five subjects in my `owns`, each with its ruling and its check

Every row is verified against the artifact named, not inherited. **Four rulings were handed to me
and I could confirm three exactly; the fourth is wrong as worded and right as the key states it.**

| # | subject | ruling that empties it | mechanical check |
|---|---|---|---|
| 1 | **player avatar treatment** | **ZERO.** *"The player wears their own saved Roblox avatar, unmodified. No global override, no provided character, no uniform, no granted accessory."* `theme/identity/02` (approved, wave 1). **Verified against the build:** `game/default.project.json`'s `StarterPlayer` node carries `$className` and `StarterPlayerScripts` only — no `$properties`, no appearance override — while the same file *does* carry `$properties` blocks for `Lighting` and `Baseplate`, so the absence is a fact and not a limitation of the format. | `grep -rnE "HumanoidDescription\|ApplyDescription\|LoadCharacterWithHumanoidDescription\|StarterCharacter\|BodyColors\|\bShirt\b\|\bPants\b" game/src` returns **0**. Ran it: 0 matches. `grep -n '"StarterPlayer"' -A6 game/default.project.json` shows no `$properties`. |
| 2 | **NPC and enemy models** | **ZERO, nine classes.** *"This game contains nine classes of entity: **none of them.**"* `theme/identity/04` (approved, wave 1), 9 rows each with a quoted source. **Reopening condition checked and not met:** it reopens only if `03-META.md`'s priority 1 or 2 list gains an entry naming a being. I read both lists this run — priority 1 is six systems, priority 2 is three items, **no being in either**. | `theme/identity/04` criterion 2, unchanged: across `cid/**/*.md`, zero values inside a ` ```manifest ` block match the whole words *npc, vendor, merchant, shopkeeper, enemy, enemies, boss, pet, pets, companion, follower, minion, mascot, guardian, spirit, ghost*. `characterArt` must pass it too. |
| 3 | **skins and cosmetics** | **ZERO.** *"Cosmetics-only was offered and declined as needing a display system first"* `03-META.md` `[brief: soft]`, hardened three ways downstream: `products` `F7` bans *"skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title, nameplate"*; `F9` bans a product granting a cosmetic; `theme/setting/05` `A13` removes the placement home (*"No player-made mark"*). **One leg of the brief's reason is gone and the ruling still holds:** `theme/identity/02` records that *"the player's own avatar **is** that display system, at zero cost"*, so *"needing a display system first"* no longer applies. The stance stands on *"Permanent multipliers only"*, which is the developer's and Monetization's to reopen, not art's. | `products` `F7`'s own check: **no product changes any instance parented to the character other than the tool head's width.** Verified in shipped code — `Tool.refresh` writes `head.Size` and nothing else on the character. |
| 4 | **animation style** | **ZERO AUTHORED, and the platform default is left running.** `tool.animates` false and `tool.particleEmitters` 0 (`mechanics/04`); `response.humanoidWritesAllowed` is exactly `["WalkSpeed"]` (`mechanics/05:111`); `theme/identity/03` forbids staggering or animating a plot's patches into existence; `firstSession` `suppressionForbidden` bans `liftAnimation` on UI. **Nothing anywhere removes the engine's own `Animate` script**, so walk/idle/jump locomotion exists for free and is the single largest contributor to a body reading as a person. That is a fact about the build, not a decision I am making — sheet `01` states it as one. | `grep -rnE "Animation\|Animator\|LoadAnimation\|AnimationTrack" game/src` returns **0**. Ran it: 0 matches. `grep -rn "rbxassetid" game/src` returns **0**, consistent with `representation`'s *"No asset id is needed anywhere."* |
| 5 | **rig constraints** | **NOT ZERO — this is the one subject with a positive requirement, and it is mine because rig constraints are in my `owns`.** The rig is the platform's and is never overridden (`theme/identity/02`), but **which** platform rig is a place setting with three values, two of which break the build. `[research: creator-docs/studio/avatar-settings.md — fetched this run]`: *"Sets the default avatar type to either **R6**, **R15**, or **R15 & R6**"*, and *"**Avatar Settings** modifies underlying game defaults that are not visible outside of the settings interface or accessible with scripts."* `tool.attachment` is `RightHand`, an R15-only limb; `Tool.luau:295-308` warns and builds nothing when it is absent. **`release.publishChecklist` P2 already owns the row and pins R15 — cite it, do not restate it.** | `Humanoid.RigType == Enum.HumanoidRigType.R15`, readable per character from a server script `[research: create.roblox.com/docs/reference/engine/classes/Humanoid — fetched this run; `RigType` confirmed readable, `Enum.HumanoidRigType`]`. Asserted per spawn by `tool.equip()` before it looks for `RightHand`, per `release`'s row. |

**A sixth fact I found that no ruling covers, and it belongs to subject 5.**
Avatar Settings also carries a **Body** tab: *"**Custom Scale**: Allows you to scale avatars to an
absolute height in studs, but maintain their proportions. You can set a **Minimum** and **Maximum**
range"*, plus *"**Custom Build**"* limiting *"body type, height, width, head size, and proportions"*,
against a stated reference of *"classic style avatars are around 5 studs tall. More humanoid style
proportions are around 6 to 6.5 studs"*
`[research: creator-docs/studio/avatar-settings.md — fetched this run]`. And
`[research: creator-docs/characters/appearance.md — fetched this run]` confirms scaling exists as
`height / width / head / body type / proportion` and that *"This doesn't affect R6 body types."*

**This settles `theme/identity/02`'s open `[unverified]`.** That sheet marked *"that avatar scale
varies is inference from player-chosen bodies; settled by fetching
creator-docs/characters/appearance.md on body scaling."* **Fetched. Bodies do differ, roughly 5 to
6.5 studs by default**, so `movement.baseClearRadius` staying a scalar is correct and the
free-upgrade defect it warned about is real and is already avoided. **The radius is `movement`'s and
I do not touch it.** What is new and mine is that the *bound* is a settable range, which makes
"how tall may a body be" an art-side value with a place-configuration writer.

---

## Why 1 sheet

**One key, one sheet.** `cid/_contract.md` gives this domain no merged key, so by the contract rule
the count is one sheet for the one key I propose, plus a non-value sheet only for a decision that
constrains a key *I* own. There is no such decision: every constraint I found is either a value
inside `characterArt` (the zeros, the rig, the scale bound, the nameplate and health-bar policy) or
a constraint on somebody else's key (`movement.baseClearRadius`, `release.publishChecklist`,
`tool.attachment`), which by the rule belongs in their domain and not mine. Splitting the five
subjects into five sheets would produce four sheets whose entire content is the word *zero* and one
that contradicts the other four by being the only one with a value in it — a heading is not a
decision, and "the body is the platform's, unmodified, and here is every zero plus the two live
constraints on it" is **one** decision described five ways. My category lead reached the same count
independently and said so: *"It should **not** be given a second sheet to fill."*

| # | sheet | must decide |
|---|---|---|
| 01 | `the-unmodified-body` | Propose `characterArt` and make it this game's explicit-zero record for bodies: avatar source, plus four zeros (appearance override, entity class, cosmetic, authored animation) each carried as a **value with a runnable grep**, not as prose; state the exactly-one permitted `Humanoid` property write and the three non-appearance writes the shipped server actually makes on a character, including `CollisionGroup` on every character `BasePart` and every one added later; state the **R15** rig requirement and the ~5–6.5-stud avatar height band as art-side data that **cites `release.publishChecklist.P2` rather than restating it**; carry the nameplate and health-bar policy as values naming a writer that is not a `Humanoid` property write; and convert `theme/identity/03`'s *"a person and not a prop"* into 2–4 countable checks, given that nameplates go dark at 100 studs against a 122-stud plot pitch, no health bar displays, zero animation is authored, and the engine's own `Animate` script is left running. |

---

## What I considered and did not assign

- **A second sheet for "the co-present stranger's read at 122 studs."** Same decision as `01`'s
  person-not-a-prop clause, seen from the other end. One sheet.
- **A sheet naming a look for the player.** Forbidden by the ruling in subject 1, and it would be
  the exact failure `00-CORE.md` names — inventing an art asset priority 1 does not fund.
- **A sheet for a cosmetic ladder or a premium body SKU.** `03-META.md` declined it, `products`
  `F7`/`F9` ban it, `theme/identity/04` row 7 bans the companion form of it. Reopening needs a
  developer-authored artifact, which `theme/identity/04` defines and which has not occurred.
- **A mascot sheet.** `theme/identity/04` row 9 forbids one. Named here so wave 7's store-art work
  reads it as a conclusion rather than an omission: **there is no cast to put on a thumbnail.**
- **Anything about the tool's appearance.** `art/objects` owns `objectArt` and gap G7. It is welded
  to a body, which is not the same as being one.
- **Anything about the clear radius.** `movement`'s, and `theme/identity/02` already stated the
  requirement on it. I supply the evidence that bodies differ; I do not touch the number.
- **A seasonal or event body channel.** Priority 3. Named to forbid it, per the category gate.

---

## Contract key this domain needs

`characterArt` — **owner `art/characters`, does not exist in the 25.** It is the only key in the
contract whose value is expected to be mostly zeros, and that is the reason to have it: a zero
asserted in a merged key is checkable at build time, and the same zero left in prose is a thing a
verifier has to remember. What it would hold: the avatar source; a **closed, empty** override list;
the entity-class count; the cosmetic count; the authored-animation count; the permitted `Humanoid`
property writes and the non-appearance character writes that are not `Humanoid` writes; the required
rig with its per-character read-back and a pointer to the checklist row that owns it; the avatar
height band; the nameplate and health-bar display policy with the property that sets each; and the
person-not-a-prop checks. **It reads no world colour, size or material, so gap G3 (no world token
layer) does not reach it** — nothing in this key is an arbitrary value that should have been a token.

---

## Pushing back

**1. Against my category lead's scoping line, on a point of fact.** `cid/art/_category.md` states
*"the only `Humanoid` property any module writes is `WalkSpeed`"* in one place (correct) and my
tasking restates it as *"the only property the server writes on a character is `WalkSpeed`"*
(**incorrect**). The shipped server makes three further writes on a character, none of them an
appearance write and all of them real:

- `World.applyGroup` writes `CollisionGroup` on **every `BasePart` descendant of every character,
  and on every one added thereafter** — `World.luau:110-112, 169-174`, whose own comment names
  *"an Accessory handle"* as the reason it connects rather than only looping. **This is the one
  place the game reaches into an avatar's own cosmetic instances, and it reaches all of them.**
- `character:PivotTo(...)` — `init.server.luau:316`.
- A two-`Part` `Model` is parented into the character — `Tool.luau:245`.

Nothing here changes how a body looks, so subject 1's ruling survives intact. But a `characterArt`
key asserting "zero writes on a character" would be contradicted by the running build on day one,
which is exactly the class of error this index exists to catch before a writer hardens it.

**2. `theme/identity/03` criterion 2 cannot be satisfied by the route it names.** Verbatim:
*"Every player character has `HealthDisplayDistance = 0` set explicitly, so no health bar can display
regardless of what the platform default would do."* `grep -rn "HealthDisplayDistance" game/src`
returns **0** — it is unimplemented. And `response.humanoidWritesAllowed` (`mechanics/05:111`,
approved wave 2, after identity/03) is exactly `["WalkSpeed"]`, so a module writing
`Humanoid.HealthDisplayDistance` violates an approved key. **I am not overruling the ruling** — no
health bar is the right answer in a game with no damage, and I keep it. I am declining to let my
writer restate its criterion as achievable. The available route is `StarterPlayer`, which carries
`HealthDisplayDistance` and `NameDisplayDistance` as `number` properties and whose own documentation
sample sets both to `0` to hide health and names
`[research: create.roblox.com/docs/reference/engine/classes/StarterPlayer — fetched this run]`; that
is project/place configuration, not a `Humanoid` write, and the precedent is `RR-P2`'s
`placeConfiguration` entry with a boot assertion. **This is structurally identical to gap G1**
(a `lighting` key with no writer, because every value lives in the one file `architect/04-tree`
forbids the build from editing) and it should be solved the same way, by the same owner, at the same
time.

**Honest weakening, stated rather than buried:** the platform shows a health bar only when a
character is damaged, and this game has no damage source, so the bar probably never appears in
practice and the criterion may be unfalsifiable as well as unsatisfiable.
`[unverified — the `Humanoid` reference page I fetched lists `HealthDisplayType` and its enum but
states no default; settled by fetching
create.roblox.com/docs/reference/engine/classes/Humanoid#HealthDisplayType for the default of
`HealthDisplayType`.]` It still meets stopping-rule bar 2: two builders diverge, one writing the
forbidden `Humanoid` property and one doing nothing.

---

## Verification note

**The sheet most likely to be contradicted later is `01`, and by release work.** `characterArt` will
carry `rig: R15` and an avatar height band as art-side values, while `release.publishChecklist` P2
already carries the same rig as a publish row and `runtime.placeConfiguration.avatarRigType` already
carries it as the architect's value. That is **three artifacts naming one setting**, which is the
shape that produces a merge collision. I have told the writer to cite P2 rather than restate it, and
`characterArt`'s field should be a *requirement with a pointer*, not a second source of truth. If the
merger rejects it, the row to delete is mine, not release's.

The second candidate is the health-bar value, which whoever owns place configuration may site
elsewhere entirely — see `## Pushing back`.

The third is subject 3. If the developer reopens cosmetics — and `theme/identity/02` has already
knocked out one of the two stated reasons for declining them — a `cosmetics: 0` value inverts, and it
inverts by a developer ruling rather than by an art argument. **The zero is correct today and it is
the least durable thing in this index.**

---

## Research owed

**My node in `docs/cid-workflow.json` carries no `must_verify`.** I fetched anyway, because whatever
I do not fetch my writer must handle as `[research owed:]` on reasoning alone, and three of my five
subjects turn on platform behaviour.

**Fetched this run, and banked for the writer:**

1. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md`
   — the three Avatar Type options verbatim; the not-accessible-with-scripts sentence; and, **new to
   this project, the Body tab**: `Custom Scale` with a settable Minimum/Maximum absolute height in
   studs, `Custom Build`, and the ~5 / ~6–6.5-stud reference heights. Independently confirms
   `tech/deploy/01`'s rig rows rather than inheriting them.
2. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md`
   — body scaling is `height / width / head / body type / proportion`; *"This doesn't affect R6 body
   types"*; Avatar Settings *"apply globally to all player character models joining your game."*
   **This is the specific fetch `theme/identity/02` named as owed and it is now closed.**
3. `https://create.roblox.com/docs/reference/engine/classes/StarterPlayer` — `HealthDisplayDistance`
   and `NameDisplayDistance` exist as `number` properties, with a documentation sample setting both
   to `0` to hide health and names. This is the non-`Humanoid` route in `## Pushing back`.
4. `https://create.roblox.com/docs/reference/engine/classes/Humanoid` — `RigType` confirmed readable,
   returning `Enum.HumanoidRigType`; `HealthDisplayDistance`, `NameDisplayDistance`,
   `DisplayDistanceType` and `HealthDisplayType` all confirmed present.

**Could not settle, with the fetch that would:**

- **Defaults for `HealthDisplayType`, `DisplayDistanceType`, `HealthDisplayDistance` and
  `NameDisplayDistance` on `Humanoid`.** The reference page I fetched lists all four and states no
  default for any of them. The 100-stud figure this project uses throughout comes from
  `gameplay/social/_lead` and `cid/_research/pack.md`, where it is already `[unverified]`, and
  `theme/identity/_lead` records the same failure. **Fetch that would settle it:**
  `create.roblox.com/docs/reference/engine/classes/Humanoid#NameDisplayDistance` and
  `#HealthDisplayType` rendered rather than raw, or the `StarterPlayer` property table with defaults.
  **Consequence if wrong:** C5's premise that a neighbour is nameless at rest (100 < 122) inverts,
  and a body at rest gains a legibility channel the sheet assumed it did not have.
- **Whether `Humanoid.RigType` is writable or read-only from a server script.** The page confirms it
  is readable; `release`'s P2 needs only the read, and nothing in my subject needs the write. Named
  so nobody assumes a script can fix a wrong Avatar Setting. **Fetch:** the same page's property
  table with its write access.
- **No playtest observation exists for any body.** `cid/_playtest.md` is `n = 1`, single-player, and
  *"No second player was present, so every `social` value … remains a prediction."* Every
  person-not-a-prop check `01` writes is therefore `[playtest unknown]` and must carry a test range,
  not a bare assertion.
