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
import { emitBuildOrder } from './emit-buildorder.mjs';
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

const { manifest, problems, missing, provenance, proposals, sheetsRead, sheetsContributing } =
  await mergeSheets(root);

console.log(`\nbridge — ${sheetsRead} sheet(s) read, ${sheetsContributing} carrying a manifest block\n`);

const supplied = Object.keys(provenance).sort();
if (supplied.length) {
  console.log('  supplied:');
  for (const key of supplied) console.log(`    ${key.padEnd(12)} <- ${provenance[key]}`);
}

// Proposals do not gate the build. They are the queue of contract growth: a domain ran,
// decided something real, and found no slot for it. Promoting one means writing a shape
// and a check in schema.mjs, which is a deliberate act by whoever owns the contract.
if (proposals.length) {
  console.log(`\n  proposed — ${proposals.length} key(s) no schema slot exists for yet:`);
  for (const p of proposals) console.log(`    ${p.key.padEnd(12)} <- ${p.sheet}`);
  console.log('    Not merged and not emitted. Promote in bridge/schema.mjs to make one binding.');
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

// Emitting needs both contracts. `GameConfig.luau` carries `runtime`, and `BUILD-ORDER.md`
// is built from `modules` — both technical keys the architect owns. This command validates
// the creative half only, so it cannot emit and should say so rather than crash on an
// undefined key.
if (flag('emit')) {
  console.log('\n  --emit moved to `npm run architect -- --emit`.');
  console.log('  A build reads both contracts: this one checks what the game is, the');
  console.log('  architect checks how it gets built, and only the architect has the');
  console.log('  technical keys the emitted files need.\n');
  process.exit(ok ? 0 : 1);
}

console.log(`\n${ok ? 'COMPLETE' : 'INCOMPLETE'} — ${supplied.length}/${supplied.length + missing.length} keys supplied, ${problems.length} problem(s)\n`);
process.exit(ok ? 0 : 1);
