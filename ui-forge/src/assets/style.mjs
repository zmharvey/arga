/**
 * Art direction contract.
 *
 * The tokens system exists because letting a generator choose colours per screen
 * produces incoherence. Generating art per asset has the identical failure mode,
 * one layer down: six independently-prompted icons come back with six different
 * lighting setups, outline weights and perspectives, and the set reads as
 * clip-art rather than as one game.
 *
 * So every prompt inherits a single style contract keyed off the same archetype
 * that drives the theme. Only the SUBJECT varies per asset.
 */

/**
 * Per-archetype art direction. Deliberately written as prompt-ready phrases
 * rather than adjectives — image models respond to concrete rendering
 * instructions ("thick dark outline", "rim light from upper left") far more
 * reliably than to mood words.
 */
export const ART_STYLES = {
  'cartoon-vibrant': {
    medium: 'stylized 3D render, smooth glossy toy-like surfaces, subsurface glow',
    outline: 'thick dark navy outline around the silhouette',
    lighting: 'soft key light from upper left, strong cyan rim light on the right edge',
    detail: 'chunky simplified forms, exaggerated proportions, few large shapes',
    perspective: 'three-quarter view, slightly above eye level',
    finish: 'high gloss with a bright specular highlight',
    negative: 'photorealism, gritty texture, muted desaturated colors, harsh shadows, text, letters, watermark, drop shadow, background scenery',
  },
  'clean-modern': {
    medium: 'flat vector illustration with subtle gradient fills',
    outline: 'no outline, shapes separated by value alone',
    lighting: 'even diffuse light, no strong directional source',
    detail: 'geometric, restrained, minimal internal detail',
    perspective: 'flat front-on or simple isometric',
    finish: 'matte, soft long shadows within the shape only',
    negative: 'skeuomorphism, heavy texture, photorealism, busy detail, text, letters, watermark',
  },
  'dark-tech': {
    medium: 'sharp sci-fi 3D render, brushed metal and matte polymer',
    outline: 'thin emissive edge highlight',
    lighting: 'dark ambient with strong neon accent lighting and volumetric glow',
    detail: 'panel lines, greebles, fine mechanical detail',
    perspective: 'three-quarter view, dramatic low angle',
    finish: 'semi-matte with emissive strips',
    negative: 'cartoon, pastel, soft rounded toy shapes, daylight, text, letters, watermark',
  },
  'horror-grim': {
    medium: 'desaturated painterly render with visible grain',
    outline: 'no outline, forms emerging from shadow',
    lighting: 'single harsh raking light, deep falloff into black',
    detail: 'weathered, decayed surfaces, asymmetric wear',
    perspective: 'straight-on, unsettlingly centered',
    finish: 'matte, dusty, slightly damp',
    negative: 'bright saturated color, cheerful, glossy, cartoon, clean surfaces, text, letters, watermark',
  },
  'fantasy-ornate': {
    medium: 'hand-painted fantasy game icon, oil-painted surfaces',
    outline: 'dark warm brown outline with gold inner rim',
    lighting: 'warm candlelight from lower left, cool fill from above',
    detail: 'ornate filigree, engraved metal, gemstone insets',
    perspective: 'three-quarter heraldic view',
    finish: 'burnished metal with warm specular',
    negative: 'sci-fi, neon, flat vector, minimalism, modern objects, text, letters, watermark',
  },
  'premium-gloss': {
    medium: 'premium stylized 3D character render, polished glass and liquid metal surfaces, volumetric elemental energy',
    outline: 'no outline — forms defined by a bright luminous rim light instead',
    // "Brightly lit" is load-bearing: these sit on near-black panels, and a
    // moody render disappears into the surface behind it.
    lighting: 'bright three-point studio lighting on a clearly lit subject, strong specular highlights, coloured rim light matching the element, high key so the figure reads clearly against a very dark interface',
    // "Contained" is load-bearing too: unconstrained effects sprawl to the frame
    // edges and destroy the compact silhouette a grid of cards needs.
    detail: 'high fidelity, clean readable silhouette, energy effects held tight against the figure and never spreading into the surrounding frame',
    perspective: 'three-quarter hero pose, slight low angle, confident stance',
    finish: 'high gloss, wet-look speculars, crisp clean edges, subtle bloom only on small emissive details',
    negative: 'flat vector, cartoon black outline, matte, muted, dark murky rendering, painterly brush texture, large effects filling the frame, glowing haze behind the subject, chibi proportions, low detail, text, letters, watermark, background scenery',
  },

  'minimal-soft': {
    medium: 'soft 3D clay render, matte putty-like material',
    outline: 'no outline, gentle ambient occlusion at contact points',
    lighting: 'large soft overhead light, very soft shadows',
    detail: 'rounded, tactile, pared back to essential forms',
    perspective: 'three-quarter view, eye level',
    finish: 'matte clay, no specular highlight',
    negative: 'harsh contrast, neon, gritty, photorealism, sharp edges, text, letters, watermark',
  },
};

/**
 * Framing rules per asset role. Getting these wrong is what makes a generated
 * icon set look misaligned even when every individual image is good: subjects
 * at different scales inside their frames read as jittery once tiled in a grid.
 */
export const ROLE_FRAMING = {
  icon: {
    // Icons are displayed at ~22-32px. A detailed 1024px render downscaled that
    // far becomes an unreadable smudge, so icons must be authored as bold
    // simplified silhouettes rather than shrunk-down hero art.
    framing: 'single centered object with a bold simple silhouette readable at very small size, few large shapes, strong internal contrast, no fine detail or thin lines, filling roughly 80% of the frame with generous even margin',
    canvas: 512,
    alpha: true,
  },
  item: {
    framing: 'single hero object centered, filling roughly 85% of the frame, consistent margin',
    canvas: 1024,
    alpha: true,
  },
  decor: {
    framing: 'single decorative element centered, filling the frame edge to edge',
    canvas: 1024,
    alpha: true,
  },
  portrait: {
    framing: 'single character centered with a compact silhouette, cropped at mid-thigh, occupying roughly 75% of the frame height with clear empty margin on all four sides',
    canvas: 1024,
    alpha: true,
  },
};

/**
 * Build the style contract for a game. Palette comes from the generated theme,
 * so art and UI are literally drawing from the same colours rather than
 * coincidentally near each other.
 *
 * @param {object} theme generated theme
 * @param {object} ctx   game context
 */
export function styleContract(theme, ctx) {
  const key = theme.meta.archetype;
  const style = ART_STYLES[key];
  if (!style) throw new Error(`No art style defined for archetype "${key}"`);

  const c = theme.color;
  return {
    archetype: key,
    ...style,
    palette: {
      // Named so a prompt can reference roles, not just hexes.
      dominant: c.surface.raised,
      shadow: c.surface.sunken,
      highlight: c.accent.primary,
      secondary: c.accent.secondary,
      pop: c.accent.tertiary,
    },
    // Free-text steer from the game context, appended last so a human note can
    // nudge without rewriting the contract.
    note: ctx.artDirection?.referenceNote ?? '',
    mood: (ctx.artDirection?.mood ?? []).join(', '),
  };
}
