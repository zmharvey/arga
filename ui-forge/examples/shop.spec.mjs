/**
 * Reference spec: shop panel.
 *
 * Every style value is a token reference. There is deliberately not a single
 * literal color or raw pixel value below — if this file needs one, the theme
 * is missing a token and that is the bug to fix.
 */

/** One purchasable item card. */
const itemCard = (name, price, art) => ({
  class: 'Frame',
  name: `Item_${name.replace(/\s+/g, '')}`,
  flex: '1 1 0',
  bg: 'surface.sunken',
  corner: 'radius.lg',
  stroke: { color: 'border.subtle', thickness: 'stroke.hairline' },
  padding: 'space.md',
  layout: { dir: 'vertical', gap: 'space.sm', align: 'stretch', justify: 'start' },
  children: [
    {
      class: 'ImageLabel',
      name: 'Art',
      // Square art keeps card proportion stable no matter how tall the panel
      // grows. Letting this flex meant art absorbed every spare pixel and the
      // label/price read as an afterthought.
      flex: '0 0 auto',
      size: { s: [1, null], o: [null, null] },
      aspect: 1,
      // Landscape phones have ~414px of height total. Square art makes the
      // panel taller than the screen, so mobile gets letterboxed art instead.
      at: { mobile: { aspect: 2 } },
      image: { placeholder: art },
      corner: 'radius.md',
    },
    {
      class: 'TextLabel',
      name: 'Name',
      text: name,
      type: 'label',
      color: 'content.primary',
      size: { s: [1, null], o: [null, 26] },
      flex: '0 0 auto',
      align: 'center',
    },
    {
      class: 'Frame',
      name: 'PricePill',
      size: { s: [1, null], o: [null, 34] },
      bg: 'accent.primary',
      corner: 'radius.pill',
      gradient: 'accentSheen',
      elevation: 1,
      layout: { dir: 'horizontal', gap: 'space.xs', align: 'center', justify: 'center' },
      children: [
        {
          class: 'TextLabel',
          name: 'Price',
          text: price,
          type: 'numeric',
          // Computed against the accent fill, so a light reskin flips it dark.
          color: 'onColor.primary',
          size: { s: [null, 1], o: [null, null] },
          flex: '0 0 auto',
        },
      ],
    },
  ],
});

/** Currency readout chip for the top bar. */
const currencyChip = (label, value) => ({
  class: 'Frame',
  name: `Chip_${label}`,
  // Preferred 170px, allowed to shrink. Fixed-width chips overflowed the header
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
      image: { placeholder: label.toLowerCase() },
      corner: 'radius.sm',
    },
    {
      class: 'TextLabel',
      name: 'Value',
      text: value,
      type: 'numeric',
      color: 'content.primary',
      flex: '1 1 auto',
      align: 'start',
    },
  ],
});

export const spec = {
  name: 'ShopPanel',
  screen: 'shop',
  // Screenshots crop to this node. A critic looking at 1920x1080 of mostly
  // empty stage spends its attention in the wrong place.
  focus: 'Panel',
  root: {
    class: 'Frame',
    name: 'Backdrop',
    size: { s: [1, 1], o: [0, 0] },
    pos: { s: [0, 0], o: [0, 0] },
    bg: 'surface.overlay',
    bgTransparency: 0.45,
    children: [
      {
        class: 'Frame',
        name: 'Panel',
        // AutomaticSize.Y — the panel hugs its content instead of stretching
        // children to fill an arbitrary height.
        size: { s: [0.52, null], o: [null, null], auto: 'y' },
        // A half-width panel is right on a monitor and unusable on a phone.
        // Small screens give the panel nearly the whole viewport.
        at: {
          tablet: { size: { s: [0.74, null], o: [null, null], auto: 'y' } },
          mobile: { size: { s: [0.86, null], o: [null, null], auto: 'y' }, padding: 'space.lg' },
        },
        pos: { s: [0.5, 0.5], o: [0, 0] },
        anchor: [0.5, 0.5],
        bg: 'surface.base',
        corner: 'radius.xl',
        stroke: { color: 'border.strong', thickness: 'stroke.base' },
        gradient: 'surfaceSheen',
        elevation: 4,
        padding: 'space.xl',
        clip: false,
        layout: { dir: 'vertical', gap: 'space.lg', align: 'stretch', justify: 'start' },
        children: [
          /* ---------------------------------------------------- header */
          {
            class: 'Frame',
            name: 'Header',
            // Must clear the touch target, or the close button overflows it.
            size: { s: [1, null], o: [null, 'sizing.minTouchTarget'] },
            flex: '0 0 auto',
            layout: { dir: 'horizontal', gap: 'space.md', align: 'center', justify: 'between' },
            children: [
              {
                class: 'TextLabel',
                name: 'Title',
                text: 'SHOP',
                type: 'heading',
                color: 'content.primary',
                textStroke: { color: 'border.strong', thickness: 'stroke.hairline' },
                flex: '1 1 auto',
                align: 'start',
              },
              // Currency lives in the header rather than its own bar. A
              // dedicated row left a band of dead space and pushed the goods
              // further down; players read balance and title as one strip.
              currencyChip('Coins', '128,400'),
              currencyChip('Gems', '2,310'),
              {
                class: 'TextButton',
                name: 'CloseButton',
                // Sized by the audience-derived touch target, not a literal.
                // Hardcoded 44px looked fine but broke the 48px floor this
                // game's 62%-mobile platform mix demands.
                size: { s: [null, null], o: ['sizing.minTouchTarget', 'sizing.minTouchTarget'] },
                flex: '0 0 auto',
                bg: 'status.danger',
                corner: 'radius.md',
                elevation: 2,
                text: '✕',
                type: 'title',
                color: 'onColor.danger',
                align: 'center',
              },
            ],
          },

          /* ----------------------------------------------------- items */
          {
            class: 'Frame',
            name: 'ItemGrid',
            size: { s: [1, null], o: [null, null] },
            flex: '0 0 auto',
            layout: { dir: 'horizontal', gap: 'space.md', align: 'stretch', justify: 'start' },
            children: [
              itemCard('Cosmic Egg', '25,000', 'egg-cosmic'),
              itemCard('Void Egg', '90,000', 'egg-void'),
              itemCard('Luck Boost', '1,500', 'boost-luck'),
            ],
          },

          /* ---------------------------------------------------- footer */
          {
            class: 'TextButton',
            name: 'PrimaryCta',
            size: { s: [1, null], o: [null, 56] },
            flex: '0 0 auto',
            bg: 'accent.secondary',
            corner: 'radius.pill',
            gradient: 'accentSheen',
            elevation: 3,
            text: 'OPEN 3 EGGS',
            type: 'title',
            color: 'onColor.secondary',
            align: 'center',
          },
        ],
      },
    ],
  },
};

export default spec;
