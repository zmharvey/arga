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

test('a boundary that is entirely a table says so and names the sheet', async () => {
  // The other half of the case above. When the section hands off *only* through a table,
  // dropping the rows leaves punctuation: one real sheet's boundary rendered as `` `. --- ``,
  // which occupies the cell a writer is told to trust and looks like content. A wave-2
  // writer reported the column unusable for about six rows because of it.
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X

## Decision
The real call.

## Not decided here

| # | class | owner |
|---|---|---|
| 1 | stone | art |
| 2 | glass | art |
`,
  });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });
  assert.match(rows[0].notDecidedHere, /hands off through a 2-row table/);
  assert.match(rows[0].notDecidedHere, /a\/b\/01-x\.md/, 'must name the sheet to go read');
});

test('an over-long boundary is cut at a word, not mid-word', async () => {
  // "…the collection st" reads as a truncated thought rather than a truncated string, so a
  // reader cannot tell whether the sheet trailed off or the digest did.
  const long = `word${'y'} `.repeat(400).trim();
  const dir = await fixture({
    'a/b/01-x.md': `# 01 — X\n\n## Decision\nCall.\n\n## Not decided here\n${long}\n`,
  });
  const rows = await sheetDigest(dir);
  await rm(dir, { recursive: true, force: true });
  const cut = rows[0].notDecidedHere;
  assert.ok(cut.endsWith('…'), 'a truncated cell must say it was truncated');
  assert.doesNotMatch(cut, /word…$/, 'must not sever a word');
  assert.ok(cut.length > 1000, `the boundary column carries ~1200 chars, got ${cut.length}`);
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

test('a brief file in a subdirectory keeps its path, because the pack joins it back on', async () => {
  // `research/landscape.md` came back as `landscape.md`, and the pack renders
  // `join(brief, name)` — so every writer since wave 1 was told to read
  // `<brief>/landscape.md`, which does not exist. Two wave-2 writers reported the Read
  // failing; HANDOFF.md says of one of those two files, "read this".
  const dir = await fixture({
    '00-CORE.md': 'core\n',
    'research/landscape.md': 'why the noun cannot differentiate\n',
  });
  const { parts } = await briefSlice(dir);
  await rm(dir, { recursive: true, force: true });
  assert.deepEqual(parts.map((p) => p.name).sort(), ['00-CORE.md', 'research/landscape.md']);
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
  const { mine, others } = contractSlice('gameplay/systems');
  assert.deepEqual(mine.map((k) => k.key).sort(), ['currency', 'tiers']);
  assert.ok(others.length > 0);
  assert.ok(!others.some((k) => k.owner === 'gameplay/systems'));
});

test('the creative contract owns no technical key', async () => {
  // `modules`, `runtime` and the state shape moved to `architect/` once two build trials
  // showed that ~15 of 21 things stopping a builder were not creative questions. CID's
  // "Tech & Data" category was a category error, and this is the guard against it
  // reappearing: no creative domain may own a technical key again.
  const { SCHEMA } = await import('../schema.mjs');
  const { TECH_SCHEMA } = await import('../../architect/schema.mjs');
  const overlap = Object.keys(SCHEMA).filter((k) => k in TECH_SCHEMA);
  assert.deepEqual(overlap, [], `in both contracts: ${overlap.join(', ')}`);
  assert.ok(!Object.values(SCHEMA).some((s) => s.owner.startsWith('tech/')),
    'no creative key may be owned by a tech/* domain');
});

test('a domain owning nothing gets an empty list, not an error', async () => {
  const { mine, others } = contractSlice('theme/tone');
  assert.deepEqual(mine, []);
  assert.ok(others.length >= 9, 'every key belongs to somebody else');
});

/* ------------------------------ a domain that owns no contract key */

test('every contract owner is a real domain path', async () => {
  // The simplification rule's other half. `cid:verify` warns for a domain with sheets and no
  // key; this catches the reverse typo, where a key names an owner that could never exist.
  const { SCHEMA } = await import('../schema.mjs');
  for (const [key, spec] of Object.entries(SCHEMA)) {
    assert.match(spec.owner, /^[a-z-]+\/[a-z-]+$/, `${key}'s owner should be category/domain`);
  }
});

test('contractSlice tells a keyless domain plainly that it owns nothing', async () => {
  // What a domain lead now acts on: no key means assign nothing, rather than write prose.
  const { mine, others } = contractSlice('theme/lore');
  assert.deepEqual(mine, []);
  assert.ok(others.length >= 9);
});
