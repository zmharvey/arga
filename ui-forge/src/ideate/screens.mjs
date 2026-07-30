/**
 * Screen planner — the first desk in the ideation department.
 *
 * Takes a game idea and decides WHICH screens the game needs and why. This is
 * genuinely creative work: a pet collector needs a hatch screen and an index, a
 * heist game needs a loadout and a contract board, and no rule derives that from
 * a genre string.
 *
 * It does NOT design the screens. Deciding what exists and deciding what's on it
 * are different judgements, and splitting them keeps each output small enough to
 * validate hard.
 */

import { ask } from './client.mjs';
import { capabilities } from '../compose/index.mjs';

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['premise', 'screens'],
  properties: {
    premise: {
      type: 'string',
      description: 'One sentence on what makes this game distinctive, used to keep later screens coherent.',
    },
    screens: {
      type: 'array',
      description: '3 to 6 screens, most important first.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'title', 'purpose', 'pattern', 'rationale', 'priority'],
        properties: {
          id: { type: 'string', description: 'kebab-case identifier, e.g. "hatch-lab"' },
          title: { type: 'string', description: 'The heading a player sees, in the game\'s voice.' },
          purpose: { type: 'string', description: 'What the player does here, one line.' },
          pattern: { type: 'string', description: 'Which build pattern realises it.' },
          rationale: { type: 'string', description: 'Why THIS game needs it — tie to the core loop.' },
          priority: { type: 'integer', description: '1 = ships first.' },
        },
      },
    },
  },
};

const SYSTEM = `You are a Roblox UI director planning the screen set for a new game.

Your job is to decide which screens this specific game needs — not a generic list.

WHAT GOOD LOOKS LIKE:
- Screens that only make sense for THIS game's loop. A pet collector needs a hatching
  screen and a collection index. A tycoon needs an upgrade tree. A heist game needs a
  loadout and a contract board.
- Titles written in the game's voice ("COSMIC CRATES", "CHOOSE YOUR CHAMPION"), not
  generic labels ("Shop", "Menu").

WHAT BAD LOOKS LIKE:
- Shop / Inventory / Settings for every game regardless of genre.
- Screens the core loop never touches.
- Anything requiring a pattern that is not offered.

Roblox players are typically 8-16 and play many games, so conventions aid learnability.
Be inventive about WHICH screens exist and what they are called; be conventional about
how they are laid out.`;

/**
 * @param {object} ctx  game context
 * @param {object} opts { model, max }
 */
export async function planScreens(ctx, opts = {}) {
  const caps = capabilities();
  const patterns = Object.entries(caps)
    .map(([id, c]) => `  ${id} — ${c.summary}`)
    .join('\n');

  const user = [
    `GAME: ${ctx.title}`,
    `GENRE: ${ctx.genre}${ctx.subgenre ? ` / ${ctx.subgenre}` : ''}`,
    `CORE LOOP: ${(ctx.coreLoop ?? []).join(' -> ')}`,
    `ECONOMY: ${JSON.stringify(ctx.economy ?? {})}`,
    `AUDIENCE: ${ctx.audience?.ageBand ?? '?'}, ${Math.round((ctx.audience?.platformMix?.mobile ?? 0) * 100)}% mobile`,
    `ART DIRECTION: ${ctx.artDirection?.vibe ?? '?'} — ${(ctx.artDirection?.mood ?? []).join(', ')}`,
    ctx.inspiration?.source ? `INSPIRED BY: ${ctx.inspiration.source} (${ctx.inspiration.mode})` : '',
    ctx.inspiration?.deltas?.length ? `CHANGES FROM IT: ${ctx.inspiration.deltas.join('; ')}` : '',
    '',
    'AVAILABLE PATTERNS (a screen you cannot express with one of these must not be proposed):',
    patterns,
    '',
    `Plan ${opts.max ?? 4} screens.`,
  ].filter(Boolean).join('\n');

  const plan = await ask({
    system: SYSTEM,
    user,
    schema: SCHEMA,
    schemaName: 'screen_plan',
    model: opts.model,
  });

  // The pattern registry is the capability contract; an unbuildable screen is
  // rejected here rather than failing later with a confusing compile error.
  const known = new Set(Object.keys(caps));
  const bad = plan.screens.filter((s) => !known.has(s.pattern));
  if (bad.length) {
    throw new Error(
      `Screen planner proposed unbuildable pattern(s): ${bad.map((s) => `${s.id}:${s.pattern}`).join(', ')}.\n`
      + `  Available: ${[...known].join(', ')}`,
    );
  }

  plan.screens.sort((a, b) => a.priority - b.priority);
  return plan;
}
