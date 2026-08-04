# Icon — domain index

**Category:** Discovery & Marketing · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md`, `research/landscape.md`;
`cid/marketing/_category.md`; `cid/_contract.md`; `cid/_state.md`; `cid/art/style/01`,
`cid/art/lighting/01` and `/02`, `cid/art/objects/02`, `/03` and `/04`, `cid/art/ui-art/04`,
`cid/art/characters/01`, `cid/art/environment/*` (manifest headers only),
`cid/theme/setting/03`; `game/src/shared/Theme.luau`.

**Expected key: `storeIcon`.** It is unclaimed — it appears nowhere in `cid/_contract.md`'s 25 and
nowhere in the category brief's claimed-names list. **I could not run `npm run bridge -- --contract`
in this session (no shell tool),** so the contract position below is read off `cid/_contract.md`,
which that command generates from `bridge/schema.mjs`, plus the category brief's enumeration of
every name claimed anywhere in `cid/**`. Anyone who can run it should confirm before merge.

---

## What the brief gave me

**On whether this artifact exists at all**

> *"Left open — the name, icon, thumbnail composition, and store description."* — `05-OUTWARD.md`;
> `OPEN.md §4` routes the same four here as *"decisions, not gaps"* — `[brief: soft]` on the routing,
> and the only place in eight brief sheets where the word *icon* appears about this surface.

**On what may be depicted**

> *"**R1** — One hour, and it never advances. … No dawn, dusk, night, sunset, moonrise or second hour
> exists anywhere in it, at any depth, on any screen, **in any promotional image**."* ·
> *"**R2** — **No weather, ever, as a depicted event.**"* — `theme/setting/03` → **`[brief: binding]`
> as relayed by the category** (`[cid: decided]` at its own sheet, hardened by `art/lighting/01`:
> *"every promotional image is at `ClockTime` 15.5"*).

> *"**Store-art work**: the icon and thumbnail have **no mascot and no face other than a player
> avatar.** Composition is the brief's two halves."* — `theme/identity/04`, addressed to this domain
> by name → **`[brief: binding]`** via `theme/tone/04` `D13`.

> *"A Find has **no world Instance, no icon, no image asset and no mesh.** Its only form is its name,
> rendered into the index slot `screens` owns."* — `art/objects/04`, on `representation.find`
> (*"no Instance at any point in its life"*) and `objectArt` `Z9` *icon renders of any object: 0*
> → **`[brief: binding]`** (an approved key a shipped build depends on). Its own closing line to me:
> *"Discovery and marketing work (wave 7) should note there is no object render for a thumbnail."*

> *"**there is no cast to put on a thumbnail.** No mascot, no NPC, no companion, no named figure. The
> only face available is a player avatar, which you do not control and may not dress."* —
> `art/characters/01` → `[brief: binding]` via `theme/identity/04`.

**On the palette and the contrast problem**

> Cleared stone `[216, 201, 169]`, Rec.601 luma **201.84**; seven world colour roles; `C5` bans
> gilding by construction; `C6` — *"green is the overgrowth channel and nothing else uses it."* —
> `styleGuide`, `art/style/01` → `[cid: decided]` upstream, approved.

> *"Warmth nearly halves the shortfall and still does not close it. Reaching 3:1 needs an authored
> Rec.601 luma near **231** — 66 above the floor, reading as near-white, which `theme/setting/01`
> forbids by name."* and `V13`: *"**No sheet may state the Rec.601 floor as the legibility
> guarantee.** … Legibility is carried by shape and silhouette."* — `art/lighting/02` → approved.
> Roblox *"publishes no contrast ratio at all"* and prescribes *"different symbols alongside
> colors"* `[research: https://create.roblox.com/docs/production/publishing/accessibility]`, banked.

> *"rarity tiers must differ by **shape or silhouette, not only hue**"* — `04-PRESENTATION.md`
> `[you accepted: R6 Q4]` → `[brief: soft]`, **treated as effectively binding**; a shipped build
> depends on that reading.

**On scale and register**

> *"**Success is shipped artifacts, not players.**"* · *"the **smallest game that still gives every
> creative area real work**."* · *"content design is the primary creative work on this project, not
> art or **marketing**."* — `00-CORE.md` `[you chose: R1 Q1, Q3]` → **`[brief: binding]`** ×3.

> *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards ·
> trading · **seasons and events**"* — `03-META.md` priority 3 → **hard gate**. Category row 17 makes
> a *"seasonal or event variant of icon, thumbnail or name"* **forbidden** by name.

> *"**Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message,
> tutorial text, or **store copy** is funny."* — developer, session 2026-07-30, at `theme/tone/02`
> → **`[brief: binding]`**, extended `[cid: decided]` to *"thumbnails"*.

**Two rulings my category made that I inherit and must restate in one line each**

> **M-A** — *"the build contains zero image assets; the experience page does not."* `art/ui-art/04`'s
> `icons.count: 0` and `imagePolicy.uiImageAssets: 0` are checks on `game/src` and on
> `GuiObject`s. **They do not reach a store icon.** `[cid: decided]` at the category, flagged.
>
> **M-B** — `vocabulary.bannedWords` (`relic relics tier artifact antique rebirth loot treasure`)
> binds every outward string; `maxLabelChars` 14, `casing`, `maxSentenceWords`, `allowedPattern` and
> `theme/tone/01` P1–P9 **do not**. A mechanical ceiling on an outward string is derived from the
> surface it renders on. `[cid: decided]` at the category.

---

## What the brief did not give me

Seven, each routed. None is filled here.

| # | gap | routed to |
|---|---|---|
| **G-I1** | **The brief states no icon composition at all.** Its one stated composition is a *thumbnail's* — *"two composable halves — a cleared path through green, and **a relic mid-reveal**"* `05-OUTWARD.md` `[brief: soft]` — and its second half names a thing `representation.find` rules has no form. **There is no composition for a 1:1 icon anywhere in eight brief sheets.** This is the icon half of category gap **M1**; Thumbnails holds the 16:9 half. | sheet **01** |
| **G-I2** | **The differentiator has no depictable form, so the icon cannot show what makes this game distinct.** `00-CORE.md` binds distinction to the collection `[you chose: R1 Q1]`; `objectArt.find.worldForm` is `"none"`. Everything an icon *can* show — cleared stone, green, a tool, a terrace — is the harvest half, which `research/landscape.md` establishes is the commodity half. **Naming that cost is required; papering over it is a `T6` violation.** | sheet **01** states it; the consequence — that the collection reaches a stranger **only** through the description — is a fact for **store-listing work** |
| **G-I3** | **Nothing in either contract, in the brief, or in `docs/cid-workflow.json` carries an icon.** `release.publishChecklist` owns publish-time *place settings*; no key, module or emitter produces an outward image. This is category gap **M6** at this domain: a `storeIcon` that merges and reaches nothing repeats `uiTheme`'s problem. | sheet **01** names its own emitter hole; **contract-and-seam work** rules; **publish-checklist work** owns the upload step |
| **G-I4** | **No legibility standard exists for any 2D outward image in this project.** The only floor anywhere (`theme/setting/01`'s Rec.601 ≥ 165) is a world quantity on world geometry, and `art/lighting/02` `V13` explicitly hands legibility to shape rather than to it. Nobody has stated what a 150 px icon must satisfy or how it is failed. | sheet **02** |
| **G-I5** | **Whether any text may appear on the icon is unstated by both the brief and the platform.** The Roblox icon page has exactly three best-practice subsections — *quality and aspect ratio*, *relevant content*, *color and contrast* — and **no text rule** `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]`. The genre's convention is text and glyphs on the tile (`[🌱]`, `🧲`, `[UPDT🍂]`, `research/landscape.md`). M-B says `bannedWords` binds and the ceiling does not, and says nothing about whether a string exists. | sheet **01** rules it; if it permits a string it may carry `title` **by reference only** — coining a title is **Name's** |
| **G-I6** | **No build that exists can produce a legitimate capture.** `game/src/shared/Theme.luau` ships `archetype = "cartoon-vibrant"`, `sourceTitle = "Pet Ascend Simulator"`, `surface.base = "#2B1B4D"`, `FredokaOne` — verified this run — against a brief naming `fantasy-ornate` three times (`G2`), and `art/_category.md` rows 10–19 mark the retaining wall, parapet, paving, channels, fittings, weathering, sky and canopy all **[does not exist]**. Category gap **M2** at this domain. | sheet **01** states the capture gate as a precondition with a named condition, not as a note |
| **G-I7** | **The smallest size the platform renders an icon at is not published.** The docs say only *"icons scale down to smaller sizes **like** 150×150 pixels"* — an example, not a floor. Neither format nor file-size limit is stated on that page either. | sheet **02** carries it `[unverified]` with its settling fetch; see **Research owed** |

---

## Why 2 sheets

**I own exactly one contract key, so the first sheet is fixed by the rule and the only question is
whether a second is earned.** It is, on a precedent set inside this same project two waves ago:
`art/lighting/01` supplies `lighting` and `art/lighting/02` carries no manifest, enforces
`lighting.readability`, and exists because *"a number with no procedure attached is an assertion."*
The identical split applies here. **Sheet 01 decides what the icon is** — subject, framing, colour
roles, count, variants, production route, claims. **Sheet 02 decides how it is failed** — and it is
a genuinely separate decision rather than a heading, because the instrument has to work in a regime
where the project's usual lever is forbidden: WCAG 3:1 needs Rec.601 luma ≈ 231, `theme/setting/01`
forbids near-white **by name**, and `V13` already ruled that the luma floor is not a legibility
guarantee. So contrast at 150 px cannot be bought with brightness, and the rule has to be stated in
luma *separation*, region count and greyscale silhouette instead. That question does not shrink to a
field of sheet 01 and it does not belong to anyone else — it constrains `storeIcon`, which is mine.

**The other three subjects in my `owns` list are values, not sheets, and both of the zeros are
values with a ruling attached.** Seasonal and event variants are **forbidden** (`03-META.md`
priority 3; category row 17; `theme/setting/03` `R1`), so `variants` is an empty array with the
ruling in it. The A/B test set is **0** and the platform closes it before the project does: Roblox
Experiments cover *"different config values"* in-game and *"custom matchmaking configurations"*, and
**icons are not a testable element**, with a stated *"Games with fewer than 1,000 daily active users
might struggle to get useful data"*
`[research: https://create.roblox.com/docs/production/experiments]`; a devforum answer says of icon
A/B testing *"No, unfortunately it is not possible"*
`[research: https://devforum.roblox.com/t/are-you-able-to-ab-test-game-icons/3339468]`, secondary and
corroborating rather than load-bearing. Against a project whose `engagement.eligibilityGate` is 10
DAU and 10 play hours for 7 consecutive days, whose `retentionReadout` sets `optimiseFor: false`, and
whose `00-CORE.md` declines players, **there is no count above 1 to justify.** Splitting either zero
into its own sheet would be splitting to look thorough, which is the failure the sheet-count rule
exists to stop. They are fields of `storeIcon` with a `ruledBy` each, and sheet 01 must state them.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-one-icon` | Decide the experience icon completely and supply it as the `storeIcon` manifest: the count (the platform generates a default from stock images if none is uploaded, so 0 means shipping someone else's art — rule it), the focal subject and framing inside a bound where **no Find, no mascot, no face but a player avatar, no second hour, no weather and no capture of the shipped `cartoon-vibrant` build** may appear, which `styleGuide` roles carry it, whether it is a Studio capture or an authored raster and the named condition that gates a legitimate one, the text-on-icon ruling (`bannedWords` binds, the ceiling does not, and a title may be carried by reference only), `variants: []` with the priority-3 ruling that empties it, the A/B set at 0 with the platform fact that closes it, every outward claim as a `claims[]` row with a `backedBy` that resolves, and this domain's emitter hole stated as a gap rather than assumed away — plus the one line that says `art/ui-art/04`'s `icons.count: 0` is the interface and does not reach this artifact. |
| 02 | `legible-at-150` | Decide the legibility rule for this icon at the sizes the platform actually renders it and the runnable instrument that fails one mechanically — given that contrast here **cannot be bought with brightness**, because WCAG 1.4.11's 3:1 needs Rec.601 luma ≈ 231, `theme/setting/01` forbids near-white by name, and `art/lighting/02` `V13` already ruled the luma floor is not a legibility guarantee: state the rule in luma separation between named regions, a maximum region count, and a greyscale silhouette test on the downsampled image, with a pass rule (minimum, mean or percentile), the sizes it is evaluated at, and what a failure changes. Carry no manifest — enforce `storeIcon.legibility` on sheet 01's precedent from `art/lighting/02`, and carry `[unverified]` on any render size below 150×150 with its settling fetch. |

---

## Verification note

**Sheet 01's production route is the row most likely to be contradicted, and Thumbnails is who does
it.** We hold the same unresolved question from two sides — category gap **M2**, *"no capture is
legitimate from any build that exists"* — and my category lead handed the capture-gate ruling to
Thumbnails while handing me an artifact that needs the same gate. If Thumbnails rules that a
legitimate capture requires `uiTheme` and `styleGuide` emitted plus `G2` closed, and sheet 01 rules
that an authored raster sidesteps the gate, **the two keys disagree about what "representative"
means for one game.** Sheet 01 must state its route and its gate in terms a cross-category pass can
compare, and must not name Thumbnails' `captureSource` for it.

**Second most likely: `variants: []` read as a slot.** A later reader who wants a holiday icon will
find an empty array and fill it. Sheet 01 states the ruling *inside* the value, not beside it, so
what they find is a closed decision with `03-META.md` priority 3 attached.

**Third, and cheapest to check: sheet 01's focal subject against Thumbnails' first slot.** Both of us
can legitimately reach for the cleared/overgrown boundary — it is close to the only thing left. That
is duplication of *subject*, not of *key*, and it is fine and probably correct; a verifier should not
read it as a collision. The boundary that matters is that I own one square artifact and Thumbnails
owns the 16:9 set, and neither restates the other's fields.

---

## Research owed

My graph node assigns no `must_verify`; my category lead assigned one, verbatim: *"does this
platform require an icon, what are its dimensions and format, and what does a missing one produce?
You may not decide `count: 1` or `count: 0` from memory."* **Fetched, and it is settled on the first
two and a half of three.**

| question | answer | source |
|---|---|---|
| Is an icon required? | **No, and that is worse than required.** *"an icon is automatically generated from a collection of default images"* on first publish. A missing icon does not produce a blank tile; it produces **stock art chosen by the platform**, which is `sourceTitle = "Pet Ascend Simulator"` all over again — the exact failure mode my category brief names. | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]` |
| Dimensions | *"it should be **square** and at least **512×512 pixels**"*; *"use a template of 512×512 pixels"*. | same |
| Smallest rendered size | *"In some places on the Roblox site and app, icons scale down to smaller sizes **like** 150×150 pixels."* **An example, not a floor** — no minimum is published. | same |
| Format and file size | **Not stated on the icon page.** Its full heading list is *Icons · Upload icons · Best practices · Quality and aspect ratio · Relevant content · Color and contrast* and none carries a format or a byte limit. A 512×512 PNG/JPG-under-1MB figure circulates on third-party blogs; **I did not write it as sourced.** | `[unverified]` |
| Moderation | *"All icon images must pass moderation before they appear to others on the Roblox platform."* | same |
| Content guidance | Exactly three best practices, none about text, faces or clutter: quality and aspect ratio; *"An icon will have a higher impact if it's unique and provides relevant imagery on what users should expect when they join the game"*; and *"express your game's theme through color and contrast to help users decide if it's suitable and appealing to them."* | same |
| Icon A/B testing | **Not supported.** Experiments cover in-game *"config values"* and *"custom matchmaking configurations"*; icons are not a testable element, experiments run 14–60 days, and *"Games with fewer than 1,000 daily active users might struggle to get useful data."* | `[research: https://create.roblox.com/docs/production/experiments]`, corroborated by `[research: https://devforum.roblox.com/t/are-you-able-to-ab-test-game-icons/3339468]` (secondary, a creator reply dated 2025-01-02, **not** load-bearing) |
| Misleading-image policy | Fetched from the sibling **thumbnails** page because the icon page carries none: *"Do not display gameplay mechanics, UI elements, or interactions that are not actually available in your game"* and *"Graphics shown must be representative of the actual in-game visuals. Avoid artificially enhancing graphics beyond what a player will experience."* **This is `T0` and `T8` as platform policy rather than as a house rule, and it is the strongest external backing my category's truthfulness rule has.** Scoped to thumbnails on its own page; whether it is enforced identically on icons is `[unverified]`. | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/thumbnails.md]` |

**Fetched additionally, because sheet 02 will need it and the writer cannot fetch:** the accessibility
position is already banked by `art/style/01` — Roblox publishes **no contrast ratio** and recommends
*"different symbols alongside colors"*
`[research: https://create.roblox.com/docs/production/publishing/accessibility]`. Sheet 02 should
lean on that rather than importing a WCAG number the platform does not ask for.

**What I could not settle, with the fetch that would.**

1. **Format and file-size limits for an experience icon.** `[research owed: the Roblox support
   article "Experience Thumbnails, Videos, and Icons" — `en.help.roblox.com/hc/en-us/articles/
   203314060` — which returned **403** to this tool; or the asset-upload requirements page under
   `create.roblox.com/docs/projects/assets`.]` Nothing in either sheet may depend on the answer.
2. **Any rendered icon size below 150×150.** `[research owed: a per-surface size table for the
   Home, Search and Discover rows on the mobile app; no such table surfaced on
   `create.roblox.com/docs/production/publishing/experience-icons` or its thumbnails sibling.]`
   Sheet 02 evaluates at 512, 150 and one stated smaller size held `[unverified]`.
3. **Whether the misrepresented-gameplay rule is enforced on icons as written for thumbnails.**
   `[research owed: the Community Standards section on deceptive metadata, `about.roblox.com/
   community-standards`, read for whether "experience images" includes the icon.]` The ruling in
   sheet 01 does not rest on it — `T0` binds independently of the platform.
4. **Competitor icon convention.** Not fetched, and deliberately: my category routed the
   *"look at the current top of the genre and record what their thumbnails do"* verification to
   **Thumbnails**, whose `must_verify` it is. Sheet 01 rules on the text-and-glyph convention using
   `research/landscape.md`'s four already-fetched competitor pages, which carry the titles
   (`[🌱]`, `🧲`, `[UPDT🍂]`) but **not** the tiles. If sheet 01 needs a tile it must say so and
   route it, not infer it.

---

## Contract position

**I own one key and it does not exist yet: `storeIcon`, proposed by sheet 01.** It is absent from
`cid/_contract.md`'s 25 and from every claimed name in `cid/**`. What it must hold: the count; the
production route with its gate; the focal subject and framing; the `styleGuide` roles used; the
legibility block sheet 02 enforces; `variants: []` with its ruling; the A/B set at 0 with its
platform fact; the forbidden-subject list as counted zeros in the house form; and `claims[]` rows
each carrying a `backedBy` that resolves to a key path, a sheet id or a file.

**And it has no emitter, which is the finding worth more than the key.** `release.publishChecklist`
covers place settings and their read-back; `bridge/emit-config.mjs` produces `GameConfig.luau`;
`ui-forge` produces `Theme.luau`. **None of the three can carry a 512×512 image, and no build step
reads an outward artifact at all.** So `storeIcon` merging changes nothing on disk unless a publish-
time checklist row is added to carry it — the same structural hole `art/style/01` called `G3` and
`art/lighting/01` called `G1`, arriving a third time on a different surface. Sheet 01 states it;
**contract-and-seam work** rules on whether an outward key is a build artifact at all, and
**publish-checklist work** owns the upload step if it is not.

## Not decided here

The focal subject, the framing, the crop, the colour roles, the production route, the text ruling and
every count — **sheet 01**, which holds `storeIcon`. The legibility rule and its instrument — **sheet
02**. The game's name and any title string — **name work**; sheet 01 may reference `title` and may
not coin one. The 16:9 thumbnail set, its slots, its overlay rule and the capture-legitimacy ruling —
**thumbnail work**. Every line of the description, the tag set, the genre selection and the age
settings — **store-listing work**. Whether anything is announced when the place publishes —
**launch-beat work**. In-game iconography, which is at **zero** and stays there — `uiTheme`,
`art/ui-art/04`. Whether a Find ever gains a form — `objectArt` and `representation`, both of which
say no. Whether an outward key is a build artifact — **contract-and-seam work**.
