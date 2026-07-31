# 04 — Coinage intake

**Domain:** Vocabulary · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**A word enters the register by exactly two routes and never by prose.** Either it is a value in a
contract key — the key owner writes it, the register derives it, nothing is submitted — or it has no
contract path, in which case its coining sheet carries a fenced ` ```coinage ` block that
`bridge/merge.mjs` collects and unions into `vocabulary.internalTerms` (non-renderable) or
`vocabulary.pendingPaths` (renderable, and therefore a contract key the seam owes). A word that
appears only in a sheet's prose is not in the register and a later wave is free to take it.

**Clashes are resolved by a six-rung ladder that names the loser mechanically**, so no two sheets ever
have to negotiate: frozen identifiers never move · a contract value beats a pathless coinage · between
two contract values the earlier class in `classOrder` keeps the word · between two coinages the lower
wave keeps it · **a Vocabulary rule vetoes a word and never substitutes one** · the developer wins
always.

**Where a key owner and a Vocabulary ruling disagree, nobody wins and nothing ships.** Legality is
mine, the value is theirs, neither may act in the other's field, and the disagreement is a merge
failure — exit 1, no emit — until one of the two sheets changes. **A banned word is therefore not
overridable by argument in a later sheet; the only route is an amendment to the sheet holding the
`vocabulary` key, which is a wave-1 revision.**

**Enforcement lives in three named places and none of them exists yet.** `merge.mjs` (parse and union
the block), `crossCuttingProblems()` in `schema.mjs` (six checks), and the out-of-manifest copy lint
`03` requested. **Until those are built, every rule on this sheet is advisory and I say so with the
count: 0 sheets on disk carry a coinage block, and 6 unowned strings are shipping in
`ui-forge/briefs/hud.brief.json` today.**

**No manifest block, and this is deliberate.** Vocabulary owns exactly one contract key, `vocabulary`,
and `cid/theme/vocabulary/02-banned-words.md` already provides it. One key, one sheet. The
machine-holdable half of this sheet is filed as an **amendment to 02** in a plain `json` fence below,
which `bridge` does not parse and which claims nothing, the way `01-naming-form.md`,
`03-term-register.md` and `cid/theme/tone/01-register.md` all did.
`[research: repo — bridge/merge.mjs:28, bridge/schema.mjs:116-133, read this run]`

---

## Why

### Why prose cannot be the submission format — an empirical count, not a preference

`SCHEMA` holds **11 keys across 8 owning sheets in 4 categories**: `gameplay/meta`,
`gameplay/systems`, `gameplay/balance`, `gameplay/mechanics`, `gameplay/onboarding`, `art/objects`,
`tech/architecture`, `theme/vocabulary`. **Five of the nine CID categories own zero contract keys:
UI/UX, Audio, Analytics, Live Ops and Discovery & Marketing.**
`[research: repo — bridge/schema.mjs:30-323 and docs/cid-workflow.json, read this run]`

Those five are precisely the ones that will coin the words waves 4 to 7 produce — screen titles,
button labels, sound and cue names, event names, SKU names. **So the mechanism `01` and `03` rely on,
"the word is a value in a key someone owns", is unavailable to the majority of the departments still
to write.** Art & Visuals is the same case in miniature: it owns `patch` (a footprint, a boolean and
an engine enum) while the 24 Find names it invents in wave 4 live inside `collection`, which
`gameplay/meta` owns. An intake that only works for key owners covers four categories and abandons
five. `[cid: decided]`

The alternative that is already on disk is prose, and it has a measured failure rate of 100% on the
one case it has faced. `SHARDS` and `RELICS` shipped in `ui-forge/briefs/hud.brief.json` and in
`game/src/shared/Screens/hud.luau` with no sheet behind either, and the merger could not see them
because *"the merger cannot see a literal nobody declared"* — the emitter's own comment
(`bridge/emit-config.mjs:152-154`). `[research: repo — read this run]` The repo rule this violates is
explicit: *"Seams are derivations, never prompts"* and *"Prefer changes that make bad output
impossible ... over changes that make one screen prettier by hand"* (`CLAUDE.md`).
`[research: repo — CLAUDE.md, read this run]`

### Why a second block type rather than a twelfth contract key

A key needs exactly one owning sheet (`bridge/merge.mjs:83-85`), and the thing being collected here is
contributed by *every* sheet. There is no sheet that could own it. The three candidate shapes and why
two fail:

| shape | why not |
|---|---|
| a new `SCHEMA` key, e.g. `coinages`, provided by one sheet | that sheet would have to contain every later wave's words, so 40+ sheets serialise through one wave-1 file. `mergeSheets` would reject the second contributor as a duplicated key |
| an extra field on each category's own key | unavailable to the five categories that own no key, which is the majority of the remaining work |
| **a non-exclusive ` ```coinage ` block, unioned** | additive, per-sheet, duplicate-checked, and it needs no owner because there is nothing to adjudicate — a duplicate is *refused*, not resolved |

**Folding the union into `vocabulary` rather than into a new top-level key is not a violation of
one-key-one-sheet, and the distinction is worth being precise about.** The exclusive rule exists
because *"two sheets asserting the same key is not a disagreement to adjudicate, it is a duplicated
responsibility"* (`bridge/merge.mjs:80-82`). A union of disjoint entries whose duplicates fail the
merge has no assertion to duplicate. `02` keeps the `provides` claim; the merger appends after the
exclusivity check has already passed. And `vocabulary` is the right host because it is not emitted:
`emitGameConfig` never reads it, so `internalTerms` and `pendingPaths` stay build-time artifacts and
cannot leak into `GameConfig.luau`. `[research: repo — bridge/emit-config.mjs:130-203, read this run]`

**The block is six lines because it has to be cheaper than skipping it.** *"This game exists to prove
the `arga` pipeline works end to end"* and *"the smallest game that still gives every creative area
real work"* (`00-CORE.md`) `[brief: binding]` `[you chose: R1 Q3]`. An intake with a review step gets
routed around by an agent under instruction to ship a sheet; an intake that is a JSON fence next to
the word does not.

### The precedence ladder, rung by rung

Stated in the four-direction convention `cid/theme/lore/02-the-silences.md` set and
`cid/theme/tone/04-do-nots.md` followed, so the instruments in this category behave the same way under
review, then restated as a function so a merger can run it.

| against | who wins | what happens |
|---|---|---|
| `runtime.dataStoreName` vs anything | **the identifier, always** | `ArgaRuin_v1` renames no-one's saves. The other party moves |
| a contract value vs a pathless coinage | **the contract value** | the coinage renames. It has no surface and costs one line; the contract value is emitted into `GameConfig.luau` and cited across sheets |
| two contract values | **the earlier class in `classOrder`** | `area` → `currency` → `class-noun` → `tier` → `upgrade` → `set` → `find`, then the earlier `playerFacingStrings()` index inside one class |
| two pathless coinages | **the lower `wave`** | equal waves break on the lexicographically smaller sheet path. The later one renames |
| a wave-1 Vocabulary rule (`01`, `02`, `03`) vs a later sheet's word | **the rule, on legality only** | the word is refused; the rule never names the replacement. *"This bans; that renames"* (`02`) |
| a key owner who holds the ban is wrong | **nobody, until a sheet changes** | an unban amendment against `02`. The merge stays red in the meantime, so the disagreement cannot ship in either direction |
| the developer | **the developer, always** | `02` bans `rebirth`, and rebirth is `[brief: binding]` `[you chose: R2 Q2]` with the *"seasons"* reframe *"declined"* by name (`01-FOUNDATION.md`, `03-META.md` priority 3). Only the developer may reopen a priority-3 word |

**Why `classOrder` and not wave order for contract values.** The merger cannot read a sheet's wave from
its prose header, and inferring it from the category graph would make the ladder depend on
`docs/cid-workflow.json`, which the repo says is *"expected to change"* (`docs/CID.md`).
`classOrder` is already declared in `03`'s amendment, is already the register's sort order, and runs
from the most-cited and most-structural to the least — `find` sits last precisely because there are 24
of them and renaming one is the cheapest string edit in the game. A key added later appends to
`classOrder`, so a new key's values lose to everything that already exists, which is also the correct
direction: the newest value is the one with the fewest citations behind it. `[cid: decided]`

**Why the axis split — legality mine, value theirs — is the answer to "who wins" rather than a dodge.**
`OPEN.md §4` assigns *"all naming"* to this category and `01-FOUNDATION.md` leaves *"the names of
everything"* open `[brief: binding]`, but every one of those names is a value inside a key another
domain owns, and `mergeSheets` rejects a second claimant. So a Vocabulary sheet that picked
replacements would be unmergeable by construction. What is left is a veto, and a veto is enough: the
ban check already *fails the build* on a hit (`bridge/schema.mjs:481-488`), which is more force than
an adjudication ever has. `[research: repo — read this run]`

### What a later wave does when the word it needs is banned

**Three routes, and exactly one of them is "use it anyway".**

1. **The word is for an internal identifier — a field name, a node name, a module id, a Luau local.**
   No permission needed and none is sought. `02`'s existing rule stands untouched: *"Internal field
   names, which are not player-facing and are not governed by this list."* The live example is
   `game/src/client/init.client.luau:69`, `valueLabel("Readout_RELICS")`, which `03` already ruled
   legal. **This route covers most of what a later wave actually wants and it costs nothing.**
2. **The word is a coinage or a contract value.** Then it is refused, and the sheet picks another word.
   Note that a *declared coinage* is governed even though it is internal, and that is deliberate: a
   writers' handle is a word writers then use across sheets, so a handle named `relic` keeps the banned
   word alive in the design vocabulary and it leaks. The governed set is exactly
   `playerFacingStrings()` ∪ every coinage block. Everything else is ungoverned.
3. **The ban itself is wrong.** File a ` ```json ` amendment against `02` in the requesting sheet
   (`{"amends":"vocabulary","unban":"<word>","because":"<which of the six reason classes is wrong>"}`),
   and do not use the word until `02` is revised and the merge is green. **A prose exception is never
   honoured**, because the check is a regex over the merged manifest and it does not read prose.

**No reservations.** A coinage block declares a word *in use*, never a word claimed for later. A
reserved word is a value with no path and no surface, which is exactly the class `03` refuses, and an
unused reservation is a permanent false collision. If wave 3 needs wave 4 to avoid a word, that is a
`bannedWords` request with a reason class, not a reservation. `[cid: decided]`

### Casing encodes renderability, which makes the copy lint decidable

A non-renderable coinage must match `^[a-z][a-z0-9-]*$`; a renderable one must match `01`'s label
regex. The two wave-1 handles already do this without being asked — `works` is *"lowercase, internal,
never rendered"* (`cid/theme/setting/01-the-ruin.md`) and `finder` is *"lowercase, **internal, never a
player-facing string**"* (`cid/theme/identity/01-player-role.md`) — so this codifies a convention two
sheets arrived at independently rather than inventing one.

**What it buys is a check that could not otherwise be written.** `03`'s out-of-manifest lint has to
decide whether a string found in a rendered-text position is a violation. With casing carrying
renderability, a lowercase register term appearing in a `label`, `value`, `text`, `title` or
`placeholder` value is a violation on its face, with no table lookup and no judgment. **Scope: coinage
blocks only.** Internal values derived from contract paths are Title Case for unrelated reasons —
`Grass`, `Block`, `ArgaRuin_v1` — and `01` forbids widening `playerFacingStrings()` to reach them.
`[cid: decided]`

### The case that cannot be enforced today, stated with its count

**Two sheets in the same wave coining the same word, where neither word is a contract value, is
invisible to every check this domain has built.** `crossCuttingProblems()` walks the merged manifest
and nothing else, so a sound name in an Audio sheet's prose and a screen title in a UI/UX sheet's
prose can be the same word forever and no run of `npm run bridge` will ever mention it. **This is not
a gap in the rule; it is a missing surface, and the coinage block is exactly the surface.** Once both
words are declared, the collision is a duplicate word key in one list and the merge refuses it by
rung 4 of the ladder.

**Honest state of the repo, so nobody reads this sheet as describing something that runs:**

| thing | today |
|---|---|
| sheets carrying a ` ```coinage ` block | **0** — the block type does not exist |
| pathless coinages in wave 1 | **2** (`works`, `finder`), hand-copied into `02`'s amendment by `03` |
| pathless coinages waves 2–7 will produce | unbounded and currently unmeasurable |
| unowned player-facing strings shipping now | **6** in `ui-forge/briefs/hud.brief.json` — 5 spelling (`SHARDS`, `[1] VALUE`, `[2] REACH`, `[3] PACE`, `EAST TERRACE — 0% CLEAR`) and 1 banned (`RELICS`), per `03`'s count, re-read this run |
| enforcement code in `bridge/` | **none of the three pieces named below** |

The two wave-1 handles are **grandfathered**: `03` already put them in `02`'s manifest value as
authored `internalTerms` entries, and reopening two wave-1 sheets to convert them into coinage blocks
buys nothing. So `internalTerms` has two admissible sources and one hard count — **at most 2 authored
entries, ever** — and every addition from wave 2 onward arrives as a collected block. The merger
defaults a missing `wave` to 1, which is what makes the grandfather clause need no edit anywhere.

### Gating: what fails a build and what only prints

`03` routed this here explicitly (*"whether the out-of-manifest lint gates a build or only reports is
yours"*). Three tiers, chosen on whether a hit can be a false positive:

- **In-manifest problems gate.** Banned word, label ceiling, casing, one-spelling, one-referent, and
  the six coinage checks → `problems`, exit 1, no emit. This is `bridge/cli.mjs:60-78` behaviour
  unchanged; the new checks simply join it. A manifest string has no placeholder excuse: it is emitted
  verbatim into `GameConfig.luau`.
- **The copy lint gates on banned words and reports on spelling.** A banned word in authored copy is
  the exact failure `02` exists to prevent and it cannot be a false positive — `RELICS` is not a
  placeholder that becomes acceptable at runtime, and a placeholder gets screenshotted. A *spelling*
  mismatch often is a false positive: `hud-binding` is specified to overwrite HUD labels from
  `GameConfig` at runtime (`cid/tech/architecture/02-module-plan.md`), so gating on spelling would
  fail the build on strings that never render. Report those, with a count.
- **`pendingPaths` never gates.** A sheet cannot be required to satisfy a contract key that does not
  exist. The list is printed with a count and it is the standing bill against contract-and-seam work,
  not a defect in the sheet that declared it. Declaring one is compliance, not failure. `[cid: decided]`

**Nothing on this sheet is playtest-dependent.** A submission format, a precedence order and an exit
code are settled by reading the repo. The brief is silent on all of it — `OPEN.md §1` has no audit row
for naming process, `01-FOUNDATION.md` leaves *"the names of everything"* open and `OPEN.md §4` routes
*"all naming"* to this category without a word about how a name arrives — so every ruling above is
`[cid: decided]`, and my index recorded the silence as gaps G3 and G4.

---

## The amendment, addressed to the holder of the `vocabulary` key

Not a `manifest` fence: `bridge` parses only ` ```manifest ` blocks, so this claims no key. Every
field is additive and disjoint from Tone's amendment (`register`, `bannedWords`), `01`'s (lengths,
casing, plurals) and `03`'s (`termRegister`, `internalTerms`, `oneSpelling`). `validateManifest`
checks required fields and ignores extras, so honouring this cannot fail the merge.
`[research: repo — bridge/schema.mjs:386-399, read this run]`

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/vocabulary/04-coinage-intake.md",
  "coinageIntake": {
    "routes": [
      "a value in a contract key — nothing is submitted; the register derives it",
      "a ```coinage block — for a word with no contract path"
    ],
    "prosePathAdmitsNothing": true,
    "block": {
      "fence": "coinage",
      "regex": "```coinage\\s*\\n([\\s\\S]*?)\\n```",
      "exclusive": false,
      "parsedBy": "bridge/merge.mjs, after the one-key-one-sheet check has passed",
      "required": ["coins", "renderable", "kind", "wave", "because"],
      "requiredWhenRenderable": ["requestsPath", "surface"],
      "derivedByMerger": ["coinedBy"],
      "collectedInto": {
        "renderableFalse": "vocabulary.internalTerms",
        "renderableTrue": "vocabulary.pendingPaths"
      },
      "unionOrder": "authored entries in the vocabulary key first, then coinage blocks in merge file-walk order",
      "fieldRules": {
        "coins": "one word. ^[a-z][a-z0-9-]*$ when renderable is false; the label regex from 01-naming-form.md when true",
        "kind": "kebab-case. Unknown kinds append to termRegister.kindOrder in first-declaration order",
        "wave": "integer >= 1. A missing wave defaults to 1, which grandfathers the two authored entries",
        "because": "one line, 25 words or fewer",
        "requestsPath": "the contract path this string should occupy, e.g. screens[].title",
        "surface": "where it renders"
      },
      "example": {
        "coins": "chime",
        "renderable": false,
        "kind": "sound-name",
        "wave": 4,
        "because": "the reveal cue needs a handle three sheets can refer to without re-describing it"
      }
    },
    "grandfathered": {
      "authoredInternalTermsMax": 2,
      "entries": ["works", "finder"],
      "wave": 1,
      "reason": "already carried by 03's amendment; converting them would reopen two wave-1 sheets for no gain"
    },
    "noReservations": "a coinage declares a word in use, never a word claimed for later. To stop a later wave using a word, ban it with a reason class",
    "outsideTheIntakeEntirely": [
      "the external title, tagline and store description — no contract key could reach them and OPEN.md 3 reserves the name for the developer; 01 and 03 both place them outside the register",
      "internal identifiers: field names, node names, module ids, Luau locals. 02's existing rule, unchanged",
      "engine vocabulary and frozen identifiers, which are derived from contract paths and are never submitted"
    ],
    "governedSet": "playerFacingStrings() union every coinage block. Nothing else."
  },
  "precedence": {
    "ladder": [
      { "rung": 0, "rule": "runtime.dataStoreName never moves", "why": "renaming orphans every save" },
      { "rung": 1, "rule": "a contract value beats a pathless coinage; the coinage renames", "why": "the contract value is emitted and cited; the coinage has no surface" },
      { "rung": 2, "rule": "between two contract values, the earlier classOrder index keeps the word; within one class, the earlier playerFacingStrings() index keeps it", "why": "classOrder is already declared and runs most-cited to least; a new key appends and therefore loses" },
      { "rung": 3, "rule": "between two pathless coinages, the lower wave keeps the word; equal waves break on the lexicographically smaller sheet path", "why": "the word already in use survives, and the tiebreak is deterministic" },
      { "rung": 4, "rule": "a Vocabulary rule vetoes a word and never substitutes one; a rule and a value in disagreement is a merge failure, not a precedence question", "why": "one key one sheet makes a Vocabulary-supplied replacement unmergeable" },
      { "rung": 5, "rule": "the developer wins, always", "why": "02 bans priority-3 words that are [brief: binding]; only the developer reopens those" }
    ],
    "collisionScope": "whole stored terms only. A word shared inside a multi-word label (Terrace in East Terrace, and the Terrace set) is not a collision; 03's one-spelling check covers that case",
    "escalatesToDeveloper": "an unban request against a word 02 bans for a priority-3 or otherwise [brief: binding] reason",
    "operationalRuleForWaves4to7": "read docs/TERMS.md first. If the word is in it, pick another."
  },
  "banProcess": {
    "proseExceptionsHonoured": 0,
    "unbanRequest": { "amends": "vocabulary", "unban": "<word>", "because": "<which of the six reason classes is wrong, and why>" },
    "unbanIsAWaveOneRevision": "cid/theme/vocabulary/02-banned-words.md is edited and re-verified; the requesting sheet may not use the word until the merge is green",
    "internalIdentifiersNeedNoPermission": true
  },
  "gating": {
    "inManifestProblems": { "effect": "exit 1, no emit", "why": "a manifest string is emitted verbatim; it has no placeholder excuse" },
    "copyLintBannedWord": { "effect": "exit 1", "why": "cannot be a false positive, and a placeholder gets screenshotted" },
    "copyLintSpellingMismatch": { "effect": "printed with a count, exit unchanged", "why": "hud-binding overwrites HUD labels at runtime, so some mismatches never render" },
    "pendingPaths": { "effect": "printed with a count, exit unchanged", "why": "a sheet cannot be required to satisfy a key that does not exist" },
    "countsToday": { "copyLintBanned": 1, "copyLintSpelling": 5, "pendingPaths": 0, "coinageBlocks": 0 }
  },
  "checks": {
    "raisedIn": "crossCuttingProblems(), beside the existing banned-word, label-length and one-spelling checks",
    "coinageWellFormed": "a block missing a required key, or failing a fieldRule regex, or whose because exceeds 25 words, is a merge problem",
    "coinageDuplicate": "two coinage blocks with the same lowercase word key is a merge problem; the loser is rung 3",
    "coinageOverlapsPlayerFacing": "a coinage word key matching any player-facing string's word key is a merge problem; the coinage loses by rung 1. This also forbids declaring a word twice",
    "coinageBanned": "a coinage word matching a bannedWords entry is a merge problem, renderable or not",
    "coinageCasing": "renderable false requires ^[a-z][a-z0-9-]*$; renderable true requires 01's label regex and the labelCharsByPath ceiling of its requestsPath, falling back to maxLabelChars",
    "authoredInternalTermsCount": "more than 2 authored internalTerms entries in the vocabulary key is a merge problem"
  },
  "enforcementOwedBy": {
    "bridge/merge.mjs": "parse the coinage fence, set coinedBy from the file path, union into vocabulary.internalTerms and vocabulary.pendingPaths, refuse malformed blocks",
    "bridge/schema.mjs": "the six checks above inside crossCuttingProblems()",
    "the copy lint 03 requested": "the three gating tiers above",
    "statedHonestly": "none of the three exists. Until they do, this sheet is a convention with no teeth and the SHARDS failure recurs by construction."
  }
}
```

---

## Consequences for other work

- **The holder of the `vocabulary` key** *[`cid/theme/vocabulary/02-banned-words.md`, this domain]*:
  folds the block above into its manifest value — the fourth amendment, on fields disjoint from Tone's,
  `01`'s and `03`'s. Two things land on you specifically. **(a)** Your `bannedWords` list becomes the
  only overridable thing in this domain, and the override is an edit to *your* sheet, so you are the
  wave-1 file that waves 2 to 7 will come back to. **(b)** Your authored `internalTerms` list is capped
  at the 2 entries `03` put there. A third addition is a merge problem, not a favour.
- **Contract-and-seam work** *[whoever owns `bridge/schema.mjs` and `bridge/merge.mjs`]*: this is the
  sheet that names you as the single point of failure, and it is the third wave-1 request in a row.
  `01` asked for a per-path ceiling map and two casing regexes, `03` asked for `emit-terms.mjs`,
  `--terms` and four invariants, `tone/04` recorded that *"pass 1 has no home"*. **Mine is the one
  that adds a parser rather than a check**, and it is the only one of the four that makes the other
  three reach the five categories that own no key. If it is refused, say so out loud, because then
  UI/UX, Audio, Analytics, Live Ops and Discovery & Marketing have no route into the register at all
  and `03`'s register covers 4 of 9 categories permanently.
- **Screen and on-screen-copy work** *[UI/UX, wave 4]*: every screen title, button label, empty-state
  string and system-copy line you write is **renderable with no contract path**, so each one is a
  ` ```coinage ` block with `requestsPath` and `surface` filled in, and each one prints in
  `pendingPaths`. That list is not a reprimand — it is the bill you are entitled to hand the seam, and
  it is the mechanism that stops your strings becoming the next `SHARDS`. What you may not do is type
  a rendered string into a `ui-forge` brief without declaring it.
- **Cue-and-sound work** *[Audio, wave 4]*: sound and cue names are non-renderable coinages, so they
  are **lowercase, one word, kebab-case if compound**, and they are checked against `bannedWords`. The
  reveal cue in particular will be referred to by three sheets (`tone/03-beat-map.md`,
  `gameplay/core-loop/02-payoff-weights.md`, yours), which is exactly the case a declared handle
  exists for.
- **Event-naming work** *[Analytics, wave 4]*: event names are non-renderable coinages of kind
  `event-name`, which appends to `kindOrder` on first declaration. `OPEN.md §2`'s three measurements
  give you three names to declare and no more.
- **Price-and-SKU work** *[Monetization, wave 3]*: an SKU name is renderable with no path, so it
  enters `pendingPaths`. This partly answers the finding
  `cid/theme/identity/04-no-cast-declaration.md` passed to seam work — *"a SKU has no key at all, so a
  paid companion would never fail validation"*. Under this intake the SKU **name** becomes visible and
  ban-checked; its deliverable still is not, and that remains a contract gap.
- **Object-naming work** *[Art & Visuals, wave 4]*: your 24 Find names are values in `collection`,
  which `gameplay/meta` owns, so they are route 1 and you submit nothing. Any *asset* name you coin
  alongside them is route 2 and non-renderable. Under rung 2 a Find name loses every collision to an
  area, currency, class-noun, tier, upgrade or set label, so **read `docs/TERMS.md` before you write
  the 24, not after.**
- **Set-content work** *[Meta & Content, wave 3]*: same rung. Your four set labels beat the 24 Find
  names and lose to the tiers, the upgrades, the class noun, the currency and the area. And you may not
  reserve a word for wave 4 to avoid; the route is a ban request with a reason class.
- **External-name work** *[Discovery & Marketing, wave 5]*: the title, tagline and store description
  are **outside this intake**, following `01` and `03`, because no contract key could reach a store
  listing and `OPEN.md §3` reserves the name for the developer `[brief: binding]`. You still inherit
  `02`'s ban list, which is the one thing that does reach you.
- **The two wave-1 coining sheets** *[`cid/theme/setting/01-the-ruin.md` and
  `cid/theme/identity/01-player-role.md`]*: **nothing is owed and no edit is requested.** `works` and
  `finder` are grandfathered exactly as `03` recorded them. Named here so neither sheet is reopened by
  a reader who assumes the new format is retroactive.
- **History and place work, fantasy work, tone work** *[this category, this wave]*: six sibling sheets
  state *"this sheet coins zero terms"*. Under this decision that sentence becomes a checkable claim
  rather than a courtesy: zero coinage blocks in the file. All six pass as written.
- **Whoever sequences CID**: the ladder resolves clashes without a meeting, but it needs the register
  to exist first. **`03`'s `docs/TERMS.md` is a hard prerequisite for wave 4**, because rungs 1 to 3
  are unusable if nobody can see what is already taken. If `emit-terms.mjs` is not built before wave 4
  spawns, the operational rule *"read `docs/TERMS.md` first"* has nothing to read.

## Acceptance criteria

1. **Two routes and no third.** Every row in `docs/TERMS.md` resolves to either a contract path or a
   ` ```coinage ` block, except at most **2** grandfathered authored `internalTerms` entries (`works`,
   `finder`). Today the register is **66 rows — 64 path-derived, 2 authored, 0 sourced from prose, 0
   coinage blocks on disk.** A third authored entry, or a register row whose only source is a sheet's
   prose, fails.
2. **Every coinage block is well-formed or the merge fails.** Required: `coins`, `renderable`, `kind`,
   `wave`, `because`; plus `requestsPath` and `surface` when `renderable` is true. `coins` matches
   `^[a-z][a-z0-9-]*$` when `renderable` is false and `01`'s label regex when true. `because` is ≤ 25
   words. `kind` is kebab-case. **The count of malformed blocks the merge accepts is 0**, and a block
   whose word matches a `bannedWords` entry or any player-facing string is refused regardless of
   `renderable`.
3. **Clash resolution is total and reads no prose.** For any two colliding stored terms the loser is
   computed from, in order: frozen-identifier status, contract-value-versus-coinage, `classOrder`
   index, `playerFacingStrings()` index, `wave`, sheet path. **The number of pairs for which the
   function returns no loser is 0**, and the only branch that escalates to a human is an unban request
   against a `[brief: binding]` word. Whole-term collisions today: **0** across the 38 player-facing
   rows and the 2 handles.
4. **Gating, as four exit-code cases with today's counts.** In-manifest problems → exit 1 and no emit.
   A banned word found by the copy lint → exit 1. A spelling mismatch found by the copy lint → printed
   with a count, exit unchanged. Each `vocabulary.pendingPaths` entry → printed with a count, exit
   unchanged. **Today: 1 gating lint hit (`RELICS` in `ui-forge/briefs/hud.brief.json`), 5 reported
   spelling mismatches, 0 pending paths, 0 coinage blocks.**

## Not decided here

Which words are banned, and the `register` and `bannedWords` values themselves (`02`, which holds the
key). Word counts, character ceilings, casing regexes and the plural rule (`01`). Where the register
lives, its row format, its wave-1 membership and the one-spelling invariant (`03`). **Any word at all
— this sheet coins zero terms and names zero values.** Whether `bridge` gets the parser (contract-and-
seam work; if not, this sheet is a convention). Which contract keys are added to hold screen titles,
button labels or SKU names, and in what order the `pendingPaths` bill is paid (contract-and-seam work,
informed by UI/UX wave 4). The 24 Find names, the four set labels and every other value inside another
domain's key. The external title, tagline and store description, which are outside the intake by
construction (Discovery & Marketing, wave 5, and `OPEN.md §3` reserves the name for the developer).
Whether a later wave's word is *good* — the intake checks legality and collision, never taste.

## Flagged to the developer

**The brief is silent on all of this.** *"all naming"* is routed to this category (`OPEN.md §4`) and
*"the names of everything"* is left open (`01-FOUNDATION.md`), but nothing anywhere says how a name
arrives after wave 1, and `OPEN.md §1` has no audit row for it. My index recorded that as G3 and G4.
Three calls were genuinely live.

| call | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **A new non-exclusive ` ```coinage ` fence the merger unions** | A prose convention: later sheets list their coinages in a `## Coinages` section and a verifier agent collects them | A verifier agent reading prose is the seam this repo replaced once already, and it costs ~150k tokens per pass by the merger's own comment. More decisively, five of nine categories own no contract key, so prose is the *only* route they have today and it has already failed once in the wild (`SHARDS`, `RELICS`) | Moderate. The precedence ladder, the ban process and the field list all transfer to a prose convention unchanged; what is lost is that a duplicate stops being detectable and the same-wave clash becomes permanently invisible |
| **The copy lint gates on banned words but only reports spelling mismatches** | Gate on both, or gate on neither | Gating on both fails the build today on 5 strings that `hud-binding` is specified to overwrite at runtime, which trains everyone to pass `--no-lint`. Gating on neither leaves `RELICS` shipping in a file a screenshot is taken from | Small and reversible either way: one boolean in the lint. The counts to watch are 1 and 5 |
| **No reservations — a coinage declares a word in use, never a word claimed for later** | Let wave 3 reserve words for wave 4 to avoid | A reservation is a value with no path and no surface, which `03` refuses, and an unused reservation is a permanent false collision. The existing route (a ban with a reason class) already does the job and leaves evidence | Trivial to reverse, and expensive to live with: a reservations list is a second register that nothing checks |

**The ruling I would most like from you** is not on this sheet, it is on the seam: **three wave-1
sheets in this domain now depend on `bridge/` gaining code that does not exist.** `01` needs a ceiling
map and two regexes, `03` needs an emitter and four invariants, and I need a parser. If the answer is
that `bridge/` is frozen, the honest consequence is that this category's entire output is advisory and
the register covers four of nine categories — and that is worth knowing at wave 1 rather than at
wave 4.

**No URL was fetched in this run**, and `npm run bridge -- --contract` could not be executed because
this session has no shell tool. I read `SCHEMA`, `playerFacingStrings()`, `PROSE_PATHS`,
`crossCuttingProblems()` and `contract()` directly in `bridge/schema.mjs` — which is what `--contract`
prints from — plus `bridge/merge.mjs`, `bridge/cli.mjs`, `bridge/emit-config.mjs`,
`ui-forge/briefs/hud.brief.json`, `docs/cid-workflow.json`, `docs/CID.md`, `docs/CID-wave-1.md` and
every sheet in this domain and category. Every count above was derived from those files this run.
