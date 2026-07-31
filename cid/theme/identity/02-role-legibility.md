# 02 — Role legibility and the player's body

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The role is writer-facing only.** It is never communicated to the player through any channel:
zero on-screen words, zero audio, zero art, zero avatar treatment. It exists to keep downstream
writing coherent and to give any string a test it can fail.

**The player wears their own saved Roblox avatar, unmodified.** No global override, no provided
character, no uniform, no granted accessory. The role must survive being worn by any body a
player already owns.

**Identity owns no build-contract key.** This sheet carries no `manifest` block and adds no key;
its two enforceable effects ride `vocabulary` (owner `theme/vocabulary`) and the *absence* of
avatar code in `modules[]` (owner `tech/architecture`).

## Why

**Every channel that could deliver the role is already closed, and I closed the last one myself.**
I enumerated them rather than asserting the conclusion:

| channel | verdict | on what authority |
|---|---|---|
| on-screen prose | closed | `upgrades[].blurb` is the **only** free-prose player-facing field in the whole contract — exempt from `maxLabelChars`, still ban-checked — and there are three of them, each owing an 8-year-old on a phone an explanation of what an upgrade does. `[research: bridge/schema.mjs — file read this run, `playerFacingStrings` + `crossCuttingProblems`]` |
| onboarding | closed | *"Clear → reveal inside the first ten seconds ... **No text, no tutorial**"* `[brief: soft]` (`02-GAMEPLAY.md`, `[you accepted: R6 Q3]`) |
| screens | closed | the list is `collection-index`, `upgrades`, `areas`, `shop`; no lore, journal or profile surface, and *"**A persistent HUD does not fit**"* the one pattern the build stage has `[brief: soft]` (`04-PRESENTATION.md`) |
| audio | closed | *"Music sparse and low"*, no voice anywhere `[brief: soft]` (`OPEN.md §2`) |
| an NPC saying it | closed | the entire roster is *"~24 objects in 4 sets of 6"* `[brief: soft]` (`02-GAMEPLAY.md`); nothing to speak with |
| relic flavour text | conditional, and it stays closed | the field is presupposed by the binding humor decision, established by no sheet, and — checked against the current schema — **has no contract key**: `collection.sets[].relics[]` carries names only. `[research: bridge/schema.mjs]` My conditional below keeps the role out of it even if it appears. |
| **the body** | **closed by me, with a price** | a provided character is the one channel that could state a role with zero words, which is exactly why this is one decision and not two. Declined below. |

**So the honest result is that the role reaches the player through no channel at all, and the index
told me to write that as a finding rather than soften it.** The role's function is real but
internal: `02-banned-words.md` already ships a `register` string that presupposes a stance
(*"plain concrete nouns ... no ornament"*), and a stance with no owner drifts. Writer-facing is not
"unused"; it is "used by writers".

**Why the body is the player's own, in cost order.**

1. **A provided character is unfunded content.** *"Target: the smallest game that still gives every
   creative area real work"* and the category gate *"no domain may invent fiction that requires
   content the priority list does not fund"* `[brief: binding]` `[you chose: R1 Q3]` (`00-CORE.md`).
   Priority 1 is six systems and no character work `[brief: soft]` `[I assumed — the ordering]`
   (`03-META.md`). An override is technically trivial — Studio's Avatar Settings *"apply globally
   to all player character models joining your game"*, with per-spawn
   `LoadCharacterWithHumanoidDescription` / `ApplyDescription`
   `[research: creator-docs/characters/appearance.md — verified by the domain index, not re-fetched
   this run]` — so this is a cost decision, not a platform one. The cost lands in a wave-4 art slot
   nothing funds.
2. **A provided character costs the premium SKU its last legal home.** The brief flags *"the premium
   SKU has no home"* in three places (`HANDOFF.md`, `03-META.md`, `OPEN.md §6`), because the
   reference's high-price item was an oversized *tool* and no tool ladder exists here. The stance is
   *"Permanent multipliers only. Never content access"* and *"Cosmetics-only was offered and
   declined **as needing a display system first**"* `[brief: soft]` `[you accepted: R5 Q4]`
   (`03-META.md`). The player's own avatar **is** that display system, at zero cost. Replacing it
   with a fixed character would permanently remove the only SKU class that is neither a multiplier
   nor forbidden content access — and the forbidden direction is the one the brief calls poison:
   *"A paid-only object would turn 100% completion into a purchase."*
3. **Not a power fantasy.** *"Not spooky, not grim, **not a power fantasy**"* `[brief: soft]`
   (`01-FOUNDATION.md`). A game-issued uniform is a rank; the default Roblox body is not. Keeping
   the player's own avatar is the cheapest structural guarantee that the character never becomes a
   ladder.
4. **The absence of a body-arc is consistent with the payoff.** *"Cleared is permanent ... That is
   the whole payoff"* `[brief: binding]` `[you chose: R2 Q1]`. The before/after lives in the ground
   and the collection. A body that never changes cannot compete with it for the eye.

**What it costs, stated rather than buried.** Three things. Arbitrary player avatars are the more
expensive option on a ~70% mobile audience at 12–20 players per server `[brief: soft]`
`[I assumed — server size]` — layered clothing and accessories on 20 unknown bodies are instance
cost the brief already says to watch (*"Watch: instance count per area on mobile"*, `OPEN.md §2`).
The world's visual population becomes uncontrollable, so no fiction anywhere may depend on what a
person looks like. And a body that varies in size interacts with the clear radius — see below,
because that one is a build defect if nobody reads it.

## Consequences for other work

**For proximity-clearing work (owner of `movement`, `gameplay/mechanics`) and server-validation
work (`tech/architecture`): the clear radius must be a fixed value, never derived from the
character's size.** Player-chosen bodies differ in height and width, so a radius taken from a
bounding box hands the tallest avatar a free permanent upgrade and hands the server an economy it
cannot validate — and *"clearing and currency awards must be server-validated"* `[brief: soft]`
(`04-PRESENTATION.md`). `movement.baseClearRadius` is already a scalar in the contract
`[research: bridge/schema.mjs]`; the requirement is that it stay the only source. The value is not
mine. `[unverified — that avatar scale varies is inference from player-chosen bodies; settled by
fetching creator-docs/characters/appearance.md on body scaling. The requirement holds if bodies
differ at all.]`

**For screen-inventory and on-screen-copy work (currently UI/UX, wave 4): Identity requires no
surface from you.** This is the sheet the index expected to be refused fatally, and it now cannot
be: it asks for nothing. Do not build a lore, profile, journal or role surface on Theme's behalf.
Whatever you decide about a flavour-text field, decide it for Lore and Tone, not for me.

**For upgrade-copy work (owner of `upgrades[].blurb`, `gameplay/balance`): the three blurbs may not
name, title, or ventriloquise the player.** No first-person pronouns, no role noun, no address that
assigns the player a station. They describe what the upgrade does. This is a requirement on a key I
do not own, stated because it is the only key that could leak the role.

**For voice work (currently Tone Lead, same wave) and for whoever authors flavour text if the field
ever exists: third person, never first.** A first-person catalogue entry makes the role legible with
no new surface and would flip this sheet. Register and humor level remain Tone's — I constrain
grammatical person only.

**For the player-role sheet (`01-player-role.md`, same domain, not yet written): the role must
survive any avatar.** It may not assume species, size, era-appropriate dress, humanity, or a body at
all. It also may not require delivery, because there is none. **And it is now unfalsifiable by
players** — no one will ever see it, so a wrong role fails silently. That argues for keeping it
short, not for keeping it vague.

**For the fantasy sheet (currently Fantasy Lead, same wave): "what the player becomes" cannot be
read off the character.** The body never changes and is not ours. Any arc must be legible in cleared
ground and in the collection.

**For nameplate work — my decision changes nothing, and that is the useful part.** A name shows
above every head by default and *"by default, a humanoid's display name matches the user's Roblox
account Display Name"*, suppressible with `DisplayDistanceType = None`
`[research: creator-docs/characters/name-health-display.md — verified by the domain index, not
re-fetched this run]`. That comes from the account, not the body, so it is **invariant under this
sheet**: a provided character would have shown the same proper nouns. Sheet 03 is therefore not
blocked by me and not pre-empted by me. If it rules suppression, that ruling has **no contract key**
and must ride inside a `modules[]` entry's `responsibility` or `criteria` (owner
`tech/architecture`) — named as a consequence for module-planning work, not proposed as a key.

**For premium-SKU work (currently Monetization, wave 3): the avatar is a display surface you now
have for free, and the fiction places zero constraints on what can be worn.** Because the role
imposes nothing on the body, no cosmetic can contradict it. I am not reopening the stance —
multipliers-only stands, and it is `[you accepted: R5 Q4]` plus the developer's to revisit — but one
of the two stated grounds for declining cosmetics ("needing a display system first") no longer
applies. Note also that this domain hands you no mascot, companion or pet (sheet 04 has that).

**For contract-schema work (currently Tech & Data): this sheet adds no key and removes one pressure.**
A builder inventing a player role would not notice a missing field, because a writer-facing role has
nothing to serialise. That was the index's stated test and it passes.

**For canonical-term work (currently Vocabulary Lead, same wave, last writer): nothing to collect.**
This sheet coins no proper noun and no player-facing string.

## Acceptance criteria

1. **This sheet contributes zero entries to the Vocabulary canonical list.** Count of proper nouns
   and player-facing strings introduced here: 0.
2. **The role term(s) named in `01-player-role.md` appear 0 times** across every string returned by
   `playerFacingStrings(manifest)` (`bridge/schema.mjs`) and 0 times in any on-screen copy string in
   the shipped build; and every `upgrades[].blurb` contains 0 first-person pronouns (`I`, `me`,
   `my`, `we`, `us`, `our`).
3. **The shipped build contains 0 avatar overrides**: 0 occurrences of `HumanoidDescription`,
   `ApplyDescription`, or `LoadCharacterWithHumanoidDescription` in emitted Luau; no `StarterPlayer`
   or Avatar-Settings appearance override in the Rojo project; and no `modules[]` entry whose
   `responsibility` includes replacing or dressing the player character.
4. **This decision adds 0 contract keys and requires 0 player-character art assets** (model, mesh,
   texture, uniform, accessory) from any wave.

## Not decided here

Who the player is (`01-player-role.md`, same domain). What a co-present stranger is, and the
nameplate ruling itself (`03-co-present-stranger.md`, same domain). Whether entity classes are
excluded and on what condition that reopens (`04-no-cast-declaration.md`). Whether a per-relic
flavour-text field exists (screen-inventory work, currently UI/UX wave 4; carrying it, contract-schema
work, currently Tech & Data). The register and humor level of any prose (Tone Lead, same wave).
Any visual treatment of the avatar beyond "do not override it" (Art & Visuals — Characters, wave 4,
my `does_not_own`). Whether a cosmetic SKU exists and what it costs (Monetization, wave 3, plus the
developer). The clear-radius value (`gameplay/mechanics`); I stated only that it must not come from
the body.

## Flagged to the developer

**1. The avatar question had zero interview coverage and I decided it.** `OPEN.md §1` has no audit
row for it; `04-PRESENTATION.md` has no avatar line; `02-GAMEPLAY.md` says players are *"visible to
each other"* and never says visible as what. Live alternatives: **(a) the player's own saved Roblox
avatar — my recommendation and this sheet's ruling**, free, keeps a cosmetic surface alive, costs
mobile instance budget and all control over how the world's population looks; **(b) a global
override to a provided character**, which buys the only wordless channel for the role and a uniform
mobile cost, and pays for it with an unfunded wave-4 art asset plus the permanent loss of the
cosmetic SKU class. If you want the role to be *seen*, (b) is the only way and it needs funding
before wave 4.

**2. A fact correction that would have propagated.** My tasking described the brief's monetization
stance as *"cosmetics only"*. `03-META.md` says **"Permanent multipliers only. Never content
access"** and records cosmetics-only as **offered and declined**. The two readings point the same
way here — both make the avatar the thing that matters — but a wave-3 agent inheriting "the stance
is cosmetics only" would build an SKU ladder the brief forbids. Noted, not corrected: I do not edit
other files.

**3. My own domain index is stale about the contract, in a way that favours this sheet.** The index
recorded ten keys and *"no key is owned by `theme/*`"*. The current `SCHEMA` has **eleven**, and one
of them is `vocabulary`, owner `theme/vocabulary`, holding `bannedWords`, `maxLabelChars` and
`register` — machine-checked against every player-facing string.
`[research: bridge/schema.mjs — file read this run]` So a **writer-facing** rule now has a real
enforcement path into the build, which is precisely the ruling above. A player-facing role still has
none.

**4. Relic flavour text remains unbuildable as specified.** The binding in-session decision
(*"Humor lives only in relic flavour text"*) presupposes a field that exists in no sheet and no
contract key; `collection.sets[].relics[]` holds names only. Others have flagged it; recorded once
here because my conditional depends on it and because, if the field is never created, the game ships
with the single named home for humor absent entirely.
