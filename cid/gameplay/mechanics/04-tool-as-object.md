# 04 — The tool is a held object

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**G3: held.** Every player carries one visible tool from spawn, welded to the right hand, and its
**head width is the only thing that changes, driven by the Reach axis alone**. It never swings,
never collides, never touches a patch, and never clears anything: proximity clears, the tool is what
makes proximity legible.

## Why

- The brief's only feel statement is "reach is the primary sensation, a wider tool must visibly
  sweep more per step" `[brief: soft]` ← `[I assumed]`, `02-GAMEPLAY.md`. It names a *tool* and asks
  it to be *visible*. An abstraction cannot keep that promise, and nothing else in the game can
  either: the clear radius has no surface of its own, the patches vanish the same way at any radius,
  and the HUD is a readout.
- Two upstream sheets already leaned this way and both are load-bearing. `theme/identity/04` names
  nine entity classes and admits none, then recommends an oversized tool as the premium SKU
  precisely because a tool is an object rather than a being; `theme/setting/05` carves out that a
  tool in a player's hand is not place matter `[research: cid/_digest.md]`. The second is not a
  recommendation, it is a hole cut in a closed list for exactly this object.
- The brief flags the premium SKU as homeless twice `[brief: binding]` as a stated hole,
  `03-META.md` and `OPEN.md §6`, and the reference's whale item is a 2,500-Robux oversized tool that
  is a radius upgrade `[brief: soft]`, `research/grass-incremental.md`. Held gives wave-3
  premium-SKU work an object to attach to that is still a permanent multiplier and still touches no
  content, which is the binding monetization rule.
- **The argument against, answered.** The brief's "movement only" line bans press verbs aimed at the
  world, not objects. A tool that is never activated, never equipped and never swung adds no input
  at all, and sheet 02's roster stays at five verbs with `equip`, `unequip`, `stow` and `drop` all
  absent.

**Reach drives it, and Value and Pace never do.** Reach is the axis the brief calls primary; a tool
that grew on three axes at once would read as none of them, and a builder handed "the tool reflects
upgrades" would scale it three ways.

**The head cannot be a readout of the radius.** Base clear radius is 5.5 studs (sheet 01, shipped),
so a head literally spanning the cleared diameter would be 11 studs wide against a roughly 2-stud
character. The mapping is therefore monotonic in Reach level, not equal to the radius: **1.2 studs at
level 0, plus 0.35 studs per level**, reaching 4.0 studs at the ladder's top. That is a 3.3x visible
growth that stays smaller than twice the character. **Both figures are `[playtest unknown]`:**
starting base 1.2 studs, test range 0.8 to 1.8; starting per-level 0.35 studs, test range 0.2 to
0.6. What is not open to tuning is the ordering, that the head is monotonic in Reach and changes on
no other axis.

## What the tool may never do

Twelve rules. Each is a thing a builder could add without noticing it broke something.

| # | rule | why it is here |
|---|---|---|
| T1 | never swings, and plays no swing, chop, sweep or attack animation | clearing is contact, not an action `[brief: soft]` |
| T2 | never has a hitbox: `CanCollide`, `CanTouch` and `CanQuery` are all false, and it is `Massless` | a hitbox is a second clearing system, and the brief forbids designing clearing and discovering as separate systems |
| T3 | never contacts a patch, and no clear is ever attributed to it | the radius test is the character's, not the tool's |
| T4 | is **not** a Roblox `Tool` instance and never enters the Backpack | a `Tool` grants a free click and tap activation aimed at the world, which would be a third game-bound verb; sheet 02's two pressables are the whole bound surface |
| T5 | never leaves the hand: no drop, no stow, no unequip, no slot, no hotbar, no inventory | there is exactly one and it is always held |
| T6 | has no durability, charges, ammo, cooldown, heat, condition or wear | all six are tension, and zero tension is confirmed `[brief: soft]`, stated three times in the brief |
| T7 | exactly one tool exists, granted at spawn, before anything is cleared | a second tool implies a choice, and a choice implies a select verb |
| T8 | never writes any `Humanoid` property | walk speed and jump belong to sheet 01 and sheet 06; a tool that edits a Humanoid is two owners for one number |
| T9 | no weapon silhouette: no sword, axe, spear, scythe or sickle profile, and no blade edge longer than the grip | the tone is "warm, aged, unhurried. Not spooky, not grim, not a power fantasy" `[brief: soft]`, `01-FOUNDATION.md`, and a scythe is the most death-coded implement in the set |
| T10 | no glow, trail, aura, particle emitter or enchant effect at any Reach level | rarity legibility belongs to the overgrowth `[brief: soft]`, and a glowing tool competes with the reveal, which Tone ranks as the loudest moment |
| T11 | never changes shape, class, silhouette or material by level: only the head's width changes | one channel, so a player reads it without being taught |
| T12 | a premium tool obeys T1 to T11 unchanged, and may never be the only way to have a tool | monetization is "permanent multipliers only. Never content access" `[brief: soft]` ← `[you accepted: R5 Q4]`, `03-META.md` |

```manifest
{
  "provides": "tool",
  "status": "proposed",
  "value": {
    "held": true,
    "count": 1,
    "grantedAt": "spawn",
    "drivenBy": "radius",
    "appearanceChannel": "headWidth",
    "headWidthBaseStuds": 1.2,
    "headWidthBaseTestRangeStuds": [0.8, 1.8],
    "headWidthPerLevelStuds": 0.35,
    "headWidthPerLevelTestRangeStuds": [0.2, 0.6],
    "attachment": "RightHand",
    "instanceClass": "Model",
    "isRobloxToolInstance": false,
    "entersBackpack": false,
    "canCollide": false,
    "canTouch": false,
    "canQuery": false,
    "massless": true,
    "clearsOnContact": false,
    "animates": false,
    "writesHumanoidProperties": false,
    "particleEmitters": 0,
    "changesWithAxes": ["radius"],
    "unaffectedByAxes": ["value", "speed"],
    "premiumVariantAllowed": true,
    "premiumVariantMayBeOnlyTool": false
  }
}
```

## Consequences for other work

- **Premium-SKU work (currently Monetization, wave 3):** you are unblocked and you inherit a
  constraint. The tool exists, it is a Reach expression, and a premium tool is a bigger head on the
  same object obeying T1 to T12. The price, the rung count, the level thresholds and whether a
  ladder exists at all are entirely yours; I set none of them.
- **Object and model work (currently Art and Visuals):** you own what the tool is, its material and
  its proportions, inside T9 and T11. The one thing that is not yours is the channel: width, and
  nothing else, moves with level.
- **World-inventory work (`theme/setting/05-inventory`):** the carve-out is used. A held tool is now
  a real object in every player's hand and still not place matter, so the closed list is unchanged
  by this sheet.
- **Balance and Tuning:** the radius axis's `maxLevel` now has a second consumer. If it moves, the
  head's top width moves with it; nothing else about the tool changes. The two width figures above
  are inside my own key and carry test ranges, so they are yours to settle, not to re-own.
- **Animation and rig work:** there is none to do. T1 and T4 together mean no animation asset, no
  `AnimationController` and no `Animator` state for the tool at any level.

## Acceptance criteria

1. Every player has exactly one tool welded to the right hand within one second of spawning, before
   any patch is cleared, and it is not a `Tool` instance and does not appear in the Backpack.
2. Tool head width equals `headWidthBaseStuds + headWidthPerLevelStuds * radiusLevel` at every
   level, and buying a Value or a Pace level changes zero properties of the tool.
3. The tool's parts report `CanCollide = false`, `CanTouch = false`, `CanQuery = false`,
   `Massless = true`, and the game contains zero `Touched` handlers and zero animation tracks on it.

## Not decided here

What the tool is, what it is made of, and what it looks like at any width (Art and Visuals). Its
name and any player-facing string about it (Theme, Vocabulary). Every price, rung, threshold and
ladder for a premium version (premium-SKU work). The radius values themselves and `maxLevel`
(Balance and Tuning, already merged), and the two width figures inside their stated ranges (Balance
and Tuning). Whether the tool is visible to other players at all, which follows from co-presence
rules (`gameplay/social/02`).
