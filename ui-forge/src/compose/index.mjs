/**
 * Brief -> spec compiler.
 *
 * This is the seam between the idea side and the build side, and it is
 * deliberately NOT an agent. A brief carries every decision that needs
 * judgement; turning it into a spec is mechanical. An LLM here would be slower,
 * non-reproducible, and free to drift from the token system in ways the
 * validator can only catch after the fact. A compiler cannot drift — it can
 * only emit what it was built to emit.
 *
 * The pattern registry doubles as the capability contract. `validateBrief`
 * rejects anything outside the enumerated parameter space, so an idea agent
 * cannot specify a screen the build side has no way to produce.
 */

import { modalGrid, meta as modalGridMeta } from './patterns/modal-grid.mjs';
import { hudOverlay, meta as hudOverlayMeta } from './patterns/hud-overlay.mjs';
import { applyOverrides, applySlots, addressableNodes } from './overrides.mjs';

export const PATTERNS = {
  'modal-grid': { build: modalGrid, meta: modalGridMeta },
  'hud-overlay': { build: hudOverlay, meta: hudOverlayMeta },
};

/** Machine-readable capability surface, for prompting/validating an idea agent. */
export function capabilities() {
  return Object.fromEntries(
    Object.entries(PATTERNS).map(([id, p]) => [id, {
      summary: p.meta.summary,
      variant: p.meta.variant,
      ornament: p.meta.ornament,
      slots: p.meta.slots ?? [],
      // Targets for `overrides` — the escape hatch for change requests nobody
      // enumerated in advance. Globs allowed.
      overrideTargets: p.meta.nodes ?? [],
    }]),
  );
}

/**
 * Validate a brief against its pattern's declared parameter space.
 * @returns {string[]} problems; empty means valid
 */
export function validateBrief(brief) {
  const problems = [];
  if (!brief || typeof brief !== 'object') return ['brief must be an object'];
  if (!brief.pattern) problems.push('missing "pattern"');

  const entry = PATTERNS[brief.pattern];
  if (brief.pattern && !entry) {
    problems.push(`unknown pattern "${brief.pattern}"; available: ${Object.keys(PATTERNS).join(', ')}`);
  }
  if (!entry) return problems;

  for (const group of ['variant', 'ornament']) {
    const allowed = entry.meta[group] ?? {};
    for (const [key, value] of Object.entries(brief[group] ?? {})) {
      if (!(key in allowed)) {
        problems.push(`${group}.${key} is not a parameter of "${brief.pattern}"; allowed: ${Object.keys(allowed).join(', ')}`);
      } else if (!allowed[key].includes(value)) {
        problems.push(`${group}.${key} = ${JSON.stringify(value)} is out of range; allowed: ${allowed[key].map((v) => JSON.stringify(v)).join(', ')}`);
      }
    }
  }

  // Content shape is the pattern's business, not the compiler's. A HUD has no
  // title and no priced items; a grid has no readouts. Hardcoding either here is
  // what made this registry single-pattern in practice however open it looked.
  if (typeof entry.meta.validateContent === 'function') {
    problems.push(...entry.meta.validateContent(brief.content ?? {}));
  } else {
    problems.push(`pattern "${brief.pattern}" declares no content contract (meta.validateContent)`);
  }

  return problems;
}

/**
 * @param {object} brief validated screen brief
 * @returns {object} ui spec
 */
export function compose(brief) {
  const problems = validateBrief(brief);
  if (problems.length) {
    throw new Error(`Invalid brief:\n  - ${problems.join('\n  - ')}`);
  }

  const entry = PATTERNS[brief.pattern];
  let spec = entry.build(brief);

  // Slots first (sanctioned structure), then overrides — so an override can
  // target something a slot injected.
  spec = applySlots(spec, brief.slots ?? {}, entry.meta.slots ?? []);
  const { applied } = applyOverrides(spec, brief.overrides ?? []);

  // Patterns crop screenshots to the panel by default, which is right until a
  // brief adds decoration outside it — then the crop hides the very thing the
  // change was about.
  if (brief.focus) spec.focus = brief.focus;

  spec.provenance = {
    pattern: brief.pattern,
    slots: Object.keys(brief.slots ?? {}),
    overrides: applied,
    addressable: addressableNodes(spec),
  };
  return spec;
}
