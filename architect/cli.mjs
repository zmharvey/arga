#!/usr/bin/env node
/**
 * The architect stage: creative decisions in, technical decisions out.
 *
 *   npm run architect                  merge technical sheets, validate against the creative manifest
 *   npm run architect -- --contract    what the architect must decide, and why each entry exists
 *   npm run architect -- --emit        write GameConfig.luau and BUILD-ORDER.md
 *
 * Exit 1 if the technical manifest is incomplete or contradicts the creative one, so this
 * can gate a build.
 *
 * Why this is a separate command from `npm run bridge`: the bridge answers "did CID decide
 * everything about the game". This answers "did anybody decide how to build it". Two build
 * trials showed those failing independently — the creative manifest was complete and valid
 * while three quarters of what stopped a builder was missing.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { mergeSheets } from '../bridge/merge.mjs';
import { emitGameConfig } from '../bridge/emit-config.mjs';
import { emitBuildOrder } from '../bridge/emit-buildorder.mjs';
import { TECH_SCHEMA, techContract } from './schema.mjs';
import { validateTech } from './validate.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

if (flag('contract')) {
  console.log('\nWhat the architect must decide:\n');
  for (const { key, doc } of techContract()) console.log(`  ${key.padEnd(15)} ${doc}`);
  console.log('\nNone of these is a creative question. Every one of them stopped a real');
  console.log('build agent, and none of them can be answered by a sheet about the game.\n');
  process.exit(0);
}

const creativeRoot = resolve(opt('cid', 'cid'));
const techRoot = resolve(opt('root', 'architect/sheets'));

const creative = await mergeSheets(creativeRoot);
const tech = await mergeSheets(techRoot, TECH_SCHEMA);

console.log(`\narchitect — ${tech.sheetsRead} technical sheet(s), `
  + `${tech.sheetsContributing} carrying a manifest block\n`);

if (creative.problems.length || creative.missing.length) {
  console.log('  the creative manifest is not clean, so the technical layer cannot be trusted:');
  for (const p of [...creative.missing, ...creative.problems]) console.log(`    ${p}`);
  console.log('\n  run `npm run bridge` first.\n');
  process.exit(1);
}

const supplied = Object.keys(tech.provenance).sort();
if (supplied.length) {
  console.log('  supplied:');
  for (const k of supplied) console.log(`    ${k.padEnd(15)} <- ${tech.provenance[k]}`);
}

const { problems, missing } = validateTech(tech.manifest, creative.manifest);
const allProblems = [...tech.problems, ...problems];

if (missing.length) {
  console.log(`\n  MISSING ${missing.length} technical decision(s):`);
  for (const m of missing) console.log(`    ${m}`);
}
if (allProblems.length) {
  console.log(`\n  ${allProblems.length} problem(s):`);
  for (const p of allProblems) console.log(`    ${p}`);
}

const ok = allProblems.length === 0 && missing.length === 0;

if (ok && flag('emit')) {
  // Both manifests together are what a build reads. The emitters take one object, so the
  // technical keys are layered over the creative ones here rather than in either schema.
  const full = { ...creative.manifest, ...tech.manifest };
  const provenance = { ...creative.provenance, ...tech.provenance };

  const cfgPath = resolve(opt('out', 'game/src/shared/GameConfig.luau'));
  const luau = emitGameConfig(full, provenance);
  await mkdir(dirname(cfgPath), { recursive: true });
  await writeFile(cfgPath, luau, 'utf8');
  console.log(`\n  emitted ${cfgPath} (${luau.split('\n').length} lines)`);

  const orderPath = resolve(opt('order-out', 'docs/BUILD-ORDER.md'));
  const order = emitBuildOrder(full, provenance);
  await mkdir(dirname(orderPath), { recursive: true });
  await writeFile(orderPath, order, 'utf8');
  console.log(`  emitted ${orderPath} (${full.modules.length} modules, ${order.split('\n').length} lines)`);
} else if (flag('emit')) {
  console.log('\n  not emitting — the technical manifest is incomplete or contradicts the creative one');
}

console.log(`\n${ok ? 'COMPLETE' : 'INCOMPLETE'} — ${supplied.length}/${supplied.length + missing.length} `
  + `technical keys, ${allProblems.length} problem(s)\n`);
process.exit(ok ? 0 : 1);
