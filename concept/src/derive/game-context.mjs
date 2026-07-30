/**
 * concept.json -> ui-forge game-context.json. Pure code, no model.
 *
 * This is the stage 0 / stage 1 seam, and it follows the same rule as the
 * brief/spec seam inside ui-forge: the handoff is a derivation, never a prompt.
 * Anything an LLM would have to re-interpret between the two stages is a place
 * variance re-enters, and eliminating that variance is the point of the pipeline.
 *
 * Practical consequence: `examples/game-context.json` stops being hand-authored.
 * It becomes a build artifact of the concept document, so a change to the concept
 * propagates rather than needing to be remembered in two files.
 */

import { GENRE_VIBE_DEFAULTS, isCustom, customLabel, VIBES } from '../vocab.mjs';
import { ARCHETYPES, VIBE_ALIASES } from '../../../ui-forge/src/theme/palettes.mjs';

/**
 * Resolve loose art-direction words onto a design-system archetype.
 *
 * Runs ui-forge's own alias table over the custom label and then the mood words,
 * because a vibe of "custom:cozy bioluminescent reef" is not signal-free — it says
 * cozy. Falling straight through to the genre default would have thrown that away
 * and given a calm collection game the cartoon-vibrant palette.
 *
 * Returns null when nothing matched, so the caller can distinguish "resolved from
 * the developer's words" from "defaulted", and report the difference.
 */
function archetypeFromWords(candidates) {
  for (const raw of candidates.filter(Boolean)) {
    const word = String(raw).toLowerCase().trim();
    if (ARCHETYPES[word]) return { key: word, via: `"${raw}"` };
    for (const [alias, target] of Object.entries(VIBE_ALIASES)) {
      if (word.includes(alias)) return { key: target, via: `"${raw}" via "${alias}"` };
    }
  }
  return null;
}

/** Enumerated value -> plain string for a consumer that does not know the vocabulary. */
const plain = (v) => (isCustom(v) ? customLabel(v) : v ?? null);

/**
 * Screens ui-forge should plan for.
 *
 * Taken from what features actually declare they need, so the screen set is
 * derived from the design rather than guessed from the genre. Priority is the
 * strongest claim any requesting feature makes: a screen needed by a priority-1
 * feature is priority 1, whatever else also wants it.
 */
function screensFrom(concept) {
  const byId = new Map();
  for (const f of concept.features ?? []) {
    for (const id of f.screens ?? []) {
      const existing = byId.get(id);
      if (existing) {
        existing.priority = Math.min(existing.priority, f.priority);
        existing.purposes.push(f.label);
      } else {
        byId.set(id, { id, priority: f.priority, purposes: [f.label] });
      }
    }
  }
  return [...byId.values()]
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))
    .map((s) => ({
      id: s.id,
      // Multiple features on one screen is normal — a shop is both the spend sink
      // and the monetization surface — so the purpose names all of them rather
      // than silently keeping whichever was seen first.
      purpose: s.purposes.join(' + ').toLowerCase(),
      priority: s.priority,
    }));
}

/**
 * The inspiration block, from the reference set.
 *
 * `reskin-base` outranks everything: it is the one relationship that changes how
 * ui-forge treats the source, because the deltas become the only permitted
 * departures from a known-good design.
 */
function inspirationFrom(concept) {
  const refs = concept.references ?? [];
  const base = refs.find((r) => r.relationship === 'reskin-base');
  if (base) return { mode: 'reskin', source: base.name, deltas: base.deltas ?? [] };

  const inspo = refs.find((r) => r.relationship === 'direct-inspiration')
    ?? refs.find((r) => ['loop-benchmark', 'art-benchmark'].includes(r.relationship));
  if (inspo) return { mode: 'inspiration', source: inspo.name, deltas: inspo.deltas ?? [] };

  return { mode: 'original', source: null, deltas: [] };
}

/**
 * @param {object} concept a validated concept document
 * @returns {{context:object, notes:string[]}} notes record every value that was
 *   defaulted rather than carried, so a thin concept does not quietly become a
 *   generic-looking game.
 */
export function deriveGameContext(concept) {
  const notes = [];
  const genre = plain(concept.genre?.primary);

  let vibe = concept.artDirection?.vibe;
  if (!vibe || isCustom(vibe) || !Object.hasOwn(VIBES, vibe)) {
    const stated = vibe ? (customLabel(vibe) ?? vibe) : null;
    // Try the developer's own words first — the custom label, then the mood.
    const matched = archetypeFromWords([stated, ...(concept.artDirection?.mood ?? [])]);
    if (matched) {
      notes.push(`artDirection.vibe "${vibe}" is not an archetype — resolved to "${matched.key}" from ${matched.via}`);
      vibe = matched.key;
    } else {
      // Nothing in the art direction mapped. ui-forge's own fallback for an
      // unknown vibe is 'clean-modern', the blandest possible outcome; a
      // genre-based default is a better guess, and saying so is better than either.
      const fallback = GENRE_VIBE_DEFAULTS[genre] ?? 'clean-modern';
      notes.push(vibe
        ? `artDirection.vibe "${vibe}" matched no archetype or alias — using "${fallback}" from genre "${genre}"`
        : `no artDirection.vibe — using "${fallback}" from genre "${genre}"`);
      vibe = fallback;
    }
  }

  const screens = screensFrom(concept);
  if (!screens.length) notes.push('no feature declares a screen — ui-forge will plan the screen set from scratch');

  const steps = concept.coreLoop?.steps ?? [];
  const economy = concept.economy ?? {};

  const context = {
    // Provenance for the artifact itself. Without it, the first person to hand-edit
    // this file loses their change on the next compile and has no idea why.
    $derivedFrom: `${concept.slug}.concept.json`,
    $generated: 'concept/src/derive/game-context.mjs — do not hand-edit; change the concept and recompile',

    title: concept.title,
    genre,
    subgenre: plain(concept.genre?.secondary) ?? undefined,
    inspiration: inspirationFrom(concept),
    audience: {
      ageBand: plain(concept.audience?.ageBand),
      platformMix: concept.audience?.platformMix ?? { mobile: 0.7, desktop: 0.25, console: 0.05 },
    },
    artDirection: {
      vibe,
      mood: concept.artDirection?.mood ?? [],
      paletteHints: concept.artDirection?.paletteHints ?? [],
      referenceNote: concept.artDirection?.referenceNote ?? '',
    },
    economy: {
      softCurrency: economy.softCurrency ?? undefined,
      hardCurrency: economy.hardCurrency ?? undefined,
      premium: economy.premium ?? undefined,
    },
    // ui-forge wants the loop as short verb phrases for prompting; the structured
    // form stays in the concept doc where later stages can still use it.
    coreLoop: steps.map((s) => s.label),
    screens,
  };

  if (!economy.softCurrency && !(concept.genre?.monetization ?? []).includes('none')) {
    notes.push('no soft currency named — screens that show a currency chip have nothing to put in it');
  }

  // Strip undefined so the JSON matches the hand-authored examples rather than
  // carrying explicit nulls ui-forge would then have to guard against.
  return { context: JSON.parse(JSON.stringify(context)), notes };
}
