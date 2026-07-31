# Verification — syndicate-auction-test

**Status: FAIL** · Six *blocks downstream* findings. The brief's stated differentiator ("shared
risk and real loss") is half-refuted by fetches and half-absent from its own sheets; its core
control surface (chat) is age-gated and age-partitioned at the platform level as of January 2026;
and the word the whole contract is written in (`share`) names two different quantities. Do not
hand this on.

Note: the synthetic-fixture status and the zero-`[you chose]` lint failure are excluded from the
findings below by instruction. Everything reported here is a defect in the design as written,
independent of who answered the questions.

## Linter

```
lint-sheets — syndicate-auction-test  (10 sheets)

  · 29 audit rows, 29 inventory items
  · tags — you chose: 0, you accepted: 0, I assumed: 0
  · build registry: 1 pattern(s) — modal-grid
  · 5 screen id(s) named in 04-PRESENTATION

  FAIL  [tags] zero [you chose] tags — no answer was a contested decision
  WARN  [synthetic-run] 40 [simulated] tag(s) — no developer was interviewed. This brief is a test fixture and must not feed a build. Every simulated answer is really an [I assumed].
  WARN  [untagged-terms] "syndicate" used 33x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "reputation" used 33x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "split" used 26x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "share" used 21x across 6 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "reveal" used 18x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "negotiation" used 17x across 6 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "lots" used 16x across 5 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "auction" used 13x across 7 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "would" used 13x across 6 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "value" used 13x across 4 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "venue" used 13x across 4 sheets but never on a tagged line — settled name or working word?
  WARN  [untagged-terms] "band" used 12x across 5 sheets but never on a tagged line — settled name or working word?
  WARN  [naming-open-but-used] naming is listed as left open, but these concrete terms are used throughout and will read as settled: "syndicate" 33x, "reputation" 33x, "split" 26x, "share" 21x, "reveal" 18x, "negotiation" 17x. Occupancy-check them or mark them as working words.

1 failure(s), 14 warning(s)
```

Two of those warnings turn out to be real defects rather than style notes: `share` (F5) and
`split` (F3). The linter cannot tell a working word from an occupied one; it flagged both, and
both are hits.

---

## Findings

### F1 · Reputation has two incompatible formulas, nine lines apart in the same sheet · contradiction
**Severity:** blocks downstream

**Evidence:**
- `02-GAMEPLAY.md:57-58` — "**Reputation is not a currency.** It cannot be bought, sold, given or
  spent. It only rises and falls with **how syndicates you joined performed** and whether you
  honoured your bids."
- `02-GAMEPLAY.md:65-67` — "**Constraint on whoever designs systems: reputation must key on
  behaviour a player controls (did you pay your share, did you honour the bid) and never on
  outcome.** Otherwise it punishes bad lots rather than bad partners."
- Reinforced on the second reading three more times: `03-META.md:18` ("the thing you accumulate
  that **cannot be lost to a bad lot** is standing"), `HANDOFF.md:46`, `OPEN.md:110`.

"How the syndicates you joined performed" *is* outcome. A syndicate that overpays performed
badly. So line 58 says reputation falls when a lot disappoints and line 66 says it must never do
that, and the sheets never reconcile them.

**Why it matters:** reputation is named the progression track (`01-FOUNDATION.md:68`,
`02-GAMEPLAY.md:12`, `03-META.md:17`), the venue gate (`03-META.md:32`), the anti-bad-faith
mechanism (`02-GAMEPLAY.md:99-101`) and the integrity surface (`04-PRESENTATION.md:101`). Four
downstream systems key off one number for which the brief supplies two mutually exclusive
definitions. Whichever a systems designer picks, three other sheets will be wrong. Note also
that this is the exact case the brief warned itself about: line 66 is written as a *constraint*
in a "known consequence" paragraph, while line 58 is written as the *decision* — the "rule
stated in a rationale, then relied on as a decision" failure, inverted.

**Fix:** decide which one, in `02-GAMEPLAY.md` §Economy, and delete the other. If reputation is
purely behavioural, say so on the decision line and remove "how syndicates you joined performed".
If it is partly performance-based, `03-META.md:18`, `HANDOFF.md:46` and `OPEN.md:110` all need
rewriting, and F2 gets worse rather than better.

---

### F2 · Both halves of the claimed distinction fail: the incumbent *does* have a permanent downside, and this design does *not* · occupancy
**Severity:** blocks downstream

`00-CORE.md:15-36` builds "where distinction comes from" on exactly two gaps. This is the second
one, and it fails at both ends.

**(a) The incumbent's side is refuted.** `00-CORE.md:32` — "Overpaying shrinks a margin; it never
sets you back." `01-FOUNDATION.md:87` — "**Loss became real.** The leading occupant cannot set a
player back; here it can." Fetched, on three independent guides:

- <https://allthings.how/storage-hunters-open-world-how-to-make-money-fast-and-grow-net-worth/> —
  "Move up only when your budget can handle higher bids and still keep backup cash. **If one bad
  unit can bankrupt you, you moved too early.**"
- <https://storagehunters.wiki/guide/storage-hunters-open-world-beginners-guide> — "**If you find
  yourself broke, return to the Junk Yard to collect lost items.**" The occupant has a named broke
  state *and* a designed zero-cash recovery faucet.
- Search corroboration across two further guides: "Always keep some money in reserve… **if you run
  out of cash you'll have to wait before you can start bidding again**"; "If one bad auction can
  empty your balance or force you to leave valuable items behind, keep farming the safer area."

So in the leading occupant one bad unit can empty your balance and lock you out of bidding. That
is a setback with a recovery loop — structurally the same thing this brief proposes.

**(b) This design's side is refuted by its own sheets.** A syndicate that overpays loses cash,
which "**floors at zero. Never negative, never a debt mechanic**" (`02-GAMEPLAY.md:137`), and it
cannot lose reputation, because reputation "must key on behaviour a player controls… **never on
outcome**" (`02-GAMEPLAY.md:66`) and standing "**cannot be lost to a bad lot**" (`03-META.md:18`).
A bad lot therefore costs a bounded amount of cash and nothing else — which is precisely what the
brief says the incumbent does and calls insufficient.

**Why it matters:** `00-CORE.md` is the sheet every downstream agent reads for *why this game
exists*, and one of its two load-bearing gaps is empty. `01-FOUNDATION.md:84-88`, `05-OUTWARD.md:51`
("no permanent setback") and `HANDOFF.md` all inherit it. Anyone designing the failure systems
will build toward a distinction that is not there, and the honest remaining distinction is much
narrower: **persistent partner reputation**, not "real loss".

**Fix:** either name a genuinely permanent consequence and reconcile it with F1 and the zero-floor
(reputation decay on outcome, a losing streak that locks a venue, a debt that is not cash), or
relocate the distinction onto reputation persistence alone and rewrite `00-CORE.md:30-33`,
`01-FOUNDATION.md:87` and `05-OUTWARD.md:51`. Do not leave "loss became real" standing.

---

### F3 · "No split proceeds, anywhere" is false, and `split` is the signature term of a 37.8M-visit game whose title advertises an auction mode · occupancy
**Severity:** blocks downstream

**Evidence — the claims:**
- `00-CORE.md:28-29` — "**Every occupant is solo.** One player bids, one player profits. **No
  shared bid, no split proceeds, anywhere.**"
- `05-OUTWARD.md:11-12` — "Every occupant is a solo bid and a solo profit; **this is the only line
  in the family that implies other people.**"
- `research/landscape.md:49-51` — "**`syndicate`, `split`, `share`, `stake`** — no Roblox game
  surfaced using any of these as a signature term. **Free in this combination**."
- `05-OUTWARD.md:31` — "`syndicate`, `split`, `share` and `stake` all came back free across the
  searches run."

**Evidence — fetched:**
- **😈 Split or Steal Brainrot [AUCTION Mode]** — **37,850,438 visits**, 94.1% likes (55,739 up /
  3,484 down), **all-time peak CCU 48,299 (30 May 2026)**, 717 active at fetch.
  <https://www.rolimons.com/game/70959844973091>. Store copy: *"Will you split the brainrot with
  your partner? 😇 Or steal both for yourself? 😈 … Both split = Both win 1 brainrot"*. Its
  all-time peak is **higher than Storage Hunters' 47,940**, the figure this brief calls a breakout.
- The family, not one game: **Split or STEAL💰😈** (161,535 visits, launched 13 Aug 2025,
  <https://www.robloxgo.com/game/135855140033003/Split-or-STEAL>) — *"Work with your partner to
  earn a pile of cash… then make the hardest choice — Split or Steal! … Outsmart, bluff, and
  betray your way to victory in this intense social experiment."* Plus *Split Or Steal Squishy*
  and two Fandom-documented in-game variants.
- **💸 JACKPOT 🌟 [BID WAR]** — 285,435 visits, 1,788 likes, launched 17 May 2025,
  <https://www.robloxgo.com/game/85728549893464/JACKPOT>: *"an auction bid war style game where
  you will be bidding with **up to 12 players** on various and randomized **storage lockers** full
  of both common trash and rare valuables."* A third level-1 occupant, and structurally the closest
  thing to this brief's own "8–16 shared server bidding on lots" shape. The six-game survey missed
  it.

**What survives and what does not.** The *specific* mechanism — pooled cash toward one bid, a
split agreed pre-reveal, enforced by the game — I could not find occupied (see Checked and clean).
What is refuted is the framing built on top of it: proceeds *are* split elsewhere, negotiation over
a split under a clock via chat *is* a shipping Roblox genre at ~38M visits, and the brief is not
"the only line in the family that implies other people". The Split-or-Steal family is one step
outside the auction genre the brief surveyed, which is exactly where the guide says to look.

**Why it matters:** three things break. (1) `00-CORE.md`'s first gap is overstated, so the
distinction narrows to "the split is *binding*, and it is agreed *before* the reveal" — a real
distinction, but a much finer one that needs stating precisely because the coarse version is taken.
(2) The hook "You can't afford it alone" is still fine, but `05-OUTWARD.md:11-12`'s justification
for it is false. (3) `split` and `share` are used 47 times across the sheets as neutral vocabulary
while `split` is another game's signature verb — a player reading "agree a split" imports
prisoner's-dilemma expectations (betrayal is possible), which is the exact opposite of this
design's enforced contract. That is a wrong-mental-model import, not just a naming clash.

**Fix:** rewrite `00-CORE.md:28-29` and `05-OUTWARD.md:11-12` to the narrow claim (pooled bid +
pre-reveal + enforced). Add Split or Steal Brainrot and JACKPOT to `research/landscape.md` with
these figures, and re-run level 3 on `split`/`share` — they should probably become working words
flagged for replacement, since "split" now carries "or steal".

---

### F4 · Chat, the core control surface, has required an age check since 7 January 2026 and is partitioned by age group · feasibility
**Severity:** blocks downstream

**Evidence — the claims:** `CONCEPT.md:44-45` — "**Chat is load-bearing, and that sets the age
band.** Negotiation needs real conversation, so this is 13+ and uses Roblox's own chat rather than
a custom surface." `00-CORE.md:46-50` — "**The age band is forced by a mechanic, not chosen for
taste.** … Roblox's chat filtering for under-13 accounts makes free-text negotiation unreliable."
No source is cited. `02-GAMEPLAY.md:35-36` — "**Input: movement, one context button, and chat.**
Chat is not a side feature here; it is a control." `02-GAMEPLAY.md:95-97` — "No custom negotiation
UI beyond proposing and accepting a split, because free-text is where the actual negotiation
happens and a structured UI would flatten it."

**Evidence — fetched, three sources:**
- Roblox investor relations, *Roblox Requires Users Worldwide to Age-Check to Access Chat*
  <https://ir.roblox.com/news/news-details/2026/Roblox-Requires-Users-Worldwide-to-Age-Check-to-Access-Chat/default.aspx>
  — "Users in the U.S. will be required to complete an age check to chat with others. Over the next
  week, this requirement will roll out to all regions where chat is available." Began **7 January
  2026**. Six groups: under 9, 9–12, 13–15, 16–17, 18–20, 21+. "**Users in each age group can chat
  with users in the groups directly above and below theirs**." Without a check, "features like chat
  will not be accessible."
- Roblox, *Facial Age Estimation for Safer Chat* <https://about.roblox.com/age-estimation> — "Once
  age-checked, you are assigned to an age group. **You can only chat with peers of a similar age**
  or known users outside your age groups."
- <https://allthings.how/robloxs-new-chat-rules-explained-january-2026/> — "**If you do not
  complete an age check, all chat features remain disabled.**" "the 13–15 group can chat with 9–12,
  13–15, and 16–17 users. **They cannot chat with 18–20 or 21+ groups by default.**"

**Why it matters:** three consequences the brief does not know about.
1. **Any player who declines a face scan or ID check cannot play the core loop at all.** They can
   join the experience; they cannot negotiate. The brief's entire skill test is unavailable to them,
   and no fallback exists because a structured negotiation UI was explicitly declined
   (`02-GAMEPLAY.md:95-97`).
2. **"13+" is four chat groups, and the extremes cannot talk to each other.** On a shared server of
   8–16 (`02-GAMEPLAY.md:89`) drawn from 13–15 / 16–17 / 18–20 / 21+, a 2–4 player syndicate
   assembled from whoever is present is **not guaranteed to be able to converse**. The design
   assumes any subset of the server can negotiate; the platform does not allow it.
3. The stated reason for the band is now the weaker of the two available reasons, and partly
   obsolete — and it cuts the wrong way: 9–12 players *can* chat with 13–15 players, so
   `00-CORE.md:59`'s "Declined: 9–12 (cannot chat freely, which removes the game)" is not the clean
   consequence it claims to be.

**Fix:** three things to put to the developer. Does the design accept that some players have no
chat, or does it need a structured fallback (which reverses `02-GAMEPLAY.md:95-97`)? Does syndicate
matchmaking need to be constrained to chat-compatible age groups, and what does that do to the
"other players are the mechanic" premise at low population (`03-META.md:53-55`)? And re-source
`00-CORE.md:46-50` against the January 2026 rules rather than the pre-2024 filtering story.

---

### F5 · `share` names both the cash you pay in and the percentage you take out, and the cash side is never defined · contradiction
**Severity:** blocks downstream

**Evidence:**
- Share as **proceeds out**: `02-GAMEPLAY.md:24` — "Shares are agreed as percentages summing to
  100, before the lot opens." `01-FOUNDATION.md` loop steps 5–6 — "the game enforces the agreed
  split → **your share**" / "sell your share". `02-GAMEPLAY.md:136` — "everyone loses
  proportionally to their share."
- Share as **cash in**: `02-GAMEPLAY.md:66` — "did you **pay your share**, did you honour the bid".
  `02-GAMEPLAY.md:139` — "not paying your share".
- Grep for a definition of contribution across all 10 sheets: `pool` appears only in `CONCEPT.md:8`
  ("**pool money with strangers**") and `research/landscape.md:84` ("players pool cash"). `contribut`
  appears zero times. Nothing states how much each member puts in, whether a member's percentage
  must equal their contribution ratio, or what happens if a member's cash is short at close.

**Why it matters:** the split contract is the differentiator, and it has two numbers — money in and
share out. The sheets define one and use the same word for both. This is not cosmetic: whether
share % is tied to contribution % **decides whether the game has any negotiation in it**. If share
must equal contribution, the split is arithmetic and there is nothing to negotiate, which is the
exact failure mode the brief fears about the peek (`03-META.md:24-25`). If it is free of
contribution, then a 0% contributor can hold a 40% share and the whole economy is different. A
systems designer cannot build the contract, an interface designer cannot lay out
`syndicate-contract`, and an integrity designer cannot decide what is server-authoritative, until
this is one question with one answer. It also makes F6 unresolvable.

**Fix:** add a decision line to `02-GAMEPLAY.md` §The split contract stating (a) how each member's
cash contribution is determined, (b) whether share % is constrained by it, and (c) what happens
when a member cannot cover their contribution at close. Then split the vocabulary: one word for
money in, another for proceeds out.

---

### F6 · A player at zero cash has no reachable faucet; the 0% seat cannot do either job it is given · dead-end
**Severity:** blocks downstream

**Evidence:**
- The only faucet: `02-GAMEPLAY.md:52-54` — faucet column is "selling your share of a won lot",
  and nothing else. `CONCEPT.md:49` — "Bids drain, sales pay."
- The floor: `02-GAMEPLAY.md:59-60` — "**Cash can reach zero but never goes negative.** A player at
  zero can still join a syndicate at a 0% share to rebuild reputation, **which is the floor that
  stops a dead end**." `02-GAMEPLAY.md:140-141` — "**A stuck player cannot exist** — a 0% share
  syndicate seat is always available, **which earns no cash** but rebuilds standing."
- No other source of cash exists anywhere in the brief: no starting stipend, no passive income, no
  daily reward or codes (both priority 3, `03-META.md:86-87`), no leaderboard payouts, no NPC work.

**Three independent failures:**
1. **No cash path.** To sell a share you must win a lot; to win a lot you must contribute to a bid;
   at zero cash your contribution is zero, which is the 0% seat, which by its own definition "earns
   no cash". The loop is closed. A broke player is permanently broke. That is a hard dead end and it
   contradicts "A stuck player cannot exist" on the same page.
2. **Nothing to key reputation on.** Reputation keys on "did you pay your share, did you honour the
   bid" (`02-GAMEPLAY.md:66`). A 0% member has no share to pay and no bid to honour. There is
   nothing for the reputation system to observe, so the 0% seat cannot rebuild standing either.
3. **Nothing makes the seat available.** A syndicate is capped at 4 (`02-GAMEPLAY.md:23`) and its
   whole purpose is pooled cash. A 0% member contributes nothing and consumes a scarce seat a
   paying partner could use. "Always available" rests on other players volunteering against their
   interest, on a design that elsewhere insists the other players are the mechanic. Nothing
   incentivises it and nothing enforces it.

**Why it matters:** the zero-cash floor is priority 1 (`03-META.md:79`, "zero-cash floor and the 0%
seat") and is the brief's only answer to its own hardest question. It does not work. Worse, the game
the brief says has *no* recovery mechanism ships one: "If you find yourself broke, return to the
Junk Yard to collect lost items" (<https://storagehunters.wiki/guide/storage-hunters-open-world-beginners-guide>).

**Fix:** the brief needs a real zero-cash faucet that is not the 0% seat — a floor stipend, paid
labour at a venue, a salvage loop, or a guaranteed minimum share for a member who contributes
nothing. Whatever it is, it must produce cash and must give reputation something to observe. Then
delete "which is the floor that stops a dead end" from `02-GAMEPLAY.md:60`.

---

### F7 · `syndicate-contract` is unbuildable, and the blocker is three layers upstream of where the brief places it · feasibility
**Severity:** fix before build

**Evidence — the claim:** `04-PRESENTATION.md:70-73` — "**`syndicate-contract` is a form, not a
grid.** It needs per-player rows with editable percentages that must sum to 100, plus accept states
per member. `modal-grid`'s item card carries art, name and price and **has no numeric input at
all**." `HANDOFF.md:58-60` repeats it.

**Evidence — checked against source, not the registry summary.** `npm run capabilities` returns one
pattern, `modal-grid`, as stated. The brief is right that the differentiator cannot be built, but
its diagnosis is wrong in a way that matters for estimating the work:

- The `type: 'numeric'` occurrences in `ui-forge/src/compose/patterns/modal-grid.mjs:77,126,136` are
  *text styles*, not inputs. The brief's read is correct there.
- **The emitter already supports text input.** `ui-forge/src/emit/runtime/UIBuilder.luau:390`
  declares `TextBox = { ClearTextOnFocus = false }` in `CLASS_DEFAULTS`, and lines 452-458 set
  `PlaceholderText` / `Text` / `PlaceholderColor3` on a `TextBox`. `placeholder` is a legal spec
  property (`ui-forge/src/compose/overrides.mjs:34`, `ui-forge/src/emit/to-luau.mjs:63`) and the
  HTML preview handles it (`ui-forge/src/transpile/to-html.mjs:303-318`). So Roblox-side and
  render-side, a numeric field is already possible.
- **The blockers are all upstream.** (1) The template language's class whitelist omits it:
  `ui-forge/src/ideate/templates.mjs` — "`class  Frame | TextLabel | TextButton | ImageLabel |
  ImageButton | ScrollingFrame`" followed by "NODE PROPERTIES (no others exist; anything else is
  rejected)". (2) The content contract is fixed and grid-shaped: "CONTENT SHAPE — **every template
  receives exactly this**… `{ title, dismissible, chips: [{label, value, icon}], items: [{name,
  price, art, badge}], cta: {label, emphasis} }`" — there is no per-member row, no editable value,
  no per-member accept state. (3) `ui-forge/src/template/validate.mjs:30-46` hard-codes
  `stressContent()` to that same shape and `proveTemplate` fails any template that does not render
  the title, **all six** item names, both chip values and the CTA label
  (`validate.mjs:131-143`) — so a contract form would fail validation for not being a grid.

**How far off:** four changes, in this order — add `TextBox` to the template class list; widen the
content shape (or add a second one) to carry per-member rows with an editable numeric and an accept
state; generalise `stressContent`/content-coverage so a non-grid template can pass proof; then
author the template. The persistent auction HUD (`04-PRESENTATION.md:68-69`, "**This is not
optional**") additionally needs a non-modal root: nothing structurally forbids it, but every
pattern and every instruction in `templates.mjs` assumes a Backdrop-plus-Panel screen, and the
content-coverage rule means a HUD must still render six item names to pass.

**Why it matters:** `04-PRESENTATION.md:77` is right that "its absence is not a cosmetic gap" — but
a build-stage reader who takes "no numeric input at all" at face value will conclude the Roblox
runtime cannot do it and scope a much larger job than the four changes above.

**Fix:** correct `04-PRESENTATION.md:67-77` and `HANDOFF.md:58-60` to name the real blockers
(template class list, fixed content shape, grid-shaped stress content) and note that
`UIBuilder.luau` already emits `TextBox`.

---

### F8 · The foundation forbids the shopkeeper fantasy; the economy, monetization and priority-2 list all ship a shop, and two sheets assert a haul limit no sheet specifies · contradiction
**Severity:** fix before build

**Evidence — the shop:**
- Forbidden: `01-FOUNDATION.md:11` — "You are not a treasure hunter and **not a shopkeeper**."
  `CONCEPT.md:12` — "**Not** a treasure hunter and **not a shop owner**." `05-OUTWARD.md:52`
  positions "sell in your shop" and "shop-tycoon progression" as the *incumbent's* thing.
- Permitted: `02-GAMEPLAY.md:55` — the sink column reads "**shop** and storage upgrades".
  `03-META.md:61` — "Allowed: avatar and venue cosmetics, **shop decoration**, extra storage slots".
  `03-META.md:83` — priority 2 includes "**shop decoration**". `CONCEPT.md:53` — "Cosmetics and
  **shop decoration** only."

Nothing in any sheet establishes that the player *has* a shop. The core loop step 6 is "sell your
share → currency" with no venue for it. So a monetization category, an economy sink and a
priority-2 deliverable all rest on a surface the foundation explicitly rules out.

**Evidence — the haul limit:**
- `HANDOFF.md:41-42` — "**The peek, live PvP bidding and haul limits are genre-standard, not
  distinctions. They were adopted deliberately from the incumbent, not invented here.**"
- `05-OUTWARD.md:51` lists "haul limits" under *what it shares* with Storage Hunters.
- `02-GAMEPLAY.md:9-19`, the mechanics table, marks only "partial peek" and "live bidding" as
  "genre-standard; adopted deliberately". **There is no capacity or haul mechanic anywhere in
  `02-GAMEPLAY.md`.** Yet `03-META.md:61` sells "extra storage slots" and `02-GAMEPLAY.md:55` sinks
  cash into "storage upgrades", both of which presuppose a cap.

**Why it matters:** `HANDOFF.md` is the routing sheet; a systems designer reading it will build a
haul-capacity system that the gameplay sheet does not describe and the roster/economy sections never
budget for. And a monetization designer will build a shop the theme forbids. Both are cheap to
settle now and expensive after either is built. There is also a live tension in "extra storage
slots" as a paid SKU: capacity buys realised value per lot, which is adjacent to the "money must not
buy negotiating position" rule (`03-META.md:61-63`) even if it is not literally bid power.

**Fix:** decide whether a shop and a haul limit exist. If they do, add them to `02-GAMEPLAY.md`
(mechanics table, economy, roster) and soften `01-FOUNDATION.md:11`/`CONCEPT.md:12` from "not a
shopkeeper" to whatever is actually true. If they do not, strike "shop and storage upgrades" from
the economy sinks, "shop decoration" and "extra storage slots" from monetization and priority 2,
and "haul limits" from `HANDOFF.md:41` and `05-OUTWARD.md:51`.

---

### F9 · Two sheets specify two incompatible first sessions · contradiction
**Severity:** fix before build

**Evidence:**
- `01-FOUNDATION.md:70-71` — "**Lap 1 versus lap 100:** early lots are cheap enough to take alone,
  so **the game teaches the solo loop first.**"
- `02-GAMEPLAY.md:111-116` — "**Join someone else's syndicate on a cheap lot and get paid, inside 90
  seconds.** … **They learn by receiving before they learn by negotiating.**"
- `05-OUTWARD.md:26-27` — "the first 90 seconds have to **deliver a syndicate rather than a solo
  bid**."

**Why it matters:** onboarding is priority 1 (`03-META.md:79`, "guaranteed first invite") and
`05-OUTWARD.md` names the first 90 seconds as the mitigation for the brief's largest identified risk
(players arriving expecting Storage Hunters). One sheet says the first thing a player does is bid
alone; two say it must not be. An onboarding designer will implement one and break the other's
promise. It also interacts with F5: a brand-new player joining a syndicate has to contribute cash to
the pooled bid, and the brief never says whether they have any.

**Fix:** pick one in `01-FOUNDATION.md`. If the syndicate comes first, "the game teaches the solo
loop first" has to go, and the "binding constraint moves from cash to who will have you" arc needs
restating.

---

### F10 · A load-bearing quotation is attributed to a source that does not contain it · authority
**Severity:** fix before build

**Evidence:** `00-CORE.md:30-33` and `research/landscape.md:77-79` both present, in quotation marks
with a `[research: url]` tag, the phrase *"with no mention of permanent setbacks or resource loss
mechanics."* I fetched that page
(<https://gamelandinsider.com/storage-hunters-open-world-guide>) and searched it: **the phrase does
not appear.** What the page actually says is "Overpay and your profit margin shrinks; underbid and
you lose the unit to another player", "You lose nothing — only the winning bidder spends coins" and
"Reinvest profit into vehicle upgrades, storage capacity, and bid limit increases". Every other
quotation the brief takes from this page checks out verbatim ("An auction timer starts", "You get a
partial view through the door gap when the auction opens", "There is no full preview").

So the quoted phrase is the interviewer's own observation *about the absence of content on the page*,
formatted as a quotation *from* the page.

**Why it matters:** `HANDOFF.md:31` tells every downstream agent that `[research: url]` means
"sourced fact — argue with the source, not the sheet". An agent that follows that instruction here
finds the source never said it, and loses confidence in the other twelve research tags, which are
sound. It also dresses an argument from silence — the weakest form of occupancy evidence, and the
one `research/landscape.md:95-97` correctly flags elsewhere — as direct testimony. F2 shows the
inference was wrong.

**Fix:** de-quote it. Write it as what it is: "the guide describes reinvestment cycles and rising
limits and does not mention permanent setbacks", tagged as an inference from the source rather than
a quotation of it. And apply F2's evidence, which refutes the inference outright.

---

### F11 · A lap length is stated in `CONCEPT.md` and declared unsourceable in `01-FOUNDATION.md`, and "peek to split" is ambiguous · contradiction
**Severity:** fix before build

**Evidence:** `CONCEPT.md:22` — "**A lap is one lot,** peek to split. **Roughly one every few
minutes.**" `01-FOUNDATION.md:74-77` — "**Lap length: unknown.** No auction-timer or bid-increment
figure could be sourced across three source kinds… The incumbent's average session is 27.9 minutes,
which bounds it loosely and no more." `OPEN.md:107` lists all numeric curves as open.

Separately, "peek to split" does not identify an endpoint. The loop table has *agree a split* at
step 2 and *the game enforces the agreed split* at step 5; a lap ending at step 2 excludes bidding,
the reveal and the sale, which is most of the loop.

**Why it matters:** `CONCEPT.md` is the sheet everyone reads and the only one many will read
carefully. "Roughly one every few minutes" is the kind of number that gets treated as a
specification downstream — it constrains the auction timer, the venue schedule, the session
arithmetic and the peek's information budget — and the sheet that is supposed to own it says it
cannot be sourced.

**Fix:** either remove "Roughly one every few minutes" from `CONCEPT.md:22`, or promote it to
`01-FOUNDATION.md` as an explicit assumption in `OPEN.md §5`. Define the lap's endpoint by step
number.

---

### F12 · The `clean-modern` token claim is correct, but the same paragraph asks for warm sodium light the palette cannot express and texture the asset style forbids · contradiction / feasibility
**Severity:** fix before build

**Evidence — the claim, verified.** `04-PRESENTATION.md:24-27` — "**Note the check** made against
the token file rather than the key's name: `clean-modern` resolves to **a dark cool ground with low
juice**". Confirmed against `ui-forge/src/theme/palettes.mjs:30-42`: `surface.base '#1C2029'`
(blue-dominant, dark), `surface.sunken '#14171E'`, `juice: 'low'`, `gradientStrength: 0.06`,
`radiusScale: 1.0`. The brief's claim is accurate and the contrast with the prior brief's "warm,
sunlit" error is real. This lens passes.

**Evidence — what the check missed.** Two problems inside the same section:
1. `04-PRESENTATION.md:11` asks for "concrete, chain-link, **sodium** and strip light, painted line
   markings", and `CONCEPT.md:56` repeats "**sodium light**". Sodium lighting is amber — warm. Line
   25-26 then says the palette "suits sodium-lit concrete and **does not suit anything warm**". Those
   two statements are 15 lines apart and cannot both hold. The palette confirms the problem: accents
   are `#4F8DF7` blue, `#22C7A9` teal, `#A78BFA` violet, and the only amber in the file is
   `status.warning '#FBBF24'`, which is reserved for warnings. **There is no token that can render
   sodium light**, so per the repo's own rule ("arbitrary values enter through tokens, never as
   literals in a spec") the described art direction is unexpressible as written.
2. The brief checked the palette but not the asset style for the same key.
   `ui-forge/src/assets/style.mjs:30-37` defines `clean-modern` as "flat vector illustration with
   subtle gradient fills", "no outline, shapes separated by value alone", "**even diffuse light, no
   strong directional source**", "geometric, restrained, minimal internal detail", negative:
   "skeuomorphism, **heavy texture**, photorealism, busy detail". Concrete, chain-link and grubby
   strip-lit yards are heavy texture and strong directional light — the two things this key's
   generator is told to avoid.

**Why it matters:** every generated item and venue asset comes out of `style.mjs`, so the 40-item
roster and the venue looks will render as flat restrained vector shapes, not grubby concrete. An art
lead reading `04-PRESENTATION.md` will brief the opposite of what the pipeline produces, and the
mismatch will be discovered at gallery-review time rather than now.

**Fix:** resolve the sodium contradiction (drop sodium, or accept a cool ground and describe the
lighting as cool strip light). Add a line to `04-PRESENTATION.md` recording what
`assets/style.mjs:30-37` actually forbids for this key, so the roster brief is written against it.
If grubby texture is non-negotiable, the honest conclusion is that `clean-modern` is right for the
interface and wrong for the world art, and that split needs stating.

---

### F13 · Priority 1 ships the game with its progression track disconnected, and the long-term objective is terminal · dead-end
**Severity:** fix before build

**Evidence:**
- Priority 1 (`03-META.md:76-79`): "one venue · the peek · live bidding · syndicate formation 2–4 ·
  the enforced split contract · the reveal · selling a share · **reputation for honoured bids** · 40
  items in 5 bands · zero-cash floor and the 0% seat · guaranteed first invite."
- Priority 2 (`03-META.md:81-83`): "additional venues · **reputation tiers gating venues** · the
  venue schedule and time of day · **valuation-accuracy tracking** · shop decoration."
- The claims: `01-FOUNDATION.md:68` — "**Reputation is the progression track**, not cash."
  `03-META.md:13-15` — short-term objective "reach a reputation tier that unlocks larger syndicates",
  long-term "top reputation tier", mastery "valuation accuracy… **tracked per lot**".

At priority 1 there is one venue, no tiers and no gating, so reputation is computed and consumed by
nothing — the "progression track" is absent from the first shippable version. The mastery objective
is unmeasurable, because the tracking that measures it is priority 2. The short-term objective
("reach a reputation tier") cannot be satisfied at all. `03-META.md:91-93` acknowledges the split
between anti-bad-faith reputation and progression reputation but does not notice that this leaves P1
with no progression of any kind: cash has no sink except bids (shop and storage upgrades are
unestablished, see F8), and cosmetics are monetization rather than progression.

At the other end, the long-term objective is terminal: top tier reached, and because reputation may
only key on controllable behaviour (F1), a player who honours their bids never falls back. Nothing
in `03-META.md` §Replayability or §Objectives says what a top-tier player is for; leaderboards,
seasons and events are all priority 3 (`03-META.md:86-87`).

**Why it matters:** priority order is what the build stage reads to decide what to build first. As
written, P1 is a game where the stated objective structure does not function, which will read as "no
progression" in the first playtest and get patched by whoever notices first rather than by decision.

**Fix:** either promote a minimal reputation consumer into P1 (a second venue, or a syndicate-size
cap that rises with standing), or restate P1's objectives honestly as session-scope only and say so
in `03-META.md` §Objectives. Separately, add one line on what exists after top tier.

---

### F14 · "13+" is not in the closed `AGE_BANDS` vocabulary, and the recorded vocabulary gap ignores the documented escape hatch · authority
**Severity:** fix before build

**Evidence:**
- The brief states the audience as "13+" throughout (`CONCEPT.md:45,47`, `00-CORE.md:44`,
  `HANDOFF.md:50`). `concept/src/vocab.mjs:251-259` defines the closed set: `5-8`, `8-12`, `8-14`,
  `10-16`, `13-17`, `16+`, `all-ages`. **`13+` is not a member.**
  `concept/src/validate.mjs:48` pushes `audience.ageBand` against `V.AGE_BANDS`, so a derived
  concept saying "13+" either fails the gate or has to be silently coerced to `13-17` (which
  excludes adults) or `10-16` (which includes 10-year-olds and contradicts the chat reasoning).
- Meanwhile `00-CORE.md:70-72` and `OPEN.md:51-56` carefully record the *genre* vocabulary gap
  ("**This is the second vocabulary gap found by running the skill**") but never mention
  `vocab.mjs:14-17`, which documents the intended remedy: "**THE ESCAPE HATCH.** Any enumerated
  field also accepts `custom:<label>`… a custom value is a promise that some later stage will need
  code written for it, so it must never pass silently." `validate.mjs:157-161` turns it into a
  loud warning rather than a failure. `genre.primary` is required
  (`validate.mjs:36`), so leaving the genre in prose does not survive derivation either.

**Why it matters:** the brief's most confident audience statement cannot be expressed in the
vocabulary the gate enforces, and the brief did not notice — while explicitly congratulating itself
on noticing the analogous genre gap. Whoever derives `game-context.json` will make this call
silently, and "13-17" versus "13+" is exactly the kind of quiet coercion the escape hatch exists to
prevent. F4 makes it sharper: Roblox's own bands are 13–15 / 16–17 / 18–20 / 21+, so "13+" is four
groups that cannot all talk to each other.

**Fix:** state the intended band as `custom:13+` (accepting the loud flag) or pick `13-17`
explicitly and say adults are out of scope. Add the age-band gap to `OPEN.md`'s vocabulary note
alongside the genre gap, and record `custom:<label>` as the available mechanism for both.

---

### F15 · Nothing establishes that the economy is net-positive, and the two stated rates push it negative · dead-end
**Severity:** fix before build

**Evidence:** `02-GAMEPLAY.md:52-55` — one faucet ("selling your share of a won lot"), sinks are
bids plus (unestablished) shop and storage upgrades. `CONCEPT.md:49` — "Bids drain, sales pay", so
bid money leaves the economy to the house and sale money enters it. `02-GAMEPLAY.md:143` — "**Losing
is frequent by design. Perhaps a third of lots should disappoint**" (`OPEN.md:128` discloses this as
an unsourced assumption). `research/landscape.md:31-32`, quoting the incumbent's guide — "in
multiplayer, you compete with other players at the same auction, **which drives bid prices up**".
`OPEN.md:107` leaves all band value ranges and bid increments open.

The economy only survives if the average lot's contents are worth more than the average clearing
price. But competitive bidding drives the clearing price toward expected value, pooled bidding
raises the amount of cash chasing each lot (which is the entire point — `CONCEPT.md:8`, lots "none
of you could afford alone"), and one lot in three is designed to disappoint. Nothing in any sheet
sets a margin, and the only relief valve pays nothing (F6). A brief that specifies a loss rate and a
hard zero floor without specifying a house edge has specified a deflationary economy.

**Why it matters:** whoever authors the value curves is the one who discovers this, late, with no
guidance beyond "a third should disappoint". It compounds F6: at the aggregate level cash trends
down, and at the individual level there is no way back up.

**Fix:** add a constraint to `02-GAMEPLAY.md` §Economy stating the intended relationship between
expected lot value and expected clearing price (i.e. that lots are seeded below expected value, and
by roughly how much), and note in `OPEN.md §4` that the disappointment rate and the house edge must
be tuned together rather than separately.

---

### F16 · Half the audience is assumed to be on mobile, where the core control surface is a keyboard under a closing clock · feasibility
**Severity:** worth knowing

**Evidence:** `00-CORE.md:52-54` and `02-GAMEPLAY.md:40` — "~50 / 45 / 5, desktop-heavy for a Roblox
game because typing matters", disclosed as an unsourced assumption (`OPEN.md:124`).
`02-GAMEPLAY.md:35-36` — chat is "not a side feature… it is a control". `02-GAMEPLAY.md:42-43` —
"**Feel:** the clock is the primary sensation. An auction closing must feel like it is closing."
`04-PRESENTATION.md:88-93` accepts an exclusion for reading and typing under time pressure, and
records reading load as "**high** — the highest of any brief in this repo", but the exclusion is
framed around fluency and motor impairment, not device.

On a phone, opening the Roblox chat keyboard covers much of the screen and takes both thumbs off
movement. The brief acknowledges "how a syndicate invite reads on a phone" is open
(`02-GAMEPLAY.md:45-46`) but never confronts the harder version: whether a mobile player can
negotiate a percentage split at all while an auction clock runs.

**Fix:** put it to the developer as a scoped question — is mobile a first-class platform for this
game, or is the 50% figure aspirational? If first-class, the "no structured negotiation UI" decision
(`02-GAMEPLAY.md:95-97`) is probably wrong for half the audience, and F4 gives a second independent
reason to revisit it.

---

### F17 · Two sourced figures are stale, and one conflates two very different games · worth knowing
**Severity:** worth knowing

**Evidence, all re-fetched today:**
- `00-CORE.md:55` — "20–35 minute sessions, **longer than the incumbents' 27.9 minute average**".
  Storage Hunters' current average playtime is **30.31 minutes**
  (<https://www.rolimons.com/game/98800969324557>), which sits inside the brief's own 20–35 band, so
  the comparison no longer supports the point. And "the incumbents'" average is not one number:
  **Bid Battles averages 14.32 minutes** (<https://www.rolimons.com/game/9603033881>).
- `research/landscape.md:99-101` records as unverified: "**Bid Battles' current activity.** Its peak
  CCU is dated July 2022; no current-player figure was fetched, so 'incumbent' is a scale claim and
  not an activity claim." **Settled:** Bid Battles is at **325 active players** right now, against
  Storage Hunters' **32,146**. So ~194M of the "~245M visits" the brief leads with
  (`CONCEPT.md:27`, `HANDOFF.md:38`) belongs to a game with 325 players online. The live competitor
  is one game, not two — which makes the occupancy picture slightly *better* for this design than
  the brief says, and the F3 additions slightly worse.
- Otherwise the brief's headline figures verify: Storage Hunters 50,937,543 visits / 94.6% /
  peak CCU 47,940 (28 Jun 2026); Bid Battles 193,698,555 / 90.1% / peak 17,755 (5 Jul 2022).
  Bid For Brainrot, cited without figures at `05-OUTWARD.md:53`, is 11,307,094 visits, 96.8% likes,
  peak CCU 15,465, avg playtime 11.66 minutes (<https://www.rolimons.com/game/73296902324416>).

**Fix:** update the session-length comparison, split the two incumbents' averages, and move the Bid
Battles activity item out of `research/landscape.md`'s unverified list with the 325-concurrent
figure.

---

## Checked and clean

- **The core mechanism appears genuinely unoccupied.** I searched four ways for a Roblox game where
  players pool cash into one bid and pre-agree an enforced division: plain-language mechanic
  ("pool money with other players to bid… split loot"), the co-op/group-buy framing ("pool your
  money", "chip in", "group buy"), the heist-payout adjacency (Notoriety, Entry Point — payouts are
  authored, not negotiated, and no bid is shared), and the term `syndicate`. Nothing surfaced. The
  narrow claim — pooled bid + pre-reveal + game-enforced — survives. F3 attacks the framing around
  it, not this.
- **`clean-modern` is a dark cool ground with low juice**, exactly as `04-PRESENTATION.md:24-26`
  says. Verified against `ui-forge/src/theme/palettes.mjs:30-42`, not the key's name. The brief's
  point about the previous brief's "warm, sunlit" error is fair.
- **`syndicate` as a signature term:** did not surface as any Roblox game's name or signature
  mechanic. The only notable use is a creator group name ("The Evac Syndicate"), not a game term.
  Matches the brief.
- **`storage` / `hunters` / `bid battles` are correctly ruled unusable** (`05-OUTWARD.md:29-31`) —
  confirmed by the two occupants plus JACKPOT's own use of "storage lockers".
- **Twelve of the thirteen `[research: url]` quotations verify verbatim** against their pages,
  including all four gamelandinsider mechanic quotes and both store descriptions. F10 is the one
  exception.
- **`research/landscape.md:92-97`'s reported fetch failures are accurate.** I reproduced them:
  Bid Battles Fandom `Auctions` → HTTP 402, techwiser → HTTP 307 (twice, on two different techwiser
  URLs), `storagehunters.fandom.com` → HTTP 402, ggwtb → 403, sportskeeda → 405. The brief's claim
  that no auction timer or bid-increment figures could be sourced holds after a further six
  attempts.
- **Audit table is complete** (29 rows / 29 items) and the `[simulated]`-is-really-`[I assumed]`
  disclosure is on every sheet, in `HANDOFF.md:29-33` and `OPEN.md §1`. No foundation item at zero.
- **No declined-then-permitted collision on the monetization exclusions.** Bid power, reputation
  purchase, starting-cash advantage and paid lot information are forbidden consistently across
  `CONCEPT.md:53`, `03-META.md:61-63` and `04-PRESENTATION.md`. The "extra storage slots" tension is
  noted under F8 rather than here.
- **Weather is ruled out once and never reintroduced** (`03-META.md:37-39`). Time-of-day appears in
  `03-META.md` and priority 2 consistently. `trading` is excluded in the mechanics table, the social
  model, priority 3 and integrity with the same reason each time — that one is clean.
- **Server-size arithmetic works:** 8–16 players with syndicates of 2–4 does admit "at least two
  competing syndicates plus non-participants" at both ends of the range
  (`02-GAMEPLAY.md:91-93`).
- **The markdown→`game-context.json` gap is already disclosed** (`HANDOFF.md:71-73`), so it is not
  a finding.
- **No forbidden placeholder text** in any sheet (linter's check, re-read by eye against
  `validate.mjs:26`'s pattern list).

## Could not verify

- **"Both incumbents reveal privately; this does not."** Used as a distinction three times
  (`01-FOUNDATION.md:47-48`, `04-PRESENTATION.md:41-42`, `05-OUTWARD.md:51`) and never sourced. Four
  fetches found nothing on reveal visibility, and one summary counter-indicates it: in Storage
  Hunters "once you win you need to physically load the items from the locker into your vehicle and
  drive them back to your shop", which happens in a shared open world where other players are
  present. **Settling evidence:** a video of a won-unit opening in Storage Hunters showing whether
  nearby players can see the contents, or in-game observation on a populated server. This matters —
  it is one of three claimed distinctions in the references table.
- **Split or Steal Brainrot's "[AUCTION Mode]" mechanics.** Its title advertises one and its scale
  is large (37.85M visits, peak CCU 48,299), but no guide, wiki or video source I reached described
  the auction mode itself; all four described only the split-or-steal dilemma and the brainrot
  economy. **Settling evidence:** the game's own update log or Discord, or in-game observation. The
  F3 finding does not depend on it (the split-proceeds and `split`-term occupancy stand either way),
  but whether it is *also* a bidding auction changes how close a neighbour it is.
- **Whether NPCs bid alongside players in Storage Hunters.** One search summary asserted "you bid on
  sealed storage lockers against NPCs and other players"; I could not confirm it from any fetchable
  page (three attempts). If true, it is the incumbent's answer to the low-population fragility that
  `03-META.md:53-55` and `HANDOFF.md:56` call structural and unfixable — NPC bidders fix thin
  competition, though not the harder problem of thin *partners*. **Settling evidence:** the auction
  guide on techwiser (currently 307) via a different route, or in-game observation on an empty
  server.
- **Whether any occupant ever shipped and removed a shared-bid feature.** `research/landscape.md:97-99`
  flags this as unsettled and I could not settle it either: no patch notes, changelog or dev-forum
  thread surfaced for either occupant. **Settling evidence:** the Storage Hunters or Bid Battles
  Discord changelog, or the group's update announcements.
- **Split or Steal Brainrot's visit count differs by source.** Rolimons reports 37,850,438 visits
  and 717 active; robloxgo reports 10,939,265 visits and 6,942 active with a launch date of 23 March
  2026. I cited Rolimons (this pipeline's usual source) in F3. **Settling evidence:** the Roblox
  experience page's own visit counter.
