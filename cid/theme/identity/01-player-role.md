# 01 — Player role

**Domain:** Identity · **Category:** Theme & Narrative · **Wave:** 1

## Decision

The player is a **finder**: a person with no claim on the ruin, no office in it, no training for it
and no errand, who clears overgrowth because it is in front of them and keeps what the clearing
uncovers. The ruin is never theirs; each Find is theirs from the moment it surfaces.

Their relation to whoever left the Finds is **none, in both directions.** Not descended from them,
not sent by them, not permitted by them, owed nothing and owing nothing. The two parties share
objects and nothing else — no blood, no mandate, no message.

The role is **static and non-exclusive**: identical at minute one and at hour ten, and simultaneously
true of every player on a server of 12 to 20 `[brief: soft]` `[I assumed — OPEN.md §5 #4]`, because
it names no ordinal, no rank, no office and no permission.

**Data form: an `amends` against `vocabulary`** (owner `theme/vocabulary`). The role is
writer-facing by sheet `02`'s ruling, so it has no runtime value — but a role stated as a word
exclusion **is** machine-enforceable, because `crossCuttingProblems` tests every player-facing string
against every `vocabulary.bannedWords` entry with a case-insensitive `\bword\b` regex and raises a
merge problem on a hit. `[research: repo — bridge/schema.mjs, read this run]` That is the route
criterion 1 uses, and the block below is that route stated as data.

## Why

**Every substantive line above is `[cid: decided]`, and that is the most important thing about this
sheet.** `OPEN.md §1` has no audit row for player role. The subject appears twice as a left-open line
(*"Left open — ... **who the player is**"*) and nowhere as a question: 22 questions across 6 rounds,
zero on this. A later revision should know these rulings were unanchored, not derived.

**No claim, no office, no training, no errand — because each named alternative imports something the
brief forbids.**

| alternative | what it imports |
|---|---|
| heir · descendant · returning inheritor | Unique per player, so it breaks on *"Shared server ... visible to each other"* `[brief: soft]` `[you accepted: R6 Q2]`; and it needs a named line, which is a cast that priority 1 funds no model for |
| custodian · caretaker · keeper of the place | A duty is owed to somebody, and nobody exists to owe it to — history work ruled *"nobody is coming back, nobody is watching, nobody wants anything from the player"* (`cid/theme/lore/01-the-past.md`, L6). A duty also means something is lost if the work stops, which is tension: *"Do not invent tension to fill the gap"* `[brief: soft, elevated]` |
| archaeologist · surveyor · expert | Expertise is mastery in another coat, against *"**No mastery layer.** ... **Stated so nobody invents one.**"* `[brief: soft]` `[I assumed]`. A profession also implies an institution that sent you, which is a cast |
| hero · chosen · the one who reclaims it | *"Not spooky, not grim, **not a power fantasy**"* `[brief: soft]`, and it is a uniqueness claim on a shared server |

What survives is a person with no standing. **That is not a residue, it is the warmest option
available:** somebody doing unhurried work nobody asked for is *"warm, aged, unhurried"*
`[brief: soft]` with no machinery attached, and it is graspable at eight without a word of
exposition — you clean up an old place and you keep what you find.

**Keeping what is uncovered is the brief's own line, not an invention.** *"the clearing *is* the
revealing — what you uncover is what you keep"* (`CONCEPT.md`), and audience *"motivated by
**collection**, relaxation, completion"* `[brief: binding]` `[you chose: R1 Q4]`. Possession of a
Find is collection, which is a stated motivation, not power.

**Never owning the place is the load-bearing half.** It settles the possessive question from the
identity side without touching world scale: *"own areas"* and *"what you keep"* pull one way,
*"Everyone occupies one world"* `[brief: soft]` the other. Under this ruling nobody owns the ruin, so
many people clearing it at once needs no explanation and no player's claim can collide with
another's. Scale itself stays with world-scale work `[cid: decided]`.

**Static, because the brief removed both axes a role could change along.** *"not a power fantasy"*
removes growing strong; *"No mastery layer"* removes getting good; *"**No rebirth.** ... Reframing it
as 'seasons' and making it optional were both declined"* `[brief: binding]` `[you chose: R2 Q2]`
removes becoming-again. What is left to change is the ground and the collection, not the person
`[cid: decided]`.

**The relation is ruled at zero, and it holds under either history.** History work ruled that people
worked here, ordinarily, and left — plural, unnamed, finished — and told this domain the player is
*"not a descendant, an heir, a hired archaeologist, or someone the builders left instructions for.
Nobody is waiting."* `[research: repo — cid/theme/lore/01-the-past.md, read this run]` This sheet
ratifies that and adds the reciprocal: **the player owes them nothing either.** No reporting, no
honouring, no putting anything back where it was found. Zero is the one answer stable under a named
people, an unnamed people, and silence, so a later revision on the makers does not reach this sheet.

**Legible with no words, which is what a no-text onboarding demands.** *"**Clear → reveal inside the
first ten seconds.** ... No text, no tutorial"* `[brief: soft]` `[you accepted: R6 Q3]`. Three facts
already in the design carry the whole role: nothing in the world addresses the player; the thing they
uncover enters their own permanent collection; the ground they cleared stays clear and nobody takes
it, grants it, or thanks them for it. From those three, *nobody sent me and this is mine to find* is
the available conclusion `[cid: decided]`.

**The restoration positioning survives intact.** *"a **restoration game**, not an incremental"*
`[brief: binding]` `[you chose: R4 Q2]` describes what happens to the place, not an obligation on the
person — and the brief itself refuses to make restoration the errand: *"Pure 'restore the ruin' was
declined for underselling the collection"* `[brief: soft]`.

**`finder` is already collected, and the amendment does not re-request it.**
`cid/theme/vocabulary/03-term-register.md` carries
`{ "word": "finder", "kind": "writers-handle", "renderable": false, "coinedBy":
"cid/theme/identity/01-player-role.md" }` `[research: repo — read this run]`. The block below
ratifies that entry and adds only the exclusions.

**Where `keeper` is, and why it is not in the block.** It is forbidden *of the player* and a
water-keeper is a plausible past trade; a word-boundary ban cannot tell the two apart. That half of
this ruling has no machine route and is prose only — stated rather than hidden.

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/identity/01-player-role.md",
  "why": "the role is writer-facing and has no runtime value; its one machine-enforceable half is that no player-facing string may name the player a rank, an office, a claim or a uniqueness",
  "ratifiesExistingEntries": [
    { "term": "finder", "in": "the canonical term list, kind writers-handle, renderable false", "because": "this sheet coined it and sheet 02 rules it never rendered; nothing is re-requested" }
  ],
  "bannedWordsRequested": [
    { "word": "hero",        "reason": "a uniqueness claim, and a power-fantasy role the brief rules out by name" },
    { "word": "heroes",      "reason": "plural of a banned word; the check is word-boundary exact" },
    { "word": "chosen",      "reason": "a permission granted by somebody, and there is nobody to grant it; also false of 11 of 12 players at once" },
    { "word": "heir",        "reason": "a claim on the ruin; the player never owns the place" },
    { "word": "heirs",       "reason": "plural of a banned word" },
    { "word": "descendant",  "reason": "a relation to the makers, which this sheet rules at zero in both directions" },
    { "word": "descendants", "reason": "plural of a banned word" },
    { "word": "master",      "reason": "mastery in a noun; 'no mastery layer' is stated so nobody invents one" },
    { "word": "masters",     "reason": "plural of a banned word" },
    { "word": "expert",      "reason": "expertise implies a skill acquired and an institution that trained it; neither exists" },
    { "word": "experts",     "reason": "plural of a banned word" },
    { "word": "owner",       "reason": "the ruin is never the player's; possession is bounded to a Find" },
    { "word": "owners",      "reason": "plural of a banned word" },
    { "word": "guardian",    "reason": "an office with a duty owed to somebody, and nobody exists to owe it to" },
    { "word": "guardians",   "reason": "plural of a banned word" },
    { "word": "warden",      "reason": "an office and an authority over a place the player has no claim on" },
    { "word": "wardens",     "reason": "plural of a banned word" },
    { "word": "custodian",   "reason": "a trust held for a party; no party exists, and a trust means something is lost if the work stops, which is tension" },
    { "word": "custodians",  "reason": "plural of a banned word" },
    { "word": "caretaker",   "reason": "same as custodian, and it imports upkeep, which permanence forbids" },
    { "word": "caretakers",  "reason": "plural of a banned word" }
  ],
  "deliberatelyNotRequested": [
    { "word": "keeper", "why": "forbidden of the player, but a water-keeper is a plausible past trade and a word-boundary ban cannot tell the two apart. Prose-only, and stated rather than hidden." }
  ],
  "disjointFrom": [
    "cid/theme/vocabulary/02-banned-words.md's 8 shipped entries",
    "cid/theme/lore/01-the-past.md L1/L3/L5",
    "cid/theme/identity/04-no-cast-declaration.md's request (pet, companion, minion, mascot)",
    "cid/theme/fantasy/01-fantasy-of-record.md's 7 irreversibility words",
    "cid/theme/fantasy/03-inhabiting.md's 8 deferral words"
  ],
  "shippedPlayerFacingStringsAtRisk": 0,
  "roleFacts": {
    "term": "finder",
    "playerFacing": false,
    "unique": false,
    "ordinal": "none",
    "office": "none",
    "permission": "none",
    "trueSimultaneouslyForPlayers": [12, 20],
    "changesOverTime": false,
    "relationToTheMakers": "none, in both directions",
    "ownsTheRuin": false,
    "ownsAFindFromTheMomentItSurfaces": true
  }
}
```

## Consequences for other work

- **Naming work** *(owner of the `vocabulary` key)*: `finder` is coined here — lowercase,
  **internal, never a player-facing string.** It must stay in the canonical list marked internal and
  must never be rendered, because one word away sits `Find`, the live `collection.className`. Second
  item, offered not imposed: the 21 exclusion entries in the block, each with a word and a reason.
- **Fantasy work** *(this category)*: three things. **(a)** No register may attach an obligation to
  the player; a custodial register is admissible if it means the place is not owned, not if it means
  the player is answerable. **(b)** Identity is invariant, so whatever trajectory the fantasy fixes
  must be expressed in the state of the ground and the fullness of the collection, never as a change
  in who the player is. **(c)** *"Is the promise possessive"* is answered from one side here: the
  place is never owned, a Find is owned from the moment it surfaces.
- **Sheet `02` in this domain**: it inherits a role that asserts nothing about a body, no uniform, no
  prop, no badge and no held tool, so avatar-agnosticism is available at zero cost.
- **Sheet `03` in this domain**: the role is non-exclusive and unranked, so *"the same role
  elsewhere"* is available with no explanation. Sheet `03` may not make a stranger a different kind
  of person, an authority, or a claimant.
- **Sheet `04` in this domain**: the relation ruling removes the last standing reason to want an NPC.
  Nobody needs to grant permission, hand out an errand, or receive a report.
- **History work**: one thing is now forbidden that `L1`–`L6` do not forbid — a past that leaves the
  player a task. No message left for whoever comes, no unfinished job someone expected finishing, no
  *"left for you"* in any art prompt.
- **Set-content work and object work**: no Find may be a personal name, a title of office, or an
  object addressed to a recipient — no dedication, no plaque bearing a name, no letter. `Crest` is
  the existing name closest to implying a house; it survives unchanged, because the player is
  unaffiliated with any house.
- **World-scale work**: the one-world-versus-own-areas line gets cover at no cost — nobody owns the
  ruin, so co-presence needs no world rule.
- **Price-and-SKU work**: no SKU may sell a title, a standing, an office, or access framed as
  authorization, because the role contains none of those to upgrade.
- **Character-and-avatar work**: the role is not visually distinct and must not be made so. No
  costume, insignia or silhouette may be asked to carry it.

## Acceptance criteria

1. **Role-word check.** The eleven base words — `hero`, `chosen`, `heir`, `descendant`, `master`,
   `expert`, `owner`, `guardian`, `warden`, `custodian`, `caretaker` — appear **zero** times,
   case-insensitive and word-boundary matched, inside any `manifest` block under `cid/`. **Verified
   at 0 as written.** If naming work merges the 21 entries, `npm run bridge` reports **zero** new
   problems against the 43 shipped player-facing strings.
2. **Simultaneity check.** The `## Decision` section contains **zero** occurrences of `first`,
   `only`, `last`, `chosen`, `best`, `master`, so the role states no ordinal, office or permission
   and is true of 12 to 20 players at once.
3. **Cast check.** This sheet coins exactly **1** term (`finder`), names **0** persons, peoples,
   factions, groups or creatures, and adds **0** contract keys.
4. **Find-name check**, against `collection.sets[].relics`: **0** of the 24 Find names is a personal
   name, a title of office, or an object addressed to a recipient. The current 24 pass at 0.

## Not decided here

Whether the role is ever communicated to the player, and whether it must survive an arbitrary saved
Roblox avatar (sheet `02`). What a co-present stranger is (sheet `03`) and what one may *do*
(presence-sufficiency work). Which entity classes do not exist (sheet `04`). The register the role
runs along and what the player becomes over a long play (fantasy work, ruled). The ruin's history
(history work, ruled). One ruin or many (world-scale work). Whether the 21 exclusion entries are
accepted (naming work, owner of `vocabulary`). Any visual expression of the role
(character-and-avatar work; `characterArt` carries the body).

## Flagged to the developer

**This whole sheet answers a question the brief never asked.** Two alternatives were genuinely live:

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Custodian of the place** — the player holds the ruin in trust and clears it as an obligation | A trust is owed to a party, and no party exists; and an obligation means something is lost if the player stops, which is the tension the handoff forbids by name | Cheap in this sheet, expensive next door: it reopens history work's `L6` and hands presence-sufficiency work a duty to model |
| **Archaeologist recording a site** — the player is a specialist filling a catalogue | Expertise is the mastery layer the brief says nobody should invent, and a specialist is employed by an institution nobody funds a model for | Cheap: swap the noun and the stance, keep the relation at zero. The collection-as-index register would then need fantasy work's ratification |

**My recommendation is the sheet as written**: it is the option that costs no model, no surface, no
contract key and no tension, and it is the only one of the four still true when twenty strangers are
standing in the same ruin. **The judgment call I would most like a ruling on** is narrower than the
role: whether the player may ever be called anything at all in player-facing text. My answer is no,
and `finder` stays a word for writers.
