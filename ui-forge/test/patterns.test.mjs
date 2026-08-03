/**
 * Pattern registry + capability contract.
 *
 * ui-forge had no tests. These cover the invariants that actually broke while
 * adding a second pattern, rather than the ones that felt testable:
 *
 *  - the compiler used to hardcode modal-grid's content shape, so no other
 *    pattern could ever validate
 *  - `auto: 'x'` was accepted by the spec vocabulary and silently ignored by
 *    *both* the HTML preview and the Luau runtime, so an element asking to size
 *    to its content collapsed in each. Both being wrong the same way is what hid
 *    it: the render loop can only catch a preview/engine divergence, not a
 *    shared blind spot.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { PATTERNS, capabilities, validateBrief, compose } from '../src/compose/index.mjs';
import { badFontMembers, ENUM_FONT_MEMBERS } from '../src/theme/palettes.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');

const hudBrief = () => ({
  screen: 'hud',
  pattern: 'hud-overlay',
  variant: { layout: 'corners', readoutStyle: 'pill', bar: 'chunky', density: 'comfortable', anchor: 'inset' },
  ornament: { readoutTrim: 'none', barCap: 'round' },
  content: {
    readouts: [{ label: 'RELICS', value: '7 / 24', icon: 'relic', cluster: 'topLeft' }],
    progress: { label: 'EAST TERRACE', value: 0.62, cluster: 'bottomLeft' },
    actions: [{ name: 'Collection', icon: 'icon-collection' }],
  },
});

/* ------------------------------------------------------- capability contract */

test('every registered pattern declares a content contract', () => {
  // The invariant that made this registry single-pattern in practice however
  // open it looked: content rules lived in the compiler, shaped like modal-grid.
  for (const [id, entry] of Object.entries(PATTERNS)) {
    assert.equal(typeof entry.meta.validateContent, 'function',
      `pattern "${id}" must declare meta.validateContent`);
  }
});

test('every registered pattern declares id, summary and a variant space', () => {
  for (const [id, entry] of Object.entries(PATTERNS)) {
    assert.equal(entry.meta.id, id, `meta.id must match its registry key`);
    assert.ok(entry.meta.summary?.length > 20, `${id} needs a real summary`);
    assert.ok(Object.keys(entry.meta.variant ?? {}).length > 0, `${id} needs a variant space`);
  }
});

test('capabilities() reports both patterns with their override targets', () => {
  const caps = capabilities();
  assert.deepEqual(Object.keys(caps).sort(), ['hud-overlay', 'modal-grid']);
  for (const [id, c] of Object.entries(caps)) {
    assert.ok(c.overrideTargets.length > 0, `${id} must expose override targets`);
  }
});

/* --------------------------------------------------------------- validation */

test('an unknown pattern is rejected by name, and lists what is available', () => {
  const problems = validateBrief({ pattern: 'radial-wheel', content: {} });
  assert.match(problems.join('\n'), /unknown pattern "radial-wheel"/);
  assert.match(problems.join('\n'), /hud-overlay/);
});

test('a variant value outside the declared range is rejected', () => {
  const b = hudBrief();
  b.variant.layout = 'left-rail';
  assert.match(validateBrief(b).join('\n'), /variant\.layout .* out of range/);
});

test('modal-grid still enforces its own content shape', () => {
  const problems = validateBrief({ pattern: 'modal-grid', content: { title: 'SHOP', items: [] } });
  assert.match(problems.join('\n'), /content\.items must be a non-empty array/);
});

test('a HUD brief is not judged against modal-grid content rules', () => {
  // The regression that mattered: a HUD has no title and no priced items.
  const problems = validateBrief(hudBrief());
  assert.deepEqual(problems, []);
});

test('hud-overlay requires at least one readout', () => {
  const b = hudBrief();
  b.content.readouts = [];
  assert.match(validateBrief(b).join('\n'), /content\.readouts must be a non-empty array/);
});

test('hud-overlay rejects a progress value outside 0..1', () => {
  for (const value of [-0.1, 1.4, 'most of it']) {
    const b = hudBrief();
    b.content.progress.value = value;
    assert.match(validateBrief(b).join('\n'), /content\.progress\.value must be a number from 0 to 1/,
      `should reject ${JSON.stringify(value)}`);
  }
});

test('hud-overlay rejects an unknown cluster, and names the legal ones', () => {
  const b = hudBrief();
  b.content.readouts[0].cluster = 'middle';
  const problems = validateBrief(b).join('\n');
  assert.match(problems, /is not a cluster/);
  assert.match(problems, /topLeft/);
});

/* ------------------------------------------------------------------ compose */

test('a HUD root is transparent — the player is looking through it', () => {
  // The defining property of the pattern. A HUD with a filled root is a panel.
  const spec = compose(hudBrief());
  assert.equal(spec.root.bgTransparency, 1);
  assert.equal(spec.root.bg, undefined);
});

test('a HUD is focused on the whole viewport, not a panel', () => {
  // Cropping a HUD screenshot to a panel would hide where it sits relative to
  // the screen edges, which is the only thing worth reviewing about a HUD.
  assert.equal(compose(hudBrief()).focus, 'Root');
});

test('progress fill width is the clamped fraction, so it needs no runtime script', () => {
  const spec = compose(hudBrief());
  const found = [];
  (function walk(n) {
    if (n.name === 'BarFill') found.push(n);
    (n.children ?? []).forEach(walk);
  })(spec.root);
  assert.equal(found.length, 1);
  assert.equal(found[0].size.s[0], 0.62);
});

test('a readout with no assigned cluster is still placed rather than dropped', () => {
  const b = hudBrief();
  b.content.readouts.push({ label: 'WIND', value: '12kt' });
  const spec = compose(b);
  const names = [];
  (function walk(n) { names.push(n.name); (n.children ?? []).forEach(walk); })(spec.root);
  assert.ok(names.includes('Readout_WIND'), 'unassigned readout must appear somewhere');
});

/* ---------------------------------------------- preview/engine agreement */

test('the HTML preview and the Luau runtime support the same AutomaticSize arms', () => {
  // These two are the fidelity contract. When they disagree, the preview approves
  // a layout the engine cannot produce — or, as happened here, both omit the same
  // arm and the render loop reports "clean" on collapsed output.
  const html = readFileSync(join(repo, 'ui-forge/src/transpile/to-html.mjs'), 'utf8');
  const luau = readFileSync(join(repo, 'game/src/shared/UIBuilder.luau'), 'utf8');

  for (const arm of ['x', 'y', 'xy']) {
    assert.match(html, new RegExp(`auto === '${arm}'`),
      `to-html.mjs must handle auto: '${arm}'`);
    assert.match(luau, new RegExp(`node\\.auto == "${arm}"`),
      `UIBuilder.luau must handle auto: '${arm}'`);
  }
  for (const enumArm of ['AutomaticSize.X', 'AutomaticSize.Y', 'AutomaticSize.XY']) {
    assert.ok(luau.includes(`Enum.${enumArm}`), `UIBuilder.luau must set Enum.${enumArm}`);
  }
});

/* ---------------------------------------------------------------- font stacks */

test('every font stack names a real Enum.Font member', () => {
  // `serif-ui.numeric` shipped `MerriweatherBold`, which the engine does not have. The comment
  // above FONT_STACKS already said the values were valid, which is precisely as much protection
  // as a comment provides.
  //
  // The reason this is a test and not a lint: `UIBuilder.luau:482` reads
  // `(Enum.Font :: any)[t.font] or Enum.Font.Gotham`, and indexing an Enum with an absent
  // member RAISES rather than returning nil. The fallback cannot run. Every `numeric`-typed
  // node in the archetype throws, and the code that looks like it handles this is the code
  // that guarantees it won't.
  assert.deepEqual(badFontMembers(), []);
});

test('a stack naming an invented face is caught', () => {
  assert.ok(!ENUM_FONT_MEMBERS.has('MerriweatherBold'), 'the member that started this');
  assert.ok(ENUM_FONT_MEMBERS.has('Merriweather'), 'the one that replaced it');
});
