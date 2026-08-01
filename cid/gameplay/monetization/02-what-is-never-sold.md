# 02 — What is never sold

**Domain:** gameplay/monetization · **Category:** Gameplay · **Wave:** 3 · **Revised:** coordinator
ruling R-4, and the wave-3 `[cid: decided]` invariant

## Decision

**Twenty named things this store may never sell and never do, `F1` to `F20`, each with the ruling
that closes it and the observable that catches it.** Nineteen are closed by a decision already on
disk or by a platform rule; one — `F11`, manufactured scarcity — is new here and is corroborated by
the platform independently of any sheet.

## Why

**This sheet carries no manifest block.** Its twenty rows *are* the value of `products.forbidden`,
supplied inside sheet `01`'s proposed `products` key. One key per subject.

**Nothing here is a new opinion, and that is the point.** Four of the six parts of this domain's
`owns` list — gacha and pull rates, developer products, timed boosts, currency sale — are shut by
rulings made before this domain ran. An index that simply omitted them would read as an oversight to
the next person; a row that cites the ruling reads as closed. The brief's line is one sentence,
*"Permanent multipliers only. Never content access"*, with *"a paid-only object would turn 100%
completion into a purchase, which poisons the differentiating system"* `[brief: soft]` ←
`[you accepted: R5 Q4]`, `03-META.md`. The *forbidden* half is stated as a hard limit with its reason
attached, which is why it is treated as effectively closed rather than as a preference.

**Prohibitions, not a policy sentence.** A build agent cannot count "never content access". It can
count `TextBox` instances, `ProcessReceipt` callbacks, `Player.MembershipType` reads and strings
matching a regex. Every row below is one of those, because a prohibition with no observable reaches
a build only if a reviewer remembers it.

**R-4 made six rows strictly stronger, and that is worth stating rather than quietly editing.**
`F10`–`F15` and `F19` were written against an in-game store surface. There is no store surface: the
pass is bought from the Roblox experience page and the game draws no purchase control at all. So
every row that read "in the store surface" now reads **"anywhere in the game"**, and `F13` collapses
from "only from an explicit player activation" to **"zero `PromptGamePassPurchase` calls, in any
path"**. Each new form implies the old one, so nothing was weakened and no row was dropped.

**Three rows carry reasoning, because each closes something the genre would otherwise supply by
default.**

**`F3`, gacha.** There is nothing to roll and nothing to bias: `gameplay/systems/03` fixes that one
graded rarity ladder exists, it is the overgrowth's, and a Find carries no rank;
`gameplay/systems/05` removes duplicates by partitioning the sets across areas, so no discovery
*rate* exists either. On top of both, a paid random outcome would oblige this game to publish "all
possible outcomes and the actual numerical odds" as percentages summing to exactly 100%, to explain
any luck booster's effect numerically with "the new odds … dynamically updated", and to carry a
`PolicyService` `ArePaidRandomItemsRestricted` path with an unpaid alternative or the feature removed
`[research: https://create.roblox.com/docs/production/monetization/paid-random-items]`. Three
independent reasons, and the first two are structural.

**`F5`, developer products.** Nothing here is repeatable — `gameplay/systems/06` allows at most one
instance per product id — and the platform reserves developer products for "an item or ability that
a user can purchase more than once", directing anything bought once to a pass
`[research: https://create.roblox.com/docs/production/monetization/developer-products]`. **This row
is decided on structure, not on a market observation:** no developer-product price point was
obtained anywhere in the genre, so nothing here should be read as "the genre avoids them".
`[research owed: a live developer-product price list from any shipping game in the X Incremental or
cleaning-restoration family — Carpet Cleaning Simulator's Starter/Pro/Mega Cash packs are the right
shape and are offsale with prices withheld.]`

**`F11`, manufactured scarcity — the one prohibition no sheet has stated.** `theme/tone/04` `D9`
bans the timer and the countdown, from the brief's zero-tension rule; the platform independently
advises that discounts be "genuine and fair" and against creating a "false sense of urgency" through
misleading countdown timers or artificial scarcity claims
`[research: https://create.roblox.com/docs/production/monetization]`. `D9` catches the widget;
`F11` catches the sentence — *"only 3 left"*, *"1,204 players own this"*, a waitlist, a queue —
which is the same manipulation with no clock attached. `[cid: decided]`, flagged below.

**The `MarketplaceService` `[unverified]` is now moot and is recorded as closed rather than
deleted.** The first draft flagged that whether a `LocalScript` may call `PromptGamePassPurchase` is
not stated on the page as fetched
`[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]`. Under R-4
the method is never called from either side, so the question no longer bears on any row. It would
return the moment a purchase surface is proposed, and `F13` is where it would land.

**Support producing no row:** the audience is 8–14 `[brief: binding]` ← `00-CORE.md`, and a
substantial share of that band is under 13 on the platform. No sheet anywhere asks for a spend guard
and none is invented here on my own authority; it is the developer's call, flagged below.

| id | never | closed by | observable |
|---|---|---|---|
| `F1` | A paid area, Find or set, or paid access to any of them | `03-META.md` `[brief: soft]` | No `products[]` entry grants a `collection` entry, an `area` id or a set; `axis` is always one of `value`/`radius`/`speed` |
| `F2` | Currency sold at any rate, in any bundle, ever | `gameplay/systems/04` | No `products[]` field names Shards or an amount; `priceRobux` exists and no `priceShards` field does; zero code paths credit currency from a purchase |
| `F3` | Gacha, loot box, crate, roll, spin, pull, egg, or any randomised purchase outcome | `gameplay/systems/03`, `gameplay/systems/05`, platform paid-random-items rules | Every `products[]` entry has a deterministic `factor`; zero odds tables anywhere; zero `PolicyService:GetPolicyInfoForPlayerAsync` calls |
| `F4` | A luck multiplier, a discovery-rate multiplier, or a find-better-Finds product | `gameplay/systems/05` (`luckShaped: false`), `gameplay/systems/03` (no per-Find rank) | No `products[].axis` equals `luck`; the substring `luck` appears in zero player-facing strings |
| `F5` | Developer products, and anything repeatable | `gameplay/systems/06` (one instance per product id), platform guidance | Every `products[].kind` is `gamePass`, every `repeatable` is `false`; zero `PromptProductPurchase` calls; zero `ProcessReceipt` callbacks |
| `F6` | A timed boost, or any modifier that expires, decays, resets, is consumed or is spent | `gameplay/systems/06` | No `products[]` field named `duration`, `expires`, `seconds`, `uses`, `charges` or `cooldown`; no purchase-derived modifier carries a timestamp |
| `F7` | Cosmetics of any kind — skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title, nameplate | `03-META.md` (declined, needs a display system first), `theme/identity/04`, `theme/identity/02` | No product changes any instance parented to the character other than the tool head's width |
| `F8` | A premium tool that is the only way to have a tool | `gameplay/mechanics/04` `T12` (`premiumVariantMayBeOnlyTool: false`) | A player owning zero products spawns with a tool welded to the right hand |
| `F9` | A product granting a second modifier, currency, a Find, an area or a cosmetic | `gameplay/systems/06` | Every `products[]` entry has exactly one `axis` field and one `factor` field and no `grants` array |
| `F10` | A timer, countdown, expiry, "limited", "new", "ends in" or "today only" attached to an offer, **anywhere in the game** | `theme/tone/04` `D9`–`D10`, platform monetization guidance | Zero player-facing strings match `/limited\|hurry\|today only\|ends in\|last chance\|expires/i`; no element updates on a clock |
| `F11` | Manufactured scarcity or urgency — a stock count, "only N left", "N players own this", a waitlist, a queue | Platform monetization guidance (artificial scarcity, false sense of urgency); `[cid: decided]` for the row | No player-facing string contains a number sourced from anything but the player's own state |
| `F12` | A discount, strikethrough price, sale price, bundle price or first-purchase bonus | `theme/tone/04` `D9`, platform monetization guidance | Exactly one price per product; `products[]` has no `priceWas`, `discount`, `bundle` or `bonus` field |
| `F13` | A purchase prompt of any kind. Under R-4 there is no in-game store, so the method is never called | `theme/tone/04` `D10`, coordinator ruling R-4, `gameplay/mechanics/02` (input closed at five verbs) | **Zero `PromptGamePassPurchase` calls anywhere in the build, in any path** |
| `F14` | An offer interrupting a beat — anything purchase-related opening, animating or changing within 2 s of a Find reveal, a set completion or an area completion | `theme/tone/03` `B1`–`B3`, `gameplay/mechanics/05` | No purchase-related instance or string exists at all, so no code path can reach the reveal or completion channels |
| `F15` | A code entry field, or a like, favourite, follow, group-join, rate-us or share prompt, **anywhere in the game** | `03-META.md` priority 3 (codes), `theme/tone/04` `D10` | Zero `TextBox` instances in any screen; zero strings match `/code\|group\|favou?rite\|follow\|rate us\|share/i` |
| `F16` | A verb behind a paywall | `gameplay/mechanics/02` (five verbs, no sixth) | `move`, `look`, `jump`, `buy` and `openIndex` all function in a session with zero passes owned |
| `F17` | A purchase that shortens, skips, auto-completes or bypasses clearing work — instant-clear, auto-clear, area skip, completion grant | `03-META.md` (never content access), `theme/fantasy/03` `C3` | No product clears a patch, completes an area or grants a Find; 24/24 is reachable owning zero products |
| `F18` | A subscription, a recurring charge, or a benefit gated on Roblox Premium membership | `gameplay/systems/06` (nothing timed), `03-META.md` (never content access) | Zero reads of `Player.MembershipType` or `MembershipType.Premium` anywhere in the build |
| `F19` | A product named, shown, priced or referred to **anywhere inside the game**. R-4 leaves no surface that may mention one | `theme/tone/04` `D10`, coordinator ruling R-4 | No `products[].label` and no `priceRobux` value appears in any string rendered by the game |
| `F20` | Purchase-derived state written to persistence | `gameplay/systems/06` (recomputed from live ownership, never persisted) | The save payload contains no pass id, no product id and no purchase-sourced factor |

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Store-surface work (UI/UX) | **There is nothing to draw.** Under R-4 the seven rows that once constrained a shop screen (`F10`–`F15`, `F19`) now forbid the screen itself, along with the countdown, the sale badge, the "N left", the code box, the group button and the popup. Four pressables and five verbs stand as `mechanics/02` fixed them. |
| Store-page and marketing work (wave 7) | `F10`–`F12` and `F19` bind strings *inside* the game and do not reach the experience-page listing, which `theme/tone/01` explicitly exempts from this domain's register. Since the listing is now the only place `Span` is discoverable, that exemption is doing more work than it was written to do. |
| Persistence work | `F20` means the save payload gains nothing from this domain. Ownership is a live platform read at every join per `gameplay/systems/06`, and caching it into the save is the specific failure this row catches. |
| Security and integrity work | `F5`, `F13` and `F18` are three whole subsystems that must not exist — no receipt-processing path, no purchase prompt on either side of the wire, no membership read. `04-PRESENTATION.md`'s integrity surface is unchanged by this domain, because no product grants currency, a Find or an area. |
| Verification and contract-and-seam work | Every row is a grep, a manifest field test or a runtime inspection, deliberately. A prohibition list with no manifest block reaches a build only because sheet `01` carries these rows as data. |

## Acceptance criteria

1. `products.forbidden` contains exactly 20 rows; every row has `id`, `rule`, `closedBy` and
   `check`; every `id` is unique and matches `/^F\d+$/`.
2. The build contains zero `PromptGamePassPurchase` calls, zero `PromptProductPurchase` calls, zero
   `ProcessReceipt` callbacks, zero `PolicyService` calls, and zero reads of
   `Player.MembershipType`.
3. In a session owning zero passes: the player spawns holding a tool, all five verbs function, and
   every Find, set and area remains reachable.
4. No player-facing string in the build matches
   `/limited|hurry|today only|ends in|last chance|expires|% off|sale|only \d+ left|code|group|favou?rite|follow|rate us/i`,
   and no string in the build equals any `products.items[].label`.

## Flagged to the developer

| item | position |
|---|---|
| **`F11` is the one row this sheet invents** | `[cid: decided]`. No sheet and no brief line forbids manufactured scarcity; `theme/tone/04` `D9` forbids the *widget* (timer, countdown) and the platform's own guidance forbids the *claim* (artificial scarcity, false urgency). I added the row because a "only 3 left" sentence with no clock passes `D9` and is the same manipulation. If you would rather this stayed platform guidance rather than a project rule, striking `F11` costs one row and nothing else in the wave depends on it. |
| **No spend guard exists for the under-13 share of an 8–14 audience** | Recorded as support for the exclusions above and deliberately not converted into a row. Inventing a spend guard on my own authority would be a design decision the brief never asked for, and under R-4 the game has no purchase surface to guard. If you want one, it belongs on the experience page, not in this key. |

## Not decided here

Which products exist, what they cost and what they multiply — sheet `01`, this domain, which holds
the key these rows ride in. How much of an axis a purchase may consume and what happens when one
cannot be delivered — sheet `03`, this domain. Whether a purchase surface is ever built and what it
would look like — nobody, under R-4; reopening it is a revision against sheet `01` and against
`mechanics/02`. Whether `bridge/merge.mjs` grows a check running these greps or they stay
build-report items — contract-and-seam work. Whether a spend guard exists for under-13 players — the
developer. The experience page's own copy, which `theme/tone/01` places outside this register —
Discovery & Marketing, wave 7.
