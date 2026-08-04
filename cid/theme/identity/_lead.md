# Identity — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `bridge/schema.mjs` (the build contract, read
first), `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`,
`03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md` (all sections),
`cid/theme/_category.md`; and, for the contract revision below,
`cid/gameplay/social/01-server-and-co-presence.md`, `cid/art/characters/01-the-unmodified-body.md`,
`cid/theme/vocabulary/02-banned-words.md`.

**This index has been revised twice.** The first revision re-planned four sheets and merged the
avatar decision into sheet `02`. The second — this one — replaces the contract rule, which said no
sheet in this domain may carry a data form. That was wrong, and it was the wave-1 defect in
miniature.

## Contract keys owned: zero. Data forms: three. Both stated plainly.

`SCHEMA` in `bridge/schema.mjs` now holds **26 keys**, none of them owned by `theme/identity` and
none describing a role, persona, character, faction, avatar or nameplate.
`[research: repo — bridge/schema.mjs, read this run]` The previous version of this section drew the
wrong conclusion from that — *"none of my four sheets carries a `manifest` block, and that is correct
rather than an omission"*. Owning no key says nothing about whether a subject has a data form. Three
of this domain's four sheets have one, in a key a neighbour already owns.

| sheet | data form | key | why that key |
|---|---|---|---|
| `01-player-role` | `amends` | `vocabulary` (owner `theme/vocabulary`) | the role is writer-facing, so it has no runtime value; its one enforceable half is that no player-facing string names the player a rank, an office, a claim or a uniqueness, and `crossCuttingProblems` checks exactly that |
| `02-role-legibility` | `amends` | `characterArt` (owner `art/characters`, proposed) | that key already carries `avatarSource`, `appearanceWritesOnCharacter` and a `zeros` list whose first entry names this sheet as `ruledBy`. A second key for one body is a second source of truth |
| `03-co-present-stranger` | `amends` | `social` (owner `gameplay/social`) | everything here a build can act on is a rule about what may exist between two players, which is what `social.forbidden`, `plotTenure` and the co-presence bound already carry |
| `04-no-cast-declaration` | **not revised in this pass** | — | its nine exclusions are already carried as data by `characterArt.zeros.entityClass`, which cites it by name. The sheet itself still states no data form and is a known outstanding item |

**This domain proposes no new key, and that is the honest answer rather than an omission.** Every
decision it makes either belongs to a key that exists or is genuinely prose. Inventing an
`identity` key to satisfy a check would put a second owner on a body `art/characters` owns, a
nameplate `characterArt.displayPolicy` carries, and a co-presence rule `social` enforces.

**Note for whoever maintains `bridge/verify-sheets.mjs`.** Its per-sheet data check counts an
`amends` block as data; its domain-level check counts only `provides` proposals. So a domain whose
every sheet amends a neighbour's key still reports as *"owns no contract key and proposes none"*.
That is this domain, and the warning is a false positive of the second check rather than a finding
about these sheets.

**Three routing facts that stand unchanged.**

1. **All Theme naming reaches the build through gameplay-owned keys or not at all.** The only
   player-facing strings in the contract are `area.label`, `tiers[].name`, `upgrades[].label`,
   `upgrades[].blurb`, `currency.name`, `currency.plural`, `collection.className`,
   `collection.classPlural`, `collection.sets[].label` and `collection.sets[].relics` — 43 strings,
   all owned by `gameplay/*`.
2. **There is no flavour-text, description or lore field anywhere in the contract.**
   `upgrades[].blurb` is the only free-prose field a player can ever see, and there are three
   upgrades. The Find flavour text the binding humor decision presupposes has no contract
   representation at all.
3. **The nameplate and health-bar rulings have no key of their own and did not need one.** Sheet `03`
   rules both; `characterArt.displayPolicy` carries them, and the health bar's route is place
   configuration (`StarterPlayer.HealthDisplayDistance`), not a `Humanoid` write.

## What the brief gave me

| constraint, quoted | tag | what it does to my subject |
|---|---|---|
| *"Left open — the ruin's identity and history, **who the player is**, what the four sets of relics mean, the names of everything."* (`01-FOUNDATION.md`, repeated in `OPEN.md §4`) | `[brief: binding]` as an **ownership grant only** | The subject is mine. The *content* has zero interview coverage, so every substantive line in sheet 01 is `[cid: decided]`. |
| *"**~24 objects in 4 sets of 6.**"* · *"Structure and scale settled here; **the objects themselves are invented downstream.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R4 Q4]` | This is the **entire** content roster. It contains no beings. Factions, named characters, NPC archetypes and relationships have no source to draw from. |
| *"**Shared server, parallel progression, own areas, no mechanical interaction.**"* · *"Everyone occupies one world clearing their own patch, visible to each other. Social proof at zero systems cost."* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q2]` | The only other beings in this world are other players: permanently visible, permanently unable to interact. A fictional fact with no fiction attached. Sheet 03. |
| *"Left open — **whether presence alone suffices**, and the cheapest warmth-adding touch if not."* (`02-GAMEPLAY.md`, `OPEN.md §4`) | `[brief: binding]` as an ownership grant to **presence-sufficiency work** | Hard boundary on sheet 03: I name what a co-present stranger **is**; that work decides what a stranger can **do**. Sheet 03 may not require an interaction to exist. |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, **not a power fantasy**."* (`01-FOUNDATION.md`) | `[brief: soft]` | The role cannot be defined by dominance, conquest, or growing strong. |
| *"**No mastery layer.** ... **Stated so nobody invents one.**"* (`03-META.md`) | `[brief: soft]` `[I assumed]` | The role cannot be prowess, rank, title, expertise earned, or trial passed. |
| *"**There is no failure state.**"* · *"**Zero tension is deliberate.**"* (`02-GAMEPLAY.md`), elevated by *"**Tension is zero by design** ... **Do not invent tension to fill the gap.**"* (`HANDOFF.md`) | `[brief: soft]` `[you accepted: step 6 Q2]`, elevated | The direct argument against inventing an NPC: any entity with intent is the only such entity in the world, and a lone intent reads as a threat or a demand. |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` `[you accepted: R6 Q3]` | The role can never be **stated** to the player. Sheet 02. |
| Screens: `collection-index`, `upgrades`, `areas`, `shop`; *"**A persistent HUD does not fit**"* (`04-PRESENTATION.md`) | `[brief: soft]` (explicitly provisional) | No lore, dialogue, journal, profile or flavour surface. Corroborated by the contract having no such field. |
| *"**Dry and sparse.** Humor lives only in relic flavour text. ..."* | `[brief: binding]` — **developer, in session 2026-07-30** | The only text surface anyone has named is relic flavour text, and it is the only place a role could ever have a voice. Sheet 02 states the conditional. |
| *"**8–14, mobile-heavy, short sessions.**"* · *"motivated by **collection, relaxation, completion**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q4]` | The role must be graspable by an 8-year-old with no exposition, and reward collecting rather than becoming. |
| *"Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]` `[you chose: R1 Q3]` | No fiction that requires unfunded content; no thin index to save effort. |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`) | `[brief: binding]` `[you chose: R4 Q2]` | Genre-standard identity vocabulary (prestige, rank, tycoon, boss) is off the table by positioning. |
| *"**Cleared is permanent**"* · *"**No rebirth.** ... Reframing it as 'seasons' ... declined."* (`01-FOUNDATION.md`) | `[brief: binding]` | The role cannot be cyclical, reincarnated, seasonal, or a figure who begins again. |
| **Priority 1**: proximity clearing · area-completion detection · three clearing upgrades · the 24-relic collection · chunk shuffling · guaranteed first find | `[brief: soft]` `[I assumed — the ordering]` | **Priority 1 funds no character work of any kind.** |
| **Priority 3** excludes trading and leaderboards; the category gate derives *"no fiction of exchange, gifting, rivalry, ranking, or comparison between players"* | `[brief: binding]` (trading), `[brief: soft]` (leaderboards) | Sheet 03 may not make a stranger a rival, a peer to be measured against, or someone whose progress reads as comparison. |

## What the brief did not give me

Seven gaps, each routed by kind of work.

1. **"Who the player is" has zero interview coverage.** `OPEN.md §1` has no audit row; there is no
   `[you said]`, `[you chose]` or `[you accepted]` anywhere in 22 questions across 6 rounds. **The
   least-anchored decision in the category is also the one that can never be stated to the player.**
   → **sheet 01**, which records that it decided with no developer input.

2. **No surface and no contract key exist for the role to reach the player.** Onboarding is *"No
   text, no tutorial"*; the screen list has no lore or profile surface; audio is *"Music sparse and
   low"*; there are no NPCs to speak; and the contract's only free-prose player-facing field is
   `upgrades[].blurb`. → **sheet 02** states the delivery requirement and concludes the role reaches
   the player through no channel at all, which is written as a finding rather than softened.

3. **The brief never says what the player looks like, or that they have a body at all.** On Roblox
   the default is that *"all players join games as their saved Roblox avatar"*
   `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/index.md]`,
   so absent a decision the role is worn by an arbitrary player-chosen body. → **sheet 02**, merged
   there because "must the role survive any avatar" and "is the role ever delivered" are the same
   decision seen from two sides. Presentation itself is `characterArt`'s.

4. **Nothing rules on nameplates, and by default every stranger has a proper noun over their head.**
   Roblox *"displays a name and/or health bar above"* a character's head by default, and *"by
   default, a humanoid's display name matches the user's Roblox account Display Name"*; suppressible
   with `DisplayDistanceType = None`
   `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/name-health-display.md]`.
   → **sheet 03**, which now *rules* it rather than deferring: platform default, undressed,
   unsuppressed, with `X15` and `X16` forbidding the name being promoted into the fiction.

5. **Whether the ruin's makers exist as a nameable group is unstated.** → **sheet 01** states the
   relation in a form that survives either answer (zero, in both directions). Who the makers were is
   history work, and it is the single condition that reopens the empty factions slot; **sheet 04**
   carries the trigger.

6. **Relic flavour text is presupposed by a binding decision, established by no sheet, keyed by no
   contract field, and nobody owns its voice.** → **sheet 02** states this as a conditional
   requirement: third person, never first.

7. **Whether this game wants a cast at all was never asked.** **Absence in the brief is not a
   decision against.** → **sheet 04** performs the conversion and carries the reopening condition.

**Flagged upward, not specced: my recommendation is no cast.** A cast buys exposition (forbidden,
unreachable and unkeyed) and warmth (which presence-sufficiency work is chartered to buy at *"zero
systems cost"*). Against that: one NPC costs an art asset priority 1 does not fund, a communication
surface that does not exist, and it becomes the only entity in the world with intent. **The specific
pressure I expect:** *"the premium SKU has no home"*, and a companion or pet is this genre's default
answer to a homeless premium SKU. Sheet 04 exists to meet it with a written exclusion.

## Why 4 sheets

01 passes because the role is the one genuinely blank, genuinely mine subject in the domain. 02
passes because "is the role player-facing or writer-facing" is answerable either way *for the same
role*, and the two answers differ in what they oblige. It stays separate from 01 so that a refusal
downstream does not drag the least-anchored decision in the category into revision with it. 03 passes
because its other party has a different constraint set (the social model, not the fantasy) and a
different adversary. 04 passes because "absence in the brief" and "decided against" are different
states, and the conversion is a decision with a cost and a reopening condition.

**Two merges, one refusal.** Merged: avatar-agnosticism into 02, since it is the same decision as
delivery seen from the body's side. Merged: the role's relation to the absent makers into 01, since
it **is** the role. Refused: folding 04 into 03 — 03 says what a class of being that *does* exist is,
04 says which classes do not exist and why. **Also excluded:** the one-shared-world-versus-own-areas
reconciliation, which belongs to place-identity work.

| # | sheet | must decide |
|---|---|---|
| 01 | `player-role` | Who the player is, as one static identity that fits every player on a shared server: their stance toward the ruin, and their relation to whoever left the relics, satisfying not-a-power-fantasy, no-mastery, no-cycle, restoration register, and graspable at age 8 with zero exposition. **Data form: an `amends` against `vocabulary`.** |
| 02 | `role-legibility` | Whether the role is player-facing or writer-facing; if player-facing, which existing channels must carry it; and whether the role must survive an arbitrary saved Roblox avatar or requires a global override. **Data form: an `amends` against `characterArt`.** |
| 03 | `co-present-stranger` | What another visible, non-interactive player is in this fiction, plus what the default nameplate does to a world with no other proper nouns and what this domain requires of it — without requiring any interaction, comparison or rivalry to exist. **Data form: an `amends` against `social`.** |
| 04 | `no-cast-declaration` | The enumerated list of entity classes this game contains none of, which specific constraint excludes each one, and the single stated condition that reopens the question. **Its exclusions are already carried by `characterArt.zeros.entityClass`; the sheet itself has no data form and that is an outstanding item.** |

**Bounds every sheet inherits.**

- **Every sheet carries a data form** — an `amends` against a key a neighbour owns, a `manifest`
  block for a key this domain proposes, or a one-line statement that the subject has none, naming the
  key it would need. Prose with neither reaches no builder.
- **No sheet may claim a key another domain owns.** `bridge/verify-sheets.mjs` fails a `manifest`
  block whose `provides` sits outside the owning domain; an `amends` is a request against the owner
  and is never merged.
- **Never specify a mechanic, an economy or pacing number, or an art asset.** State a requirement on
  a thing you do not own and name who owns it.
- **`does_not_own`: character models and visual design** (`characterArt`). Say what a body must not
  force; do not describe one.
- **Surface every proper noun and every coined term** in a form the canonical term list can collect.
- **Coordination point inside this category:** *"what the player becomes"* and *"the emotional
  promise"* belong to fantasy work. Sheet 01 owns who the player **is**, including at hour 10.
- **End each sheet in 2 to 4 checkable criteria.** For this domain that is usually counts and
  absences.

## Verification note

**Sheet 03 was the one most likely to be contradicted, and it was, twice — both times usefully.**
`characterArt` corrected its health-bar route (a `Humanoid` write that `response.humanoidWritesAllowed`
forbids) and it has adopted the correction; `social.plotTenure` closed the departure half of the
slot-reuse defect it reported. Its nameplate ruling is now made rather than deferred.

**Sheet 02 was the one most likely to be contradicted fatally, and it was not.** It concluded the role
reaches the player through no channel at all — the honest result, written as a finding. Its one open
`[unverified]`, that avatar scale varies, is now closed by `characterArt.avatarScale`.

**Sheet 04 will be contradicted by pressure, not by argument.** Nobody will dispute it; someone will
simply need a thing to sell or a face for an icon. Its exclusions cite the constraint, not this index.

**Sheet 01 will not be contradicted by anyone, and that is its risk.** It is unanchored, it has no
contract key to fail validation against, and no downstream node needs it in order to proceed. A wrong
role here fails silently — which is the argument for its `amends`: 21 word exclusions are the one
part of it a machine can hold.

## Research owed

**`must_verify`: none assigned.** Reused, not re-fetched:

- **Players arrive as their own avatar by default.** *"By default, all players join games as their
  saved Roblox avatar, which already includes all the components for an avatar character."*
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/index.md]`
- **A developer can override that for everyone.** Studio's File > Avatar Settings *"apply globally to
  all player character models joining your game"*, with per-spawn override via
  `LoadCharacterWithHumanoidDescription` / `ApplyDescription`.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/appearance.md]`
- **Names display above heads by default and default to the account Display Name.** Suppressible
  entirely with `DisplayDistanceType = None`.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/name-health-display.md]`

**Closed since the first index, from files rather than fetches:** the 26 contract keys and their
owners; `StarterPlayer.NameDisplayDistance` defaulting to 100 studs against a realised plot pitch of
122, which is what makes a stranger nameless at rest; and that avatar bodies do differ in height,
which is what keeps `movement.baseClearRadius` a scalar. All three are recorded in
`cid/art/characters/01-the-unmodified-body.md`. `[research: repo — read this run]`

**Still not verified:** no occupancy search on the player-role framing. Whether "custodian of a ruin"
or similar is already a shipping game's stated player role is unchecked here `[unverified]`.
Deliberately not duplicated: fantasy-level Roblox occupancy is Fantasy Lead's assigned `must_verify`
in this same wave.
