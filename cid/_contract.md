# The creative contract — derived, do not edit

`npm run cid:leadpack` regenerates this from `bridge/schema.mjs`. These are the
keys a build reads, and the one domain that owns each.

**25 keys is small because most domains have not run**, not because the
other subjects have no data form. A domain with no key here proposes one, by carrying
a fenced block tagged `manifest` whose contents are:

```json
{ "provides": "<key>", "status": "proposed", "value": <data> }
```

`npm run bridge` reports a proposal and never merges it, until someone writes a
shape for it here. Proposing a key that already exists below is an error.

| key | owner | what it settles |
|---|---|---|
| `area` | `gameplay/meta` | The one clearable space: its extent and how densely it is populated. |
| `tiers` | `gameplay/systems` | Overgrowth grades: what a patch is worth and how it reads at a glance. |
| `upgrades` | `gameplay/balance` | The spend side of the loop: what currency buys, and the cost ladder. |
| `vocabulary` | `theme/vocabulary` | Naming rules every player-facing string in this contract is checked against. |
| `currency` | `gameplay/systems` | What the single currency is called, and how it reads on screen. |
| `movement` | `gameplay/mechanics` | What the player can reach and how fast, before any upgrade. |
| `patch` | `art/objects` | The physical footprint of one piece of overgrowth. |
| `collection` | `gameplay/meta` | The relics, their sets, and how many are buried per area. |
| `onboarding` | `gameplay/onboarding` | What the first session is guaranteed to deliver. |
| `rarity` | `gameplay/systems` | How many rarity ladders exist, and the one field each is read from. |
| `economy` | `gameplay/systems` | Faucets, sinks, the per-clear payout formula, and the payout floor. |
| `discovery` | `gameplay/systems` | The per-Find record, the draw pool and replacement rule, and what a repeat does. |
| `modifiers` | `gameplay/systems` | What a permanent stat change is, and the order several of them resolve in. |
| `input` | `gameplay/mechanics` | The closed verb list, and which device classes reach each one. |
| `tool` | `gameplay/mechanics` | Whether the tool is a held object, and what drives its appearance. |
| `response` | `gameplay/mechanics` | Per beat: what fires, on which side, within what budget, and whether control is affected. |
| `traversal` | `gameplay/mechanics` | Jump, edges, falling, and what the body may do inside an area. |
| `social` | `gameplay/social` | Population, progress scope, plot tenure, collision, chat, and the co-presence bound. |
| `setBonus` | `gameplay/meta` | What completing a set grants: which axis each set targets, and by how much. |
| `depths` | `gameplay/meta` | How many areas exist, at what depths, how large each is, and what unlocks it. |
| `layout` | `gameplay/meta` | How one area is composed, and where finds sit inside it. |
| `plots` | `gameplay/meta` | How players’ areas are arranged in the world, and where each spawns. |
| `endgame` | `gameplay/meta` | What exists after the collection is complete. |
| `products` | `gameplay/monetization` | What is sold for Robux, on which axis, at what factor and price. |
| `firstSession` | `gameplay/onboarding` | The opening beats, what each guarantees, and what is withheld on run one. |
