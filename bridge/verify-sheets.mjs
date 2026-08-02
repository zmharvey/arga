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
  // The stated invariant is 2-4 (`docs/CID-wave-1.md`, and the writer's own definition). The
  // check enforced 0 and 8, so the band it was written for went unmeasured on both sides: a
  // wave-2 sheet reached 5 by absorbing a revision and nothing said so, and a single-criterion
  // sheet — one test for a whole subject — passed silently.
  //
  // Warn rather than fail on both edges. A fifth criterion arriving with a real fix is a
  // trade a writer should make consciously, not a build break; the point is that it is
  // visible. Zero stays a hard failure, because a sheet nothing can check is an opinion.
  if (criteria === 0) fails.push(`${rel}: no numbered acceptance criteria`);
  else if (criteria === 1) warns.push(`${rel}: 1 acceptance criterion — the invariant is 2 to 4, and one test rarely covers a subject`);
  else if (criteria > 4) warns.push(`${rel}: ${criteria} acceptance criteria — the invariant is 2 to 4. Above 8 it is a list of wishes rather than tests; between 5 and 8, merge or drop the weakest`);

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

/* --- 5. one casing convention --- retired, and this is the shape of a good retirement */

// This used to warn that labels used two conventions and leave the choice to a human,
// because picking one crossed a category boundary: Tone's register versus values owned by
// gameplay/meta and gameplay/balance.
//
// It is gone because `vocabulary.casing` now states the convention and the merger enforces
// it on every player-facing string. A warning that needs a human ruling is a worse version
// of a contract field that settles it — the ruling happens once, in the domain that owns
// the decision, instead of every time somebody reads the warning.
//
// Tone's other checkable output moved the same way: `maxSentenceWords` and `allowedPattern`
// were prose in a register sheet that nothing could check.

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
      for (const m of body.matchAll(/\[research:\s*(https?:\/\/[^\s\]`]+)/g)) {
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

/* ------------------------------------- 7. prose budget */

// 86-95% of every wave-1 sheet was prose; its tables — the rules, exclusions and checks a
// reviewer actually points at — were 5-14%. So the budget binds prose and exempts tables,
// fenced blocks and manifest blocks.
//
// The distinction is not cosmetic. Handed a flat all-lines cap, the first batched writer
// cut a 12-entry exclusion list to 6 and dropped every named object (cobwebs, padlocks on
// empty slots, gain floaters, camera shake) while keeping the paragraphs explaining why
// the game should not feel haunted. It optimised the measure instead of the thing. A build
// agent cannot count "not spooky"; it can count cobwebs.
//
// Warns rather than fails: length is a cost problem, not a correctness one.
const PROSE_BUDGET = 100;
{
  const long = [];
  for (const f of leaves.filter(scoped)) {
    const body = await readFile(f, 'utf8');
    const n = body
      .replace(/```[\s\S]*?```/g, '')
      .split('\n')
      .filter((l) => l.trim() && !/^\s*\|/.test(l)).length;
    if (n > PROSE_BUDGET) long.push({ rel: relative(ROOT, f), n });
  }
  if (long.length) {
    long.sort((a, b) => b.n - a.n);
    const excess = long.reduce((t, l) => t + l.n - PROSE_BUDGET, 0);
    warns.push(`${long.length} sheet(s) over the ${PROSE_BUDGET}-line prose budget by ${excess} lines total. `
      + `Worst: ${long.slice(0, 3).map((l) => `${l.rel} (${l.n})`).join(', ')}. `
      + 'Tables and manifest blocks are exempt — cut the argument, never a check.');
  }
}

/* ------------------ 8. every sheet produces data, or says why it cannot */

// The corrected version of a check that had it backwards.
//
// It used to warn that a domain owned no contract key, which reads as "do not run" — and
// under it 41 of the graph's 55 domains would have been told to assign nothing, including
// Environment, VFX, SFX and Platform & Input. CID's job is to spec every aspect of the game;
// a gate that shuts down three quarters of it because the contract is currently small has
// the causality inverted. The contract is small because it was derived from one hand-built
// game, and it is supposed to grow.
//
// What wave 1 actually got wrong was the *shape* of the output: 78% of it had no data form,
// so no build step could read it. That is what this measures now — did the sheet produce
// data, or at least say plainly why its subject has none.
{
  const NO_DATA = /##\s*No manifest block|no data form|carries no manifest block|supplies no value/i;
  const silent = [];
  for (const f of leaves.filter(scoped)) {
    const body = await readFile(f, 'utf8');
    if (body.includes('```manifest')) continue;
    // An amendment block is data. Where a domain's key is carried by one sheet and amended by
    // its siblings — the pattern `theme/vocabulary/02` established and `gameplay/onboarding`
    // was assigned — the amending sheets emit a ```json block with an `"amends"` field rather
    // than a second ```manifest block, because two sheets claiming one key is a merge error.
    // Those sheets produced a data form and were still warned at, so a writer had to add a
    // sentence saying it had no data form in order to silence a check about having no data
    // form. Reported by the wave-3 Onboarding writer, which did exactly that.
    if (/"amends"\s*:/.test(body)) continue;
    if (NO_DATA.test(body)) continue;
    silent.push(relative(ROOT, f));
  }
  if (silent.length) {
    warns.push(`${silent.length} sheet(s) carry no manifest block and do not say why: `
      + `${silent.slice(0, 4).join(', ')}${silent.length > 4 ? ', …' : ''}. `
      + 'Either supply a contract value, or state in one line that the subject has no data '
      + 'form and name the key it would need. Prose with neither reaches no builder.');
  }

  // A domain that decided something real and found no key for it is the signal that the
  // contract needs to grow. Surfaced as a note, because it is work for the schema owner.
  //
  // Split two ways, because the two halves need different things done to them: a domain that
  // *proposed* a key has done its job and is waiting on a shape in schema.mjs; a domain that
  // proposed nothing has produced prose no build step can read, which is the wave-1 defect.
  const owners = new Set(Object.values(SCHEMA).map((s) => s.owner));
  const domains = new Set(leaves.filter(scoped).map((f) => relative(ROOT, dirname(f))));
  const { proposals } = await mergeSheets(ROOT);
  const proposedBy = new Map(proposals.map((p) => [dirname(p.sheet), p.key]));
  const keyless = [...domains].filter((d) => !owners.has(d)).sort();
  const waiting = keyless.filter((d) => proposedBy.has(d));
  const mute = keyless.filter((d) => !proposedBy.has(d));

  // Every proposal, not only those from keyless domains. The first version reported the
  // keyless ones, which showed 1 of wave 2's 9: Systems already owns `tiers` and `currency`
  // and proposed four more, Mechanics owns `movement` and proposed four. Owning a key says
  // nothing about whether the rest of the subject has one, so filtering on it hid the
  // contract-growth queue almost entirely.
  if (proposals.length) {
    notes.push(`${proposals.length} proposed key(s) with no schema slot yet: `
      + `${proposals.map((p) => `${p.key} (${dirname(p.sheet)})`).join(', ')}. `
      + 'Promote in bridge/schema.mjs to make one binding, or leave it as a recorded finding.');
  }
  if (mute.length) {
    warns.push(`${mute.length} domain(s) own no contract key and propose none: ${mute.join(', ')}. `
      + 'Each should either propose the key its subject needs, or state per sheet that the '
      + 'subject has no data form. A domain that produces only prose reaches no builder.');
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
