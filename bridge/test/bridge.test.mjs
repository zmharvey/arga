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
import { validateManifest, SCHEMA, contract } from '../schema.mjs';
import { emitGameConfig } from '../emit-config.mjs';

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
    relicsPerArea: 6,
    sets: [{ id: 'terrace', label: 'Terrace', depth: 1, relics: ['A', 'B', 'C', 'D', 'E', 'F'] }],
  },
  onboarding: { guaranteedFirstRelic: true },
  runtime: { clearTickRate: 0.12, saveIntervalSeconds: 45, dataStoreName: 'ArgaRuin_v1' },
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
  m.collection.relicsPerArea = 4; // sets need 6
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
