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
  process.stdout.write(`\n${body}\n`);
  console.error(
    `cid:digest — ${rows.length} sheet(s), ${sheetLines} lines of sheet distilled to ` +
      `${digestLines} lines (${(sheetLines / Math.max(digestLines, 1)).toFixed(0)}x). ` +
      `A writer reads this instead of its siblings.\n`,
  );
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
      : `**None.** Every key in the contract is owned by another domain, listed below. This is
a correct result, not a gap: your output is a *bound* on values other domains supply.
**Do not add a manifest block to make a sheet look load-bearing.** It will fail the merge.`}

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

console.error(`
cid.mjs — context assembly for CID agents

  digest      what every written sheet decided, one row each
  research    rebuild ${PACK_PATH} from committed sheets
  pack        --domain <category/domain> --brief <spec dir> [--out <file>]
`);
process.exit(2);
