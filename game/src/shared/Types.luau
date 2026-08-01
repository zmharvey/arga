--!strict
--[[
	GENERATED FILE — do not edit.

	Emitted from the `stateShape` key by `npm run architect -- --emit`. Edit
	03-state-shape.md and re-emit.

	**Require this. Do not declare your own copy.** Five modules once declared their own
	`PlayerState` and two of them disagreed about whether `player` was optional, which is a
	type error across a module boundary that only passed because an instance require resolves
	to `any`. One generated type cannot disagree with itself.

	Two types, because the state has two lives. `StoredState` is what persistence reads and
	writes; `PlayerState` is the live table the server holds while a player is connected.
]]

export type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

--[[
	What survives a rejoin. Exactly the fields `stateShape` marks persisted, which is also
	exactly what `persistence.save` writes — the two cannot drift, because both come from
	the same list.
]]
export type StoredState = {
	currency: number, -- Never decremented except by tryBuy, never increased except by award.
	upgrades: { [string]: number }, -- Keyed by upgrades[].id. A missing key reads as level 0.
	cleared: { [number]: boolean }, -- Which patches are gone, keyed by the 1-based index into layout.build()'s canonical orde…
	clearedCount: number, -- Against area.patchCount, and NEVER above it. Always equals the number of keys in cleare…
	found: { [string]: boolean }, -- Keyed by the strings in collection.sets[].relics.
	areaComplete: boolean, -- Latch. Set once by clearing, never cleared, and the one field the save stores in place …
}

--[[
	The live table. `StoredState` plus the fields that exist only while connected.

	`player` is not optional here. A state with no player is a `StoredState`, which is a
	different type rather than the same type with a hole in it.
]]
export type PlayerState = StoredState & {
	patches: { Patch }, -- Live world state, world-space positions, one record per layout index whether cleared or…
	player: Player, -- The Roblox Player. Set at join, never reassigned. Exists because the collection is keye…
}

--[[
	Many states, keyed the way `stateShape.collection` says. `tick(states)` was handed to a
	builder with no statement of what `states` was; one guessed a map keyed by Player and
	another by UserId.
]]
export type States = { [number]: PlayerState }

return {}
