# 03 — Reveal placement

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1

## Decision

**A Find is revealed on contact with the patch that hides it, per patch, at the instant that
patch clears.** There is no completion-gated batch. The shipped behaviour in `clearPatch` is
**ratified**, with one revision demanded: the reveal and the area-completion notice must stop
sharing one channel.

**Core Loop owns no build-contract key**, so this sheet carries no `manifest` block; I read
`SCHEMA` in `bridge/schema.mjs` and all ten keys (`area`, `tiers`, `upgrades`, `vocabulary`,
`currency`, `movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime`) name another
owner. My output is a predicate over other domains' values, in the form
`game/test/config.spec.luau` already executes.

## Why

### The two readings, quoted

**The batch reading** — `01-FOUNDATION.md`, core loop table, row 2, tagged
`[brief: binding]` ← `[you chose ×4: R1 Q2, R2 Q1, R2 Q2, R3 Q1]`:

> | 2 | keep clearing until the **area is completely clear** | every buried object in it, revealed |

**The contact reading** — same sheet, theme section, `[brief: soft]` ← `[you accepted: R2 Q3]`:

> - **Clearing and discovering are one action.** Do not design them as separate systems.

and `02-GAMEPLAY.md` onboarding, `[brief: soft]` ← `[you accepted: R6 Q3]`:

> **Clear → reveal inside the first ten seconds.** The player spawns touching overgrowth, and
> **the first patch they clear has something under it.**

### Why this is not an overrule of a binding item

Row 2 states an **entailment, not a timing**: clearing until an area is completely clear
produces every buried object in it, revealed. That sentence is true under contact placement —
after the last patch falls, all six are in the index. The batch reading adds a claim about
*when* that the row does not make.

And the four questions the `[you chose ×4]` tag cites are R1 Q2 (a lap is finishing a space,
not hitting a number), R2 Q1 (permanence), R2 Q2 (no rebirth) and R3 Q1 (accepting the
divergence). **None of the four asked about reveal timing.** `[brief: binding]` The binding
force attaches to the unit of progression, permanence and the three cuts; reveal timing was
never interviewed, which is why `OPEN.md §1` can record the core loop as the most-questioned
item in the spec and still leave this open. So this is `[cid: decided]` on a silence inside a
binding row, not a contradiction of a decision. It is flagged below anyway.

### Four reasons contact wins, one of which is arithmetic

**1. Batch cannot satisfy the ten-second promise without a special case.** Under batch, a
reveal inside ten seconds requires area one to be *completeable* inside ten seconds.
`gameplay/meta/01` ships 140 patches at 120 studs square; nothing clears that in ten seconds.
So batch needs the starting area exempted from the loop's own rule. `[brief: soft]` A design
that must special-case its first ten seconds to obey its own core loop is wrong at the loop.
Contact satisfies the promise with no exemption, and `gameplay/onboarding/01` already spends
its whole guarantee on placement (nearest patch to spawn), not on timing — that sheet's
guarantee is worthless under batch.

**2. Batch is the literal separation the theme line forbids.** `[brief: soft]` "Clearing and
discovering are one action. Do not design them as separate systems." Deferring the reveal to
the lap boundary puts a queue between the clear and the discovery: two events, two triggers,
two moments. Contact is the only reading under which that instruction is true rather than
aspirational.

**3. Contact is worth a factor of exactly `collection.relicsPerArea` in how large an area may
grow before the brief's highest-risk objective fails.** `[cid: decided]` This is the load-bearing
argument, and it is derivable from shipped manifest values.

Let `f` be the fraction of an area's footprint a player sweeps in one bound session:

```
f = (2 · movement.baseClearRadius · movement.baseWalkSpeed · ε · T) / area.size²
```

with `T = 600` s, the session floor from "10–20 minute active sessions" `[brief: binding]` ←
`[you chose: R1 Q4]`, and `ε` an effective-throughput factor covering re-swept ground and
seconds not spent sweeping. `[playtest unknown]` **ε starting value 0.35, test range
0.20–0.60.** It is not a game value and belongs to no manifest key; Balance & Tuning may adopt
it if it wants an owner.

Finds are buried uniformly, `collection.relicsPerArea` of them, so:

- **Under contact,** expected Finds per session `= min(1, f) · relicsPerArea`. Requiring
  at least one gives `area.size² ≤ 2·r·v·ε·T · relicsPerArea`.
- **Under batch,** expected Finds per session `= relicsPerArea · 1[f ≥ 1]` — a step function.
  Requiring at least one gives `area.size² ≤ 2·r·v·ε·T`.

**The ratio of those two ceilings is `relicsPerArea`, and every unknown cancels.** ε cancels.
`T` cancels. Walk speed and radius cancel. `area.patchCount` cancels out of both sides. The
decision is worth exactly 6× the growable footprint at the shipped `collection.relicsPerArea`
of 6, whatever the tuning turns out to be.

At shipped values (`r` 5.5, `v` 16, `ε` 0.35, `T` 600): contact supports an area up to **471
studs square**, batch up to **192**. East Terrace at 120 passes both, so this is not a claim
that the running build would break today. It is a claim about depth, and `03-META.md` says
depth is where the game is going: "deeper areas are **larger, denser**" `[brief: binding]` ←
`[you chose: R3 Q2]`. Batch spends five sixths of that headroom before area two is authored.

**4. Batch turns the brief's self-declared highest-risk tuning into a cliff.** `[brief: binding]`
`03-META.md`: "discovery rates must be generous enough that a typical session yields at least
one find, or the stated session objective silently fails. **This is the highest-risk tuning in
the game**." Under batch the session objective is an indicator on lap completion, and laps
already span sessions in the shipped build (`cleared` persists per patch index). At a 60-minute
lap, three to six consecutive sessions return **zero** new Finds and then one returns six. That
is not a low rate; it is the silent failure named, arriving as a discontinuity nobody can tune
out. Under contact the same quantity is monotone in patches cleared, so it can be checked with
arithmetic — which is what criterion 3 does.

### What the batch reading was protecting, and where that value now lives

It was protecting the **finish line's payoff**. `01-FOUNDATION.md`: permanence "is what makes
'completely' mean something" `[brief: binding]`. Under contact, a player can hold all six Finds
with patches still standing, so the last stretch of a lap pays only currency.

**That value now lives in the coincident completion peak, not in withheld reveals.**
`gameplay/meta/02` sets `relicsPerArea` to 6 against 6-member sets specifically so
"completing an area completes exactly one set", which stacks two payoff kinds — area completion
and set completion — on the final patch. The finish line is paid by its own event plus a
permanent set bonus. It does not need to hold the reveals hostage, and holding them costs the
factor of six above.

The size of that residue is derivable and I state it rather than hide it: with `k` Finds
uniformly buried and a monotone sweep, the expected fraction of a lap lying after the last Find
is `1/(k+1)` — **about 14% at `relicsPerArea` 6, roughly 20 patches and 33 seconds at level-0
throughput.** `[cid: decided]` That is the largest structural dead-spot contact placement
creates, it is bounded at its far end by the completion peak, and if sheet 01's maximum-gap rule
cannot absorb it the correct fix is spatially spread burial, not batching.

### Two independent cross-checks that contact is already assumed elsewhere

`cid/tech/architecture/02-module-plan.md` gives the `clearing` module the responsibility
"observe player positions on a tick, clear patches within reach, **award currency and reveal
relics**", and no module in the eleven owns an area-completion reveal pass. `[cid: decided]` A
batch reading would require a twelfth module that sheet does not have. And
`gameplay/onboarding/01`'s acceptance criterion — "a brand-new player reveals a relic within
their first three cleared patches, in 100 consecutive fresh runs" — is unsatisfiable under
batch. Ratifying contact keeps three already-written sheets consistent; challenging it
invalidates them.

### The revision I am demanding against working code

`clearPatch` fires the completion notice down the **same** RemoteEvent as a reveal, tagged with
a magic string:

```luau
relicFound:FireClient(player, `__area_complete:{GameConfig.Area.label}`)
```

and the client tells the two apart with `string.match(what, "^__area_complete:(.+)$")`. These
are two different payoff kinds — sheet 02 sizes them separately and `OPEN.md §2` gives each its
own sound, "a relic reveal owns the best sound in the game" versus "a short resolving chord"
`[brief: soft]` ← `[I assumed]`. A payoff kind that has to be recovered by parsing a string
prefix is a payoff kind the client can mis-route, and the `protocol` module's own criteria do
not currently forbid it. **Two channels.** Behaviour ratified; channel shape rejected.

**Also flagged, not required:** the symbol `RelicFound` is stale.
`theme/vocabulary/02-banned-words.md` bans `relic` for player-facing strings and explicitly
exempts internal field names, so this is legibility rather than a ban violation — but
`collection.className` is now `Find`, and a remote called `RelicFound` next to a class called
`Find` is the kind of drift that makes a builder ask which one is real. `FindRevealed` and
`AreaRestored` are the obvious pair; the names belong to `protocol`, the split belongs to me.

## Consequences for other work

- **Clear-on-contact feedback semantics [Mechanics]:** the reveal is a per-patch event that can
  fire up to `relicsPerArea` times inside one lap and, at 6 Finds among 140 patches, can land on
  the same tick as an ordinary clear. The feedback design has to survive a reveal and a clear
  coinciding, and has to survive six reveals in one lap without the sixth feeling like the first
  one repeated.
- **Duplicate handling [Systems]:** under contact, a duplicate is a cleared patch that fires
  **nothing** — the shipped code guards with `not state.collection[patch.relic]`, so the reveal
  is silently dropped. The duplicate problem is therefore a *cadence* hole as well as an economy
  one: the player walks over a buried Find and the game says less than it would for a Moss patch.
  Whatever answer is reached without adding a currency must also produce an audible event, or
  contact placement has a silent case in it.
- **Reveal and completion as two audio peaks [Audio]:** confirmed as two distinct cues, because
  they are now two distinct events on two channels. Reveal fires up to six times per lap and
  must survive repetition; completion fires once and coincides with set completion.
- **Area authoring by depth [Meta & Content]:** you inherit a hard ceiling, not a preference.
  `area.size²` at any depth may not exceed `2 · movement.baseClearRadius ·
  movement.baseWalkSpeed · ε · 600 · collection.relicsPerArea` at the throughput a player
  plausibly has on arrival. Note that `area.patchCount` **cancels** out of this bound: density
  does not affect the expected Find count per session, only footprint does. Growing an area by
  packing more patches into the same 120 studs costs nothing here; growing its extent costs
  directly.
- **Depth escalation [Core Loop sheet 05]:** the bound above is the shape your ruling on
  assumption #2 has to respect, and it is stated as a predicate over `area.size` rather than a
  coefficient so it holds whatever depth-2 turns out to be.
- **The protocol and clearing modules [tech/architecture]:** `protocol` gains a second reveal-class
  RemoteEvent and loses the `__area_complete:` prefix convention; `clearing` keeps the reveal
  inside its tick, which its current responsibility line already says it does.
- **Payoff frequency [Core Loop sheet 01]:** your maximum-gap rule inherits a known worst case of
  `1/(relicsPerArea + 1)` of a lap with no Find in it, at the end of the lap.
- **Degradation at 24/24 (G8), stated and not solved:** with contact placement and 24 Finds, the
  reveal event stops firing entirely once the collection completes — permanently, per player,
  because the guard is on the collection and nothing regrows. The loop keeps the currency tick and
  the upgrade purchase and loses reveal, set completion, and (once the last area is done) area
  completion. **I invent no content to fill that.** The kind of work that owns it is *what content
  exists past collection completion* [currently: Meta & Content]. Whatever it supplies must be a
  recurring payoff kind that is not a re-reveal of an owned Find.

## Acceptance criteria

1. In a fresh save, clearing only the single patch nearest spawn fires **exactly one** reveal
   event and leaves the collection count at 1 with 139 patches uncleared. (This is the criterion
   batch fails.)
2. `grep -r "__area_complete" game/src` returns nothing, and reveal and area-completion arrive on
   two distinct RemoteEvents. No client code branches on a string prefix to tell one payoff kind
   from another.
3. This passes in `game/test/config.spec.luau`:

   ```luau
   local EFFICIENCY = 0.35    -- [playtest unknown], test range 0.20-0.60
   local SESSION_FLOOR = 600  -- 00-CORE.md: "10-20 minute active sessions"
   local swept = 2 * GC.BaseClearRadius * GC.BaseWalkSpeed * EFFICIENCY * SESSION_FLOOR
   local fraction = math.min(1, swept / (GC.Area.size ^ 2))
   check(fraction * GC.RelicsPerArea >= 1,
     "a median bound session expects at least one Find without completing a lap")
   ```

   At shipped values `fraction` is 1 and the expected count is 6, so it passes with room; the
   check exists to fail when an area at depth grows past the footprint the session floor can
   sweep. At the boundary where the expectation equals 1, two players in three still see a Find
   (`1 - (5/6)^6 = 0.665`), so the median holds without a safety coefficient.
4. No reveal event is emitted from the area-completion branch of `clearPatch`, and no reveal is
   emitted on a tick in which the receiving player cleared no patch.

## Not decided here

The per-depth discovery rates and whether burial is uniform or spatially spread
[Meta & Content — discovery-rate content work]. Every value in the inequality
[Balance & Tuning]. What the reveal looks, sounds and reads like at the moment it fires
[Mechanics — feel, Art — VFX, Audio — Stingers, UI/UX — Feedback UI]. The relative *magnitude*
of a reveal against the other four payoff kinds, and whether the stacked area-plus-set peak is
one peak or two [sheet 02]. How many payoff events a session must contain and the maximum gap
between them [sheet 01]. Lap duration and whether a lap may span sessions [sheet 04]. Whether
area growth by depth is bounded and against what [sheet 05]. The remote names [`protocol`,
tech/architecture].

## Flagged to the developer

**The interview never asked when a find is revealed, and the loop table can be read either
way.** I have read row 2 as an entailment ("a fully cleared area has had everything in it
revealed") rather than a timing ("everything is revealed *at* completion"), because none of the
four questions cited by its `[you chose ×4]` tag was about timing, and because the batch reading
contradicts the ten-second onboarding promise you accepted at R6 Q3.

Live alternatives, if that reading is wrong:

1. **Contact, per patch** — ratified here. Satisfies onboarding with no exemption, makes the
   session objective checkable arithmetic, and permits areas ~6× larger in footprint before that
   objective fails.
2. **Completion-gated batch** — requires exempting area one from the loop to keep the ten-second
   promise, makes the session objective a step function on a lap length the brief calls
   unsourceable, and caps area footprint at 192 studs square at current tuning.
3. **Hybrid: contact reveals, plus a summary at completion** — not recommended as a *placement*
   change, because it is reading 1 with a completion screen bolted on, and a summary of things
   the player already saw is a UI decision [UI/UX] rather than a cadence one. If the finish line
   feels thin, that is sheet 02's magnitude question, not this sheet's.

**Recommendation: 1.** Zero code change to behaviour, three already-written sheets stay
consistent, and the alternative costs a factor of `collection.relicsPerArea` in area headroom
for a payoff the coincident completion-plus-set peak already delivers.
