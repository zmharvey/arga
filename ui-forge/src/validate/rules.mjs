/**
 * Layout & legibility rules over a measured snapshot.
 *
 * Every rule here is deterministic arithmetic on real rendered geometry — no
 * model judgement. These catch the *mechanical* failures that make UI look
 * broken (things escaping their container, unreadable text, un-tappable
 * buttons). Taste-level critique runs separately and should never be spending
 * its attention re-finding an overflow bug.
 *
 * Findings: { rule, severity, label, detail, data }
 */

import { parseCss, effectiveBackground, contrastRatio, requiredRatio, toHex } from './color.mjs';

const EPS = 0.5; // sub-pixel rounding tolerance
const INTERACTIVE = new Set(['TextButton', 'ImageButton']);
/**
 * Nodes the geometry rules skip. ShadowSlice intentionally extends past its
 * owner's box; Surface is the inner half of an elevated node and always shares
 * the wrapper's exact rect, so reporting both just doubles the noise. Both are
 * still visible to the paint rules (contrast reads Surface's background).
 */
const SYNTHETIC = new Set(['ShadowSlice', 'Surface']);

const byIdOf = (nodes) => new Map(nodes.map((n) => [n.id, n]));

const scrolls = (v) => v === 'auto' || v === 'scroll';

/** Content inside a scroll region is reachable, so its position isn't a defect. */
function underScroller(node, byId) {
  let cur = byId.get(node.pid);
  while (cur) {
    if (scrolls(cur.overflowY) || scrolls(cur.overflowX)) return true;
    cur = byId.get(cur.pid);
  }
  return false;
}

function labelOf(node, byId) {
  if (node.name) return `${node.name} <${node.cls}>`;
  let cur = byId.get(node.pid);
  while (cur && !cur.name) cur = byId.get(cur.pid);
  return cur ? `${cur.name}▸${node.cls}` : `<${node.cls}>`;
}

/* ------------------------------------------------------------------ rules */

/**
 * A child must stay inside its parent's content box. This is the rule that
 * catches fixed-pixel children demanding more width than their parent has —
 * the failure mode that put the shop's close button outside the panel.
 */
export function ruleContainment(nodes) {
  const byId = byIdOf(nodes);
  const out = [];

  for (const n of nodes) {
    if (n.pid === null || SYNTHETIC.has(n.cls)) continue;
    // A rotated element's measured box is its axis-aligned bounds, which are
    // legitimately larger than its layout box — reporting that as overflow
    // would flag every angled badge.
    if (n.rotated) continue;
    // Declared overhang is a design device (edge rails, notch plates, badges
    // that straddle a corner). The on-screen rule still applies, so a bleeding
    // node cannot escape the viewport — only its parent.
    if (n.bleed) continue;
    const p = byId.get(n.pid);
    if (!p) continue;

    const box = {
      l: p.rect.x + p.pad.l,
      t: p.rect.y + p.pad.t,
      r: p.rect.x + p.rect.w - p.pad.r,
      b: p.rect.y + p.rect.h - p.pad.b,
    };

    const over = {
      left: box.l - n.rect.x,
      top: box.t - n.rect.y,
      right: (n.rect.x + n.rect.w) - box.r,
      bottom: (n.rect.y + n.rect.h) - box.b,
    };

    // A scroll region is *meant* to hold more than fits on its scroll axis.
    const free = { left: scrolls(p.overflowX), right: scrolls(p.overflowX), top: scrolls(p.overflowY), bottom: scrolls(p.overflowY) };
    const breaches = Object.entries(over).filter(([k, v]) => v > EPS && !free[k]);
    if (!breaches.length) continue;

    // Severity depends on whether anything is actually LOST.
    //
    // A clipping parent destroys the overflow — that is unambiguously a defect.
    // A non-clipping parent does not: Roblox renders children outside their
    // parent perfectly happily, and layered UI (edge rails, relief plates,
    // corner notches, badges straddling an edge) depends on exactly that. This
    // rule spent three generations rejecting valid layered designs because it
    // could not tell "lost" from "deliberately overhanging".
    //
    // Escaping the SCREEN is still an error — ruleOnScreen covers it — so
    // nothing genuinely invisible slips through this downgrade.
    const clipped = p.overflow === 'hidden';
    out.push({
      rule: 'containment',
      severity: clipped ? 'error' : 'warn',
      label: labelOf(n, byId),
      detail: `${clipped ? 'clipped by' : 'escapes'} ${labelOf(p, byId)} — ${
        breaches.map(([k, v]) => `${k} by ${v.toFixed(0)}px`).join(', ')}`,
      data: { overflow: over, clipped },
    });
  }
  return out;
}

/** Nothing should render outside the screen. */
export function ruleOnScreen(nodes, { viewport }) {
  const byId = byIdOf(nodes);
  return nodes.flatMap((n) => {
    if (SYNTHETIC.has(n.cls) || n.pid === null) return [];
    // Scrolled-out content is reachable, so its offscreen position is expected.
    if (underScroller(n, byId)) return [];
    const over = {
      left: -n.rect.x,
      top: -n.rect.y,
      right: (n.rect.x + n.rect.w) - viewport.width,
      bottom: (n.rect.y + n.rect.h) - viewport.height,
    };
    const breaches = Object.entries(over).filter(([, v]) => v > EPS);
    if (!breaches.length) return [];
    return [{
      rule: 'on-screen',
      severity: 'error',
      label: labelOf(n, byId),
      detail: `offscreen — ${breaches.map(([k, v]) => `${k} by ${v.toFixed(0)}px`).join(', ')}`,
      data: { overflow: over },
    }];
  });
}

/**
 * Buttons must be big enough to hit. The minimum is derived from the game
 * context's platform mix, so a mobile-heavy title is held to a stricter bar.
 */
export function ruleTouchTargets(nodes, { theme }) {
  const byId = byIdOf(nodes);
  const min = theme.sizing.minTouchTarget;
  return nodes.flatMap((n) => {
    if (!INTERACTIVE.has(n.cls)) return [];
    const { w, h } = n.rect;
    if (w >= min - EPS && h >= min - EPS) return [];
    return [{
      rule: 'touch-target',
      severity: 'error',
      label: labelOf(n, byId),
      detail: `${w.toFixed(0)}x${h.toFixed(0)}px is below the ${min}px minimum for this audience`,
      data: { w, h, min },
    }];
  });
}

/**
 * Text must be legible against whatever is actually behind it — composited
 * through every translucent ancestor, not just the nearest parent.
 */
export function ruleContrast(nodes, { stage }) {
  const byId = byIdOf(nodes);
  return nodes.flatMap((n) => {
    if (!n.text) return [];
    const fg = parseCss(n.color);
    if (fg[3] === 0) return [];
    const bg = effectiveBackground(n, byId, stage);
    const composed = fg[3] < 1
      ? [fg[0] * fg[3] + bg[0] * (1 - fg[3]), fg[1] * fg[3] + bg[1] * (1 - fg[3]), fg[2] * fg[3] + bg[2] * (1 - fg[3])]
      : fg;

    const ratio = contrastRatio(composed, bg);
    const need = requiredRatio(n.fontSize, n.fontWeight);
    if (ratio >= need) return [];
    return [{
      rule: 'contrast',
      severity: ratio < need * 0.75 ? 'error' : 'warn',
      label: labelOf(n, byId),
      detail: `"${n.text.slice(0, 24)}" ${ratio.toFixed(2)}:1 against ${toHex(bg)}, needs ${need}:1`,
      data: { ratio, need, fg: toHex(composed), bg: toHex(bg) },
    }];
  });
}

/** Non-wrapping text wider than its box is silently cut off. */
export function ruleTextFits(nodes) {
  const byId = byIdOf(nodes);
  return nodes.flatMap((n) => {
    if (!n.text || n.clientW === 0) return [];
    const over = n.scrollW - n.clientW;
    if (over <= 1) return [];
    return [{
      rule: 'text-fits',
      severity: 'error',
      label: labelOf(n, byId),
      detail: `"${n.text.slice(0, 24)}" overflows its box by ${over.toFixed(0)}px`,
      data: { over },
    }];
  });
}

/**
 * A font that silently fell back invalidates every text measurement above, so
 * this is reported even though it is a preview-harness problem rather than a
 * design one.
 */
export function ruleFontsLoaded(nodes, { fonts }) {
  const wanted = new Set();
  for (const n of nodes) {
    if (!n.text || !n.fontFamily) continue;
    const first = n.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    if (first) wanted.add(first);
  }
  const loaded = new Set(fonts);
  return [...wanted].filter((f) => !loaded.has(f)).map((f) => ({
    rule: 'font-loaded',
    severity: 'warn',
    label: `font "${f}"`,
    detail: 'did not load; text metrics reflect a fallback face, not the shipped font',
    data: { font: f },
  }));
}

/* --------------------------------------------------------------- entry pt */

const ALL = [ruleContainment, ruleOnScreen, ruleTouchTargets, ruleContrast, ruleTextFits, ruleFontsLoaded];

/**
 * @param {object} snapshot { nodes, viewport, fonts }
 * @param {object} opts     { theme, stage }
 */
export function validate(snapshot, opts) {
  const ctx = {
    viewport: snapshot.viewport,
    fonts: snapshot.fonts ?? [],
    theme: opts.theme,
    stage: opts.stage ?? [110, 110, 115],
  };
  const findings = ALL.flatMap((rule) => rule(snapshot.nodes, ctx));
  const order = { error: 0, warn: 1 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || a.rule.localeCompare(b.rule));
  return {
    findings,
    errors: findings.filter((f) => f.severity === 'error').length,
    warnings: findings.filter((f) => f.severity === 'warn').length,
  };
}
