/**
 * UI spec + theme -> standalone HTML preview.
 *
 * FIDELITY CONTRACT
 * -----------------
 * The preview may only express things the Roblox engine can reproduce. Every
 * mapping below is 1:1 with a real engine feature. Notably:
 *
 *   - No CSS `box-shadow` on content. Roblox has no box-shadow; depth is a
 *     separate 9-slice ImageLabel sibling. We emit a real sibling <div> so the
 *     DOM stays isomorphic to the Instance tree the Luau emitter will build.
 *   - No CSS `filter` on content. The one `blur()` below stands in for a
 *     pre-blurred 9-slice shadow asset, which is a real thing we can ship.
 *   - No `backdrop-filter`, no web-only blend modes.
 *   - Text does not wrap unless the spec sets `wrap: true` (Roblox TextWrapped
 *     defaults to false, and forgetting it is a classic overflow bug).
 *
 * If the preview can show it but Roblox can't, the critic will approve a look
 * that ships broken. That is the failure this file exists to prevent.
 */

import { resolveToken } from '../theme/generate.mjs';

/* ------------------------------------------------------------------ utils */

function hexToRgb(hex) {
  const h = String(hex).replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Bad hex color: ${hex}`);
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Roblox transparency is inverted alpha: 0 = fully opaque. */
function rgba(hex, transparency) {
  const [r, g, b] = hexToRgb(hex);
  const a = 1 - (Number(transparency) || 0);
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}

/** Lighten/darken for gradient sheen, matching UIGradient's ColorSequence. */
function shade(hex, amount) {
  const [r, g, b] = hexToRgb(hex);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + 255 * amount)));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

/** UDim -> CSS calc(). Roblox offsets are raw px at any resolution. */
function udim(scale, offset) {
  const s = Number(scale) || 0;
  const o = Number(offset) || 0;
  if (s === 0) return `${o}px`;
  if (o === 0) return `${(s * 100).toFixed(4)}%`;
  return `calc(${(s * 100).toFixed(4)}% + ${o}px)`;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** Style attribute values must be escaped — font stacks contain quotes. */
const styleAttr = (decls) => `style="${esc(decls.filter(Boolean).join('; '))}"`;

/**
 * Interaction states. A button with one static appearance feels broken however
 * good it looks, so states are first-class in the spec rather than an
 * afterthought in the emitter.
 *
 * Only properties that Roblox can actually tween on a GuiObject are allowed —
 * colours, transparency, stroke, size, rotation. No filters, no shadows.
 */
const STATE_SELECTOR = { hover: ':hover', pressed: ':active', focus: ':focus-visible' };
const STATE_PROPS = new Set(['bg', 'bgTransparency', 'color', 'textTransparency', 'stroke', 'rotation', 'scale', 'gradient']);

/** Roblox easing styles mapped to their CSS cubic-beziers. */
const EASING = {
  linear: 'linear',
  quad: 'cubic-bezier(0.45, 0, 0.55, 1)',
  cubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  quart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  elastic: 'cubic-bezier(0.5, 1.8, 0.6, 1)',
};

const ALIGN_MAIN = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around' };
const ALIGN_CROSS = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch' };

/**
 * Convert a state's property delta into CSS declarations.
 *
 * `baseTransforms` is threaded through because anchor positioning already owns
 * the transform property — a hover scale that forgot it would yank the element
 * back to its unanchored position the instant the cursor touched it.
 */
function stateCss(props, theme, baseTransforms) {
  const out = [];
  for (const key of Object.keys(props)) {
    if (!STATE_PROPS.has(key)) {
      throw new Error(`State property "${key}" is not tweenable on a Roblox GuiObject. Allowed: ${[...STATE_PROPS].join(', ')}`);
    }
  }
  if (props.bg) out.push(`background-color: ${rgba(resolveToken(theme, props.bg), props.bgTransparency)}`);
  if (props.color) out.push(`color: ${rgba(resolveToken(theme, props.color), props.textTransparency)}`);
  if (props.stroke) {
    const sc = resolveToken(theme, props.stroke.color);
    const sw = typeof props.stroke.thickness === 'string'
      ? resolveToken(theme, props.stroke.thickness) : (props.stroke.thickness ?? 1);
    out.push(`outline: ${sw}px solid ${rgba(sc, props.stroke.transparency)}`);
  }
  if (props.rotation !== undefined || props.scale !== undefined) {
    const t = [...baseTransforms];
    if (props.scale !== undefined) t.push(`scale(${props.scale})`);
    if (props.rotation !== undefined) t.push(`rotate(${props.rotation}deg)`);
    out.push(`transform: ${t.join(' ')}`);
  }
  return out;
}

/**
 * Entrance animations, each expressible as a Roblox tween.
 *
 * Declared as a delta rather than literal CSS because keyframes write to the
 * same `transform` property that anchor positioning uses. A keyframe of
 * `transform: scale(1)` silently discards `translate(-50%,-50%)` and drops a
 * centred panel down-right by half its size.
 */
const ENTRANCES = {
  fade: { enter: null },
  'fade-scale': { enter: 'scale(0.92)' },
  'slide-up': { enter: 'translateY(16px)' },
  pop: { enter: 'scale(0.8)' },
};

/** Compose an entrance into keyframes that preserve the element's base transform. */
function entranceKeyframes(entrance, baseTransforms) {
  const base = baseTransforms.join(' ');
  const t = (extra) => {
    const parts = extra ? [...baseTransforms, extra] : baseTransforms;
    return parts.length ? `; transform: ${parts.join(' ')}` : '';
  };
  return {
    from: `opacity: 0${t(entrance.enter)}`,
    to: `opacity: 1${base ? `; transform: ${base}` : ''}`,
  };
}

/** Declared pixel size, when the spec pins one. Used for placeholder legibility. */
function declaredPx(size, axis) {
  const o = size?.o?.[axis];
  return typeof o === 'number' && o > 0 && !size?.s?.[axis] ? o : null;
}

/* -------------------------------------------------------------- node walk */

/**
 * Emits either:
 *   <div outer>...</div>                              (elevation 0)
 *   <div outer><div shadow/><div inner>...</div></div>  (elevation > 0)
 *
 * The wrapper form exists because a shadow must paint *behind* its element's
 * background. A child can't do that once any ancestor makes a stacking context
 * (our anchor `transform` does exactly that), so instead the shadow and the
 * filled surface become siblings and plain document order handles paint order.
 * This mirrors the Roblox pattern of a transparent container Frame holding a
 * shadow ImageLabel plus the visible Frame.
 *
 * @param {object} node   spec node
 * @param {object} theme  generated theme
 * @param {object} ctx    { parentHasLayout, depth, warnings }
 */
function renderNode(baseNode, theme, ctx) {
  const { parentHasLayout, parentLayoutDir, depth, warnings, viewportClass } = ctx;
  const pad = '  '.repeat(depth + 3);

  // Per-viewport overrides. Roblox has no media queries, so shipped code reads
  // AbsoluteSize and applies the matching override table — the same data, just
  // applied at runtime instead of transpile time.
  const node = viewportClass && baseNode.at?.[viewportClass]
    ? { ...baseNode, ...baseNode.at[viewportClass] }
    : baseNode;

  const outer = []; // geometry: participates in parent layout
  const inner = []; // paint: background, stroke, text, own layout

  // Offsets may be token refs, so a button can be sized by the audience-derived
  // touch target rather than a hardcoded number that silently drifts from it.
  const px = (v) => (typeof v === 'string' ? resolveToken(theme, v, { group: 'sizing' }) : v);

  /* --- positioning (outer) --------------------------------------------- */
  // Roblox children are absolutely positioned unless a UILayout governs them.
  // AnchorPoint and Rotation both land on CSS `transform`, so they are composed
  // rather than written separately — the second would silently drop the first.
  // Order matters: translate, then rotate about the element's own centre, which
  // is what Roblox's Rotation does.
  const transforms = [];
  if (parentHasLayout) {
    outer.push('position: relative');
  } else {
    outer.push('position: absolute');
    const pos = node.pos ?? { s: [0, 0], o: [0, 0] };
    outer.push(`left: ${udim(pos.s?.[0], px(pos.o?.[0]))}`);
    outer.push(`top: ${udim(pos.s?.[1], px(pos.o?.[1]))}`);
    const [ax, ay] = node.anchor ?? [0, 0];
    if (ax || ay) transforms.push(`translate(${-ax * 100}%, ${-ay * 100}%)`);
  }
  if (node.rotation) transforms.push(`rotate(${node.rotation}deg)`);
  if (transforms.length) outer.push(`transform: ${transforms.join(' ')}`);

  /* --- size (outer) ----------------------------------------------------- */
  const size = node.size;
  const autoHeight = size?.auto === 'y' || size?.auto === 'xy';
  // Roblox AutomaticSize takes X, Y or XY. Only Y was mapped here, so `auto: 'x'`
  // was accepted by the spec vocabulary and then silently did nothing — an element
  // asking to size to its content got no width at all and collapsed. Worst kind of
  // gap: no error, wrong output. `fit-content` is the 1:1 mapping for AutomaticSize.X.
  const autoWidth = size?.auto === 'x' || size?.auto === 'xy';
  if (size) {
    if (autoWidth) outer.push('width: fit-content');
    else if (size.s?.[0] || size.o?.[0]) outer.push(`width: ${udim(size.s?.[0], px(size.o?.[0]))}`);
    if (autoHeight) outer.push('height: auto');
    else if (size.s?.[1] || size.o?.[1]) outer.push(`height: ${udim(size.s?.[1], px(size.o?.[1]))}`);
  }
  // Caps a content-driven region so the panel can't grow past the screen.
  if (node.maxSize) {
    const ms = node.maxSize;
    if (ms.s?.[0] || ms.o?.[0]) outer.push(`max-width: ${udim(ms.s?.[0], px(ms.o?.[0]))}`);
    if (ms.s?.[1] || ms.o?.[1]) outer.push(`max-height: ${udim(ms.s?.[1], px(ms.o?.[1]))}`);
  }
  if (node.aspect) outer.push(`aspect-ratio: ${node.aspect}`);
  if (node.flex && parentHasLayout) {
    outer.push(`flex: ${node.flex}`);
    // A flex item won't shrink below its content unless the min size is
    // cleared. Roblox's UIFlexItem Shrink mode does shrink, so without this the
    // preview would over-report overflow that the engine wouldn't produce.
    const shrink = Number(String(node.flex).trim().split(/\s+/)[1] ?? 1);
    if (shrink > 0) outer.push(parentLayoutDir === 'horizontal' ? 'min-width: 0' : 'min-height: 0');
  }
  if (node.zIndex !== undefined) outer.push(`z-index: ${node.zIndex}`);
  outer.push('box-sizing: border-box');

  /* --- surface (inner) -------------------------------------------------- */
  let bgHex = null;
  if (node.bg) {
    bgHex = resolveToken(theme, node.bg);
    inner.push(`background-color: ${rgba(bgHex, node.bgTransparency)}`);
  }

  // UIGradient. Roblox rotation 0 = left->right; CSS 0deg = bottom->top.
  if (node.gradient && bgHex) {
    const g = typeof node.gradient === 'string'
      ? theme.gradient[node.gradient] ?? theme.gradient.surfaceSheen
      : node.gradient;
    const strength = g.strength ?? theme.gradient.strength;
    const rot = (g.rotation ?? 90) + 90;
    inner.push(`background-image: linear-gradient(${rot}deg, ${shade(bgHex, strength)}, ${shade(bgHex, -strength * 0.5)})`);
  }

  let radiusPx = 0;
  if (node.corner) {
    radiusPx = resolveToken(theme, node.corner, { group: 'radius' });
    inner.push(`border-radius: ${radiusPx >= 999 ? '9999px' : `${radiusPx}px`}`);
  }

  // UIStroke draws outward and does NOT affect layout — CSS outline matches
  // that exactly, where `border` would not.
  if (node.stroke) {
    const sc = resolveToken(theme, node.stroke.color);
    const sw = typeof node.stroke.thickness === 'string'
      ? resolveToken(theme, node.stroke.thickness, { group: 'stroke' })
      : (node.stroke.thickness ?? 1);
    inner.push(`outline: ${sw}px solid ${rgba(sc, node.stroke.transparency)}`);
    inner.push('outline-offset: 0px');
  }

  if (node.clip) inner.push('overflow: hidden');
  // ScrollingFrame. Overflowing a scroll region is reachable content, not a
  // layout bug, and the validator is told to treat it that way.
  if (node.scroll) inner.push(`overflow-${node.scroll}: auto`, `overflow-${node.scroll === 'y' ? 'x' : 'y'}: hidden`);

  /* --- padding (inner) -------------------------------------------------- */
  if (node.padding !== undefined) {
    const p = node.padding;
    if (typeof p === 'string' || typeof p === 'number') {
      inner.push(`padding: ${resolveToken(theme, p, { group: 'space' })}px`);
    } else {
      const g = (k) => (p[k] !== undefined ? resolveToken(theme, p[k], { group: 'space' }) : 0);
      inner.push(`padding: ${g('top')}px ${g('right')}px ${g('bottom')}px ${g('left')}px`);
    }
  }

  /* --- layout (UIListLayout) -------------------------------------------- */
  const hasLayout = Boolean(node.layout);
  if (hasLayout) {
    const l = node.layout;
    inner.push('display: flex');
    inner.push(`flex-direction: ${l.dir === 'horizontal' ? 'row' : 'column'}`);
    if (l.gap !== undefined) inner.push(`gap: ${resolveToken(theme, l.gap, { group: 'space' })}px`);
    inner.push(`justify-content: ${ALIGN_MAIN[l.justify ?? 'start'] ?? 'flex-start'}`);
    inner.push(`align-items: ${ALIGN_CROSS[l.align ?? 'stretch'] ?? 'stretch'}`);
    if (l.wrap) inner.push('flex-wrap: wrap');
  }

  /* --- text (inner) ----------------------------------------------------- */
  // A TextBox shows its placeholder until the player types. Previewing the
  // empty state is what matters, since that is what they see on open.
  const isTextBox = node.class === 'TextBox';
  const displayText = node.text ?? (isTextBox ? node.placeholder : undefined);
  const isText = displayText !== undefined;
  if (isText) {
    // Accept both "label" and "type.label": everything else in a spec is a
    // dotted token ref, so writing the group prefix here is a natural slip.
    const typeKey = String(node.type ?? 'body').replace(/^type\./, '');
    const t = theme.type[typeKey];
    if (!t) throw new Error(`Unknown type token "${node.type}". Known: ${Object.keys(theme.type).join(', ')}`);
    inner.push(`font-family: ${t.webFont}`);
    inner.push(`font-size: ${t.size}px`);
    inner.push(`font-weight: ${t.weight}`);
    if (t.tracking) inner.push(`letter-spacing: ${t.tracking}px`);
    const defaultColor = isTextBox && node.text === undefined ? 'content.muted' : 'content.primary';
    inner.push(`color: ${rgba(resolveToken(theme, node.color ?? defaultColor), node.textTransparency)}`);
    inner.push(node.wrap ? 'white-space: normal' : 'white-space: nowrap');
    if (node.wrap) inner.push('overflow-wrap: anywhere');
    // TextLabel centers vertically by default (TextYAlignment = Center).
    if (!hasLayout) {
      inner.push('display: flex');
      inner.push(`justify-content: ${ALIGN_MAIN[node.align ?? 'center'] ?? 'center'}`);
      inner.push(`align-items: ${ALIGN_CROSS[node.alignY ?? 'center'] ?? 'center'}`);
    }
    inner.push('line-height: 1.15');
    if (node.textStroke) {
      const tsc = resolveToken(theme, node.textStroke.color);
      const tsw = typeof node.textStroke.thickness === 'string'
        ? resolveToken(theme, node.textStroke.thickness, { group: 'stroke' })
        : (node.textStroke.thickness ?? 1);
      inner.push(`-webkit-text-stroke: ${tsw}px ${rgba(tsc)}`);
      inner.push('paint-order: stroke fill');
    }
  }

  /* --- image (inner) ---------------------------------------------------- */
  let placeholderLabel = null;
  if (node.image) {
    if (typeof node.image === 'object' && node.image.placeholder) {
      // We cannot invent real rbxassetid values. Render a labelled block so the
      // critic judges composition and never mistakes missing art for a layout
      // bug. Art sourcing is a separate pipeline stage.
      const w = declaredPx(size, 0);
      const h = declaredPx(size, 1);
      // Only label boxes big enough to hold the text; a 22px icon can't.
      const roomy = (w === null || w >= 72) && (h === null || h >= 40);
      placeholderLabel = roomy ? node.image.placeholder : null;
      inner.push(`background-color: ${rgba(resolveToken(theme, 'surface.sunken'), 0.15)}`);
      inner.push(`outline: 1px dashed ${rgba(resolveToken(theme, 'border.subtle'))}`);
      inner.push('overflow: hidden');
      if (!hasLayout && !isText) {
        inner.push('display: flex', 'align-items: center', 'justify-content: center');
      }
      warnings.push(`placeholder art: "${node.image.placeholder}" (${node.name ?? node.class})`);
    } else if (node.slice) {
      // 9-slice. Roblox: ScaleType.Slice + SliceCenter, which stretches the
      // middle while holding the corners — the only way to build an ornate
      // frame that scales. CSS border-image is the exact analogue, and takes
      // the same four edge insets.
      const [t, r, b, l] = node.slice.inset;
      inner.push(`border-image: url("${node.image}") ${t} ${r} ${b} ${l} fill stretch`);
      inner.push(`border-style: solid`);
      inner.push(`border-width: ${t}px ${r}px ${b}px ${l}px`);
    } else {
      inner.push(`background-image: url("${node.image}")`);
      inner.push(`background-size: ${node.imageFit === 'crop' ? 'cover' : 'contain'}`);
      inner.push('background-repeat: no-repeat');
      inner.push('background-position: center');
      // ImageColor3 multiplies the image by a colour; multiply blend matches.
      if (node.imageTint) {
        inner.push(`background-color: ${rgba(resolveToken(theme, node.imageTint))}`);
        inner.push('background-blend-mode: multiply');
      }
    }
  }

  /* --- ViewportFrame ---------------------------------------------------- */
  if (node.class === 'ViewportFrame') {
    // A live 3D model render cannot be reproduced in a browser. This is the one
    // node type where the preview genuinely cannot verify the shipped result,
    // so it is always flagged rather than quietly approximated.
    warnings.push(`ViewportFrame "${node.name ?? '?'}" is unverifiable in preview — needs a Studio check`);
    if (node.preview) {
      inner.push(`background-image: url("${node.preview}")`);
      inner.push('background-size: contain', 'background-repeat: no-repeat', 'background-position: center');
    } else {
      inner.push(`outline: 1px dashed ${rgba(resolveToken(theme, 'accent.tertiary'), 0.4)}`);
    }
  }

  inner.push('box-sizing: border-box');

  /* --- states & motion -------------------------------------------------- */
  let stateId = null;
  if (node.states || node.motion) {
    stateId = `s${ctx.counter.n++}`;
    const sel = `[data-s="${stateId}"]`;
    const dur = node.motion?.duration ?? 0.15;
    const ease = EASING[node.motion?.easing ?? 'quad'] ?? EASING.quad;

    if (node.states) {
      // Transitions only on the properties states actually touch — `all` would
      // animate layout changes too and make responsive reflow look like a bug.
      inner.push(`transition: background-color ${dur}s ${ease}, color ${dur}s ${ease}, outline-color ${dur}s ${ease}, transform ${dur}s ${ease}`);
      for (const [state, props] of Object.entries(node.states)) {
        if (state === 'disabled' || state === 'selected') {
          // Not pseudo-classes — these are game state, driven by an attribute
          // the Luau side sets. Same rule text either way.
          ctx.styleRules.push(`${sel}[data-state="${state}"] { ${stateCss(props, theme, transforms).join('; ')} }`);
          continue;
        }
        const pseudo = STATE_SELECTOR[state];
        if (!pseudo) throw new Error(`Unknown state "${state}". Known: ${[...Object.keys(STATE_SELECTOR), 'disabled', 'selected'].join(', ')}`);
        ctx.styleRules.push(`${sel}${pseudo} { ${stateCss(props, theme, transforms).join('; ')} }`);
      }
    }

    if (node.motion?.enter) {
      const entrance = ENTRANCES[node.motion.enter];
      if (!entrance) throw new Error(`Unknown entrance "${node.motion.enter}". Known: ${Object.keys(ENTRANCES).join(', ')}`);
      const anim = entranceKeyframes(entrance, transforms);
      const name = `enter_${stateId}`;
      const edur = node.motion.duration ?? 0.3;
      const delay = node.motion.delay ?? 0;
      ctx.styleRules.push(`@keyframes ${name} { from { ${anim.from} } to { ${anim.to} } }`);
      ctx.styleRules.push(`${sel} { animation: ${name} ${edur}s ${ease} ${delay}s both }`);
      // Roblox has no subtree opacity: fading a container means either tweening
      // every descendant's Transparency or wrapping it in a CanvasGroup. The
      // emitter picks CanvasGroup; noting it here keeps the two in step.
      if ((node.children ?? []).length) {
        warnings.push(`motion on "${node.name ?? node.class}" fades a subtree — emits a CanvasGroup in Luau`);
      }
    }
  }

  /* --- children --------------------------------------------------------- */
  const kids = (node.children ?? [])
    .map((child) => renderNode(child, theme, {
      parentHasLayout: hasLayout,
      parentLayoutDir: node.layout?.dir ?? 'vertical',
      depth: depth + (node.elevation ? 2 : 1),
      warnings,
      viewportClass,
      styleRules: ctx.styleRules,
      counter: ctx.counter,
    }))
    .join('\n');

  const body = [
    isText ? `\n${pad}  ${esc(displayText)}` : '',
    placeholderLabel
      ? `\n${pad}  <span ${styleAttr([
          "font-family: 'JetBrains Mono', Consolas, monospace",
          'font-size: 11px',
          'opacity: 0.5',
          `color: ${rgba(resolveToken(theme, 'content.secondary'))}`,
        ])}>${esc(placeholderLabel)}</span>`
      : '',
    kids ? `\n${kids}` : '',
  ].join('');

  const idAttrs = [
    `data-rbx="${esc(node.class ?? 'Frame')}"`,
    node.name ? `data-name="${esc(node.name)}"` : '',
    // getBoundingClientRect returns the axis-aligned box of a rotated element,
    // which is legitimately larger than its layout box. The containment rule is
    // told to skip these rather than report a phantom overflow.
    node.rotation ? 'data-rot="1"' : '',
    // Declared overhang. Roblox renders children outside their parent happily,
    // so a rail bonded to a panel edge is a real device, not a defect — but it
    // has to be stated, or the rule cannot tell it from an accident.
    node.bleed ? 'data-bleed="1"' : '',
    stateId ? `data-s="${stateId}"` : '',
    // Lets a brief preview a non-default state ("show me the disabled buy button").
    node.state ? `data-state="${esc(node.state)}"` : '',
  ].filter(Boolean).join(' ');

  /* --- compose ---------------------------------------------------------- */
  const elev = node.elevation ?? 0;
  if (!elev) {
    return `${pad}<div ${idAttrs} ${styleAttr([...outer, ...inner])}>${body}${body ? `\n${pad}` : ''}</div>`;
  }

  const e = theme.elevation[elev];
  if (!e) throw new Error(`Unknown elevation level ${elev}`);

  const shadow = styleAttr([
    'position: absolute',
    `left: ${-e.spread / 2}px`,
    `top: ${-e.spread / 2 + e.offsetY}px`,
    `width: calc(100% + ${e.spread}px)`,
    `height: calc(100% + ${e.spread}px)`,
    `border-radius: ${radiusPx >= 999 ? '9999px' : `${radiusPx + e.spread / 3}px`}`,
    `background: rgba(0, 0, 0, ${e.alpha})`,
    // Stands in for a pre-blurred 9-slice shadow asset — a real shippable thing.
    `filter: blur(${e.spread / 2}px)`,
    'pointer-events: none',
  ]);

  // `width: 100%` inside a `fit-content` parent is circular, so auto-width has to
  // propagate to the inner surface as well.
  const contentGeom = [
    'position: relative',
    autoWidth ? 'width: auto' : 'width: 100%',
    autoHeight ? 'height: auto' : 'height: 100%',
  ];

  return [
    `${pad}<div ${idAttrs} ${styleAttr(outer)}>`,
    `${pad}  <div data-rbx="ShadowSlice" ${shadow}></div>`,
    `${pad}  <div data-rbx="Surface"${node.name ? ` data-name="${esc(node.name)}"` : ''} ${styleAttr([...contentGeom, ...inner])}>${body}${body ? `\n${pad}  ` : ''}</div>`,
    `${pad}</div>`,
  ].join('\n');
}

/* ------------------------------------------------------------------ entry */

/**
 * @param {object} spec   { name, root }
 * @param {object} theme  generated theme
 * @param {object} [opts] { viewport, background }
 * @returns {{ html: string, warnings: string[] }}
 */
export function transpile(spec, theme, opts = {}) {
  const viewport = opts.viewport ?? { width: 1920, height: 1080 };
  const warnings = [];
  const styleRules = [];
  const body = renderNode(spec.root, theme, {
    parentHasLayout: false,
    depth: 0,
    warnings,
    viewportClass: opts.viewportClass,
    styleRules,
    counter: { n: 0 },
  });

  // A neutral mid-grey stage stands in for the 3D world behind the ScreenGui.
  // Never the theme background — that would flatter contrast and let the critic
  // approve UI that vanishes against real gameplay.
  const stage = opts.background ?? '#6E6E73';

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(spec.name ?? 'UI Preview')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&family=Fredoka+One&family=Merriweather:wght@400;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${viewport.width}px; height: ${viewport.height}px; overflow: hidden; }
  body { background: ${stage}; }
  #screengui { position: relative; width: 100%; height: 100%; }
  /* Roblox ScrollingFrames show a scrollbar (ScrollBarThickness /
     ScrollBarImageColor3). Rendering one keeps a clipped list reading as
     scrollable rather than as a layout bug. */
  [data-rbx="ScrollingFrame"]::-webkit-scrollbar { width: 6px; }
  [data-rbx="ScrollingFrame"]::-webkit-scrollbar-track { background: transparent; }
  [data-rbx="ScrollingFrame"]::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.28); border-radius: 3px;
  }
${styleRules.map((r) => `  ${r}`).join('\n')}
</style>
</head>
<body>
  <div id="screengui" data-rbx="ScreenGui">
${body}
  </div>
</body>
</html>
`;

  return { html, warnings };
}
