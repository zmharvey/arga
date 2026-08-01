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
      // `register` is prose and always will be — it is the thing a human writer reads. These
      // three are the checkable half of the same decision, and they exist because the prose
      // version could not be enforced.
      //
      // Tone spent four sheets deciding a register. One ruling from it, Title Case, had to be
      // carried into two other domains by hand, and before that three separate sheets each
      // spent ~150k tokens rediscovering that `area.label` was "EAST TERRACE" while
      // `collection.sets[].label` was "Terrace". A prose register cannot catch that. A casing
      // enum can, on every string, for free.
      casing: 'enum:title,sentence,upper',
      maxSentenceWords: 'integer>0',
      allowedPattern: 'string',
    },
    check(v) {
      const problems = [];
      for (const b of v.bannedWords) {
        if (typeof b !== 'object' || !b.word || !b.reason) {
          problems.push(`vocabulary.bannedWords entries need a word and a reason; got ${JSON.stringify(b)}`);
        }
      }
      try {
        new RegExp(v.allowedPattern);
      } catch (err) {
        problems.push(`vocabulary.allowedPattern is not a valid regular expression — ${err.message}`);
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

  /* ================================================================= waves 2-3
   *
   * The nine keys above are empirical: each is something a builder invented on the spot
   * while hand-building the ruin loop, because no sheet supplied it. The sixteen below are
   * empirical in a different way — each was *proposed* by the domain that owns the subject,
   * after that domain ran and found the contract had no slot for its decision.
   *
   * WHY THE SHAPES ARE SHALLOW
   * --------------------------
   * These values are large: `firstSession` carries 13 top-level fields, `endgame` 13,
   * `products` 12. Most are prose fields recording *why* — reasoning a build never reads.
   * Declaring all of them would be a schema that mostly validates documentation, and every
   * required field is a field a later revision must keep supplying.
   *
   * So `shape` names only what a build reads or a check joins on, and the value goes into
   * `check` instead. The cross-key joins below are where two builders actually diverge:
   * an axis id that does not match, a factor that overruns a ceiling, a distance measured
   * against a radius it must stay under. Every one of them is a bug some sheet found by
   * hand this wave, converted into something the merger finds in milliseconds.
   * ========================================================================= */

  rarity: {
    doc: 'How many rarity ladders exist, and the one field each is read from.',
    owner: 'gameplay/systems',
    shape: {
      gradedLadderCount: 'integer>0',
      findPlacementReadsTier: 'boolean',
    },
  },

  economy: {
    doc: 'Faucets, sinks, the per-clear payout formula, and the payout floor.',
    owner: 'gameplay/systems',
    shape: {
      startingBalance: 'number',
      payoutFloor: 'number>0',
      faucetCount: 'integer>0',
      sinkCount: 'integer>0',
    },
    check(e) {
      const problems = [];
      // Check 1 of the category gate, made mechanical. A currency with no faucet cannot be
      // earned and one with no sink cannot be spent; both were verified by an agent reading
      // prose until this key existed.
      if (Array.isArray(e.faucets) && e.faucets.length !== e.faucetCount) {
        problems.push(`economy.faucetCount says ${e.faucetCount} but faucets lists ${e.faucets.length}`);
      }
      if (Array.isArray(e.sinks) && e.sinks.length !== e.sinkCount) {
        problems.push(`economy.sinkCount says ${e.sinkCount} but sinks lists ${e.sinks.length}`);
      }
      return problems;
    },
  },

  discovery: {
    doc: 'The per-Find record, the draw pool and replacement rule, and what a repeat does.',
    owner: 'gameplay/systems',
    shape: {
      luckShaped: 'boolean',
    },
  },

  modifiers: {
    doc: 'What a permanent stat change is, and the order several of them resolve in.',
    owner: 'gameplay/systems',
    shape: {
      factorFloor: 'number>0',
    },
    check(m) {
      const problems = [];
      // A factor below 1 is a debuff, and nothing in this game debuffs. Stated as a field so
      // a later source cannot introduce one by supplying 0.9 and calling it a balance pass.
      if (m.factorFloor < 1) {
        problems.push(`modifiers.factorFloor ${m.factorFloor} is below 1, which makes a source a debuff`);
      }
      if (Array.isArray(m.resolutionOrder) && m.resolutionOrder.length < 2) {
        problems.push('modifiers.resolutionOrder needs at least two steps, or there is nothing to resolve');
      }
      return problems;
    },
  },

  input: {
    doc: 'The closed verb list, and which device classes reach each one.',
    owner: 'gameplay/mechanics',
    shape: {
      closed: 'boolean',
    },
    check(i) {
      const problems = [];
      if (!Array.isArray(i.verbs) || !i.verbs.length) {
        problems.push('input.verbs must list at least one verb; a closed roster of nothing is not a roster');
        return problems;
      }
      const ids = new Set();
      for (const v of i.verbs) {
        if (!v || typeof v.id !== 'string') {
          problems.push('every input.verbs entry needs a string id');
          continue;
        }
        if (ids.has(v.id)) problems.push(`duplicate input verb "${v.id}"`);
        ids.add(v.id);
      }
      return problems;
    },
  },

  tool: {
    doc: 'Whether the tool is a held object, and what drives its appearance.',
    owner: 'gameplay/mechanics',
    shape: {
      held: 'boolean',
    },
  },

  response: {
    doc: 'Per beat: what fires, on which side, within what budget, and whether control is affected.',
    owner: 'gameplay/mechanics',
    shape: {
      controlEverAffected: 'boolean',
    },
    check(r) {
      const problems = [];
      // `core-loop` ruled zero tension and no lockouts. A beat that takes control away is the
      // one way a feedback contract can reintroduce it, so it is checked rather than trusted.
      if (r.controlEverAffected === true) {
        problems.push('response.controlEverAffected is true, but zero tension is confirmed and no beat may take control');
      }
      return problems;
    },
  },

  traversal: {
    doc: 'Jump, edges, falling, and what the body may do inside an area.',
    owner: 'gameplay/mechanics',
    shape: {
      jump: 'object',
      boundary: 'object',
    },
    check(t) {
      const problems = [];
      // The wave-2 finding that a solid boundary makes co-presence invisible. `social`'s
      // sightline requirement is measured through this wall, so its opacity is not a detail
      // an Art pass gets to choose later.
      if (t.boundary && t.boundary.opaque === true) {
        problems.push('traversal.boundary.opaque is true, which puts a wall on the sightline social co-presence is measured through');
      }
      return problems;
    },
  },

  social: {
    doc: 'Population, progress scope, plot tenure, collision, chat, and the co-presence bound.',
    owner: 'gameplay/social',
    shape: {
      progressScope: 'string',
      worldStateScope: 'string',
    },
    check(s) {
      const problems = [];
      const sep = s.maxCoPresenceSeparationStuds;
      // The sheet that wrote this asked for exactly this check, having stated the invariant
      // as an acceptance criterion and noted that a criterion checked by hand is a criterion
      // nobody checks. The value is a pixel result, so it travels with its test range.
      if (sep && typeof sep === 'object' && Array.isArray(sep.testRangeStuds)) {
        const [lo, hi] = sep.testRangeStuds;
        if (typeof sep.value === 'number' && (sep.value < lo || sep.value > hi)) {
          problems.push(`social.maxCoPresenceSeparationStuds.value ${sep.value} is outside its own test range [${lo}, ${hi}]`);
        }
      }
      return problems;
    },
  },

  setBonus: {
    doc: 'What completing a set grants: which axis each set targets, and by how much.',
    owner: 'gameplay/meta',
    shape: {
      sourceClass: 'string',
    },
    check(sb) {
      const problems = [];
      if (!Array.isArray(sb.rows)) {
        problems.push('setBonus.rows must list one row per set');
        return problems;
      }
      for (const r of sb.rows) {
        if (typeof r?.factor === 'number' && r.factor < 1) {
          problems.push(`setBonus row "${r.setId ?? '?'}" has factor ${r.factor}, below 1, which makes completing a set a punishment`);
        }
      }
      return problems;
    },
  },

  depths: {
    doc: 'How many areas exist, at what depths, how large each is, and what unlocks it.',
    owner: 'gameplay/meta',
    shape: {
      depthCount: 'integer>0',
      areaCount: 'integer>0',
    },
    check(d) {
      const problems = [];
      if (Array.isArray(d.areas) && d.areas.length !== d.areaCount) {
        problems.push(`depths.areaCount says ${d.areaCount} but areas lists ${d.areas.length}`);
      }
      return problems;
    },
  },

  layout: {
    doc: 'How one area is composed, and where finds sit inside it.',
    owner: 'gameplay/meta',
    shape: {
      chunksPerFamily: 'integer>0',
    },
  },

  plots: {
    doc: 'How players’ areas are arranged in the world, and where each spawns.',
    owner: 'gameplay/meta',
    shape: {
      pitchStuds: 'number>0',
      laneWidthStuds: 'number>0',
    },
    check(p) {
      const problems = [];
      // A pitch under the lane width overlaps two players' ground.
      if (p.pitchStuds < p.laneWidthStuds) {
        problems.push(`plots.pitchStuds ${p.pitchStuds} is under laneWidthStuds ${p.laneWidthStuds}, so neighbouring plots overlap`);
      }
      return problems;
    },
  },

  endgame: {
    doc: 'What exists after the collection is complete.',
    owner: 'gameplay/meta',
    shape: {
      gameEnds: 'boolean',
      collectionEnds: 'boolean',
    },
  },

  products: {
    doc: 'What is sold for Robux, on which axis, at what factor and price.',
    owner: 'gameplay/monetization',
    shape: {
      storeExists: 'boolean',
    },
    check(p) {
      const problems = [];
      if (!Array.isArray(p.items)) return problems;
      const ids = new Set();
      for (const it of p.items) {
        if (ids.has(it?.id)) problems.push(`duplicate product id "${it.id}"`);
        ids.add(it?.id);
        if (typeof it?.priceRobux === 'number' && !Number.isInteger(it.priceRobux)) {
          problems.push(`product "${it.id}" price ${it.priceRobux} is not a whole number of Robux`);
        }
        // `03-META.md`: permanent multipliers only, never content access. A factor at or
        // below 1 is not a multiplier, and something sold that does nothing is the one
        // monetisation failure a player can prove.
        if (typeof it?.factor === 'number' && it.factor <= 1) {
          problems.push(`product "${it.id}" has factor ${it.factor}; a product at or below 1 sells nothing`);
        }
      }
      return problems;
    },
  },

  firstSession: {
    doc: 'The opening beats, what each guarantees, and what is withheld on run one.',
    owner: 'gameplay/onboarding',
    shape: {
      armDistanceStuds: 'number>0',
    },
    check(f) {
      const problems = [];
      if (!Array.isArray(f.beats) || !f.beats.length) {
        problems.push('firstSession.beats must list the opening beats in order');
      }
      return problems;
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
  problems.push(...crossKeyProblems(manifest));
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


/**
 * The joins between two keys, which is where waves 2 and 3 actually went wrong.
 *
 * Every rule here is a defect some agent found by hand this wave, at a cost of roughly
 * 200k tokens each. None of them is visible inside a single sheet — that is the point.
 * A writer holding one domain cannot see that its axis id fails to match another key's,
 * and a verifier can only find it by reading both and doing the arithmetic.
 *
 * Kept separate from `crossCuttingProblems` because that function returns early when there
 * is no vocabulary, and these checks do not depend on one.
 */
function crossKeyProblems(manifest) {
  const problems = [];
  const { modifiers, upgrades, setBonus, products, movement, firstSession, collection, depths } = manifest;

  // 1. Axis ids must join upgrades[].id verbatim.
  //
  // Found by the wave-2 verifier: `modifiers` used `pace` where `upgrades[].id` is `speed`,
  // so `effective(axis)` could not resolve and every consumer of it would have silently got
  // the base value. Two builders diverge here — one hard-codes a mapping, one does not.
  if (modifiers && Array.isArray(modifiers.axes) && Array.isArray(upgrades)) {
    const upgradeIds = new Set(upgrades.map((u) => u.id));
    for (const axis of modifiers.axes) {
      const id = typeof axis === 'string' ? axis : axis?.id;
      if (id && !upgradeIds.has(id)) {
        problems.push(`modifiers axis "${id}" does not match any upgrades[].id (${[...upgradeIds].join(', ')}), so effective(axis) cannot resolve`);
      }
    }
  }

  // 2. Set bonuses and products must fit the headroom their axis actually has.
  //
  // Found by the Monetization writer, about a sheet that was not its own: four set bonuses at
  // x1.2 on `speed` need 2.07 against 1.61 of headroom, so the fourth is silently absorbed.
  // A player completes a set and nothing happens, with no purchase in the game at all.
  //
  // Headroom is per-axis and comes from the ladder: an axis maxes at upgradeEffect(maxLevel),
  // and anything multiplicative after that has only the gap to the ceiling to work in. Only
  // axes that declare a ceiling are checked; the rest are unbounded by design.
  if (modifiers && Array.isArray(modifiers.axes) && Array.isArray(upgrades)) {
    for (const axis of modifiers.axes) {
      const id = typeof axis === 'string' ? axis : axis?.id;
      const ceiling = typeof axis === 'object' ? axis?.ceiling : undefined;
      if (!id || typeof ceiling !== 'number') continue;

      const u = upgrades.find((x) => x.id === id);
      if (!u) continue;
      const ladderMax = u.mode === 'compounding'
        ? u.base * (u.perLevel ** u.maxLevel)
        : u.base + u.perLevel * u.maxLevel;
      const headroom = ceiling / ladderMax;

      let demanded = 1;
      const sources = [];
      for (const r of setBonus?.rows ?? []) {
        if (r?.axis === id && typeof r.factor === 'number') {
          demanded *= r.factor;
          sources.push(`setBonus:${r.setId ?? '?'}`);
        }
      }
      for (const it of products?.items ?? []) {
        if (it?.axis === id && typeof it.factor === 'number') {
          demanded *= it.factor;
          sources.push(`product:${it.id ?? '?'}`);
        }
      }
      if (demanded > headroom + 1e-9) {
        problems.push(
          `axis "${id}" is over-subscribed: ${sources.join(' x ')} demand x${demanded.toFixed(3)} `
          + `but the ladder maxes at ${ladderMax} against a ceiling of ${ceiling}, leaving only `
          + `x${headroom.toFixed(3)}. The excess is silently clamped, so a player earns a bonus that does nothing.`,
        );
      }
    }
  }

  // 3. The arming gate must not outrun the radius it hides behind.
  //
  // `firstSession` disarms clearing until the player has moved `armDistanceStuds`. If that
  // exceeds `movement.baseClearRadius`, the guaranteed first patch is out of range by the
  // time the gate releases and the first Find no longer reveals on the first clear -- which
  // is the one promise the onboarding key exists to make.
  if (firstSession && movement && typeof firstSession.armDistanceStuds === 'number') {
    if (firstSession.armDistanceStuds >= movement.baseClearRadius) {
      problems.push(
        `firstSession.armDistanceStuds ${firstSession.armDistanceStuds} is not under `
        + `movement.baseClearRadius ${movement.baseClearRadius}; the first patch leaves range before clearing arms`,
      );
    }
  }

  // 4. The areas at one depth must partition that depth's set exactly.
  //
  // `relicsPerArea x areasPerDepth == |set|`. Under-partitioning leaves names unreachable and
  // the set uncompletable; over-partitioning places one twice. Dormant while areasPerDepth
  // was 1, and live from ruling R-2 onward, which is exactly when a check earns its keep.
  if (collection && Array.isArray(collection.sets)) {
    const per = collection.relicsPerArea * (collection.areasPerDepth ?? 1);
    for (const s of collection.sets) {
      if (Array.isArray(s.relics) && s.relics.length !== per) {
        problems.push(
          `set "${s.id}" holds ${s.relics.length} names but its depth's areas partition `
          + `${collection.relicsPerArea} x ${collection.areasPerDepth} = ${per}; `
          + `${s.relics.length > per ? 'names are unreachable and the set cannot complete' : 'a name is buried twice'}`,
        );
      }
    }
    // And the ladder must actually have that many areas at each depth.
    if (depths && typeof depths.areaCount === 'number' && typeof depths.depthCount === 'number') {
      const expected = depths.depthCount * (collection.areasPerDepth ?? 1);
      if (depths.areaCount !== expected) {
        problems.push(
          `depths.areaCount ${depths.areaCount} is not depthCount ${depths.depthCount} x `
          + `collection.areasPerDepth ${collection.areasPerDepth}; some depth has the wrong number of areas`,
        );
      }
    }
  }

  return problems;
}

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
    const isProse = PROSE_PATHS.some((re) => re.test(path));
    if (!isProse && value.length > vocab.maxLabelChars) {
      problems.push(`${path} is ${value.length} characters, over the ${vocab.maxLabelChars}-character label limit`);
    }

    // The casing ruling, enforced rather than remembered. `cid:verify` used to *warn* that
    // labels used two conventions and leave the choice to a human, because picking one
    // crossed a category boundary. A domain owns it now, so it is a hard check.
    if (!isProse && vocab.casing && /[A-Za-z]/.test(value)) {
      const words = value.split(/\s+/).filter(Boolean);
      const titled = words.every((w) => !/^[A-Z]{2,}$/.test(w));
      if (vocab.casing === 'title' && !titled) {
        problems.push(`${path} = ${JSON.stringify(value)} is not Title Case, and vocabulary.casing is "title"`);
      }
      if (vocab.casing === 'upper' && value !== value.toUpperCase()) {
        problems.push(`${path} = ${JSON.stringify(value)} is not upper case, and vocabulary.casing is "upper"`);
      }
    }

    // Every player-facing string, prose included, must be typeable in the game's character
    // set. Tone's register named this and nothing could check it.
    if (vocab.allowedPattern) {
      let re;
      try { re = new RegExp(vocab.allowedPattern); } catch { re = null; }
      if (re && !re.test(value)) {
        problems.push(`${path} = ${JSON.stringify(value)} contains characters outside vocabulary.allowedPattern`);
      }
    }

    // A prose field still has a length rule; it is a word count rather than a character one.
    if (isProse && vocab.maxSentenceWords) {
      for (const sentence of value.split(/(?<=[.!?])\s+/)) {
        const n = sentence.split(/\s+/).filter(Boolean).length;
        if (n > vocab.maxSentenceWords) {
          problems.push(`${path} has a ${n}-word sentence, over the ${vocab.maxSentenceWords}-word limit: ${JSON.stringify(sentence.slice(0, 60))}`);
        }
      }
    }
  }
  return problems;
}

/** Every key a build needs, with who is meant to supply it. For coverage reports. */
export function contract() {
  return Object.entries(SCHEMA).map(([key, spec]) => ({ key, doc: spec.doc, owner: spec.owner }));
}
