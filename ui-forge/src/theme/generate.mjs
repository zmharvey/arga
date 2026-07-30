/**
 * Game context -> design tokens.
 *
 * This is the constraint layer. Components may ONLY reference tokens produced
 * here; a literal color or a raw pixel value in a spec is a lint error. That
 * restriction is the single biggest lever on whether output reads as one
 * designed system or as a pile of independently-guessed rectangles.
 */

import { ARCHETYPES, FONT_STACKS, resolveArchetype } from './palettes.mjs';
import { pickReadable } from '../color.mjs';

/** Modular scale for spacing, in px @ 1080p reference height. */
const SPACE_STEPS = { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, '3xl': 48 };

/** Base radii, multiplied by the archetype's radiusScale. */
const RADIUS_STEPS = { none: 0, sm: 4, md: 8, lg: 12, xl: 20, pill: 999 };

/** Type ramp. Roblox TextSize is px at the reference resolution. */
const TYPE_STEPS = {
  caption: { size: 12, role: 'body', tracking: 0 },
  body: { size: 15, role: 'body', tracking: 0 },
  label: { size: 16, role: 'display', tracking: 0.5 },
  title: { size: 22, role: 'display', tracking: 0 },
  heading: { size: 30, role: 'display', tracking: -0.5 },
  display: { size: 42, role: 'display', tracking: -1 },
  numeric: { size: 20, role: 'numeric', tracking: 0 },
};

/**
 * Elevation is modelled explicitly because Roblox has no box-shadow.
 * Each level declares the 9-slice shadow layer the Luau emitter must build,
 * AND the calibrated CSS the preview may use. The preview is forbidden from
 * inventing depth beyond what this table sanctions — otherwise the critic
 * approves a look the engine cannot reproduce.
 */
const ELEVATION = {
  0: { spread: 0, alpha: 0, offsetY: 0 },
  1: { spread: 6, alpha: 0.18, offsetY: 2 },
  2: { spread: 12, alpha: 0.24, offsetY: 4 },
  3: { spread: 22, alpha: 0.32, offsetY: 8 },
  4: { spread: 38, alpha: 0.4, offsetY: 14 },
};

/** Minimum touch target in px. Mobile-heavy games need bigger hit areas. */
function touchTargetFor(platformMix = {}) {
  const mobile = Number(platformMix.mobile ?? 0);
  if (mobile >= 0.5) return 48;
  if (mobile >= 0.25) return 40;
  return 32;
}

/** Younger audiences get a larger type floor for legibility. */
function typeScaleFor(ageBand = '') {
  const lower = Number(String(ageBand).split('-')[0]);
  if (Number.isFinite(lower) && lower <= 9) return 1.15;
  if (Number.isFinite(lower) && lower <= 13) return 1.06;
  return 1.0;
}

/** Set a dotted path on a nested object, creating nothing that doesn't exist. */
function deepSet(obj, path, value) {
  const segs = path.split('.');
  let cur = obj;
  for (let i = 0; i < segs.length - 1; i++) {
    if (cur[segs[i]] === undefined || typeof cur[segs[i]] !== 'object') {
      throw new Error(`Token override targets unknown path "${path}" (no "${segs[i]}")`);
    }
    cur = cur[segs[i]];
  }
  const last = segs[segs.length - 1];
  if (!(last in cur)) throw new Error(`Token override targets unknown token "${path}"`);
  cur[last] = value;
}

function scaleObject(steps, factor, { round = true } = {}) {
  return Object.fromEntries(
    Object.entries(steps).map(([k, v]) => {
      if (v >= 999) return [k, v]; // pill stays pill
      const scaled = v * factor;
      return [k, round ? Math.round(scaled) : scaled];
    }),
  );
}

/**
 * @param {object} ctx - parsed game-context.json
 * @returns {object} theme token tree
 */
export function generateTheme(ctx) {
  const art = ctx.artDirection ?? {};
  const archetypeKey = resolveArchetype({ vibe: art.vibe, genre: ctx.genre });
  const arch = ARCHETYPES[archetypeKey];
  const fonts = FONT_STACKS[arch.fontStack];

  const typeFactor = typeScaleFor(ctx.audience?.ageBand);
  const minTouch = touchTargetFor(ctx.audience?.platformMix);

  const typography = Object.fromEntries(
    Object.entries(TYPE_STEPS).map(([k, v]) => [
      k,
      {
        size: Math.round(v.size * typeFactor),
        tracking: v.tracking,
        font: fonts[v.role].roblox,
        webFont: fonts[v.role].web,
        weight: fonts[v.role].weight,
      },
    ]),
  );

  const theme = {
    meta: {
      archetype: archetypeKey,
      archetypeLabel: arch.label,
      sourceTitle: ctx.title ?? 'Untitled',
      genre: ctx.genre ?? 'unknown',
      juice: arch.juice,
      // Reference resolution all offset values are authored against.
      referenceViewport: { width: 1920, height: 1080 },
    },

    color: {
      surface: { ...arch.surface },
      content: { ...arch.content },
      accent: { ...arch.accent },
      status: { ...arch.status },
      border: { ...arch.border },
      // Filled in after overrides — see below.
      onColor: {},
    },

    space: SPACE_STEPS,
    radius: scaleObject(RADIUS_STEPS, arch.radiusScale),
    stroke: { ...arch.strokeWeight },
    type: typography,
    elevation: ELEVATION,

    gradient: {
      // Subtle top-light on raised surfaces reads as material without faking
      // a shadow. Strength is archetype-driven so dark-tech stays flat-ish
      // while cartoon-vibrant gets a real sheen.
      strength: arch.gradientStrength,
      surfaceSheen: { rotation: 90, strength: arch.gradientStrength },
      accentSheen: { rotation: 90, strength: arch.gradientStrength * 1.4 },
    },

    sizing: {
      minTouchTarget: minTouch,
      // Panels are authored in scale so they adapt; these are sane maxima.
      panelMaxWidth: 720,
      iconSm: Math.round(minTouch * 0.5),
      iconMd: Math.round(minTouch * 0.7),
      iconLg: minTouch,
    },
  };

  // Per-game token overrides. This is how an arbitrary request ("make it hot
  // pink", "sharper corners") enters the system: by changing a token, never by
  // putting a literal in a spec. Specs stay literal-free, so reskin keeps
  // working, and deepSet throws on unknown paths so a typo can't silently
  // no-op.
  for (const [path, value] of Object.entries(ctx.artDirection?.tokenOverrides ?? {})) {
    deepSet(theme, path, value);
  }

  // Additive token groups, kept separate from overrides on purpose: overrides
  // throw on an unknown path so typos can't silently no-op, which means they
  // cannot introduce genuinely new tokens. A game with its own vocabulary — an
  // elemental roster, a rarity ladder — needs to add to the system, not just
  // bend it.
  for (const [group, entries] of Object.entries(ctx.artDirection?.tokens ?? {})) {
    const [root, name] = group.includes('.') ? group.split('.') : ['color', group];
    const target = root === 'color' ? theme.color : theme;
    target[name] = { ...(target[name] ?? {}), ...entries };
  }

  // Derived LAST, so an overridden accent still gets a readable foreground
  // instead of inheriting one computed against the original colour.
  theme.color.onColor = Object.fromEntries(
    Object.entries({ ...theme.color.accent, ...theme.color.status }).map(([key, fill]) => [
      key,
      pickReadable(fill, [theme.color.content.primary, theme.color.content.inverse]),
    ]),
  );

  return theme;
}

/**
 * Resolve a dotted token reference ("surface.raised", "space.lg") against a
 * theme. Throws loudly on a miss — a silent fallback would let an invented
 * color slip into output, which is exactly the failure mode tokens exist to
 * prevent.
 */
export function resolveToken(theme, ref, { group } = {}) {
  if (typeof ref === 'number') return ref; // raw numbers allowed for e.g. thickness
  if (typeof ref !== 'string') {
    throw new TypeError(`Token ref must be a string or number, got ${typeof ref}`);
  }

  const path = group && !ref.includes('.') ? `${group}.${ref}` : ref;
  const segments = path.split('.');

  // Colors live one level deeper than their ref implies ("surface.raised" ->
  // color.surface.raised), so try the color namespace first.
  const roots = [theme.color, theme];
  for (const root of roots) {
    let cur = root;
    let ok = true;
    for (const seg of segments) {
      if (cur && typeof cur === 'object' && seg in cur) cur = cur[seg];
      else { ok = false; break; }
    }
    if (ok && cur !== undefined && typeof cur !== 'object') return cur;
    if (ok && cur !== undefined && typeof cur === 'object') return cur;
  }

  throw new Error(`Unknown token "${path}". Tokens are the only legal source of style values.`);
}
