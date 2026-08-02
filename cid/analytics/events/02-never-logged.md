# 02 — Never logged

**Domain:** analytics/events · **Category:** Analytics · **Wave:** 5

## Decision

**Twenty-four things no event in this catalog may ever carry, `N1` to `N24`, each with the rule
that closes it and an observable a grep or a manifest read can check.** Eight are the platform's
own enumeration of personal information; eight are `03-META.md` priority-3 subjects named in order
to forbid them; the rest are approved-sheet prohibitions and two cardinality rules.

This sheet carries no manifest block: it writes the rows that ride in `telemetry.forbiddenPayload`,
supplied by sheet `01`.

## Why

- **The compliance shape is unusual and worth stating before the rows.** `LogCustomEvent` takes a
  `Player` `[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`,
  so identity is the platform's and this game defines no identifier at all. Every row below is
  therefore a rule about *fields the game would have to invent*, not about a field it has. That is
  what makes an 8–14 audience a non-issue rather than a mitigation `[brief: binding]` ← *"8–14,
  mobile-heavy, short sessions"* (`00-CORE.md`).
- **`N1`–`N8` are the platform's list, not mine.** The community standards enumerate email,
  passwords or access tokens, home address, financial information, medical information, telephone
  number, off-platform internet identifiers, sensitive credentials, and visual and audio media of a
  user, and state that *"users may be prohibited from sharing or requesting personal information on
  Roblox depending on their age"*
  `[research: https://about.roblox.com/community-standards]`. The brief states no data rule
  (`OPEN.md §5` #6 marks Integrity `[I assumed]`), so this is discharged as sourced platform policy
  rather than as an asserted policy of mine.
- **One claim that would strengthen `N9` is `[unverified]` and is not relied on.** Search results
  attribute to Roblox's Terms of Use that *"users are only allowed to be identified by their user
  ID"*, but that page, the Privacy and Cookie Policy and the Creator Third Party App Policy all
  returned HTTP 403 to this domain's research pass. `N9` therefore rests on `social.forbidden` `X7`
  and on the fact that the catalog needs no identifier, both of which hold without it.
  **Settling fetch: any of those three help-centre articles retrieved with a browser-class user
  agent, or the same clauses located in `Roblox/creator-docs`.**
- **`N13`–`N20` name each priority-3 subject in order to forbid it**, which the category brief
  states is the compliant form. The temptation here is real and specific: a percentile is the
  natural way to summarise a distribution, and a "days since last session" field is the natural way
  to read return — the first is a leaderboard in a developer-facing coat, the second is defined
  over an offline period `03-META.md` cut `[brief: binding]` ← `[you chose: R2 Q1]`.
- **Two rows have to survive fields the revision rounds added.** `area_cleared`'s `lap` field
  carries `spanned` and `spanned_reset`, which mark a lap begun in a previous session, and
  `character_reset` names a Roblox menu action. Neither is a priority-3 metric and both are one
  careless sentence away from reading as one: **`spanned` is an exclusion flag with no duration
  attached** — it says which laps `lapClock` drops, never how long the player was away, which is
  what `N20` forbids. And `character_reset` is a respawn, not a progress reset; `N19` holds because
  no event in the catalog describes a decrease in any persisted field.
- **`N22` is the row most likely to be broken by good intentions.** Device is the most natural
  breakdown in the catalog and the brief's `~70/25/5` split is a prediction with no source, so the
  urge to spend a field on it is strong. The dashboard already breaks every default metric down by
  *Age Group, Platform, OS, Gender, Source, country, language*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md]`,
  and the catalog has exactly three field slots, all spent. Spending one here would buy nothing and
  cost the `detail` slot on every event.
- **`N23` and `N24` are cardinality and privacy rules that look like housekeeping and are not.**
  An absolute timestamp beside a `Player` is closer to identifying a person than an elapsed second
  and answers no question an elapsed second does not `[cid: decided]`. An unbounded field silently
  destroys every breakdown in the experience, because past *"8,000 combined values across all
  custom fields, values will be grouped as 'Other'"*
  `[research: https://create.roblox.com/docs/production/analytics/event-types]` — one free-text
  field would exhaust that budget alone and take the other twelve events' breakdowns with it.
- **`N12` is inherited, not invented.** `theme/tone/04` `X10` is *"measure freely, display none of
  it"*, approved wave 1. A field that exists only so a surface can render it is a surface request
  wearing an event's clothes.

### The rows

| id | never carried | rule that closes it | observable |
|---|---|---|---|
| N1 | an email address | platform PII enumeration `[research: https://about.roblox.com/community-standards]` | no `telemetry.events[].fields[].values[]` entry contains `@`; no field name matches `/mail/i` |
| N2 | a home or postal address | same | no field name matches `/addr|street|zip|postcode/i` |
| N3 | a telephone number | same | no field name matches `/phone|tel|mobile.?number/i`; no declared value matches `/\d{7,}/` |
| N4 | financial information — card numbers, payment details, or a real-money amount attributed to a person | same | no field name matches `/card|payment|iban|bank|usd|price/i`; the only money figure in the catalog is `products.items[].priceRobux`, which is a design value and appears in no event |
| N5 | medical or health information | same | no field name matches `/health|medical|diagnos/i` |
| N6 | a password, access token, session cookie or credential | same | no field name matches `/pass(word)?|token|secret|cred|auth/i` |
| N7 | an off-platform internet identifier — a Discord tag, a social handle, a username on another service | same | no field name matches `/discord|twitter|handle|social|external/i` |
| N8 | visual or audio media of a user, including an asset id of user-uploaded media | same | no field carries an `rbxassetid`; no field name matches `/image|photo|audio|voice|asset/i` |
| N9 | any identifier for any player, including the recipient's own | `social.forbidden` `X7` (`gameplay/social/03`), and the `Player` argument already supplies identity | no field name matches `/userid|user_id|playerid|displayname|username/i`; `^name$` appears in no field name |
| N10 | any player-authored string | `social.forbidden` `X9` | every `fields[].values[]` is a closed enum declared in the manifest; no field has `cardinality: "unbounded"` and none is marked free text |
| N11 | any second player's state — their balance, level, collection, area or position | *"no mechanical interaction"* `[brief: soft]` ← `[you accepted: R6 Q2]` (`02-GAMEPLAY.md`) | every `insertionPoint` is inside a per-player path and every value is read from the recipient's own `PlayerState`; `slot_claimed.value` is an occupancy count, not another player's state |
| N12 | any field that exists to be shown, or that a surface would have to be built to display | `theme/tone/04` `X10`, *"measure freely, display none of it"* | no sheet in `cid/ui-ux/**` names a `telemetry` field; this domain owes `vocabulary` zero player-facing strings |
| N13 | any leaderboard position or top-N membership | `03-META.md` priority 3 — leaderboards | no field name matches `/leader|top|board|rank/i` |
| N14 | any percentile or rank of a player against a population | priority 3 — leaderboards, and `X10` | no field name matches `/percentile|pct.?rank|quantile/i`; no event's `value` is defined relative to another player |
| N15 | any daily streak, consecutive-day count or login window | priority 3 — daily rewards | no field name matches `/streak|daily|login|consecutive/i` |
| N16 | any season, event calendar or limited-time window | priority 3 — seasons and events; *"Ships and settles"* (`OPEN.md §2`) | no field name matches `/season|event.?id|calendar|limited/i` |
| N17 | any code, code redemption or promo state | priority 3 — codes | no field name matches `/code|promo|redeem|voucher/i` |
| N18 | any trade, gift or transfer between players | priority 3 — trading, and `social.forbidden` | no field name matches `/trade|gift|transfer|send.?to/i` |
| N19 | any rebirth, prestige or reset cycle | priority 3 — rebirth `[brief: binding]` ← `[you chose: R2 Q2]`; *"Cleared is permanent"* makes progress monotonic | no field name matches `/rebirth|prestige|reset.?count|ascend/i`; no event describes a decrease in any persisted field; `character_reset` names a Roblox menu action, not a progress reset |
| N20 | any offline-accrual period or time-away figure | priority 3 — offline accrual, following `[you chose: R2 Q1]` | no field name matches `/offline|away|idle.?time|since.?last/i`; the `lap` field's `spanned` and `spanned_reset` values are exclusion flags with no duration attached and carry no offline period |
| N21 | any figure a player could be shown comparing them to another player | `X10` plus priority-3 leaderboards; two independent closures | no event's `value` or field is a function of more than one player |
| N22 | a custom field spent on Platform, OS, device class or Age Group | the dashboard supplies all four with no developer event `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md]` | no field name matches `/platform|device|^os$|age|viewport|fps/i`; the catalog's three field names are `area`, `owned` and one per-event `detail` |
| N23 | an absolute wall-clock date, time of day or Unix timestamp | `[cid: decided]` — a date beside a `Player` narrows identity and answers nothing an elapsed second does not | every `valueUnit` in `telemetry.events[]` reading in seconds says *since session start*, *since the previous above-tick payoff*, or *from entering this area*; none says *epoch*, *date* or *clock* |
| N24 | any free-text or unbounded-cardinality field | *"After 8,000 combined values across all custom fields, values will be grouped as 'Other'"* `[research: https://create.roblox.com/docs/production/analytics/event-types]` | `telemetry.customFields.combinedValuesUsed` is a finite integer and every `fields[].cardinality` is a number, never `"unbounded"` |

## Consequences for other work

- **Funnel-definition work** inherits all 24 rows on its `stepName` and custom-field values, because
  a funnel step is an event. `N10` in particular means a step name is a declared constant, never a
  string built at runtime from anything the player did.
- **Economy-flow work** inherits `N1`–`N9` and `N22`–`N24` on `LogEconomyEvent`'s `itemSku`,
  `transactionType` and custom fields. `itemSku` is a design value from `upgrades[].id` or
  `products.items[].id`; it may never be a constructed string.
- **Session and lap-clock work** inherits `N20` on the field both keys read through
  `telemetry.sharedPredicate`: `spanned` and `spanned_reset` mark a lap for exclusion and may never
  be widened into a time-away figure, and `spannedLapCount` is a count of laps, never of minutes
  anyone was gone.
- **KPI-shortlist work** inherits `N13`, `N14` and `N21` as a bound on what a headline row may be,
  which is a second closure on the same conclusion its own index reached.
- **Session and retention work** inherits `N15` and `N20`: a return reading may be a platform cohort
  and may not be a game-side "days since last session" field, because that field does not exist and
  may not be added.
- **Verification work** gets 24 greps and one manifest arithmetic check. Every row is mechanical on
  purpose — a prohibition list with no check reaches a build only if someone remembers it.
- **Contract-and-seam work**: `telemetry` is promoted **build-read**, not developer-facing, so these
  rows land in the half a builder does not consume — `telemetry.forbiddenPayload` sits beside
  `budget` and `unproducible` on the developer-facing side of `telemetry.promotion`. `N10`, `N22`
  and `N24` are still the three worth writing into `bridge/schema.mjs` as shape constraints rather
  than lints, because each is a property of the value a builder *does* read.

## Acceptance criteria

1. `telemetry.forbiddenPayload[]` has exactly 24 rows with ids `N1` through `N24`, no gaps and no
   duplicates, each carrying a non-empty `rule`, `source` and `observable`.
2. Running every row's regex against the union of `telemetry.events[].fields[].name` and
   `telemetry.customFields.*.name` returns zero matches across all 24 rows.
3. Every `telemetry.events[].fields[]` entry has a numeric `cardinality` and a `values[]` array of
   at most that length; no entry is marked free text and none has `cardinality: "unbounded"`.
4. No `telemetry.events[]` entry's `value` or field is read from more than one `PlayerState`, and
   no `insertionPoint` names a client module under `game/src/client/`.

## Not decided here

Which events exist, their ids, their sites and their payload fields — sheet `01`, this domain,
which holds the key these rows ride in. How much may be emitted and what a dropped event means —
sheet `03`. The gap derivation, the clock and the per-session pass predicate — sheet `04`. What each
`lap` value means for the published distribution — session and lap-clock work; the field and its
five literals are defined once in `telemetry.sharedPredicate` and neither sheet restates them.
Whether `AnalyticsService` custom events are permitted for an under-13 audience without additional
consent beyond the community standards above — `[unverified]`, and the settling fetch is Roblox's
Terms of Use or Privacy Policy retrieved with a browser-class user agent. Whether any of these greps
becomes a `bridge/merge.mjs` check or stays a build-report item — contract-and-seam work. What the
game shows a player, which is nothing from this domain — UI/UX, under `X10`.
