/**
 * Pattern: hud-overlay.
 *
 * Persistent readouts drawn over live gameplay. The thing every brief this repo
 * has produced needed and none could build.
 *
 * A HUD is not a panel with the scrim removed, and treating it as one is the
 * mistake this file exists to avoid. Three properties invert:
 *
 *   1. **It is never dismissed and never focused.** No close button, no backdrop
 *      to click away. So nothing here is `PRESSABLE` by default — a HUD that
 *      responds to hover teaches the player it can be clicked, and most of it
 *      cannot.
 *   2. **The background must stay transparent.** The player is looking *through*
 *      this at the game. Every container sets `bgTransparency: 1` unless it is a
 *      readout chip deliberately earning its own fill.
 *   3. **It is anchored to edges, not centred.** Clusters sit in corners or in a
 *      spanning bar, absolutely positioned, because a HUD's job is to stay out of
 *      the middle where the game is.
 *
 * Readability over live gameplay is the whole difficulty: a panel controls its own
 * background and a HUD does not, so text sits on whatever colour the world happens
 * to be. Hence `textStroke` on every value by default — that is not decoration, it
 * is the only thing keeping a white number legible against a snow biome.
 */

/** Spacing personality, matching modal-grid's vocabulary so briefs read alike. */
const DENSITY = {
  comfortable: { edge: 'space.lg', gap: 'space.md', chipPad: 'space.sm', chipGap: 'space.sm' },
  compact: { edge: 'space.md', gap: 'space.sm', chipPad: 'space.xs', chipGap: 'space.xs' },
};

/**
 * Distance from the screen edge. `inset` exists for phones with a notch or a
 * gesture bar, where Roblox's own GUI inset is not enough and a corner readout
 * ends up under the system furniture.
 */
const ANCHOR_INSET = {
  edge: { base: 0, mobile: 0 },
  inset: { base: 8, mobile: 28 },
};

const BAR_HEIGHT = { none: 0, thin: 8, chunky: 18 };

const CLUSTERS = {
  topLeft: { pos: { s: [0, 0], o: [1, 1] }, anchor: [0, 0], justify: 'start' },
  topRight: { pos: { s: [1, 0], o: [-1, 1] }, anchor: [1, 0], justify: 'end' },
  bottomLeft: { pos: { s: [0, 1], o: [1, -1] }, anchor: [0, 1], justify: 'start' },
  bottomRight: { pos: { s: [1, 1], o: [-1, -1] }, anchor: [1, 1], justify: 'end' },
};

/* --------------------------------------------------------------- fragments */

/**
 * One labelled number. `plain` has no fill at all, which is the honest default
 * for a HUD — every pixel of chrome is a pixel of game you cannot see.
 */
function readout(r, { style, chipPad, chipGap, stacked }) {
  const filled = style !== 'plain';
  const label = r.label ? [{
    class: 'TextLabel',
    name: 'ReadoutLabel',
    text: r.label,
    type: 'caption',
    color: 'content.muted',
    size: { s: [null, null], o: [null, 14], auto: 'x' },
    flex: '0 0 auto',
    align: stacked ? 'start' : 'center',
    // Even a muted label needs the stroke: "muted" is a mid grey, and mid grey on
    // a mid-grey world is invisible.
    textStroke: { color: 'surface.sunken', thickness: 'stroke.hairline', transparency: 0.35 },
  }] : [];

  return {
    class: 'Frame',
    name: `Readout_${(r.label ?? r.value).replace(/[^A-Za-z0-9]/g, '')}`,
    size: { s: [null, null], o: [null, null], auto: stacked ? 'xy' : 'x' },
    flex: '0 0 auto',
    ...(filled
      ? {
        bg: 'surface.overlay',
        // A pill radius is only correct on a single-line horizontal chip. On a
        // stacked one it clamps to a stadium and the curve cuts across the corner
        // text — the fill visibly leaves the words behind. So the radius follows
        // the shape, not the style name.
        corner: style === 'pill' ? (stacked ? 'radius.lg' : 'radius.pill') : 'radius.sm',
        padding: { top: chipPad, bottom: chipPad, left: 'space.md', right: 'space.md' },
        ...(style === 'framed'
          ? { stroke: { color: 'border.subtle', thickness: 'stroke.hairline' } }
          : {}),
      }
      // A plain readout still needs its own padding or adjacent ones collide.
      : { bgTransparency: 1, padding: { top: 0, bottom: 0, left: 0, right: 0 } }),
    layout: {
      dir: stacked ? 'vertical' : 'horizontal',
      gap: chipGap,
      align: stacked ? 'start' : 'center',
      justify: 'start',
    },
    children: [
      ...(r.icon ? [{
        class: 'ImageLabel',
        name: 'ReadoutIcon',
        size: { s: [null, null], o: [20, 20] },
        flex: '0 0 auto',
        image: { placeholder: r.icon },
        corner: 'radius.sm',
      }] : []),
      ...(stacked ? label : []),
      {
        class: 'TextLabel',
        name: 'ReadoutValue',
        text: String(r.value),
        type: 'numeric',
        color: 'content.primary',
        size: { s: [null, null], o: [null, 20], auto: 'x' },
        flex: '0 0 auto',
        align: 'start',
        // The load-bearing line in this file. See the header.
        textStroke: { color: 'surface.sunken', thickness: 'stroke.base' },
      },
      ...(stacked ? [] : label),
    ],
  };
}

/**
 * A progress track. Kept separate from the readouts because progress is the one
 * HUD element whose *shape* carries meaning — a number can go anywhere, a bar has
 * to be wide enough to read a fraction off.
 */
function progressBar(p, { bar, barCap, gap }) {
  if (!p || bar === 'none') return [];
  const height = BAR_HEIGHT[bar];
  const clamped = Math.max(0, Math.min(1, Number(p.value) || 0));
  // Label above the track, not inside it. A caption centred in an 18px bar is
  // unreadable at phone scale, and a full bar hides it entirely — tried both.
  return [
    ...(p.label ? [{
      class: 'TextLabel',
      name: 'BarLabel',
      text: p.label,
      type: 'caption',
      color: 'content.primary',
      size: { s: [1, null], o: [null, 16] },
      flex: '0 0 auto',
      align: 'start',
      bgTransparency: 1,
      textStroke: { color: 'surface.sunken', thickness: 'stroke.base' },
    }] : []),
    {
      class: 'Frame',
      name: 'Bar',
      size: { s: [1, null], o: [null, height] },
      flex: '0 0 auto',
      bg: 'surface.sunken',
      corner: barCap === 'round' ? 'radius.pill' : 'radius.sm',
      stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
      children: [{
        class: 'Frame',
        name: 'BarFill',
        // Scale width, so the fill is correct at any resolution without script.
        size: { s: [clamped, 1], o: [0, 0] },
        pos: { s: [0, 0], o: [0, 0] },
        bg: 'accent.primary',
        corner: barCap === 'round' ? 'radius.pill' : 'radius.sm',
        gradient: 'accentSheen',
      }],
    },
  ];
}

/**
 * The only interactive part of a HUD, so the only part that gets press states.
 * Sized to the touch target rather than to its icon, because a 20px button on a
 * phone is a button nobody hits.
 */
function actionButton(a) {
  return {
    class: 'ImageButton',
    name: `Action_${a.name.replace(/[^A-Za-z0-9]/g, '')}`,
    size: { s: [null, null], o: [52, 52] },
    at: { mobile: { size: { s: [null, null], o: [56, 56] } } },
    flex: '0 0 auto',
    bg: 'surface.raised',
    corner: 'radius.md',
    stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
    elevation: 2,
    image: a.icon ? { placeholder: a.icon } : undefined,
    imageFit: 'contain',
    states: {
      hover: { scale: 1.05 },
      pressed: { scale: 0.94 },
      disabled: { bgTransparency: 0.6, color: 'content.muted' },
    },
    motion: { duration: 0.11, easing: 'back' },
  };
}

/* ------------------------------------------------------------------ pattern */

export function hudOverlay(brief) {
  const v = brief.variant ?? {};
  const orn = brief.ornament ?? {};
  const c = brief.content ?? {};

  const density = DENSITY[v.density ?? 'comfortable'];
  const layout = v.layout ?? 'corners';
  const style = v.readoutStyle ?? 'pill';
  const bar = v.bar ?? 'none';
  const inset = ANCHOR_INSET[v.anchor ?? 'edge'];
  const trimmed = orn.readoutTrim === 'accent-edge';

  const readouts = c.readouts ?? [];
  const actions = c.actions ?? [];

  const slotHost = (name) => (brief.slots?.[name]?.length ? [{
    class: 'Frame',
    name: `Slot_${name}`,
    size: { s: [1, null], o: [null, null], auto: 'y' },
    flex: '0 0 auto',
    bgTransparency: 1,
    layout: { dir: 'vertical', gap: 'space.sm', align: 'stretch', justify: 'start' },
  }] : []);

  /** Wrap a set of children in an edge-anchored, transparent cluster. */
  const cluster = (key, children, dir = 'horizontal') => {
    const geo = CLUSTERS[key];
    return {
      class: 'Frame',
      name: `Cluster_${key}`,
      pos: {
        s: geo.pos.s,
        o: [geo.pos.o[0] * inset.base, geo.pos.o[1] * inset.base],
      },
      at: {
        mobile: {
          pos: { s: geo.pos.s, o: [geo.pos.o[0] * inset.mobile, geo.pos.o[1] * inset.mobile] },
        },
      },
      anchor: geo.anchor,
      size: { s: [null, null], o: [null, null], auto: 'xy' },
      maxSize: { s: [0.46, null], o: [null, null] },
      bgTransparency: 1,
      padding: {
        top: density.edge, bottom: density.edge, left: density.edge, right: density.edge,
      },
      layout: { dir, gap: density.gap, align: 'center', justify: geo.justify },
      children,
    };
  };

  const mk = (r) => readout(r, {
    style,
    chipPad: density.chipPad,
    chipGap: density.chipGap,
    // In a spanning bar there is horizontal room, so label beside value. In a
    // corner there is not, so stack.
    stacked: layout === 'corners',
  });

  let children;

  if (layout === 'corners') {
    // Each readout names its own corner; anything unassigned goes top-left,
    // because an unplaced readout must still be visible rather than dropped.
    const byCluster = new Map();
    for (const r of readouts) {
      const key = CLUSTERS[r.cluster] ? r.cluster : 'topLeft';
      if (!byCluster.has(key)) byCluster.set(key, []);
      byCluster.get(key).push(mk(r));
    }
    // Progress belongs with whichever cluster the brief put it in, defaulting to
    // bottom-left where it is out of the sightline.
    const progressKey = CLUSTERS[c.progress?.cluster] ? c.progress.cluster : 'bottomLeft';
    if (bar !== 'none' && c.progress) {
      if (!byCluster.has(progressKey)) byCluster.set(progressKey, []);
      byCluster.get(progressKey).push({
        class: 'Frame',
        name: 'ProgressGroup',
        size: { s: [null, null], o: [220, null], auto: 'y' },
        flex: '0 0 auto',
        bgTransparency: 1,
        layout: { dir: 'vertical', gap: density.chipGap, align: 'stretch', justify: 'start' },
        children: progressBar(c.progress, { bar, barCap: orn.barCap ?? 'flat', gap: density.gap }),
      });
    }
    children = [...byCluster].map(([key, kids]) => cluster(key, kids, 'vertical'));
    if (actions.length) {
      children.push(cluster('bottomRight', actions.map(actionButton), 'horizontal'));
    }
  } else {
    // A spanning bar. One row, readouts left, actions right, progress beneath.
    const atTop = layout === 'top-bar';
    const row = {
      class: 'Frame',
      name: 'BarRow',
      size: { s: [1, null], o: [null, null], auto: 'y' },
      flex: '0 0 auto',
      bgTransparency: 1,
      layout: { dir: 'horizontal', gap: density.gap, align: 'center', justify: 'between' },
      children: [
        {
          class: 'Frame',
          name: 'Cluster_leading',
          size: { s: [null, null], o: [null, null], auto: 'xy' },
          flex: '0 1 auto',
          bgTransparency: 1,
          layout: { dir: 'horizontal', gap: density.gap, align: 'center', justify: 'start' },
          children: readouts.map(mk),
        },
        ...(actions.length ? [{
          class: 'Frame',
          name: 'Cluster_trailing',
          size: { s: [null, null], o: [null, null], auto: 'xy' },
          flex: '0 0 auto',
          bgTransparency: 1,
          layout: { dir: 'horizontal', gap: density.chipGap, align: 'center', justify: 'end' },
          children: actions.map(actionButton),
        }] : []),
      ],
    };

    children = [{
      class: 'Frame',
      name: `Cluster_${atTop ? 'topBar' : 'bottomBar'}`,
      pos: { s: [0.5, atTop ? 0 : 1], o: [0, atTop ? inset.base : -inset.base] },
      at: {
        mobile: { pos: { s: [0.5, atTop ? 0 : 1], o: [0, atTop ? inset.mobile : -inset.mobile] } },
      },
      anchor: [0.5, atTop ? 0 : 1],
      size: { s: [1, null], o: [null, null], auto: 'y' },
      bgTransparency: 1,
      padding: {
        top: density.edge, bottom: density.edge, left: density.edge, right: density.edge,
      },
      layout: { dir: 'vertical', gap: density.chipGap, align: 'stretch', justify: 'start' },
      children: [
        ...(atTop ? [] : progressBar(c.progress, { bar, barCap: orn.barCap ?? 'flat', gap: density.gap })),
        row,
        ...(atTop ? progressBar(c.progress, { bar, barCap: orn.barCap ?? 'flat', gap: density.gap }) : []),
      ],
    }];
  }

  if (trimmed) {
    // A hairline along the screen edge the HUD is anchored to. Cheap way to make
    // a transparent HUD feel deliberate rather than floating.
    const atTop = layout === 'top-bar';
    children.push({
      class: 'Frame',
      name: 'Trim',
      size: { s: [1, null], o: [null, 3] },
      pos: { s: [0, atTop ? 0 : 1], o: [0, 0] },
      anchor: [0, atTop ? 0 : 1],
      bg: 'accent.secondary',
      zIndex: 0,
    });
  }

  return {
    name: brief.screen ? `${brief.screen}-hud` : 'HudOverlay',
    screen: brief.screen,
    // No panel to crop to. A HUD screenshot has to show the whole viewport or the
    // thing being reviewed — where it sits relative to the edges — is cropped out.
    focus: 'Root',
    root: {
      class: 'Frame',
      name: 'Root',
      size: { s: [1, 1], o: [0, 0] },
      pos: { s: [0, 0], o: [0, 0] },
      // The player is looking through this. See the header.
      bgTransparency: 1,
      children: [...slotHost('hudTop'), ...children, ...slotHost('hudBottom')],
    },
  };
}

export const meta = {
  id: 'hud-overlay',
  summary: 'Persistent edge-anchored readouts drawn over live gameplay. No scrim, never dismissed.',
  variant: {
    layout: ['corners', 'top-bar', 'bottom-bar'],
    readoutStyle: ['plain', 'pill', 'framed'],
    bar: ['none', 'thin', 'chunky'],
    density: ['comfortable', 'compact'],
    anchor: ['edge', 'inset'],
  },
  ornament: {
    readoutTrim: ['none', 'accent-edge'],
    barCap: ['flat', 'round'],
  },
  slots: ['hudTop', 'hudBottom'],
  nodes: [
    'Root', 'Cluster_*', 'Readout_*', 'ReadoutIcon', 'ReadoutLabel', 'ReadoutValue',
    'ProgressGroup', 'Bar', 'BarFill', 'BarLabel', 'BarRow', 'Action_*', 'Trim',
  ],
  /**
   * Content contract. Declared here rather than in the compiler so a second
   * pattern cannot be added without saying what it needs — the compiler used to
   * hardcode modal-grid's shape, which made every other pattern unaddable.
   */
  validateContent(c) {
    const problems = [];
    if (!Array.isArray(c.readouts) || c.readouts.length === 0) {
      problems.push('content.readouts must be a non-empty array');
    }
    (c.readouts ?? []).forEach((r, i) => {
      if (r.value === undefined || r.value === null || r.value === '') {
        problems.push(`content.readouts[${i}].value is required`);
      }
      if (r.cluster && !(r.cluster in CLUSTERS)) {
        problems.push(`content.readouts[${i}].cluster = ${JSON.stringify(r.cluster)} is not a cluster; allowed: ${Object.keys(CLUSTERS).join(', ')}`);
      }
    });
    if (c.progress !== undefined) {
      const val = Number(c.progress?.value);
      if (!Number.isFinite(val) || val < 0 || val > 1) {
        problems.push('content.progress.value must be a number from 0 to 1');
      }
      if (c.progress?.cluster && !(c.progress.cluster in CLUSTERS)) {
        problems.push(`content.progress.cluster = ${JSON.stringify(c.progress.cluster)} is not a cluster`);
      }
    }
    (c.actions ?? []).forEach((a, i) => {
      if (!a.name) problems.push(`content.actions[${i}].name is required`);
    });
    return problems;
  },
};
