# Glossary

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**One term, one definition, one place.** Every sheet uses these words this way. A term marked
`working word` is not settled and repetition in the sheets is not a decision about it.

| term | means | provenance | note |
|---|---|---|---|
| `lot` | one sealed storage unit offered at auction, contents unknown | working word | genre-standard; occupied by both incumbents, so not a distinguishing term |
| `peek` | the partial, ambiguous view of a lot available before bidding | working word | adopted from the incumbent deliberately. **Not** a full preview |
| `syndicate` | 2 to 4 players bidding jointly on one lot under one split | `[simulated: R1 Q1]` | free across the searches run. **Not** a persistent guild — it exists for one lot only |
| `split` | the whole agreement: which members get which shares | `[simulated: R1 Q1]` | **Not** the act of dividing after the fact. It is agreed before the reveal and cannot be renegotiated |
| `share` | **the percentage of proceeds a member receives.** Output only | `[simulated: R1 Q1]` | **Never the cash a member pays in** — that is `stake`. These were conflated in an earlier draft and it made the negotiation undefined |
| `stake` | **the cash a member contributes toward the bid.** Input only | `[I assumed]` | introduced to resolve the `share` collision. Whether stake % must equal share % is **left open** and is the single decision that determines whether negotiation exists at all |
| `reveal` | the moment a won lot opens and all members see the contents at once | `[simulated: R2 Q1]` | shared, unlike both incumbents, which reveal privately |
| `reputation` | a persistent per-player score keyed **only** on honoured commitments: did you pay your stake, did you honour a bid you agreed to | `[simulated: R1 Q2]` | **Never keyed on outcome.** A syndicate losing money must not move it, or it punishes bad luck instead of bad partners |
| `band` | a value range that an item type belongs to | `[simulated: R3 Q4]` | **Not** a rarity tier. A band is a price range, because valuation is the skill being tested |
| `venue` | one auction site, with its own band mix, crowd and schedule slot | `[simulated: R4 Q2]` | gates on `reputation`, never on cash |
| `auction` | one timed competitive bid on one lot | working word | genre-standard and occupied; carries no signal |
| `negotiation` | the free-text conversation in which a split is proposed and agreed | working word | the game's actual skill. Happens in Roblox chat, not a custom surface |
| `seat` | a member position in a syndicate, carrying a share and a stake | `[I assumed]` | there are 2 to 4 per syndicate and they are scarce, which is why the 0% recovery seat is contested |
| `bid` | one offer of cash for a lot, made by a syndicate or a solo player | working word | the noun and the verb both. **Not** the same as `stake` — a bid is what the syndicate offers, a stake is what one member puts toward it |
| `value` | what an item or lot is actually worth when sold, as opposed to what was paid for it | `[I assumed]` | the gap between `bid` and `value` is the game's entire scoreboard. **Learnable by design** — never rolled per instance |
| `contents` | what is inside a lot, revealed all at once at the reveal | working word | use in place of `loot` or `treasure`, which import item-fantasy framing this design avoids |

## Terms deliberately not used

| avoid | why | use instead |
|---|---|---|
| `storage`, `hunters`, `bid battles` | occupied by the two incumbents; one is a month old and growing | — |
| `steal` | another game's signature verb in this exact space, and it means the opposite of an enforced contract | `split` |
| `loot`, `treasure` | generic across the platform and imports item-fantasy framing this design explicitly avoids | `lot`, `contents` |
| `rarity` | implies a roll; this game's values are meant to be learnable | `band` |
| `guild`, `crew`, `team` | imply persistence; a syndicate lasts one lot | `syndicate` |
