# 04 — Earning and spending

**Domain:** gameplay/systems · **Category:** Gameplay · **Wave:** 2

## Decision

**One faucet, one sink, and both completion events credit zero currency.** A cleared patch
credits `max(1, floor(tiers[patch.tierIndex].value × modifiers.effective("value")))`; the
upgrade ladder is the only debit; **at max ladder income continues, buys nothing, converts to
nothing, and is neither capped nor hidden.**

## Why

- The shape is settled and I quote rather than re-decide it. `02-GAMEPLAY.md`: "**One
  currency.**", faucet "clearing overgrowth, scaled by tier", sink "clearing-speed upgrades".
  `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`.
- **The brief never rules on whether a completion pays, and something else invites the wrong
  inference.** `gameplay/core-loop/02-payoff-weights` ranks five payoff kinds `1 / 3 / 8 / 20 /
  50` and says the first four weights *are* `tiers[].value` verbatim — a ladder shaped exactly
  like currency, holding area completion at 8 and set completion at 50. Those are perceptual
  weights, and that sheet disclaims "what a completed set actually grants, in kind". `[cid:
  decided]`: **a weight is not a payout.** Nothing but a clear moves the balance.
- **Because each completion already pays, in its own kind.** An area pays permanence — "the
  payoff and it is load-bearing" `[brief: binding]` ← `[you chose: R2 Q1]`. A set pays one
  modifier (sheet `06`), sized inside `core-loop/02`'s worth band. A reveal pays the collection
  record (sheet `05`). Adding currency on top would pay one event twice.
- **This ratifies the shipped build rather than correcting it.** `Clearing.luau:205` is the
  only `Progression.award` call in the codebase; area completion latches a flag and pays
  nothing. `[research: game/src/server/Clearing.luau]`
- **The floor is 1, and its job is not rounding.** `gameplay/core-loop/01-payoff-frequency`
  requires a moving player be paid at least once every 3 seconds, and a payout of zero is not a
  payment. `Progression.award` rejects a non-positive award outright with a warning rather than
  clamping it `[research: game/src/server/Progression.luau]`, so a zero would be one log line
  per patch across a whole area. `MINIMUM_PAYOUT = 1` at `Clearing.luau:38` is annotated in place
  as a config gap the emitter has no key for `[research: game/src/server/Clearing.luau]`. It is
  correct, and it now has one.
- **Rounding is `floor`, never round-half-up.** Rounding half up pays systematically more on
  every fractional product across a whole area, which is a payout difference rather than a
  rounding artefact. The floor and the clamp commute here — `max(1, floor(x))` and
  `floor(max(1, x))` agree for every `x` this formula can produce — so the expression above is
  stated once and should appear in the code exactly once.
- **Authority is a statement about trust, not about the wire.** The first version of this sheet
  asserted "the client sends an upgrade id", which `mechanics/02` deletes by making `buy` an
  occupancy trigger with the purchase adjudicated server-side. **Whether a client message exists
  at all belongs to `input`; what may never ride on one belongs here.** Stated that way, this
  sheet survives whichever way `mechanics/02`'s own revision lands.
- **Max ladder has no sink and cannot be given one.** Every candidate is closed: rebirth
  `[brief: binding]` ← `[you chose: R2 Q2]`, a prestige currency `[brief: binding]` (derived),
  duplicate conversion `[brief: soft]` refused twice by name, cosmetics declined in `03-META.md`,
  content access forbidden there as "**Never content access**". So **there is no sink past max**,
  and the protection is that the ladder outlasts the collection — a requirement Balance can test,
  and it is in the manifest as one.

```manifest
{
  "provides": "economy",
  "value": {
    "currencyKey": "currency",
    "startingBalance": 0,
    "balanceCap": null,
    "negativeBalance": "impossible; a purchase that cannot be afforded changes nothing at all",
    "authority": "server only; no client message carries a cost, an amount or a balance, and whether a client message exists at all is input's",
    "faucetCount": 1,
    "faucets": [
      {
        "id": "patch-clear",
        "trigger": "one patch transitions from standing to cleared",
        "formula": "max(payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective('value')))",
        "perEvent": true,
        "rounding": "floor, never round-half-up",
        "multiplierAppliedOnce": "at this site only; never again inside the award function"
      }
    ],
    "payoutFloor": 1,
    "payoutFloorReason": "every clear must be a payment, because payoff frequency is measured in payments",
    "zeroCreditEvents": [
      { "id": "area-complete", "credits": 0, "paysInstead": "permanence: the area stays cleared and stays walkable" },
      { "id": "set-complete", "credits": 0, "paysInstead": "exactly one modifier, per the modifiers key" },
      { "id": "find-reveal", "credits": 0, "paysInstead": "one bit in the collection record, per the discovery key" },
      { "id": "session-start", "credits": 0, "paysInstead": "nothing: no welcome grant, no return grant, no offline accrual" },
      { "id": "purchase", "credits": 0, "paysInstead": "one modifier; Robux never converts to currency at any rate" }
    ],
    "sinkCount": 1,
    "sinks": [
      {
        "id": "upgrade-purchase",
        "debits": "the cost of the next level of one upgrade",
        "costOwner": "gameplay/balance",
        "triggerOwner": "input, via the buy verb; this key states the debit, never the verb",
        "onInsufficientFunds": "nothing changes, nothing is deducted, no partial purchase exists",
        "refundable": false
      }
    ],
    "atMaxLadder": {
      "incomeContinues": true,
      "convertsTo": null,
      "newSinkAppears": false,
      "readoutHidden": false,
      "balanceFrozen": false,
      "requirementOnBalance": "the total cost of maxing all three axes must exceed the total currency yielded by clearing the areas needed to complete the collection, so the ladder outlasts it",
      "ladderLengthBand": "that requirement is a FLOOR and core-loop/01's 90-second purchase-gap ceiling is a CEILING on the same curve. Where they conflict, the resolution is more levels at smaller steps, never a shorter ladder: a ladder that ends before the collection does leaves the only sink dead mid-game.",
      "unownedConsequence": "what the game is once the ladder and the collection are both finished belongs to content-structure work; this key states only that no currency sink appears there"
    },
    "forbidden": [
      "a second currency under any name, including a token, a mark, a point or a fragment",
      "a Robux-to-currency exchange rate, bundle or starter pack",
      "an offline, welcome-back, daily, streak or code grant",
      "a currency price on anything that is not an upgrade level",
      "a currency cost charged to enter, re-enter or leave an area",
      "a client-authored or client-trusted award of any size",
      "a payout that varies by anything other than tier and the value modifier"
    ]
  }
}
```

## Consequences for other work

- **Balance & Tuning inherits a two-sided band, not one requirement.** My floor: maxing all three
  axes must cost more than completing the collection yields. `core-loop/01`'s ceiling: no gap
  between above-tick payoffs may exceed 90 seconds, and it reports the shipped ladder's top four
  rungs as 97-to-156-patch purchase deserts. Both are live and they pull apart; the band between
  them is where the cost curve has to land, and the resolution direction is stated in the key.
- **Content-structure work (currently Meta & Content)** owns the other half of the 24/24 hole. I
  have closed the economy side — no sink appears — so whatever exists past completion may not be
  answered with "something to spend on".
- **Offer-ladder work (currently Monetization)** may sell a multiplier and may never sell currency.
  A Robux-to-currency rate is the first step toward buying completion, which `03-META.md` forbids.
- **Input and purchase-surface work** owns the verb that commits a purchase and any wire shape it
  needs. This key constrains only what may ride on it: never a cost, an amount or a balance.
- **Feedback-UI work** has an area-completion moment and a set-completion moment with no number
  attached. Whatever the notice says, it cannot say "+N".
- **Persistence work** stores one integer balance. Nothing about the economy grows with play.

## Flagged to the developer

The brief is silent on completion payouts and I decided them at zero. The live alternatives were
(a) a lump on area completion, sized between a clear and a set bonus, and (b) a lump on set
completion instead of or beside its modifier. **My recommendation is the decision as written.**
Both pay one moment twice, and (b) converts a permanent bonus into a one-off, which is the weaker
of the two things the brief asked a completed set to be.

## Acceptance criteria

1. Exactly one call site in the build increases the currency balance, and its argument is
   `economy.faucets[patch-clear].formula` with no term added, removed or reordered.
2. Clear a complete area containing a complete set: the balance immediately after the last
   patch's payout equals the balance after the area-completion and set-completion events.
3. Every cleared patch increases the balance by at least 1; no clear leaves it unchanged.
4. No screen, pad, prompt or product quotes a currency price for anything except one level of
   one entry in `upgrades`, and no message reaching the server carries a cost, an amount or a
   balance.

## Not decided here

Any cost, growth rate, cap or coefficient on the upgrade ladder (Balance & Tuning). How several
value multipliers compose into `modifiers.effective("value")` (`06-modifier-stacking`, same
domain). What the currency is called (`02-the-currency`, same domain, already supplied). What a
Find is worth to the player (`05-the-find-ledger`, same domain). What content exists past a
finished collection and a maxed ladder (content-structure work, currently Meta & Content). How a
purchase is physically committed, and whether any client message exists at all (`input`, currently
gameplay/mechanics; I depend on it and do not decide it).
