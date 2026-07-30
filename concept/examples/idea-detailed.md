# Breach Protocol — working notes

A co-op heist game for 4 players. Two roles: the Ghost (stealth, hacking, no combat)
and the Loud (breaching, crowd control). A contract fails if any player is caught
twice, so the roles genuinely need each other.

Reference: Entry Point (https://entry-point.fandom.com/wiki/Entry_Point) is the
benchmark for how stealth-vs-loud should feel. We are NOT copying its mission
structure — Entry Point is authored levels, ours is procedurally assembled from
room modules so contracts stay replayable.

Anti-pattern: most Roblox heist games monetize by selling the good guns, which
destroys the stealth path entirely. We monetize cosmetics and contract slots only.

Loop as I see it: pick a contract from the board -> plan the approach (choose entry
point and loadout) -> execute the breach -> extract with loot -> spend on gear and
new contract tiers.

Audience is older than typical Roblox, maybe 13-17, people who like Payday. Sessions
are long — a contract is 15-25 minutes, so this is not a phone-first game.

Things I have not decided: how permadeath-y failure should be, whether loot is
shared or individual, and how contract difficulty scales with the number of players.
