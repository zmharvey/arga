/**
 * Stub provider — deterministic placeholder art, no API key required.
 *
 * Renders a shaded form in headless Chrome and captures it with
 * `omitBackground`, producing a real transparent PNG. That matters: it exercises
 * the entire downstream path (alpha analysis, validation, spec substitution,
 * upload) with genuine RGBA data instead of pretending.
 *
 * NOTE ON THE FIDELITY CONTRACT: the transpiler is forbidden from web-only CSS
 * because it stands in for engine rendering. This file does not — it stands in
 * for a *bitmap*, and a bitmap can contain anything a painter can paint. Radial
 * gradients here are legitimate.
 */

import { chromium } from 'playwright';

export const meta = { id: 'stub', model: 'none', nativeAlpha: true, envKey: null };
export function available() { return true; }

/** Stable per-key hue so a given asset always renders identically. */
function hashHue(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % 360;
}

const SHAPES = {
  decor: (hue) => `
    border-radius: 50%;
    background:
      radial-gradient(circle at 32% 28%, hsl(${hue} 85% 78%) 0%, hsl(${hue} 70% 52%) 38%, hsl(${(hue + 20) % 360} 65% 26%) 72%, hsl(${(hue + 30) % 360} 60% 14%) 100%),
      radial-gradient(circle at 70% 76%, hsla(${(hue + 180) % 360} 90% 70% / .5), transparent 46%);`,
  icon: (hue) => `
    border-radius: 22%;
    background:
      radial-gradient(circle at 34% 26%, hsl(${hue} 92% 74%), hsl(${hue} 78% 44%) 58%, hsl(${(hue + 24) % 360} 70% 24%) 100%);`,
  item: (hue) => `
    border-radius: 34% 34% 42% 42%;
    background:
      radial-gradient(circle at 36% 24%, hsl(${hue} 90% 80%), hsl(${hue} 76% 48%) 52%, hsl(${(hue + 28) % 360} 68% 22%) 100%);`,
  portrait: (hue) => `
    border-radius: 46% 46% 38% 38%;
    background: radial-gradient(circle at 40% 26%, hsl(${hue} 88% 78%), hsl(${hue} 72% 46%) 60%, hsl(${(hue + 18) % 360} 66% 22%) 100%);`,
};

/**
 * @param {object} asset { key, role, canvas }
 * @param {object} [opts] { browser } reuse a session when generating a set
 * @returns {Promise<Buffer>} transparent PNG
 */
export async function generate(asset, opts = {}) {
  const owned = !opts.browser;
  const browser = opts.browser ?? await chromium.launch();
  try {
    const size = asset.canvas ?? 1024;
    const hue = hashHue(asset.key);
    const shape = (SHAPES[asset.role] ?? SHAPES.item)(hue);
    const page = await browser.newPage({ viewport: { width: size, height: size } });

    await page.setContent(`<!doctype html><style>
      html,body{margin:0;width:${size}px;height:${size}px;background:transparent}
      .a{position:absolute;left:10%;top:10%;width:80%;height:80%;${shape}
         box-shadow: inset 0 ${size * 0.02}px ${size * 0.06}px hsla(${hue} 90% 90% / .45);}
      .g{position:absolute;left:26%;top:20%;width:22%;height:16%;border-radius:50%;
         background:radial-gradient(circle, hsla(0 0% 100% / .85), transparent 70%);filter:blur(${size * 0.012}px)}
    </style><div class="a"></div><div class="g"></div>`);

    const buf = await page.screenshot({ omitBackground: true, type: 'png' });
    await page.close();
    return buf;
  } finally {
    if (owned) await browser.close();
  }
}
