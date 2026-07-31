/**
 * The derivations that make a CID wave affordable.
 *
 * Same argument as `bridge.test.mjs` makes for correctness. Those tests cover checks a
 * verifier agent used to do by reading prose; these cover context assembly a *writer*
 * agent used to do by reading its siblings and re-fetching pages other writers had
 * already fetched.
 *
 * The cases worth having are the ones that were actually wrong on the first run:
 * a table in a "Not decided here" section flattening into `. / # / class / bound by /`
 * and reading as content, and repo-file citations being counted as external fetches,
 * which inflated the estimate this whole change was justified by.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  sheetDigest,
  renderDigest,
  researchPack,
  renderPack,
  packUrls,
  briefSlice,
  contractSlice,
} from '../context.mjs';

async function fixture(files) {
  const dir = await mkdtemp(join(tmpdir(), 'cid-ctx-'));
  for (const [rel, body] of Object.entries(files)) {
    const full = join(dir, rel);
    await mkdir(join(full, '..'), { recursive: true });
    await writeFile(full, body, 'utf8');
  }
  return dir;
}

const SHEET = `# 01 — Register

## Decision
Every string is third person, at most 8 words.

## Why
Because. [brief: binding]

\`\`\`manifest
{ "provides": "vocabulary", "value": { "register": "plain" } }
\`\`\`

## Acceptance criteria
1. no exclamation marks

## Not decided here
Rendered typography (UI/UX). The actual error strings (nobody owns them).
`;

/* ------------------------------------------------------------------ digest */

test('digest carries the decision, the contract key and the boundary', async () => {
  const dir = await fixture({ 'theme/tone/01-register.md': SHEET });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });

  assert.equal(rows.length, 1);
  assert.equal(rows[0].path, 'theme/tone/01-register');
  assert.equal(rows[0].domain, 'theme/tone');
  assert.match(rows[0].decision, /third person, at most 8 words/);
  assert.deepEqual(rows[0].provides, ['vocabulary']);
  assert.match(rows[0].notDecidedHere, /Rendered typography/);
});

test('an index is not a sheet', async () => {
  const dir = await fixture({
    'theme/tone/_lead.md': '# Tone — domain index\n\n## Decision\nnot a sheet\n',
    'theme/tone/01-register.md': SHEET,
    'theme/_category.md': '# Theme\n',
  });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual(rows.map((r) => r.path), ['theme/tone/01-register']);
});

test('a markdown table in a section is dropped, not flattened into noise', async () => {
  // The first run turned a handoff table into `. / # / class present / bound by /---/`,
  // which reads as content. An honest omission beats convincing garbage in a digest
  // every later writer trusts.
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X

## Decision
The real call.

## Not decided here
Prose that should survive.

| # | class | owner |
|---|---|---|
| 1 | stone | art |
`,
  });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });
  assert.equal(rows[0].notDecidedHere, 'Prose that should survive.');
  assert.doesNotMatch(rows[0].notDecidedHere, /---/);
});

test('a sheet with no Decision section says so rather than going blank', async () => {
  const dir = await fixture({ 'a/b/01-x.md': '# 01 — X\n\n## Why\nnope\n' });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });
  assert.equal(rows[0].decision, '(no ## Decision)');
});

test('digest renders one row per sheet and escapes pipes out of the cells', async () => {
  const dir = await fixture({
    'a/b/01-x.md': '# 01 — X\n\n## Decision\nA | B | C\n\n## Not decided here\nnothing\n',
  });
  const body = renderDigest(await sheetDigest(dir));
  await rm(dir, { recursive: true, force: true });
  const rows = body.trim().split('\n');
  assert.equal(rows.length, 3); // header, separator, one row
  assert.equal(rows[2].split('|').length, 6); // 4 cells => 6 pieces, so no stray pipe
});

test('digest is far smaller than the sheets it stands in for', async () => {
  const long = `# 01 — X\n\n## Decision\nshort.\n\n## Why\n${'filler line\n'.repeat(400)}`;
  const dir = await fixture({ 'a/b/01-x.md': long, 'a/b/02-y.md': long });
  const rows = await sheetDigest(dir);
  const body = renderDigest(rows);
  await rm(dir, { recursive: true, force: true });

  const sheetLines = rows.reduce((n, r) => n + r.lines, 0);
  assert.ok(sheetLines > 800);
  assert.ok(body.split('\n').length < 10, 'two 400-line sheets must digest to a handful of lines');
});

/* ---------------------------------------------------------------- research */

test('only http(s) citations enter the pack; repo-file citations do not', async () => {
  // This exact confusion produced a 5x overestimate of the duplication. 141 of wave 1's
  // 198 tags name a repo file. A local read is not what cost anything.
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X

## Decision
d

## Why
- Store copy is exclamatory. [research: https://www.roblox.com/games/1/Grass]
- The schema hard-fails long plurals. [research: bridge/schema.mjs — read this run]
- Also this. [research: bridge/schema.mjs, bridge/cli.mjs]
`,
  });
  const entries = await researchPack(dir);
  await rm(dir, { recursive: true, force: true });

  assert.deepEqual(entries.map((e) => e.url), ['https://www.roblox.com/games/1/Grass']);
  assert.equal(entries.fileCitations, 2);
});

test('one URL cited by two sheets is one entry that names both', async () => {
  const url = 'https://www.roblox.com/games/1/Grass';
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X\n\n## Why\n- Claim one. [research: ${url}]\n`,
    'a/c/01-y.md': `# 01 — Y\n\n## Why\n- Claim two. [research: ${url}]\n`,
  });
  const entries = await researchPack(dir);
  await rm(dir, { recursive: true, force: true });

  assert.equal(entries.length, 1);
  assert.deepEqual(entries[0].citedBy, ['a/b/01-x', 'a/c/01-y']);
  assert.equal(entries[0].claims.length, 2, 'both claims survive; the page is fetched once');
});

test('the claim attached to a citation is the bullet it sits in', async () => {
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X

## Why
- Unrelated bullet with no source.
- The genre self-describes as relaxing. [research: https://example.com/a]
`,
  });
  const entries = await researchPack(dir);
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual(entries[0].claims, ['The genre self-describes as relaxing.']);
});

test('rebuilding the pack does not fold the pack into itself', async () => {
  const url = 'https://example.com/a';
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X\n\n## Why\n- Claim. [research: ${url}]\n`,
  });
  const first = await researchPack(dir);
  await mkdir(join(dir, '_research'), { recursive: true });
  await writeFile(join(dir, '_research', 'pack.md'), renderPack(first), 'utf8');
  const second = await researchPack(dir);
  await rm(dir, { recursive: true, force: true });

  assert.deepEqual(second.map((e) => e.url), first.map((e) => e.url));
  assert.deepEqual(second[0].citedBy, ['a/b/01-x'], 'the pack must not cite itself');
});

test('packUrls reads back exactly what renderPack wrote', async () => {
  const urls = ['https://example.com/a', 'https://www.roblox.com/games/1/Grass'];
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X\n\n## Why\n${urls.map((u) => `- C. [research: ${u}]`).join('\n')}\n`,
  });
  const body = renderPack(await researchPack(dir));
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual([...packUrls(body)].sort(), [...urls].sort());
});

test('trailing sentence punctuation is not swallowed into the URL', async () => {
  const dir = await fixture({
    'a/b/01-x.md': '# 01 — X\n\n## Why\n- C. [research: https://example.com/a].\n',
  });
  const entries = await researchPack(dir);
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual(entries.map((e) => e.url), ['https://example.com/a']);
});

/* ------------------------------------------------------------------- brief */

test('briefSlice drops VERIFIED.md and reports what it actually dropped', async () => {
  const dir = await fixture({
    '00-CORE.md': 'core\n'.repeat(10),
    'VERIFIED.md': 'report\n'.repeat(90),
  });
  const { parts, lines, excluded, excludedLines } = await briefSlice(dir);
  await rm(dir, { recursive: true, force: true });

  assert.deepEqual(parts.map((p) => p.name), ['00-CORE.md']);
  assert.deepEqual(excluded.map((e) => e.name), ['VERIFIED.md']);
  assert.equal(excludedLines, 91);
  assert.ok(excludedLines > lines, 'the process artifact outweighed the design content');
});

test('a brief with no process artifact reports no exclusions', async () => {
  const dir = await fixture({ '00-CORE.md': 'core\n' });
  const { excluded, excludedLines } = await briefSlice(dir);
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual(excluded, []);
  assert.equal(excludedLines, 0);
});

/* ---------------------------------------------------------------- contract */

test('contractSlice splits the contract into mine and everyone else', async () => {
  const { mine, others } = contractSlice('tech/architecture');
  assert.deepEqual(mine.map((k) => k.key).sort(), ['modules', 'runtime']);
  assert.ok(others.length > 0);
  assert.ok(!others.some((k) => k.owner === 'tech/architecture'));
});

test('a domain owning nothing gets an empty list, not an error', async () => {
  const { mine, others } = contractSlice('theme/tone');
  assert.deepEqual(mine, []);
  assert.ok(others.length >= 11, 'every key belongs to somebody else');
});
