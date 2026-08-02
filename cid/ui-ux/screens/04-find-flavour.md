# 04 — Whether a Find has a flavour line, and where it renders

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5 · **Revision round 3**

## Decision

**Yes. All 24 Finds carry a flavour line, and it renders in exactly one node.** `FlavourLine`
sits at the foot of the index panel and shows the line belonging to the Find most recently
revealed in this session, never per slot and never for an unrevealed name. This sheet issues a
**revision request** against `collection` (`gameplay/meta/02-the-collection.md`) turning
`sets[].relics[]` from 24 bare strings into 24 objects `{ name, flavour }`. I do not edit that
file and I carry no `collection` block.

## Why

**The decision that forces this is binding and it presupposes a field that exists in no key.**
*"Dry and sparse. Humor lives only in relic flavour text. No relic name is a pun."*
`[brief: binding]`, developer, 2026-07-30, carried by `theme/tone/02`. That sheet put humor at
exactly one contract path, `collection.sets[].relics[].flavour`, and recorded the consequence
itself: *"if neither ships, the humor level has nowhere to live and the binding decision is
vacuous."* Refusing here would ship a game with **zero humor on any surface** while a binding
developer decision says where humor lives. Two other approved sheets are waiting on the same
field by name (`theme/identity/02`, `theme/identity/04`).

**Every path this sheet names into `collection` resolves only after `RR-1` lands, and that is
now marked rather than implied.** `relics[]` holds bare strings today, so
`collection.sets[].relics[].flavour` and `.name` both fail to resolve against the merged shape.
Objects routed the same defect in as `RQ2` against sheet 01's `Name` node, where it was a plain
error; here it is the path this sheet exists to create, so the manifest carries
`resolvesToday: false` with `createdBy: RR-1` beside it. Sheet 01 publishes the whole domain's
citation sweep as `screens.citations`, and this is the one row in it legitimately unresolved.

**The revision is cheap and it is not a schema change.** `bridge/schema.mjs` already normalises
a Find entry as `typeof r === 'string' ? r : r?.name` in the duplicate walk, already adds
`collection.sets[i].relics[j].name` and `.flavour` in `playerFacingStrings()` when the entry is
an object, and `PROSE_PATHS` already exempts `/\.flavour$/` from the 14-character label ceiling
`[research: bridge/schema.mjs]`. The shape was built for this. So the request is a content
change to one sheet's manifest value with **zero renames, zero schema edits and zero new
checks**.

| field | from | to | note |
|---|---|---|---|
| `collection.sets[i].relics[j]` | `"Vaultkey"` | `{ "name": "Vaultkey", "flavour": "..." }` | all 24, both fields required |
| `name` | unchanged | unchanged | zero renames; all 24 pass `theme/vocabulary/01` `N1` today |
| `flavour` | does not exist | one sentence, at most 14 words, third person, ends in `.` | `theme/tone/02` `F1`-`F8`; `theme/identity/02` fixes the grammatical person |
| humour count | none | at most 6 of 24 marked `humor: true`, at least 18 `false` | `theme/tone/02` criterion 3 |

**Every Find gets a line, not six.** `theme/tone/02` bounds *humor* at 6 of 24, not *flavour*,
and its own criterion 3 asks for a 24-row table with a `humor` column. Giving only six Finds a
line would make those six visibly distinguished from the other eighteen, which is a per-object
grade, and `rarity.ladders[find-set].perObjectVisualGrade` is false and forbids a Find being
drawn, framed or lit as ranked. Universal flavour removes the distinction entirely.

**Where it renders is decided by elimination, and only one place survives.**

| candidate | why not |
|---|---|
| a second line inside each slot | a 14-word sentence cannot render at sheet 03's 14 px floor in one sixth of the panel width, and 24 of them breaches sheet 03's 1-prose-string budget |
| a detail view opened by tapping a slot | a slot would have to be pressable. `input.gameDrawnPressables` is 4 and `mechanics/02` closes the verb list at five verbs with no sixth |
| shown at the reveal moment | `response` gives the reveal the world channel exclusively and forbids the notice channel from ever carrying a reveal |
| a hover or long-press tooltip | `firstSession.suppressionForbidden` bans an explanatory tooltip; there is no hover on the primary device |
| **one shared node at the foot of the panel** | **survives everything above.** One prose string at a time, inside budget, on the one surface that is opened deliberately |

**Which line it shows: the Find most recently revealed in this session.** That is derived on the
client from the write `index-screen` already performs the first time a name arrives held, and
**nothing is stored**: `discovery.record.forbiddenFields` bans a timestamp, an `isNew` flag and
a sort index, and this adds none of them. In a session where nothing was revealed, and on the
first frame of any session, `FlavourLine.Text` is the empty string.

**Its extent is reserved from the build and never moves.** Two lines at the floor size, always,
whether or not there is a line to show. Sheet 01 makes *nothing reflows* structural on this
surface and `firstSession.suppressionForbidden` bans `reflowOnLift`; a node that appears and
disappears would be the one thing on the panel that moves other groups. Sheet 01's 328 px
reserved stack budgets 48 px for this block and counts it as the panel's fifth child.

**A line the player has already seen is not re-readable.** Re-reading would need a selection
verb, and there is none. That is a real cost and I am stating it rather than routing around it:
the flavour for a given Find is on screen during the session it was found, in the panel, for as
long as the player leaves the panel open.

## Pushing back

**`theme/tone/02`, its delivery requirement, second bullet:** *"the `collection-index` panel
renders one flavour line per Find, visible only after that Find is revealed, never on an empty
slot."* I keep the second half exactly and **overrule the per-Find rendering**. Per-slot
rendering is unbuildable at sheet 03's 14 px floor in a 6-across row, it breaches the copy
budget by 23 prose strings, and because a line can only appear on a revealed slot, it would make
the panel reflow every time a Find lands, which sheet 01 forbids structurally. Nothing about the
field, its path, its word bound, its person, its register or its humour budget is touched; only
the number of lines on screen at once, which is a rendering decision this domain owns and
`theme/tone/02`'s own boundary assigns to *"UI/UX, wave 4"*.

```json
{
  "amends": "screens",
  "value": {
    "screens": [
      {
        "id": "index",
        "treeAdditions": [
          {
            "node": "FlavourLine",
            "class": "TextLabel",
            "parent": "IndexSurface",
            "count": 1,
            "position": "the foot of the panel, below the last Group_ node, full inner width",
            "textFrom": "collection.sets[].relics[].flavour of the Find most recently revealed in this session",
            "textFromResolvesToday": false,
            "textFromCreatedBy": "RR-1 in this sheet; relics[] holds bare strings until it is accepted",
            "emptyWhen": "no Find has been revealed in this session, or RR-1 has not been accepted",
            "reservedHeightLines": 2,
            "reservedHeightPx": 48,
            "countsAsPanelChild": true,
            "wrap": true,
            "automaticSizeY": false,
            "align": "start",
            "color": "content.secondary",
            "reflows": false,
            "sourceOfSelection": "client-session-local; nothing persisted, no new field in discovery.record"
          }
        ],
        "mutablePropertiesAdd": ["FlavourLine.Text"],
        "forbiddenNodesAdd": ["perSlotFlavour", "flavourTooltip", "flavourDetailView", "flavourOnUnrevealedSlot", "flavourRePicker"]
      }
    ],
    "textPolicy": {
      "cappedNodesAdd": [
        { "match": "FlavourLine", "count": 1, "maxTextSize": "the largest size at which a 14-word sentence fits 2 wrapped lines at the panel's inner width, from TextService:GetTextBoundsAsync at build time" }
      ]
    },
    "revisionRequests": [
      {
        "id": "RR-1",
        "against": "collection",
        "ownedBy": "gameplay/meta",
        "sheet": "cid/gameplay/meta/02-the-collection.md",
        "issuedBy": "cid/ui-ux/screens/04-find-flavour.md",
        "change": "collection.sets[].relics[] becomes 24 objects { name, flavour }, both required, from 24 bare strings",
        "renames": 0,
        "schemaEditsRequired": 0,
        "schemaEvidence": "bridge/schema.mjs normalises typeof r === 'string' ? r : r?.name; playerFacingStrings() already adds .name and .flavour on an object entry; PROSE_PATHS already exempts /\\.flavour$/",
        "alsoFixes": "every sheet citing collection.sets[].relics[].name, including discovery.record.keyedBy in gameplay/systems/05, which cites a path that does not resolve today",
        "constraintsOnTheNewField": {
          "sentences": 1,
          "maxWords": 14,
          "person": "third",
          "endsWith": ".",
          "humorTrueMax": 6,
          "humorFalseMin": 18,
          "citations": ["theme/tone/02 F1-F8", "theme/identity/02", "vocabulary.allowedPattern"]
        },
        "ifRefused": {
          "flavourExists": false,
          "flavourLineNodeDeleted": true,
          "consequence": "the binding decision 'humor lives only in relic flavour text' has no path, and the game ships with zero humor on any surface",
          "screensChange": "delete FlavourLine from screens[index].tree and its entry from textPolicy.cappedNodes; the reserved stack falls from 328px to 268px with four children and three gaps, and the panel height may fall to 0.74",
          "citationsChange": "screens.citations.contractPaths rows for collection.sets[].relics[].flavour are deleted, and the count with resolvesToday false becomes 0"
        }
      }
    ]
  }
}
```

## Consequences for other work

- **Meta and Content (`collection`, `gameplay/meta`)** owns `RR-1` and may refuse it. If it is
  taken, that sheet also owes the 24 lines themselves, or names who writes them, and **`RQ2` is
  closed by the same edit** for every sheet citing `relics[].name`. If it is refused, say so
  explicitly rather than leaving the field unbuilt, because three approved sheets are waiting on
  it by name and a silent refusal reads to all three as *not yet*.
- **Systems (`discovery`)** has the same unresolvable path inside its own key at
  `discovery.record.keyedBy`. `RR-1` fixes it if accepted; if refused, that citation needs
  correcting to `collection.sets[].relics[]` on its own.
- **Theme and Narrative (`theme/tone/02`)** keeps the field, the path, the word bound, the
  person, the register and the 6-of-24 humour budget, and loses only per-slot rendering. Its
  acceptance criterion 1 is unaffected: `flavour` still appears at exactly one path class.
- **Art and Visuals, Objects (wave 6)** inherits nothing new. A flavour line is a string, not a
  model, and `rarity` still forbids drawing any Find as graded. Its own finding that bare
  strings have nowhere to hang art is independent of this and survives either outcome.
- **Feedback UI (`notices`)** may not carry a flavour line. The reveal owns the world channel
  exclusively and the notice channel may never carry a reveal, so the line waits for the panel.
- **Audio** inherits nothing: the flavour line is silent, has no cue of its own, and is not one
  of the five beats.
- **Contract and seam work** inherits confirmation rather than a request: `flavour` needs no
  schema edit. What it does need is `screens` promoted, because `FlavourLine`'s reserved extent
  and its cap live in this key and nowhere else.

## Flagged to the developer

The brief is silent on whether a Find says anything about itself; the only binding input is that
humor lives in flavour text. I decided **all 24 carry a line and one shows at a time**.
**Live alternatives:** 6 lines only, on the six funny Finds (rejected, it grades six objects
against `rarity`); no field at all, humor deleted from the game (defensible and the smallest
answer, and it is what ships if `RR-1` is refused); or a line per slot (unbuildable at the text
floor, and it reflows the panel). **Recommendation: take `RR-1`.** It costs one content pass on a
sheet that is already being revised, closes a binding decision that is otherwise vacuous, and
closes `RQ2` across the whole design at the same time.

## Acceptance criteria

1. Every `collection.sets[i].relics[j]` is an object carrying both `name` and `flavour`; the
   count of bare-string entries is 0, the count with `humor: true` is at most 6, and the count of
   renamed Finds against the shipped 24 is 0.
2. The built `IndexSurface` contains exactly 1 node named `FlavourLine` and 0 nodes matching
   `Slot_*/Flavour*`; `FlavourLine.Text` is the empty string in any session in which no Find was
   revealed.
3. `FlavourLine.AbsoluteSize` and every `Group_*` `AbsolutePosition` are identical before and
   after a Find is revealed, so the panel reflows by 0 pixels.
4. No `flavour` string is assigned to any rendered node for a Find whose `found` entry is false,
   at any point in a session.

## Not decided here

The 24 flavour lines themselves and who writes them (`collection`, `gameplay/meta`, with
`theme/tone/02` holding the form). Which 6 are funny (`theme/tone/02`, recommended at 6).
Whether `RR-1` is accepted (`gameplay/meta`, and this sheet is written so the refusal branch is
complete). Whether `discovery.record.keyedBy` is corrected if `RR-1` is refused
(`gameplay/systems/05`). The panel's element tree that this node joins, its height budget and
the published citation sweep (sheet 01, which holds this key). The floor size and the cap
mechanism the reserved 2 lines are measured at (sheet 03). Whether the reveal has any on-screen
component at all (Feedback UI). What a Find looks like as an object (Art and Visuals, Objects,
wave 6). Whether `screens` is promoted into `bridge/schema.mjs` (contract and seam work).
