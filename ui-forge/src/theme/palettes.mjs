/**
 * Art-direction archetypes.
 *
 * Each archetype is a complete, internally-consistent design language — not a
 * loose pile of colors. The generator picks one from game context and derives
 * every token from it, so a screen can never mix two visual languages.
 *
 * Colors are authored as hex and converted to Color3 at emit time.
 */

/** @typedef {{ base:string, sunken:string, raised:string, overlay:string }} Surfaces */

export const ARCHETYPES = {
  'cartoon-vibrant': {
    label: 'Cartoon Vibrant',
    // Simulators, pet games, obbies. Saturated, chunky, high-contrast.
    surface: { base: '#2B1B4D', sunken: '#211239', raised: '#3A2668', overlay: '#160C28' },
    content: { primary: '#FFFFFF', secondary: '#C9B8F0', muted: '#8B7AB8', inverse: '#1A0F2E' },
    accent: { primary: '#FFC53D', secondary: '#3DD9F0', tertiary: '#FF5E9C' },
    status: { success: '#4ADE80', danger: '#FB5D5D', warning: '#FBBF24', info: '#60A5FA' },
    border: { subtle: '#4A3580', strong: '#1A0F2E' },
    // Chunky cartoon UI leans on thick dark outlines rather than soft shadows.
    strokeWeight: { hairline: 1, base: 3, heavy: 5 },
    radiusScale: 1.35,
    gradientStrength: 0.18,
    fontStack: 'display',
    juice: 'high',
  },

  'clean-modern': {
    label: 'Clean Modern',
    // Tycoons, RPGs, sims. Muted, restrained, readable.
    surface: { base: '#1C2029', sunken: '#14171E', raised: '#262B36', overlay: '#0E1015' },
    content: { primary: '#F2F4F8', secondary: '#A8B0BF', muted: '#6B7382', inverse: '#14171E' },
    accent: { primary: '#4F8DF7', secondary: '#22C7A9', tertiary: '#A78BFA' },
    status: { success: '#34D399', danger: '#F87171', warning: '#FBBF24', info: '#60A5FA' },
    border: { subtle: '#333A48', strong: '#4A5364' },
    strokeWeight: { hairline: 1, base: 1, heavy: 2 },
    radiusScale: 1.0,
    gradientStrength: 0.06,
    fontStack: 'ui',
    juice: 'low',
  },

  'dark-tech': {
    label: 'Dark Tech',
    // Sci-fi, shooters, hacker/heist. Near-black surfaces, neon accents, sharp.
    surface: { base: '#0D1117', sunken: '#06090D', raised: '#161B22', overlay: '#03050A' },
    content: { primary: '#E6EDF3', secondary: '#8B949E', muted: '#545D68', inverse: '#06090D' },
    accent: { primary: '#00E5C0', secondary: '#2F81F7', tertiary: '#F778BA' },
    status: { success: '#3FB950', danger: '#F85149', warning: '#D29922', info: '#58A6FF' },
    border: { subtle: '#21262D', strong: '#00E5C0' },
    strokeWeight: { hairline: 1, base: 1, heavy: 2 },
    radiusScale: 0.45,
    gradientStrength: 0.1,
    fontStack: 'mono-ui',
    juice: 'medium',
  },

  'horror-grim': {
    label: 'Horror Grim',
    // Survival horror, backrooms. Desaturated, low contrast, oppressive.
    surface: { base: '#17181A', sunken: '#0C0D0E', raised: '#212325', overlay: '#000000' },
    content: { primary: '#D6D3CD', secondary: '#8A857C', muted: '#57534E', inverse: '#0C0D0E' },
    accent: { primary: '#A63D3D', secondary: '#7C7768', tertiary: '#4A5D4E' },
    status: { success: '#5F7A5F', danger: '#A63D3D', warning: '#9A7B4F', info: '#5C6B7A' },
    border: { subtle: '#2A2C2E', strong: '#3D3F42' },
    strokeWeight: { hairline: 1, base: 1, heavy: 2 },
    radiusScale: 0.2,
    gradientStrength: 0.14,
    fontStack: 'serif-ui',
    juice: 'low',
  },

  'fantasy-ornate': {
    label: 'Fantasy Ornate',
    // Medieval RPG, magic. Warm parchment + gold, ornate framing.
    surface: { base: '#2E2419', sunken: '#211A12', raised: '#3D3123', overlay: '#150F0A' },
    content: { primary: '#F5E9D0', secondary: '#C4AE86', muted: '#8A7856', inverse: '#211A12' },
    accent: { primary: '#D4A34A', secondary: '#7A9E6B', tertiary: '#9B6BC4' },
    status: { success: '#7A9E6B', danger: '#B85450', warning: '#D4A34A', info: '#6B8FB0' },
    border: { subtle: '#54432E', strong: '#D4A34A' },
    strokeWeight: { hairline: 1, base: 2, heavy: 4 },
    radiusScale: 0.6,
    gradientStrength: 0.16,
    fontStack: 'serif-ui',
    juice: 'medium',
  },

  'premium-gloss': {
    label: 'Premium Gloss',
    // Gacha / hero-collector. Near-black glass, thin bright edges, heavy sheen.
    // Distinct from dark-tech: that reads mechanical and terminal-like, this
    // reads polished and expensive.
    surface: { base: '#12141C', sunken: '#0A0B11', raised: '#1B1F2B', overlay: '#05060A' },
    content: { primary: '#F5F7FC', secondary: '#A6AEC4', muted: '#69718A', inverse: '#0A0B11' },
    accent: { primary: '#7B6CFF', secondary: '#3AD8E8', tertiary: '#FF6B9D' },
    status: { success: '#3DDC97', danger: '#FF5C7A', warning: '#FFC24B', info: '#5BA8FF' },
    border: { subtle: '#262B3A', strong: '#7B6CFF' },
    // Thin strokes read as precise; thick ones read as toy-like.
    strokeWeight: { hairline: 1, base: 1, heavy: 2 },
    radiusScale: 1.1,
    // The highest sheen of any archetype — this is where "shiny" comes from.
    gradientStrength: 0.24,
    fontStack: 'ui',
    juice: 'medium',
  },

  'minimal-soft': {
    label: 'Minimal Soft',
    // Cozy, casual, social hangout. Pastel, airy, low contrast.
    surface: { base: '#FBF7F4', sunken: '#F0EAE5', raised: '#FFFFFF', overlay: '#E3DAD3' },
    content: { primary: '#3D3733', secondary: '#7A716B', muted: '#A89E97', inverse: '#FFFFFF' },
    accent: { primary: '#E8927C', secondary: '#7CB4A8', tertiary: '#B99BC7' },
    status: { success: '#7FB069', danger: '#D97D7D', warning: '#E0B060', info: '#7BA7C7' },
    border: { subtle: '#E3DAD3', strong: '#C9BDB4' },
    strokeWeight: { hairline: 1, base: 1, heavy: 2 },
    radiusScale: 1.5,
    gradientStrength: 0.04,
    fontStack: 'ui',
    juice: 'low',
  },
};

/**
 * Roblox font stacks, with the closest web equivalent for preview rendering.
 * `roblox` values are Enum.Font names valid in the engine; `web` is only ever
 * used by the HTML preview and must stay metrically close so the screenshot
 * critic isn't judging different type than the game will ship.
 */
export const FONT_STACKS = {
  ui: {
    display: { roblox: 'GothamBold', web: '"Montserrat", "Segoe UI", sans-serif', weight: 700 },
    body: { roblox: 'Gotham', web: '"Montserrat", "Segoe UI", sans-serif', weight: 500 },
    numeric: { roblox: 'GothamBlack', web: '"Montserrat", "Segoe UI", sans-serif', weight: 900 },
  },
  display: {
    display: { roblox: 'FredokaOne', web: '"Fredoka One", "Baloo 2", sans-serif', weight: 400 },
    body: { roblox: 'GothamBold', web: '"Montserrat", sans-serif', weight: 700 },
    numeric: { roblox: 'FredokaOne', web: '"Fredoka One", sans-serif', weight: 400 },
  },
  'mono-ui': {
    display: { roblox: 'Code', web: '"JetBrains Mono", Consolas, monospace', weight: 700 },
    body: { roblox: 'Gotham', web: '"Montserrat", sans-serif', weight: 500 },
    numeric: { roblox: 'Code', web: '"JetBrains Mono", Consolas, monospace', weight: 700 },
  },
  'serif-ui': {
    display: { roblox: 'Merriweather', web: '"Merriweather", Georgia, serif', weight: 700 },
    body: { roblox: 'SourceSans', web: '"Source Sans 3", "Segoe UI", sans-serif', weight: 400 },
    numeric: { roblox: 'MerriweatherBold', web: '"Merriweather", Georgia, serif', weight: 700 },
  },
};

/**
 * Map loose game-context vibe strings onto archetype keys.
 * Unknown vibes fall back to genre, then to clean-modern.
 */
// Exported so stage 0 can resolve a concept's art direction through the SAME
// table rather than keeping a second copy that drifts from this one.
export const VIBE_ALIASES = {
  cartoon: 'cartoon-vibrant', vibrant: 'cartoon-vibrant', playful: 'cartoon-vibrant',
  chunky: 'cartoon-vibrant', cute: 'minimal-soft', cozy: 'minimal-soft',
  pastel: 'minimal-soft', minimal: 'minimal-soft', clean: 'clean-modern',
  modern: 'clean-modern', sleek: 'clean-modern', scifi: 'dark-tech',
  'sci-fi': 'dark-tech', neon: 'dark-tech', cyber: 'dark-tech', tech: 'dark-tech',
  horror: 'horror-grim', scary: 'horror-grim', grim: 'horror-grim',
  fantasy: 'fantasy-ornate', medieval: 'fantasy-ornate', magic: 'fantasy-ornate',
  sleek: 'premium-gloss', shiny: 'premium-gloss', glossy: 'premium-gloss',
  premium: 'premium-gloss', gacha: 'premium-gloss', elemental: 'premium-gloss',
};

const GENRE_DEFAULTS = {
  simulator: 'cartoon-vibrant', obby: 'cartoon-vibrant', tycoon: 'clean-modern',
  rpg: 'fantasy-ornate', shooter: 'dark-tech', horror: 'horror-grim',
  social: 'minimal-soft', roleplay: 'clean-modern',
};

export function resolveArchetype({ vibe, genre } = {}) {
  const key = String(vibe ?? '').toLowerCase().trim();
  if (ARCHETYPES[key]) return key;
  for (const [alias, target] of Object.entries(VIBE_ALIASES)) {
    if (key.includes(alias)) return target;
  }
  return GENRE_DEFAULTS[String(genre ?? '').toLowerCase()] ?? 'clean-modern';
}
