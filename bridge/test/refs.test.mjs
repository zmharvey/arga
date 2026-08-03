/**
 * Reference resolution.
 *
 * These cover the class of defect seven waves could not stop producing by hand: a field path
 * quoted from memory rather than read. Every case below is drawn from one that actually
 * happened — `collection.total` in three spellings, a runtime nil-compare that would have
 * silently never fired, and two keys each defining a `sharedPredicate` for the other.
 *
 * The three that matter most and are easiest to get wrong:
 *   - a sentinel is not an absence, and `requireNonNull` must fail on both
 *   - `refCount` is the integer that closes a registry's only hole
 *   - `definedBy` must name the key CARRYING the block, not the one being deferred to
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { parsePath, resolveRefs, sharedPredicateProblems } from '../refs.mjs';

/** A citing key: `refShape` 1, a registry, and a count. */
const citer = (refs, extra = {}) => ({
  refShape: 1,
  refSites: ['rows[*].targetRef'],
  refCount: refs.length,
  rows: refs.map((ref) => ({ targetRef: ref })),
  ...extra,
});

const field = (path, extra = {}) => ({ kind: 'manifestField', path, ...extra });

/** A small universe with one of each thing a path can land on. */
const UNIVERSE = {
  collection: {
    className: 'Relic',
    relicsPerArea: 4,
    sets: [
      { id: 'moss', relics: [{ name: 'Sprig' }, { name: 'Frond' }] },
      { id: 'stone', relics: [{ name: 'Chip' }] },
    ],
  },
  traversal: { fall: { maxSurvivableFallStuds: 'unbounded' } },
  products: { items: [{ label: 'Boost', gamePassId: 0 }] },
};

/* ------------------------------------------------------------------ parsePath */

test('parsePath accepts an identifier, a dotted chain and every quantifier', () => {
  for (const p of ['a', 'a.b', 'a[*].b', 'a[?].b', 'a[3]', 'a["moss"].relics[*].name']) {
    assert.equal(parsePath(p).error, undefined, p);
  }
});

test('parsePath rejects a bare numeric segment, so one field cannot have two spellings', () => {
  // `areas.0.patchCount` and `areas[0].patchCount` would both "work" until one did not.
  assert.match(parsePath('areas.0.patchCount').error, /not IDENT/);
  assert.match(parsePath('').error, /non-empty/);
  assert.match(parsePath('a..b').error, /not IDENT/);
  assert.match(parsePath('a[').error, /not IDENT/);
});

/* --------------------------------------------------------------------- walking */

test('a path that resolves is not reported, and counts as resolved', () => {
  const { problems, resolved } = resolveRefs(
    { ...UNIVERSE, kpis: citer([field('collection.sets[*].relics[*].name')]) }, []);
  assert.deepEqual(problems, []);
  assert.equal(resolved, 1);
});

test('the key exists and the field does not — the census case, five sheets, three spellings', () => {
  const { problems } = resolveRefs({ ...UNIVERSE, kpis: citer([field('collection.total')]) }, []);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /does not resolve. The key exists; the field does not/);
});

test('the head segment keeps its subscript — `upgrades[*].costBase` is not `costBase` on the array', () => {
  // Descending into `universe[head]` and walking `segs.slice(1)` drops the head's OWN
  // subscript, so an array-valued key could never be indexed and every citation of one
  // reported as unresolvable. Two of the resolver's first three real findings were this.
  const universe = {
    upgrades: [{ costBase: 25, costGrowth: 1.6 }, { costBase: 40, costGrowth: 1.5 }],
    kpis: citer([field('upgrades[*].costBase'), field('upgrades[1].costGrowth')]),
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

test('a path naming a key nobody supplies or proposes says so, rather than "does not resolve"', () => {
  const { problems } = resolveRefs({ ...UNIVERSE, kpis: citer([field('environment.perLaneInstances')]) }, []);
  assert.match(problems[0], /names key "environment", which no sheet supplies or proposes/);
});

test('[*] is ALL and fails if any element lacks the remainder; [?] is ANY and does not', () => {
  const universe = {
    zones: { areas: [{ tag: 'a' }, {}] },
    kpis: citer([field('zones.areas[*].tag')]),
  };
  assert.equal(resolveRefs(universe, []).problems.length, 1);
  universe.kpis = citer([field('zones.areas[?].tag')]);
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

test('[?] over an empty array is absent — there is no element to carry the remainder', () => {
  const { problems } = resolveRefs({ zones: { areas: [] }, kpis: citer([field('zones.areas[?].tag')]) }, []);
  assert.equal(problems.length, 1);
});

test('a string subscript may be bare or quoted, but a bare NUMBER stays illegal', () => {
  // Four sites across two domains wrote `customFields[saveState]`; none quoted. Bare is
  // unambiguous against *, ? and digits. `[0]` is not — it could be the index or a row whose
  // id is "0" — so that one stays a parse error.
  assert.equal(parsePath('funnels.customFields[saveState]').error, undefined);
  assert.equal(parsePath('telemetry.events[area_cleared].fields[3]').error, undefined);
  assert.match(parsePath('areas.0.patchCount').error, /not IDENT/);

  const universe = {
    funnels: { customFields: [{ id: 'saveState', values: ['pristine'] }] },
    kpis: citer([field('funnels.customFields[saveState].values[*]')]),
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

test('commandOutput takes a bundle as well as a single assertion', () => {
  // The KPI sheet registers one site carrying the five gate assertions, rather than five sites
  // saying the same thing about the same run. That is the better shape; the resolver insisted
  // on the flat form and was wrong.
  const bundle = {
    kind: 'commandOutput',
    assertions: [
      { command: 'npm run bridge', field: 'status', target: 'COMPLETE with 0 problems' },
      { command: 'npm test', field: 'failing', target: '0' },
    ],
  };
  assert.deepEqual(resolveRefs({ ...UNIVERSE, kpis: citer([bundle]) }, []).problems, []);

  const holed = { kind: 'commandOutput', assertions: [{ command: 'npm test' }] };
  const { problems } = resolveRefs({ ...UNIVERSE, kpis: citer([holed]) }, []);
  assert.match(problems[0], /assertions\[0\] kind commandOutput needs both/);
});

test('a quoted subscript selects a row by id, name or key', () => {
  const ok = resolveRefs({ ...UNIVERSE, kpis: citer([field('collection.sets["stone"].relics[*].name')]) }, []);
  assert.deepEqual(ok.problems, []);
  const bad = resolveRefs({ ...UNIVERSE, kpis: citer([field('collection.sets["quartz"].relics')]) }, []);
  assert.equal(bad.problems.length, 1);
});

test('a subscript works on a map as well as an array — the manifest keeps both', () => {
  // `tierMix.byDepth` is keyed "1".."4". `byDepth[*].expectedValuePerPatch` means exactly what
  // [*] means — every depth carries this field — and refusing it would push the author toward
  // a shorter path that checks less.
  const universe = {
    tierMix: {
      byDepth: {
        1: { weights: [38, 30], expectedValuePerPatch: 5.16 },
        2: { weights: [34, 29], expectedValuePerPatch: 5.85 },
      },
    },
    kpis: citer([field('tierMix.byDepth[*].expectedValuePerPatch'), field('tierMix.byDepth[2].weights[0]')]),
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);

  // On a map a numeric subscript is a KEY, not a position — object key order is not a contract.
  universe.kpis = citer([field('tierMix.byDepth[0]')]);
  assert.equal(resolveRefs(universe, []).problems.length, 1);
});

test('a row is selected by its identity field, and `surface` is one of them', () => {
  const universe = {
    firstSession: {
      withheld: [
        { surface: 'collectionCount', latched: false },
        { surface: 'upgradeRow', latched: true },
      ],
    },
    kpis: citer([field('firstSession.withheld["upgradeRow"].latched')]),
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

/* ------------------------------------------------------------------- sentinels */

test('a sentinel resolves — reading "unbounded" or 0 as an absence is the bug, not the check', () => {
  const universe = {
    ...UNIVERSE,
    kpis: citer([field('traversal.fall.maxSurvivableFallStuds'), field('products.items[*].gamePassId')]),
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

test('requireNonNull fails on a sentinel as well as on an absence, or it guards nothing', () => {
  // Written against explicit nulls; `deploy/02` replaced those with sentinels, and a guard
  // that only saw nulls would have gone quietly dead at that moment.
  const universe = {
    ...UNIVERSE,
    kpis: citer([field('traversal.fall.maxSurvivableFallStuds', { requireNonNull: true })]),
  };
  const { problems } = resolveRefs(universe, []);
  assert.match(problems[0], /resolves to a sentinel and this reference sets requireNonNull/);
});

/* ------------------------------------------------------------------ the registry */

test('refCount catches an omitted site — a registry\'s only hole, closed by an integer', () => {
  const key = citer([field('collection.className')]);
  key.refCount = 2;                       // the key says two; the registry expands to one
  const { problems } = resolveRefs({ ...UNIVERSE, kpis: key }, []);
  assert.match(problems[0], /refCount says 2 but its refSites expand to 1/);
});

test('refShape without refSites is a note, not a problem — the half-migrated key', () => {
  const { problems, notes } = resolveRefs({ telemetry: { refShape: 1 } }, []);
  assert.deepEqual(problems, []);
  assert.match(notes[0], /carries refShape 1 but no refSites\[\]/);
});

test('a refSites entry naming a field the key does not have is a problem', () => {
  const { problems } = resolveRefs({ kpis: { refShape: 1, refSites: ['rows[*].nope'], rows: [{}] } }, []);
  assert.match(problems[0], /names "rows\[\*\].nope", which does not exist in this key/);
});

test('outside a registered site a `kind` field means nothing', () => {
  // `economyHealth.readings[].alarm[].kind` is live with disjoint values. A deep walker would
  // try to resolve an alarm as a reference; a registry cannot see it at all.
  const universe = {
    economyHealth: {
      refShape: 1,
      refSites: ['rows[*].targetRef'],
      refCount: 1,
      rows: [{ targetRef: field('collection.className') }],
      readings: [{ alarm: [{ kind: 'relative' }, { kind: 'invariant' }] }],
    },
    ...UNIVERSE,
  };
  assert.deepEqual(resolveRefs(universe, []).problems, []);
});

/* ----------------------------------------------------------------------- kinds */

test('kind dispatches, and a missing path is never inferred from a null', () => {
  const cases = [
    [{ path: 'collection.className' }, /must carry "kind"/],
    [{ kind: 'manifestField' }, /kind manifestField must carry a "path"/],
    [{ kind: 'briefLine' }, /kind briefLine must name the "sheet"/],
    [{ kind: 'commandOutput', command: 'npm run bridge' }, /needs both "command" and "field"/],
    [{ kind: 'vibes' }, /unknown reference kind "vibes"/],
  ];
  for (const [ref, expected] of cases) {
    const { problems } = resolveRefs({ ...UNIVERSE, kpis: citer([ref]) }, []);
    assert.match(problems[0], expected, JSON.stringify(ref));
  }
});

test('briefLine and commandOutput resolve without touching the manifest', () => {
  const refs = [
    { kind: 'briefLine', sheet: 'concept/spec/x/03-loop.md' },
    { kind: 'commandOutput', command: 'npm run bridge', field: 'supplied' },
  ];
  assert.deepEqual(resolveRefs({ ...UNIVERSE, kpis: citer(refs) }, []).problems, []);
});

test('alsoReads is resolved with the same walker as path', () => {
  const ref = field('collection.className', { alsoReads: ['collection.relicsPerArea', 'upgrades[*].costBase'] });
  const { problems } = resolveRefs({ ...UNIVERSE, kpis: citer([ref]) }, []);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /alsoReads "upgrades\[\*\].costBase" names unknown key "upgrades"/);
});

/* ------------------------------------------------------------------- proposals */

test('a proposal is part of the universe, and citing one counts as pending rather than resolved', () => {
  const { problems, resolved, pending } = resolveRefs(
    { kpis: citer([field('screens.list[*].id')]) },
    [{ key: 'screens', value: { list: [{ id: 'shop' }] } }]);
  assert.deepEqual(problems, []);
  assert.equal(resolved, 0);
  assert.equal(pending, 1);
});

/* ------------------------------------------------------------ sharedPredicate */

test('definedBy must name the key carrying the block', () => {
  // Without this, two keys can each define a block for the other's field — reproducing the
  // inversion inside the mechanism built to prevent it. Twice observed, not hypothetical.
  const problems = sharedPredicateProblems({
    funnels: { sharedPredicate: { definedBy: 'telemetry', field: 'funnels.gate', readBy: [] } },
  });
  assert.match(problems[0], /definedBy is "telemetry", not "funnels"/);
});

test('field must be a path, so two blocks at "CustomField03" cannot collide falsely', () => {
  const problems = sharedPredicateProblems({
    funnels: { sharedPredicate: { definedBy: 'funnels', field: 'CustomField03', readBy: [] } },
  });
  assert.equal(problems.length, 0, 'a bare identifier is a legal one-segment path');

  const bad = sharedPredicateProblems({
    funnels: { sharedPredicate: { definedBy: 'funnels', field: 'funnels.rows.0.gate', readBy: [] } },
  });
  assert.match(bad[0], /must be a path, not a bare name/);
});

test('one fact, one home — a second key claiming the same field is a problem', () => {
  const sp = (definedBy) => ({ definedBy, field: 'funnels.gate', readBy: [] });
  const problems = sharedPredicateProblems({
    funnels: { sharedPredicate: sp('funnels'), gate: true },
    telemetry: { sharedPredicate: { ...sp('telemetry'), field: 'funnels.gate' } },
  });
  assert.ok(problems.some((p) => /already claimed by funnels. One fact, one home/.test(p)));
});

test('readBy paths are resolved, not just parsed', () => {
  const problems = sharedPredicateProblems({
    funnels: {
      gate: true,
      sharedPredicate: {
        definedBy: 'funnels',
        field: 'funnels.gate',
        readBy: ['collection.className', 'collection.total', 'funnels.rows.0.gate'],
      },
    },
    ...UNIVERSE,
  });
  assert.equal(problems.length, 2);
  assert.ok(problems.some((p) => /"collection.total" does not resolve/.test(p)));
  assert.ok(problems.some((p) => /"funnels.rows.0.gate" is not a legal path/.test(p)));
});
