/**
 * Pixel analysis + validation for generated assets.
 *
 * Image models fail in ways that are invisible one-at-a-time and obvious in a
 * set: one asset comes back with a baked-in background, another has its subject
 * at half the scale of its neighbours, a third drifts off-palette. All three
 * read as "the art looks cheap" without anyone being able to say why.
 *
 * Decoding happens in headless Chrome via canvas, which avoids adding an image
 * library — the browser is already a dependency for rendering.
 */

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { hexToRgb, colorDistance, toHex } from '../color.mjs';

/** Runs in-page: decode a PNG and report alpha, bounds and dominant colours. */
function inspect(dataUri) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(new Error('decode failed'));
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;

      let opaque = 0;
      let minX = w; let minY = h; let maxX = -1; let maxY = -1;
      const buckets = new Map();

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const a = d[i + 3];
          if (a < 24) continue;
          opaque++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          // Coarse quantisation: enough to spot palette drift, cheap to tally.
          const key = `${d[i] >> 5},${d[i + 1] >> 5},${d[i + 2] >> 5}`;
          buckets.set(key, (buckets.get(key) ?? 0) + 1);
        }
      }

      const corner = (x, y) => d[(y * w + x) * 4 + 3];
      const cornersOpaque = [corner(1, 1), corner(w - 2, 1), corner(1, h - 2), corner(w - 2, h - 2)]
        .filter((a) => a > 200).length;

      const dominant = [...buckets.entries()]
        .sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([k, n]) => {
          const [r, g, b] = k.split(',').map((v) => (Number(v) << 5) + 16);
          return { rgb: [r, g, b], share: n / Math.max(1, opaque) };
        });

      resolve({
        width: w,
        height: h,
        alphaCoverage: opaque / (w * h),
        cornersOpaque,
        bbox: maxX < 0 ? null : {
          x: minX / w, y: minY / h,
          w: (maxX - minX + 1) / w, h: (maxY - minY + 1) / h,
        },
        dominant,
      });
    };
    img.src = dataUri;
  });
}

/**
 * Analyze many PNGs in one browser session.
 * @param {Array<{key:string, path:string}>} files
 */
export async function analyzeAll(files) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent('<!doctype html><body></body>');
    const out = [];
    for (const f of files) {
      const uri = `data:image/png;base64,${readFileSync(f.path).toString('base64')}`;
      // eslint-disable-next-line no-await-in-loop
      const stats = await page.evaluate(inspect, uri);
      out.push({ ...f, ...stats });
    }
    return out;
  } finally {
    await browser.close();
  }
}

/**
 * Score analysed assets. `theme` supplies the palette the art should live in.
 * @returns {Array<{key,severity,rule,detail}>}
 */
export function validateAssets(analyses, theme) {
  const findings = [];
  // Accents and surfaces only. Status colours are UI semantics (error red,
  // success green) — treating them as art direction would wave through a lime
  // asset in a game with no green in its palette.
  const palette = [
    ...Object.values(theme.color.accent),
    ...Object.values(theme.color.surface),
  ].map(hexToRgb);

  const fills = analyses.map((a) => (a.bbox ? a.bbox.w * a.bbox.h : 0));
  const medianFill = [...fills].sort((x, y) => x - y)[Math.floor(fills.length / 2)] || 0;

  for (const a of analyses) {
    if (!a.bbox || a.alphaCoverage < 0.02) {
      findings.push({ key: a.key, severity: 'error', rule: 'empty', detail: 'image is effectively blank' });
      continue;
    }

    // A transparent-background request that came back with opaque corners means
    // the model painted a backdrop. It looks fine alone and like a sticker on a panel.
    if (a.cornersOpaque >= 3) {
      findings.push({
        key: a.key, severity: 'error', rule: 'baked-background',
        detail: `${a.cornersOpaque}/4 corners opaque — the subject is not cut out`,
      });
    }

    if (a.alphaCoverage > 0.92) {
      findings.push({
        key: a.key, severity: 'warn', rule: 'no-margin',
        detail: `${(a.alphaCoverage * 100).toFixed(0)}% of the canvas is opaque — no breathing room`,
      });
    }

    // Subjects at inconsistent scale are what make an icon row look jittery.
    const fill = a.bbox.w * a.bbox.h;
    if (medianFill > 0 && (fill < medianFill * 0.55 || fill > medianFill * 1.8)) {
      findings.push({
        key: a.key, severity: 'warn', rule: 'scale-outlier',
        detail: `subject fills ${(fill * 100).toFixed(0)}% vs ${(medianFill * 100).toFixed(0)}% median for the set`,
      });
    }

    // Off-centre subjects read as misaligned once tiled in a grid.
    const cx = a.bbox.x + a.bbox.w / 2;
    const cy = a.bbox.y + a.bbox.h / 2;
    if (Math.abs(cx - 0.5) > 0.08 || Math.abs(cy - 0.5) > 0.08) {
      findings.push({
        key: a.key, severity: 'warn', rule: 'off-center',
        detail: `subject centred at ${(cx * 100).toFixed(0)}%,${(cy * 100).toFixed(0)}%`,
      });
    }

    // Palette drift: the dominant colour should be close to *something* in the
    // theme, or the art belongs to a different game than the UI around it.
    const top = a.dominant[0];
    if (top) {
      const nearest = Math.min(...palette.map((p) => colorDistance(top.rgb, p)));
      if (nearest > 200) {
        findings.push({
          key: a.key, severity: 'warn', rule: 'off-palette',
          detail: `dominant ${toHex(top.rgb)} is ${nearest.toFixed(0)} from the nearest theme colour (max 200)`,
        });
      }
    }
  }

  return findings;
}
