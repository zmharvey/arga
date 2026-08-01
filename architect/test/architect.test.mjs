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
    remotesRoot: 'ReplicatedStorage.Remotes',
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
    { module: 'plots', fn: 'spawn(state)', returns: 'CFrame', note: 'builds the plot', params: [{ name: 'state', type: 'PlayerState' }] },
  ],
  representation: [
    { subject: 'patch', kind: 'part', rationale: 'one part per patch, no asset pipeline needed', createdBy: 'plots' },
    { subject: 'relic', kind: 'none', rationale: 'a Find has no Instance; clearing sets state.found', createdBy: 'nothing' },
  ],
  wiring: {
    onJoin: [{ module: 'plots', fn: 'spawn(state)', calledBy: 'server-main', does: 'build the plot' }],
    onSpawn: [{ module: 'progression', fn: 'valueMultiplier(state)', calledBy: 'server-main', does: 'derive the multiplier' }],
    onLeave: [{ module: 'plots', fn: 'spawn(state)', calledBy: 'server-main', does: 'tear down' }],
    constructs: [{ module: 'progression', initialises: ['currency', 'upgrades'] }],
  },
  // Graph-complete on purpose. One traversal now checks every node, so a fixture that
  // satisfies six narrow checks is no longer enough — and making it complete is what proved
  // `exposes` had to create fn nodes rather than only point at them.
  modules: [
    { id: 'config', path: 'a.luau', side: 'shared', responsibility: 'values', reads: ['tiers', 'movement', 'patch', 'area', 'collection', 'onboarding', 'currency', 'runtime', 'upgrades'], exposes: ['GameConfig'], dependsOn: [], criteria: ['x'] },
    { id: 'progression', path: 'b.luau', side: 'server', responsibility: 'derive', reads: ['upgrades', 'stateShape', 'tree', 'interfaces'], exposes: ['valueMultiplier(state)'], dependsOn: ['config'], applies: ['value'], criteria: ['x'] },
    { id: 'plots', path: 'd.luau', side: 'server', responsibility: 'build the plot', reads: ['representation'], exposes: ['spawn(state)'], dependsOn: ['config'], criteria: ['x'] },
    { id: 'server-main', path: 'c.luau', side: 'server', responsibility: 'wire', reads: ['wiring'], exposes: [], entryPoint: true, dependsOn: ['progression', 'plots'], criteria: ['x'] },
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

/* -------------------------------------------------------- representation */

test('a mesh or model with no named asset is rejected', () => {
  // Otherwise a builder is told to make something out of an asset nobody has produced.
  const t = tech();
  t.representation[0] = { subject: 'patch', kind: 'mesh', rationale: 'nicer foliage' };
  assert.ok(validateShapes(TECH_SCHEMA, t).problems.some((p) => p.includes('names no asset')));
});

test('a subject nothing creates is rejected', () => {
  const t = tech();
  t.representation[0].createdBy = 'nothing'; // a part that nothing builds
  const p = unconnected(creative(), t).find((x) => x.includes('subject "patch"'));
  assert.ok(p, 'a part with no creator must be caught');
  assert.match(p, /nothing creates it/);
});

test('a subject with no Instance is exempt from needing a creator', () => {
  // A Find has no Instance at any point: clearing sets state.found and fires a channel.
  assert.ok(!unconnected(creative(), tech()).some((p) => p.includes('subject "relic"')));
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
  assert.ok(unconnected(creative(), t).some((p) => p.includes('"ghost" is named as a module but no such module exists')));
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
  assert.ok(unconnected(creative(), t).some((p) => p.includes('"vibes" is named as a field but no such field exists')));
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

// The old "nothing computes its effect" rule matched upgrade ids against exposed function
// names by substring. It was a workaround: `applies` states the same fact exactly, and an
// upgrade nothing applies is already rejected below. Fuzzy matching is gone rather than kept
// alongside, because two rules for one fact disagree eventually.

test('an upgrade computed but never applied is rejected', () => {
  const t = tech();
  t.modules[1].applies = [];
  t.modules[2].applies = ['nothing-real'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('sees nothing change')));
});

test('two modules applying one upgrade is rejected as a race', () => {
  const t = tech();
  t.modules[2].applies = ['value'];
  assert.ok(unconnected(creative(), t).some((p) => p.includes('is applies by 2 modules')));
});

test('a module nothing depends on must be an entry point', () => {
  const t = tech();
  t.modules.push({ id: 'orphan', path: 'e.luau', side: 'server', responsibility: 'nothing', reads: [], exposes: ['f()'], dependsOn: ['config'], criteria: ['x'] });
  const p = unconnected(creative(), t).find((x) => x.includes('"orphan"'));
  assert.ok(p, 'a module that could never run must be caught');
  assert.match(p, /never run/);
});

// The "dead dependency edge" rule is gone too. It asked whether any interface or wiring step
// connected two modules, which the contract does not record: wiring holds lifecycle steps,
// not every call. It produced 13 false positives on functions genuinely called from inside
// another module's implementation. Reachability is covered one level up — a module nothing
// depends on is rejected — and that is the honest granularity available.

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

/* ---------------------------------- outputs need a path to their channel */

// The fifth instance of the same defect, found by the third build trial. `clearing` was
// required to fire FindRevealed and AreaRestored, did not depend on `protocol`, and
// protocol.REMOTES returns names rather than Instances. A module owning two outputs with no
// way to reach either.

const WITH_PROTOCOL = () => {
  const t = tech();
  t.modules.push({
    id: 'protocol', path: 'p.luau', side: 'shared', responsibility: 'names the channels',
    reads: [], exposes: ['REMOTES table'], dependsOn: [], criteria: ['x'],
    declaresRemotes: ['FindRevealed', 'AreaRestored'],
  });
  t.modules[2].dependsOn = ['progression', 'protocol'];
  t.interfaces.push({ module: 'protocol', fn: 'REMOTES', returns: 'table', note: 'names', params: [] });
  return t;
};

test('a module that fires a channel without depending on its owner is rejected', () => {
  const t = WITH_PROTOCOL();
  t.modules[1].fires = ['FindRevealed']; // progression depends on config only
  const p = unconnected(creative(), t).find((x) => x.includes('"progression"') && x.includes('fires'));
  assert.ok(p, 'an output with no path to it must be caught');
  assert.match(p, /no way to reach it/);
});

test('firing a channel nobody declared is rejected', () => {
  const t = WITH_PROTOCOL();
  t.modules[2].fires = ['SomethingInvented'];
  const p = unconnected(creative(), t).find((x) => x.includes('SomethingInvented'));
  assert.ok(p, 'firing a channel nobody declared must be caught');
  assert.match(p, /no such channel exists/);
});

test('a module that depends on the channel owner may fire', () => {
  const t = WITH_PROTOCOL();
  t.modules[2].fires = ['FindRevealed', 'AreaRestored'];
  assert.ok(!unconnected(creative(), t).some((p) => p.includes('fires')));
});

test('firing nothing is not a problem', () => {
  assert.ok(!unconnected(creative(), tech()).some((p) => p.includes('fires')));
});

/* -------------------------------- the checks must read the fields they demand */

test('an entry point is recognised from its declared field, not from its name', () => {
  // The check demanded `entryPoint: true`, then went on inferring one from `/main$/` on the
  // id plus prose in `exposes` — prose the same release had outlawed. So the inference was
  // half dead and half a naming convention, and a module called `bootstrap` was reported as
  // unreachable. Found by the architect reading the check that had just demanded the field.
  const t = tech();
  t.modules[3].id = 'bootstrap';
  t.modules[3].path = 'boot.luau';
  assert.ok(!unconnected(creative(), t).some((p) => p.includes('bootstrap')), 'a declared entry point must be exempt whatever it is called');
});

test('a module named like an entry point but not declared as one is still checked', () => {
  const t = tech();
  delete t.modules[3].entryPoint;
  t.modules[3].exposes = ['run()'];
  t.interfaces.push({ module: 'server-main', fn: 'run()', returns: '()', note: 'n', params: [] });
  const p = unconnected(creative(), t).find((x) => x.includes('server-main'));
  assert.ok(p, 'the /main$/ naming convention must no longer grant an exemption');
  assert.match(p, /never run/);
});

test('the emitted brief tells a builder a module is an entry point', () => {
  // With `exposes: []` the brief used to print "- none", which drops the fact at the seam.
  // A check that holds in the validator and vanishes from the artifact does not prevent
  // anything: that is how the third trial's builder came to invent a remote lookup.
  const order = emitBuildOrder(full(), {});
  assert.match(order, /nothing\. This is an entry point/);
});

/* ------------------------------------------- one fact, one owner, inside values */

// The eighth defect, and a new subclass. Three of four builders in one wave independently
// reported it and every one called it a total build failure:
//
//   tree.sharedRoot        "ReplicatedStorage.UIForge"
//   interfaces[0].returns  "require(ReplicatedStorage.Shared.GameConfig) IS this table"
//
// Only one resolves. The graph could not see it, because it is not a broken connection: it
// is the same fact written twice. The repo enforces one-key-one-sheet at the manifest level;
// this is the same principle one level down, for facts inside values.

test('a runtime path tree does not declare is rejected', () => {
  const t = tech();
  // The fixture's shared root is ReplicatedStorage.Shared, so this is the second spelling.
  t.interfaces[0].returns = 'table — require(ReplicatedStorage.UIForge.GameConfig) IS this table';
  const p = unconnected(creative(), t).find((x) => x.includes('ReplicatedStorage.UIForge'));
  assert.ok(p, 'a second spelling of the shared root must be caught');
  assert.match(p, /tree owns runtime paths/);
});

test('a path tree declares anywhere is legal wherever it appears', () => {
  // `ReplicatedStorage.Remotes` is a deliberate sibling of the shared root, not a
  // contradiction of it. The first version of this check compared prefixes and called it one,
  // which is why the rule is ownership instead: tree declares it, so it is legal.
  const t = tech();
  t.interfaces[0].returns = 'Folder — ReplicatedStorage.Remotes, one Instance per channel';
  assert.ok(!unconnected(creative(), t).some((p) => p.includes('Remotes')));
});

test('a child of a declared path is legal', () => {
  const t = tech();
  t.interfaces[0].returns = 'the table at ReplicatedStorage.Shared.GameConfig';
  assert.ok(!unconnected(creative(), t).some((p) => p.includes('runtime path')));
});

test('the shipped tree declares every path the rest of the manifest names', async () => {
  // Regression guard on the real manifests. This is the check that would have saved a whole
  // build wave: three of four builders stopped on the same contradiction.
  const { mergeSheets } = await import('../../bridge/merge.mjs');
  const { SCHEMA } = await import('../../bridge/schema.mjs');
  const c = await mergeSheets('cid', SCHEMA);
  const t = await mergeSheets('architect/sheets', TECH_SCHEMA);
  const paths = unconnected(c.manifest, t.manifest).filter((p) => p.includes('runtime path'));
  assert.deepEqual(paths, []);
});
