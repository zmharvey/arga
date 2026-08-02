# Playtest record

The pipeline had no artifact type for an empirical reading. Every number in `cid/**` is a
prediction; this file is where a prediction meets a person. The Analytics category lead found
the gap while enumerating the measurable surface — the 2026-08-01 session existed only in a
chat log, so no agent could cite it and no verifier could check a design claim against it.

**One reading is worth more than the count suggests**, because most of these values had never
been observed at all. They were derived from each other. A single human confirming that area 1
takes roughly its predicted time is the first external check the arithmetic has had.

**Rules for this file**

- One section per session, newest last. Never rewrite an earlier one; a reading that later
  turned out to be measuring the wrong thing is still what was seen.
- Record what was observed, not what it implies. The implication belongs in the sheet that
  owns the value.
- Name the sheet and field each observation bears on, so a writer can find it from the digest.
- `n` is the number of players. Say it. Every reading so far is `n = 1`, by the developer,
  which is a sample that can refute a gross error and cannot confirm a fine one.

---

## 2026-08-01 · n = 1 · developer · pipeline-built `game/arga.rbxl`

First playthrough of the fully pipeline-built game. Eleven modules from two contracts, no
hand-written control read by any builder.

### Confirmed by feel

| observation | bears on |
|---|---|
| Area 1's clear time was "pretty close to that time estimate" | `pacing`, `depths.areas[1]`, `core-loop/04` lap arithmetic |
| "The first find shows up pretty quick" | `firstSession.beats[firstFind]`, `onboarding` arming gate |
| "The number of shards you get for each piece of grass is good" | `economy` payout formula, `tiers[].value` |
| The area transition "is good" | `plots.advance`, `layout`, `wiring.onAreaComplete` |

These are four values the design predicted and nothing had ever checked. None is a precise
measurement — "pretty close" is not a stopwatch — but each is capable of having come back
badly wrong, and none did.

### Defects found

1. **Purchase buttons rendered mid-screen**, over the play area, instead of beside the upgrade
   readouts. *"Big purple boxes that cover the screen."* Cause: `HUD_CLUSTER_MAX_WIDTH_SCALE`
   0.46 is `maxSize` on `Cluster_bottomRight` — the widest that cluster may ever be — and was
   read as the width it has. With `AnchorPoint (1,1)` the column's right edge landed at 0.54 of
   viewport width. **Fixed** in `game/src/client/Pressables.luau` by measuring the realised
   cluster and keeping 0.46 as a cap only. Commit `78fc773`.

2. **Every upgrade appears twice, and so does the collection count.** *"The upgrades also show
   up in the middle of the screen twice… Same with the finds: it added another box even though
   it already had one."* **Not a bug.** `pressables` draws the three buy buttons; `hud-binding`
   draws the three readouts; both are correct and neither is duplicated. **No contract key owns
   the composition** — nothing says whether "Span, level 2, 480" is one row with a button on it
   or two independent elements naming the same upgrade. `Pressables.luau` names the cause in
   its own comments. Routed to wave 5, UI/UX — HUD, as the proposed key `composition`.

3. **The developer reported that pressing 1, 2 and 3 buys upgrades.** No module binds those
   keys; all four `KeyCode` matches in `game/src/` are comments recording that ruling R-1
   removed the binding. Either the session was running a stale build or the observation is
   misattributed. **Unresolved**, and it stays here until someone reproduces it or rules it
   out — a live keyboard path would mean R-1's mobile fix masks the old surface rather than
   replacing it.

### What this session could not check

No purchase was made against a real game pass (every `gamePassId` is `null`). Nothing past
area 1 was observed, so the depth ladder, the set bonuses, duplicate draws and the endgame bay
are all still unobserved. No second player was present, so every `social` value — co-presence,
plot tenure, the 128-stud separation figure — remains a prediction.
