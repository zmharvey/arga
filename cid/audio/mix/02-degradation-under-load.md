# 02 — Degradation under load: one arithmetic, three faces

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**Ducking, roll-off and voice-stealing are the only three legal degradations, and none of them may refuse an onset.** A `Stingers` voice ducks `World` to 0.45 and `Beds` to 0.35 of default over 0.08 s in and 0.35 s out; `World` uses `InverseTapered` 8→72 studs and `WorldNeighbour` `LinearSquare` 2→26 studs at a third of `World`'s level; and the cap is **24 concurrent voices** `[playtest unknown]`, reserved per bus, enforced by stealing a tail that has already been audible for 0.08 s and never by declining to start.

## Why

**This is one decision, not three, and the reason is negative.** `response.onOverload` is `"overlap"` — *"Overlap is the required degradation; dropping is not"* — and `performance/03` `N14` forbids *"deferring, batching, coalescing or dropping"* any award, reveal or completion push. Between them, every degradation that removes an onset is already illegal. What is left is quieter-because-something-else-is-playing, quieter-because-it-is-far-away, and not-a-voice-at-all. They share one output — a realised amplitude per voice — so they must be tuned against each other or they double-count `[cid: decided]`.

**The engine default never culls anything, and that single fact is why this sheet exists.** `RollOffMode.Inverse` is the default and attenuates as `RollOffMinDistance/distance`, **not using `RollOffMaxDistance` at all**; only `Linear`, `LinearSquare` and `InverseTapered` attenuate *between* min and max `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/enums/RollOffMode.yaml]`. At defaults every voice inside a 512-stud streamed set stays in the mix forever, so the concurrency budget would have to absorb the whole worst case rather than a fraction of it.

**The neighbour is five studs away, not one hundred and twenty-two.** `plots.laneWidthStuds` is 120 at `pitchStuds` 122, so the inter-lane boundary is 2 studs; `layout.chunk.edgeKeepoutStuds` 1.5 holds a patch off each lane edge. Nearest patch to nearest patch across the boundary is **1.5 + 2 + 1.5 = 5.0 studs**, and a listener standing at their own lane edge is **3.5 studs** from a neighbour's nearest patch. Both sit inside the engine's default `RollOffMinDistance` of 10, which is full volume — so **at defaults a neighbour's work is louder in the mix than the player's own**, whose cleared patches sit up to 51.66 studs out at full `radius` spend. Distance alone cannot separate the two cases, because 5 studs is inside the player's own clear radius at every level. **Level has to.** That is what `WorldNeighbour` is for, and it is the whole answer to **G7**'s mix half.

**`InverseTapered` for own work, `LinearSquare` for a neighbour's.** `InverseTapered` is the lesser of the inverse and linear curves, so it falls off naturally near the source and still reaches zero at `RollOffMaxDistance` — it culls, which `Inverse` does not. 72 studs is above the 51.66-stud maximum effective clear radius `axisBudget` publishes, so the player's own farthest patch is always audible and everything past it is not. `LinearSquare` for the neighbour because *"low `RollOffMaxDistance` values cause audio to abruptly cut off"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]` and the squared curve is already near zero well before its 26-stud edge `[cid: decided]`.

**26 studs is chosen against the lane, not against taste.** At `pitchStuds` 122, a 26-stud audible radius means only the two immediately adjacent lanes can hold an audible patch, and only while the player is within 26 studs of a boundary. Nine loaded lanes become at most three audible ones. That is what makes the cap affordable, and it is stated as arithmetic so it can be re-derived if the pitch moves.

**The cap has no source, and I established that rather than assumed it.** Roblox publishes no simultaneous-sound limit at any device tier. The only evidence is community: normal operation to ~400 synchronised instances with desync above, on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* `[research: https://devforum.roblox.com/t/total-sound-instance-limit/3736250]`; and one background track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid one-shots, also unconfirmed `[research: https://devforum.roblox.com/t/sound-play-limitations/552486]`. **Neither is a phone.** The second is the failure mode this key exists to prevent, so **24** sits just under it and the top of the test range, 48, is the value at which that report would have to be wrong.

**Stealing is legal and refusing is not, and the line between them is 0.08 s.** `response.beats[patchClear]` acknowledges in 80 ms. A voice that has been audible for its own acknowledgment budget has *happened*; taking its ringing tail removes no acknowledgment. Refusing to start one removes the acknowledgment entirely, which is `N14`'s prohibition wearing a mixer's name. So `minAudibleBeforeStealSeconds` equals the budget exactly, and when no voice qualifies the new onset plays anyway and the bus exceeds its reservation.

**One `Sound` cannot overlap itself** — `Play()` restarts it `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]` `[research: https://devforum.roblox.com/t/how-do-you-play-a-sound-without-restarting-it/1101216]` — so every cue row carries a `poolSize` and a play site acquires from a pool. Without that, `onOverload: "overlap"` at 8 onsets a second builds a machine-gun restart, and two builders would not converge on the fix.

**The coincidence trim is a headroom rule and `theme/tone/03` does not reach it.** That sheet forbids a cue whose *intensity is a function of progress, streak, count, elapsed time, or depth*. A trim keyed to how many `Stingers` voices are live moves **only downward**, is **one step and never a ladder**, applies to the bus so all three cues scale together and the `B1 > B2 > B3` ranking is preserved exactly, and never varies by *which* beats are coincident. It cannot make any cue louder than its row in `levelLadder`, which is the property that makes it a limiter rather than an escalation. `forbidden` `M9` makes the boundary checkable.

**Both resolutions of G1 stay legal.** If `patchClear` never gains an `audio` channel, `World` holds no beat cue, the 72-onset case does not arise, and every figure here is over-built by roughly an order of magnitude with no rule broken. The arithmetic is written out so the cap can be re-derived rather than re-argued.

```manifest
{
  "amends": "mix",
  "authoritativeIn": "cid/audio/mix/01-bus-tree-and-levels.md",
  "value": {
    "ducking": {
      "principle": "a level change on a bus, never a suppression of a voice. Nothing in this key drops, refuses, queues, delays, shortens or fades out an onset.",
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
        "why": "three Stingers voices are audible together on 4.3% of laps (core-loop/02). Their uncorrelated power sum at 0.850/0.748/0.646 is 1.30, above the output ceiling; at 0.70 it is 0.91."
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
      "worstCaseDuckedWindowSeconds": 3.7,
      "worstCaseDerivation": "the 4.3% lap where B1, B2 and B3 all fire on one clear: B1 onset, +0.6 s to B2, +0.6 s to B3 (response.minOnsetGapSeconds, [playtest unknown] at 0.35 to 0.9), plus B3's 2.5 s audible cap from notices, plus 0.35 s release.",
      "worstCaseConsequence": "World and Beds sit at their ducked level for up to 3.7 s once per completing lap. B5 continues to fire and continues to be audible throughout at a realised 0.1485."
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
        "audibleLengthSource": "response.beats[patchClear] residue 0.4 s",
        "unattenuatedConcurrentVoices": 29,
        "lanesAudibleAfterRollOff": 3,
        "afterRollOffDerivation": "WorldNeighbour.rollOffMaxDistance 26 against plots.pitchStuds 122: only the two immediately adjacent lanes can contain a patch inside the audible radius",
        "afterRollOffOnsetsPerSecond": 24,
        "afterRollOffConcurrentVoices": 10,
        "whatActuallyPaysForTheCap": "the roll-off profile removes 19 of the 29 worst-case voices, not the cap. A cap set against the unattenuated 29 would sit above the one phone-adjacent failure report."
      },
      "reservations": [
        { "bus": "Stingers", "voices": 4, "why": "three cues plus one spare for the coincident chain's overlapping tails" },
        { "bus": "Interface", "voices": 3, "why": "input.debounceSeconds 0.35 caps the rate at 2.9 per second" },
        { "bus": "World", "voices": 15, "ofWhichWorldNeighbour": 5 },
        { "bus": "Beds", "voices": 2, "why": "ambience.layerCount is at most 2" }
      ],
      "reservationsSum": 24,
      "stealing": {
        "trigger": "a bus is at its reservation and a new onset arrives for it",
        "neverRefuses": "an onset is never refused, delayed, batched, shortened or faded. response.onOverload is \"overlap\" and performance/03 N14 forbids every alternative.",
        "minAudibleBeforeStealSeconds": 0.08,
        "minAudibleReason": "equals response.beats[patchClear].budgetMs 80. A voice audible for its own acknowledgment budget has happened; taking its ringing tail removes no acknowledgment, and refusing to start one removes the whole of it.",
        "order": [
          { "n": 1, "steal": "any WorldNeighbour voice past minAudibleBeforeStealSeconds, longest-elapsed first", "why": "social/02 makes a neighbour a SIGHT requirement, so this is the only voice class whose loss costs no stated requirement" },
          { "n": 2, "steal": "any voice on the requesting bus past minAudibleBeforeStealSeconds, longest-elapsed first" },
          { "n": 3, "steal": "nothing. Play the new onset and exceed the reservation.", "why": "if every voice on the bus is under 0.08 s, stealing one would take an onset rather than a tail" }
        ],
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

- **In-world-sound work (`sfx`).** Your `patchClear` row needs `poolSize` at least 4 (8 onsets/s × 0.4 s audible); the ledger sets 6. The neighbour's clear is the **same asset on a different bus** at 3.8× less level and silent past 26 studs, so it costs zero extra bytes and 5 of `World`'s 15 voices. If you rule it global-2D, `WorldNeighbour` is not built and the cap's realistic case falls from 10 voices to 4. Your reading that stealing a same-cue tail is not dropping an onset is **adopted**, and 0.08 s is where I put the line.
- **Reward-hit work (`stingers`).** Your three cues are the only duck cause in the game, and a `B2` at its full 3.0 s cap holds `World` and `Beds` down for up to 3.7 s on a completing lap. The coincidence trim scales all three together, so it never changes which of your cues is loudest. If you take `notices`' offered dwell revision and raise `B2`/`B3` inside the 5.0 s ceiling, `worstCaseDuckedWindowSeconds` moves and nothing else does.
- **Continuous-layer work (`ambience`).** `Beds` ducks to 0.35 under any stinger, so a bed is at a realised 0.0578 for up to 3.7 s per completing lap — audible, and the deepest duck in the game. If your layer is positional, the profile is supplied; nine loaded lanes do not multiply your voice count because `Beds` is reserved at 2.
- **Interface-sound work (`uiSound`).** Your bus is never ducked and never trimmed, and its 3 voices are never stolen by anything else. A press cue and `B4` landing inside 200 ms on one control both fit.
- **Instance-representation work (`architect/06`).** A voice pool is instances: `poolSize` `Sound` objects per row, created once by the boot module and reused. The stealing order needs a per-voice elapsed-playback read, which is `TimePosition`, and a 0.06 s fade, which is a `Volume` write on the `Sound` and not on the bus.
- **Device-budget work (`budgets`).** Nothing here asks for a tick, a frame or an instance change. The cap is a client-side count over `Sound` instances the boot module already owns.

## Acceptance criteria

1. `sum(mix.concurrency.reservations[].voices) == mix.concurrency.maxConcurrentVoices` (4 + 3 + 15 + 2 = 24), and `reservations[World].ofWhichWorldNeighbour` (5) is at most `reservations[World].voices` (15).
2. Neither `mix.attenuation.profiles[World].rollOffMode` nor `[WorldNeighbour].rollOffMode` is `Inverse`, and both are modes that use `RollOffMaxDistance`.
3. `mix.attenuation.neighbourCase.levelAt3p5Studs` (0.0870) is strictly below `ownClearInsideMinDistance` (0.330), and no ducking or trim figure anywhere in `mix.ducking` is below `minimumDuckedFraction` 0.30.
4. `mix.concurrency.stealing.order` contains exactly one step whose action plays the onset regardless, and no field in `mix.concurrency` or `mix.ducking` names a queue, a delay, a drop or a refusal.

## Not decided here

Whether `patchClear` has an `audio` channel at all, and whether a neighbour's clear is authored as a positional cue — **G1** and **G7**'s content half, both in-world-sound work's, and this sheet is written so either answer is legal. What any cue is made of, its audible length and its variation rule — the owning key. `response.minOnsetGapSeconds`' figure inside its 0.35–0.9 range — Balance and Tuning. `notices`' `dwellSeconds` — feedback work, whose 5.0 s ceiling I neither reach nor ask to move. The bus tree, every bus level and the `SoundService` writes — sheet `01`, which carries `mix`. Every `poolSize` figure and the asset rows they sit in — sheet `03`. Whether the loss of a stolen neighbour tail is perceptible — `[playtest unknown]`, and the listening test joins `tech/performance/01`'s unowned measurement list.
