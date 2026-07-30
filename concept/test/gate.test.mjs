/**
 * Tests for the stage 0 gate.
 *
 *   node --test concept/test/
 *
 * The gate is the only thing standing between "a model produced a document" and
 * "four later stages build on it", so its behaviour is pinned here rather than
 * checked by eye. Every case below is a defect that would otherwise reach ui-forge
 * looking like a valid concept.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validateConcept, auditConcept } from '../src/validate.mjs';
import { deriveGameContext } from '../src/derive/game-context.mjs';
import { coverage, DIMENSIONS } from '../src/dimensions.mjs';

/** A complete, valid concept. Tests mutate clones of this to isolate one defect each. */
function fixture() {
  return {
    version: 1,
    title: 'Abyss Keepers',
    slug: 'abyss-keepers',
    logline: 'Tame the creatures of a sunken world, one tide at a time.',
    premise: 'A cozy underwater collection game. Players lure sea creatures with bait, house them in a reef sanctuary, and use their passive abilities to reach deeper trenches.',
    purpose: {
      kind: 'reskin-iteration',
      statement: 'Take the pet-collection loop somewhere calmer, for players who bounce off the shouting.',
      successMetric: '300 concurrent players sustained for one month',
      differentiator: 'The loop rewards patience instead of tapping speed — bait matures on a timer you cannot rush with Robux.',
      nonGoals: ['no PvP', 'no trading in v1'],
    },
    players: {
      mode: 'mixed',
      structure: 'shared-server-parallel',
      serverSize: 12,
      interaction: 'Players see each other in the reef and can gift spare bait, but progression is individual.',
    },
    genre: {
      primary: 'simulator',
      secondary: 'farming-life',
      progression: ['collection-completion', 'gear-power-curve'],
      monetization: ['game-passes', 'cosmetics', 'boosts'],
    },
    coreLoop: {
      summary: 'Set bait, lure a creature, house it, dive deeper.',
      steps: [
        { verb: 'gather', label: 'harvest bait', produces: 'a stack of bait matched to a trench tier', seconds: 30 },
        { verb: 'acquire', label: 'lure a creature', produces: 'a new or duplicate sea creature', seconds: 45 },
        { verb: 'upgrade', label: 'house it in the reef', produces: 'a higher passive oxygen rating', seconds: 25 },
        { verb: 'explore', label: 'dive a deeper trench', produces: 'access to rarer bait and creatures', seconds: 60 },
      ],
      lapSeconds: 160,
      closes: 'Deeper trenches yield the bait needed for the next tier of creature, so diving feeds harvesting.',
      hook: 'Each trench shows a silhouette of one creature you have not caught yet.',
      escalation: 'Early trenches are bait-limited; late trenches are oxygen-limited, so the binding constraint moves from patience to roster composition.',
    },
    mechanics: [
      { id: 'bait-maturation', kind: 'time-pressure', label: 'bait maturation', role: 'core', description: 'Bait ripens on a real-time timer per tier. Ripe bait attracts rarer creatures; overripe bait is wasted.', dependsOn: [] },
      { id: 'oxygen-budget', kind: 'resource-management', label: 'oxygen budget', role: 'core', description: 'Dive depth is limited by total oxygen, contributed passively by housed creatures.', dependsOn: [] },
      { id: 'reef-housing', kind: 'building', label: 'reef housing', role: 'supporting', description: 'Creatures are placed in reef slots; adjacency between related species raises their oxygen contribution.', dependsOn: ['oxygen-budget'] },
      { id: 'creature-rarity', kind: 'randomization', label: 'creature rarity', role: 'depth', description: 'Each bait tier has a weighted table; duplicates convert into a currency that rerolls one slot.', dependsOn: ['bait-maturation'] },
    ],
    features: [
      { id: 'bait-bench', label: 'Bait Bench', dimension: 'core-loop', description: 'Where players mix and set bait to mature.', priority: 1, screens: ['bait-bench'] },
      { id: 'reef-sanctuary', label: 'Reef Sanctuary', dimension: 'core-loop', description: 'Place and arrange caught creatures for passive oxygen.', priority: 1, screens: ['reef'] },
      { id: 'creature-index', label: 'Creature Index', dimension: 'progression', description: 'A visual record of every species, with silhouettes for the uncaught.', priority: 2, screens: ['index'] },
      { id: 'first-dive', label: 'First Dive', dimension: 'onboarding', description: 'A scripted shallow dive that hands the player their first creature inside ninety seconds.', priority: 1, screens: [] },
      { id: 'tide-calendar', label: 'Tide Calendar', dimension: 'retention', description: 'A daily rotating trench with a species available only that day.', priority: 2, screens: ['tides'] },
      { id: 'reef-visits', label: 'Reef Visits', dimension: 'social', description: 'Players can visit another reef and leave a gift of bait.', priority: 3, screens: ['reef'] },
      { id: 'keeper-pass', label: 'Keeper Pass', dimension: 'monetization', description: 'A cosmetic track of reef decor and creature skins earned by playing, with a paid tier.', priority: 3, screens: ['pass'] },
    ],
    objectives: [
      { scope: 'session', label: 'Fill the bait bench', description: 'Set every bait slot before logging off so nothing idles.', measurable: 'all 4 bait slots occupied at logout' },
      { scope: 'short-term', label: 'Reach the next trench', description: 'Raise oxygen enough to open the next depth tier.', measurable: 'oxygen rating exceeds the next trench threshold' },
      { scope: 'long-term', label: 'Complete a family', description: 'Collect every species in one taxonomic family for a permanent bonus.', measurable: 'all species in a family marked caught in the index' },
      { scope: 'mastery', label: 'Perfect reef', description: 'Arrange housing so every creature sits beside a related species.', measurable: 'every occupied reef slot has an adjacency bonus active' },
    ],
    references: [
      { name: 'Pet Simulator 99', slug: 'pet-simulator-99', url: 'https://pet-simulator-99.fandom.com/wiki/Pet_Simulator_99', relationship: 'reskin-base', takeaways: ['the hatch-to-upgrade lap is short and always visible', 'duplicates must have a use'], deltas: ['bait matures on a timer instead of instant hatching', 'no rebirth reset — progression is collection breadth', 'calm audio and slower reward cadence'] },
      { name: 'Adopt Me', slug: 'adopt-me', url: 'https://adopt-me.fandom.com/wiki/Adopt_Me!_Wiki', relationship: 'anti-pattern', takeaways: ['trading-driven economies invite scamming, which we avoid by shipping without trade'], deltas: [] },
    ],
    audience: {
      ageBand: '8-14',
      experience: 'casual',
      platformMix: { mobile: 0.68, desktop: 0.27, console: 0.05 },
      sessionMinutes: 18,
      motivations: ['collection', 'relaxation', 'completion'],
      readingLoad: 'Almost none — labels and numbers only, icons carry meaning.',
    },
    artDirection: {
      vibe: 'minimal-soft',
      mood: ['calm', 'luminous', 'gentle'],
      paletteHints: ['deep teal', 'bioluminescent cyan', 'sand'],
      referenceNote: 'Soft rounded panels, thin strokes, light shadow, no shouting badges.',
    },
    economy: {
      softCurrency: 'Pearls',
      hardCurrency: 'Coral',
      premium: 'Robux',
      faucets: ['creature passive income', 'daily tide bonus'],
      sinks: ['bait tiers', 'reef slot expansion', 'index reroll'],
    },
    risks: [
      { risk: 'Timer-gated bait reads as a paywall even though it is not purchasable.', severity: 'high', mitigation: 'Show the timer as a growing plant with visible stages, and always leave one instant bait tier.' },
      { risk: 'Collection completion has no endgame once a family is done.', severity: 'medium', mitigation: 'Family completion unlocks a variant tier of the same species.' },
    ],
    provenance: DIMENSIONS.map((d) => ({ dimension: d.id, source: 'answered', confidence: 'high', note: null })),
    openQuestions: [],
    flags: [],
  };
}

const clone = (o) => JSON.parse(JSON.stringify(o));

test('a complete concept passes the gate', () => {
  assert.deepEqual(validateConcept(fixture()), []);
});

test('every dimension resolves for a complete concept', () => {
  const unresolved = coverage(fixture()).filter((c) => !c.resolved);
  assert.deepEqual(unresolved.map((c) => `${c.dimension}: ${c.gaps.join('; ')}`), []);
});

test('a missing required dimension blocks, naming the gap', () => {
  const c = clone(fixture());
  delete c.objectives;
  const problems = validateConcept(c);
  assert.ok(problems.some((p) => p.startsWith('objectives:')), problems.join('\n'));
});

test('objectives without a long-term scope block', () => {
  const c = clone(fixture());
  c.objectives = c.objectives.filter((o) => !['long-term', 'mastery'].includes(o.scope));
  assert.ok(validateConcept(c).some((p) => /long-term/.test(p)));
});

test('a loop with no closing statement blocks — a funnel is not a loop', () => {
  const c = clone(fixture());
  delete c.coreLoop.closes;
  assert.ok(validateConcept(c).some((p) => /feeds back into the first/.test(p)));
});

test('a reskin base with no deltas blocks', () => {
  const c = clone(fixture());
  c.references[0].deltas = [];
  assert.ok(validateConcept(c).some((p) => /reskin base but no deltas/.test(p)));
});

test('an invented enum value blocks', () => {
  const c = clone(fixture());
  c.genre.primary = 'underwater-collector';
  const problems = validateConcept(c);
  assert.ok(problems.some((p) => p.includes('genre.primary') && p.includes('not a known value')), problems.join('\n'));
});

test('a custom: escape passes the gate but is flagged', () => {
  const c = clone(fixture());
  c.mechanics[0].kind = 'custom:tide-phase coupling';
  assert.deepEqual(validateConcept(c).filter((p) => p.includes('mechanics')), []);
  assert.ok(auditConcept(c).some((f) => f.severity === 'warn' && /tide-phase coupling/.test(f.detail)));
});

test('placeholder text blocks even though the schema is satisfied', () => {
  const c = clone(fixture());
  c.economy.sinks = ['TBD'];
  assert.ok(validateConcept(c).some((p) => /placeholder text/.test(p)));
});

test('placeholder wording is tolerated in risks and open questions', () => {
  const c = clone(fixture());
  c.openQuestions = ['whether loot is shared is TBD'];
  c.risks[0].mitigation = 'TBD until playtesting';
  assert.deepEqual(validateConcept(c), []);
});

test('a player mode its structure contradicts blocks', () => {
  const c = clone(fixture());
  c.players.mode = 'single-player';
  c.players.structure = 'pvp-team';
  const problems = validateConcept(c);
  assert.ok(problems.some((p) => /contradicts structure/.test(p)), problems.join('\n'));
});

test('a dangling mechanic dependency blocks', () => {
  const c = clone(fixture());
  c.mechanics[2].dependsOn = ['no-such-mechanic'];
  assert.ok(validateConcept(c).some((p) => /dependsOn "no-such-mechanic"/.test(p)));
});

test('incomplete provenance blocks — a missing entry reads as nothing to declare', () => {
  const c = clone(fixture());
  c.provenance = c.provenance.slice(0, 3);
  assert.ok(validateConcept(c).some((p) => /provenance missing for/.test(p)));
});

test('a platform mix that does not sum to 1 blocks', () => {
  const c = clone(fixture());
  c.audience.platformMix = { mobile: 0.9, desktop: 0.9, console: 0 };
  assert.ok(validateConcept(c).some((p) => /platform mix/.test(p)));
});

test('low-confidence inferences are flagged for review', () => {
  const c = clone(fixture());
  c.provenance = c.provenance.map((p) => (p.dimension === 'audience'
    ? { ...p, source: 'inferred', confidence: 'low', note: 'guessed from genre alone' }
    : p));
  const flags = auditConcept(c);
  assert.ok(flags.some((f) => f.dimension === 'audience' && f.severity === 'warn' && /guessed from genre/.test(f.detail)));
});

test('a clean concept produces no warnings', () => {
  assert.deepEqual(auditConcept(fixture()).filter((f) => f.severity === 'warn'), []);
});

// --- the seam into ui-forge ------------------------------------------------

test('derivation produces a ui-forge context with screens ranked by need', () => {
  const { context, notes } = deriveGameContext(fixture());
  assert.equal(context.title, 'Abyss Keepers');
  assert.equal(context.genre, 'simulator');
  assert.equal(context.subgenre, 'farming-life');
  assert.equal(context.artDirection.vibe, 'minimal-soft');
  assert.deepEqual(context.coreLoop, ['harvest bait', 'lure a creature', 'house it in the reef', 'dive a deeper trench']);
  assert.deepEqual(notes, []);

  // A screen wanted by a priority-1 feature is priority 1, even though a
  // priority-3 feature also wants it.
  const reef = context.screens.find((s) => s.id === 'reef');
  assert.equal(reef.priority, 1);
  assert.match(reef.purpose, /reef sanctuary \+ reef visits/);
  assert.deepEqual(context.screens.map((s) => s.priority), [...context.screens.map((s) => s.priority)].sort());
  // A feature that needs no screen must not invent one.
  assert.ok(!context.screens.some((s) => s.id === 'first-dive'));
});

test('a reskin base becomes the inspiration source, carrying its deltas', () => {
  const { context } = deriveGameContext(fixture());
  assert.equal(context.inspiration.mode, 'reskin');
  assert.equal(context.inspiration.source, 'Pet Simulator 99');
  assert.equal(context.inspiration.deltas.length, 3);
});

test('with no reskin or inspiration reference, the game is original', () => {
  const c = clone(fixture());
  c.references = [c.references[1]]; // anti-pattern only
  assert.equal(deriveGameContext(c).context.inspiration.mode, 'original');
});

test('a custom vibe still resolves through its own words, not the genre default', () => {
  const c = clone(fixture());
  // "simulator" would default to cartoon-vibrant, which is wrong for this game.
  // The word "cozy" in the label is real signal and must win.
  c.artDirection.vibe = 'custom:cozy bioluminescent reef';
  const { context, notes } = deriveGameContext(c);
  assert.equal(context.artDirection.vibe, 'minimal-soft');
  assert.ok(notes.some((n) => /resolved to "minimal-soft"/.test(n)), notes.join('\n'));
});

test('mood words resolve the archetype when the vibe itself is signal-free', () => {
  const c = clone(fixture());
  c.artDirection.vibe = 'custom:whatever';
  c.artDirection.mood = ['neon', 'sharp'];
  const { context, notes } = deriveGameContext(c);
  assert.equal(context.artDirection.vibe, 'dark-tech');
  assert.ok(notes.some((n) => /via "neon"/.test(n)), notes.join('\n'));
});

test('with no art-direction signal at all, the genre default is used and reported', () => {
  const c = clone(fixture());
  c.artDirection = { vibe: null, mood: [], paletteHints: [], referenceNote: '' };
  const { context, notes } = deriveGameContext(c);
  assert.equal(context.artDirection.vibe, 'cartoon-vibrant'); // simulator default
  assert.ok(notes.some((n) => /no artDirection.vibe/.test(n)), notes.join('\n'));
});

test('the derived context is accepted by ui-forge theme generation', async () => {
  const { generateTheme } = await import('../../ui-forge/src/theme/generate.mjs');
  const { context } = deriveGameContext(fixture());
  const theme = generateTheme(context);
  assert.equal(theme.meta.archetype, 'minimal-soft');
  assert.equal(theme.meta.sourceTitle, 'Abyss Keepers');
  // 68% mobile must widen touch targets — proof the audience actually reached the tokens.
  assert.equal(theme.sizing.minTouchTarget, 48);
});

// --- provenance attribution ------------------------------------------------

test('provenance is attributed from the record, not from what the model claimed', async () => {
  const { attributeProvenance } = await import('../src/provenance.mjs');
  const draft = { coverage: [{ dimension: 'genre', status: 'stated' }, { dimension: 'audience', status: 'absent' }] };
  const questionnaire = { questions: [
    { dimension: 'purpose', answer: 'reskin-iteration' },
    { dimension: 'audience', answer: '' },            // presented but not answered
    { dimension: 'objectives', answer: [] },          // empty multi-select is not an answer
  ] };
  // The model claimed everything was inferred, which is what it does in practice.
  const claimed = DIMENSIONS.map((d) => ({ dimension: d.id, source: 'inferred', confidence: 'medium', note: `note for ${d.id}` }));

  const out = attributeProvenance({ claimed, draft, questionnaire });
  const src = Object.fromEntries(out.map((p) => [p.dimension, p.source]));

  assert.equal(src.purpose, 'answered');   // answered outranks the model's claim
  assert.equal(src.genre, 'stated');       // the input said so
  assert.equal(src.audience, 'inferred');  // asked but left blank
  assert.equal(src.objectives, 'inferred'); // empty array is not an answer
  assert.equal(src.mechanics, 'inferred'); // never stated, never asked
  assert.equal(out.length, DIMENSIONS.length);
  // Notes survive attribution — they explain what was assumed even when answered.
  assert.equal(out.find((p) => p.dimension === 'purpose').note, 'note for purpose');
});

test('an answer outranks the input having stated the same dimension', async () => {
  const { attributeProvenance } = await import('../src/provenance.mjs');
  const out = attributeProvenance({
    claimed: [],
    draft: { coverage: [{ dimension: 'genre', status: 'stated' }] },
    questionnaire: { questions: [{ dimension: 'genre', answer: 'tycoon' }] },
  });
  assert.equal(out.find((p) => p.dimension === 'genre').source, 'answered');
});

test('a researched claim survives when nothing better applies', async () => {
  const { attributeProvenance } = await import('../src/provenance.mjs');
  const out = attributeProvenance({
    claimed: [{ dimension: 'coreLoop', source: 'researched', confidence: 'high', note: null }],
    draft: { coverage: [] },
    questionnaire: null,
  });
  assert.equal(out.find((p) => p.dimension === 'coreLoop').source, 'researched');
});

test('attributed provenance always satisfies the gate', async () => {
  const { attributeProvenance } = await import('../src/provenance.mjs');
  const c = clone(fixture());
  c.provenance = attributeProvenance({ claimed: [], draft: { coverage: [] }, questionnaire: null });
  assert.deepEqual(validateConcept(c).filter((p) => /provenance/.test(p)), []);
});

test('priority inflation is flagged — everything shipping first is not a plan', () => {
  const c = clone(fixture());
  c.features = c.features.map((f) => ({ ...f, priority: 1 }));
  assert.deepEqual(validateConcept(c).filter((p) => /priority/.test(p)), []); // not blocking
  assert.ok(auditConcept(c).some((f) => f.severity === 'warn' && /nothing is actually prioritised/.test(f.detail)));
});

test('a sensible priority spread is not flagged', () => {
  assert.ok(!auditConcept(fixture()).some((f) => /prioritised/.test(f.detail)));
});

// --- wire-format tolerance -------------------------------------------------

test('a dimension echoed with its tier is repaired, not rejected', async () => {
  const { normaliseDimension } = await import('../src/dimensions.mjs');
  assert.equal(normaliseDimension('purpose (required)'), 'purpose');
  assert.equal(normaliseDimension('artDirection (supporting)'), 'artDirection');
  assert.equal(normaliseDimension('coreLoop'), 'coreLoop');
  assert.equal(normaliseDimension('core loop'), 'coreLoop');   // spacing slip
  assert.equal(normaliseDimension('CoreLoop'), 'coreLoop');    // casing slip
  assert.equal(normaliseDimension('monetization'), null);      // genuinely not a dimension
  assert.equal(normaliseDimension(undefined), null);
});

test('no dimension id is a prefix of another, so prefix repair is unambiguous', async () => {
  const { IDS } = await import('../src/dimensions.mjs');
  for (const a of IDS) {
    for (const b of IDS) {
      if (a !== b) assert.ok(!b.startsWith(a), `"${a}" is a prefix of "${b}"`);
    }
  }
});
