/**
 * The questionnaire desk.
 *
 * Generates questions for exactly the dimensions that are still open, and nothing
 * else. Two failure modes bracket this, and both are worse than they look:
 *
 *   Asking too much   A developer who has written a detailed brief and is then
 *                     asked to restate it stops reading and starts skipping, which
 *                     costs the answers that mattered.
 *   Asking too little The gap gets filled by inference, silently, and shows up
 *                     three stages later as a game that is not the one they wanted.
 *
 * The gate against under-asking is mechanical rather than editorial: every
 * unresolved required dimension must receive at least one blocking question, and
 * `check` rejects the questionnaire if one does not. What to ask is a judgement;
 * whether the required set is covered is not.
 *
 * Research runs BEFORE this on purpose. Knowing how the reference game's loop is
 * actually tuned is the difference between "how long is a lap of your loop?" and
 * "Pet Sim's hatch-to-upgrade lap is about 40 seconds — do you want yours faster,
 * matched, or deliberately slower?"
 */

import { askChecked } from '../../shared/llm/client.mjs';
import { QUESTIONS_SCHEMA } from './schema.mjs';
import { IDS, byId, normaliseDimension } from './dimensions.mjs';
import { summariseDraft } from './intake.mjs';
import { summariseResearch } from './research/synthesize.mjs';
import * as V from './vocab.mjs';

const KINDS = ['single', 'multi', 'text', 'number'];

const SYSTEM = `You are a Roblox game director interviewing a developer to pin down a concept
before any building starts.

ASK ONLY WHAT IS STILL OPEN. The input and the research have already settled things; a
question about something already answered wastes the developer's attention and teaches
them to skim. Say in your reasoning what you chose NOT to ask and why.

EVERY UNRESOLVED REQUIRED DIMENSION NEEDS AT LEAST ONE BLOCKING QUESTION. That is checked
mechanically. Beyond that, ask what you judge genuinely load-bearing.

WHAT A GOOD QUESTION LOOKS LIKE:
- It is answerable in one sentence or one pick. Not "describe your economy".
- It offers concrete options with consequences, so the developer chooses between real
  designs rather than composing prose. Use vocabulary keys as option values.
- It carries the research: "Pet Sim 99 gates rebirth behind 10 minutes of grind — do you
  want that gate tighter, looser, or gone?" beats "how does prestige work?".
- Its "why" says what the answer changes. That is what makes a long form worth filling in.

WHAT A BAD QUESTION LOOKS LIKE:
- Two questions joined by "and".
- A restatement of something the developer already wrote.
- A preference with no consequence attached ("what colours do you like?").
- Something the developer cannot reasonably know yet — that belongs in a later stage,
  not here.

ORDER BY CONSEQUENCE. The answer that most changes the rest of the design goes first,
because it is the one most likely to get a considered answer.

Use "suggested" generously — a good default the developer can accept makes a 20-question
form take three minutes. Base it on the research and the input, and say in a few words
why that default.`;

/**
 * @param {object} opts { draft, research, model, log }
 * @returns {Promise<object>} questionnaire document
 */
export async function generateQuestions({ draft, research = [], model, log = () => {} }) {
  // Which dimensions are open, from the intake read. `partial` counts as open:
  // a dimension that is gestured at still has the real decision unmade.
  const open = draft.coverage.filter((c) => c.status !== 'stated');
  const openRequired = open
    .map((c) => ({ ...c, def: byId(c.dimension) }))
    .filter((c) => c.def?.tier === 'required');

  const vocabBlock = [
    ['players.mode', V.PLAYER_MODES], ['players.structure', V.PLAYER_STRUCTURES],
    ['genre.primary', V.GENRES], ['genre.progression', V.PROGRESSION],
    ['genre.monetization', V.MONETIZATION], ['coreLoop.steps[].verb', V.LOOP_VERBS],
    ['mechanics[].kind', V.MECHANIC_KINDS], ['mechanics[].role', V.MECHANIC_ROLES],
    ['features[].dimension', V.FEATURE_DIMENSIONS], ['objectives[].scope', V.OBJECTIVE_SCOPES],
    ['audience.ageBand', V.AGE_BANDS], ['audience.experience', V.AUDIENCE_EXPERIENCE],
    ['audience.motivations', V.MOTIVATIONS], ['purpose.kind', V.PURPOSE_KINDS],
    ['artDirection.vibe', V.VIBES],
  ].map(([label, vocab]) => `${label}:\n${V.describe(vocab)}`).join('\n\n');

  const user = [
    summariseDraft(draft),
    '',
    research.length ? `RESEARCH ON REFERENCE GAMES:\n${summariseResearch(research)}` : 'RESEARCH: none — no reference games were identified.',
    '',
    'DIMENSIONS STILL OPEN (these are what you may ask about).',
    'Each question\'s "dimension" must be the bare id before the colon, with nothing appended.',
    open.map((c) => `  ${c.dimension}: ${byId(c.dimension)?.asks} [${c.status}, ${byId(c.dimension)?.tier}]`).join('\n'),
    '',
    'MUST RECEIVE AT LEAST ONE BLOCKING QUESTION EACH:',
    openRequired.length ? openRequired.map((c) => `  ${c.dimension}`).join('\n') : '  (none — every required dimension is already settled)',
    '',
    'OPTION VALUES — when a question maps onto one of these, use these keys as option values:',
    vocabBlock,
  ].join('\n');

  const requiredIds = new Set(openRequired.map((c) => c.dimension));
  const knownIds = new Set(IDS);

  const out = await askChecked({
    system: SYSTEM,
    user,
    schema: QUESTIONS_SCHEMA,
    schemaName: 'concept_questions',
    model,
    what: 'Questionnaire',
    check: (o) => {
      const problems = [];
      const qs = o.questions ?? [];
      // Repair a garbled dimension echo before judging coverage — see intake.mjs.
      for (const q of qs) {
        const fixed = normaliseDimension(q.dimension);
        if (fixed) q.dimension = fixed;
      }
      if (!qs.length && requiredIds.size) problems.push('no questions produced, but required dimensions are unresolved');

      const ids = qs.map((q) => q.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      if (dupes.length) problems.push(`duplicate question id(s): ${[...new Set(dupes)].join(', ')}`);

      for (const q of qs) {
        if (!knownIds.has(q.dimension)) problems.push(`question "${q.id}": unknown dimension "${q.dimension}"`);
        if (!KINDS.includes(q.kind)) problems.push(`question "${q.id}": kind must be one of ${KINDS.join(', ')}`);
        if (['single', 'multi'].includes(q.kind) && (q.options ?? []).length < 2) {
          problems.push(`question "${q.id}": kind "${q.kind}" needs at least 2 options`);
        }
        if (['text', 'number'].includes(q.kind) && (q.options ?? []).length) {
          problems.push(`question "${q.id}": kind "${q.kind}" must not carry options`);
        }
        // Two questions in one field means one of them gets answered.
        if (/\?.+\?/.test(q.question)) problems.push(`question "${q.id}" asks more than one thing — split it`);
      }

      const covered = new Set(qs.filter((q) => q.blocking).map((q) => q.dimension));
      const uncovered = [...requiredIds].filter((d) => !covered.has(d));
      if (uncovered.length) problems.push(`these unresolved required dimensions have no blocking question: ${uncovered.join(', ')}`);
      return problems;
    },
  });

  const questions = out.questions.map((q) => ({ ...q, answer: null }));
  log(`  ${questions.length} question(s) — ${questions.filter((q) => q.blocking).length} blocking`);
  log(`  ${out.reasoning}`);

  return {
    version: 1,
    slug: draft.slug,
    title: draft.title,
    reasoning: out.reasoning,
    // Recorded so `compile` can tell "answered null because the developer had no
    // opinion" from "never presented", and so a re-generated questionnaire can be
    // diffed against the one that was actually filled in.
    openDimensions: open.map((c) => c.dimension),
    questions,
  };
}

/**
 * Answers are edited into the questionnaire in place, by a human in the terminal
 * or by an agent editing the file. Both paths land here.
 *
 * A blocking question left unanswered is reported rather than defaulted: silently
 * accepting the suggestion would make the blocking flag meaningless.
 */
export function answerStatus(questionnaire) {
  const qs = questionnaire.questions ?? [];
  const answered = qs.filter((q) => q.answer !== null && q.answer !== '');
  const unansweredBlocking = qs.filter((q) => q.blocking && (q.answer === null || q.answer === ''));
  return {
    total: qs.length,
    answered: answered.length,
    unansweredBlocking,
    ready: unansweredBlocking.length === 0,
  };
}

/** Answered questions, rendered for the compile prompt. */
export function summariseAnswers(questionnaire) {
  const qs = (questionnaire.questions ?? []).filter((q) => q.answer !== null && q.answer !== '');
  if (!qs.length) return 'ANSWERS: none were provided.';
  return ['DEVELOPER ANSWERS — these are decisions, not suggestions. Honour them exactly:',
    ...qs.map((q) => `  [${q.dimension}] ${q.question}\n    ANSWER: ${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}`),
  ].join('\n');
}
