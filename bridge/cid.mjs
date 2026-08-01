#!/usr/bin/env node
/**
 * Context assembly for CID agents.
 *
 *   npm run cid:digest                      what every written sheet decided, one row each
 *   npm run cid:research                    rebuild cid/_research/pack.md from committed sheets
 *   npm run cid:pack -- --domain theme/tone --brief concept/spec/foo
 *                                           the complete context one domain writer needs
 *
 * The argument for all three is the argument `merge.mjs` already makes about correctness,
 * applied to cost. An agent that reads 26 siblings to learn what it may not decide, or
 * re-fetches a page another agent fetched an hour ago, is paying to re-derive something a
 * parser states once. Wave 1 paid ~4.3M tokens, ~97% of it input, most of that the same
 * bytes handed to 27 agents one at a time.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve, join, basename } from 'node:path';
import {
  sheetDigest,
  renderDigest,
  researchPack,
  renderPack,
  briefSlice,
  contractSlice,
} from './context.mjs';

const [cmd, ...rest] = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 && rest[i + 1] ? rest[i + 1] : fallback;
};

const ROOT = opt('root', 'cid');
const PACK_PATH = join(ROOT, '_research', 'pack.md');

/* ------------------------------------------------------------------ digest */

if (cmd === 'digest') {
  const rows = await sheetDigest(ROOT);
  const body = renderDigest(rows);
  const sheetLines = rows.reduce((n, r) => n + r.lines, 0);
  const digestLines = body.split('\n').length;
  const outPath = opt('out', null);
  if (outPath) {
    await mkdir(dirname(resolve(outPath)), { recursive: true });
    await writeFile(resolve(outPath), body, 'utf8');
  } else {
    process.stdout.write(`\n${body}\n`);
  }
  console.error(
    `cid:digest — ${rows.length} sheet(s), ${sheetLines} lines of sheet distilled to ` +
      `${digestLines} lines (${(sheetLines / Math.max(digestLines, 1)).toFixed(0)}x)` +
      `${outPath ? ` -> ${outPath}` : ''}. ` +
      `A writer reads this instead of its siblings.\n`,
  );
  process.exit(0);
}

/* --------------------------------------------------------------- leadpack */

// `cid:pack` serves writers. Domain leads need the same two derivations and cannot run a
// command to get them: the `cid-domain-lead` agent has Read/Write/Glob/Grep/WebSearch/
// WebFetch and no Bash. Handing a lead "run npm run cid:digest" is an instruction it
// cannot follow, and the failure is silent — it writes an index without knowing where its
// neighbours stop, which is exactly the sibling-overlap the digest exists to remove.
//
// So the orchestrator regenerates these before dispatching each wave's leads, and the
// leads read two files. Derived, never hand-edited, and stale the moment a wave lands.
if (cmd === 'leadpack') {
  const digestOut = join(ROOT, '_digest.md');
  const contractOut = join(ROOT, '_contract.md');

  const rows = await sheetDigest(ROOT);
  await mkdir(ROOT, { recursive: true });
  await writeFile(
    digestOut,
    `# Sheet digest — derived, do not edit\n\n`
      + `\`npm run cid:leadpack\` regenerates this from the sheets themselves. Every sheet's\n`
      + `decision, the contract key it supplies, and what it says is **not** its business.\n`
      + `That last column is the boundary: if something you need sits in it, that thing is\n`
      + `unowned and you should say so rather than assume someone has it.\n\n`
      + `Read this **instead of** the sibling sheets. They cost ~9,000 lines to learn ~90\n`
      + `lines of fact.\n\n${renderDigest(rows)}`,
    'utf8',
  );

  const { contract } = await import('./schema.mjs');
  const keys = contract();
  await writeFile(
    contractOut,
    `# The creative contract — derived, do not edit\n\n`
      + `\`npm run cid:leadpack\` regenerates this from \`bridge/schema.mjs\`. These are the\n`
      + `keys a build reads, and the one domain that owns each.\n\n`
      + `**${keys.length} keys is small because most domains have not run**, not because the\n`
      + `other subjects have no data form. A domain with no key here proposes one, by carrying\n`
      + `a fenced block tagged \`manifest\` whose contents are:\n\n`
      // Fenced as json, not as manifest. This file lives under cid/, the merger walks cid/**
      // for ```manifest blocks, and an illustrative block with `<key>` in it is not valid
      // JSON — so tagging it honestly made `npm run bridge` report a parse error against a
      // file that is documentation. Found by the merger, one commit after writing it.
      + '```json\n{ "provides": "<key>", "status": "proposed", "value": <data> }\n```\n\n'
      + `\`npm run bridge\` reports a proposal and never merges it, until someone writes a\n`
      + `shape for it here. Proposing a key that already exists below is an error.\n\n`
      + `| key | owner | what it settles |\n|---|---|---|\n`
      + keys.map((k) => `| \`${k.key}\` | \`${k.owner}\` | ${k.doc} |`).join('\n')
      + '\n',
    'utf8',
  );

  console.error(`cid:leadpack — ${digestOut} (${rows.length} sheets), ${contractOut} (${keys.length} keys)\n`);
  process.exit(0);
}

/* ---------------------------------------------------------------- research */

if (cmd === 'research') {
  const entries = await researchPack(ROOT);
  const body = renderPack(entries, { generatedFrom: ROOT });
  await mkdir(dirname(PACK_PATH), { recursive: true });
  await writeFile(PACK_PATH, body, 'utf8');

  const cites = entries.reduce((n, e) => n + e.citedBy.length, 0);
  const dupes = cites - entries.length;
  console.log(`\ncid:research — wrote ${PACK_PATH}\n`);
  console.log(`  ${entries.length} unique external source(s) from ${cites} citation(s)`);
  console.log(`  ${dupes} citation(s) re-cite a page another sheet already fetched`);
  console.log(`  ${entries.fileCitations} further [research:] tag(s) name a repo file, not a`);
  console.log('    URL. Those stay inline — a local read is not what cost anything.');
  console.log(`  ${body.split('\n').length} lines\n`);
  console.log('  A writer cites this file and does not fetch. `npm run cid:verify` fails a');
  console.log('  citation naming a URL that is not in it.\n');
  console.log('  The larger saving is the search that precedes a fetch: it was paid per sheet,');
  console.log('  and removing WebSearch from the writer removes it entirely.\n');
  process.exit(0);
}

/* -------------------------------------------------------------------- pack */

if (cmd === 'pack') {
  const domain = opt('domain', null);
  const brief = opt('brief', null);
  if (!domain || !brief) {
    console.error('usage: cid.mjs pack --domain <category/domain> --brief <spec dir>');
    process.exit(2);
  }

  const leadPath = join(ROOT, domain, '_lead.md');
  let lead = '';
  try {
    lead = await readFile(leadPath, 'utf8');
  } catch {
    console.error(`no index at ${leadPath} — the domain lead runs before its writer`);
    process.exit(2);
  }

  // The assignment table: `| NN | `slug` | must decide |`. The lead's reasoning about why
  // it chose this many sheets is for verification, not for the writer.
  const assignments = [...lead.matchAll(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([\s\S]*?)\s*\|\s*$/gm)]
    .map((m) => ({ n: m[1], slug: m[2], mustDecide: m[3].replace(/\s+/g, ' ').trim() }));

  const subject = (lead.match(/\*\*Subject:\*\*([\s\S]*?)(?=\n\n|\n##)/) ?? [, ''])[1]
    .replace(/\s+/g, ' ')
    .trim();

  const { mine, others } = contractSlice(domain);
  const digest = renderDigest((await sheetDigest(ROOT)).filter((r) => r.domain !== domain));
  const { parts, lines, excluded, excludedLines } = await briefSlice(brief);
  const exclusionNote = excluded.length
    ? `**Excluded: ${excluded.map((e) => `\`${e.name}\` (${e.lines} lines)`).join(', ')}** — a report on how
the brief was produced, not design content. That is ${Math.round((excludedLines * 100) / (lines + excludedLines))}% of this brief, and every wave-1
writer paid for it.`
    : '_Nothing excluded: this brief carries no process artifacts._';

  let packCount = 0;
  try {
    packCount = (await readFile(PACK_PATH, 'utf8')).match(/^##\s+\S+$/gm)?.length ?? 0;
  } catch {
    /* pack not built yet */
  }

  const out = `# Context pack — ${domain}

**Generated by \`npm run cid:pack\`. This is everything. Do not go looking for more.**

Three rules, and they are what make this affordable:

1. **Do not read sibling spec sheets.** Section 4 is every decision they made, derived from
   the sheets themselves. Reading the sheets costs ~9,000 lines to learn ~90 lines of fact.
2. **Do not fetch.** Section 5 points at ${packCount} sources already fetched and distilled.
   You have no \`WebFetch\`. Cite a pack entry.
3. **Read only the brief files in section 2.** The list is the brief minus its own process
   artifacts.

---

## 1. Your assignment

**Subject:** ${subject || '(see index)'}

You write **${assignments.length} sheet(s)**, all of them, in one pass:

${assignments.length
      ? assignments
          .map((a) => `- \`${ROOT}/${domain}/${a.n}-${a.slug}.md\` — ${a.mustDecide}`)
          .join('\n')
      : '_(no assignment table found in the index — read it directly)_'}

Writing them together is deliberate. These are the sheets most likely to overlap or
contradict each other, and one writer holding all of them cannot collide with itself.

---

## 2. Read these, and nothing else

${parts.map((p) => `- \`${join(brief, p.name)}\``).join('\n')}

${lines} lines. ${exclusionNote}

Your own index, for the reasoning behind your assignment: \`${leadPath}\`

---

## 3. Contract keys you own

${mine.length
      ? `${mine.map((k) => `- \`${k.key}\` — ${k.doc}`).join('\n')}

**A sheet of yours must carry a \`\`\`manifest block for each.** A key you own and do not
supply is a number a build agent invents.`
      : `**None yet — and that is a job, not a let-off.** The contract is ${mine.length + others.length} keys because it
was derived from one hand-built game, and most domains have not run. Yours is one of them.

**Propose the key your subject needs.** Decide the thing, then write it as data:

\`\`\`manifest
{ "provides": "<your key>", "status": "proposed", "value": <the decision as data> }
\`\`\`

\`status: "proposed"\` is required. It means: collected and reported by \`npm run bridge\`,
never merged, until someone writes a shape and a check for it in \`bridge/schema.mjs\`.
Proposing a key the contract already has is an error — supply that key properly instead,
and the list below says who owns it.

**One key per subject, not one per sheet.** If four of your sheets describe one thing, one
of them carries the block and the other three say so in \`## Not decided here\`.

A sheet with no data form is allowed, but it must say so in one line and name the key it
would need. Prose that reaches no builder is the wave-1 defect this pipeline exists to fix:
78% of wave 1 had no data form, and none of it reached the build.`}

<details><summary>The other ${others.length} keys, and who owns them</summary>

${others.map((k) => `- \`${k.key}\` → \`${k.owner}\``).join('\n')}

</details>

---

## 4. Already decided elsewhere — do not read the sheets themselves

${digest}
The last column is the boundary. If something you need is in another sheet's "not its
business" column, it is unowned and you should say so rather than assume someone has it.

---

## 5. Research

Every source any sheet has fetched is in \`${PACK_PATH}\` (${packCount} sources).

- Cite as \`[research: <url>]\` using a URL that appears in that file.
- \`npm run cid:verify\` **fails** a citation naming a URL the pack does not have.
- If you need something the pack lacks, write \`[research owed: <what would settle it>]\`
  and decide anyway with your reasoning stated. A research pass picks those up in a batch.
  One agent fetching 20 pages once costs a fraction of 20 agents fetching 20 pages each.

---

## 6. Budget — 100 lines of *prose*. Checks are exempt and never cut to fit.

\`cid:verify\` counts prose only. **Table rows, fenced blocks and manifest blocks do not
count against the budget**, so a rule table as long as your subject requires is free.

Wave 1 averaged 345 lines a sheet and **86-95% of every sheet was prose**. Its tables — the
rules, exclusions and checks a reviewer actually points at — were 5-14%. That is the only
place to cut.

**Never trade a check for length.** If your subject has twelve exclusions, write twelve
rows. Naming the specific thing is the job: *"zero cobwebs, dust sheets, grave markers or
bones"* is worth more than three paragraphs on why the game should not feel haunted. A
build agent cannot count "not spooky". It can count cobwebs.

Cut instead: restatements of the brief, summaries of what you are about to decide, recaps
of what you just decided, paragraphs arguing an entry's importance, and any table whose
rows all carry the same verdict.

Long is not thorough. Short is not disciplined either, if it got short by deleting the part
a builder needs.
`;

  const outPath = opt('out', null);
  if (outPath) {
    await mkdir(dirname(resolve(outPath)), { recursive: true });
    await writeFile(resolve(outPath), out, 'utf8');
    console.error(`cid:pack — wrote ${outPath} (${out.split('\n').length} lines)`);
  } else {
    process.stdout.write(out);
  }
  process.exit(0);
}

/* ------------------------------------------------------------- build pack */

if (cmd === 'build') {
  const { buildPack, renderBuildPack, listModules } = await import('./build-pack.mjs');
  const order = await readFile(opt('order', 'docs/BUILD-ORDER.md'), 'utf8');
  const module_ = opt('module', null);

  if (!module_) {
    console.log('\nmodules in the build order, in dependency sequence:\n');
    for (const m of listModules(order)) console.log(`  ${String(m.n).padStart(2)}. ${m.name.padEnd(14)} ${m.side}`);
    console.log('\n  npm run build:pack -- --module <name> [--out <file>]\n');
    process.exit(0);
  }

  let pack;
  try {
    pack = buildPack(order, module_);
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }

  const body = renderBuildPack(pack);
  const outPath = opt('out', null);
  if (outPath) {
    await mkdir(dirname(resolve(outPath)), { recursive: true });
    await writeFile(resolve(outPath), body, 'utf8');
    console.error(`build:pack — ${module_} → ${outPath} (${body.split('\n').length} lines, `
      + `${pack.deps.length} dependency brief(s))`);
  } else {
    process.stdout.write(body);
  }
  process.exit(0);
}

console.error(`
cid.mjs — context assembly for the agents in this pipeline

  digest      what every written sheet decided, one row each
  research    rebuild ${PACK_PATH} from committed sheets
  pack        --domain <category/domain> --brief <spec dir> [--out <file>]
  build       --module <name> [--out <file>]   one module's complete build brief
`);
process.exit(2);
