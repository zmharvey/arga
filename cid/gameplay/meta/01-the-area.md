# 01 — The area

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

One area, **120 studs square**, holding **140 patches** at a minimum spacing of **6
studs**. Named the East Terrace.

## Why

- `[brief: binding]` `03-META.md`: "areas, not zones. Discrete spaces that are cleared
  and permanently done."
- **Spacing exceeds the base clear radius of 5.5.** That relationship is the whole reason
  REACH is a purchasable upgrade: at 6 studs apart a player clears roughly one patch per
  step at level 0 and visibly more after buying.
- 140 patches is sized so a full clear funds visible movement on the upgrade ladder
  without maxing it, since this is one area of an intended four.
- `[playtest unknown]` Patch count and area size both. These jointly set lap length, which
  is the number the brief explicitly could not source and calls open.

```manifest
{
  "provides": "area",
  "value": {
    "id": "east-terrace",
    "label": "East Terrace",
    "originXZ": [0, 0],
    "size": 120,
    "patchCount": 140,
    "minSpacing": 6
  }
}
```

## Consequences for other work

- **Tech — Performance** inherits 140 anchored parts per player plot as its budget floor,
  against the brief's 3 GB device floor.
- **Balance & Tuning** inherits this as the income denominator: one area's payout is the
  unit the cost ladder is scaled against.
- **Art — Environment** gets a 120-stud terrace to dress, not an open landscape.

## Acceptance criteria

1. 140 patches fit in 120×120 at 6-stud spacing without the generator giving up.
2. Minimum spacing strictly exceeds the base clear radius.
3. A full clear of this area yields between 700 and 1,200 currency at upgrade level 0.

## Not decided here

What the terrace looks like (Art — Environment), how areas 2 to 4 differ (Meta &
Content, later sheets), the per-plot part budget (Tech — Performance).
