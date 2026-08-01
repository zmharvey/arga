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
	find: string?,
	cleared: boolean,
	instance: BasePart?,
}

export type ArmState = {
	character: Instance?,
	armed: boolean,
}

--[[
	What survives a rejoin. Exactly the fields `stateShape` marks persisted, which is also
	exactly what `persistence.save` writes — the two cannot drift, because both come from
	the same list.
]]
export type StoredState = {
	currency: number, -- Shards. Increased only by progression.award, decreased only by progression.tryBuy. econ…
	upgrades: { [string]: number }, -- Held level per upgrades[].id. A missing key reads as level 0. modifiers.sources[upgrade…
	rowsRevealed: { [string]: boolean }, -- firstSession.withheld.upgradeRow: presentAtJoin false, liftedBy 'balance has reached up…
	found: { [string]: boolean }, -- discovery.record: keyed by the Find's name from collection.sets[].relics, one boolean p…
	areasFinished: number, -- endgame.risingQuantity. The count of areas this player has cleared to the last patch, 0…
	cleared: { [number]: boolean }, -- THE LIVE AREA ONLY. Keyed by the 1-based index into layout.build(areasFinished + 1)'s c…
	clearedCount: number, -- The number of keys in cleared, for the LIVE area, and never above that area's patchCoun…
}

--[[
	The live table. `StoredState` plus the fields that exist only while connected.

	`player` is not optional here. A state with no player is a `StoredState`, which is a
	different type rather than the same type with a hole in it.
]]
export type PlayerState = StoredState & {
	patches: { Patch }, -- THE LIVE BAY ONLY — plots.liveGeometry.patchInstancesExistIn is 'the live bay only'. On…
	spawnPivot: Vector3, -- The world position of the live bay's spawn Attachment, written by plots.spawn and rewri…
	owned: { [string]: boolean }, -- One key per products.items[] entry, resolved once per join by entitlements.refresh thro…
	armState: ArmState, -- firstSession's arming gate. armScope is perCharacterSpawn, so this carries the characte…
	player: Player, -- The Roblox Player. Set once at join, never reassigned. Exists because the collection is…
}

--[[
	Many states, keyed the way `stateShape.collection` says. `tick(states)` was handed to a
	builder with no statement of what `states` was; one guessed a map keyed by Player and
	another by UserId.
]]
export type States = { [number]: PlayerState }

return {}
