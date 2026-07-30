/**
 * Vision critic — the taste half of verification.
 *
 * The deterministic rules catch mechanical failure: things escaping their box,
 * unreadable text, un-tappable buttons. They cannot judge proportion, hierarchy,
 * balance, or whether a screen looks like the game it belongs to.
 *
 * This critic is told what the rules already checked, precisely so it does not
 * spend its attention re-finding overflow bugs. Its findings come out as plain
 * language, which is exactly the input the feedback translator consumes — so a
 * critique can be applied without a human retyping it.
 */

import { readFileSync } from 'node:fs';
import { ask } from './client.mjs';

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'score', 'strengths', 'findings'],
  properties: {
    verdict: { type: 'string', enum: ['ship', 'revise'] },
    score: { type: 'integer', description: '1 poor to 5 excellent.' },
    strengths: { type: 'array', items: { type: 'string' }, description: 'What is working. 1-3 items.' },
    findings: {
      type: 'array',
      description: 'Problems worth fixing, most important first. Empty if none.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['issue', 'why', 'feedback', 'severity'],
        properties: {
          issue: { type: 'string', description: 'What is wrong, concretely and visually.' },
          why: { type: 'string', description: 'Why it hurts the player experience.' },
          feedback: {
            type: 'string',
            description: 'The fix as a plain-language instruction a designer would give, e.g. "make the item cards taller and give the price more contrast". This is fed directly to the patch translator.',
          },
          severity: { type: 'string', enum: ['major', 'minor'] },
        },
      },
    },
  },
};

const SYSTEM = `You are a senior game UI designer reviewing a Roblox screen.

ALREADY CHECKED MECHANICALLY — do not report these:
- elements escaping their container or the screen
- text contrast ratios and text overflow
- touch target sizes
- responsive behaviour across viewports

Those all passed. Spend your attention on what arithmetic cannot judge:
- proportion and visual hierarchy — does the eye land on the right thing first?
- balance, rhythm, and use of empty space
- whether the art and the interface look like one designed product
- whether it reads as a real, polished game or as a generated template
- whether the most important action is obviously the most important thing

Roblox's audience is 8-16 and plays many games. Judge it against shipped titles like
Pet Simulator, Adopt Me and Blox Fruits, not against a desktop SaaS dashboard.

Be specific and be willing to say it is good. Do not invent problems to seem rigorous —
an empty findings list is a valid answer for a screen that works.`;

/**
 * @param {object} opts { pngPath, brief, theme, deterministicClean, model }
 */
export async function critique({ pngPath, brief, theme, deterministicClean = true, model }) {
  const dataUri = `data:image/png;base64,${readFileSync(pngPath).toString('base64')}`;

  const user = [
    `SCREEN: ${brief.content?.title ?? brief.screen}`,
    `PURPOSE: ${brief.purpose ?? '(unstated)'}`,
    `ART DIRECTION: ${theme.meta.archetypeLabel} (${theme.meta.archetype})`,
    `LAYOUT: ${JSON.stringify(brief.variant ?? {})}`,
    '',
    deterministicClean
      ? 'The mechanical validator reported no errors on this render.'
      : 'NOTE: the mechanical validator reported errors; ignore those and judge the design.',
    '',
    'Review the attached screenshot.',
  ].join('\n');

  return ask({
    system: SYSTEM,
    user,
    schema: SCHEMA,
    schemaName: 'ui_critique',
    model,
    images: [dataUri],
  });
}
