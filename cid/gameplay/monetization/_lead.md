# Monetization — domain index

**Category:** Gameplay · **Wave:** 3 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `OPEN.md`, `research/grass-incremental.md` (all in
`concept/spec/incremental-spinoff-v2/`); `cid/gameplay/_category.md` §06 and the thin-domains
section; `cid/_digest.md` (all 60 rows); `cid/_contract.md`; `cid/_research/pack.md`; and in
full, because they border this subject and the digest truncated them:
`cid/gameplay/systems/06-modifier-stacking.md`, `cid/gameplay/mechanics/04-tool-as-object.md`,
`cid/theme/tone/04-do-nots.md` (rows `D6`–`D13`).

---

## What the brief gave me

**The stance, and it is the whole fence:**

> "**Permanent multipliers only. Never content access.**"
> - "**Allowed:** permanent multipliers on clearing value, radius, move speed, relic luck."
> - "**Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100%
>   completion into a purchase**, which poisons the differentiating system."
> - "Matching the reference exactly was offered and declined precisely because it leaves paid
>   content gating open. Cosmetics-only was offered and declined as needing a display system
>   first."

`[brief: soft]` ← `[you accepted: R5 Q4]` (`03-META.md`). The *forbidden* half is stated as a
hard limit with its reason attached, so it is treated here as effectively closed; the two
declined alternatives are named, which is what makes "cosmetics" a re-litigation rather than an
option.

**The reason to argue small, quoted so no sheet forgets it:**

> "Revenue. Offered and declined — the genre demonstrably earns, and that is not why this is
> being built."

`[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`), alongside "**This game exists to prove
the `arga` pipeline works end to end**" and "the **smallest game that still gives every creative
area real work.**" No sheet in this domain may argue for an offer on the grounds that it earns.
The only admissible argument is that the ladder is real, obeys the fence, and gives a build
something to read.

**The hole, stated twice by the brief itself:**

> "**Note the tension:** with no whale-tool ladder equivalent decided, the high-price SKU has no
> obvious home yet." (`03-META.md`) · "**The premium SKU has no home.**" (`OPEN.md §6`)

`[brief: binding]` as a stated hole. And the assignment: "Left open — the SKU ladder, price
points, and where a premium item sits given no tool ladder was specified." (`03-META.md`,
`OPEN.md §4`).

**The reference data point:** "The reference sells only 2x multipliers plus a 2,500-Robux
oversized tool, zero cosmetics, across 38M visits at a 96% like ratio."
`[research: research/grass-incremental.md]` — re-fetched today and unchanged, see *Research
owed*.

**The three axes:** "**Three axes:** value per unit, clear radius, and move speed. … Relic luck
as a fourth axis was offered and declined." `[brief: soft]` ← `[you accepted: step 6 Q1]`
(`02-GAMEPLAY.md`), recorded in `OPEN.md §5` as no longer an assumption.

**Audience:** "**8–14, mobile-heavy, short sessions**" `[brief: binding]` ← `[you chose: R1 Q4]`;
the "~70% mobile" split is `[brief: soft]` ← `[I assumed]` and is still uncorroborated by
anything fetched (`cid/_research/pack.md`, wave-2 "Not settled").

**Priority 3, excluded and untouchable:** "codes · daily rewards · leaderboards · trading ·
seasons and events" `[brief: soft]` ← `[I assumed — the ordering]`, treated as excluded per the
category ruling. Codes and seasons are the two that reach this domain, and both are also banned
at the surface by `theme/tone/04` `D9` and `D10`.

**Four wave-2 rulings that bind me and are not the brief.** Recorded here because a writer will
otherwise read the brief's four allowed multipliers and be wrong:

| ruling | source | what it does to my subject |
|---|---|---|
| `luckShaped: false` — duplicates are *removed* by a draw without replacement, so no discovery rate exists | `gameplay/systems/05-the-find-ledger` | Kills relic luck. **Three legal multiplier targets, not the brief's four.** That sheet pushed back on the brief line explicitly: "Offer-ladder work is unblocked with a no." |
| A purchase is `{ sourceClass: "purchase", sourceId, axis, factor ≥ 1 }`, step 3 of `upgradeEffect → set-completion → purchase → one ceiling clamp`; at most one per product id; `stacksWithSelf: false`; recomputed from live ownership at every join, never persisted; may not expire, decay, reset, be timed or be spent; may not grant currency, a Find, an area, a cosmetic or a second modifier; may not push an axis past its ceiling | `gameplay/systems/06-modifier-stacking` | **I choose what is sold and at what price; I do not choose how it stacks.** It also closes "boosts" as the genre means the word. |
| May sell a multiplier, may never sell currency at any rate; prices in Robux, never in Shards | `gameplay/systems/04`, `gameplay/systems/02` | No currency pack, ever. |
| The tool is **held**, welded to the right hand, driven by Reach; `premiumVariantAllowed: true`, `premiumVariantMayBeOnlyTool: false`; a premium tool obeys `T1`–`T12` | `gameplay/mechanics/04-tool-as-object` | The premium SKU has an object to attach to. "The price, the rung count, the level thresholds and whether a ladder exists at all are entirely yours; I set none of them." |

Also inherited: `theme/identity/04` — the premium SKU's deliverable "must be a permanent
multiplier … a body is not available and a cosmetic follower is doubly excluded";
`gameplay/systems/03` — "may not sell a 'find better Finds' multiplier: there is no per-Find rank
for a multiplier to move"; `theme/tone/04` `D9` and `D10`, named as this domain's inheritance.

---

## What the brief did not give me

Each routed to the item that will decide it. Where a gap falls outside this domain, the **kind of
work** is named, with the current holder bracketed.

| # | gap | routed to |
|---|---|---|
| G1 | **The brief's allowed list is stale by one entry.** It names four multiplier targets; `systems/05` left three with a referent. Nothing anywhere restates the allowed list as three. | `01`, which names the axes it sells. Flagged upward: `03-META.md`'s line should be read as three. |
| G2 | **The product *kind* is never stated.** "Permanent multipliers" implies a one-time purchase, but no sheet and no brief line says game pass, developer product, or both. | `01` (a `kind` per product) and `02` (developer products recorded closed, not forgotten). |
| G3 | **No rung count, no ladder shape.** "The SKU ladder" is named open and given no size. Shipping neighbours run from 1 to 18 passes. | `01`. |
| G4 | **The premium tool's visible deliverable has no rule, and the two merged keys disagree.** `tool` drives head width off Reach **level** (`headWidthPerLevelStuds` × level); a purchase is a **factor** on effective radius and grants no level. So as the contract stands today, buying an oversized tool changes no width and the SKU's whole fiction fails. Nobody has stated this. | `01` states the requirement as a consequence. The field belongs to **held-tool work** [currently Mechanics, owner of `tool`], which must rule whether head width reads effective radius or level. |
| G5 | **The ceiling headroom is 92% spent before any product exists.** `core-loop/05` reports depth-4 arrival at 3.84× of a 4.16× cap, with speed *already maxed on arrival*; `systems/06` clamps effective radius below `area.size / 2` and effective speed at one clear radius per server tick, once, after every source. A 2× radius pass — the reference's whale item — may not fit at any depth. | `03`. |
| G6 | **Nothing states how a Robux purchase is triggered.** `mechanics/02` fixed five verbs and one bound input class, and its `buy` is the Shard sink, not this. The prompt APIs take a `player` argument. Whether a store control is a sixth pressable, a sixth verb, or neither is unowned. | `02` states the prohibition half (never unprompted). The trigger belongs to **verb-roster work** [currently Mechanics, owner of `input`] and **store-surface work** [currently UI/UX]. |
| G7 | **Monetization has no priority slot at all.** `03-META.md` priority 1 lists six items and the store is not among them; it is not in priority 2 or 3 either. So this domain's output is specced against a scope list that does not contain it. Not decided here. | **Scope-ordering work** [currently the category lead, then the developer], as an escalation. It changes no sheet: the ladder is written either way. |
| G8 | **What a player sees when a purchase stops applying.** `systems/06` recomputes purchases from live ownership rather than latching, deliberately, so a refunded or lapsed pass silently reduces an axis — in a game whose fantasy register is "nothing can be taken back" (`theme/fantasy/03` `C3`). The brief is silent and so is every merged sheet. | `03`. |
| G9 | **`products[].label` is a new class of player-facing string with no path.** `vocabulary` checks `playerFacingStrings()`, which walks the merged manifest; a key that does not exist is not walked. | `01` names the labels (naming is not separable from the thing named) under `theme/vocabulary/01`'s form rules. **Contract-and-seam work** [whoever owns `bridge/schema.mjs`] must add the path when `products` is shaped. |
| G10 | **Nothing addresses paid purchases against an 8–14 audience**, 35% of whom are under 13 on the platform's own figure. No sheet asks for a spend guard and none is invented here. | Recorded as support for `02`'s exclusions; no new item. Escalate only if the developer wants a guard. |

**Not a gap, stated so verification does not read it as one:** there is no revenue target, no
ARPU, no conversion goal and no spend-per-session figure anywhere in this domain, because
"Revenue. Offered and declined" `[brief: binding]`. A sheet here that produced one would be
overruling `00-CORE.md`.

---

## The contract key this subject needs

**I own none of the 9 keys.** `cid/_contract.md` lists `area`, `tiers`, `upgrades`, `vocabulary`,
`currency`, `movement`, `patch`, `collection`, `onboarding`, and none is monetization's. My
subject needs exactly one, and the repo already anticipates its name: `products`
(`CLAUDE.md`, "`environment`, `sfx`, `mix`, `products`, `events` do not exist yet and all of them
should").

**What `products` would hold:** an ordered list of everything sold for Robux, each entry carrying
`id`, `label`, `kind` (`gamePass` | `devProduct`), `axis` (`value` | `radius` | `speed`, joining
`upgrades[].id` verbatim exactly as `modifiers.axes[].id` does), `factor` (≥ 1), `priceRobux`,
`rung` (`impulse` | `mid` | `premium`), `repeatable` (boolean), and a `forbidden` array of rows a
merge check can grep. It is proposed by sheet `01` only; `npm run bridge` will report it and
never merge it until `bridge/schema.mjs` grows a shape, which is the expected outcome and not a
failure.

**Price points, and a boundary I am naming rather than smuggling.** `cid/gameplay/_category.md`
§06 rules that "Price points are numbers and belong to Balance & Tuning". The verification rule it
derives from reads "every **economy, pacing or progression** number appears in Balance & Tuning
and nowhere else". A Robux price is none of those three: it enters no curve Balance tunes, it
never touches `upgrades[].costBase`, and it is sourced from an external market rather than
derived from the loop. My ruling, `[cid: decided]`, and flagged upward: **`products[].priceRobux`
is a value inside my key, written with the fetched band it sits in and a test range. Balance &
Tuning may move any figure inside its band without a revision; moving one outside the band is a
revision against the sheet.** That is the same shape-versus-value split the category applied to
every curve, and it stops `products` shipping as half a key. If the category lead prefers the
literal reading, the fix is one field moving table and no sheet changes.

---

## Why 3 sheets

Anchored to the contract, not to a preference. My subject needs **one key**, so it gets **one key
sheet** — a builder cannot create a game pass from an adjective; it needs an id, a kind, an axis,
a factor, a price and a rung, and that is sheet `01`. Two further sheets exist only because each
constrains `products` and would otherwise be invented at build time. Sheet `02` is where the
brief's hardest line, "never content access", becomes rows a grep can fail, and it is also where
**four of the six parts of my `owns` list are recorded as closed rather than quietly absent** —
developer products, boosts, gacha and pull rates are each shut by a ruling already on disk, and
an index that simply omitted them would read as an oversight to the next person. Sheet `03`
exists because of a collision nobody has stated: the axis ceilings are 92% consumed before a
single product exists, so a 499-Robux radius pass could be absorbed by a clamp and deliver
nothing — that is a player-noticeable defect and two builders would resolve it differently, which
is both stopping-rule bars at once. I considered and rejected a fourth sheet for the premium tool:
it is the top rung of one ladder, not a second decision, and its only genuinely separate question
(does the head get wider) belongs to the key owner of `tool`, not to me.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-offer-ladder` | Name every product this game sells and carry the `products` manifest that supplies it: per product an `id`, a player-facing `label` under `theme/vocabulary/01`'s form rules, `kind` (`gamePass` or `devProduct`), the `axis` it multiplies — only `value`, `radius` or `speed`, because `gameplay/systems/05` ruled nothing is luck-shaped and the brief's fourth allowed target has no quantity left to move — a `factor` ≥ 1 that is one instance per product id and never persisted, a `priceRobux` figure written with the fetched band it sits inside and a test range, `repeatable`, and a `rung` of impulse, mid or premium; decide the rung count against shipping neighbours that run from 1 to 18 passes rather than against a comfortable number, and decide whether all three axes are sold or fewer. Include the premium rung the brief flags as homeless twice, ruling explicitly whether it is the oversized tool `gameplay/mechanics/04` unblocked, and if it is, state that its deliverable is a radius factor **plus a visibly wider head** — a requirement on the `tool` key you do not own, because `tool` drives head width off Reach *level* and a purchase grants no level, so as merged today the premium tool would look identical to the free one. Carry a `forbidden` array in the same manifest whose rows sheet `02` writes, and set no upgrade cost, no Shard figure and no in-game price. |
| 02 | `what-is-never-sold` | Write the closed list of things this store may never sell and never do, one row each with the observable that catches it, and supply those rows as the contents of `products.forbidden` in sheet `01`'s manifest. State as closed, each with the ruling that closes it and not with a new opinion: gacha and pull rates (no per-Find rank exists per `systems/03` and no discovery rate exists per `systems/05`, so there is nothing to roll or to bias, and a paid random mechanism would additionally owe numerical odds disclosure summing to 100% and a `PolicyService` restriction path); developer products and every repeatable purchase (nothing in a permanent-multiplier store may be bought twice — `systems/06` allows at most one instance per product id); timed boosts as the genre means the word (`systems/06` forbids a modifier that expires, decays, resets, is timed or is spent); currency sale at any rate (`systems/04`); cosmetics (declined in the brief as needing a display system first, and `identity/04` removes the follower version twice over); any paid area, Find or set; a premium tool that is the only way to have a tool (`mechanics/04` `T12`); and the store-surface bans this domain inherits as `theme/tone/04` `D9` and `D10` — no timer or "limited" tag on an offer, no discount countdown, no unprompted purchase popup, no offer that interrupts a beat in the beat map, no code entry field, no like, favourite, follow or group prompt. Add the one prohibition the platform corroborates independently and no sheet has stated: no offer may be presented with a manufactured scarcity or urgency. Propose no key. |
| 03 | `purchase-headroom` | State the rule that bounds how much of an axis's ceiling a purchase may consume, and rule what happens when a purchase cannot be delivered. `gameplay/systems/06` clamps effective radius below `area.size / 2` and effective speed at `movement.baseClearRadius / serverTickSeconds`, applies the clamp exactly once after every source, and forbids a purchase that raises an axis past its ceiling; `gameplay/core-loop/05` reports depth-4 arrival already at 3.84× of a 4.16× cap with speed maxed on arrival. So decide, per axis, whether a purchase fits at all, and give the inequality a purchase factor must satisfy **at every depth including the deepest** — the inequality, not the factor, which is Balance & Tuning's. Then rule the failure case explicitly: whether the axis is simply not sold, whether the factor is sized to fit under the worst case, or whether the ceiling budget must rise — naming the key owner for the third rather than changing their value. Finally, rule in one line what the player is shown when a purchase stops applying, either because the clamp absorbed it or because `systems/06`'s recompute-from-live-ownership rule dropped it after a refund, given that `theme/fantasy/03` `C3` fixes that nothing in this game is ever taken back. Propose no key; every constraint here rides in `products` or as an acceptance-criteria grep. |

---

## Verification note

**Sheet `03` is the one most likely to be contradicted, and Balance & Tuning is who will do it.**
Its bound is computed against `core-loop/05`'s arithmetic (depth-4 arrival at 3.84× of a 4.16×
cap) and `systems/06`'s ceiling rules, and every input to both — `upgrades[].maxLevel`,
`perLevel`, `area.size` at depth, and the server tick rate — is owned elsewhere and not final.
`core-loop/05` explicitly recommends raising `maxLevel` as one of two fixes to a *different*
collision; doing so moves my headroom underneath me. The sheet must therefore be written as a
predicate over those values rather than as a verdict about a particular factor, so it survives
their change instead of being falsified by it.

**Second most likely: sheet `01`'s premium rung**, contradicted by whoever owns `tool` if they
decline to make head width read effective radius rather than Reach level. That is a legitimate
refusal — `T11` says only the head's width changes and `mechanics/04` was explicit that width is
driven by "the Reach axis alone" — and if it is refused, the premium SKU is a radius multiplier
with no visible expression, which reopens "the premium SKU has no home" from a new direction. The
sheet should state that dependency in the open rather than assume the width follows.

**Least likely to be contradicted: sheet `02`.** Every row of it cites a ruling that is already
merged or a platform rule, and it invents nothing.

---

## Research owed

**`must_verify` required price points from at least two shipping games in the genre before setting
any price. Five were fetched, all live today, spanning the direct reference, the same
`X Incremental` family, a collection-shaped game and two cleaning/restoration games.** These land
in `cid/_research/pack.md` and are the only external evidence my writer will have.

- The brief's reference **`[🌱] Grass Incremental Simulator`** still ships exactly the pass list
  the brief recorded, so the brief's monetization numbers are current rather than stale: **2x
  Walkspeed 29 · 2x Rebirths 99 · 2x Grass Luck 99 · 2x EXP 99 · 2x Bronze 199 · [OP] Giant
  Trimmer 2,500**, offsale "2x Grass" and "Nothing", at 38,488,889 visits, 135,478 upvotes and
  1,659 current CCU. One extra entry appears that is **not a price point and must not be averaged
  into anything** — a pass named "Test" listed at 495,130 Robux, which is a developer artifact.
  `[research: https://www.rolimons.com/game/133086043677134]`
- **`Faith Incremental`**, the same `X Incremental` family, ships **18 live passes** across a
  20-fold range: 25 (Pray Anywhere), 25 (3x Bible Collection Radius), 25 (Auto Drain Spirits), 49
  (2x Walkspeed), 59 six times, 69 twice, 99 four times, 139, and 499 (5x Walkspeed), at
  10,262,143 visits and 321 CCU. **Floor 25, median 59, ceiling 499** — and note that a *second*
  rung of the same multiplier (2x then 5x walkspeed at 49 then 499) is how this family builds a
  premium rung without inventing a new axis. `[research: https://www.rolimons.com/game/94264573845314]`
- **`DIG`**, the closest shipping collection-shaped game (a 601-item logbook, 56,047,649 visits),
  ships **6 passes and no impulse rung at all**: 99 (Car Materials), 249 (Sell Anywhere), 249
  (Double XP), 299 (Appraisers Luck), 349 (Shovel Club), 499 (Spawn Vehicle Anywhere). **Floor
  99.** `[research: https://www.rolimons.com/game/126244816328678]`
- **`Pressure Wash Simulator`**, cleaning-and-restoration shaped and the largest game sampled at
  141,055,601 visits, ships **7 passes with a floor of 199**: 199 (Extra Jump Height), 199 (Double
  Speed), 299 (Ultra Circle Nozzle), 399 (Double Money), 399 (Jetski), 699 (The ONE), 799
  (Infinity Tank). `[research: https://www.rolimons.com/game/7009799230]`
- **`Carpet Cleaning Simulator`** (28,261,668 visits) is the smallest ladder found and the
  counter-example to "more rungs is safer": **exactly one live pass, "VIP Cleaner - Lifetime
  Pass" at 1,499 Robux**, with three currency packs (Starter, Pro, Mega Cash) taken offsale and
  their prices no longer listed. `[research: https://www.rolimons.com/game/124374448373637]`
- **The axis-matched read across those five, which is the directly usable finding:** the same
  multiplier sells across two orders of magnitude and **the axis does not set the price, the rung
  does.** Radius/reach ships at 25 (Faith's 3x Bible Collection Radius), 299 (Pressure Wash's
  Ultra Circle Nozzle) and 2,500 (Grass's [OP] Giant Trimmer, which `research/grass-incremental.md`
  identifies as a radius upgrade and the whale item). Move speed ships at 29 (Grass), 49 and 499
  (Faith's 2x and 5x) and 199 (Pressure Wash). Currency value ships at 59 (Faith), 199 (Grass),
  249 (DIG) and 399 (Pressure Wash). `[research: https://www.rolimons.com/game/94264573845314]`
- **Two independent third-party pricing guides agree on the rung structure**, which is the only
  corroboration available for "impulse to whale" as a shape: impulse **"25 - 75"** / **"25–75 R$ —
  reflex buy"**; mid **"99 - 249"** / **"100–250 R$ — considered buy"**; premium **"249 - 499"** /
  **"400–1,000+ R$ — commitment buy"**; and a whale band of **"999 - 4,999"**. One adds that round
  numbers (100, 250, 500) perform marginally better than charm prices on Roblox.
  `[research: https://rolearn.dev/guidance/roblox-gamepass-pricing-strategy-guide/]`
  `[research: https://generalistprogrammer.com/tutorials/roblox-game-pass-pricing-guide]`
- **A pass is the right instrument and the platform says so in one sentence.** A pass lets a
  creator "charge users a one-time Robux fee to access special privileges inside your game", with
  "minimum price is 1 Robux, and the maximum price is 1 billion Robux", checked with
  `UserOwnsGamePassAsync()` and prompted with `PromptGamePassPurchase()`.
  `[research: https://create.roblox.com/docs/production/monetization/game-passes]`
- **And the platform closes developer products for this game in one sentence too.** A developer
  product is "an item or ability that a user can purchase more than once, such as in-game
  currency, ammo, or potions", handled by `PromptProductPurchase` and a `ProcessReceipt` callback,
  and the docs state that for "items or abilities that a user should only purchase once" you
  should use passes instead. Nothing this game may legally sell is repeatable.
  `[research: https://create.roblox.com/docs/production/monetization/developer-products]`
- **Roblox's own monetization overview independently corroborates `theme/tone/04` `D9` from the
  platform side**, advising that discounts be "genuine and fair" and against creating a "false
  sense of urgency" through misleading countdown timers or artificial scarcity claims. `D9` was
  written from the brief's zero-tension rule; it is also platform guidance.
  `[research: https://create.roblox.com/docs/production/monetization]`
- **A third, platform-side reason gacha does not belong here**, on top of the content-access ban
  and `luckShaped: false`: any paid random outcome requires the creator to "indicate all possible
  outcomes and the actual numerical odds of what they may receive", as percentages summing to
  exactly 100%, and any purchasable luck booster must have its effect explained numerically with
  "the new odds … dynamically updated when these items are active". `PolicyService:
  GetPolicyInfoForPlayerAsync()`'s `ArePaidRandomItemsRestricted` flag can make paid random items
  unavailable to a given user entirely, requiring an unpaid path or removal of the feature.
  `[research: https://create.roblox.com/docs/production/monetization/paid-random-items]`
- **Recorded once so nobody re-derives it, and used for nothing:** "Creators generally earn 70% of
  anything they sell in Robux in their game", and DevEx converts 10,000 Robux to $38 USD. Revenue
  is a declined non-goal, so no sheet in this domain may turn a price into an earnings argument.
  `[research: https://create.roblox.com/docs/production/earn-on-roblox]`
- The prompt methods take a `player` argument, and ownership is read with
  `UserOwnsGamePassAsync(userId, gamePassId)`.
  `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]`
  **`[unverified]`** — whether a `LocalScript` may call `PromptGamePassPurchase`, and whether
  ownership results are cached within a session, are not stated on the page as fetched. Settled by
  fetching `create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptGamePassPurchase`
  directly for its security context, which is the one thing sheet `02`'s "never unprompted" row
  and G6's trigger question turn on.

**What I could not verify.**

1. **`Leaves Incremental` and `Scrap Incremental` price lists — unavailable after four attempts of
   three kinds.** Rolimons returned HTTP 404 for both place ids (`113380129609386`,
   `92876036717311`, `129774084106862`); the legacy
   `games.roblox.com/v1/games/8974089723/game-passes` returned 404 for the universe id resolved
   from `apis.roblox.com/universes/v1/places/113380129609386/universe`; and robloxgo carries the
   game but no store section. **Materiality is low**: robloxgo reports Leaves at **53,468 visits**
   `[research: https://www.robloxgo.com/game/113380129609386/Leaves-Incremental]`, three orders of
   magnitude below the other samples, so it is a weak price reference regardless. Scrap is the
   more useful of the two, being the reference studio's own template. **The fetch that would
   settle both:** the Roblox experience Store tab rendered with JavaScript
   (`roblox.com/games/{placeId}/…#!/store`), or an authenticated
   `apis.roblox.com/game-passes/v1/universes/{universeId}/creator-game-passes`.
2. **`reStore` (universe id `10159906713`, resolved successfully) has no reachable pass list** —
   rolimons 404. It is the nearest thematic neighbour found by wave-1 Fantasy work and would be
   the most on-point restoration price sample. Same fetch would settle it.
3. **No developer-product price point was obtained anywhere in the genre.** Every price above is a
   game pass. Carpet Cleaning Simulator's Starter/Pro/Mega Cash are the right shape and are
   offsale with prices withheld. Consequence: sheet `02`'s "developer products are empty" is
   decided on **structure** — nothing here is repeatable — and not on a market observation, and
   should say so rather than imply the genre avoids them.
4. **The "~70% mobile" split is still uncorroborated**, carried forward from the wave-2 pack's
   own "Not settled" list. It bears on this domain only through where a purchase control can live,
   which is store-surface work's, not mine.
