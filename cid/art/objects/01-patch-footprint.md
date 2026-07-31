# 01 — Patch footprint

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

A patch occupies a **3-stud square footprint**, height varying by tier, rendered in
**Grass** material, and **does not collide**.

## Why

- 3 studs against a 6-stud minimum spacing leaves a 3-stud walkable gap, so the terrace
  reads as a place you move through rather than a solid mass.
- **Non-colliding is the load-bearing part.** `[brief: binding]` The brief specifies
  contact clearing with movement-only input and no aiming; a patch that blocks the player
  turns clearing into navigation and the loop into an obstacle course.
- Height carries tier alongside silhouette, giving the accessibility constraint a second
  channel for free.

```manifest
{
  "provides": "patch",
  "value": { "footprint": 3, "collides": false, "material": "Grass" }
}
```

## Consequences for other work

- **Tech — Performance** gets 140 non-colliding anchored parts per plot, which keeps them
  out of the physics solver entirely.
- **Mechanics** can rely on the player never being stopped by overgrowth.

## Acceptance criteria

1. Footprint plus base clear radius is less than the area's minimum spacing.
2. No patch has `CanCollide` set.
3. The four tier heights are all distinct.

## Not decided here

The foliage models themselves, and the clear-away effect (Art — VFX).
