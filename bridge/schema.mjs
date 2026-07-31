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

  playerState: {
    doc: 'The shape of one player\'s live state: every field, who writes it, and what survives a rejoin.',
    owner: 'tech/architecture',
    shape: {
      fields: 'array',
      types: 'object',
    },
    check(ps) {
      const problems = [];
      if (!Array.isArray(ps.fields) || !ps.fields.length) {
        problems.push('playerState.fields must be a non-empty array');
        return problems;
      }
      const names = new Set();
      for (const f of ps.fields) {
        if (!f?.name || !f?.type || !f?.writtenBy) {
          problems.push(`playerState field ${JSON.stringify(f?.name ?? '?')} needs a name, a type and a writtenBy`);
          continue;
        }
        if (names.has(f.name)) problems.push(`two playerState fields are both called "${f.name}"`);
        names.add(f.name);
        if (typeof f.persisted !== 'boolean') {
          // Left unstated, every module guesses, and the guesses only disagree in
          // production when a player rejoins.
          problems.push(`playerState field "${f.name}" does not say whether it is persisted`);
        }
      }
      // A named type that nothing uses is dead weight; a used type that is not named is
      // the gap that made two builders invent the same record differently.
      for (const f of ps.fields) {
        const named = String(f.type ?? '').replace(/[[\]?<>]/g, ' ').split(/[\s,]+/).filter(Boolean);
        for (const t of named) {
          if (/^[A-Z]/.test(t) && !(t in (ps.types ?? {}))) {
            problems.push(`playerState field "${f.name}" is typed "${f.type}" but "${t}" is not defined in playerState.types`);
          }
        }
      }
      return problems;
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
/**
 * Every upgrade the player can buy must have a module that turns its level into an effect.
 *
 * Found by the first agent that ever tried to build from this contract, in 84k tokens,
 * after three CID verification passes and every check in this file had already passed.
 *
 * `upgrades` carried `value` with `perLevel: 0.25` and `maxLevel: 10`, so a player could
 * spend 25 → 1099 shards on ten levels of it. No module's `exposes` list produced a value
 * multiplier. Meanwhile `clearing`'s acceptance criterion 3 read "payout equals tier value
 * times the player's value multiplier" — a criterion depending on a number nobody was told
 * to compute. `radius` and `speed` were fine, because `progression` happened to expose
 * `clearRadius` and `walkSpeed`.
 *
 * Nothing caught it because every existing check looks *within* one key. This one looks
 * across two: the thing the player buys, and the thing that reads what they bought.
 *
 * The match is by name and deliberately loose (`value` matching `valueMultiplier`,
 * `payoutMultiplier`, `getValue`). A false negative here costs a build agent an hour; a
 * false positive costs a designer an argument with a linter, so it errs toward silence.
 */
function orphanedUpgrades(manifest) {
  const { upgrades, modules } = manifest;
  if (!Array.isArray(upgrades) || !Array.isArray(modules)) return [];

  const surface = modules
    .flatMap((m) => (Array.isArray(m.exposes) ? m.exposes : []))
    .map((e) => String(e).toLowerCase());
  if (!surface.length) return [];

  const problems = [];
  for (const u of upgrades) {
    const id = String(u.id ?? '').toLowerCase();
    if (!id) continue;
    // "radius" is consumed by `clearRadius(state)`; substring either way catches the
    // realistic namings without needing a vocabulary of synonyms.
    const consumed = surface.some((fn) => fn.includes(id) || id.includes(fn.replace(/\(.*/, '')));
    if (!consumed) {
      problems.push(
        `upgrade "${u.id}" costs up to ${Math.floor(u.costBase * u.costGrowth ** (u.maxLevel - 1))} `
        + `across ${u.maxLevel} levels, but no module exposes anything that reads it — `
        + `a player can buy it and nothing in the build changes. Either a module must expose `
        + `a getter derived from "${u.id}", or the upgrade should not be in the ladder.`,
      );
    }
  }
  return problems;
}

/**
 * The two structural gaps the first build trial exposed, now checkable.
 *
 * Both were invisible to every existing check because every existing check looked at one
 * key in isolation, and both cost a builder real time:
 *
 * 1. `radius` and `speed` take their level-0 value from `movement`, and now also carry a
 *    `base`. Two numbers for one fact drift silently, so they are compared.
 * 2. Every `playerState` field claims a writing module. If that module does not exist, or
 *    the field is written by nobody, the state table has an author nobody can find.
 */
function structuralProblems(manifest) {
  const problems = [];
  const { upgrades, movement, playerState, modules } = manifest;

  if (Array.isArray(upgrades) && movement) {
    const externalBase = { radius: 'baseClearRadius', speed: 'baseWalkSpeed' };
    for (const u of upgrades) {
      const key = externalBase[u.id];
      if (key && movement[key] !== undefined && u.base !== movement[key]) {
        problems.push(
          `upgrade "${u.id}" has base ${u.base} but movement.${key} is ${movement[key]}; `
          + 'one of them is what the player starts with and the other is a stale copy.',
        );
      }
    }
  }

  // Computing a value is not the same as applying it, and the gap between the two is
  // invisible to every check above. The second build trial found `Progression.walkSpeed`
  // existing, satisfying `orphanedUpgrades`, and nothing writing it to a Humanoid: both
  // modules that touch the character declined it in their reports, and the build order
  // named no third. The Pace upgrade was purchasable with no effect.
  //
  // `applies` is the module-side answer, mirroring `playerState.writtenBy`: exactly one
  // module takes responsibility for making each upgrade visible to the player.
  if (Array.isArray(upgrades) && Array.isArray(modules)) {
    const appliedBy = new Map();
    for (const m of modules) {
      for (const id of Array.isArray(m.applies) ? m.applies : []) {
        if (appliedBy.has(id)) {
          problems.push(`upgrades "${id}" is applied by both "${appliedBy.get(id)}" and "${m.id}"; two modules writing one effect race`);
        }
        appliedBy.set(id, m.id);
      }
    }
    const anyDeclared = appliedBy.size > 0;
    for (const u of upgrades) {
      if (!appliedBy.has(u.id)) {
        // Only fires once some module has declared `applies`, so a manifest predating the
        // field is not spammed with eleven problems it cannot act on.
        if (anyDeclared) {
          problems.push(
            `upgrade "${u.id}" is computed but no module declares it in "applies"; `
            + 'a player can buy it and see nothing change. Name the module that makes it take effect.',
          );
        }
      }
    }
    for (const [id, mod] of appliedBy) {
      if (!upgrades.some((u) => u.id === id)) {
        problems.push(`module "${mod}" applies "${id}", which is not an upgrade`);
      }
    }
  }

  if (playerState && Array.isArray(playerState.fields) && Array.isArray(modules)) {
    const ids = new Set(modules.map((m) => m.id));
    for (const f of playerState.fields) {
      if (f?.writtenBy && !ids.has(f.writtenBy)) {
        problems.push(`playerState field "${f.name}" is written by "${f.writtenBy}", which is not a module`);
      }
    }
    // The upgrades map is keyed by upgrade id. If a ladder gains an axis and the state
    // shape does not say so, the persisted table quietly stops round-tripping.
    const upgradeField = playerState.fields.find((f) => /upgrade/i.test(f?.name ?? ''));
    if (Array.isArray(upgrades) && !upgradeField) {
      problems.push('playerState has no field holding upgrade levels, but the ladder has '
        + `${upgrades.length}; a purchase would have nowhere to be recorded`);
    }
  }

  return problems;
}

function crossCuttingProblems(manifest) {
  const problems = [...orphanedUpgrades(manifest), ...structuralProblems(manifest)];
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
