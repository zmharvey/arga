# 02 — The currency

**Domain:** Systems · **Category:** Gameplay · **Wave:** 2

## Decision

One currency, called a **Shard**, plural **Shards**, icon key `shard`.

## Why

- `[brief: soft]` `02-GAMEPLAY.md` settles **one currency**, with clearing as the only
  faucet and clearing-speed upgrades as the only sink. A rebirth currency existed in the
  reference and was removed as a consequence of cutting rebirth, not as a simplification.
- **Systems names it because Systems owns the economy.** Naming is not a decision separate
  from the thing named: a second domain holding a parallel name for this would be two
  sheets claiming one contract key.
- "Shard" is short enough for a HUD corner readout, is a concrete object rather than an
  abstraction, and does not borrow incremental-genre vocabulary — the brief positions this
  game deliberately outside that category.
- `[cid: decided]` The word itself. The brief left all naming open and this is a first pick,
  not a researched one. Vocabulary's banned-words sheet may overrule it; if it does, this
  sheet changes and the build re-emits.

```manifest
{
  "provides": "currency",
  "value": { "name": "Shard", "plural": "Shards", "icon": "shard" }
}
```

## Consequences for other work

- **UI/UX** gets a label short enough for a corner cluster. The HUD brief currently
  hard-codes the string `SHARDS`, which is how this value came to exist in the shipped build
  before any sheet owned it — that literal should now come from here.
- **Vocabulary** adjudicates whether "Shard" survives its banned-words list.
- **Monetization** prices in Robux, never in Shards; the brief forbids paid content access
  and a Robux-to-Shard rate would be the first step toward it.

## Acceptance criteria

1. `plural` is 10 characters or fewer, so a HUD readout does not truncate.
2. Exactly one currency exists in the contract.
3. No screen displays a currency string that is not derived from this key.

## Not decided here

The icon art (Art — Objects), the number formatting (UI/UX), whether the word survives
occupancy checking (Vocabulary — banned words).
