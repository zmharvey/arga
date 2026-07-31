/**
 * The build manifest contract.
 *
 * This is the seam between CID and the build stage, and it exists because the
 * previous seam was prose. A build agent handed 200 markdown spec sheets infers
 * constantly and silently; two agents infer differently and produce two
 * incompatible games. A build agent handed a validated table cannot.
 *
 * WHERE THIS LIST CAME FROM
 * -------------------------
 * Not from guessing at what a builder might want. Every key below is something
 * that was actually invented on the spot while hand-building the ruin loop in
 * `game/src/`, because no sheet supplied it: patch counts, tier weights, payout
 * curves, cost growth, tick rates, part footprints, and — most tellingly — the six
 * relic names, which is literally CID's job.
 *
 * So the schema is empirical. It is the answer to "what did a builder have to make
 * up", collected by being the builder once.
 *
 * OWNERSHIP
 * ---------
 * Each key has exactly one providing sheet. Two sheets providing the same key is a
 * hard error rather than a judgement call, which converts the contradiction-hunting
 * we currently pay a verifier agent ~150k tokens to do into a millisecond check.
 * A key nobody provides is reported by name, so "did CID cover everything" stops
 * being an opinion.
 */

/** @type {Record<string, {doc: string, owner: string, shape?: object, array?: object, minItems?: number, check?: (v: any) => string[]}>} */
export const SCHEMA = {
  area: {
    doc: 'The one clearable space: its extent and how densely it is populated.',
    owner: 'gameplay/meta',
    shape: {
      id: 'slug',
      label: 'string',
      originXZ: 'number[2]',
      size: 'number>0',
      patchCount: 'integer>0',
      minSpacing: 'number>0',
    },
    check(a) {
      const problems = [];
      // Patches must fit with their spacing respected, or generation silently
      // under-fills and the area is smaller than the manifest claims.
      const cellArea = Math.PI * (a.minSpacing / 2) ** 2;
      const capacity = (a.size ** 2) / cellArea * 0.6; // 0.6 ~ random packing density
      if (a.patchCount > capacity) {
        problems.push(`area.patchCount ${a.patchCount} cannot fit in ${a.size}x${a.size} at minSpacing ${a.minSpacing} (capacity ~${Math.floor(capacity)})`);
      }
      return problems;
    },
  },

  tiers: {
    doc: 'Overgrowth grades: what a patch is worth and how it reads at a glance.',
    owner: 'gameplay/systems',
    minItems: 2,
    array: {
      name: 'string',
      shape: 'enum:Block,Cylinder,Ball,Wedge',
      rgb: 'number[3]',
      value: 'number>0',
      weight: 'number>0',
      height: 'number>0',
    },
    check(tiers) {
      const problems = [];
      // 04-PRESENTATION.md makes colour-blind-readable rarity a hard constraint,
      // and tier is the core economic signal. Enforced here rather than trusted,
      // because it is the one accessibility rule in the whole brief that a
      // machine can actually check.
      const shapes = new Set();
      for (const t of tiers) {
        if (shapes.has(t.shape)) problems.push(`two tiers share the shape "${t.shape}"; tier must survive colour being removed`);
        shapes.add(t.shape);
      }
      const total = tiers.reduce((n, t) => n + t.weight, 0);
      if (Math.abs(total - 100) > 0.001) problems.push(`tier weights sum to ${total}, expected 100`);
      // Rarer must pay more, or the weighting carries no meaning.
      const byWeight = [...tiers].sort((a, b) => b.weight - a.weight);
      for (let i = 1; i < byWeight.length; i += 1) {
        if (byWeight[i].value <= byWeight[i - 1].value) {
          problems.push(`"${byWeight[i].name}" is rarer than "${byWeight[i - 1].name}" but pays no more`);
        }
      }
      return problems;
    },
  },

  upgrades: {
    doc: 'The spend side of the loop: what currency buys, and the cost ladder.',
    owner: 'gameplay/balance',
    minItems: 1,
    array: {
      id: 'slug',
      label: 'string',
      blurb: 'string',
      costBase: 'number>0',
      costGrowth: 'number>0',
      maxLevel: 'integer>0',
      perLevel: 'number>0',
      // Added after the first build trial. `perLevel` alone does not describe an effect:
      // a builder handed 0.25 cannot tell whether maxed reach is 14.3 or 11.79, and both
      // readings satisfied every acceptance criterion that existed. `base` is the value at
      // level 0, which `value` had nowhere to state and so nobody stated.
      base: 'number>0',
      mode: 'enum:additive,compounding',
    },
    check(upgrades) {
      const problems = [];
      const ids = new Set();
      for (const u of upgrades) {
        if (ids.has(u.id)) problems.push(`duplicate upgrade id "${u.id}"`);
        ids.add(u.id);
        if (u.costGrowth <= 1) problems.push(`upgrade "${u.id}" costGrowth ${u.costGrowth} must exceed 1, or the ladder is flat or inverted`);
        // A compounding step of 1.0 is a no-op ladder that still charges for every level,
        // which reads as working until somebody checks the maths.
        if (u.mode === 'compounding' && u.perLevel <= 1) {
          problems.push(`upgrade "${u.id}" is compounding with perLevel ${u.perLevel}; a factor at or below 1 makes every level worthless or harmful`);
        }
      }
      return problems;
    },
  },

  vocabulary: {
    doc: 'Naming rules every player-facing string in this contract is checked against.',
    owner: 'theme/vocabulary',
    // Enforced by the merger over every player-facing string, not read by any module at
    // runtime. Declared so the graph does not report it as a decision that never reaches
    // the build: it reaches the build by rejecting values, which is stronger than being read.
    consumedBy: 'tooling',
    shape: {
      bannedWords: 'array',
      maxLabelChars: 'integer>0',
      register: 'string',
    },
    check(v) {
      const problems = [];
      for (const b of v.bannedWords) {
        if (typeof b !== 'object' || !b.word || !b.reason) {
          problems.push(`vocabulary.bannedWords entries need a word and a reason; got ${JSON.stringify(b)}`);
        }
      }
      return problems;
    },
  },

  currency: {
    doc: 'What the single currency is called, and how it reads on screen.',
    owner: 'gameplay/systems',
    shape: {
      name: 'string',
      plural: 'string',
      icon: 'slug',
    },
    check(c) {
      const problems = [];
      // A HUD readout label sits in a corner cluster beside a number, which gives it
      // about 10 characters before it wraps. The message used to say "about 8" while the
      // check fired at 10 — found by `cid/theme/vocabulary/01-naming-form.md`, which had to
      // reconcile this ceiling against the global one and could not tell which was the rule.
      if (c.plural.length > 10) {
        problems.push(`currency.plural "${c.plural}" is ${c.plural.length} characters; a HUD readout label has room for 10`);
      }
      return problems;
    },
  },

  movement: {
    doc: 'What the player can reach and how fast, before any upgrade.',
    owner: 'gameplay/mechanics',
    shape: {
      baseWalkSpeed: 'number>0',
      baseClearRadius: 'number>0',
    },
  },


  patch: {
    doc: 'The physical footprint of one piece of overgrowth.',
    owner: 'art/objects',
    shape: {
      footprint: 'number>0',
      collides: 'boolean',
      material: 'string',
    },
  },

  collection: {
    doc: 'The relics, their sets, and how many are buried per area.',
    owner: 'gameplay/meta',
    shape: {
      className: 'string',
      classPlural: 'string',
      relicsPerArea: 'integer>0',
      areasPerDepth: 'integer>0',
      sets: 'array',
    },
    check(c) {
      const problems = [];
      if (!Array.isArray(c.sets) || c.sets.length === 0) {
        problems.push('collection.sets must be a non-empty array');
        return problems;
      }
      const seen = new Set();
      for (const s of c.sets) {
        if (!s.id || !Array.isArray(s.relics)) {
          problems.push(`collection set ${JSON.stringify(s.id ?? '?')} needs an id and a relics array`);
          continue;
        }
        for (const r of s.relics) {
          // A find entry is a bare name today and may gain a flavour line later. Normalise
          // before comparing: `seen.has(object)` would compare identity, so every duplicate
          // name would become invisible the moment the shape changed. Found by
          // `cid/theme/tone/02-flavour-and-humor.md`, which noted all three of these
          // failures point the same way — quietly reporting success.
          const name = typeof r === 'string' ? r : r?.name;
          if (typeof name !== 'string' || name.length === 0) {
            problems.push(`a find in set "${s.id}" has no name: ${JSON.stringify(r)}`);
            continue;
          }
          if (seen.has(name)) problems.push(`find "${name}" appears in more than one set`);
          seen.add(name);
        }
      }
      // A set must be completable from the areas that exist at its depth.
      //
      // This check used to compare against ONE area, which is only sound when exactly one
      // area exists per depth. Two CID sheets found that independently — Core Loop's
      // `04-lap-vs-session` and Tone's `01-register` — while reasoning about how many laps
      // fit in a session. It would have wrongly rejected a design that spreads a set across
      // several smaller areas, which is the obvious fix for a lap that is too short.
      const perDepth = c.areasPerDepth ?? 1;
      for (const s of c.sets) {
        if (!Array.isArray(s.relics) || s.relics.length === 0) continue;
        const reachable = perDepth * c.relicsPerArea;
        if (reachable < s.relics.length) {
          problems.push(`set "${s.id}" needs ${s.relics.length} finds but its depth yields only ${reachable} (${c.areasPerDepth} area(s) x ${c.relicsPerArea} per area); it can never complete`);
        }
      }
      return problems;
    },
  },

  onboarding: {
    doc: 'What the first session is guaranteed to deliver.',
    owner: 'gameplay/onboarding',
    shape: {
      guaranteedFirstRelic: 'boolean',
    },
  },


};

/* ------------------------------------------------------------------ checking */

/**
 * Exported so `architect/` validates its technical contract with the same type language
 * rather than a second, subtly different copy. Two validators that disagree about what
 * `number>0` means is exactly the class of divergence this repo exists to prevent.
 */
export function typeError(path, value, spec) {
  const t = typeof value;
  if (spec === 'string' || spec === 'slug') {
    if (t !== 'string' || value.length === 0) return `${path} must be a non-empty string`;
    if (spec === 'slug' && !/^[a-z][a-z0-9-]*$/.test(value)) return `${path} must be kebab-case, got ${JSON.stringify(value)}`;
    return null;
  }
  if (spec === 'boolean') return t === 'boolean' ? null : `${path} must be a boolean`;
  if (spec === 'array') return Array.isArray(value) ? null : `${path} must be an array`;
  // A keyed bag whose keys are data rather than schema — `playerState.types` is the first,
  // holding one entry per named record shape. An array would impose an order that means
  // nothing, so it is deliberately not one.
  if (spec === 'object') {
    if (t !== 'object' || value === null || Array.isArray(value)) return `${path} must be an object`;
    return null;
  }
  if (spec.startsWith('enum:')) {
    const allowed = spec.slice(5).split(',');
    return allowed.includes(value) ? null : `${path} must be one of ${allowed.join(', ')}; got ${JSON.stringify(value)}`;
  }
  const arrayMatch = spec.match(/^number\[(\d+)\]$/);
  if (arrayMatch) {
    const n = Number(arrayMatch[1]);
    if (!Array.isArray(value) || value.length !== n) return `${path} must be an array of ${n} numbers`;
    return value.every((v) => typeof v === 'number' && Number.isFinite(v)) ? null : `${path} must contain only finite numbers`;
  }
  if (spec === 'integer>0' || spec === 'number>0' || spec === 'number') {
    if (t !== 'number' || !Number.isFinite(value)) return `${path} must be a finite number`;
    if (spec !== 'number' && value <= 0) return `${path} must be greater than 0`;
    if (spec === 'integer>0' && !Number.isInteger(value)) return `${path} must be a whole number`;
    return null;
  }
  return `${path}: unknown schema type "${spec}"`;
}

/**
 * @param {object} manifest
 * @returns {{problems: string[], missing: string[]}}
 */
export function validateManifest(manifest) {
  const problems = [];
  const missing = [];

  for (const [key, spec] of Object.entries(SCHEMA)) {
    const value = manifest[key];
    if (value === undefined) {
      missing.push(`${key} — ${spec.doc} (owner: ${spec.owner})`);
      continue;
    }

    const before = problems.length;

    if (spec.array) {
      if (!Array.isArray(value)) {
        problems.push(`${key} must be an array`);
        continue;
      }
      if (spec.minItems && value.length < spec.minItems) {
        problems.push(`${key} needs at least ${spec.minItems} entries, got ${value.length}`);
      }
      value.forEach((item, i) => {
        for (const [field, fieldSpec] of Object.entries(spec.array)) {
          if (item[field] === undefined) {
            problems.push(`${key}[${i}].${field} is required`);
          } else {
            const err = typeError(`${key}[${i}].${field}`, item[field], fieldSpec);
            if (err) problems.push(err);
          }
        }
      });
    } else if (spec.shape) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        problems.push(`${key} must be an object`);
        continue;
      }
      for (const [field, fieldSpec] of Object.entries(spec.shape)) {
        if (value[field] === undefined) {
          problems.push(`${key}.${field} is required`);
        } else {
          const err = typeError(`${key}.${field}`, value[field], fieldSpec);
          if (err) problems.push(err);
        }
      }
    }

    // Cross-field invariants run once *this key's* shape is sound. Guarding on the
    // total instead meant one key's shape error skipped every later key's check, which
    // is how two format rules on `modules` sat dead in the architect's schema.
    if (spec.check && problems.length === before) {
      problems.push(...spec.check(value));
    }
  }

  problems.push(...crossCuttingProblems(manifest));
  return { problems, missing };
}

/**
 * Every string a player can read, with where it lives.
 *
 * Kept in one place because it is the answer to a question four separate CID leads asked
 * independently: "which of my constraints can actually be enforced?" A naming rule is
 * only real if something checks it, and this is the list to check against.
 */
export function playerFacingStrings(manifest) {
  const out = [];
  // Skipping a non-string silently is how 24 find names would vanish from the ban-word
  // and label-length checks the day they gain a flavour field. Record the miss instead.
  const missed = [];
  const add = (path, value) => {
    if (typeof value === 'string') out.push({ path, value });
    else if (value !== undefined && value !== null) missed.push({ path, value });
  };

  add('area.label', manifest.area?.label);
  add('currency.name', manifest.currency?.name);
  add('collection.className', manifest.collection?.className);
  add('collection.classPlural', manifest.collection?.classPlural);
  add('currency.plural', manifest.currency?.plural);
  (manifest.tiers ?? []).forEach((t, i) => add(`tiers[${i}].name`, t.name));
  (manifest.upgrades ?? []).forEach((u, i) => {
    add(`upgrades[${i}].label`, u.label);
    add(`upgrades[${i}].blurb`, u.blurb);
  });
  (manifest.collection?.sets ?? []).forEach((s, i) => {
    add(`collection.sets[${i}].label`, s.label);
    (s.relics ?? []).forEach((r, j) => {
      const base = `collection.sets[${i}].relics[${j}]`;
      if (typeof r === 'string') add(base, r);
      else if (r && typeof r === 'object') {
        add(`${base}.name`, r.name);
        add(`${base}.flavour`, r.flavour);
      } else add(base, r);
    });
  });
  out.missed = missed;
  return out;
}

/**
 * Paths whose value is prose rather than furniture, so the label-length limit does not
 * apply. Enumerated rather than pattern-matched: the old test was `path.endsWith('.blurb')`,
 * which would have failed every flavour line on the 14-character limit the day one existed.
 */
const PROSE_PATHS = [/\.blurb$/, /\.flavour$/];

/**
 * Invariants that span keys, so they cannot live on any single one.
 *
 * This is what makes Theme & Narrative's output enforceable. Every Theme domain reported
 * owning no contract key, correctly — a register or a prohibition is not a value. But that
 * left their work reaching the build as prose a builder could simply not honour, which is
 * the exact failure this seam exists to remove. A banned word is the part of a naming rule
 * that a machine can hold, so it is held here.
 */
/*
 * Three cross-key checks used to live here: an upgrade nothing computed, a state field with
 * no writer, and an upgrade base disagreeing with movement. All three needed `modules`,
 * which is a technical key and now belongs to the architect.
 *
 * They were also three special cases of one rule, each added after a build trial found the
 * next instance. `architect/validate.mjs` states the rule once instead: every declared
 * thing has a producer and a consumer.
 */


function crossCuttingProblems(manifest) {
  const problems = [];
  const vocab = manifest.vocabulary;
  if (!vocab || !Array.isArray(vocab.bannedWords)) return problems;

  const strings = playerFacingStrings(manifest);
  for (const { path, value } of strings.missed ?? []) {
    problems.push(`${path} is not a string (${typeof value}), so it escapes every naming check`);
  }
  for (const { path, value } of strings) {
    for (const banned of vocab.bannedWords) {
      if (!banned?.word) continue;
      const re = new RegExp(`\\b${String(banned.word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (re.test(value)) {
        problems.push(`${path} = ${JSON.stringify(value)} uses the banned word "${banned.word}" — ${banned.reason}`);
      }
    }
    // Prose is exempt from the label limit; furniture is not.
    if (!PROSE_PATHS.some((re) => re.test(path)) && value.length > vocab.maxLabelChars) {
      problems.push(`${path} is ${value.length} characters, over the ${vocab.maxLabelChars}-character label limit`);
    }
  }
  return problems;
}

/** Every key a build needs, with who is meant to supply it. For coverage reports. */
export function contract() {
  return Object.entries(SCHEMA).map(([key, spec]) => ({ key, doc: spec.doc, owner: spec.owner }));
}
