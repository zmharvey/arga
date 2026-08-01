# 06 — Modifier stacking

**Domain:** gameplay/systems · **Category:** Gameplay · **Wave:** 2

## Decision

**A permanent stat change is one object — `{ sourceClass, sourceId, axis, factor ≥ 1 }` — and
every source outside the upgrade ladder is a multiplicative factor, never an additive bonus.**
Three sources exist: an upgrade level, a set completion, a purchase. They resolve in that order,
then **one ceiling clamp at the end**. Only the upgrade level stacks with itself. The three axis
ids are `value`, `radius`, `speed` — the ids `upgrades` already ships, not their labels.

## Why

- **The three axes are the brief's and a modifier may target nothing else.** `02-GAMEPLAY.md`:
  "**Three axes:** value per unit, clear radius, and move speed", with "Relic luck as a fourth
  axis was offered and declined". `[brief: soft]` ← `[you accepted: step 6 Q1]`, recorded in
  `OPEN.md §5` as no longer an assumption. A set bonus that created a fourth axis would reopen a
  decision the brief closed, from a system the brief never gave that power to.
- **The third axis id is `speed`, not `pace`.** `upgrades[].id` ships as `value`, `radius`,
  `speed` `[research: game/src/shared/GameConfig.luau]`, and `effective(axis)` reads an entry of
  `upgrades` — so an id of `pace` cannot join, and the whole modifier chain would silently do
  nothing for that axis. `upgrades` is merged and shipped; this key is what changes. "Pace" is a
  label and may be written as one in prose, never as an id.
- **One convention, one operation, because the build already carries a hand-written guard against
  the alternative.** `Progression.luau:91` warns that applying the value multiplier again inside
  the award function would square it, and the module contains no set-bonus or purchase source at
  all `[research: game/src/server/Progression.luau]`. That is what a mixed convention costs: once
  "bonus" means +10% in one place and ×1.10 in another, every composition site is a judgement
  call. Every non-ladder source here is a factor, so there is no second convention to mix.
- **The ladder keeps its own mode rather than being re-decided.** `upgrades[].mode` already states
  `additive` or `compounding` per axis and `upgrades[].base` states the level-0 value, so
  `upgradeEffect(axis, level)` already contains the base. Restating either here would be two
  sheets deciding one field, and multiplying the base in again would double it.
- **The factor floor is 1 because nothing in this world is taken back.** "**Cleared is permanent —
  overgrowth never returns.**" `[brief: binding]` ← `[you chose: R2 Q1]`. A factor below 1 is a
  debuff, a debuff is a tension source, and adding tension was offered and declined twice.
- **Set modifiers are derived, never latched.** The collection record is a boolean map no event can
  un-set (sheet `05`), so set completion is already a pure function of saved state; latching would
  add a second source of truth for one fact. This is a statement about *storage*, not about events:
  the set-completion notification `core-loop/02` routes to its own channel still fires at the
  instant the last bit flips, and `mechanics/05` supplies it.
- **Purchase modifiers are recomputed from live ownership each session and never persisted.**
  `[cid: decided]` — the brief is silent. Latching a pass makes a refunded pass permanent, which is
  a real exploit against a permanent-multiplier-only store.
- **Ceilings are derived invariants, not tuning numbers, which is why I may set them.** Effective
  radius at or past `area.size / 2` lets one position clear a whole area, and "**A lap is finishing
  a space**" `[brief: binding]` ← `[you chose: R1 Q2]` stops meaning anything. Effective speed past
  one clear-radius per server tick moves the player further between ticks than the tool reaches, so
  patches pass through untouched — a correctness failure, not a balance preference. Value has no
  ceiling: a larger currency multiplier breaks no invariant.
- **The order is stated because two competent builders diverge on it.** Multiplication commutes,
  but the clamp does not, and a clamp applied per source instead of once at the end silently
  discards every source after the first that reaches it. `[cid: decided]` — no sheet states an
  order of operations anywhere.

```manifest
{
  "provides": "modifiers",
  "status": "proposed",
  "value": {
    "modifierObject": {
      "fields": [
        { "name": "sourceClass", "type": "enum: upgrade-level | set-completion | purchase" },
        { "name": "sourceId", "type": "string", "meaning": "the upgrade id, collection set id or product id that granted it" },
        { "name": "axis", "type": "enum: value | radius | speed" },
        { "name": "factor", "type": "number >= 1" }
      ],
      "revocable": false,
      "expires": false,
      "grantsNothingElse": "a modifier changes exactly one axis; it never grants currency, a Find, an area, a cosmetic or a second modifier"
    },
    "axisIdsJoinUpgrades": "axes[].id is upgrades[].id verbatim; Pace is a label and never an id",
    "axes": [
      {
        "id": "value",
        "label": "Value",
        "unit": "multiplier on tiers[].value",
        "baseFrom": "upgrades[value].base, already inside upgradeEffect",
        "consumedBy": "economy.faucets[patch-clear].formula",
        "ceilingRule": null,
        "ceilingReason": "a currency multiplier breaks no invariant"
      },
      {
        "id": "radius",
        "label": "Reach",
        "unit": "studs",
        "baseFrom": "movement.baseClearRadius, already inside upgradeEffect",
        "consumedBy": "the clearing proximity test",
        "ceilingRule": "effective < area.size / 2",
        "ceilingReason": "beyond it one position clears the whole area and a lap stops existing"
      },
      {
        "id": "speed",
        "label": "Pace",
        "unit": "studs per second",
        "baseFrom": "movement.baseWalkSpeed, already inside upgradeEffect",
        "consumedBy": "the character's WalkSpeed",
        "ceilingRule": "effective * serverTickSeconds <= movement.baseClearRadius",
        "ceilingReason": "beyond it the player outruns the tool between ticks and patches are never cleared"
      }
    ],
    "sources": [
      {
        "class": "upgrade-level",
        "step": 1,
        "instances": "exactly one per upgrade id",
        "mayTarget": ["value", "radius", "speed"],
        "compositionMode": "per upgrades[].mode (additive or compounding)",
        "stacksWithSelf": true,
        "boundedBy": "upgrades[].maxLevel",
        "storage": "the held level is persisted; the effect is derived from it at every read",
        "assignmentOwner": "gameplay/balance"
      },
      {
        "class": "set-completion",
        "step": 2,
        "instances": "at most one per collection.sets[].id",
        "mayTarget": ["value", "radius", "speed"],
        "compositionMode": "multiplicative",
        "stacksWithSelf": false,
        "boundedBy": "the number of sets in collection",
        "storage": "derived from discovery.record at every read; never latched, never persisted",
        "worthBand": "core-loop/02 requires a set bonus be worth between area.patchCount and ladderTotal/perTick/#sets base ticks at grant time; this composition is what converts a factor into that unit",
        "assignmentOwner": "content-structure work (currently gameplay/meta) chooses which axis each set targets; gameplay/balance sets each factor"
      },
      {
        "class": "purchase",
        "step": 3,
        "instances": "at most one per product id",
        "mayTarget": ["value", "radius", "speed"],
        "compositionMode": "multiplicative",
        "stacksWithSelf": false,
        "boundedBy": "the offer ladder",
        "storage": "recomputed from live ownership at every join; never persisted, never latched",
        "assignmentOwner": "offer-ladder work (currently gameplay/monetization) chooses which products exist; gameplay/balance sets each factor"
      }
    ],
    "resolutionOrder": ["upgradeEffect (base and level together)", "set-completion", "purchase", "ceiling clamp"],
    "withinStepOrder": "contract declaration order: upgrades[], then collection.sets[], then the offer ladder's own order",
    "composition": "effective(axis) = clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule)",
    "baseIsNotAppliedTwice": "upgradeEffect already contains upgrades[].base; nothing multiplies the base in again",
    "factorFloor": 1,
    "clampApplication": "once, after every source has been applied; never per source",
    "singleDefinition": "effective(axis) has exactly one implementation and every consumer calls it",
    "forbidden": [
      "a factor below 1, in any source",
      "an additive bonus expressed as a percentage or a flat amount",
      "an axis id that is not an upgrades[].id",
      "a source that targets an axis outside the three",
      "a source that grants currency, a Find, an area, a cosmetic or a second modifier",
      "a modifier that expires, decays, resets, is timed or is spent",
      "a purchase that raises an axis past its ceiling rule",
      "a set bonus written into save data",
      "a purchase written into save data",
      "the value multiplier applied both at the faucet formula and inside the award function",
      "a clamp applied between two sources"
    ]
  }
}
```

## Consequences for other work

- **Content-structure work (currently Meta & Content)** chooses which of the three axes each of the
  four sets targets. It may choose the same axis twice; it may not choose a fourth axis, and it may
  not make a bonus something other than a factor on one axis. `core-loop/02` already hands it a
  worth band in base ticks — this key is the conversion, so the two join without a third opinion.
- **Balance & Tuning** sets every factor and every `upgrades[]` figure, and inherits a shape it did
  not have: four set factors and N purchase factors multiply on top of the ladder, so an axis's
  worst case is the ladder at max times every factor that can target it, and the ceiling rules are
  what that has to clear.
- **Offer-ladder work (currently Monetization)** learns three things: a pass is a factor, a pass is
  never persisted, and a pass may not push an axis past its ceiling. With sheet `05` it has three
  legal multiplier targets rather than the brief's four.
- **The clearing and progression modules** get one function. `Progression.luau`'s squaring warning
  becomes structural rather than remembered: the multiplier is applied at the faucet formula and
  nowhere else (`economy`).
- **Persistence work** stores held levels and the collection map, and stores no modifier.
- **Architecture work** owns the server tick rate the `speed` ceiling reads. I state the
  inequality; the tick value is not mine.

## Flagged to the developer

Purchases being recomputed from ownership rather than latched is `[cid: decided]` on a silent
brief. The live alternative is latching a purchased multiplier into save data, which is simpler and
survives a Roblox ownership-service outage. **My recommendation is the decision as written**: a
latched pass is a refunded pass kept forever, and every SKU in a multipliers-only store is exposed
to it.

## Acceptance criteria

1. Every `modifiers.axes[].id` appears verbatim as an `upgrades[].id` in the merged manifest, and
   no manifest value anywhere uses `pace` as an id.
2. `effective(axis)` has exactly one implementation in the build, and every consumer of `value`,
   `radius` and `speed` reads it through that function.
3. With a ladder effect of E on one axis, one completed set granting factor 2, one owned product
   granting factor 2 and no ceiling reached, the effective value is exactly 4E — not 2E, not 16E,
   not E+4.
4. Revoke a product's ownership between sessions: the axis returns to its unpurchased effective
   value, and no saved field mentions the product.

## Not decided here

Which axis each of the four sets targets, and every magnitude (content-structure work chooses the
axis in kind, currently Meta & Content; Balance & Tuning sets every factor inside `core-loop/02`'s
band). The upgrade cost curve, `maxLevel`, `perLevel` and `base` (Balance & Tuning, which owns
`upgrades`). Which products exist and what they cost in Robux (offer-ladder work, currently
Monetization). The value of any ceiling — I state the rule that derives it, and the tick rate it
depends on is architecture work. What the clearing radius does physically
(`gameplay/mechanics/01-reach-and-pace`, which supplies the two bases). What a set completion
sounds or looks like, and which channel carries it (`core-loop/02`, Audio, Feedback-UI work).
