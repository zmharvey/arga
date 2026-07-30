/**
 * Brief designer — the second desk.
 *
 * Turns one planned screen into a full, compilable brief: layout variant,
 * ornament, real content, and art prompts.
 *
 * This is where most of the creative work lands. It is also where a model most
 * wants to invent — a variant value that doesn't exist, a node that isn't in
 * this pattern, a literal colour. Everything it may say is enumerated in the
 * prompt, and the result is compiled immediately so a violation fails loudly
 * with a message naming what was wrong.
 */

import { ask, PAIR, fromPairs } from './client.mjs';
import { capabilities, validateBrief, compose } from '../compose/index.mjs';

/**
 * Character budgets for text that sits in a fixed box.
 *
 * The designer otherwise writes descriptions where the layout expects labels —
 * "Kit Locker — Gear Up for Ghost or Loud" as a title, "Ghost — No Pagers,
 * Cameras Disabled" as an item name. Both are good writing and both overflow,
 * because nothing told it how much room there is.
 *
 * Checked after generation as well as stated in the prompt: a stated limit is a
 * suggestion, an enforced one is a contract.
 */
const LIMITS = { title: 24, name: 20, price: 14, badge: 8, chipValue: 10 };

function checkContent(content) {
  const problems = [];
  const tooLong = (what, value, max) => {
    if (value && value.length > max) {
      problems.push(`${what} is ${value.length} chars ("${value}") — must be ${max} or fewer`);
    }
  };

  tooLong('content.title', content.title, LIMITS.title);
  (content.chips ?? []).forEach((c, i) => tooLong(`chips[${i}].value`, c.value, LIMITS.chipValue));
  (content.items ?? []).forEach((it, i) => {
    tooLong(`items[${i}].name`, it.name, LIMITS.name);
    tooLong(`items[${i}].price`, it.price, LIMITS.price);
    tooLong(`items[${i}].badge`, it.badge, LIMITS.badge);
  });
  tooLong('content.cta.label', content.cta?.label, LIMITS.price + 8);

  // Mixed action labels ("EQUIP" beside "35,000 Cred") read as a bug rather than
  // a distinction, because they occupy the same slot in every card.
  const kinds = new Set((content.items ?? []).map((i) => (/^[\d,.\s]+/.test(i.price) ? 'price' : 'action')));
  if (kinds.size > 1) {
    problems.push('items mix price values and action words in the same slot — pick one for the whole screen');
  }
  return problems;
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reasoning', 'variant', 'ornament', 'content'],
  properties: {
    reasoning: { type: 'string', description: 'One or two sentences on the layout choices.' },
    variant: { type: 'array', items: PAIR, description: 'Every variant key, values within the allowed ranges.' },
    ornament: { type: 'array', items: PAIR, description: 'Every ornament key.' },
    content: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'dismissible', 'chips', 'items', 'cta'],
      properties: {
        title: { type: 'string', description: 'Heading, in the game\'s voice.' },
        dismissible: { type: 'boolean' },
        chips: {
          type: 'array',
          description: 'Header readouts such as currency or capacity. 0-2.',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['label', 'value', 'icon'],
            properties: {
              label: { type: 'string' },
              value: { type: 'string', description: 'A realistic sample value, e.g. "128,400".' },
              icon: { type: 'string', description: 'kebab-case art key, e.g. "coin".' },
            },
          },
        },
        items: {
          type: 'array',
          description: '2 to 6 items the player picks between.',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'price', 'art', 'badge', 'artPrompt'],
            properties: {
              name: { type: 'string', description: 'In-fiction name, never "Item 1".' },
              price: { type: 'string', description: 'Cost or action label, e.g. "25,000" or "EQUIP".' },
              art: { type: 'string', description: 'kebab-case art key, e.g. "egg-cosmic".' },
              badge: { type: ['string', 'null'], description: 'Short tag like "BEST" or "NEW", or null.' },
              artPrompt: {
                type: 'string',
                description: 'A concrete visual description of this ONE object. Describe the subject only — never lighting, style or palette, which the art contract supplies.',
              },
            },
          },
        },
        cta: {
          type: ['object', 'null'],
          additionalProperties: false,
          required: ['label', 'emphasis'],
          properties: {
            label: { type: 'string' },
            emphasis: { type: 'string', enum: ['primary', 'secondary'] },
          },
        },
      },
    },
  },
};

const SYSTEM = `You design one Roblox UI screen as a structured brief.

CONTENT IS THE CREATIVE WORK. Names, labels and art prompts should feel like they were
written by someone who has played this game. "Cosmic Egg", "Void Moth", "OPEN 3 EGGS" —
not "Item 1", "Buy", "Button".

THESE ARE LABELS, NOT DESCRIPTIONS. Each sits in a fixed box and will visibly overflow:
  title      <= 24 characters   "KIT LOCKER"           not "Kit Locker — Gear Up for Ghost or Loud"
  item name  <= 20 characters   "Breachmaker"          not "Breachmaker Auto-Shotgun"
  price      <= 14 characters   "35,000" or "EQUIP"
  badge      <= 8 characters    "GHOST+"
  chip value <= 10 characters   "128,400"
Put the flavour in artPrompt, where there is unlimited room, not in the labels.

Every item's price field must be the SAME KIND across the screen — either all costs or
all action words. Mixing "EQUIP" and "35,000 Cred" in the same slot reads as a bug.

ART PROMPTS: describe the SUBJECT only, concretely. A shared art contract already
supplies lighting, finish, palette and perspective for the whole game — repeating or
contradicting them there breaks the visual consistency across the set. Write "an ornate
cracked dragon egg with glowing seams", not "a glossy 3D egg lit from the left".

LAYOUT: pick variant values that suit the content. Few premium items want 2 wide cards;
a roster of characters wants 4 portrait cards; a list of objectives wants art beside the
label. Every variant and ornament key must be present and within its allowed range.

Roblox players are 8-16 and play many games. Be inventive with content and naming; be
conventional with layout, because deviation costs usability.`;

/**
 * @param {object} opts { screen, ctx, premise, model }
 * @returns {Promise<{brief:object, reasoning:string}>}
 */
export async function designBrief({ screen, ctx, premise, model }) {
  const caps = capabilities()[screen.pattern];
  if (!caps) throw new Error(`Unknown pattern "${screen.pattern}"`);

  const user = [
    `GAME: ${ctx.title} — ${premise}`,
    `ECONOMY: ${JSON.stringify(ctx.economy ?? {})}`,
    `CORE LOOP: ${(ctx.coreLoop ?? []).join(' -> ')}`,
    '',
    `SCREEN: ${screen.title} (${screen.id})`,
    `PURPOSE: ${screen.purpose}`,
    `WHY IT EXISTS: ${screen.rationale}`,
    '',
    `PATTERN: ${screen.pattern} — ${caps.summary}`,
    `VARIANT KEYS AND ALLOWED VALUES: ${JSON.stringify(caps.variant)}`,
    `ORNAMENT KEYS AND ALLOWED VALUES: ${JSON.stringify(caps.ornament)}`,
    '',
    'Provide EVERY variant key and EVERY ornament key.',
  ].join('\n');

  // One retry with the exact violations fed back. A stated budget is advice; a
  // returned error is a correction, and the second attempt almost always lands.
  let out = await ask({ system: SYSTEM, user, schema: SCHEMA, schemaName: 'screen_brief', model });
  const contentProblems = checkContent(out.content);
  if (contentProblems.length) {
    out = await ask({
      system: SYSTEM,
      user: `${user}\n\nYour previous attempt violated these constraints — fix them and keep everything else:\n${contentProblems.map((p) => `- ${p}`).join('\n')}`,
      schema: SCHEMA,
      schemaName: 'screen_brief',
      model,
    });
    const still = checkContent(out.content);
    if (still.length) {
      throw new Error(`Brief for "${screen.id}" still violates content limits after a retry:\n  - ${still.join('\n  - ')}`);
    }
  }

  const brief = {
    screen: screen.id,
    pattern: screen.pattern,
    purpose: screen.purpose,
    focus: 'Panel',
    variant: fromPairs(out.variant),
    ornament: fromPairs(out.ornament),
    content: {
      ...out.content,
      // Strict mode forces every field to be present; nulls are how "absent"
      // travels, and they have to be stripped before the brief is validated.
      cta: out.content.cta ?? undefined,
      items: out.content.items.map((i) => ({ ...i, badge: i.badge ?? undefined })),
    },
  };

  const problems = validateBrief(brief);
  if (problems.length) {
    throw new Error(`Brief designer produced an invalid brief for "${screen.id}":\n  - ${problems.join('\n  - ')}`);
  }
  // Compiling proves it will actually build, not merely that it type-checks.
  compose(brief);

  return { brief, reasoning: out.reasoning };
}
