# UI Sound — domain index

**Category:** Audio · **Wave:** 6 · Reads: `concept/spec/incremental-spinoff-v2/` (`HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md`) · `cid/audio/_category.md` · `cid/_contract.md` · `cid/_state.md`
· `cid/_playtest.md` · `cid/ui-ux/feedback/01`, `/02`, `/03` · `cid/ui-ux/hud/01` ·
`cid/ui-ux/navigation/01`, `/02`, `/03` · `cid/ui-ux/platform/01` · `cid/gameplay/mechanics/02`,
`/05` · `cid/gameplay/onboarding/04` · `cid/theme/tone/03`, `/04` · `game/src/client/Beats.luau`

**Contract key:** this domain owns **no merged key** and proposes exactly one: **`uiSound`** —
every sound the interface makes, every interface moment that is deliberately silent, and the
ruling behind each. It is not among the 25 merged keys in `cid/_contract.md` and no wave-4/5
proposal claims it; a repo-wide grep for `uiSound` returns only `cid/audio/_category.md` and
`cid/ui-ux/feedback/01`, which *disclaims* it (`notices.forbidden.noticeSound`: *"audio is the
notice beats' second channel and Audio owns it"*). One sheet proposes it whole; the other three
carry `amends` blocks, the form `notices` `02`/`03` and `navigation` `02`/`03` already use.

## What the brief gave me

- *"**8–14, mobile-heavy, short sessions.**"* `[brief: binding]` ← `[you chose: R1 Q4]`
  (`00-CORE.md`). The device floor is a phone speaker and a child, and a large share of sessions
  run muted. Nothing I write may be the sole carrier of any state.
- *"**Consequence: audio and visual feedback carry the entire load**"* `[brief: soft]` ←
  `[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`), with *"nobody downstream should invent tension
  to fill the gap"* relayed at `[brief: binding]` strength on the instruction (`HANDOFF.md`,
  `theme/tone/03`).
- *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."*
  `[brief: soft]` ← `[you accepted: step 6 Q3]` (`02-GAMEPLAY.md`), **already overruled once by
  ruling R-1**, contained to one input class, two verbs, four controls. I may not widen that
  overrule and may not re-litigate it: there are five verbs, four game-drawn pressables, and one
  panel close control, and that is the whole surface an interface sound can attach to.
- *"**Declined:** a full pass with colourblind mode, text scaling and sensitivity options"*
  `[brief: soft]` ← `[you accepted: R6 Q4]` (`04-PRESENTATION.md`). There is no options screen, no
  settings verb, no toggle and no slider anywhere in this game. The player's only volume control
  is the platform's own.
- *"Target: the **smallest game that still gives every creative area real work**"* and *"Success
  is shipped artifacts, not players"* `[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`). A
  cue that exists to give this domain something to do fails the first; prose with no data form
  fails the second.
- Priority 3 — *"real procedural generation · rebirth · offline accrual · codes · daily rewards ·
  leaderboards · trading · seasons and events"* (`03-META.md`), `[I assumed — the ordering]` on
  provenance and **hard as a gate**. Naming one in order to forbid it is compliant.
- *"Warm, organic, tactile… Music sparse and low."* `[brief: soft]` ← `[I assumed]`
  (`OPEN.md §2`) — the whole of the brief's audio direction, and **it names no interface sound at
  all.** It covers clearing, rarity tiers, the reveal, an area's completion and music. Every cue
  and every silence in this domain is therefore `[cid: decided]` against a brief that never
  considered the subject (category gap G8; `OPEN.md §1` records audio intent at **0 questions**).

## What the brief did not give me

Each gap is routed to the sheet that must decide it. None is filled here.

| # | gap | routed to |
|---|---|---|
| U1 | **Whether a cue that is not one of `response`'s five beats may exist at all.** `gameplay/onboarding/04` `S7`'s check column reads *"zero; every cue maps to one of the five named beats"* and its consequence line says *"The five beats own every cue in the game"* — but its **manifest scope is `liftSound` only** (`suppressionForbidden`). A press cue, an index open/close cue and a system-notice sound are each a sixth cue class. Precedent that a non-beat cue class is admissible exists in `notices.classes.system`. Neither reading has ever been ruled. | `01`, consumed by `02` and `04`; a permissive ruling needs a `## Pushing back` naming `gameplay/onboarding/04` `S7` |
| U2 | **No latency budget exists for anything that is not a beat.** `response` sets five budgets and defines no non-beat cause. A press cue, an open/close cue and a notice sound have no acknowledgment budget in either contract. | `01`, `02`, `04` — state a figure `[playtest unknown]` with a test range inside `uiSound` and route the requirement to `response`; **do not add a sixth beat** |
| U3 | **`B4` may fire twice or not at all.** `cid/_state.md` build note 1: `server-main` fires `UpgradeApplied`, not `progression`, and *"unresolved it is either a double-fire (the `upgradePurchased` cue plays twice) or silence"*. | `01` — carry `onsetsPerPurchase: 1` as an invariant a later sheet cannot widen |
| U4 | **No key owns the creation of a `Sound`, a `SoundGroup` or `SoundService` configuration.** `representation` names legal creators for every `GuiObject` and none for a `Sound`; `Beats.luau` holds only a `ScreenGui`. This is the same class of finding `notices` raised for the notice plate. | stated as a consequence in `01`; **`mix` raises it and `representation` (architect) places it** — I name the play site per cue row and no creator |
| U5 | **The five-cue seam has no receiver for anything that is not a beat.** `Beats.luau`'s `CUES` table is keyed by beat id; a press cue has no channel, no packet and no entry there. Where a non-beat cue's play site lives is unstated. | `01` and `02` — name the play site as a data field (`Pressables`, `IndexScreen`/`navigation`, `Beats.cueUpgradePurchased`), not a module design |
| U6 | **Nothing states whether the readout change that carries a purchase for a muted player is legible as an acknowledgment.** `composition` gives `B4` three simultaneous value changes in one node (`Lv N`→`Lv N+1`, `{cost} Ready`/`Short`/`Max` re-derived, currency falling); no key says whether an eight-year-old on a phone reads that as *"it worked"* inside 200 ms. | **not mine.** A finding for persistent-readout work (`composition`, ui-ux/hud). `01` states the dependency and decides none of it |
| U7 | **The panel close control is a fifth activatable object and the category's surface list omits it.** `navigation/03` puts a drawn close glyph inside `IndexSurface`, outside `input.gameDrawnPressables: 4`. | `02` — it drives the `closeIndex` edge and is enumerated there |
| U8 | **Whether the platform's own interface sounds are the game's business.** Roblox CoreScripts own the platform menu; `navigation/03` rules the game does nothing on `MenuOpened`. No sheet says whether the game adds to or suppresses any platform UI sound. | `03` — one stated zero with its ruling |
| U9 | **The `SoundId` sentinel and the platform's rules for assets not uploaded by this creator.** `release.provisioning.unprovisionedIdValue` is `0`, a number; `Sound.SoundId` is a **ContentId**, a string, so `0` does not transfer by type. | **not mine.** `mix` owns the unprovisioned-asset form once for all six domains (category gap G2). Every asset row in `uiSound` writes its id **only** through that form and states the play-site guard |

## Why 4 sheets

One sheet per contract key I own gives one, and `01` is it: it proposes `uiSound` whole. Three
more exist because three genuinely separate decisions constrain that key and cannot be folded
without one of them disappearing into a heading. The purchase press is a **server-decided beat
with a 200 ms budget colliding with a ban on any response to a failed press**; the index is a
**client-adjudicated mode change with no beat, no budget and a close path that also fires on a
respawn**; the silences are ~14 rulings that must each carry a source and a grep-checkable
observable, which is the bulk of this domain's actual output and the thing `CLAUDE.md` means by
*an empty set with a stated reason is a build instruction*; and the system notice is the one
moment in this game where something has genuinely gone wrong for the player, is not a beat, and
has never been ruled on by anyone. Splitting `01` further — press versus release, per pressable —
would be splitting one decision described four times. Merging `03` into `01` would put the
domain's only substantial output inside a sheet whose subject is a single cue.

| # | sheet | must decide |
|---|---|---|
| 01 | `press-acknowledgment` | Whether activating any of the five activatable controls produces a sound and, if so, on which edge — `Activated` is the only event that fires on all three device classes (*"a left click press-and-release … on desktop, touch release … on mobile, or A/cross … on console"*, `[research: creator-docs GuiButton.yaml]`), so press and release cannot be two cues without a mouse-only binding — and how any such cue relates to `B4` `upgradePurchased`, whose 200 ms acknowledgment is server-decided (`response`), such that one purchase yields exactly one onset (`cid/_state.md` build note 1), an unaffordable or maxed press emits **nothing on any channel** (`input` criterion 4, `rejectionCueOnFailedPrecondition: "none"`, `buy.onPreconditionFail: "silentNoOp"`), a cue repeating at the `debounceSeconds` 0.35 ceiling neither machine-guns nor is dropped, and audio is never the sole carrier (`composition`'s `Lv N`/`Ready`/`Short`/`Max`/currency changes are `B4`'s non-audio channel); carry the whole `uiSound` key here as `status: "proposed"` — per row: id, cause, play site, audible length, budget with a `[playtest unknown]` test range, and an asset row written through `mix`'s unprovisioned form with a play-site guard, since an unloadable id produces a console error rather than silence `[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]` and the build must boot silent and error-free with every id unprovisioned — and if the ruling is that no press cue exists, carry that as an empty permitted set with the same rigour rather than as an omission. |
| 02 | `index-open-and-close` | Whether the `openIndex` and `closeIndex` edges produce a sound, whether they are one cue or two, and whether the close cue fires on every close path or only on some — the paths are the panel's own drawn close glyph and `Pressable_INDEX` toggling on all three device classes, plus best-effort gamepad `B`, plus a **respawn**, which `navigation/02` makes close the panel with no player activation (`navigation/03`, `navigation.respawn.outcome: "close"`); rule against the facts that `openIndex` is client-adjudicated, fires no remote and has **no beat and no budget** in `response`, that `indexScreenSuspendsMovement: true` makes this the only mode change in the game, that a cue here is a non-beat cue and inherits U1's ruling from sheet `01` without re-deciding it, and that a close glyph carries no string (`vocabulary` has nothing to bind); amend `uiSound` rather than proposing a second key, and state the zero with its grounds if the ruling is silence. |
| 03 | `stated-silences` | State every interface moment that makes no sound as data — one row each, with the sheet that forbids it and an observable that is a grep or a count against `game/src/` — covering at minimum: a failed, unaffordable or maxed press (`input.rejectionCueOnFailedPrecondition: "none"`, `response.negativeBeats: 0`, `theme/tone/04` `D12`); an upgrade-row lift, the `/24` denominator lift and the index-panel lift (`firstSession` `S6`/`S7`, `notices.forbidden.liftAnnouncement`, which bans *"any plate, **sound** or motion"*); a save-succeeded sound (`notices.forbidden.saveSucceededNotice`); a shutdown, restart or maintenance sound (`release.shutdown.playerFacing: "nothing"`); any cue naming, pricing or prompting a product (`products` `F19`, ruling R-4); a notice-specific sound authored outside Audio (`notices.forbidden.noticeSound` — cite it, do not re-rule it); a **hover or mouse-over cue on any device class**, which I rule a stated zero rather than a sheet, since Roblox's own mobile input surface documents gestures, motion, haptics and on-screen buttons and **no pointer or hover state at all** `[research: creator-docs content/en-us/input/mobile.md]` so ~70% of the audience cannot trigger one, `composition` defines no hover state for any element, and a desktop-only cue on the game's only currency sink breaks `mechanics/03`'s parity floor; a **gamepad focus-move cue** (`SelectionGained`/`SelectionLost` across a set that is 4 members closed and 5 open, `navigation/03`) on the same parity ground; **toggle and slider feedback**, which is zero because no toggle and no slider exists — `input` is a closed five-verb list, `navigation.notNodes` includes `settings`, and `04-PRESENTATION.md` declined the options pass, so the in-game volume control this domain would otherwise sound does not exist (route the consequence to `mix`, do not decide it); any platform UI sound the game might add or suppress (U8); and one row per priority-3 reflex — no daily-login chime, code-redeem sound, leaderboard or rank cue, trade or gift sound, seasonal or event sting, returning-player greeting, and **no reserved `SoundGroup`, empty cue slot or "future" field held open for any of them**. Amend `uiSound`; every row carries a ruling, and no row is a restatement of a `notices` row without naming it as inherited. |
| 04 | `system-notice-sound` | Rule whether the one system notice — `Saved Progress Did Not Load. New Progress Is Not Kept.`, 5.0 s, once per session, `notices.members[saveNotLoaded]` — makes a sound, and carry the ruling either way as an `amends` on `uiSound`; it is **not a beat** (`notices.systemNoticesAreBeats: false`, never entered into `Beats.connect`'s queue), so `response.negativeBeats: 0` does not reach it — that field governs failures *in the game's rules* and this is an infrastructure failure — and no sheet in either contract decides it; weigh that it is the only moment in this game where something has genuinely gone wrong for the player and the plate is the sole carrier for a player who is not looking at that corner, against `theme/tone/04` `D3` (no minor-key sting, no dissonant or detuned interval) and `D6`'s bar on anything reading as an alert state, against the fact that a large share of this audience plays muted so a sound may never be the carrier, and against U1; if the ruling is yes, the cue's character, audible length and play site (`Persistence`'s read-failure path reaching the client as one live boolean, `notices/03`) are values in `uiSound`; if no, it is a `forbidden[]` row with its reason, not a silence. |

## Verification note

**Sheet `01` is the one most likely to be contradicted**, and by two parties. The first is
whoever holds `firstSession`: if `01` permits a press cue, it stands against
`gameplay/onboarding/04` `S7`'s stated rationale that *"every cue maps to one of the five named
beats"*, and the only legitimate route is a `## Pushing back` naming that sheet and its ruling —
the mechanism the Gameplay verification `checks` already prescribe. The second is **Mix**: a
press cue and `B4`'s cue land inside 200 ms on the same control at up to 2.9 activations a
second, which is a ducking and concurrency question `mix` owns; `01` must state the requirement
against `mix` and set no bucket, no volume and no cap.

Second-most likely: sheet `03`'s rejection row. `notices.forbidden` already holds a `rejectionCue`
row with its own observable, and a verifier reading two keys forbidding one thing may call it a
duplicate claim. `03`'s rows must be scoped to **sounds**, cite `notices` as inherited, and never
re-rule the plate.

## Research owed

My node carries no `must_verify`. I fetched what these four sheets need to justify themselves;
everything below lands in `cid/_research/pack.md` and is the only external evidence the writer has.

**Fetched and citable:**

- `GuiButton.Activated` — *"Fires when a left click press-and-release is detected on desktop,
  touch release is detected on mobile, or **A**/cross is activated in UI navigation mode on
  console."* `MouseButton1Down`/`Up` are mouse-only.
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiButton.yaml]`
  → settles press-versus-release across all three device classes in one fact.
- Roblox mobile input documents touch gestures (`TouchSwipe`, `TouchPinch`), haptics,
  accelerometer, gyroscope and on-screen buttons, and **no hover, mouse-over or pointer state**.
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`
  → settles the hover ruling for ~70% of the audience.
- `GuiObject.MouseEnter`/`MouseLeave` are described purely as mouse events; `Selectable` is *"whether
  the GuiObject can be selected when navigating GUIs using a gamepad"*; `SelectionGained`/`Lost`
  fire when *"the Gamepad selector starts/stops focusing on"* an object.
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`
- `Sound.SoundId` is type **ContentId** — *"Content ID of the sound file to associate with the
  Sound"* — and `Sound.IsLoaded` is *"true when the Sound has loaded from Roblox servers and is
  ready to play. You can use this property and the `Loaded` event to verify a sound has loaded
  before playing it."*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]`
  → the `0` sentinel `release` uses for a `gamePassId` cannot transfer by type, and a 200 ms
  budget presumes a resident asset.
- `ContentProvider:PreloadAsync` accepts `Sound` instances and yields.
  `[research: https://create.roblox.com/docs/reference/engine/classes/ContentProvider]`
- `SoundService:PlayLocalSound` — *"Plays a copy of a Sound locally. The Sound will only be heard
  by the client calling this method, regardless of where it's parented to."*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundService.yaml]`
  → an interface cue needs no world position and no attenuation; the roll-off consequence is
  `mix`'s.
- Audio assets: imported audio must be *"less than 20 MB in size and 7 minutes in duration"*; the
  asset privacy system *"automatically ensures that the IDs of your imported audio can't be
  accessed by users without proper permissions"*; the Creator Store carries free-to-use audio.
  `[research: https://create.roblox.com/docs/sound/assets]`
  → provisioning input for `mix`; my rows may not name an id the creator does not own.
- A sound whose id will not load errors in the console rather than failing silently — *"Currently
  if an audio is played but it won't load (such as the sound id being zero), Roblox will
  CONSTANTLY error it in the console"*; staff acknowledged and the **spam** was fixed in 2023, not
  the error itself.
  `[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`
  → the sentinel guard must sit at the play site, not at the id.

**Owed, and named with the fetch that would settle each:**

- `[unverified]` Whether `Sound:Play()` on an empty or sentinel `SoundId` errors *today*. The
  2023 thread is about spam volume, not about whether one error is produced. **Settled by** a
  Studio run: a `Sound` with `SoundId = ""` parented under the HUD, `Play()` called, Output read.
  Bears on `01`'s acceptance criterion that an unprovisioned build boots silent **and** clean.
- `[unverified]` First-play latency for a preloaded versus non-preloaded `Sound` on the 3 GB floor
  device. No published figure exists. **Settled by** a device or Studio measurement against
  `response`'s 200 ms `upgradePurchased` budget. Until then every latency figure in `uiSound` is
  `[playtest unknown]` with a test range.
- `[unverified]` Whether Roblox CoreScripts play any sound on platform-menu open or close on
  mobile. **Settled by** a device check or the current `PlayerModule`/CoreGui source. Bears on
  U8's one row in `03`.
- `cid/_playtest.md` is `n = 1`, area 1, and **records nothing about audio because none exists**.
  Every figure this domain writes is a prediction; the listening test joins the unowned
  measurement list `tech/performance/01` already records.
