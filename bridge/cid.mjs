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

const APPEND_MARKER = '<!-- APPEND NEW RESEARCH BELOW THIS LINE -->';

if (cmd === 'research') {
  const entries = await researchPack(ROOT);

  // Everything a batched research pass appended below the marker survives the rebuild.
  //
  // Without this, the pack's own instruction ("run `npm run cid:research` to rebuild, or have
  // a research pass append new entries below the marker") is a trap: the rebuild derives the
  // file from `[research: url]` tags in sheets, and an appended entry has no citation yet —
  // it exists so a writer can *make* one. The first rebuild after a research pass would
  // delete exactly the work that pass was dispatched to do, and the loss is silent, because
  // the citation check only fails later, when a writer cites a URL the pack no longer has.
  let carried = '';
  try {
    const prior = await readFile(PACK_PATH, 'utf8');
    const i = prior.indexOf(APPEND_MARKER);
    if (i >= 0) carried = prior.slice(i + APPEND_MARKER.length).trim();
  } catch {
    /* no pack yet */
  }

  const body = renderPack(entries, { generatedFrom: ROOT }) + (carried ? `\n${carried}\n` : '');
  await mkdir(dirname(PACK_PATH), { recursive: true });
  await writeFile(PACK_PATH, body, 'utf8');
  if (carried) {
    const kept = (carried.match(/^##\s+\S+$/gm) ?? []).length;
    console.error(`  carried ${kept} appended source(s) through the rebuild`);
  }

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

  // Sheets written outside the wave process — during a build trial, before the domain had a
  // lead — whose manifests the shipped game reads. A lead indexes them so its new work does
  // not collide with them, which means they appear in the assignment table like anything
  // else. Handing them to a writer as an assignment is how a value the build depends on gets
  // rewritten by an agent that had no idea it was live.
  //
  // So they are subtracted from the assignment rather than flagged in prose beside it. A
  // writer cannot decline an instruction it never receives.
  const adopted = new Set((opt('adopted', '') || '').split(',').map((s) => s.trim()).filter(Boolean));
  const unknown = [...adopted].filter((n) => !assignments.some((a) => a.n === n));
  if (unknown.length) {
    console.error(`--adopted names ${unknown.map((n) => `"${n}"`).join(', ')}, which the index does not plan. Rows: ${assignments.map((a) => a.n).join(', ')}`);
    process.exit(2);
  }
  const toWrite = assignments.filter((a) => !adopted.has(a.n));
  const inherited = assignments.filter((a) => adopted.has(a.n));

  // Which keys the inherited sheets already supply. Section 3 otherwise lists a key as the
  // domain's responsibility with nothing saying it is already met, and a writer that missed
  // the out-of-band warning would supply it a second time — which the merger rejects, but
  // only after the sheet is written.
  const suppliedByInherited = new Map();
  for (const a of inherited) {
    const path = join(ROOT, domain, `${a.n}-${a.slug}.md`);
    try {
      const body = await readFile(path, 'utf8');
      for (const m of body.matchAll(/```manifest\s*\n([\s\S]*?)\n```/g)) {
        try {
          const key = JSON.parse(m[1]).provides;
          if (typeof key === 'string') suppliedByInherited.set(key, `${a.n}-${a.slug}.md`);
        } catch { /* merge.mjs reports the parse error */ }
      }
    } catch { /* the index plans it but it is not on disk; cid:verify reports that */ }
  }

  // The subject comes from the graph, which is where it is actually defined, not from a
  // `**Subject:**` field in the index. No lead ever wrote one — the `cid-domain-lead` output
  // template has no such field — so this line rendered `(see index)` for every writer in
  // wave 1 and wave 2, and the pack's own header sat empty while the graph held the answer.
  let subject = '';
  let boundary = '';
  try {
    const graph = JSON.parse(await readFile('docs/cid-workflow.json', 'utf8'));
    const node = graph.nodes.find(
      (n) => n.typeName === 'Domain Lead' && (n.values?.writes_to ?? '').includes(`/${domain}/`),
    );
    subject = (node?.values?.owns ?? '').replace(/\s+/g, ' ').trim();
    boundary = (node?.values?.does_not_own ?? '').replace(/\s+/g, ' ').trim();
  } catch {
    /* graph unreadable — fall through to the index */
  }
  if (!subject) {
    subject = (lead.match(/\*\*Subject:\*\*([\s\S]*?)(?=\n\n|\n##)/) ?? [, ''])[1]
      .replace(/\s+/g, ' ')
      .trim();
  }

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
${boundary ? `\n**Not your subject:** ${boundary}\n` : ''}

You write **${toWrite.length} sheet(s)**, all of them, in one pass:

${toWrite.length
      ? toWrite
          .map((a) => `- \`${ROOT}/${domain}/${a.n}-${a.slug}.md\` — ${a.mustDecide}`)
          .join('\n')
      : '_(no assignment table found in the index — read it directly)_'}

Writing them together is deliberate. These are the sheets most likely to overlap or
contradict each other, and one writer holding all of them cannot collide with itself.
${inherited.length
      ? `
### Already written, and not yours to touch

${inherited.map((a) => `- \`${ROOT}/${domain}/${a.n}-${a.slug}.md\``).join('\n')}

These were written before this domain had a lead, and **the shipped game reads their
manifest values**. Read them — they are your own domain and your new sheets must not collide
with them — but do not edit, renumber, or supersede one. If you believe one is wrong, say so
in your report and leave the file alone. Your numbering continues past them.
`
      : ''}
---

## 2. Read these, and nothing else

${parts.map((p) => `- \`${join(brief, p.name)}\``).join('\n')}

${lines} lines. ${exclusionNote}

Your own index, for the reasoning behind your assignment: \`${leadPath}\`

---

## 3. Contract keys you own

${mine.length
      ? `${mine.map((k) => `- \`${k.key}\` — ${k.doc}${suppliedByInherited.get(k.key)
          ? ` · **already supplied by \`${suppliedByInherited.get(k.key)}\`, which is not yours to touch. Do not supply it again.**`
          : ''}`).join('\n')}

**A sheet of yours must carry a \`\`\`manifest block for each key above that is not already
supplied.** A key you own and do not supply is a number a build agent invents; a key supplied
twice is a hard error in the merge, not a disagreement to adjudicate.`
      : `**None yet — and that is a job, not a let-off.** The contract is ${mine.length + others.length} keys because it
was derived from one hand-built game, and most domains have not run. Yours is one of them.`}

### Proposing a key the contract does not have

This applies whether or not you own one above. **The contract is not the list of subjects
worth deciding; it is the list of subjects some earlier build happened to need.** If your
assignment says to propose a key, or you decide something real and find no slot for it,
write it as data anyway:

\`\`\`manifest
{ "provides": "<your key>", "status": "proposed", "value": <the decision as data> }
\`\`\`

- \`status: "proposed"\` is **required**. It means collected and reported by \`npm run bridge\`,
  never merged, until someone writes a shape and a check for it in \`bridge/schema.mjs\`.
- Proposing a key the contract **already has** is an error. Supply that key properly instead;
  the list below says who owns each one.
- **One key per subject, not one per sheet.** If several of your sheets describe one thing,
  one carries the block and the others name it in \`## Not decided here\`.
- Design the value for a builder reading it tomorrow, because that is the entire point.
  \`{"mood": "melancholy"}\` is prose in a fence. A named list with fields, quantities and
  trigger conditions is a key.

A sheet with genuinely no data form is allowed, but it must **say so in one line and name the
key it would need**. Silence is what fails. 78% of wave 1 was prose with no data form and
none of it reached the build; that is the defect this closes.

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
