/**
 * Feedback translator: plain language -> validated brief patch.
 *
 * This is the one place in the pipeline where an LLM belongs. `compose()` is
 * deliberately a pure function because turning a brief into a spec needs no
 * judgement. Turning "make the close button round" into a targeted override
 * IS judgement — it requires knowing which node is "the close button" and which
 * property expresses "round".
 *
 * The model never emits a spec. It emits a PATCH against the brief, which is
 * then validated and compiled by the same deterministic path as everything
 * else. A hallucinated node name or an out-of-range variant fails loudly at
 * validation instead of silently producing a broken screen.
 */

import { validateBrief, capabilities, compose } from '../compose/index.mjs';
import { addressableNodes, SPEC_PROPS } from '../compose/overrides.mjs';

/**
 * The spec vocabulary, with the shape each property expects.
 *
 * Without this the model invents plausible-sounding names — `background`,
 * `textColor`, `typography` — which are all wrong and all silently ignored.
 */
const PROP_GUIDE = [
  'bg: token ref for fill, e.g. "surface.raised"',
  'bgTransparency: 0..1 (0 = opaque, Roblox convention)',
  'color: token ref for TEXT colour, e.g. "content.primary"',
  'type: typography token, one of caption|body|label|title|heading|display|numeric',
  'corner: radius token, e.g. "radius.pill" or "radius.none"',
  'stroke: { color: <token>, thickness: <stroke token or number>, transparency?: 0..1 }',
  'gradient: "surfaceSheen" | "accentSheen" | { rotation: deg, strength: 0..1 }',
  'padding: a space token, or { top, right, bottom, left } of space tokens',
  'elevation: 0..4',
  'rotation: degrees',
  'size / pos: { s: [scaleX, scaleY], o: [offsetX, offsetY] }  (offsets may be token refs)',
  'align: start|center|end   alignY: start|center|end   wrap: boolean',
  'states: { hover|pressed|disabled: { bg?, color?, scale?, rotation?, stroke? } }',
  'motion: { enter?: fade|fade-scale|slide-up|pop, duration: seconds, easing: quad|cubic|back|elastic }',
];

const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

/** Flatten a theme into the dotted refs a spec is allowed to name. */
export function tokenRefs(theme) {
  const refs = [];
  for (const [group, entries] of Object.entries(theme.color)) {
    for (const name of Object.keys(entries)) refs.push(`${group}.${name}`);
  }
  for (const group of ['space', 'radius', 'stroke', 'type', 'sizing']) {
    for (const name of Object.keys(theme[group] ?? {})) refs.push(`${group}.${name}`);
  }
  return refs.sort();
}

/**
 * Everything is expressed as key/value PAIRS rather than free-form objects.
 *
 * Strict structured-output mode requires `additionalProperties: false` on every
 * object, which makes open-ended maps illegal. Pairs keep strict validation —
 * worth more than schema elegance, since strict mode is what stops the model
 * inventing fields.
 *
 * `value` is a JSON string so a nested value (a stroke table) survives the trip.
 */
const PAIR = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'value'],
  properties: {
    key: { type: 'string' },
    value: { type: 'string', description: 'JSON-encoded value. Strings must be JSON-quoted, e.g. "\\"radius.pill\\"".' },
  },
};

const PATCH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reasoning', 'variant', 'ornament', 'overrides', 'tokenOverrides', 'unsupported'],
  properties: {
    reasoning: { type: 'string', description: 'One or two sentences on how the request was mapped.' },
    variant: { type: 'array', items: PAIR, description: 'Variant changes. Empty if unchanged.' },
    ornament: { type: 'array', items: PAIR, description: 'Ornament changes. Empty if unchanged.' },
    overrides: {
      type: 'array',
      description: 'Node overrides to append. Empty if none.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['node', 'set'],
        properties: {
          node: { type: 'string', description: 'Exact node name or glob such as Item_*' },
          set: { type: 'array', items: PAIR, description: 'Properties to replace. Style values must be token refs.' },
        },
      },
    },
    tokenOverrides: {
      type: 'array',
      items: PAIR,
      description: 'Theme token path -> value, for requests that change the design system itself (e.g. "make it pink").',
    },
    unsupported: {
      type: 'array',
      items: { type: 'string' },
      description: 'Parts of the request that cannot be expressed. Never invent a way to do these.',
    },
  },
};

/** Pairs -> object, decoding each JSON-encoded value. */
function fromPairs(pairs = []) {
  const out = {};
  for (const { key, value } of pairs) {
    try {
      out[key] = JSON.parse(value);
    } catch {
      // A bare string that wasn't JSON-quoted is the common slip; take it as-is.
      out[key] = value;
    }
  }
  return out;
}

function buildPrompt({ brief, theme, nodes, feedback }) {
  const caps = capabilities()[brief.pattern];
  return [
    {
      role: 'system',
      content: [
        'You translate a game developer\'s plain-language UI feedback into a strict JSON patch against a screen brief.',
        '',
        'RULES:',
        '- Only use node names from the addressable list. Globs like "Item_*" are allowed.',
        '- Only use property names from the property list. A name that is not on it will be rejected.',
        '- Style values MUST be token references from the token list, never literal colours or raw pixel numbers.',
        '- If a request needs a colour that no token provides, add it via tokenOverrides on an EXISTING token path instead of inventing a literal.',
        '- Variant and ornament values must come from the allowed ranges.',
        '- If part of the request cannot be expressed with these tools, list it in "unsupported" rather than approximating it.',
        '- Prefer the least invasive layer: variant > ornament > overrides > tokenOverrides.',
      ].join('\n'),
    },
    {
      role: 'user',
      content: [
        `PATTERN: ${brief.pattern} — ${caps.summary}`,
        '',
        `VARIANT RANGES: ${JSON.stringify(caps.variant)}`,
        `ORNAMENT RANGES: ${JSON.stringify(caps.ornament)}`,
        `SLOTS: ${caps.slots.join(', ') || '(none)'}`,
        '',
        `ADDRESSABLE NODES: ${nodes.join(', ')}`,
        '',
        `VALID PROPERTY NAMES: ${[...SPEC_PROPS].sort().join(', ')}`,
        '',
        'PROPERTY SHAPES:',
        ...PROP_GUIDE.map((l) => `  ${l}`),
        '',
        `TOKEN REFS: ${tokenRefs(theme).join(', ')}`,
        '',
        `CURRENT VARIANT: ${JSON.stringify(brief.variant ?? {})}`,
        `CURRENT ORNAMENT: ${JSON.stringify(brief.ornament ?? {})}`,
        '',
        `FEEDBACK: ${feedback}`,
      ].join('\n'),
    },
  ];
}

/**
 * @param {object} opts { brief, theme, feedback, model }
 * @returns {Promise<object>} the raw patch
 */
export async function requestPatch({ brief, theme, feedback, model = 'gpt-5' }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  // Node names come from a real compile, so the model can only target things
  // that actually exist in this screen.
  const nodes = addressableNodes(compose(brief));

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: buildPrompt({ brief, theme, nodes, feedback }),
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'brief_patch', strict: true, schema: PATCH_SCHEMA },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`${model} ${res.status}: ${detail.slice(0, 400)}`);
  }
  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (!content) throw new Error('translator returned no content');
  const raw = JSON.parse(content);

  // Decode the wire format into the shape the rest of the pipeline expects.
  return {
    reasoning: raw.reasoning,
    variant: fromPairs(raw.variant),
    ornament: fromPairs(raw.ornament),
    overrides: (raw.overrides ?? []).map((o) => ({ node: o.node, set: fromPairs(o.set) })),
    tokenOverrides: fromPairs(raw.tokenOverrides),
    unsupported: raw.unsupported ?? [],
  };
}

/** Apply a patch to a brief, without mutating the original. */
export function applyPatch(brief, patch) {
  const next = JSON.parse(JSON.stringify(brief));
  if (Object.keys(patch.variant ?? {}).length) next.variant = { ...next.variant, ...patch.variant };
  if (Object.keys(patch.ornament ?? {}).length) next.ornament = { ...next.ornament, ...patch.ornament };
  if (patch.overrides?.length) next.overrides = [...(next.overrides ?? []), ...patch.overrides];
  return next;
}

/**
 * Translate, apply, and prove the result still compiles.
 *
 * Compiling here is the whole safety story: a hallucinated node name or an
 * out-of-range variant throws now, with a message naming what was wrong,
 * instead of silently producing a broken screen.
 */
export async function translateFeedback({ brief, theme, feedback, model }) {
  const patch = await requestPatch({ brief, theme, feedback, model });
  const patched = applyPatch(brief, patch);

  const problems = validateBrief(patched);
  if (problems.length) {
    return { patch, patched: null, ok: false, problems };
  }
  try {
    compose(patched); // throws on an override targeting nothing
  } catch (err) {
    return { patch, patched: null, ok: false, problems: [err.message] };
  }
  return { patch, patched, ok: true, problems: [] };
}
