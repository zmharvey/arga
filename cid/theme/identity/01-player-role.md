# 01 — Player role

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

The player is a **finder**: a person with no claim on the ruin, no office in it, no training
for it and no errand, who clears overgrowth because it is in front of them and keeps what the
clearing uncovers. The ruin is never theirs; each Find is theirs from the moment it surfaces.

Their relation to whoever left the Finds is **none, in both directions.** Not descended from
them, not sent by them, not permitted by them, owed nothing and owing nothing. The two parties
share objects and nothing else — no blood, no mandate, no message.

The role is **static and non-exclusive**: identical at minute one and at hour ten, and
simultaneously true of every player on a server of the assumed 12–20 `[brief: soft]`
`[I assumed — OPEN.md §5 #4]`, because it names no ordinal, no rank, no office and no
permission.

**Identity owns no build-contract key.** `bridge/schema.mjs` holds eleven keys and not one
describes a role, persona, character or faction, so this sheet carries no `manifest` block and
that is correct rather than an omission. `[research: repo — bridge/schema.mjs, read this run]`

## Why

**Every substantive line above is `[cid: decided]`, and that is the most important thing about
this sheet.** `OPEN.md §1` has no audit row for player role. The subject appears twice as a
left-open line (*"Left open — ... **who the player is**"*, `01-FOUNDATION.md`, repeated in
`OPEN.md §4`) and nowhere as a question: 22 questions across 6 rounds, zero on this. A later
revision should know these rulings were unanchored, not derived.

**No claim, no office, no training, no errand — because each named alternative imports
something the brief forbids.** I tested the four the domain index listed:

| alternative | what it imports |
|---|---|
| heir · descendant · returning inheritor | Unique per player, so it breaks on *"Shared server ... visible to each other"* `[brief: soft]` `[you accepted: R6 Q2]`; and it needs a named line, which is a cast that priority 1 funds no model for `[brief: soft]` `[I assumed — the ordering]` |
| custodian · caretaker · keeper of the place | A duty is owed to somebody, and nobody exists to owe it to — history work has already ruled *"nobody is coming back, nobody is watching, nobody wants anything from the player"* (`cid/theme/lore/01-the-past.md`, L6). A duty also means something is lost if the work stops, which is tension: *"Do not invent tension to fill the gap"* (`HANDOFF.md`) `[brief: soft, elevated]` |
| archaeologist · surveyor · expert | Expertise is mastery in another coat, against *"**No mastery layer.** ... **Stated so nobody invents one.**"* (`03-META.md`) `[brief: soft]` `[I assumed]`. A profession also implies an institution that sent you, which is a cast |
| hero · chosen · the one who reclaims it | *"Not spooky, not grim, **not a power fantasy**"* (`01-FOUNDATION.md`) `[brief: soft]`, and it is a uniqueness claim on a shared server |

What survives is a person with no standing. **That is not a residue, it is the warmest option
available:** somebody doing unhurried work nobody asked for is *"warm, aged, unhurried"*
(`01-FOUNDATION.md`) `[brief: soft]` with no machinery attached, and it is graspable at eight
without a word of exposition — you clean up an old place and you keep what you find.

**Keeping what is uncovered is the brief's own line, not an invention.** *"the clearing *is* the
revealing — what you uncover is what you keep"* (`CONCEPT.md`), *"revealed objects enter the
permanent collection"* (`01-FOUNDATION.md`), audience *"motivated by **collection**, relaxation,
completion"* `[brief: binding]` `[you chose: R1 Q4]`. Possession of a Find is collection, which
is a stated motivation, not power.

**Never owning the place is the load-bearing half.** It settles the possessive question from the
identity side without touching world scale: *"own areas"* and *"what you keep"* pull one way,
*"Everyone occupies one world"* (`02-GAMEPLAY.md`) `[brief: soft]` the other. Under this ruling
nobody owns the ruin, so many people clearing it at once needs no explanation and no player's
claim can collide with another's. Scale itself stays with world-scale work `[cid: decided]`.

**Static, because the brief removed both axes a role could change along.** *"not a power
fantasy"* removes growing strong; *"No mastery layer"* removes getting good; *"**No rebirth.**
... Reframing it as 'seasons' and making it optional were both declined"* (`01-FOUNDATION.md`)
`[brief: binding]` `[you chose: R2 Q2]` removes becoming-again. What is left to change is the
ground and the collection, not the person `[cid: decided]`.

**The relation is ruled at zero, and it holds under either history.** History work ruled that
people worked here, ordinarily, and left — plural, unnamed, finished — and told this domain the
player is *"not a descendant, an heir, a hired archaeologist, or someone the builders left
instructions for. Nobody is waiting."* `[research: repo — cid/theme/lore/01-the-past.md, read
this run]` This sheet ratifies that and adds the reciprocal it did not state: **the player owes
them nothing either.** No reporting, no honouring, no putting anything back where it was found.
Zero is the one answer stable under a named people, an unnamed people, and silence, so a later
revision on the makers does not reach this sheet.

**Legible with no words, which is what a no-text onboarding demands.** *"**Clear → reveal inside
the first ten seconds.** ... No text, no tutorial"* (`02-GAMEPLAY.md`) `[brief: soft]`
`[you accepted: R6 Q3]`. Three facts already in the design carry the whole role: nothing in the
world addresses the player; the thing they uncover enters their own permanent collection; the
ground they cleared stays clear and nobody takes it, grants it, or thanks them for it. From
those three, *nobody sent me and this is mine to find* is the available conclusion `[cid:
decided]`.

**The restoration positioning survives intact.** *"a **restoration game**, not an incremental"*
`[brief: binding]` `[you chose: R4 Q2]` describes what happens to the place, not an obligation
on the person — and the brief itself refuses to make restoration the errand: *"Pure 'restore the
ruin' was declined for underselling the collection"* (`05-OUTWARD.md`) `[brief: soft]`. History
work has already limited *"restored"* to exposure rather than repair.

**One correction to the record, because it gives this sheet teeth it was told it lacked.** Three
domain indexes in this category state that no contract key is owned by `theme/*`. That is now
stale: `SCHEMA` has an eleventh key, `vocabulary`, owner `theme/vocabulary`, holding
`bannedWords`, `maxLabelChars` and `register` — and `crossCuttingProblems` tests every
player-facing string against every banned word with a case-insensitive `\bword\b` regex, raising
a merge problem on a hit. `[research: repo — bridge/schema.mjs:116-133 and :430-450, read this
run]` So a role stated as a word exclusion **is** machine-enforceable, through a key naming work
owns. That is the route criterion 1 uses.

## Consequences for other work

- **Naming work** *(currently Vocabulary Lead, this wave, last writer, owner of the `vocabulary`
  key)*: `finder` is coined here — lowercase, **internal, never a player-facing string.** It must
  enter the canonical list marked internal, and it must never be rendered, because one word away
  sits `Find`, the live `collection.className`, and a rendered *finder* would read as a UI label.
  Second item, offered not imposed: the eleven role words in criterion 1 are ready for
  `vocabulary.bannedWords`, each needing a `word` and a `reason`, plus a separate plural entry
  each because the check is word-boundary exact. None duplicates history work's L1, L3 or L5
  lists. **`keeper` is deliberately absent** from the ban request: it is forbidden *of the player*
  but a water-keeper is a plausible past trade, and the ban list cannot tell the two apart. That
  half of this ruling has no machine route and is prose only — stated rather than hidden.
- **Fantasy work** *(currently Fantasy Lead, this wave)*: three things. **(a)** No register may
  attach an obligation to the player; a custodial register is admissible if it means the place is
  not owned, not if it means the player is answerable. **(b)** Identity is invariant, so whatever
  trajectory sheet `01-fantasy-of-record` fixes must be expressed in the state of the ground and
  the fullness of the collection, never as a change in who the player is. **(c)** Its gap 6 (*"is
  the promise possessive"*) is answered from one side here: the place is never owned, a Find is
  owned from the moment it surfaces.
- **Sheet `02 · role-legibility` in this domain**: it inherits a role that asserts nothing about a
  body, no uniform, no prop, no badge and no held tool, so avatar-agnosticism is available to it
  at zero cost. It also inherits a role whose three delivery facts already exist in the design, so
  it may honestly conclude that no new surface is owed.
- **Sheet `03 · co-present-stranger` in this domain**: the role is non-exclusive and unranked, so
  *"the same role elsewhere"* is available with no explanation and no interaction required. Sheet
  03 may not make a stranger a different kind of person, an authority, or a claimant.
- **Sheet `04 · no-cast-declaration` in this domain**: the relation ruling removes the last
  standing reason to want an NPC. Nobody needs to grant permission, hand out an errand, or receive
  a report. It may cite this rather than re-arguing it.
- **History work** *(currently Lore Lead, this wave)*: one thing is now forbidden that L1–L6 do
  not forbid — a past that leaves the player a task. No message left for whoever comes, no
  unfinished job someone expected finishing, no *"left for you"* in any art prompt. That would
  make the past a claim on the player, which this sheet rules at zero.
- **Set-content work** *(wave 3)* and **object work** *(wave 4)*: no Find may be a personal name, a
  title of office, or an object addressed to a recipient — no dedication, no plaque bearing a
  name, no letter. Note that `Crest` in `cid/gameplay/meta/02-the-collection.md` is the existing
  name closest to implying a house; it survives unchanged, because the player is unaffiliated with
  any house.
- **World-scale work** *(currently Setting Lead, this wave)*: its `02-extent` sheet gets cover for
  the one-world-versus-own-areas line at no cost — nobody owns the ruin, so co-presence needs no
  world rule. It may cite this instead of inventing one.
- **Price-and-SKU work** *(wave 3)*: no SKU may sell a title, a standing, an office, or access
  framed as authorization, because the role contains none of those to upgrade.
- **Character-and-avatar work** *(wave 4, unfunded at priority 1)*: the role is not visually
  distinct and must not be made so. No costume, insignia or silhouette may be asked to carry it.

## Acceptance criteria

1. **Role-word check.** These eleven words appear zero times, case-insensitive and
   word-boundary matched, inside any `manifest` block under `cid/`: `hero`, `chosen`, `heir`,
   `descendant`, `master`, `expert`, `owner`, `guardian`, `warden`, `custodian`, `caretaker`.
   Verified at 0 matches across all `cid/**/*.md` manifest blocks as written. If naming work adds
   them to `vocabulary.bannedWords`, `npm run bridge` reports zero new problems.
2. **Simultaneity check.** The `## Decision` section contains zero occurrences of `first`,
   `only`, `last`, `chosen`, `best`, `master` — so the role states no ordinal, office or
   permission and is true of 12–20 players at once.
3. **Cast check.** This sheet coins exactly 1 term (`finder`), names 0 persons, peoples,
   factions, groups or creatures, and contains 0 `manifest` blocks.
4. **Find-name check**, against `cid/gameplay/meta/02-the-collection.md`: 0 of the 24 Find names
   is a personal name, a title of office, or an object addressed to a recipient. The current 24
   pass at 0. A later revision adding one requires revising this sheet.

## Not decided here

Whether the role is ever communicated to the player, through which channel, and whether it must
survive an arbitrary saved Roblox avatar (sheet `02` in this domain). What a co-present stranger
is (sheet `03`) and what one may *do* (presence-sufficiency work, wave 2). Which entity classes
do not exist (sheet `04`). The register the role runs along and what the player becomes over a
long play (fantasy work, this wave). The ruin's history, era and the makers' trades (history
work, already ruled in `cid/theme/lore/01-the-past.md`). One ruin or many (world-scale work).
Whether `finder` is kept, renamed, or held internal in the canonical list (naming work). Any
visual expression of the role (character-and-avatar work, wave 4).

## Flagged to the developer

**This whole sheet answers a question the brief never asked**, and the domain index asked that
you see it before wave 2 builds on it. Two alternatives were genuinely live:

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Custodian of the place** — the player holds the ruin in trust and clears it as an obligation | A trust is owed to a party, and no party exists; and an obligation means something is lost if the player stops, which is the tension the handoff forbids by name | Cheap in this sheet, expensive next door: it reopens history work's L6 and hands presence-sufficiency work a duty to model |
| **Archaeologist recording a site** — the player is a specialist filling a catalogue | Expertise is the mastery layer the brief says nobody should invent, and a specialist is employed by an institution nobody funds a model for | Cheap: swap the noun and the stance, keep the relation at zero. The collection-as-index register would then need fantasy work's ratification |

**My recommendation is the sheet as written**, on one argument: it is the option that costs no
model, no surface, no contract key and no tension, and it is the only one of the four that is
still true when twenty strangers are standing in the same ruin. **The judgment call I would most
like a ruling on** is narrower than the role: whether the player may ever be called anything at
all in player-facing text. My answer is no, and `finder` stays a word for writers.
