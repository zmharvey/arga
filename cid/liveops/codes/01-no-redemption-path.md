# 01 — No redemption path

**Domain:** liveops/codes · **Category:** Live Ops · **Wave:** 7

## Decision

**`codeCount: 0`, grounded on structure and not on priority 3: this game has no redemption
surface on any of four independent limbs** — text entry, deep-link launch data, group
membership, and bearer entitlement. A free-to-claim game pass is ruled a code by its grant and
is forbidden with the rest.

## Why

**The grounding I was handed is circular, so I do not use it.**
`products.forbidden[F15].closedBy` reads *"03-META.md priority 3 (codes) + theme/tone/04 D10"*,
and `D10`'s own reason column reads *"Priority 3 excludes codes"*. That chain grounds out in
`03-META.md`'s priority list, which is `[brief: soft]` ← `[I assumed — the ordering; …no explicit
priority list was interviewed]` and confirmed at 0 interview questions (`OPEN.md §5` row 7). My
category brief's line that `F15` closes the surface *"independently of priority 3"* is true of
the **check** and false of the **reasoning**. The independent grounding is the four limbs below,
plus `00-CORE.md`'s *"Beating the genre's retention curve. Offered and declined"*
`[brief: binding]` ← `[you chose: R1 Q3]`, which is the only line in this domain's evidence base
that a soft-tag argument cannot move.

**The four limbs, and why one is not enough.** Three of the four need no text input at all, so a
`TextBox` count closes one quarter of the surface and reads as if it closed all of it.

| # | limb | mechanism it would use | closed by | baseline in `game/src` today |
|---|---|---|---|---|
| `L1` | a text field the player types into | a `TextBox` plus a submit control | `screens[index].tree` is `Frame` and `TextLabel` only, six rows; `input.gameDrawnPressables: 4` and `input.closed: true` under R-1; `navigation.notNodes[priority3Surfaces]` names *code entry*; `navigation.addNodeRule` — *"it adds no game-drawn pressable"*; `products` `F15` | 0 `TextBox` **created**; 9 textual hits, none a construction — see below |
| `L2` | a deep link carrying a payload | `Player:GetJoinData().LaunchData`, ≤ 200 bytes, *"Users can modify the URL, so the data might not be authentic"* `[research: https://create.roblox.com/docs/production/promotion/deeplinking]` | no channel exists to publish the link (gap G1); the payload is player-modifiable, so it is a grant with no validator; `products` `F20` forbids purchase-derived state in the save and an unvalidated grant is worse | `GetJoinData` 0, `LaunchData` 0, `TeleportData` 0 |
| `L3` | a group-membership grant | `Player:IsInGroupAsync` / `GetRankInGroupAsync`; the deprecated `IsInGroup` / `GetRankInGroup` are the same shape. **Neither form requires player input** `[research: https://create.roblox.com/docs/reference/engine/classes/Player]` | `products` `F15` forbids the group-join prompt; the brief names **no group** anywhere (gap G1); the grant would be a modifier `modifiers` has no class for and `F6` forbids if it expires | `IsInGroup` 0, `GetRankInGroup` 0 |
| `L4` | a bearer entitlement — a free pass handed out as a link | `MarketplaceService:UserOwnsGamePassAsync`, already called at join | ruled below; `products.itemCount: 1`, `devProductCount: 0`, `F9` (one `axis`, one `factor`, no `grants` array), `F5` (every `kind` is `gamePass`, every `repeatable` false) | **1 call site**, `server/Entitlements.luau:119`, on `products`' entitlement path `[research: game/src/server/Entitlements.luau]` |

**`F15`'s observable is wrong twice, and I am filing a revision request rather than editing it.**
Its check reads *"zero `TextBox` instances in any screen"*, and a verifier who runs it as a grep
of the renderer gets 9 hits in 3 files, **none of which creates one**: `HudBinding.luau:86` is a
type alias, `:241` and `:258` are `IsA` tests, `Input.luau:268` is a comment and `:272` calls
`GetFocusedTextBox` to abort every verb while a box is focused, and `UIBuilder.luau:390,460,471,474`
is generic plumbing `[research: game/src/shared/UIBuilder.luau]`, `[research: game/src/client/Input.luau]`.
That is a false positive today. The false negative is worse: `UIBuilder.luau:412-418` is
`local class = node.class or "Frame"` then `Instance.new(class)`, and `CLASS_DEFAULTS` already
carries `TextBox = { ClearTextOnFocus = false }` — **the renderer builds a code box from one JSON
node with no Luau change at all**. So the check must run against the **screen spec** and not
against renderer source, exactly as `cid/audio/music/01` published why its own grep undercounted.
`L1`'s check below is `screens[].tree[].class`, whose six rows are `Frame` and `TextLabel`.
`[research: cid/ui-ux/screens/01-collection-index.md]`

**`L4` is the one nobody had ruled on, and it decides gap C5.** A free-to-claim game pass grants
exactly what a code grants, needs no text entry and has a live call site in the shipped build.
**Ruling: a bearer entitlement is a code whenever the thing that entitles the player is
distribution rather than purchase.** It is therefore forbidden here, not merely unsold. This does
not touch `products`: the one SKU stays purchasable, `Entitlements.luau:119` stays, and what is
forbidden is a *second* id, or the existing id given away. Without this ruling a reversal walks
straight through `L1` to `L3` and never touches a `TextBox`. `[cid: decided]`

**The five subjects this node owns are vacuous, and each is recorded rather than dropped**,
following `cid/audio/stingers/03`. Every observable is a count.

| subject | value | emptied by | observable |
|---|---|---|---|
| code types and rewards | `[]` | `codeCount: 0`; `modifiers` holds permanent stat changes only and has **no boost class**, so the research line's *"free boosts"* has no referent (gap C4); `03-META.md` *"Never content access"* `[brief: soft]` | `len(codes.codes) == 0` and `len(codes.subjects[codeTypes].rows) == 0` |
| issuance cadence and triggers | `cadence: "none"`, `triggers: []` | `release.forbidden` `N2` (*"any flag keyed to a date, a calendar or a season"*), `N3`, `N10`; `kpis.cadence` already owns the only review rhythm and **closes**, and no second cadence may be published | zero fields anywhere in `codes` name a date, calendar, season, interval or `os.time` |
| expiry and redemption limits | `expiry: "none"`, `perPlayerLimit: 0`, `globalLimit: 0` | `02-GAMEPLAY.md` *"Zero tension is deliberate"* `[brief: soft]` — an expiry is a clock; `products` `F6` forbids anything that expires, decays, resets or is consumed | `codes` carries no field named `expires`, `duration`, `seconds`, `uses` or `charges`, and both limit fields are `0` |
| abuse prevention | `required: false`, `serverValidators: []`, `newSaveFields: 0` | there is no grant path to abuse; `input.clientOriginatedRemotes` is exactly `["RequestState","BuyUpgrade"]` and `BuyUpgrade` carries an upgrade id and never a string | zero server modules read a player-supplied string; `game/src` contains zero remotes carrying a `string` payload from client to server |
| where codes are published | `[]`, `referentExists: false` | **gap G1: the brief states no off-Roblox presence anywhere** — no group, no Discord, no social account, in five layer sheets, `OPEN.md` or `research/`. This is an **empty referent, not a forbidden one**, and the distinction matters: nobody has declined a channel, nobody has one | `len(codes.publicationChannels) == 0` and `referentExists == false` |

**The counter-evidence, answered rather than waved off.** The line is
*"Codes for free boosts, and a group-join reward. Both are near-universal on Roblox incrementals
and their absence reads as an unfinished game"* (`research/grass-incremental.md`). It sits in a
bullet list titled *"What players of this will expect"* and **carries no `[research: url]` of its
own**, unlike every other claim in that document, whose Numbers, skeleton and monetization
sections each cite a source. So it is not a `[research: url]` the handoff ladder tells me to argue
with; it is an untagged assertion inside a research file, and gap C1 is real.

**Its codes half is falsified by its own subject.** The reference's experience description
advertises *"Join the Unequal Games group for in-game boosts!"* and a like/favourite prompt and
**never mentions codes or redeeming anything**
`[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`. The same
studio's Scrap Incremental ships a byte-identical description template with the same group boost
and no codes `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`. A codes
aggregator maintains a page for the reference and lists **no active codes as of March 2026**
`[research: https://deltiasgaming.com/roblox-grass-incremental-codes/]`. Against 38.2M visits and
a 96.2% like ratio at the brief's read
`[research: https://www.rolimons.com/game/133086043677134]`. **If absence read as unfinished, the
reference would be reading as unfinished.** The ruling does not have to clear this claim.

**Its group-join half is corroborated and is not mine.** Both surveyed titles ship it. `products`
`F15` holds the *prompt*, Community holds the *channel*, and this node holds only the *grant* —
`L3` above, one row.

**What the project accepts, priced honestly.** It accepts the audience of the third title, the
one that does ship codes: Garden Incremental's redemption path is *"click on the Shop button…
click the Codes button… Enter the promo code… Click on the Redeem button"*
`[research: https://gamerant.com/roblox-garden-incremental-codes/]`, and a player arriving from a
codes aggregator finds nothing here. That is a retention cost, and retention is `00-CORE.md`'s
stated non-goal at `[brief: binding]`, with success defined as *"shipped artifacts, not players"*.
**Three titles is not a survey and the claim's word was "near-universal."**
`[research owed: the code-redemption status of the top ~20 experiences in Roblox's Simulator or
Incremental sort, read from each experience description, which is where a shipping game publishes
its codes. A search-engine summary is not adequate — this brief already records one invented
figure from exactly that source, `research/grass-incremental.md` line 91.]` The ruling does not
rest on the survey; the survey would only sharpen this paragraph.

**Roblox operates avatar promo codes on `roblox.com/promocodes` and supplies no first-party
in-experience redemption API**, which is why the Garden Incremental path above is hand-built out
of a shop screen and a text box. Stated as reasoning from that fetched instruction sequence and
**not as sourced**. `[unverified]`

**This sheet coins zero player-facing strings**, so `vocabulary` binds nothing here and there is
no ` ```coinage ` block. Every value in the key is a count, a boolean, a sentinel or an
identifier. No value is `null`: absent scalars are `"none"`, absent lists `[]`, absent counts `0`,
per `tech/deploy/02`.

```manifest
{
  "provides": "codes",
  "status": "proposed",
  "value": {
    "codeCount": 0,
    "codes": [],
    "groundedOn": "structural: no redemption surface exists on any of four independent limbs",
    "restsOnPriority3": false,
    "restsOnPriority3Because": "products.forbidden[F15].closedBy cites 03-META.md priority 3 and theme/tone/04 D10, and D10's own reason is 'Priority 3 excludes codes'. That justification is circular and is replaced here by redemptionSurfaces plus 00-CORE.md's binding retention non-goal.",
    "bindingGrounds": [
      "00-CORE.md non-goal: 'Beating the genre's retention curve. Offered and declined.'",
      "00-CORE.md purpose: 'Success is shipped artifacts, not players.'"
    ],
    "redemptionSurfaces": [
      {
        "id": "L1",
        "limb": "textEntry",
        "exists": false,
        "mechanism": "a TextBox the player types a code into, plus a submit control",
        "closedBy": "screens[index].tree is Frame and TextLabel only across six rows; input.gameDrawnPressables 4 with input.closed true under ruling R-1; navigation.notNodes[priority3Surfaces] names code entry; navigation.addNodeRule forbids a surface that adds a game-drawn pressable; products F15",
        "check": "every value of screens.screens[].tree[].class is in [\"Frame\",\"TextLabel\"], and the count of screen-spec nodes whose class is TextBox is 0",
        "checkIsNot": "a grep of game/src for the string TextBox",
        "rawSourceGrepBaseline": 9,
        "rawSourceGrepIsAFalsePositive": true,
        "rawSourceGrepSites": [
          "game/src/client/HudBinding.luau:86 type alias",
          "game/src/client/HudBinding.luau:241 IsA test",
          "game/src/client/HudBinding.luau:258 IsA test",
          "game/src/client/Input.luau:268 comment",
          "game/src/client/Input.luau:272 GetFocusedTextBox guard, aborts every verb while one is focused",
          "game/src/shared/UIBuilder.luau:390 CLASS_DEFAULTS row",
          "game/src/shared/UIBuilder.luau:460 comment",
          "game/src/shared/UIBuilder.luau:471 holdsText test",
          "game/src/shared/UIBuilder.luau:474 placeholder branch"
        ],
        "rawSourceGrepIsAlsoAFalseNegative": true,
        "falseNegativeMechanism": "UIBuilder.luau:412-418 is `local class = node.class or \"Frame\"` then Instance.new(class), and CLASS_DEFAULTS already carries TextBox = { ClearTextOnFocus = false }. One JSON node builds a code box with no Luau change, and the source grep count would not move."
      },
      {
        "id": "L2",
        "limb": "launchData",
        "exists": false,
        "mechanism": "Player:GetJoinData().LaunchData from a deep link, 200 bytes maximum; also GetJoinData().TeleportData",
        "closedBy": "no publication channel exists to carry the link (gap G1); the payload is user-modifiable so a grant from it has no validator; products F20 forbids purchase-derived state in the save",
        "check": "rg -n 'GetJoinData|LaunchData|TeleportData' game/src returns 0 matches",
        "baseline": { "GetJoinData": 0, "LaunchData": 0, "TeleportData": 0 },
        "sourceUrl": "https://create.roblox.com/docs/production/promotion/deeplinking"
      },
      {
        "id": "L3",
        "limb": "groupMembership",
        "exists": false,
        "mechanism": "Player:IsInGroupAsync or GetRankInGroupAsync, or the deprecated IsInGroup / GetRankInGroup. No prompt and no player input is required by any form.",
        "closedBy": "products F15 forbids the group-join prompt; the brief names no group anywhere (gap G1); the grant would be a modifier class modifiers does not have, and F6 forbids one that expires",
        "check": "rg -n 'IsInGroup|GetRankInGroup|GroupService' game/src returns 0 matches",
        "baseline": { "IsInGroup": 0, "GetRankInGroup": 0 },
        "sourceUrl": "https://create.roblox.com/docs/reference/engine/classes/Player",
        "grantSideOnly": true,
        "seam": "the prompt belongs to products F15 and the channel to Community; this row holds only the grant"
      },
      {
        "id": "L4",
        "limb": "bearerEntitlement",
        "exists": false,
        "mechanism": "a game pass or product handed out free as a link and read back with MarketplaceService:UserOwnsGamePassAsync, which grants what a code grants with no text entry",
        "closedBy": "the rule below; products.itemCount 1, devProductCount 0, F5 (every kind is gamePass, every repeatable false), F9 (one axis, one factor, no grants array)",
        "check": "the count of distinct game pass ids referenced anywhere in the build is at most products.itemCount, and the only UserOwnsGamePassAsync call site is server/Entitlements.luau:119 on the products entitlement path",
        "baseline": { "UserOwnsGamePassAsyncCallSites": 1, "at": "game/src/server/Entitlements.luau:119", "furtherTextualOccurrences": 7, "furtherOccurrenceKinds": ["comment", "config string"] },
        "rule": "a bearer entitlement is a code whenever what entitles the player is distribution rather than purchase. A second pass id, or the existing id given away free, is a code and is forbidden here. The one purchasable SKU and its join-time ownership read are untouched.",
        "decidedBy": "cid: decided; gap C5, on which the brief, products and F15 are all silent"
      }
    ],
    "publicationChannels": [],
    "publicationChannelsReferentExists": false,
    "publicationChannelsGap": "G1 — the brief states no off-Roblox presence anywhere: no group, no Discord, no social account, in five layer sheets, OPEN.md or research/. The referent is empty, not forbidden. Channel creation is off-Roblox presence work [currently Discovery & Marketing — Social]; intake is feedback-channel work [currently Community].",
    "subjects": [
      { "id": "codeTypesAndRewards", "state": "vacuous", "value": [], "emptiedBy": "codeCount 0; modifiers has no boost class so 'free boosts' has no referent (gap C4); 03-META.md 'Never content access'", "observable": "len(codes.codes) == 0" },
      { "id": "issuanceCadenceAndTriggers", "state": "vacuous", "cadence": "none", "triggers": [], "emptiedBy": "release.forbidden N2, N3, N10; kpis.cadence owns the only review rhythm and closes; no second cadence may be published", "observable": "zero fields anywhere in codes name a date, calendar, season, interval or os.time" },
      { "id": "expiryAndRedemptionLimits", "state": "vacuous", "expiry": "none", "perPlayerLimit": 0, "globalLimit": 0, "emptiedBy": "02-GAMEPLAY.md 'Zero tension is deliberate' — an expiry is a clock; products F6 forbids anything that expires, decays, resets or is consumed", "observable": "codes carries no field named expires, duration, seconds, uses or charges, and both limit fields are 0" },
      { "id": "abusePrevention", "state": "vacuous", "required": false, "serverValidators": [], "newSaveFields": 0, "emptiedBy": "there is no grant path to abuse; input.clientOriginatedRemotes is exactly RequestState and BuyUpgrade, and BuyUpgrade carries an upgrade id and never a string", "observable": "zero server modules read a player-supplied string; zero client-to-server remotes carry a string payload" },
      { "id": "wherePublished", "state": "vacuous", "value": [], "referentExists": false, "emptiedBy": "gap G1 — an empty referent, not a forbidden one", "observable": "len(codes.publicationChannels) == 0 and referentExists is false" }
    ],
    "reversalPrice": [
      { "id": "RP1", "breaks": "input", "cost": "a submit control is a fifth game-drawn pressable and a sixth verb against input.closed true and gameDrawnPressables 4. Ruling R-1 contains the input overrule to one input class, two verbs, four controls and says it may not be widened." },
      { "id": "RP2", "breaks": "screens", "cost": "screens[index] has exactly 5 children, a 328px reserved stack against a 330px realised panel at a 375-point viewport, hasScrollRegion false and hasCloseControl false. A code field and a submit control do not fit, and there is no second screen." },
      { "id": "RP3", "breaks": "navigation", "cost": "notNodes[priority3Surfaces] names code entry by name; addNodeRule forbids a node that adds a game-drawn pressable; maxOpenNodes is 1. A codes node is a revision against an approved sheet, not an addition." },
      { "id": "RP4", "breaks": "modifiers", "cost": "the research line asks for 'free boosts' and this game has no boost class. modifiers holds permanent stat changes only and products F6 forbids anything that expires, decays or is consumed, so a reversal must first invent a modifier class — permanent-stat-change work [currently gameplay/systems], not this node's." },
      { "id": "RP5", "breaks": "products and endgame", "cost": "products F15 forbids the code field and the group prompt anywhere in the game and F19 forbids naming any product on any in-game surface; endgame.forbidden names redeemCode outright. Three approved rulings, each needing a Pushing back." },
      { "id": "RP6", "breaks": "publication and provisioning", "cost": "gap G1 leaves nowhere to publish a code, so a channel must be created off-Roblox first; and if any grant needs a new product it inherits release.provisioning's six manual gates, one of which is blocked on an unanswered Networking question." }
    ],
    "reversalAlsoRequires": [
      "a server validator for a player-supplied string, which is the first such path in the build",
      "an abuse model: a one-use ledger and a rate limit, which are new persistence fields against persistence's no-nullable-field rule"
    ],
    "invariants": [
      "codeCount == len(codes)",
      "every redemptionSurfaces[].exists == false",
      "len(redemptionSurfaces) == 4",
      "len(publicationChannels) == 0",
      "every subjects[].state == \"vacuous\"",
      "no value anywhere in this key is null"
    ]
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Offer-ladder and never-sold work (`products`) | **A revision request is filed below against `F15`**, on its `closedBy` and its `check`. Neither this sheet nor `codes` edits `products`. `F15`'s *rule* is ratified as written; only its justification and its observable are contested. |
| Contract-and-seam work | `codes` needs a shape in `bridge/schema.mjs` with six invariants, listed in the key. `music.trackCount == len(music.tracks)` is the pattern; the extension is that `codeCount == 0` alone does not close this subject, so the `redemptionSurfaces` length and all-false test must be part of the shape, not a comment. |
| Feedback-intake and moderation work (Community) | We share `F15` and gap G1 and the seam is stated: I hold the **grant** side of a group-join reward (`L3`), you hold the **channel**, and `products` `F15` already holds the **prompt**. If you rule that an off-Roblox channel exists, `codes.publicationChannels` gains a referent and `referentExists: false` becomes a stale field, not a wrong one. |
| Off-Roblox presence work (Discovery & Marketing — Social) | A channel created there does not reopen this ruling. `codeCount: 0` rests on the four limbs, not on having nowhere to post; a channel would close gap G1 and change nothing in this key but one boolean. |
| Permanent-stat-change work (`modifiers`) | No boost class is requested and none should be invented to make a code possible. Gap C4 is recorded, not routed as an assignment. |
| Publish-time and ownership work (`products`, `release`) | `Entitlements.luau:119` stays exactly as it is. What `L4` forbids is a **second** pass id or the existing id distributed free — it adds no guard, no call and no branch to the shipped path. |

## Acceptance criteria

1. `codes.codeCount == 0`, `len(codes.codes) == 0`, `len(codes.redemptionSurfaces) == 4`, every
   `redemptionSurfaces[].exists == false`, `len(codes.publicationChannels) == 0`, all five
   `subjects[].state == "vacuous"`, and no value anywhere in `codes` is `null`.
2. All four limbs pass as a critic runs them: `screens.screens[].tree[].class` contains only
   `Frame` and `TextLabel` and zero `TextBox`; `rg -n 'GetJoinData|LaunchData|TeleportData'
   game/src` returns 0; `rg -n 'IsInGroup|GetRankInGroup|GroupService' game/src` returns 0; and
   `UserOwnsGamePassAsync` has exactly 1 call site, at `game/src/server/Entitlements.luau:119`.
3. `rg -c TextBox game/src` returns **9** across 3 files and this is **not** a failure: the
   published baseline in `redemptionSurfaces[L1].rawSourceGrepSites` names all nine, and none is
   an `Instance.new`.
4. Zero client-to-server remotes in `game/src` carry a `string` payload, and
   `input.clientOriginatedRemotes` still equals `["RequestState","BuyUpgrade"]`.

## Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| `products` | `cid/gameplay/monetization/02-what-is-never-sold.md` | `forbidden[F15].closedBy` | *"03-META.md priority 3 (codes), theme/tone/04 D10"* | add the structural grounding: `input.closed` + `gameDrawnPressables: 4` under R-1, `navigation.addNodeRule`, `screens[index].tree`, and `00-CORE.md`'s binding retention non-goal | `D10`'s own reason column is *"Priority 3 excludes codes"*, so the chain grounds out in an `[I assumed]` ordering that was never interviewed. The rule survives; its stated justification does not. |
| `products` | same | `forbidden[F15]` observable | *"Zero `TextBox` instances in any screen"* | *"zero screen-spec nodes whose `class` is `TextBox`; every `screens[].tree[].class` in `[Frame, TextLabel]`"* — and explicitly not a source grep | run as a grep of `game/src` it returns 9 hits in 3 files, none of which creates a `TextBox`: a false positive today. `UIBuilder.luau:412-418` plus the `CLASS_DEFAULTS.TextBox` row makes it a false negative the day a JSON node adds one. |

## Flagged to the developer

`L4` is `[cid: decided]` and the brief, `products` and `F15` are silent on it (gap C5). Live
alternatives: **(1)** a bearer entitlement is a code and is forbidden — chosen, because otherwise
a reversal reaches the same outcome with no `TextBox` and passes every check; **(2)** it is a
product and belongs wholly to `products`, which leaves this node's ruling reversible by a link;
**(3)** it is neither and stays unowned, which is the state that produced this gap.
**Recommendation: as written.** Reversing it is one row.

## Not decided here

The `F15` rule itself, and every other `products` row — offer-ladder work, which owns the key and
receives the two requests above rather than an edit. Whether an off-Roblox channel exists at all,
and what a group-join prompt would say if one did — feedback-intake work (Community) for the
channel, `products` `F15` for the prompt. Whether a boost class is ever invented —
permanent-stat-change work (`modifiers`). What ships after v1 and in what order — roadmap work.
Limited-time content and recurring tracks — event and season work, which rule their own counts.
Whether `bridge/schema.mjs` promotes `codes` and whether it also rejects nulls at validation —
contract-and-seam work. The top-20 survey named in the `[research owed:]` above — a batched
research pass; the ruling does not wait on it.
