#!/usr/bin/env node
/**
 * The checkable half of a CID category verification.
 *
 * A verifier agent costs ~150-200k tokens a pass and is genuinely good at the half that
 * needs judgement: does this tone rule contradict that fantasy, is this claim occupied,
 * would this actually break. It is a waste of money on the half that does not — does the
 * index match the disk, does every sheet carry acceptance criteria, is a manifest block
 * sitting in a domain that does not own the key.
 *
 * This is that second half. It ran because the first half could not: the org hit its
 * monthly spend limit mid-verification. It should run first regardless, so an agent's
 * budget goes on judgement rather than on counting.
 *
 *   npm run cid:verify
 *   npm run cid:verify -- --category theme
 *
 * Exit 1 on any failure.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, basename, dirname } from 'node:path';
import { SCHEMA, playerFacingStrings } from './schema.mjs';
import { mergeSheets } from './merge.mjs';
import { packUrls } from './context.mjs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const ROOT = opt('root', 'cid');
const only = opt('category', null);

const REQUIRED_SECTIONS = ['## Decision', '## Acceptance criteria'];
const TAG = /\[(brief: (binding|soft)|cid: decided|research:|playtest unknown|unverified)/;

const fails = [];
const warns = [];
const notes = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full));
    else if (e.name.endsWith('.md')) out.push(full);
  }
  return out.sort();
}

const files = await walk(ROOT);
const leaves = files.filter((f) => /\/\d\d-[^/]+\.md$/.test(f));
const indexes = files.filter((f) => f.endsWith('_lead.md'));

const scoped = (f) => !only || f.includes(`${ROOT}/${only}/`);

/* ------------------------------------------------- 1. index matches the disk */

for (const idx of indexes.filter(scoped)) {
  const domain = dirname(idx);
  const body = await readFile(idx, 'utf8');
  const planned = [...body.matchAll(/^\|\s*(\d+)\s*\|\s*`([^`]+)`/gm)].map((m) => `${m[1]}-${m[2]}`);
  const onDisk = leaves.filter((f) => dirname(f) === domain).map((f) => basename(f, '.md'));

  for (const p of planned) {
    if (!onDisk.includes(p)) fails.push(`${relative(ROOT, idx)}: plans "${p}" but no such sheet exists`);
  }
  for (const d of onDisk) {
    if (!planned.includes(d)) {
      warns.push(`${relative(ROOT, domain)}/${d}.md exists but its index does not plan it`);
    }
  }
  if (planned.length) notes.push(`${relative(ROOT, domain).padEnd(22)} ${onDisk.length}/${planned.length} sheets`);
}

/* --------------------------------------------- 2. every leaf is well formed */

for (const f of leaves.filter(scoped)) {
  const rel = relative(ROOT, f);
  const body = await readFile(f, 'utf8');

  for (const section of REQUIRED_SECTIONS) {
    if (!body.includes(section)) fails.push(`${rel}: missing "${section}"`);
  }

  // Acceptance criteria are what make a sheet checkable by anyone downstream. A sheet
  // without them is an opinion.
  const acc = body.split('## Acceptance criteria')[1] ?? '';
  const criteria = [...acc.split(/\n## /)[0].matchAll(/^\d+\.\s+\S/gm)].length;
  if (criteria === 0) fails.push(`${rel}: no numbered acceptance criteria`);
  else if (criteria > 8) warns.push(`${rel}: ${criteria} acceptance criteria — likely a list of wishes rather than tests`);

  if (!TAG.test(body)) fails.push(`${rel}: carries no provenance tag, so a reader cannot tell what is binding`);

  if (!body.includes('## Not decided here')) {
    warns.push(`${rel}: no "Not decided here" — every sheet has a boundary and stating it prevents two sheets claiming one subject`);
  }
}

/* ------------------------------- 3. a manifest block must sit with its owner */

for (const f of files.filter(scoped)) {
  const rel = relative(ROOT, f);
  const body = await readFile(f, 'utf8');
  for (const m of body.matchAll(/```manifest\s*\n([\s\S]*?)\n```/g)) {
    let block;
    try { block = JSON.parse(m[1]); } catch { continue; } // merge.mjs reports the parse error
    const spec = SCHEMA[block.provides];
    if (!spec) continue;
    // The graph says each key has one owning domain. A block in the wrong domain still
    // merges cleanly today, which is exactly why it is worth catching here.
    const domain = relative(ROOT, dirname(f));
    if (domain !== spec.owner) {
      fails.push(`${rel}: provides "${block.provides}" but the contract says ${spec.owner} owns it`);
    }
  }
}

/* --------------------------- 4. one word, one spelling, in player-facing text */

// The instance this was written for: `area.label` is "EAST TERRACE" while
// `collection.sets[0].label` is "Terrace". Three separate sheets ordered a re-casing
// independently, which is three agents paid to notice one string comparison.
//
// Scoped to player-facing strings only. A slug and its display label are *supposed* to
// differ — `id: "value"` beside `label: "VALUE"` is the schema working, not a defect —
// and comparing them flagged six false positives on the first run.
{
  const { manifest } = await mergeSheets(ROOT);
  const seen = new Map(); // lowercase -> Map(spelling -> [paths])
  for (const { path, value } of playerFacingStrings(manifest)) {
    if (!/^[A-Za-z][A-Za-z ]{2,20}$/.test(value)) continue;
    const k = value.toLowerCase();
    if (!seen.has(k)) seen.set(k, new Map());
    const m = seen.get(k);
    if (!m.has(value)) m.set(value, []);
    m.get(value).push(path);
  }
  for (const [lower, spellings] of seen) {
    if (spellings.size > 1) {
      const detail = [...spellings].map(([sp, paths]) => `"${sp}" (${paths.join(', ')})`).join(' vs ');
      fails.push(`"${lower}" is spelled ${spellings.size} ways in player-facing text: ${detail}`);
    }
  }
}

/* ------------------------------- 5. one casing convention, not two */

// What three sheets actually found. `area.label` is "EAST TERRACE" and
// `upgrades[].label` are "VALUE"/"REACH"/"PACE", while every other player-facing label is
// Title Case: "Terrace", "Cistern", "Shard", "Moss". Same-string comparison misses it
// because these are different words — the defect is that the game shouts in some places
// and not others.
//
// A warning, not a failure: which convention wins is a judgement that crosses a category
// boundary (Tone's register versus values owned by gameplay/meta and gameplay/balance),
// and it should be ruled on rather than auto-corrected.
{
  const { manifest } = await mergeSheets(ROOT);
  const labels = playerFacingStrings(manifest)
    .filter(({ path }) => !/\.(blurb|flavour)$/.test(path))
    .filter(({ value }) => /^[A-Za-z][A-Za-z ]*$/.test(value));
  const shouted = labels.filter(({ value }) => value === value.toUpperCase() && value.length > 1);
  const titled = labels.filter(({ value }) => value !== value.toUpperCase());
  if (shouted.length && titled.length) {
    warns.push(`player-facing labels use two casing conventions: ${shouted.length} all-caps `
      + `(${shouted.slice(0, 4).map((s) => `"${s.value}"`).join(', ')}) and ${titled.length} title-case `
      + `(${titled.slice(0, 4).map((s) => `"${s.value}"`).join(', ')}). Pick one — Tone's register forbids runs of capitals.`);
  }
}

/* ------------------------- 6. a cited URL must be in the research pack */

// The old rule was "never write [research: url] unless you fetched that URL in this run",
// which nothing could check, so nothing did. With fetching moved to one batched pass and
// removed from the writer's toolset, the rule becomes "cite the pack" — and that is
// checkable, which is the only kind of rule worth writing.
//
// Repo-file citations are exempt. 141 of wave 1's 198 tags name a file like
// `bridge/schema.mjs`; a local read is not what cost anything and does not need a pack.
{
  let pack = null;
  try {
    pack = packUrls(await readFile(join(ROOT, '_research', 'pack.md'), 'utf8'));
  } catch {
    warns.push('no cid/_research/pack.md — run `npm run cid:research`. Until it exists, '
      + 'citations cannot be checked and writers have no source to cite.');
  }

  if (pack) {
    const owed = [];
    for (const f of files.filter(scoped)) {
      if (f.includes(`${ROOT}/_research/`)) continue;
      const rel = relative(ROOT, f);
      const body = await readFile(f, 'utf8');
      for (const m of body.matchAll(/\[research:\s*(https?:\/\/[^\s\]]+)/g)) {
        const url = m[1].replace(/[.,;)]+$/, '');
        if (!pack.has(url)) {
          fails.push(`${rel}: cites ${url}, which is not in the research pack. Either the `
            + 'pack is stale (`npm run cid:research`) or the sheet fetched on its own.');
        }
      }
      const n = [...body.matchAll(/\[research owed:/g)].length;
      if (n) owed.push(`${rel} (${n})`);
    }
    if (owed.length) {
      notes.push(`research owed: ${owed.join(', ')} — batch these into one fetch pass`);
    }
  }
}

/* ------------------------------------- 7. sheet length */

// 86% of wave 1's 9,343 sheet lines were prose that the writer definition itself says
// nothing downstream reads. This does not fail a build, so it warns rather than fails —
// but it is the difference between a wave that fits in a session and one that does not.
{
  const long = [];
  for (const f of leaves.filter(scoped)) {
    const n = (await readFile(f, 'utf8')).split('\n').length;
    if (n > 120) long.push({ rel: relative(ROOT, f), n });
  }
  if (long.length) {
    long.sort((a, b) => b.n - a.n);
    const excess = long.reduce((t, l) => t + l.n - 120, 0);
    warns.push(`${long.length} sheet(s) over the 120-line budget by ${excess} lines total. `
      + `Worst: ${long.slice(0, 3).map((l) => `${l.rel} (${l.n})`).join(', ')}. `
      + 'Every line here is also paid by every later writer that reads the digest.');
  }
}

/* ----------------------------------------------------------------- report */

console.log(`\ncid:verify — ${leaves.length} leaf sheet(s), ${indexes.length} index(es)${only ? ` [${only}]` : ''}\n`);
for (const n of notes) console.log(`  · ${n}`);
if (fails.length || warns.length) console.log('');
for (const f of fails) console.log(`  FAIL  ${f}`);
for (const w of warns) console.log(`  WARN  ${w}`);
console.log(`\n${fails.length ? 'FAIL' : 'PASS'} — ${fails.length} failure(s), ${warns.length} warning(s)`);
console.log('\nThis is the mechanical half only. Contradiction, occupancy and feasibility still');
console.log('need the concept-verifier agent; run it once this is clean so its budget goes on');
console.log('judgement rather than on counting.\n');
process.exit(fails.length ? 1 : 0);
