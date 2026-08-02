# Audio — category brief

**Wave:** 6. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `04-PRESENTATION.md` — Audio is a
layer-4 subject, so layers 1–3 are constraints you inherit and not decisions you get to make.
The brief's audio direction is not in a numbered sheet: it is `OPEN.md §2`, and it is
`[I assumed]` in whole.

This is an **assignment document.** It contains no Audio decisions. Every row in the surface
list below is cited to the approved key, brief line or shipped file that put it there; nothing
here is invented, and where a lead must rule rather than inherit, the row says *rule*.

**Also read before you write:** `cid/_digest.md` (every wave 1–5 decision and its boundary),
`cid/_contract.md` (25 merged keys and their owners), `cid/_state.md` (rulings R-1..R-4,
escalations, build-stage notes), `cid/_playtest.md` (the one empirical reading this project
has), and — this is not optional — **`game/src/client/Beats.luau`**, whose five cue bodies are
empty and are where your work lands.

---

## The one file that makes this category concrete

`game/src/client/Beats.luau` ships **five cue functions with empty bodies**. Its own header
states why, and names you:

> *"THIS MODULE DECIDES **WHEN** A CUE STARTS AND ON WHICH CHANNEL. IT DOES NOT DECIDE WHAT ONE
> IS. The five cue bodies in `CUES` are empty and that is deliberate: what a reveal looks like,
> sounds like and reads as belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of
> which owns a contract key yet. Every channel has a receiver anyway, so adding presentation is
> a change to one function body and to no scheduling. No sound, particle, image or animation
> asset is named anywhere below, and none was invented."*

So the triggers exist, the scheduler exists, the latency budgets exist, the channel assignment
exists — and the sound does not. **This category is unusually well-defined and unusually
checkable.** A sheet that produces prose and no data leaves those five bodies exactly as empty
as it found them.

---

## What the brief binds for this whole category

| constraint | tag | consequence for Audio |
|---|---|---|
| *"Warm, organic, tactile. Clearing is a soft rustle-and-snap; each rarity tier a distinct pitched note; **a relic reveal owns the best sound in the game.** An area's completion gets a short resolving chord — the only "achievement" sound. Music sparse and low."* `OPEN.md §2` | `[I assumed]` → **`[brief: soft]`** | **This is the whole of the brief's audio direction and every word of it is arguable with a reason.** It is also the only place four of your six domains have a starting position at all. Do not upgrade it by treating it as settled; do not discard it by ignoring it. Wave 1 already ratified one clause (`theme/tone/03`, the reveal at the top) and overruled another (its "two emotional peaks" pairing). |
| *"**Consequence: audio and visual feedback carry the entire load**"* `02-GAMEPLAY.md` | `[you accepted: step 6 Q2]` → `[brief: soft]` | The design has no failure, no timer, no decay and no tension. Half of everything the player is told about their own progress is yours. This is the reason the category is not decorative. |
| *"nobody downstream should invent tension to fill the gap"* `02-GAMEPLAY.md`, elevated by `HANDOFF.md`'s six-things list | the ruling is `[you accepted: step 6 Q2]` → `[brief: soft]`; wave 1 relays **the instruction** as `[brief: binding]` (`theme/tone/03`) | No riser, no build, no swell approaching a completion, no cue whose intensity is a function of progress. Relayed at wave 1's strength because two approved sheets already rest on it; if you think that elevation is wrong, argue it in a `## Pushing back` rather than assume it. |
| *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | Phone speaker, cheap earbuds, an eight-year-old, a 10–20 minute session. The ceiling on dynamic range is a device, not a taste. `theme/tone/03`: *"the ceiling is a phone speaker and a child, not a design choice."* |
| *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` | `[I assumed — the split]` → `[brief: soft]`, and **uncorroborated by anything fetched** (`cid/_state.md`) | The *band* binds; the ratio does not. Nothing you write may depend on the precise share. |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | No sound exists in order to give a lead something to do. A domain that concludes "there is nothing here" is compliant and is an output; a domain that invents a layer to look busy is not. |
| *"Success is shipped artifacts, not players."* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | Your output is checkable data a builder reads, not a mood board. |
| *"**Cleared is permanent** — overgrowth never returns."* `01-FOUNDATION.md` | `[you chose: R2 Q1]` → **`[brief: binding]`** | Nothing regrows, so no cue may ever announce a return, a reset, a refill or a second chance. |
| *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."* `02-GAMEPLAY.md` | `[you accepted: step 6 Q3]` → `[brief: soft]` | Already overruled once, by ruling **R-1**, contained to one input class / two verbs / four controls. **You may not widen that overrule and you may not re-litigate it.** There are five verbs and no sixth, so there are five things a player can do that could make a sound. |
| *"**Endless via shuffled authored chunks**, not generation."* `03-META.md` | `[you chose: R5 Q1]` → **`[brief: binding]`** | Areas are not distinguishable content. A per-area track or per-area bed is a claim about difference the world does not make. |
| *"Shared server, parallel progression, own areas, no mechanical interaction."* `02-GAMEPLAY.md` | `[you accepted: R6 Q2]` → `[brief: soft]` | Every sound you author is heard next to fifteen other players doing the same thing 122 studs away. Attenuation is not a polish question here; it is the difference between a place and a factory floor. |
| *"Hard constraint: rarity tiers must differ by **shape or silhouette, not only hue**."* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` **in the brief** | Not directly yours — but note what it means for `OPEN.md §2`'s per-tier pitched note: audio may *add* a tier channel and may never *be* the tier channel, because the audience plays muted and the accessibility constraint was solved in silhouette. |
| *"**Declined:** a full pass with colourblind mode, text scaling and sensitivity options — out of scope at this size."* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` | **There is no options screen and no settings verb.** `input` is a closed five-verb list. A player's only volume control is the platform's own. Anything your design needs the player to adjust, it does not have. |
| *"Ships and settles. No seasons or events."* `OPEN.md §2` | `[I assumed]` → `[brief: soft]` | No seasonal cue, no event stinger, no dated anything. Reinforced by the scope gate below. |

### Approved keys and shipped files that bind you before you start

Settled facts, not inputs to re-decide. Each is a merged or proposed contract key with one owner,
or a file the running game already reads.

| source | what it forces on you |
|---|---|
| `response` (`gameplay/mechanics/05`) | **The spine of this category.** Five beats, five causes, five latency budgets, and the channel list per beat. `controlEverAffected: false`, `lockoutsSeconds: 0`, `negativeBeats: 0`. `minOnsetGapSeconds` **0.6**, `minSustainedOnsetsPerSecond` **8**, `onOverload: "overlap"`. Its own consequence line to you: *"five beats, five budgets… A cue longer than its beat's dwell or separation is legal only if it can overlap the next one, and at 0.6 s separation that is the common case rather than the exception."* |
| `theme/tone/03-beat-map` (wave 1) | The ranking you did not set and may only overturn by naming the `B` ids and citing the file: **`B1` reveal > `B2` set > `B3` area > `B4` purchase > `B5` clear, no ties.** *"`B1` is the loudest single moment in the game in every channel."* `B2` *"may be longer and wider than `B1`… Never sharper."* `B3` is *"the only 'achievement' sound."* `B4` is *"a confirmation, not a celebration. Identical at every level and on every axis."* `B5` is *"texture, not a beat… Exactly one intensity, every time, forever. No streak escalation, no combo, no rising pitch ladder, no crescendo near completion."* **Nothing rises with depth: *"`B1` at depth 4 is exactly as loud as `B1` at depth 1."*** That sheet's own note: *"These two kinds of work can overturn this sheet, and only these two: feedback and celebration design for the completely-clear moment, and **audio intent**."* |
| `theme/tone/04-do-nots` `D3`, `D4` | Your palette exclusions, both `decided`, both auditing **Audio** by name. `D3`: *"A minor-key sting, a dissonant or detuned interval, a sub-bass drone, a whisper, breathing, a heartbeat, a creak, a wind howl."* `D4`: *"An announcer voice line, a crowd cheer or applause sample, a coin-jackpot cascade, a slot-machine ratchet, an air horn, a riser or whoosh build."* |
| `theme/setting/01-the-ruin` | **The one grant this category has:** *"you are granted the one permitted living sound in the game — off-screen ambience beyond the worked edge, suggesting life that is never seen. **Taking it is your call.** Nothing else here moves or makes noise on its own, and the water is dry, so a running-water bed is not available."* |
| `theme/setting/03-physical-law` `R5` | *"Continuous is not a change; intermittent is. A constant, unvarying ambient bed… asserts no event and passes this law. **Anything scheduled, intermittent, randomised over time, or varying with anything but a player's action is a change of state and fails.**"* Its consequence line to you: *"no weather bed, no gust, no thunder, no dawn chorus, and **nothing randomised over time, which is the idiomatic way an ambient bed is built and is forbidden here**. There is one hour, so no cue may vary by hour."* |
| `theme/setting/05-inventory` | *"the inventory tells you what cannot make a sound. **No water bed, no fire crackle, no mechanism, no cloth or rope, no creaking hinge in service.** Air is present and unmodelled, so a soft air bed and the off-screen ambience `01-the-ruin` granted you are both available and are the only living sounds in the game."* Twelve classes of matter, closed; twenty-five absent. |
| `ui-ux/feedback/01` (`notices`, wave 5) | Two hard joins. **(a)** *"the audible length of the `B2` cue must be at most 3.0 s and the `B3` cue at most 2.5 s, or the plate leaves the screen while its sound is still playing… If Audio needs more, the route is a revision request against this sheet raising the dwell inside its 5.0 s ceiling — one number, not a redesign."* **(b)** `notices.forbidden.noticeSound`: *"a sound authored by this key"* is forbidden, on the ground that *"audio is the notice beats' second channel and **Audio owns it**."* So the completion sounds are yours and only yours. |
| `ui-ux/feedback/01`, `/03` | `findReveal` has **zero HUD-space component**. `liftAnnouncement` forbids *"any plate, **sound** or motion when an upgrade row, the `/24` denominator or the index panel lifts."* One system notice exists (a failed save read, 5.0 s) and **nothing states whether it has a sound.** |
| `tech/performance/01` (`budgets`, wave 5) | `memoryCeilingsByCategory.Sounds` = **20 MB**, floor device, `[playtest unknown]`, ±60% test range, against a total client place-memory budget of **420 MB**. Floor device is a 3 GB phone at 60 Hz. This is the only number in either contract that bounds your asset count, and it bounds all six of you jointly. |
| `tech/performance/03` `N14`, `N15`, `N17` | *"**Feedback, VFX and audio work** inherits `N14` and `N15`: **no beat may be batched or delayed for frame budget**, and no build may interrupt one."* `N17` forbids adding an uploaded sound asset to *world geometry* in order to reduce part count. |
| `tech/deploy/02` (wave 5) | **An emitted value may never be an explicit null.** `bridge/emit-config.mjs:79` maps `null` to `nil` and Luau drops the key entirely, so *"an explicit null and a never-emitted key are the same bytes at runtime."* Absence is a declared sentinel of the field's own type: `0` for an unprovisioned platform id, `"none"` for a scalar, `{}` for a list. |
| `tech/deploy/01` (`release`, wave 5) | The provisioning gate: *"publish first."* Ordered gates 1–6, `unprovisionedIdValue: 0`, `buildMustRunAtEveryGate: true`. **No gate mentions audio.** See G2. |
| `input` (`gameplay/mechanics/02`) | Five verbs, no sixth. `gameDrawnPressables: 4` (three `purchase`, one `index`). `debounceSeconds: 0.35`. **`rejectionCueOnFailedPrecondition: "none"`** and `buy`'s `onPreconditionFail: "silentNoOp"`. `indexScreenSuspendsMovement: true`. `worldObjectsTriggeringAVerb: 0`. |
| `traversal` (`gameplay/mechanics/06`) | `jump.exists: true` at the platform default, gating nothing. `fall.damage: false`. So the platform's own character sounds are in the build by default and **nobody has ruled on them.** See G4. |
| `discovery`, `rarity`, `meta/03`, `endgame` | No reachable duplicate exists → **no consolation cue.** `rarity.forbidden` bans a reveal cue that varies by set — restated in `Beats.luau`: *"it may not vary by which set a Find belongs to."* `meta/03`: nothing may signal which axis a completed set granted *"by making the cue louder, longer or different."* `endgame`: past area 8, `B1`, `B2` and `B4` are **extinct** and the game runs forever on `B5` and `B3` alone. |
| `social/03` `X11` | No sound may name, count or announce another player's join, leave or progress. |
| `products` `F19` | No in-game surface may name, show or price a product — including an audio cue attached to one. There is no in-game store (**R-4**). |
| `cid/_playtest.md` | `n = 1`, one session, area 1 only. **Nothing about audio was observed, because none exists.** Every number you write is a prediction; mark it `[playtest unknown]` with a test range. |

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events

`[I assumed — the ordering]` → `[brief: soft]` on its provenance, and **hard as a gate**: the
category verification `checks` in `docs/cid-workflow.json` fail any sheet that *"reserves space
for, stubs, describes or specifies a priority-2 or priority-3 item."*

**No domain may name, imply, or build fiction around any of it.** Concretely, and this is the
list an audio agent reaches for by reflex: no rebirth fanfare or prestige sting, no daily-login
chime or streak escalation, no code-redeem sound, no leaderboard or rank cue, no trade or gift
sound, no seasonal bed, no holiday layer, no event stinger, no returning-player greeting, and
**no reserved `SoundGroup`, empty cue slot, unused bus or "future" field held open for any of
them.** `rebirth` is additionally in `vocabulary.bannedWords`, so the word itself fails the merge.

**Priority 2** (*richer authored chunk variety · a duplicate-handling refinement · visitable
restored ruins*) is likewise not yours to reserve space for.

**Naming one in order to forbid it is compliant.** A `forbidden[]` row saying "no offline-return
cue exists, ruling: priority 3" is data a build can be failed against. Silence about it is not.

---

## The full sonic surface

**Six leads partition this list.** Nothing outside it exists without a lead ruling that it
should and saying why. Every row cites what puts it there. Rows marked **rule** are ones where
no source settles the answer and the named lead must decide it rather than discover it later.

### A · The five beat cues — the five empty bodies in `Beats.luau`

`response` fixes the cause, the deciding side, the budget and the channels. It does **not** say
what any of them sounds like: *"What any beat sounds like, looks like, is made of, or how loud it
is, in every channel"* is in its `## Not decided here`.

| # | cue body | beat · rank | `response` channels | budget | owner |
|---|---|---|---|---|---|
| 1 | `cueFindReveal` | `findReveal` · `B1` | `atPatch`, **`audio`** · `notice` forbidden | 300 ms, test 200–500; dwell 2.5 s | **Stingers** |
| 2 | `cueSetComplete` | `setComplete` · `B2` | `notice`, **`audio`** | 400 ms, test 250–700 | **Stingers**, capped at 3.0 s audible by `notices` |
| 3 | `cueAreaComplete` | `areaComplete` · `B3` | `notice`, **`audio`** · `atPatch` forbidden | 400 ms, test 250–700 | **Stingers**, capped at 2.5 s audible by `notices` |
| 4 | `cueUpgradePurchased` | `upgradePurchased` · `B4` | `readout`, **`audio`** | 200 ms, test 120–350 | **UI Sound** |
| 5 | `cuePatchClear` | `patchClear` · `B5` | `atPatch`, `readout` — **no `audio` channel in the manifest** | 80 ms, test 40–120; residue 0.4 s | **SFX**, contingent on G1 |

**Every beat carrying an `audio` channel has an owner in this partition. There are zero orphans.**
The inverse is the finding: **`patchClear` is the most-repeated event in the game, the brief gives
it a sound, `theme/tone/03` gives it one channel and one intensity forever — and
`response.beats[patchClear].channels` does not list `audio`.** See G1. Do not write a `B5` sound
sheet as though the channel exists, and do not silently drop the beat either.

**Routing note on `B4`, so two leads do not both claim it.** `theme/tone/03` rules `B4` *"a
confirmation, not a celebration"*, and the graph gives UI Sound *"purchase and confirm"* while
Stingers owns *"reward and unlock jingles"*. `B4` is therefore UI Sound's, even though it arrives
through the same scheduler as `B1`–`B3`. Stingers does not author it.

### B · Continuous layers

| # | layer | who puts it there | owner |
|---|---|---|---|
| 6 | **The one granted ambient bed** — off-screen, beyond the worked edge, suggesting life never seen; continuous and unvarying; *"Taking it is your call"* | `theme/setting/01-the-ruin`; `theme/setting/03` `R5` | **Ambient** |
| 7 | **A soft air bed** — air is present and unmodelled | `theme/setting/05-inventory` `P10`, and its Audio consequence line | **Ambient** |
| 8 | **Music** — *"Music sparse and low"* is the only direction, and it is `[I assumed]` | `OPEN.md §2`, against `setting/03` `R5` and `tone/03`'s flat baseline | **Music** — **rule**, including whether any track exists at all. See G3. |
| 9 | Per-area or per-depth variation of 6–8 | **forbidden**: `tone/03` (*nothing changes with depth*); `setting/03` `R1` (one hour); `03-META.md` (areas are shuffled authored chunks, not distinct content) | Music and Ambient each state the zero |

### C · In-world sound that is not a beat

| # | subject | who puts it there | owner |
|---|---|---|---|
| 10 | **Platform-default character sounds** — footsteps, jump, landing — present in the build by default, unruled by any sheet | `traversal` (`jump.exists: true`, platform default); `release` `P2` (avatar type **R15**) | **SFX** — **rule**. In a movement-only game this is the most-heard sound the player will have, and no sheet has decided whether it plays. See G4. |
| 11 | **The held tool** | `tool` (`gameplay/mechanics/04`); `input.worldObjectsTriggeringAVerb: 0` — there is no swing verb | **SFX** — **rule**, likely zero |
| 12 | **A neighbour's clearing, heard across the 122-stud plot pitch** | `plots.pitchStuds` 122; `social.maxCoPresenceSeparationStuds` 128 (a *sight* rule); `budgets.streaming.StreamingMinRadius` 160 | **Mix** owns roll-off and the concurrency cap; **SFX** owns whether a neighbour's `B5` is audible at all — **rule**. See G7. |
| 13 | **Area transition / bay build** | `plots.advance`; `theme/identity/03` (*a plot appears and disappears whole*); `performance/03` `N16`; `tone/03` forbids *"entering or leaving an area"* from peaking | **SFX** — **rule**, and the peaking ban points hard at zero |
| 14 | Any world object that responds to the player | **impossible**: `05-inventory` `A11` (*no operable object*), `input.worldObjectsTriggeringAVerb: 0` | none — SFX states the zero |

### D · Interface sound

| # | subject | who puts it there | owner |
|---|---|---|---|
| 15 | **Four pressable presses** — `Pressable_BUY1/2/3`, `Pressable_INDEX` | `input.gameDrawnPressables: 4`, `debounceSeconds: 0.35` | **UI Sound** |
| 16 | **Index open and close** | `input`'s `openIndex` verb; `indexScreenSuspendsMovement: true` | **UI Sound** |
| 17 | **A failed or unaffordable press** | **forbidden**: `input.rejectionCueOnFailedPrecondition: "none"`, `buy.onPreconditionFail: "silentNoOp"`, `response.negativeBeats: 0`, `theme/tone/04` `D12` | **UI Sound** states the zero |
| 18 | **The one system notice** (failed save read, 5.0 s) | `ui-ux/feedback/03` — not a beat, never enters `Beats.luau`'s queue, and **no sheet says whether it makes a sound** | **UI Sound** — **rule** |
| 19 | **The three row lifts and the `/24` denominator lift** | **forbidden**: `firstSession` `S6`/`S7`; `notices.forbidden.liftAnnouncement` bans *"any plate, **sound** or motion"* | **UI Sound** states the zero |
| 20 | Volume, mute or audio-settings surface | **does not exist**: `input` is a closed five-verb list; `04-PRESENTATION.md` declined a sensitivity-options pass | **Mix** states the consequence |

### E · Silences that must be stated, not assumed

Each is a sound another game in this genre would have and this one may not. They belong in a
`forbidden[]` array with a ruling and an observable, in the domain named.

| # | forbidden sound | ruling | states it |
|---|---|---|---|
| 21 | A duplicate-find or consolation cue | `discovery` — no reachable duplicate exists | Stingers |
| 22 | A cue that varies by set, by Find, or by rarity | `rarity.forbidden`; `Beats.luau` cue header | Stingers |
| 23 | A cue naming or differing by which axis a set bonus granted | `meta/03` | Stingers |
| 24 | A completion, congratulation or ceremony at 24/24 | `endgame`; `tone/03` (*24 of 24 is the fourth `B2` and nothing further*) | Stingers |
| 25 | Any cue for another player's join, leave, reveal or completion | `social/03` `X11`; `tone/03` forbidden peaks | Mix + SFX |
| 26 | A crescendo, riser or intensity ramp as an area nears completion | `tone/03` — *"the load-bearing one. A ramp is tension"* | Music + Stingers |
| 27 | Any cue caused by time passing, idling, standing still, or elapsed session time | `tone/03` forbidden peaks; `setting/03` `R4` | Ambient + Music |
| 28 | A save-succeeded sound | `notices.forbidden.saveSucceededNotice` | UI Sound |
| 29 | A shutdown, restart or maintenance sound | `release.shutdown.playerFacing: "nothing"` | UI Sound |
| 30 | A product, offer or purchase-prompt cue | `products` `F19`; ruling R-4 | UI Sound |

### F · The mix layer

31. Volume buckets and defaults · ducking across the coincident `B2`+`B3` pair at 0.6 s · roll-off
    and 3D attenuation across a 122-stud plot pitch · a concurrency cap against 8 `B5` onsets per
    second per player × up to 16 players · the **20 MB** `Sounds` memory ceiling · `SoundGroup` /
    `SoundService` structure and who creates it · **and the muted-player invariant below.** All
    **Mix**.

### The muted-player invariant, derived and not invented

The brief's audience is *"8–14, mobile-heavy"* `[brief: binding]`, so a large share of sessions
run with no sound at all. **Every one of `response`'s five beats already carries a non-audio
channel** — `patchClear` `atPatch`+`readout`, `findReveal` `atPatch`, `setComplete` and
`areaComplete` `notice`, `upgradePurchased` `readout`. That is a fact about the merged contract,
not a design goal, and it means **no beat is audio-only today.**

Your job is not to solve muted play; it is **not to break this.** Mix carries it as a manifest
invariant (`audioOnlyBeats: 0` or equivalent) that a later sheet cannot widen without failing a
criterion. No domain may make audio the sole carrier of any state, count, tier, rank or
progress reading. Where you believe audio *should* carry something alone, that is a finding
routed to the owner of the other channel (Art — VFX for `atPatch`, UI/UX — HUD for `readout`,
UI/UX — Feedback for `notice`), never a decision you take.

### How a sheet says "this sound, not yet uploaded"

**A Roblox audio asset must exist on the platform before an id can be written into config, and
config is emitted from your sheets.** Build & Deploy hit the identical problem with `gamePassId`
and owns the sequencing rule. The form is theirs, not mine and not yours:

- `tech/deploy/02`: **an emitted value may never be an explicit null.** *"`bridge/emit-config.mjs:79`
  returns the literal `nil` for both `null` and `undefined`, and Luau drops a nil-valued field
  from a table constructor — so an explicit null and a never-emitted key are the same bytes at
  runtime."* Absence is a declared sentinel of the field's own type.
- The precedent for an unprovisioned platform id is **`0`**, chosen because *"`0` is a legal
  number no pass can have and one `> 0` test resolves the product to not-owned."*
  `release.provisioning.unprovisionedIdValue` is `0` and `buildMustRunAtEveryGate` is `true`.

So a cue row that has been designed and not yet uploaded carries the **sentinel plus a
descriptor**: an id field at the sentinel, a guard rule at every play site, and enough
machine-readable description (length, character, source, whether it is a Creator-Store asset or
an upload) that the upload is orderable work rather than a re-design. **The build must boot with
every audio id at the sentinel and produce silence, not an error.** That is the acceptance
criterion your key needs; it is the same shape `release` already uses.

Two things are **not** settled and are yours to establish rather than assume: which sentinel value
is right for a `SoundId` specifically (the field is a string in the engine, not a number — check
before you copy `0` across), and what the platform's rules are for using an audio asset you did
not upload. **Fetch and cite; do not recall.** Mix carries the ruling once for all six domains.

---

## Domain assignments

**One sheet per domain carries that domain's key whole.** `bridge/merge.mjs:132–141` allows
exactly one sheet to propose a key (`tech/deploy/01` established this); sibling sheets state
their contribution and route it into the carrier rather than proposing a second copy. Proposing
a key that already exists in `cid/_contract.md` is an error the merger rejects — check all 25
merged keys and the wave 4–5 proposals (`tierMix`, `solvency`, `axisBudget`, `pacing`, `budgets`,
`serverCost`, `release`, `notices`, `composition`, `navigation`, `offerSurface`, `viewport`,
`telemetry`, `funnels`, `engagement`, `lapClock`, `economyHealth`, `kpis`, `retentionReadout`)
before you write.

---

### 01 · Music Lead → `cid/audio/music/_lead.md`

**Key to propose:** `music` — the track list (which may be empty), and per track: when it plays,
how it loops, how it transitions, and what forbids a second one.

**Latitude: wide on the ruling, narrow on the outcome, and the ruling is the deliverable.**
This is the one domain in the category whose *existence* is genuinely undecided, and three
approved sources pull against each other:

- `OPEN.md §2`: *"Music sparse and low."* `[brief: soft]` ← `[I assumed]` — presupposes music.
- `theme/setting/03` `R5` `[cid: decided]`: *"Anything scheduled, intermittent, randomised over
  time, or varying with anything but a player's action is a change of state and fails."*
- `theme/tone/03` `[cid: decided]`: *"Between two `B1` events the game produces no emphasis
  other than `B5`"*, and *"No cue's intensity is a function of progress, streak, count, elapsed
  time, or depth."*

**Rule on whether music exists at all, and carry the ruling as data either way.** A `music` key
whose value is `{ "trackCount": 0, … }` with a reasoned `forbidden[]` is a complete, compliant,
useful output — it tells a builder that silence is a decision and closes the question so nobody
re-opens it at build time. A key with tracks in it must show how each survives `R5` and the flat
baseline, and must carry the `20 MB` shared `Sounds` budget consequence, because a looping track
is the largest single asset this game could hold.

Also binding on you specifically: `theme/tone/04` `D3` and `D4` (your palette exclusions); the
`[brief: binding]` device floor of a phone speaker; `endgame` — past area 8 the game runs forever
on `B5` and `B3`, so whatever you decide is what the game sounds like in its **steady state**, not
its opening; and `does_not_own`: short reward jingles are Stingers'.

**Genuinely open to you:** genre, instrumentation and register, if any; whether a bed and a
"track" are the same object in this game or two (coordinate with Ambient before you both claim
row 7); loop length and loop-point rules; and what a builder does when a track and the granted
ambient bed are both live.

---

### 02 · SFX Lead → `cid/audio/sfx/_lead.md`

**Key to propose:** `sfx` — every sound tied to an in-world action or event: its cue id, its
trigger, its variation rule, its asset row, and its zeros.

**Latitude: the widest in the category by volume, and it opens on a contract finding.** Rows 5,
10–14 and 22 are yours.

Binding on you specifically:

- **`response` gives `patchClear` no `audio` channel** (`channels: ["atPatch","readout"]`) while
  the same sheet's consequence section says *"audio is the one channel every beat shares"*, the
  brief says *"Clearing is a soft rustle-and-snap; each rarity tier a distinct pitched note"*,
  and `theme/tone/03` gives `B5` one channel at one intensity forever. **You may not invent the
  channel and you may not drop the sound.** The route is a `## Pushing back` section naming
  `gameplay/mechanics/05` and its ruling, with the containment stated as a manifest value — the
  mechanism the Gameplay verification `checks` already prescribe — plus a revision request
  against that sheet. This is G1 and it is the first thing you should resolve.
- `theme/tone/03` `B5`, verbatim: *"Exactly one intensity, every time, forever. No streak
  escalation, no combo, no rising pitch ladder, no crescendo near completion."* Note what it does
  and does not forbid: `tier` is **not** in its list of banned cue inputs (*progress, streak,
  count, elapsed time, depth*), so `OPEN.md §2`'s per-tier pitched note is not excluded by that
  criterion — but a *ladder* is. Reconcile the two explicitly rather than picking one.
- `response`: **8 sustained onsets per second, `onOverload: "overlap"`.** *"Overlap is the
  required degradation; dropping is not."* An 80 ms acknowledgment budget on the game's most
  repeated action. `performance/03` `N14`: no cue may be batched or delayed for frame budget.
- `theme/setting/05-inventory`'s Audio consequence: *"No water bed, no fire crackle, no
  mechanism, no cloth or rope, no creaking hinge in service."* Twelve classes of matter and
  nothing else; `A1` no fauna; `A7` no fire; `A11` nothing operable.
- `theme/tone/04` `D3` (no creak, no whisper, no breathing, no wind howl) and `D4`.
- `rarity.forbidden` and `Beats.luau`: a reveal cue may not vary by which set a Find belongs to.
- `does_not_own`: interface sounds (UI Sound), looping beds (Ambient), the reveal and the two
  completions (Stingers).

**Must verify, not assume:** whether the platform's default character sounds (footstep, jump,
landing) are present in an R15 character in a shipped place, and whether they can be replaced or
silenced. **Fetch and cite.** In a movement-only game this is the sound the player hears more
than any other and no sheet in either contract has ruled on it (G4).

**Genuinely open to you:** the variation rule (how many samples per cue, and what selects among
them, given `N10` forbids a second source of randomness anywhere near `layout`); whether the
tool, the bay build or a neighbour's clearing makes any sound at all; and the per-cue asset rows.

---

### 03 · Ambient Lead → `cid/audio/ambient/_lead.md`

**Key to propose:** `ambience` — the continuous layers: how many exist, what each is, whether it
is positional or global, and the rule that none of them varies.

**Latitude: narrow, sharply bounded, and one clean grant.** Rows 6, 7, 9 and 27 are yours.

Binding on you specifically:

- `theme/setting/01-the-ruin`, the grant, verbatim: *"you are granted the one permitted living
  sound in the game — off-screen ambience beyond the worked edge, suggesting life that is never
  seen. **Taking it is your call.** Nothing else here moves or makes noise on its own, and the
  water is dry, so a running-water bed is not available."*
- `theme/setting/03` `R5`: continuous passes, **intermittent fails**, and *"nothing randomised
  over time, which is the idiomatic way an ambient bed is built and is forbidden here."*
- `theme/setting/03` `R1`: one hour, one lighting state, and *"no cue may vary by hour."*
  `R4`: nothing in the place is a function of time. `05-inventory` `A14`: no modelled ambient
  motion inside the built edge; the canopy beyond it is the only exemption.
- The graph gives you *"weather and time-of-day audio"* and **this game has neither**: `R2` is
  *"No weather, ever, as a depicted event."* State that as an output, do not skip it.
- Per-area beds are excluded by `tone/03`'s no-variation-with-depth ruling and by the fact that
  areas are shuffled authored chunks rather than distinct places.
- `does_not_own`: one-shot event sounds (SFX).

**A trap worth naming before you write a manifest.** Two wave-1 acceptance criteria run
whole-word greps over **every `manifest` string value and every `artPrompt` under `cid/`**:
`theme/setting/01` criterion 4 (`bird|birds|animal|animals|beast|insect|…`) and
`theme/setting/03` criterion 4's `RW` list, which includes `breeze|gust|gale|weather|hums|thrums|
pulses|breathes|stir|shimmer|glow`. Those are precisely the words an ambience sheet reaches for.
`setting/01` states *"Non-visual ambient audio is exempt, and no manifest field holds it"* — which
was a statement of fact before your key existed and is now a question. **Establish which reading
holds and say so in the sheet**; if the exemption does not cover you, the route is a revision
request against those criteria, not a thesaurus.

**Genuinely open to you:** whether the grant is taken at all; whether the bed is one global
`Sound` or positional emitters; its relation to Music's row 8; density and layering inside "does
not vary"; and how a bed that may not be randomised avoids audible looping — which is a real
craft problem and is genuinely yours.

---

### 04 · UI Sound Lead → `cid/audio/ui/_lead.md`

**Key to propose:** `uiSound` — every sound the interface makes, and every interface moment that
is deliberately silent, each with its ruling.

**Latitude: narrow on inventory, and most of your output is stated zeros with citations.** Rows
4, 15–20, 28–30 are yours.

Binding on you specifically:

- `input`: four pressables, no fifth. `debounceSeconds: 0.35` — the fastest legal repeat rate of
  any interface sound in this game. `indexScreenSuspendsMovement: true`.
- **`input.pressable.rejectionCueOnFailedPrecondition: "none"`**, `buy.onPreconditionFail:
  "silentNoOp"`, `response.negativeBeats: 0`, `theme/tone/04` `D12`. Together: *an unaffordable
  press does nothing, shows nothing, plays nothing.* This is the single most likely place a
  builder adds a sound by reflex; make it a `forbidden[]` row with a grep.
- **`B4` is yours**, per `theme/tone/03`: *"a confirmation, not a celebration. Identical at every
  level and on every axis"*, `readout` + `audio`, **200 ms budget** — the tightest in the game.
  `Beats.luau`'s cue header: *"`effectAppliedBeforeAcknowledgment` is true… so this acknowledges
  and never applies."*
- `notices.forbidden.liftAnnouncement` bans *"any plate, **sound** or motion"* at a row lift, the
  `/24` denominator lift, or the index panel lift. `firstSession` `S6`/`S7`: *a lift is silent
  and still.*
- `notices.forbidden.noticeSound` bans a sound authored by `notices` *"because audio is the
  notice beats' second channel and Audio owns it."* That hands you nothing for `B2`/`B3` — those
  are Stingers' — but it does mean **the system notice in `ui-ux/feedback/03` has no owner**, and
  it is nearest to you (G-below).
- `products` `F19` and ruling R-4: no in-game surface, and therefore no cue, names, shows or
  prices a product. `release.shutdown.playerFacing: "nothing"`.
- `theme/tone/04` `D4`: no announcer, no cheer, no jackpot cascade, no slot ratchet.
- `does_not_own`: reward fanfares (Stingers).

**Rule, do not skip:** whether the one system notice — *"Saved Progress Did Not Load. New Progress
Is Not Kept."*, 5.0 s, fires once per session — has a sound. It is not a beat, `negativeBeats: 0`
does not reach it (it is not caused by a failure *in the game's rules*), and no sheet decides it.
It is the only moment in this game where something has genuinely gone wrong for the player.

**Genuinely open to you:** whether a press has a sound at all; whether press and release are one
cue or two; open and close for the index; whether a gamepad focus move makes a sound given
`gamepadSelectable: true`; and how a cue at a `0.35 s` debounce avoids machine-gunning.

---

### 05 · Stingers Lead → `cid/audio/stingers/_lead.md`

**Key to propose:** `stingers` — the short hits that mark the three payoff beats: per beat, its
cue, its audible length, its relation to the ranking, and what may never vary.

**Latitude: this is the loudest assignment in the category and the most constrained.** Rows 1–3
and 21–24, 26 are yours. Three of `response`'s five beats.

Binding on you specifically:

- `theme/tone/03`, the ranking, which you may overturn only by naming the `B` ids and citing the
  file: *"`B1` is the loudest single moment in the game in every channel"*; `B2` *"may therefore
  be **longer and wider** than `B1`, occupying more channels and resolving after it, but never
  sharper"*; `B3` is *"the only 'achievement' sound"*; and **the ceiling does not rise with
  depth**. It also ratifies `OPEN.md §2`'s *"a relic reveal owns the best sound in the game."*
- **The hard join from `ui-ux/feedback/01`:** *"the audible length of the `B2` cue must be at most
  3.0 s and the `B3` cue at most 2.5 s, or the plate leaves the screen while its sound is still
  playing. `theme/tone/03` lets `B2` be 'longer and wider than `B1`', so **this is a live
  collision, not a hypothetical**. If Audio needs more, the route is a revision request against
  this sheet raising the dwell inside its 5.0 s ceiling — one number, not a redesign."*
- `response`'s sequencing, inherited and not yours: coincident order **reveal → set completion →
  area completion**, `minOnsetGapSeconds` **0.6** (`[playtest unknown]`, range 0.35–0.9, the
  figure inside the range belongs to Balance & Tuning). *"A cue longer than its beat's dwell or
  separation is legal only if it can overlap the next one, and at 0.6 s separation that is the
  common case rather than the exception."* On 4.3% of laps all three fire on one clear
  (`core-loop/02`).
- `findReveal`'s dwell is **2.5 s** and its budget **300 ms**; `notice` is forbidden to it.
- **No variation, three ways:** `rarity.forbidden` and `Beats.luau` — a reveal cue may not vary by
  which set a Find belongs to; `meta/03` — nothing may signal which axis a completed set granted
  *"by making the cue louder, longer or different"*; `tone/03` — `B1` is *"not amplified for the
  first one ever, not amplified for the last one, not amplified by depth or rarity of the Find."*
- `endgame`: **`B1` and `B2` go extinct at 24/24** and `B3` runs forever after. Your `B3` cue is
  what the game sounds like in its terminal state, played more times than `B1` and `B2` combined.
  `tone/03`: *"24 of 24 is the fourth `B2` and nothing further"* — no completion ceremony.
- `theme/tone/04` `D4`: no fanfare vocabulary from the genre — no cheer, no jackpot, no air horn,
  no riser. `D3`: no minor-key sting.
- `does_not_own`: looping tracks (Music); `B4` (UI Sound); the `notice` plate itself (`notices`);
  the `atPatch` visual (Art — VFX).
- **The Audio verification `checks` name you directly:** *"every reward moment has exactly one
  stinger, not two."*

**Genuinely open to you:** what each of the three is made of; the audible-length figures inside
the two caps; whether `B2` and `B3` share material and how they are told apart when they land
0.6 s apart; and whether the `B2`/`B3` join needs the revision request `notices` already offered
you — decide it, do not inherit a squeeze.

---

### 06 · Mix Lead → `cid/audio/mix/_lead.md`

**Key to propose:** `mix` — volume buckets and defaults, ducking rules, attenuation and 3D
falloff, concurrency caps, the asset-count and memory budget, and the asset-provisioning form.

**Latitude: wide, and this domain holds three things no other lead can hold.**

Binding on you specifically:

- `budgets.memoryCeilingsByCategory.Sounds` = **20 MB** on a 3 GB floor device, inside a 420 MB
  client place-memory total, `[playtest unknown]` at ±60%. **This is the only figure in either
  contract that bounds the whole category's asset count**, and it is yours to spend across six
  domains and to state as a per-domain allocation a sheet can be failed against.
- `budgets.textureCeilings` precedent: `uploadedImageAssetsInWorldGeometry: 0`,
  `uploadedMeshAssetsInWorldGeometry: 0` — *"representation assembles every subject from
  primitives with no asset ids."* **Audio will be the first uploaded asset class in this build.**
  Say so, and say what that costs against `loadToFirstInputSeconds` (6.0 s target, 7.0 s ceiling
  on mobile, derived from the 10-second first-reveal promise).
- `response`: **8 `B5` onsets per second per player, `onOverload: "overlap"`** — at 16 players in
  one place, with `StreamingMinRadius` 160 and `plots.pitchStuds` 122, several neighbours are
  loaded and audible-in-principle at once. A concurrency cap and a roll-off curve are the whole
  answer, and *"Overlap is the required degradation; dropping is not"* constrains which caps are
  legal.
- The coincident case: `B2` and `B3` land **0.6 s apart** on 4.3% of laps, both on the `notice`
  channel and both with audio. The Audio verification `checks` require *"no two cues compete for
  the same moment without a ducking rule."*
- `performance/03` `N14`/`N15`: **no cue may be batched, deferred or delayed for frame budget**,
  and no build may interrupt one. A mix strategy that smooths a frame by dropping a cue fails a
  rule that exists to protect the payout path.
- `04-PRESENTATION.md` declined an options pass, and `input` is a closed five-verb list: **there
  is no in-game volume control.** Your defaults are the only mix the player will ever have.
- `00-CORE.md` audience `[brief: binding]`: phone speaker, cheap earbuds, an eight-year-old.
- `does_not_own`: the content of any individual sound.

**Three things only you can hold:**

1. **The muted-player invariant.** Carry `audioOnlyBeats: 0` (or its equivalent) as a manifest
   value a later sheet cannot widen without failing a criterion, sourced from `response`'s
   channel lists rather than asserted. See the derivation above.
2. **The unprovisioned-asset form**, once, for all six domains — the sentinel, the guard rule,
   and the acceptance criterion that a build with every audio id unprovisioned boots and is
   silent rather than erroring. `tech/deploy/02` fixes that absence may not be `null`; **you
   establish what a `SoundId` sentinel actually is** (the engine field is a string, so `0` may
   not transfer) and what the platform permits for assets you did not upload. Fetch and cite.
3. **The provisioning gate.** `release.provisioning.gates` has six ordered gates and **none of
   them mentions audio.** File a revision request against `cid/tech/deploy/01-the-release-contract.md`
   adding the gate; do not add it to `release` yourself, because that key has one owner.

**Genuinely open to you:** the bucket list and its defaults; `SoundGroup` structure and which
module creates it (note that `representation` today permits only `pressables` and `index-screen`
to create a `GuiObject`, and no sheet names a creator for a `Sound` — that is the same class of
finding `notices` hit, and it is yours to raise); the falloff curve and `RollOffMode`; the
concurrency cap; and the per-domain split of the 20 MB.

---

## Domains judged thin for this game, and why that is stated rather than silent

**None is absent. All six run and all six produce a key.** Verification should read a stated
zero as a deliberate conclusion, not a gap.

- **Music — the thinnest, and possibly zero, and that is the assignment.** `OPEN.md §2` gives it
  four words (*"Music sparse and low"*), tagged `[I assumed]`; `setting/03` `R5` forbids anything
  that varies over time without a player's action; `tone/03` forbids emphasis between `B1`
  events. Those three may be reconcilable and may not. **A `music` key with `trackCount: 0` and a
  reasoned `forbidden[]` is a complete output.** What is not acceptable is a lead quietly writing
  three tracks because a game usually has them, or quietly writing nothing because it is easier.
- **Ambient — one bed, offered rather than required.** `theme/setting/01` grants exactly one
  living sound and says *"Taking it is your call."* `setting/05` adds a soft air bed. Everything
  else in this world is forbidden from making noise, and there is no weather and one hour, so two
  of the four things the graph gives this domain (*weather audio*, *time-of-day audio*) do not
  exist here. Thin because five approved sheets spent the budget, not because nobody looked.
- **UI Sound — four controls and a long list of stated zeros.** Three of the five beats are
  already forbidden a notice; a rejection cue is forbidden outright; a lift is silent by rule.
  The domain's real output is a small permitted set and a large forbidden set with rulings
  attached, plus one genuine open question (the system notice).
- **SFX — thin or substantial depending entirely on G1.** If `patchClear` gains its audio channel,
  this is the highest-volume domain in the game. If it does not, SFX's output is the finding plus
  a handful of rulings on platform defaults and the tool. Either outcome is information; guessing
  is not.
- **Stingers and Mix are not thin.** Stingers holds three of the five beats and the loudest
  moment in the game. Mix holds the only budget, the muted-player invariant and the asset
  provisioning form, and it is the only domain that can see all six others at once.

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

| # | gap | who decides |
|---|---|---|
| **G1** | **`response` contradicts itself on `patchClear`'s audio channel.** Its manifest gives the beat `channels: ["atPatch","readout"]`; its own consequence section says *"audio is the one channel every beat shares"*; `OPEN.md §2` gives clearing a rustle-and-snap and a per-tier pitched note; `theme/tone/03` gives `B5` one channel at one intensity forever. The game's most repeated event has a sound in three sources and no channel in the merged one. | **SFX** (`## Pushing back` + revision request against `gameplay/mechanics/05`) |
| **G2** | **No provisioning gate exists for audio assets.** `release.provisioning.gates` runs publish → checklist → re-resolution → pass creation → id write → republish, and nothing in it uploads a sound. An audio id cannot be written into a sheet before the asset exists, which is the identical sequencing problem `gamePassId` has. | **Mix** (revision request against `tech/deploy/01`) |
| **G3** | **Whether music exists at all is undecided and three approved sources disagree.** `OPEN.md §2` `[I assumed]` presupposes it; `setting/03` `R5` and `tone/03`'s flat baseline both cut against it. Nobody has ever ruled. | **Music** |
| **G4** | **The platform's default character sounds are in the build and unowned.** `traversal` sets jump at the platform default and `release` `P2` fixes R15 avatars. In a movement-only game, footstep and landing sound is the most-heard audio the player will have, and no sheet in either contract mentions it. | **SFX** |
| **G5** | **No key owns `SoundService`, a `SoundGroup`, or the creation of a `Sound` instance.** `representation` names legal creators for every `GuiObject` in the game and none for a `Sound`; `Beats.luau` holds only a `ScreenGui`. This is the same class of finding `notices` raised for the notice plate — *"a notice cannot be built by any module in the current build order"* — and it will be true of every cue this category writes. | **Mix** to raise; `representation` (architect) to place |
| **G6** | **Wave-1 cross-references into Tone drifted and no longer resolve.** `theme/setting/03` and `/05` cite `tone/04-do-nots` as `X1`, `X2`, `X7`, `X10`, `X12` and `tone/03-beat-map` as `B3`, `B5`, `B6`; the shipped sheets use `D1`–`D15`, and `B1`–`B5` are **beat ids**, not ambient rules. The substance survives (`D2`, `D3`, `D5`, and `tone/03` criterion 3 all exist), the citations do not. Audio inherits several of these second-hand. **Cite the shipped ids, and flag the drift; do not silently repair it.** | all six, at citation time; **category verification** to route the repair |
| **G7** | **No key states an audibility radius for another player's sound.** `social.maxCoPresenceSeparationStuds` (128) is a *sight* rule, `plots.pitchStuds` is 122 and `StreamingMinRadius` is 160. Whether a neighbour's clearing is heard at all is undecided, and `tone/03` forbids another player's reveal or completion from peaking without saying whether it is audible. | **Mix** (roll-off) + **SFX** (whether the cue is 3D at all) |
| **G8** | **The brief's entire audio position is `[I assumed]` and was never interviewed.** `OPEN.md §1` records *"audio intent — I assumed — §2"* at **0 questions**, batched by design. Four of your six domains have no interviewed input of any kind. Every ruling this category makes is `[cid: decided]` against a silent brief, and each should be flagged to the developer with its live alternative and the cost of overruling it. | all six; **developer** to ratify |
| **G9** | **No audio accessibility position exists.** The brief's one hard accessibility constraint is visual, and `04-PRESENTATION.md` declined a sensitivity-options pass. There is no volume control, no mute, no caption and no settings verb. A player who cannot hear loses whatever audio carries alone — which today is nothing, and only stays nothing if somebody holds the invariant. | **Mix** (the invariant); **developer** if an options surface is wanted |
| **G10** | **Nothing in the pipeline has ever heard this game.** `cid/_playtest.md` is `n = 1`, area 1, with no audio in the build. Every figure this category writes is a prediction with no instrument behind it, and `tech/performance/01` already records that **no sheet in either contract owns taking a measurement**. Audio adds a listening test to that unowned list. | recorded for the final cross-category pass |
