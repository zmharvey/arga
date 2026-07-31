#!/usr/bin/env node
/**
 * The CID -> build seam.
 *
 *   npm run bridge                     merge and report coverage
 *   npm run bridge -- --emit           also write game/src/shared/GameConfig.luau
 *   npm run bridge -- --contract       print what a build needs and who owns it
 *   npm run bridge -- --root cid       read sheets from somewhere else
 *
 * Exit 1 if the manifest is incomplete or invalid, so this can gate a build.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { mergeSheets } from './merge.mjs';
import { emitGameConfig } from './emit-config.mjs';
import { contract } from './schema.mjs';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

if (flag('contract')) {
  console.log('\nWhat a build needs, and which sheet owns it:\n');
  for (const { key, doc, owner } of contract()) {
    console.log(`  ${key.padEnd(12)} ${owner.padEnd(22)} ${doc}`);
  }
  console.log('\nEvery key was something a builder had to invent by hand. See bridge/schema.mjs.\n');
  process.exit(0);
}

const root = resolve(opt('root', 'cid'));
const outPath = resolve(opt('out', 'game/src/shared/GameConfig.luau'));

const { manifest, problems, missing, provenance, sheetsRead, sheetsContributing } =
  await mergeSheets(root);

console.log(`\nbridge — ${sheetsRead} sheet(s) read, ${sheetsContributing} carrying a manifest block\n`);

const supplied = Object.keys(provenance).sort();
if (supplied.length) {
  console.log('  supplied:');
  for (const key of supplied) console.log(`    ${key.padEnd(12)} <- ${provenance[key]}`);
}

if (missing.length) {
  console.log(`\n  MISSING ${missing.length} key(s) the build needs:`);
  for (const m of missing) console.log(`    ${m}`);
}

if (problems.length) {
  console.log(`\n  ${problems.length} problem(s):`);
  for (const p of problems) console.log(`    ${p}`);
}

const ok = problems.length === 0 && missing.length === 0;

if (ok && flag('emit')) {
  const luau = emitGameConfig(manifest, provenance);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, luau, 'utf8');
  console.log(`\n  emitted ${outPath} (${luau.split('\n').length} lines)`);
} else if (flag('emit')) {
  console.log('\n  not emitting — the manifest is incomplete or invalid');
}

console.log(`\n${ok ? 'COMPLETE' : 'INCOMPLETE'} — ${supplied.length}/${supplied.length + missing.length} keys supplied, ${problems.length} problem(s)\n`);
process.exit(ok ? 0 : 1);
