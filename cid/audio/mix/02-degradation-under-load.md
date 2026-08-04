# 02 — Degradation under load: one arithmetic, three faces

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**Ducking, roll-off and voice-stealing are the only three legal degradations, and no onset of this client's own five beats may ever be refused.** A `Stingers` voice ducks `World` to 0.45 and `Beds` to 0.35 of default over 0.08 s in and 0.35 s out; `World` uses `InverseTapered` 8→72 studs and `WorldNeighbour` `LinearSquare` 2→26 studs at a third of `World`'s level; and the cap is **24 concurrent voices** `[playtest unknown]`, reserved per bus, enforced by stealing a tail that has already been audible for 0.08 s — with exactly one enumerated refusal, on the one bus that carries no beat of this client's.

## Why

**This is one decision, not three, and the reason is negative.** `response.onOverload` is `"overlap"` — *"Overlap is the required degradation; dropping is not"* — and `performance/03` `N14` forbids *"deferring, batching, coalescing or dropping"* any award, reveal or completion push. Between them, every degradation that removes an onset is already illegal. What is left is quieter-because-something-else-is-playing, quieter-because-it-is-far-away, and not-a-voice-at-all. They share one output — a realised amplitude per voice — so they must be tuned against each other or they double-count `[cid: decided]`.

**The engine default never culls anything, and that single fact is why this sheet exists.** `RollOffMode.Inverse` is the default and attenuates as `RollOffMinDistance/distance`, **not using `RollOffMaxDistance` at all**; only `Linear`, `LinearSquare` and `InverseTapered` attenuate *between* min and max `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/enums/RollOffMode.yaml]`. At defaults every voice inside a 512-stud streamed set stays in the mix forever, so the concurrency budget would have to absorb the whole worst case rather than a fraction of it.

**The neighbour is five studs away, not one hundred and twenty-two.** `plots.laneWidthStuds` is 120 at `pitchStuds` 122, so the inter-lane boundary is 2 studs; `layout.chunk.edgeKeepoutStuds` 1.5 holds a patch off each lane edge. Nearest patch to nearest patch across the boundary is **1.5 + 2 + 1.5 = 5.0 studs**, and a listener standing at their own lane edge is **3.5 studs** from a neighbour's nearest patch. Both sit inside the engine's default `RollOffMinDistance` of 10, which is full volume — so **at defaults a neighbour's work is louder in the mix than the player's own**, whose cleared patches sit up to 51.66 studs out at full `radius` spend. Distance alone cannot separate the two cases, because 5 studs is inside the player's own clear radius at every level. **Level has to.** That is what `WorldNeighbour` is for, and it is the whole answer to **G7**'s mix half.

**`InverseTapered` for own work, `LinearSquare` for a neighbour's.** `InverseTapered` is the lesser of the inverse and linear curves, so it falls off naturally near the source and still reaches zero at `RollOffMaxDistance` — it culls, which `Inverse` does not. 72 studs is above the 51.66-stud maximum effective clear radius `axisBudget` publishes, so the player's own farthest patch is always audible and everything past it is not. `LinearSquare` for the neighbour because *"low `RollOffMaxDistance` values cause audio to abruptly cut off"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]` and the squared curve is already near zero well before its 26-stud edge `[cid: decided]`.

**26 studs is chosen against the lane, not against taste.** At `pitchStuds` 122, a 26-stud audible radius means only the two immediately adjacent lanes can hold an audible patch, and only while the player is within 26 studs of a boundary. Nine loaded lanes become at most three audible ones. That is what makes the cap affordable, and it is stated as arithmetic so it can be re-derived if the pitch moves.

**The cap has no source, and I established that rather than assumed it.** Roblox publishes no simultaneous-sound limit at any device tier. The only evidence is community: normal operation to ~400 synchronised instances with desync above, on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* `[research: https://devforum.roblox.com/t/total-sound-instance-limit/3736250]`; and one background track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid one-shots, also unconfirmed `[research: https://devforum.roblox.com/t/sound-play-limitations/552486]`. **Neither is a phone.** The second is the failure mode this key exists to prevent, so **24** sits just under it and the top of the test range, 48, is the value at which that report would have to be wrong.

**Stealing is legal and refusing is not, and the line between them is 0.08 s.** `response.beats[patchClear]` acknowledges in 80 ms. A voice that has been audible for its own acknowledgment budget has *happened*; taking its ringing tail removes no acknowledgment. Refusing to start one removes the acknowledgment entirely, which is `N14`'s prohibition wearing a mixer's name. So `minAudibleBeforeStealSeconds` equals the budget exactly, and when no voice qualifies the new onset plays anyway and the bus exceeds its reservation.

**There is exactly one exception and it is enumerated rather than implied.** A `WorldNeighbour` onset arriving when all five of that bus's voices are younger than 0.08 s is **refused**. It is legal on the merits — it is not one of this client's five beats, so `N14` does not reach it, and `social/02` makes a neighbour a **sight** requirement, which is the same judgement the stealing order already makes by taking that class first. What it was not, until now, was *stated*: `M11` banned refusal unscoped while this sheet performed one. `refusalCases` has one entry, `M11` names the same bus, and a build can be failed against the pair.

**One `Sound` cannot overlap itself** — `Play()` restarts it `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]` `[research: https://devforum.roblox.com/t/how-do-you-play-a-sound-without-restarting-it/1101216]` — so every cue row carries a `poolSize` and a play site acquires from a pool. **Pool depth tracks the reservation for a class that is stolen from first, and the burst for a class that is not.** That is why the own-work clear is 8 and its neighbour twin is 5, and it is now a stated rule rather than a discrepancy a reader has to reconstruct.

**The bed is never stolen, and that was implicit until now.** `Beds` receives exactly one onset per session, so the stealing trigger — *a bus is at its reservation and a new onset arrives for it* — can never fire on it. But a builder implementing a naive global "steal the oldest voice at 24" silences the layer for the whole session, which a player would notice. `neverStolen: ["Beds"]` makes the structural fact a field.

**The ducked window reads the cues, not the caps.** My first figure took `notices`' 2.5 s and 3.0 s **ceilings** and then added a release term they did not include, so it disagreed with its own derivation. The real hold is over `stingers.cues[*].audibleSeconds` — the last stinger voice ends 3.2 s after `B1`'s onset, and the duck releases 0.35 s later. Both terms are read by field so the figure re-derives if either owner moves a number.

**The coincidence trim is a headroom rule and `theme/tone/03` does not reach it.** That sheet forbids a cue whose *intensity is a function of progress, streak, count, elapsed time, or depth*. A trim keyed to how many `Stingers` voices are live moves **only downward**, is **one step and never a ladder**, applies to the bus so all three cues scale together and the `B1 > B2 > B3` ranking is preserved exactly, and never varies by *which* beats are coincident. It cannot make any cue louder than its row in `levelLadder`, which is the property that makes it a limiter rather than an escalation. `forbidden` `M9` makes the boundary checkable.

**Both resolutions of G1 stay legal.** If `patchClear` never gains an `audio` channel, `World` holds no beat cue, the 72-onset case does not arise, and every figure here is over-built by roughly an order of magnitude with no rule broken. The arithmetic is written out so the cap can be re-derived rather than re-argued.

```manifest
{
  "amends": "mix",
  "authoritativeIn": "cid/audio/mix/01-bus-tree-and-levels.md",
  "value": {
    "ducking": {
      "principle": "a level change on a bus, never a suppression of a voice. Nothing in this key drops, queues, delays, shortens or fades out an onset of one of this client's five beats.",
      "crossBus": [
        { "cause": "any audible Stingers voice", "ducked": "World", "toFractionOfDefault": 0.45, "duckedBusVolume": 0.2475, "realisedCueLevelWhileDucked": 0.1485 },
        { "cause": "any audible Stingers voice", "ducked": "WorldNeighbour", "toFractionOfDefault": 0.45, "note": "inherits World's duck through the bus chain and is never ducked twice" },
        { "cause": "any audible Stingers voice", "ducked": "Beds", "toFractionOfDefault": 0.35, "duckedBusVolume": 0.105, "realisedCueLevelWhileDucked": 0.0578 }
      ],
      "neverDucked": ["Master", "Stingers", "Interface"],
      "whyInterfaceIsNeverDucked": "response gives upgradePurchased a 200 ms budget, the tightest in the game, on the game's only currency sink; input.debounceSeconds 0.35 caps its rate at 2.9 per second so it cannot flood a bus.",
      "coincidenceTrim": {
        "appliesTo": "Stingers",
        "trigger": "two or more simultaneously audible Stingers voices",
        "toFractionOfDefault": 0.70,
        "steps": 1,
        "whyOneStep": "a ladder keyed to the count would be a cue parameter reading a count, which theme/tone/03 forbids. One step, identical in both directions, and it never varies by which beats are coincident.",
        "whyItIsNotAnIntensityRule": "it moves only downward, applies to the bus so B1/B2/B3 scale together and the ranking is preserved exactly, and can never raise a cue above its levelLadder row.",
        "why": "the coincident chain puts up to two stinger voices live at once at stingers' published lengths, and three if a later revision lengthens B1. Their uncorrelated power sum at 0.850/0.748/0.646 is 1.30, above the output ceiling; at 0.70 it is 0.91."
      },
      "envelope": {
        "attackSeconds": 0.08,
        "attackTestRange": [0.03, 0.15],
        "releaseSeconds": 0.35,
        "releaseTestRange": [0.20, 0.80],
        "holdRule": "the duck holds while any causing voice is audible and releases from the end of the last one",
        "curve": "linear on SoundGroup.Volume",
        "status": "[playtest unknown]"
      },
      "depthStatus": "[playtest unknown]. Test ranges: World 0.30 to 0.70, Beds 0.25 to 0.60, coincidenceTrim 0.55 to 0.85. Instrument: a listening test on the floor device, which no sheet in either contract owns taking.",
      "minimumDuckedFraction": 0.30,
      "minimumDuckedFractionRule": "no ducking or trim figure in this key, at any future tuning, may put a bus below 0.30 of its default. A bus at 0 is a suppression and is illegal under response.onOverload and performance/03 N14.",
      "heldAtDuckedLevelSeconds": 3.2,
      "worstCaseDuckedWindowSeconds": 3.55,
      "worstCaseDerivation": "read by field, never copied. On the 4.3% of laps where B1, B2 and B3 all fire on one clear, onsets fall at 0, g and 2g where g is response.minOnsetGapSeconds (0.6 today, [playtest unknown] at 0.35 to 0.9). Each voice ends at its onset plus its own stingers.cues[*].audibleSeconds. At the published lengths the ends are 1.2, 3.2 and 3.0, so the last voice ends at 3.2 s — that is heldAtDuckedLevelSeconds. Add ducking.envelope.releaseSeconds 0.35 for the window in which World and Beds are below their defaults at all: 3.55 s.",
      "whyNotTheNoticeCaps": "an earlier draft used notices' 3.0 s and 2.5 s dwell CEILINGS and produced 3.7, which matched neither the caps nor the cues. The caps bound what stingers may write; the cues are what it wrote. The hold is a property of the cues.",
      "worstCaseConsequence": "World and Beds sit at or below their ducked level for up to 3.55 s once per completing lap. B5 continues to fire and continues to be audible throughout at a realised 0.1485.",
      "movesIf": "stingers.cues[setComplete].audibleSeconds or [areaComplete].audibleSeconds moves, or Balance sets response.minOnsetGapSeconds away from 0.6. Both terms are read by field so the figure re-derives rather than going stale."
    },
    "attenuation": {
      "whyThisBlockExists": "RollOffMode.Inverse is the engine default and does not use RollOffMaxDistance at all, so at defaults nothing in this game is ever culled by distance and every voice inside a 512-stud streamed set stays in the mix forever.",
      "listener": "the player's own character. SoundService.DefaultListenerLocation stays at the engine default and is never written.",
      "profiles": [
        { "bus": "Stingers", "spatial": "global2D", "realisation": "a Sound parented to SoundService with SoundGroup = Stingers", "why": "theme/tone/03 requires B1 to be the loudest single moment in the game; a positional B1 would be quieter when the Find sits at the sweep edge, making its level a function of the radius upgrade. A global cue played only on the owning client also cannot reach a second player, which is what social/03 X11 requires." },
        { "bus": "Interface", "spatial": "global2D", "realisation": "same, or SoundService:PlayLocalSound", "why": "an interface cue has no world position" },
        { "bus": "World", "spatial": "positional3D", "realisation": "a Sound parented to the patch BasePart or to an Attachment at its position", "rollOffMode": "InverseTapered", "rollOffMinDistance": 8, "rollOffMaxDistance": 72, "emitterSizeWritten": false, "emitterSizeReason": "EmitterSize is deprecated in favour of the RollOff pair and is left at the engine default 10, never written", "maxDistanceDerivation": "above axisBudget's 51.66-stud maximum effective clear radius, so the player's own farthest patch is always audible and everything beyond it is culled" },
        { "bus": "WorldNeighbour", "spatial": "positional3D", "realisation": "same", "rollOffMode": "LinearSquare", "rollOffMinDistance": 2, "rollOffMaxDistance": 26, "emitterSizeWritten": false, "maxDistanceDerivation": "at plots.pitchStuds 122, a 26-stud audible radius means only the two immediately adjacent lanes can hold an audible patch, and only while the player is within 26 studs of a boundary" },
        { "bus": "Beds", "spatial": "global2D", "ifAmbienceDeclaresPositional": { "rollOffMode": "Linear", "rollOffMinDistance": 24, "rollOffMaxDistance": 220 }, "note": "supplied so a positional bed is specifiable; ambience chooses whether to use it" }
      ],
      "neighbourCase": {
        "nearestPatchToPatchStuds": 5.0,
        "nearestListenerToNeighbourPatchStuds": 3.5,
        "derivation": "plots.laneWidthStuds 120 at pitchStuds 122 leaves a 2-stud boundary; layout.chunk.edgeKeepoutStuds 1.5 holds a patch off each lane edge. 1.5 + 2 + 1.5 = 5.0 patch to patch; 1.5 + 2 = 3.5 from a listener at their own lane edge.",
        "notThePlotPitch": "122 studs is the pitch between lane CENTRES and is not the audible separation between two players' work. Reading it as one is the error this block exists to stop.",
        "whyDistanceAloneCannotFixIt": "a neighbour at 3.5 to 5 studs is closer than most of the player's own cleared patches, which sit anywhere inside a clear radius of 10 studs at level 0 and 51.66 at full spend. No RollOffMinDistance separates the two cases, so level must.",
        "levelAt3p5Studs": 0.0870,
        "levelAt5Studs": 0.0758,
        "ownClearInsideMinDistance": 0.330,
        "ratio": "the loudest realisable neighbour clear is 3.8x quieter than the player's own clear at RollOffMinDistance",
        "silentBeyondStuds": 26,
        "onlyCrossPlayerCue": "social/03 X10 permits exactly one thing to reach a second client — another player's own patches clearing and the cue that accompanies it. X11 and theme/tone/03 forbid any cue for another player's join, leave, reveal or completion, so this bus has exactly one member class forever."
      },
      "farthestInsideOneStreamedSetStuds": 684,
      "farthestDerivation": "sqrt(488^2 + 480^2): four lanes either side at plots.pitchStuds 122 is 488 studs across, and a merged bay is 480 studs long. At InverseTapered with rollOffMaxDistance 72 the level there is 0, which is the point."
    },
    "concurrency": {
      "maxConcurrentVoices": 24,
      "status": "[playtest unknown]",
      "testRange": [16, 48],
      "observedFloorOfConcern": 25,
      "observedFloorSource": "one community report of a background track silently entering a playing-but-inaudible state at 'maybe around 25' rapid one-shots. Unconfirmed by Roblox, and not on a phone.",
      "whyNoSourcedCapExists": "Roblox publishes no simultaneous-sound limit at any device tier. Four fetches found only community measurement: ~400 synchronised instances on an Intel i5-12500H with 16 GB, and the ~25 figure above.",
      "whyTheRangeTopIs48": "48 is the value at which the one phone-adjacent report would have to be wrong. Below 16 the realistic worst case of 10 voices has under 60% margin.",
      "loadDerivation": {
        "perPlayerOnsetsPerSecond": 8,
        "source": "response.minSustainedOnsetsPerSecond",
        "lanesLoaded": 9,
        "lanesLoadedDerivation": "budgets.streaming.StreamingTargetRadius 512 / plots.pitchStuds 122 is four lanes either side plus the player's own",
        "unattenuatedOnsetsPerSecond": 72,
        "audibleLengthSeconds": 0.4,
        "audibleLengthSource": "response.beats[patchClear] residue 0.4 s. sfx.assets ship at 0.30 s, inside it.",
        "unattenuatedConcurrentVoices": 29,
        "lanesAudibleAfterRollOff": 3,
        "afterRollOffDerivation": "WorldNeighbour.rollOffMaxDistance 26 against plots.pitchStuds 122: only the two immediately adjacent lanes can contain a patch inside the audible radius",
        "afterRollOffOnsetsPerSecond": 24,
        "afterRollOffConcurrentVoices": 10,
        "whatActuallyPaysForTheCap": "the roll-off profile removes 19 of the 29 worst-case voices, not the cap. A cap set against the unattenuated 29 would sit above the one phone-adjacent failure report.",
        "theBurstIsNotSpread": "these rates are a per-second average. Beats.luau:554-563 begins a tick's whole clearedCount rise inside one frame, so the instantaneous demand is the rise itself. That is a pool-depth question, answered in mix.assets.rows[].poolSize, and it moves no figure above: a rise of 8 is 8 voices against World's 15."
      },
      "reservations": [
        { "bus": "Stingers", "voices": 4, "why": "three cues plus one spare for the coincident chain's overlapping tails" },
        { "bus": "Interface", "voices": 3, "why": "three cue classes — upgradePurchased, indexOpen, indexClose — and input.debounceSeconds 0.35 caps the rate at 2.9 per second" },
        { "bus": "World", "voices": 15, "ofWhichWorldNeighbour": 5, "ownWorkHeadroom": 10, "why": "10 own-work voices against an 8-voice simultaneous burst" },
        { "bus": "Beds", "voices": 2, "why": "ambience.layerCount is at most 2" }
      ],
      "reservationsSum": 24,
      "stealing": {
        "trigger": "a bus is at its reservation and a new onset arrives for it",
        "neverRefuses": "no onset of one of this client's five beats is ever refused, delayed, batched, shortened or faded. response.onOverload is \"overlap\" and performance/03 N14 forbids every alternative. The one exception is enumerated in refusalCases and carries no beat of this client's.",
        "neverStolen": ["Beds"],
        "neverStolenReason": "Beds receives exactly one onset per session, so the trigger can never fire on it. The field exists because a naive global 'steal the oldest voice at 24' silences the layer for the whole session, which a player would notice. ambience asked for this exemption or a stated restart; this is the exemption.",
        "minAudibleBeforeStealSeconds": 0.08,
        "minAudibleReason": "equals response.beats[patchClear].budgetMs 80. A voice audible for its own acknowledgment budget has happened; taking its ringing tail removes no acknowledgment, and refusing to start one removes the whole of it.",
        "poolDepthRule": "pool depth tracks the RESERVATION for a class this order steals from first, and the BURST for a class it does not. cue.patchClear is 8 because nothing steals from World before it; cue.patchClear.neighbour is 5 because step 1 empties WorldNeighbour first and instances beyond the reservation could never sound.",
        "order": [
          { "n": 1, "steal": "any WorldNeighbour voice past minAudibleBeforeStealSeconds, longest-elapsed first", "why": "social/02 makes a neighbour a SIGHT requirement, so this is the only voice class whose loss costs no stated requirement" },
          { "n": 2, "steal": "any voice on the requesting bus past minAudibleBeforeStealSeconds, longest-elapsed first" },
          { "n": 3, "steal": "nothing. Play the new onset and exceed the reservation — on every bus except WorldNeighbour, which refuses instead. See refusalCases.", "why": "if every voice on the bus is under 0.08 s, stealing one would take an onset rather than a tail" }
        ],
        "refusalCases": [
          {
            "bus": "WorldNeighbour",
            "case": "an onset arrives when all five of that bus's reserved voices are younger than minAudibleBeforeStealSeconds",
            "outcome": "the onset is refused. No voice is taken and no reservation is exceeded.",
            "whyItIsLegal": "it is not one of response's five beats fired for this client, so performance/03 N14 does not reach it; social/02 makes a neighbour a SIGHT requirement rather than an audible one; and stealing.order step 1 already makes the same judgement by emptying this class first. The alternatives are worse: exceeding a reservation this key set at 5 for a class it steals from first, or taking an onset rather than a tail.",
            "whatItCosts": "one neighbour clear is unheard. Nothing this client did, and nothing this client is told, changes.",
            "howOftenItArises": "it needs five neighbour onsets inside 0.08 s from lanes within 26 studs, which needs the player standing at a lane boundary while a neighbour's whole tick rise lands.",
            "scopedBy": "mix.forbidden M11.onePermittedRefusal names this bus. It is the only refusal in the game."
          }
        ],
        "refusalCaseCount": 1,
        "neverStealsAcrossBuses": "except step 1, which releases WorldNeighbour to its own parent World",
        "stealMethod": "fade the stolen voice out over 0.06 s rather than Stop(), so a tail removal is not a click",
        "hardVoiceCeiling": 32,
        "hardVoiceCeilingBehaviour": "a report threshold only. The client warns once per session when live voices exceed 32 and plays every onset regardless.",
        "poolRule": "one Sound instance cannot overlap itself — Play() restarts it — so every row in mix.assets.rows carries a poolSize and every play site acquires from a pool rather than replaying one instance."
      },
      "legalUnderBothResolutionsOfG1": "if patchClear gains no audio channel, World holds no beat cue, the 72-onset case never arises, and every figure here is over-built by roughly an order of magnitude with no rule broken. The arithmetic is written out so the cap can be re-derived rather than re-argued."
    }
  }
}
```

## Consequences for other work

- **In-world-sound work (`sfx`).** Your simultaneous-burst reading is the ledger's derivation: `Beats.luau:554-563` fires a whole tick's rise in one frame, so `cue.patchClear.poolSize` is **8** and fits inside `World`'s 10 own-work voices. The neighbour twin is **5** under `stealing.poolDepthRule` — depth tracks the reservation for a class stolen from first — and the one consequence of that, a refused neighbour onset when all five voices are under 0.08 s old, is now enumerated rather than left to a reader to infer. Your reading that stealing a same-cue tail is not dropping an onset is adopted, and 0.08 s is where I put the line.
- **Reward-hit work (`stingers`).** Your three cues are the only duck cause in the game. `heldAtDuckedLevelSeconds` 3.2 and `worstCaseDuckedWindowSeconds` 3.55 are read off `cues[*].audibleSeconds` **by field**, so if you move a length or take `notices`' offered dwell revision, both figures re-derive and nothing else in this key moves.
- **Continuous-layer work (`ambience`).** Two things you asked for. `Beds` ducks to 0.35 under any stinger, so a bed sits at a realised 0.0578 for up to 3.55 s per completing lap — audible, and the deepest duck in the game. And `neverStolen: ["Beds"]` is a field rather than a structural accident, which is the exemption your `concurrencyRequirementOnMix` asked for.
- **Interface-sound work (`uiSound`).** Your bus is never ducked, never trimmed and never refused, and its 3 voices — one per cue class you ship — are never stolen by anything else.
- **Instance-representation work (`architect/06`).** A voice pool is instances, created once by the boot module and reused. The stealing order needs a per-voice elapsed-playback read, which is `TimePosition`, and a 0.06 s fade, which is a `Volume` write on the `Sound` and not on the bus. `Beds` members are never touched by either, and a `WorldNeighbour` acquire may legitimately return nothing.
- **Device-budget work (`budgets`).** Nothing here asks for a tick, a frame or an instance change. The cap is a client-side count over `Sound` instances the boot module already owns.

## Acceptance criteria

1. `sum(mix.concurrency.reservations[].voices) == mix.concurrency.maxConcurrentVoices` (4 + 3 + 15 + 2 = 24); `reservations[World].ofWhichWorldNeighbour` (5) plus `ownWorkHeadroom` (10) equals `voices` (15); and `ownWorkHeadroom` is at least `mix.assets.rows[cue.patchClear].poolSize` (10 ≥ 8).
2. Neither `mix.attenuation.profiles[World].rollOffMode` nor `[WorldNeighbour].rollOffMode` is `Inverse`, and both are modes that use `RollOffMaxDistance`.
3. `mix.ducking.worstCaseDuckedWindowSeconds` equals `heldAtDuckedLevelSeconds` plus `envelope.releaseSeconds` (3.2 + 0.35 = 3.55), and no ducking or trim figure anywhere in `mix.ducking` is below `minimumDuckedFraction` 0.30.
4. `mix.concurrency.stealing.refusalCaseCount` is 1, its one entry's `bus` is `WorldNeighbour` and matches the bus named in `mix.forbidden` `M11.onePermittedRefusal`, `neverStolen` contains `Beds`, and no bus carrying a `response` beat appears in `refusalCases`.

## Not decided here

Whether `patchClear` has an `audio` channel at all, and whether a neighbour's clear is authored as a positional cue — **G1** and **G7**'s content half, both in-world-sound work's, and this sheet is written so either answer is legal. What any cue is made of, its audible length and its variation rule — the owning key; I read `stingers.cues[*].audibleSeconds` by field and set none of it. `response.minOnsetGapSeconds`' figure inside its 0.35–0.9 range — Balance and Tuning. `notices`' `dwellSeconds` — feedback work, whose 5.0 s ceiling I neither reach nor ask to move. The bus tree, every bus level and the `SoundService` writes — sheet `01`, which carries `mix`. Every `poolSize` figure and the asset rows they sit in — sheet `03`. Whether the loss of a stolen neighbour tail, or of the one refused neighbour onset, is perceptible — `[playtest unknown]`, and the listening test joins `tech/performance/01`'s unowned measurement list.
