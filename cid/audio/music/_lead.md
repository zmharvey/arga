# Music — domain index

**Category:** Audio · **Wave:** 6 · **Sheets:** 1

**Reads.** Brief: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md` (via HANDOFF's
routing), `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`. Category:
`cid/audio/_category.md`. Approved sheets read in full, not in digest:
`cid/theme/setting/01-the-ruin.md`, `cid/theme/setting/03-physical-law.md`,
`cid/theme/tone/01-register.md`, `cid/theme/tone/03-beat-map.md`, `cid/theme/tone/04-do-nots.md`,
`cid/theme/fantasy/03-inhabiting.md`, `cid/gameplay/meta/07-after-the-last-find.md`,
`cid/tech/performance/01-device-floor-and-budgets.md`,
`cid/tech/deploy/02-no-explicit-null-in-emitted-config.md`,
`cid/analytics/engagement/01-session-shape.md` (partial). State: `cid/_contract.md`,
`cid/_state.md`, `cid/_digest.md`. Repo: `game/src/client/Beats.luau`, `game/src/` (grepped for
`Sound`), `docs/cid-workflow.json`, `bridge/cid.mjs`, `bridge/context.mjs`.
`cid/audio/ambient/_lead.md` **does not exist yet** — Ambient runs in parallel with me and I could
not read it. That absence is the reason the seam below is written as a cession rather than a
negotiation.

**I own no merged contract key. I propose exactly one: `music`.** `npm run bridge -- --contract`
could not be executed — this session has no shell tool — so I read `cid/_contract.md`, which
`cid:leadpack` generates from `bridge/schema.mjs`, plus `cid/_state.md`'s nine-key proposal queue
and the eleven wave 4–5 proposals listed in `cid/audio/_category.md`. `music` appears in none of
the 25 merged keys and none of the 20 proposals, so it is free to claim and there is no collision
to check for.

---

## The ruling: music exists as a decision and not as an asset. `trackCount: 0`.

Stated here because the category assigned the ruling to the index; the sheet carries it as data,
argues it, and owns the reversal path. Four steps, and only the first is about the brief.

1. **The brief's music line is the weakest tag in the ladder and was never interviewed.**
   *"Music sparse and low"* `[brief: soft]` ← `[I assumed]` (`OPEN.md §2`), at **0 direct
   questions** (`OPEN.md §1`, audio intent). It presupposes music without arguing for it. Under
   `HANDOFF.md`'s latitude table `[I assumed]` is *"a starting point, freely arguable"* — so it is
   overruled with a reason, not ignored, and the overrule is contained as a manifest value.

2. **Two of the four things this node owns are structurally zero before enumeration begins, and
   an approved sheet zeroed each — not me.** `intensity layers` dies on `theme/tone/03`'s
   *"No cue's intensity is a function of progress, streak, count, elapsed time, or depth"* and its
   check *"zero cue parameters read those inputs"*, reinforced by `HANDOFF.md`'s
   *"nobody downstream should invent tension to fill the gap"* `[brief: binding]` on the
   instruction. `track list per area` dies on `03-META.md`'s *"Endless via shuffled authored
   chunks"* `[brief: binding]` ← `[you chose: R5 Q1]` — areas are not distinguishable content —
   and on `tone/03`'s *"`B1` at depth 4 is exactly as loud as `B1` at depth 1"*.

3. **Every remaining music form with a shape in time fails `theme/tone/03`'s flat baseline.** Its
   fourth check is *"Between two `B1` events the game produces no emphasis other than `B5`"*,
   verified as *"no third recurring cue exists"*. A metered loop, a phrase that arrives, a
   downbeat and a resolving cadence are each a recurring emphasis between `B1` events and none of
   them is `B5`. `tone/03` names **audio intent** as one of only two kinds of work that may
   overturn it; I decline the invitation and apply it instead, which is why this sheet carries no
   `## Pushing back` against any approved sheet.

4. **The one surviving form is an ambient bed, and Ambient already owns beds.** A continuous,
   unmetered, unvarying layer with no arrival passes `theme/setting/03` `R5` and passes the flat
   baseline — for the exact reason that it is indistinguishable from
   `theme/setting/01`'s granted off-screen ambience and `theme/setting/05`'s soft air bed, both
   already routed to `ambience`. A third global continuous layer under a second owner is a
   guaranteed two-domains-one-object collision, and the two writers run in parallel and cannot ask
   each other. **So the survivor is ceded, not built.** What is left for `music` to hold is zero
   tracks, and that is a build instruction rather than an omission.

**The cost of the other answer, so the ruling is a trade and not a preference.** A permanent
tonal pad establishes a fixed harmonic centre, and every pitched cue in the game — `OPEN.md §2`'s
per-tier note, `B1`, `B4` — must then be tuned to it or trip `theme/tone/04` `D3`'s ban on
*"a dissonant or detuned interval"*. That is a constraint imposed on three other domains in
exchange for one asset's worth of warmth. It is also the largest single asset class this build
could hold: a Roblox audio upload may itself be up to **20 MB**, against a
`budgets.memoryCeilingsByCategory.Sounds` ceiling of **20 MB** shared by all six audio domains on
a 3 GB phone `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]`,
in a build whose `uploadedImageAssetsInWorldGeometry` and `uploadedMeshAssetsInWorldGeometry` are
both `0`.

**This ruling does not rest on muted play, and I will not let it.** The category derives its
muted-player invariant from *"a large share of sessions run with no sound at all"*, which no
source in this repo supports. The one survey I could find reports **34.9% always / 23.6% often /
19% sometimes / 9.3% never** playing with sound, n=541
`[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`
— general mobile, neither Roblox-specific nor 8–14, so directional only. A silence ruling built on
an unevidenced muting reflex would be the comfortable answer this pipeline exists to remove.
**What carries when sound is off is unaffected by me either way:** every one of `response`'s five
beats already has a non-audio channel, and `theme/fantasy/03` `C2` makes the ground itself the
record at *"count of guarantees whose delivery needs a string, a screen or a figure: 0"*. With
`trackCount: 0` this domain contributes exactly **0** to Mix's `audioOnlyBeats`.

**The seam between a track and a bed, as one testable property.** An object belongs to `ambience`
if a listener cannot tell its content at second N from its content at second 0 — no meter, no
pitch centre that resolves, no phrase authored to be recognised as returning. It belongs to
`music` if any part of it is authored to return. Everything on the `ambience` side is Ambient's
**regardless of what it is made of**, synthesised tonal pad included. `music` therefore holds only
objects that would fail `tone/03`, which is why it holds none.

**Consequence I state and do not solve.** `endgame` extinguishes `B1`, `B2` and `B4` past area 8,
leaving `B3` at roughly 93–157-second intervals and `B5` forever. That is the one state where
music would earn its keep, and it is also the one place it cannot be added: a layer that appears
at 24/24 is a cue whose existence is a function of progress, which `tone/03` criterion 3 forbids
with no exception. The terminal soundscape is Ambient's layers plus `B3` plus `B5`, and that is a
finding for the final cross-category pass, not a hole I may fill.

---

## What the brief gave me

- *"Music sparse and low."* `OPEN.md §2` · `[I assumed]` → **`[brief: soft]`** · **0 interview
  questions** (`OPEN.md §1`). The whole of the brief's music direction.
- *"Consequence: audio and visual feedback carry the entire load"* and *"nobody downstream should
  invent tension to fill the gap."* `02-GAMEPLAY.md` · `[you accepted: step 6 Q2]` →
  `[brief: soft]`, elevated by `HANDOFF.md` to **`[brief: binding]` on the instruction**.
- *"8–14, mobile-heavy, short sessions."* `00-CORE.md` · `[you chose: R1 Q4]` →
  **`[brief: binding]`**. Phone speaker, 10–20 minute sessions.
- *"Endless via shuffled authored chunks, not generation."* `03-META.md` ·
  `[you chose: R5 Q1]` → **`[brief: binding]`**. Areas are not distinguishable content.
- *"Target: the smallest game that still gives every creative area real work"* and
  *"Success is shipped artifacts, not players."* `00-CORE.md` · `[you chose: R1 Q3]` →
  **`[brief: binding]`**. No sound exists to give a lead something to do.
- *"Declined: a full pass with colourblind mode, text scaling and sensitivity options."*
  `04-PRESENTATION.md` · `[you accepted: R6 Q4]` → `[brief: soft]`. **There is no volume control
  and no settings verb**; a music default would be the only music the player ever has.
- *"Ships and settles. No seasons or events."* `OPEN.md §2` · `[brief: soft]`, and `03-META.md`
  priority 3 as a hard gate.

## What the brief did not give me

Six gaps, each routed. None is filled here.

| # | gap | routed to |
|---|---|---|
| **G-M1** | **Whether music exists at all was never asked.** `OPEN.md §1` records audio intent at 0 questions and `OPEN.md §5` lists it as assumption 8–11, batched by design. Every word of this domain is `[cid: decided]` against a silent brief. | sheet `01`, and **flagged to the developer** with a costed reversal path |
| **G-M2** | **No approved sheet says whether a non-diegetic layer is inside `setting/03` `R5`'s jurisdiction.** `R5` governs *"this place"*, and its criterion counts *"properties inside a plot"*. Music is not in a plot. If `R5` does not reach it, the ruling rests on `tone/03` alone — which is sufficient — but the sheet must say **which reading it takes** rather than lean on both. Same shape as `setting/03`'s own honest finding that the anti-cyclical gate is thinner than it reads. | sheet `01` to state; **category verification** to route the scope question |
| **G-M3** | **No source defines the boundary between a track and an ambient bed.** Two domains can reach for one continuous global loop, and the category brief flagged the risk but named no test. | sheet `01`, as the property above; consequence stated for continuous-layer work *[Ambient]* |
| **G-M4** | **The 20 MB `Sounds` ceiling is undivided across six domains** and no per-domain allocation exists. `trackCount: 0` is the only music answer that does not depend on a number nobody has written yet. | per-domain audio memory allocation work *[Mix]* |
| **G-M5** | **No sheet says whether a build that boots with no music is correct or is a missing asset.** `tech/deploy/02` forbids absence-as-omission: *"an explicit null and a never-emitted key are the same bytes at runtime."* | sheet `01`, as declared values (`tracks: []`), never a null and never a reserved id, group, bus or slot |
| **G-M6** | **Nobody owns listening to this game.** `tech/performance/01` already records that no sheet in either contract owns taking a measurement; a listening test joins that list. A `trackCount: 0` ruling is the one audio decision a playtest can reopen at zero build cost. | the final cross-category pass |

## Why 1 sheet

**One contract key, one decision, one sheet.** `--contract` (read as `cid/_contract.md`) shows
this domain owning nothing today and needing `music`, so the count starts at one. The second-sheet
allowance is for a rule that *constrains* a key I own; the two candidates both fail it. The
track-versus-bed seam constrains `ambience`, which is Ambient's key, so by the rule it belongs in
their domain and appears here only as a consequence line. The reversal path and the `forbidden[]`
enumeration are not a separate decision from the ruling — they are the ruling written so it can be
executed and failed against. `loop and transition rules` and `intensity layers` are vacuous at zero
tracks and a heading is not a decision. Splitting this into "the ruling", "the seam" and "the
reversal" would be three descriptions of one decision, which is exactly the wave-1 failure the
contract anchor was written to stop.

| # | sheet | must decide |
|---|---|---|
| 01 | `whether-music-exists` | Rule and prove that this game ships zero music tracks, and carry the ruling as the proposed contract key `music` with `trackCount: 0` and an explicit empty `tracks` list. Show, form by form, that each is already forbidden by an approved sheet and not by you: a metered or phrased loop against `theme/tone/03`'s check *between two `B1` events the game produces no emphasis other than `B5`* and *no third recurring cue exists*; intensity layers, stems and any material that rises toward a completion against its *no cue's intensity is a function of progress, streak, count, elapsed time, or depth* plus `HANDOFF.md`'s binding *nobody downstream should invent tension to fill the gap*; a per-area or per-depth track against `03-META.md`'s shuffled authored chunks and `tone/03`'s *`B1` at depth 4 is exactly as loud as `B1` at depth 1*; a track keyed to elapsed or session time against `theme/setting/03` `R4` and `R5`; and a track introduced at 24 of 24 against `gameplay/meta/07`'s `endgame` and the progress clause again. State the track-versus-bed seam as one property a verifier can apply — an object is Ambient's if a listener cannot tell its content at second N from second 0, and yours only if some part of it is authored to return — and cede every continuous unvarying layer to `ambience` so no second domain claims one object. Contain the overrule of `OPEN.md §2`'s *Music sparse and low* (`[brief: soft]` ← `[I assumed]`, 0 interview questions) as a named manifest value carrying its reason, not as prose. Record explicitly that the ruling does not rest on muted play, citing the one survey in your pack and its limits, and state that this key contributes 0 to Mix's `audioOnlyBeats`. Carry a `reversalPath` naming the single form a developer overrule would license, the domain that would then own it, and its cost against the shared 20 MB `Sounds` ceiling given that one Roblox audio upload may itself be 20 MB. Write absence as declared values only — never a null, never a reserved id, `SoundGroup`, bus, stem or empty slot, since `tech/deploy/02` makes a null and a missing key the same bytes and the scope gate forbids holding room for anything in priority 2 or 3. Keep every manifest string clear of the whole-word tokens greped by `theme/setting/03` criterion 4 and `theme/setting/01` criterion 4 — `hums`, `thrums`, `pulses`, `breathes`, `stir`, `shimmer`, `glow`, `season`, `weather` and the fauna list are ordinary music vocabulary and all of them are checked across every `manifest` value under `cid/`. End with 2–4 criteria a build is failed against, including zero `Sound` instances and zero music `rbxassetid` anywhere in `game/src` (true today, verified by grep this run) and zero fields in the key that read progress, depth, area, elapsed time or player count. |

## Verification note

**The sheet most likely to be contradicted later is the only one, and by two parties.**

*By Ambient.* If Ambient takes both granted layers and makes one of them tonal, a reader will ask
why that object is not a music track. The seam property above is written to answer that in one
line, and it answers it in Ambient's favour by construction. The failure mode to watch for at
category verification is the inverse: **Ambient declining both grants**, which would leave the game
with no continuous layer at all and would make my cession a cession to nobody. That is a legitimate
outcome and it is not a reason to reopen this ruling — it is a finding for the final pass, because
the argument against music is `tone/03`, not the existence of a bed.

*By the developer.* `G-M1` is the only ruling in this domain and the brief presupposed the
opposite. The reversal path exists so that an overrule costs one asset and one owner change rather
than a redesign.

**One live inconsistency in the category brief, routed to Mix rather than argued here.**
`cid/audio/_category.md`'s muted-player invariant is motivated by an unsourced claim about how many
sessions run silent. The **invariant itself survives** — it is derived from `response`'s channel
lists, which is how the category actually got it — but its stated motive is not supported by the
one source I could find. Mix should keep `audioOnlyBeats: 0` and restate its reason.

## Research owed

**`must_verify` for `music-lead` in `docs/cid-workflow.json` is empty.** I fetched anyway, because
whatever I bank here is the only external evidence my writer can cite.

Fetched and banked:

- Roblox audio asset limits and the Creator Store library — uploads must be *"less than 20 MB in
  size"*, *"less than 7 minutes in duration"*, mp3/ogg/wav/flac, ≤48 kHz; the store carries *"more
  than 100,000 professionally-produced sound effects and music tracks from top audio and music
  partners"* free to use.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]`
- Audio privacy: since 22 March 2022 uploaded audio over 6 seconds is private to its uploader, with
  per-experience permissions grantable; only audio of 6 seconds or less can be made public.
  **Consequence the category has not stated: a Creator Store music or long-form asset already has a
  live id, so it does not pass through an upload gate at all** — which bears directly on `G2`
  (Mix's missing provisioning gate) and on whether a sentinel is needed for a long asset.
  `[research: https://devforum.roblox.com/t/action-needed-upcoming-changes-to-asset-privacy-for-audio/1701697]`
- Licensed-music terms: APM Music catalogue, royalty-free on-platform, **up to 250 licensed tracks
  at a time in a single experience**, boom-box use counted.
  `[research: https://en.help.roblox.com/hc/en-us/articles/360000927163-Using-Licensed-Music-on-Roblox]`
- `Sound` playback and looping surface, for the data form a track table would have needed:
  `Looped`, `LoopRegion` and `PlaybackRegion` are `NumberRange`, `PlaybackRegionsEnabled` is a
  boolean, `TimeLength` is read-only, `TimePosition` is not replicated; a `Sound` is 3D when
  parented to a `Part` or `Attachment` and global otherwise.
  `[research: https://create.roblox.com/docs/reference/engine/classes/Sound]`
- Mobile muted-play figures, cited above with their limits.
  `[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`

Fetches that failed or could not settle a claim:

- `create.roblox.com/docs/production/publishing/public-audio-assets` returned **404**; the same
  material was reached through the `creator-docs` GitHub mirror instead, which is why the citation
  above points there.
- **No Roblox-specific or 8–14-specific figure for playing muted exists in anything I fetched.**
  `[research owed: a Roblox creator-dashboard or platform-published figure for the share of mobile
  sessions played with audio muted — it would settle whether the category's muted-player premise is
  true as well as whether its invariant is right]`
- **No page gives the in-memory footprint of a decoded `Sound` on a mobile client.** The
  `PlaceMemory` category tree is already `[research owed:]` in `budgets` and is still absent.
  `[research owed: create.roblox.com/docs/studio/optimization/memory-usage — the PlaceMemory
  category tree, to convert an audio file size into a Sounds-category reading]`
- `npm run bridge -- --contract` could not be run: **no shell tool in this session.** Substituted by
  reading `cid/_contract.md` (generated from `bridge/schema.mjs` by the same code path),
  `cid/_state.md`'s proposal queue, and the wave 4–5 proposal list in `cid/audio/_category.md`.
  `[unverified]` only in the sense that the live coverage report was not printed; the key list
  itself is read from the artifact that command writes.

## Two findings outside my subject, passed up rather than acted on

1. **Three approved wave-5 analytics sheets carry explicit nulls inside `manifest` values**, which
   `cid/tech/deploy/02` — approved in the same wave — makes a hard emit-time error by its
   acceptance criterion 3, and whose 16-row remediation table does not list any of them.
   `cid/analytics/engagement/01-session-shape.md:98` (`"stitchWindowSeconds": null`),
   `cid/analytics/kpis/02-the-shortlist.md` (nine sites), and
   `cid/analytics/funnels/02-comprehension-instruments.md`. Two approved sheets disagree.
   *Routed to contract-and-seam and release-contract work; not mine, and not fixable from here.*
2. **`cid/audio/_category.md` `G6` is confirmed for this domain and I complied with it.** Every
   citation above uses the shipped ids — `D3`, `D4`, `R1`–`R6`, `B1`–`B5` as beat ids — and nothing
   here relies on the drifted wave-1 references (`X1`, `X2`, `B6`) that no longer resolve.
