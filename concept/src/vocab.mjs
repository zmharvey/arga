/**
 * The enumerated design space for a game concept.
 *
 * This is stage 0's equivalent of ui-forge's pattern registry: the vocabulary IS
 * the contract. A later stage that wants to branch on genre, session structure or
 * monetization can switch on these keys and be exhaustive, which is only possible
 * because the set is closed.
 *
 * Every vocabulary is authored as key -> one-clause description. The descriptions
 * are not documentation for humans; they are fed into prompts verbatim, because a
 * bare list of slugs gets miscategorised ("tycoon" and "simulator" are the same
 * word to a model that has not been told how Roblox uses them).
 *
 * THE ESCAPE HATCH. Any enumerated field also accepts "custom:<label>". This keeps
 * genuinely novel ideas expressible without widening the registry, at the cost of
 * a loud flag — a custom value is a promise that some later stage will need code
 * written for it, so it must never pass silently.
 */

export const CUSTOM_PREFIX = 'custom:';

export function isCustom(value) {
  return typeof value === 'string' && value.startsWith(CUSTOM_PREFIX);
}

export function customLabel(value) {
  return isCustom(value) ? value.slice(CUSTOM_PREFIX.length).trim() : null;
}

/** True when `value` is either an enumerated key or a non-empty custom escape. */
export function allowed(value, vocab) {
  if (isCustom(value)) return Boolean(customLabel(value));
  return typeof value === 'string' && Object.hasOwn(vocab, value);
}

/** Every custom escape used in a value or array of values. */
export function customsIn(value) {
  const list = Array.isArray(value) ? value : [value];
  return list.filter(isCustom).map(customLabel);
}

/** Prompt-shaped rendering of a vocabulary. */
export function describe(vocab) {
  return Object.entries(vocab).map(([k, v]) => `  ${k} — ${v}`).join('\n');
}

export const keysOf = (vocab) => Object.keys(vocab);

// ---------------------------------------------------------------------------
// Genre
// ---------------------------------------------------------------------------

/**
 * Roblox genres as the platform's players actually use the words, not as a
 * general games-industry taxonomy. "Simulator" on Roblox means an incremental
 * collection game, which is nothing like a flight simulator.
 */
export const GENRES = {
  simulator: 'incremental collection/multiplication loop — hatch, farm, upgrade, rebirth',
  tycoon: 'build and expand a plot or factory that produces income over time',
  'delivery-logistics': 'accept contracts and move cargo along routes; the journey is the content, not the destination',
  'clicker-idle': 'income accrues from taps or passively; upgrades multiply the rate',
  obby: 'skill-based platforming through hazard courses toward a goal',
  'tower-defense': 'place and upgrade defenders against escalating enemy waves',
  'pvp-arena': 'round-based combat between players in a bounded arena',
  battlegrounds: 'anime-style ability fighting in an open shared map, no rounds',
  'fps-shooter': 'gun combat with loadouts, first or third person',
  survival: 'gather resources and manage needs against an environment or threat',
  horror: 'evade a threat under information scarcity; tension over challenge',
  'escape-round': 'short rounds where players escape or are caught; often asymmetric',
  roleplay: 'players enact roles in a persistent social fiction, rules mostly emergent',
  'social-hangout': 'the space and the people are the content; minimal mechanics',
  'story-adventure': 'authored narrative progression through chapters or areas',
  'rpg-grinder': 'stat and gear progression through repeatable combat encounters',
  'gacha-collector': 'randomised unit acquisition, team building, rarity ladder',
  racing: 'vehicle or runner competition against players or the clock',
  sports: 'rule-bound athletic simulation, usually team-based',
  'minigame-party': 'a rotating playlist of short varied challenges',
  'sandbox-building': 'players author structures or contraptions with provided tools',
  'farming-life': 'cyclical cultivation and tending with a slow economy',
  puzzle: 'discrete problems solved through reasoning rather than reflex',
};

/**
 * Which visual archetype a genre defaults to. The concept doc names a vibe
 * directly; this exists so a concept with no stated art direction still derives
 * a plausible one instead of falling through to ui-forge's generic default.
 */
export const GENRE_VIBE_DEFAULTS = {
  simulator: 'cartoon-vibrant',
  'clicker-idle': 'cartoon-vibrant',
  obby: 'cartoon-vibrant',
  'gacha-collector': 'premium-gloss',
  tycoon: 'clean-modern',
  'tower-defense': 'clean-modern',
  sports: 'clean-modern',
  racing: 'dark-tech',
  'fps-shooter': 'dark-tech',
  'pvp-arena': 'dark-tech',
  battlegrounds: 'dark-tech',
  horror: 'horror-grim',
  survival: 'horror-grim',
  'escape-round': 'horror-grim',
  'rpg-grinder': 'fantasy-ornate',
  'story-adventure': 'fantasy-ornate',
  'social-hangout': 'minimal-soft',
  'farming-life': 'minimal-soft',
  roleplay: 'minimal-soft',
  'sandbox-building': 'clean-modern',
  'minigame-party': 'cartoon-vibrant',
  puzzle: 'minimal-soft',
};

// ---------------------------------------------------------------------------
// Players
// ---------------------------------------------------------------------------

/** The headline answer: how many people is this for. */
export const PLAYER_MODES = {
  'single-player': 'the experience is complete alone; other players are absent or irrelevant',
  'co-op': 'players work together toward shared goals; success is collective',
  multiplayer: 'players compete or interact competitively; success is relative',
  mixed: 'solo progression inside a shared world, with optional cooperative or competitive layers',
};

/**
 * How the server is actually shaped. Distinct from mode because "multiplayer"
 * covers arrangements with completely different networking, UI and balance needs
 * — a persistent MMO hub and a 4v4 round match are not the same problem.
 */
export const PLAYER_STRUCTURES = {
  'solo-instance': 'one player per server, or fully isolated state',
  'shared-server-parallel': 'many players in one server progressing independently, seeing each other',
  'co-op-team': 'a small team shares objectives and often a resource pool',
  'pvp-ffa': 'every player against every other',
  'pvp-team': 'balanced teams in symmetric opposition',
  'asymmetric-1vn': 'one player has different abilities and goals from the rest',
  'mmo-persistent': 'a large persistent world with world state shared across players',
  'lobby-round': 'players gather in a lobby, then are matched into discrete rounds',
};

// ---------------------------------------------------------------------------
// Core loop
// ---------------------------------------------------------------------------

/**
 * Verbs a loop step can be. Deliberately verbs, not nouns: a loop is a sequence
 * of things the player DOES, and naming steps after screens ("shop", "inventory")
 * is the most common way a stated core loop turns out to be a menu tour with no
 * actual loop in it.
 */
export const LOOP_VERBS = {
  acquire: 'obtain a new thing — hatch, buy, roll, claim',
  explore: 'move through unfamiliar space to find something',
  fight: 'defeat an opponent or enemy through combat',
  survive: 'endure a threat or resource drain for a duration',
  grind: 'repeat a low-variance action to accumulate a resource',
  gather: 'harvest or collect resources from the world',
  craft: 'combine inputs into a better output',
  build: 'place or arrange structures that persist',
  upgrade: 'spend resources to increase a rate or power',
  customize: 'change appearance or configuration without power change',
  trade: 'exchange with another player',
  complete: 'finish a bounded objective — quest, order, contract',
  compete: 'be ranked against other players',
  socialize: 'interact with other players as the goal itself',
  spend: 'convert currency into progress, deliberately as a sink',
  wager: 'risk a holding for a chance at more',
  deliver: 'transport something to a destination',
  defend: 'prevent a loss rather than pursue a gain',
  escape: 'reach safety while pursued',
  unlock: 'pass a gate that permanently opens content',
  prestige: 'reset progress for a permanent multiplier',
};

// ---------------------------------------------------------------------------
// Mechanics
// ---------------------------------------------------------------------------

export const MECHANIC_KINDS = {
  movement: 'how the character traverses — jumps, dashes, climbing, flight',
  combat: 'how damage is dealt and avoided',
  economy: 'currencies, prices, faucets and sinks',
  progression: 'how permanent power or access increases',
  randomization: 'RNG surfaces — rolls, drops, rarity, crits',
  automation: 'systems that produce while the player is idle or away',
  building: 'placing and arranging persistent objects',
  crafting: 'recipes converting inputs to outputs',
  stealth: 'avoiding detection as a mechanic',
  puzzle: 'discrete solvable problems',
  'timing-input': 'skill expressed through precise timing — parries, QTEs, rhythm',
  'resource-management': 'allocating a scarce pool under pressure',
  'companion-pet': 'controlled or passive allies that carry player power',
  vehicle: 'piloted mounts or vehicles with their own handling',
  territory: 'claiming and holding space',
  'social-interaction': 'emotes, chat, groups, parties as mechanics',
  trading: 'player-to-player exchange with its own rules and risks',
  'difficulty-scaling': 'how challenge tracks player power',
  'physics-toy': 'emergent fun from physics rather than authored rules',
  'time-pressure': 'timers or decay that force decisions',
};

/** What a mechanic is FOR, which is what decides whether it survives scoping. */
export const MECHANIC_ROLES = {
  core: 'the loop does not function without it',
  supporting: 'makes the core loop work better but could be cut',
  depth: 'gives experienced players something to master',
  retention: 'exists to bring players back across sessions',
  'monetization-hook': 'the point where paying changes the experience',
};

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

/**
 * Features are player-facing systems. The dimension is what makes a feature list
 * reviewable — a concept with eleven core-loop features and nothing under
 * onboarding or retention has a specific, nameable problem.
 */
export const FEATURE_DIMENSIONS = {
  'core-loop': 'directly performs a step of the core loop',
  progression: 'tracks or delivers long-term advancement',
  social: 'connects players to each other',
  monetization: 'converts intent to spend into value',
  retention: 'creates a reason to return tomorrow',
  onboarding: 'gets a first-time player to the fun',
  'live-ops': 'lets content be added or rotated after launch',
  accessibility: 'widens who can play — controls, readability, difficulty',
  ux: 'navigation, feedback and clarity',
  'integrity': 'anti-cheat, anti-exploit, moderation',
};

// ---------------------------------------------------------------------------
// Objectives
// ---------------------------------------------------------------------------

export const OBJECTIVE_SCOPES = {
  moment: 'what the player is trying to do in the next few seconds',
  session: 'what makes one sitting feel complete',
  'short-term': 'a goal spanning a few sessions',
  'long-term': 'the multi-week ambition that structures play',
  mastery: 'what expert play looks like',
  social: 'a goal that only exists because other players do',
};

// ---------------------------------------------------------------------------
// Audience & purpose
// ---------------------------------------------------------------------------

export const AGE_BANDS = {
  '5-8': 'pre-readers and early readers; icon-led, very forgiving',
  '8-12': 'the Roblox core; fast, loud, social',
  '8-14': 'broad core band',
  '10-16': 'older core; tolerates complexity and grind',
  '13-17': 'teen; social status and competition matter',
  '16+': 'older audience; niche on Roblox but higher spend',
  'all-ages': 'deliberately spanning the full range',
};

export const AUDIENCE_EXPERIENCE = {
  'first-time': 'new to Roblox or to this genre',
  casual: 'plays many games briefly, low tolerance for friction',
  regular: 'knows genre conventions, expects them honoured',
  veteran: 'optimises, reads the numbers, finds the exploits',
  mixed: 'a real spread — must work for both ends',
};

/** What the player wants out of it. Drives which objectives and features matter. */
export const MOTIVATIONS = {
  completion: 'filling in every slot, finishing the set',
  competition: 'beating other people',
  'power-fantasy': 'becoming overwhelmingly strong',
  'social-belonging': 'being somewhere with friends',
  creativity: 'making something of their own',
  discovery: 'finding what they were not shown',
  relaxation: 'low-stakes, low-pressure occupation',
  collection: 'acquiring and owning many distinct things',
  mastery: 'getting measurably better at something hard',
  'status-flex': 'visibly displaying rarity or rank to others',
  'chaos-fun': 'unpredictable, funny, breakable situations',
  narrative: 'finding out what happens next',
};

/** Why the DEVELOPER is making it. Different purposes justify different scopes. */
export const PURPOSE_KINDS = {
  revenue: 'built to earn; monetization design is a first-class constraint',
  'trend-ride': 'targeting a currently-hot format while it is hot',
  'reskin-iteration': 'a known-good loop re-themed and improved in specific ways',
  'original-passion': 'the idea is the point; commercial success is secondary',
  'portfolio-demo': 'built to demonstrate capability to someone else',
  'learning-exercise': 'built to learn a technique or system',
  'community-request': 'built for an existing audience that asked for it',
};

// ---------------------------------------------------------------------------
// Economy, monetization, progression
// ---------------------------------------------------------------------------

export const MONETIZATION = {
  none: 'no monetization at all',
  'game-passes': 'one-off permanent purchases',
  'dev-products': 'repeatable consumable purchases',
  'vip-server': 'paid private servers',
  'battle-pass': 'a paid track of rewards earned by playing',
  'season-pass': 'time-limited pass tied to a content season',
  'gacha-crates': 'paid randomised rewards',
  cosmetics: 'appearance-only purchases',
  boosts: 'temporary rate multipliers',
  revives: 'paying to undo a loss',
  'limited-timed': 'scarcity through a closing window',
  'premium-payouts': 'Roblox Premium engagement revenue',
  'trading-tax': 'revenue taken from player-to-player exchange',
};

export const PROGRESSION = {
  'linear-unlock': 'content opens in a fixed order',
  'level-xp': 'an experience bar gating power or access',
  'prestige-rebirth': 'voluntary reset for a permanent multiplier',
  'rank-ladder': 'competitive tiers that can be lost as well as gained',
  'skill-tree': 'branching permanent choices',
  'collection-completion': 'progress measured by how much of a set is owned',
  'gear-power-curve': 'power carried by equippable items',
  'territory-expansion': 'progress measured by space controlled',
  'seasonal-reset': 'progress recurs on a schedule',
  none: 'no persistent progression by design',
};

// ---------------------------------------------------------------------------
// References
// ---------------------------------------------------------------------------

/**
 * How a reference game relates to this one. This is load-bearing: `reskin-base`
 * is the one relationship that makes the reference's loop the default answer for
 * unstated questions, and `anti-pattern` inverts it.
 */
export const REFERENCE_RELATIONSHIPS = {
  'reskin-base': 'this game is that game, re-themed and adjusted — the loop is inherited',
  'direct-inspiration': 'a major influence, but this is its own game',
  'loop-benchmark': 'referenced specifically for how its core loop is tuned',
  'art-benchmark': 'referenced specifically for how it looks',
  'monetization-benchmark': 'referenced specifically for how it earns',
  competitor: 'a game this would be chosen instead of',
  'anti-pattern': 'referenced for what to deliberately avoid',
};

// ---------------------------------------------------------------------------
// Art direction
// ---------------------------------------------------------------------------

/**
 * Vibes are the archetype keys ui-forge's theme generator understands.
 *
 * Imported rather than restated so the two stages cannot drift: adding an
 * archetype to the design system widens what a concept may ask for, in one edit.
 * The import direction matches the pipeline direction — stage 0 feeds stage 1.
 */
import { ARCHETYPES } from '../../ui-forge/src/theme/palettes.mjs';

export const VIBES = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([key, a]) => [key, a.label]),
);

/** Minimum counts a concept must hit to count as "nailed down" rather than gestured at. */
export const EXPECTED = {
  loopSteps: 3,
  mechanics: 3,
  coreMechanics: 1,
  features: 4,
  objectives: 3,
  references: 1,
  motivations: 2,
};
