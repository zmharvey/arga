# 02 — When a purchase applies

**Domain:** ui-ux/store · **Category:** UI/UX · **Wave:** 5 · **Revised:** UI/UX verification
round 1, `P1` re-worded so this block stays byte-identical to sheet `01`'s mirror of it

## Decision

**Between paying for `Span` on the experience page and the factor taking effect, the game shows
nothing at all — no notice, no readout that announces itself, no rejoin instruction, no pending
state, and no cue that distinguishes a purchase in flight from not owning one.** What makes that
survivable rather than negligent is a server-side re-read: ownership is re-resolved **during** the
session, not only at `wiring.onJoin` step 2, applied silently through the existing snapshot and
persisted nowhere. **A failed ownership read gets the same answer and the same repair.**

## Why

**This sheet has no manifest block of its own.** Its rows are the value of
`offerSurface.pendingPurchase`, supplied inside sheet `01`'s manifest and restated below as an
`amends` block so the decision and its record sit in one place.

**Silence is forced, not chosen.** `products.F19` forbids a product being referred to on any
in-game surface `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`; `theme/tone/04`
`D12` removes every standard way of signalling that a thing has not happened; and
`input.pressable.rejectionCueOnFailedPrecondition` is `"none"`. Any of the three alone would kill a
"purchase pending" state; together they also kill the softer versions a UI writer reaches for —
a greyed row, a dimmed value, a small clock. The brief's *"there is no failure state … zero tension
is deliberate"* `[brief: soft]` (`02-GAMEPLAY.md`) is the same answer from the other end: a waiting
state is a tension state.

**But silence with nothing behind it is a player paying 499 R$ and getting nothing** — build note 4,
and bar (a) of the stopping rule `[research: cid/_state.md]`. So the honest sheet is not "show
nothing"; it is "show nothing **and** make the thing arrive by itself".

### The three-way disagreement, ruled

Three domains read the same platform and disagreed. My ruling, with what it rests on:

**The governing fact is first-party.** The `creator-docs` YAML that `create.roblox.com`'s
`MarketplaceService` page is generated from says of `UserOwnsGamePassAsync`: results are cached;
the cache updates when a purchase prompt closes; and — the sentence that is directly about this
case — *"If the user purchases a game pass outside of the experience while remaining in the same
session, the cache is eventually updated, but this process might take several minutes to
propagate."* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]`
**Eventually updated is not frozen for the session.** A second read after propagation returns the
new answer, which is why my lead's fix is a re-read and not a message.

**The Networking reading rests on weaker evidence and I am not adopting its conclusion.** It cites
an open devforum feature request asking for the cached value to be invalidated when
`PromptGamePassPurchaseFinished` fires, with no staff reply
`[research: cid/tech/networking/_lead.md]`. That is community consensus, and the request is
*for* behaviour the current documentation now describes; a request that may since have been
granted is not evidence it was refused. The second devforum thread establishes only that a cache
exists, which nobody disputes, and its own workaround — *"the only valid way … is by having
players rejoin"* — is explicitly recorded in the pack as evidence of a **belief**, not of the fact
`[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`.

**The Feedback reading is correct and is about a different thing.** `PromptGamePassPurchaseFinished`
fires only for a prompt the experience raised `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]`,
`products.F13` forbids raising one, and no in-experience event fires for a website purchase
`[research: https://devforum.roblox.com/t/new-event-marketplaceservicewebsite-gamepasspurchaseplayer-gamepassid/1157069]`.
So **nothing is pushed** to anybody — which forbids event-driven detection and a notice, and says
nothing about polling. Its sentence *"the client never learns the purchase happened"* is true of
the client and must not be read as true of the server, or a builder concludes there is nothing to
poll `[research: cid/ui-ux/feedback/_lead.md]`.

**What stays `[unverified]`, precisely.** No source states that a repeat call **from an
already-running server** observes the update, as against the unambiguous *"when a user first
enters a server after purchasing a game pass, this function always returns true"*, which is about
entering. The settling test is cheap and named in the data: join a live place with a real pass
unowned, poll every 30 s for 15 minutes, buy from the experience page at minute 2, record the
first poll that returns true. If none does, branch B is correct.

**Both branches are specified, and the build is the same under either.** The re-read is justified
without the disputed fact, because it also repairs the other case: when
`UserOwnsGamePassAsync` **errors**, `entitlements` warns once and resolves NOT OWNED
`[research: game/src/server/Entitlements.luau]` — no ownership answer was returned, so nothing was
cached, and a later call is a first call. That repair is unambiguous under both readings. Only the
retry *policy* and the honest contract differ: branch A re-reads every product resolving false for
the whole session and the contract is *"applies within the session"*; branch B re-reads only after
an error and the contract is *"applies from the next join"*. **Branch A is the default until the
test runs** `[cid: decided]`, because its cost is bounded and countable — 1 product × 16 players,
6.4 calls a minute at a 150-second interval — and its failure mode is wasted quota, while branch
B's failure mode, if it turns out to be wrong, is a paying player with nothing.

**The failed-read case gets the same answer, deliberately.** An owner whose check failed sees
nothing, exactly as a purchaser mid-propagation sees nothing, because the surfaces that could
differentiate them are the ones `F19` and `D12` removed. Giving it a *different* answer would need
an error surface, which nobody owns (gap G2) and which the register cannot phrase — *"Rejoin to
restore your progress"* fails `P1`, `P2` and `P6` before `F19` is reached. The difference between
the two cases is therefore in the repair policy and not on screen.

**Latency, and why no target under the platform's own window is meetable.** Detection latency is
propagation plus at most one interval, and propagation is *"several minutes"* with no published
bound or distribution. `maxAcceptableDetectionLatencySeconds` starts at **300** `[playtest unknown]`,
test range **120 to 900**, measured wall-clock from purchase to the first tick at which the radius
changes. The interval itself is not mine; I bound it at half the latency budget so propagation
rather than polling dominates the wait, and route the value, the retry shape and the rate-limit
budget to ownership-resolution work behind `products.ownershipCheck`.

**The cost of R-4 nobody had priced, recorded here.** The in-experience prompt is the one mechanism
the platform documents as updating the cache **immediately** — the cache updates when the prompt
closes. Forbidding it converts an instant application into a several-minute one. That is a second
cost of R-4 beside the discovery cost `monetization/01` already records, and it is stated rather
than argued: the ruling is not mine to reverse. `[cid: decided]` that it is worth recording.

```manifest
{
  "amends": "offerSurface",
  "path": "pendingPurchase",
  "value": {
    "decidedIn": "cid/ui-ux/store/02-when-a-purchase-applies.md",
    "playerVisibleOutput": "none",
    "shownOnPurchase": [],
    "shownOnFailedOwnershipRead": [],
    "emptySetReason": "products.F19 leaves no surface that may refer to a product; theme/tone/04 D12 removes every way of signalling a thing has not happened; input.pressable.rejectionCueOnFailedPrecondition is none. The three jointly force silence, so the empty set is a build instruction and not an oversight.",
    "forbidden": [
      { "id": "P1", "thing": "A purchase-pending state on any readout, pressable or panel", "closedBy": ["products.F19", "R-4"], "observable": "no readout has a third authored state beyond present and withheld" },
      { "id": "P2", "thing": "A rejoin instruction, in any words", "closedBy": ["products.F19", "theme/tone/01 P1/P2/P6"], "observable": "zero rendered strings match /rejoin|restart|log ?out|come back|try again/i" },
      { "id": "P3", "thing": "A notice, toast, banner or modal when ownership resolves true mid-session", "closedBy": ["theme/tone/03 B4", "response.notice channel"], "observable": "the notice channel carries exactly two members, both completions; an ownership change enqueues nothing" },
      { "id": "P4", "thing": "A cue distinguishing not-yet-propagated from not-owned", "closedBy": ["theme/tone/04 D12", "input.rejectionCueOnFailedPrecondition: none"], "observable": "the two states are byte-identical on every surface; a diff of the rendered HUD across them is empty" },
      { "id": "P5", "thing": "A readout that announces itself when the factor lands (flash, pulse, count-up, colour change)", "closedBy": ["firstSession S6/S7", "theme/tone/04 D6", "theme/tone/03 B4"], "observable": "no Tween is created on any element by an owned-map change" },
      { "id": "P6", "thing": "A progress, spinner or waiting affordance for the ownership re-read", "closedBy": ["R-4", "onboarding/03 T6", "theme/tone/04 D12"], "observable": "the re-read creates and mutates no Instance on any client" },
      { "id": "P7", "thing": "An error, warning or retry surface when an ownership read fails", "closedBy": ["products.F19", "02-GAMEPLAY.md no failure state", "theme/tone/04 D12"], "observable": "the failure path in entitlements warns to the server console and touches no client" },
      { "id": "P8", "thing": "Any purchase-derived value written to the save payload, including a pending flag", "closedBy": ["products.F20"], "observable": "the save payload contains no pass id, product id, purchase-sourced factor or pending marker" }
    ],
    "resolution": {
      "trigger": "a server-side periodic re-read of products.ownershipCheck during the session, not only at wiring.onJoin step 2",
      "appliedVia": "the existing StateChanged snapshot, published on the next changed tick",
      "silent": true,
      "persisted": false,
      "clientEverTold": false,
      "controlEverAffected": false,
      "intervalOwnedBy": "ownership-resolution work, behind products.ownershipCheck",
      "intervalBound": "intervalSeconds <= maxAcceptableDetectionLatencySeconds / 2, so propagation rather than polling dominates the wait",
      "quotaArithmetic": "1 product x 16 players / interval; at 150 s that is 6.4 UserOwnsGamePassAsync calls per minute per server",
      "defaultPolicyUntilTested": "branchA",
      "policy": {
        "branchA": "re-read every interval, for the whole session, for every product currently resolving false",
        "branchB": "re-read only products whose last read errored, bounded attempts, and treat a clean false as final for the session"
      },
      "notAvailableAtAnyLatency": "a client message asserting ownership — economy.authority and the two-channel client surface both forbid it"
    },
    "failedRead": {
      "case": "UserOwnsGamePassAsync errors; entitlements warns once and resolves NOT OWNED",
      "playerSees": "nothing",
      "sameAnswerAsPurchaseCase": true,
      "repairedBy": "the same periodic re-read, under both branches",
      "whyItIsNotDisputed": "a pcall failure returned no ownership answer, so nothing was cached; a later read is a first read and the platform cache question does not arise",
      "worstCaseWithoutIt": "an owner plays a whole session at the base radius having paid 499 R$"
    },
    "latency": {
      "maxAcceptableDetectionLatencySeconds": 300,
      "playtestUnknown": true,
      "testRangeSeconds": [120, 900],
      "boundedBelowBy": "the platform's stated several-minute propagation window; no target under that is achievable at any poll rate",
      "measurement": "wall-clock from the experience-page purchase to the first tick at which the effective radius changes"
    },
    "cacheDispute": {
      "question": "does a repeat UserOwnsGamePassAsync call from the same running server observe a purchase made outside the experience during that session",
      "ruling": "yes, after propagation — the first-party generation source governs over community consensus",
      "status": "[unverified]",
      "governingSource": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml",
      "contraryReading": "cid/tech/networking/_lead.md, from an open devforum feature request with no staff reply",
      "settledBy": "one in-Studio or live test: join with a real pass unowned, poll every 30 s for 15 minutes, buy from the experience page at minute 2, record the first poll returning true. If none returns true, branch B is correct.",
      "buildIsUnchangedByTheAnswer": true
    },
    "costOfR4": {
      "what": "the in-experience prompt is the one mechanism the platform documents as updating the cache immediately, on prompt close",
      "consequence": "R-4 converts an instant application into a several-minute one",
      "status": "recorded, not reopened; the second cost of R-4 beside the discovery cost monetization/01 records"
    }
  }
}
```

## Pushing back

**Against `gameplay/monetization/01`'s `products.ownershipCheck`, one clause.** It reads
*"UserOwnsGamePassAsync(userId, gamePassId), read at join and never persisted"*. Read literally,
"at join" forbids the only mechanism that closes build note 4, and `Entitlements.luau`'s header
says the same from the code side — *"Called once per join and never again … and not on a timer"*.
I am requesting a one-clause revision to *"read at join and re-read during the session; never
persisted"*. **Nothing else in that key moves**: `F20` is untouched and strengthened, since a live
re-read is the opposite of persisting; `F13` and `F19` are untouched, since the re-read draws
nothing and says nothing; `storeExists` stays false.

**Against the networking domain's ownership-authority subject**, which is being written this same
wave and instructed to record *"no in-server re-resolution trigger exists"* as data. Under my
ruling a periodic re-read **is** an in-server trigger, and the honest contract is not
unconditionally "applies from the next join". I do not ask it to adopt my reading on my authority —
I ask that it carry the fact as disputed with both branches, as I have, so that whichever way the
named test lands, no key has to be rewritten and no builder is blocked.

**A narrowing, not a contradiction, for notice work.** Its case-(c) ruling — no notice may fire —
stands unchanged and I depend on it. Its stated *reason*, "the client never learns the purchase
happened", is true only of the client. Stated as it is, a builder reads it as "there is nothing to
poll" and drops the re-read that is the entire remedy here.

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Ownership-resolution and `entitlements` build work | You gain a second call site and a bound: `intervalSeconds <= maxAcceptableDetectionLatencySeconds / 2`, branch A until the named test runs, `pcall`-guarded exactly as today, no client contact, nothing persisted. Refusing on rate-limit grounds is legitimate and revises this sheet — but a refusal must also say what repairs the failed-read case, because that half does not depend on the disputed fact. |
| Snapshot and replication work | An ownership change alters the effective radius and therefore the client's derived predictor input. It must reach the client through the existing `StateChanged` snapshot with no new remote, no new field and no marker naming a product. |
| Notice and transient-message work (`notices`) | Zero notices from this subject, in either case. If an error surface is ruled to exist, `P7` still forbids it carrying the ownership failure, and `P2`'s grep for `rejoin` binds its copy. |
| HUD composition work (`composition`) | A readout whose value changes because a factor landed may not announce itself — no tween, no flash, no count-up. This is the same silence `firstSession` `S6`/`S7` requires of a lift, extended to a cause nobody had enumerated. |
| Held-tool work (`tool`) | If head width resolves from effective radius, the tool head is the one thing in the world that visibly changes when the re-read succeeds. That is permitted and is not a cue: it may not be accompanied by a sound, a particle or a notice. |
| Analytics work | The gap between an experience-page purchase and its application is now a measurable interval with a stated 300-second target. Whether it is instrumented is yours. |

## Acceptance criteria

1. Zero strings rendered anywhere in the build match `/rejoin|restart|log ?out|come back|try again/i`, and no client-side element is created, tweened, faded or made interactable by a change to `state.owned`.
2. `entitlements` is called from at least two sites: `wiring.onJoin` step 2 and a periodic re-read whose interval satisfies `intervalSeconds <= maxAcceptableDetectionLatencySeconds / 2` (≤ 150 s at the starting value of 300).
3. The save payload written by `persistence` contains no pass id, product id, purchase-sourced factor or pending marker, before and after a mid-session ownership change.
4. A simulated ownership flip from `false` to `true` mid-session changes the effective clear radius on the next tick and produces zero notices, zero sounds and zero new `Instance`s on any client.

## Not decided here

The re-read interval, its retry shape, its back-off and its rate-limit budget — ownership-resolution
work behind `products.ownershipCheck`; I state a bound and set no value. Which surfaces may carry an
offer at all, the deleted `shop` row and the artifact-hygiene rule — sheet `01`, this domain,
which holds `offerSurface`. What is sold, at what factor and what price — `products`, Monetization.
Whether an error or system surface exists at all — `notices` (gap G2); I decide only that the
ownership failure may not appear on it. The withholding mechanism a readout uses — `composition`,
`ui-ux/hud` `S2`/`S12`. The wire form of the snapshot that carries the applied factor — replication
work. Whether the tool head expresses effective radius — held-tool work. Whether any of this is
instrumented and at what pass mark — Analytics. Whether R-4 should be reopened now that its second
cost is priced — the developer; I record the cost and reverse nothing.
