/**
 * The concept gate — pure code, no model.
 *
 * Two outputs, deliberately separated:
 *
 *   problems  block compilation. Something is wrong or missing that a later stage
 *             would have to guess at, and guessing is where variance re-enters.
 *   flags     do not block. Something is thin, inferred, or used an escape hatch.
 *             The developer needs to see it; the pipeline can proceed.
 *
 * Collapsing these into one list was tempting and wrong. If every soft concern
 * blocks, the gate gets bypassed. If nothing blocks, the guarantee is worthless.
 */

import * as V from './vocab.mjs';
import { DIMENSIONS, coverage } from './dimensions.mjs';

const arr = (v) => (Array.isArray(v) ? v : []);
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Text that satisfies a schema while meaning nothing. A model under-informed
 * about a dimension reaches for these rather than admitting the gap, and they
 * pass every structural check — so they are checked for by name.
 */
const PLACEHOLDER = /\b(tbd|to be decided|to be determined|todo|tba|n\/?a|placeholder|lorem ipsum|item \d|feature \d|mechanic \d|thing \d|coming soon|etc\.?$|and more|various|something like that)\b/i;

/** Every enumerated field, as [path, value, vocab]. One list, used by both passes. */
function enumeratedFields(c) {
  const f = [];
  const push = (path, value, vocab) => f.push({ path, value, vocab });

  push('purpose.kind', c.purpose?.kind, V.PURPOSE_KINDS);
  push('players.mode', c.players?.mode, V.PLAYER_MODES);
  push('players.structure', c.players?.structure, V.PLAYER_STRUCTURES);
  push('genre.primary', c.genre?.primary, V.GENRES);
  if (c.genre?.secondary) push('genre.secondary', c.genre.secondary, V.GENRES);
  arr(c.genre?.progression).forEach((v, i) => push(`genre.progression[${i}]`, v, V.PROGRESSION));
  arr(c.genre?.monetization).forEach((v, i) => push(`genre.monetization[${i}]`, v, V.MONETIZATION));
  arr(c.coreLoop?.steps).forEach((s, i) => push(`coreLoop.steps[${i}].verb`, s?.verb, V.LOOP_VERBS));
  arr(c.mechanics).forEach((m, i) => {
    push(`mechanics[${i}].kind`, m?.kind, V.MECHANIC_KINDS);
    push(`mechanics[${i}].role`, m?.role, V.MECHANIC_ROLES);
  });
  arr(c.features).forEach((x, i) => push(`features[${i}].dimension`, x?.dimension, V.FEATURE_DIMENSIONS));
  arr(c.objectives).forEach((o, i) => push(`objectives[${i}].scope`, o?.scope, V.OBJECTIVE_SCOPES));
  arr(c.references).forEach((r, i) => push(`references[${i}].relationship`, r?.relationship, V.REFERENCE_RELATIONSHIPS));
  push('audience.ageBand', c.audience?.ageBand, V.AGE_BANDS);
  push('audience.experience', c.audience?.experience, V.AUDIENCE_EXPERIENCE);
  arr(c.audience?.motivations).forEach((v, i) => push(`audience.motivations[${i}]`, v, V.MOTIVATIONS));
  push('artDirection.vibe', c.artDirection?.vibe, V.VIBES);

  return f;
}

/** Walk every string in the document, so placeholder text cannot hide in a nested array. */
function eachString(value, path, visit) {
  if (typeof value === 'string') { visit(value, path); return; }
  if (Array.isArray(value)) { value.forEach((v, i) => eachString(v, `${path}[${i}]`, visit)); return; }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) eachString(v, path ? `${path}.${k}` : k, visit);
  }
}

/**
 * Blocking validation.
 *
 * @param {object} c parsed concept document
 * @returns {string[]} problems; empty means it may be written
 */
export function validateConcept(c) {
  const problems = [];
  if (!c || typeof c !== 'object') return ['concept is not an object'];

  if (!c.title) problems.push('missing "title"');
  if (!KEBAB.test(String(c.slug ?? ''))) problems.push(`slug "${c.slug}" is not kebab-case`);
  if (!c.logline) problems.push('missing "logline"');
  else if (c.logline.length > 140) problems.push(`logline is ${c.logline.length} chars — must be 140 or fewer`);
  if (!c.premise) problems.push('missing "premise"');

  // Every required dimension must be resolved. This is the actual guarantee the
  // stage exists to provide, so it is checked here rather than only at the CLI.
  for (const cov of coverage(c)) {
    if (cov.tier !== 'required' || cov.resolved) continue;
    for (const gap of cov.gaps) problems.push(`${cov.dimension}: ${gap}`);
  }

  // Escape-hatch values are legal; values that are neither enumerated nor a
  // well-formed escape are not — that is a typo or an invention, and both would
  // silently break a downstream switch.
  for (const { path, value, vocab } of enumeratedFields(c)) {
    if (value === undefined || value === null) continue;
    if (!V.allowed(value, vocab)) {
      problems.push(`${path}: "${value}" is not a known value and is not a "custom:" escape (allowed: ${V.keysOf(vocab).join(', ')})`);
    }
  }

  // Referential integrity inside the document.
  const mechanicIds = new Set(arr(c.mechanics).map((m) => m.id));
  for (const m of arr(c.mechanics)) {
    for (const dep of arr(m.dependsOn)) {
      if (!mechanicIds.has(dep)) problems.push(`mechanics.${m.id}: dependsOn "${dep}" is not a mechanic id`);
    }
  }
  for (const [ids, what] of [[arr(c.mechanics).map((m) => m.id), 'mechanic'], [arr(c.features).map((f) => f.id), 'feature']]) {
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) problems.push(`duplicate ${what} id(s): ${[...new Set(dupes)].join(', ')}`);
    const bad = ids.filter((id) => !KEBAB.test(String(id ?? '')));
    if (bad.length) problems.push(`${what} id(s) not kebab-case: ${bad.join(', ')}`);
  }
  for (const f of arr(c.features)) {
    if (![1, 2, 3].includes(f.priority)) problems.push(`features.${f.id}: priority must be 1, 2 or 3 (got ${f.priority})`);
    const bad = arr(f.screens).filter((s) => !KEBAB.test(String(s ?? '')));
    if (bad.length) problems.push(`features.${f.id}: screen id(s) not kebab-case: ${bad.join(', ')}`);
  }

  // Provenance must cover every dimension. Partial provenance is worse than none:
  // an absent entry reads as "nothing to declare" rather than "not recorded".
  const declared = new Set(arr(c.provenance).map((p) => p.dimension));
  const missing = DIMENSIONS.map((d) => d.id).filter((id) => !declared.has(id));
  if (missing.length) problems.push(`provenance missing for: ${missing.join(', ')}`);
  for (const p of arr(c.provenance)) {
    if (!['stated', 'researched', 'answered', 'inferred'].includes(p.source)) {
      problems.push(`provenance.${p.dimension}: unknown source "${p.source}"`);
    }
    if (!['high', 'medium', 'low'].includes(p.confidence)) {
      problems.push(`provenance.${p.dimension}: unknown confidence "${p.confidence}"`);
    }
  }

  // Placeholder text. Restricted to the fields a later stage reads as content —
  // risks and openQuestions legitimately discuss uncertainty, and flagging the
  // word "TBD" inside "the pricing tier is TBD" would punish the honesty the
  // schema asks for.
  const contentOnly = { title: c.title, logline: c.logline, premise: c.premise,
    purpose: c.purpose, players: c.players, genre: c.genre, coreLoop: c.coreLoop,
    mechanics: c.mechanics, features: c.features, objectives: c.objectives,
    audience: c.audience, artDirection: c.artDirection, economy: c.economy };
  eachString(contentOnly, '', (s, path) => {
    const hit = s.match(PLACEHOLDER);
    if (hit) problems.push(`${path}: placeholder text "${hit[0]}" — this dimension is not actually decided`);
  });

  return problems;
}

/**
 * Non-blocking audit. Everything the developer should see before trusting the doc.
 *
 * @returns {{severity:'warn'|'note', dimension:string, detail:string}[]}
 */
export function auditConcept(c) {
  const flags = [];
  const warn = (dimension, detail) => flags.push({ severity: 'warn', dimension, detail });
  const note = (dimension, detail) => flags.push({ severity: 'note', dimension, detail });

  // Escape hatches. Each one is a promise that some later stage needs new code.
  for (const { path, value } of enumeratedFields(c)) {
    if (V.isCustom(value)) {
      warn(path.split(/[.[]/)[0], `"${path}" uses the escape hatch: ${V.customLabel(value)} — no downstream stage handles this yet`);
    }
  }

  // Supporting dimensions that are thin. Not blocking, but they get defaulted,
  // and a silent default is how a game ends up looking like the generic one.
  for (const cov of coverage(c)) {
    if (cov.tier === 'supporting' && !cov.resolved) {
      for (const gap of cov.gaps) note(cov.dimension, gap);
    }
  }

  // Provenance the developer should look at: anything decided FOR them.
  for (const p of arr(c.provenance)) {
    if (p.source === 'inferred' && p.confidence === 'low') {
      warn(p.dimension, `inferred with low confidence${p.note ? ` — ${p.note}` : ''}`);
    } else if (p.source === 'inferred') {
      note(p.dimension, `inferred, not stated${p.note ? ` — ${p.note}` : ''}`);
    }
  }

  // A reference with no URL was never actually researched — the findings for it
  // came from model memory, which for Roblox games goes stale within months.
  for (const r of arr(c.references)) {
    if (!r.url) note('references', `"${r.name}" has no source URL — its details were not verified against a live page`);
  }

  // Loop arithmetic. Steps that sum to something far from the stated lap length
  // means one of the two numbers is decoration.
  const steps = arr(c.coreLoop?.steps);
  if (steps.length && Number.isFinite(c.coreLoop?.lapSeconds)) {
    const sum = steps.reduce((n, s) => n + Number(s.seconds ?? 0), 0);
    const lap = Number(c.coreLoop.lapSeconds);
    if (sum > 0 && (sum > lap * 1.6 || sum < lap * 0.6)) {
      warn('coreLoop', `steps sum to ${sum}s but lapSeconds says ${lap}s`);
    }
  }

  // Feature-dimension spread. A concept that is all core loop has not thought
  // about why anyone comes back, which is the most expensive gap to find late.
  const dims = new Set(arr(c.features).map((f) => f.dimension));
  for (const want of ['onboarding', 'retention', 'monetization', 'social']) {
    if (!dims.has(want)) {
      const excused = want === 'monetization' && arr(c.genre?.monetization).includes('none');
      const solo = want === 'social' && c.players?.mode === 'single-player';
      if (!excused && !solo) note('features', `no feature covers "${want}"`);
    }
  }

  // Priority inflation. "Everything ships first" is not a plan, and it propagates:
  // the derived screen set inherits these numbers, so ui-forge is told every screen
  // is equally urgent and the ordering it would otherwise get is lost.
  const features = arr(c.features);
  const p1 = features.filter((f) => f.priority === 1).length;
  if (features.length >= 4 && p1 / features.length > 0.6) {
    warn('features', `${p1} of ${features.length} features are priority 1 — nothing is actually prioritised`);
  }

  // Mechanics nothing depends on and that no feature names. Usually an idea that
  // survived from an earlier draft and now has no home.
  const featureText = arr(c.features).map((f) => `${f.label} ${f.description}`).join(' ').toLowerCase();
  const dependedOn = new Set(arr(c.mechanics).flatMap((m) => arr(m.dependsOn)));
  for (const m of arr(c.mechanics)) {
    if (m.role === 'core') continue;
    if (!dependedOn.has(m.id) && !featureText.includes(String(m.label).toLowerCase())) {
      note('mechanics', `"${m.label}" is not depended on by another mechanic and no feature mentions it`);
    }
  }

  if (arr(c.openQuestions).length) {
    note('openQuestions', `${arr(c.openQuestions).length} question(s) left open for later stages`);
  }
  if (!arr(c.purpose?.nonGoals).length) note('purpose', 'no non-goals stated — scope has nothing holding it in');

  return flags;
}
