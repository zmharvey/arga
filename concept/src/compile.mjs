/**
 * The assembly desk — draft + research + answers -> the concept document.
 *
 * One model call, then a hard gate. The call is the last point in stage 0 where
 * judgement is applied; everything after it is code.
 *
 * The gate is `validateConcept`, and it is the whole reason this stage is worth
 * having. A concept document that is missing a required dimension, contradicts
 * itself, or hides a gap behind "TBD" does not get written to disk — it gets one
 * retry with the exact complaints, and then it fails loudly. The alternative is a
 * plausible-looking doc that four later stages build on top of before anyone
 * notices what was never actually decided.
 */

import { askChecked } from '../../shared/llm/client.mjs';
import { CONCEPT_SCHEMA } from './schema.mjs';
import { DIMENSIONS } from './dimensions.mjs';
import { validateConcept, auditConcept } from './validate.mjs';
import { summariseDraft } from './intake.mjs';
import { summariseResearch } from './research/synthesize.mjs';
import { summariseAnswers } from './questions.mjs';
import { attributeProvenance, provenanceSummary } from './provenance.mjs';
import * as V from './vocab.mjs';

const SYSTEM = `You assemble a final, buildable Roblox game concept from three inputs: the
developer's original idea, research on the games it references, and the developer's answers
to a questionnaire.

PRECEDENCE, strictly in this order:
  1. The developer's ANSWERS. These are decisions. Never soften, reinterpret or improve them.
  2. The developer's ORIGINAL INPUT. Anything stated there stands unless an answer overrode it.
  3. RESEARCH on reference games. Use it to fill gaps and to inherit conventions players
     will expect — but a reference is not a template. Do not import a mechanic the
     developer never asked for just because the reference has it.
  4. Your own judgement. Where the first three are silent you must still decide, because a
     downstream stage that has to guess is exactly what this document exists to prevent.
     Declare every such decision as source "inferred" in provenance.

BE SPECIFIC ENOUGH TO BUILD FROM. "An upgrade system" is not a decision; "spend Shards to
raise a pet's coin multiplier, cost scaling 1.6x per level, capped at 10" is. When you do
not have the information to be that specific, still commit to a concrete answer and mark
it inferred with a note — a stated assumption can be corrected, a vague phrase cannot.

NEVER write TBD, TODO, N/A, "various", "and more", or "Item 1" in any content field. Those
are rejected mechanically. If something is genuinely undecided, commit to a default and
list the real uncertainty in openQuestions.

THE CORE LOOP IS THE LOAD-BEARING PART. Steps are things the player DOES, never screens
they open. It must actually close: state how the last step feeds back into the first, and
what changes between lap 1 and lap 100 so it does not go flat.

PROVENANCE: one entry per dimension. Whether it came from the input, an answer or research
is worked out by code afterwards, so do not agonise over "source" — what matters from you is
"confidence" and, wherever you added or assumed anything beyond what you were given, a
"note" saying what. "You picked the mode; I chose the server size" is exactly the kind of
note that earns its place.

Roblox players are mostly 8-16, mostly on phones, and play many games. Be inventive about
what this game IS; be conventional about how it communicates, because deviation costs
comprehension.`;

/**
 * @param {object} opts { draft, research, questionnaire, model, log }
 * @returns {Promise<{concept:object, flags:Array}>}
 */
export async function compileConcept({ draft, research = [], questionnaire, model, log = () => {} }) {
  const vocabBlock = [
    ['purpose.kind', V.PURPOSE_KINDS], ['players.mode', V.PLAYER_MODES],
    ['players.structure', V.PLAYER_STRUCTURES], ['genre.primary / genre.secondary', V.GENRES],
    ['genre.progression[]', V.PROGRESSION], ['genre.monetization[]', V.MONETIZATION],
    ['coreLoop.steps[].verb', V.LOOP_VERBS], ['mechanics[].kind', V.MECHANIC_KINDS],
    ['mechanics[].role', V.MECHANIC_ROLES], ['features[].dimension', V.FEATURE_DIMENSIONS],
    ['objectives[].scope', V.OBJECTIVE_SCOPES], ['references[].relationship', V.REFERENCE_RELATIONSHIPS],
    ['audience.ageBand', V.AGE_BANDS], ['audience.experience', V.AUDIENCE_EXPERIENCE],
    ['audience.motivations[]', V.MOTIVATIONS], ['artDirection.vibe', V.VIBES],
  ].map(([label, vocab]) => `${label}:\n${V.describe(vocab)}`).join('\n\n');

  const user = [
    summariseDraft(draft),
    '',
    research.length ? `RESEARCH:\n${summariseResearch(research)}` : 'RESEARCH: none.',
    '',
    questionnaire ? summariseAnswers(questionnaire) : 'ANSWERS: no questionnaire was run.',
    '',
    'HARD REQUIREMENTS — these are checked by code and will reject the document:',
    DIMENSIONS.filter((d) => d.tier === 'required').map((d) => `  ${d.id}: ${d.asks}`).join('\n'),
    `  minimum counts: ${Object.entries(V.EXPECTED).map(([k, v]) => `${k} >= ${v}`).join(', ')}`,
    '  objectives must include at least one "session" scope and at least one "long-term" or "mastery" scope',
    '  features must include at least one "core-loop" dimension and at least one priority 1, but no more than 60% may be priority 1 — if everything ships first, nothing is prioritised',
    '  mechanics must include at least one role "core"',
    '  audience.platformMix must sum to exactly 1',
    '  any reference with relationship "reskin-base" must have specific deltas',
    '',
    'PROVENANCE — exactly one entry per dimension id, no more, no fewer:',
    `  ${DIMENSIONS.map((d) => d.id).join(', ')}`,
    '',
    'VOCABULARIES — use these keys exactly. "custom:<label>" is allowed but gets flagged for review, so prefer a listed key when one honestly fits:',
    vocabBlock,
  ].join('\n');

  // Provenance is attributed before validation, not after, so the gate judges the
  // document that will actually be written. Validating the model's self-reported
  // provenance and then discarding it would mean retrying over a field nobody
  // downstream ever reads.
  const attribute = (out) => attributeProvenance({ claimed: out.provenance, draft, questionnaire });

  const raw = await askChecked({
    system: SYSTEM,
    user,
    schema: CONCEPT_SCHEMA,
    schemaName: 'game_concept',
    model,
    check: (out) => validateConcept({ ...out, provenance: attribute(out) }),
    what: 'Concept document',
  });
  const concept = { ...raw, provenance: attribute(raw) };

  // Stitch the source URLs back on from the research artifacts. The model must not
  // be trusted to reproduce a URL it saw in a prompt — a hallucinated citation is
  // worse than none, because the flag for "unverified" would stop firing.
  const urlBySlug = new Map(research.filter((r) => r.researched).map((r) => [r.slug, r.sourceUrls[0] ?? null]));
  const byName = new Map(research.map((r) => [r.name.toLowerCase(), r]));
  for (const ref of concept.references ?? []) {
    const match = urlBySlug.has(ref.slug) ? urlBySlug.get(ref.slug) : (byName.get(String(ref.name).toLowerCase())?.sourceUrls?.[0] ?? null);
    ref.url = match ?? null;
  }

  const flags = auditConcept(concept);
  log(`  ${concept.title} — ${concept.genre.primary} / ${concept.players.mode}`);
  log(`  loop: ${concept.coreLoop.steps.map((s) => s.label).join(' -> ')} (${concept.coreLoop.lapSeconds}s lap)`);
  log(`  ${concept.mechanics.length} mechanics, ${concept.features.length} features, ${concept.objectives.length} objectives`);
  log(`  ${provenanceSummary(concept.provenance)}`);

  return { concept: { version: 1, ...concept, flags }, flags };
}
