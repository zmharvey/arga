/**
 * Derivations over the CID sheet tree.
 *
 * Wave 1 cost ~4.3M tokens to write 27 sheets. Measured afterwards, 86% of the lines
 * written were prose that this repo's own spec-writer definition says nothing downstream
 * reads, and ~97% of the spend was input rather than output — the same bytes delivered to
 * 27 separate agents, one at a time, because each agent discovered its context by reading
 * files instead of being handed it.
 *
 * That is the same failure the bridge already exists to fix, one level up. `merge.mjs`
 * says it out loud: prose has to be re-interpreted by whoever reads it. The cost argument
 * is the same shape as the correctness argument. An agent that re-reads 26 sibling sheets
 * to find out what it may not decide is paying to re-derive something a parser can state
 * in one line.
 *
 * So: three derivations, all pure, all cheap, all replacing something an agent was
 * previously paid to do by hand.
 *
 *   sheetDigest()   what has already been decided, one row per sheet
 *   researchPack()  every fetched claim, deduped by URL
 *   briefSlice()    the brief minus its own process artifacts
 *
 * None of them interpret. They collect declared structure and refuse to guess.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, basename, dirname } from 'node:path';
import { SCHEMA } from './schema.mjs';

const MANIFEST = /```manifest\s*\n([\s\S]*?)\n```/g;

/**
 * `[research: ...]` carries two different things and only one of them is expensive.
 *
 * Of wave 1's 204 tags, 62 name an http(s) URL — a page an agent fetched, 20-40k tokens
 * of raw HTML to extract one sentence. The other 142 name a repo file (`bridge/schema.mjs`
 * and friends). Those are local reads costing a few hundred tokens and they do not belong
 * in a pack; re-reading a file in the repo is not the problem.
 *
 * Counting both together is what produced this module's first, wrong estimate.
 */
const RESEARCH_URL = /\[research:\s*(https?:\/\/[^\s\]]+)/g;
const RESEARCH_ANY = /\[research:\s*([^\]]+)\]/g;

/** Sheets are `NN-slug.md`; `_lead.md` and `_category.md` are indexes, not sheets. */
const isLeaf = (p) => /\/\d\d-[^/]+\.md$/.test(p);

export async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.md')) out.push(full);
  }
  return out.sort();
}

/** Text of one `## Section` up to the next heading of the same level. */
function section(body, heading) {
  const i = body.indexOf(`## ${heading}`);
  if (i < 0) return '';
  const rest = body.slice(i + heading.length + 3);
  const end = rest.search(/\n##\s/);
  return (end < 0 ? rest : rest.slice(0, end)).trim();
}

/**
 * One line, collapsed, capped.
 *
 * Markdown tables are dropped rather than flattened. A "Not decided here" section that
 * hands off via a table produced rows like `. / # / class present / bound by /---/---/`
 * when pipes were rewritten to slashes: noise that reads as content, which is worse in a
 * digest than an honest omission. Prose in the same section survives.
 */
function oneLine(text, cap) {
  const flat = text
    .replace(/```[\s\S]*?```/g, ' ')
    .split('\n')
    .filter((l) => !/^\s*\|/.test(l))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return flat.length <= cap ? flat : `${flat.slice(0, cap - 1).trimEnd()}…`;
}

/**
 * What every already-written sheet decided, and what it explicitly left alone.
 *
 * This replaces a writer reading its siblings. Reading siblings is how wave 1's late
 * sheets reached 460 lines while its early ones were 76: each writer absorbed everything
 * before it and wrote prose reacting to it. The cost is quadratic in sheets per wave, so
 * it is the item that decides whether waves 2-7 are affordable.
 *
 * `notDecidedHere` is carried because it is the boundary. A writer needs to know what a
 * neighbour disclaimed far more than it needs the neighbour's reasoning.
 */
export async function sheetDigest(root) {
  const rows = [];
  for (const file of (await walk(root)).filter(isLeaf)) {
    const body = await readFile(file, 'utf8');
    const provides = [...body.matchAll(MANIFEST)]
      .map((m) => {
        try {
          return JSON.parse(m[1]).provides;
        } catch {
          return null;
        }
      })
      .filter((k) => typeof k === 'string');

    rows.push({
      path: relative(root, file).replace(/\.md$/, ''),
      domain: relative(root, dirname(file)),
      title: (body.match(/^#\s+\d+\s*[—-]\s*(.+)$/m) ?? [, basename(file, '.md')])[1].trim(),
      decision: oneLine(section(body, 'Decision'), 260) || '(no ## Decision)',
      provides,
      notDecidedHere: oneLine(section(body, 'Not decided here'), 200),
      lines: body.split('\n').length,
    });
  }
  return rows;
}

/**
 * Escaping belongs here, not in `oneLine`. `oneLine` yields text; this yields markdown,
 * and a pipe is only dangerous once it is inside a table cell.
 *
 * Dropping this substitution while fixing the table-flattening bug let an inline pipe in a
 * Decision split its own row into extra columns — a digest that silently loses the last
 * two cells of a sheet's boundary. Caught by the test, not by reading the output.
 */
const cell = (s) => String(s).replace(/\|/g, '/');

export function renderDigest(rows) {
  if (!rows.length) return '_No sheets written yet._\n';
  const out = [
    '| sheet | decided | provides | explicitly not its business |',
    '|---|---|---|---|',
  ];
  for (const r of rows) {
    const provides = r.provides.length ? r.provides.map((p) => `\`${p}\``).join(', ') : '—';
    out.push(
      `| \`${r.path}\` | ${cell(r.decision)} | ${provides} | ${cell(r.notDecidedHere) || '—'} |`,
    );
  }
  return `${out.join('\n')}\n`;
}

/**
 * Every claim any sheet sourced to an external page, deduped by URL.
 *
 * The saving here is smaller than it first looked and comes from a different place than
 * expected, so both halves are worth stating.
 *
 * Wave 1 cites ~50 unique external pages. A raw Roblox game page is 20-40k tokens to
 * extract one sentence, so the fetches themselves were roughly 1-2M. Only a dozen or so
 * were true duplicates, which is *not* where the money went. It went on **search**: every
 * writer ran its own occupancy queries before it fetched anything, and the queries are
 * per-sheet whether or not the page turns out to be new.
 *
 * So the pack's real job is twofold. It stops waves 2-7 re-fetching wave 1's fifty pages,
 * and it lets `WebSearch`/`WebFetch` be removed from the writer entirely, which removes
 * the searching. One research pass fetching fifty pages once is affordable; thirty-seven
 * writers each searching first is not.
 *
 * Seeding from committed sheets means wave 1's research is already bought.
 *
 * The claim attached to a citation is the bullet or paragraph containing it. That is a
 * structural rule, not a judgement — the writer put the tag next to the thing it sourced.
 */
export async function researchPack(root) {
  /** @type {Map<string, {url: string, claims: Set<string>, citedBy: Set<string>}>} */
  const byUrl = new Map();
  let fileCitations = 0;

  for (const file of await walk(root)) {
    if (file.includes(`${join(root, '_research')}`)) continue; // never fold the pack into itself
    const rel = relative(root, file).replace(/\.md$/, '');
    const body = await readFile(file, 'utf8');

    for (const m of body.matchAll(RESEARCH_ANY)) {
      if (!/^\s*https?:\/\//.test(m[1])) fileCitations += 1;
    }

    // Split into blocks: a bullet, or a paragraph. A fenced block cannot hold a citation
    // that means anything, so it is dropped rather than parsed.
    const blocks = body
      .replace(/```[\s\S]*?```/g, '\n\n')
      .split(/\n(?=\s*[-*]\s)|\n\s*\n/);

    for (const block of blocks) {
      const urls = [...block.matchAll(RESEARCH_URL)].map((m) => m[1].replace(/[.,;)]+$/, ''));
      if (!urls.length) continue;
      const claim = oneLine(block.replace(RESEARCH_ANY, ''), 600).replace(/^[-*]\s*/, '');
      for (const url of urls) {
        if (!byUrl.has(url)) byUrl.set(url, { url, claims: new Set(), citedBy: new Set() });
        const e = byUrl.get(url);
        if (claim) e.claims.add(claim);
        e.citedBy.add(rel);
      }
    }
  }

  const entries = [...byUrl.values()]
    .map((e) => ({ url: e.url, claims: [...e.claims], citedBy: [...e.citedBy].sort() }))
    .sort((a, b) => b.citedBy.length - a.citedBy.length || a.url.localeCompare(b.url));
  entries.fileCitations = fileCitations;
  return entries;
}

export function renderPack(entries, { generatedFrom = 'cid' } = {}) {
  const dupes = entries.filter((e) => e.citedBy.length > 1).length;
  const out = [
    '# Research pack',
    '',
    '**Generated. Do not hand-edit** — run `npm run cid:research` to rebuild, or have a',
    'research pass append new entries below the marker at the end.',
    '',
    `Extracted from \`${generatedFrom}\`. ${entries.length} unique source(s); ${dupes} were`,
    'fetched by more than one sheet, which is the duplication this file exists to stop.',
    '',
    'A spec writer **does not fetch**. It cites an entry here. `npm run cid:verify` fails any',
    '`[research: url]` naming a URL absent from this file, so the rule "never cite a page you',
    'did not fetch" becomes checkable instead of trusted.',
    '',
    '---',
    '',
  ];
  for (const e of entries) {
    out.push(`## ${e.url}`, '');
    out.push(`*Cited by ${e.citedBy.length}: ${e.citedBy.map((c) => `\`${c}\``).join(', ')}*`, '');
    for (const c of e.claims) out.push(`- ${c}`);
    out.push('');
  }
  out.push('<!-- APPEND NEW RESEARCH BELOW THIS LINE -->', '');
  return out.join('\n');
}

/** Every URL the pack knows, for the verifier's citation check. */
export function packUrls(packBody) {
  return new Set([...packBody.matchAll(/^##\s+(\S+)\s*$/gm)].map((m) => m[1]));
}

/**
 * The brief, minus what a spec writer has no use for.
 *
 * `VERIFIED.md` is 724 of the syndicate brief's 1,667 lines — 43% of what every writer
 * pulled in, and it is a report *about* the brief's production, not design content. It
 * matters to whoever runs stage 0 and to nobody downstream of it.
 */
const BRIEF_EXCLUDE = new Set(['VERIFIED.md']);

export async function briefSlice(briefDir) {
  const all = await walk(briefDir);
  const parts = [];
  const excluded = [];
  let lines = 0;
  let excludedLines = 0;
  for (const f of all) {
    const body = await readFile(f, 'utf8');
    const n = body.split('\n').length;
    // Report what was actually dropped, not what the rule would drop. A pack claiming to
    // have excluded a file the brief never had is a small lie that makes the rest suspect.
    if (BRIEF_EXCLUDE.has(basename(f))) {
      excluded.push({ name: basename(f), lines: n });
      excludedLines += n;
      continue;
    }
    lines += n;
    parts.push({ name: basename(f), body });
  }
  return { parts, lines, excluded, excludedLines };
}

/**
 * The contract keys one domain owns, and only those.
 *
 * `npm run bridge -- --contract` prints all eleven with their owners. A writer needs the
 * ones that are its responsibility plus the knowledge that the rest are spoken for.
 */
export function contractSlice(domain) {
  const mine = [];
  const others = [];
  for (const [key, spec] of Object.entries(SCHEMA)) {
    (spec.owner === domain ? mine : others).push({ key, owner: spec.owner, doc: spec.doc });
  }
  return { mine, others };
}
