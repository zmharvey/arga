/**
 * The coverage model — what "nailed down" means, in code.
 *
 * Stage 0 exists to guarantee a fixed set of things are known before the concept
 * fans out into per-section work. That guarantee has to live somewhere executable,
 * or it degrades into "the model usually asks about most of it".
 *
 * So each dimension declares its own resolution test. Three consumers read this
 * one list: the intake pass (what did the input already cover), the question
 * generator (ask about exactly the gaps, nothing else), and the compile gate
 * (refuse to emit while a required dimension is unresolved).
 *
 * REQUIRED dimensions block compilation. SUPPORTING dimensions are flagged when
 * absent but never block — they have defensible defaults derivable from the
 * required set, and blocking on them would turn a real gap into busywork.
 */

import { EXPECTED, allowed, GENRES, PLAYER_MODES, PLAYER_STRUCTURES, LOOP_VERBS,
  MECHANIC_KINDS, MECHANIC_ROLES, FEATURE_DIMENSIONS, OBJECTIVE_SCOPES,
  AGE_BANDS, MOTIVATIONS, PURPOSE_KINDS, REFERENCE_RELATIONSHIPS, VIBES } from './vocab.mjs';

const arr = (v) => (Array.isArray(v) ? v : []);
const has = (v) => typeof v === 'string' && v.trim().length > 0;

/**
 * Each dimension: how it is asked about, and when it is satisfied.
 *
 * `gaps` returns specific complaints rather than a boolean, because "mechanics is
 * absent" and "mechanics has four entries but none marked core" need different
 * follow-up questions, and a boolean cannot tell them apart.
 */
export const DIMENSIONS = [
  {
    id: 'purpose',
    label: 'Purpose',
    tier: 'required',
    asks: 'Why this game exists, what success would look like, and what makes it worth choosing over the game it resembles.',
    gaps: (c) => {
      const p = c.purpose ?? {};
      const g = [];
      if (!allowed(p.kind, PURPOSE_KINDS)) g.push('no purpose kind — is this for revenue, a trend, a reskin, a passion project?');
      if (!has(p.statement)) g.push('no purpose statement');
      if (!has(p.successMetric)) g.push('no definition of success — what number or outcome would mean this worked?');
      if (!has(p.differentiator)) g.push('no differentiator — why would a player pick this over the games it resembles?');
      return g;
    },
  },
  {
    id: 'players',
    label: 'Players',
    tier: 'required',
    asks: 'Single-player, co-op or multiplayer; how the server is shaped; how many players share one.',
    gaps: (c) => {
      const p = c.players ?? {};
      const g = [];
      if (!allowed(p.mode, PLAYER_MODES)) g.push('no player mode — single-player, co-op, multiplayer or mixed?');
      if (!allowed(p.structure, PLAYER_STRUCTURES)) g.push('no server structure');
      if (!Number.isFinite(p.serverSize) || p.serverSize < 1) g.push('no server size');
      // A stated mode that its structure contradicts is worse than an absent one:
      // it reads as decided when it is not, so downstream never asks again.
      if (p.mode === 'single-player' && ['pvp-ffa', 'pvp-team', 'mmo-persistent', 'co-op-team'].includes(p.structure)) {
        g.push(`mode "single-player" contradicts structure "${p.structure}"`);
      }
      if (p.mode === 'single-player' && Number(p.serverSize) > 1) {
        g.push(`mode "single-player" but server size is ${p.serverSize}`);
      }
      return g;
    },
  },
  {
    id: 'genre',
    label: 'Genre',
    tier: 'required',
    asks: 'The genre as Roblox players would name it, plus the progression shape it implies.',
    gaps: (c) => {
      const gr = c.genre ?? {};
      const g = [];
      if (!allowed(gr.primary, GENRES)) g.push('no primary genre');
      if (!arr(gr.progression).length) g.push('no progression shape');
      return g;
    },
  },
  {
    id: 'coreLoop',
    label: 'Core loop',
    tier: 'required',
    asks: 'The repeating sequence of player actions, what each step produces, and how long one lap takes.',
    gaps: (c) => {
      const l = c.coreLoop ?? {};
      const steps = arr(l.steps);
      const g = [];
      if (steps.length < EXPECTED.loopSteps) {
        g.push(`core loop has ${steps.length} step(s) — a loop needs at least ${EXPECTED.loopSteps}`);
      }
      const badVerbs = steps.filter((s) => !allowed(s.verb, LOOP_VERBS));
      if (badVerbs.length) g.push(`${badVerbs.length} loop step(s) have no recognised verb`);
      if (steps.some((s) => !has(s.produces))) g.push('some loop steps do not say what they produce');
      if (!has(l.hook)) g.push('no hook — what makes the player start the next lap instead of stopping?');
      if (!Number.isFinite(l.lapSeconds) || l.lapSeconds <= 0) g.push('no lap length');
      // A sequence where nothing feeds the first step again is a funnel, not a
      // loop, and it is the single most common defect in a stated "core loop".
      if (steps.length >= EXPECTED.loopSteps && !has(l.closes)) {
        g.push('nothing states how the last step feeds back into the first — that is what makes it a loop');
      }
      return g;
    },
  },
  {
    id: 'mechanics',
    label: 'Mechanics',
    tier: 'required',
    asks: 'The systems that make the loop work, each with a kind and a role.',
    gaps: (c) => {
      const m = arr(c.mechanics);
      const g = [];
      if (m.length < EXPECTED.mechanics) g.push(`only ${m.length} mechanic(s) — expected at least ${EXPECTED.mechanics}`);
      if (m.some((x) => !allowed(x.kind, MECHANIC_KINDS))) g.push('some mechanics have no recognised kind');
      if (m.some((x) => !allowed(x.role, MECHANIC_ROLES))) g.push('some mechanics have no role');
      if (m.filter((x) => x.role === 'core').length < EXPECTED.coreMechanics) {
        g.push('no mechanic is marked "core" — the loop must depend on something');
      }
      if (m.some((x) => !has(x.description))) g.push('some mechanics are named but not described');
      return g;
    },
  },
  {
    id: 'features',
    label: 'Features',
    tier: 'required',
    asks: 'Player-facing systems, each tagged with what it is for and how early it ships.',
    gaps: (c) => {
      const f = arr(c.features);
      const g = [];
      if (f.length < EXPECTED.features) g.push(`only ${f.length} feature(s) — expected at least ${EXPECTED.features}`);
      if (f.some((x) => !allowed(x.dimension, FEATURE_DIMENSIONS))) g.push('some features have no dimension');
      if (f.some((x) => !Number.isFinite(x.priority))) g.push('some features have no priority');
      if (!f.some((x) => x.dimension === 'core-loop')) g.push('no feature serves the core loop');
      if (!f.some((x) => x.priority === 1)) g.push('nothing is priority 1 — what ships first?');
      return g;
    },
  },
  {
    id: 'objectives',
    label: 'Objectives',
    tier: 'required',
    asks: 'What the player is trying to achieve, across a moment, a session and the long run.',
    gaps: (c) => {
      const o = arr(c.objectives);
      const g = [];
      if (o.length < EXPECTED.objectives) g.push(`only ${o.length} objective(s) — expected at least ${EXPECTED.objectives}`);
      if (o.some((x) => !allowed(x.scope, OBJECTIVE_SCOPES))) g.push('some objectives have no scope');
      // Session and long-term are the two that decide retention, and a concept
      // that only states one of them has a known shape of problem: either a
      // grind with no destination, or a destination with no reason to log in.
      if (!o.some((x) => x.scope === 'session')) g.push('no session-scope objective — what makes one sitting feel complete?');
      if (!o.some((x) => ['long-term', 'mastery'].includes(x.scope))) g.push('no long-term objective — what is the weeks-long ambition?');
      if (o.some((x) => !has(x.measurable))) g.push('some objectives are not measurable');
      return g;
    },
  },
  {
    id: 'audience',
    label: 'Audience',
    tier: 'required',
    asks: 'Who plays this — age band, prior experience, device mix, session length, and what they want from it.',
    gaps: (c) => {
      const a = c.audience ?? {};
      const g = [];
      if (!allowed(a.ageBand, AGE_BANDS)) g.push('no age band');
      const mix = a.platformMix ?? {};
      const total = ['mobile', 'desktop', 'console'].reduce((n, k) => n + Number(mix[k] ?? 0), 0);
      if (Math.abs(total - 1) > 0.02) g.push('platform mix is absent or does not sum to 1');
      if (!Number.isFinite(a.sessionMinutes) || a.sessionMinutes <= 0) g.push('no expected session length');
      if (arr(a.motivations).length < EXPECTED.motivations) {
        g.push(`fewer than ${EXPECTED.motivations} player motivations`);
      }
      if (arr(a.motivations).some((m) => !allowed(m, MOTIVATIONS))) g.push('some motivations are not recognised');
      return g;
    },
  },
  {
    id: 'references',
    label: 'Reference games',
    tier: 'required',
    asks: 'Which existing games this is measured against, how it relates to each, and what is taken or rejected.',
    gaps: (c) => {
      const r = arr(c.references);
      const g = [];
      if (r.length < EXPECTED.references) g.push('no reference games — name at least one, even to reject it');
      if (r.some((x) => !has(x.name))) g.push('some references are unnamed');
      if (r.some((x) => !allowed(x.relationship, REFERENCE_RELATIONSHIPS))) g.push('some references have no stated relationship');
      if (r.some((x) => !arr(x.takeaways).length)) g.push('some references have no takeaways — what is actually learned from it?');
      // A reskin whose deltas are unstated is the failure this whole stage is
      // meant to catch: it compiles, and produces the reference game again.
      for (const x of r.filter((x) => x.relationship === 'reskin-base')) {
        if (!arr(x.deltas).length) g.push(`"${x.name}" is the reskin base but no deltas are stated — what actually changes?`);
      }
      return g;
    },
  },

  // --- supporting: flagged when thin, never blocking -----------------------
  {
    id: 'artDirection',
    label: 'Art direction',
    tier: 'supporting',
    asks: 'The visual language — vibe, mood, palette leanings.',
    gaps: (c) => {
      const a = c.artDirection ?? {};
      const g = [];
      if (!allowed(a.vibe, VIBES)) g.push('no vibe — one will be derived from the genre');
      if (!arr(a.mood).length) g.push('no mood words');
      if (!arr(a.paletteHints).length) g.push('no palette hints');
      return g;
    },
  },
  {
    id: 'economy',
    label: 'Economy',
    tier: 'supporting',
    asks: 'Currencies, what generates them, what consumes them, and how money enters.',
    gaps: (c) => {
      const e = c.economy ?? {};
      const g = [];
      if (!has(e.softCurrency) && !arr(c.genre?.monetization).includes('none')) g.push('no soft currency named');
      if (!arr(e.faucets).length) g.push('no faucets — where does currency come from?');
      if (!arr(e.sinks).length) g.push('no sinks — an economy with no drain inflates until numbers stop meaning anything');
      return g;
    },
  },
];

export const REQUIRED = DIMENSIONS.filter((d) => d.tier === 'required');
export const IDS = DIMENSIONS.map((d) => d.id);
export const byId = (id) => DIMENSIONS.find((d) => d.id === id);

/**
 * Map a model-returned dimension label back onto a real id.
 *
 * Asked to echo a dimension id, a model will sometimes return the whole list
 * entry it was shown — "purpose (required)" rather than "purpose". That failed the
 * intake check on every dimension at once and killed the run, which is a
 * ridiculous way to lose a research pass.
 *
 * The prompt no longer puts the tier next to the id, but a returned label is
 * untrusted either way, so it is normalised here rather than trusted there. No id
 * is a prefix of another, so prefix matching is unambiguous; a label that still
 * matches nothing returns null and is reported as unknown.
 */
export function normaliseDimension(label) {
  const raw = String(label ?? '').trim();
  if (IDS.includes(raw)) return raw;
  const prefixed = IDS.find((id) => raw.startsWith(id));
  if (prefixed) return prefixed;
  const squashed = raw.toLowerCase().replace(/[^a-z]/g, '');
  return IDS.find((id) => id.toLowerCase() === squashed) ?? null;
}

/**
 * Coverage report for a concept (complete or partial).
 *
 * @returns {{ dimension:string, label:string, tier:string, resolved:boolean, gaps:string[] }[]}
 */
export function coverage(concept) {
  return DIMENSIONS.map((d) => {
    const gaps = d.gaps(concept ?? {});
    return { dimension: d.id, label: d.label, tier: d.tier, resolved: gaps.length === 0, gaps };
  });
}

/** The blocking subset: required dimensions that are not yet resolved. */
export function unresolvedRequired(concept) {
  return coverage(concept).filter((c) => c.tier === 'required' && !c.resolved);
}
