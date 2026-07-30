/**
 * Calibration: diff HTML-preview geometry against real Roblox geometry.
 *
 * Everything the validator has ever reported rests on one unproven assumption —
 * that the HTML transpiler renders what the engine renders. Nothing checks it.
 * If a mapping is wrong, the validator confidently certifies a lie and there is
 * no signal anywhere.
 *
 * This compares the same spec measured both ways. Positions and sizes are
 * normalised to fractions of the viewport before comparing, because the Studio
 * window will never be exactly 1920x1080 and absolute pixels would report a
 * scale difference as a thousand layout bugs.
 */

/**
 * Build a stable path key so nodes can be matched across the two trees.
 *
 * Two preview-only artefacts must be erased or nothing aligns:
 *   - an elevated node renders as wrapper + Surface, BOTH named e.g. "Panel",
 *     while the engine builds a single instance. Left in, every descendant's
 *     path gains a phantom "Panel/" segment.
 *   - the preview's root is #screengui; the in-game probe measures relative to
 *     its ScreenGui and omits it.
 */
const PREVIEW_ONLY = new Set(['ShadowSlice', 'Surface', 'ScreenGui']);

export function pathsFromHtml(nodes) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const seen = new Map();
  const out = [];

  for (const n of nodes) {
    if (PREVIEW_ONLY.has(n.cls)) continue;

    const segments = [];
    let cur = n;
    while (cur) {
      if (!PREVIEW_ONLY.has(cur.cls)) segments.unshift(cur.name ?? cur.cls);
      cur = cur.pid === null || cur.pid === undefined ? null : byId.get(cur.pid);
    }
    let key = segments.join('/');
    // Sibling names repeat (Icon, Value); disambiguate by occurrence order.
    const count = seen.get(key) ?? 0;
    seen.set(key, count + 1);
    if (count) key = `${key}#${count}`;

    out.push({
      key,
      cls: n.cls,
      x: n.rect.x, y: n.rect.y, w: n.rect.w, h: n.rect.h,
    });
  }
  return out;
}

/** Normalise a measurement list to viewport fractions. */
function normalize(list, viewport) {
  return list.map((n) => ({
    key: n.key,
    cls: n.cls,
    x: n.x / viewport.width,
    y: n.y / viewport.height,
    w: n.w / viewport.width,
    h: n.h / viewport.height,
  }));
}

/**
 * @param {object} html   { nodes, viewport } from the preview
 * @param {object} studio { nodes, viewport } posted by the in-game probe
 * @param {number} tol    fractional tolerance (0.01 = 1% of viewport)
 */
export function compare(html, studio, tol = 0.01) {
  const a = new Map(normalize(pathsFromHtml(html.nodes), html.viewport).map((n) => [n.key, n]));
  const b = new Map(normalize(studio.nodes, studio.viewport).map((n) => [n.key, n]));

  const findings = [];
  let matched = 0;

  for (const [key, h] of a) {
    const s = b.get(key);
    if (!s) {
      findings.push({ key, kind: 'missing-in-studio', detail: 'preview emitted this node, the engine did not' });
      continue;
    }
    matched++;
    const deltas = {
      x: Math.abs(h.x - s.x), y: Math.abs(h.y - s.y),
      w: Math.abs(h.w - s.w), h: Math.abs(h.h - s.h),
    };
    const worst = Object.entries(deltas).sort((p, q) => q[1] - p[1])[0];
    if (worst[1] > tol) {
      findings.push({
        key,
        kind: 'geometry-drift',
        detail: `${worst[0]} differs by ${(worst[1] * 100).toFixed(2)}% of viewport`
          + ` (preview ${(h[worst[0]] * 100).toFixed(1)}%, engine ${(s[worst[0]] * 100).toFixed(1)}%)`,
        deltas,
      });
    }
  }

  for (const key of b.keys()) {
    if (!a.has(key)) {
      findings.push({ key, kind: 'missing-in-preview', detail: 'the engine built this node, the preview did not' });
    }
  }

  findings.sort((p, q) => (q.deltas?.[0] ?? 0) - (p.deltas?.[0] ?? 0));
  return {
    matched,
    total: a.size,
    findings,
    // A transpiler mapping is only trustworthy for the properties this run
    // actually exercised — a clean pass on a spec with no gradients says
    // nothing about gradients.
    coverage: [...new Set([...a.values()].map((n) => n.cls))].sort(),
  };
}
