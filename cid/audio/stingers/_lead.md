# Stingers — domain index

**Category:** Audio · **Wave:** 6 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/audio/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`,
`cid/_digest.md` (rows for `core-loop/02`, `core-loop/03`, `systems/03`, `systems/05`,
`meta/03`, `deploy/02`, `performance/01`); `cid/gameplay/mechanics/05-response-contract.md`;
`cid/gameplay/meta/07-after-the-last-find.md`; `cid/ui-ux/feedback/01-the-notice-channel.md`
and `/02-coincidence-and-stacking.md`; `cid/theme/tone/03-beat-map.md` and `/04-do-nots.md`;
`game/src/client/Beats.luau`; `game/src/shared/GameConfig.luau`; `bridge/schema.mjs`,
`bridge/merge.mjs`, `bridge/emit-config.mjs`, `bridge/verify-sheets.mjs`.

## What the brief gave me

Three sentences, one of which is about a beat that did not exist when it was written.

- *"**a relic reveal owns the best sound in the game.** An area's completion gets a short
  resolving chord — the only 'achievement' sound."* `OPEN.md §2` — `[brief: soft]` ←
  `[I assumed]`, and the reveal half was already ratified by `theme/tone/03` `[cid: decided]`.
- *"Reveals and completions are the two emotional peaks."* `OPEN.md §2` — `[brief: soft]`,
  and **already overruled** by `theme/tone/03`'s `## Pushing back`: completions are two beats,
  not one. I inherit the overrule and do not reopen it.
- *"audio and visual feedback carry the entire load"* `02-GAMEPLAY.md` — `[brief: soft]` ←
  `[you accepted: step 6 Q2]`. With `negativeBeats: 0` and no tension, my three cues are half
  of everything this game tells a player about their own progress.
- *"nobody downstream should invent tension to fill the gap"* — `[brief: binding]` on the
  instruction, per `HANDOFF.md` and `theme/tone/03`. No riser, no ramp, no cue whose intensity
  is a function of progress.
- *"8–14, mobile-heavy, short sessions"* `00-CORE.md` — `[brief: binding]` ←
  `[you chose: R1 Q4]`. Phone speaker, cheap earbuds, an eight-year-old, and a large share of
  sessions with no sound at all.
- *"the **smallest game that still gives every creative area real work**"* and *"Success is
  shipped artifacts, not players"* `00-CORE.md` — `[brief: binding]` ← `[you chose: R1 Q3]`.
  Three cues exist because three beats carry an `audio` channel, not because a domain wanted
  work.
- `03-META.md` priority 3 — `[brief: soft]` on provenance, **hard as a gate**: rebirth,
  daily rewards, leaderboards, codes, trading, seasons and events. Four of the five subjects
  in my graph node land on or beside this list.

Settled elsewhere and inherited whole, not re-decided: the `B1 > B2 > B3` ranking with no ties
and the flat-with-depth ceiling (`theme/tone/03`); the five beats' causes, sides, latency
budgets and channel lists (`response`); the coincident order and `minOnsetGapSeconds` 0.6
(`core-loop/02`, figure inside 0.35–0.9 s owned by Balance); the 3.0 s and 2.5 s audible caps
and `forbidden.noticeSound` (`notices`); `D3` and `D4` as the palette exclusions
(`theme/tone/04`); `rarity` (a Find has no grade), `discovery` (`repeat.possible: false`),
`meta/03` (no cue may signal which axis a set granted); the 20 MB shared `Sounds` ceiling
(`budgets`); the no-explicit-null rule (`tech/deploy/02`).

## What the brief did not give me

Each gap routed to the item that will decide it. None is filled here.

| # | gap | routed to |
|---|---|---|
| S1 | **The brief says nothing about `B2` at all.** Set completion is the largest payoff in the game (`core-loop/02` weight 50) and `OPEN.md §2` predates it — it names only a reveal and an area completion. The one cue with no starting position is the one with the most weight. | `01` |
| S2 | **No audible length exists anywhere in either contract.** `notices` gives two ceilings, `response` gives onset budgets to *first* audible acknowledgment. How long a stinger lasts has never been stated by anybody. | `01` |
| S3 | **Whether a stinger is positional or global is unowned.** `response` gives `findReveal` the channels `atPatch` and `audio`; `notices` rules `atPatch` a world channel that "names a position, not a layer" and says nothing about whether the audio half is world-anchored too. Mix owns the falloff curve; nobody owns whether a curve applies. | `01`, consequence stated for Mix and for `social`/G7 |
| S4 | **Nothing states whether this game's cues are diegetic.** `theme/setting/05-inventory` closes what may make a sound *in the world*; a resolving chord is not in the world. `setting/03` `R5` passes a player-caused cue explicitly, so the permission is derivable — but it has never been written down and an ambience or SFX reader would reach the opposite conclusion from the same sheet. | `01` |
| S5 | **The rank carrier is unassigned.** `notices` states plainly that dwell is a weak carrier of `B2 > B3` and that "the strong carrier is audio", then hands the question over. Loudness cannot carry it alone at a phone-speaker ceiling. Which dimension expresses the ranking is open. | `01` |
| S6 | **`endgame` and wave 3's own correction disagree on the post-terminal lap interval** — `endgame` and `notices` both say ~157 s; `cid/_state.md`'s wave-3 note 2 says laps are 93.5–93.0 s after both value passes were withdrawn. It changes no cue and it changes the sentence a sheet writes about how often the last cue is heard. Recorded, not requested. | `02`, stated as a note; the figure is Balance's |
| S7 | **No key owns the creation of a `Sound` instance and `game/src` contains zero of them.** `representation` names legal creators for every `GuiObject` and none for a `Sound`; `Beats.luau` holds a `ScreenGui` and nothing else. Every cue this domain writes is unbuildable in the current build order. Same class of finding `notices` raised for the notice plate. | stated as a consequence; **Mix** to raise it once for all six domains, `representation` (architect) to place it |
| S8 | **The `SoundId` sentinel is Mix's ruling and my writer cannot read it.** `Sound.SoundId` is a `ContentId` string `[research: create.roblox.com/docs/reference/engine/classes/Sound]`, so `release.provisioning.unprovisionedIdValue: 0` does not transfer, and `tech/deploy/02` forbids a null. My sheets must state the value they use and defer, so a mismatch is a one-field revision and not a redesign. | `01`, with the deferral stated in the value |
| S9 | **Nothing in the pipeline has ever heard this game.** `cid/_playtest.md` is `n = 1`, area 1, no audio in the build. Every figure my writer produces is `[playtest unknown]` with a range and no instrument behind it, and `tech/performance/01` already records that no sheet owns taking a measurement. | recorded for the final cross-category pass |

## My node lists five subjects and two are real

Recorded as data rather than skipped, per `CLAUDE.md`. Sheet `03` carries each as a row with a
ruling and an observable.

| subject in `owns` | verdict | why |
|---|---|---|
| reward and unlock jingles | **real, in part** | The reward half is `B1`, `B2` and `B3`. **There is no unlock:** `meta/04` makes the next area enterable with no threshold and no gate, `notices.forbidden.areaEnterNotice` bans a cue on entering an area or a depth, and `theme/tone/03` forbids entering or leaving an area from peaking. Zero unlock cues. |
| level-up and rebirth fanfares | **absent, twice over** | `rebirth` is `03-META.md` priority 3 **and** in `vocabulary.bannedWords`. There is no level-up: upgrade levels rise, and that beat is `B4`, routed to **UI Sound** by `theme/tone/03` (*"a confirmation, not a celebration"*) and by the category's own routing note. I do not author it. |
| rare-drop hits | **absent** | Nothing in this game is a rare drop. `rarity`: one graded ladder, read from `patch.tierIndex`; *"A Find carries no rarity field of its own"*. `discovery`: placement is seed-derived, `repeat.possible` is false, there is no roll and no draw rate. `systems/03` states the consequence for me directly — *"Reveal-cue work gets one cue, not four."* |
| server announcements | **absent** | `social/03` `X11` forbids any sound naming, counting or announcing another player's join, leave or progress; `release.shutdown.playerFacing: "nothing"`; priority 3 removes seasons and events; `products` `F19` and ruling R-4 remove every product surface. There is no announcement class left. |
| failure stings | **absent** | `response.negativeBeats: 0` and `R10`; `input.rejectionCueOnFailedPrecondition: "none"` with `buy.onPreconditionFail: "silentNoOp"`; `theme/tone/04` `D12`; *"There is no failure state"* `02-GAMEPLAY.md`. `Beats.luau`'s own cue-seam header restates it: *"It may not play a rejection or failure cue either."* |

## The extinct beats — my ruling, so the writer implements it rather than re-deciding it

**`endgame` is correct, nothing replaces the two extinct cues, and no `## Pushing back` is
owed.** After 24/24 the reveal and the set completion are permanently unreachable and the
area-completion cue is the only stinger the game has left, without limit. That is the design
working, not a hole in it:

- A terminal or replacement cue **is** the completion ceremony three approved sheets already
  ban — `theme/tone/03` (*"24 of 24 is the fourth `B2` and nothing further"*),
  `notices.forbidden.endScreen`, and `endgame` itself (*"no end screen, no congratulation and
  no completion percentage to build"*). Inventing one to fill the silence is the exact move
  `HANDOFF.md` forbids.
- Every instrument that would restore a peak is cut or priority 3. There is nothing left to
  celebrate that is not a second collection, and `theme/fantasy/02` forbids that by name.
- `[playtest unknown]` whether any player reaches the state at all: the one shipping
  comparison `endgame` cites puts a single area's collection completion at 0.4%.

**What the ruling costs, and it is a real cost:** the cue a player hears most is the cue
`theme/tone/03` ranks third. `B3` is heard 8 times before the terminal state and an unbounded
number of times after it, so **it is the only one of my three that must be designed against
fatigue rather than against impact.** That is a constraint on its construction, not a licence
to raise its rank, and it is sheet `02`'s whole subject. What *would* have required a
`## Pushing back` naming `gameplay/meta/07-after-the-last-find`: concluding that anything
replaces the extinct pair, or that `B3` changes after 24/24. Neither is my ruling.

## How a stinger and a notice interact, since `notices` forbids a notice sound

**One onset, two channels, one owner each — not two events, and not two sounds.**
`notices.forbidden.noticeSound` bans *"a sound authored by this key"* on the stated ground
that *"audio is the notice beats' second channel and **Audio owns it**"*. So `setComplete` and
`areaComplete` each produce exactly one plate (theirs) and exactly one stinger (mine), both
begun by the same cue body in `Beats.luau` at the same onset. Three consequences my sheets
carry as data: **(a)** the stinger is not an accompaniment to the plate and does not wait for
it; **(b)** its audible length is bounded by the plate's dwell — 3.0 s for `B2`, 2.5 s for
`B3` — or the plate leaves while the sound is still playing; **(c)** a muted player loses the
stinger and keeps the plate, and a player who is not reading the screen loses the plate and
keeps the stinger, which is why neither channel may be the sole carrier. `findReveal` has no
plate at all (`notice` is in its `forbiddenChannels`), so its only companion channel is
`atPatch`, which is VFX's. That satisfies the category check *"every reward moment has exactly
one stinger, not two"* by construction and my acceptance criteria must make it countable.

## Why 3 sheets

I own one contract key and `stingers` does not exist in the 25 — so one sheet carries it whole,
and the merger permits no second. The two others are each a decision that constrains that key
rather than a second copy of its value, and both carry an `amends` block, which
`bridge/merge.mjs:104` recognises as data and never merges. Sheet `01` decides what the game's
three payoff moments sound like. Sheet `02` decides what the game sounds like once two of them
stop forever, which is a state `01`'s arithmetic cannot reach and which governs the majority of
playtime for anyone who finishes — `endgame` routes it here by name. Sheet `03` decides which
moments get nothing, which is four-fifths of my node's `owns` list and is a ruling about this
domain's own boundary rather than about a cue. Each of the three can be contradicted
independently and by different people, which is the test I applied. I did **not** split the
reveal from the two completions: they are one cue set under one ranking and one coincidence
rule, and splitting them would put two sheets in the same key's rows.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-three-payoff-cues` | Name and fully specify the three stingers — `findReveal` (B1, 300 ms budget, 2.5 s dwell, notice forbidden, up to 3 per lap and 24 in the game), `setComplete` (B2, 400 ms budget, 4 firings ever) and `areaComplete` (B3, 400 ms budget, 8 firings before the terminal state) — giving each an id, a description of what it is made of that a sound designer could act on without adding a fourth cue, an audible length in seconds that is `[playtest unknown]` with a test range and sits inside `notices`' caps (B2 at most 3.0 s, B3 at most 2.5 s) with B1 short enough that B2 can be longer than it, the dimension that carries `theme/tone/03`'s `B1 > B2 > B3` ranking given that loudness cannot carry it at a phone-speaker ceiling (S5), how B2 and B3 stay distinguishable when they land 0.6 s apart and overlap for 2.4 s on 4.3% of laps, whether each cue is positional or global with the engine realisation stated (`SoundService` or `Workspace` for global, a `BasePart` or `Attachment` child for positional) and the falloff curve left to Mix (S3), a one-line ruling that a non-diegetic musical cue is permitted because it is caused by a player's action and so passes `setting/03` `R5` (S4), an asset row per cue carrying an unprovisioned `SoundId` at a stated string sentinel with a guard at every play site so a build with all three unprovisioned boots silent rather than erroring and with Mix's ruling named as superseding (S8), the non-audio channel each cue shares its beat with so no beat becomes audio-only, and the invariant that no cue varies by set, by Find, by depth, by tier, by area ordinal, by how many have fired, or by being the first or the last — carry it as a `manifest` block with `"provides": "stingers", "status": "proposed"`, and end with criteria that count the cues, check both caps and check the no-variation rule mechanically. |
| 02 | `the-last-cue-standing` | State as data that the permanent extinction of B1 and B2 at 24 of 24 is correct and that **nothing replaces them** — the ruling is made in the domain index and you implement it, you do not reopen it — then decide the thing that follows from it and is genuinely open: what `areaComplete` must be built from in order to be the only stinger a post-terminal player ever hears, at roughly one firing per bay without limit, when the same cue was sized for 8 firings before that; say in the value which construction choices in sheet `01` are made *for* the terminal state rather than for the first eight (length, tail, whether the cue resolves or leaves a question open, whether it is one sample or one sample heard identically forever), state that it does not change at the boundary and that no cue is added, removed, lengthened, shortened or re-ranked at 24 of 24, name the muted-play consequence (the `Area Complete` plate is the whole of the terminal payoff for a silent player and the cue is the whole of it for a player not reading the screen), record `endgame`'s ~157 s interval as the approved figure while noting `cid/_state.md`'s 93 s wave-3 correction as an unresolved divergence owned by Balance and not by you (S6), and carry it as an `amends` block against `stingers` — never a second `provides`. |
| 03 | `subjects-with-no-cue` | Close, as data with a ruling and a grep-runnable observable on every row, the four subjects in this domain's graph node that do not exist in this game — level-up and prestige fanfares (the reset system is `03-META.md` priority 3 and its name is in `vocabulary.bannedWords`; the upgrade beat is B4 and belongs to UI Sound), rare-drop hits (`rarity` has one ladder read from `patch.tierIndex` and a Find carries no grade, `discovery.repeat.possible` is false and there is no roll), server announcements (`social/03` `X11`, `release.shutdown.playerFacing`, priority 3, `products` `F19` and ruling R-4), and failure stings (`response.negativeBeats` 0 and `R10`, `input.rejectionCueOnFailedPrecondition` "none", `theme/tone/04` `D12`) — plus the closed list of stingers this genre reaches for that this game may not have: a duplicate or consolation cue, any cue varying by set or Find or rarity or axis granted, any completion or congratulation or ceremony at 24 of 24, any crescendo riser swell or intensity ramp as an area nears completion, any cue for another player's reveal completion join or leave, any unlock or area-entry or depth-entry cue, any amplification of the first Find ever or the last, any daily returning-player streak seasonal or event cue, and any reserved cue slot bus or empty `SoundGroup` held open for one; follow `endgame.forbidden`'s proven form of plain names in a list so the merge is unaffected, state in one line that this domain authors zero player-facing strings and therefore needs no `coinage` block and no `vocabulary` adjudication, and carry it as an `amends` block against `stingers`. |

## Contract key

**`stingers` — proposed, and not one of the 25 in `cid/_contract.md`.** It holds: one row per
cue with its beat id, what it is made of, its audible length with a test range, whether it is
positional or global, its asset row and unprovisioned sentinel, and its companion non-audio
channel; the ranking expression and the coincidence rule; the terminal-state fields; and the
closed `absentSubjects[]` and `forbidden[]` lists. Verified against `bridge/schema.mjs` — the
key is absent, so a `"status": "proposed"` block is required or `merge.mjs:117` rejects it.
Sheets `02` and `03` carry `amends` blocks; `merge.mjs:104` recognises one in either fence and
never merges it, so exactly one sheet claims the key.

*I read `cid/_contract.md`, which `npm run bridge -- --contract` generates, rather than running
the command — this agent has no shell.* The derived file is the same data and is current at
25 keys.

## Verification note

**Sheet `01`'s audible lengths are the most likely to be contradicted, and Balance & Tuning is
the most likely contradictor.** Every figure in it is derived against `minOnsetGapSeconds` 0.6,
a `[playtest unknown]` value Balance may set anywhere in 0.35–0.9 s; at 0.35 the three
coincident onsets compress into 0.7 s and three cues are live at once for longer, and at 0.9
the sequence stretches past `B2`'s own 3.0 s cap into a different overlap. The ruling does not
move at either end but the numbers beside it do. The second contradictor is **Mix**, on two
fields it owns and my writer cannot read: the `SoundId` sentinel (S8) and the per-domain share
of the 20 MB `Sounds` ceiling — three cues is the smallest asset count in the category and it
is still three uploads against a budget nobody has split yet. The third, and the one that would
cost most, is **whoever owns instance representation**: if no module may create a `Sound`, all
three cues are specced and unbuildable (S7), which is precisely the state `notices` found the
notice plate in.

## Research owed

My node carries no `must_verify`. I fetched what the sheets need to justify themselves anyway,
because this is the domain's last chance to fetch. All of it lands in `cid/_research/pack.md`.

**Fetched and citable:**

- `[research: https://create.roblox.com/docs/reference/engine/classes/Sound]` and the raw
  reference source — `SoundId` is a **`ContentId`** (a string of the form `rbxassetid://…`),
  which is why `release`'s `0` sentinel does not transfer; `TimeLength` is read-only and
  *"If the `Sound` is not loaded, this value will be `0`"*, so an audible-length criterion is
  checkable at runtime only after `IsLoaded`; `Volume` *"Can be set between `0` and `10` and
  defaults to `0.5`"*; a `Sound` parented to a `BasePart` or `Attachment` is positional and
  Doppler-shifted, otherwise global.
- `[research: https://create.roblox.com/docs/sound/objects]` — the positional/global rule in
  the engine's own words: *"Within `SoundService` or `Workspace`. Audio emits throughout the
  game. Volume and pan position remain the same regardless of the user's sound listener
  position or rotation."* This is what makes S3 answerable as a property write rather than as
  a preference.
- `[research: https://create.roblox.com/docs/audio/assets]` — uploads must be *"less than
  20 MB in size and 7 minutes in duration"*, `.mp3`/`.ogg`/`.wav`/`.flac`, sample rate
  ≤ 48 kHz; 2,000 free imports per 30 days ID-verified and 100 unverified; imported audio is
  private by default and *"the IDs of your imported audio can't be accessed by users without
  proper permissions"*, granted to specific friends and experiences. Also: the Creator Store
  holds *"more than 100,000 professionally-produced sound effects and music tracks"* that are
  free to use, so **a stinger need not be an upload** — which is the cheapest path to a
  provisioned id and matters to Mix's gate (G2).
- `[research: https://devforum.roblox.com/t/public-sound-effects-upload-are-now-available-for-creators/2980704]`
  (2024-05-23) — a creator may distribute a sound effect publicly only if *"the audio length
  must be <10 sec"* and they are 13+, ID-verified and in good moderation standing, and a
  consumer *"will need to acquire the asset from the Creator Store and add to your inventory"*.
  All three of my cues are inside 10 s by construction, so nothing here bounds the design.
- `[research: https://create.roblox.com/docs/reference/engine/classes/ContentProvider]` —
  `PreloadAsync` yields and works on `Sound` instances, which is the mechanism by which three
  cue assets can be made ready before the first clear without blocking
  `loadToFirstInputSeconds`.

**Could not settle:**

- **A measured phone-speaker frequency response for the floor device.** Audiokinetic's
  measurement article is the right source and returned 403 twice on two hosts; a search result
  reports it finding roll-off from ~1 kHz with little usable output below ~300 Hz, and I am
  **not** recording that as sourced because I did not reach the page. `[unverified]` — the
  settling fetch is `audiokinetic.com/en/community/blog/loudness-and-frequency-response-on-popular-smart-phones/`
  retrieved with a browser-class user agent, or any published measurement of an iPhone SE
  (2nd gen) speaker response. What it would settle: whether `theme/tone/04` `D3`'s sub-bass ban
  is a taste rule or a device fact, and the lowest note a resolving chord may rest on and still
  exist on the floor device.
- **A reading rate or attention figure for an 8–11 age band** that would let an audible length
  be derived rather than picked. `notices` already carries the same `[research owed:]` for its
  dwell figures, so my caps inherit an underived number and my lengths sit under it.
- **Nothing has been heard.** `cid/_playtest.md` records no audio observation because none
  exists. Every length, every test range and the fatigue claim in sheet `02` is a prediction.

## Not assigned, and why

- **`B4` `upgradePurchased` and `B5` `patchClear`** — UI Sound and SFX respectively, by the
  category's routing note and by `theme/tone/03` (`B4` is a confirmation, not a celebration).
  I do not author them and my `forbidden[]` does not reach them.
- **A ducking rule for the coincident `B2` + `B3` pair, roll-off curves, concurrency caps, the
  20 MB split, `SoundGroup` structure and the unprovisioned-asset form** — all **Mix**. I state
  each cue's length, position class and asset row; I set no curve and no bus.
- **The `notice` plate, its strings and its dwell** — `notices`. I take both caps as given and
  file no revision request against them, because three cues fit inside them.
- **The `atPatch` visual at a reveal** — Art & VFX, under `response`'s 2.5 s dwell.
- **A fourth stinger of any kind.** Three beats carry an `audio` channel and are mine; there is
  no fourth moment in `response` for one to attach to, and inventing one would add a beat class
  `theme/tone/03` closes.
- **A per-tier pitched note.** `OPEN.md §2` assigns it to *clearing*, and `systems/03` states
  the routing directly: *"The tier note the brief's audio default assigns per rarity belongs to
  the clear, not the reveal."* It is SFX's, contingent on G1, and I neither claim it nor drop
  it.
