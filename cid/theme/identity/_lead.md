# Identity — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `bridge/schema.mjs` (the build contract,
read first), `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`,
`03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md` (all sections),
`cid/theme/_category.md`.

**This is a re-plan.** It replaces the previous index at the same path. The sheet count is
unchanged at four, but the reason is different and the contents of two sheets changed: sheet 02
absorbed the avatar decision, and every sheet now carries an explicit statement of what it does
and does not put into the build manifest.

## Contract keys I own: zero. Stated plainly, as a finding.

I read `SCHEMA` in `/Users/zachsmacbook/Desktop/Code/arga/bridge/schema.mjs`. It has ten keys:
`area`, `tiers`, `upgrades`, `currency`, `movement`, `patch`, `collection`, `onboarding`,
`modules`, `runtime`. Their owners are `gameplay/meta`, `gameplay/systems`, `gameplay/balance`,
`gameplay/mechanics`, `art/objects`, `gameplay/onboarding` and `tech/architecture`.
`[research: bridge/schema.mjs — file read, not a fetch]`

**No key is owned by `theme/*`. No key exists for a player role, a persona, a character, a
faction, an NPC, an avatar, or a nameplate.** So none of my four sheets carries a `manifest`
block, and that is correct rather than an omission. Three consequences worth carrying:

1. **All Theme naming reaches the build through gameplay-owned keys or not at all.** The only
   player-facing prose in the entire contract is `area.label`, `tiers[].name`,
   `upgrades[].label`, `upgrades[].blurb`, `currency.name`, `currency.plural`, and the string
   entries in `collection.sets[].id` / `collection.sets[].relics`. Every one of those is owned by
   `gameplay/*`. `[research: bridge/schema.mjs]` That is a routing fact for the category's
   canonical-term work *(currently Vocabulary Lead, same wave)*, not a complaint.
2. **There is no flavour-text, description or lore field anywhere in the contract.**
   `upgrades[].blurb` is the only free-prose field a player can ever see, and there are three
   upgrades. This hardens gap 2 below from "no screen exists" to "no *key* exists": the relic
   flavour text that the binding in-session tone decision presupposes has no contract
   representation at all. `[research: bridge/schema.mjs]`
3. **One thing my domain may decide has a build-visible effect and no key to land in.** If sheet
   03 rules that nameplates are suppressed, that is `Humanoid.DisplayDistanceType = None` — a
   line of Luau with nowhere in the manifest to live. It would have to ride inside a `modules[]`
   entry's `responsibility` or `criteria` (owner `tech/architecture`). Named as a consequence for
   **contract-schema work and module-planning work** *(currently Tech & Data)*; I am not
   proposing a key and I have not decided the ruling.

## What the brief gave me

| constraint, quoted | tag | what it does to my subject |
|---|---|---|
| *"Left open — the ruin's identity and history, **who the player is**, what the four sets of relics mean, the names of everything."* (`01-FOUNDATION.md`, repeated in `OPEN.md §4`) | `[brief: binding]` as an **ownership grant only** | The subject is mine. The *content* has zero interview coverage, so every substantive line in sheet 01 is `[cid: decided]`. |
| *"**~24 objects in 4 sets of 6.**"* · *"Structure and scale settled here; **the objects themselves are invented downstream.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R4 Q4]` | This is the **entire** content roster. It contains no beings. Nothing in the brief supports a second party, so factions, named characters, NPC archetypes and relationships have no source to draw from. Confirmed against the contract: `collection.sets[].relics` is the only roster key and its entries are relic ids. |
| *"**Shared server, parallel progression, own areas, no mechanical interaction.**"* · *"Everyone occupies one world clearing their own patch, visible to each other. Social proof at zero systems cost."* · *"**Interaction:** none mechanical."* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q2]` | The only other beings in this world are other players: permanently visible, permanently unable to interact. A fictional fact with no fiction attached. Sheet 03. |
| *"Left open — **whether presence alone suffices**, and the cheapest warmth-adding touch if not."* (`02-GAMEPLAY.md`, `OPEN.md §4`) | `[brief: binding]` as an ownership grant to **presence-sufficiency work** *(currently Multiplayer & Social, wave 2)* | Hard boundary on sheet 03: I name what a co-present stranger **is**; that work decides what, if anything, a stranger can **do**. Sheet 03 may not require an interaction to exist. |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, **not a power fantasy**."* (`01-FOUNDATION.md`) | `[brief: soft]` (inherits `[you accepted: R2 Q3]`) | The role cannot be defined by dominance, conquest, or growing strong. Roblox's default identity shape is ruled out. |
| *"**No mastery layer.** There is no execution skill in proximity-clearing to master. **Stated so nobody invents one.**"* (`03-META.md`) | `[brief: soft]` `[I assumed]` (`OPEN.md §5 #5`) | The role cannot be prowess, rank, title, expertise earned, or trial passed. The player does not get good at this. |
| *"**There is no failure state.**"* · *"**Zero tension is deliberate.**"* (`02-GAMEPLAY.md`), elevated by *"**Tension is zero by design** ... **Do not invent tension to fill the gap.**"* (`HANDOFF.md`) | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated by the handoff | The direct argument against inventing an NPC: any entity with intent is the only such entity in the world, and a lone intent reads as a threat or a demand. Both are tension. |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` | The role can never be **stated** to the player. Whoever they are is legible from what they do or not legible at all. Sheet 02. |
| Screens: `collection-index`, `upgrades`, `areas`, `shop`; *"Deriving the full screen set is UI's job"*; *"**A persistent HUD does not fit**"* (`04-PRESENTATION.md`) | `[brief: soft]` (explicitly provisional) | No lore, dialogue, journal, profile or flavour surface. Corroborated by the contract having no such field. Sheet 02 states its requirement against surfaces that do not exist in either place. |
| *"**Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a pun."* | `[brief: binding]` — **developer, in session 2026-07-30, not in any sheet** (relayed by `cid/theme/_category.md`) | The only text surface anyone has named is relic flavour text, and it is the only place a role could ever have a voice. Whether that voice is first person is sheet 02's conditional requirement, not mine to settle. |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` | The role must be graspable by an 8-year-old with no exposition, and reward collecting rather than becoming. |
| *"Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q3]` | Two-sided. No fiction that requires unfunded content (an NPC model); no thin index to save effort. Four sheets, none padded, is my answer to both. |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`, `CONCEPT.md`) | `[brief: binding]` `[you chose: R4 Q2]` | Genre-standard identity vocabulary (prestige, rank, tycoon, boss) is off the table by positioning, not taste. |
| *"**Cleared is permanent**"* `[you chose: R2 Q1]` · *"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both declined."* `[you chose: R2 Q2]` (`01-FOUNDATION.md`) | `[brief: binding]` | The role cannot be cyclical, reincarnated, seasonal, or a figure who begins again. No fiction of a stranger who returns, either. |
| **Priority 1** (`03-META.md`): proximity clearing · area-completion detection · three clearing upgrades · the 24-relic collection · chunk shuffling · guaranteed first find | `[brief: soft]` `[I assumed — the ordering]`, inherited by everyone per `OPEN.md §5 #7` | **Priority 1 funds no character work of any kind.** Corroborated by the contract: no key describes a character, so a cast would be unrepresentable as well as unfunded. |
| **Priority 3** excludes trading and leaderboards; the category gate derives *"no fiction of exchange, gifting, rivalry, ranking, or comparison between players"* | `[brief: binding]` (trading, via *"no mechanical interaction"*), `[brief: soft]` (leaderboards, via the `[I assumed]` ordering) | Sheet 03 may not make a stranger a rival, a peer to be measured against, or someone whose progress reads as comparison. |

## What the brief did not give me

Seven gaps, each routed by **kind of work** with the current owner bracketed. Gaps 2 and 8 changed
in this re-plan because the contract sharpened them.

1. **"Who the player is" has zero interview coverage.** `OPEN.md §1` has no audit row for player
   role at all; it appears only as a left-open line. There is no `[you said]`, `[you chose]` or
   `[you accepted]` anywhere in 22 questions across 6 rounds on the subject. **The
   least-anchored decision in the category is also the one that can never be stated to the
   player.** → **sheet 01**, which must record that it decided with no developer input, so a
   later revision knows the decision was unanchored rather than derived. Flagged upward: the
   developer should see sheet 01 before wave 2 builds on it.

2. **No surface and no contract key exist for the role to reach the player.** Onboarding is
   *"No text, no tutorial"*; the screen list has no lore, dialogue, journal or profile surface;
   audio is *"Music sparse and low"* (`OPEN.md §2`); there are no NPCs to speak; **and the build
   contract's only free-prose player-facing field is `upgrades[].blurb`, owned by
   `gameplay/balance`** `[research: bridge/schema.mjs]`. → **sheet 02** states the delivery
   requirement. Whether a surface exists is **screen-inventory and on-screen-copy work**
   *(currently UI/UX, wave 4)*; whether it can be built is **build-capability work** (the
   `ui-forge` registry produces one pattern, a centred dismissible panel holding a grid); whether
   it can be *carried* to the build is **contract-schema work** *(currently Tech & Data)*. If all
   three refuse, this domain's output is unreachable, and that is a finding about stage 0 rather
   than about me.

3. **The brief never says what the player looks like, or that they have a body at all.**
   `02-GAMEPLAY.md` says players are *"visible to each other"* and never states *visible as
   what*. `04-PRESENTATION.md` has no avatar line, and no contract key describes a character. On
   Roblox the default is that *"all players join games as their saved Roblox avatar"*
   `[research: creator-docs/characters/index.md]`, so absent a decision the role is worn by an
   arbitrary player-chosen body. → **sheet 02**, merged there in this re-plan because "must the
   role survive any avatar" and "is the role ever delivered" are the same decision seen from two
   sides: both ask what the role requires from the rest of the game. Presentation itself is
   **avatar-treatment work** *(currently Art & Visuals — Characters, wave 4)*, my `does_not_own`,
   unfunded in priority 1.

4. **Nothing rules on nameplates, and by default every stranger has a proper noun over their
   head.** Roblox *"displays a name and/or health bar above"* a character's head by default, and
   *"by default, a humanoid's display name matches the user's Roblox account Display Name"*;
   suppressible entirely with `DisplayDistanceType = None`
   `[research: creator-docs/characters/name-health-display.md]`. In a game whose only named things
   are 24 relics that do not exist yet, **the only proper nouns in the world are player account
   names, and they are outside the fiction's control.** → **sheet 03** names the consequence and
   states a requirement. The ruling is **player-visibility work** *(currently Multiplayer &
   Social, wave 2, already told to name what "visible to each other" includes)* and **HUD work**
   *(currently UI/UX, wave 4)*; carrying it into a build is the unkeyed case in the contract
   section above.

5. **Whether the ruin's makers exist as a nameable group is unstated.** Sheet 01 needs the other
   end of a relation (the player is *something* to whoever left the relics) and that end may
   never be filled: *"what the four sets of relics mean"* is this category's, *"Set themes"* is
   wave 3's, *"The 24 relics"* is wave 4's. → **sheet 01** must state the relation in a form that
   survives either answer. Who the makers were is **history work** *(currently Lore Lead, same
   wave)*. **This is also the single condition that reopens my empty factions slot:** if history
   names a people, there is one group in the fiction, extinct and absent. Sheet 04 carries the
   trigger.

6. **Relic flavour text is presupposed by a binding decision, established by no sheet, keyed by
   no contract field, and nobody owns its voice.** First person makes the role legible with no new
   surface; a third-person catalogue voice makes the role absent from the game entirely. →
   **sheet 02** states this as a conditional requirement. The field's existence is **screen work**
   *(UI/UX, wave 4)*; its register is **voice work** *(currently Tone Lead, same wave)*; its
   **authorship is unowned by any node I can find**, which is worth escalating on its own.

7. **Whether this game wants a cast at all was never asked.** No interview question touched NPCs,
   vendors, quest-givers, companions or pets. **Absence in the brief is not a decision against**,
   and sheet 04 must not present it as one. → **sheet 04** carries the escalation trigger.

8. **The contract has no key for anything this category produces.** Not a gap in the brief but a
   gap between CID and the build, found by reading `SCHEMA`. Stated here because Identity is the
   domain where it bites hardest: a role has no field, a cast has no field, and the one
   build-visible thing I might rule on (nameplate suppression) has no field either. → **contract-
   schema work and module-planning work** *(currently Tech & Data)*. Not mine to fix; the schema
   header says each key came from something a builder actually had to invent, so the honest test
   is whether a builder inventing a player role would notice. **My position is that they would
   not** — a role that is purely a constraint on writers needs no key. Sheet 02 is the sheet that
   decides whether that stays true.

**Flagged upward, not specced: my recommendation is no cast, and here is the cost of the other
answer.** A cast buys exactly two things this game could want: exposition (forbidden by *"No
text, no tutorial"*, unreachable with no dialogue surface, and unkeyed in the contract) and warmth
(which is presence-sufficiency work's open item in wave 2, explicitly bounded to *"the cheapest
warmth-adding touch"* at *"zero systems cost"*). Against that: one NPC costs a model in a wave-4
art slot priority 1 does not fund, a communication surface that does not exist, a contract key
that does not exist, and it becomes the only entity in the world with intent, which imports the
tension the handoff names among six things to know before designing anything. **The specific
pressure I expect:** `03-META.md` and `OPEN.md §6` both record that *"the premium SKU has no
home"*, and a companion or pet is this genre's default answer to a homeless premium SKU. That
pressure will arrive from **premium-SKU work** *(currently Monetization, wave 3)* and possibly
**store-art work** *(currently Discovery & Marketing, wave 5, which needs an icon and may want a
mascot)*. Sheet 04 exists to meet it with a written exclusion rather than a shrug.

## Why 4 sheets

**Zero contract keys, so all four are non-value decisions and each must earn that name.** I tested
each against "is there a question here whose answer could go two ways, that only this domain can
answer, and whose two answers produce different downstream obligations."

01 passes because the role is the one genuinely blank, genuinely mine subject in the domain. 02
passes because "is the role player-facing or writer-facing" is answerable either way *for the same
role*, and the two answers differ in what they oblige: one obliges a surface in wave 4, an avatar
ruling in wave 4 art, and possibly a contract key; the other obliges nothing from anyone and makes
the role an internal constraint. It stays separate from 01 because a refusal in wave 4 must not
drag the least-anchored decision in the category back into revision with it. 03 passes because its
other party is a different party with a different constraint set (the social model, not the
fantasy) and a different adversary (wave 2, not wave 4). 04 passes because "absence in the brief"
and "decided against" are different states, nobody has converted one into the other, and the
conversion is a decision with a cost and a reopening condition.

**Two merges I made, and one I refused.** Merged: the avatar-agnosticism question into 02, since
it is the same decision as delivery seen from the body's side — both are "what the role requires
from things I do not own". Merged: the role's relation to the absent makers into 01, since it is
not separable from the role, it **is** the role. Refused: folding 04 into 03. Combining them would
read as one sheet titled "who else is in the world", but they are two answers, not one — 03 says
what a class of being that *does* exist is, 04 says which classes do not exist and why — and they
fail to different pressures at different times. **Also excluded:** the *one shared world versus
each player's own areas* reconciliation, which belongs to **place-identity work** *(currently
Setting Lead, same wave, told by name that it owns it)*.

| # | sheet | must decide |
|---|---|---|
| 01 | `player-role` | Who the player is, as one static identity that fits every player on a shared server: their stance toward the ruin, and their relation to whoever left the relics (finder, custodian, inheritor, returning descendant, unaffiliated outsider, or a shape nobody has named), satisfying not-a-power-fantasy, no-mastery, no-cycle, restoration register, and graspable at age 8 with zero exposition. **No manifest block; no contract key exists for a role.** |
| 02 | `role-legibility` | Whether the role is player-facing or writer-facing — that is, whether it is ever communicated to the player at all or exists only as a constraint on downstream writers; if player-facing, which existing channels must carry it and what each must supply, knowing the contract's only free-prose player-facing field is `upgrades[].blurb`; and whether the role must survive being worn by an arbitrary saved Roblox avatar or requires a global override. **No manifest block; states requirements on keys owned by `gameplay/balance` and on surfaces owned outside CID.** |
| 03 | `co-present-stranger` | What another visible, non-interactive player is in this fiction (the same role elsewhere, a different role, or deliberately unexplained), plus what the default player nameplate does to a world with no other proper nouns and what this domain requires of the nameplate ruling — without requiring any interaction, comparison or rivalry to exist. **No manifest block; if it requires suppression, that requirement has no contract key and is a consequence for module-planning work.** |
| 04 | `no-cast-declaration` | The enumerated list of entity classes this game contains none of, which specific constraint excludes each one, and the single stated condition that reopens the question — written so a wave-3 or wave-5 agent reaching for an NPC, vendor, companion, pet or mascot is stopped by a citation rather than a vibe. **No manifest block; it is a statement of what will never appear in `collection.sets` or any other key.** |

**Bounds every sheet inherits.**

- **No sheet carries a `manifest` block, and no sheet may invent a contract key.** Where a sheet
  needs something in the build, it states a requirement against the key that would carry it and
  names its owner from `SCHEMA`.
- **Never specify a mechanic, an economy or pacing number, or an art asset.** State a requirement
  on a thing you do not own and name who owns it. Verification checks this.
- **`does_not_own`: character models and visual design** *(Art & Visuals — Characters)*. Sheets 02
  and 04 come closest. Say what a body must not force; do not describe one.
- **Surface every proper noun and every coined term** in a form the category's canonical term list
  can collect *(currently Vocabulary Lead, same wave, and it is the last writer)*. A term that
  exists here and not in that list fails the whole category. Note from the contract section: a
  term only reaches the build if a `gameplay/*`-owned key carries it.
- **Coordination point inside this category:** *"what the player becomes"* and *"the emotional
  promise"* belong to **fantasy work** *(currently Fantasy Lead, same wave)*. Sheet 01 owns who the
  player **is**, including at hour 10; not the arc, not what the player is buying. Verification
  reads both together.
- **End each sheet in 2 to 4 checkable criteria**: a value, a count, a state, or an observable
  behaviour. For this domain that will usually be counts and absences ("this sheet names zero
  characters", "term X appears in N places and nowhere else", "the role is derivable from the
  player's actions alone, with zero on-screen words", "this sheet adds zero fields to any contract
  key").

## Verification note

**Sheet 03 is the one most likely to be contradicted, and soonest.** Presence-sufficiency work runs
in wave 2 *(currently Multiplayer & Social)* on *"whether presence alone suffices, and the cheapest
warmth-adding touch if not"*. If it answers **no** and adds any touch (a wave, an emote, a shared
visual signal, a visible count of who is here), a stranger acquires a capability my fiction may
have described them as lacking. **Sheet 03 must be written so a warmth touch extends it rather than
breaks it**, and must not declare strangers inert. Second exposure on the same sheet: the nameplate
ruling, which HUD work in wave 4 can flip either way.

**Sheet 02 is the one most likely to be contradicted fatally, and the contract raised its odds.**
It states a delivery requirement against surfaces that do not exist, and now three separate later
nodes can refuse it: screen-inventory work in wave 4 *(currently UI/UX)*, the `ui-forge` pattern
registry (one pattern, and it already cannot build the persistent HUD `04-PRESENTATION.md` says
this game needs), and the contract itself, which has no field for player-facing prose beyond three
upgrade blurbs. **If sheet 02 concludes the role reaches the player through no channel at all, that
is the honest result and should be written as a finding, not softened.**

**Sheet 04 will be contradicted by pressure, not by argument.** Nobody will dispute it; someone in
wave 3 or wave 5 will simply need a thing to sell or a face for an icon. Its exclusions must cite
the constraint, not this index.

**Sheet 01 will not be contradicted by anyone, and that is its risk.** It is unanchored (gap 1), it
has no contract key to fail validation against, and no downstream node needs it in order to
proceed. A wrong role here fails silently.

## Research owed

**`must_verify`: none assigned.** Reused from the previous index, not re-fetched, per instruction:

- **Players arrive as their own avatar by default.** *"By default, all players join games as their
  saved Roblox avatar, which already includes all the components for an avatar character."*
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/index.md]`
- **A developer can override that for everyone.** Studio's File > Avatar Settings *"apply globally
  to all player character models joining your game"*, with per-spawn override via
  `LoadCharacterWithHumanoidDescription` / `ApplyDescription`.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/appearance.md]`
  A role that requires a uniform is technically possible; it is an art and cost question, not a
  platform blocker. Sheet 02 should know the option exists and that exercising it lands in someone
  else's unfunded slot.
- **Names display above heads by default and default to the account Display Name.** *"Roblox
  displays a name and/or health bar above that part"*; *"By default, a humanoid's display name
  matches the user's Roblox account Display Name which is unique and separate from their account
  Username."* Suppressible entirely with `DisplayDistanceType = None`.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/name-health-display.md]`

**New this re-plan, from a file read rather than a fetch:** the ten contract keys, their owners, and
the complete set of player-facing prose fields. `[research: bridge/schema.mjs]` This is the only
claim in the index about what the build can carry, and it is checkable by re-reading that file or
running `npm run bridge -- --contract`.

**Not verified, named with the fetch that would settle each:**

- The default `NameDisplayDistance` value (reported as 100 studs) appeared only in a search
  snippet, not a page I fetched. `[unverified]` Settled by fetching
  `create.roblox.com/docs/reference/engine/classes/Humanoid#NameDisplayDistance`. **Not
  load-bearing:** it is a number, and numbers are not mine.
- **No occupancy search on the player-role framing.** Whether "custodian of a ruin" or similar is
  already a shipping game's stated player role is unchecked by me. `[unverified]` Deliberately not
  duplicated: fantasy-level Roblox occupancy is another domain's assigned `must_verify` in this
  same wave *(currently Fantasy Lead)*, and `research/landscape.md`'s own *"Not verified"* section
  is the shared starting point. Settled by a Roblox game-search pass on restoration and custodial
  framings, which should be read as an input to sheet 01 if it lands first.
