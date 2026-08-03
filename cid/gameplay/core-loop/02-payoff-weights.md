# 02 — Payoff weights

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1 (revised wave 7)

## Decision

**Five kinds, one economic ladder, weights `1 / 3 / 8 / 20 / 50`:** currency tick 1, upgrade
purchase 3, area completion 8, Find reveal 20, set completion 50. The first four weights *are*
`tiers[].value` verbatim; the fifth continues that ladder at its own smallest step, 2.5×.

**Weight is the total feedback budget — duration, channel count, screen area, particle count — and
it is not peak level.** Peak level is `response.beats[].rank`, which `theme/tone/03-beat-map` set to
`findReveal > setComplete` on masking grounds. **The two orders differ at the top two rungs and both
stand:** a set completion may be longer, wider and on more channels than a reveal, and may never be
louder or sharper. **This sheet withdraws its wave-1 loudness claim.** See `## Pushing back`.

**A payoff's size does not scale with the effort that produced it.** Every kind is
constant-magnitude for the life of the game. The one in-kind variance is the tick's tier, carried by
**pitch, not level**: the presentational spread across the four tiers is capped at 6 dB even though
`tiers[].value` spreads 20×.

**Area completion and set completion do not fuse.** With `collection.relicsPerArea` 3 and
`areasPerDepth` 2, a set closes on the third Find of a depth's *second* area — on average 25% of
that lap before it completes — and closes in no other lap at all.

## Why

**The ordering is the brief's own objective ladder, and only two rungs needed deciding.**
`03-META.md` orders its objective scopes moment < session < short-term < long-term
`[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`, and three kinds are exactly those scopes:

| scope | objective, quoted | kind | weight |
|---|---|---|---|
| moment | *"clear the patch in front of you"* | currency tick | 1 |
| session | *"find at least one new relic"* | Find reveal | 20 |
| short-term | *"complete one set"* | set completion | 50 |

The two kinds the ladder does not name are placed by one rule each. **Area completion sits below the
reveal** because sheet `04` makes it a repeating beat, four to eight times a session, and a kind at
that frequency cannot outrank the kind the session objective is measured on. **Upgrade purchase sits
below area completion** because it is self-initiated — the player already knows it happened — and
its real payoff is the next clear feeling different, which `02-GAMEPLAY.md` names as the primary
sensation. A confirmation that outshouted a completion would be announcing the receipt instead of
the purchase.

**Why the weights are `tiers[].value` rather than five new numbers.** `[cid: decided]` The game
already contains one legible magnitude ladder and the player learns its intervals in the first
minute from the tick channel: 1 / 3 / 8 / 20. Reusing it means the payoff hierarchy and the tier
hierarchy teach the same steps, and four of five weights are a value another sheet already owns.
Adjacent ratios are 3.0, 2.67, 2.5, 2.5 — **no step under 2.5×, which is the binding part.**

**Why nothing scales with effort.** `[cid: decided]` Three closures. **There is no effort to
measure**: with no failure state and *"the only friction is the size of an area"* `[brief: soft]`,
the only quantity effort-scaling could track is duration, so it would pay the deepest areas most and
the ten-second onboarding promise least. **The onboarding promise forecloses a growth curve**: *"the
first patch they clear has something under it"* `[brief: soft]` ← `[you accepted: R6 Q3]` means
Find #1 lands at full weight, and a cue that grows must under-size its first instance. **Endless
bays give a growing completion cue no ceiling**: `endgame` keeps producing them, so there is no last
one to grow toward. `theme/tone/03-beat-map` reached the same rule independently — *"the ceiling
does not rise with depth"* — and `response` carries it as *"nothing rises with depth"*.

**The collision, ruled by arithmetic rather than preference.** `03-reveal-placement` put reveals on
contact, so with `k` Finds uniformly buried and a monotone sweep the expected fraction of a lap
after the last Find is `1/(k+1)` — **25% at `relicsPerArea` 3.** A set closes only in the second
area of each depth, a quarter of that lap early; the two land together only when the final patch
cleared is one of that area's 3 Find patches, which is 3/245 to 3/640 — **0.5% to 1.2% of the laps
where a set closes at all.** `[cid: decided]` Three consequences:

1. **The generic lap has a one-beat finish; the set-closing lap has two,** 25% of a lap apart,
   weights 50 and 8. A player learns which is which because they are usually separated; fusing them
   in the coincident case would unteach that.
2. **In the coincident case the order is fixed: reveal → set completion → area completion.** Causal
   first (a set cannot close before the Find that closes it is seen), world-state change last,
   because `02-GAMEPLAY.md` locates satisfaction in *"before/after and discovery, nothing else"* and
   the restored space *is* the before/after. `response.sequencedBeats` already ships this order.
3. **The last quarter of a set-closing lap pays ticks only.** That is fine: at realised lap lengths
   it is 33 to 38 s, well inside sheet `01`'s 90-second ceiling, and purchases fall inside it.

**The tick channel must span at least 10×, adjacent steps at least 2×.** The tick is the only kind
whose magnitude varies, and `04-PRESENTATION.md` makes tier *"a core economic signal"* whose four
silhouettes Art must draw. A flat ladder means those four silhouettes signal nothing economic and
the accessibility work is spent on a distinction with no content. Shipped 1 / 3 / 8 / 20 gives 20×
end to end and a smallest step of 2.5×.

```json
{
  "amends": "response",
  "field": "beats[].economicWeight",
  "requestedBy": "cid/gameplay/core-loop/02-payoff-weights.md",
  "why": "response.beats[].rank is the PRESENTATION order (peak level and sharpness), owned by theme/tone/03-beat-map. It is not the economic order, and the two differ at the top two rungs. Without economicWeight on the same rows, every channel key — stingers, effects, notices — re-derives a magnitude budget from rank alone and inverts the objective ladder the brief accepted.",
  "quantity": "the TOTAL feedback budget a beat may occupy: duration x channel count x screen area x particle count. Explicitly NOT peak level, which is rank's.",
  "rows": [
    { "beatId": "patchClear",       "economicWeight": 1,  "class": "texture", "scope": "moment",     "source": "tiers[].value[Moss]" },
    { "beatId": "upgradePurchased", "economicWeight": 3,  "class": "beat",    "scope": "unranked",   "source": "tiers[].value[Fern]; self-initiated, so the player already knows it happened" },
    { "beatId": "areaComplete",     "economicWeight": 8,  "class": "beat",    "scope": "unranked",   "source": "tiers[].value[Bramble]; fires 4 to 8 times a session per core-loop/04" },
    { "beatId": "findReveal",       "economicWeight": 20, "class": "peak",    "scope": "session",    "source": "tiers[].value[Heartvine]; 03-META.md session objective" },
    { "beatId": "setComplete",      "economicWeight": 50, "class": "peak",    "scope": "shortTerm",  "source": "the tier ladder continued at its own smallest step, 2.5x; 03-META.md short-term objective" }
  ],
  "invariants": [
    "the five economicWeight values are strictly increasing over the order patchClear < upgradePurchased < areaComplete < findReveal < setComplete, with no adjacent ratio under 2.5",
    "economicWeight order and rank order agree on the bottom three rungs and disagree ONLY on findReveal against setComplete, which is theme/tone/03-beat-map's masking ruling and is deliberate",
    "no channel may invert economicWeight order except peak level, which follows rank",
    "nothing rises with depth: a beat's economicWeight is identical at depth 1 and depth 4, and at instance 1 and instance 24"
  ],
  "tickVariance": {
    "quantity": "pitch, per OPEN.md section 2 'each rarity tier a distinct pitched note'",
    "levelSpreadMaxDb": 6,
    "why": "tiers[].value spreads 20x; carrying that as level would put the loudest tick above the purchase beat and invert the ladder"
  },
  "coincidence": {
    "case": "the final patch of a depth's second area is also one of its 3 Find patches",
    "probability": "3 / area.patchCount for that area: 1.2% at 245 patches, 0.5% at 640",
    "emitOrder": ["findReveal", "setComplete", "areaComplete"],
    "alreadyShippedAs": "response.sequencedBeats, in this order"
  },
  "requestedRevisions": [
    {
      "field": "minOnsetGapSeconds",
      "current": 0.6,
      "requested": 0.35,
      "why": "response.minOnsetGapOwner names this sheet for the ordering and Balance & Tuning for the figure. Balance set it: pacing.coincidentOnsetSeparationSeconds is 0.35, with range [0.20, 0.60]. 0.60 sits at the top of pacing's range and outside nothing, but the two keys currently publish different numbers for one quantity and a builder reads whichever it opens first. 0.35 is the value satisfying both ranges."
    }
  ]
}
```

## Consequences for other work

- **The set-completion cue is the largest feedback budget in the game and the second-loudest sound.**
  `mix.levelLadder` puts `setComplete` at realised 0.748 against `findReveal` at 0.850, which is
  correct under rank and correct under this ladder: `setComplete` buys **length, width and channel
  count**, never level. `stingers` may not spend weight 50 on amplitude.
- **The reveal stinger must survive 24 firings and the completion chord 4 to 8 a session**, both at
  constant size, because nothing scales with effort.
- **Coincidence handling** (Mechanics) gains one enumerated case at 0.5% to 1.2% of set-closing
  laps: three above-tick payoffs on one clear, emitted reveal → set completion → area completion.
  `response` already ships the order; only the separation figure is in dispute.
- **What a completed set grants** (`setBonus`) occupies the top rung of this ladder, so all four
  rows must grant the **same kind** of thing or the ordering has nothing to be checked against. The
  merger already checks that no set bonus over-subscribes its axis against `modifiers.axes[].ceiling`.
- **Duplicate handling** is closed and needs no slot: `discovery.repeat.possible` is `false`, so the
  hole wave 1 reserved between the tick and the purchase beat is not needed and must not be filled.
- **Tier values** (Balance & Tuning) are bounded both ways: at least 10× end to end and 2× adjacent,
  and no single tick may reach a tenth of a set bonus. Compressing the ladder to smooth early income
  breaks the first; a jackpot top tier breaks the second.
- **At 24/24 both peaks go extinct permanently.** Weights 20 and 50 stop firing, leaving a ladder
  whose top surviving rung is 8. `endgame` owns what occupies the empty top; **this sheet invents
  nothing and forbids re-using either extinct kind.**

## Acceptance criteria

1. `npm run bridge` collects this sheet's `amends` block against `response` and reports no problem;
   `response` remains provided by exactly one sheet, `gameplay/mechanics/05-response-contract.md`.
2. Every `beatId` in the amendment matches a `response.beats[].id` — all five, no extras — and the
   `economicWeight` values are strictly increasing over `patchClear < upgradePurchased <
   areaComplete < findReveal < setComplete` with no adjacent ratio under 2.5.
3. `max(tiers[].value) / min(tiers[].value) >= 10` and the smallest adjacent step, sorted ascending
   by value, is at least 2. Both pass at the shipped manifest, where the figures are 20 and 2.50.
4. On the clear that completes both a set and the area, exactly three payoff events are emitted, in
   the order `findReveal`, `setComplete`, `areaComplete`, on three distinct channels, with no two
   sharing an onset. No client code branches on a string prefix to tell one payoff kind from another.

## Pushing back

**Withdrawn: this sheet's wave-1 acceptance criterion that measured peak level must be non-increasing
down `setComplete → findReveal → areaComplete`.** `theme/tone/03-beat-map` re-ranked `B1` over `B2`
on masking grounds — the sixth reveal *triggers* the set completion, so `B2` begins after `B1`'s
peak has passed and a louder `B2` would mask the thing that caused it — and `response.beats[].rank`
and `mix.levelLadder` both ship that order. **The masking argument is a physical claim about two
cues 0.35 s apart and my objective-ladder argument is not, so it wins.** `[cid: decided]`

**What survives, and it is most of the sheet.** The ordering was never a claim about loudness alone;
it is a claim about *budget*, and Tone states the reconciliation itself: `B2` *"may be longer and
wider than `B1`, occupying more channels. Never sharper."* That is weight 50 above weight 20 in every
channel but level. Both keys now say one thing, in two quantities that are named separately, which
is the correction: a single word "magnitude" covering both is what let two sheets disagree without
either noticing.

**Also overruled, and this one stands:** `OPEN.md §2`'s *"an area's completion gets the only
'achievement' sound"* `[brief: soft]` ← `[I assumed]`. Set completion takes the achievement ceiling.
`OPEN.md §2` never mentions set completion at all, so the peak it omits is the one `03-META.md`
ranks *above* the session objective; and sheet `04` made area completion fire four to eight times a
sitting, which is a beat by construction.

## Flagged to the developer

1. **Two keys publish different numbers for the coincident onset separation** — `response`
   0.6 s and `pacing` 0.35 s — and `response` names Balance & Tuning as the figure's owner, which
   makes 0.35 the later word. A builder reading `response` first ships 0.6 and a builder reading
   `pacing` first ships 0.35, and at a 0.25 s difference two cues either read as a sequence or as a
   chord. **Recommendation: take 0.35 into `response`**, which is the revision requested above.
2. **Set completion outranks the Find reveal in budget and not in loudness, which is a subtler
   answer than the one you were offered.** `OPEN.md §2` said the reveal owns the best sound; that is
   kept verbatim. What changed is that the game's *biggest* payoff is now a different event from its
   *loudest*. Alternatives: (a) budget and loudness split as ruled here; (b) collapse them and put
   both ceilings on the reveal, which makes the objective ladder's top two rungs indistinguishable;
   (c) collapse them onto set completion, which is what Tone's masking argument rules out.
   **Recommendation: (a).**

## Not decided here

The cue itself in every channel — the sound (`stingers`, `sfx`), the particles (`effects`), the
notice (`notices`). Peak level and sharpness order, which is `theme/tone/03-beat-map`'s and is
realised in `response.beats[].rank` and `mix.levelLadder`. What a completed set actually grants
(`setBonus`) and how it stacks (`modifiers`). Every value: `tiers[].value` and `weight` (Systems,
then Balance & Tuning), the onset separation figure (`pacing`), `area.patchCount` and
`collection.relicsPerArea` at any depth (Meta & Content). What the player can do during the
completion moment (`response`). How many payoff events a session contains (sheet `01`). Whether a
reveal lands on contact (sheet `03`). Lap duration (sheet `04`). Whether area growth is bounded
(sheet `05`). What occupies the top of this ladder once both peaks are extinct (`endgame`).
