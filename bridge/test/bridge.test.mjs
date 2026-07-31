/**
 * The CID -> build seam.
 *
 * The point of these is that they cover the checks a verifier *agent* was previously
 * doing by reading prose: two sheets claiming one decision, a decision nobody made,
 * and cross-field invariants like "rarer must pay more". Those are the failures that
 * cost ~150k tokens a run to hunt. Here they are assertions.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { mergeSheets } from '../merge.mjs';
import { validateManifest, SCHEMA, contract, playerFacingStrings } from '../schema.mjs';
import { emitGameConfig } from '../emit-config.mjs';
import { emitBuildOrder } from '../emit-buildorder.mjs';

/* -------------------------------------------------------------- fixtures */

const GOOD = {
  tiers: [
    { name: 'Moss', shape: 'Block', rgb: [104, 142, 76], value: 1, weight: 52, height: 1.6 },
    { name: 'Fern', shape: 'Cylinder', rgb: [78, 128, 66], value: 3, weight: 28, height: 2.4 },
    { name: 'Bramble', shape: 'Ball', rgb: [58, 104, 58], value: 8, weight: 14, height: 2.8 },
    { name: 'Heartvine', shape: 'Wedge', rgb: [44, 86, 52], value: 20, weight: 6, height: 3.4 },
  ],
  upgrades: [
    { id: 'value', label: 'Value', blurb: 'more', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25, base: 1, mode: 'additive' },
  ],
  movement: { baseWalkSpeed: 16, baseClearRadius: 5.5 },
  patch: { footprint: 3, collides: false, material: 'Grass' },
  area: { id: 'east-terrace', label: 'EAST TERRACE', originXZ: [0, 0], size: 120, patchCount: 140, minSpacing: 6 },
  collection: {
    className: 'Find',
    classPlural: 'Finds',
    relicsPerArea: 6,
    areasPerDepth: 1,
    sets: [{ id: 'terrace', label: 'Terrace', depth: 1, relics: ['A', 'B', 'C', 'D', 'E', 'F'] }],
  },
  onboarding: { guaranteedFirstRelic: true },
  currency: { name: 'Shard', plural: 'Shards', icon: 'shard' },
  vocabulary: {
    maxLabelChars: 14,
    register: 'Plain concrete nouns.',
    bannedWords: [{ word: 'relic', reason: 'occupied by two games in this family for a rolled multiplier' }],
  },
};

const clone = () => JSON.parse(JSON.stringify(GOOD));

async function sheetDir(blocks) {
  const dir = await mkdtemp(join(tmpdir(), 'bridge-'));
  for (const [name, payload] of Object.entries(blocks)) {
    const file = join(dir, `${name}.md`);
    await mkdir(join(dir), { recursive: true });
    const body = payload === null
      ? '# prose only\n\nNo manifest block here.\n'
      : `# a sheet\n\n## Decision\nsomething\n\n\`\`\`manifest\n${payload}\n\`\`\`\n`;
    await writeFile(file, body, 'utf8');
  }
  return dir;
}

/* --------------------------------------------------------------- contract */

test('the contract names an owner for every key a build needs', () => {
  const rows = contract();
  assert.ok(rows.length >= 8);
  for (const { key, doc, owner } of rows) {
    assert.ok(doc.length > 20, `${key} needs a real doc line`);
    assert.match(owner, /^[a-z-]+\/[a-z-]+$/, `${key} owner should be a category/domain path`);
  }
});

/* ---------------------------------------------------------------- merging */

test('a sheet with no manifest block contributes nothing and is not an error', async () => {
  const dir = await sheetDir({ prose: null });
  const { problems, sheetsRead, sheetsContributing } = await mergeSheets(dir);
  assert.equal(sheetsRead, 1);
  assert.equal(sheetsContributing, 0);
  assert.deepEqual(problems.filter((p) => p.includes('prose.md')), []);
  await rm(dir, { recursive: true, force: true });
});

test('two sheets providing the same key is a hard error naming both', async () => {
  // The check that replaces an agent reading two sheets and noticing they disagree.
  const block = (v) => JSON.stringify({ provides: 'movement', value: v });
  const dir = await sheetDir({
    'a-first': block({ baseWalkSpeed: 16, baseClearRadius: 5.5 }),
    'b-second': block({ baseWalkSpeed: 24, baseClearRadius: 9 }),
  });
  const { problems } = await mergeSheets(dir);
  const dupe = problems.find((p) => p.includes('already provided by'));
  assert.ok(dupe, `expected a duplicate-owner error, got: ${problems.join(' | ')}`);
  assert.match(dupe, /a-first\.md/);
  assert.match(dupe, /b-second\.md/);
  await rm(dir, { recursive: true, force: true });
});

test('a key outside the contract is rejected and the legal keys are listed', async () => {
  const dir = await sheetDir({ odd: JSON.stringify({ provides: 'vibes', value: 1 }) });
  const { problems } = await mergeSheets(dir);
  const err = problems.find((p) => p.includes('not in the build contract'));
  assert.ok(err);
  assert.match(err, /tiers/);
  await rm(dir, { recursive: true, force: true });
});

test('a malformed block is reported with its file, not swallowed', async () => {
  const dir = await sheetDir({ broken: '{ "provides": "tiers", oops }' });
  const { problems } = await mergeSheets(dir);
  assert.ok(problems.some((p) => p.includes('broken.md') && p.includes('not valid JSON')));
  await rm(dir, { recursive: true, force: true });
});

test('missing keys are reported by name with their owner', () => {
  const partial = clone();
  delete partial.collection;
  delete partial.patch;
  const { missing } = validateManifest(partial);
  assert.equal(missing.length, 2);
  assert.ok(missing.some((m) => m.startsWith('collection') && m.includes('gameplay/meta')));
  assert.ok(missing.some((m) => m.startsWith('patch') && m.includes('art/objects')));
});

/* -------------------------------------------------------------- invariants */

test('the reference manifest validates clean', () => {
  const { problems, missing } = validateManifest(GOOD);
  assert.deepEqual(problems, []);
  assert.deepEqual(missing, []);
});

test('two tiers sharing a shape is rejected — rarity must survive losing colour', () => {
  const m = clone();
  m.tiers[1].shape = 'Block';
  const { problems } = validateManifest(m);
  assert.ok(problems.some((p) => p.includes('share the shape')), problems.join(' | '));
});

test('tier weights that do not sum to 100 are rejected', () => {
  const m = clone();
  m.tiers[0].weight = 40;
  assert.ok(validateManifest(m).problems.some((p) => p.includes('sum to')));
});

test('a rarer tier that pays no more is rejected', () => {
  const m = clone();
  m.tiers[3].value = 2; // rarest, now worth less than Fern
  assert.ok(validateManifest(m).problems.some((p) => p.includes('pays no more')));
});

test('an area that cannot physically hold its patch count is rejected', () => {
  const m = clone();
  m.area.patchCount = 5000;
  assert.ok(validateManifest(m).problems.some((p) => p.includes('cannot fit')));
});

test('a set larger than one area can yield is rejected as uncompletable', () => {
  const m = clone();
  m.collection.relicsPerArea = 4; // 1 area x 4 < 6 needed
  assert.ok(validateManifest(m).problems.some((p) => p.includes('can never complete')));
});

test('a relic in two sets is rejected', () => {
  const m = clone();
  m.collection.sets.push({ id: 'other', label: 'Other', depth: 2, relics: ['A'] });
  assert.ok(validateManifest(m).problems.some((p) => p.includes('more than one set')));
});

test('a flat or inverted cost ladder is rejected', () => {
  const m = clone();
  m.upgrades[0].costGrowth = 1;
  assert.ok(validateManifest(m).problems.some((p) => p.includes('must exceed 1')));
});

test('a non-kebab-case id is rejected, so emitted Luau keys stay predictable', () => {
  const m = clone();
  m.area.id = 'East Terrace';
  assert.ok(validateManifest(m).problems.some((p) => p.includes('kebab-case')));
});

/* -------------------------------------------- theme's constraints, enforced */

test('a banned word in any player-facing string fails the merge, with its reason', () => {
  // The check that gives Theme & Narrative teeth. Every Theme domain owns no value key,
  // correctly — a register is not a value. Without this their work reached the build as
  // prose a builder could simply not honour.
  const m = clone();
  m.collection.className = 'Relic';
  const problems = validateManifest(m).problems;
  const hit = problems.find((p) => p.includes('banned word'));
  assert.ok(hit, problems.join(' | '));
  assert.match(hit, /collection\.className/);
  assert.match(hit, /rolled multiplier/, 'the reason must travel with the rejection');
});

test('the ban is case-insensitive and matches whole words only', () => {
  const upper = clone();
  upper.tiers[0].name = 'RELIC';
  assert.ok(validateManifest(upper).problems.some((p) => p.includes('banned word')));

  const substring = clone();
  substring.tiers[0].name = 'Relicense';  // contains "relic" but is not the word
  assert.deepEqual(validateManifest(substring).problems, []);
});

test('a label over the character limit fails, but a blurb is exempt', () => {
  const label = clone();
  label.upgrades[0].label = 'EXTRAORDINARILY LONG';
  assert.ok(validateManifest(label).problems.some((p) => p.includes('character label limit')));

  const blurb = clone();
  blurb.upgrades[0].blurb = 'A deliberately long sentence of prose that runs well past fourteen characters.';
  assert.deepEqual(validateManifest(blurb).problems, []);
});

test('every player-facing string is enumerated, so none escapes the ban list', () => {
  const paths = playerFacingStrings(GOOD).map((s) => s.path);
  for (const expected of [
    'area.label', 'currency.name', 'currency.plural',
    'collection.className', 'collection.classPlural',
    'tiers[0].name', 'upgrades[0].label', 'upgrades[0].blurb',
    'collection.sets[0].label', 'collection.sets[0].relics[0]',
  ]) {
    assert.ok(paths.includes(expected), `${expected} must be checkable`);
  }
});

test('a ban entry with no reason is rejected — a ban nobody can argue with is useless', () => {
  const m = clone();
  m.vocabulary.bannedWords = [{ word: 'relic' }];
  assert.ok(validateManifest(m).problems.some((p) => p.includes('need a word and a reason')));
});

/* ----------------------------------------------------------------- modules */

const MODULES = [
  { id: 'config', path: 'a.luau', side: 'shared', responsibility: 'values', reads: [], exposes: ['t'], dependsOn: [], criteria: ['x'] },
  { id: 'layout', path: 'b.luau', side: 'shared', responsibility: 'layout', reads: ['area'], exposes: ['build()'], dependsOn: ['config'], criteria: ['x'] },
  { id: 'main', path: 'c.luau', side: 'server', responsibility: 'wire', reads: [], exposes: ['valueMultiplier(s)'], dependsOn: ['layout'], criteria: ['x'] },
];
// These fixtures build arbitrary module sets to exercise the module rules, so they drop
// playerState: its fields name real modules by id, and a two-module fixture would fail the
// writtenBy check for reasons that have nothing to do with what is under test. The
// writtenBy link has its own tests below.
const withModules = (mods) => {
  const m = { ...clone(), modules: mods };
  delete m.playerState;
  return m;
};

test('the build order resolves each module’s values inline, so no sheet needs reading', () => {
  const order = emitBuildOrder(withModules(MODULES), { area: 'gameplay/meta/01-the-area.md' });
  assert.match(order, /"patchCount": 140/);
  assert.match(order, /from gameplay\/meta\/01-the-area\.md/);
});

test('the build order names supplied keys that no module reads', () => {
  // An unread key is either a decision nothing needs, or a missing module.
  const order = emitBuildOrder(withModules(MODULES), {});
  assert.match(order, /\*\*tiers\*\* is supplied but no module reads it/);
});

test('the build order tells builders not to invent a missing value', () => {
  const order = emitBuildOrder(withModules(MODULES), {});
  assert.match(order, /Do not invent a value/);
});

/* ----------------------------------------------------------------- emitting */

/* ------------------------------------------- the future shape must not pass quietly */

test('a find that gains a flavour field is still checked, not silently skipped', () => {
  // Found by cid/theme/tone/02-flavour-and-humor.md: three separate paths would have
  // failed in the direction of reporting success the day this shape landed.
  const m = clone();
  m.collection.sets[0].relics = [
    { name: 'Sundial', flavour: 'The gnomon is gone. The hour lines remain.' },
    { name: 'Ewer', flavour: 'Cracked at the lip.' },
    { name: 'Relic', flavour: 'Still checked for banned words.' },
    { name: 'Hinge', flavour: 'One leaf, no door.' },
    { name: 'Tessera', flavour: 'A single tile.' },
    { name: 'Stylus', flavour: 'Worn to a stub.' },
  ];
  const problems = validateManifest(m).problems;
  assert.ok(problems.some((p) => p.includes('banned word') && p.includes('.name')),
    `a nested name must still hit the ban list: ${problems.join(' | ')}`);
  assert.ok(!problems.some((p) => p.includes('character label limit') && p.includes('.flavour')),
    'prose must be exempt from the label limit');
});

test('a duplicate find name is caught through the nested shape too', () => {
  const m = clone();
  m.collection.sets[0].relics = [
    { name: 'Sundial' }, { name: 'Sundial' }, { name: 'C' },
    { name: 'D' }, { name: 'E' }, { name: 'F' },
  ];
  assert.ok(validateManifest(m).problems.some((p) => p.includes('appears in more than one set')
    || p.includes('Sundial')), 'identity comparison would have hidden this');
});

test('a value that is not a string is reported rather than skipped', () => {
  const m = clone();
  m.area.label = 42;
  const problems = validateManifest(m).problems;
  assert.ok(problems.some((p) => p.includes('area.label')), problems.join(' | '));
});

/* ------------------------------------------------- orphaned upgrades */

// The defect the first build agent found, in 84k tokens, after three CID verification
// passes and every other check in schema.mjs had already passed.
//
// `upgrades` carried `value` with a cost ladder running to four figures. No module's
// `exposes` produced a value multiplier, so a player could buy ten levels of it and
// nothing in the build would change. Meanwhile `clearing`'s acceptance criteria required
// "the player's value multiplier" — a criterion depending on a number nobody was told to
// compute.
//
// Every check that existed looked within one key. This one looks across two.

/* ------------------------------------ the effect formula and the state shape */

// Both of these are the second half of the first build trial. The orphaned-upgrade check
// above caught a value nobody read; these two catch a value nobody could interpret and a
// table nobody owned. All three were invisible to checks that look at one key at a time.

test('an upgrade with no mode is rejected — perLevel alone is not an effect', () => {
  // Handed `perLevel: 1.1` and nothing else, one builder computed maxed Reach as 14.3 and
  // the other as 11.79. Both satisfied every criterion that existed.
  const m = clone();
  delete m.upgrades[0].mode;
  assert.ok(validateManifest(m).problems.some((p) => p.includes('mode is required')));
});

test('a compounding upgrade whose step is at or below 1 is rejected', () => {
  const m = clone();
  m.upgrades[0].mode = 'compounding';
  m.upgrades[0].perLevel = 0.25; // a shrinking multiplier the player pays for
  assert.ok(validateManifest(m).problems.some((p) => p.includes('worthless or harmful')));
});

/* ------------------------------------------- computed is not the same as applied */

// The second build trial, run against a contract the first trial had already fixed.
// `Progression.walkSpeed(state)` existed, so `orphanedUpgrades` passed. Nothing wrote it
// to a Humanoid: both modules that touch the character declined it in their reports, and
// the build order named no third. Pace was purchasable with no effect.
//
// Computing a value satisfies the earlier check. Applying it is a separate claim.

const APPLIED = () => {
  const m = clone();
  m.modules[1].applies = ['value'];
  return m;
};
