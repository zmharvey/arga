# Thumbnails — domain index

**Category:** Discovery & Marketing · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`,
`00-CORE.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md`,
`research/landscape.md`; `cid/marketing/_category.md`; `cid/_contract.md`, `cid/_state.md`;
`cid/art/_category.md` (all 685 lines), `cid/art/style/01`, `cid/art/objects/04`,
`cid/art/vfx/01`, `cid/art/ui-art/01`; `cid/gameplay/meta/02`, `/04`, `/07`;
`game/src/shared/Theme.luau`.

> **Corrected, round 2.** Two prose occurrences of `effects.beats[findReveal]` (in the M1 ruling
> and in sheet `03`'s row of the assignment table) now read `effects.cues[id=findReveal]`. `effects`
> holds `cues[]`, keyed by `.id`; `beats[]` belongs to `response`. No manifest value, `backedBy` or
> ruling depended on the spelling. This closes `storeThumbnails.secondHalf.staleSpellingElsewhere`.

This is an assignment document. It names four decisions and makes one ruling the category lead
asked me to make. It writes no hook, no overlay string and no slot.

---

## What the brief gave me

Four lines reach this domain and only one of them is about a thumbnail.

> *"It gives a thumbnail **two composable halves** — a cleared path through green, and a relic
> mid-reveal."* — `05-OUTWARD.md`, under the hook line `[you accepted: R6 Q1]` →
> **`[brief: soft]`**

That is the entire thumbnail specification in the brief. It states a composition, no count, no
order, no overlay policy, no cadence and no variant policy. **Its second half names a thing the
design has since decided does not exist** — see the ruling below.

> *"**Clear the overgrowth, find what's buried.**"* — `05-OUTWARD.md` `[you accepted: R6 Q1]` →
> **`[brief: soft]`**, and narrowed by an approved sheet: `theme/fantasy/02` rules it *"a
> first-session promise with a supply of exactly 24"*, that *"no line may promise endless new
> things to find"*, and that *"no line may promise a world that ends up reclaimed."*

> *"Left open — the name, icon, **thumbnail composition**, and store description."* —
> `05-OUTWARD.md`; `OPEN.md §4` routes the same item here by kind of work → **`[brief: soft]`**

> *"**Success is shipped artifacts, not players**"* and *"content design is the primary creative
> work on this project, not art or **marketing**"* — `00-CORE.md` `[you chose: R1 Q3]` and
> `[you chose: R1 Q1]` → **`[brief: binding]`** ×2. **A slot exists because it earns its place,
> not because ten are permitted.**

Inherited and not reopened here: `T0`–`T10` and ruling `M-B` from `cid/marketing/_category.md`;
`theme/setting/03` `R1`/`R2` (one hour, no weather, *"in any promotional image"*);
`theme/identity/04` (no mascot, no face but a player avatar); `theme/tone/02` (the humor ban
reaches thumbnails by name); `products.F19` + ruling R-4 (there is no shop screen to photograph);
`03-META.md` priority 3 (**no seasonal, event or holiday variant of any slot** — named here in
order to forbid it, and there is nothing for one to attach to: `theme/setting/03` states
*"there is no hour, weather or season channel to run anything through"*).

---

## My ruling on M1, made here so two sheets do not read one collision two ways

**`05-OUTWARD.md`'s second half is stale as written. Objects' ruling stands. No slot shows a
Find.**

Five grounds, none of them mine and none of them new:

- `representation.find` — *"A Find has **no Instance at any point in its life**"*, `class: null`,
  `createdBy: "nothing"`. A shipped build depends on it.
- `art/objects/04` ruled the outward half of the same question in wave 6 and answered **no world
  form, no icon, no image asset, no mesh**, with `iconCount`, `imageAssetCount`, `meshCount` and
  `worldInstanceCount` all `0`, and stated the price of reversing it as a table.
- `collection.sets[].relics[]` is an array of bare strings. **There is nowhere to hang art**, and
  adding an `art` field is a revision against a key `gameplay/meta` owns.
- `theme/tone/04` `D11` bans the silhouette / blurred model / greyed name / question-mark
  treatment the genre uses for an unfound entry, so the genre's own answer is closed here too.
- `T6` in this category's own truthfulness table: *"any image showing a Find as an object, a
  model, a card, a drop or an icon"* is a known-false claim.

**What survives, and it is not nothing.** `effects.cues[id=findReveal]` ships a real world beat:
one anchored `Part`, `3 × 0.4 × 3`, at the cleared patch's position, for a `dwellSeconds` of 2.5
(`art/vfx/01`). Its own `V7` states plainly that **it is not the Find**. So a reveal *moment* is
photographable and a revealed *object* is not, and the difference is the whole of sheet `03`'s
job. The honest reading of the brief's line is that its first half is buildable, its second half
names a subject that has none, and the sentence was written before either ruling existed.

**Sheet `03` files the revision request against `05-OUTWARD.md` and decides the replacement
subject.** It does not re-argue the ruling. I do not file a `## Pushing back` against
`art/objects/04`, because I agree with it.

---

## What the brief did not give me

Each routed to the item that will decide it. None filled here.

| # | gap | routed to |
|---|---|---|
| **N1** | **How many thumbnails this game has, and in what order.** The brief states a composition and no count. The platform permits ten and rewards two-to-five with an optimiser; `00-CORE.md` declines the thing the optimiser optimises. | sheet `01` |
| **N2** | **The brief's stated composition names a subject with no form.** M1 above; ruled here, replacement subject unnamed. | sheet `03` |
| **N3** | **No build a capture is legitimate from.** M2. `game/src/shared/Theme.luau` is the wrong archetype and every world subject the fiction requires is `[does not exist]`. Nothing in either contract owns producing a promotional capture, and no artifact says *this build is representative*. | sheet `02` |
| **N4** | **Whether a thumbnail carries text at all.** `owns` names the rule; three approved sheets exempt outward strings from every mechanical string rule (`M-B`), and the brief says nothing. | sheet `04` |
| **N5** | **Refresh cadence.** *"Ships and settles"* `OPEN.md §2` `[brief: soft]` implies never; nobody has said it, and the genre's own behaviour splits (see Research). | sheet `01` |
| **N6** | **Nothing owns uploading a thumbnail.** `release.publishChecklist` owns publish-time platform settings and their read-back and does not name thumbnails; no emitter writes one; `storeThumbnails` would merge and reach nothing. This is `M6` arriving at this domain. | named by sheet `02` as `RR-T1`; **publish-checklist work** (currently `tech/deploy`) to accept or refuse the entry **and to assign its row id** |
| **N7** | **Alt text has no owner and no register rule.** The platform offers per-thumbnail alt text *"for improved accessibility"*; `vocabulary`'s scope sentence is *"every player-facing string in the build contract"* and a thumbnail is not in the build contract. An 8–14 audience with a binding accessibility constraint is exactly the case for it. | sheet `04` to rule; **naming-rule work** (`vocabulary`) if the scope sentence is widened |
| **N8** | **The game has no name.** Any overlay containing a title depends on `title`, which is being decided in this same wave and whose ratification is reserved to the developer (`OPEN.md §3`, `M4`). | sheet `04` states the dependency and does not resolve it |
| **N9** | **The occupancy survey's stated limit** — *"'taken' here means 'exists', not 'successful'"*, no CCU or visit figures. **Partly closed by this domain's research**, below, and the closure is a fact about four competitors, not about the market. | recorded; relayed to **Name** and **Store Page**, which carry the other halves of `M9` |

---

## Why four sheets

**One contract key, one sheet that supplies it, three that constrain it — and each of the three
is a decision that would still have to be made if the slot count were zero.** Whether a capture
is legitimate at all (`02`) is prior to what any slot shows, applies to an image this project may
never be able to take, and is the finding the category lead says no other domain can answer.
Whether the brief's promised subject exists (`03`) is a ruling against a `[brief: soft]` line with
a revision request attached, and burying a pushback inside a slot table hides it from the reader
who most needs it. Whether text appears on an image at all (`04`) is a register-and-legibility
decision at phone size, not a per-slot one; it binds every slot identically and is the one part of
my `owns` list the brief is completely silent on. What is left — the slots themselves, their
order, their hooks, the cadence and the variant set (`01`) — is the key.

I considered folding `03` into `01`, since a slot table with no Find in it *is* the ruling
expressed as data. I did not, because the revision request against `05-OUTWARD.md` needs its own
acceptance criteria and its own `## Pushing back`, and because the Icon lead is ruling the same
collision from the other side and needs one addressable sheet to cite. I considered a fifth sheet
for the A/B set and one for refresh cadence: **both are fields, not decisions with their own
argument**, and they belong in `01` beside the slot list they describe.

Sheet `01` carries the `manifest`; `02`, `03` and `04` carry `{"amends": "storeThumbnails"}`
blocks, which is the house form (`analytics/funnels`, `tech/security`, `audio/mix`) and which
`bridge/verify-sheets.mjs:271` accepts as a data form.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-slot-set` | How many thumbnails this game ships and in what order, and for each slot: the one claim it sells, its `backedBy` resolving to a real key path or sheet id, its `captureSource` citing sheet `02`'s gate by field, its alt text, and its overlay string or the empty string — plus the refresh cadence and the active-variant count, each with the line that decides it and a runnable check, given the platform turns qPTR optimisation on at two active thumbnails and `00-CORE.md` declines acquisition by name. |
| 02 | `the-capture-gate` | What makes a capture of this game legitimate, as a precondition list with named gates rather than a note: which artifacts must be true before any promotional image may be taken (at minimum `uiTheme.archetype` emitted into `Theme.luau` with `A1` closed, `styleGuide`'s stone role reaching a `Part` via `RR-A1`, and the world subjects `art/_category.md` rows 10–19 mark `[does not exist]` existing), what is forbidden as a source, whether an image built in Studio from approved keys rather than captured from a running server is legitimate, and where the resulting file is owned given no emitter and no publish step writes one today. |
| 03 | `no-subject-for-the-second-half` | What the second of the brief's *"two composable halves"* actually is, given the first half (a cleared path through green) is buildable and the second (*"a relic mid-reveal"*) names a subject with no form: whether it becomes the 2.5-second reveal beat that `effects.cues[id=findReveal]` ships as one anchored `Part`, the index panel's held names, or nothing at all — and file the revision request against `05-OUTWARD.md` naming the line, its status, and what changes if it is declined. |
| 04 | `overlay-and-alt-text` | Whether any thumbnail carries overlay text at all and, if so, the rule that binds it: the word ceiling and its derivation from the surface rather than from `vocabulary`, the reading level for an 8–14 audience, the ban list that does bind (`M-B`), the forbidden classes (urgency, volume claims above 24/4/8/1, anything `T1`–`T10` reaches), the platform's own bottom-of-image exclusion zone, and whether every slot ships alt text and to what rule — stating the dependency on `title`, which does not exist yet. |

---

## Contract position

**One key, `storeThumbnails`, and it does not exist yet.** `cid/_contract.md` holds 25 merged
keys and none covers an outward surface; `storeThumbnails` appears in no `cid/**` sheet and is
not in the category's claimed-names list, so proposing it is legal. It would hold: the ordered
slot array (`claim`, `backedBy`, `captureSource`, `overlayText`, `altText`, `composition`), the
`captureGate` precondition block, the `refresh` cadence, the `activeVariants` count, and the
`forbidden[]` rows this domain states in order to forbid.

**I could not run `npm run bridge -- --contract`** — no shell in this session. I read
`bridge/schema.mjs`'s derived output at `cid/_contract.md` and the category brief's claimed-name
list instead. If the schema has gained a key since that file was regenerated, sheet `01`'s
proposal is the thing that would collide, and the check is one command.

**The key merges and reaches nothing today (N6).** That is not a reason to skip it — it is `M6`,
and `art/ui-art/01`'s *"the key would merge and change nothing"* is the same finding one wave
earlier, closed there by a named revision request rather than by silence. Sheet `02` states the
hole and names the kind of work that owns it.

---

## Verification note

**Sheet `02` is the one most likely to be contradicted, and the contradiction would come from UI
Art and from whoever owns the emitter.** Its gate is built on `uiTheme` sheet `01`, which is
itself `proposed`, whose `A1` is an open dependency inside its own domain, and whose `A3` is
marked **refusable** — *"if refused, `uiTheme` merges and changes nothing beyond the archetype
key."* A gate whose first precondition can be refused by another domain is a gate that may name a
condition nobody will ever satisfy. That is the correct failure — the sheet is then a finding
that this project cannot legitimately produce a thumbnail, which the category lead pre-authorised
as *"a real finding and better than a set produced from the wrong build"* — but a verifier should
read `02` against `art/ui-art/01`'s status before reading it against anything else.

Second-most likely: **sheet `03` against the Icon lead**, which is ruling the same M1 collision
from the other side in this wave. Both may forbid a rendered Find; only one may claim the
revision request against `05-OUTWARD.md`, and it is `03`. If Icon files one too, the duplicate is
the cross-category pass's to collapse.

---

## Research owed

**`must_verify`: *"Look at the current top of the genre on Roblox and record what their thumbnails
do."*** Everything below was fetched this session and lands in `cid/_research/pack.md` as the only
external evidence sheet writers get.

**What the genre actually ships, counted from the public media endpoint.** Not a snippet, not a
synthesis — the array each experience serves for its own detail page.

| game | visits | CCU at fetch | favourites | listed genre | thumbnails | videos | alt text |
|---|---|---|---|---|---|---|---|
| `[🌱] Grass Incremental Simulator` (the reference) | 38,572,206 | 1,088 | 579,483 | `All` | **1** | 0 | empty |
| `[AWAKENING] 🌱 Grass Cutting Incremental` | 29,438,632 | 249 | 80,066 | **`Comedy`** | **6** | 0 | empty |
| `[UPDT🍂] Leaves Incremental 🍂` | 403,766 | 0 | 13,868 | `All` | **2** | 0 | empty |
| `Scrap Incremental 🧲` | 333,896 | 0 | 2,547 | `All` | **1** | 0 | empty |

`[research: https://games.roblox.com/v1/games/7699580568/media]`
`[research: https://games.roblox.com/v1/games/3478678937/media]`
`[research: https://games.roblox.com/v1/games/8974089723/media]`
`[research: https://games.roblox.com/v1/games/9719511378/media]`
`[research: https://games.roblox.com/v1/games?universeIds=3478678937,7699580568,8974089723,9719511378]`
Universe ids resolved from place ids via
`[research: https://apis.roblox.com/universes/v1/places/133086043677134/universe]` and the three
siblings.

**Four things follow and every one of them bears on a sheet.**

1. **The 38M-visit market leader in this exact family ships one thumbnail.** The reflex to plan
   five slots has no support in the genre it would be imitating. Sheet `01`.
2. **Thumbnail count tracks age and update stream, not size.** The four-year-old game with five
   prestige layers accreted six images (three uploaded together, then one, then one, then one
   recent); the two commodity clones shipped one and two and have not touched them. *"Ships and
   settles"* has an observed analogue. Sheet `01`.
3. **Zero videos across four games, including both 29M+ titles.** Relevant to Hype's trailer
   ruling as much as to mine.
4. **Zero alt text across all four**, against a platform feature that exists and an audience band
   with a binding accessibility constraint. This is the cheapest available difference and nobody
   in the genre takes it. Sheet `04`.

**The platform's own rules, fetched, and three of them are load-bearing.**
`[research: https://create.roblox.com/docs/production/publishing/thumbnails]`

- *"You can feature up to 10 images or videos for each of your games' detail pages."*
- *"A thumbnail image should be 16:9 aspect ratio and ideally 1920×1080 pixels."* Formats
  *".jpg, .gif, .png, .tga, or .bmp."* All uploads moderated.
- *"Uploaded thumbnails appear in the Experience Detail Page tab where they can be reordered,
  deleted, or given 'alt' text for improved accessibility."*
- *"avoid placing any essential text or elements at the bottom of the thumbnail, as it may
  potentially be covered by metadata like the player count."* — **a real exclusion zone, sheet
  `04`.**
- *"Overlay text sparingly and only to describe gameplay contexts such as 'Collect coins to boost
  jumps.' Do not include any text, visuals, or audio that is an advertisement, promotion, or
  subjective claim."* — **the platform independently forbids what `T10` forbids, and reaches
  further: a subjective claim is out. Sheet `04`.**
- *"Graphics shown must be representative of the actual in-game visuals. Avoid artificially
  enhancing graphics beyond what a player will experience."* — **this is the platform's own
  version of the capture gate, and it means `T8` is not merely this project's rule. Sheet `02`
  cites it as the external ground.**

**Thumbnail personalisation, and why the A/B question is not free.**
`[research: https://devforum.roblox.com/t/get-your-thumbnails-ready-for-thumbnail-personalization/3226599]`
— *"Setting 2 or more thumbnails to active will turn personalization on"*, up to five active;
traffic starts split evenly and then *"thumbnails with higher qualified play through rates (qPTR)
for specific user groups will automatically receive more traffic from that group"*, targeted by
*"factors like age and genre."*
`[research: https://devforum.roblox.com/t/5-tips-from-roblox-staff-to-get-the-most-out-of-thumbnail-personalization/3471689]`
— *"Keep multiple thumbnails active for optimal performance"*, *"Avoid testing thumbnails that
are too similar"*, *"Monitor qPTR over time"*, and *"accurate representation remains crucial."*

**The consequence sheet `01` must rule on:** shipping a second active thumbnail is not a neutral
act of thoroughness. It switches on a platform optimiser whose objective function is a play-through
rate — the acquisition measure `00-CORE.md` declines by name and `analytics` `E5` forbids acting
on. One active slot leaves it off. Two or more turns it on and there is no opt-out short of
deactivating a slot. **Rule it with that stated; do not ship a variant set by reflex.**

**What I could not verify, and the fetch that would settle it.** **I could not see what any
competitor thumbnail depicts.** `WebFetch` returns markdown, so an image is a URL and not a
picture; all four games ship empty alt text, so there is no text description to read; and the one
page that catalogues a competitor's promotional media
(`roblox-grass-cutting-incremental.fandom.com/wiki/Promotional_Media`) returned **402** on both
Fandom hosts, which is the same wall `art/objects/04` hit. So the genre's *composition* convention
— whether these images use big display text, arrows, a shocked avatar face, a product shot, a
render or a screenshot — is **`[unverified]`**, and no sheet may assert it.

**The settling fetch, named specifically:** render
`https://www.roblox.com/asset-thumbnail/image?assetId=105218777592191&width=768&height=432&format=png`
(the reference's single thumbnail; the other five image ids are in the JSON above) in any
vision-capable reader, or open the four detail pages in a browser. That is one pass and it closes
the composition half of `must_verify` completely.

**Not owed and deliberately not fetched:** anything about the *icon* (Icon's `must_verify`),
competitor tag sets (Store Page's), and title occupancy (Name's). Three domains fetching the same
four pages is what `cid:research` exists to prevent.
