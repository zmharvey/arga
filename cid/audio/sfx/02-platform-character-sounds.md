# 02 — Platform character sounds

**Domain:** SFX · **Category:** Audio · **Wave:** 6

## Decision

**Keep the platform's defaults, author nothing, silence `Died`.** Of Roblox's ten default
character sounds, **5 are kept as shipped, 1 is silenced, and 4 are unreachable by this game's
own world rules** — and `sfx` therefore authors no footstep, jump, landing or death asset and
spends none of the 20 MB `Sounds` ceiling on movement.

**This sheet carries no manifest block.** What the platform already plays is a constraint on
**`sfx`**, which `03-the-sfx-key.md` supplies: a sound the engine ships is one this key must not
provision, and that is a row there rather than a key here.

## Why

- **This sheet rules the ten dispositions and nothing else. They land in `sfx.characterSounds`,
  carried by sheet 03, which proposes the `sfx` key.**
- **They exist, they are ten, and they are the most-heard audio in a movement-only game.** The
  set is `Died, Running, Swimming, Climbing, Jumping, GettingUp, FreeFalling, FallingDown,
  Landing, Splash`; `Running`, `Swimming` and `Climbing` loop, `Jumping`, `GettingUp` and `Died`
  are one-shots, `Landing` and `Splash` scale volume with vertical speed, and `FreeFalling` fades
  in over 1.1 s above 75 studs/s
  `[research: https://raw.githubusercontent.com/Roblox/Core-Scripts/master/PlayerScripts/StarterCharacterScripts/Sound/LocalSound.client.lua]`.
- **They are created client-side, so no server script can change another player's.** *"those
  sounds in the humanoidrootpart are created on the player client, not on the server"*
  `[research: https://devforum.roblox.com/t/disabling-default-footsteps-sounds/1342744]`.
- **The only override is a name collision.** *"create a new LocalScript inside
  StarterPlayerScripts, rename it to RbxCharacterSounds"*, which supersedes the CoreScript; the
  recommended method is copying the default script there and editing ids in the copy
  `[research: https://devforum.roblox.com/t/change-default-sounds-in-rbxcharactersounds/1162202]`.
  **That is one config line, not an authoring task**, and it is the whole cost of the `Died` row.
- **Keeping is what the brief's binding scope line asks for.** *"the smallest game that still
  gives every creative area real work"* `[brief: binding]` ← `[you chose: R1 Q3]`, `00-CORE.md`.
  A sound does not exist to give this domain something to do, and replacing ten working platform
  cues with ten uploaded ones is the largest possible spend for the smallest possible difference.
- **`Input: movement only`** `[brief: soft]` ← `[you accepted: step 6 Q3]`, `02-GAMEPLAY.md`. In a
  game whose whole verb set is three platform verbs plus two pressables, the platform's own
  locomotion audio is the feedback for three of the five verbs, for free.
- **`social/03` `X10` already permits it across players.** A neighbour's locomotion is one of the
  two things permitted to reach a second client, so keeping the defaults costs no social ruling.

## The ten, one row each

`unreachable` means no world rule in this game can produce the state that fires it, so the
disposition is a recorded fact rather than an instruction to a builder.

| # | sound | disposition | ruling | observable |
|---|---|---|---|---|
| 1 | `Died` | **silence** | `traversal.death.authoredCue: "none"`; `response.negativeBeats: 0`; `traversal.fall.damage: false` and the world cannot kill, drop or damage the player, so a death announcement announces an event this design says does not exist | the `Died` entry's `SoundId` in the `StarterPlayerScripts` copy is `""`; a forced `Humanoid.Health = 0` produces no sound |
| 2 | `Running` | **keep** | platform default; `movement.baseWalkSpeed` 16 and movement is the whole verb set | walking produces the stock loop; no `sfx` asset row has a footstep trigger |
| 3 | `Swimming` | **unreachable** | `theme/setting/05-inventory`: no water of any kind, the works is dry; `traversal` places zero water | zero `Terrain` water cells and zero water parts in any published bay |
| 4 | `Climbing` | **unreachable** | `traversal`: zero climbable surfaces; the area boundary *"may not read as a thing to climb"* | zero `TrussPart` and zero `Humanoid` `Climbing` state transitions in a bay |
| 5 | `Jumping` | **keep** | `traversal.jump.exists: true` at the platform default, gating nothing | a jump produces the stock one-shot |
| 6 | `GettingUp` | **keep** | no world rule removes the `FallingDown` → `GettingUp` transition; silencing it would mean authoring a replacement for a case nobody has observed | present and unedited in the `StarterPlayerScripts` copy |
| 7 | `FreeFalling` | **unreachable** | it fades in only above **75 studs/s** vertical speed over 1.1 s, and `traversal` states the world cannot drop the player, so the only descent available is a platform-default jump onto the ground it left `[research owed: a Roblox `Humanoid` reference stating the default `JumpPower`/`JumpHeight` and the peak descent speed it produces, to confirm it is under 75 studs/s]` | no bay contains a walkable surface more than 8 studs above the one below it |
| 8 | `FallingDown` | **keep** | same reasoning as `GettingUp`; the physics that produces it is the platform's and no sheet removes it | present and unedited in the `StarterPlayerScripts` copy |
| 9 | `Landing` | **keep** | pairs with `Jumping`, which exists; volume scales with vertical speed, which is bounded by the jump | a jump's landing produces the stock one-shot |
| 10 | `Splash` | **unreachable** | fires on entering water; `theme/setting/05-inventory` closes the world to twelve classes of matter and water is not among them | same check as row 3 |

**Counts: keep 5, silence 1, unreachable 4.** If row 7 turns out reachable, its disposition
becomes `keep` and nothing else in this sheet or in `sfx` moves — which is why the `[research
owed:]` is recorded rather than blocking.

## The one argument against keeping, and why it does not carry

`theme/setting/05-inventory` closes this place to twelve classes of matter, and a generic Roblox
footfall is a *material* claim — it asserts a surface. The stock `Running` loop is a scuffed,
neutral footfall that the twelve-class list may not contain, and the same objection reaches
`Landing`.

**It does not carry, for three reasons.** The world is stone and low green under a canopy
`[research: cid/theme/setting/05-inventory.md]`, and a neutral scuff is closer to that than to
anything the list forbids — the objection would bite against a metal, water or wooden footfall,
none of which the platform ships. Overruling it costs four uploaded assets, a
`RbxCharacterSounds` fork that must then be maintained against the CoreScript, and a share of a
20 MB ceiling six domains split, against `00-CORE.md`'s binding smallest-game line. And
`setting/05`'s Audio consequence enumerates what may not make a sound — *"No water bed, no fire
crackle, no mechanism, no cloth or rope, no creaking hinge in service"* — and a player's own body
is not on that list, because a player is one of the two things `setting/01` states is alive here.

**The `Died` row meets neither stopping-rule bar and is stated as a config line, not inflated.**
No player would notice a death cue in a game where nothing can kill them, and two builders would
not diverge on it — both would leave the CoreScript alone. It is in the table because a stated
zero is data a build can be failed against and silence is not.

## Consequences for other work

- **In-world sound work (sheet 03, mine)** inherits a standing prohibition: `sfx.assets` contains
  **zero** footstep, jump, landing, fall and death rows, and `sfx` claims **0 MB** of
  `budgets.memoryCeilingsByCategory.Sounds` for movement. The only trigger in `sfx.assets` is
  `patchClear`.
- **Asset-ledger work (`audio/mix/03`)** gets one whole class of asset removed from the 20 MB
  split before the split is made, and should record movement audio as `platformDefault`, not as
  an unallocated row.
- **Boot and place-configuration work (Build & Deploy, `release.publishChecklist`)** inherits one
  file if the `Died` row is taken: a LocalScript named exactly `RbxCharacterSounds` in
  `StarterPlayerScripts`, a verbatim copy of the CoreScript with one field changed. It is not in
  `bridge/emit-config.mjs`'s output and no module in the build order creates it today.
- **Instance-representation work (architect)** is asked for nothing new. These ten `Sound`
  instances are created by the platform, not by any module, so G5's "who may create a `Sound`"
  question does not reach them.
- **Presence work (`gameplay/social/02`)** gains a second channel for free: a neighbour in motion
  is audible as well as visible, under `X10`, at no asset cost and with no ruling of mine.
- **Mix work** owns whether the platform's locomotion sits under a bus at all. It cannot: these
  `Sound` instances are created by a CoreScript and carry no `SoundGroup`, so any level relation
  between a footstep and the clear cue is a property of the clear cue's level alone.

## Acceptance criteria

1. `sfx.characterSounds` has exactly 10 rows, one per name in `Died, Running, Swimming, Climbing,
   Jumping, GettingUp, FreeFalling, FallingDown, Landing, Splash`, each carrying a `disposition`
   in `{keep, silence, unreachable}`; the counts are keep 5, silence 1, unreachable 4.
2. `sfx.assets` contains zero rows whose `trigger` is a footstep, jump, landing, fall or death:
   every row's `trigger` is `patchClear`, and `sfx.movementMegabytesClaimed` is 0.
3. If a LocalScript named `RbxCharacterSounds` exists in `StarterPlayerScripts`, it differs from
   the upstream CoreScript in exactly one field — the `Died` entry's `SoundId`, set to `""`. No
   other id, volume, pitch or looped flag differs.

## Not decided here

Every value in `sfx`, including these ten rows once they are data — **sheet 03, mine, which
carries the key.** Whether the clear has an audio channel at all — sheet 01, mine. Whether the
platform's locomotion audio is loud relative to anything — Mix, which holds `mix` and cannot
reach a CoreScript-created `Sound` anyway. Who writes the `StarterPlayerScripts` file and in what
build step — place-configuration work, currently Build & Deploy. Whether `RespawnDelaySeconds` or
`CharacterAutoLoads` is set, and what a respawn looks like — architecture, per `traversal`. Where
the current `RbxCharacterSounds` parents its `Sound` instances — `[unverified]`: the archived
`Core-Scripts` version parents to the **Head**, devforum threads consistently describe
**HumanoidRootPart**, both cannot be current, and nothing in these three sheets depends on it,
though a builder implementing the `Died` row does. Settled by fetching the live CoreScript source
or reading a character's descendants at runtime in a published place.
