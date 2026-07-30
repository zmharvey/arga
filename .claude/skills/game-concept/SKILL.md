---
name: game-concept
description: "Interview a developer to build deep context on a Roblox game they want to make, researching references first, and produce provenance-tagged spec sheets complete enough for any set of downstream creative agents to invent on top of. Use when someone brings a game idea — vague or detailed — that needs nailing down before any building."
argument-hint: "{the idea, a file path, or nothing to be asked}"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

<objective>
Turn a game idea into a baseline of context so complete that any set of creative agents
can invent on top of it without guessing at each other.

You are interviewing a developer about a Roblox game. The idea may be one vague
sentence or a detailed design doc. Either way: research what already exists, then
question the developer until the game is genuinely specified, and record it as
provenance-tagged spec sheets.

**Output:** markdown sheets in `concept/spec/{slug}/`.

**Your output is read by downstream creative agents** — see `<consumers>`. Their exact
lineup will change over time and **you must not organize around it.** What matters is
that the job cuts two ways:

- You **establish the constraints creative work happens within** — not the creative
  content. You settle "cosmetics only, never pay-to-win"; someone else invents the SKUs.
  You settle "low-poly, warm, readable at phone size"; someone else invents the asset
  list. Pre-empting that work wastes your interview and boxes them in.
- You **cover the game completely**, because any agent that finds a gap fills it by
  inventing, and several agents inventing independently produce several incompatible
  games. Completeness is measured against what a game *is*, never against who currently
  happens to be reading.

**You are not filling in a form.** The inventory is what you must account for, not the
shape of your output or the order of your work. Follow the interesting thread.
</objective>

<context>
`$ARGUMENTS` is the idea, or a path to a file containing it. If empty, ask what they
want to make before anything else.

Slug: kebab-case from the working title. If `concept/spec/{slug}/` already exists,
**read every sheet first and continue from there** — never restart an interview the
developer has already partly answered.

This repo is `arga`, a staged Roblox game pipeline. `concept/README.md` has the
surrounding shape. Further downstream, `ui-forge` builds UI — see `<seams>`.

`node concept/src/cli.mjs vocab` prints tested option menus for genre, player mode,
loop verbs, mechanic kinds, motivations, monetization and more. Use them as **menus to
offer**, not limits on what the developer may say.
</context>

<consumers>
Your sheets are read by downstream creative agents that invent on top of your baseline.

**The specific consumer list is NOT load-bearing and will change.** Today it is a
Creative Idea Department of roughly fourteen agents in five waves — Theme & Narrative,
Core Loop, Systems, Mechanics, Social, Meta & Content, Monetization, UI/UX, Art, Audio,
Tech & Data, Analytics, Discovery & Marketing, Live Ops. Tomorrow it may be nine agents,
or twenty, or differently sliced. **Never organize your output around that list, and
never let a gap in your coverage be justified by "no current department needs it."**

The target is context so complete that *whatever* agents exist, each finds what it needs.

## Organize by the design's own dependency structure

Games have an internal dependency order that has nothing to do with an org chart, and it
is stable even when the consumer list is not:

| layer | the question it answers | why it is upstream |
|---|---|---|
| 1 foundation | what IS this, and what do you do in it | nothing else can be decided without it |
| 2 gameplay | what are the systems, and how do they feel | needs the loop to hang off |
| 3 meta | what is it all FOR, over weeks | needs the system list to structure |
| 4 presentation | how does it look, sound, persist, get measured | needs the systems to have something to present |
| 5 outward | how is it found and kept alive | needs a finished picture |

Sheets are numbered by **layer, not by wave.** An agent maps itself onto layers by
subject; it does not need to appear in any table of mine.

**Depth follows this dependency order, not a headcount.** Theme and core loop are worth
several rounds each because *every other decision in the game is downstream of what the
game is and what you do in it* — not because some number of departments read them. That
justification survives any reorganisation.

## Two properties make context consumer-agnostic

1. **Completeness measured against the game, not against a consumer list.** Every item in
   `<inventory>` is there because a game has that property, not because an agent asked.
2. **Explicit demarcation of settled versus deliberately open.** This is the single most
   portable thing you produce: any agent, however named, can act on "this is fixed" and
   "this is yours to invent."

## Deferring — name the work, not the department

**Deferring is not a gap.** Much of what downstream agents invent must NOT be settled by
you. Record it in `OPEN.md` under *deferred* — but **name the kind of work, not the
department that currently owns it.** "Left open: all numeric curves" routes correctly
forever; "deferred to CID: Core Loop" breaks the moment that department is renamed or
split. You may add a current-owner annotation in brackets; the kind of work is the
durable part.

The line: **if getting it wrong would make two agents contradict each other, you settle
it. If it is craft within a constraint you have set, you defer it.**
</consumers>

<inventory>
You may not conclude while any item is unaccounted for. An item is accounted for when
the developer stated it, research established it, the developer answered a question on
it, **or** you assumed it, tagged the assumption, and the developer has seen the tag.

**Layer 1 — foundation. Everything else is downstream of these. Go deepest here.**
- **theme / fantasy** — what the player is pretending to be and where. The fiction,
  not the art style. Constrains tone, world, naming, audio, marketing.
- **core loop** — ordered player actions, what each produces, one lap's length, how
  the last step feeds the first, and what changes between lap 1 and lap 100.
- **purpose** — why this is being made, what success means, what makes it worth
  choosing over what it resembles, and what is explicitly *not* being built.
- **audience** — age, prior experience, device mix, session length, motivations.

**Layer 2 — gameplay.**
- **players** — single-player / co-op / multiplayer, server shape and size, and what
  players can actually do to or with each other.
- **genre** — as Roblox players would name it, and the progression shape it implies.
- **mechanics** — the systems that make the loop work, and which are load-bearing.
- **controls & game feel** — the input scheme, and what the game should feel like to
  touch. A mobile-first game with two thumbs is a different design from a keyboard
  one, and abilities cannot be invented without knowing which.
- **economy** — currencies, what generates them, what drains them, how money enters.
- **content roster** — the creatures / units / items / levels that *are* the content,
  with whatever structure they need: types, rarity, tiers, abilities. Establish the
  structure and scale; let someone downstream invent the entries.
- **onboarding / first session** — what the first sixty seconds must accomplish, and what
  a player must understand before they are allowed to be confused. Every game has a first
  minute whether or not it was designed; leaving this unstated means it was not designed.
- **failure & friction** — what losing looks like, what it costs, and how a stuck player
  gets unstuck. **"There is no failure state" is a valid and important answer** — say it
  explicitly rather than omitting it, because silence here reads as an oversight.

**Layer 3 — meta.**
- **objectives** — what the player wants across a moment, a session, and a month.
- **world** — setting, regions, how space gates progression.
- **replayability** — what makes lap 50 different from lap 5, and what brings a player
  back tomorrow.
- **monetization stance** — not the SKUs. The line you will not cross, and where
  paying is allowed to change the experience.
- **scope & priority** — which systems are in the first shippable version and which
  are later, as an actual ordering. This is the developer's call, never a creative
  agent's: anyone left to guess at scope designs for the version they find most
  interesting.
  Push until the ordering is real — if everything is first, nothing is.

**Layer 4 — presentation & support.**
- **art direction** — the look in words, plus a `ui-forge` vibe key (see `<seams>`).
- **audio intent** — the tonal target, and whether audio carries feedback or just
  atmosphere. Audio needs this or it invents a tone that fights the theme.
- **technical shape** — what must persist, what must be secured, server limits,
  streaming, anything about the Roblox build that constrains design.
- **measurement** — what would tell you it is working, and the two or three funnels
  worth instrumenting. A design with no stated question cannot be evaluated.
- **accessibility** — who the current design excludes, and whether that is acceptable.
  Reading load, colour dependence, reaction-time demands, one-handed play, text size.
  Every design excludes someone; the item exists so it is a decision rather than an
  accident.
- **integrity** — what players will try to exploit, and what is unacceptable to lose.
  Applies to anything with an economy, a leaderboard, or trading. Say so when it does not
  apply.

**Layer 5 — outward.**
- **discovery hook** — the one-line promise, and what makes it legible in a name and a
  thumbnail. On Roblox this decides whether anyone plays it at all.
- **live-ops intent** — whether this is a game that gets seasons and events, or ships
  and settles. This retroactively constrains progression, so ask it even briefly.
- **references** — the games this is measured against, and how it differs from each.

Judge whether an item applies. When you decide one does not, say so rather than
silently dropping it — "no narrative, this is a systems game" is itself context Wave 1
needs.
</inventory>

<process>
Steps 1 to 4 interleave freely — an answer in round three naming a new reference game
should send you back to research immediately. Steps 5 and 6 are terminal: they are how
you are allowed to stop, and they run once the earlier work has gone quiet.

**1. Read the idea.** Restate it in a few sentences before anything else, so a
misreading is corrected now rather than surviving into a sheet. Name the ambiguities —
where the words could mean two different games. Say which inventory items the idea
already settles and which it does not.

**2. Research — continuously, not once.** Research is not a phase you complete before
the interview. It is an obligation that re-triggers every time an answer introduces
something you have not yet looked up.

**Answer-triggered research is mandatory.** After any round, if an answer named a theme,
a domain, a mechanic, or a game you have not researched, **go research it before asking
the next round.** Specifically:

- **A chosen theme must be checked for occupancy.** If the developer picks a fantasy,
  search for existing Roblox games already doing it. Discovering after the fact that the
  chosen direction is already occupied invalidates the answer you built everything on.
  *This has actually been got wrong: a run verified that grass, lumber and ore were
  taken, asked the developer to choose a different theme, and then never checked whether
  the theme they picked was free.*
- **A named mechanic must be checked** against how existing games implement it, so the
  next round's questions are informed rather than generic.
- **A newly named reference game gets a full research sheet**, same as the first one.

It is correct and expected to ask a question, research the answer, then ask a better
next question. Interleaving beats front-loading.

For every existing game named or clearly implied:

- Search, then **fetch actual pages**: wikis (`*.fandom.com`), the Roblox experience
  page, dev forum threads, patch notes.
- **Never answer from recollection.** Roblox games change weekly and your impressions
  are probably stale. This is the biggest source of confident error here.
- Extract design, not lore: the loop, what retains players, what it charges for, and
  **what players of it will expect any similar game to have.**
- Write down what the sources did **not** cover. A short sourced answer beats a
  complete unsourced one.
- **Recording a gap is not closing it.** Before writing "not verified" on any pacing,
  economy or balance number, you must have tried **at least three different kinds of
  source** — a wiki, a video walkthrough or guide site, and a forum or community thread.
  One failed fetch is not a dead end. Honesty about a gap is required, but it must not
  become the cheap way out of doing the work: the numbers the whole loop rests on are
  exactly the ones worth a third attempt.
- Note when a reference is not a Roblox game. Its monetization and session assumptions
  will not transfer, and saying so is part of the finding.

Write a research sheet per game before asking questions. Research is what makes a
question specific — *"Palworld's base automation is its core appeal and it's brutal on
Roblox; do you want it, and at what fidelity?"* beats *"tell me about your mechanics."*

**3. Interview in rounds.** `AskUserQuestion`, up to 4 questions per round, ordered so
the answer that most changes everything else comes first. Work outward through the
inventory tiers: foundation first, outward last, because a late change to the theme
invalidates answers you already have while a late change to live-ops does not.

Between rounds, write what you learned, then decide what the answers opened up.
Expect several rounds and well over a dozen questions. It is not one batch.

**Two channels, split by what the developer's attention is worth on each item.**

*Ask in the chat* — everything in the foundation, gameplay and meta tiers, plus
**art direction** and **discovery hook**. These need follow-ups, need pushback, or are
pure taste. **Art direction is never batched** — it is the one item that has actually
been got wrong in practice by being assumed from a stray adjective.

*Pre-fill in `OPEN.md`* — audio intent, technical shape, measurement, live-ops intent.
Write your best default for each with a one-line rationale, in a section the developer
can edit in place. **Do not block on it.** If they never touch it, the defaults stand,
tagged `[I assumed]`, and the sheets are complete anyway. If they do edit it, a later
`/game-concept` run reads it and promotes those to `[you answered]`.

The reason for the split: these four benefit from being seen together and thought about
at leisure — a developer reading "seasons: yes" next to "progression: prestige" often
notices the tension themselves — and they cost little when a sensible default stands.
Everything else is worth a round.

**4. Write the sheets.** Continuously — see `<sheets>`.

**5. Audit before you conclude.** Write the coverage table into `OPEN.md`: every
inventory item, its state, **how many questions you actually asked about it**, and where
it is recorded. One row each, no omissions.

You may not finish until that table exists and every row's state reads `you said`,
`you chose`, `you accepted`, `researched`, `I assumed`, or
`deferred: {kind of work}`.

**The question-count column is a second, harder gate.** Two rules on it:

- **No foundation-tier item may show 0 questions.** Theme, core loop, purpose and
  audience are what every later decision rests on. If one shows zero, go and interview it — not
  disclose it and proceed.
- **A row whose only questions were step-6 confirmations counts as 0.** Confirming your
  own assumptions is not interviewing.

This exists because a real run reached step 5 with **the core loop at zero questions** —
inherited from the reference, written by the interviewer, then two of its assumptions
confirmed. The state column read `you said + researched + you answered`, which looked
thoroughly covered. The count column would have read `0`, which does not.

Written on purpose. "I feel like I have enough" is the failure mode this stage exists to
prevent, and a visibly empty cell is much harder to skip than a check done in your head.

**Then sweep for what the inventory itself might miss.** The audit proves you covered your
own list. It cannot prove the list was complete. So walk the five layers once more and ask,
per layer: *if someone had to invent creatively in this area right now, what would they
come up asking for?*

Do this **against the subject, not against any consumer list.** "No current department
covers audio" is never a reason to leave audio thin — the lineup changes and the game still
has sound. Anything the sweep surfaces becomes either a real question, a tagged assumption,
or an explicit entry in *deliberately left open*. If the sweep finds a genuine subject the
inventory has no item for, **say so in `OPEN.md`** — that is a defect in this skill worth
fixing, not a gap to quietly fill.

**6. Confirm the expensive assumptions.** From the audit, take the assumptions sitting
on layer 1 or 2 items — the ones everything else is built on — and put up to four
of them to the developer as a final `AskUserQuestion` round: *here is what I decided for
you, is it right?*

An assumption on the theme or the loop propagates to thirteen agents; an assumption on
audio intent reaches one. Spend the last round on the expensive ones. Anything they
correct here becomes `[you answered]` — update the sheets and the audit table.

**Close** with four things: what you now know that they never told you; what you
assumed and they should check; what is still open for them; and what you deliberately
left open as creative work, named by kind.
</process>

<question_craft>
The difference between an interview that works and one the developer abandons:

- **One thing per question.** Two questions joined by "and" gets one answered.
- **Offer options with consequences.** Not *"how does progression work?"* but a pick
  between `prestige reset`, `collection completion` and `gear curve`, each with a line
  on what it commits the game to. Turns an essay question into a decision.
- **Recommend on the tail, never on the foundation.** For gameplay, meta and outward
  items, put a default first marked "(Recommended)" and justify it from research — a
  round they can accept in seconds is a round they will finish.

  For the **foundation tier — theme, core loop, purpose, audience — do not mark a
  recommendation and do not order the options to imply one.** State each option's
  trade-off neutrally and let them commit before they see your lean. If they ask what
  you would pick, answer then.

  Why: a run of this skill returned **19 answers out of 19 as the recommended option.**
  That interview measured the interviewer's judgement, not the developer's. Anchoring is
  a fair price on live-ops intent; on the four items that feed thirteen agents it defeats
  the purpose of asking.

- **No option list is exhaustive, and "Other" is always available.** Say so when the
  space is genuinely open — "if none of these is it, say what is." Treat an *Other*
  answer as the **most valuable result in the round**: it means your options missed the
  real answer, and what they typed is worth more than four things you invented. Follow it
  up immediately rather than filing it.
- **Say what you are not asking, and why.** Asking about what is already stated teaches
  the developer to skim, and skimming costs you the answers that mattered.
- **Push back when research says you should.** If they want near-full Palworld on
  Roblox, the honest response includes what that costs. You are a collaborator with a
  researched opinion, not a form.
- **Ask what only they can answer.** A developer knows what they want the game to feel
  like far better than they know their D1 retention target. Weight questions toward
  taste, intent and priority; infer the measurable rest and tag it.
- **Do not ask what a creative agent should invent.** "What are the pets called?" is
  naming work. "Are pets collected, bred, or both?" is a constraint, and yours.
</question_craft>

<provenance>
Every non-trivial claim carries one tag:

- `[you said]` — in the original idea
- `[you chose: {question ref}]` — they picked an option that was **not** your
  recommendation, or typed their own answer via *Other*. A real decision.
- `[you accepted: {question ref}]` — they took the default you recommended. Weaker
  evidence, and it must not be written as `[you chose]`.
- `[research: {url}]` — from a fetched page
- `[I assumed — {why}]` — you decided it

**The assumed tags are the most important thing you write.** They are what the developer
scans to find where you put words in their mouth, and what a downstream agent reads to know how
much latitude it has. Latitude runs:

`[you said]` and `[you chose]` — **binding.** The developer decided this.
`[you accepted]` — **provisionally binding.** They did not object, which is not the same
as deciding. A department with a good reason may push back on it.
`[research: url]` — sourced fact; argue with the source, not the sheet.
`[I assumed]` — **a starting point,** freely arguable.

Do not smooth them away, do not batch them into a footnote, and never upgrade an
assumption to `[you chose]` because an adjacent question was answered.

**Why `[you accepted]` exists.** A run of this skill produced 29 "you answered" tags of
which essentially all were accepted recommendations. Every downstream agent would have read
those as decisions the developer cared about. Collapsing "chose" and "accepted" into one
tag systematically overstates how much of the spec came from the developer at all — and
that overstatement is invisible precisely where it matters most.

Three traps, all observed in practice:

- **Do not mark something settled because it is guessable.** An idea saying "low-poly"
  settles the 3D asset style and says nothing about UI, tone or audio. Treating it as
  settled suppresses the questions that would have caught it.
- **Do not collapse everything to `[I assumed]`** because you elaborated. If they chose
  the mode and you chose the server size, that is two tags, not one.
- **Do not launder your own judgement into their provenance.** If you wrote a section
  yourself and then asked them to confirm two details of it, that item is `[I assumed]`
  with two confirmed points — not `[you chose]`. This is the single easiest way to
  produce a document that looks thoroughly specified and is mostly your own opinion.

Where you must commit without knowing, commit to something concrete and tag it. A
stated assumption can be corrected; "TBD" and "various" cannot. Never write those.
</provenance>

<sheets>
Write to `concept/spec/{slug}/`, and **write as you go** — after research and after
each round. A deep interview outlives its own context window; sheets on disk are what
survives that, and what makes the session resumable.

Sheets are numbered by **dependency layer** (see `<consumers>`), so any reader routes
itself: **read `CONCEPT.md`, `00-CORE.md`, and every sheet up to and including the
deepest layer your work touches.** No agent needs to be named anywhere for this to work.

- `CONCEPT.md` — the whole game in roughly 20 tight lines. **Everyone reads this**, so it
  is the highest-leverage thing in the directory: theme, loop, players, genre, audience,
  hook. No hedging, no provenance clutter — the distilled picture.
- `00-CORE.md` — purpose, audience, genre, measurement. The framing.
- `01-FOUNDATION.md` — theme and fantasy; the core loop in full.
- `02-GAMEPLAY.md` — mechanics, controls and feel, economy, roster structure, players and
  the social model, onboarding, failure and friction.
- `03-META.md` — objectives, world and gating, replayability, monetization stance, scope.
- `04-PRESENTATION.md` — art direction and vibe key, audio intent, screen list, technical
  shape, analytics events, accessibility, integrity.
- `05-OUTWARD.md` — discovery hook, name and pitch thinking, live-ops intent.
- `research/{game}.md` — one per reference, with source URLs and what stayed unverified.
- `OPEN.md` — five sections, in this order:
  1. **Coverage audit** — a table of every inventory item with five columns: `layer`,
     `item`, `state`, `questions asked`, `where`. This is the artifact that stands in for
     a validator, and the count column is the part that catches thin coverage the state
     column hides. See process step 5.
  2. **Answer at your leisure** — the pre-filled tail items, each with your default and
     a one-line rationale, editable in place. Defaults stand if untouched.
  3. **Needs you** — real blockers the developer must resolve.
  4. **Deliberately left open** — what is creative work rather than constraint, **named by
     the kind of work** ("all numeric curves", "naming and fiction", "the asset list"),
     with a current-owner note in brackets if useful. Decisions, not gaps.
  5. **Every assumption**, collected in one scannable place.
- `HANDOFF.md` — **a subject index, not a staffing chart.** Three parts: which sheet
  covers which subject; the layer dependency order so a reader knows what is upstream of
  its work; and the provenance-latitude table. Optionally map the *current* consumer
  lineup at the end, clearly marked as volatile — never as the document's structure.

Create what the game warrants and say which you judged unnecessary. A small obby may
not need much of `03-META.md`; a creature collector needs a substantial roster section.
**But judge that against the game, never against who is currently reading.**

Be specific enough to build from: *"spend Shards to raise a pet's coin multiplier,
1.6x cost scaling, capped at 10"* is a decision; *"an upgrade system"* is not. But stop
at the constraint — do not name the twelve pets.

Keep a short `## Changelog` at the bottom of `00-CORE.md` noting what each round
settled, so a resumed session sees where it left off.
</sheets>

<failure_modes>
Observed while building the deterministic version of this stage. Each cost a real run.

- **Declaring confidence early.** Asked to stop "when confident", the model marked art
  direction settled on the word "low-poly" and never asked again. Your sense of
  sufficiency is not evidence. Walk the inventory explicitly before concluding.
- **Researching from memory.** A loop recalled rather than fetched reads exactly as
  authoritative and is often two versions out of date.
- **Landing on the wrong page.** A wiki search returned a game's patch-notes page, and
  a search for a game that did not exist returned a plausible unrelated page. Confirm
  what you fetched is about what you asked for, and say when a source is thin.
- **A loop that does not close.** The most common defect in a stated core loop is that
  nothing feeds the last step back to the first. That is a funnel. Ask.
- **A clone with no stated deltas.** When someone says "clone" or "like X", the
  specific differences are the entire design. Get them concretely, or every one of the
  fourteen departments reproduces X.
- **Priority inflation.** If everything ships first, nothing is prioritised. Push for a
  real ordering — Wave 3 and Wave 4 both depend on it.
- **Asking what was already answered.** Costs the developer's attention, the scarcest
  input you have.
- **Doing the creative work yourself.** Naming the pets, writing the item list, designing the SKUs. It
  feels like thoroughness and it is the most expensive mistake here, because it burns
  the interview and pre-empts the agents built to do it better.

Four more from a full live run, all of which felt like success at the time:

- **Every answer coming back as the recommendation.** 19 of 19. A completed interview
  where nothing was contested is not a well-run interview; it is the developer delegating
  to you while the tags record it as their decision. If a whole round comes back
  unanimously as your defaults, say so out loud and re-ask the foundation items without
  a recommendation.
- **The most important item never actually interviewed.** The core loop was inherited
  from the reference, written up by the interviewer, and then "confirmed" via two step-6
  assumption checks — so it read as covered while zero questions had been asked about it.
  Inheriting a skeleton is not the same as interviewing the loop, and a reskin brief makes
  this trap much easier to fall into.
- **Verifying occupancy for the rejected options but not the chosen one.** Research
  established that grass, lumber and ore were taken, the developer picked snow, and
  nobody ever checked whether a snow game already existed. Research the answer, not just
  the question.
- **A recorded gap treated as a handled gap.** Time-to-first-rebirth — the number the
  entire loop rests on — was never obtained because one source returned HTTP 405. It was
  flagged honestly in three places, which felt diligent and left the number unknown.
</failure_modes>

<seams>
Two downstream contracts are genuinely constrained. Everything else is prose.

**`ui-forge` vibe.** Art direction must name exactly one of `cartoon-vibrant`,
`clean-modern`, `dark-tech`, `horror-grim`, `fantasy-ornate`, `premium-gloss`,
`minimal-soft`. Record the developer's own words for the look as well — they carry
nuance the seven keys do not — but pick one explicitly in `04-PRESENTATION.md`.
`minimal-soft` for calm and cozy, `cartoon-vibrant` for loud and rewarding,
`dark-tech` for sci-fi and competitive, `premium-gloss` for gacha.

**Screens.** Deriving the screen set is UI/UX's job, not yours — but where the
developer has already named a concrete screen, record it in `04-PRESENTATION.md` as a
kebab-case id with a priority of 1, 2 or 3, so that decision is not lost. Note also
that `ui-forge` currently builds only centred dismissible panels holding a grid of
items; if the game obviously needs shapes outside that (a persistent HUD, a settings
list, a map, a text input), say so, so UI/UX knows it is proposing something the build
stage cannot yet make.
</seams>
