# Codes — domain index

**Category:** Live Ops · **Wave:** 7 · Reads: `HANDOFF.md`, `00-CORE.md`, `03-META.md`, `OPEN.md`
(§1, §2, §4, §5), `research/grass-incremental.md`, `cid/liveops/_category.md`, `cid/_contract.md`,
`cid/_state.md` (R-1 to R-4), `cid/gameplay/monetization/01-the-offer-ladder.md` +
`02-what-is-never-sold.md`, `cid/gameplay/mechanics/02-verb-roster.md`,
`cid/ui-ux/navigation/01-the-screen-graph.md`, `cid/ui-ux/screens/01-collection-index.md` +
`03-text-policy.md`, `cid/theme/tone/04-do-nots.md`, `cid/audio/music/01-whether-music-exists.md`
(as the shape standard), `bridge/schema.mjs`, `game/src/`.

**One sheet. `codes` is the one contract key this domain owns, it does not exist yet, and it is
proposed empty.**

---

## What the brief gave me

| constraint | tag |
|---|---|
| *"Beating the genre's retention curve. Offered and declined."* (`00-CORE.md`, non-goals) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"Success is **shipped artifacts, not players**"* · *"the smallest game that still gives every creative area real work"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"8–14, mobile-heavy, short sessions"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` |
| **Priority 3:** *"real procedural generation · rebirth · offline accrual · **codes** · daily rewards · leaderboards · trading · seasons and events"* (`03-META.md`) | `[brief: soft]` ← `[I assumed — the ordering; …no explicit priority list was interviewed]`, and `OPEN.md §5` row 7 confirms it |
| *"Permanent multipliers only. **Never content access.**"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` |
| *"solve duplicates **without adding a currency**"* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]` |
| *"There is no failure state… **Zero tension is deliberate**"* (`02-GAMEPLAY.md`) — an expiry is a clock | `[brief: soft]` ← `[you accepted: step 6 Q2]` |
| *"Ships and settles. No seasons or events."* (`OPEN.md §2`, live-ops intent) | `[brief: soft]` ← `[I assumed — batched]`, **0 interview questions** |
| *"Codes for free boosts, and a group-join reward. Both are near-universal on Roblox incrementals and **their absence reads as an unfinished game**."* (`research/grass-incremental.md`) | **untagged in the source file — see the gaps table.** It sits in a bullet list titled *"What players of this will expect"* carrying **no `[research: url]` of its own**, unlike every other claim in that document |

**Approved sheets that bind me** (each is cited, none is re-decided): `products` `F15` and the other
19 rows · `input` (5 verbs, closed) · `navigation` (2 nodes, 2 edges, both closed, 17 `notNodes`) ·
`screens` `R9` · `theme/tone/04` `D10` · `endgame.forbidden[redeemCode]` · `modifiers` (resolution
order) · `release.forbidden` `N2`/`N3` · rulings **R-1** (input contained to one class, two verbs,
four controls) and **R-4** (no in-game store).

---

## What the brief did not give me

| # | gap | routed to |
|---|---|---|
| **C1** | **The "absence reads as an unfinished game" claim carries no source.** It is the only load-bearing sentence in this domain's evidence base and the brief's own latitude ladder has no tag for an untagged assertion inside a research file — `HANDOFF.md` offers `[research: url]` ("argue with the source") and `[I assumed]` ("freely arguable") and this is neither on its face. **Sheet 01**, which must resolve the tag before it can weigh the claim, and does so with the fetches banked below rather than by choosing a tag. |
| **C2** | **The `F15` → `D10` → priority-3 chain grounds out in the softest line in the brief.** `products.forbidden[F15].closedBy` reads *"03-META.md priority 3 (codes) + theme/tone/04 D10"*, and `D10`'s own reason column reads *"Priority 3 excludes codes"*. So **`F15`'s observable is structural and `F15`'s justification is not** — my category brief's line that it closes the surface *"independently of priority 3"* is true of the check and false of the reasoning. Sheet 01 must supply the independent grounding rather than inherit the circular one. |
| **C3** | **The brief names no publication channel of any kind** — no group, no Discord, no social account, in five layer sheets, `OPEN.md` or `research/`. Category gap **G1**. My node owns *"where codes are published"* against an **empty referent**, which is a different thing from a forbidden one and sheet 01 must say which it is. Channel creation is **off-Roblox presence work** [currently Discovery & Marketing — Social]; intake is **feedback-channel work** [currently Community]. |
| **C4** | **The brief never says what a "boost" is.** The research line asks for *"codes for free boosts"* and this game has no boost class: `modifiers` holds permanent stat changes only and `F6` forbids anything that expires, decays or is consumed. The reversal price therefore includes inventing a modifier class the game does not have. **Sheet 01**, inside the reversal costing only — the class itself would be **permanent-stat-change work** [currently `gameplay/systems`], not mine. |
| **C5** | **Nothing states whether a bearer entitlement is a code.** A free game pass handed out as a link grants exactly what a code grants and needs no text entry; the brief, `products` and `F15` are all silent on the distinction. Sheet 01 must rule on it or a reversal walks straight through the criterion. |

---

## Why 1 sheet

**One contract key, one decision, one sheet.** `codes` does not exist in `bridge/schema.mjs` (I read
`cid/_contract.md`, the derived 25-key list, and grepped `bridge/` for `codes` — zero hits; I have no
shell in this session, so `npm run bridge -- --contract` is read from its committed derivation rather
than re-run). Everything my node owns collapses into one ruling and its criterion: the five subjects
are five vacuous rows of the same empty key, the counter-evidence is that ruling's justification, and
the reversal price is that ruling's cost. Splitting the counter-evidence or the reversal cost into its
own sheet would be one decision described three times, which is the wave-1 failure with a different
subject. My category brief says the same in one line: *"a domain ruling zero should expect one sheet,
not four."* I considered and rejected a second sheet on the redemption **criterion** — the four-limbed
check is what makes the ruling checkable and is therefore part of it, not a separate decision — and a
second sheet on the group-join half of the research line, because `F15` puts the *prompt* under
`products` and the *channel* under Community, leaving me only the grant, which is one row of `codes`.

| # | sheet | must decide |
|---|---|---|
| 01 | `no-redemption-path` | Rule `codeCount: 0` and ground it on the structural fact that this game has no redemption surface — no text entry, no fifth game-drawn pressable, no third screen node — rather than on priority 3, and supply the proposed `codes` key carrying `codeCount: 0`, `codes: []`, all five of this node's subjects as explicitly vacuous rows (code types and rewards · issuance cadence and triggers · expiry and redemption limits · abuse prevention · where codes are published), each with the approved sheet that empties it and a count-shaped observable; make the criterion test **four** redemption limbs, not one — a `TextBox` in a screen spec, a `GetJoinData().LaunchData` read, a group-membership read, and a bearer entitlement — because three of the four need no text input and the `F15` grep alone does not close them; publish why a raw grep of `game/src` for `TextBox` returns 9 hits and still means zero; answer the *"their absence reads as an unfinished game"* claim with the fetched evidence rather than by assertion, and state plainly what this project accepts by declining codes; and price the reversal in build terms against the six things it would each break by name. |

---

## Verification note

**The row most likely to be contradicted later is the criterion, not the ruling.** `codeCount: 0`
is over-determined; the check is not, and it can fail two ways.

**False positive, today.** Grepping `game/src` for `TextBox` returns **9 hits across 3 files** and
**none of them creates one**: `HudBinding.luau:86,241,258` type-tests it, `Input.luau:268-272` guards
against a focused one, and `UIBuilder.luau:390,460,471,474` carries a `CLASS_DEFAULTS.TextBox` row and
placeholder handling. A verifier running the check as `products` words it (*"zero `TextBox` instances
in any screen"*) against the renderer source will read 9 and report a breach that does not exist.

**False negative, the day someone adds one.** `UIBuilder.luau:412-418` is
`local class = node.class or "Frame"` then `Instance.new(class)`, and `CLASS_DEFAULTS` already holds a
`TextBox` row with `ClearTextOnFocus = false`. **The renderer can build a code box today from one JSON
node**, with no Luau change at all. So the check has to run against the **screen spec node inventory**
(`screens.elementTree`, whose six rows are `Frame`, `TextLabel` and nothing else) and against the four
limbs, never against a string count in the renderer. Sheet 01 must state the miss the way
`cid/audio/music/01` stated its undercount, and mark its table a floor.

**Whom it collides with:** contract-and-seam work, which must write the shape for an empty `codes` in
`bridge/schema.mjs`; `music.trackCount == len(music.tracks)` is the pattern. Second most likely,
**Community**, which shares `F15` and gap G1 and could reach for the group-join row from the channel
side while I hold it from the grant side — the seam is stated in sheet 01's row, and the *prompt*
belongs to neither of us because `products` `F15` already holds it.

---

## Research owed

**What I owed:** verify `F15` myself rather than relay it; run the grep; check `input`'s closed verb
list and `screens`' node inventory for any text-entry affordance; establish whether a redemption path
exists that needs no `TextBox`; and, following `music`'s standard, **go and check the premise the
counter-argument rests on instead of asserting past it.**

**Fetched, and it lands in the pack for the writer:**

- The reference's own experience description, primary source: *"👍 Enjoying the game? Leave a Like and
  Favorite! ❤️ Join the Unequal Games group for in-game boosts!"* — **a group-join boost and a
  like/favourite prompt, and no mention of codes or of redeeming anything**
  `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
- The same studio's sibling title, the one `theme/tone/04` `D10` already cites, carrying a
  **byte-identical** description template: group boost, like/favourite, **no codes**
  `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`
- The reference at 38,571,201 visits, all-time peak CCU 10,435, past-24h CCU 1,259, seven passes
  listed, description advertising the group boost, **codes nowhere on the page**
  `[research: https://www.rolimons.com/game/133086043677134]`
- A codes aggregator maintaining a page *for this exact game* and reporting **no active codes as of
  March 2026** — a codes site with an empty list for a 38M-visit incremental
  `[research: https://deltiasgaming.com/roblox-grass-incremental-codes/]`
- The contrary case, and it is the useful one because it prices the reversal: a shipping incremental
  that **does** have codes, redeemed by *"click on the Shop button… Scroll down until you see the line
  where you can enter codes, or click the Codes button… Enter the promo code… Click on the Redeem
  button"* — **four surfaces this game does not have**: a store node (`navigation.notNodes[shop]`,
  R-4), a fifth pressable (`input.gameDrawnPressables: 4`), a text field (`screens.elementTree` has
  none), and a submit control (a sixth) `[research: https://gamerant.com/roblox-garden-incremental-codes/]`
- **A redemption path that needs no text entry exists, and it is documented.** Deep-link launch data:
  *"the LaunchData key contains the string that you specified in the launchData parameter"*, read via
  `Player:GetJoinData()`, *"can't exceed 200 bytes"*, and *"Users can modify the URL, so the data
  might not be authentic"* `[research: https://create.roblox.com/docs/production/promotion/deeplinking]`
- A second one: group membership is readable with no prompt and no input. `Player:IsInGroup` and
  `Player:GetRankInGroup` are **deprecated** in favour of `IsInGroupAsync` / `GetRankInGroupAsync`;
  neither form requires player input `[research: https://create.roblox.com/docs/reference/engine/classes/Player]`
- Baselines I grepped in `game/src` so the writer has counts rather than adjectives: `GetJoinData` 0,
  `LaunchData` 0, `IsInGroup`/`GetRankInGroup` 0, `TeleportData` 0; `UserOwnsGamePassAsync` **1**, at
  `server/Entitlements.luau:119`, which is `products`' entitlement path and not a code path
  `[research: game/src/server/Entitlements.luau]`, `[research: game/src/shared/UIBuilder.luau]`,
  `[research: game/src/client/Input.luau]`

**What this settles, and the writer may state it as sourced:** the *group-join* half of the research
line is corroborated by primary sources — both surveyed titles ship it. The *codes* half is **not**,
and is falsified for the reference itself: the game the claim is written about ships no codes, at
38.5M visits and a 96.2% like ratio. **If absence read as unfinished, the reference would be reading
as unfinished.** The ruling therefore does not have to clear this claim; the claim does not survive
contact with its own subject. What the project still accepts by declining codes is the *third* title's
audience, and sheet 01 prices that honestly against `00-CORE.md`'s binding *"shipped artifacts, not
players"* rather than waving it off.

**Could not obtain, and the fetch that would settle it:** a *measured* figure for how many Roblox
incrementals ship codes. Three titles is not a survey, and the claim's word was *"near-universal"*.
`[research owed: the code-redemption status of the top ~20 experiences in Roblox's Simulator or
Incremental sort, read from each experience description, which is where a shipping game publishes
its codes. A search-engine summary is not adequate — this document already records one invented
figure from exactly that source (OPEN's pacing number, `research/grass-incremental.md` line 91).]`
The ruling does not rest on the survey: it rests on `00-CORE.md`'s binding retention non-goal and on
the four structural limbs, and the survey would only sharpen the cost paragraph.

**Not fetched because it would not move a row:** Roblox's own promo-code documentation. Roblox
operates avatar-item promo codes on `roblox.com/promocodes` and supplies **no first-party
in-experience redemption API**, which is why the Garden Incremental path above is hand-built out of a
shop screen and a text box. Sheet 01 may state that as reasoning from the fetched redemption
instructions and must **not** state it as sourced. `[unverified]`

---

## Contract note

**`codes` does not exist.** `cid/_contract.md` lists 25 keys and none is mine; `bridge/schema.mjs`
contains no `codes`. Sheet 01 proposes it, `status: "proposed"`, and it should hold: `codeCount`,
`codes[]`, `redemptionSurfaces[]` (the four limbs, each with `exists`, `mechanism`, `closedBy`,
`check`), `publicationChannels[]` (empty, with `referentExists: false` naming G1), and the five
subject rows as vacuous with their emptying sheet. The invariant worth writing into the schema is
`codeCount == len(codes)` plus `every redemptionSurfaces[].exists == false`, which is the
`music.trackCount` pattern extended to cover the three limbs a `TextBox` count misses.
