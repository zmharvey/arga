# The creative contract — derived, do not edit

`npm run cid:leadpack` regenerates this from `bridge/schema.mjs`. These are the
keys a build reads, and the one domain that owns each.

**9 keys is small because most domains have not run**, not because the
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
