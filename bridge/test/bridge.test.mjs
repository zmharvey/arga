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
    { id: 'value', label: 'VALUE', blurb: 'more', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25 },
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
  runtime: { clearTickRate: 0.12, saveIntervalSeconds: 45, dataStoreName: 'ArgaRuin_v1' },
  currency: { name: 'Shard', plural: 'Shards', icon: 'shard' },
  vocabulary: {
    maxLabelChars: 14,
    register: 'Plain concrete nouns.',
    bannedWords: [{ word: 'relic', reason: 'occupied by two games in this family for a rolled multiplier' }],
  },
  modules: [
    { id: 'config', path: 'game/src/shared/GameConfig.luau', side: 'shared', responsibility: 'values', reads: [], exposes: ['GameConfig'], dependsOn: [], criteria: ['regenerates with no diff'] },
    // Every upgrade needs a module that reads it. Before the orphaned-upgrade check
    // existed this fixture had `value` in the ladder and nothing consuming it, which is
    // exactly the defect that shipped to a build agent.
    { id: 'progression', path: 'game/src/server/Progression.luau', side: 'server', responsibility: 'derive', reads: ['upgrades'], exposes: ['valueMultiplier(state): number'], dependsOn: ['config'], criteria: ['maxed value multiplier matches the ladder'] },
  ],
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
  delete partial.runtime;
  const { missing } = validateManifest(partial);
  assert.equal(missing.length, 2);
  assert.ok(missing.some((m) => m.startsWith('collection') && m.includes('gameplay/meta')));
  assert.ok(missing.some((m) => m.startsWith('runtime') && m.includes('tech/architecture')));
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

test('a clear tick slow enough to feel laggy is rejected', () => {
  const m = clone();
  m.runtime.clearTickRate = 0.5;
  assert.ok(validateManifest(m).problems.some((p) => p.includes('clearTickRate')));
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
const withModules = (mods) => ({ ...clone(), modules: mods });

test('a module reading a key outside the contract is rejected', () => {
  const m = withModules([{ ...MODULES[0], reads: ['vibes'] }]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('not a contract key')));
});

test('a module depending on one that does not exist is rejected', () => {
  const m = withModules([{ ...MODULES[0], dependsOn: ['ghost'] }]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('does not exist')));
});

test('a dependency cycle is rejected, since there is no order to build in', () => {
  const m = withModules([
    { ...MODULES[0], id: 'a', dependsOn: ['b'] },
    { ...MODULES[0], id: 'b', path: 'z.luau', dependsOn: ['a'] },
  ]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('dependency cycle')));
});

test('a cross-side dependency that is not on shared is rejected', () => {
  // A client requiring a server module is a runtime failure; cheap to refuse on paper.
  const m = withModules([
    { ...MODULES[0], id: 'srv', side: 'server' },
    { ...MODULES[0], id: 'cli', path: 'z.luau', side: 'client', exposes: [], dependsOn: ['srv'] },
  ]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('only shared may be depended on')));
});

test('a module with no acceptance criteria is rejected', () => {
  const m = withModules([{ ...MODULES[0], criteria: [] }]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('no acceptance criteria')));
});

test('two modules claiming one path is rejected', () => {
  const m = withModules([MODULES[0], { ...MODULES[1], path: 'a.luau' }]);
  assert.ok(validateManifest(m).problems.some((p) => p.includes('claim the path')));
});

test('a client entry point may expose nothing, but a shared module may not', () => {
  const clientOk = withModules([{ ...MODULES[0], side: 'client', exposes: [] }]);
  assert.deepEqual(validateManifest(clientOk).problems, []);
  const sharedBad = withModules([{ ...MODULES[0], side: 'shared', exposes: [] }]);
  assert.ok(validateManifest(sharedBad).problems.some((p) => p.includes('exposes nothing')));
});

test('the build order is emitted in dependency order', () => {
  const order = emitBuildOrder(withModules(MODULES), {});
  const at = (id) => order.indexOf(`\`${id}\` —`);
  assert.ok(at('config') < at('layout'), 'config must come before layout');
  assert.ok(at('layout') < at('main'), 'layout must come before main');
});

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

test('the emitted config carries every value and cites the sheet it came from', () => {
  const luau = emitGameConfig(GOOD, { tiers: 'gameplay/systems/01-overgrowth-tiers.md' });
  assert.match(luau, /GENERATED FILE — do not edit/);
  assert.match(luau, /From gameplay\/systems\/01-overgrowth-tiers\.md/);
  // every tier, every upgrade, and the numbers a builder would otherwise invent
  for (const t of GOOD.tiers) assert.match(luau, new RegExp(`name = "${t.name}"`));
  assert.match(luau, /GameConfig\.BaseClearRadius = 5\.5/);
  assert.match(luau, /patchCount = 140/);
  assert.match(luau, /GuaranteedFirstRelic = true/);
  assert.match(luau, /dataStoreName|DataStoreName/);
  for (const r of GOOD.collection.sets[0].relics) assert.match(luau, new RegExp(`"${r}"`));
});

test('the emitted config constructs no Roblox types, so it runs outside the engine', () => {
  // The property that makes game/test/config.spec.luau possible at all.
  const luau = emitGameConfig(GOOD, {});
  assert.doesNotMatch(luau, /Color3\./);
  assert.doesNotMatch(luau, /Vector3\./);
  assert.doesNotMatch(luau, /Enum\./);
});

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

test('every scalar contract value reaches the emitted config', () => {
  // A key that validates but is never emitted is invisible to anything downstream.
  // `collection.areasPerDepth` was exactly that until a CID sheet tried to write a
  // predicate over it and could not find it.
  const luau = emitGameConfig(GOOD, {});
  const scalars = [
    GOOD.area.patchCount, GOOD.area.size, GOOD.area.minSpacing,
    GOOD.movement.baseWalkSpeed, GOOD.movement.baseClearRadius,
    GOOD.patch.footprint, GOOD.collection.relicsPerArea, GOOD.collection.areasPerDepth,
    GOOD.runtime.clearTickRate, GOOD.runtime.saveIntervalSeconds,
  ];
  for (const v of scalars) {
    assert.ok(luau.includes(String(v)), `${v} must appear in the emitted config`);
  }
  for (const s of [GOOD.currency.name, GOOD.collection.className, GOOD.area.label]) {
    assert.ok(luau.includes(`"${s}"`), `${s} must appear in the emitted config`);
  }
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

test('an upgrade no module reads is rejected', () => {
  const m = clone();
  m.upgrades = [{ id: 'value', label: 'Value', blurb: 'b', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25 }];
  m.modules = [{ id: 'config', path: 'a.luau', side: 'shared', responsibility: 'v', reads: [], exposes: ['GameConfig'], dependsOn: [], criteria: ['x'] }];
  const { problems } = validateManifest(m);
  assert.ok(
    problems.some((p) => p.includes('upgrade "value"') && p.includes('no module exposes')),
    `expected an orphaned-upgrade problem, got: ${problems.join(' | ')}`,
  );
});

test('the problem names what a player could waste on it', () => {
  const m = clone();
  m.upgrades = [{ id: 'value', label: 'Value', blurb: 'b', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25 }];
  m.modules = [{ id: 'config', path: 'a.luau', side: 'shared', responsibility: 'v', reads: [], exposes: ['GameConfig'], dependsOn: [], criteria: ['x'] }];
  const p = validateManifest(m).problems.find((x) => x.includes('upgrade "value"'));
  // 25 * 1.6^9 = 1717. A reader should see the stakes without doing the arithmetic.
  assert.match(p, /1717/);
  assert.match(p, /10 levels/);
});

test('a getter named for the upgrade satisfies it, whatever the verb', () => {
  for (const fn of ['valueMultiplier(state): number', 'payoutValue(s)', 'getValue(state)']) {
    const m = clone();
    m.upgrades = [{ id: 'value', label: 'Value', blurb: 'b', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25 }];
    m.modules = [{ id: 'p', path: 'a.luau', side: 'server', responsibility: 'v', reads: ['upgrades'], exposes: [fn], dependsOn: [], criteria: ['x'] }];
    const { problems } = validateManifest(m);
    assert.ok(!problems.some((x) => x.includes('no module exposes')), `"${fn}" should count as consuming "value"`);
  }
});

test('radius and speed were never orphaned, so the check must not flag them', () => {
  // Guards against a fix that trades one false negative for two false positives.
  const m = clone();
  m.upgrades = [
    { id: 'radius', label: 'Reach', blurb: 'b', costBase: 40, costGrowth: 1.75, maxLevel: 8, perLevel: 1.1 },
    { id: 'speed', label: 'Pace', blurb: 'b', costBase: 60, costGrowth: 1.8, maxLevel: 6, perLevel: 1.6 },
  ];
  m.modules = [{
    id: 'progression', path: 'a.luau', side: 'server', responsibility: 'v', reads: ['upgrades'],
    exposes: ['clearRadius(state): number', 'walkSpeed(state): number'], dependsOn: [], criteria: ['x'],
  }];
  const { problems } = validateManifest(m);
  assert.ok(!problems.some((x) => x.includes('no module exposes')), problems.join(' | '));
});

test('the check stays quiet when there is no module list to check against', () => {
  // Partial manifests are normal mid-wave. A missing key is already reported by name;
  // this check must not add noise on top of it.
  const m = clone();
  delete m.modules;
  assert.ok(!validateManifest(m).problems.some((p) => p.includes('no module exposes')));
});
