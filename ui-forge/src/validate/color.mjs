/**
 * Colour handling specific to the measured snapshot: parsing computed CSS
 * strings and compositing translucent ancestor stacks. The underlying WCAG
 * maths is shared with the theme generator, so the generator's idea of
 * "readable" and the validator's are the same function by construction.
 */

export { luminance, contrastRatio, requiredRatio, toHex } from '../color.mjs';

/** Parse a computed `rgb()` / `rgba()` string into [r, g, b, a]. */
export function parseCss(str) {
  const m = String(str).match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 0];
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  const [r, g, b] = parts;
  const a = parts.length > 3 ? parts[3] : 1;
  return [r || 0, g || 0, b || 0, Number.isFinite(a) ? a : 1];
}

/** Source-over composite of `src` onto opaque `dst`. */
export function composite(src, dst) {
  const [sr, sg, sb, sa] = src;
  const [dr, dg, db] = dst;
  return [
    sr * sa + dr * (1 - sa),
    sg * sa + dg * (1 - sa),
    sb * sa + db * (1 - sa),
    1,
  ];
}

/**
 * Effective background behind a node: walk to the root collecting background
 * layers, then composite them back down over the stage colour. Checking a text
 * colour against only its immediate parent is wrong whenever that parent is
 * translucent — which, with scrims and overlays, is most game UI.
 *
 * @param {object} node    measured node
 * @param {Map<number,object>} byId
 * @param {[number,number,number]} stage  opaque colour behind the whole GUI
 */
export function effectiveBackground(node, byId, stage = [110, 110, 115]) {
  const layers = [];
  let cur = node;
  while (cur) {
    const c = parseCss(cur.bg);
    if (c[3] > 0) layers.push(c);
    cur = cur.pid === null || cur.pid === undefined ? null : byId.get(cur.pid);
  }
  // layers[0] is nearest the viewer; composite from the back forward.
  let out = [...stage, 1];
  for (let i = layers.length - 1; i >= 0; i--) out = composite(layers[i], out);
  return out;
}
