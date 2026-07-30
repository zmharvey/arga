/**
 * Creative direction + template generation.
 *
 * This is where the department actually invents. Previously it could only pick
 * variants inside one hand-written pattern, so every game came out with the same
 * silhouette however creative the ideas were. Here it authors the templates
 * themselves, and screens are then assembled from them mechanically.
 *
 * Creativity lives at the TEMPLATE level; consistency comes from reuse. A game
 * gets 2-4 bespoke templates sharing one visual language, and every screen is
 * built from that set.
 */

import { ask } from './client.mjs';
import { SPEC_PROPS } from '../compose/overrides.mjs';

/* ------------------------------------------------------- creative direction */

const DIRECTION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['languageName', 'thesis', 'motifs', 'panelFraming', 'itemPresentation', 'signatureDetail'],
  properties: {
    languageName: { type: 'string', description: 'A name for this UI language, e.g. "Dossier Brutalist".' },
    thesis: { type: 'string', description: 'One sentence: what makes this game\'s interface unmistakably itself.' },
    motifs: {
      type: 'array',
      description: '3-5 concrete STRUCTURAL devices, not adjectives. "A 6px accent rail down the left edge of every panel" — not "bold and modern".',
      items: { type: 'string' },
    },
    panelFraming: { type: 'string', description: 'How a panel is bounded: corners, rails, plates, trim, layering.' },
    itemPresentation: { type: 'string', description: 'How one selectable thing is presented: card, plate, row, tile, capsule.' },
    signatureDetail: { type: 'string', description: 'The one small recurring detail a player would recognise.' },
  },
};

const DIRECTION_SYSTEM = `You are an art director defining the UI language for one Roblox game.

Produce STRUCTURAL direction, not mood words. Every motif must be something that can be
built out of rectangles, corner radii, strokes, gradients, rotation and layering — that
is the whole vocabulary Roblox gives you.

GOOD motif: "every panel has a notched top-left corner formed by an offset plate"
GOOD motif: "item rows are split by a thin vertical accent rule between art and text"
BAD motif: "clean and modern" (an adjective, not a device)
BAD motif: "subtle animations that delight" (not structure)

The direction has to survive being applied to 3-4 different screens without becoming
monotonous, and it has to read as ONE game. Aim for distinctive, not decorative.`;

export async function directUI(ctx, opts = {}) {
  const user = [
    `GAME: ${ctx.title}`,
    `GENRE: ${ctx.genre}${ctx.subgenre ? ` / ${ctx.subgenre}` : ''}`,
    `CORE LOOP: ${(ctx.coreLoop ?? []).join(' -> ')}`,
    `VIBE: ${ctx.artDirection?.vibe} — ${(ctx.artDirection?.mood ?? []).join(', ')}`,
    `REFERENCE NOTE: ${ctx.artDirection?.referenceNote ?? '(none)'}`,
    `AUDIENCE: ${ctx.audience?.ageBand}, ${Math.round((ctx.audience?.platformMix?.mobile ?? 0) * 100)}% mobile`,
  ].join('\n');

  return ask({
    system: DIRECTION_SYSTEM,
    user,
    schema: DIRECTION_SCHEMA,
    schemaName: 'ui_direction',
    model: opts.model,
  });
}

/* ------------------------------------------------------ template generation */

const TEMPLATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reasoning', 'templates'],
  properties: {
    reasoning: { type: 'string' },
    templates: {
      type: 'array',
      description: '2 to 3 templates sharing one visual language.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'describes', 'suitedTo', 'json'],
        properties: {
          id: { type: 'string', description: 'kebab-case, e.g. "dossier-grid"' },
          describes: { type: 'string', description: 'What it looks like structurally.' },
          suitedTo: { type: 'string', description: 'Which kinds of screen it fits.' },
          json: {
            type: 'string',
            description: 'The template document as a JSON string, shaped { "root": <node> }.',
          },
        },
      },
    },
  },
};

/**
 * The template language, spelled out.
 *
 * Recursive trees cannot be expressed in strict JSON schema, so the template
 * travels as a JSON string and every guarantee comes from OUR side: lint,
 * instantiate under stress content, compile, render, measure.
 */
const TEMPLATE_SYSTEM = `You author Roblox UI templates as JSON documents.

A template is a tree of spec nodes plus three control forms:

  { "$repeat": "items", "as": "item", "node": { ...subtree using {{item.name}}... } }
  { "$repeat": "items", "as": "row", "$chunk": 3, "node": { ...a row holding {{row}}... } }
  { "$if": "cta", "node": { ...only rendered when content.cta exists... } }

A control form may ALSO carry normal node properties, which means "this container,
whose children are the repetition" — usually what you want:

  { "class": "ScrollingFrame", "name": "Rows", "scroll": "y",
    "layout": { "dir": "vertical", "gap": "space.sm" },
    "$repeat": "items", "as": "item", "node": { ...one row... } }

Inside any string, {{path}} interpolates from the content: {{title}}, {{item.name}},
{{item.price}}, {{item.art}}, {{item.badge}}, {{chip.label}}, {{chip.value}}, {{cta.label}}.

CONTENT SHAPE — every template receives exactly this, and must handle all of it:
  { title, dismissible, chips: [{label, value, icon}], items: [{name, price, art, badge}], cta: {label, emphasis} }

NODE PROPERTIES (no others exist; anything else is rejected):
  class      Frame | TextLabel | TextButton | ImageLabel | ImageButton | ScrollingFrame
  name       unique, PascalCase — used for overrides and calibration
  size/pos   { "s": [scaleX, scaleY], "o": [offsetX, offsetY] }
             to hug content, put auto INSIDE size: { "s": [0.5, null], "o": [null, null], "auto": "y" }
  anchor     [x, y]        rotation  degrees        aspect  width/height ratio
  flex       "grow shrink basis" e.g. "1 1 0" or "0 0 auto"  (only inside a layout)
  maxSize    same shape as size — caps a scrolling region
  layout     { "dir": "vertical"|"horizontal", "gap": <space token>, "align": ..., "justify": ... }
  padding    a space token, or { top, right, bottom, left }
  bg         colour token       bgTransparency 0..1 (0 = opaque)
  corner     radius token       stroke { color, thickness, transparency }
  gradient   "surfaceSheen" | "accentSheen" | { rotation, strength }
  elevation  0..4               clip  true      scroll "y"      zIndex  number
  text       string             type  caption|body|label|title|heading|display|numeric
  color      colour token       align start|center|end     wrap true
  image      { "placeholder": "{{item.art}}" }
  states     { "hover": {...}, "pressed": {...} }   motion { "enter": "pop", "duration": 0.26 }

TOKENS ONLY. Never a hex colour, never a raw font size. Colour tokens:
  surface.base|sunken|raised|overlay   content.primary|secondary|muted|inverse
  accent.primary|secondary|tertiary    status.success|danger|warning|info
  border.subtle|strong                 onColor.primary|secondary|tertiary|danger|warning
Spacing: space.none|xs|sm|md|lg|xl|2xl|3xl   Radius: radius.none|sm|md|lg|xl|pill
Stroke: stroke.hairline|base|heavy      Sizing: sizing.minTouchTarget

HARD RULES:
- Interactive elements must be at least sizing.minTouchTarget tall. Use it as an offset.
- Children only position absolutely when their parent has NO layout. Inside a layout, use flex.
- Roblox offsets are absolute pixels at every resolution. Anything fixed-width inside a
  header must be able to shrink ("0 1 170px"), or it overflows on a phone.
- Put items in a ScrollingFrame with a maxSize cap, or a long list grows past the screen.
- Give the panel "auto": "y" so it hugs its content.
- Every name must be unique.
- The ROOT node is the whole screen. Nothing may extend past it, so no child of the
  root may be larger than the root or sit at a negative position. To layer plates for
  a notch or bleed effect, do it INSIDE the panel where there is room — never against
  the root.
- A node sized { "s": [1, ...], "o": [24, ...] } is 100% of its parent PLUS 24px, which
  overflows. If you want a full-width child, use offset 0.
- A node that DELIBERATELY overhangs its parent — an edge rail bonded to a panel, a
  notch plate, a badge straddling a corner — must set "bleed": true. Roblox renders
  it fine; the flag is how you distinguish intent from an accident. It still may not
  leave the screen.

BE STRUCTURALLY INVENTIVE. Express the art direction through real devices: offset plates,
accent rails, notched corners via layered frames, rotated badges, split panels, asymmetric
headers, edge trim, layered strokes. Do not just emit a plain rounded box with a grid —
that is the default you are being asked to improve on.

Templates in one set must share their framing language so screens look like one game.

RETURN EXACTLY THIS JSON OBJECT — "root" is a real nested object, never a string:

{
  "reasoning": "...",
  "templates": [
    {
      "id": "kebab-case-id",
      "describes": "what it looks like structurally",
      "suitedTo": "which screens it fits",
      "root": { "class": "Frame", "name": "Backdrop", "...": "..." }
    }
  ]
}`;

/**
 * @param {object} opts { ctx, theme, direction, model, feedback }
 * @returns {Promise<{reasoning:string, templates:object[]}>} parsed templates
 */
export async function generateTemplates({ ctx, direction, model, feedback }) {
  const user = [
    `GAME: ${ctx.title} — ${ctx.genre}`,
    '',
    `UI LANGUAGE: ${direction.languageName}`,
    `THESIS: ${direction.thesis}`,
    `MOTIFS:`,
    ...direction.motifs.map((m) => `  - ${m}`),
    `PANEL FRAMING: ${direction.panelFraming}`,
    `ITEM PRESENTATION: ${direction.itemPresentation}`,
    `SIGNATURE DETAIL: ${direction.signatureDetail}`,
    '',
    'Author 2 templates that realise this language. Both consume the standard content shape.',
    feedback ? `\nA previous attempt FAILED validation. Fix these exactly:\n${feedback}` : '',
  ].filter(Boolean).join('\n');

  const out = await ask({
    system: TEMPLATE_SYSTEM,
    user,
    schemaName: 'template_set',
    model,
    raw: true,
  });

  const templates = [];
  const failures = [];
  for (const t of out.templates) {
    if (!t || typeof t !== 'object' || (!t.root && !t.class)) {
      failures.push(`Template "${t?.id ?? '?'}" has no "root" node.`);
      continue;
    }
    templates.push({
      ...normalizeTemplate(t.root ? { root: t.root } : t),
      id: t.id ?? `template-${templates.length + 1}`,
      describes: t.describes ?? '',
      suitedTo: t.suitedTo ?? '',
    });
  }
  return { reasoning: out.reasoning, templates, failures };
}

/**
 * Forgive two shape slips that are the contract's fault, not the author's.
 *
 * Both showed up on the first real run and both are honest misreadings:
 *   - returning the root node bare instead of wrapped in { root: ... }
 *   - putting "auto" on the node, where it reads naturally, rather than inside
 *     "size" where it actually lives
 *
 * Rejecting these would be pedantry. Normalising is cheap, unambiguous, and
 * keeps the real guards — unknown properties, bad geometry — doing their job.
 */
export function normalizeTemplate(doc) {
  const out = doc.root ? { ...doc } : { root: doc };

  const fix = (node) => {
    if (!node || typeof node !== 'object') return node;
    if (node.$repeat !== undefined || node.$if !== undefined) {
      return { ...node, node: fix(node.node) };
    }
    const next = { ...node };
    if (next.auto !== undefined) {
      next.size = { ...(next.size ?? { s: [1, null], o: [null, null] }), auto: next.auto };
      delete next.auto;
    }
    if (next.children) next.children = next.children.map(fix);
    return next;
  };

  const repair = (node) => {
    if (!node || typeof node !== 'object') return node;
    const isControl = node.$repeat !== undefined || node.$if !== undefined;
    // A control node with children but no `node` means the children are the
    // body. Unambiguous, so repair rather than reject.
    if (isControl && !node.node && Array.isArray(node.children)) {
      const [first, ...rest] = node.children;
      return repair({ ...node, node: first, children: rest });
    }
    const next = { ...node };
    if (next.node) next.node = repair(next.node);
    if (next.children) next.children = next.children.map(repair);
    return next;
  };

  out.root = repair(fix(out.root));
  return out;
}

/** Property list handed to the prompt, kept in sync with the real one. */
export const ALLOWED_PROPS = [...SPEC_PROPS].sort();
