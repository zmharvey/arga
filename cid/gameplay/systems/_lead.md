# Systems — domain index

**Category:** Gameplay · **Wave:** 2 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `OPEN.md` (all of
`concept/spec/incremental-spinoff-v2/`); `cid/gameplay/_category.md` §02; `cid/_digest.md`;
`cid/_contract.md`; `bridge/schema.mjs`; the shipped build under `game/src/`.

I own two contract keys, `tiers` and `currency`, both already supplied. The other four
sheets below propose keys that do not exist yet.

## What the brief gave me

**The economy shape.** `02-GAMEPLAY.md`: "**One currency.**" with one faucet, "clearing
overgrowth, scaled by tier", and one sink, "clearing-speed upgrades". "Rebirth currency
existed to serve a reset layer that was cut, so removing it is consistency rather than
simplification. A duplicate-find currency and a separate discovery currency were both
offered and declined." `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`

**The no-second-currency rule, stated as a constraint on this domain by name.**
`02-GAMEPLAY.md`: "**Known consequence — duplicates have no sink.** A 24-object roster with
depth-tiered sets guarantees repeat finds, and there is no second currency to convert them
into. **Constraint on whoever designs systems — solve duplicates without adding a
currency.**" `HANDOFF.md` repeats it as one of six pre-design facts.
`[brief: soft]`, but both escapes were named and refused, so treat the prohibition as firm.

**The power track.** `02-GAMEPLAY.md`: "**Three axes:** value per unit, clear radius, and
move speed." plus "Spawn rate — the reference's third axis — is meaningless here: nothing
respawns." and "Relic luck as a fourth axis was offered and declined."
`[brief: soft]` ← `[you accepted: step 6 Q1]`, recorded in `OPEN.md §5` as no longer an
assumption.

**The collection's structure, which is not mine to restate.** `02-GAMEPLAY.md`: "**~24
objects in 4 sets of 6.**" · "**Each set tied to area depth** — rarity and location are one
axis, so there is one concept to learn rather than two." · "**Completing a set grants a
permanent bonus.**" `[brief: soft]` ← `[you accepted: R4 Q4]`. `gameplay/meta/02-the-collection`
supplies this as `collection` and I do not touch it.

**Permanence, which is what makes a ledger a design question at all.** `01-FOUNDATION.md`:
"**Cleared is permanent — overgrowth never returns.**" `[brief: binding]` ← `[you chose: R2 Q1]`
· "**No rebirth.**" `[brief: binding]` ← `[you chose: R2 Q2]` · "**No offline accumulation.**"
`[brief: binding]`, derived. Nothing respawns, resets, decays or is taken back, so no system
of mine may need a renewable resource or a reset.

**The rarity-ladder assumption I inherit by name.** `01-FOUNDATION.md`: "**Rarity ladder
lives in the overgrowth**, not in a separate drop table. `[I assumed — carried from the
reference's model; not interviewed]`" `OPEN.md §5 #1` names **Systems** (with Art) as the
inheritor. `[brief: soft]`, and the weakest line binding this domain.

**Monetization's shape, because it lands on my axes.** `03-META.md`: "**Permanent
multipliers only. Never content access.**" · "**Allowed:** permanent multipliers on clearing
value, radius, move speed, relic luck." · "**Forbidden:** any paid area, relic, or set."
`[brief: soft]` ← `[you accepted: R5 Q4]`

**The persistence list, as a default rather than a decision.** `OPEN.md §2`: "Persist:
collection state, per-area cleared state, upgrade levels, currency. **Per-area cleared state
is the unusual one.**" `[brief: soft]` ← `[I assumed]`. I state what must persist; storage is
persistence work (currently Tech & Data).

**The scope fence.** `03-META.md` priority 1 includes "three clearing upgrades · the
24-relic 4-set collection"; priority 2 includes "a duplicate-handling refinement", so
priority 1 needs a duplicate answer that stands unrefined; priority 3 excludes "trading".
`[brief: soft]` ← `[I assumed — the ordering]`, treated as binding per the category ruling.

## Parts of my subject this game does not have

Stated so their absence reads as a decision rather than an oversight.

- **Pets, units, minions: absent.** Nothing in any brief sheet has them, and
  `theme/identity/04-no-cast-declaration` (wave 1, approved) closes it upstream: "no
  companions or pets" is one of nine entity classes declared not to exist. Nothing to spec.
- **Crafting, building, tycoon output: absent.** No production, placement, recipe or
  conversion step exists anywhere in the brief. The only verb is movement
  `[brief: soft]` ← `[you accepted: step 6 Q3]`, and a crafting system would need an input
  the control scheme does not have. `theme/setting/05-inventory` closes the world's matter to
  twelve classes, none of them a material or a workbench.
- **Player-to-player exchange: excluded.** "trading" is `03-META.md` priority 3, and the
  social model is "**no mechanical interaction**" `[brief: soft]` ← `[you accepted: R6 Q2]`.
  Two independent grounds. Not specced, not stubbed, not reserved.
- **Holding and managing items: present, but reduced to one thing.** There is no inventory
  in the usual sense: no capacity, no equipping, no stacking, no discarding, no sorting. The
  single held thing is the Find index, and what it holds is sheet 05. Saying "no inventory
  system" and "no ledger" would be two different claims; only the first is true.

## What the brief did not give me

Eight gaps, each routed. None is filled here.

1. **Whether area completion or set completion pays currency at all.** The brief names
   exactly one faucet and one sink and never rules on the two completion events.
   `gameplay/core-loop/02-payoff-weights` gave them *perceptual* weights of 8 and 50 on a
   ladder numerically identical to `tiers[].value` (`1 / 3 / 8 / 20 / 50`), which invites
   exactly the wrong inference; that sheet disclaims "What a completed set actually grants,
   in kind". The shipped build pays nothing on either. `[cid: decided]` that this is open.
   → **04**.
2. **Whether a single payout has a floor.** The shipped build carries
   `MINIMUM_PAYOUT = 1` in `game/src/server/Clearing.luau:38`, annotated in place as a
   config gap: the build brief "states it three times in prose" and "the emitter produces no
   key for it, so it cannot be re-emitted". No contract key holds it and the brief never says
   a floor is needed. → **04**.
3. **What happens to income once every upgrade axis is at `maxLevel`.** One sink, three
   axes, all capped, no rebirth, nothing else to buy: currency then accrues into nothing and
   the smallest and most frequent payoff kind stops meaning anything. The brief is silent.
   This is the economy half of the 24/24 endgame hole that endgame-content work owns from the
   other side. `[cid: decided]` that it is a gap. → **04** states the sink-side consequence;
   what content exists past completion stays with content-structure work (currently Meta &
   Content, wave 3).
4. **What a set-completion bonus is as an object.** The brief says only "a permanent bonus".
   `gameplay/meta/02-the-collection` explicitly routes it here ("explicitly not its business:
   ... the set-completion bonus (Systems)"), while `cid/gameplay/_category.md` says content
   work "choose[s] what the four bonuses *are* in kind". **Those two disagree and I am not
   resolving it by absorbing it.** My split: I own the *object and its composition rule*
   (sheet 06); which axis each of the four sets targets, and by how much, stays with
   content-structure work and then Balance. → **06**, with the collision named upward.
5. **How several sources of the same stat compose.** Three earned axes, permanent paid
   multipliers and permanent set bonuses all target the same three numbers, and no sheet
   states an order of operations. `upgrades[].mode` describes levels *of one upgrade* only.
   The shipped build already had to guard against getting this wrong by hand
   (`game/src/server/Progression.luau:91`, on not squaring the multiplier). → **06**.
6. **What the player's collection record holds, and what a repeat find does.** The brief
   names the duplicate problem three times and forbids both obvious escapes, and says nothing
   about the record. The shipped build answered it unauthorised: `found: { [string]: boolean }`
   cannot represent a repeat, and `game/src/server/Clearing.luau:209` discards one silently,
   with no payout and no event. No sheet decided that. → **05**.
7. **What pool an area's Finds are drawn from.** The brief gives six per area and four
   depth-tied sets, and never says what the second area at a depth contains.
   `game/src/shared/Layout.luau:130-153` places the whole of set one, in order, one name per
   area, and `collection.areasPerDepth` is 1 today, which **masks the duplicate problem
   rather than solving it**: at `areasPerDepth > 1` every area after the first re-places six
   names the player already has. → **05**.
8. **Whether anything in this game is luck-shaped.** `02-GAMEPLAY.md` declines relic luck as
   an earned axis; `03-META.md` lists it among allowed paid multipliers. A direct
   contradiction, unresolved anywhere, and offer-ladder work (currently Monetization, wave 3)
   is blocked on it: a multiplier needs a quantity. The draw rule is the only place a luck
   quantity could live. → **05**.
9. **Whether a Find carries a rarity of its own.** `01-FOUNDATION.md` puts the rarity ladder
   in the overgrowth `[I assumed]`; `02-GAMEPLAY.md` says relic "rarity and location are one
   axis"; `OPEN.md §5 #1` names Systems and Art as inheritors and nothing resolves it.
   `game/src/shared/Layout.luau:149-153` draws Find placement with no reference to
   `tierIndex`, silently answering it. Rarity-legibility work (currently Art & Visuals) cannot
   start until it knows how many ladders it is drawing. → **03**.

## Why 6 sheets

Two are inherited and already read by the shipped build, so they are listed at their
existing numbers and not re-planned. The other four are one per contract key my subject
needs and does not have, and each key is something a builder demonstrably invented rather
than something I would like to exist: the payout floor is a named config gap in the build's
own report, the modifier composition is guarded by a hand-written comment warning against
squaring, the duplicate policy is a boolean map that cannot express a duplicate, and the
tier-to-Find independence is an omission in a placement loop. I considered folding the
ledger and the draw into two sheets and refused: they are the two halves of one answer to
"solve duplicates without adding a currency", and splitting them is exactly the pattern that
leaves a stranger unable to say which sheet owns the brief's hardest constraint. I also
considered making the rarity resolution a note inside sheet 01 and refused for the opposite
reason: it is a separate decision with a separate blocked consumer, and folding it would
mean a second sheet editing a key that already ships. There is no sheet here for "what must
persist": `OPEN.md §2` already lists it and restating a brief line is not a decision.

| # | sheet | must decide |
|---|---|---|
| 01 | `overgrowth-tiers` | Four grades of overgrowth, each a distinct silhouette before it is a distinct green, with a payout that climbs faster than rarity falls; supplies `tiers`, weights summing to 100, and every payout marked a playtest unknown with a test range. |
| 02 | `the-currency` | The single currency's name, plural and icon key, short enough to sit in a HUD corner readout beside a number; supplies `currency`, and names it here because the domain that owns the economy owns what the economy is called. |
| 03 | `rarity-ladders` | State how many rarity ladders this game has and the single field each is read from, resolving whether a Find carries any rarity of its own or only inherits the one already on the overgrowth that hid it; propose key `rarity` holding the ladder count, each ladder's source field, and whether Find placement may read a patch's tier at all; restate neither the tier values (sheet 01) nor the draw rule (sheet 05). |
| 04 | `earning-and-spending` | Close the currency ledger on both sides: name every event that credits currency and the exact per-clear formula including its floor, state that the upgrade ladder is the only debit, and say what happens to income once all three axes sit at max level; propose key `economy` holding the faucet list, the sink list, the clear formula and the payout floor, and set no upgrade cost, growth rate or coefficient, which are Balance's. |
| 05 | `the-find-ledger` | Solve duplicates without adding a currency: decide what pool an area's Finds are drawn from and whether one name can be drawn twice once more than one area exists at a depth, what the player's collection record holds per Find, and what a repeat find does to that record and for the player; propose key `discovery` holding the record fields, the draw rule and the repeat rule, and say plainly inside it whether anything in this game is luck-shaped, because an offer ladder is blocked on that answer. |
| 06 | `modifier-stacking` | State what a permanent stat change is as an object and how several of them compose: which sources may grant one (an upgrade level, a set completion, a purchase), which of the three axes each source may target, the order sources resolve in, and whether a source ever stacks with itself; propose key `modifiers` holding the source list, each source's composition mode and the resolution order, and assign neither an axis to any particular set nor a magnitude to anything. |

## Verification note

**Sheet 05 is the one most likely to be contradicted, and by two parties at once.**
Content-structure work (currently Meta & Content, wave 3) owns `collection.areasPerDepth`,
and the moment it moves above 1 the duplicate case goes live; persistence work (currently
Tech & Data) owns the save shape and will hold an opinion about a record that grows per
Find. It is also contradicted *in advance* by the shipped build, which already implements a
duplicate policy no sheet authored (`Clearing.luau:209`, silent discard). Whatever 05
decides either ratifies that line explicitly or demands it change, and it must say which.

**Sheet 03 is the second.** If it answers "two ladders", rarity-legibility work has to make
two legibility systems readable simultaneously on a phone, in a green environment, under the
brief's hard shape-not-hue constraint, and may reasonably push back that the second ladder is
unaffordable. The sheet should state the cost of its answer so that pushback is a design
conversation and not a surprise.

**I do not believe 01 or 02 is wrong.** Two notes on them anyway. First, `01-overgrowth-tiers`
carries economy numbers (`tiers[].value`), which collides with the category rule that "every
economy, pacing or progression number appears in Balance & Tuning and nowhere else". The
contract wins here, because `tiers` is a key the build reads and a key cannot be half
supplied; the values are correctly marked `[playtest unknown]`. The working rule for sheets
03 to 06 is the same: a value that **is** the shape of a key I own goes in the manifest with
a test range, and a tuning coefficient goes to Balance as a stated requirement. Second,
`02-the-currency` tags "Shard" `[cid: decided]` and defers to the ban list;
`theme/vocabulary/02-banned-words` banned `relic` and did not ban `shard`, so it survives,
but that is a survival rather than an endorsement and the tag stays.

## Research owed

**`must_verify` is empty for this node and I was instructed not to fetch. I did not fetch,
and nothing in this index is tagged `[research: url]`.**

What I did instead, because a gap I cannot evidence is a gap a writer will talk itself out
of: I checked four suspected gaps against the shipped build rather than asserting them. All
four are real and all four are recorded above with a file and line, so the writer can cite
`game/src/...` directly. These are repo-local reads, not fetches; they produce no research
pack entry and must not be written as `[research: url]`.

- `game/src/server/Clearing.luau:38` — `MINIMUM_PAYOUT = 1`, annotated in place as a config
  gap with no key. → gap 2.
- `game/src/server/Clearing.luau:205` — the only call to `Progression.award` in the codebase;
  area completion latches a flag and pays nothing. → gap 1.
- `game/src/server/Clearing.luau:209` — `if relic ~= nil and not state.found[relic]`, a
  repeat discarded with no payout and no event. → gap 6.
- `game/src/server/Persistence.luau:124` — `found = {}`, a `{ [string]: boolean }` map that
  cannot represent a repeat. → gap 6.
- `game/src/server/Progression.luau:91` — a hand-written warning that applying the value
  multiplier twice would square it; no set-bonus or purchase source exists in the module at
  all. → gap 5.
- `game/src/shared/Layout.luau:130-153` — the whole of set one placed in order, one name per
  area, drawn with no reference to `tierIndex`, at `AreasPerDepth = 1`. → gaps 7 and 9.

**What I could not settle and am handing over as owed.** How shipping collection games
resolve duplicate finds *without* a convert-to-currency sink is the one piece of outside
evidence sheet 05 would materially benefit from, and this node has no fetch authority. The
specific fetch that would settle it: the store or wiki pages of two shipping Roblox
collection or index games that have a finite roster and a single currency, read for what
happens on a repeat find. Absent that, sheet 05 must mark the claim `[research owed:]` and
decide on reasoning alone; it may not present an invented precedent as sourced.

## Contract keys this domain needs

`tiers` and `currency` exist and are mine. The four below do not exist in `bridge/schema.mjs`
and are proposals for whoever maintains the schema. None collides with an existing creative
key (`area`, `tiers`, `upgrades`, `vocabulary`, `currency`, `movement`, `patch`, `collection`,
`onboarding`) or with a technical key (`tree`, `stateShape`, `interfaces`, `representation`,
`wiring`, `modules`, `runtime`).

| proposed key | would hold | sheet |
|---|---|---|
| `rarity` | how many rarity ladders exist, the field each is read from, and whether Find placement may read a patch's tier | 03 |
| `economy` | every faucet event, every sink, the per-clear payout formula, and the payout floor | 04 |
| `discovery` | the fields of a player's per-Find record, the draw pool and replacement rule, and what a repeat find does | 05 |
| `modifiers` | the sources that may change a stat, each source's composition mode, and the order sources resolve in | 06 |

`discovery` borders the architect's `stateShape`: I state what the record must hold as a
design decision, and the Luau type of that record stays technical. A sheet of mine that
writes a type has crossed the seam.
