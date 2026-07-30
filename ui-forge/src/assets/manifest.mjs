/**
 * Asset manifest + prompt construction.
 *
 * Every placeholder in a composed spec is a hole that needs art. This walks the
 * spec, collects those holes with enough context to describe them, and turns
 * each into a prompt that inherits the game's single style contract.
 */

import { styleContract, ROLE_FRAMING } from './style.mjs';

/** Infer an asset role from the node's class and declared geometry. */
function inferRole(node, key) {
  if (node.name === 'Icon') return 'icon';
  if (/^(planet|moon|star|orb|cloud|frame|trim)/i.test(key)) return 'decor';
  if (/pet-|char-|npc-/.test(key)) return 'portrait';
  return 'item';
}

/**
 * Turn a placeholder key into a subject description. Keys are kebab slugs
 * ("egg-cosmic", "pet-nebula-cat") because they double as filenames; the
 * subject line expands them back into something an image model can draw.
 */
function subjectFromKey(key, ctx) {
  const words = String(key).split(/[-_]/).filter(Boolean);
  const kind = words[0];
  const rest = words.slice(1).join(' ');

  const NOUNS = {
    egg: (r) => `a ${r} creature egg, ornate shell with glowing markings`,
    pet: (r) => `a cute collectible ${r} creature`,
    crate: (r) => `a ${r} treasure crate, lid slightly ajar with light spilling out`,
    boost: (r) => `a ${r} power-up potion bottle with swirling contents`,
    quest: (r) => `an emblem representing a ${r} objective`,
    coin: () => 'a stack of shining game coins',
    gem: () => 'a faceted gemstone',
    slot: () => 'an inventory slot emblem',
    flame: () => 'a stylized flame emblem',
    planet: (r) => `a ${r} alien planet with visible surface features, craters and swirling cloud bands`,
    moon: (r) => `a small ${r} moon with cratered surface`,
  };

  const build = NOUNS[kind];
  const subject = build ? build(rest || 'cosmic') : `${words.join(' ')}`;
  return `${subject}, themed for a game called "${ctx.title}"`;
}

function* walk(node) {
  yield node;
  for (const child of node.children ?? []) yield* walk(child);
}

/**
 * Collect every placeholder in a spec.
 * @returns {Array<{key,role,node,count}>} deduped by key
 */
export function collectPlaceholders(spec) {
  const found = new Map();
  for (const node of walk(spec.root)) {
    const ph = node.image && typeof node.image === 'object' ? node.image.placeholder : null;
    if (!ph) continue;
    if (found.has(ph)) { found.get(ph).count += 1; continue; }
    found.set(ph, {
      key: ph,
      role: inferRole(node, ph),
      node: node.name ?? node.class,
      subject: node.image.subject ?? null,
      count: 1,
    });
  }
  return [...found.values()];
}

/**
 * Compose the final prompt for one asset.
 *
 * Structure is deliberate: subject first (models weight early tokens most),
 * then the invariant style block, then hard technical constraints. The style
 * block is byte-identical across every asset in a game — that repetition is the
 * mechanism that makes the set cohere.
 */
export function buildPrompt(request, contract) {
  const framing = ROLE_FRAMING[request.role] ?? ROLE_FRAMING.item;
  const p = contract.palette;

  const prompt = [
    request.subject,
    '',
    `Style: ${contract.medium}.`,
    `Lighting: ${contract.lighting}.`,
    `Detail: ${contract.detail}.`,
    `Perspective: ${contract.perspective}.`,
    `Finish: ${contract.finish}.`,
    contract.outline ? `Outline: ${contract.outline}.` : '',
    `Palette: dominant ${p.dominant}, shadows ${p.shadow}, highlights ${p.highlight}, secondary ${p.secondary}, accent pop ${p.pop}.`,
    contract.mood ? `Mood: ${contract.mood}.` : '',
    contract.note ? `Art direction: ${contract.note}.` : '',
    '',
    `Composition: ${framing.framing}.`,
    'Fully transparent background, no ground plane, no cast shadow onto the background, no scenery.',
    'Game UI asset, isolated on transparent background.',
  ].filter(Boolean).join('\n');

  return {
    key: request.key,
    role: request.role,
    canvas: framing.canvas,
    alpha: framing.alpha,
    prompt,
    negative: contract.negative,
  };
}

/**
 * @param {object} spec   composed spec
 * @param {object} theme  generated theme
 * @param {object} ctx    game context
 * @returns {{contract:object, assets:object[]}}
 */
export function planAssets(spec, theme, ctx) {
  const contract = styleContract(theme, ctx);
  const assets = collectPlaceholders(spec).map((ph) => buildPrompt(
    { ...ph, subject: ph.subject ?? subjectFromKey(ph.key, ctx) },
    contract,
  ));
  return { contract, assets };
}
