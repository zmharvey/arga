# 01 — The first find

**Domain:** Onboarding · **Category:** Gameplay · **Wave:** 3

## Decision

**The first relic is placed, not rolled.** It is buried under the patch nearest the
player's spawn, deterministically, every time.

## Why

- `[brief: binding]` `02-GAMEPLAY.md` promises "clear → reveal inside the first ten
  seconds" and states plainly: "the shuffle must not be allowed to decide this one."
- The brief's reasoning is that this front-loads the differentiator rather than hiding it
  behind a grind, and that the genre-standard alternative — economy first, finds later —
  risks a new player quitting before seeing what makes the game different.
- Nearest-to-spawn rather than a fixed index, so the guarantee survives any change to the
  area's layout or size.

```manifest
{
  "provides": "onboarding",
  "value": { "guaranteedFirstRelic": true }
}
```

## Consequences for other work

- **Meta & Content** must keep at least one patch within a few steps of spawn.
- The relic reveal cue and popup are on screen within ten seconds of a cold start, so
  neither may depend on anything the player has not been taught yet.

## Acceptance criteria

1. A brand-new player reveals a relic within their first three cleared patches, in 100
   consecutive fresh runs.
2. The guaranteed relic is the first entry of set one, not a random member.

## Not decided here

The rest of the first-minute choreography, and the second-contract beat that teaches the
collection surface.
