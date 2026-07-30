/**
 * Shared colour primitives. Used by the theme generator (to pick readable
 * foregrounds), the transpiler (to emit CSS), and the validator (to score
 * contrast) — so all three agree on what "readable" means by construction.
 */

export function hexToRgb(hex) {
  const h = String(hex).replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Bad hex color: ${hex}`);
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export const toHex = ([r, g, b]) =>
  `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

/** WCAG relative luminance. */
export function luminance([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** WCAG contrast ratio, 1..21. Accepts rgb triples. */
export function contrastRatio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * WCAG threshold. Large text (>=24px, or >=18.66px bold) is legible at a lower
 * ratio than body text.
 */
export function requiredRatio(fontSize, fontWeight) {
  const large = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
  return large ? 3.0 : 4.5;
}

/**
 * Perceptual-ish colour distance ("redmean"), 0..~765.
 *
 * Contrast ratio is the WRONG tool for "is this the right colour" — it only
 * measures luminance, so a lime green and a gold at similar brightness score as
 * near-identical. That distinction is invisible when checking text legibility
 * and decisive when checking whether generated art belongs to the palette.
 */
export function colorDistance(a, b) {
  const rBar = (a[0] + b[0]) / 2;
  const dR = a[0] - b[0];
  const dG = a[1] - b[1];
  const dB = a[2] - b[2];
  return Math.sqrt(
    (2 + rBar / 256) * dR * dR + 4 * dG * dG + (2 + (255 - rBar) / 256) * dB * dB,
  );
}

/**
 * Pick whichever candidate reads best on `bg`.
 *
 * This exists because "text on an accent fill" cannot be a fixed palette entry:
 * the right answer depends on the accent's luminance. Hardcoding it means every
 * reskin onto a lighter or darker palette silently ships unreadable text.
 *
 * @param {string} bg           hex background
 * @param {string[]} candidates hex foregrounds, preference order
 */
export function pickReadable(bg, candidates) {
  const bgRgb = hexToRgb(bg);
  let best = candidates[0];
  let bestRatio = -1;
  for (const c of candidates) {
    const ratio = contrastRatio(hexToRgb(c), bgRgb);
    if (ratio > bestRatio) { bestRatio = ratio; best = c; }
  }
  return best;
}
