# 02 — Comprehension instruments

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**Of `firstSession.teaching[]`'s seven rows: three are instrumented as countable server-side
predicates, three are instrumented only as stated proxies, and one — `sets` — is unobservable and
is written as data with its reason.** One of the three proxies, `currency`, is marked
**non-independent**: it cannot fail while `contactClearing` passes, so it carries no pass mark of
its own.

> **Revised, round 1** (`cid/analytics/_verified.md` RR-15). Every `blockedBy` naming a missing
> `stateShape` field is replaced: `01` withdrew both schema requests, so the only thing blocking
> these rows is that the telemetry module does not exist. No disposition, window, population or
> countable form moves.

## Why

**This is a triage, not a ladder, and that is why it is not part of sheet `01`.** The seven rows
are unordered booleans with windows; five of them sit outside minute 1 entirely; none has a
drop-off. `onboarding/03` states the boundary explicitly: *"the observable column is a list of
definitions, not a measurement plan. Whether any of the seven is instrumented, and at what pass
mark, is yours."* I convert an evidence string into a countable predicate with a window, a
population and a read site. **I decide nothing about what any beat teaches**, which is
`onboarding/03`'s and approved.

**The comprehension floor has one item and it does all the work.** Only `contactClearing` is
`required: true`, on `onboarding/03`'s stated ground that *"Exactly one misunderstanding is
terminal: not knowing that walking is the verb"* and that with no failure state confusion has no
price. **What follows for the other six is the whole shape of this sheet:** a failed row among the
six is a fact about optional teaching, never a defect, so none of them may produce a blocking
alarm and none of them may justify adding an instruction — `firstSession.tutorialDevicesForbidden`
holds at every second, and `T5` forbids the first-run-only string a low comprehension number would
otherwise tempt. Sheet `04` carries that as an action rule. `[cid: decided]`

**The three rows that read a client surface or an intention are the interesting ones, and only one
of them is actually lost.** Analytics events *"can only be sent from the server and in published
games. Events can't be sent from the client or Studio."*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`
So:

- **The re-walking test (`theFind`)** reads intent — *"keeps clearing new ground rather than
  re-walking the reveal site"*. Intent is not observable, but its two halves are: newly cleared
  patch indices are counted in `clearPatch`, and the clearing tick already samples the character
  root position for the arm gate `[research: game/src/server/Clearing.luau]`. **Proxy, and it is a
  good one**, with a named blind spot: a player who re-walks the reveal site *and* clears new
  ground passes it.
- **The collection-panel open (`sets`)** is a direct local call with no packet, and `Protocol`
  declares seven channels and no more `[research: game/src/shared/Protocol.luau]`. There is no
  server-side fact that correlates with a panel open — not a pause in clearing, not a position, not
  a purchase. **Unobservable, and I decline to invent a proxy for it**, because a proxy nobody can
  falsify is worse than a blank. Making it observable needs an eighth channel or a field on an
  existing client-originated packet; that is a stated requirement to **event-catalog and protocol
  work** and is not mine to design.
- **The currency readout (`currency`)** reads *"the currency readout is non-zero and rising while
  the player moves"*. The readout is a client surface; `state.currency` is not. But the server-side
  form is **entailed by clearing**: `economy`'s faucet credits on every cleared patch, so currency
  rises whenever `contactClearing` passes and the predicate can never independently fail.
  Instrumented, recorded, and given **no pass mark** — the honest output is that this row refutes
  nothing that row 1 does not already refute. `[cid: decided]`

**Two rows are the same instrument as a funnel step and get no second number.** `upgradeAxes`'s
evidence is *"a first purchase occurs in session 1"*, which is `01`'s step 6 read at a different
site; `depth`'s is *"a second area is entered in session 1"*, which is `state.areasFinished` rising.
Naming a second pass mark for one quantity is the defect `_verified-wave4.md` check 6 caught three
times, so `upgradeAxes` points at the step and `04` sets one number for the pair.

**What blocks these rows is a missing module, not a missing schema field — corrected this round.**
Four of the seven need a clock and two need the run-1 population. `01` originally requested both
from `stateShape` and has **withdrawn both**: the join clock is module-local, and run 1 is the
`saveState == pristine` predicate over the seven fields already persisted. So every `readableToday:
false` here now names the same single cause as the rest of the category — **the telemetry module
does not exist** — rather than a schema change nobody accepted. A disposition is unaffected either
way: a proxy is a proxy whether or not a clock exists.

| # | concept | required | disposition | countable form | window | population | read from |
|---|---|---|---|---|---|---|---|
| 1 | `contactClearing` | **yes** | instrumented | `clearedCount` rises by ≥ 5, and no gap between consecutive cleared patches exceeds 3.0 s | the 15.0 s after the first cleared patch | sessions reaching `01` step `firstClear` | `state.clearedCount` at `Clearing.clearPatch` |
| 2 | `currency` | no | proxy, **non-independent** | `state.currency` is > 0 and strictly greater at window close than at window open | same window as row 1 | same as row 1 | `state.currency` at `Clearing.clearPatch` |
| 3 | `theFind` | no | proxy | ≥ 3 distinct new patch indices cleared, **and** peak XZ distance from the revealing patch's position ≥ 2 × `movement.baseClearRadius` | the 30.0 s after `01` step `firstOrdinaryClear` | sessions reaching `firstOrdinaryClear` | cleared indices at `clearPatch`; root position already sampled by `tickPlayer` |
| 4 | `upgradeAxes` | no | instrumented, **same instrument as `01` step 6** | `UpgradeApplied` fires at least once | the whole session | `run1Sessions` | `server/init.server.luau` · `onPurchase`, at the `UpgradeApplied` fire |
| 5 | `areaCompletion` | no | proxy | `clearedCount / areaPatchCount` at `onLeave` exceeds its value at `onJoin` | the whole session | sessions of ≥ 300 s that reached `firstClear` | `state.clearedCount`, `state.areaPatchCount` at `onJoin` and `onLeave` |
| 6 | `sets` | no | **unobservable** | — | — | — | — |
| 7 | `depth` | no | instrumented | `state.areasFinished` is ≥ 1 at `onLeave` and was 0 at `onJoin` | the whole session | `run1Sessions` | `state.areasFinished` at `Clearing.tickPlayer` step 4 |

| # | row | what the proxy cannot distinguish, or what blocks it outright |
|---|---|---|
| 1 | `contactClearing` | a gap between clears caused by walking over already-cleared ground from a gap caused by the player stopping; input itself is not observed |
| 2 | `currency` | comprehension from arithmetic — the faucet credits whether or not anyone read the readout, so the predicate is entailed by row 1 |
| 3 | `theFind` | a player who re-walks the reveal site *and* also clears new ground; the predicate passes on the clearing half alone |
| 5 | `areaCompletion` | *"first sight of the readout"* from *"join"* — they coincide only because `firstSession.withheld[areaProgress].presentAtJoin` is true; if that latch ever changes, this proxy breaks and must be re-derived |
| 6 | `sets` | **blocked outright.** `index-screen.toggle()` raises no packet; `Protocol` is closed at seven channels; analytics is server-only. Needs an eighth channel or a field on an existing client-originated packet — event-catalog and protocol work, not designed here |
| 7 | `depth` | nothing structural: `saveState == pristine` excludes a progressed save. The residual is `01`'s stated `saveState` bias — a zero-progress rejoin reads pristine and re-enters the population |

```json
{
  "amends": "funnels",
  "value": {
    "comprehension": [
      { "concept": "contactClearing", "required": true, "disposition": "instrumented", "countableForm": "state.clearedCount rises by at least 5, and no interval between consecutive cleared patches exceeds 3.0 seconds", "window": { "opensAt": "the first cleared patch of the session", "lengthSeconds": 15.0 }, "population": "sessions reaching funnels.onboarding.steps[firstClear]", "readFrom": "state.clearedCount at server/Clearing.luau :: clearPatch", "sourceEvidence": "firstSession.teaching[contactClearing].evidence", "proxyFor": "input continuity; input itself is not observable server-side", "independent": true, "readableToday": false, "blockedBy": "the telemetry module does not exist; the event clock it needs is module-local and requires no schema change", "reason": null },
      { "concept": "currency", "required": false, "disposition": "proxy", "countableForm": "state.currency is greater than 0 and strictly greater at window close than at window open", "window": { "opensAt": "the first cleared patch of the session", "lengthSeconds": 15.0 }, "population": "sessions reaching funnels.onboarding.steps[firstClear]", "readFrom": "state.currency at server/Clearing.luau :: clearPatch", "sourceEvidence": "firstSession.teaching[currency].evidence", "proxyFor": "the player reading a client-side currency readout, which is not observable server-side", "independent": false, "independenceNote": "economy's faucet credits on every cleared patch, so this predicate is entailed by contactClearing and can never fail alone; recorded, never scored", "readableToday": false, "blockedBy": "the telemetry module does not exist", "reason": null },
      { "concept": "theFind", "required": false, "disposition": "proxy", "countableForm": "at least 3 distinct new patch indices cleared, AND peak XZ distance of the character root from the revealing patch's position is at least 2 x movement.baseClearRadius", "window": { "opensAt": "funnels.onboarding.steps[firstOrdinaryClear]", "lengthSeconds": 30.0 }, "population": "sessions reaching funnels.onboarding.steps[firstOrdinaryClear]", "readFrom": "cleared patch indices at Clearing.clearPatch; character root position already sampled by Clearing.tickPlayer for the arm gate", "sourceEvidence": "firstSession.teaching[theFind].evidence", "proxyFor": "the intent in 'keeps clearing new ground rather than re-walking the reveal site'; intent is not observable", "blindSpot": "a player who re-walks the reveal site and also clears new ground passes it", "independent": true, "readableToday": false, "blockedBy": "the telemetry module does not exist", "reason": null },
      { "concept": "upgradeAxes", "required": false, "disposition": "instrumented", "countableForm": "UpgradeApplied fires at least once in the session", "window": { "opensAt": "join", "lengthSeconds": null }, "population": "run1Sessions", "readFrom": "server/init.server.luau :: onPurchase, at the UpgradeApplied fire", "sourceEvidence": "firstSession.teaching[upgradeAxes].evidence", "sameInstrumentAs": "funnels.onboarding.steps[firstSpendAffordable]", "secondPassMark": false, "independent": true, "readableToday": false, "blockedBy": "the telemetry module does not exist; run1Sessions is the saveState == pristine predicate and needs no persisted field", "reason": null },
      { "concept": "areaCompletion", "required": false, "disposition": "proxy", "countableForm": "state.clearedCount / state.areaPatchCount at onLeave exceeds its value at onJoin", "window": { "opensAt": "join", "lengthSeconds": null }, "population": "sessions of at least 300 seconds that reached funnels.onboarding.steps[firstClear]", "readFrom": "state.clearedCount and state.areaPatchCount at server/init.server.luau :: onJoin and onLeave", "sourceEvidence": "firstSession.teaching[areaCompletion].evidence", "proxyFor": "'first sight of the readout', which is a client fact", "proxyValidWhile": "firstSession.withheld[areaProgress].presentAtJoin is true; if that latch changes this proxy breaks and must be re-derived", "independent": true, "readableToday": false, "blockedBy": "the telemetry module does not exist", "reason": null },
      { "concept": "sets", "required": false, "disposition": "unobservable", "countableForm": null, "window": null, "population": null, "readFrom": null, "sourceEvidence": "firstSession.teaching[sets].evidence", "reason": "the evidence is a collection-panel open. index-screen.toggle() is a direct local call that raises no packet; game/src/shared/Protocol.luau declares exactly seven channels and no more; and Roblox analytics events can only be sent from the server and in published games. No server-side fact correlates with a panel open, and no proxy is offered because an unfalsifiable proxy is worse than a blank.", "whatWouldMakeItObservable": "an eighth protocol channel carrying a panel-open notification, or a boolean field added to an existing client-originated packet (RequestState or BuyUpgrade), either of which is event-catalog and protocol work and is a requirement here rather than a design", "readableToday": false },
      { "concept": "depth", "required": false, "disposition": "instrumented", "countableForm": "state.areasFinished is at least 1 at onLeave and was 0 at onJoin", "window": { "opensAt": "join", "lengthSeconds": null }, "population": "run1Sessions", "readFrom": "state.areasFinished at server/Clearing.luau :: tickPlayer step 4", "sourceEvidence": "firstSession.teaching[depth].evidence", "independent": true, "readableToday": false, "blockedBy": "the telemetry module does not exist; run1Sessions is the saveState == pristine predicate and needs no persisted field", "reason": null }
    ],
    "comprehensionRules": [
      { "id": "K1", "rule": "contactClearing is the only row whose failure means the design never starts, and the only one permitted a blocking alarm.", "source": "firstSession.teaching[contactClearing].required is true; onboarding/03's stated floor" },
      { "id": "K2", "rule": "A low reading on any of the other six may never be answered by adding instruction, a nudge, a hint, a first-run string or a prompting sound.", "source": "firstSession.tutorialDevicesForbidden T1-T12; onboarding/03 T5 forbids any first-run-only string" },
      { "id": "K3", "rule": "No comprehension row may be read as a failure, a loss, a stuck player or a churn signal.", "source": "02-GAMEPLAY.md, 'There is no failure state' and 'A stuck player cannot exist'" },
      { "id": "K4", "rule": "currency carries no pass mark and is never scored, because it is entailed by contactClearing.", "source": "this sheet" },
      { "id": "K5", "rule": "upgradeAxes carries no pass mark of its own; it is the same quantity as funnels.onboarding.steps[firstSpendAffordable] and is scored once.", "source": "this sheet" },
      { "id": "K6", "rule": "No row in this array requires a change to StoredState or PlayerState. Every readableToday: false names the telemetry module and nothing else.", "source": "funnels.withdrawnRequests; cid/analytics/_verified.md RR-15" }
    ]
  }
}
```

## Consequences for other work

- **Event-catalog and protocol work** gets one named requirement and one named non-requirement.
  Six of the seven rows need **no new channel** — every read site is already server-side. `sets`
  needs an eighth channel or a field on `RequestState`/`BuyUpgrade`, with the reason stated; whether
  that is worth building is theirs, and if it is refused, `sets` stays unobservable permanently and
  that is a recorded outcome rather than a gap.
- **Clearing-module work** gets three reads it does not perform today: the interval between
  consecutive cleared patches, the peak root distance from a named world position over a window, and
  the cleared fraction captured at `onJoin`. All three are derivable from data `tickPlayer` and
  `clearPatch` already hold; none needs a new sample.
- **State-shape and persistence work owe this sheet nothing.** `K6` states it as a rule so a later
  reader does not resurrect the withdrawn request from a stale `blockedBy` string.
- **Feedback-UI and screens work** is unaffected. Nothing here asks for a surface, a counter or an
  indicator, and `theme/tone/04` `X10` forbids one.
- **Onboarding work** keeps all seven `teaching[]` rows, their `taughtBy`, `byBeat`, `evidence`,
  `required` and `testRange` values verbatim. This sheet adds a disposition beside each and changes
  none of them.
- **Dashboard-and-target work (KPI)** selects from four scored rows, not seven, and inherits the
  rule that `currency`, `upgradeAxes` and `sets` carry no number of their own.

## Acceptance criteria

1. `funnels.comprehension[]` has exactly 7 entries, one per `firstSession.teaching[]` row, and the
   `concept` values match that array's `concept` values exactly, in the same order.
2. Every entry's `disposition` is one of `instrumented`, `proxy`, `unobservable`; exactly one entry
   has `disposition: "unobservable"` and it is `sets`; every entry with that disposition has a
   non-null `reason` and a non-null `whatWouldMakeItObservable`.
3. Exactly one entry has `required: true` and it is `contactClearing`.
4. No entry with `independent: false` or `sameInstrumentAs` set carries a pass mark in
   `funnels.thresholds[]` (sheet `04`), and no entry's `blockedBy` string contains `stateShape`,
   `StoredState` or `PlayerState`.

## Not decided here

What any beat teaches, when, and by which surface (`onboarding/03`, approved; `onboarding/02` holds
`firstSession`). The step order, the funnel API and the `saveState` predicate these populations read
(`01`, this domain). Every pass mark, alarm and action for these rows (`04`, this domain). Whether
the eighth channel `sets` needs is built, and its shape (event-catalog and protocol work). Event
names and payload fields for the five read sites (event-catalog work). Whether the telemetry module
is built at all (logging-pipeline work). What the collection surface looks like and how a group of
six reads with one slot filled (UI/UX — Screens).
