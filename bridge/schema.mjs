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
    },
    check(upgrades) {
      const problems = [];
      const ids = new Set();
      for (const u of upgrades) {
        if (ids.has(u.id)) problems.push(`duplicate upgrade id "${u.id}"`);
        ids.add(u.id);
        if (u.costGrowth <= 1) problems.push(`upgrade "${u.id}" costGrowth ${u.costGrowth} must exceed 1, or the ladder is flat or inverted`);
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
      relicsPerArea: 'integer>0',
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
          if (seen.has(r)) problems.push(`relic "${r}" appears in more than one set`);
          seen.add(r);
        }
      }
      // A set must be completable from one area's worth of finds, or set
      // completion is unreachable and the long-term objective dies.
      for (const s of c.sets) {
        if (Array.isArray(s.relics) && s.relics.length > 0 && c.relicsPerArea < s.relics.length) {
          problems.push(`collection.relicsPerArea ${c.relicsPerArea} is fewer than set "${s.id}" needs (${s.relics.length}); that set can never complete from one area`);
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

  modules: {
    doc: 'The build plan: which modules exist, what each owns, and what it may not do.',
    owner: 'tech/architecture',
    minItems: 1,
    array: {
      id: 'slug',
      path: 'string',
      side: 'enum:server,client,shared',
      responsibility: 'string',
      reads: 'array',
      exposes: 'array',
      dependsOn: 'array',
      criteria: 'array',
    },
    check(modules) {
      const problems = [];
      const byId = new Map(modules.map((m) => [m.id, m]));
      const paths = new Set();

      for (const m of modules) {
        if (paths.has(m.path)) problems.push(`two modules claim the path ${m.path}`);
        paths.add(m.path);

        // A module reading a key nobody supplies is a build that stops halfway.
        for (const key of m.reads) {
          if (!(key in SCHEMA) || key === 'modules') {
            problems.push(`module "${m.id}" reads "${key}", which is not a contract key`);
          }
        }
        for (const dep of m.dependsOn) {
          if (!byId.has(dep)) problems.push(`module "${m.id}" depends on "${dep}", which does not exist`);
        }
        if (m.criteria.length === 0) {
          problems.push(`module "${m.id}" has no acceptance criteria; a builder cannot prove it finished`);
        }
        if (m.exposes.length === 0 && m.side !== 'client') {
          problems.push(`module "${m.id}" exposes nothing and is not a client entry point; either it is dead or its interface is unstated`);
        }
        // Sides can only depend inward: client and server may read shared, never
        // each other. Getting this wrong produces a require that cannot resolve at
        // runtime, which is a class of bug worth refusing on paper.
        for (const dep of m.dependsOn) {
          const d = byId.get(dep);
          if (!d) continue;
          if (m.side !== d.side && d.side !== 'shared') {
            problems.push(`module "${m.id}" (${m.side}) depends on "${dep}" (${d.side}); only shared may be depended on across sides`);
          }
        }
      }

      // A cycle means there is no order a builder can work in.
      const state = new Map();
      const visit = (id, trail) => {
        if (state.get(id) === 'done') return;
        if (state.get(id) === 'open') {
          problems.push(`dependency cycle: ${[...trail, id].join(' -> ')}`);
          return;
        }
        state.set(id, 'open');
        for (const dep of byId.get(id)?.dependsOn ?? []) visit(dep, [...trail, id]);
        state.set(id, 'done');
      };
      for (const m of modules) visit(m.id, []);

      return problems;
    },
  },

  runtime: {
    doc: 'Server cadences and storage identity. Technical, not creative.',
    owner: 'tech/architecture',
    shape: {
      clearTickRate: 'number>0',
      saveIntervalSeconds: 'number>0',
      dataStoreName: 'string',
    },
    check(r) {
      const problems = [];
      if (r.clearTickRate > 0.25) {
        problems.push(`runtime.clearTickRate ${r.clearTickRate}s is slow enough to feel laggy on contact; proximity clearing needs a tick under 0.25s`);
      }
      return problems;
    },
  },
};

/* ------------------------------------------------------------------ checking */

function typeError(path, value, spec) {
  const t = typeof value;
  if (spec === 'string' || spec === 'slug') {
    if (t !== 'string' || value.length === 0) return `${path} must be a non-empty string`;
    if (spec === 'slug' && !/^[a-z][a-z0-9-]*$/.test(value)) return `${path} must be kebab-case, got ${JSON.stringify(value)}`;
    return null;
  }
  if (spec === 'boolean') return t === 'boolean' ? null : `${path} must be a boolean`;
  if (spec === 'array') return Array.isArray(value) ? null : `${path} must be an array`;
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

    // Cross-field invariants only run once the shape is sound, or they report
    // noise about fields that are simply absent.
    if (spec.check && problems.length === 0) {
      problems.push(...spec.check(value));
    }
  }

  return { problems, missing };
}

/** Every key a build needs, with who is meant to supply it. For coverage reports. */
export function contract() {
  return Object.entries(SCHEMA).map(([key, spec]) => ({ key, doc: spec.doc, owner: spec.owner }));
}
