/**
 * Reference-game research — the first desk.
 *
 * Turns fetched page text into structured findings the question generator can
 * reason over. The value is not the summary; it is that a game named as
 * inspiration stops being a vibe ("like Pet Sim") and becomes a loop, a
 * progression shape, a monetization model and a list of conventions players will
 * expect. Questions asked with that in hand are specific instead of generic.
 *
 * The hard constraint is SOURCES ONLY. A model asked about a Roblox game will
 * happily produce plausible numbers from a version that shipped two years ago,
 * and the `uncertain` list exists so admitting a gap is an available move rather
 * than a failure.
 */

import { askChecked } from '../../../shared/llm/client.mjs';
import { RESEARCH_SCHEMA } from '../schema.mjs';
import * as V from '../vocab.mjs';
import { fetchReference, slugify } from './fetch.mjs';

const SYSTEM = `You extract structured game-design findings about ONE existing Roblox game.

USE ONLY THE SUPPLIED SOURCE TEXT. You will have prior impressions of popular Roblox
games; those games change constantly and your impressions are probably out of date.
When the sources do not cover something, put it in "uncertain" — do not fill it from
memory. A short honest answer is worth more here than a complete invented one.

If the sources are thin, off-topic, or clearly about a different game, set
confident to false and say so in "uncertain". That outcome is useful; a confident
fabrication is not.

WHAT MATTERS MOST. Not the lore or the item lists — the DESIGN:
- the loop, as an ordered sequence of what the player does
- what makes players keep playing, mechanically
- what players of this game will expect any similar game to have (conventions)
- where it monetizes, and what it charges for
- what people complain about

Write for a designer deciding what to copy and what to change.`;

/** Reject anything outside the vocabularies before the findings reach a prompt. */
function check(out) {
  const problems = [];
  const one = (path, value, vocab) => {
    if (!V.allowed(value, vocab)) problems.push(`${path}: "${value}" is not one of ${V.keysOf(vocab).join(', ')} (or a "custom:" value)`);
  };
  one('genre', out.genre, V.GENRES);
  one('playerMode', out.playerMode, V.PLAYER_MODES);
  (out.progression ?? []).forEach((v, i) => one(`progression[${i}]`, v, V.PROGRESSION));
  (out.monetization ?? []).forEach((v, i) => one(`monetization[${i}]`, v, V.MONETIZATION));
  if (out.confident && !(out.coreLoop ?? []).length) problems.push('confident is true but coreLoop is empty');
  return problems;
}

/**
 * Research one reference game end to end: fetch, then synthesize.
 *
 * Never throws on a retrieval failure — an unresearchable reference is recorded
 * as such and the pipeline continues. Losing the whole run because one wiki is
 * down would be worse than proceeding with a flagged gap.
 *
 * @param {object} ref { name, url, relationship, why }
 * @returns {Promise<object>} findings document, with researched:false when retrieval failed
 */
export async function researchReference(ref, { model, log = () => {} } = {}) {
  const slug = slugify(ref.name);
  log(`  ${ref.name} (${ref.relationship})`);

  const fetched = await fetchReference(ref, { log });

  if (!fetched.ok) {
    log(`    no sources — recorded as unresearched`);
    return {
      slug,
      name: ref.name,
      relationship: ref.relationship,
      why: ref.why ?? null,
      researched: false,
      sourceUrls: [],
      fetchErrors: fetched.errors,
      findings: null,
    };
  }

  const sourceBlock = fetched.sources
    .map((s, i) => `--- SOURCE ${i + 1}: ${s.title} (${s.url}) ---\n${s.text}`)
    .join('\n\n');

  const user = [
    `GAME: ${ref.name}`,
    ref.why ? `WHY IT IS RELEVANT TO US: ${ref.why}` : '',
    `HOW WE RELATE TO IT: ${ref.relationship}`,
    '',
    'VOCABULARIES — use these keys exactly.',
    `genre:\n${V.describe(V.GENRES)}`,
    `playerMode:\n${V.describe(V.PLAYER_MODES)}`,
    `progression:\n${V.describe(V.PROGRESSION)}`,
    `monetization:\n${V.describe(V.MONETIZATION)}`,
    '',
    sourceBlock,
  ].filter(Boolean).join('\n');

  const findings = await askChecked({
    system: SYSTEM,
    user,
    schema: RESEARCH_SCHEMA,
    schemaName: 'reference_research',
    model,
    check,
    what: `Research for "${ref.name}"`,
  });

  log(`    ${findings.confident ? 'confident' : 'LOW CONFIDENCE'} — loop: ${findings.coreLoop.join(' -> ') || 'unknown'}`);
  if (findings.uncertain.length) log(`    ${findings.uncertain.length} uncertain point(s)`);

  return {
    slug,
    name: findings.name || ref.name,
    relationship: ref.relationship,
    why: ref.why ?? null,
    researched: true,
    sourceUrls: fetched.sources.map((s) => s.url),
    fetchErrors: fetched.errors,
    findings,
  };
}

/** Compact rendering of a research set, for injection into later prompts. */
export function summariseResearch(docs) {
  return docs.map((d) => {
    if (!d.researched) return `${d.name} (${d.relationship}) — NOT RESEARCHED, no sources found. Treat any claim about it as unverified.`;
    const f = d.findings;
    return [
      `${d.name} (${d.relationship})${f.confident ? '' : ' — LOW CONFIDENCE SOURCES'}`,
      `  what it is: ${f.summary}`,
      `  genre/mode: ${f.genre} / ${f.playerMode}`,
      `  loop: ${f.coreLoop.join(' -> ')}`,
      `  progression: ${f.progression.join(', ')}`,
      `  monetization: ${f.monetization.join(', ')}`,
      `  standout mechanics: ${f.standoutMechanics.join('; ')}`,
      `  why it works: ${f.whyItWorks.join('; ')}`,
      `  weaknesses: ${f.weaknesses.join('; ')}`,
      `  player expectations we would inherit: ${f.conventions.join('; ')}`,
      f.uncertain.length ? `  unverified: ${f.uncertain.join('; ')}` : '',
    ].filter(Boolean).join('\n');
  }).join('\n\n');
}
