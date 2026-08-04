# 03 — System Notices

**Domain:** ui-ux/feedback · **Category:** UI/UX · **Wave:** 5

## Decision

**One system notice exists and two do not.** A failed save read fires
`Saved Progress Did Not Load. New Progress Is Not Kept.` once, for 5.0 s. **Nothing fires**
between join and the first snapshot, and **nothing fires** for a mid-session pass purchase.
A `system` member is not a beat, never enters `Beats.luau`'s queue, and obeys sheet `02`'s
slot rules unchanged.

## Why

### (a) The failed read — yes, and this is the case the domain exists for

`Persistence.load` warns, sets `blockedSaves[player]`, and returns `defaultState()`; `save`
then refuses to write for that player for the rest of the session and returns false
`[research: game/src/server/Persistence.luau]`. A returning player with 18 Finds joins,
sees `0 / 24` and an empty index, plays a full session, and every Shard and every Find of it
is discarded on leave. **Both stopping-rule bars**: a player would notice, and two builders
provably differ on whether the game says anything, because nothing in the brief or any merged
key mentions it.

Roblox documents `pcall` wrapping and exponential backoff for data-store errors and **states
no recovery behaviour at all** — no guidance on kicking, messaging or session locking
`[research: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits]`.
So this ruling is unspecified by the platform rather than a deviation from it. Silence was
the cheap answer and it is wrong: the harm is real, shipped and reachable, and *"there is no
failure state"* `[brief: soft]` ← `02-GAMEPLAY.md` is a statement about the **game's** rules,
not a licence to hide an infrastructure failure from an eight-year-old.

### The string, checked line by line

`Saved Progress Did Not Load. New Progress Is Not Kept.` — two sentences, 5 words each,
53 characters.

| rule | source | result |
|---|---|---|
| no first or second person | `theme/tone/01` P1 | contains no `I`, `we`, `you`, `your`, `my` |
| declarative only, no imperative | `theme/tone/01` P2; `firstSession.tutorialDevicesForbidden.imperativeString` | both sentences are subject-verb statements; neither opens with a verb |
| no `game`, `server`, `session`, `player`, `account` | `theme/tone/01` P6 | none present. This is also what bars *"Rejoin to restore your progress"* — three times over, before `F19` is reached, and **`F19` does not reach this case at all**: it bars naming, showing or pricing a *product* |
| ≤ 12 words a sentence, ≤ 2 sentences | `vocabulary.maxSentenceWords`; `theme/tone/01` P3 | 5 and 5, two sentences |
| `allowedPattern` `^[A-Za-z0-9 ,.'%%/-]+$` | `vocabulary` | letters, spaces and two full stops only |
| eight banned words | `vocabulary.bannedWords` | none present |
| title casing | `vocabulary.casing` | every word capitalised |
| not permanently unavailable | `theme/tone/04` D8 (`missed`, `expired`, `gone`) | both clauses are about this load and this session, in the present and simple past |
| no mood word, no age veneration, no fourth wall | `theme/tone/01` P6–P8 | none |

**The second sentence is load-bearing and I nearly cut it.** Without it the player reads
*"did not load"* as a slow start and keeps playing, which is exactly the harm — the latch is
permanent for the session and no later save will succeed. The first sentence alone would be
technically true and practically a lie. `[cid: decided]`

**It exceeds `maxLabelChars` 14, deliberately.** `theme/vocabulary/01` already exempts one
prose field, `upgrades[].blurb`, from the character ceiling while holding it to the ban list
and a word bound; `notices.members[].text` is the same field class. The two beat strings in
sheet `01` sit under 14 anyway. **A save-failure fact cannot be stated in 14 characters and I
will not ship a truncated one to satisfy a ceiling written for one-word labels** — the route
is an amendment naming the field class, filed below. `[cid: decided]`

### Dwell 5.0 s, the longest thing on screen in this game

`[playtest unknown]`, test range 4.0–8.0 s. It sits at the platform's own
`DEFAULT_NOTIFICATION_DURATION`
`[research: https://raw.githubusercontent.com/Roblox/Core-Scripts/master/CoreScriptsRoot/CoreScripts/NotificationScript2.lua]`
and above both beat notices because it is the only string in the game carrying information a
player cannot re-derive from the screen. It **fires once** and never repeats: a message
repeated every 45 seconds is nagging, and `theme/tone/04` `D6` already bars anything that
blinks or pulses for the same reason. It is not louder, larger or animated — sheet `01`'s
`motion` block applies unchanged.

### It is not a beat, and the wire it needs

`response.negativeBeats` is 0 and `R10` says a refused purchase and an unconfirmed clear emit
nothing, so this cannot be a sixth beat and must not be sequenced. `Beats.luau`'s queue,
`minOnsetGapSeconds` and `response.beats[].rank` are all untouched by it
`[research: game/src/client/Beats.luau]`.

**The client cannot currently learn the read failed.** `Persistence.load`'s second return
value is server-side only. The smallest closure is **one boolean on the first snapshot** —
live, never persisted, carrying no message text and no player identifier, so `social/03`
`X7` is satisfied by shape. I state the requirement and set no field name; the transport is
`protocol` and `replication`'s.

### (b) Join to the first snapshot — no notice

`firstSession` already fixes three surfaces present at the first frame with join values: the
currency readout, the collection count at `0`, and the area bar at `"0%"`. **The HUD does not
stand blank; it stands at zeros.** A loading plate would therefore be an unrequested overlay
over a populated screen, which `onboarding/03` `T6` forbids by name, and it would be a
first-frame-only string, which `T5` forbids as a class. It would also be indistinguishable
from a real new-player state, teaching a new player that their empty HUD is an error.

If the snapshot never arrives, the zeros stand — and the two causes are separable: a failed
read is case (a) and has a notice; a stalled or dropped snapshot is a `prediction` and
`replication` question about the wire, not a copy question. **Naming both a `system` silence
with its reason is the output**, so no builder adds a spinner to close what looks like a gap.

### (c) The mid-session pass purchase — no notice, and I say which reading I relied on

**Three readings exist in the research pack and I relied on the strongest one, which is also
the one most favourable to a notice existing.**

| reading | source | what it says |
|---|---|---|
| **A — relied on** | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]` | *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate."* Documentation, and the generation source for the rendered reference page. So **a second read does eventually succeed.** |
| B | `cid/tech/networking/_lead.md`, citing an open feature request with no staff reply, most recent comment December 2025 `[research: cid/tech/networking/_lead.md]` | re-polling returns the join-time answer forever. Community consensus. Its URL is **not in the research pack**, so it is cited as a repo read and not as a source. |
| C | `[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]` and `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]` | the cache is real, rejoining is the common workaround, and `PromptGamePassPurchaseFinished` fires on prompt completion — i.e. only for prompts the experience raised. Under ruling R-4 the game raises none. |

**Under A the notice ruling is still no, on three independent grounds.** (1) `products.F19`
forbids naming, showing or pricing a product on any in-game surface, and any plate announcing
that a pass took effect names the product. (2) Even under A the cache updates **silently**:
the only cause a notice could hang on is a poll returning a different answer than the last
poll, which is a state comparison, not an event, and `response` defines no non-beat positive
cause. (3) Every useful phrasing is barred by `theme/tone/01` P1, P2 and P6, which is the
correction my index makes and I carry forward: it is the register, not `F19`, that bars a
rejoin instruction in the save case.

**The branch, stated so a later reader can check it rather than trust me.** If ruling R-4 is
ever reversed and the game raises `PromptGamePassPurchase`, the platform gives a
client-observable moment with a definite cause and a player who asked for it. **That reopens
the question as a beat-membership ruling against `response` — a sixth beat — and not as a
system notice**, and it would belong to whoever holds `response`, not to me. Under B and C
nothing happens in-session at all, so the ruling is unchanged and reached more cheaply.

**A residual harm that is not mine and that reading A creates.** If `entitlements` grows the
second read the Store UI and Networking leads both want, the pass applies mid-session and
**nothing on screen changes**: no readout shows effective clear radius, and `mechanics/04`
`T11` drives tool head width from Reach *level*, which a product factor does not move
(`cid/_state.md` records `Span`'s deliverable as depending on a `tool` change nobody has
agreed). The player pays 499 R$ and sees no confirmation of any kind. **That is a legibility
defect in `tool` and `products`, not a missing notice**, and closing it with a plate would
breach `F19`.

```json
{
  "amends": "notices",
  "value": {
    "classes": {
      "beat": "caused by response.beats[*]; scheduled by Beats.luau; subject to minOnsetGapSeconds and response.beats[].rank",
      "system": "caused by an infrastructure condition, never by a payoff; NOT a beat; never entered into Beats.connect's queue; not subject to minOnsetGapSeconds or rank; obeys notices.slots and notices.interaction unchanged"
    },
    "systemNoticesAreBeats": false,
    "systemNoticesEnterBeatScheduler": false,
    "members": [
      {
        "id": "saveNotLoaded",
        "class": "system",
        "beat": null,
        "cause": "Persistence.load could not read the DataStore, returned defaultState() and latched blockedSaves for this player",
        "causeFile": "game/src/server/Persistence.luau",
        "text": "Saved Progress Did Not Load. New Progress Is Not Kept.",
        "textChars": 53,
        "textWords": 10,
        "textSentences": 2,
        "textFieldClass": "prose",
        "textFieldClassNote": "bound by vocabulary.maxSentenceWords, allowedPattern and bannedWords; exempt from maxLabelChars on the same footing as upgrades[].blurb",
        "varies": "never",
        "dwellSeconds": 5.0,
        "dwellTestRange": [4.0, 8.0],
        "dwellPlaytestUnknown": true,
        "repeats": false,
        "firesAt": "the first snapshot that carries the unreadable flag",
        "firesPerSession": 1,
        "anchorGroup": "noticeStack",
        "requiresWire": {
          "what": "one boolean, server to client, true when Persistence.load returned readable=false for this player",
          "persisted": false,
          "carriesText": false,
          "carriesPlayerIdentifier": false,
          "satisfies": "social/03 X7 by shape - the field cannot hold another player's id",
          "ownedBy": "protocol and replication; this key states the requirement and names no field"
        }
      }
    ],
    "systemSilences": [
      {
        "id": "joinBeforeFirstSnapshot",
        "fires": false,
        "reason": "firstSession puts three surfaces on screen at the first frame with join values (currency, collection count 0, area bar 0%), so the HUD stands at zeros rather than blank. A loading plate would be an unrequested overlay (onboarding/03 T6) and a first-frame-only string (T5), and would teach a new player that an empty HUD is an error.",
        "separableCause": "a stalled or dropped snapshot is a prediction and replication question about the wire, not a copy question; a failed read is saveNotLoaded"
      },
      {
        "id": "midSessionPassPurchase",
        "fires": false,
        "readingReliedOn": "MarketplaceService creator-docs YAML - an out-of-experience purchase propagates to the ownership cache within several minutes, so a second read does eventually succeed",
        "reason": "three independent grounds, all of which hold under that reading: products.F19 forbids naming, showing or pricing a product on any in-game surface; the cache updates with no event, so the only available cause is a poll differing from the previous poll, which response defines no member for; and theme/tone/01 P1, P2 and P6 bar every useful phrasing.",
        "reasonUnderAlternateReadings": "if re-polling instead returns the join-time answer forever (tech/networking's reading), nothing happens in-session and the ruling is unchanged",
        "branchThatWouldReopenIt": "reversing ruling R-4 so the game raises PromptGamePassPurchase gives a client-observable moment with a definite cause. That reopens it as a beat-membership ruling against response - a sixth beat - not as a system notice, and it belongs to the holder of response.",
        "residualHarmNotClosedHere": "under the relied-on reading with a second read added, the pass applies mid-session and nothing on screen changes: no readout shows effective clear radius and mechanics/04 T11 drives tool head width from Reach level, which a product factor does not move. That is a legibility defect in tool and products; a plate closing it would breach F19."
      }
    ],
    "forbiddenAdditions": [
      { "id": "loadingSpinner", "what": "a spinner, skeleton, progress ring or 'loading' plate at join", "ruling": "onboarding/03 T5 and T6; firstSession puts join values on screen", "observable": "systemSilences contains joinBeforeFirstSnapshot with fires false" },
      { "id": "retryControl", "what": "a retry, reload or reconnect button on the failed-read plate", "ruling": "notices.interaction.dismissible and .focusable are false; response R5-R7 forbid a message needing a press", "observable": "no GuiButton descendant under the noticeStack anchor" },
      { "id": "rejoinInstruction", "what": "any string telling the player to rejoin, restart or come back", "ruling": "theme/tone/01 P1, P2 and P6 - NOT products F19, which reaches only the product case", "observable": "saveNotLoaded.text contains none of rejoin, restart, reconnect, again, back, you, your" },
      { "id": "errorCode", "what": "a DataStore error code, HTTP status, stack trace or internal identifier in player-facing text", "ruling": "theme/tone/01 P6 forbids reference to the game as a game; the string carries no digit", "observable": "saveNotLoaded.text matches ^[A-Za-z .]+$" },
      { "id": "saveIndicator", "what": "a persistent saving/saved icon, dot or status light", "ruling": "cid: decided - a permanent status light is a HUD element, not a transient message, and composition's element inventory closes at eight groups", "observable": "no notices member has repeats true or an unbounded dwell" },
      { "id": "passAppliedNotice", "what": "any plate stating that a purchase took effect, is pending, or will apply later", "ruling": "products F19", "observable": "systemSilences contains midSessionPassPurchase with fires false" }
    ]
  }
}
```

```coinage
{
  "coins": "Saved Progress Did Not Load. New Progress Is Not Kept.",
  "renderable": true,
  "kind": "notice-text",
  "wave": 5,
  "because": "the only string in the game reporting an infrastructure failure; no contract path until notices is promoted",
  "requestsPath": "notices.members[saveNotLoaded].text",
  "surface": "the noticeStack plate, drawn over live play, once per affected session"
}
```

## Consequences for other work

- **Persistence work (`tech/persistence`)** owns the mechanism and now has a stated consumer.
  Whatever it does about `blockedSaves` — keep the latch, retry with backoff, or lock the
  session — **one boolean has to reach the client**, because the current second return value
  of `Persistence.load` stops at `server-main`. If persistence instead makes the failure
  recoverable and the latch clears mid-session, this notice's `firesAt` moves and the string
  becomes wrong: raise it as a revision request against this sheet rather than editing the
  copy.
- **Snapshot and wire work (`protocol`, `replication`, `prediction`)** inherits one live,
  never-persisted boolean with no text in it. It must not be added to `StoredState` —
  `Persistence.save` writes exactly seven fields and *"the payload has no conditional branch
  in it"* `[research: game/src/server/Persistence.luau]`, which is a property worth keeping.
- **Store UI (`offerSurface`)** and **ownership-resolution work (`ownershipAuthority`)** get
  their copy answer: **there is no message, under any of the three readings**, and the reason
  is not that nothing is sayable. The residual harm above is theirs and `tool`'s, not mine.
- **Held-tool work (`tool`) and offer-ladder work (`products`)** inherit the harm named
  above by name: with a second read added, a purchased pass applies and produces no visible
  change anywhere. `mechanics/04` `T11` and `products` criterion 4 are the two rulings that
  disagree, and `cid/_state.md` already records the disagreement. **A notice may not be the
  fix.**
- **Coinage intake (`theme/vocabulary/04`)** gets the third and longest prose-class renderable
  coinage, and **the holder of `vocabulary`** gets the field-class request: a `text` field of
  class `prose` is bound by `maxSentenceWords`, `allowedPattern` and `bannedWords`, and exempt
  from `maxLabelChars` exactly as `upgrades[].blurb` already is.
- **Screens (`screens`)** keeps the collection index's own empty, loading and error states.
  This sheet decides nothing inside an opened surface, and the panel's own error state is not
  this notice.

## Acceptance criteria

1. `notices.members` contains exactly one entry with `class: "system"`, id `saveNotLoaded`,
   and `notices.systemSilences` contains exactly two entries — `joinBeforeFirstSnapshot` and
   `midSessionPassPurchase` — each with `fires: false` and a non-empty `reason`.
2. `saveNotLoaded.text` matches `^[A-Za-z .]+$`, has two sentences of ≤ 12 words each, and
   contains none of `you`, `your`, `game`, `server`, `session`, `player`, `account`, `rejoin`,
   `restart`, `again`, `missed`, `expired`, `gone`, nor any of the eight `bannedWords`.
3. No `class: "system"` member is ever inserted into `Beats.connect`'s `queue`: the built
   client contains zero references to `saveNotLoaded`, `minOnsetGapSeconds` or
   `response.beats[].rank` inside the system-notice code path, and `response.beats` gains no
   sixth row.
4. `saveNotLoaded` fires at most once per session and its trigger is a live, never-persisted
   field: `StoredState` still has exactly seven fields and `Persistence.save`'s payload still
   contains no conditional branch.

## Not decided here

- **Which beats produce a notice, the dwell figures, the interaction properties and the closed
  `forbidden` list** — sheet `01`, this domain, which holds the `notices` key.
- **What two live notices do to each other** — sheet `02`, this domain. A `system` member
  obeys its rules unchanged and is given no exemption.
- **What happens to `blockedSaves`, whether the read is retried, and whether a failed session
  should be locked or kicked** — `tech/persistence`. I own only what the player is told.
- **The field name, channel and encoding of the boolean** — `protocol` and `replication`
  (`tech/networking`).
- **Whether `entitlements` gains a second ownership read, and at what interval** —
  `ownershipAuthority` (`tech/networking`) and `products.ownershipCheck`; I consume the
  question and set none of it.
- **Whether a purchased pass produces any visible change at all** — `tool` and `products`. It
  will not be a notice.
- **The collection index's own empty, loading and error states** — `screens`.
