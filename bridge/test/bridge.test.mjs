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
  area: { id: 'east-terrace', label: 'East Terrace', originXZ: [0, 0], size: 120, patchCount: 140, minSpacing: 6 },
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
    casing: 'title',
    maxSentenceWords: 12,
    allowedPattern: "^[A-Za-z0-9 ,.'%-]+$",
    bannedWords: [{ word: 'relic', reason: 'occupied by two games in this family for a rolled multiplier' }],
  },
};

const clone = () => JSON.parse(JSON.stringify(GOOD));

async function sheetDir(blocks) {
  const dir = await mkdtemp(join(tmpdir(), 'bridge-'));
  for (const [name, payload] of Object.entries(blocks)) {
    const file = join(dir, `${name}.md`);
    // The parent, not the root. Ownership checks join on a sheet's domain path, so a
    // fixture has to be able to sit at `gameplay/systems/09-x.md` rather than flat.
    await mkdir(join(file, '..'), { recursive: true });
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

/* -------------------------------------------------------------- proposals */

// The contract is small because 41 of the graph's 55 domains have not run, not because
// those subjects have no data form. A domain that decides something real and finds no slot
// for it has produced a finding, and a finding must not be a crash — otherwise the only way
// past the merger is to write prose, which is the wave-1 defect.

test('a proposed key is collected and reported, not merged and not an error', async () => {
  const dir = await sheetDir({
    'new-thing': JSON.stringify({
      provides: 'environment',
      status: 'proposed',
      value: { zones: [{ id: 'terrace', fog: 40 }] },
    }),
  });
  const { problems, proposals, manifest, sheetsContributing } = await mergeSheets(dir);
  assert.deepEqual(problems.filter((p) => p.includes('new-thing.md')), []);
  assert.equal(proposals.length, 1);
  assert.equal(proposals[0].key, 'environment');
  assert.match(proposals[0].sheet, /new-thing\.md/);
  assert.equal('environment' in manifest, false, 'a proposal must never reach the manifest');
  assert.equal(sheetsContributing, 1);
  await rm(dir, { recursive: true, force: true });
});

test('an unknown key without status stays a hard error, so a typo is still caught', async () => {
  // `tier` for `tiers` must not become a proposal. The real key then goes unsupplied and the
  // sheet reads as having done its job.
  const dir = await sheetDir({ typo: JSON.stringify({ provides: 'tier', value: [] }) });
  const { problems, proposals } = await mergeSheets(dir);
  assert.equal(proposals.length, 0);
  const err = problems.find((p) => p.includes('not in the build contract'));
  assert.ok(err, `expected a hard error, got: ${problems.join(' | ')}`);
  assert.match(err, /"status": "proposed"/);
  await rm(dir, { recursive: true, force: true });
});

test('proposing a key the contract already has is an error naming its owner', async () => {
  const dir = await sheetDir({
    dupe: JSON.stringify({ provides: 'tiers', status: 'proposed', value: [] }),
  });
  const { problems, proposals } = await mergeSheets(dir);
  assert.equal(proposals.length, 0);
  const err = problems.find((p) => p.includes('Two domains cannot claim one key'));
  assert.ok(err, `expected a rejection, got: ${problems.join(' | ')}`);
  assert.match(err, /gameplay\/systems/);
  await rm(dir, { recursive: true, force: true });
});

test('two sheets proposing one key is an error — one key one owner holds for proposals', async () => {
  const block = (v) => JSON.stringify({ provides: 'sfx', status: 'proposed', value: v });
  const dir = await sheetDir({ 'a-one': block({ cues: 1 }), 'b-two': block({ cues: 2 }) });
  const { problems, proposals } = await mergeSheets(dir);
  assert.equal(proposals.length, 1);
  const err = problems.find((p) => p.includes('already proposed by'));
  assert.ok(err, `expected a duplicate-proposal error, got: ${problems.join(' | ')}`);
  assert.match(err, /a-one\.md/);
  assert.match(err, /b-two\.md/);
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
  // Asserted by name, not by count. The count was 2 when the contract was 9 keys and the
  // fixture supplied all of them; waves 2-3 promoted 16 more, so a count assertion measures
  // how big the contract is rather than whether a deleted key is reported.
  assert.ok(missing.some((m) => m.startsWith('collection') && m.includes('gameplay/meta')));
  assert.ok(missing.some((m) => m.startsWith('patch') && m.includes('art/objects')));
});

/* -------------------------------------------------------------- invariants */

test('the reference manifest validates clean', () => {
  // `missing` is deliberately not asserted empty. GOOD is a hand-written fixture covering the
  // nine original keys, and it is the right size for what these tests exercise -- tier shapes,
  // cost ladders, copy rules. Growing it to 25 keys to satisfy a completeness assertion would
  // make every future promotion edit a fixture that tests none of it. Completeness of the real
  // tree is asserted by 'the shipped cid/ tree merges with no problems at all'.
  const { problems } = validateManifest(GOOD);
  assert.deepEqual(problems, []);
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

/* ------------------------ tone's output, made checkable instead of prose */

// `vocabulary.register` is a sentence, and always will be — it is what a human writer reads.
// These three fields are the checkable half of the same decision, and they exist because the
// prose half could not be enforced.
//
// Tone spent four sheets on a register. One ruling from it, Title Case, had to be carried
// into two other domains by hand; before that, three separate sheets each spent ~150k tokens
// rediscovering that `area.label` was "East Terrace" while `sets[].label` was "Terrace".
// `cid:verify` warned about it and left the choice to a human, because picking one crossed a
// category boundary. A contract field settles it once and the merger enforces it for free.

test('a label that is not Title Case is rejected when casing says title', () => {
  const m = clone();
  m.area.label = 'EAST TERRACE';
  const p = validateManifest(m).problems.find((x) => x.includes('Title Case'));
  assert.ok(p, 'the exact defect three sheets rediscovered must now be caught');
  assert.match(p, /area\.label/);
});

test('every player-facing string must be typeable in the declared character set', () => {
  for (const [what, mutate] of [
    ['a curly apostrophe', (m) => { m.upgrades[0].blurb = 'it’s worth it'; }],
    ['an emoji', (m) => { m.currency.name = 'Shard✨'; }],
  ]) {
    const m = clone();
    mutate(m);
    assert.ok(
      validateManifest(m).problems.some((x) => x.includes('allowedPattern')),
      `${what} must be caught`,
    );
  }
});

test('prose has a word ceiling even though it is exempt from the label limit', () => {
  const m = clone();
  m.upgrades[0].blurb = 'one two three four five six seven eight nine ten eleven twelve thirteen';
  const p = validateManifest(m).problems.find((x) => x.includes('word limit'));
  assert.ok(p, 'a run-on blurb must be caught');
  assert.match(p, /13-word/);
});

test('a label at the ceiling and in the right case passes', () => {
  // The guard against a rule that only ever says no.
  const m = clone();
  m.area.label = 'East Terrace';
  m.currency.name = 'Shard';
  assert.deepEqual(validateManifest(m).problems, []);
});

test('an unparseable allowedPattern is caught rather than silently skipped', () => {
  const m = clone();
  m.vocabulary.allowedPattern = '^[unclosed';
  assert.ok(validateManifest(m).problems.some((x) => x.includes('not a valid regular expression')));
});

test('the shipped manifest satisfies its own copy rules', async () => {
  const { mergeSheets: merge } = await import('../merge.mjs');
  const { manifest } = await merge('cid');
  const copy = validateManifest(manifest).problems
    .filter((p) => /Title Case|allowedPattern|word limit|upper case/.test(p));
  assert.deepEqual(copy, []);
});

test('the shipped cid/ tree merges with no problems at all', async () => {
  // The test above filters down to copy rules, so everything else in the real tree went
  // unchecked. It let through a documentation file that carried an illustrative
  // ```manifest block containing `<key>` — not valid JSON, so the merger reported a parse
  // error against a file that was never meant to contribute. `npm run bridge` caught it;
  // nothing in the suite did.
  //
  // Waves 2-7 add ~160 sheets to this tree. Every one of them can break the merge in a way
  // no unit test with a synthetic fixture would notice, which is the argument for asserting
  // against the real thing.
  const { mergeSheets: merge } = await import('../merge.mjs');
  const { problems, missing } = await merge('cid');
  assert.deepEqual(problems, [], 'cid/ must merge clean — run `npm run bridge` to see it');
  assert.deepEqual(missing, [], 'every contract key must have an owning sheet');
});

test('an "amends" block is data in either fence, and is never merged', async () => {
  // The convention is a ```json fence for an amendment and ```manifest for a contribution,
  // and the fence was the only thing distinguishing them. In wave 5, five of sixteen writers
  // put an `amends` block in a ```manifest fence and each one hard-failed the merge with
  // "needs a provides". Five independent agents making one mistake is a bad convention, not
  // five bad agents, so the fence stopped being load-bearing.
  //
  // Both halves matter. Recognised: the wrong fence is no longer an error. Never merged: a
  // key still has exactly one owning sheet, and an amendment is a request against that owner
  // — which is the rule the whole seam exists to hold.
  // `sheetDir` always writes a ```manifest fence, which is exactly the wrong-fence case.
  const dir = await sheetDir({
    'a/01-owner': JSON.stringify({ provides: 'tiers', value: [{ id: 't1', name: 'One', value: 1 }] }),
    'a/02-amendment': JSON.stringify({ amends: 'tiers', value: { note: 'more rows' } }),
  });
  const { manifest, problems, sheetsContributing } = await mergeSheets(dir, { tiers: { owner: 'a' } });
  assert.deepEqual(problems, [], 'an amends block is not a malformed contribution');
  assert.deepEqual(manifest.tiers, [{ id: 't1', name: 'One', value: 1 }], 'the amendment must not merge');
  assert.equal(sheetsContributing, 2, 'both sheets produced a data form');
});

test('a stale "proposed" on a key the sheet itself owns is tolerated, not an error', async () => {
  // Promotion happens in schema.mjs, after the sheets that earned it are written. Erroring
  // on the leftover status meant every promotion had to be followed by rewriting exactly
  // those sheets, and any agent still holding pre-promotion context re-broke the merge on
  // its next write. That happened three times in one afternoon during wave 3.
  const dir = await sheetDir({
    'gameplay/systems/09-x': JSON.stringify({
      provides: 'currency', status: 'proposed', value: { name: 'Shard', plural: 'Shards', icon: 'shard' },
    }),
  });
  const { problems, manifest, staleStatus } = await mergeSheets(dir);
  assert.deepEqual(problems.filter((p) => p.includes('09-x')), []);
  assert.equal(manifest.currency?.name, 'Shard', 'the value is authoritative; the status is a leftover');
  assert.ok(staleStatus.some((s) => s.includes('currency')), 'but it is reported, not silent');
  await rm(dir, { recursive: true, force: true });
});

test('a stale "proposed" from a domain that does NOT own the key stays a hard error', async () => {
  // The distinction that makes the tolerance safe. Two domains claiming one key is exactly
  // what this seam refuses, and relaxing it for the owner must not relax it for everyone.
  const dir = await sheetDir({
    'theme/tone/09-x': JSON.stringify({ provides: 'currency', status: 'proposed', value: {} }),
  });
  const { problems } = await mergeSheets(dir);
  const err = problems.find((p) => p.includes('Two domains cannot claim one key'));
  assert.ok(err, `expected an ownership error, got: ${problems.join(' | ')}`);
  assert.match(err, /gameplay\/systems/);
  await rm(dir, { recursive: true, force: true });
});

test('every player-facing literal in the UI obeys the vocabulary key', async () => {
  // `playerFacingStrings` walks the *manifest*, so the ban list and the character-set rule
  // were enforced on values CID declared and on nothing else. The strings a player actually
  // reads on the HUD live in a ui-forge brief and in client modules, and none of them was
  // ever checked.
  //
  // What that let through, all three found at once by the `pressables` builder's own
  // vocabulary check and then by hand:
  //   - "RELICS" on the collection readout. `relic` and `relics` are banned words, renamed to
  //     Find/Finds precisely because the noun was occupied inside this game's genre family.
  //   - "EAST TERRACE — 0% CLEAR" and "Lv 0  ·  25", using an em dash and a middot, neither
  //     typeable in the declared character set.
  // The rule existed, was correct, and was enforced nowhere the player could see.
  const { readFile } = await import('node:fs/promises');
  const { mergeSheets: merge } = await import('../merge.mjs');
  const { manifest } = await merge('cid');
  const vocab = manifest.vocabulary;
  const pattern = new RegExp(vocab.allowedPattern);

  const FILES = [
    'game/src/shared/Screens/hud.luau',
    'game/src/client/HudBinding.luau',
    'game/src/client/Pressables.luau',
  ];

  const violations = [];
  for (const file of FILES) {
    let body;
    try { body = await readFile(file, 'utf8'); } catch { continue; } // not yet built
    for (const m of body.matchAll(/(?:text|Text)\s*=\s*"([^"\\]+)"/g)) {
      const value = m[1];
      if (!pattern.test(value)) {
        violations.push(`${file}: ${JSON.stringify(value)} is outside vocabulary.allowedPattern`);
      }
      for (const { word } of vocab.bannedWords) {
        const re = new RegExp(`\\b${String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (re.test(value)) {
          violations.push(`${file}: ${JSON.stringify(value)} uses the banned word "${word}"`);
        }
      }
    }
  }
  assert.deepEqual(violations, []);
});

test('vocabulary.allowedPattern means the same thing in Lua as in JavaScript', async () => {
  // Two engines enforce this pattern and they do not agree by default. The merger validates
  // with `new RegExp`; every Luau module checks with `string.match`.
  //
  // Written `[A-Za-z0-9 ,.'%-/]`, JavaScript reads `%-/` as a RANGE from `%` (37) to `/` (47)
  // and silently admits `%&'()*+,-./`; Lua reads `%-` as an escaped hyphen and admits no `%`
  // at all. So "0% CLEAR" passed on this side and failed at runtime -- while
  // firstSession.withheld[areaProgress].joinValue is "0%", the HUD interface fixes the bar
  // label as `<label> ... <percent>% CLEAR`, and the emitted screen ships exactly that.
  //
  // A JS-only test cannot catch this: the JS side was always the permissive one. So this
  // asserts the two properties that make the pattern portable, rather than re-testing RegExp
  // against itself.
  const { mergeSheets: merge } = await import('../merge.mjs');
  const { manifest } = await merge('cid');
  const p = manifest.vocabulary.allowedPattern;

  // 1. No unescaped `%` followed by anything that would form a JS range. `%%` is the portable
  //    spelling: an escaped percent to Lua, a harmless repeat to JS.
  // Remove the valid pairs first; a `%` left over is a bare one. Matching `%(?!%)` directly
  // flags the SECOND character of a legitimate `%%`, which is the same class of off-by-one
  // the pattern itself fell into.
  assert.equal(p.replace(/%%/g, '').includes('%'), false,
    `allowedPattern has a bare "%" in ${p} — Lua reads it as an escape, JS does not. Write %%.`);

  // 2. A hyphen must be last inside the class, where both engines read it as a literal.
  const cls = p.match(/\[(.*)\]/)?.[1] ?? '';
  if (cls.includes('-')) {
    assert.ok(cls.endsWith('-'),
      `a "-" inside ${p} must sit last in the class or one engine reads it as a range`);
  }

  // 3. The characters three separate specs actually require must pass.
  const re = new RegExp(p);
  for (const s of ['0% CLEAR', '0 / 24', 'Lv 3  -  102', 'Finds']) {
    assert.ok(re.test(s), `${JSON.stringify(s)} is required by a spec and fails allowedPattern`);
  }
  // And the two untypeable characters that were actually found in shipped strings must not.
  for (const s of ['A — B', 'A · B']) {
    assert.equal(re.test(s), false, `${JSON.stringify(s)} is untypeable and must fail`);
  }
});
