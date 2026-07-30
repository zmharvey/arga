/**
 * Playwright render session.
 *
 * Replaces the old `chrome --screenshot` call, which was fire-and-forget: it
 * rendered, wrote a PNG and exited, leaving no way to ask the page where things
 * actually ended up. Measuring real geometry is the whole basis of validation,
 * so the capture tool has to keep the page alive.
 *
 * Two other things this buys:
 *   - `document.fonts.ready` replaces a `--virtual-time-budget` guess. Capturing
 *     mid font-swap silently changes every text measurement.
 *   - A pinned Chromium, so a render is reproducible rather than dependent on
 *     whichever browser happens to be installed.
 */

import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';

/**
 * Runs in the browser. Returns a flat snapshot of every Roblox-mapped element
 * with its real box, computed paint values, and parent link. Rules operate on
 * this snapshot as plain data, which keeps them pure and unit-testable.
 */
function measureInPage() {
  const els = Array.from(document.querySelectorAll('[data-rbx]'));
  const index = new Map(els.map((el, i) => [el, i]));

  return els.map((el, i) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);

    let parent = el.parentElement;
    let pid = null;
    while (parent) {
      if (index.has(parent)) { pid = index.get(parent); break; }
      parent = parent.parentElement;
    }

    // Direct text only — a container's descendants' text is not its own.
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .filter(Boolean)
      .join(' ');

    const num = (v) => parseFloat(v) || 0;

    return {
      id: i,
      pid,
      cls: el.getAttribute('data-rbx'),
      name: el.getAttribute('data-name') || null,
      rotated: el.getAttribute('data-rot') === '1',
      bleed: el.getAttribute('data-bleed') === '1',
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      pad: {
        t: num(cs.paddingTop), r: num(cs.paddingRight),
        b: num(cs.paddingBottom), l: num(cs.paddingLeft),
      },
      color: cs.color,
      bg: cs.backgroundColor,
      fontSize: num(cs.fontSize),
      fontWeight: Number(cs.fontWeight) || 400,
      fontFamily: cs.fontFamily,
      overflow: cs.overflow,
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      // scroll vs client width is how clipped nowrap text reveals itself.
      scrollW: el.scrollWidth,
      clientW: el.clientWidth,
      scrollH: el.scrollHeight,
      clientH: el.clientHeight,
      text,
    };
  });
}

/**
 * @param {string} htmlPath absolute path to the preview html
 * @param {{width:number,height:number}} viewport
 * @param {{pngPath?:string, focus?:string, margin?:number}} [opts]
 * @returns {Promise<{nodes:object[], viewport:object, fonts:object}>}
 */
export async function renderAndMeasure(htmlPath, viewport, opts = {}) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });

    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
    // Deterministic: capture only once webfonts have actually swapped in.
    await page.evaluate(() => document.fonts.ready);

    // Entrance animations must SETTLE before anything is measured. Sampling
    // mid-tween reports every animated element at its interpolated size — a
    // 48px button caught halfway through a pop measures ~43px and trips the
    // touch-target rule for a defect that does not exist at rest.
    await page.evaluate(() => Promise.all(
      document.getAnimations().map((a) => a.finished.catch(() => undefined)),
    ));

    // Report which families really resolved. A silent fallback to a metrically
    // different font invalidates every text measurement taken below.
    const fonts = await page.evaluate(() => {
      const loaded = new Set();
      document.fonts.forEach((f) => { if (f.status === 'loaded') loaded.add(f.family); });
      return Array.from(loaded);
    });

    const nodes = await page.evaluate(measureInPage);

    if (opts.pngPath) {
      let clip;
      if (opts.focus) {
        // count() first, because boundingBox() on a locator that matches nothing
        // waits the full 30s timeout and then throws. A generated template is
        // free not to have a node called "Panel", and that must degrade to a
        // full-frame screenshot rather than killing the run.
        const locator = page.locator(`[data-name="${opts.focus}"]`);
        const box = (await locator.count()) ? await locator.first().boundingBox() : null;
        if (box) {
          const m = opts.margin ?? 48;
          clip = {
            x: Math.max(0, box.x - m),
            y: Math.max(0, box.y - m),
            width: Math.min(viewport.width - Math.max(0, box.x - m), box.width + m * 2),
            height: Math.min(viewport.height - Math.max(0, box.y - m), box.height + m * 2),
          };
        }
      }
      await page.screenshot({ path: opts.pngPath, clip });
    }

    return { nodes, viewport, fonts };
  } finally {
    await browser.close();
  }
}
