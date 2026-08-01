--!strict
--[[
	Beats — the client-side scheduler for the response contract.

	Four server-to-client channels carry a payoff: FindRevealed, SetCompleted, AreaRestored
	and UpgradeApplied. A fifth payoff, patchClear, has no channel at all — it is driven off
	the updater from a rise in snapshot.clearedCount, because the server observes clearing on
	a tick and there is nothing for it to announce per patch.

	THIS MODULE DECIDES *WHEN* A CUE STARTS AND ON WHICH CHANNEL. IT DOES NOT DECIDE WHAT ONE
	IS. The five cue bodies in `CUES` are empty and that is deliberate: what a reveal looks
	like, sounds like and reads as belongs to Art — VFX, Audio — Stingers and UI/UX —
	Feedback, none of which owns a contract key yet. Every channel has a receiver anyway, so
	adding presentation is a change to one function body and to no scheduling. No sound,
	particle, image or animation asset is named anywhere below, and none was invented.

	THE SCHEDULE, all of it from GameConfig.Response:

	  * The four beats whose `queued` is true are ORDERED BY `rank`, LOWEST FIRST, and no two
	    of them BEGIN closer together than `minOnsetGapSeconds`.
	  * A beat with nothing queued ahead of it and no recent onset behind it begins on the
	    next frame — `loneSequencedBeatDelayed` is false, so nothing is held back on purpose.
	  * patchClear is `unsequencedBeats`, `queued` false: it plays on arrival or not at all,
	    and `onOverload` is "overlap", so eight clears in a second produce eight onsets that
	    overlap rather than a queue or a drop.
	  * NOTHING HERE TOUCHES CONTROL. `controlEverAffected` is false, `lockoutsSeconds` is 0
	    and every beat's `controlAffected` is false, so this module writes no Humanoid
	    property, moves no camera, opens no modal and suspends no input. There is no code
	    path below that could: it holds `gui` and calls a cue, and that is the whole surface.
	  * `negativeBeats` is 0, so there is no failure cue and no rejection cue to write.

	WHICH CHANNEL CARRIES WHICH BEAT IS NOT SPELLED HERE. Protocol.REMOTES states it in each
	channel's `handledBy` string ("beats, as response.beats[findReveal]"), and `beatIdFor`
	reads it out of there. That is why FindRevealed -> findReveal and AreaRestored ->
	areaComplete are not a lookup table in this file: two spellings of one mapping is how the
	two sides drift apart.

	One onset never begins inside another on the same exclusive channel, and it does not need
	a runtime mutex to be true: `minOnsetGapSeconds` (0.6) separates every pair of sequenced
	onsets, and `channelExclusivity` gives atPatch to findReveal and notice to setComplete and
	areaComplete. `checkContract` warns at connect if a re-emitted config ever breaks that.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local Beats = {}

--[[
	The snapshot, of which this module reads exactly one field. bind-time `checkContract`
	tests that name against Protocol.snapshotShape(), so a rename there warns here instead of
	silently stopping every patchClear onset in the game.
]]
export type Snapshot = {
	clearedCount: number,
}

export type Updater = (Snapshot?) -> ()

--[[
	One row of GameConfig.Response.beats, narrowed to the fields this module reads plus the
	two lifetimes a cue body will want the moment one exists.

	`dwellSeconds` (findReveal, 2.5) and `residueLifetimeSeconds` (patchClear, 0.4) are not
	used by the scheduler — nothing in the contract says a dwell gates the queue, and the gap
	is 0.6 either way — but they are carried to the cue seam so that the first cue written
	reads its lifetime from config rather than picking one.
]]
export type BeatSpec = {
	id: string,
	rank: number,
	acknowledgmentBudgetMs: number,
	channels: { string },
	forbiddenChannels: { string },
	queued: boolean,
	dwellSeconds: number?,
	residueLifetimeSeconds: number?,
}

--[[
	What a cue body is handed. Everything a presentation pass could want about one onset,
	assembled once and passed by reference.

	`args` is the packet exactly as Protocol declares its payload, in order:
	  findReveal        args[1] = the Find name string, from Patch.find
	  setComplete       args[1] = the collection.sets[].id string
	  areaComplete      args[1] = the area label string
	  upgradePurchased  args[1] = the upgrade id string, args[2] = the new held level
	  patchClear        no args — the tick announces no per-patch packet
	Those meanings are prose in Protocol.REMOTES[name].payload and are restated here because
	there is nothing machine-readable to derive them from.
]]
export type Onset = {
	beat: BeatSpec,
	channel: string?,
	args: { any },
	gui: ScreenGui,
	arrivedAt: number,
	beganAt: number,
	latencySeconds: number,
}

local WARN_PREFIX = "[Beats]"

-- The snapshot field the updater reads, checked against Protocol.snapshotShape() at connect.
local SNAPSHOT_FIELD_READ = "clearedCount"

--[[
	How Protocol.REMOTES states the channel -> beat mapping. Anchored at the start so a
	channel handled by any other module cannot match, and tolerant of anything after the
	bracket, because the same string is annotated with the beat's rank and budget in the
	build pack's copy of the table.
]]
local HANDLED_BY_PATTERN = "^beats, as response%.beats%[(%w+)%]"

-- Only channels that travel this way are receivable here. A client cannot listen to a
-- channel it originates, and Protocol names the direction, so this is read rather than
-- assumed.
local INBOUND_DIRECTION = "server -> client"

--============================================================================================
-- THE CUE SEAM
--
-- FIVE EMPTY BODIES, ONE PER BEAT. This is the only part of this file that presentation
-- work touches. The scheduler above decides that a cue begins now; each body decides what
-- "begins" means for its beat, and has the beat's channels, budget and lifetimes in
-- `onset.beat` to do it with.
--
-- A body may not: write a Humanoid property, move the camera, open anything modal, suspend
-- input, or take a keypress. response.controlEverAffected is false and every beat's
-- controlAffected is false. It may not play a rejection or failure cue either, because
-- response.negativeBeats is 0 and none of these five is caused by a failure. And it may not
-- vary by which set a Find belongs to: rarity.forbidden bans a reveal cue that does.
--============================================================================================

--[[ atPatch + audio, 300 ms budget, 2.5 s dwell. onset.args[1] is the Find name.
	NOTICE IS FORBIDDEN to this beat — response.beats[findReveal].forbiddenChannels. ]]
local function cueFindReveal(onset: Onset) end

--[[ notice + audio, 400 ms budget. onset.args[1] is the set id. The set headings on the
	collection surface are the only place the find-set ladder is legible; nothing here may
	vary by set. ]]
local function cueSetComplete(onset: Onset) end

--[[ notice + audio, 400 ms budget. onset.args[1] is the area label.
	ATPATCH IS FORBIDDEN to this beat — response.beats[areaComplete].forbiddenChannels. ]]
local function cueAreaComplete(onset: Onset) end

--[[ readout + audio, 200 ms budget. onset.args[1] is the upgrade id, args[2] the new held
	level. effectAppliedBeforeAcknowledgment is true: the WalkSpeed and tool-head writes have
	already landed by the time this runs, so this acknowledges and never applies. ]]
local function cueUpgradePurchased(onset: Onset) end

--[[ atPatch + readout, 80 ms budget, 0.4 s residue. No args. Unsequenced and overlapping:
	up to minSustainedOnsetsPerSecond (8) of these begin in one second, and they must overlap
	rather than queue behind each other or be dropped. ]]
local function cuePatchClear(onset: Onset) end

local CUES: { [string]: (Onset) -> () } = {
	findReveal = cueFindReveal,
	setComplete = cueSetComplete,
	areaComplete = cueAreaComplete,
	upgradePurchased = cueUpgradePurchased,
	patchClear = cuePatchClear,
}

--============================================================================================
-- READING THE CONTRACT
--============================================================================================

-- Collect a vararg into a plain array. table.pack would do it, but its `n` field makes the
-- result something other than { any } and every reader would then have to know that.
local function packArgs(...): { any }
	local count = select("#", ...)
	local args: { any } = table.create(count)
	for index = 1, count do
		args[index] = (select(index, ...))
	end
	return args
end

local function contains(list: { string }, value: string): boolean
	for _, entry in ipairs(list) do
		if entry == value then
			return true
		end
	end
	return false
end

--[[
	GameConfig.Response.beats, keyed by id.

	Read row by row rather than held as a reference, because the rows are not uniform — only
	findReveal carries a dwell and only patchClear a residue — and a narrow record is what
	the rest of this file can be typed against.
]]
local function readBeats(): { [string]: BeatSpec }
	local specs: { [string]: BeatSpec } = {}
	local rows = GameConfig.Response.beats :: { any }
	for _, row in ipairs(rows) do
		local spec: BeatSpec = {
			id = row.id,
			rank = row.rank,
			acknowledgmentBudgetMs = row.acknowledgmentBudgetMs,
			channels = row.channels or {},
			forbiddenChannels = row.forbiddenChannels or {},
			queued = row.queued == true,
			dwellSeconds = row.dwellSeconds,
			residueLifetimeSeconds = row.residueLifetimeSeconds,
		}
		specs[spec.id] = spec
	end
	return specs
end

--[[
	The beat id a channel is declared to feed, or nil if that channel is not this module's.

	THE ONE PLACE THE TWO SPELLINGS MEET. FindRevealed is a channel name and findReveal is a
	beat id; nothing but this line knows they are the same event, and it knows because
	Protocol says so in the channel's own record.
]]
local function beatIdFor(def: { direction: string, handledBy: string }): string?
	if def.direction ~= INBOUND_DIRECTION then
		return nil
	end
	-- Parenthesised: string.match is variadic and only the first capture is wanted.
	return (string.match(def.handledBy, HANDLED_BY_PATTERN))
end

--[[
	channelExclusivity is written two ways — atPatch is one beat id, notice is a list of two —
	so both are normalised to a list before anything reads them.
]]
local function exclusiveOwners(value: any): { string }
	if type(value) == "string" then
		return { value }
	end
	if type(value) == "table" then
		return value :: { string }
	end
	return {}
end

--[[
	Warn once, at connect, if the contract this module was written against has stopped
	holding. Nothing here changes behaviour; it exists so that a re-emitted GameConfig or a
	renamed channel is a line in the output rather than a beat that silently stops playing.

	Deliberately NOT checked: patchClear names atPatch among its channels while
	channelExclusivity assigns atPatch to findReveal. That pair cannot both be enforced —
	eight overlapping patchClear onsets a second are themselves two beats on one exclusive
	channel — so exclusivity is read as governing the SEQUENCED beats, whose 0.6 s gap makes
	it structurally true, and patchClear is exempt. See the report; it is a finding, not a
	silent choice.
]]
local function checkContract(specs: { [string]: BeatSpec }, handled: { [string]: string })
	local response = GameConfig.Response

	-- Every beat the response contract calls sequenced must have a channel to arrive on, and
	-- every channel that names this module must feed a beat that exists. A channel with a
	-- producer and no receiver is the exact defect Protocol's handledBy field exists to make
	-- visible, so it is tested rather than trusted.
	local fed: { [string]: boolean } = {}
	for channelName, beatId in pairs(handled) do
		fed[beatId] = true
		if specs[beatId] == nil then
			warn(
				string.format(
					"%s channel %q says it feeds response.beats[%s], which GameConfig.Response.beats does not declare — that channel has no receiver",
					WARN_PREFIX,
					channelName,
					beatId
				)
			)
		end
	end

	for _, beatId in ipairs(response.sequencedBeats :: { string }) do
		local spec = specs[beatId]
		if spec == nil then
			warn(string.format("%s response.sequencedBeats names %q, which has no row in response.beats", WARN_PREFIX, beatId))
		else
			if not spec.queued then
				warn(
					string.format(
						"%s beat %q is in response.sequencedBeats but its queued is false — it will play on arrival and the %.2fs onset gap will not apply to it",
						WARN_PREFIX,
						beatId,
						response.minOnsetGapSeconds
					)
				)
			end
			if not fed[beatId] then
				warn(
					string.format(
						"%s beat %q is sequenced but no remote channel declares it in handledBy — nothing will ever schedule it",
						WARN_PREFIX,
						beatId
					)
				)
			end
			-- A sequenced beat may only play on an exclusive channel it owns. Checked over the
			-- sequenced four only, for the reason in this function's header.
			for _, channelName in ipairs(spec.channels) do
				local owners = exclusiveOwners((response.channelExclusivity :: any)[channelName])
				if #owners > 0 and not contains(owners, spec.id) then
					warn(
						string.format(
							"%s beat %q plays on exclusive channel %q, which response.channelExclusivity gives to someone else",
							WARN_PREFIX,
							spec.id,
							channelName
						)
					)
				end
			end
		end
	end

	-- A beat may not play on a channel its own row forbids. findReveal bans notice and
	-- areaComplete bans atPatch, and both bans exist because an approved sheet demanded the
	-- reveal and the completions be told apart without reading the text.
	for _, spec in pairs(specs) do
		for _, channelName in ipairs(spec.forbiddenChannels) do
			if contains(spec.channels, channelName) then
				warn(
					string.format(
						"%s beat %q lists %q in both channels and forbiddenChannels",
						WARN_PREFIX,
						spec.id,
						channelName
					)
				)
			end
		end
	end

	-- The one snapshot field patchClear is driven from.
	local declared = false
	for _, field in ipairs(Protocol.snapshotShape()) do
		if field == SNAPSHOT_FIELD_READ then
			declared = true
		end
	end
	if not declared then
		warn(
			string.format(
				"%s snapshot field %q is no longer declared by Protocol.snapshotShape() — no patchClear beat will ever play",
				WARN_PREFIX,
				SNAPSHOT_FIELD_READ
			)
		)
	end
end

--============================================================================================
-- THE SCHEDULER
--============================================================================================

-- A beat that has arrived and has not begun.
type Pending = {
	beat: BeatSpec,
	channel: string?,
	args: { any },
	arrivedAt: number,
	sequence: number,
}

--[[
	THE QUEUE ORDER: response.beats[].rank, LOWEST FIRST, arrival order as the tiebreak.

	findReveal 1, setComplete 2, areaComplete 3, upgradePurchased 4. table.sort is not stable,
	so the `sequence` tiebreak is load-bearing rather than decorative even though no two of
	the four share a rank today.

	Rank is what the module's acceptance criteria name, twice ("the ordering of two queued
	beats follows response.beats[].rank, lowest first"). response.sequencedBeats is spelled in
	a DIFFERENT order — upgradePurchased first — and if that array's order is meant to be the
	coincident order then this comparator is the wrong one for exactly one pair. That
	disagreement is in the report; changing sides is changing this function and nothing else.
]]
local function compareQueued(a: Pending, b: Pending): boolean
	if a.beat.rank ~= b.beat.rank then
		return a.beat.rank < b.beat.rank
	end
	return a.sequence < b.sequence
end

--[[
	Connect the four payoff channels and return the updater the fifth beat rides on.

	`gui` is the HUD ScreenGui a cue would draw into. It is held and handed to every cue and
	nothing is written to it here, because nothing in this module authors a readout.
]]
function Beats.connect(gui: ScreenGui): Updater
	local specs = readBeats()
	local minOnsetGapSeconds: number = GameConfig.Response.minOnsetGapSeconds

	-- Arrived, not yet begun. Sequenced beats only; an unsequenced one never enters it.
	local queue: { Pending } = {}
	local arrivals = 0
	-- The clock reading of the last SEQUENCED onset. nil until the first one, which is what
	-- lets the very first beat of a session begin with no wait at all.
	local lastOnsetClock: number? = nil
	-- One warning per beat id if a cue body ever throws, rather than one per onset: patchClear
	-- can produce eight a second and a broken cue must not become a wall of output.
	local cueFaulted: { [string]: boolean } = {}

	local function begin(pending: Pending)
		local beganAt = os.clock()
		local cue = CUES[pending.beat.id]
		if cue == nil then
			return
		end
		local onset: Onset = {
			beat = pending.beat,
			channel = pending.channel,
			args = pending.args,
			gui = gui,
			arrivedAt = pending.arrivedAt,
			beganAt = beganAt,
			latencySeconds = beganAt - pending.arrivedAt,
		}
		-- The cue seam is empty today, so this can only fire once presentation exists. It is
		-- here because a patchClear cue runs inside client-main's snapshot fan-out, and an
		-- error there would take the HUD's updater down with it.
		local ok, err = pcall(cue, onset)
		if not ok and not cueFaulted[pending.beat.id] then
			cueFaulted[pending.beat.id] = true
			warn(string.format("%s the %s cue errored and will not be reported again: %s", WARN_PREFIX, pending.beat.id, tostring(err)))
		end
	end

	--[[
		A packet has arrived on one of the four channels.

		A QUEUED BEAT IS NOT PLAYED HERE, even when the queue is empty and the gap has long
		since elapsed. It waits for the next Heartbeat, which is what makes the coincident case
		deterministic: two packets fired in one server tick arrive in one client frame, and
		deciding at the end of that frame is the only way rank rather than delivery order picks
		which of them goes first. The wait is one frame against a budget of 200 ms at worst.
	]]
	local function receive(beatId: string, channelName: string, ...)
		local spec = specs[beatId]
		if spec == nil then
			return
		end
		local pending: Pending = {
			beat = spec,
			channel = channelName,
			args = packArgs(...),
			arrivedAt = os.clock(),
			sequence = arrivals,
		}
		arrivals += 1
		if not spec.queued then
			-- Not reachable from a channel today: all four are queued. If a re-emit ever
			-- unsequences one, it plays on arrival rather than silently vanishing.
			begin(pending)
			return
		end
		table.insert(queue, pending)
	end

	-- One connection per channel Protocol says this module handles. Nothing here names a
	-- channel, which is the property that stops FindRevealed/findReveal drifting apart.
	local handled: { [string]: string } = {}
	for channelName, def in pairs(Protocol.REMOTES) do
		local beatId = beatIdFor(def)
		if beatId ~= nil then
			handled[channelName] = beatId
			local remote = Protocol.channel(channelName) :: RemoteEvent
			remote.OnClientEvent:Connect(function(...)
				receive(beatId, channelName, ...)
			end)
		end
	end

	checkContract(specs, handled)

	--[[
		The drain. One sequenced onset per frame at most, and only once the gap since the last
		one has elapsed.

		THE GAP IS BETWEEN CONSECUTIVE ONSETS, ALWAYS — not only between two beats that were
		queued together. "A beat with nothing queued ahead of it plays immediately" is read as
		"nothing holds it back on purpose", not as licence to put two onsets 0.3 s apart, which
		the first acceptance criterion forbids without qualification.
	]]
	RunService.Heartbeat:Connect(function()
		if #queue == 0 then
			return
		end
		local now = os.clock()
		local previous = lastOnsetClock
		if previous ~= nil and now - previous < minOnsetGapSeconds then
			return
		end
		table.sort(queue, compareQueued)
		local head = table.remove(queue, 1)
		if head == nil then
			return
		end
		lastOnsetClock = now
		begin(head)
	end)

	--[[
		THE UNSEQUENCED BEAT. patchClear has no channel: the tick clears patches and announces
		only a snapshot, so a rise in clearedCount is the whole of its cause.

		ONE ONSET PER PATCH, not one per snapshot. A tick that clears three patches sends one
		snapshot with a rise of three, and minSustainedOnsetsPerSecond (8) is counted in
		clears, so three onsets is what the contract asks for. They begin together, because
		onOverload is "overlap" — not spaced, not merged, not dropped.

		THE FIRST SNAPSHOT ONLY ESTABLISHES THE BASELINE. A returning player whose live area is
		130 patches in would otherwise be met with 130 onsets at join, which is the same defect
		as paying them again for an area they already cleared.

		A FALL IN THE COUNT IS SILENT. clearedCount is zeroed when an area finishes, and an
		area finishing is areaComplete's business, not this one's.
	]]
	local lastClearedCount: number? = nil

	return function(snapshot: Snapshot?)
		if snapshot == nil then
			return
		end
		local count = snapshot.clearedCount
		if type(count) ~= "number" then
			return
		end
		local previous = lastClearedCount
		lastClearedCount = count
		if previous == nil then
			return
		end
		local rise = math.floor(count - previous)
		if rise <= 0 then
			return
		end
		local spec = specs.patchClear
		if spec == nil then
			return
		end
		local arrivedAt = os.clock()
		for _ = 1, rise do
			arrivals += 1
			begin({
				beat = spec,
				channel = nil,
				args = {},
				arrivedAt = arrivedAt,
				sequence = arrivals,
			})
		end
	end
end

return Beats
