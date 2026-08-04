/**
 * Pattern: modal-grid.
 *
 * A centred dismissible panel over a scrim, holding a grid of selectable
 * things. Covers shop, inventory, crate-open, battle pass, pet index — most of
 * what a simulator needs. `shop.spec.mjs` was the hand-written ancestor of this
 * file; it is now one point in this pattern's parameter space rather than a
 * bespoke screen.
 *
 * Everything below emits token references only. The pattern decides *structure*;
 * the theme decides how it looks. That split is what lets one pattern serve six
 * archetypes without smelling like the same game twice.
 */

/**
 * Default interaction feedback for anything clickable. A button with one static
 * appearance reads as broken however good it looks, so this is applied by the
 * pattern rather than left for each brief to remember.
 */
const PRESSABLE = {
  states: {
    hover: { scale: 1.03, stroke: { color: 'content.primary', thickness: 'stroke.hairline', transparency: 0.55 } },
    pressed: { scale: 0.97 },
    disabled: { bgTransparency: 0.6, color: 'content.muted' },
  },
  motion: { duration: 0.13, easing: 'back' },
};

/** Spacing personality. Density changes proportion more than any single token. */
const DENSITY = {
  comfortable: { pad: 'space.xl', gap: 'space.lg', cardPad: 'space.md', cardGap: 'space.sm' },
  compact: { pad: 'space.lg', gap: 'space.md', cardPad: 'space.sm', cardGap: 'space.xs' },
};

/** Art shape. Mobile gets a squatter ratio — phones are short in landscape. */
const ART_ASPECT = {
  square: { base: 1, mobile: 2 },
  portrait: { base: 0.78, mobile: 1.6 },
  wide: { base: 1.6, mobile: 2.6 },
};

const PANEL_WIDTH = { base: 0.52, tablet: 0.74, mobile: 0.86 };

const chunk = (arr, n) => Array.from(
  { length: Math.ceil(arr.length / n) },
  (_, i) => arr.slice(i * n, i * n + n),
);

/* --------------------------------------------------------------- fragments */

function currencyChip(chip) {
  return {
    class: 'Frame',
    name: `Chip_${chip.label}`,
    // Preferred width, allowed to shrink. Fixed-width chips overflow the header
    // on phones, because Roblox offsets are absolute px at every resolution.
    flex: '0 1 170px',
    size: { s: [null, 1], o: [null, null] },
    bg: 'surface.overlay',
    corner: 'radius.pill',
    stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
    padding: { top: 'space.xs', bottom: 'space.xs', left: 'space.md', right: 'space.md' },
    layout: { dir: 'horizontal', gap: 'space.sm', align: 'center', justify: 'start' },
    children: [
      {
        class: 'ImageLabel',
        name: 'Icon',
        size: { s: [null, null], o: [22, 22] },
        flex: '0 0 auto',
        image: { placeholder: chip.icon ?? chip.label.toLowerCase() },
        corner: 'radius.sm',
      },
      {
        class: 'TextLabel',
        name: 'Value',
        text: chip.value,
        type: 'numeric',
        color: 'content.primary',
        flex: '1 1 auto',
        align: 'start',
      },
    ],
  };
}

/** Corner tag over the art — "BEST VALUE", "NEW", "x2". */
function cardBadge(text, style) {
  if (!text || style === 'none') return null;
  return {
    class: 'Frame',
    name: 'Badge',
    // Absolute, so it overlays the art rather than consuming a layout slot.
    pos: { s: [1, 0], o: [-8, 8] },
    anchor: [1, 0],
    size: { s: [null, null], o: [70, 24] },
    bg: style === 'ribbon' ? 'accent.tertiary' : 'status.warning',
    corner: style === 'ribbon' ? 'radius.sm' : 'radius.pill',
    elevation: 1,
    zIndex: 5,
    children: [{
      class: 'TextLabel',
      name: 'BadgeText',
      text,
      type: 'caption',
      color: style === 'ribbon' ? 'onColor.tertiary' : 'onColor.warning',
      size: { s: [1, 1], o: [null, null] },
      align: 'center',
    }],
  };
}

function priceControl(item, { interactive, cardGap }) {
  const common = {
    name: interactive ? 'BuyButton' : 'PricePill',
    bg: 'accent.primary',
    corner: 'radius.pill',
    gradient: 'accentSheen',
    elevation: 1,
    flex: '0 0 auto',
    // An interactive pill must clear the audience-derived touch target; a
    // passive label has no such floor.
    size: { s: [1, null], o: [null, interactive ? 'sizing.minTouchTarget' : 34] },
  };

  if (interactive) {
    return { ...common, ...PRESSABLE, class: 'TextButton', text: item.price, type: 'numeric', color: 'onColor.primary', align: 'center' };
  }
  return {
    ...common,
    class: 'Frame',
    layout: { dir: 'horizontal', gap: 'space.xs', align: 'center', justify: 'center' },
    children: [{
      class: 'TextLabel',
      name: 'Price',
      text: item.price,
      type: 'numeric',
      // Computed against the accent fill, so a light reskin flips it dark.
      color: 'onColor.primary',
      size: { s: [null, 1], o: [null, null] },
      flex: '0 0 auto',
    }],
  };
}

function itemCard(item, opts) {
  const { artPlacement, aspect, cardPad, cardGap, badgeStyle, interactive } = opts;

  const art = {
    class: 'ImageLabel',
    name: 'Art',
    flex: '0 0 auto',
    // `subject` lets a brief describe the art directly. Inferring a subject from
    // a slug works for "egg-cosmic" and fails badly for named characters.
    image: { placeholder: item.art, ...(item.artPrompt ? { subject: item.artPrompt } : {}) },
    corner: 'radius.md',
    children: [cardBadge(item.badge, badgeStyle)].filter(Boolean),
    ...(artPlacement === 'beside'
      ? { size: { s: [null, 1], o: [72, null] }, aspect: null }
      : { size: { s: [1, null], o: [null, null] }, aspect: aspect.base, at: { mobile: { aspect: aspect.mobile } } }),
  };

  const name = {
    class: 'TextLabel',
    name: 'Name',
    text: item.name,
    type: 'label',
    color: 'content.primary',
    size: { s: [1, null], o: [null, 26] },
    flex: '0 0 auto',
    align: artPlacement === 'beside' ? 'start' : 'center',
  };

  const price = priceControl(item, { interactive, cardGap });

  const shell = {
    class: 'Frame',
    name: `Item_${String(item.name).replace(/\s+/g, '')}`,
    flex: '1 1 0',
    bg: 'surface.sunken',
    corner: 'radius.lg',
    stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
    padding: cardPad,
  };

  if (artPlacement === 'beside') {
    // Art | label | action — a list row. The action is a fixed-width chip on
    // the right; stacking it under the label made a full-width bar that read as
    // the row's primary content rather than its control.
    return {
      ...shell,
      size: { s: [1, null], o: [null, 96] },
      layout: { dir: 'horizontal', gap: cardGap, align: 'center', justify: 'start' },
      children: [
        art,
        {
          class: 'Frame',
          name: 'Text',
          flex: '1 1 0',
          size: { s: [null, 1], o: [null, null] },
          layout: { dir: 'vertical', gap: 'space.xs', align: 'stretch', justify: 'center' },
          children: [name],
        },
        {
          ...price,
          flex: '0 0 auto',
          size: { s: [null, null], o: [150, interactive ? 'sizing.minTouchTarget' : 36] },
        },
      ],
    };
  }

  return {
    ...shell,
    layout: { dir: 'vertical', gap: cardGap, align: 'stretch', justify: 'start' },
    children: [art, name, price],
  };
}

/* ----------------------------------------------------------------- header */

function buildHeader(content, style, gap) {
  const title = {
    class: 'TextLabel',
    name: 'Title',
    text: content.title,
    type: 'heading',
    color: 'content.primary',
    flex: '1 1 auto',
    align: 'start',
  };

  const chips = (content.chips ?? []).map(currencyChip);

  const close = content.dismissible ? [{
    class: 'TextButton',
    name: 'CloseButton',
    // Sized by the audience-derived touch target, never a literal.
    size: { s: [null, null], o: ['sizing.minTouchTarget', 'sizing.minTouchTarget'] },
    flex: '0 0 auto',
    ...PRESSABLE,
    // Neutral, not status.danger. Dismissing a panel is not a destructive act,
    // and a saturated red here outweighs the screen's actual primary action —
    // the critic flagged it independently on every screen it reviewed.
    bg: 'surface.raised',
    stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
    corner: 'radius.md',
    elevation: 1,
    text: '✕',
    type: 'title',
    color: 'content.secondary',
    align: 'center',
    states: {
      ...PRESSABLE.states,
      // Red belongs on the hover, where it confirms intent instead of competing.
      hover: { scale: 1.03, bg: 'status.danger', color: 'onColor.danger' },
    },
  }] : [];

  const bar = (name, children) => ({
    class: 'Frame',
    name,
    // Must clear the touch target, or the close button overflows it.
    size: { s: [1, null], o: [null, 'sizing.minTouchTarget'] },
    flex: '0 0 auto',
    layout: { dir: 'horizontal', gap: 'space.md', align: 'center', justify: 'between' },
    children,
  });

  const currencyRow = chips.length ? [{
    class: 'Frame',
    name: 'CurrencyBar',
    size: { s: [1, null], o: [null, 40] },
    flex: '0 0 auto',
    layout: { dir: 'horizontal', gap: 'space.md', align: 'stretch', justify: 'start' },
    children: chips,
  }] : [];

  if (style === 'banner') {
    // Title sits in a filled accent strip; currency drops to its own row.
    return [
      {
        ...bar('Banner', [{ ...title, color: 'onColor.primary' }, ...close]),
        bg: 'accent.primary',
        corner: 'radius.md',
        gradient: 'accentSheen',
        elevation: 2,
        // No vertical padding: the banner is exactly one touch target tall, so
        // any inset would squeeze the close button out of its content box.
        padding: { left: 'space.md', right: 'space.xs' },
      },
      ...currencyRow,
    ];
  }

  if (style === 'stack') {
    // Title alone, then a currency row. Calmer, and room for long titles.
    return [bar('Header', [title, ...close]), ...currencyRow];
  }

  // 'plain' — one strip: title, currency, dismiss.
  return [bar('Header', [title, ...chips, ...close])];
}

/* ---------------------------------------------------------------- pattern */

export function modalGrid(brief) {
  const v = brief.variant ?? {};
  // Slot hosts are only emitted when filled — an empty one would still consume
  // a gap from the panel's layout and show as an unexplained band of space.
  const slotHost = (name) => (brief.slots?.[name]?.length ? [{
    class: 'Frame',
    name: `Slot_${name}`,
    size: { s: [1, null], o: [null, null], auto: 'y' },
    flex: '0 0 auto',
    layout: { dir: 'vertical', gap: 'space.sm', align: 'stretch', justify: 'start' },
  }] : []);
  const orn = brief.ornament ?? {};
  const c = brief.content ?? {};

  const density = DENSITY[v.density ?? 'comfortable'];
  const aspect = ART_ASPECT[v.cardAspect ?? 'square'];
  const columns = Math.max(1, Math.min(4, v.columns ?? 3));
  const artPlacement = v.artPlacement ?? 'above';
  const interactive = v.ctaPlacement === 'per-item';

  const items = c.items ?? [];
  const rows = chunk(items, columns).map((row, rowIndex) => {
    const cards = row.map((item) => itemCard(item, {
      artPlacement,
      aspect,
      cardPad: density.cardPad,
      cardGap: density.cardGap,
      badgeStyle: orn.cardBadge ?? 'none',
      interactive,
    }));
    // Pad short rows so cards keep their column width instead of stretching.
    while (cards.length < columns) {
      cards.push({ class: 'Frame', name: `Spacer_${rowIndex}_${cards.length}`, flex: '1 1 0' });
    }
    return {
      class: 'Frame',
      name: `Row_${rowIndex}`,
      size: { s: [1, null], o: [null, null] },
      flex: '0 0 auto',
      layout: { dir: 'horizontal', gap: density.gap, align: 'stretch', justify: 'start' },
      children: cards,
    };
  });

  // Rows live in a height-capped scroll region. Without this the panel is
  // content-driven without limit, so a six-item inventory grows taller than a
  // landscape phone. The cap is in absolute px because Roblox offsets are, and
  // a percentage would resolve against the panel's own automatic height.
  const grid = {
    class: 'ScrollingFrame',
    name: 'Grid',
    size: { s: [1, null], o: [null, null] },
    // Shrinks under pressure, but sizes to content when there's room — so a
    // two-item panel still hugs instead of reserving the full cap.
    flex: '0 1 auto',
    maxSize: { s: [null, null], o: [null, 470] },
    at: {
      tablet: { maxSize: { s: [null, null], o: [null, 430] } },
      mobile: { maxSize: { s: [null, null], o: [null, 196] } },
    },
    scroll: 'y',
    layout: { dir: 'vertical', gap: density.gap, align: 'stretch', justify: 'start' },
    children: rows,
  };

  const trim = orn.panelTrim === 'top-accent' ? [{
    class: 'Frame',
    name: 'Trim',
    size: { s: [1, null], o: [null, 6] },
    flex: '0 0 auto',
    bg: 'accent.secondary',
    corner: 'radius.pill',
  }] : [];

  const footerCta = (!interactive && c.cta) ? [{
    ...PRESSABLE,
    class: 'TextButton',
    name: 'PrimaryCta',
    size: { s: [1, null], o: [null, 56] },
    flex: '0 0 auto',
    bg: c.cta.emphasis === 'secondary' ? 'surface.raised' : 'accent.secondary',
    corner: 'radius.pill',
    gradient: 'accentSheen',
    elevation: 3,
    text: c.cta.label,
    type: 'title',
    color: c.cta.emphasis === 'secondary' ? 'content.primary' : 'onColor.secondary',
    align: 'center',
  }] : [];

  return {
    name: brief.screen ? `${brief.screen}-${v.headerStyle ?? 'plain'}` : 'ModalGrid',
    screen: brief.screen,
    focus: 'Panel',
    root: {
      class: 'Frame',
      name: 'Backdrop',
      size: { s: [1, 1], o: [0, 0] },
      pos: { s: [0, 0], o: [0, 0] },
      bg: 'surface.overlay',
      bgTransparency: 0.45,
      children: [{
        class: 'Frame',
        name: 'Panel',
        // AutomaticSize.Y — hugs content instead of stretching children to fill
        // an arbitrary height.
        size: { s: [PANEL_WIDTH.base, null], o: [null, null], auto: 'y' },
        // A half-width panel is right on a monitor and unusable on a phone.
        at: {
          tablet: { size: { s: [PANEL_WIDTH.tablet, null], o: [null, null], auto: 'y' } },
          mobile: { size: { s: [PANEL_WIDTH.mobile, null], o: [null, null], auto: 'y' }, padding: 'space.lg' },
        },
        pos: { s: [0.5, 0.5], o: [0, 0] },
        anchor: [0.5, 0.5],
        bg: 'surface.base',
        corner: 'radius.xl',
        stroke: { color: 'border.strong', thickness: 'stroke.base' },
        gradient: 'surfaceSheen',
        elevation: 4,
        padding: density.pad,
        // Panels appear on demand; a hard cut reads as a glitch.
        motion: { enter: 'pop', duration: 0.26, easing: 'back' },
        layout: { dir: 'vertical', gap: density.gap, align: 'stretch', justify: 'start' },
        children: [
          ...trim,
          ...buildHeader(c, v.headerStyle ?? 'plain', density.gap),
          ...slotHost('panelTop'),
          grid,
          ...slotHost('panelBottom'),
          ...footerCta,
        ],
      }],
    },
  };
}

/** Declares this pattern's parameter space, so briefs can be validated. */
export const meta = {
  id: 'modal-grid',
  summary: 'Centred dismissible panel over a scrim holding a grid of selectable items.',
  variant: {
    columns: [1, 2, 3, 4],
    artPlacement: ['above', 'beside'],
    cardAspect: ['square', 'portrait', 'wide'],
    headerStyle: ['plain', 'banner', 'stack'],
    density: ['comfortable', 'compact'],
    ctaPlacement: ['footer', 'per-item'],
  },
  ornament: {
    cardBadge: ['none', 'ribbon', 'pill'],
    panelTrim: ['none', 'top-accent'],
  },
  /** Sanctioned insertion points for custom structure. */
  slots: ['panelTop', 'panelBottom'],
  /**
   * Stable node names an override can target. Content-derived names are
   * globbable: `Item_*`, `Chip_*`, `Row_*`.
   */
  nodes: [
    'Backdrop', 'Panel', 'Trim', 'Header', 'Banner', 'Title', 'CloseButton',
    'CurrencyBar', 'Chip_*', 'Icon', 'Value', 'Grid', 'Row_*', 'Item_*',
    'Art', 'Badge', 'BadgeText', 'Name', 'PricePill', 'Price', 'BuyButton',
    'Text', 'PrimaryCta',
  ],
  /**
   * Content contract. These rules used to live in the compiler, which meant the
   * compiler required a title and priced items of *every* pattern — so no second
   * pattern could ever validate. Each pattern now declares its own shape.
   */
  validateContent(c) {
    const problems = [];
    if (!c.title) problems.push('content.title is required');
    if (!Array.isArray(c.items) || c.items.length === 0) {
      problems.push('content.items must be a non-empty array');
    }
    (c.items ?? []).forEach((item, i) => {
      if (!item.name) problems.push(`content.items[${i}].name is required`);
      if (!item.price) problems.push(`content.items[${i}].price is required`);
      if (!item.art) problems.push(`content.items[${i}].art is required (placeholder key until art exists)`);
    });
    return problems;
  },
};
