/**
 * Where each dimension's content came from — attributed by code, not self-reported.
 *
 * The model was originally asked to declare this itself, under a "use the weakest
 * source that contributed" rule. It complied honestly and the result was useless:
 * because it elaborates on every answer to reach buildable specificity, every
 * dimension came back "inferred", including the ten the developer had just
 * answered questions about. A provenance field where everything has the same value
 * carries no information, and provenance IS the mechanism by which this stage
 * reports what it decided on the developer's behalf.
 *
 * The facts needed are already on disk and are not matters of judgement: the intake
 * pass recorded which dimensions the input stated, and the questionnaire records
 * which ones received an answer. So `source` is computed, and the model is left to
 * supply only what it actually knows better than code does — how confident it is,
 * and what it assumed.
 */

import { DIMENSIONS } from './dimensions.mjs';

const answered = (v) => v !== null && v !== undefined && v !== ''
  && !(Array.isArray(v) && v.length === 0);

/**
 * @param {object} opts { claimed, draft, questionnaire }
 *   claimed       provenance as the model reported it — confidence and notes are kept
 *   draft         the intake document, for what the input stated
 *   questionnaire the answered questionnaire, or null
 * @returns {Array} one entry per dimension
 */
export function attributeProvenance({ claimed = [], draft, questionnaire }) {
  const byDimension = new Map(claimed.map((p) => [p.dimension, p]));

  const stated = new Set((draft?.coverage ?? [])
    .filter((c) => c.status === 'stated')
    .map((c) => c.dimension));

  const answeredDims = new Set((questionnaire?.questions ?? [])
    .filter((q) => answered(q.answer))
    .map((q) => q.dimension));

  return DIMENSIONS.map((d) => {
    const claim = byDimension.get(d.id) ?? {};

    // Precedence: a direct answer outranks the original input, because it is both
    // more recent and more specific. Below those, the model's own claim of
    // "researched" is trusted — nothing on disk attributes a sentence to a wiki
    // page, and inventing an attribution rule for it would be worse than
    // accepting the one claim it is actually positioned to make.
    let source = 'inferred';
    if (answeredDims.has(d.id)) source = 'answered';
    else if (stated.has(d.id)) source = 'stated';
    else if (claim.source === 'researched') source = 'researched';

    return {
      dimension: d.id,
      source,
      confidence: ['high', 'medium', 'low'].includes(claim.confidence) ? claim.confidence : 'low',
      // The note explains what was assumed or added, which stays useful even when
      // the dimension was answered — "you picked the mode; I chose the server size"
      // is exactly the kind of thing a developer wants to see.
      note: claim.note ?? null,
    };
  });
}

/** One-line summary of how much of the concept the developer actually decided. */
export function provenanceSummary(provenance) {
  const tally = { stated: 0, answered: 0, researched: 0, inferred: 0 };
  for (const p of provenance) tally[p.source] = (tally[p.source] ?? 0) + 1;
  const total = provenance.length;
  return `${tally.stated + tally.answered}/${total} dimensions came from you `
    + `(${tally.stated} stated, ${tally.answered} answered), `
    + `${tally.researched} from research, ${tally.inferred} inferred`;
}
