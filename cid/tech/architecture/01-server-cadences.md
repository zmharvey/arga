# 01 — Server cadences

**Domain:** Architecture · **Category:** Tech & Data · **Wave:** 5

## Decision

The server observes clearing on a **0.12 s tick**, saves every **45 s**, and stores under
`ArgaRuin_v1`.

## Why

- **Observed, not requested.** `[brief: binding]` `04-PRESENTATION.md`: "clearing and
  currency awards must be server-validated, or a client claiming arbitrary clears owns the
  game." A tick that walks player positions against uncleared patches means there is no
  clear-request remote for a client to forge. Integrity by construction rather than by
  validation.
- 0.12 s is roughly two frames at 60fps: fast enough that walking into a patch feels like
  contact, slow enough that the position sweep is cheap at 140 patches and 20 players.
- The store name is versioned because the save shape will change, and an unversioned key
  makes the first migration a data loss.

```manifest
{
  "provides": "runtime",
  "value": { "clearTickRate": 0.12, "saveIntervalSeconds": 45, "dataStoreName": "ArgaRuin_v1" }
}
```

## Consequences for other work

- **Security** does not need a clearing validation rule, because there is no clearing
  request to validate. It does still own bid-style validation for purchases.
- **Persistence** must collapse a finished area to a single completion flag rather than
  storing every cleared patch index, or save size grows without bound — the brief flags
  this as the one genuinely novel technical risk in the design.

## Acceptance criteria

1. No remote exists that a client can fire to claim a cleared patch.
2. Tick rate is under 0.25 s, or contact clearing feels laggy.
3. A completed area occupies one boolean in the save payload, not a list.

## Not decided here

The save schema itself (Persistence), purchase validation (Security).
