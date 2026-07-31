# Verification — sky-freight-test

**Status: FAIL** · Six blocks-downstream findings. Both halves of the stated differentiator are
occupied at least in part, one recurring term names two incompatible systems, the core mechanic
(the contract board) is described two ways that cannot both be built, the session objective is
unsatisfiable by construction, and the first shippable version as scoped contains no working
instance of the gate the whole design rests on. Do not hand this brief on until F1–F6 are
resolved. (Its synthetic status is separately disclosed and is not counted here.)

## Linter

```
lint-sheets — sky-freight-test  (11 sheets)

  · 28 audit rows, 28 inventory items
  · tags — you chose: 0, you accepted: 0, I assumed: 0
  · build registry: 1 pattern(s) — modal-grid
  · 8 screen id(s) named in 04-PRESENTATION

  FAIL  [tags] zero [you chose] tags — no answer was a contested decision
  WARN  [synthetic-run] 43 [simulated] tag(s) — no developer was interviewed. This brief is a test fixture and must not feed a build. Every simulated answer is really an [I assumed].
  WARN  [untagged-terms] "capability" used 45x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "route" used 37x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "creature" used 32x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "cargo" used 28x across 6 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "class" used 22x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "contract" used 20x across 5 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "board" used 16x across 5 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "delivery" used 15x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "must" used 14x across 4 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "loop" used 13x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "audience" used 13x across 4 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "flight" used 13x across 6 sheets but never on a tagged line — settled name or working word?
  WARN  [naming-open-but-used] naming is listed as left open, but these concrete terms are used throughout and will read as settled: "capability" 45x, "route" 37x, "creature" 32x, "cargo" 28x, "class" 22x, "contract" 20x. Occupancy-check them or mark them as working words.

1 failure(s), 14 warning(s)
```

Note on the `8 screen id(s)` line: that is a linter artifact, not a discrepancy in the brief. The
check regexes every hyphenated backticked token in `04-PRESENTATION.md`, so it counts
`clean-modern`, `cartoon-vibrant`, `ui-forge` and `modal-grid` alongside the four real screen ids.
Do not chase it.

## Findings

### F1 · Creature-borne freight is occupied on Roblox — animals carrying cargo on trade routes, live, 3.4M visits · occupancy
**Severity:** blocks downstream

**Evidence.** The claim:

- `00-CORE.md:40-42` — "**Freight carried by an animal.** The sky-freight loop exists on Roblox,
  with airships. […] No search returned a creature doing it."
- `research/landscape.md:82-84` — "**No search returned a Roblox game where a tamed creature hauls
  freight.** The sky-freight loop exists with vehicles; creature-borne freight did not surface."
- `research/landscape.md:64-65` — "**`freight`, `cargo`, `contract`, `depot`, `route`** — occupied
  only by vehicle-logistics games (below), never by a creature game. **Free in this combination.**"
- `CONCEPT.md:27-28`, `HANDOFF.md:45` repeat it as one of two places distinction lives.

What I found: **Silk Road: Trading Simulator** (Roblox, `Ancient Pathways`).
<https://www.rolimons.com/game/103073154610301> — fetched: **3,375,361 visits · 84.4% likes
(20,656 up / 3,809 down) · 54,599 favourites · all-time peak CCU 1,592 · average playtime
66.9 minutes · created ~5 months ago · updated 1 day before this fetch.** Rolimons lists 7 active
gamepasses including "backpack upgrades, transport options, and speed boosts". The store page
(<https://www.roblox.com/games/103073154610301/Silk-Road-Trading-Simulator>) reads "Trade between
the great powers of the ancient world… Cross towering mountain passes, and journey through
deserts, cities, and distant lands", with a camel in the title art.

Its wiki, on the mechanics: "Riding animals or mounts in the game are animals used to ride and
transport goods. The existing animals are Dromedary Camels, Pack Mules and Saddle Mules"
(`roblox-silk-road-trading-simulator.fandom.com/wiki/Riding_animals`); "Animals are a key part of
the game, providing cargo space for your goods and movement increases. You can have 3 animals
equipped once and use Saddlebags to make them carry more" (`srtsimulator.fandom.com/wiki/Animals`);
"Camels hold 2 cargo slots, or 4 with saddlebags." All three fandom mirrors returned HTTP 402 to
direct fetch; those strings are search-index text from two independent mirrors, corroborated by the
Rolimons gamepass list and the store copy. See *Could not verify*.

**Why it matters.** This is not an adjacent game, it is the second pillar of the brief. A live
Roblox game already ships ridden animals whose differentiating property is cargo capacity,
upgradeable to carry more, along authored trade routes — which is also, almost word for word, the
brief's own roster rule at `02-GAMEPLAY.md:74-75` ("Within a class, creatures differ by cargo
capacity and stamina"). Every sheet that says the pair is unoccupied is wrong on the second half,
and `05-OUTWARD.md:13-15` markets the gate as "the only thing no competitor can claim" partly on
that basis. `research/landscape.md:64-65` is also directly false as written: a creature game on
Roblox is using this vocabulary now.

**Honest scope of the hit:** Silk Road is ground animals, not flight; arbitrage (buy low, sell
high), not a contract board; and nothing in it gates space on animal type. The brief's *specific
combination* (sky + capability gate + contract board) is still not occupied by it. What is refuted
is the sentence, not the game.

**Fix.** Rewrite the claim to what survives: "no Roblox game carries freight on a *flying* tamed
creature; animal-borne freight itself ships in Silk Road: Trading Simulator (3.4M visits, 84%
likes, launched 2026)". Add Silk Road to `05-OUTWARD.md`'s reference table as the nearest
creature-freight neighbour, and put the question to the developer: does the distinction still hold
if the freight half is occupied and only the sky-plus-gate framing is new?

---

### F2 · Capability-gated space is occupied in the medium, including the age band's most famous franchise · occupancy
**Severity:** blocks downstream

**Evidence.** The claim, in the strongest wording the brief uses:

- `CONCEPT.md:27-28` — "This is the distinction, and it is the one thing the landscape survey could
  not find **anywhere**."
- `00-CORE.md:37-39` — "**The map is gated on capability class.** A creature is a key. Nothing found
  gates space on what your animal can do".
- `research/landscape.md:92-93` — "Nothing found gates space on capability."
- `HANDOFF.md:45,49` — "Distinction lives in **capability gating** and **creature-borne freight**,
  nowhere else."

What I found:

- **Poké Ride** (Pokémon Sun/Moon, 2016). Bulbapedia, fetched
  <https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9_Ride>: "Ride Pokémon functionally take the
  place of HM-taught field moves"; "Tauros Charge: Allows the player to move quickly on land and
  smash through large boulders"; "Machamp Shove: Allows the player to move large blocks";
  "Lapras Paddle: Allows the player to surf across water"; "Charizard Glide: Allows the player to
  fly to places they have already been to." Which creature you summon *is* which space you can
  enter. This is the canonical implementation of "the creature is a key", and the HM lineage behind
  it is 25 years old.
- **Pokémon Scarlet/Violet** (2022). Koraidon/Miraidon's Dash, Swim, Glide, High Jump and Climb are
  each unlocked by a Titan and each opens map that was closed:
  <https://screenrant.com/unlock-fly-swim-dash-climb-jump-pokemon-scarlet-violet/>,
  <https://www.gamesradar.com/pokemon-scarlet-violet-koraidon-miraidon-abilities-surf-fly-glide-climb-jump-dash-path-of-legends/>.
- **Monster Hunter Stories 2** (2021).
  <https://gamerant.com/monster-hunter-stories-2-every-monstie-riding-action/> and
  <https://www.thegamer.com/monster-hunter-stories-2-wings-of-ruin-monstie-riding-action-ranked/>:
  "Each of your Monsties will know up to two Monstie riding actions… you'll need to keep the right
  Monsties in your party in certain areas to help navigate"; Jump crosses gaps, Climb scales vined
  walls, Swim reaches islands, Rock Breaker "can open up new paths or areas", Ground Dive digs
  through to new areas. Ridden creatures, swapped by capability, gating authored space. This is the
  brief's mechanism with the serial numbers still on.

**Why it matters.** The brief applies one evidentiary standard to the claim it killed and a
different one to the claim it kept. `00-CORE.md:29-33` disqualifies "each creature changes how you
travel" on the strength of Palworld — *not a Roblox game* — and `02-GAMEPLAY.md:42-44` states
outright that non-Roblox precedent shapes expectation: flight grammar copies Palworld's
"because that is the reference implementation players will have in their hands". By that same
standard, capability-gated space has a reference implementation players will have in their hands
too, and it is Pokémon. A 10–16 audience does not need it to be on Roblox to already own the mental
model. Four sheets, including the one everyone downstream reads, currently tell downstream agents
this mechanism is unprecedented; every derived decision that leans on novelty (the hook line, the
positioning note, the audience relocation) inherits a false premise.

**On-platform, the claim held up.** See *Checked and clean* for the seven Roblox candidates I tried
and what each turned out to gate on. The Roblox-specific version of this claim survived my
searches. That is the version worth keeping.

**Fix.** Scope every instance of the claim to Roblox and name the precedent: "on Roblox, nothing
found gates space on creature capability; off-platform this is Poké Ride / Monster Hunter Stories /
Pokémon SV, so the mechanism is familiar to the audience and only the platform instance is new."
Then put the real question to the developer: if the gate is a known mechanic and freight-by-animal
already ships on Roblox (F1), what is the differentiator?

---

### F3 · "Capability" names two incompatible systems, and the primary currency sink is one of them · contradiction
**Severity:** blocks downstream

**Evidence.** Read together:

- `02-GAMEPLAY.md:35-36` — "**The gate is binary, not a stat check.** A climb route is not 'hard
  without climb', it is impossible."
- `02-GAMEPLAY.md:16` — mechanics row: "| capability upgrades | core | see economy |"
- `02-GAMEPLAY.md:58-59` — the economy's only two sinks: "capability upgrades", "taming costs".
- `01-FOUNDATION.md:60` — loop step 5: "spend on capability, or tame a creature with a class you
  lack".
- `02-GAMEPLAY.md:74-75` — "**Within a class, creatures differ by cargo capacity and stamina, not by
  capability.** The class is the key; the creature is the grade of key."
- `03-META.md:13` — short-term objective: "acquire a capability class you do not have".
- `04-PRESENTATION.md:58` — "| `capability-upgrades` | 2 | the currency sink |".

If a capability is a binary key, there is nothing inside it to upgrade. If it is upgradeable, the
gate is a stat check. The two statements cannot both hold, and the brief needs both: the binary
reading is the differentiator, the upgradeable reading is half the economy and a named screen.
Neither of the two available escapes works as written — the things that *do* vary (cargo capacity,
stamina) are explicitly creature properties acquired by taming, not capabilities, and buying a
whole new class with currency collides with F8 and with taming being the stated route to a class
you lack.

Note also that `OPEN.md:107` leaves open only "Capability design — what the fourth class is", so
"capability upgrades" is presented downstream as settled, not open.

**Why it matters.** The linter flagged `capability` 45x across 7 sheets on no tagged line; this is
what that warning was pointing at. A systems designer cannot implement the sink, a UI designer
cannot fill `capability-upgrades`, and an economy designer has one of two faucet-sink pairs
pointing at a system the mechanics sheet forbids. This is the "one term, two concepts" failure the
verification stage exists to catch.

**Fix.** Split the word. Decide and name separately: (a) **class** — the binary key, acquired only
by taming, never bought; (b) whatever the currency sink actually is (creature stamina/capacity
grades? saddles? depot equipment?), under a different noun. Then re-derive
`02-GAMEPLAY.md`'s economy table, `04-PRESENTATION.md`'s screen list, and the monetization
prohibition, which currently uses "capability access" to mean both.

---

### F4 · The contract board both hides gated work and is required to show it · contradiction
**Severity:** blocks downstream

**Evidence.**

- `01-FOUNDATION.md:66-67` — "**How it closes:** step 5 changes which contracts on the board in
  step 1 are takeable. The board is **filtered by what you can physically fly**, so new capability
  visibly opens new work."
- `02-GAMEPLAY.md:12` — "| contract board | core | **the filtered work list**; the loop's entry
  point |"

against:

- `02-GAMEPLAY.md:114-117` — "Capability gating is **not** taught in the first minute — it is taught
  by **the second contract being untakeable, with the reason shown on the card**."
- `03-META.md:12` — session objective measurable: "board empty or **all remaining contracts
  ungated-out**".
- `04-PRESENTATION.md:71-72` — "**A filterable list.** The contract board is a list with a filter
  state (**takeable versus gated-out**), not a grid of tiles."
- `04-PRESENTATION.md:81-83` — accessibility hard constraint: "**A gated contract** is the core
  economic signal; a player who cannot read it cannot see the game working."

Three of the five statements require gated contracts to be present, visible and labelled with a
reason. Two require them to be filtered out. The differentiator's home screen is specified two
incompatible ways, and the loop's closing mechanism at `01-FOUNDATION.md:66-67` depends on the
filtered reading while onboarding, the session objective and accessibility all depend on the
visible reading.

**Why it matters.** This is the screen that carries the design ("the differentiator's home",
`04-PRESENTATION.md:56`). Whichever reading a builder picks, three other sheets become wrong. It
also changes the shape ui-forge is being asked for: a filtered list of takeable work is much closer
to `modal-grid` than a two-state list with per-item reason text (see F12).

**Fix.** One decision, stated once, in `01-FOUNDATION.md`: the board shows all contracts at the
depot, gated ones visibly disabled with the missing class named. Then correct
`01-FOUNDATION.md:66-67` and `02-GAMEPLAY.md:12` — "filtered" is the wrong word for what makes the
loop close; what closes it is a gated card becoming takeable.

---

### F5 · The session objective is unsatisfiable given the always-one-takeable rule, and the brief states the inverse · dead-end
**Severity:** blocks downstream

**Evidence.**

- `02-GAMEPLAY.md:65-67` — "**Known consequence — a stall state exists.** […] **Constraint on
  whoever designs systems: guarantee at least one takeable contract at all times, without adding a
  currency.**"
- `03-META.md:12` — session objective: "clear the contract board at your home depot | board empty
  or all remaining contracts ungated-out".
- `03-META.md:21-23` — "**Tuning burden:** the board must always contain at least one takeable
  contract, **or the session objective becomes unreachable** and the game reads as broken rather
  than hard. **This is the highest-risk tuning in the game.**"
- Repeated as the top open item: `OPEN.md:110`, `HANDOFF.md:57-58,66-68`.

The guarantee is what makes the objective unreachable, not what makes it reachable. If at least one
contract is always takeable, the board is never empty and never all-gated-out, so "clear the board"
can never be satisfied. `03-META.md:21-23` has the implication exactly backwards, and that inverted
sentence is the one carried into `HANDOFF.md` and `OPEN.md §4` as the project's highest-risk item.
`03-META.md:48` ("the board refreshes on a cadence") tightens it further: a rerolling board plus a
non-empty guarantee is an objective that is unreachable by construction, twice over.

**On the stall constraint itself, which the brief frames as the hard part:** it is satisfiable. The
player always owns at least one class (`02-GAMEPLAY.md:109`, they start on a creature), so
generation only has to keep one contract on the board matching an owned class — no second currency
needed. The constraint set permits a solution. The *pair* (guarantee + "clear the board") does not.
The brief has flagged the easy half as highest-risk and missed the impossible half.

**Fix.** Change the session objective to something a non-empty board can satisfy — "clear every
contract you can currently fly", or a per-session delivery count — and rewrite
`03-META.md:21-23` so the guarantee's actual consequence (the board is never empty) is stated
rather than inverted. Also decide whether wind can remove the guaranteed contract (F16).

---

### F6 · Priority 1 as scoped contains no working instance of the gate the design rests on · dead-end
**Severity:** blocks downstream

**Evidence.** Priority 1 is "region 1 · **two capability classes (glide, haul)** · four creatures ·
the contract board · the delivery loop · cargo condition · **wind** · guaranteed-takeable-contract
rule · own-avatar rider" (`03-META.md:77-80`). Priority 2 is "regions 2 and 3 · **the climb class**
· the fourth class · **day/night thermals** · route records · depot decoration"
(`03-META.md:82-84`).

Now the two priority-1 classes (`02-GAMEPLAY.md:30-32`):

- "| glide | long horizontal crossings **on thermals**, cheap stamina, **no lift** |"
- "| haul | **heavy or bulky cargo** other classes cannot lift at all |"

Three consequences:

1. **Glide's defining mechanism is deferred to priority 2.** Glide crosses *on thermals* and has
   *no lift* of its own; thermals arrive with day/night in priority 2. `03-META.md:92-94` asserts
   the split is safe — "thermals are a refinement that makes glide interesting. Anyone building
   region 1 should not need a day/night cycle to do it" — but the class table makes thermals the
   only thing glide has. A glide-gated route in region 1 has no lift source.
2. **Haul does not gate space at all.** It gates *payload*. The differentiator is stated as "the map
   is gated on capability class" and "gates space on what your animal can do"
   (`00-CORE.md:37-38`). Haul gates which cargo you may accept, which is a contract filter, not a
   spatial gate.
3. **The only class the sheets ever use to illustrate a spatial gate is climb** — "A climb route is
   not 'hard without climb', it is impossible" (`02-GAMEPLAY.md:35-36`), "vertical ascent past sheer
   faces" — and climb is priority 2.

So the first shippable version ships a payload filter and a lift-less glider into a region with no
thermals, and the spatial gate — the entire distinction, per `CONCEPT.md:25-28` — first appears in
priority 2. `05-OUTWARD.md:9` sells the game on "Every route needs the right animal" and
`04-PRESENTATION.md:56` calls the board "the differentiator's home"; neither is demonstrable in
priority 1.

**Why it matters.** Priority 1 is what gets built. A build made faithfully from this scope cannot
show the mechanic the brief exists to test, and the failure will read as "the gate isn't fun"
rather than "the gate wasn't in the build".

**Fix.** Either move climb into priority 1 (and one climb-gated route pair in region 1), or move
thermals into priority 1 and give glide a lift source that does not need a day/night cycle, or
re-author region 1 so glide's gate is horizontal reach from fixed high ground. Also restate the
gate's definition so haul's payload gate is not counted as a spatial gate. This is the same
decision `OPEN.md:130` already flags as untested — see F15.

---

### F7 · Glide has "no lift" while every creature ascends on held input · contradiction
**Severity:** fix before build

**Evidence.** `CONCEPT.md:44-45` and `02-GAMEPLAY.md:42-43` — "**Flight: hold to ascend, against a
stamina meter.**" Universal, with no class exception. Against `02-GAMEPLAY.md:30` — glide: "cheap
stamina, **no lift**". Either every creature can trade stamina for altitude (in which case glide's
"no lift" is false and glide's gate collapses into a stamina-efficiency difference, i.e. a stat
check, which `02-GAMEPLAY.md:35` forbids), or glide cannot ascend (in which case the control
grammar has a class exception nobody has written down, and the accessibility toggle at
`04-PRESENTATION.md:84-86` needs a defined behaviour for a creature that does not ascend).

**Why it matters.** Whoever tunes flight needs to know whether hold-to-ascend is universal. It also
decides whether the gate is binary in fact or only in intent — the binary-ness is the differentiator.

**Fix.** State the per-class flight verbs explicitly in `02-GAMEPLAY.md`'s class table: what each
class can do with held input, and what it physically cannot do at any stamina cost.

---

### F8 · Region access is currency-gated one step removed, while a currency multiplier is a permitted SKU · contradiction
**Severity:** fix before build

**Evidence.**

- `03-META.md:30-31` — "**Regions gate on capability class, not on level or currency.** You reach
  region 2 when you can physically fly there."
- `02-GAMEPLAY.md:54-59` — one currency; its only sinks are "capability upgrades" and "taming
  costs". `01-FOUNDATION.md:60` — you get a class you lack by taming, which costs currency.
- `03-META.md:61-62` — "**Allowed:** creature and rider cosmetics, depot decoration, **a currency
  multiplier, extra contract board slots**."
- `03-META.md:63-65` — "**Forbidden:** any paid capability class, paid creature that grants a class,
  paid route access… **A paid capability would put map content behind money**, which is the one
  thing the gating design cannot survive."
- Restated as binding-by-emphasis at `CONCEPT.md:58-59` and `HANDOFF.md:53`.

Classes are bought with currency, so regions *are* gated on currency, transitively — the sheet's
"not on level or currency" is false as written. And a purchased currency multiplier is therefore
paid acceleration of map access, which is what the forbidden-list's own rationale rules out. "Extra
contract board slots" is the same shape aimed at a different target: more slots is a higher chance
of a takeable contract, i.e. paid relief from the stall state the brief calls the design's worst
failure. The acknowledged tension at `03-META.md:70-72` is only "no obvious high-price SKU"; this
one is not acknowledged anywhere.

This is structurally the same defect the linter's `declined-then-allowed` check was built for (the
v2 relic-luck case: declined as an earned axis, allowed as a paid multiplier). It cannot fire here
because the collision is semantic rather than lexical.

**Fix.** Pick one. Either drop the currency multiplier and extra board slots, or restate the rule as
what it actually is — "no SKU grants a class directly; rate-of-earn SKUs are allowed and we accept
that they accelerate access" — and say so in `CONCEPT.md` and `HANDOFF.md` too, since both currently
carry the absolute version. Also correct `03-META.md:30`.

---

### F9 · The only cost failure has is a "contract fee" the economy does not contain · dead-end
**Severity:** fix before build

**Evidence.** `02-GAMEPLAY.md:132-133` — "**The cost is the contract fee.** Never currency already
banked, never a capability, never progress." Also `CONCEPT.md:49-50`. But the economy
(`02-GAMEPLAY.md:56-59`) has exactly one faucet ("delivering cargo, scaled by value and condition")
and two sinks ("capability upgrades", "taming costs"). No contract fee appears as a flow anywhere,
and `01-FOUNDATION.md:59` has payout "scaled by cargo value and condition on arrival", which
describes a *reduced payout*, not a forfeited fee.

Two readings, two different games: an **upfront stake** needs a balance check before a contract can
be taken, a confirm surface, and interacts with the stall state (a broke player cannot take work);
a **foregone payout** means failure costs only time, which sits badly against
`02-GAMEPLAY.md:137-138` ("A route has a real chance of going badly, and that is the tension the
loop runs on") given that stamina failure is explicitly free too (`02-GAMEPLAY.md:130-131`, "No
death, no respawn cost").

**Fix.** Decide whether taking a contract stakes currency. If it does, add it to the economy table
as a sink and say what happens to a player who cannot afford the stake. If it does not, delete the
phrase "the contract fee" and say plainly that failure costs the payout and nothing else — then
revisit whether the friction claim still holds.

---

### F10 · The starting creature and class are undefined, and are not listed as open · dead-end / authority
**Severity:** fix before build

**Evidence.** `02-GAMEPLAY.md:109-111` — "The player starts at a depot, **already on a creature**…
The first route requires **the class they already have**." `02-GAMEPLAY.md:118-119` — "**Requires a
guaranteed first contract** matched to the starting creature." Which class that is, is never stated,
and `OPEN.md:103-114` does not list it among the ten kinds of work left open.

**Why it matters.** It is load-bearing three times over: it decides the sixty-second onboarding
promise (`CONCEPT.md:63`), it is the floor the stall guarantee stands on (F5's solution needs the
player to own a known class), and it decides region 1's route mix. If the starting class is glide,
the first sixty seconds depend on the class F6 shows is non-functional in priority 1. This is
exactly the kind of gap the coverage audit cannot see, because the audit is per-inventory-item and
onboarding has a row.

**Fix.** Name the starting class in `02-GAMEPLAY.md` (haul is the safe answer given F6), or add it
to `OPEN.md §4` as an explicit open decision with its dependents named.

---

### F11 · Cargo manifests are the only sanctioned humour surface, and nothing establishes that surface · feasibility / dead-end
**Severity:** fix before build

**Evidence.** `01-FOUNDATION.md:39` — "| **humor level** | **dry and sparse, and only in cargo
manifests.** Nowhere else is funny: no system copy, no error, no tutorial, no store copy. No
creature name is a pun. |", reinforced at `01-FOUNDATION.md:46-48` and `CONCEPT.md:17`. No sheet
establishes a cargo manifest as a surface: `04-PRESENTATION.md:54-59` lists four screens and none is
a manifest, and the build stage's one pattern gives an item card exactly one text line plus a
numeric pill plus an optional badge (`ui-forge/src/compose/patterns/modal-grid.mjs:145-217` —
`children: [art, name, price]`, with `Name` a single `TextLabel` at 26px and `Badge` a 70×24
caption).

**Why it matters.** The tone decision restricts humour to one surface and that surface does not
exist. Downstream this resolves one of two bad ways: the writer puts the humour somewhere the tone
sheet forbids, or the game has no warmth anywhere, which `01-FOUNDATION.md:46-48` argues explicitly
against. This is the documented failure mode — a promised text surface the build stage has no field
for.

**Fix.** Either add a manifest surface to `04-PRESENTATION.md`'s screens (and accept it as a fifth
shape ui-forge cannot build), or specify that the manifest is a line of body text on the contract
card and check it against the pattern's fields, or move the sanctioned humour to a surface that
exists.

---

### F12 · `creature-roster` does not fit `modal-grid`, contrary to the sheet's own capability warning · feasibility
**Severity:** fix before build

**Evidence.** `04-PRESENTATION.md:61-63` — "The build stage currently produces only *centred
dismissible panels holding a grid of items* (`modal-grid`). `creature-roster`,
`capability-upgrades` and `cosmetics-shop` **fit that shape**." Checked against `npm run
capabilities` and the pattern source: an item card is art + one `Name` label + one price/CTA pill,
plus an optional 70×24 text badge and an absolute-positioned art overlay
(`modal-grid.mjs:145-217`, `86-110`, `112-143`). There is no subtitle, no description, no stat row —
in `artPlacement: 'beside'` the text column is literally `children: [name]` (`modal-grid.mjs:201`).

A roster card has to carry, per `02-GAMEPLAY.md:73-75`, the creature's **class**, its **cargo
capacity** and its **stamina** — three data points that decide which routes it opens. One name line
and a price pill cannot express that; the class could go in the badge, and then capacity and stamina
have nowhere to go.

**Why it matters.** The sheet's capability warning is otherwise the most useful thing in it, and it
is the reason the linter's capability check passes. Getting one of the three "fits" wrong means
interface work will attempt `creature-roster` in `modal-grid`, discover it does not fit, and
improvise — which is where visual variance re-enters, per the repo's own architectural rule.

**Fix.** Move `creature-roster` into the list of shapes the build stage cannot make (a stat list, or
a grid with a stat block per card), or reduce the roster card to name + class badge + one number and
say which number, explicitly, so the pattern's fields are enough.

---

### F13 · `clean-modern` is a dark cool-blue archetype; the brief describes it as warm and sunlit · feasibility
**Severity:** fix before build

**Evidence.** `CONCEPT.md:61` — "**Look.** `clean-modern`. Warm, sunlit, hand-painted, with a
legible logistics interface." `04-PRESENTATION.md:11-12` — "warm, sunlit, hand-painted skies over
legible hard-edged interface."

The key resolves (it is a real archetype, `ui-forge/src/theme/palettes.mjs:30-43`) but it is not
warm and not sunlit: `surface.base #1C2029`, `sunken #14171E`, `overlay #0E1015`, `content.primary
#F2F4F8` — light text on near-black — with `accent.primary #4F8DF7` (cool blue), `accent.secondary
#22C7A9` (teal), `gradientStrength 0.06`, `juice: 'low'`. The only warm, light archetype in the
table is `minimal-soft` (`#FBF7F4` / `#E8927C`), which the tone reasoning at
`04-PRESENTATION.md:19-20` implicitly rules out as cosy; `fantasy-ornate` is warm but is what both
incumbents look like (`04-PRESENTATION.md:21-22`).

**Why it matters.** `HANDOFF.md:72` hands the vibe key to stage 1 as the single carried value. What
renders will be a dark cool instrument panel. If that is intended, the words in two sheets are
wrong and whoever reviews the screenshots will report a mismatch against the brief. If the words are
intended, the key is wrong and no archetype satisfies them without token overrides, which the brief
does not name.

**Fix.** Keep `clean-modern` and rewrite the prose to describe it honestly ("cool, dark,
low-ornament instrumentation against a warm painterly world"), *or* keep the words and name the
token overrides that warm it (`color.surface.*`, `color.accent.primary`) so the reskin path is
explicit rather than inferred.

---

### F14 · The world has four regions, region 4 is out of the project, and the long-term objective is to open every route · dead-end
**Severity:** fix before build

**Evidence.** `CONCEPT.md:38` and `03-META.md:27` — "An authored archipelago, **four regions**."
`03-META.md:14` — long-term objective: "**open every route in the archipelago** | all routes flown
at least once." `03-META.md:86-88` — "**Priority 3 — explicitly not in this project:** **region 4**
· breeding · PvP racing…". Compounded by `03-META.md:53-55`, which reasons about the endgame as if
completion happens: "once every route is open, the long-term objective is complete and only mastery
remains."

Either the shipped world has three regions (and "four regions" is wrong in the two sheets that
state it as world fact, plus the roster's fourth class is held for a region that exists),
or the shipped world shows a fourth region that can never open, and the game's stated long-term
objective is unsatisfiable — with nothing said about what a player who has opened everything
available does next beyond "only mastery remains".

**Fix.** State the shipped region count as three and describe region 4 as post-project content, or
change the long-term objective to "open every route in regions 1–3". Then re-check the fourth
capability class, which `02-GAMEPLAY.md:26-27` holds back "so the second region has something to
open with" while `03-META.md:83` puts both in priority 2.

---

### F15 · The load-bearing scope split is an admitted untested assumption, and it is what F6 breaks · authority
**Severity:** fix before build

**Evidence.** `OPEN.md:130` — "| 7 | Wind is priority 1 and thermals priority 2 | scope |
**separable, but never tested as separable** | scope, world |". `03-META.md:90` presents the
ordering as decided — "[simulated: R4 Q5 — the ordering was posed as a decision and answered]" —
and `03-META.md:92-94` argues the split is safe. Per `HANDOFF.md:33,37-39`, no tag in this brief is
binding; every `[simulated]` is an `[I assumed]`.

**Why it matters.** The single assumption the brief itself marks as untested is exactly the one that
breaks (F6). Downstream is being handed a scope ordering with the authority of a decision and the
epistemic status of a guess. Lens E's point precisely: an exclusion list resting on an assumed
ordering is not the same as one resting on a choice.

Same pattern, smaller: `00-CORE.md:54` writes "[simulated: R1 Q4 — the split is assumed, **the band
was chosen**]" and `02-GAMEPLAY.md:45` then restates the device split with the caveat dropped.
Nothing was chosen by anyone; "chosen" inside a simulated tag will read as binding to a downstream
agent skimming for authority.

**Fix.** Put the wind/thermals separability to the developer as a real question, with F6 attached as
the reason it is not free. Drop "chosen"/"answered" language from `[simulated]` tags.

---

### F16 · Wind gives the board a second way to have nothing takeable, and the stall rule does not account for it · dead-end
**Severity:** worth knowing

**Evidence.** `03-META.md:34-35` — "Wind direction and strength change which crossings are viable.
**Some contracts are only takeable in some conditions.**" Wind is priority 1
(`03-META.md:79`). The stall state is defined only over capability and currency
(`02-GAMEPLAY.md:65-67`, `HANDOFF.md:57-58`): "A player with the wrong classes and no currency has
no takeable contract."

So the guarantee has to survive two independent filters, and only one is named. A player with the
right class and no currency can still face an all-gated board because the wind turned.

**Fix.** State whether the guaranteed contract is exempt from weather gating, and whether wind can
close a route mid-flight. One sentence in `02-GAMEPLAY.md`'s economy section.

---

### F17 · The survey misses the two nearest non-Roblox neighbours on the freight mechanic · occupancy
**Severity:** worth knowing

**Evidence.** `research/landscape.md:67-84` searches outside the creature family and finds
vehicle-logistics games. It does not find either of the two games closest to the loop as designed:

- **Mika and the Witch's Mountain** (Chibig, 2024). A flying courier game whose mechanics are the
  brief's, minus the creature: a delivery card of jobs, packages with condition ("hearts…
  restrictions like you can't get them wet or damage them"), **wind currents that "lift you up or
  provide a burst of speed"**, and upgrades that increase carry capacity and altitude — "Intimate
  knowledge of the island and its wind currents is extremely important."
  <https://www.thegamer.com/mika-and-the-witchs-mountain-best-brooms/>,
  <https://www.shacknews.com/article/142812/mika-and-the-witchs-mountain-review-score>. That is
  cargo condition, thermal lift, and capacity-upgrade progression already shipped as one design.
- **Death Stranding** — the reference implementation for weight-affects-handling and
  condition-on-arrival-scales-payout, which `01-FOUNDATION.md:59` and `02-GAMEPLAY.md:47` both make
  core. Not fetched; named because its absence from a freight survey is conspicuous.

Also noted while checking the naming constraint: **Dragon Courier** (Steam, app 2332040) —
"a courier for the Dragon Dispatch", unreleased, zero reviews. Weak as occupancy, but it supports
`05-OUTWARD.md:29-31`'s ruling that `dragon` is unusable.

**Why it matters.** By the brief's own Palworld standard, Mika is the reference implementation for
the *non-creature* half of the loop, and a player who has played it will find the wind and cargo
mechanics familiar. It also supplies the pacing number `01-FOUNDATION.md:72-74` says is
unsourceable: Mika's deliveries are minutes long and documented.

**Fix.** Add both to `05-OUTWARD.md`'s reference table with what they share and how this differs.

---

### F18 · The research declares a number unsourceable while naming a source it never tried · authority
**Severity:** worth knowing

**Evidence.** `research/landscape.md:100-103` — "Tried three source kinds on Delivery Not
Guaranteed… No route-duration figure obtained. **This is the number the whole loop rests on and it
remains open.**" `research/landscape.md:107-108` — "**No Rolimons fetch attempted for it**; visits
and CCU unknown". `01-FOUNDATION.md:72-74` escalates it to "**This is the number the loop rests on
and it is open.**"

I ran that fetch. <https://www.rolimons.com/game/105574679986189> — Delivery Not Guaranteed:
**6,199,598 visits · 73.7% likes (17,361 up / 6,184 down) · 67,752 favourites · all-time peak CCU
2,124 · average playtime 22 minutes · 24 max players · launched ~1 year ago.** Silk Road's average
playtime is 66.9 minutes (F1).

**Why it matters.** Average playtime is not per-route duration, but 22 minutes for the closest
sky-freight neighbour is a real anchor and it corroborates the 15–25 minute session band at
`00-CORE.md:56`. Two other things fall out that the sheets should carry: the nearest neighbour sits
at 6.2M visits and a **73.7%** like ratio, which is weak — useful evidence for the audience bet
`00-CORE.md:51-53` makes toward the logistics audience, and a 270× scale gap against the incumbent
the brief walked away from.

**Fix.** Add the Rolimons figures to `research/landscape.md` and close that unverified item. Keep
per-route duration open, but say what the session-length proxy is.

---

### F19 · Genre is stated as a value outside the pipeline's closed vocabulary · feasibility
**Severity:** worth knowing

**Evidence.** `00-CORE.md:64` — "**Delivery / logistics, with a creature surface.**" The closed
vocabulary at `concept/src/vocab.mjs:58-81` (`GENRES`, 22 keys, surfaced to the skill by
`npm run concept:vocab`) has no delivery or logistics entry; the nearest are `tycoon`,
`story-adventure`, `survival`, `racing`. `concept/src/validate.mjs:36` validates
`genre.primary` against it, allowing only an explicit `custom:` escape
(`vocab.mjs:20-34`), and `GENRE_VIBE_DEFAULTS` (`vocab.mjs:88+`) therefore has no entry, so a
genre-derived vibe would fall through to `clean-modern` by default
(`concept/src/derive/game-context.mjs:116`).

Low impact today because no bridge from the sheets exists (`HANDOFF.md:72-73`) and the brief names a
valid vibe key directly, so the fallback and the choice coincide. It matters the moment anyone
writes the bridge.

**Fix.** Either mark the genre as `custom:delivery / logistics` in the sheet so the escape is
explicit, or add a `logistics-delivery` key to `GENRES` with a vibe default. The loop verbs and
mechanic kinds the brief needs are all in vocabulary (`deliver`, `complete`, `unlock`, `spend`,
`upgrade`; `movement`, `vehicle`, `companion-pet`, `economy`, `progression`), so genre is the only
off-vocabulary value.

---

### F20 · Smaller inconsistencies · contradiction
**Severity:** worth knowing

- **Control budget understated.** `02-GAMEPLAY.md:40` — "**Input: movement plus one context
  button** (load / drop / interact)" — but flight needs a hold-to-ascend input
  (`02-GAMEPLAY.md:42`) and accessibility requires a toggle alternative to it
  (`04-PRESENTATION.md:84-86`). That is at least two buttons plus a mode toggle on a phone.
- **Priority-1 roster arithmetic.** `02-GAMEPLAY.md:23,73` fix "three creatures each, twelve
  total"; `03-META.md:78` ships "two capability classes (glide, haul) · **four** creatures", i.e.
  two per class. And `04-PRESENTATION.md:57` justifies the priority-1 `creature-roster` screen as
  "four classes, twelve creatures", which is the priority-2 roster.
- **Waypoints appear once and nowhere else.** `03-META.md:11`'s moment objective is "reach the next
  waypoint without losing altitude you cannot recover"; no sheet establishes a waypoint system, and
  `OPEN.md §4` does not list one.
- **"Board slots" are monetized before board size exists.** `03-META.md:61-62` sells "extra contract
  board slots"; nothing states how many slots a board has.

**Fix.** Four one-line corrections. None blocks anyone, all will be asked about.

## Checked and clean

**Occupancy — capability-gated space on Roblox specifically.** The claim survived. What I tried, and
what each turned out to gate on:

- **Dig It** — fetched the brief's own citation
  (<https://www.thegamer.com/roblox-dig-it-mounts-unlock-guide/>): "there is no text stating that
  mounts are required to access, enter, cross, or reach any areas". Seal "can float on water",
  Dragon "a unique ability to fly", neither required for access. The brief's characterisation at
  `research/landscape.md:93` is accurate.
- **Catch and Tame** (Update 15, "Dragon Island & Underwater") — gates on *gear*, not creature: "you
  need to purchase an oxygen tank and fins", "unlock the secrets of Dragon Island with Fly
  Potions". Not capability gating.
- **Creatures of Sonaria** — the Aquatic Realm is "specifically made for Aquatics and Semi-Aquatic
  species", which is suggestive, but the one source I could fetch describes ecology, not access
  rules: "these describe ecological preferences and advantages rather than access restrictions
  based on movement type". Unresolved, see below.
- **Dragon Adventures** — its Ocean world "could originally be unlocked by purchasing it for 65,000
  Coins", i.e. currency-gated, which supports `00-CORE.md:38` ("incumbents gate the reward on the
  area"). The brief's own unverified item at `research/landscape.md:104-106` stands.
- **Loomian Legacy** — searched for HM-style field moves and a surf gate across the wiki, forums and
  a video guide; found a "Samarine mount saddle" for surfing but no confirmable area gate.
- **Wild Horse Islands**, **World // Zero**, **MOUNT RNG**, **Evomon** — no capability-gated space
  surfaced. Evomon's flying mount comes from a boss and "transforms your overall move across all
  maps", which is movement, not access.
- **Silk Road: Trading Simulator** (F1) — animals differ by cargo slots and speed, not by where they
  may go. No spatial gate.

**Terms.** `freight / cargo / contract / depot / route` — refuted in part by F1 (a creature game on
Roblox uses this vocabulary now). `dragon` and `mount` unusable — supported, and further supported
by an unreleased Steam "Dragon Courier". `contract board` as a game's signature surface — searched,
nothing; the search was polluted by Roblox developer-contract results, so treat that as weak.
`capability` — no game-signature usage found, but see F3, where the problem is internal rather than
external.

**Feasibility, verified against source rather than the registry summary.** `clean-modern` is a real
archetype key (`palettes.mjs:30-43`) — the vibe contract holds, with the caveat in F13. `modal-grid`
is the only pattern (`npm run capabilities`, one entry), and the three shapes
`04-PRESENTATION.md:65-75` says cannot be built (persistent flight HUD, map/route view, filterable
list) genuinely cannot: nothing in the registry has a non-modal root, and the pattern's root is a
full-screen `Backdrop` with a centred `Panel` (`modal-grid.mjs:396-439`). That disclosure is
accurate and it is why the linter's capability check passes. Worth knowing for planning: the HUD and
the map are named in prose only and are not rows in the screens table, so a reader working from the
table alone will build four screens and never see them.

**Loop closure.** Steps 1→5 do close (`01-FOUNDATION.md:54-67`), subject to F4's ambiguity about
what the board shows. **Objectives** are individually measurable; two are unsatisfiable (F5, F14).
**Integrity** (`04-PRESENTATION.md:98-106`) is coherent and correctly identifies capability
ownership as an authorization boundary rather than cosmetic data. **Social model, chat and
moderation** are consistent across `CONCEPT.md:41-42` and `02-GAMEPLAY.md:87-97`, and the
no-trading rationale is sound and consistent with the gate. **No placeholders** anywhere.
**No declined-then-allowed collisions** beyond F8, which is semantic and outside the linter's reach.
**Audit table** is complete and honest about itself (`OPEN.md:45-55`), and its self-criticism —
"The audit is passing a test the brief should fail" — is correct.

## Could not verify

- **Whether Silk Road: Trading Simulator's animals are ridden or led, and whether cargo capacity is
  strictly per-animal.** All three fandom mirrors return HTTP 402 to direct fetch; my quotes are
  search-index text from two independent mirrors plus corroborating store copy and gamepass names.
  Settles it: fetch `srtsimulator.fandom.com/wiki/Animals` or
  `roblox-silk-road-trading-simulator.fandom.com/wiki/Riding_animals` with a client that gets past
  the 402, or watch <https://www.youtube.com/watch?v=BZ5u-WGI2xU> ("Beginners Guide to Roblox Silk
  Road Trading Simulator") for the loading and travel loop. Note this does not change F1's severity:
  animal-borne freight with per-animal capacity and a capacity upgrade is confirmed either way.
- **Whether Creatures of Sonaria's Aquatic Realm is access-restricted by species movement type.**
  If it is, F2's Roblox-side claim weakens too. Settles it:
  `creatures-of-sonaria-official.fandom.com/wiki/Aquatic_Realm` (402 for me), or the in-game
  realm-select UI in any current Aquatic Realm video.
- **Evomon's flying-mount gating.** <https://progameguides.com/roblox/complete-evomon-progression-guide/>
  returned 403. Settles it: that page via another client, or the Evomon wiki's region list.
- **Per-route duration in any sky-freight game.** Still genuinely open. Average playtime (22 min for
  Delivery Not Guaranteed, 67 min for Silk Road) is a session proxy, not a route length. Settles it:
  a timed playthrough of one Delivery Not Guaranteed contract, or Mika and the Witch's Mountain
  delivery timings from a speedrun page.
- **Whether Dragon Adventures has any capability-gated biome.** Currency-gating is now sourced;
  capability-gating is still absence-of-evidence across four sources. Settles it:
  `dragon-adventures.fandom.com/wiki/Ocean` (402) or `dragon-adventures.wiki/worlds/`.
