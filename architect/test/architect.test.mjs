/**
 * The technical contract, and the one rule that replaced three.
 *
 * Most of these tests moved here from `bridge/test/` when `modules`, `runtime` and the state
 * shape stopped being creative keys. They were always testing the architect; the architect
 * just did not exist yet, so they were filed under the stage that happened to hold them.
 *
 * The `unconnected` block at the bottom is new, and it is the point of this file. Three build
 * trials produced four defects with one shape — something declared, nothing connected to it —
 * and each got its own special-case check bolted onto the creative schema. The rule is stated
 * once here instead.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { TECH_SCHEMA, techContract } from '../schema.mjs';
import { validateShapes, unconnected, validateTech } from '../validate.mjs';
import { emitGameConfig } from '../../bridge/emit-config.mjs';
import { emitBuildOrder } from '../../bridge/emit-buildorder.mjs';

/* -------------------------------------------------------------- fixtures */

const CREATIVE = {
  tiers: [
    { name: 'Moss', shape: 'Block', rgb: [104, 142, 76], value: 1, weight: 52, height: 1.6 },
    { name: 'Fern', shape: 'Cylinder', rgb: [78, 128, 66], value: 3, weight: 28, height: 2.4 },
  ],
  upgrades: [
    { id: 'value', label: 'Value', blurb: 'more', costBase: 25, costGrowth: 1.6, maxLevel: 10, perLevel: 0.25, base: 1, mode: 'additive' },
  ],
  movement: { baseWalkSpeed: 16, baseClearRadius: 5.5 },
  patch: { footprint: 3, collides: false, material: 'Grass' },
  area: { id: 'east-terrace', label: 'East Terrace', originXZ: [0, 0], size: 120, patchCount: 140, minSpacing: 6 },
  collection: {
    className: 'Find', classPlural: 'Finds', relicsPerArea: 6, areasPerDepth: 1,
    sets: [{ id: 'terrace', label: 'Terrace', depth: 1, relics: ['A', 'B', 'C', 'D', 'E', 'F'] }],
  },
  onboarding: { guaranteedFirstRelic: true },
  currency: { name: 'Shard', plural: 'Shards', icon: 'shard' },
  vocabulary: { maxLabelChars: 14, register: 'Plain.', bannedWords: [{ word: 'relic', reason: 'taken' }] },
};

const TECH = {
  runtime: { clearTickRate: 0.12, saveIntervalSeconds: 45, dataStoreName: 'ArgaRuin_v1' },
  tree: {
    sharedRoot: 'ReplicatedStorage.Shared',
    serverRoot: 'ServerScriptService.Game',
    clientRoot: 'StarterPlayerScripts.Game',
    requireStyle: 'instance',
    requireExample: 'local GameConfig = require(ReplicatedStorage.Shared.GameConfig)',
  },
  stateShape: {
    fields: [
      { name: 'currency', type: 'number', writtenBy: 'progression', persisted: true },
      { name: 'upgrades', type: 'map<upgradeId,integer>', writtenBy: 'progression', persisted: true },
    ],
    types: {},
    collection: { keyedBy: 'UserId', holds: 'PlayerState' },
  },
  interfaces: [
    { module: 'progression', fn: 'valueMultiplier(state)', returns: 'number', note: 'reads only', params: [{ name: 'state', type: 'PlayerState' }] },
  ],
  representation: [
    { subject: 'patch', kind: 'part', rationale: 'one part per patch, no asset pipeline needed' },
    { subject: 'relic', kind: 'part', rationale: 'placeholder until Art specs meshes' },
  ],
  wiring: {
    onJoin: [{ module: 'persistence', does: 'load or construct the state' }],
    onSpawn: [{ module: 'server-main', does: 'write Humanoid.WalkSpeed', applies: 'speed' }],
    onLeave: [{ module: 'persistence', does: 'save' }],
    constructs: [{ module: 'persistence', initialises: ['currency', 'upgrades'] }],
  },
  modules: [
    { id: 'config', path: 'a.luau', side: 'shared', responsibility: 'values', reads: [], exposes: ['GameConfig'], dependsOn: [], criteria: ['x'] },
    { id: 'progression', path: 'b.luau', side: 'server', responsibility: 'derive', reads: ['upgrades'], exposes: ['valueMultiplier(state)'], dependsOn: ['config'], applies: ['value'], criteria: ['x'] },
    { id: 'server-main', path: 'c.luau', side: 'server', responsibility: 'wire', reads: [], exposes: ['none — this is the entry point'], dependsOn: ['progression'], criteria: ['x'] },
  ],
};

const tech = () => JSON.parse(JSON.stringify(TECH));
const creative = () => JSON.parse(JSON.stringify(CREATIVE));
const full = () => ({ ...creative(), ...tech() });

/* -------------------------------------------------------------- contract */

test('every technical key documents why it exists', () => {
  const rows = techContract();
  assert.ok(rows.length >= 7);
  for (const { key, doc } of rows) assert.ok(doc.length > 20, `${key} needs a real doc line`);
});

test('the reference technical manifest validates clean', () => {
  const { problems, missing } = validateTech(tech(), creative());
  assert.deepEqual(missing, []);
  assert.deepEqual(problems, []);
});

/* ------------------------------------------------------------------ tree */

// Both build trials named this the most likely cause of total build failure, and neither
// could find an answer anywhere in the repo.
test('a require example that does not demonstrate its own style is rejected', () => {
  const t = tech();
  t.tree.requireExample = 'the modules live under Shared';
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('literal require')));
});

test('a runtime root that is not a runtime path is rejected', () => {
  const t = tech();
  t.tree.sharedRoot = 'src/shared';
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('runtime path')));
});

/* ------------------------------------------------------------ interfaces */

test('a quantity parameter with no stated meaning is rejected', () => {
  // `upgradeCost(upgrade, level)` shipped without saying whether `level` was held or target.
  // Two builders guessed independently; the ladder differs by 60% on every first purchase.
  const t = tech();
  t.interfaces.push({ module: 'config', fn: 'upgradeCost(u, level)', returns: 'number', note: 'n', params: [{ name: 'level', type: 'number' }] });
  const p = validateShapes(TECH_SCHEMA, t).problems.find((x) => x.includes('"level"'));
  assert.ok(p, 'an unexplained quantity must be caught');
  assert.match(p, /what it counts/);
});

test('a quantity parameter with a meaning passes', () => {
  const t = tech();
  t.interfaces.push({ module: 'config', fn: 'upgradeCost(u, level)', returns: 'number', note: 'n', params: [{ name: 'level', type: 'number', meaning: 'the level currently held, so level 0 is the first purchase' }] });
  assert.deepEqual(validateShapes(TECH_SCHEMA, t).problems, []);
});

test('an interface no module declares is rejected', () => {
  const t = tech();
  t.interfaces.push({ module: 'progression', fn: 'secretSauce(state)', returns: 'number', note: 'n', params: [] });
  assert.ok(unconnected(creative(), t).some((p) => p.includes('not in that module\'s exposes')));
});

/* -------------------------------------------------------- representation */

test('a mesh or model with no named asset is rejected', () => {
  // Otherwise a builder is told to make something out of an asset nobody has produced.
  const t = tech();
  t.representation[0] = { subject: 'patch', kind: 'mesh', rationale: 'nicer foliage' };
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('names no asset')));
});

test('the game\'s own objects must all be accounted for', () => {
  const t = tech();
  t.representation = t.representation.filter((r) => r.subject !== 'relic');
  assert.ok(unconnected(creative(), t).some((p) => p.includes('"relic"')));
});

/* ----------------------------------------------------------------- state */

test('a state field with no persistence answer is rejected', () => {
  const t = tech();
  delete t.stateShape.fields[0].persisted;
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('whether it is persisted')));
});

test('a state field typed with an undefined record is rejected', () => {
  const t = tech();
  t.stateShape.fields.push({ name: 'patches', type: 'Patch[]', writtenBy: 'progression', persisted: false });
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('not defined in stateShape.types')));
});

test('the collection holding many states is itself a contract', () => {
  // `tick(states)` was handed over with no statement of what `states` is. One builder
  // guessed a map keyed by Player, another by UserId.
  const t = tech();
  delete t.stateShape.collection.keyedBy;
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('keyedBy')));
});

test('a state field written by a module that does not exist is rejected', () => {
  const t = tech();
  t.stateShape.fields[0].writtenBy = 'ghost';
  assert.ok(unconnected(creative(), t).some((p) => p.includes('"ghost", which is not a module')));
});

/* ---------------------------------------------------------------- wiring */

test('a lifecycle phase with no steps is rejected', () => {
  const t = tech();
  t.wiring.onSpawn = [];
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('onSpawn must list')));
});

test('a manifest where nothing constructs a fresh state is rejected', () => {
  // Both builders stopped on this independently: every field had a writer, none had an author.
  const t = tech();
  t.wiring.constructs = [];
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('constructs must name')));
});

test('a persisted field nothing initialises is rejected', () => {
  const t = tech();
  t.wiring.constructs = [{ module: 'persistence', initialises: ['currency'] }];
  const p = unconnected(creative(), t).find((x) => x.includes('"upgrades"'));
  assert.ok(p, 'a persisted field with no opening value must be caught');
  assert.match(p, /undefined/);
});

test('constructing a field that does not exist is rejected', () => {
  const t = tech();
  t.wiring.constructs[0].initialises.push('vibes');
  assert.ok(unconnected(creative(), t).some((p) => p.includes('"vibes", which is not a state field')));
});

/* --------------------------------------------------------------- modules */

test('a dependency cycle is rejected, since there is no order to build in', () => {
  const t = tech();
  t.modules[0].dependsOn = ['server-main'];
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('dependency cycle')));
});

test('a cross-side dependency that is not on shared is rejected', () => {
  const t = tech();
  t.modules.push({ id: 'ui', path: 'd.luau', side: 'client', responsibility: 'ui', reads: [], exposes: ['draw()'], dependsOn: ['progression'], criteria: ['x'] });
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('only shared may be depended on')));
});

test('two modules claiming one path is rejected', () => {
  const t = tech();
  t.modules[1].path = t.modules[0].path;
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('claim the path')));
});

test('a module with no acceptance criteria is rejected', () => {
  const t = tech();
  t.modules[1].criteria = [];
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('no acceptance criteria')));
});

test('a clear tick slow enough to feel laggy is rejected', () => {
  const t = tech();
  t.runtime.clearTickRate = 0.4;
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('laggy')));
});

/* ================================================== the general rule */

// Four defects, three trials, one shape: something is declared and nothing connects to it.
//
//   1. `value` was in the ladder and no module computed a multiplier
//   2. `walkSpeed` was computed and nothing wrote it to a Humanoid
//   3. state fields had writers and no constructor
//   4. `clearing` declared `plots` as a dependency and called none of it
//
// Each previously had its own bolted-on check. This is the rule.

test('an upgrade nothing computes is rejected', () => {
  const t = tech();
  t.modules[1].exposes = ['somethingElse()'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('nothing computes its effect')));
});

test('an upgrade computed but never applied is rejected', () => {
  const t = tech();
  t.modules[1].applies = [];
  t.modules[2].applies = ['nothing-real'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('sees nothing change')));
});

test('two modules applying one upgrade is rejected as a race', () => {
  const t = tech();
  t.modules[2].applies = ['value'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('two writers race')));
});

test('a module nothing depends on must be an entry point', () => {
  const t = tech();
  t.modules.push({ id: 'orphan', path: 'e.luau', side: 'server', responsibility: 'nothing', reads: [], exposes: ['f()'], dependsOn: ['config'], criteria: ['x'] });
  const p = unconnected(creative(), t).find((x) => x.includes('"orphan"'));
  assert.ok(p, 'a module that could never run must be caught');
  assert.match(p, /never run/);
});

test('a dependency edge nothing uses is rejected', () => {
  // The fourth instance, never patched before: clearing declared plots and called none of
  // its four functions. Either the edge is dead or a function is missing.
  const t = tech();
  t.modules.push({ id: 'plots', path: 'f.luau', side: 'server', responsibility: 'plots', reads: [], exposes: ['spawn(p)'], dependsOn: ['config'], criteria: ['x'] });
  t.modules[2].dependsOn = ['progression', 'plots'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('no interface or wiring step connects them')), 'a dead dependency edge must be caught');
});

test('an entry point is exempt from the depended-on rule', () => {
  assert.ok(!unconnected(creative(), tech()).some((p) => p.includes('server-main')));
});

/* -------------------------------------------------------------- emitting */

// These moved here with their subject: emitting needs both contracts, because GameConfig
// carries `runtime` and the build order is built from `modules`.

test('the emitted config carries every value and cites the sheet it came from', () => {
  const luau = emitGameConfig(full(), { tiers: 'gameplay/systems/01-overgrowth-tiers.md' });
  assert.match(luau, /GENERATED FILE/);
  assert.match(luau, /gameplay\/systems\/01-overgrowth-tiers\.md/);
  assert.match(luau, /GameConfig\.Tiers/);
  assert.match(luau, /ArgaRuin_v1/);
});

test('the emitted config constructs no Roblox types, so it runs outside the engine', () => {
  const luau = emitGameConfig(full(), {});
  for (const forbidden of ['Color3.', 'Vector3.', 'Enum.', 'Instance.new']) {
    assert.ok(!luau.includes(forbidden), `emitted config must not construct ${forbidden}`);
  }
});

test('every scalar contract value reaches the emitted config', () => {
  // A key that validates but is never emitted is a key nothing downstream can read, which
  // is how `areasPerDepth` hid for a whole wave.
  const luau = emitGameConfig(full(), {});
  for (const v of ['0.12', '45', '5.5', '16', '140', '120', '6']) {
    assert.ok(luau.includes(v), `expected ${v} in the emitted config`);
  }
});

test('the emitted config carries one effect formula, not one per module', () => {
  const luau = emitGameConfig(full(), {});
  assert.match(luau, /function GameConfig\.upgradeEffect/);
  assert.match(luau, /mode == "compounding"/);
  assert.match(luau, /base = 1,/);
  assert.match(luau, /mode = "additive",/);
});

test('the build order is emitted in dependency order', () => {
  const order = emitBuildOrder(full(), {});
  const at = (id) => order.indexOf(`\`${id}\` —`);
  assert.ok(at('config') < at('progression'), 'config must come before progression');
  assert.ok(at('progression') < at('server-main'), 'progression must come before server-main');
});

/* ------------------------------------------------ the shipped manifests */

test('the shipped technical manifest is complete and connected', async () => {
  // The regression guard on the real thing rather than a fixture.
  const { mergeSheets } = await import('../../bridge/merge.mjs');
  const { SCHEMA } = await import('../../bridge/schema.mjs');
  const c = await mergeSheets('cid', SCHEMA);
  const t = await mergeSheets('architect/sheets', TECH_SCHEMA);
  assert.deepEqual(c.problems, [], 'creative manifest must be clean');
  assert.deepEqual(t.problems, [], 'technical sheets must merge cleanly');
  const { problems, missing } = validateTech(t.manifest, c.manifest);
  assert.deepEqual(missing, []);
  assert.deepEqual(problems, []);
});

test('no creative sheet supplies a technical key', () => {
  // The whole point of the split. If a CID sheet starts providing `modules` again, the
  // architect has been bypassed.
  assert.ok(!('modules' in TECH_SCHEMA) === false);
  const overlap = Object.keys(TECH_SCHEMA).filter((k) => k in CREATIVE);
  assert.deepEqual(overlap, [], `these keys are in both contracts: ${overlap.join(', ')}`);
});
