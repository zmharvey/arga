#!/usr/bin/env node
/**
 * Stage 0 — concept. Raw idea in, validated concept document out.
 *
 *   node concept/src/cli.mjs run     --input idea.md   # intake + research + questions
 *   node concept/src/cli.mjs answer                    # fill the questionnaire in the terminal
 *   node concept/src/cli.mjs compile                    # gate, then emit concept + game-context
 *
 * Every step reads and writes files in the workspace rather than holding state in
 * memory, so the questionnaire can be filled in by a human, by an agent, or half by
 * each, and a failed compile can be retried without re-running research.
 *
 * Exits non-zero whenever the gate rejects, so this is usable as a pipeline step
 * rather than something a human has to remember to read.
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

import { intake } from './intake.mjs';
import { researchReference } from './research/synthesize.mjs';
import { generateQuestions, answerStatus } from './questions.mjs';
import { compileConcept } from './compile.mjs';
import { deriveGameContext } from './derive/game-context.mjs';
import { coverage } from './dimensions.mjs';
import { validateConcept, auditConcept } from './validate.mjs';
import { describe, GENRES, PLAYER_MODES, LOOP_VERBS, MECHANIC_KINDS, FEATURE_DIMENSIONS,
  OBJECTIVE_SCOPES, MOTIVATIONS, PURPOSE_KINDS, MONETIZATION, PROGRESSION,
  REFERENCE_RELATIONSHIPS, AGE_BANDS, VIBES } from './vocab.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REPO = resolve(ROOT, '..');

// Same .env convention as ui-forge — friendlier than setx on Windows, which needs
// a terminal restart before the variable is visible.
for (const candidate of [resolve(REPO, '.env'), resolve(ROOT, '.env')]) {
  if (existsSync(candidate) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(candidate);
    break;
  }
}

const COMMANDS = ['run', 'intake', 'research', 'ask', 'answer', 'status', 'compile', 'vocab'];

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const next = argv[i + 1];
      out[a.slice(2)] = next === undefined || next.startsWith('--') ? true : argv[++i];
    } else out._.push(a);
  }
  return out;
}

const log = (m = '') => console.log(m);
const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'));
const writeJson = (p, v) => writeFile(p, `${JSON.stringify(v, null, 2)}\n`, 'utf8');

async function need(path, what, hint) {
  if (!existsSync(path)) throw new Error(`${what} not found at ${path}\n  ${hint}`);
  return readJson(path);
}

/** Everything the workspace holds, in one place so every command agrees on names. */
function paths(workspace) {
  return {
    dir: workspace,
    draft: resolve(workspace, 'draft.json'),
    research: resolve(workspace, 'research'),
    questions: resolve(workspace, 'questions.json'),
    concept: resolve(workspace, 'concept.json'),
    context: resolve(workspace, 'game-context.json'),
  };
}

async function loadResearch(dir) {
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort();
  return Promise.all(files.map((f) => readJson(resolve(dir, f))));
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

async function stepIntake({ p, args }) {
  const inputPath = args.input;
  if (!inputPath) throw new Error('intake needs --input <file>  (or --input - to read stdin)');

  const raw = inputPath === '-' || inputPath === true
    ? await new Promise((res, rej) => { let s = ''; process.stdin.on('data', (d) => { s += d; }).on('end', () => res(s)).on('error', rej); })
    : await readFile(resolve(process.cwd(), inputPath), 'utf8');

  if (!raw.trim()) throw new Error('the input is empty — there is nothing to read');

  log(`\nintake — reading ${raw.trim().length} characters`);
  const draft = await intake({ input: raw.trim(), model: args.model, log });
  await mkdir(p.dir, { recursive: true });
  await writeJson(p.draft, draft);
  log(`  -> ${p.draft}`);
  return draft;
}

async function stepResearch({ p, args, draft }) {
  const refs = draft.references ?? [];
  if (!refs.length) { log('\nresearch — no reference games identified, skipping'); return []; }

  await mkdir(p.research, { recursive: true });
  log(`\nresearch — ${refs.length} reference game(s)`);
  const docs = [];
  for (const ref of refs) {
    const out = resolve(p.research, `${ref.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.json`);
    // Cached by default. Research is the slowest and most expensive step, and
    // re-running `ask` to reword a questionnaire should not re-fetch six wikis.
    if (existsSync(out) && !args.force) {
      log(`  ${ref.name} — cached`);
      docs.push(await readJson(out));
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    const doc = await researchReference(ref, { model: args.model, log });
    // eslint-disable-next-line no-await-in-loop
    await writeJson(out, doc);
    docs.push(doc);
  }
  const unresearched = docs.filter((d) => !d.researched);
  if (unresearched.length) {
    log(`\n  ${unresearched.length} reference(s) had no findable source. Supply a URL to fix:`);
    for (const d of unresearched) log(`    ${d.name} — rerun with a "url" on its entry in draft.json`);
  }
  return docs;
}

async function stepAsk({ p, args, draft, research }) {
  log(`\nquestions — generating for open dimensions`);
  const q = await generateQuestions({ draft, research, model: args.model, log });
  await writeJson(p.questions, q);
  log(`  -> ${p.questions}`);
  return q;
}

/**
 * Terminal answering.
 *
 * Enter accepts the suggestion, which is what makes a twenty-question form
 * tolerable. A blocking question with no suggestion cannot be skipped that way —
 * that is the one case where the developer genuinely has to type something.
 */
async function stepAnswer({ p, args }) {
  const q = await need(p.questions, 'questions.json', 'Run "ask" first.');
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  log(`\n${q.title} — ${q.questions.length} question(s)`);
  log(`${q.reasoning}\n`);
  log('Enter accepts the suggestion in [brackets]. "s" skips. "?" explains why it is asked.\n');

  try {
    for (const [i, item] of q.questions.entries()) {
      if (item.answer !== null && item.answer !== '' && !args.all) continue;

      const head = `(${i + 1}/${q.questions.length}) [${item.dimension}]${item.blocking ? ' *required*' : ''}`;
      log(`\n${head}\n${item.question}`);
      for (const [n, o] of (item.options ?? []).entries()) {
        log(`  ${n + 1}. ${o.label}  —  ${o.implication}`);
      }
      if (item.suggested) log(`  suggested: ${item.suggested}`);

      for (;;) {
        const prompt = item.suggested ? `> [${item.suggested.split(/[.—]/)[0].trim()}] ` : '> ';
        // eslint-disable-next-line no-await-in-loop
        const raw = (await rl.question(prompt)).trim();

        if (raw === '?') { log(`  why: ${item.why}`); continue; }
        if (raw === 's') { log('  skipped'); break; }
        if (!raw) {
          if (item.suggested) { item.answer = item.suggested; log(`  accepted: ${item.suggested}`); break; }
          if (item.blocking) { log('  this one is required and has no suggestion to accept.'); continue; }
          break;
        }

        // A bare number (or list of them) selects options; anything else is taken
        // literally, so a developer with an answer outside the offered set is never
        // forced into one of them.
        const opts = item.options ?? [];
        if (opts.length && /^[\d\s,]+$/.test(raw)) {
          const picked = raw.split(/[\s,]+/).filter(Boolean).map(Number)
            .filter((n) => n >= 1 && n <= opts.length)
            .map((n) => opts[n - 1].value);
          if (!picked.length) { log(`  pick 1-${opts.length}, or type an answer.`); continue; }
          item.answer = item.kind === 'multi' ? picked : picked[0];
        } else {
          item.answer = raw;
        }
        log(`  recorded: ${Array.isArray(item.answer) ? item.answer.join(', ') : item.answer}`);
        break;
      }
    }
  } finally {
    rl.close();
  }

  await writeJson(p.questions, q);
  const st = answerStatus(q);
  log(`\n${st.answered}/${st.total} answered. ${st.ready ? 'Ready to compile.' : `${st.unansweredBlocking.length} required question(s) still open.`}`);
  return q;
}

async function stepCompile({ p, args }) {
  const draft = await need(p.draft, 'draft.json', 'Run "intake --input <file>" first.');
  const research = await loadResearch(p.research);
  const questionnaire = existsSync(p.questions) ? await readJson(p.questions) : null;

  if (questionnaire) {
    const st = answerStatus(questionnaire);
    if (!st.ready && !args.force) {
      log(`\n${st.unansweredBlocking.length} required question(s) are unanswered:\n`);
      for (const q of st.unansweredBlocking) log(`  [${q.dimension}] ${q.question}`);
      log('\nAnswer them ("answer"), or pass --force to compile with inferences in their place.');
      process.exit(1);
    }
    if (!st.ready) log(`\n--force: compiling with ${st.unansweredBlocking.length} required question(s) unanswered — those dimensions will be inferred.`);
  }

  log('\ncompile — assembling and validating');
  const { concept, flags } = await compileConcept({ draft, research, questionnaire, model: args.model, log });
  await writeJson(p.concept, concept);
  log(`  -> ${p.concept}`);

  const { context, notes } = deriveGameContext(concept);
  await writeJson(p.context, context);
  log(`  -> ${p.context}  (${context.screens.length} screen(s) for ui-forge)`);
  for (const n of notes) log(`  derived default: ${n}`);

  reportFlags(flags);
  log(`\nStage 0 complete. Next:`);
  log(`  node ui-forge/src/cli.mjs forge --context ${relativeToUiForge(p.context)} --viewport all`);
  return concept;
}

/**
 * ui-forge resolves --context against its own directory, not the cwd, so the
 * suggested command has to be relative to ui-forge/ or it will not run.
 * Forward slashes because a backslash in a copied command line is a headache.
 */
const relativeToUiForge = (abs) => relative(resolve(REPO, 'ui-forge'), abs).replace(/\\/g, '/');

function reportFlags(flags) {
  if (!flags.length) { log('\nNo flags — every dimension is stated, answered or researched.'); return; }
  const warns = flags.filter((f) => f.severity === 'warn');
  const notes = flags.filter((f) => f.severity === 'note');
  log(`\n${flags.length} flag(s) — ${warns.length} worth a look, ${notes.length} informational:`);
  for (const f of warns) log(`  ! ${f.dimension}: ${f.detail}`);
  for (const f of notes) log(`  · ${f.dimension}: ${f.detail}`);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] ?? 'status';
  if (!COMMANDS.includes(cmd)) {
    console.error(`Unknown command "${cmd}". Available: ${COMMANDS.join(', ')}.`);
    process.exit(1);
  }

  // The vocabulary surface, for prompting or for an agent filling in a
  // questionnaire. Mirrors ui-forge's "capabilities" command: this is the
  // enumerated space, and a concept naming anything outside it gets flagged.
  if (cmd === 'vocab') {
    const all = { GENRES, PLAYER_MODES, PURPOSE_KINDS, LOOP_VERBS, MECHANIC_KINDS,
      FEATURE_DIMENSIONS, OBJECTIVE_SCOPES, MOTIVATIONS, AGE_BANDS, MONETIZATION,
      PROGRESSION, REFERENCE_RELATIONSHIPS, VIBES };
    if (args.json) { console.log(JSON.stringify(all, null, 2)); return; }
    for (const [name, vocab] of Object.entries(all)) log(`\n${name}\n${describe(vocab)}`);
    return;
  }

  const p = paths(resolve(process.cwd(), args.out ?? resolve(ROOT, 'out')));

  if (cmd === 'status') {
    if (!existsSync(p.dir)) { log(`Nothing in ${p.dir} yet. Start with:\n  node concept/src/cli.mjs run --input idea.md`); return; }

    const concept = existsSync(p.concept) ? await readJson(p.concept) : null;
    if (concept) {
      log(`\n${concept.title} — ${concept.genre.primary} / ${concept.players.mode}\n${concept.logline}\n`);
      for (const c of coverage(concept)) {
        log(`  ${c.resolved ? 'ok  ' : c.tier === 'required' ? 'GAP ' : 'thin'} ${c.label}`);
        for (const g of c.gaps) log(`         ${g}`);
      }
      const problems = validateConcept(concept);
      log(problems.length ? `\n${problems.length} blocking problem(s) — this concept would not compile again.` : '\nGate: clean.');
      reportFlags(auditConcept(concept));
      return;
    }

    const draft = existsSync(p.draft) ? await readJson(p.draft) : null;
    if (!draft) { log(`No draft yet in ${p.dir}. Run "intake --input <file>".`); return; }
    log(`\n${draft.title} — intake done, not yet compiled\n`);
    for (const c of draft.coverage) log(`  ${c.status.padEnd(7)} ${c.dimension}`);
    const research = await loadResearch(p.research);
    log(`\nresearch: ${research.length ? research.map((r) => `${r.name}${r.researched ? '' : ' (unresearched)'}`).join(', ') : 'none'}`);
    if (existsSync(p.questions)) {
      const st = answerStatus(await readJson(p.questions));
      log(`questions: ${st.answered}/${st.total} answered${st.ready ? ' — ready to compile' : `, ${st.unansweredBlocking.length} required still open`}`);
    } else {
      log('questions: not generated yet');
    }
    return;
  }

  if (cmd === 'intake') { await stepIntake({ p, args }); return; }

  if (cmd === 'research') {
    const draft = await need(p.draft, 'draft.json', 'Run "intake --input <file>" first.');
    await stepResearch({ p, args, draft });
    return;
  }

  if (cmd === 'ask') {
    const draft = await need(p.draft, 'draft.json', 'Run "intake --input <file>" first.');
    await stepAsk({ p, args, draft, research: await loadResearch(p.research) });
    return;
  }

  if (cmd === 'answer') { await stepAnswer({ p, args }); return; }
  if (cmd === 'compile') { await stepCompile({ p, args }); return; }

  // `run` stops at the questionnaire on purpose. Everything before it is
  // automatic; everything after it depends on decisions only the developer can
  // make, and inventing them here would defeat the stage.
  if (cmd === 'run') {
    const draft = await stepIntake({ p, args });
    const research = await stepResearch({ p, args, draft });
    const q = await stepAsk({ p, args, draft, research });

    log(`\n${'-'.repeat(74)}`);
    log(`${q.questions.filter((x) => x.blocking).length} required and ${q.questions.filter((x) => !x.blocking).length} optional question(s) are waiting.\n`);
    for (const item of q.questions.slice(0, 40)) {
      log(`  ${item.blocking ? '*' : ' '} [${item.dimension}] ${item.question}`);
    }
    log(`\nAnswer them one of two ways:`);
    log(`  node concept/src/cli.mjs answer          # in the terminal`);
    log(`  ${p.questions}   # or fill in each "answer" field directly`);
    log(`\nThen: node concept/src/cli.mjs compile`);
  }
}

main().catch((err) => {
  console.error(`\nconcept failed: ${err.stack ?? err.message}`);
  process.exit(1);
});
