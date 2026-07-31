/**
 * The technical contract: what the build architect decides.
 *
 * WHY THIS IS A SEPARATE CONTRACT
 * ------------------------------
 * CID answers creative questions. What is the currency called, how rare is each plant,
 * what does the fiction promise, how funny is the flavour text. Those are judgements about
 * a game.
 *
 * Two build trials then measured what actually stopped a builder, and roughly 15 of 21
 * stops were not creative questions at all:
 *
 *   where does a require path point                what does patch.position denote
 *   is `states` an array or a map, keyed by what   who removes one cleared patch
 *   is upgradeCost indexed by held or target level who applies walk speed to a Humanoid
 *   who constructs the initial state               is state loaded before the first tick
 *
 * No creative agent can answer any of those, and no creative agent should be asked to.
 * "Parts or a mesh" is not a question about what the game is about.
 *
 * Before this file existed those answers were being patched into `cid/tech/architecture/`,
 * a domain CID's own graph lists as a **wave 5 creative domain**, while the sheets in it
 * were being written in wave 1 because the build could not proceed without them. One of its
 * keys documented itself as "Technical, not creative." The architect already existed; it
 * was just wearing a creative label and growing by accretion every time a trial found a
 * hole.
 *
 * THE DIVISION
 * ------------
 *   bridge/schema.mjs     nine creative keys. What the game is.
 *   architect/schema.mjs  this file. How it gets built.
 *
 * The architect reads the creative manifest and may not contradict it. It adds the
 * technical layer a builder needs and nothing else. A builder then reads one brief
 * composed from both, and should never need to open either.
 */

/** @type {Record<string, {doc: string, shape?: object, array?: object, minItems?: number, check?: (v: any, creative?: any) => string[]}>} */
export const TECH_SCHEMA = {
  tree: {
    doc: 'Where code lives at runtime and how one module requires another. Both build trials named this their most likely single point of total failure.',
    shape: {
      sharedRoot: 'string',
      serverRoot: 'string',
      clientRoot: 'string',
      requireStyle: 'enum:instance,string',
      requireExample: 'string',
    },
    check(t) {
      const problems = [];
      // A Rojo tree is only useful if the example actually demonstrates the style it
      // claims. A builder copies the example, not the enum.
      if (t.requireStyle === 'instance' && !/require\s*\(/.test(t.requireExample)) {
        problems.push('tree.requireExample must be a literal require(...) a builder can copy');
      }
      if (t.requireStyle === 'string' && !/require\s*\(\s*["']/.test(t.requireExample)) {
        problems.push('tree.requireStyle is "string" but requireExample is not a string require');
      }
      for (const [k, v] of Object.entries({ sharedRoot: t.sharedRoot, serverRoot: t.serverRoot, clientRoot: t.clientRoot })) {
        if (!/^[A-Za-z][A-Za-z0-9.]*$/.test(v)) {
          problems.push(`tree.${k} "${v}" should be a runtime path like ReplicatedStorage.Shared`);
        }
      }
      return problems;
    },
  },

  stateShape: {
    doc: "The shape of one player's live state: every field, its single writing module, and what survives a rejoin. Moved here from CID, where it never belonged.",
    shape: {
      fields: 'array',
      types: 'object',
      collection: 'object',
    },
    check(ps) {
      const problems = [];
      if (!Array.isArray(ps.fields) || !ps.fields.length) {
        problems.push('stateShape.fields must be a non-empty array');
        return problems;
      }
      const names = new Set();
      for (const f of ps.fields) {
        if (!f?.name || !f?.type || !f?.writtenBy) {
          problems.push(`stateShape field ${JSON.stringify(f?.name ?? '?')} needs a name, a type and a writtenBy`);
          continue;
        }
        if (names.has(f.name)) problems.push(`two stateShape fields are both called "${f.name}"`);
        names.add(f.name);
        if (typeof f.persisted !== 'boolean') {
          problems.push(`stateShape field "${f.name}" does not say whether it is persisted`);
        }
      }
      for (const f of ps.fields) {
        for (const t of String(f.type ?? '').replace(/[[\]?<>]/g, ' ').split(/[\s,]+/).filter(Boolean)) {
          if (/^[A-Z]/.test(t) && !(t in (ps.types ?? {}))) {
            problems.push(`stateShape field "${f.name}" is typed "${f.type}" but "${t}" is not defined in stateShape.types`);
          }
        }
      }
      // `tick(states)` was handed to a builder with no statement of what `states` is. It
      // guessed a map; a peer guessed differently. The collection is as much a contract as
      // the record inside it.
      const c = ps.collection ?? {};
      if (!c.keyedBy || !c.holds) {
        problems.push('stateShape.collection must say what the states table is keyedBy and what it holds');
      }
      if (c.keyedBy && !['Player', 'UserId', 'index'].includes(c.keyedBy)) {
        problems.push(`stateShape.collection.keyedBy "${c.keyedBy}" must be Player, UserId or index`);
      }
      return problems;
    },
  },

  interfaces: {
    doc: 'Every module function a builder may call, with its exact parameters resolved. Removes "is this argument the level I have or the level I am buying".',
    minItems: 1,
    array: {
      module: 'slug',
      fn: 'string',
      params: 'array',
      returns: 'string',
      note: 'string',
    },
    check(list) {
      const problems = [];
      const seen = new Set();
      for (const i of list) {
        const key = `${i.module}.${i.fn}`;
        if (seen.has(key)) problems.push(`interface ${key} is declared twice`);
        seen.add(key);
        for (const p of i.params) {
          if (!p?.name || !p?.type) {
            problems.push(`${key} has a parameter with no name or type: ${JSON.stringify(p)}`);
            continue;
          }
          // The exact defect: `upgradeCost(upgrade, level)` shipped with no statement of
          // whether `level` was held or target, a 60% swing on every first purchase, and
          // two builders had to guess the same convention independently.
          if (/level|count|index|amount/i.test(p.name) && !p.meaning) {
            problems.push(`${key} parameter "${p.name}" is a quantity with no "meaning"; say exactly what it counts`);
          }
        }
      }
      return problems;
    },
  },

  representation: {
    doc: 'What each game object is made of at runtime: a part, a mesh, a model, a UI element. The question a creative sheet should never be asked.',
    minItems: 1,
    array: {
      subject: 'slug',
      kind: 'enum:part,mesh,model,gui,attachment,none',
      rationale: 'string',
    },
    check(list) {
      const problems = [];
      const seen = new Set();
      for (const r of list) {
        if (seen.has(r.subject)) problems.push(`representation declares "${r.subject}" twice`);
        seen.add(r.subject);
        // A mesh or model implies an asset somebody has to produce. Saying so here is the
        // difference between a build that stalls and one that knows it is blocked.
        if ((r.kind === 'mesh' || r.kind === 'model') && !r.asset) {
          problems.push(`representation "${r.subject}" is a ${r.kind} but names no asset; a builder cannot create one`);
        }
      }
      return problems;
    },
  },

  wiring: {
    doc: 'Lifecycle: what happens on join, on spawn, on a tick, on leave, on shutdown, and in what order. Where "nobody applies walk speed" gets caught.',
    shape: {
      onJoin: 'array',
      onSpawn: 'array',
      onLeave: 'array',
      constructs: 'array',
    },
    check(w) {
      const problems = [];
      for (const [phase, steps] of Object.entries({ onJoin: w.onJoin, onSpawn: w.onSpawn, onLeave: w.onLeave })) {
        if (!Array.isArray(steps) || !steps.length) {
          problems.push(`wiring.${phase} must list at least one step`);
          continue;
        }
        for (const s of steps) {
          if (!s?.module || !s?.does) problems.push(`wiring.${phase} has a step with no module or description: ${JSON.stringify(s)}`);
        }
      }
      // Every state field is written by somebody, but somebody also has to create the
      // table in the first place. Trial 2: "no opening balance and no state constructor",
      // stopped independently by both builders.
      if (!Array.isArray(w.constructs) || !w.constructs.length) {
        problems.push('wiring.constructs must name the module that builds a fresh state and what it initialises');
      }
      return problems;
    },
  },

  modules: {
    doc: 'The build plan: which modules exist, what each owns, and what it may not do.',
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

        // `reads` names creative keys, which this file cannot see. Checked against the
        // creative manifest in validate.mjs, where both are in scope.
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

export function techContract() {
  return Object.entries(TECH_SCHEMA).map(([key, spec]) => ({ key, doc: spec.doc }));
}
