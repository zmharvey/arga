# 02 — Role legibility and the player's body

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The role is writer-facing only.** It is never communicated to the player through any channel: zero
on-screen words, zero audio, zero art, zero avatar treatment. It exists to keep downstream writing
coherent and to give any string a test it can fail.

**The player wears their own saved Roblox avatar, unmodified. No global override, no provided
character, no uniform, no granted accessory.** The role must survive being worn by any body a player
already owns.

**Data form: an `amends` against `characterArt`** (owner `art/characters`, proposed). That key
already carries `avatarSource`, `appearanceWritesOnCharacter` and a four-entry `zeros` list whose
first entry names this sheet as `ruledBy`. A second key for the same body would be a second source of
truth. `[research: repo — cid/art/characters/01-the-unmodified-body.md, read this run]`

## Why

**Every channel that could deliver the role is already closed, and I closed the last one myself.**

| channel | verdict | on what authority |
|---|---|---|
| on-screen prose | closed | `upgrades[].blurb` is the **only** free-prose player-facing field in the whole contract — exempt from `maxLabelChars`, still ban-checked — and there are three of them, each owing an 8-year-old on a phone an explanation of what an upgrade does. `[research: repo — bridge/schema.mjs, `playerFacingStrings` and `crossCuttingProblems`, read this run]` |
| onboarding | closed | *"Clear → reveal inside the first ten seconds ... **No text, no tutorial**"* `[brief: soft]` `[you accepted: R6 Q3]` |
| screens | closed | the list is `collection-index`, `upgrades`, `areas`, `shop`; no lore, journal or profile surface `[brief: soft]` |
| audio | closed | *"Music sparse and low"*, no voice anywhere `[brief: soft]` (`OPEN.md §2`) |
| an NPC saying it | closed | the entire roster is *"~24 objects in 4 sets of 6"* `[brief: soft]`; nothing to speak with. Hardened since by `characterArt.zeros.entityClass` at 0 |
| Find flavour text | conditional, and it stays closed | the field is presupposed by the binding humor decision, established by no sheet, and `collection.sets[].relics[]` carries names only. My conditional below keeps the role out of it even if it appears |
| **the body** | **closed by me, with a price** | a provided character is the one channel that could state a role with zero words, which is exactly why this is one decision and not two. Declined below |

**So the honest result is that the role reaches the player through no channel at all.** Its function
is real but internal: `vocabulary.register` ships a stance (*"plain concrete nouns ... no ornament"*)
and a stance with no owner drifts. Writer-facing is not "unused"; it is "used by writers".

**Why the body is the player's own, in cost order.**

1. **A provided character is unfunded content.** *"Target: the smallest game that still gives every
   creative area real work"* and the category gate *"no domain may invent fiction that requires
   content the priority list does not fund"* `[brief: binding]` `[you chose: R1 Q3]`. Priority 1 is
   six systems and no character work `[brief: soft]` `[I assumed — the ordering]`. An override is
   technically trivial — Studio's Avatar Settings *"apply globally to all player character models
   joining your game"*, with per-spawn `LoadCharacterWithHumanoidDescription` / `ApplyDescription`
   `[research: relayed from cid/theme/identity/_lead.md — creator-docs `characters/appearance.md`]`
   — so this is a cost decision, not a platform one. The cost lands in an art slot nothing funds.
2. **A provided character costs the premium SKU its last legal home.** The brief flags *"the premium
   SKU has no home"* in three places. The stance is *"Permanent multipliers only. Never content
   access"* and *"Cosmetics-only was offered and declined **as needing a display system first**"*
   `[brief: soft]` `[you accepted: R5 Q4]`. The player's own avatar **is** that display system, at
   zero cost. Replacing it with a fixed character would permanently remove the only SKU class that is
   neither a multiplier nor forbidden content access.
3. **Not a power fantasy.** *"Not spooky, not grim, **not a power fantasy**"* `[brief: soft]`. A
   game-issued uniform is a rank; the default Roblox body is not.
4. **The absence of a body-arc is consistent with the payoff.** The before/after lives in the ground
   and the collection. A body that never changes cannot compete with it for the eye.

**What it costs, stated rather than buried.** Arbitrary player avatars are the more expensive option
on a ~70% mobile audience at 12–20 players per server — layered clothing and accessories on 20
unknown bodies are instance cost the brief already names as a watch item. The world's visual
population becomes uncontrollable, so **no fiction anywhere may depend on what a person looks like.**

**One `[unverified]` this sheet carried is now closed.** It warned that a clear radius derived from a
character bounding box would hand the tallest avatar a free permanent upgrade, and marked *"that
avatar scale varies"* as inference. `characterArt.avatarScale` settles it: Avatar Settings offers a
Custom Scale band against reference heights of ~5 studs classic and ~6 to 6.5 humanoid, no bound is
applied, and **bodies do differ** `[research: repo — cid/art/characters/01-the-unmodified-body.md,
read this run]`. The requirement stands and is now evidenced rather than inferred.

```json
{
  "amends": "characterArt",
  "requested_by": "cid/theme/identity/02-role-legibility.md",
  "why": "this sheet is the ruling characterArt already cites as ruledBy on its first zero; its decisions belong in that key, not a new one",
  "ratifies": {
    "avatarSource": "playerOwnSavedRobloxAvatar",
    "appearanceWritesOnCharacter": 0,
    "requiredArtAssets": 0,
    "zeros.appearanceOverride.count": 0,
    "avatarScale.customScaleApplied": false,
    "correctionAccepted": "characterArt is right that 'zero writes on a character' is false against the shipped build; the assertion is zero APPEARANCE writes, and this sheet adopts that wording"
  },
  "roleDelivery": {
    "playerFacing": false,
    "channelsEnumerated": 7,
    "channelsOpen": 0,
    "channels": [
      { "channel": "onScreenProse", "open": false, "because": "upgrades[].blurb is the only free-prose player-facing field and there are three of them" },
      { "channel": "onboarding", "open": false, "because": "no text, no tutorial" },
      { "channel": "screens", "open": false, "because": "no lore, journal or profile surface exists" },
      { "channel": "audio", "open": false, "because": "music sparse and low, no voice" },
      { "channel": "npcSpeech", "open": false, "because": "characterArt.zeros.entityClass is 0" },
      { "channel": "findFlavourText", "open": false, "because": "the field does not exist, and if it ever does the role stays out of it" },
      { "channel": "theBody", "open": false, "because": "the avatar is the player's own and the game does not dress it" }
    ],
    "newPlayerFacingStringsRequested": 0,
    "newScreensRequested": 0,
    "newContractKeysRequested": 0,
    "consequence": "the role is unfalsifiable by players, so a wrong role fails silently. That argues for keeping it short, not for keeping it vague."
  },
  "avatarOverrideDecision": {
    "taken": "playerOwnSavedRobloxAvatar",
    "tag": "cid: decided",
    "alternativeDeclined": "a global override to a provided character",
    "boughtByTheAlternative": ["the one wordless channel for the role", "a uniform mobile instance cost"],
    "paidForBy": ["an unfunded character art asset", "the permanent loss of the cosmetic SKU class"],
    "reopensIf": "a developer funds character art and accepts the loss of the cosmetic surface"
  },
  "requiresOfMovement": {
    "field": "movement.baseClearRadius",
    "requirement": "a fixed scalar, never derived from the character's size or bounding box",
    "because": "player-chosen bodies differ in height and width, so a radius taken from a bounding box hands the tallest avatar a free permanent upgrade and hands the server an economy it cannot validate",
    "evidence": "characterArt.avatarScale.referenceHeightsStuds - classic 5.0, humanoid proportions 6.0 to 6.5",
    "valueOwner": "gameplay/mechanics; this sheet sets no value",
    "shipped": { "baseClearRadius": 5.5, "isScalar": true, "satisfied": true }
  },
  "requiresOfVocabulary": {
    "rule": "no upgrades[].blurb contains a first-person pronoun",
    "pronouns": ["I", "me", "my", "we", "us", "our"],
    "expect": 0,
    "because": "a first-person blurb ventriloquises the player and makes the role legible through the one prose field in the contract, which flips this sheet",
    "shipped": { "blurbs": ["Each patch pays more", "Clear a wider sweep as you walk", "Move faster between patches"], "firstPersonPronounCount": 0 },
    "alsoForbidden": ["a role noun in a blurb", "any address that assigns the player a station"],
    "secondPersonPermitted": true,
    "enforcementRoute": "not proposed as bannedWords entries - banning 'our' or 'us' globally would catch legitimate copy. Stated as a rule against one field, checked by criterion 2."
  },
  "requiresOfFlavourTextIfItEverExists": {
    "grammaticalPerson": "third",
    "firstPersonForbidden": true,
    "because": "a first-person catalogue entry makes the role legible with no new surface and would flip this sheet",
    "registerAndHumorRemain": "theme/tone's"
  }
}
```

## Consequences for other work

- **Proximity-clearing work (owner of `movement`) and server-validation work:** the clear radius must
  be a fixed value, never derived from the character's size. `movement.baseClearRadius` is already a
  scalar; the requirement is that it stay the only source. The value is not mine.
- **Screen-inventory and on-screen-copy work: Identity requires no surface from you.** This is the
  sheet the index expected to be refused fatally, and it now cannot be: it asks for nothing. Do not
  build a lore, profile, journal or role surface on Theme's behalf.
- **Upgrade-copy work (owner of `upgrades[].blurb`): the three blurbs may not name, title, or
  ventriloquise the player.** No first-person pronouns, no role noun, no address that assigns the
  player a station. They describe what the upgrade does. Second person is fine; *"Clear a wider sweep
  as you walk"* passes.
- **Voice work, and whoever authors flavour text if the field ever exists: third person, never
  first.** Register and humor level remain Tone's; I constrain grammatical person only.
- **The player-role sheet (`01`, same domain): the role must survive any avatar.** It may not assume
  species, size, era-appropriate dress, humanity, or a body at all. It also may not require delivery,
  because there is none — **and it is unfalsifiable by players**, so a wrong role fails silently.
- **Fantasy work: "what the player becomes" cannot be read off the character.** The body never
  changes and is not ours. Any arc must be legible in cleared ground and in the collection.
- **Nameplate work — my decision changes nothing, and that is the useful part.** A name shows above
  every head by default and comes from the account, not the body, so it is **invariant under this
  sheet**: a provided character would have shown the same proper nouns. Sheet `03` is therefore
  neither blocked nor pre-empted by me.
- **Avatar-treatment work (`characterArt`):** the block above is additive to a key you own. The rig
  requirement, the health-bar route and the person-not-a-prop channels are yours and I do not
  restate them.
- **Premium-SKU work: the avatar is a display surface you now have for free, and the fiction places
  zero constraints on what can be worn.** I am not reopening the multipliers-only stance, but one of
  its two stated grounds for declining cosmetics ("needing a display system first") no longer
  applies.
- **Canonical-term work: nothing to collect.** This sheet coins no proper noun and no player-facing
  string.

## Acceptance criteria

1. **This sheet contributes zero entries to the canonical term list**, requests **0** new
   player-facing strings, **0** screens and **0** contract keys.
2. **The role term named in `01-player-role.md` appears 0 times** across every string returned by
   `playerFacingStrings(manifest)` and 0 times in any on-screen copy string in the shipped build; and
   every `upgrades[].blurb` contains **0** first-person pronouns (`I`, `me`, `my`, `we`, `us`,
   `our`). **Verified 0 across the three shipped blurbs.**
3. **The shipped build contains 0 avatar overrides**: 0 occurrences of `HumanoidDescription`,
   `ApplyDescription`, `LoadCharacterWithHumanoidDescription`, `StarterCharacter`, `BodyColors`,
   `Shirt` or `Pants` in emitted Luau; no `StarterPlayer` or Avatar-Settings appearance override in
   the Rojo project; and no module whose responsibility includes replacing or dressing the player
   character.
4. **This decision requires 0 player-character art assets** (model, mesh, texture, uniform,
   accessory) from any wave, and `characterArt.requiredArtAssets` reads `0`.

## Not decided here

Who the player is (`01`, same domain). What a co-present stranger is, and the nameplate ruling itself
(`03`, same domain). Which entity classes are excluded (`04`). Whether a per-Find flavour-text field
exists (screen-inventory work, then contract-schema work). The register and humor level of any prose
(Tone). Any visual treatment of the avatar beyond "do not override it" (`characterArt`, my
`does_not_own`) — including the rig requirement, the health-bar route and avatar scale, all of which
that key rules. Whether a cosmetic SKU exists (Monetization, plus the developer). The clear-radius
value (`movement`); I stated only that it must not come from the body.

## Flagged to the developer

**1. The avatar question had zero interview coverage and I decided it.** `OPEN.md §1` has no audit
row; `04-PRESENTATION.md` has no avatar line; `02-GAMEPLAY.md` says players are *"visible to each
other"* and never says visible as what. Live alternatives: **(a) the player's own saved Roblox avatar
— my recommendation and this sheet's ruling**, free, keeps a cosmetic surface alive, costs mobile
instance budget and all control over how the world's population looks; **(b) a global override to a
provided character**, which buys the only wordless channel for the role and a uniform mobile cost,
and pays for it with an unfunded art asset plus the permanent loss of the cosmetic SKU class. If you
want the role to be *seen*, (b) is the only way and it needs funding.

**2. A fact correction that would have propagated.** My tasking described the brief's monetization
stance as *"cosmetics only"*. `03-META.md` says **"Permanent multipliers only. Never content access"**
and records cosmetics-only as **offered and declined**. Both readings point the same way here, but an
agent inheriting "the stance is cosmetics only" would build an SKU ladder the brief forbids.

**3. Find flavour text remains unbuildable as specified.** The binding in-session decision (*"Humor
lives only in relic flavour text"*) presupposes a field that exists in no sheet and no contract key;
`collection.sets[].relics[]` holds names only. Recorded because my conditional depends on it, and
because if the field is never created the game ships with the single named home for humor absent.
