--!strict
--[[
	entitlements — server.

	Answers one question: which of `products.items[]` does this player own? The answer is
	written to `state.owned`, once per join, and to nothing else. This is the only module
	in the build that touches MarketplaceService.

	THE ANSWER IS NEVER STORED. products.F20 — "No purchase-derived state is written to
	persistence. Ownership is read live every join" — and modifiers.sources[purchase].storage
	says the same thing from the other side: a purchase factor is recomputed from live
	ownership on every read, never latched. So there is no cache here, no memo across
	rejoins, and nothing this module writes goes near the save payload. Losing a pass and
	keeping its factor for a session is exactly the bug the no-cache rule prevents.

	WHERE IT SITS. wiring.onJoin step 2, after persistence.load and BEFORE the publish
	point. That order is load-bearing: modifiers.effective reads state.owned on every
	clearing tick, so a state published with an empty owned map pays the unpurchased
	multiplier for as long as the web call takes. refresh YIELDS, and the join sequence
	is expected to wait for it.

	THERE IS NO STORE. products.storeExists is false and purchaseSurface is "the Roblox
	experience page"; a pass is bought outside the game and this module only reads the
	result. Nothing here prompts, prices, names or shows a product. The six APIs products
	forbids — the two purchase prompts and the receipt callback (F5, F13), the membership
	reads (F18) and the policy call (F3) — appear nowhere in this file. THEY ARE NOT
	SPELLED IN THIS COMMENT EITHER: each of those F-entries is checked by a grep over the
	build, and a comment that names the call is a false positive that costs somebody an
	afternoon. The single MarketplaceService method this module does call is
	products.ownershipCheck and it is one function, below.

	WHAT HAPPENS TODAY. Every products.items[].gamePassId is nil — a provisioning step the
	developer owns, not a spec gap — so every entry resolves to false with no web call at
	all, the whole function is free, and it is silent: a missing id is the expected state
	of this build and warning about it once per join per product would be noise on every
	single join for every player. Every axis therefore sits at its unpurchased effective
	value and the game is fully playable, which products.F16, F17 and F8 require.

	WHAT HAPPENS WHEN A CHECK FAILS. UserOwnsGamePassAsync is a web call: it yields, it
	fails, and it is rate-limited. A failed check warns once, for that product, and
	resolves to NOT OWNED. It is not retried — a retry loop on the join path is how a
	MarketplaceService outage turns into a room of players with no character. Not-owned is
	the safe reading in both directions: it never grants an unpaid factor, and the worst
	case for an owner is one session at the base radius, corrected by rejoining. No
	failure here errors, and none blocks the join.
]]

local MarketplaceService = game:GetService("MarketplaceService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

local PRODUCTS = GameConfig.Products

-- The kind this module knows how to check. products.kindsUsed is exactly {"gamePass"} and
-- products.devProductCount is 0, but the string is named once here rather than inlined at
-- the comparison so that a re-emitted config carrying a second kind produces a warning
-- naming the kind instead of a silently wrong UserOwnsGamePassAsync call.
local GAME_PASS_KIND = "gamePass"

-- Only the fields of a products.items[] entry this module reads. The other twelve — label,
-- axis, factor, priceRobux, rung and the rest — belong to modifiers, to the tool head
-- width, or to nobody at runtime. `gamePassId` is optional because every one of them is
-- null today.
type ProductItem = {
	id: string,
	kind: string,
	gamePassId: number?,
}

-- The one PlayerState field this module writes, and the only one it needs to see. Narrow
-- on purpose: entitlements is declared the writer of `owned` and of nothing else, and a
-- narrow parameter type is what makes that reviewable rather than merely stated.
export type OwnedState = {
	owned: { [string]: boolean },
}

local Entitlements = {}

--[[
	One product, one answer, never an error.

	Returns false without touching the network when there is no id to check — treating a
	nil gamePassId as owned would hand every player a 1.75x radius the moment the pass is
	provisioned wrong, so the absent case is pinned to false explicitly rather than left to
	whatever UserOwnsGamePassAsync does with nil.

	The call is made through pcall and its result is type-checked before use: the API is
	documented to return a boolean, and a session that ends up with a string in
	state.owned would fail at modifiers rather than here, several seconds away from the
	cause.
]]
local function ownsProduct(player: Player, item: ProductItem): boolean
	if item.kind ~= GAME_PASS_KIND then
		warn(
			`entitlements.refresh: product "{item.id}" has kind "{item.kind}", and `
				.. `UserOwnsGamePassAsync is the only ownership check this module implements `
				.. `(products.ownershipCheck). Resolving it to NOT owned.`
		)
		return false
	end

	local gamePassId = item.gamePassId
	if gamePassId == nil then
		-- The expected state of this build. Silent by design: see the header.
		return false
	end

	if type(gamePassId) ~= "number" then
		warn(
			`entitlements.refresh: product "{item.id}" has a non-numeric gamePassId, which `
				.. `UserOwnsGamePassAsync cannot take. Resolving it to NOT owned.`
		)
		return false
	end

	local ok, result = pcall(function(): boolean
		return MarketplaceService:UserOwnsGamePassAsync(player.UserId, gamePassId)
	end)

	if not ok then
		warn(
			`entitlements.refresh: the ownership check for product "{item.id}" failed `
				.. `({tostring(result)}). Resolving it to NOT owned for this session; it is not `
				.. `retried, and it is read again from scratch on the player's next join.`
		)
		return false
	end

	if type(result) ~= "boolean" then
		warn(
			`entitlements.refresh: the ownership check for product "{item.id}" returned a `
				.. `{type(result)} rather than a boolean. Resolving it to NOT owned.`
		)
		return false
	end

	return result
end

--[[
	wiring.onJoin step 2. YIELDS: one ownership check per products.items[] entry, in
	declaration order, sequentially. One product today, so there is no batching question
	worth answering; sequential also keeps the rate limit predictable when there are more.

	After it returns, state.owned holds exactly one boolean per products.items[] entry and
	no other key. The map is built locally and assigned in one write, so a state can never
	be observed holding half an answer.

	Called once per join and never again — not on respawn (wiring.onDeath re-resolves no
	ownership), not on purchase (there is no in-game purchase), and not on a timer.
]]
function Entitlements.refresh(player: Player, state: OwnedState): ()
	local owned: { [string]: boolean } = {}

	local items = PRODUCTS.items
	if type(items) ~= "table" then
		warn(
			`entitlements.refresh: GameConfig.Products.items is missing, so no product can be `
				.. `resolved. Every factor will read as unpurchased.`
		)
		state.owned = owned
		return
	end

	for _, entry in ipairs(items :: { ProductItem }) do
		local item = entry :: ProductItem
		if type(item.id) ~= "string" then
			warn(
				`entitlements.refresh: a GameConfig.Products.items entry has no string id and `
					.. `cannot be keyed into state.owned. Skipping it.`
			)
			continue
		end
		owned[item.id] = ownsProduct(player, item)
	end

	state.owned = owned
end

return Entitlements
